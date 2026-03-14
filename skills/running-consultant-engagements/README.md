# Running Consultant Engagements

An agent skill (following the [agentskills.io](https://agentskills.io) open format) that turns raw discovery inputs — kickoff notes, call transcripts, client briefs, SOWs — into a set of 7 cross-referenced engagement artifacts, generated one at a time with a review gate between each step. Compatible with any LLM agent that supports the Agent Skills format.

## What it does

The skill instructs the agent to adopt the role of a senior BA/Solutions Architect consultant. Given any consulting kickoff input, it:

1. Asks targeted questions until it has enough context to proceed
2. Defines engagement principles (the philosophical stance for the whole engagement) and waits for your approval
3. Creates an `engagements/<name>/` folder and fills 6 structured artifact templates in strict dependency order, pausing after each for your review
4. Produces a final follow-up action list and cross-reference validation across all 7 documents

The defining characteristic is **one artifact at a time, reviewed before the next**. The agent will not batch-generate documents. Wrong principles propagate into every downstream artifact — catching them early is the point.

## When to use it

Trigger phrases that activate this skill:

- "Start a new engagement for [client]"
- "Process these kickoff notes / discovery call transcript"
- "Create engagement artifacts" / "Set up engagement docs"
- "Scope this project" / "Process this client brief / SOW / RFP"
- Mid-engagement: "Update the engagement — the timeline has shifted" / "New constraint: [X]"

**Not for:** single-document tasks, internal team process docs, code or technical documentation.

## The 7 artifacts

| # | Artifact | Purpose |
|---|----------|---------|
| — | `engagement-principles.md` | Guiding philosophies (3–5) and recurring patterns (2–4) for the engagement; generated first, informs everything else |
| 1 | `discovery-checklist.md` | Discovery questions by theme: scale, workflow, timeline, people, content, edge cases |
| 2 | `context-and-assumptions.md` | Engagement context, client situation, in/out of scope, explicit assumptions |
| 3 | `risk-and-constraints-register.md` | RAID log (risks, assumptions, issues, dependencies) plus cost/time/tech/skills constraints |
| 4 | `architecture-diagram.md` | System context and data-flow diagrams (Mermaid) with short narrative |
| 5 | `decision-log.md` | ADR-style log of architecture and design decisions |
| 6 | `engagement-phases.md` | Phases, milestones, deliverables, entry/exit criteria, and optional RACI per phase |

## Artifact dependency chain

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

Artifacts are generated in this dependency order. The agent reads each template's `feeds_into` / `depends_on` YAML metadata to determine traversal order during updates.

## How the workflow runs

### New engagement

```
Gather inputs → [wait] → Define principles → [wait] → Create folder
→ Fill artifact 1 → [wait] → Fill artifact 2 → [wait] → ... → Follow-up action list
```

The agent will not proceed past the principles step without your explicit approval. If it has fewer than 3 of the minimum required inputs (client domain, problem/outcome, and at least two of: timeline, budget, stakeholders, systems), it stops and asks.

### Updating an existing engagement

```
Map impact via feeds_into → Read affected artifacts → Update in dependency order
→ [wait after each] → Cross-reference validation → Propagation summary
```

When you bring new information mid-engagement (scope change, new constraint, timeline shift), the agent identifies which artifacts are affected using the dependency metadata, reads their current content, updates each in order, and presents a change propagation table at the end.

## Template internals

Each template file in `skill/templates/` contains:

- **YAML frontmatter** — `depends_on`, `feeds_into`, completion criteria, and field schemas
- **`LLM_INSTRUCTION` blocks** — detailed generation rules with good/bad examples and quality criteria
- **`{{snake_case}}` placeholders** — every value to be filled (search for `{{` to find them)
- **`<details>` example sections** — reference only; the agent must not borrow framing or language from examples

## How to install

1. Copy the entire `skill/` folder into your project (or a central skills directory your agent is configured to read from):

   ```
   your-project/
   └── skill/
       ├── SKILL.md
       └── templates/
           ├── engagement-principles.md
           ├── discovery-checklist.md
           └── ...
   ```

2. Point your agent at the skill. How this works depends on the agent:
   - **Cursor** — place the `skill/` folder at the project root; Cursor discovers `SKILL.md` automatically
   - **Claude Code** — copy into `~/.claude/skills/running-consultant-engagements/`
   - **Other agents** — follow the [Agent Skills client implementation guide](https://agentskills.io/client-implementation/adding-skills-support.md)

3. Start a new engagement by telling the agent: *"Start a new engagement for [client name]"* and paste your kickoff notes.

## Quality guardrails built into the skill

| Red flag | What the skill does |
|----------|---------------------|
| Agent generates multiple artifacts at once | Skill explicitly prohibits this — one artifact, then wait |
| Discovery checklist full of `[NEEDS_INPUT]` | Skill requires minimum input threshold before generating |
| Principles skipped | Principles must be approved before any template is touched |
| Risk mitigation says "monitor closely" | Score ≥6 requires a concrete action, not passive monitoring |
| Assumptions are unfalsifiable | Must be verifiable with a specific check |
| Template examples copied verbatim | `<details>` blocks are reference only; agent derives from actual inputs |
| Updating without reading current content | Skill requires reading each artifact before modifying it |
