# Phase 2 Digest — Product Spec

> Feature: `keap-v2-bulk-delete-contacts` | Mode: lite | Date: 2026-06-17

## Key Decisions
- **Target user:** MCP client / AI agent + operator behind it, doing bulk contact removal.
- **Scope:** contacts only; one tool `keap_v2_bulk_delete_contacts`. Generic multi-resource
  bulk delete is explicitly out of scope for v1.
- **Top stories:** (1) delete many contacts in one call; (2) per-ID success/failure report;
  (3) partial-failure tolerance + 429 backoff.
- **Mechanism:** deterministic client-side fan-out over existing v2 single delete; no Keap
  batch endpoint exists; no LLM in loop.

## Artifacts Produced
- `product-spec/product-spec.md` — concise spec: problem, 4 must-have stories, FR-001..010,
  NFRs, risks, decision log.
- `product-spec/README.md` — index.
- `product-spec/digest.md` — this file.

## Open Risks / Clarifications
- **404-on-already-deleted classification** unresolved: v1 default treats 404 as `fail`
  (surfaced), revisit during plan whether to treat as idempotent `ok`.
- Destructive operation — relies on caller passing explicit IDs; no guardrail beyond that
  in v1.

## Handoff Notes (plan needs to verify)
- Confirm `KeapClient` exposes a delete/HTTP method usable for `DELETE /contacts/{id}`
  (or how `keap_v2_delete_contact` currently routes) before designing the loop.
- Decide concurrency primitive (simple worker pool over `contact_ids`).
- Ensure tool name ≤64 chars and inputSchema valid for `schema-contract.test.ts`.
- Map FR-007 response shape exactly into the tool handler return.
