# Release Readiness: keap-bulk-delete-contacts

> Date: 2026-06-18 | Verdict: **CONDITIONALLY READY**
> Focus: ship without regressing current capability.

## No-regression evidence (the headline)
Ran `scripts/deployed-regression-check.mjs` against the **live deployed** worker (real OAuth + MCP):
- `tools/list`: total **456**, **v2=343** → full pre-existing tool set intact (additive change).
- `keap_list_contacts` (existing) → returns real contacts ✅
- `keap_v2_list_tags` (existing) → returns real tags ✅
- `keap_bulk_delete_contacts` (new) present + proven (see test-report.md / RUNTIME-VERIFY.md).
**Conclusion:** the deploy is ADDITIVE — one new tool + an unused-by-existing-tools Durable
Object. Existing capability verified working post-deploy. No regression observed.

Why low regression risk by construction:
- New tool has a unique name; routed by an exact-name branch placed BEFORE existing routing.
- `server.ts` refactor only affects the **stdio** transport (not prod); prod is `worker.ts`,
  whose routing was already `dispatchTool` and is unchanged except an additive `{acquire}` arg.
- `keap.ts` change is backward-compatible (`deleteV2` gained an optional 2nd arg; `requestV2`
  gained a default timeout). All 343 generated v2 tools use the same client unchanged → covered
  by the regression check above (343 still present + 2 sampled read tools work).

## Prior quality gates
| Gate | Status |
|------|--------|
| Verify (Phase 7) | ✅ incl. live-Keap runtime evidence |
| Runtime acceptances executed | ✅ real MCP E2E (create→delete→404) + deployed DO proof |
| Test run (8B) | ✅ 26 unit + MCP E2E |
| Code review | ✅ Codex adversarial (3 spec-gaps → CR-001, all fixed/verified) |

## Rollback plan
- **reversible:** true | **mechanism:** revert_deploy
- Steps: `wrangler rollback` (or `wrangler deployments list` → redeploy a prior version id from
  2026-06-12). DO migration `v1` is additive; rolling the script back leaves the unused DO
  namespace harmless (no existing tool references it).
- Trigger: any existing tool erroring post-deploy, or auth/OAuth breakage.

## Feature flags
No flag system in this project. The new tool is **always-on** and additive. It is DESTRUCTIVE
but inert unless explicitly called with `contact_ids`. No flag created (none to register).
Action item (SHOULD): if you want a kill-switch, gate `keap_bulk_delete_contacts` behind an env
var check — out of current scope.

## Monitoring
`wrangler.jsonc` has `observability.enabled: true` → Workers logs/analytics capture invocations
+ the `[keap_bulk_delete_contacts] executing:` audit line. No NewRelic provider skill installed
→ dashboard.json action item deferred.

## Action items before "READY TO SHIP"
| # | Action | Priority |
|---|--------|:--------:|
| 1 | Merge PR #3 so prod matches reviewed/merged base (prod currently runs unmerged branch code) | MUST |
| 2 | Decide kill-switch for the destructive tool (env gate) or accept always-on | SHOULD |
| 3 | DO multi-isolate behavior unproven at scale (only cross-call proven) — accept or load-test | SHOULD |
| 4 | Revoke leftover test OAuth client `wj5RzQDmYJzCw9Xh`; rotate APPROVAL_SECRET (shown in chat) | SHOULD |

## Verdict: CONDITIONALLY READY
Re: your concern — **no regression to current capability (proven live)**, rollback ready. The
conditions above are process/hygiene, not regression risks. Not "READY TO SHIP" only because
prod is running unmerged code (item 1) and the destructive tool has no kill-switch (item 2).

## Non Production Elements
None in the shipped code. The regression/proof scripts under `scripts/` are verification
harnesses, not runtime elements. The leftover test OAuth client (item 4) is a test artifact to
clean up.
