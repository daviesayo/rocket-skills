# Skills

A repository of custom agent skills following the [Agent Skills](https://agentskills.io) open format. Each skill packages specialised procedural knowledge — structured instructions, templates, and domain context — that any compatible LLM agent can load on demand.

Skills are LLM-agnostic and agent-agnostic. The same skill works across Claude, GPT, Gemini, and any other agent that supports the [agentskills.io](https://agentskills.io) format (Cursor, Claude Code, Codex, and others).

## What is a skill?

A skill is a folder containing a `SKILL.md` file. The file has two required pieces: a short YAML frontmatter block (`name` + `description`) and a Markdown body with the actual instructions. When an agent detects that a user request matches a skill's `description`, it reads the full `SKILL.md` into context and follows the workflow inside.

Skills can also bundle supporting files — templates, reference docs, scripts — which the agent loads on demand as needed. This keeps context lean at startup while making richer resources available during execution.

See the [Agent Skills specification](https://agentskills.io/specification.md) for the full format reference.

## How the skills in this repo were built

Skills here were authored using the TDD-for-documentation methodology from [obra/superpowers](https://github.com/obra/superpowers), specifically the [`writing-skills`](https://github.com/obra/superpowers/tree/main/skills/writing-skills) skill.

The process treats skill creation like test-driven development:

1. **RED** — run a baseline scenario with a subagent and document exactly how it fails or goes wrong without the skill
2. **GREEN** — write the `SKILL.md` addressing those specific failure modes; verify the agent now complies
3. **REFACTOR** — find remaining loopholes in the agent's reasoning, close them, re-verify

Key authoring principles from that methodology, applied here:

- **Description = triggering conditions only.** The `description` field tells the agent *when* to load the skill, not *what the skill does*. Summarising the workflow in the description creates a shortcut the agent takes instead of reading the full instructions.
- **One artifact at a time.** Workflows with sequential dependencies enforce explicit review gates — the agent produces one output, waits for approval, then continues.
- **Red flags over vague guidance.** Each skill includes a concrete list of failure modes and what the correct behaviour is, so the agent has something specific to check against.
- **Progressive disclosure.** Heavy reference material lives in separate files under `skill/templates/` or `skill/references/`, loaded only when needed rather than bloating the main `SKILL.md`.

## How this repo is organised

```
skills/
└── <skill-name>/
    ├── README.md      ← in-depth docs: what it does, how it works, how to install
    └── skill/         ← the deployable unit; copy this folder into any project
        ├── SKILL.md
        └── ...        ← any supporting files (templates, references, scripts)
```

The `skill/` folder is the unit of deployment. Copy its entire contents into your project to install a skill. The parent `README.md` is for humans — it documents the skill's design, workflow, and installation steps in full.

## Available skills

| Skill | Description |
|-------|-------------|
| [running-consultant-engagements](skills/running-consultant-engagements/README.md) | Orchestrates a structured consulting engagement workflow — from raw discovery inputs to 7 cross-referenced artifacts, generated one at a time with review gates between each step |

## Adding a new skill

1. Create `skills/<your-skill-name>/skill/` and add a `SKILL.md` (see the [spec](https://agentskills.io/specification.md) for the required frontmatter format)
2. Add any supporting files the skill references inside `skill/` (e.g. `templates/`, `references/`)
3. Write a `skills/<your-skill-name>/README.md` covering purpose, workflow, and installation
4. Add a row to the table above
5. Validate with the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) tool: `skills-ref validate ./skills/<your-skill-name>/skill`
