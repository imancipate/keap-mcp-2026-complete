import { describe, it, expect, vi } from 'vitest';
import { getAllTools, dispatchTool } from './register.js';
import { KeapClient } from './clients/keap.js';
import { v2ToolNames } from './tools/v2-generated-tools.js';

function fakeClient(): KeapClient {
  // Construct with a dummy key so the constructor's required-credential guard passes.
  return new KeapClient(undefined, 'test-key');
}

describe('register', () => {
  it('getAllTools returns the full keap tool set, all keap_-prefixed and uniquely named', () => {
    const tools = getAllTools(fakeClient());
    expect(tools.length).toBeGreaterThan(100);
    expect(tools.every((t) => t.name.startsWith('keap_'))).toBe(true);
    const names = tools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('exposes the full v2 operation set (one tool per spec operation)', () => {
    const tools = getAllTools(fakeClient());
    const v2 = tools.filter((t) => t.name.startsWith('keap_v2_'));
    // The Keap v2 OpenAPI spec defines 343 operations; the generator emits one
    // tool per operation. Locked to v2ToolNames() so this tracks regeneration.
    expect(v2.length).toBe(v2ToolNames().length);
    expect(v2.length).toBeGreaterThanOrEqual(343);
    // every v2 tool has a valid object inputSchema
    expect(v2.every((t) => (t.inputSchema as any)?.type === 'object')).toBe(true);
    // unique across the whole v2 set
    expect(new Set(v2.map((t) => t.name)).size).toBe(v2.length);
  });

  it('dispatchTool routes every v2 tool name to the v2 handler (atom 2 + 6: routed, deterministic)', async () => {
    const client = fakeClient();
    // Stub the v2 transport so no real Keap call happens; just prove routing reaches it.
    const spy = vi.spyOn(client, 'requestV2').mockResolvedValue({ ok: true } as any);
    for (const name of v2ToolNames()) {
      const res = await dispatchTool(name, {}, client);
      // routed handler returns MCP content, never "Unknown tool"
      expect(JSON.stringify(res)).not.toContain('Unknown tool');
    }
    expect(spy).toHaveBeenCalled();
  });
});
