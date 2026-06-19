# Phase 6 Digest — Implementation

> Feature: `keap-bulk-delete-contacts` | Mode: lite | Date: 2026-06-18

## Files changed
- **NEW** `src/tools/bulk-tools.ts` — `createBulkTools` + `handleBulkTool`/`handleBulkDeleteContacts`.
  Token-bucket limiter (`createRateLimiter`, MAX_RPS=10), bounded worker pool (default 5, cap 10),
  429-retry w/ `retry-after` backoff (recovery only), per-delete 30s timeout, 401/403 batch-fatal,
  positive-safe-integer validation, dedupe, `dry_run`, MCP-wrapped report.
- **EDIT** `src/clients/keap.ts` — `requestV2` defaults `timeout:30000`; `deleteV2(path, opts?)`
  accepts `{timeout, signal}` (backward-compatible; closes the v2-no-timeout gap, R2-#1/R3).
- **EDIT** `src/register.ts` — import + spread `createBulkTools`; exact-name route for
  `keap_bulk_delete_contacts` at top of `dispatchTool`.
- **EDIT** `src/server.ts` — refactored to delegate to `getAllTools()` + `dispatchTool()` (removed
  the duplicated per-domain router; resolves register/server drift, R2-#2; now exposes v2 + bulk
  tools on stdio too).
- **NEW** `src/tools/bulk-tools.test.ts` — 16 vitest tests.

## Evidence (runtime)
```
$ npx tsc --noEmit -p tsconfig.json   # (excluding pre-existing worker.ts Cloudflare-global errors)
  → no errors in changed files
$ npx vitest run
  ✓ src/schema-contract.test.ts  (4)
  ✓ src/register.test.ts         (3)
  ✓ src/tools/bulk-tools.test.ts (16)
  Test Files  3 passed (3)   Tests  23 passed (23)
```
Coverage maps to plan §3: validation (#6), happy/dedupe/return-shape, 204/409, continue_on_error
true+false, 429 retry-after recovery, 401 batch-fatal, timeout (ECONNABORTED) uncertain, dry_run,
concurrency bound, rate-limiter spacing (fake timers). schema-contract.test.ts + register.test.ts
green ⇒ contract + v2-count guards satisfied (rename validated).

## Not yet Done (per Forge runtime-evidence rule)
Unit tests + tsc are NOT runtime proof of the live customer flow. The new tool is NOT deployed
(live worker still runs prior code). Phase 7 (verify) must show the tool deleting a real disposable
contact against live Keap (or a non-destructive live dry_run / known-404 probe) before any Done claim.

## Non Production Elements
- Tests use a mock `KeapClient.deleteV2` (vitest `vi.fn`) — standard test double, not shipped.
  Production behavior: real `KeapClient` hitting `DELETE /contacts/{id}`. Promotion: covered by the
  Phase 7 live run. Owner: this feature. Risk if unpromoted: green tests without a real-Keap delete
  would be a "cardboard Ferrari" — Phase 7 closes it.
