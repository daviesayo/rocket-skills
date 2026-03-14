---
document_type: template
artifact_id: risk-and-constraints-register
title: "Risk and Constraints Register — {{engagement_name}}"
status: draft
version: "1.0"
last_updated: "{{date}}"
depends_on: [discovery-checklist, context-and-assumptions]
feeds_into: [decision-log, engagement-phases]
review_cadence: "Before each phase transition"
risk_schema:
  id: { type: string, format: "RISK-NNN" }
  likelihood: { type: enum, values: [Low, Medium, High] }
  impact: { type: enum, values: [Low, Medium, High] }
  score: { type: computed, formula: "likelihood × impact", scale: "L=1, M=2, H=3; score 1–9" }
  status: { type: enum, values: [Open, Mitigating, Closed, Accepted] }
issue_schema:
  id: { type: string, format: "ISSUE-NNN" }
  status: { type: enum, values: [Open, In progress, Resolved, "Won't fix"] }
dependency_schema:
  id: { type: string, format: "DEP-NNN" }
  type: { type: enum, values: [External, Internal] }
  status: { type: enum, values: [Confirmed, At risk, Blocked] }
completion_criteria:
  - "Every assumption in context-and-assumptions has a corresponding 'what if wrong' risk entry"
  - "All risks with Score ≥6 have a concrete mitigation (not 'monitor closely')"
  - "Constraints from discovery checklist are captured with impact and mitigation"
  - "All dependencies name a specific system, team, or deliverable"
---

# Risk and Constraints Register — {{engagement_name}}

**How to use:** Copy this file to the engagement folder. Add rows as you discover risks, issues, dependencies, and constraints. Review before each phase transition. Likelihood × Impact scoring: Low=1, Medium=2, High=3; Score range 1–9.

<!-- LLM_INSTRUCTION
When generating this register:
- Derive risks from the discovery checklist answers and context document.
  Every assumption in context-and-assumptions should have a corresponding
  "what if this is wrong" risk entry here.
- Likelihood and Impact use a 3-point scale: Low (unlikely / minor delay),
  Medium (possible / significant delay or cost), High (likely / blocks delivery).
  Score = Likelihood × Impact where L=1, M=2, H=3. Range is 1–9.
- Every risk with Score ≥6 must have a concrete mitigation, not just
  "monitor closely."
- Constraints should come from the discovery checklist (budget, deadlines,
  tech stack, team capacity).
- Dependencies should name the specific external system, team, or deliverable
  and its owner.
- When updating this register during an engagement, never delete resolved items.
  Change their status and add a resolution note.
END_LLM_INSTRUCTION -->

---

## Risks

| ID | Description | Likelihood | Impact | Score | Mitigation | Owner | Status |
|----|-------------|------------|--------|-------|------------|-------|--------|
| RISK-{{risk_1_id}} | {{risk_1_description}} | {{High/Medium/Low}} | {{High/Medium/Low}} | {{1–9}} | {{risk_1_mitigation}} | {{risk_1_owner}} | Open |

---

## Assumptions

Tracked in [context-and-assumptions.md](context-and-assumptions.md). Key assumptions with risk implications:

| ID | Assumption | Status | Risk if invalid |
|----|------------|--------|-----------------|
| ASMP-001 | {{assumption_1}} | Pending | {{risk_if_invalid}} |

---

## Issues

| ID | Description | Severity | Owner | Status | Resolution |
|----|-------------|----------|-------|--------|------------|
| ISSUE-{{issue_1_id}} | {{issue_1_description}} | {{High/Medium/Low}} | {{owner}} | Open | |

---

## Dependencies

| ID | Description | Type | Owner | Due date | Status |
|----|-------------|------|-------|----------|--------|
| DEP-001 | {{dependency_1}} | {{External/Internal}} | {{owner}} | {{date}} | Confirmed |

---

## Constraints

| Category | Constraint | Impact on engagement | Mitigation |
|----------|-----------|---------------------|------------|
| Cost | {{cost_constraint}} | {{impact}} | {{mitigation}} |
| Time | {{time_constraint}} | {{impact}} | {{mitigation}} |
| Tech | {{tech_constraint}} | {{impact}} | {{mitigation}} |
| Skills | {{skills_constraint}} | {{impact}} | {{mitigation}} |

---

<details>
<summary>Example risk register entries (click to expand)</summary>

**Risks:**

| ID | Description | Likelihood | Impact | Score | Mitigation | Owner | Status |
|----|-------------|------------|--------|-------|------------|-------|--------|
| RISK-001 | Airtable API rate limits hit during peak sync | Medium | High | 6 | Implement exponential backoff; batch requests; cache unchanged records | Consultant | Open |
| RISK-002 | Sync delay exceeds client's 5-minute tolerance | Low | High | 3 | Monitor sync duration; alert if >3 min; fallback to webhook trigger | Consultant | Open |
| RISK-003 | Model images exceed Vercel Blob 500MB free tier | Medium | Medium | 4 | Estimate total asset size during discovery; plan for paid tier if >400MB | Client | Open |

**Constraints:**

| Category | Constraint | Impact on engagement | Mitigation |
|----------|-----------|---------------------|------------|
| Cost | <$50/mo run-rate for sync and hosting | Rules out dedicated servers; must use serverless/managed services | Use Zapier (free tier or $29/mo) + Supabase free tier + Vercel free tier |
| Time | Fashion week in September; site must launch by August 15 | 5-month timeline with no buffer for Phase 5 | Front-load discovery; parallel plumbing and design handoff if possible |
| Tech | Client uses Airtable Pro (not Enterprise); no custom apps | Limited to standard API; no scripting automations | Design sync around standard REST API; accept polling model |

</details>

<details>
<summary>Example: Advisory / process engagement entries (click to expand)</summary>

**Risks:**

| ID | Description | Likelihood | Impact | Score | Mitigation | Owner | Status |
|----|-------------|------------|--------|-------|------------|-------|--------|
| RISK-001 | Key stakeholder (VP Support) leaves during engagement | Low | High | 3 | Identify backup sponsor in kickoff; document decisions to reduce single-person dependency | Consultant | Open |
| RISK-002 | Support team unavailable for shadowing sessions due to ticket volume | Medium | High | 6 | Schedule sessions 2 weeks in advance; offer async alternative (screen recordings + survey) | Client | Open |
| RISK-003 | Ticket data export from legacy system is incomplete or inconsistent | Medium | Medium | 4 | Request sample export in discovery; validate data quality before full analysis | Consultant | Open |

**Constraints:**

| Category | Constraint | Impact on engagement | Mitigation |
|----------|-----------|---------------------|------------|
| Cost | Helpdesk platform budget ≤$500/mo | Limits vendor options; enterprise tiers excluded | Focus evaluation on mid-market plans; negotiate annual pricing |
| Time | Recommendation due before Q3 budget cycle (June 30) | 10-week engagement with no schedule buffer | Parallel-track vendor evaluation and process assessment |
| Skills | No dedicated IT ops on client team | Implementation must be low-code or vendor-managed | Weight "ease of setup" heavily in vendor evaluation criteria |

</details>
