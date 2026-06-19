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

## CR-002: Close No-ship conditions from round-2 adversarial review — 2026-06-18

| Field | Value |
|-------|-------|
| Status | ACCEPTED (A+B+C+D) |
| Source | Codex adversarial review of release-readiness (BUG-004/005/006 + CF-4) |
| Impact | src/clients/keap.ts, src/register.ts, src/worker.ts, src/server.ts, scripts; spec FRs |

### Sub-changes
| Bug | Change | FR | Files |
|-----|--------|----|----|
| BUG-006 (A) | Default 30s timeout moved OFF `requestV2` (was global to all 343 v2 tools) ONTO `deleteV2` only | FR-014 (timeout note) | keap.ts |
| BUG-005 (B) | `keap_bulk_delete_contacts` is opt-in: `getAllTools`/`dispatchTool` gate on `KEAP_BULK_DELETE_ENABLED` (default OFF in prod); both transports wired | FR-015 (new) | register.ts, worker.ts, server.ts |
| BUG-004 (C) | `/admin/mint-client` reads secret from `x-approval-secret` header, rejects query-string; scripts updated; APPROVAL_SECRET rotated + test client revoked (ops) | FR-016 (new) | worker.ts, scripts |
| CF-4 (D) | Merge PR #3 + redeploy from merged base so prod == reviewed code | — | process |

### Verification
tsc clean; vitest 29/29 (+3 kill-switch tests). Deploy + prod re-verify recorded below as performed.

### Non Production Elements
None. The leftover test OAuth client is being revoked as part of C.

## CR-003: Human-confirm gate for the destructive tool — 2026-06-18

| Field | Value |
|-------|-------|
| Status | ACCEPTED — design: confirm-token (model-blind env token) |
| Priority | Must (destructive safety) |
| Escalation | feature_mode lite → **standard** (ran bridge → spec.md; append-only) |
| Impact | product-spec FR-017, spec.md (new), plan.md §5.6, tasks T-024..026, code, tests |
| Phase rollback | none (additive guard) |

### Artifacts (this CR)
| Artifact | Change |
|----------|--------|
| product-spec.md | +FR-017 |
| spec.md | NEW (bridge; whole-feature SpecKit projection incl CR-003 AC-1..5) |
| plan.md | +§5.6 confirm-gate design |
| tasks.md | +T-024 (handler), T-025 (tests), T-026 (verify+PR+deploy) |
| pre-impl-review.md | NEW — design + risk register, verdict APPROVED |

### Decision notes
Confirm-token chosen for buildability + LLM-resistance (token not in model context). Two-phase
out-of-band logged as future air-gap. Bridge run per user request → standard mode.
Implement pending (next gate).

