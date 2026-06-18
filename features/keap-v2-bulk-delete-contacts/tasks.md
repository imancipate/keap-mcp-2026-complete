# Tasks: keap-bulk-delete-contacts

> Mode: lite (tasks.md retained — not skipped, per policy directive 2026-06-18)
> All tasks `[x]` complete; this file restores plan↔tasks↔code traceability
> (sync-verify Layers 4 & 5). Source: plan.md + CR-001.

## Original feature (commit 020e5bd)

| Task | Description | Plan / FR | Code | Done |
|------|-------------|-----------|------|------|
| T-001 | Tool def `keap_bulk_delete_contacts` + inputSchema (contact_ids/concurrency/continue_on_error/dry_run) | §2.1 / FR-001,002,003,011 | `src/tools/bulk-tools.ts` `createBulkTools` | [x] |
| T-002 | `deleteOne` — single v2 delete + 429 retry w/ `retry-after` backoff | §1/§2.2 / FR-004,006 | `bulk-tools.ts` `deleteOne`,`retryAfterMs` | [x] |
| T-003 | Bounded worker-pool fan-out + token-bucket limiter | §2.2 / FR-005 | `bulk-tools.ts` worker loop | [x] |
| T-004 | Validation (positive safe ints) + dedupe | §2.2.1 / #6 | `bulk-tools.ts` handler head | [x] |
| T-005 | Real per-delete timeout via `deleteV2(path,{timeout})` + `requestV2` default 30s | §1A / #3 | `src/clients/keap.ts` | [x] |
| T-006 | `dry_run` preview path | §2.2.3 / FR-011 | `bulk-tools.ts` dry-run branch | [x] |
| T-007 | Structured report `{total,ok,fail,deleted,failed}` wrapped as MCP content | §2.2.8 / FR-007 | `bulk-tools.ts` return | [x] |
| T-008 | Register tool + exact-name route in dispatchTool | §2.3 / FR-009 | `src/register.ts` | [x] |
| T-009 | Refactor `server.ts` to delegate to getAllTools/dispatchTool | §2.3 / R2-2 | `src/server.ts` | [x] |
| T-010 | Unit tests (16) incl. contract guards | §3 | `src/tools/bulk-tools.test.ts` | [x] |
| T-011 | Live integration + MCP E2E harnesses | §3 success criteria | `scripts/forge-verify-bulk-delete.ts`, `scripts/e2e-mcp-bulk-delete.ts` | [x] |

## CR-001 — concurrency-safety hardening (commits 254a227, 79f56c5)

| Task | Description | Plan / FR | Code | Bug | Done |
|------|-------------|-----------|------|-----|------|
| T-012 | Fail-fast: force `concurrency=1` when `continue_on_error=false` | §5.5 / FR-013 | `bulk-tools.ts` | BUG-002 | [x] |
| T-013 | Auth-fatal returns structured partial progress (not throw) | §5.5 / FR-012 | `bulk-tools.ts` | BUG-003 | [x] |
| T-014 | Process-global limiter (`sharedAcquire`/`_sharedNext`) | §5.5 / FR-014 | `bulk-tools.ts` | BUG-001 | [x] |
| T-015 | Cross-instance limiter — `KeapRateLimiter` Durable Object + worker wiring + wrangler binding/migration; inject `acquire` through dispatchTool | §5.5 / FR-014 | `src/rate-limiter-do.ts`, `src/worker.ts`, `src/register.ts`, `wrangler.jsonc` | BUG-001 | [x] |
| T-016 | CR-001 tests (fail-fast@concurrency>1, shared-limiter spacing, injected limiter; auth-fatal structured) | §5.5 | `bulk-tools.test.ts` (26 total) | — | [x] |

## T-017 — deploy + prove DO (split)
- T-017a | `wrangler deploy` to production | release | wrangler.jsonc (sqlite DO migration) | — | [x] DONE 2026-06-18, Version e4312d0e, https://keap-mcp.zeyadhq.workers.dev (verified live: /mcp → 401 OAuth gate) |
- T-017b | Prove DO multi-isolate serialization under concurrent load on deployed /mcp | release | — | BUG-001 residual | [ ] BLOCKED: needs OAuth token (APPROVAL_SECRET to mint client + consent flow) |

## Non Production Elements
None. Retroactive task ledger over already-implemented + committed work; T-017 is the only open (deploy) item, explicitly unchecked.
