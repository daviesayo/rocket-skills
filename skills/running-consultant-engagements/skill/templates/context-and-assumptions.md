---
document_type: template
artifact_id: context-and-assumptions
title: "Context and Assumptions — {{engagement_name}}"
status: draft
version: "1.0"
last_updated: "{{date}}"
depends_on: [discovery-checklist]
feeds_into: [risk-and-constraints-register, architecture-diagram]
input_sources:
  - type: kickoff_notes
    description: "Notes from the engagement kickoff meeting"
  - type: client_brief
    description: "Client-provided brief, RFP, or SOW"
  - type: discovery_answers
    description: "Completed discovery checklist"
placeholders:
  engagement_name: { type: string, required: true }
  engagement_summary: { type: string, required: true, max_sentences: 3 }
  client_name: { type: string, required: true }
  client_context: { type: string, required: true, format: paragraph }
  in_scope_items: { type: list, required: true, min_items: 3 }
  out_of_scope_items: { type: list, required: true, min_items: 3 }
  assumptions: { type: list, required: true, min_items: 3, max_items: 10 }
completion_criteria:
  - "Engagement summary is ≤3 sentences and states the problem, client, and desired outcome"
  - "In-scope and out-of-scope are bullet lists with ≥3 items each"
  - "Every assumption is a falsifiable statement with a status"
  - "No unresolved {{placeholders}} remain"
---

# Context and Assumptions

**How to use:** Copy this file to `engagements/{{engagement_name}}/`. Replace all `{{placeholders}}` with engagement-specific values. Keep assumptions updated as they are validated or invalidated.

<!-- LLM_INSTRUCTION
When generating this document:
- Engagement summary: One sentence on the client's problem. One sentence on the
  proposed approach. One sentence on the expected outcome. No filler language.
- Client context: State who the client is, their industry, current tech
  landscape, and the trigger for this engagement. 3–5 sentences.
- In scope: Concrete deliverables and capabilities. Use active verbs.
  Good examples across different engagement types:
  - "Build a data pipeline from the client's CRM to the reporting dashboard"
  - "Design and document the onboarding workflow for new enterprise customers"
  - "Assess current infrastructure and recommend a migration path to cloud"
  Bad: "Integration work" or "Improvements to the system"
- Out of scope: Explicit exclusions. Each item should prevent a future scope
  dispute. Good: "Mobile app development" or "Staff training beyond admin users."
  Bad: "Some things" or "Other work."
- Assumptions: Each must be falsifiable. Good: "Client has API access to their
  CRM" or "Budget is approved for Q2." Bad: "Client is open to change" or
  "The team will be cooperative."
- Derive all content from the engagement's discovery checklist and client brief.
  Do not borrow language or framing from the example in this template.
- If uncertain about any item, prefix it with [NEEDS_REVIEW].
- If information is missing, prefix with [NEEDS_INPUT].
END_LLM_INSTRUCTION -->

---

## Engagement summary

{{engagement_summary_2_to_3_sentences}}

## Client context

**Client:** {{client_name}}

{{client_context}}

## In scope

- {{in_scope_item_1}}
- {{in_scope_item_2}}
- {{in_scope_item_3}}

## Out of scope

- {{out_of_scope_item_1}}
- {{out_of_scope_item_2}}
- {{out_of_scope_item_3}}

## Assumptions

| # | Assumption | Status | Validated by |
|---|------------|--------|--------------|
| 1 | {{assumption_1}} | Pending | |
| 2 | {{assumption_2}} | Pending | |
| 3 | {{assumption_3}} | Pending | |

Status values: `Pending` | `Validated` | `Invalidated`

---

<details>
<summary>Example: Data sync engagement (click to expand)</summary>

**Engagement summary:** Acme Modeling Agency needs a public-facing portfolio website backed by their existing Airtable base. We will build a sync pipeline and read-optimised data store to power a custom Next.js front-end. The goal is a launched site within 8 weeks that the client updates entirely from Airtable.

**Client context:** Acme Modeling Agency is a mid-size talent agency managing ~200 active models. They currently track headshots, measurements, and availability in an Airtable base shared with 5 internal staff. Their existing website is a static WordPress site updated manually by a freelancer. The agency wants a dynamic site that auto-updates from Airtable.

**In scope:**
- Sync pipeline from Airtable to Supabase (records) and Vercel Blob (images)
- Read-only API for the presentation layer
- Next.js front-end with model profiles, filtering, and contact form
- Designer handoff package with Figma tokens and component spec

**Out of scope:**
- Airtable base restructuring or data cleanup
- Mobile app
- CRM or booking system integration
- Ongoing content creation

**Assumptions:**

| # | Assumption | Status | Validated by |
|---|------------|--------|--------------|
| 1 | Client has Airtable Pro plan (required for API access). | Pending | |
| 2 | All model images are ≤5MB and in JPEG/PNG format. | Pending | |
| 3 | Client accepts up to 5-minute sync delay for content updates. | Pending | |

</details>

<details>
<summary>Example: Advisory / process engagement (click to expand)</summary>

**Engagement summary:** TechCorp's customer support team is handling 400+ tickets/week manually across email, Slack, and a legacy helpdesk. We will assess the current workflow, design an automated triage and routing system, and deliver an implementation roadmap. The goal is a validated design and vendor shortlist within 6 weeks.

**Client context:** TechCorp is a B2B SaaS company with 2,000 customers and a 12-person support team. Tickets arrive via email, an in-app widget, and a shared Slack channel. There is no formal triage — agents self-assign from a shared inbox. Response times average 8 hours; the target is under 2 hours for P1 issues. The VP of Support is sponsoring this engagement after two quarters of declining CSAT scores.

**In scope:**
- Audit of current ticket lifecycle (intake → triage → resolution → close)
- Classification framework for ticket priority and category
- Evaluation of 3 helpdesk platforms against requirements
- Implementation roadmap with cost estimates and timeline
- Stakeholder presentation summarizing findings and recommendation

**Out of scope:**
- Helpdesk platform implementation or configuration
- Custom integrations or API development
- Hiring or staffing recommendations
- Training material creation

**Assumptions:**

| # | Assumption | Status | Validated by |
|---|------------|--------|--------------|
| 1 | Support team will be available for 2–3 shadowing sessions during assessment. | Pending | |
| 2 | Client can export 90 days of ticket data from current system. | Pending | |
| 3 | Budget for new helpdesk platform is pre-approved at ≤$500/mo. | Pending | |

</details>
