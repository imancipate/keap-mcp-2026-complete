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

// Validates a single (sub)schema for draft-2020-12 / Anthropic strictness, then
// recurses ONLY into nested sub-schemas. Critically, it does NOT treat keys
// inside `properties` as schema keywords — a request field may legitimately be
// named "required", "type", "items", etc. Matching on key names there produced
// false positives; this walks the schema structurally instead.
function schemaViolations(schema: any, path: string, out: string[]): void {
  if (schema === null || typeof schema !== 'object' || Array.isArray(schema)) return;

  // --- keyword-level checks on THIS schema node ---
  if ('required' in schema && !Array.isArray(schema.required)) {
    out.push(`${path}.required is ${typeof schema.required} (must be string[])`);
  }
  if (Array.isArray(schema.type)) out.push(`${path}.type is an array (union types rejected)`);
  if (typeof schema.type === 'string' && !VALID_TYPES.has(schema.type)) {
    out.push(`${path}.type='${schema.type}' is not a valid JSON Schema type`);
  }
  if ('definitions' in schema) out.push(`${path}.definitions (use $defs)`);
  if ('dependencies' in schema) out.push(`${path}.dependencies (removed in 2020-12)`);
  if ('additionalItems' in schema) out.push(`${path}.additionalItems (removed in 2020-12)`);
  if (Array.isArray(schema.items)) out.push(`${path}.items is a tuple (use prefixItems)`);
  if (typeof schema.exclusiveMinimum === 'boolean') out.push(`${path}.exclusiveMinimum is boolean (draft-04)`);
  if (typeof schema.exclusiveMaximum === 'boolean') out.push(`${path}.exclusiveMaximum is boolean (draft-04)`);

  // --- recurse into nested sub-schemas only ---
  if (schema.properties && typeof schema.properties === 'object') {
    for (const [name, sub] of Object.entries(schema.properties)) {
      schemaViolations(sub, `${path}.properties.${name}`, out);
    }
  }
  if (schema.items && typeof schema.items === 'object') {
    schemaViolations(schema.items, `${path}.items`, out);
  }
  if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    schemaViolations(schema.additionalProperties, `${path}.additionalProperties`, out);
  }
  for (const comb of ['allOf', 'anyOf', 'oneOf'] as const) {
    if (Array.isArray(schema[comb])) {
      schema[comb].forEach((s: any, i: number) => schemaViolations(s, `${path}.${comb}[${i}]`, out));
    }
  }
  if (schema.$defs && typeof schema.$defs === 'object') {
    for (const [name, sub] of Object.entries(schema.$defs)) {
      schemaViolations(sub, `${path}.$defs.${name}`, out);
    }
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
