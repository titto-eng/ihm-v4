# ihm-web — agent guide

Next.js 16 + Payload 3.91 (Postgres) site for **ihm.edu.au**. Sister project `ihna-web/` is a copy of this one (see `SHARED-FILES.md`).
The inventory of the old site is `../inventory/` (read by scripts; do not redo it).

## Goal
Every live URL of ihm.edu.au renders in the new design, with working enquiries and payments. Most of the site is code: route files
under `src/app/(site)/**/page.tsx` and constants under `src/content/`, edited by a developer and deployed. The CMS (`/admin`) holds
what changes often or is many: courses (including their key facts), news posts, events, staff, media, documents (policy and form
PDFs), testimonials, lookups, and the enquiry and payment records.

## Hard rules (a PR that breaks one is rejected)
1. **Never change a URL.** Every row in `../inventory/v2/ihm/pages.csv` whose `wp_type` is not `sitemap-only` is live and returns 200 at the same path; `sitemap-only` rows follow the parity crawl's live status. In `landing-pages.csv`, `live_status=live` rows return 200, or a 301 only when the row's `recommendation` is `redirect` and the target is in `src/content/redirects.ts`; `redirected` rows redirect to the same target; `gone` rows stay 404. A live URL never becomes a 404. Trailing slashes are kept (308 to the slashed form). A published course or post cannot change its URL (`refuseUrlChange`); add the old URL to `src/content/redirects.ts` first. A document's `publicPath` is its URL: only an admin can change it, and the old path then needs a redirect.
2. **Never drop a form submission or a payment record.** Save to Postgres first, then send. If saving fails, show the user an error.
3. **No secrets in code.** `.env` only. Scripts that read the old repo (`../ihmv3`) never copy a credential out of it.
4. **No personal data from the old repos** (CVs, error logs, agent emails, enquiry history) enters this repo or the import. Recipient addresses are typed by a person into `src/content/enquiry-routing.ts`, never copied from old code.
5. **No old HTML, CSS classes or inline styles reach the database or a page.** CMS content enters only as blocks produced by `scripts/import/html-to-blocks.ts`; code pages are plain JSX written with `src/components/page/` (`Hero`, `Rich`, `Tabs`, ...). No `dangerouslySetInnerHTML` with content, no theme class names. The one exception is JSON-LD through the escaped `safeJsonLd` helper (DEC-26).
6. **Every amount, price and payment id is set server-side.** The browser never decides what is charged.
7. **A module is done when its acceptance checks in `docs/modules/<n>.md` pass**, not when it compiles.

## Stack (fixed)
Next 16 App Router · Payload 3.91 (`@payloadcms/db-postgres` with `blocksAsJSON: true`; plugin: seo; email: Resend or SMTP via nodemailer) · Tailwind v4 only (tokens in `src/styles/theme.css`) · shadcn/ui copied into `src/components/ui/` · react-hook-form + zod · `mysql2` for the portal DB · Payload built-in auth · vitest + Playwright · **npm** (not pnpm).
Payload API reference for agents: `.claude/skills/payload/SKILL.md`.

## Where things live
| What | Where | How to change it |
|---|---|---|
| A content page (`/about-us/`, `/governance/`, ...) | `src/app/(site)/<path>/page.tsx` | edit the JSX; `pageMetadata({...})` is the SEO |
| Home, campus, contact, staff directory, micro-credential hubs, events | same, rendering a template from `src/components/templates/pages.tsx` | edit the JSX children / hero props |
| Landing pages (`/lp/<slug>/`, `/enquirenow/scholarship/`) | `src/app/(site)/lp/<slug>/page.tsx` + rows in `src/content/landing.ts` and `landing-routes.ts` | edit the slots (`lead`, `body`, `trail`) |
| Page registry (sitemap, search, hubs) | `src/content/pages.ts` | add a row for every new content page |
| Header nav, footer, site settings (phone, email, WhatsApp, tracking ids, embed hosts) | `src/content/nav.ts`, `footer.ts`, `site.ts` | edit the constants |
| The 26 enquiry forms and the recipient groups | `src/content/forms.ts`, `enquiry-routing.ts` | edit; the browser never sees destinations |
| Exact redirects (old URLs) | `src/content/redirects.ts` (loaded by `next.config.ts`) | add a row and restart; prefix rules are in `src/lib/legacy-redirects.ts` |
| Old staff profile URLs | `src/content/staff-paths.ts` → `staff` collection, served by `src/app/(site)/[...slug]/page.tsx` | add a line per URL |
| Courses (incl. key facts), posts, events, staff, media, testimonials, lookups | Payload `/admin` | marketing edits them; finance edits fees |
| Policy, procedure and form PDFs at their old URLs | Payload `/admin` → Documents, served by `src/app/(site)/pdf/[...path]/route.ts` | marketing replaces the file (`docs/HOW-TO-REPLACE-A-POLICY-PDF.md`) |
| A bespoke course page | a route file that renders `<CourseFacts course={course} />` (`src/components/course/CourseFacts.tsx`) | the figures stay in the CMS |
| Enquiry records, payments, products, alumni, users | Payload `/admin` | system-written; staff read |

## Modules (`docs/modules/`)
| Doc | Owns |
|---|---|
| `00-architecture.md` | routes, proxy (`src/proxy.ts`), env, caching, storage, jobs, deploy |
| `05-design-system.md` | tokens, typography, layout components, templates, the page authoring kit |
| `10-content-model.md` | every collection and global, fields, access, hooks; the code registries |
| `20-blocks.md` | block configs, renderers, registry, `CourseFacts` |
| `30-import.md` | `html-to-blocks` and the import steps (courses, posts, staff, media, documents, ...) |
| `40-enquiries.md`, `41-campaigns.md` | the form pipeline, adapters, campaign codes |
| `45-payments.md` | gateways, flows, jobs, receipts |
| `50-portal-data.md` | portal DB queries, caching, fixtures |
| `60-landing.md` | the landing templates and route files |
| `70-urls-seo.md`, `80-tracking.md` | redirects, document URLs, metadata, sitemap; GTM and pixels |
| `90-security.md` | access matrix, admin guard, rate limits, CSP |
| `DECISIONS.md` | the standing decisions (DEC-n), cited from code comments |

## Working rules for agents
- Read `docs/modules/DECISIONS.md`, then your module doc, before writing code. Read `.claude/skills/payload/SKILL.md` before touching Payload config. Code comments cite DEC numbers: keep them stable.
- Docs describe the system as it is, in the present tense. When you change behaviour, update the module doc (and the DEC row) in the same change; never add change history.
- One writer per path set. Work in the worktree you were given; never edit files outside your module's paths without saying so.
- Big data (`../inventory/data/*.json`, `html-analysis.csv`) is read by scripts, never pasted into context. Reports go to `scripts/import/out/*.report.json` (or `scripts/dev/out/`, gitignored).
- Schema changes: dev pushes the schema from `npm run dev`; ship a migration with `npm run payload migrate:create` and run `npm run generate:types`.
- Before reporting done: `npm run check` green, plus your module's acceptance checks.
- Report ≤150 words: what was built, check results, file paths, open questions. No code dumps.
- Never send to a real CRM, gateway or email service from dev or tests. `DRY_RUN=1` (the default) records instead of sending; an enquiry adapter sends only when `DRY_RUN` is not `1`, it is listed in `ENQUIRY_LIVE_ADAPTERS` and its variables are set (DEC-50). Turning one on is the owner's call. Mailpit catches dev email.

## Commands
```
docker compose up -d          # postgres:16 (host port 5433), mysql:8 portal fixtures (3307), mailpit (1025/8025)
npm run dev                   # http://localhost:3000, admin at /admin; pushes the dev schema
npx tsx scripts/dev/seed-admin.ts   # first admin from DEV_ADMIN_EMAIL / DEV_ADMIN_PASSWORD
npm run payload migrate       # production: apply src/migrations/
npm run generate:types
npm run check                 # generate:types, typecheck, lint, check:blocks, test:int, test:blocks
npm run import -- <step>      # see docs/modules/30-import.md (e.g. documents, wp-courses, staff, media)
npm run import:refresh        # re-pull the live site, re-import changed items
npm run parity                # crawl old vs new, writes scripts/parity/out/parity-ihm.csv
npm run status-sheet          # refresh ../inventory/v2/ihm/*.csv + the xlsx from the code registries, the CMS and the parity crawl
npm run verify:gateways       # auth-only gateway credential check (VERIFY_GATEWAYS=1)
```

## Inputs you will be pointed at
`../inventory/v2/ihm/{pages,landing-pages,enquiries,routing-matrix,payments,features,html-analysis}.csv`, `../inventory/data/ihm/{pages,posts,courses}.json`, `../inventory/02-ihm-theme.md`, `../inventory/05-ihm-enquiries-integrations.md`, `../inventory/09-databases-data-sources.md`, `../inventory/10-tracking-seo-cross-cutting.md`, design source `~/Projects/ihm/bon/`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
