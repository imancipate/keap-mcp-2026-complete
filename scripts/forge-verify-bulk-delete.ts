// Phase 7 runtime proof — REAL Keap, no mocks.
// create disposable contacts -> bulk delete via the actual handler -> confirm gone.
import { config } from 'dotenv';
import { KeapClient } from '../src/clients/keap.js';
import { handleBulkDeleteContacts } from '../src/tools/bulk-tools.js';

config({ path: new URL('../../../.env', import.meta.url).pathname }); // repo-root .env

async function main() {
  const client = new KeapClient();
  const stamp = Date.now();

  // 1) create 2 disposable contacts via real Keap v2
  const created: number[] = [];
  for (let i = 0; i < 2; i++) {
    const body = {
      given_name: 'ForgeBulkDeleteTest',
      family_name: `Disposable${i}`,
      email_addresses: [{ email: `forge.bulkdelete.${stamp}.${i}@example.com`, field: 'EMAIL1' }],
    };
    const res: any = await client.postV2('/contacts', body);
    const id = Number(res?.id ?? res?.contact?.id);
    if (!Number.isFinite(id)) throw new Error(`create returned no id: ${JSON.stringify(res)}`);
    created.push(id);
    console.log(`created contact ${id}`);
  }

  const badId = 999999999; // known-nonexistent → must land in failed[]
  const ids = [...created, badId];

  // 2) REAL bulk delete via the actual handler
  const out = await handleBulkDeleteContacts({ contact_ids: ids, concurrency: 2 }, client);
  const report = JSON.parse(out.content[0].text);
  console.log('\n=== bulk delete report ===');
  console.log(JSON.stringify(report, null, 2));

  // 3) confirm each created contact is actually GONE (re-fetch → 404)
  console.log('\n=== post-delete verification ===');
  for (const id of created) {
    try {
      await client.getV2(`/contacts/${id}`);
      console.log(`id ${id}: STILL EXISTS ❌`);
    } catch (e: any) {
      const status = e?.response?.status ?? null;
      console.log(`id ${id}: gone (HTTP ${status}) ${status === 404 ? '✅' : '?'}`);
    }
  }

  // 4) assertions
  const okSet = new Set(report.deleted);
  const createdDeleted = created.every((id) => okSet.has(id));
  const badFailed = report.failed.some((f: any) => f.id === badId);
  console.log('\n=== verdict ===');
  console.log(`created contacts deleted: ${createdDeleted ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`bad id recorded as failure: ${badFailed ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`report.ok=${report.ok} report.fail=${report.fail} total=${report.total}`);
  if (!createdDeleted || !badFailed) process.exit(1);
}

main().catch((e) => {
  console.error('RUNTIME PROOF ERROR:', e?.response?.status, e?.message || e);
  process.exit(1);
});
