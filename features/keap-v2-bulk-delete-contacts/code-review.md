# Phase 6B — Code Review: CR-003 confirm-gate

> Date: 2026-06-18 | Scope: CR-003 diff (bulk-tools.ts handler, register/worker/server wiring)
> Verdict: APPROVED with code-quality findings (no spec-violations / no FR-017 drift)

## Findings (severity-tagged; for fix-findings)
| ID | Sev | Practice | Location | Issue | Fix |
|----|-----|----------|----------|-------|-----|
| REV-001 | WARNING | DRY | bulk-tools.ts handler | 4× `BulkDeleteReport` literal + 4× `{content:[{type,text:JSON}]}` wrap | `wrap(report)` helper + `makeReport(partial)` factory |
| REV-002 | WARNING | Magic value | confirm-refusal + auth-fatal | `{id:-1}` sentinel in `failed[]` (fake contact id) | named const / `batch_error` field |
| REV-003 | WARNING(low) | Security | confirm compare (+ worker APPROVAL_SECRET) | non-constant-time string compare on secret | `crypto.timingSafeEqual` |
| REV-004 | INFO | YAGNI | `deleteV2(path,{signal})` | `signal` accepted, never passed | drop until needed |
| REV-005 | INFO | SRP/LoD/encapsulation | handler length, `err?.response?.data?.message`, `_resetSharedLimiterForTests` export | minor | optional cleanups |

## AC coverage (FR-017): AC-1..5 all ✅ (tests + local E2E). No contract drift.

## Disposition — REMEDIATED via fix-findings (2026-06-18)
| ID | Status |
|----|--------|
| REV-001 DRY | ✅ fixed — `wrap()` + `makeReport()` helpers; 4 return sites collapsed |
| REV-002 magic -1 | ✅ fixed — `BATCH_ERROR_ID` named const |
| REV-003 constant-time | ✅ fixed — `safeEqual()` pure-JS constant-time compare for confirm |
| REV-004 unused signal | ✅ fixed — dropped from `deleteV2` opts |
| REV-005 SRP/LoD/test-export | ⏸ deferred (optional; low value) |
Verified after remediation: tsc clean, 35/35 tests, local MCP E2E (create→delete→404).

## Non Production Elements
None. Review artifact.
