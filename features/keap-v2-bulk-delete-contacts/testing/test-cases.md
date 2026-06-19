# Test Cases: keap_bulk_delete_contacts

> Backend MCP tool — cases are vitest unit cases + one live integration harness.
> No UI ⇒ no playwright-cli steps. Each case below maps to a real, runnable test.

## Unit (TC-UNIT-*) — `src/tools/bulk-tools.test.ts` (faked deleteV2)

| ID | Scenario | Input | Expected | Covers |
|----|----------|-------|----------|--------|
| TC-UNIT-001 | Tool def is contract-valid | createBulkTools | name `keap_bulk_delete_contacts` (≤64), schema type object, items integer | FR-001, contract |
| TC-UNIT-002 | Reject empty array | `{contact_ids:[]}` | throws, no deletes | #6 |
| TC-UNIT-003 | Reject non-array | `{contact_ids:'nope'}` | throws | #6 |
| TC-UNIT-004 | Reject fractional | `[1.5]` | throws | #6 |
| TC-UNIT-005 | Reject zero | `[0]` | throws | #6 |
| TC-UNIT-006 | Reject negative | `[-3]` | throws | #6 |
| TC-UNIT-007 | Happy path + return shape | `[1,2,3]`, concurrency 2 | report ok:3, MCP content wrap, deleteV2 `/contacts/1` | FR-001/004/007 |
| TC-UNIT-008 | Dedupe | `[5,5,5,7]` | total 2, 2 deletes | §2.2.1 |
| TC-UNIT-009 | 409 recorded, continues | id 2 → 409 | ok:2, fail:1 {id:2,status:409} | FR-003, 409 |
| TC-UNIT-010 | continue_on_error=false stops | id 1 → 500 | <5 deletes attempted | FR-008 |
| TC-UNIT-011 | 429 retry then succeed | first 429(retry-after:0) then ok | ok:1, 2 calls | FR-006 |
| TC-UNIT-012 | 401 batch-fatal | all 401 | throws /auth failed/, <3 attempts | FR-012 |
| TC-UNIT-013 | timeout uncertain | ECONNABORTED | fail status null, error /timeout/, called with {timeout:30000} | #3 |
| TC-UNIT-014 | dry_run previews | `dry_run:true` | dry_run true, would_delete, 0 deletes | FR-011 |
| TC-UNIT-015 | concurrency bound | 8 ids, concurrency 3 | peak in-flight ≤3 | FR-005 |
| TC-UNIT-016 | rate limiter spacing | createRateLimiter(10), fake timers | ≤1 start/100ms | R3 |

## Contract (TC-CON-*) — schema-contract.test.ts + register.test.ts
| ID | Scenario | Expected |
|----|----------|----------|
| TC-CON-001 | getAllTools schema contract | all tools incl bulk pass draft-2020-12 + name rules |
| TC-CON-002 | v2 count guard | rename keeps `keap_v2_` count == v2ToolNames() |

## Integration (TC-INT-*) — `scripts/forge-verify-bulk-delete.ts` (REAL Keap)
| ID | Collaboration | Scenario | Expected | Status |
|----|---------------|----------|----------|--------|
| TC-INT-001 | handler ↔ live Keap v2 | create 2 disposable → bulk delete → re-fetch | report ok:2; both re-fetch 404 gone | ✅ PASS 2026-06-18 |
| TC-INT-002 | handler ↔ live Keap v2 | bad id 999999999 in same call | failed[] {status:404} | ✅ PASS |

Live evidence (TC-INT): report `{total:3, ok:2, fail:1, deleted:[429494,429492], failed:[{999999999,404}]}`,
post-delete re-fetch both → HTTP 404.

## Non Production Elements
- TC-UNIT-* fake `deleteV2` (vitest vi.fn). Promoted by TC-INT-* live run. No others.
