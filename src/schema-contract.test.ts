import { describe, it, expect } from 'vitest';
import { getAllTools } from './register.js';
import { KeapClient } from './clients/keap.js';

// Contract: every tool exposed by getAllTools() must satisfy the constraints
// that Anthropic's Messages API, OpenAI, and MCP clients (incl. ClickUp Brain)
// enforce. A single violation makes the WHOLE tools/list invalid for a strict
// client, which silently drops every tool ("Couldn't load tools").
//
// This test exists because two such violations shipped to the live worker:
//   1. `required: true` placed inside property objects (must be an array at
//      object level) -> fails JSON Schema draft 2020-12.
//   2. A tool name 65 chars long -> exceeds the 64-char name limit.
// Both passed every other check and only surfaced as a production 400 / a
// dead ClickUp connector. This guard catches them before deploy.

// MCP / Anthropic / OpenAI tool-name rule.
const NAME_RE = /^[a-zA-Z0-9_-]{1,64}$/;
const VALID_TYPES = new Set([
  'object', 'array', 'string', 'number', 'integer', 'boolean', 'null',
]);

function fakeClient(): KeapClient {
  return new KeapClient(undefined, 'test-key');
}

// Walks a schema and returns human-readable violations of draft-2020-12 /
// Anthropic strictness.
function schemaViolations(schema: any, path: string, out: string[]): void {
  if (schema === null || typeof schema !== 'object') return;
  if (Array.isArray(schema)) {
    schema.forEach((s, i) => schemaViolations(s, `${path}[${i}]`, out));
    return;
  }
  for (const [k, v] of Object.entries(schema)) {
    // `required` must be an array of strings; a boolean is the classic bug.
    if (k === 'required' && !Array.isArray(v)) {
      out.push(`${path}.required is ${typeof v} (must be string[])`);
    }
    // Union types ["string","null"] are rejected by Anthropic.
    if (k === 'type' && Array.isArray(v)) out.push(`${path}.type is an array`);
    if (k === 'type' && typeof v === 'string' && !VALID_TYPES.has(v)) {
      out.push(`${path}.type='${v}' is not a valid JSON Schema type`);
    }
    // Keywords removed in / invalid under draft 2020-12.
    if (k === 'definitions') out.push(`${path}.definitions (use $defs)`);
    if (k === 'dependencies') out.push(`${path}.dependencies (removed in 2020-12)`);
    if (k === 'additionalItems') out.push(`${path}.additionalItems (removed in 2020-12)`);
    if (k === 'items' && Array.isArray(v)) out.push(`${path}.items is a tuple (use prefixItems)`);
    if ((k === 'exclusiveMinimum' || k === 'exclusiveMaximum') && typeof v === 'boolean') {
      out.push(`${path}.${k} is boolean (draft-04 style)`);
    }
    schemaViolations(v, `${path}.${k}`, out);
  }
}

describe('tool schema contract (Anthropic / OpenAI / MCP)', () => {
  const tools = getAllTools(fakeClient());

  it('exposes a non-trivial tool set', () => {
    expect(tools.length).toBeGreaterThan(100);
  });

  it('every tool name matches ^[a-zA-Z0-9_-]{1,64}$ (incl. the 64-char limit)', () => {
    const bad = tools
      .map((t) => t.name)
      .filter((n) => !NAME_RE.test(n))
      .map((n) => `${n} (len ${n.length})`);
    expect(bad, `tool names violating the MCP/LLM name rule:\n${bad.join('\n')}`).toEqual([]);
  });

  it('tool names are unique', () => {
    const names = tools.map((t) => t.name);
    const dupes = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
    expect(dupes, `duplicate tool names: ${dupes.join(', ')}`).toEqual([]);
  });

  it('every inputSchema is a draft-2020-12-valid object schema', () => {
    const failures: string[] = [];
    for (const t of tools) {
      const s: any = t.inputSchema;
      if (!s || s.type !== 'object') {
        failures.push(`${t.name}: inputSchema.type must be "object"`);
        continue;
      }
      const v: string[] = [];
      schemaViolations(s, t.name, v);
      if (v.length) failures.push(...v);
    }
    expect(failures, `schema contract violations:\n${failures.join('\n')}`).toEqual([]);
  });
});
