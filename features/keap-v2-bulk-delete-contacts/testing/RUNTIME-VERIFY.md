# Runtime Verification Runbook — keap_bulk_delete_contacts

> Purpose: let YOU re-prove the runtime behavior on demand, independent of any prior claim.
> Every check below is a command you run + the output you should see. Nothing here trusts
> a previous report.

## Prereqs
- Repo root `.env` has `KEAP_API_KEY` (used by local checks).
- For the deployed check: `APPROVAL_SECRET` (Cloudflare worker secret) in your shell.
- `node`/`npx` available; `npm install` done at repo root.

---

## 1. Static + unit (offline, ~3s)
```bash
npx vitest run          # or: npm run test:run
npx tsc --noEmit -p tsconfig.json   # ignore pre-existing src/worker.ts Cloudflare-global errors
```
**Expect:** `Tests  26 passed (26)`. tsc reports no errors in `bulk-tools.ts` / `rate-limiter-do.ts` / `register.ts`.
**Proves:** control flow — validation, fail-fast, 429 retry, auth-fatal structured return, dry_run,
rate-limiter spacing, injected limiter. (Mocks the Keap boundary — NOT a runtime proof.)

## 2. Local end-to-end via real MCP protocol (hits live Keap, ~15s)
```bash
npm run verify:e2e
```
Spawns the real stdio MCP server, connects an MCP SDK client, and does
`tools/list` → create 2 disposable contacts → `tools/call keap_bulk_delete_contacts`
→ re-fetch each.
**Expect:**
```
tools/list: ... keap_bulk_delete_contacts present: YES
report: ok=2 fail=1 ...        (the 2 created deleted; 1 bad id 404)
id <n>: gone   id <n>: gone
verdict: ... PASS
```
**Proves:** registration → JSON-RPC → dispatchTool → handler → real Keap DELETE → 404-confirmed.
Creates + deletes only contacts the script itself makes. No mocks.

## 3. Independent deletion check (raw curl, bypasses our code)
After step 2, take a deleted id from its output and:
```bash
KEY=$(grep '^KEAP_API_KEY=' .env | cut -d= -f2-)
curl -s -o /dev/null -w "%{http_code}\n" -H "X-Keap-API-Key: $KEY" \
  https://api.infusionsoft.com/crm/rest/v2/contacts/<deleted-id>      # expect 404
curl -s -o /dev/null -w "%{http_code}\n" -H "X-Keap-API-Key: $KEY" \
  "https://api.infusionsoft.com/crm/rest/v2/contacts?page_size=1"     # expect 200 (control)
```
**Proves:** deletion is real at the Keap API, not just what our tool reported.

## 4. Deployed worker + Durable Object rate limiter (hits prod, ~5s)
```bash
APPROVAL_SECRET='<secret>' npm run verify:deployed
```
Runs the full OAuth flow against `https://keap-mcp.zeyadhq.workers.dev`, then fires 1 call vs
3 concurrent calls of `keap_bulk_delete_contacts` against **non-existent** ids (404 — no real
contact touched).
**Expect:** `bulk present: YES`, and `triple/single ≈ 2x` (3 concurrent calls serialized by the
shared DO budget). A per-call limiter would show ≈1×.
**Proves:** the tool is live on prod over real OAuth+MCP, and the Durable Object shares one rate
budget across concurrent calls.
**Does NOT prove:** true multi-isolate routing (Cloudflare may co-locate requests) — inherent
limitation, not a gap.

## 5. See it in your own MCP client
The tool is deployed. In ClickUp/Claude (or any connected MCP client), refresh/reconnect the
`keap-mcp.zeyadhq.workers.dev/mcp` connection; `keap_bulk_delete_contacts` appears in the tool
list. Call it with `{"contact_ids":[<id>], "dry_run":true}` to preview with zero deletions.

---
Re-run any step anytime. If an output differs from "Expect", that's a real regression — file it
via `/speckit-product-forge-bugfix`.
