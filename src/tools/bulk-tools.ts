import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

// ─────────────────────────────────────────────────────────────────────────────
// keap_bulk_delete_contacts — deterministic, client-side bulk delete.
//
// Keap exposes NO bulk-contact-delete endpoint (only emails:batchRemove,
// automationCategory, tag removeTags). This tool fans out the existing v2 single
// delete (DELETE /contacts/{id}, success 204) server-side, with NO LLM in the loop.
//
// Rate contract (developer.infusionsoft.com, verified 2026-06-18): the binding
// limit is 25 calls/sec/app, shared across this worker's single Keap credential.
// Reactive 429 backoff is recovery, not prevention — so a PROACTIVE token-bucket
// limiter (MAX_RPS) is the primary guard; 429 + retry-after is the recovery layer.
// ─────────────────────────────────────────────────────────────────────────────

const MAX_RPS = 10;            // proactive cap, conservative under the 25/s spike
const DEFAULT_CONCURRENCY = 5; // parallelism knob only (in-flight bound)
const MAX_CONCURRENCY = 10;
const PER_DELETE_TIMEOUT_MS = 30000;
const MAX_RETRIES = 3;         // 429 recovery only
const BASE_BACKOFF_MS = 500;

export interface BulkDeleteFailure {
  id: number;
  status: number | null;
  error: string;
}
export interface BulkDeleteReport {
  dry_run: boolean;
  total: number;
  ok: number;
  fail: number;
  deleted: number[];
  failed: BulkDeleteFailure[];
  would_delete?: number[];
  // CR-001/BUG-003: on a fatal auth abort, return partial progress instead of
  // throwing, so callers know exactly which deletes already applied (irreversible).
  aborted?: boolean;
  fatal_status?: number;
  attempted?: number;
}

export function createBulkTools(_client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_bulk_delete_contacts',
      description:
        'Delete MANY Keap contacts in one call (DESTRUCTIVE). Deterministic server-side ' +
        'fan-out over the single contact delete with a proactive rate limit and 429 ' +
        'backoff; returns a per-ID report. Set dry_run=true to preview without deleting. ' +
        'Keap has no native bulk-contact-delete endpoint.',
      inputSchema: {
        type: 'object',
        properties: {
          contact_ids: {
            type: 'array',
            items: { type: 'integer', minimum: 1 },
            description: 'Contact IDs to delete (positive integers).',
          },
          concurrency: {
            type: 'integer',
            minimum: 1,
            maximum: MAX_CONCURRENCY,
            description: `Parallel in-flight deletes. Default ${DEFAULT_CONCURRENCY}, max ${MAX_CONCURRENCY}.`,
          },
          continue_on_error: {
            type: 'boolean',
            description: 'Keep going after a per-ID failure. Default true.',
          },
          dry_run: {
            type: 'boolean',
            description: 'Preview only — validate IDs and report would_delete, delete nothing. Default false.',
          },
          confirm: {
            type: 'string',
            description:
              'REQUIRED to actually delete (CR-003/FR-017): must equal the server confirm token ' +
              '(env KEAP_BULK_DELETE_CONFIRM), which a human supplies per batch. Omit/wrong = refused. ' +
              'Not needed for dry_run.',
          },
        },
        required: ['contact_ids'],
      },
    },
  ];
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// Min-interval token bucket: caps aggregate starts to `rps` per second across all
// workers, regardless of concurrency. This is the real rate guard.
export function createRateLimiter(rps: number): () => Promise<void> {
  const interval = 1000 / rps;
  let next = 0;
  return async function acquire(): Promise<void> {
    const now = Date.now();
    const start = Math.max(now, next);
    next = start + interval;
    const wait = start - now;
    if (wait > 0) await sleep(wait);
  };
}

// CR-001/BUG-001: a PROCESS-GLOBAL limiter shared across ALL invocations in this
// worker instance. The Keap 25 req/s spike limit is per-app (one shared credential),
// so a per-call limiter would let concurrent tool calls collectively overrun it. This
// module-scope state serializes the rate budget across overlapping requests.
// (Cross-INSTANCE coordination — multiple worker isolates — remains out of scope;
// would need Durable Objects / KV leasing. Single-instance worker is the deploy target.)
let _sharedNext = 0;
async function sharedAcquire(): Promise<void> {
  const interval = 1000 / MAX_RPS;
  const now = Date.now();
  const start = Math.max(now, _sharedNext);
  _sharedNext = start + interval;
  const wait = start - now;
  if (wait > 0) await sleep(wait);
}
// Test-only: reset the global limiter's cursor so a unit test isn't affected by the
// rate budget consumed by earlier tests/calls in the same process.
export function _resetSharedLimiterForTests(): void {
  _sharedNext = 0;
}

function statusOf(err: any): number | null {
  const s = err?.response?.status;
  return typeof s === 'number' ? s : null;
}

function retryAfterMs(err: any, attempt: number): number {
  // Keap documents respecting the `retry-after` header (seconds). Fall back to
  // exponential backoff with jitter when absent.
  const hdr = err?.response?.headers?.['retry-after'];
  const secs = hdr !== undefined ? Number(hdr) : NaN;
  if (Number.isFinite(secs) && secs >= 0) return secs * 1000;
  const jitter = Math.floor((attempt * 37) % 100); // deterministic-ish, no Math.random dependency
  return BASE_BACKOFF_MS * 2 ** attempt + jitter;
}

// Deletes one contact, retrying ONLY on 429 (recovery layer). All other outcomes
// (incl. timeout ECONNABORTED, 404, 409, 401/403) propagate to the caller.
async function deleteOne(client: KeapClient, id: number): Promise<void> {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await client.deleteV2(`/contacts/${id}`, { timeout: PER_DELETE_TIMEOUT_MS });
      return;
    } catch (err: any) {
      if (statusOf(err) === 429 && attempt < MAX_RETRIES) {
        await sleep(retryAfterMs(err, attempt));
        attempt++;
        continue;
      }
      throw err;
    }
  }
}

function errorMessage(err: any): string {
  if (err?.code === 'ECONNABORTED' || /timeout/i.test(err?.message || '')) {
    return 'timeout (delete may or may not have been applied — re-query to confirm)';
  }
  return err?.response?.data?.message || err?.message || String(err);
}

export async function handleBulkDeleteContacts(
  args: any,
  client: KeapClient,
  // CR-001/BUG-001 (cross-instance): callers running on multiple worker isolates
  // pass a shared limiter (Durable Object-backed) so the 25 req/s budget is
  // enforced GLOBALLY. When omitted, falls back to the process-global limiter
  // (correct for single-instance / stdio).
  acquireOverride?: () => Promise<void>,
  // CR-003/FR-017: the server confirm token. A real delete runs only if args.confirm
  // matches it. undefined/'' means the gate is unconfigured → default-deny.
  expectedConfirm?: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const raw = args?.contact_ids;
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error('contact_ids must be a non-empty array of positive integer contact IDs.');
  }
  for (const v of raw) {
    if (!Number.isSafeInteger(v) || v <= 0) {
      throw new Error(`Invalid contact id ${JSON.stringify(v)} — contact_ids must be positive integers.`);
    }
  }
  // Dedupe, preserving first-seen order.
  const ids: number[] = [...new Set<number>(raw)];

  const continueOnError = args?.continue_on_error !== false; // default true
  const dryRun = args?.dry_run === true;
  let concurrency = Number.isSafeInteger(args?.concurrency) ? args.concurrency : DEFAULT_CONCURRENCY;
  concurrency = Math.max(1, Math.min(MAX_CONCURRENCY, concurrency));
  // CR-001/BUG-002: deterministic fail-fast for a DESTRUCTIVE op. With >1 worker,
  // in-flight deletes already dispatched cannot be recalled, so "stop on first
  // error" can only be honored exactly by running serially. Force concurrency=1
  // when continue_on_error is false.
  if (!continueOnError) concurrency = 1;

  if (dryRun) {
    const report: BulkDeleteReport = {
      dry_run: true,
      total: ids.length,
      ok: 0,
      fail: 0,
      deleted: [],
      failed: [],
      would_delete: ids,
    };
    return { content: [{ type: 'text', text: JSON.stringify(report, null, 2) }] };
  }

  // CR-003/FR-017: human-confirm gate. dry_run already returned above (preview is exempt).
  // A real delete proceeds ONLY if the caller's confirm matches the server token. Default-deny
  // when the token is unset. Protects against an autonomous LLM self-authorizing deletes.
  if (!expectedConfirm || args?.confirm !== expectedConfirm) {
    const report: BulkDeleteReport = {
      dry_run: false,
      aborted: true,
      attempted: 0,
      total: ids.length,
      ok: 0,
      fail: 0,
      deleted: [],
      failed: [
        { id: -1, status: null, error: 'confirm-required: missing or incorrect confirm token — no deletes performed (CR-003/FR-017). A human must supply the server confirm token.' },
      ],
    };
    console.error(`[keap_bulk_delete_contacts] REFUSED: confirm gate (${ids.length} ids not deleted)`);
    return { content: [{ type: 'text', text: JSON.stringify(report, null, 2) }] };
  }

  // Audit log for a destructive bulk operation (goes to server stderr, not MCP output).
  console.error(`[keap_bulk_delete_contacts] executing: ${ids.length} unique ids, concurrency=${concurrency}, dry_run=false`);
  // CR-001/BUG-001: prefer an injected cross-instance limiter (DO-backed) when the
  // worker provides one; otherwise the process-global limiter.
  const acquire = acquireOverride ?? sharedAcquire;
  const deleted: number[] = [];
  const failed: BulkDeleteFailure[] = [];
  let cursor = 0;
  let stop = false;
  // Object-property sentinel (not a `let`): TS won't over-narrow a property across
  // the closure mutation the way it would a local variable.
  const ctl: { fatalStatus: number | null } = { fatalStatus: null };

  async function worker(): Promise<void> {
    while (true) {
      if (stop || ctl.fatalStatus !== null) return;
      const i = cursor++;
      if (i >= ids.length) return;
      const id = ids[i];

      await acquire(); // proactive rate guard
      if (stop || ctl.fatalStatus !== null) return;

      try {
        await deleteOne(client, id);
        deleted.push(id);
      } catch (err: any) {
        const status = statusOf(err);
        // Shared credential: auth failure means EVERY delete will fail identically.
        // Fail fast instead of spamming N identical 401/403s.
        if (status === 401 || status === 403) {
          ctl.fatalStatus = status;
          return;
        }
        failed.push({ id, status, error: errorMessage(err) });
        if (!continueOnError) {
          stop = true;
          return;
        }
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  // CR-001/BUG-003: on a fatal auth abort, do NOT throw away partial progress.
  // Some deletes may already have applied (irreversible) — return a structured
  // report so the caller knows exactly what was removed before the abort.
  if (ctl.fatalStatus !== null) {
    const report: BulkDeleteReport = {
      dry_run: false,
      aborted: true,
      fatal_status: ctl.fatalStatus,
      attempted: deleted.length + failed.length,
      total: ids.length,
      ok: deleted.length,
      fail: failed.length,
      deleted,
      failed: [
        ...failed,
        { id: -1, status: ctl.fatalStatus, error: `Keap auth failed (HTTP ${ctl.fatalStatus}) — batch aborted; remaining ids not attempted` },
      ],
    };
    return { content: [{ type: 'text', text: JSON.stringify(report, null, 2) }] };
  }

  const report: BulkDeleteReport = {
    dry_run: false,
    total: ids.length,
    ok: deleted.length,
    fail: failed.length,
    deleted,
    failed,
  };
  return { content: [{ type: 'text', text: JSON.stringify(report, null, 2) }] };
}

export async function handleBulkTool(
  name: string,
  args: any,
  client: KeapClient,
  acquireOverride?: () => Promise<void>,
  expectedConfirm?: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  if (name === 'keap_bulk_delete_contacts') {
    return handleBulkDeleteContacts(args, client, acquireOverride, expectedConfirm);
  }
  throw new Error(`Unknown bulk tool: ${name}`);
}
