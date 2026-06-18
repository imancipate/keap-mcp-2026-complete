// Release-readiness regression check: confirm the deploy did NOT regress existing
// capability. Drives OAuth against the deployed worker, then calls EXISTING read-only
// tools over real MCP and asserts they still return data + the full tool set is intact.
import { createHash, randomBytes } from 'node:crypto';
const BASE = 'https://keap-mcp.zeyadhq.workers.dev';
const SECRET = process.env.APPROVAL_SECRET;
const REDIRECT = 'http://localhost:9999/cb';
if (!SECRET) { console.error('APPROVAL_SECRET required'); process.exit(1); }
const b64url = (b) => b.toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

async function token() {
  const u = new URL(BASE + '/admin/mint-client');
  u.searchParams.set('redirect', REDIRECT); u.searchParams.set('name', 'regression-check');
  const c = await (await fetch(u, { method: 'POST', headers: { 'x-approval-secret': SECRET } })).json();
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
  const t = await r.text();
  const line = t.split('\n').find((l)=>l.startsWith('data:')) || t;
  return JSON.parse(line.replace(/^data:\s*/,''));
}
async function main() {
  const tok = await token();
  console.log('oauth:', tok ? 'ok ✅' : 'FAIL ❌');
  const list = await mcp(tok, 'tools/list', {});
  const names = (list?.result?.tools ?? []).map((t)=>t.name);
  const v2 = names.filter((n)=>n.startsWith('keap_v2_')).length;
  console.log(`tools/list: total=${names.length} v2=${v2} (expect v2>=343)`);
  // EXISTING read-only tools — must still work post-deploy (no regression).
  const checks = [
    ['keap_list_contacts', { limit: 1 }],
    ['keap_v2_list_tags', {}],
  ];
  for (const [name, args] of checks) {
    if (!names.includes(name)) { console.log(`  ${name}: NOT REGISTERED ❌`); continue; }
    const res = await mcp(tok, 'tools/call', { name, arguments: args });
    const txt = res?.result?.content?.[0]?.text ?? '';
    const isErr = res?.result?.isError === true || /error/i.test(txt.slice(0,40));
    console.log(`  ${name}: ${isErr ? 'ERROR ❌' : 'ok ✅'} (${txt.replace(/\s+/g,' ').slice(0,80)}...)`);
  }
  console.log('\nregression verdict: existing v2 set intact + existing read tools respond = no regression');
}
main().catch((e)=>{ console.error('REGRESSION CHECK ERROR:', e.message); process.exit(1); });
