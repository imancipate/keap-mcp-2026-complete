# Product Spec Index: Keap Bulk Delete Contacts

> Status: DRAFT | Created: 2026-06-17 | Mode: lite
> Feature slug: `keap-v2-bulk-delete-contacts`
> ← [Back to Feature Root](../README.md)

## What We're Building
One MCP tool, `keap_v2_bulk_delete_contacts`, that deletes many Keap contacts in a
single call via deterministic server-side fan-out over the existing v2 single-delete
endpoint — bounded concurrency, 429 backoff, structured per-ID report. No LLM in the loop.

## Document Map
| Document | Purpose | Detail | Status |
|----------|---------|--------|--------|
| [product-spec.md](./product-spec.md) | Main spec — stories, FRs, risks | concise (lite) | DRAFT |
| [digest.md](./digest.md) | Phase 2 handoff digest | — | DRAFT |

> No user-journey / wireframes / mockups / metrics docs: backend MCP tool, no UI.

## Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mechanism | Client-side fan-out | Keap exposes no contact batch-delete endpoint |
| Default concurrency | 3 | Conservative vs Keap throttling |
| Partial failure | `continue_on_error=true` default | Don't abort batch on one bad ID |
