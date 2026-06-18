// T-017b — prove the Durable Object rate limiter on the DEPLOYED worker.
// Drives the real OAuth flow, then fires concurrent keap_bulk_delete_contacts
// calls against NON-EXISTENT ids (each goes through DO acquire -> deleteV2 -> 404,
// so the limiter is exercised but NO real contact is deleted). Compares 1-call vs
// 3-concurrent-call wall time: a SHARED DO limiter makes 3 calls take ~3x longer.
import { createHash, randomBytes } from 'node:crypto';

const BASE = 'https://keap-mcp.zeyadhq.workers.dev';
const SECRET = process.env.APPROVAL_SECRET;
const REDIRECT = 'http://localhost:9999/cb';
if (!SECRET) { console.error('APPROVAL_SECRET env required'); process.exit(1); }

const b64url = (buf) => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function mintClient() {
  const u = new URL(BASE + '/admin/mint-client');
  u.searchParams.set('secret', SECRET);
  u.searchParams.set('redirect', REDIRECT);
  u.searchParams.set('name', 'do-proof');
  const r = await fetch(u, { method: 'POST' });
  if (!r.ok) throw new Error(`mint-client ${r.status}: ${await r.text()}`);
  return r.json();
}

async function getToken(clientId, clientSecret) {
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash('sha256').update(verifier).digest());
  const state = b64url(randomBytes(8));
  // GET /authorize -> consent page with hidden encoded req
  const au = new URL(BASE + '/authorize');
  au.searchParams.set('response_type', 'code');
  au.searchParams.set('client_id', clientId);
  au.searchParams.set('redirect_uri', REDIRECT);
  au.searchParams.set('scope', 'mcp');
  au.searchParams.set('state', state);
  au.searchParams.set('code_challenge', challenge);
  au.searchParams.set('code_challenge_method', 'S256');
  const page = await (await fetch(au)).text();
  const m = page.match(/name="req" value="([^"]+)"/);
  if (!m) throw new Error('no req field in consent page');
  // POST /authorize -> 302 redirect with code
  const body = new URLSearchParams({ req: m[1], secret: SECRET });
  const pr = await fetch(BASE + '/authorize', { method: 'POST', body, redirect: 'manual' });
  const loc = pr.headers.get('location');
  if (!loc) throw new Error(`no redirect from /authorize (${pr.status}): ${await pr.text()}`);
  const code = new URL(loc).searchParams.get('code');
  if (!code) throw new Error('no code in redirect: ' + loc);
  // POST /oauth/token
  const tb = new URLSearchParams({
    grant_type: 'authorization_code', code, redirect_uri: REDIRECT,
    client_id: clientId, client_secret: clientSecret, code_verifier: verifier,
  });
  const tr = await fetch(BASE + '/oauth/token', { method: 'POST', body: tb });
  if (!tr.ok) throw new Error(`token ${tr.status}: ${await tr.text()}`);
  const tok = await tr.json();
  return tok.access_token;
}

let rpcId = 1;
async function mcp(token, method, params) {
  const r = await fetch(BASE + '/mcp', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', authorization: `Bearer ${token}` },
    body: JSON.stringify({ jsonrpc: '2.0', id: rpcId++, method, params }),
  });
  const txt = await r.text();
  // Streamable-HTTP may return SSE; extract the JSON data line.
  const line = txt.split('\n').find((l) => l.startsWith('data:')) || txt;
  const json = JSON.parse(line.replace(/^data:\s*/, ''));
  return json;
}

const fakeIds = (n, base) => Array.from({ length: n }, (_, i) => base + i);

async function bulkDelete(token, ids) {
  const res = await mcp(token, 'tools/call', {
    name: 'keap_bulk_delete_contacts',
    arguments: { contact_ids: ids, concurrency: 8 },
  });
  const text = res?.result?.content?.[0]?.text ?? JSON.stringify(res);
  return JSON.parse(text);
}

async function main() {
  console.log('1) mint client'); const c = await mintClient();
  console.log('   clientId:', c.clientId);
  console.log('2) oauth token'); const token = await getToken(c.clientId, c.clientSecret);
  console.log('   token:', token ? 'acquired ✅' : 'MISSING ❌');

  console.log('3) tools/list — is keap_bulk_delete_contacts live on DEPLOYED endpoint?');
  const list = await mcp(token, 'tools/list', {});
  const names = (list?.result?.tools ?? []).map((t) => t.name);
  console.log('   total tools:', names.length, '| bulk present:', names.includes('keap_bulk_delete_contacts') ? 'YES ✅' : 'NO ❌');

  // Warm the DO + confirm the tool runs end-to-end on prod (8 non-existent ids).
  console.log('4) single call, 8 non-existent ids (no real contact touched)');
  let t = Date.now();
  const r1 = await bulkDelete(token, fakeIds(8, 999000001));
  const single = Date.now() - t;
  console.log(`   report: ok=${r1.ok} fail=${r1.fail} total=${r1.total} | wall=${single}ms`);

  console.log('5) 3 CONCURRENT calls, 8 ids each (24 deletes) — DO shared-budget test');
  t = Date.now();
  const rs = await Promise.all([
    bulkDelete(token, fakeIds(8, 999100001)),
    bulkDelete(token, fakeIds(8, 999200001)),
    bulkDelete(token, fakeIds(8, 999300001)),
  ]);
  const triple = Date.now() - t;
  const totalFail = rs.reduce((s, r) => s + r.fail, 0);
  console.log(`   3 reports fail total=${totalFail} (expect 24, all 404) | wall=${triple}ms`);

  console.log('\n=== DO verdict ===');
  console.log(`single(8 deletes)=${single}ms  triple(24 deletes concurrent)=${triple}ms`);
  console.log(`ratio triple/single = ${(triple / single).toFixed(2)}x`);
  console.log('If DO shares ONE global 10rps budget: 24 deletes ≈ 2.3s, and triple ≈ ~3x single.');
  console.log('If limiter were per-call (no DO): 3 calls would run in parallel ≈ ~1x single.');
}
main().catch((e) => { console.error('PROOF ERROR:', e.message); process.exit(1); });
