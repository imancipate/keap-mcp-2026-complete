# Feature: Keap Bulk Delete Contacts

> Created: 2026-06-17 | Status: Phase 2 (Product Spec) | Mode: lite
> Slug: `keap-v2-bulk-delete-contacts`

## Lifecycle Status (lite map)

| Phase | Status | Documents |
|-------|--------|-----------|
| 0. Problem Discovery | ⏭ Skipped (pre-validated) | — |
| 2. Product Spec | ✅ Complete | [product-spec/](./product-spec/README.md) |
| 5. Plan | ⏳ Pending | [plan.md](./plan.md) |
| 6. Implementation | ⏳ Pending | — |
| 7. Verification | ⏳ Pending | [verify-report.md](./verify-report.md) |

> Lite mode skips research, revalidation, bridge, tasks, pre-impl-review, code-review, test, release.

## Feature Description
`keap_v2_bulk_delete_contacts` — deterministic, client-side bulk delete MCP tool for Keap
contacts. Array of `contact_ids` in; server-side bounded-concurrency fan-out over the
existing v2 single `DELETE /contacts/{id}`, 429-aware; structured per-ID report out. No LLM
in the loop.
