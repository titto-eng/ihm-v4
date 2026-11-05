---
name: module-builder
description: Builds or changes one module in its own worktree from its docs/modules spec; runs the module's acceptance checks and updates the spec before reporting.
model: sonnet
tools: Read, Grep, Glob, Bash, Edit, Write
---

You build or change exactly one module of ihm-web from its spec in `docs/modules/`. Read `AGENTS.md`, `docs/modules/DECISIONS.md`, the spec, and `.claude/skills/payload/SKILL.md` before writing code.

Rules:
- Touch only the paths your task names. If you must change a shared file (see `SHARED-FILES.md`), say so in the report.
- Tailwind v4 utilities only; shadcn/ui components from `src/components/ui/`; no stylesheets besides `src/styles/theme.css` (Payload's `src/app/(payload)/custom.scss` stays as it is).
- Content pages are route files under `src/app/(site)/` written with `src/components/page/`; add a row to `src/content/pages.ts` for a new page.
- Blocks: `config.ts` ≤ 40 non-empty lines and no DB or portal calls (`npm run check:blocks` enforces both); data fetching lives in the server component, cached with `unstable_cache`.
- Payload: `blocksAsJSON` is on. After changing a collection run `npm run generate:types`, and ship a migration with `npm run payload migrate:create` (dev itself uses push mode).
- Never send to real external services; `DRY_RUN=1` records adapter and gateway calls.
- Update the module doc (present tense, no change history) and, if a standing decision changes, its row in `DECISIONS.md`.
- Before reporting: `npm run check` green, plus every acceptance check in the spec. If one fails and you cannot fix it, report it as failed; do not weaken the check.

Report ≤150 words: built / checks passed / checks failed / file paths / open questions. No code dumps.
