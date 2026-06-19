// Cloudflare Worker entry: exposes the Keap MCP server over Streamable-HTTP at
// /mcp, protected by OAuth 2.1 (via @cloudflare/workers-oauth-provider) so
// ClickUp (and other remote MCP clients) can connect.
//
// Auth model: SINGLE STATIC KEAP KEY.
//   - OAuth only gates *client -> this Worker*. A one-time consent screen,
//     protected by APPROVAL_SECRET, lets you authorize ClickUp.
//   - Keap itself is reached server-side with KEAP_API_KEY / KEAP_ACCESS_TOKEN.
//
// The stdio server (src/server.ts) is untouched; both share src/register.ts.
import { OAuthProvider } from '@cloudflare/workers-oauth-provider';
import { createMcpHandler } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from './clients/keap.js';
import { getAllTools, dispatchTool } from './register.js';
import { KeapRateLimiter } from './rate-limiter-do.js';

// Durable Object class must be exported from the worker entry module.
export { KeapRateLimiter };

export interface Env {
  // Secrets (wrangler secret put ...)
  KEAP_API_KEY?: string;
  KEAP_ACCESS_TOKEN?: string;
  APPROVAL_SECRET: string;
  // CR-002/BUG-005: destructive bulk-delete is opt-in. Default OFF.
  KEAP_BULK_DELETE_ENABLED?: string;
  // CR-003/FR-017: human-confirm token required to execute a bulk delete.
  KEAP_BULK_DELETE_CONFIRM?: string;
  // Bindings
  OAUTH_KV: KVNamespace;
  OAUTH_PROVIDER: any;
  // CR-001/BUG-001: global rate-limit lease shared across worker isolates.
  RATE_LIMITER: DurableObjectNamespace;
}

// CR-001/BUG-001: build a cross-instance limiter backed by the single global DO.
// Returns an acquire() the bulk-delete handler awaits before each delete; the DO
// reserves the next slot atomically and returns how long to wait.
function makeDoAcquire(env: Env): () => Promise<void> {
  const stub = env.RATE_LIMITER.get(env.RATE_LIMITER.idFromName('keap-global'));
  return async () => {
    const res = await stub.fetch('https://do.invalid/acquire?rps=10');
    const { wait } = (await res.json()) as { wait: number };
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  };
}

// Build a fresh MCP server per request, wired to the same tool registry the
// stdio server uses. Low-level request handlers keep parity with src/server.ts.
function createKeapMcpServer(env: Env): McpServer {
  const client = new KeapClient(env.KEAP_ACCESS_TOKEN, env.KEAP_API_KEY);
  const acquire = makeDoAcquire(env);
  const bulkDeleteEnabled = env.KEAP_BULK_DELETE_ENABLED === 'true';
  const confirmToken = env.KEAP_BULK_DELETE_CONFIRM; // CR-003/FR-017
  const mcp = new McpServer(
    { name: 'keap-mcp-server', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );
  const low = mcp.server;
  low.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: getAllTools(client, { bulkDeleteEnabled }) }));
  low.setRequestHandler(CallToolRequestSchema, async (request) =>
    dispatchTool(request.params.name, request.params.arguments, client, { acquire, bulkDeleteEnabled, confirmToken })
  );
  return mcp;
}

// Protected MCP endpoint. OAuthProvider only forwards here after a valid token.
const apiHandler = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return createMcpHandler(createKeapMcpServer(env))(request, env, ctx);
  },
};

function consentPage(clientName: string, encodedReq: string, error?: string): Response {
  const html = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Authorize ${clientName}</title>
<style>body{font-family:system-ui,sans-serif;max-width:30rem;margin:4rem auto;padding:0 1rem}
input,button{font-size:1rem;padding:.6rem;width:100%;box-sizing:border-box;margin:.4rem 0}
button{background:#1a73e8;color:#fff;border:0;border-radius:.4rem;cursor:pointer}
.err{color:#c00}</style></head><body>
<h2>Authorize <b>${clientName}</b></h2>
<p>This grants ${clientName} access to your Keap MCP server.</p>
${error ? `<p class="err">${error}</p>` : ''}
<form method="POST" action="/authorize">
  <input type="hidden" name="req" value="${encodedReq}">
  <input type="password" name="secret" placeholder="Approval secret" autofocus required>
  <button type="submit">Approve</button>
</form></body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

// Default handler: implements the OAuth consent UI.
const AuthHandler = {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // One-shot admin endpoint to mint a static OAuth client (e.g. for ClickUp,
    // which requires a manual Client ID/Secret rather than DCR).
    // Protected by APPROVAL_SECRET. POST /admin/mint-client
    //   body (form or query): secret=<APPROVAL_SECRET>&redirect=<callback>&name=<label>
    if (url.pathname === '/admin/mint-client' && request.method === 'POST') {
      const params = url.searchParams;
      // CR-002/BUG-004: admin secret must NOT travel in the query string (leaks to
      // logs/history/observability). Read it from a header; reject query-string use.
      if (params.get('secret')) {
        return new Response('Pass the secret in the x-approval-secret header, not the query string.', { status: 400 });
      }
      const secret = request.headers.get('x-approval-secret') || '';
      const expected = env.APPROVAL_SECRET || '';
      if (!expected || secret.length !== expected.length || secret !== expected) {
        return new Response('Forbidden', { status: 403 });
      }
      const redirect = params.get('redirect');
      if (!redirect) {
        return new Response('Missing ?redirect=', { status: 400 });
      }
      const client = await env.OAUTH_PROVIDER.createClient({
        clientName: params.get('name') || 'ClickUp',
        redirectUris: [redirect],
        tokenEndpointAuthMethod: params.get('auth') || 'client_secret_post',
      });
      return new Response(
        JSON.stringify(
          {
            clientId: client.clientId,
            clientSecret: client.clientSecret,
            redirectUris: client.redirectUris,
            tokenEndpointAuthMethod: client.tokenEndpointAuthMethod,
          },
          null,
          2
        ),
        { headers: { 'content-type': 'application/json' } }
      );
    }

    if (url.pathname !== '/authorize') {
      return new Response('Not found', { status: 404 });
    }

    const lookupName = async (clientId?: string): Promise<string> => {
      try {
        const info = clientId ? await env.OAUTH_PROVIDER.lookupClient(clientId) : null;
        return info?.clientName || 'the client';
      } catch {
        return 'the client';
      }
    };

    if (request.method === 'GET') {
      // The original OAuth params are in the query string here. Parse them and
      // stash them in the form so the POST can complete the grant — a bare POST
      // to /authorize has no query string.
      const oauthReqInfo = await env.OAUTH_PROVIDER.parseAuthRequest(request);
      const encodedReq = btoa(JSON.stringify(oauthReqInfo));
      return consentPage(await lookupName(oauthReqInfo.clientId), encodedReq);
    }

    // POST: rebuild the auth request from the hidden field (NOT from the query).
    const form = await request.formData();
    const encodedReq = String(form.get('req') || '');
    let oauthReqInfo: any;
    try {
      oauthReqInfo = JSON.parse(atob(encodedReq));
    } catch {
      return new Response('Invalid authorization request.', { status: 400 });
    }

    const secret = String(form.get('secret') || '');
    const expected = env.APPROVAL_SECRET || '';
    if (!expected || secret.length !== expected.length || secret !== expected) {
      return consentPage(await lookupName(oauthReqInfo.clientId), encodedReq, 'Incorrect secret.');
    }

    const { redirectTo } = await env.OAUTH_PROVIDER.completeAuthorization({
      request: oauthReqInfo,
      userId: 'owner',
      metadata: { grantedAt: new Date().toISOString() },
      scope: oauthReqInfo.scope ?? [],
      props: { userId: 'owner' },
    });
    return Response.redirect(redirectTo, 302);
  },
};

export default new OAuthProvider({
  apiRoute: '/mcp',
  apiHandler: apiHandler as any,
  defaultHandler: AuthHandler as any,
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/oauth/token',
  clientRegistrationEndpoint: '/oauth/register',
});
