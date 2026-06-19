// Proves (a) the bulk-delete tool is LIVE + runnable on prod, and (b) an external OAuth
// MCP client (the same flow ClickUp uses) can discover + invoke it. Uses dry_run:true so
// the tool executes end-to-end with ZERO deletions (dry_run is confirm-exempt).
import { createHash, randomBytes } from 'node:crypto';
const BASE = 'https://keap-mcp.zeyadhq.workers.dev';
const SECRET = process.env.APPROVAL_SECRET;
const REDIRECT = 'http://localhost:9999/cb';
if (!SECRET) { console.error('APPROVAL_SECRET required'); process.exit(1); }
const b64url = (b) => b.toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

async function token() {
  const u = new URL(BASE + '/admin/mint-client');
  u.searchParams.set('redirect', REDIRECT); u.searchParams.set('name', 'clickup-equivalent-client');
  const c = await (await fetch(u, { method:'POST', headers:{ 'x-approval-secret': SECRET } })).json();
  const v = b64url(randomBytes(32)); const ch = b64url(createHash('sha256').update(v).digest());
  const au = new URL(BASE + '/authorize');
  au.searchParams.set('response_type','code'); au.searchParams.set('client_id',c.clientId);
  au.searchParams.set('redirect_uri',REDIRECT); au.searchParams.set('scope','mcp');
  au.searchParams.set('state',b64url(randomBytes(8))); au.searchParams.set('code_challenge',ch); au.searchParams.set('code_challenge_method','S256');
  const page = await (await fetch(au)).text();
  const req = page.match(/name="req" value="([^"]+)"/)[1];
  const pr = await fetch(BASE + '/authorize', { method:'POST', body:new URLSearchParams({req,secret:SECRET}), redirect:'manual' });
  const code = new URL(pr.headers.get('location')).searchParams.get('code');
  const tr = await (await fetch(BASE + '/oauth/token', { method:'POST', body:new URLSearchParams({grant_type:'authorization_code',code,redirect_uri:REDIRECT,client_id:c.clientId,client_secret:c.clientSecret,code_verifier:v}) })).json();
  return tr.access_token;
}
let id = 1;
async function mcp(tok, method, params) {
  const r = await fetch(BASE + '/mcp', { method:'POST', headers:{'content-type':'application/json',accept:'application/json, text/event-stream',authorization:`Bearer ${tok}`}, body:JSON.stringify({jsonrpc:'2.0',id:id++,method,params}) });
  const t = await r.text(); const line = t.split('\n').find((l)=>l.startsWith('data:')) || t;
  return JSON.parse(line.replace(/^data:\s*/,''));
}

async function main() {
  console.log('(b) external OAuth MCP client connecting to deployed /mcp (same flow as ClickUp)...');
  const tok = await token();
  console.log('   OAuth token acquired:', tok ? 'YES ✅' : 'NO ❌');

  const list = await mcp(tok, 'tools/list', {});
  const t = (list?.result?.tools ?? []).find((x)=>x.name==='keap_bulk_delete_contacts');
  console.log(`(a) tool discoverable in tools/list: ${t ? 'YES ✅' : 'NO ❌'} (total ${(list?.result?.tools||[]).length})`);
  if (t) console.log(`    schema fields: ${Object.keys(t.inputSchema?.properties||{}).join(', ')}`);

  console.log('(a) invoking dry_run (executes end-to-end, ZERO deletions, confirm-exempt)...');
  const res = await mcp(tok, 'tools/call', { name:'keap_bulk_delete_contacts', arguments:{ contact_ids:[111111111, 222222222], dry_run:true } });
  const txt = res?.result?.content?.[0]?.text ?? JSON.stringify(res);
  console.log('    response:', txt.replace(/\s+/g,' ').slice(0,160));
  let report; try { report = JSON.parse(txt); } catch {}
  const runnable = report?.dry_run === true && Array.isArray(report?.would_delete);

  console.log('\n=== verdict ===');
  console.log(`(a) live + runnable on prod: ${runnable ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`(b) reachable + invocable by an external OAuth MCP client (ClickUp-equivalent): ${t && tok ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log('note: real deletion path needs the human-held confirm token (by design); dry_run proves the tool runs.');
}
main().catch((e)=>{ console.error('PROOF ERROR:', e.message); process.exit(1); });
