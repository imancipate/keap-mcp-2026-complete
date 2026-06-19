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
- T-017b | Prove DO serialization under concurrent load on deployed /mcp | release | scripts/deployed-do-proof.mjs | BUG-001 residual | [x] DONE 2026-06-18 — authed OAuth + real MCP tools/call: single 8-delete=1330ms vs 3×concurrent 24-delete=2866ms (2.15×) → concurrent calls serialized by the shared DO budget (per-call limiter would be ~1×). tools/list confirms keap_bulk_delete_contacts live on prod. Caveat: cross-call sharing proven; true multi-isolate is probabilistic (one DO id by construction). |

## CR-002 — close No-ship conditions (commit f4c6e18, merged via PR #3)
| Task | Description | FR/Bug | Done |
|------|-------------|--------|------|
| T-018 | Scope 30s timeout to deleteV2 only (off global requestV2) | BUG-006/FR-014 | [x] tsc+tests |
| T-019 | Kill-switch KEAP_BULK_DELETE_ENABLED (default off, both transports) | BUG-005/FR-015 | [x] 29/29; prod shows 455 tools, bulk absent |
| T-020 | Admin secret via x-approval-secret header, reject query string | BUG-004/FR-016 | [x] prod header works, query 400 |
| T-021 | Merge PR #3 + redeploy from merged base | CF-4 | [x] merged 22:22Z; redeployed Version b29e83cf |
| T-022 | Rotate APPROVAL_SECRET (leaked in chat) | BUG-004 ops | [x] rotated (random, unretained); old secret now 403. USER must set own to regain admin mint. |
| T-023 | Revoke clients minted under old secret | BUG-004 ops | [~] neutered by rotation (new authz needs new secret); explicit KV delete = optional hygiene |

## CR-003 — confirm-gate (FR-017) — pending implement
| Task | Description | FR | Done |
|------|-------------|----|------|
| T-024 | Handler requires `confirm`==env token to execute (dry_run exempt); refusal report when absent/wrong; thread `confirmToken` via dispatchTool/handleBulkTool; wire worker.ts + server.ts env KEAP_BULK_DELETE_CONFIRM | FR-017 | [x] |
| T-025 | Tests AC-1..5 (+ token-unset default-deny): no-confirm refused (no deleteV2), wrong-confirm refused, correct-confirm runs, dry_run exempt, token never echoed | FR-017 | [x] 35/35 |
| T-026 | Re-verify + 2nd PR + redeploy + set prod KEAP_BULK_DELETE_CONFIRM | FR-017 | [x] PR #4 merged 2026-06-19; redeployed Version ad93b67c; KEAP_BULK_DELETE_CONFIRM set; prod regression clean (455 tools, bulk still off). NOTE: token value is "CONFIRM" (guessable — rotate before enabling bulk in prod). |

## Non Production Elements
None. T-024..T-026 pending implement (CR-003). Prior tasks implemented + merged + deployed.
