// Phase 8B — TRUE E2E via the MCP protocol (not a direct handler call).
// Spawns the real stdio MCP server, connects an MCP SDK client, and drives
// tools/list + tools/call against LIVE Keap. Creates + deletes disposable contacts.
import { config } from 'dotenv';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

config({ path: new URL('../../../.env', import.meta.url).pathname }); // repo-root .env → KEAP_API_KEY

const TOOL = 'keap_bulk_delete_contacts';
const text = (r: any) => r?.content?.[0]?.text ?? '';
const json = (r: any) => { try { return JSON.parse(text(r)); } catch { return null; } };

async function main() {
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['tsx', 'src/main.ts'],
    // CR-002/BUG-005: the destructive tool is opt-in; enable it for this E2E run.
    env: { ...process.env, KEAP_API_KEY: process.env.KEAP_API_KEY || '', KEAP_BULK_DELETE_ENABLED: 'true' },
  });
  const client = new Client({ name: 'forge-e2e', version: '1.0.0' }, { capabilities: {} });
  await client.connect(transport);
  console.log('MCP client connected (initialize ok)');

  // 1) tools/list — prove the new tool is registered & served over MCP
  const list = await client.listTools();
  const found = list.tools.find((t: any) => t.name === TOOL);
  console.log(`tools/list: ${list.tools.length} tools; ${TOOL} present: ${found ? 'YES ✅' : 'NO ❌'}`);
  if (!found) throw new Error(`${TOOL} not exposed via MCP tools/list`);

  // 2) create 2 disposable contacts THROUGH MCP (tools/call keap_create_contact)
  const stamp = Date.now();
  const ids: number[] = [];
  for (let i = 0; i < 2; i++) {
    const res = await client.callTool({
      name: 'keap_create_contact',
      arguments: { given_name: 'ForgeE2E', family_name: `Disp${i}`, email: `forge.e2e.${stamp}.${i}@example.com` },
    });
    const body = json(res);
    const id = Number(body?.id ?? body?.contact?.id);
    if (!Number.isFinite(id)) throw new Error(`create did not return id via MCP: ${text(res)}`);
    ids.push(id);
    console.log(`created via MCP: contact ${id}`);
  }

  const badId = 999999999;
  // 3) bulk delete THROUGH MCP
  const delRes = await client.callTool({ name: TOOL, arguments: { contact_ids: [...ids, badId], concurrency: 2 } });
  const report = json(delRes);
  console.log('\n=== tools/call keap_bulk_delete_contacts report ===');
  console.log(JSON.stringify(report, null, 2));

  // 4) confirm gone THROUGH MCP (tools/call keap_v2_get_contact → error/404)
  console.log('\n=== post-delete verification via MCP ===');
  for (const id of ids) {
    const g = await client.callTool({ name: 'keap_v2_get_contact', arguments: { contact_id: String(id) } });
    const t = text(g);
    const gone = (g as any).isError || /404|not found|unable to find/i.test(t);
    console.log(`id ${id}: ${gone ? 'gone ✅' : 'STILL EXISTS ❌'}`);
  }

  // 5) verdict
  const okSet = new Set(report?.deleted ?? []);
  const createdDeleted = ids.every((id) => okSet.has(id));
  const badFailed = (report?.failed ?? []).some((f: any) => f.id === badId);
  console.log('\n=== verdict (E2E via MCP) ===');
  console.log(`tool served via MCP: PASS ✅`);
  console.log(`created contacts deleted: ${createdDeleted ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`bad id recorded as failure: ${badFailed ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`report.ok=${report?.ok} report.fail=${report?.fail} total=${report?.total}`);

  await client.close();
  if (!createdDeleted || !badFailed) process.exit(1);
}

main().catch((e) => { console.error('E2E ERROR:', e?.message || e); process.exit(1); });
