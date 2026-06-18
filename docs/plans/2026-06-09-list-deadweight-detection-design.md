# List Dead-Weight Detection — Design

Date: 2026-06-09
Owner: Zeyad
Status: approved (brainstorm), executing

## Goal
Find and quarantine dead-weight contacts in Keap (67,107 total) across three
patterns, into separate review-tag buckets. Tagging only — no deletion.
Review happens in Keap before any purge.

## Precedent
Prior job: contacts with `https` in first name → tagged `21084`
("ListHygiene - 06/08/26 - Spam"). 6,421 found, 4,205 tagged (rest already
carried 21084). Spam cohort markers: tags 6712 + 9496 near-universal.

## Lanes
1. **name_url** (auto, ~zero FP): `given_name`/`family_name` contains `http`,
   `://`, `www.`, URL/TLD slug, `<<<` / `&lt;`, or HTML/BBcode markup.
2. **bad_email** (low FP): malformed (no `@`/TLD, whitespace), missing email,
   or `email_status` ∈ undeliverable set (calibrated from real distribution).
3. **disposable** (narrow + safeguard): domain ∈ throwaway list
   (mailinator, guerrillamail, 10minutemail, yopmail, tempmail, getnada, …)
   or local-part `test@`/`asdf@`/`noreply@`. Minus Set A ∪ Set B.

Lane 4 (dead engagement) parked — needs pruning thought.

## Customer safeguard (lanes 2 & 3 only)
Exclude a contact if `id ∈ Set A` OR `tag_ids ∩ Set B ≠ ∅`.
- **Set A — buyers (ground truth):** all `contact_id`s with any order
  (`keap_list_orders`) or transaction (`keap_list_transactions`).
- **Set B — customer tags (proxy):** tags in categories 1 (Customer Tags),
  249 (Order Processing Sequence), 343 (PYG Coaching), 252 (Upsale Offers),
  347 (OML), keeping only purchase-semantic names
  (`Successful Payment`, `Accepted`, `Purchase`, `Member`, `Deposit`, `$`/plan),
  discarding engagement tags (`Sent`/`Received`/`Clicked`). Printed for sign-off.

## Architecture
- **Single compact sweep:** all 67,107 contacts, `order=id`, `limit=200`,
  336 pages, parallel subagents by offset slice. Per-page `jq` emits one
  compact record: `{id, gn, fn, em, es, t}` → one local `contacts_min.jsonl`
  (~10MB). No per-contact GET. No re-scan per lane.
- **Offline classification:** all lane rules + safeguard run locally over the
  jsonl. Tunable, repeatable, future-proofs Lane 4.
- **Output:** three id lists. Create 3 review tags, apply via Keap REST batch
  endpoint `POST /crm/rest/v1/tags/{id}/contacts {"ids":[...≤100]}` (proven
  fast, no per-id rate limiter).

## Verification
- Report per-lane counts + overlap matrix.
- Print Set B before tagging.
- Spot-confirm samples via `keap_get_contact`.
- Reconcile distinct `email_status` values before finalizing lane 2.
- Buyers-protected count (how many lane2/3 candidates excluded by safeguard).
