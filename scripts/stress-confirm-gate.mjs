// Stress-test the CR-003 confirm gate on the DEPLOYED worker: prove a delete runs ONLY
// with the correct confirm token. We don't know the real token, so we hammer the gate
// with BOGUS confirms (+ no confirm) and assert it REFUSES with zero deletes. Bogus
// non-existent ids used so nothing real could be harmed even if the gate failed.
import { createHash, randomBytes } from 'node:crypto';
const BASE = 'https://keap-mcp.zeyadhq.workers.dev';
const SECRET = process.env.APPROVAL_SECRET;
const REDIRECT = 'http://localhost:9999/cb';
if (!SECRET) { console.error('APPROVAL_SECRET required'); process.exit(1); }
const b64url = (b) => b.toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

async function token() {
  const u = new URL(BASE + '/admin/mint-client');
  u.searchParams.set('redirect', REDIRECT); u.searchParams.set('name', 'stress-gate');
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
const BOGUS_IDS = [999111001, 999111002]; // non-existent — no real data at risk

async function call(tok, args, label) {
  const res = await mcp(tok, 'tools/call', { name: 'keap_bulk_delete_contacts', arguments: args });
  const txt = res?.result?.content?.[0]?.text ?? JSON.stringify(res);
  let report; try { report = JSON.parse(txt); } catch { report = null; }
  const refused = !!report?.aborted && report?.ok === 0 && /confirm-required/i.test(JSON.stringify(report?.failed||[]));
  console.log(`  ${label}: ${refused ? 'REFUSED ✅ (0 deletes)' : 'NOT REFUSED ❌'} — ${txt.replace(/\s+/g,' ').slice(0,120)}`);
  return refused;
}

async function main() {
  const tok = await token();
  const list = await mcp(tok, 'tools/list', {});
  const present = (list?.result?.tools ?? []).some((t)=>t.name==='keap_bulk_delete_contacts');
  console.log(`tools/list: ${(list?.result?.tools||[]).length} tools; bulk present (enabled): ${present ? 'YES ✅' : 'NO ❌ (enable not propagated?)'}`);
  if (!present) { console.log('enable not propagated yet — re-run shortly'); process.exit(2); }

  console.log('\n=== stress: bogus confirms must be REFUSED (teeth) ===');
  const r1 = await call(tok, { contact_ids: BOGUS_IDS, confirm: 'WRONG-CODE-12345' }, 'wrong confirm');
  const r2 = await call(tok, { contact_ids: BOGUS_IDS }, 'no confirm');
  const r3 = await call(tok, { contact_ids: BOGUS_IDS, confirm: '' }, 'empty confirm');
  const r4 = await call(tok, { contact_ids: BOGUS_IDS, confirm: 'CONFIRM' }, 'guess "CONFIRM"');

  console.log('\n=== verdict ===');
  const allRefused = r1 && r2 && r3 && r4;
  console.log(`all bogus confirms refused: ${allRefused ? 'PASS ✅ — gate has teeth' : 'FAIL ❌ — a bogus code got through'}`);
  console.log('(positive path not tested here — requires the real token, which is human-held by design)');
  if (!allRefused) process.exit(1);
}
main().catch((e)=>{ console.error('STRESS ERROR:', e.message); process.exit(1); });
