# Product Spec: Keap Bulk Delete Contacts (MCP tool)

> Status: DRAFT | Version: 1.0 | Date: 2026-06-17
> Feature: `keap-v2-bulk-delete-contacts` | Size: Small | Mode: lite
>
> **Related:** [README (index)](./README.md) | [digest](./digest.md)

## 1. Overview

### Problem Statement
Keap's v2 API has **no bulk contact delete**. The only batch-delete endpoints Keap
exposes are `emails:batchRemove`, `automationCategory` delete, and tag `removeTags`.
Deleting N contacts today means the MCP client (or LLM) firing `keap_v2_delete_contact`
N times — N round trips driven by the model, non-deterministic, no aggregate result,
no rate-limit handling, and burns context/tokens proportional to N.

### Solution Summary
Add one MCP tool, `keap_bulk_delete_contacts` (renamed from `keap_v2_bulk_delete_contacts`
per adversarial review — the `keap_v2_` namespace is count-locked by `register.test.ts`),
that accepts an array of contact IDs and performs the delete fan-out **inside the server in
TypeScript** — bounded concurrency, 429-aware backoff, optional `dry_run` preview, one
structured report out. The LLM makes a single tool call; the loop is deterministic server
code, not model orchestration.

### Background (validated)
- Keap v2 single delete: `DELETE /contacts/{contact_id}` (tool `keap_v2_delete_contact`).
- No `contacts:batchDelete` / plural delete exists in `scripts/keap_v2_openapi.yml`.
- Existing patterns: tool defs in `src/tools/*-tools.ts`, HTTP via `src/clients/keap.ts`,
  registration in `src/register.ts`, contract guard in `src/schema-contract.test.ts`.

## 2. Users
**Primary:** an MCP client / AI agent (and the operator behind it) that needs to remove
many Keap contacts in one operation — list cleanup, GDPR erasure batches, deduplication
fallout, test-data teardown.

## 3. User Stories

### Must Have (MVP)
- [ ] As an agent, I want to delete many contacts in one call so that I don't issue N
      model-driven calls. **AC:** one tool call with `contact_ids:[...]` deletes each via
      the v2 single-delete endpoint and returns an aggregate report.
- [ ] As an operator, I want a per-ID outcome so that I know exactly which deletes
      succeeded/failed. **AC:** response includes `deleted:[ids]` and
      `failed:[{id,status,error}]` plus `total/ok/fail` counts.
- [ ] As an operator, I want partial failure tolerated so that one bad ID doesn't abort
      the batch. **AC:** `continue_on_error` default `true`; the loop continues and
      records failures.
- [ ] As an operator, I want Keap rate limits respected so that large batches don't get
      throttled into mass failure. **AC:** bounded `concurrency` (default 3) and retry
      with backoff on HTTP 429.

### Could Have (Future, out of scope)
- Generic bulk-delete across other single-delete resources (orders, products, tasks…).
- Dry-run mode; pre-delete existence check.

## 4. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | Tool `keap_bulk_delete_contacts` accepts `contact_ids: integer[]` (required, non-empty, positive). | Must |
| FR-002 | Accepts optional `concurrency: integer` (default 5, min 1, cap 10). | Must |
| FR-003 | Accepts optional `continue_on_error: boolean` (default true). | Must |
| FR-011 | Accepts optional `dry_run: boolean` (default false); when true, validates + previews `would_delete[]` and issues NO deletes. | Must |
| FR-012 | HTTP 401/403 is batch-fatal: stop immediately, regardless of `continue_on_error`. <!-- CR-001/BUG-003: --> Returns a STRUCTURED report (`aborted:true, fatal_status, attempted`, partial `deleted[]`/`failed[]`) instead of throwing, so callers see which irreversible deletes already applied. | Must |
| FR-013 | <!-- CR-001/BUG-002 --> When `continue_on_error=false`, execution is serialized (`concurrency` forced to 1) so the batch deterministically stops on the first failure with no further deletes dispatched. | Must |
| FR-014 | <!-- CR-001/BUG-001 --> The rate limiter is PROCESS-GLOBAL (shared across all concurrent invocations in a worker instance) so overlapping calls cannot collectively exceed Keap's 25 req/s/app limit on the shared credential. Cross-instance coordination (Durable Objects/KV) is out of scope. | Must |
| FR-004 | Each ID deleted via existing single Keap v2 `DELETE /contacts/{id}` through `KeapClient`. | Must |
| FR-005 | Fan-out runs at bounded concurrency; never unbounded `Promise.all` over all IDs. | Must |
| FR-006 | On HTTP 429, retry the individual delete with backoff (bounded retries). | Must |
| FR-007 | Returns `{total, ok, fail, deleted:number[], failed:{id,status,error}[]}`. | Must |
| FR-008 | `continue_on_error=false` stops scheduling new deletes after first failure; already-issued results still reported. | Must |
| FR-009 | Registered in `src/register.ts` and passes `src/schema-contract.test.ts`. | Must |
| FR-010 | No LLM/model involvement in the loop; pure deterministic TypeScript. | Must |

## 5. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Determinism | Same input + same Keap state ⇒ same structured report. No model in loop. |
| Resilience | 429 backoff; partial-failure isolation per ID. |
| Consistency | Tool-name length and inputSchema obey existing contract guard (≤64 chars, valid schema). |
| Safety | Destructive. Requires explicit `contact_ids`; no "delete all" affordance. |

## 6. Out of Scope (v1)
- Resources other than contacts.
- Server-side Keap batch endpoint (does not exist).
- Undo / soft-delete / archival.

## 7. Success Criteria
A single `keap_v2_bulk_delete_contacts` call against real Keap deletes a supplied set of
contact IDs, returns an accurate per-ID report, tolerates a bad ID, and respects 429 —
proven by a real run (verify phase), not just a passing unit test.

## 8. Risks & Mitigations

| Risk | Prob | Impact | Mitigation |
|------|------|--------|------------|
| Accidental mass deletion | Med | High | No implicit selection; caller must pass explicit IDs; destructive labeling in description. |
| Rate-limit cascade on big batches | Med | Med | Bounded concurrency + 429 backoff. |
| Tool-name >64 chars breaks contract test | Low | Low | Name is 30 chars; guarded by existing test. |
| Keap returns 404 for already-deleted ID | Med | Low | Recorded in `failed[]` with status; doesn't abort batch. |

## 9. Open Questions
- Should a 404 (already gone) count as `ok` (idempotent) or `fail`? **Default v1:** `fail`
  with status 404, surfaced so caller decides. Revisit in plan.

## 10. Decision Log
| Decision | Rationale | Date |
|----------|-----------|------|
| Client-side fan-out, not a Keap batch call | Keap has no contact batch-delete endpoint | 2026-06-17 |
| Default concurrency 3 | Conservative vs Keap throttling | 2026-06-17 |
| `continue_on_error=true` default | Batch cleanup should not abort on one bad ID | 2026-06-17 |

## Non Production Elements
None. All elements in this artifact represent real production grade behavior.
