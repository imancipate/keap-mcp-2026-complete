# Test Plan: keap_bulk_delete_contacts

> Created: 2026-06-18 | Phase: 8A | Feature: `keap-bulk-delete-contacts` | Mode: lite

## Reality note (scope of testing)
This is a **backend MCP tool** — no UI, no frontend, no browser. Auto-detect found
**vitest** and **no Playwright/Cypress/frontend**. Therefore browser/E2E (smoke-UI,
Playwright `.spec.ts`) test types are **NOT APPLICABLE** and are not generated. The
applicable layers are **unit** (vitest, faked Keap boundary) and **integration/API**
(real Keap HTTP, the live runtime proof from Phase 7).

## Test types & status

| Type | Applicable | Count | Where | Status |
|------|-----------|-------|-------|--------|
| Unit (vitest) | ✅ | 16 | `src/tools/bulk-tools.test.ts` | PASS |
| Contract guard | ✅ | 7 | `src/schema-contract.test.ts` (4) + `src/register.test.ts` (3) | PASS |
| Integration/API (real Keap) | ✅ | 1 harness | `scripts/forge-verify-bulk-delete.ts` | PASS (live, 2026-06-18) |
| Smoke (browser) | ❌ N/A | — | no UI | — |
| E2E Playwright | ❌ N/A | — | no UI | — |
| Regression (browser) | ❌ N/A | — | no UI | — |

## Environment
- **Runner:** vitest (`npm run test:run`; also the `predeploy` gate).
- **Integration creds:** `KEAP_API_KEY` (repo-root `.env`, gitignored). No frontend URL, no
  browser, no test-user login. No `testing/env.md` needed (no UI credentials).
- **Integration target:** production Keap v2 (`/contacts`), using disposable contacts the
  harness creates and deletes.

## Coverage matrix (story/FR → test)

| Requirement | Unit (bulk-tools.test.ts) | Integration (live) |
|-------------|---------------------------|--------------------|
| FR-001 array in / report out | tool-def, happy | ✅ report {total,ok,fail,...} |
| FR-002 concurrency cap | concurrency-bound | ✅ concurrency:2 |
| FR-003/008 continue_on_error | continue true/false | — |
| FR-004 single v2 delete | call-args `/contacts/{id}` | ✅ real DELETE 204 |
| FR-005 bounded fan-out | concurrency-bound | — |
| FR-006 429 retry-after | 429-recovery | — (not triggered live) |
| FR-007 report shape | return-shape | ✅ parsed live report |
| FR-011 dry_run | dry_run | — |
| FR-012 401/403 fatal | auth-fatal | — (creds valid) |
| #3 timeout | timeout | — |
| #6 validation | validation matrix | — |
| 204 success / 404 fail | 204/409 unit | ✅ 204 deleted + 404 bad-id failed |
| R3 rate guard | rate-limiter spacing | — |

## Exit criteria
- [x] All unit + contract tests PASS (`vitest run` → 23/23).
- [x] `tsc --noEmit` clean on changed files.
- [x] Live integration proof: create → bulk-delete → confirm 404 gone; bad-id → failed.
- [x] Zero P0/P1 open.

## How to run
```bash
npm run test:run                              # unit + contract (23 tests)
npx tsx scripts/forge-verify-bulk-delete.ts   # live integration (creates+deletes disposable contacts)
```

## Non Production Elements
- Unit tests fake `KeapClient.deleteV2` (vitest vi.fn) — standard boundary double. Promoted by
  the live integration harness (real Keap). No other non-production elements.
