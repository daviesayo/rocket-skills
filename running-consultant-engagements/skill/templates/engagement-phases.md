---
document_type: template
artifact_id: engagement-phases
title: "Engagement Phases — {{engagement_name}}"
status: draft
version: "1.0"
last_updated: "{{date}}"
depends_on: [context-and-assumptions, architecture-diagram, risk-and-constraints-register]
feeds_into: []
raci_values: [L, S, I]
completion_criteria:
  - "Every phase has specific entry and exit criteria"
  - "Deliverables are concrete and verifiable, not generic"
  - "Duration estimates are based on engagement complexity"
  - "RACI reflects actual engagement team structure"
  - "Phase names and goals match the engagement's actual work"
---

# Engagement Phases — {{engagement_name}}

**How to use:** Copy this file to your engagement folder. Define phases that match your engagement's actual work — the example below shows a common 5-phase structure for data-sync engagements, but your engagement may need different phases, different deliverables, or a different number of phases. Replace all `{{placeholders}}`.

<!-- LLM_INSTRUCTION
When generating engagement phases:
- Design phases to match the engagement's actual scope and workflow. Do NOT
  default to the example phases unless the engagement genuinely follows that
  structure.
- Common phase patterns:
  - Discovery → Design → Build → Test → Launch (software delivery)
  - Discovery → Design → Plumbing → Handoff → Launch (data sync / integration)
  - Assessment → Recommendation → Implementation → Review (advisory)
  - Research → Prototype → Validate → Scale (product development)
- The number of phases should match the engagement's complexity. 3 phases for
  a simple engagement, 5–7 for a complex one.
- Phase 1 (Discovery) and Phase 2 (Design) are nearly universal and should
  reference the template set's artifacts (discovery checklist, context doc,
  risk register, architecture diagram, decision log).
- Later phases (Build, Handoff, Launch, etc.) should have deliverables specific
  to the engagement — derive these from the context document and architecture.
- Entry and exit criteria must be specific and verifiable. "Client is happy"
  is not valid. "Client has approved the architecture diagram in writing" is.
- Duration should be based on engagement complexity from the context document.
- RACI should reflect actual team dynamics, not template defaults.
END_LLM_INSTRUCTION -->

---

## Phases

### {{phase_1_name}} — Discover

- **Goal:** Align on problem, scope, and constraints.
- **Deliverables:**
  - [Context and assumptions](context-and-assumptions.md) completed
  - [Discovery checklist](discovery-checklist.md) — all critical items answered
  - [Risk register](risk-and-constraints-register.md) — initial risks and constraints captured
- **Duration:** {{phase_1_duration}}
- **Entry criteria:** Kickoff meeting completed, client brief received.
- **Exit criteria:** Client signs off on scope (in/out), assumptions documented, key risks identified.

### {{phase_2_name}} — Design

- **Goal:** Agree on system shape, approach, and trade-offs.
- **Deliverables:**
  - [Architecture diagram](architecture-diagram.md) with system context and data flow
  - [Decision log](decision-log.md) entries for key design and technology choices
  - {{phase_2_deliverable_1}}
- **Duration:** {{phase_2_duration}}
- **Entry criteria:** Context document approved, discovery checklist completed.
- **Exit criteria:** Client approves architecture, key decisions logged with trade-offs documented.

### {{phase_3_name}}

- **Goal:** {{phase_3_goal}}
- **Deliverables:**
  - {{phase_3_deliverable_1}}
  - {{phase_3_deliverable_2}}
  - {{phase_3_deliverable_3}}
- **Duration:** {{phase_3_duration}}
- **Entry criteria:** {{phase_3_entry_criteria}}
- **Exit criteria:** {{phase_3_exit_criteria}}

### {{phase_4_name}}

- **Goal:** {{phase_4_goal}}
- **Deliverables:**
  - {{phase_4_deliverable_1}}
  - {{phase_4_deliverable_2}}
  - {{phase_4_deliverable_3}}
- **Duration:** {{phase_4_duration}}
- **Entry criteria:** {{phase_4_entry_criteria}}
- **Exit criteria:** {{phase_4_exit_criteria}}

### {{phase_5_name}} — Launch & close

- **Goal:** Go live, confirm stability, and close the engagement.
- **Deliverables:**
  - Launch checklist completed
  - {{phase_5_deliverable_1}}
  - Post-engagement review documented
- **Duration:** {{phase_5_duration}}
- **Entry criteria:** {{phase_5_entry_criteria}}
- **Exit criteria:** {{phase_5_exit_criteria}}
- **Notes:** Update [risk register](risk-and-constraints-register.md) with any residual risks or operational notes for the client.

---

## Responsibilities (optional)

Role vs phase: who leads (L), supports (S), or is informed (I).

| Role | {{phase_1_name}} | {{phase_2_name}} | {{phase_3_name}} | {{phase_4_name}} | {{phase_5_name}} |
|------|------------------|------------------|------------------|------------------|------------------|
| **{{role_1}}** | L | L | {{role_1_phase_3}} | {{role_1_phase_4}} | {{role_1_phase_5}} |
| **{{role_2}}** | S | S | {{role_2_phase_3}} | {{role_2_phase_4}} | {{role_2_phase_5}} |
| **{{role_3}}** | I | I | {{role_3_phase_3}} | {{role_3_phase_4}} | {{role_3_phase_5}} |

Add or remove roles and phases to match the engagement. L = leads, S = supports, I = informed.

---

<details>
<summary>Example: Data sync engagement phases (click to expand)</summary>

### Phase 1 — Discover
- **Goal:** Align on problem, scope, and constraints.
- **Deliverables:** Context doc, discovery checklist answers, initial risk register.
- **Duration:** 1–2 weeks

### Phase 2 — Design & agree architecture
- **Goal:** Agree system shape, data flow, and trade-offs.
- **Deliverables:** Architecture diagram, decision log entries, agreed source of truth and sync approach.
- **Duration:** 1–2 weeks

### Phase 3 — Set up plumbing
- **Goal:** Implement sync, storage, and read-optimised access.
- **Deliverables:** Sync layer working end-to-end, data store and CDN configured, API or spec for presentation layer.
- **Duration:** 2–4 weeks
- **Entry criteria:** Architecture diagram approved, technology decisions accepted.
- **Exit criteria:** Data flows from source of truth to presentation layer; sync delay within agreed tolerance.

### Phase 4 — Designer handoff & build
- **Goal:** Hand off to designer/dev; UI and content flow.
- **Deliverables:** Design handoff package (API spec, component requirements, asset access), build against agreed API, content flow validated.
- **Duration:** 2–4 weeks
- **Entry criteria:** Plumbing complete, API/spec documented and tested.
- **Exit criteria:** Designer/dev confirms handoff package is sufficient; content renders correctly from live data.

### Phase 5 — Launch & monitor
- **Goal:** Go live and confirm stability.
- **Deliverables:** Launch checklist, monitoring in place (uptime, sync health, error rates), post-launch review.
- **Duration:** 1–2 weeks
- **Entry criteria:** Build complete, staging approved by client.
- **Exit criteria:** Production live ≥1 week with no critical issues; client confirms acceptance.

**RACI:**

| Role | Discover | Design | Plumbing | Handoff | Launch |
|------|----------|--------|----------|---------|--------|
| Consultant | L | L | S | I | I |
| Client | S | S | I | S | L |
| Designer | I | I | I | L | S |

</details>
