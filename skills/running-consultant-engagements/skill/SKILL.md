---
name: running-consultant-engagements
description: Use when starting a new client engagement, scoping a consulting project, processing discovery call transcripts or kickoff notes, creating structured engagement artifacts, setting up engagement or project docs, processing a client brief or SOW, or updating existing engagement documents with new information mid-project
---

# Running Consultant Engagements

## Overview

Adopt the role of a senior BA/Solutions Architect consultant. Orchestrate a structured engagement workflow that produces 7 cross-referenced artifacts from raw inputs (kickoff notes, transcripts, client briefs). Artifacts are generated in dependency order with review gates between each. Treat all example content (in collapsible `<details>` blocks) as reference — do not assume it applies to the current engagement.

**Core principle:** One artifact at a time, reviewed before the next. Never dump all documents at once. This applies to new engagements AND updates.

## When to Use

- New client engagement, project scoping, or consulting kickoff
- Discovery call transcript or kickoff notes to process
- "Create engagement artifacts" / "set up engagement docs" / "process this client brief"
- Mid-engagement updates (scope change, new constraints, timeline shift)
- Client brief, SOW, or RFP shared for processing

**Don't use for:** single-document tasks, internal team processes, code/technical documentation

## Workflow

**New engagement:**

```
Gather inputs → [wait] → Define principles → [wait] → Create folder → Fill artifacts one-by-one → [wait after each] → Follow-up action list
```

**Updating existing engagement:**

```
Map impact via feeds_into → Read affected artifacts → Update one-by-one in dependency order → [wait after each] → Cross-ref validation → Propagation summary
```

## New Engagement

### 1. Gather inputs

Ask for kickoff notes, client brief, or call transcript. If the input is thin, ask targeted questions and **wait for the user to respond** before proceeding:

- What does the client do? Industry, size, team?
- What problem are we solving? Desired outcome?
- What systems or tools are in play?
- Timeline and budget constraints?
- Who are the stakeholders and decision-makers?

**Minimum input threshold — do not proceed until you have at least:**
1. Client's industry/domain and what they do
2. The problem being solved or desired outcome
3. At least two of: timeline, budget, stakeholders, or systems in play
4. Enough to answer most `[Critical]` questions in the discovery checklist template

If you have fewer than 3 of these, ask questions and **stop your turn**. Wait for the user's response. Do not ask questions and then proceed to generate artifacts in the same message.

Generating a discovery checklist full of `[NEEDS_INPUT]` markers is NOT the same as gathering inputs. The checklist should be mostly filled, with `[NEEDS_INPUT]` only for genuinely unknown items — not as a substitute for asking the user.

### 2. Define engagement principles

Before touching any other artifact, read and fill `templates/engagement-principles.md`. This defines the engagement's Philosophies (3–5) and Patterns (2–4) that inform every downstream document. Follow the template's `LLM_INSTRUCTION` block for generation rules.

**Present the principles to the user and wait for approval before proceeding.** Wrong principles propagate into every artifact — catching them here is cheap; catching them in the architecture diagram is expensive.

### 3. Create engagement folder

Create `engagements/<engagement-name>/` and copy all template files from `templates/` into it (including the filled `engagement-principles.md`).

### 4. Fill artifacts in dependency order

**Read each template file from `templates/` before generating.** Every template contains `LLM_INSTRUCTION` blocks with generation rules, completion criteria, and quality standards. Follow them.

| # | Artifact | Review gate |
|---|----------|-------------|
| 1 | `templates/discovery-checklist.md` | **Wait** — user confirms answers, adds client-specific questions |
| 2 | `templates/context-and-assumptions.md` | **Wait** — scope and assumptions need sign-off |
| 3 | `templates/risk-and-constraints-register.md` | **Wait** — validate risks, mitigations, and constraints |
| 4 | `templates/architecture-diagram.md` | **Wait** — architecture is a key decision point |
| 5 | `templates/decision-log.md` | **Brief pause** — decisions derive from approved architecture |
| 6 | `templates/engagement-phases.md` | **Wait** — timeline and RACI need approval |

After generating each artifact, present it and ask the user to review before continuing. Use the approved version as input for the next artifact.

**STOP. Do NOT generate all 6 artifacts in a single response.** This is the #1 failure mode. Each artifact builds on the user-approved version of the previous one. Generating ahead means you're guessing at scope, risks, and architecture that the user hasn't confirmed.

**No exceptions:**
- Not "I'll generate them all and you can review at the end"
- Not "Here are the first three, I'll wait for the rest"
- Not "I'll draft them all so you have something to react to"
- One artifact. Wait. Next artifact. Wait. Repeat.

### 5. Generate follow-up action list

After all 7 artifacts are complete (principles + 6 templates), produce:

1. A consolidated list of all `[NEEDS_INPUT]` and `[NEEDS_FOLLOW_UP]` items across documents, with priority and suggested owner
2. A cross-reference validation summary: verify consistent IDs, technology names, dates, and terminology across all 7 documents

## Updating Existing Engagements

The same review-gate discipline applies to updates. Present each updated artifact and wait for approval before updating the next. Not "I'll update them all and you can review at the end." One artifact. Wait. Next artifact.

### 1. Map impact

Read the **current content** of each artifact (not just the YAML frontmatter). Then use the dependency metadata to determine which documents are affected:

- **Document-level:** Use `feeds_into` / `depends_on` in each artifact's YAML frontmatter for traversal order
- **Section-level:** The discovery checklist has section-level `feeds` metadata (e.g., `timeline-and-rollout` feeds `[engagement-phases, risk-and-constraints-register]`) — use it to narrow the impact set when changes map to specific sections

Before proceeding, check whether new information items conflict with each other or with existing content. Flag conflicts to the user.

### 2. Update in dependency order

Start with the artifact closest to the root of the affected dependency chain. For each affected artifact:

- **Read the current content** before making changes
- **Mark changed assumptions** with updated status: `Invalidated`, `Superseded`, or `Validated`
- **Add new entries** for new risks, decisions, or constraints — don't only modify existing ones. Use the next available ID in the artifact's schema (e.g., `RISK-004`, `DEC-003`)
- **Never delete resolved items** from the risk register — change status and add resolution notes
- **Present the updated artifact** and wait for the user to review before moving to the next

### 3. Validate and summarize

After all artifacts are updated:

1. **Cross-reference validation** — verify consistent IDs, technology names, dates, and terminology across all updated artifacts. Present the results to the user (or state "no inconsistencies found").
2. **Change propagation summary** — present a table showing which artifacts changed, what changed, and why:

```
| Artifact | What changed | Triggered by |
|----------|-------------|-------------|
| discovery-checklist | Updated timeline answers | Demo moved to April 15 |
| context-and-assumptions | Assumption #3 invalidated | New compliance requirement |
| ... | ... | ... |
```

## Artifact Dependency Chain

```
discovery-checklist
├──► engagement-principles
│    ├──► context-and-assumptions
│    │    ├──► risk-and-constraints-register
│    │    │    ├──► decision-log
│    │    │    └──► engagement-phases
│    │    └──► architecture-diagram
│    │         └──► decision-log
│    ├──► risk-and-constraints-register
│    ├──► architecture-diagram
│    ├──► decision-log
│    └──► engagement-phases
└──► risk-and-constraints-register
```

## Template Reference

### Artifact index

| Template | Purpose | When to use |
|----------|---------|-------------|
| `engagement-principles.md` | Guiding philosophies and recurring patterns for the engagement | After discovery; before any other artifact |
| `discovery-checklist.md` | Discovery questions by theme (scale, workflow, timeline, people, content, edge cases) | From kickoff; use on scope and discovery calls |
| `context-and-assumptions.md` | Engagement context, client situation, in/out of scope, and explicit assumptions | From kickoff; keep updated as assumptions are validated or invalidated |
| `risk-and-constraints-register.md` | Risks, assumptions, issues, dependencies (RAID), plus constraints (cost, time, tech, skills) | From kickoff; add rows as you discover; review before each phase |
| `architecture-diagram.md` | System context and data-flow diagrams (Mermaid) plus short narrative | After discovery; when agreeing system shape and data flow |
| `decision-log.md` | ADR-style log: decision, date, context, options considered, outcome, status | After discovery; add entries as architecture and design decisions are made |
| `engagement-phases.md` | Phases, milestones, deliverables, entry/exit criteria, and optional RACI per phase | After discovery; adjust phase names and deliverables per engagement |

### Template file structure

Each template file in `templates/` contains:

- **YAML frontmatter** — `depends_on`, `feeds_into`, completion criteria, field schemas
- **`LLM_INSTRUCTION` blocks** — detailed generation rules for that artifact (good/bad examples, quality criteria)
- **`{{snake_case}}` placeholders** — all values to fill (search for `{{` in any template to find them)
- **Example sections** in collapsible `<details>` blocks — reference only, never borrow framing or language from examples

## Red Flags

If you catch yourself doing any of these, **stop and reassess:**

| Red flag | Fix |
|----------|-----|
| Generating multiple artifacts without pausing | One artifact. Wait for review. Next artifact. |
| Asking questions and generating artifacts in the same message | Ask and stop. Wait for answers. |
| Discovery checklist full of `[NEEDS_INPUT]` | Gather more input before generating |
| Proceeding without defining engagement principles | Principles first — create `engagement-principles.md` before any artifact |
| Copying framing from template `<details>` examples | Derive from actual engagement inputs |
| Generic scope items ("improvements", "integration work") | Active verbs, specific deliverables |
| Unfalsifiable assumptions ("client is cooperative") | Must be verifiable with a specific check |
| "Monitor closely" as risk mitigation | Score ≥6 needs a concrete action |
| Architecture defaults to the template example pattern | Design for THIS engagement's actual needs |
| Updating artifacts without reading current content | Read the artifact content first, then update |
| Not reading template files in `templates/` before generating | Each has `LLM_INSTRUCTION` blocks with critical rules |
