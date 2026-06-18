// CR-001/BUG-001 (cross-instance): a Cloudflare Durable Object that holds the GLOBAL
// token-bucket cursor for the Keap rate budget. All worker isolates route to a single
// DO instance (one id, "keap-global"), so concurrent bulk-delete requests across
// isolates share one 25 req/s/app budget. A Durable Object is the correct primitive
// here: single-threaded + strongly consistent per id. (KV is eventually consistent →
// unsafe for atomic rate leasing.)
//
// The DO does NOT sleep — it atomically RESERVES the next slot and returns the wait
// (ms) the caller must observe before issuing its request. Reservation is the
// serialization point; the caller's sleep just spaces its own dispatch.

// Minimal structural type for the DO ctor; avoids a hard dep on @cloudflare/workers-types
// at module scope (worker.ts already references the Cloudflare globals).
interface MinimalDurableObjectState {
  // storage is available but we keep the cursor in-memory: a single live DO instance
  // serves all requests; eviction merely resets to 0 (briefly relaxes, never overruns
  // beyond one interval). Documented tradeoff vs persisting every reservation.
  storage?: unknown;
}

export class KeapRateLimiter {
  private nextSlot = 0;

  constructor(_state: MinimalDurableObjectState, _env: unknown) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const rps = Number(url.searchParams.get('rps')) || 10;
    const interval = 1000 / rps;
    const now = Date.now();
    const start = Math.max(now, this.nextSlot);
    this.nextSlot = start + interval;
    const wait = Math.max(0, start - now);
    return new Response(JSON.stringify({ wait }), {
      headers: { 'content-type': 'application/json' },
    });
  }
}
