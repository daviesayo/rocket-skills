---
document_type: template
artifact_id: discovery-checklist
title: "Discovery Checklist — {{engagement_name}}"
status: draft
version: "1.0"
last_updated: "{{date}}"
depends_on: []
feeds_into: [context-and-assumptions, risk-and-constraints-register]
sections:
  - id: scale-and-data
    feeds: [risk-and-constraints-register, architecture-diagram]
  - id: workflow-and-integrations
    feeds: [architecture-diagram, engagement-phases]
  - id: timeline-and-rollout
    feeds: [engagement-phases, risk-and-constraints-register]
  - id: people-and-access
    feeds: [engagement-phases, risk-and-constraints-register]
  - id: content-and-deliverables
    feeds: [context-and-assumptions, architecture-diagram]
  - id: edge-cases-and-future
    feeds: [risk-and-constraints-register, context-and-assumptions]
question_priority_levels: [critical, important, nice_to_have]
completion_criteria:
  - "All [Critical] questions are answered"
  - "All [Important] questions are answered or marked [NEEDS_FOLLOW_UP]"
  - "Client-specific questions are replaced with engagement-relevant questions"
  - "Answers feed into downstream artifacts per the 'Feeds' tags"
---

# Discovery Checklist — {{engagement_name}}

**How to use:** Use this checklist on scope/discovery calls. Check off each item when answered. Record answers here or in [context-and-assumptions](context-and-assumptions.md) / [risk register](risk-and-constraints-register.md). Priority: **[Critical]** = must answer before proceeding, **[Important]** = should answer in discovery, **[Nice-to-have]** = answer when possible.

<!-- LLM_INSTRUCTION
When generating client-specific questions:
- Generate 1–3 questions per section that are specific to the client's industry
  and engagement type.
- Each question must be answerable in a single call—avoid compound questions.
- Examples by engagement type:
  - Modeling agency (data sync): "How many models are active at any given time?"
    (Scale), "Is there a casting/booking workflow?" (Workflow).
  - SaaS company (platform build): "What's the current MRR and growth rate?"
    (Scale), "What's the onboarding flow?" (Workflow).
  - Support team (process consulting): "How many tickets per week?" (Scale),
    "What's the current triage process?" (Workflow).
  - Enterprise (advisory): "How many business units are affected?" (Scale),
    "Who owns the decision to proceed?" (People & access).

When processing answers from a call transcript:
- Extract answers from the transcript and slot them into the Answer fields.
- Mark the checkbox as [x] for answered items.
- If a question was partially answered, quote the relevant excerpt and add
  [NEEDS_FOLLOW_UP].
- After processing, suggest which artifacts to update based on the Feeds tags.
- Skip sections that don't apply to this engagement type (e.g., skip SEO
  questions for a pure process consulting engagement).
END_LLM_INSTRUCTION -->

---

## Scale & data

- [ ] **[Critical]** What is the expected volume of users, content, or transactions?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md), [architecture-diagram](architecture-diagram.md)
- [ ] **[Critical]** Where does data live today (spreadsheets, CRM, legacy systems)?
  - Answer:
  - Feeds: [architecture-diagram](architecture-diagram.md)
- [ ] **[Important]** Are there data migration or sync requirements?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] **[Nice-to-have]** What reporting or analytics are must-haves?
  - Answer:
  - Feeds: [context-and-assumptions](context-and-assumptions.md)
- [ ] {{client_specific_question_scale}}
  - Notes:

---

## Workflow & integrations

- [ ] **[Critical]** What are the main workflows (e.g. lead → contract → delivery)?
  - Answer:
  - Feeds: [architecture-diagram](architecture-diagram.md), [engagement-phases](engagement-phases.md)
- [ ] **[Critical]** Which systems must integrate (email, calendar, payments, CRM)?
  - Answer:
  - Feeds: [architecture-diagram](architecture-diagram.md)
- [ ] **[Important]** Who triggers key steps (client, internal team, automation)?
  - Answer:
  - Feeds: [engagement-phases](engagement-phases.md)
- [ ] **[Important]** Any approval or sign-off gates?
  - Answer:
  - Feeds: [engagement-phases](engagement-phases.md)
- [ ] {{client_specific_question_workflow}}
  - Notes:

---

## Timeline & rollout

- [ ] **[Critical]** What is the target go-live or first milestone?
  - Answer:
  - Feeds: [engagement-phases](engagement-phases.md)
- [ ] **[Important]** Are there fixed dates (events, campaigns, contracts)?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] **[Important]** Prefer big-bang launch or phased rollout?
  - Answer:
  - Feeds: [engagement-phases](engagement-phases.md)
- [ ] **[Nice-to-have]** How will we handle rollback or pause if needed?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] {{client_specific_question_timeline}}
  - Notes:

---

## People & access

- [ ] **[Critical]** Who are the main stakeholders and decision-makers?
  - Answer:
  - Feeds: [engagement-phases](engagement-phases.md)
- [ ] **[Important]** Who will use the system day-to-day (roles and rough counts)?
  - Answer:
  - Feeds: [context-and-assumptions](context-and-assumptions.md)
- [ ] **[Important]** What access levels or permissions are required?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] **[Nice-to-have]** Who has access to credentials, staging, and production?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] {{client_specific_question_people}}
  - Notes:

---

## Content & deliverables

- [ ] **[Critical]** Who owns content creation, updates, or deliverable production?
  - Answer:
  - Feeds: [context-and-assumptions](context-and-assumptions.md)
- [ ] **[Important]** Is there existing content, documentation, or assets to migrate or reuse?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] **[Important]** Any requirements for how deliverables are presented or distributed (web, PDF, API, dashboard)?
  - Answer:
  - Feeds: [context-and-assumptions](context-and-assumptions.md)
- [ ] **[Nice-to-have]** How often will content or deliverables change after initial delivery?
  - Answer:
  - Feeds: [architecture-diagram](architecture-diagram.md)
- [ ] {{client_specific_question_content}}
  - Notes:

---

## Edge cases & future

- [ ] **[Critical]** What could go wrong that we should plan for?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] **[Important]** Known constraints (budget, tech, compliance)?
  - Answer:
  - Feeds: [risk-and-constraints-register](risk-and-constraints-register.md)
- [ ] **[Nice-to-have]** Planned follow-on work or Phase 2 ideas?
  - Answer:
  - Feeds: [context-and-assumptions](context-and-assumptions.md)
- [ ] **[Critical]** How do we define "done" for this engagement?
  - Answer:
  - Feeds: [context-and-assumptions](context-and-assumptions.md), [engagement-phases](engagement-phases.md)
- [ ] {{client_specific_question_edge_cases}}
  - Notes:
