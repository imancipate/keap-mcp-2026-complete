# Adversarial Review — plan.md (Codex, cross-model)

> Reviewer: Codex CLI 0.140.0 (cross-model second opinion) | 2026-06-17
> Target: [plan.md](./plan.md) | All 6 findings independently verified TRUE against source.

| # | Sev | Finding | Resolution in plan |
|---|-----|---------|--------------------|
| 1 | BLOCKER | `server.ts` doesn't use `getAllTools()`/`dispatchTool()`, imports no v2 handlers, exposes zero v2 tools. register.ts route alone won't expose it on stdio. | Wire bulk tool explicitly into `server.ts` (list + route). Broader v2 gap in server.ts noted out-of-scope. Live path = worker.ts→register.ts. |
| 2 | MAJOR | Plan wrong that `requestV2` skips `checkRateLimit()` — it calls it (keap.ts:146). Real gap: raw axios bypasses interceptor, so v2 429s untracked/no retry. | Corrected §1 wording; handler owns reactive 429 retry on `AxiosError.status===429` + `Retry-After`. |
| 3 | MAJOR | `requestV2` raw `axios.request` drops the 30s `this.client` timeout → stuck delete hangs a worker forever. | Handler enforces per-delete timeout via `Promise.race`. |
| 4 | MAJOR | `register.test.ts:25` asserts `v2.length === v2ToolNames().length`; a `keap_v2_`-named hand-written tool breaks CI. | Renamed tool `keap_v2_bulk_delete_contacts` → `keap_bulk_delete_contacts`. Also avoids `handleV2Tool` swallow. |
| 5 | MAJOR | Shared server-side credential; on 401/403 every delete fails identically — `continue_on_error` spams N failures. | 401/403 = batch-fatal: stop immediately, single auth error, regardless of `continue_on_error`. |
| 6 | MINOR | Contract test enforces more than 64-char rule (unique names, type object, draft-2020-12 bans). `finite numbers` too loose. | §1/§2 cover full contract; validate `contact_ids` as positive safe integers; schema `items:{type:integer,minimum:1}`. |

## Round 2 (re-review of revised plan)

Codex re-ran against the revised plan. Confirmed FIXED: (a) return-shape, (b) throw/report
error model, (c) rename keeps `register.test.ts` green, (d) exact-name route placement.
Two remaining:

| # | Sev | Finding | Resolution |
|---|-----|---------|------------|
| R2-1 | MAJOR | `Promise.race` timeout doesn't cancel the axios request → a "timed out" delete may still apply in Keap; report could be false. | Extend `deleteV2`/`requestV2` with real axios `timeout` + `AbortController.signal` (keap.ts edit); record timeout outcome as UNCERTAIN, not definite fail. |
| R2-2 | MINOR | Mirroring route into `server.ts` preserves register/server drift; clean design = `server.ts` delegates to `dispatchTool`. | Gate decision: minimal-mirror (tight scope) vs refactor server.ts to delegate (removes drift, also exposes v2 on stdio). |

## Round 3 (evidence grounding)

User challenged the numbers as guessed ("capitulation rather than reality-based contracts").
Pulled the real Keap contract (developer.infusionsoft.com, verified 2026-06-18) + OpenAPI spec:
- DELETE `/contacts/{id}` success = **204**, errors 400/401/403/404/405/**409**/500/501; no per-endpoint 429.
- Spike **25 req/s/app**; OAuth2 token **1,500/min, 150k/day**; instance **10k/min, 250k/day** (eff 2026-06-08).
- 429 + **`retry-after`** + exponential backoff is Keap's documented mechanism.
- Real headers `x-keap-{product,tenant}-throttle-*` / `x-keap-product-quota-*`.
- **New defect:** `keap.ts:34-38` reads `x-rate-limit-*` (not Keap v2 headers) → `checkRateLimit()` inert for all v2 tools. Logged out-of-scope (plan §6).
All folded into plan §1A; concurrency/timeout/backoff now contract-derived, not chosen.

## Round 4 (evidence verified; rate-guard hardened)

Codex verified all R3 evidence claims TRUE (204 success + 409; no per-endpoint 429;
`keap.ts:36-40` reads stale `x-rate-limit-*`; v2 bypasses interceptor at 147-155). One
remaining MAJOR:

| # | Sev | Finding | Resolution |
|---|-----|---------|------------|
| R4-1 | MAJOR | Plan overclaimed "429 retry keeps us within 25/s". Reactive backoff = recovery, not prevention; shared credential ⇒ a burst can throttle other callers before backoff. | Added a **proactive token-bucket limiter (MAX_RPS=10)** as the primary rate guard (plan §1A + §2.2 step 4); 429+retry-after reframed as recovery-only; concurrency demoted to a parallelism knob. |

Status: evidence-grounded, rate guard now proactive. Open known-debt: global v2 header
tracking (plan §6) — out of scope.

Verification notes (this session):
- keap.ts:146 confirms `await this.checkRateLimit()`; keap.ts:147 confirms raw `axios.request` (no interceptor, no timeout).
- register.test.ts:25 `expect(v2.length).toBe(v2ToolNames().length)` confirmed.
- schema-contract.test.ts:43-48 confirms `definitions`/tuple-`items`/boolean-`exclusiveMinimum` bans.
