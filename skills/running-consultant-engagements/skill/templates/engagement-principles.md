---
document_type: template
artifact_id: engagement-principles
title: "Engagement Principles — {{engagement_name}}"
status: draft
version: "1.0"
last_updated: "{{date}}"
depends_on: [discovery-checklist]
feeds_into: [context-and-assumptions, architecture-diagram, decision-log, risk-and-constraints-register, engagement-phases]
placeholders:
  engagement_name: { type: string, required: true }
  philosophies: { type: list, required: true, min_items: 3, max_items: 5 }
  patterns: { type: list, required: true, min_items: 2, max_items: 4 }
completion_criteria:
  - "3–5 philosophies, each a falsifiable design stance (not aspirational platitudes)"
  - "2–4 patterns, each describing a concrete data or control flow"
  - "Every philosophy and pattern is derived from discovery inputs, not borrowed from the example"
  - "No unresolved {{placeholders}} remain"
---

# Engagement Principles — {{engagement_name}}

**How to use:** Copy this file to `engagements/{{engagement_name}}/`. Define the engagement's guiding philosophies and recurring patterns before generating any other artifact. Every downstream document references these principles.

<!-- LLM_INSTRUCTION
When generating engagement principles:
- Philosophies are design stances that constrain decisions. Each must be
  falsifiable — you could imagine a valid engagement that takes the opposite
  stance. Good: "Single source of truth — one edit surface, one direction of
  data flow." Bad: "Build a good system" or "Be user-friendly."
- Patterns describe recurring data or control flows that the architecture will
  follow. Each should be concrete enough to draw on a whiteboard. Good:
  "Source of truth → sync → store → presentation." Bad: "Use best practices"
  or "Follow industry standards."
- Derive all principles from the engagement's discovery answers and client
  brief. Do not borrow framing or language from the example in this template.
- If a philosophy or pattern is uncertain, prefix with [NEEDS_REVIEW] and note
  what would validate or invalidate it.
- Principles inform every downstream artifact:
  - context-and-assumptions: Which principles apply; assumptions tied to the
    chosen approach
  - architecture-diagram: Diagrams and narrative embody the patterns
  - decision-log: Each decision references the principle or pattern it follows
  - discovery-checklist: Questions that validate assumptions behind the approach
  - risk-and-constraints-register: Risks arising from the chosen approach
  - engagement-phases: Phases reflect the patterns in their sequencing
END_LLM_INSTRUCTION -->

---

## Philosophies

1. **{{philosophy_1_name}}** — {{philosophy_1_description}}
2. **{{philosophy_2_name}}** — {{philosophy_2_description}}
3. **{{philosophy_3_name}}** — {{philosophy_3_description}}

## Patterns

1. **{{pattern_1_name}}** — {{pattern_1_description}}
2. **{{pattern_2_name}}** — {{pattern_2_description}}

---

<details>
<summary>Example: Data sync engagement (click to expand)</summary>

**Philosophies:**

1. **Client workflow first** — Prefer the client's existing workflow over an "ideal" architecture; design around how they already work.
2. **One source of truth** — Single place to edit; one direction of edit. Avoid duplicate edit surfaces.
3. **Invisible plumbing** — Sync, storage, and APIs should be invisible to the client; they only touch the source of truth.
4. **Explicit trade-offs** — Document decisions and trade-offs in the decision-log and risk register so they're visible and reviewable.
5. **Handoff-friendly** — Clear API or spec for designer or dev; make it easy to hand off without the consultant in the loop.

**Patterns:**

1. **Source of truth → sync → store → presentation** — Data flows one way: edit in SOT, sync to a read-optimised store, presentation reads from store (and CDN for assets). Avoid frontend hitting the source of truth directly.
2. **Heavy assets off the source of truth** — Sync images and other heavy assets to blob storage + CDN; store URLs in the data store. Keeps SOT lightweight and read-optimised.
3. **Acceptable lag** — Define sync delay and get client acceptance; record in context-and-assumptions and decision-log.
4. **Cost as a constraint** — Capture run-rate and budget; check new options against it; record in the risk-and-constraints-register.

</details>

<details>
<summary>Example: Advisory / process engagement (click to expand)</summary>

**Philosophies:**

1. **Measure before prescribing** — Quantify the current state (response times, ticket volume, error rates) before recommending changes. No baselines, no recommendations.
2. **Minimal viable process** — Introduce the fewest new steps that achieve the target outcome. Every added step must justify its cost in time and complexity.
3. **Tool-agnostic design** — Define the workflow and requirements independent of any specific vendor. Tool selection is a decision, not an assumption.

**Patterns:**

1. **Audit → classify → automate → measure** — Understand current workflow, create a classification framework, automate what's classifiable, measure the result against the baseline.
2. **Stakeholder-gated phases** — Each phase ends with a stakeholder review that gates entry to the next. No phase starts without explicit sign-off on the previous deliverable.

</details>
