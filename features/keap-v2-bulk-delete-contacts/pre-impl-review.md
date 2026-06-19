# Pre-Implementation Review — CR-003 confirm-gate (FR-017)

> Date: 2026-06-18 | Phase 5C | Scope: confirm-gate only (rest of feature already shipped)

## Design review
- Token is server-env-held (`KEAP_BULK_DELETE_CONFIRM`), threaded as `confirmToken` via the same
  opts path as `bulkDeleteEnabled` → consistent with existing pattern, transport-agnostic. ✅
- Gate placed AFTER dry_run short-circuit (preview exempt) and BEFORE the worker pool → no
  deleteV2 call can precede the check. ✅
- Refusal returns a structured report (not a throw) so callers see "confirm-required" clearly,
  mirroring the auth-fatal structured return (FR-012). ✅

## Risk register
| Risk | Sev | Mitigation |
|------|-----|------------|
| Token leaks into model context (human pastes it) | Med | Inherent to single-channel MCP; documented. True air-gap = two-phase (backlog). Per-batch human action still required. |
| Token unset in env → tool unusable even when enabled | Low | Refusal message names the env var; documented in release-readiness. Default-deny is the safe failure. |
| Schema exposes a `confirm` field → model guesses value | Low | Field exists but value is server-side; description states a human must supply it. Empty/guessed ≠ token → refused. |
| Existing E2E/proof scripts break (now need confirm) | Low | Update scripts to pass confirm from env; covered in T-026. |
| Bypass via dry_run | N/A | dry_run never deletes — exemption is safe by construction. |

## Architecture conformance
Same handler/return conventions, same opts-threading as bulkDeleteEnabled/acquire. No new
dependency. inputSchema stays draft-2020-12 clean (string field, no banned keywords).

## Verdict: APPROVED for implementation
Conditions: AC-1..5 tests must pass; scripts updated; default-deny when token unset.

## Non Production Elements
None. Review artifact; no code changed.
