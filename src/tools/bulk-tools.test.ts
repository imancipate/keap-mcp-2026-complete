import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createBulkTools,
  handleBulkDeleteContacts,
  createRateLimiter,
  _resetSharedLimiterForTests,
} from './bulk-tools.js';
import type { KeapClient } from '../clients/keap.js';

// A minimal fake KeapClient exposing only deleteV2 (the sole method the handler uses).
function fakeClient(deleteV2: any): KeapClient {
  return { deleteV2 } as unknown as KeapClient;
}
const axiosErr = (status: number, headers: Record<string, string> = {}) =>
  Object.assign(new Error(`HTTP ${status}`), { response: { status, headers } });

function parseReport(res: { content: Array<{ type: string; text: string }> }) {
  expect(res.content[0].type).toBe('text');
  return JSON.parse(res.content[0].text);
}

describe('keap_bulk_delete_contacts — tool definition', () => {
  it('exposes one tool with a contract-valid schema', () => {
    const tools = createBulkTools(fakeClient(vi.fn()));
    expect(tools).toHaveLength(1);
    const t = tools[0];
    expect(t.name).toBe('keap_bulk_delete_contacts');
    expect(t.name.length).toBeLessThanOrEqual(64);
    expect((t.inputSchema as any).type).toBe('object');
    expect((t.inputSchema as any).required).toEqual(['contact_ids']);
    // draft-2020-12 strictness used by the contract guard
    expect((t.inputSchema as any).properties.contact_ids.items.type).toBe('integer');
    expect(typeof (t.inputSchema as any).properties.contact_ids.items.exclusiveMinimum).not.toBe('boolean');
  });
});

describe('keap_bulk_delete_contacts — validation (#6)', () => {
  it.each([
    ['empty array', []],
    ['not an array', 'nope'],
    ['fractional', [1.5]],
    ['zero', [0]],
    ['negative', [-3]],
  ])('rejects %s and issues no deletes', async (_label, contact_ids) => {
    const deleteV2 = vi.fn();
    await expect(handleBulkDeleteContacts({ contact_ids }, fakeClient(deleteV2))).rejects.toThrow();
    expect(deleteV2).not.toHaveBeenCalled();
  });
});

describe('keap_bulk_delete_contacts — happy path & return shape', () => {
  it('deletes each unique id and returns the report wrapped as MCP content', async () => {
    const deleteV2 = vi.fn().mockResolvedValue(undefined); // 204 = resolve, no body
    const res = await handleBulkDeleteContacts(
      { contact_ids: [1, 2, 3], concurrency: 2 },
      fakeClient(deleteV2)
    );
    const report = parseReport(res);
    expect(report).toMatchObject({ dry_run: false, total: 3, ok: 3, fail: 0, deleted: expect.arrayContaining([1, 2, 3]), failed: [] });
    expect(deleteV2).toHaveBeenCalledTimes(3);
    expect(deleteV2).toHaveBeenCalledWith('/contacts/1', { timeout: 30000 });
  });

  it('dedupes ids (FR + plan §2.2.1)', async () => {
    const deleteV2 = vi.fn().mockResolvedValue(undefined);
    const report = parseReport(await handleBulkDeleteContacts({ contact_ids: [5, 5, 5, 7] }, fakeClient(deleteV2)));
    expect(report.total).toBe(2);
    expect(deleteV2).toHaveBeenCalledTimes(2);
  });
});

describe('keap_bulk_delete_contacts — partial failure (#FR-003/008, 409)', () => {
  it('records 409 as a failure and continues by default', async () => {
    const deleteV2 = vi.fn(async (path: string) => {
      if (path === '/contacts/2') throw axiosErr(409);
      return undefined;
    });
    const report = parseReport(await handleBulkDeleteContacts({ contact_ids: [1, 2, 3] }, fakeClient(deleteV2)));
    expect(report.ok).toBe(2);
    expect(report.fail).toBe(1);
    expect(report.failed[0]).toMatchObject({ id: 2, status: 409 });
  });

  it('continue_on_error=false stops scheduling after first failure', async () => {
    const deleteV2 = vi.fn(async (path: string) => {
      if (path === '/contacts/1') throw axiosErr(500);
      return undefined;
    });
    const report = parseReport(
      await handleBulkDeleteContacts(
        { contact_ids: [1, 2, 3, 4, 5], concurrency: 1, continue_on_error: false },
        fakeClient(deleteV2)
      )
    );
    expect(report.fail).toBeGreaterThanOrEqual(1);
    expect(deleteV2.mock.calls.length).toBeLessThan(5); // stopped early
  });
});

describe('keap_bulk_delete_contacts — 429 recovery (#FR-006)', () => {
  it('retries on 429 (retry-after) then succeeds', async () => {
    let calls = 0;
    const deleteV2 = vi.fn(async () => {
      calls++;
      if (calls === 1) throw axiosErr(429, { 'retry-after': '0' });
      return undefined;
    });
    const report = parseReport(await handleBulkDeleteContacts({ contact_ids: [9] }, fakeClient(deleteV2)));
    expect(report.ok).toBe(1);
    expect(deleteV2).toHaveBeenCalledTimes(2);
  });
});

describe('keap_bulk_delete_contacts — auth is batch-fatal (#5, CR-001/BUG-003)', () => {
  it('aborts on 401 and RETURNS structured partial progress (not a throw)', async () => {
    // First delete succeeds, second hits 401 → batch aborts but the first delete
    // already applied; caller must see it (CR-001/BUG-003).
    let n = 0;
    const deleteV2 = vi.fn(async () => {
      n++;
      if (n === 1) return undefined; // 1 applied
      throw axiosErr(401);
    });
    const report = parseReport(
      await handleBulkDeleteContacts(
        { contact_ids: [1, 2, 3], concurrency: 1, continue_on_error: true },
        fakeClient(deleteV2)
      )
    );
    expect(report.aborted).toBe(true);
    expect(report.fatal_status).toBe(401);
    expect(report.deleted).toContain(1); // partial progress preserved
    expect(report.failed.some((f: any) => f.status === 401)).toBe(true);
    expect(deleteV2.mock.calls.length).toBeLessThan(3); // remaining ids not attempted
  });
});

describe('keap_bulk_delete_contacts — timeout (#3/R2-1)', () => {
  it('passes a timeout and records ECONNABORTED as an uncertain failure', async () => {
    const deleteV2 = vi.fn().mockRejectedValue(Object.assign(new Error('timeout'), { code: 'ECONNABORTED' }));
    const report = parseReport(await handleBulkDeleteContacts({ contact_ids: [1] }, fakeClient(deleteV2)));
    expect(report.fail).toBe(1);
    expect(report.failed[0].status).toBeNull();
    expect(report.failed[0].error).toMatch(/timeout/i);
    expect(deleteV2).toHaveBeenCalledWith('/contacts/1', { timeout: 30000 });
  });
});

describe('keap_bulk_delete_contacts — dry_run', () => {
  it('previews would_delete and issues no deletes', async () => {
    const deleteV2 = vi.fn();
    const report = parseReport(await handleBulkDeleteContacts({ contact_ids: [1, 2, 2], dry_run: true }, fakeClient(deleteV2)));
    expect(report).toMatchObject({ dry_run: true, total: 2, ok: 0, fail: 0, would_delete: [1, 2] });
    expect(deleteV2).not.toHaveBeenCalled();
  });
});

describe('keap_bulk_delete_contacts — concurrency bound', () => {
  it('never exceeds the requested concurrency in-flight', async () => {
    let inFlight = 0;
    let peak = 0;
    const deleteV2 = vi.fn(async () => {
      inFlight++;
      peak = Math.max(peak, inFlight);
      await new Promise((r) => setTimeout(r, 5));
      inFlight--;
    });
    await handleBulkDeleteContacts({ contact_ids: [1, 2, 3, 4, 5, 6, 7, 8], concurrency: 3 }, fakeClient(deleteV2));
    expect(peak).toBeLessThanOrEqual(3);
  });
});

describe('keap_bulk_delete_contacts — fail-fast at high concurrency (CR-001/BUG-002)', () => {
  it('continue_on_error=false stops after the first failure even when concurrency>1', async () => {
    // continue_on_error=false forces serial execution, so the first failure halts
    // the batch with NO further deletes dispatched (bounded blast radius).
    const order: number[] = [];
    const deleteV2 = vi.fn(async (path: string) => {
      order.push(Number(path.split('/').pop()));
      if (path.endsWith('/1')) throw axiosErr(500);
      return undefined;
    });
    const report = parseReport(
      await handleBulkDeleteContacts(
        { contact_ids: [1, 2, 3, 4, 5], concurrency: 5, continue_on_error: false },
        fakeClient(deleteV2)
      )
    );
    expect(deleteV2).toHaveBeenCalledTimes(1); // only id 1 attempted, then stop
    expect(report.fail).toBe(1);
    expect(report.deleted).toEqual([]);
  });
});

describe('keap_bulk_delete_contacts — shared rate limiter across calls (CR-001/BUG-001)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    _resetSharedLimiterForTests();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('two concurrent bulk-delete calls share ONE limiter (aggregate <= MAX_RPS)', async () => {
    const starts: number[] = [];
    const deleteV2 = vi.fn(async () => {
      starts.push(Date.now());
    });
    const c = fakeClient(deleteV2);
    const p1 = handleBulkDeleteContacts({ contact_ids: [1, 2, 3], concurrency: 3 }, c);
    const p2 = handleBulkDeleteContacts({ contact_ids: [4, 5, 6], concurrency: 3 }, c);
    await vi.advanceTimersByTimeAsync(2000);
    await Promise.all([p1, p2]);
    expect(starts.length).toBe(6);
    // MAX_RPS=10 → 100ms spacing. If each call had its OWN limiter, both calls'
    // first deletes would fire at t=0 (gap 0). A shared limiter forces every start
    // ≥100ms apart globally.
    const sorted = [...starts].sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i] - sorted[i - 1]).toBeGreaterThanOrEqual(100);
    }
  });
});

describe('createRateLimiter (#R3 proactive guard)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('spaces acquisitions to <= rps per second', async () => {
    vi.setSystemTime(0);
    const acquire = createRateLimiter(10); // one slot every 100ms
    const order: number[] = [];
    // Fire 5 acquisitions; each resolves only as fake time advances.
    const ps = [0, 1, 2, 3, 4].map((i) => acquire().then(() => order.push(i)));
    await vi.advanceTimersByTimeAsync(0);
    expect(order).toEqual([0]); // first is immediate
    await vi.advanceTimersByTimeAsync(100);
    expect(order).toEqual([0, 1]);
    await vi.advanceTimersByTimeAsync(300);
    expect(order).toEqual([0, 1, 2, 3, 4]); // 4 more slots over 300ms+ at 100ms spacing
    await Promise.all(ps);
  });
});
