# Spec: keap_bulk_delete_contacts

> Generated via bridge (Phase 4) — feature escalated lite → standard at CR-003 (2026-06-18).
> Source of truth: [product-spec/product-spec.md](./product-spec/product-spec.md). This spec is
> the SpecKit-format projection used for plan/tasks; on conflict, product-spec FRs win.

## Goal
Deterministic, client-side bulk delete of Keap contacts as one MCP tool, safe on a shared
OAuth trust plane and a single shared Keap credential.

## User Stories
- **US-001** As an agent/operator, I delete many contacts in one MCP call and get a per-ID report.
  AC: `keap_bulk_delete_contacts({contact_ids:[...]})` → `{total,ok,fail,deleted[],failed[]}`.
- **US-002** As an operator, partial failure doesn't abort the batch (unless I ask).
  AC: `continue_on_error` default true; `false` ⇒ deterministic fail-fast (serial).
- **US-003** As the platform, concurrent calls never exceed Keap's 25 req/s/app.
  AC: process-global limiter + cross-instance Durable Object share one budget.
- **US-004** As a security owner, the destructive tool is not silently available.
  AC: opt-in via `KEAP_BULK_DELETE_ENABLED` (default OFF).
- **US-005 (CR-003)** As a security owner, an autonomous LLM cannot delete without explicit
  human authorization per batch.
  AC: a real delete runs only if `confirm` equals env `KEAP_BULK_DELETE_CONFIRM`; else refused;
  `dry_run` exempt.

## Functional Requirements (mirror product-spec)
- FR-001 array-in / report-out · FR-002 concurrency (default 5, cap 10) · FR-003/008 continue_on_error
- FR-004 single v2 DELETE per id · FR-005 bounded fan-out · FR-006 429 + retry-after
- FR-007 report shape · FR-011 dry_run · FR-012 auth-fatal structured · FR-013 fail-fast serial
- FR-014 process-global + cross-instance DO limiter; 30s timeout scoped to deleteV2
- FR-015 opt-in kill-switch · FR-016 admin secret via header
- **FR-017 (CR-003)** confirm-gate: `confirm` must equal env `KEAP_BULK_DELETE_CONFIRM`; missing/wrong → refused, no deletes; dry_run exempt.

## Acceptance Criteria — CR-003 (new)
1. `enabled=true`, no `confirm` → tool returns refusal, `deleteV2` never called.
2. `enabled=true`, wrong `confirm` → refusal, no deletes.
3. `enabled=true`, `confirm` == env token → deletes proceed, report returned.
4. `dry_run=true` with no `confirm` → preview returned (exempt), no deletes.
5. The confirm token is sourced from server env, never embedded in the tool's output/schema value.

## Out of Scope
- Resources other than contacts; bulk endpoints Keap doesn't expose; two-phase out-of-band confirm
  (logged as future air-gap option).

## Non Production Elements
None. Spec projection of an implemented feature; CR-003 acceptance pending implement.
