---
document_type: template
artifact_id: decision-log
title: "Decision Log — {{engagement_name}}"
status: draft
version: "1.0"
last_updated: "{{date}}"
depends_on: [context-and-assumptions, architecture-diagram, risk-and-constraints-register]
feeds_into: []
entry_schema:
  id: { type: string, format: "DEC-NNN", required: true }
  date: { type: date, format: "YYYY-MM-DD", required: true }
  decision: { type: string, required: true, max_length: 80 }
  context: { type: string, required: true }
  options_considered: { type: list, min_items: 2, required: true }
  outcome: { type: string, required: true }
  status: { type: enum, values: [Proposed, Accepted, Deprecated, Superseded], required: true }
  principle: { type: string, required: false }
  linked_risk: { type: string, required: false }
completion_criteria:
  - "Every decision has ≥2 options with explicit trade-offs"
  - "Context states the specific constraint or problem that forced the decision"
  - "Status is set for every entry"
  - "Architecture-related decisions reference the relevant principle from engagement-principles.md"
---

# Decision Log — {{engagement_name}}

**How to use:** One entry per decision. Add new decisions at the **top** (below the template entry). Status values: `Proposed` | `Accepted` | `Deprecated` | `Superseded`.

<!-- LLM_INSTRUCTION
When generating decision entries:
- Each decision needs ≥2 options with explicit trade-offs (cost, complexity,
  time, risk). Never present a decision with only one option—that's a
  statement, not a decision.
- Context should state the specific problem or constraint that forced the
  decision. Bad: "We needed to choose a tool." Good: "Client requires
  responses under 2 hours but current triage is manual, ruling out status-quo"
  or "Integration must handle 10K records/day within a $50/mo budget."
- Reference the relevant engagement-specific principle from engagement-principles.md
  in the Principle field. These are defined per engagement — do not assume
  specific principle names.
- If a decision mitigates a risk from the risk register, link it by risk ID.
- Status should be Proposed for draft decisions, Accepted after client/team
  agreement.
- Derive decisions from the architecture diagram and context document. Do not
  copy framing or trade-offs from the example in this template.
END_LLM_INSTRUCTION -->

---

## Decisions

<!-- Add new decisions at the top. -->

### DEC-{{dec_1_id}}: {{dec_1_title}}

- **Date:** {{dec_1_date}}
- **Status:** {{dec_1_status}}
- **Context:** {{dec_1_context}}
- **Options considered:**
  1. {{dec_1_option_a}} — {{dec_1_option_a_trade_offs}}
  2. {{dec_1_option_b}} — {{dec_1_option_b_trade_offs}}
- **Decision:** {{dec_1_outcome}}
- **Principle:** {{principle_reference}}
- **Linked risks:** {{linked_risk_ids}}

---

<details>
<summary>Example: Data sync decision (click to expand)</summary>

### DEC-001: Use Zapier over custom webhook for Airtable→Supabase sync

- **Date:** 2026-03-10
- **Status:** Accepted
- **Context:** Client needs Airtable records synced to Supabase within 5 minutes. Budget is <$50/mo for sync infrastructure. Team has no backend developer for custom webhook maintenance.
- **Options considered:**
  1. Zapier — $29/mo, no-code, 5-min polling. Pro: fast setup, client can modify. Con: polling delay, rate limits at scale.
  2. Custom webhook (Node.js on Vercel) — $0 hosting, real-time. Pro: instant sync. Con: requires developer to build and maintain, no GUI for client.
  3. Make (Integromat) — $9/mo, visual builder. Pro: cheaper. Con: client unfamiliar, fewer Airtable triggers.
- **Decision:** Zapier. Meets latency requirement, fits budget, and client can modify zaps without developer involvement.
- **Principle:** Invisible plumbing, cost as a constraint
- **Linked risks:** RISK-002 (sync delay exceeds client expectation)

</details>

<details>
<summary>Example: Advisory / platform decision (click to expand)</summary>

### DEC-003: Recommend Zendesk over Freshdesk for support triage platform

- **Date:** 2026-04-02
- **Status:** Proposed
- **Context:** Support team needs automated ticket triage with SLA tracking. Must integrate with existing Slack workspace and Salesforce CRM. Team has 12 agents; budget is ≤$500/mo.
- **Options considered:**
  1. Zendesk Suite Team — $55/agent/mo ($660/mo for 12). Pro: native Slack integration, robust SLA engine, Salesforce connector. Con: over budget by $160/mo.
  2. Freshdesk Pro — $49/agent/mo ($588/mo for 12). Pro: within budget, good automation rules. Con: Slack integration requires third-party app, Salesforce sync is beta.
  3. Linear + custom triage bot — ~$100/mo total. Pro: cheapest, developer-friendly. Con: no SLA tracking, requires custom build, not designed for support workflows.
- **Decision:** Zendesk. SLA engine and native integrations outweigh the $160/mo overage. Client confirmed budget can flex to $700/mo for the right tool.
- **Principle:** Minimize operational overhead for client team
- **Linked risks:** RISK-005 (Zendesk pricing increases at renewal)

</details>
