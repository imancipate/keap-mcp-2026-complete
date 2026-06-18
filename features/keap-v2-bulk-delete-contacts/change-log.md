# Change Log: keap-bulk-delete-contacts

## CR-001: Harden bulk-delete concurrency safety — 2026-06-18

| Field | Value |
|-------|-------|
| **Status** | ACCEPTED (all 3 sub-changes) |
| **Priority** | Must Have |
| **Requested at phase** | post-verify (lite, committed) |
| **Rationale** | Codex adversarial review surfaced destructive-path concurrency gaps (BUG-001/002/003), all spec-gaps requiring amended contracts |
| **Impact** | spec.md (FR-012 amended, FR-013/FR-014 added), plan.md, src/tools/bulk-tools.ts, tests; +2 tests |
| **Phase rollback** | implement → verify → test-run re-run in place |

### Sub-changes
| Bug | Change | FR | Code |
|-----|--------|----|----|
| BUG-001 | Limiter is now PROCESS-GLOBAL (`sharedAcquire`, module-scope `_sharedNext`) shared across all calls; per-instance only (cross-instance = backlog) | FR-014 | bulk-tools.ts |
| BUG-002 | `continue_on_error=false` forces `concurrency=1` → deterministic fail-fast, no extra deletes after first failure | FR-013 | bulk-tools.ts |
| BUG-003 | Auth-fatal (401/403) returns structured `{aborted,fatal_status,attempted,deleted,failed}` instead of throwing | FR-012 | bulk-tools.ts |

### Verification (this change)
- `npx tsc --noEmit` clean (changed files); `npx vitest run` → 25/25 (added: fail-fast@concurrency>1, shared-limiter spacing; updated: auth-fatal now asserts structured partial return).
- Real MCP E2E re-run after changes: created 429508/429510 → bulk-delete via `tools/call` → both 404 gone; bad id → failed. PASS.

### Decision notes
User accepted all three now; limiter scope = process-global singleton (single-instance worker is the deploy target). Cross-instance (Durable Objects/KV) explicitly deferred — tracked in BUG-001 as residual scope.

### Addendum 2026-06-18 — cross-instance limiter (was deferred)
BUG-001's deferred residual (cross-INSTANCE rate coordination) is now implemented:
- `src/rate-limiter-do.ts` — `KeapRateLimiter` Durable Object (single global id, atomic
  slot reservation; correct primitive vs eventually-consistent KV).
- `src/worker.ts` — `makeDoAcquire(env)` builds a DO-backed `acquire`, injected via
  `dispatchTool(..., { acquire })`. DO class exported from the worker entry.
- `src/register.ts` / `src/tools/bulk-tools.ts` — optional `acquire` threaded through;
  stdio falls back to the process-global limiter.
- `wrangler.jsonc` — `RATE_LIMITER` DO binding + `v1` migration.
Verified: tsc clean, vitest 26/26 (added injected-limiter test), `wrangler deploy --dry-run`
bundles with the DO binding. NOT yet proven: true multi-isolate serialization under deployed
concurrent load (requires deploy).

### Non Production Elements
None. Code changed + re-verified via real MCP E2E against live Keap. The Durable Object's
cross-isolate behavior is build-verified (dry-run) but its runtime multi-isolate property is
unproven until deploy — explicitly labeled, not claimed.
