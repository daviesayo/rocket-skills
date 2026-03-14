# Skills

A repository of custom agent skills following the [Agent Skills](https://agentskills.io) open format. Each skill packages specialised procedural knowledge — structured instructions, templates, and domain context — that any compatible LLM agent can load on demand.

Skills are LLM-agnostic and agent-agnostic. The same skill works across Claude, GPT, Gemini, and any other agent that supports the Agent Skills format (Cursor, Claude Code, Codex, and others).

## Install (for users)

Install this package to copy all skills into your local agent skills directory:

```bash
npm install rocket-skills
```

Or install without adding it to a project:

```bash
npx rocket-skills@latest
```

### What gets installed where

Each skill is copied into **`~/.agents/skills/`** as its own folder. For example, after installing you get:

- `~/.agents/skills/running-consultant-engagements/` — the skill folder and its contents (e.g. `SKILL.md`, `templates/`)

Agents that read skills from `~/.agents/skills/` (e.g. Cursor with the right config) will then see and use these skills automatically.

### Uninstall

Removing the npm package does **not** remove the copied files from `~/.agents/skills/`. To remove a skill, delete its folder:

```bash
rm -rf ~/.agents/skills/running-consultant-engagements
```

(Repeat for any other skill names you want to remove.)

---

## What is a skill?

A skill is a folder containing a `SKILL.md` file. The file has two required pieces: a short YAML frontmatter block (`name` + `description`) and a Markdown body with the actual instructions. When an agent detects that a user request matches a skill's `description`, it reads the full `SKILL.md` into context and follows the workflow inside.

Skills can also bundle supporting files — templates, reference docs, scripts — which the agent loads on demand as needed. This keeps context lean at startup while making richer resources available during execution.

See the [Agent Skills specification](https://agentskills.io/specification.md) for the full format reference.

## How the skills in this repo were built

Skills here were authored using the TDD-for-documentation methodology from [Superpowers](https://github.com/obra/superpowers), specifically the [`writing-skills`](https://github.com/obra/superpowers/tree/main/skills/writing-skills) skill.

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
    ├── SKILL.md       ← required; frontmatter + instructions
    └── ...            ← supporting files (templates/, references/, etc.)
```

The `skills/<skill-name>/` folder is the unit of deployment. When users install via npm, a postinstall script copies each such folder into `~/.agents/skills/<skill-name>/` on their machine.

## Available skills

| Skill | Description |
|-------|-------------|
| [running-consultant-engagements](skills/running-consultant-engagements/) | Orchestrates a structured consulting engagement workflow — from raw discovery inputs to 7 cross-referenced artifacts, generated one at a time with review gates between each step |

---

## Maintainer

### Adding a new skill

1. Create `skills/<your-skill-name>/` and add a `SKILL.md` at the root of that folder (see the [spec](https://agentskills.io/specification.md) for the required frontmatter format).
2. Add any supporting files the skill references (e.g. `templates/`, `references/`) inside `skills/<your-skill-name>/`.
3. Add a row to the “Available skills” table above.
4. (Optional) Validate with the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) tool: `skills-ref validate ./skills/<your-skill-name>/`.

No changes to `package.json` are needed. The postinstall script copies every directory under `skills/` that contains a `SKILL.md`.

### Publishing to npm

**One-time:** Create an account at [npmjs.com](https://www.npmjs.com/signup) if needed, then from the repo run:

```bash
npm login
```

**Each release:**

1. Bump the version (e.g. `npm version patch`).
2. Publish:
   ```bash
   npm publish
   ```
3. Push and push tags:
   ```bash
   git push && git push --tags
   ```

Users get updates with `npm install rocket-skills` or `npm update rocket-skills`. To publish as a scoped package (e.g. `@yourusername/rocket-skills`), set `"name": "@yourusername/rocket-skills"` in `package.json` and run `npm publish --access public`.
