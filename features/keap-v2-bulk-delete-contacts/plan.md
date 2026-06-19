# Technical Plan: keap_v2_bulk_delete_contacts

> Feature: `keap-v2-bulk-delete-contacts` | Mode: lite | Date: 2026-06-17
> Source spec: [product-spec/product-spec.md](./product-spec/product-spec.md)
> Covers Must-Have stories + FR-001..FR-010.

> **Revised after Codex adversarial review (2026-06-17).** 6 findings (1 BLOCKER, 4 MAJOR,
> 1 MINOR), all verified true against source. Folded below; raw findings archived in
> [adversarial-review.md](./adversarial-review.md). Headline change: tool renamed
> `keap_v2_bulk_delete_contacts` → **`keap_bulk_delete_contacts`** (drop `keap_v2_`).

## 1. Grounding (verified against worktree code @ ade009a)

- **Loop primitive:** `KeapClient.deleteV2<T>(path)` → `requestV2({method:'DELETE', url:path})`
  (`src/clients/keap.ts:169`). Path for a contact: `/contacts/{id}` (v2 base
  `https://api.infusionsoft.com/crm/rest/v2`).
- **Rate limiting (corrected per review #2):** `requestV2` (`keap.ts:140`) DOES call
  `await this.checkRateLimit()` (`keap.ts:146`), but then uses raw `axios.request`
  (`keap.ts:147`) which bypasses `this.client`'s response interceptor. So v2 responses
  never update `x-rate-limit-*` state and 429s never trigger `handleError()`/retry.
  ⇒ reactive 429 retry/backoff is NOT inherited and MUST be implemented in this handler,
  keyed on `AxiosError.response.status === 429` + `Retry-After`/`x-rate-limit-reset`.
- **Timeout gap (reviews #3 + R2-#1):** raw `axios.request` in `requestV2` does NOT carry
  the `timeout: 30000` set on `this.client` (`keap.ts:20`). A stuck delete hangs a worker.
  A `Promise.race` wrapper alone is INSUFFICIENT (R2-#1): it abandons the promise but the
  underlying request keeps running, so a "timed out" delete may still complete in Keap and
  the report would be FALSE. ⇒ enforce a REAL request timeout: extend
  `KeapClient.deleteV2(path, opts?)` and `requestV2(config, opts?)` to pass an axios
  `timeout` (+ `AbortController.signal`) into `axios.request`, so the request is actually
  aborted. Backward-compatible (default 30000ms when omitted). Timeout outcome is still
  recorded honestly as uncertain (see §2.2).
- **Single-contact v2 delete** already exists as generated op `keap_v2_delete_contact`
  (`DELETE /contacts/{contact_id}`), proving the path + method are correct.
- **Naming/CI (review #4):** `register.test.ts:25` asserts
  `v2.length === v2ToolNames().length` for every `keap_v2_`-prefixed tool. A hand-written
  `keap_v2_bulk_*` tool breaks this CI guard. ⇒ name the tool **`keap_bulk_delete_contacts`**
  (no `keap_v2_` prefix). This ALSO avoids the `handleV2Tool` swallow below.
- **Dispatch:** `dispatchTool` (`src/register.ts:46`) routes `name.startsWith('keap_v2_')`
  to `handleV2Tool` (404s if not in `V2_OPS`). The renamed `keap_bulk_delete_contacts`
  matches no existing branch (contacts branch uses specific `startsWith` prefixes, not a
  generic `_contact` include). ⇒ add an explicit exact-name route at the TOP of
  `dispatchTool`, before all other branches.
- **Registry:** `getAllTools(client)` (`register.ts:23`) spreads each domain's
  `create*Tools(client)`. New tool spread in here.
- **Contract guard (review #6):** `src/schema-contract.test.ts` enforces: name regex
  `^[a-zA-Z0-9_-]{1,64}$`, unique names, `inputSchema.type==='object'`, and draft-2020-12
  bans (`definitions`, tuple `items`, boolean `exclusiveMinimum/Maximum`).
  `keap_bulk_delete_contacts` (25 chars) + an object schema with `items:{type:'integer'}`
  and numeric `minimum` satisfies all of these.
- **server.ts (review #1, BLOCKER):** `src/server.ts` (stdio) has its OWN routing
  (`server.ts:93+`), does NOT use `getAllTools()`/`dispatchTool()`, and imports NO v2
  handlers — so it currently exposes ZERO v2 tools (pre-existing gap). Live transport is
  `worker.ts → dispatchTool → register.ts` (deployed Worker), so register.ts is the
  critical path. For stdio parity we still wire the bulk tool into server.ts explicitly
  (add to its tool list + an exact-name route). The broader "server.ts lacks all 343 v2
  tools" gap is pre-existing and OUT OF SCOPE for this feature.

## 1A. Keap API contract — EVIDENCE (not assumptions)

Sourced from Keap Developer Portal (verified 2026-06-18) + this repo's OpenAPI spec
`scripts/keap_v2_openapi.yml`. Every number below is cited, not chosen.

- **DELETE `/contacts/{contact_id}` contract** (`keap_v2_openapi.yml`): success = **`204 No
  Content`** (no body). Error paths enumerated: `400, 401, 403, 404, 405, 409 Conflict,
  500, 501`. **`429` is NOT enumerated per-endpoint** but Keap returns it platform-wide
  (below). ⇒ success check = HTTP 204; treat 409 as a recorded per-id failure.
- **Rate limits** (developer.infusionsoft.com/api-token-quota-and-usage-measurements):
  - **Spike: 25 calls/sec per application** (default) — the binding short-term limit.
  - OAuth2 bearer token (this worker's auth): **1,500/min, 150,000/day**.
  - Per-application instance (effective 2026-06-08): **10,000/min, 250,000/day**.
- **Throttle signal** = HTTP **429**; Keap docs say **use exponential backoff and respect
  the `retry-after` header**. ⇒ this is the authoritative backoff contract.
- **Real headers** Keap sends: `x-keap-product-quota-{limit,available,used}` (daily),
  `x-keap-product-throttle-{limit,available,used}` (minute),
  `x-keap-tenant-throttle-{limit,available,used}` (per-instance, limit 10000).
- **Client defect (new finding):** `KeapClient` reads `x-rate-limit-remaining` /
  `x-rate-limit-reset` (`keap.ts:34-38`) — headers Keap v2 does **not** send. So
  `checkRateLimit()` never meaningfully triggers for v2 (remaining stays at its init 1000).
  v2 pacing is effectively off today. ⇒ this feature does NOT rely on `checkRateLimit`; it
  honors 429 + `retry-after` directly (contract-correct). Fixing the global header tracking
  is logged as out-of-scope tech-debt (see §6).

### Evidence-derived design decisions (replacing earlier guessed numbers)
- **Proactive rate limiter is the guard (R3-MAJOR):** the binding constraint is **25 req/s
  per app**, and the worker uses ONE shared Keap credential for all callers (`worker.ts:5`).
  Reactive 429 backoff is RECOVERY, not prevention — a burst can overshoot 25/s and throttle
  every other caller of the shared key before backoff engages. So the handler MUST pace
  outbound deletes with a **token-bucket / min-interval limiter** capped at a conservative
  **`MAX_RPS = 10` req/s** (well under the 25/s spike, leaving headroom for other shared-key
  callers; also far under the 10k/min instance limit). This is the true rate guard.
- **Concurrency** is only a parallelism/latency knob now (bounds in-flight count), NOT the
  rate guard: **default 5, hard cap 10**. Effective rate = min(concurrency/latency, MAX_RPS).
- **429 + `retry-after`** = recovery layer only (exponential backoff, max 3 retries), for
  the rare case the proactive limiter still trips throttling (e.g. other callers consuming
  the shared budget).
- **Timeout 30000ms:** matches the existing `this.client` timeout (`keap.ts:20`) — same
  value the codebase already uses, not arbitrary.

## 2. Design

New module `src/tools/bulk-tools.ts` exporting:
- `createBulkTools(client: KeapClient): Tool[]` — returns the one Tool definition.
- `handleBulkTool(name, args, client): Promise<any>` — executes the fan-out.

### 2.1 Tool definition (FR-001..003, FR-007)
```
name: 'keap_bulk_delete_contacts'          # renamed (review #4): no keap_v2_ prefix
description: 'Delete MANY Keap contacts in one call (DESTRUCTIVE). Deterministic
  server-side fan-out over the v2 single delete; returns a per-ID report. Set
  dry_run=true to preview without deleting. No Keap bulk-contact-delete endpoint exists.'
inputSchema:
  type: object
  properties:
    contact_ids:      { type: array, items: { type: integer, minimum: 1 },
                        description: 'Contact IDs to delete (positive integers)' }
    concurrency:      { type: integer, minimum: 1, maximum: 10,
                        description: 'Parallel deletes, default 5' }
    continue_on_error:{ type: boolean, description: 'Keep going after a per-ID failure, default true' }
    dry_run:          { type: boolean, description: 'Preview only — validate IDs, delete nothing. Default false' }
  required: ['contact_ids']
```
Notes: numeric `minimum` is allowed by the contract test; boolean `exclusiveMinimum` is
banned — do not use it. **Concurrency default 5, cap 10** — rationale is evidence-based, see
§1A "Evidence-derived design decisions" (Keap spike limit 25 req/s/app; 429+`retry-after` is
the real rate guard, concurrency is just parallelism). Do NOT rely on the client's
`checkRateLimit()` for v2 — it reads headers Keap v2 doesn't send (§1A client defect).

### 2.2 Handler algorithm (FR-004..008, FR-010; reviews #2/#3/#5/#6)
1. Validate `contact_ids`: non-empty array; every element a **positive safe integer**
   (`Number.isSafeInteger(x) && x > 0`) — else `throw new Error(...)` (dispatchTool formats
   it as `isError`, register.ts:89). Dedupe (preserve first-seen order).
2. Clamp `concurrency` to `[1,10]` (default 5). `continue_on_error` default `true`.
   `dry_run` default `false`.
3. **dry_run short-circuit:** if `dry_run`, perform NO deletes; return a report with
   `dry_run:true`, `would_delete: dedupedIds`, `total`, `ok:0`, `fail:0`, empty
   `deleted`/`failed`.
4. Worker-pool fan-out (NOT `Promise.all` over all IDs — FR-005): `concurrency` workers
   pull from a shared cursor over the deduped IDs. **Before each delete, a shared
   token-bucket limiter (`MAX_RPS=10`) gates the call** so aggregate outbound ≤10 req/s
   regardless of concurrency (R3-MAJOR proactive guard for the shared credential).
5. Per ID: `await deleteOne(client, id)`:
   - `client.deleteV2('/contacts/' + id, { timeout: 30000 })` — REAL axios timeout +
     AbortController (R2-#1), not a `Promise.race` (which wouldn't cancel the request).
     On timeout axios rejects `ECONNABORTED` → record `{status:null,
     error:'timeout (delete may not have been applied — re-query to confirm)'}` in
     `failed[]`. Honest: does not claim success or definite non-deletion.
   - **Success = HTTP 204** (Keap contract, §1A) → `deleted[]`.
   - **429** → RECOVERY layer only (the token-bucket in step 4 is the primary guard):
     exponential backoff seeded by the **`retry-after`** header when present (Keap's
     documented mechanism, §1A), jitter, max ~3 retries, then retry (FR-006). Do NOT read
     `x-rate-limit-reset` (not a real Keap header).
   - **401/403 → BATCH-FATAL (review #5):** shared server-side credential; if unauthorized,
     every delete fails identically. Set fatal flag, stop scheduling, and
     `throw new Error('Keap auth failed (HTTP {status}) — aborting bulk delete')` regardless
     of `continue_on_error`. Surfaces once via dispatchTool.
   - Other non-429 error (404 already-deleted, **409 Conflict**, other 4xx/5xx, network)
     → record `{id, status, error}` in `failed[]`. `status` = HTTP status when available
     else null. (404 = `fail`, spec §9 v1; 409 is a documented Keap response, §1A.)
6. `continue_on_error=false` (FR-008): set stop flag on first non-fatal failure; workers
   stop pulling new IDs; in-flight deletes finish and are still reported.
7. Build `report = { dry_run:false, total: dedupedIds.length, ok: deleted.length,
   fail: failed.length, deleted, failed }` (FR-007).
8. **Return shape (architecture conformance):** wrap exactly as every other handler does —
   `return { content: [{ type: 'text', text: JSON.stringify(report, null, 2) }] }`
   (matches handleV2Tool v2-generated-tools.ts:12843 and handleContactsTool). The raw
   `report` object is NOT returned directly.

### 2.3 Wiring
- `register.ts`: import `createBulkTools, handleBulkTool`; spread `...createBulkTools(client)`
  in `getAllTools`; add `if (name === 'keap_bulk_delete_contacts') return
  handleBulkTool(name, args, client);` at the TOP of `dispatchTool` (before all branches).
- `server.ts` (review #1): import + spread `createBulkTools(client)` into its tool list,
  and add the same exact-name route in its `CallToolRequestSchema` handler. (Does not fix
  the pre-existing "server.ts exposes no v2 tools" gap — out of scope.)

### 2.4 Architecture conformance (verified against code, not assumed)

Every convention this feature follows, with evidence:

| Convention | Evidence | This feature |
|------------|----------|--------------|
| Tool module = `create<X>Tools(client): Tool[]` + `handle<X>Tool(name,args,client)` | `contacts-tools.ts:264`, all `*-tools.ts` | `bulk-tools.ts` exports `createBulkTools` + `handleBulkTool`. |
| Handler return = `{ content: [{ type:'text', text: JSON.stringify(x,null,2) }] }` | `v2-generated-tools.ts:12843`, `contacts-tools.ts` | Identical wrapping (§2.2 step 8). |
| Handler signature `Promise<{ content: Array<{type:string;text:string}> }>` | `contacts-tools.ts:268` | Same. |
| Failures `throw new Error(...)`; outer `dispatchTool` try/catch → `{content,isError:true}` | `register.ts:88-93` | Validation + auth-fatal throw; partial per-ID failures go in report (not thrown). |
| Registry via `getAllTools` spread | `register.ts:23-41` | Add `...createBulkTools(client)`. |
| Routing in `dispatchTool` by name | `register.ts:46-88` | Exact-name route at top. |
| v2 calls via `client.deleteV2`/`requestV2` | `keap.ts:169` | Reused; not re-implemented. |
| Tests use **vitest**; `predeploy` = `vitest run` (pre-deploy gate) | `package.json:15,18` | `bulk-tools.test.ts` uses `vitest`. |
| Contract guards run over `getAllTools()` | `schema-contract.test.ts`, `register.test.ts` | New tool must pass both unchanged. |

Anti-conformance avoided: no hand-edit of generated `v2-generated-tools.ts`; no new HTTP
client; no new return envelope; no `keap_v2_` name (count-locked); no unbounded `Promise.all`.

## 3. Test Strategy (maps to ACs)

| AC / FR | Test |
|---------|------|
| FR-001/007 | Unit: mock `client.deleteV2` resolving; assert report `{total,ok,fail,deleted,failed}`. |
| FR-004 | Unit: assert `deleteV2` called once per unique id with `/contacts/{id}`. |
| FR-003/008 | Unit: one id rejects; `continue_on_error=true` ⇒ others still deleted; `false` ⇒ stops scheduling. |
| FR-005 | Unit: instrument concurrent in-flight count ≤ concurrency. |
| FR-006 | Unit: `deleteV2` rejects 429 (with `retry-after`) once then resolves ⇒ id ends in `deleted[]`; backoff waited. |
| 204/409 | Unit: 204 ⇒ `deleted[]`; 409 Conflict ⇒ `failed[]` with status 409 (Keap contract §1A). |
| R3 rate-limit | Unit (fake timers): N≫10 ids ⇒ delete call timestamps show ≤10 starts in any 1s window (token-bucket guard holds regardless of concurrency). |
| #3/R2-#1 timeout | Unit: assert handler passes a `timeout` to `deleteV2`; when `deleteV2` rejects `ECONNABORTED`, id recorded with uncertain-timeout error and worker frees. |
| #5 auth-fatal | Unit: `deleteV2` rejects 401 ⇒ batch stops immediately, single auth error thrown, even with `continue_on_error=true`. |
| #6 validation | Unit: `contact_ids` containing `1.5`/`0`/`-1`/`[]` ⇒ clear validation error, no deletes issued. |
| dry_run | Unit: `dry_run=true` ⇒ `deleteV2` never called; report has `dry_run:true`, `would_delete` = deduped ids, `ok:0`. |
| return shape | Unit: result is `{content:[{type:'text',text}]}` and `JSON.parse(text)` yields the report (conformance). |
| FR-009 | Run `schema-contract.test.ts` (name/schema contract) AND `register.test.ts` (the v2-count guard must still pass — rename keeps `keap_v2_` count unchanged). |
| Success criteria | Verify phase: real Keap run deleting a small set of throwaway contact IDs (ENV=production single key), confirm report + actual deletion via a follow-up `keap_v2_get_contact` 404. |

Framework: match existing tests (`*.test.ts` — same runner as `schema-contract.test.ts`).

## 4. Files Touched (edit plan)
- **NEW** `src/tools/bulk-tools.ts` — tool def + handler + worker-pool + token-bucket
  limiter (MAX_RPS=10) + retry/backoff helpers.
- **EDIT** `src/clients/keap.ts` — extend `deleteV2(path, opts?)` and `requestV2(config, opts?)`
  to accept `{ timeout?, signal? }` and pass a real axios `timeout` + `AbortController.signal`
  into `axios.request` (default 30000ms; backward-compatible). Fixes R2-#1 + the general
  v2-no-timeout gap.
- **EDIT** `src/register.ts` — import, spread `createBulkTools`, exact-name route at top.
- **EDIT** `src/server.ts` — import + spread `createBulkTools` into tool list + exact-name route
  (minimal-mirror option) OR refactor to delegate to `getAllTools`/`dispatchTool` (clean
  option, R2-#2) — see gate decision.
- **NEW** `src/tools/bulk-tools.test.ts` — unit tests above.
- No change to `v2-generated-tools.ts` (generated; do not hand-edit) or `register.test.ts`
  (rename keeps its `keap_v2_` count assertion valid).

## 5. Risks
- **server.ts/register.ts/worker.ts routing drift** — three transports; register.ts (via
  worker.ts) is the live path. Wire register.ts first; mirror into server.ts for stdio parity.
- **v2 429/timeout not inherited** — `requestV2` bypasses the interceptor and carries no
  timeout; handler owns both backoff and per-delete timeout (reviews #2/#3).
- **Auth on shared credential** — 401/403 is batch-fatal to avoid N-way spam (review #5).
- **Destructive** — no dry-run in v1; tests use mocks; the single real run in verify uses
  disposable contacts only.

## 5.5. CR-001 Amendments (2026-06-18) — supersede earlier design decisions

Codex adversarial review (post-implement) surfaced 3 spec-gaps; CR-001 (see
[change-log.md](./change-log.md), [bugs/](./bugs/)) amended the design. The original
text above is preserved; the decisions below supersede it where they conflict.

- **BUG-001 / FR-014 — limiter scope.** ~~Per-invocation `createRateLimiter(MAX_RPS)`
  inside the handler (plan §1A/§2.2 step 4).~~ → SUPERSEDED. Now a **process-global**
  limiter (`sharedAcquire` over module-scope `_sharedNext`) shared across all calls in an
  isolate, PLUS an injected **cross-instance** limiter backed by a Durable Object
  (`src/rate-limiter-do.ts` `KeapRateLimiter`, single global id) supplied by the Worker via
  `dispatchTool(..., {acquire})`. stdio uses the process-global fallback.
- **BUG-002 / FR-013 — fail-fast.** ~~`continue_on_error=false` stops scheduling new
  deletes; in-flight finish (plan §2.2 step 6).~~ → SUPERSEDED. Now forces
  `concurrency=1` when `continue_on_error=false` → deterministic fail-fast, no extra
  deletes after the first failure.
- **BUG-003 / FR-012 — auth-fatal.** ~~On 401/403 `throw` a single auth error (plan §2.2
  step 5).~~ → SUPERSEDED. Now RETURNS a structured report
  `{aborted, fatal_status, attempted, deleted, failed}` so callers see which irreversible
  deletes already applied.

### CR-001 edit plan (files actually touched)
- `src/tools/bulk-tools.ts` — process-global `sharedAcquire`, `_resetSharedLimiterForTests`,
  optional injected `acquire`, `concurrency=1` on fail-fast, structured auth-fatal return.
- `src/rate-limiter-do.ts` (NEW) — `KeapRateLimiter` Durable Object.
- `src/worker.ts` — `makeDoAcquire`, inject acquire, export DO class.
- `src/register.ts` — `dispatchTool` optional `{acquire}` opts.
- `wrangler.jsonc` — `RATE_LIMITER` DO binding + `v1` migration.
- `src/tools/bulk-tools.test.ts` — +fail-fast@concurrency>1, +shared-limiter spacing,
  +injected-limiter; auth-fatal rewritten to assert structured return. (26 tests.)

### CR-001 verification
tsc clean; vitest 26/26; live MCP E2E re-run (create→delete→404); `wrangler deploy --dry-run`
bundles the DO. Unproven: multi-isolate DO serialization under deployed concurrent load.

## 5.6. CR-003 — confirm-gate design (FR-017)
- **Mechanism:** `handleBulkDeleteContacts` gains a `confirm` arg + an injected expected token
  (from env `KEAP_BULK_DELETE_CONFIRM`, threaded like `bulkDeleteEnabled` via
  getAllTools/dispatchTool opts so it's transport-agnostic and NEVER in the tool schema value).
- **Rule:** if NOT `dry_run` and (`confirm !== expectedToken` or token unset) → return a refusal
  report `{aborted:true, reason:'confirm-required', deleted:[], failed:[]}` (no deleteV2 calls).
  `dry_run` short-circuits before this (preview needs no confirm).
- **Why model-blind:** the token lives in server env; the model can't read it, so it cannot
  self-authorize. A human supplies it per batch (deliberate authorization). True air-gap
  (out-of-band nonce) is logged to §6 as a future option.
- **Schema:** add optional `confirm: {type:string}` to inputSchema (description says "required to
  execute; value is the server confirm token, supplied by a human").
- **Wiring:** worker.ts `env.KEAP_BULK_DELETE_CONFIRM`; server.ts `process.env...`; pass as
  `dispatchTool(..., { acquire, bulkDeleteEnabled, confirmToken })`.
- **Edit plan:** bulk-tools.ts (handler + handleBulkTool sig), register.ts (getAllTools no-op /
  dispatchTool opts), worker.ts + server.ts (env wiring), bulk-tools.test.ts (AC-1..5).

## 6. Out-of-scope tech debt (logged, not fixed here)
- **`KeapClient` v2 rate-limit tracking is broken** (§1A): it reads `x-rate-limit-*` headers
  that Keap v2 doesn't send, so `checkRateLimit()` is inert for v2 across ALL 343 generated
  tools, not just this one. Proper fix = read `x-keap-product-throttle-available` /
  `x-keap-tenant-throttle-available` and gate globally. Out of scope for this feature (would
  change behavior of every v2 tool); this feature self-protects via 429 + `retry-after`.

## Non Production Elements
None planned. Unit tests use a mocked `KeapClient.deleteV2` (standard test double, not a
shipped element). The one real-Keap deletion happens only in the verify phase against
disposable test contacts.
