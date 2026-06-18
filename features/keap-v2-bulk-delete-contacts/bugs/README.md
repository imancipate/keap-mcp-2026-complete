# Bug Tracker: keap-bulk-delete-contacts

> Source: Codex adversarial review (branch vs feat/keap-v2-remote-worker), 2026-06-18
> Resolved via CR-001 (see ../change-log.md), 2026-06-18

## Dashboard
| Severity | Open | Patched | Verified |
|----------|------|---------|----------|
| high | 0 | 0 | 2 |
| medium | 0 | 0 | 1 |
| **Total** | **0** | **0** | **3** |

## Bug List
| ID | Title | Severity | Bucket | Status | Affects |
|----|-------|----------|--------|--------|---------|
| [BUG-001](./BUG-001.md) | Per-invocation rate limiter exceeds shared 25 RPS under concurrency | high | spec-gap | ✅ verified (single-instance; cross-instance deferred) | FR-014 |
| [BUG-002](./BUG-002.md) | `continue_on_error=false` not fail-fast at concurrency>1 | high | spec-gap / untested-flow | ✅ verified | FR-013 |
| [BUG-003](./BUG-003.md) | Auth-fatal discards partial progress | medium | spec-gap | ✅ verified | FR-012 |

## Disposition
All three were **spec-gap** (code matched the written contracts; the contracts were too weak
for a destructive concurrent path). Resolved via **CR-001**: spec amended (FR-012 updated,
FR-013/FR-014 added), code fixed in `src/tools/bulk-tools.ts`, 25/25 tests pass, real MCP E2E
re-run against live Keap.

**Residual — now implemented (2026-06-18):** BUG-001 cross-INSTANCE coordination is built via a
Durable Object (`src/rate-limiter-do.ts`, `KeapRateLimiter`), wired in `src/worker.ts` and
injected through `dispatchTool`. tsc + 26/26 tests + `wrangler deploy --dry-run` pass. The only
unproven aspect is true multi-isolate serialization under deployed concurrent load (requires
deploy).
