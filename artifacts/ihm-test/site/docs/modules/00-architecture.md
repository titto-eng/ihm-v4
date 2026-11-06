# 00 — Architecture

## 1. Purpose
The skeleton every module plugs into: routes, the proxy (`src/proxy.ts`), env, caching, dev services, deploy, folders.
Content pages, landing pages, menus, forms, recipient groups and redirects are code (route files under `src/app/(site)/` and
constants under `src/content/`). The CMS (`/admin`) holds what changes often or is many: courses, posts, events, staff, media,
documents, testimonials, lookups, and the enquiry and payment records.

## 2. Data model
Collections and the one global (`courseShared`) are in `10-content-model.md`. Routing depends on `courses.path`, `posts.path`
(+ `category`), `staff.slug`, `media.legacyPath`, `documents.publicPath`, and the code registries in `src/content/`
(`pages.ts`, `landing.ts`, `landing-routes.ts`, `redirects.ts`, `staff-paths.ts`).

## 3. Admin capabilities
None of its own. Publishing a course, post, event, staff doc or document refreshes the pages that show it (§4). A code page changes
by editing its route file and deploying.

## 4. Front-end behaviour

**Route map** (`src/app/`)

| Route | What |
|---|---|
| `(payload)/admin/[[...segments]]`, `(payload)/api/[...slug]` | Payload admin and REST (`/api/<collection>`, `/api/users/*`, `/api/alumni/*`, `/api/media/file/*`, `/api/documents/file/*`, `/api/payload-jobs/run`). GraphQL is disabled. |
| `(site)/page.tsx`, `(site)/<path>/page.tsx` | home and the content pages: plain JSX over the authoring kit `src/components/page/`, or a data-driven template from `src/components/templates/pages.tsx` (`HomePage`, `SchoolPage`, `CampusPage`, `CampusListingPage`, `CalendarPage`, `ContactPage`, `StaffDirectoryPage`, `MicroCredentialPage`, `MicroCredentialsHubPage`, `EventsPage`, `LandingSectionPage`, `AlumniHubPage`) rendered with `title`, `path`, `hero` and JSX children |
| `(site)/courses/page.tsx`, `courses/[slug]` | course listing; `CourseDetail` |
| `(site)/blog/[[...parts]]`, `news/[[...parts]]` | posts (`/blog/<slug>/`; news-category posts at `/news/<slug>/`) and their listings |
| `(site)/lp/<slug>/page.tsx`, `enquirenow/scholarship/…` | landing pages (60); dynamic companions `lp/[slug]/{[campaign],thanks.php,thankyou,thankyou.php,application_form.php,index.php}` |
| `(site)/[...slug]` | catch-all: answers only the staff profile URLs in `src/content/staff-paths.ts`; everything else 404s |
| `(site)/alumni/*` | alumni login, register, verify, reset, dashboard (`/alumni/` is a page) |
| `(site)/makepayment/`, `payment-options/`, `make-a-payment/`, `pay-online-error/`, `pay/*` | payment pages, gateway pages, results and receipts (45) |
| `(site)/pay/return/{payway,securepay,airwallex}`, `payway-response`, `airwallex-webhook` | gateway return and legacy-URL route handlers (45) |
| `(site)/pdf/[...path]` | document file route: `documents` row by `publicPath` (or alias), else the static copy in `public/`, else 404 (70) |
| `(site)/wp-content/uploads/[...path]` | old image URLs: `media.legacyPath` lookup → 301 to `/api/media/file/<filename>` (logic in `src/app/api/legacy-media/handler.ts`) |
| `(site)/sitemap.xml`, `robots.txt`, `llms.txt` | route handlers (70). `llms.txt` (`src/lib/seo/llms.ts`): llmstxt.org Markdown for language models — site summary, then link lists of the published courses, the `pages.ts` rows grouped by template (noindex, form, utility and landing pages left out) and the 30 latest posts; revalidated hourly |
| `api/enquire` (+ `retry`, `release`) | form pipeline (40) |
| `api/enquire/upload` | multipart upload for a form's `file` field (40 §4a, `src/lib/enquiries/upload.ts`): rate limited (5 a minute per IP and form), 10MB, type from the first bytes (PDF, DOC, DOCX) and checked again by Payload; saved to the private `application-files` collection before the answer, which is the file reference the enquiry then carries |
| `api/payments/{start,securepay/charge,webhook/airwallex,webhook/payway,fake/[uuid]}` | payments (45) |
| `api/revalidate` | POST `{tags?, paths?, all?}` with header `x-revalidate-secret` = `REVALIDATE_SECRET` |

Custom `api/<name>` folders win over Payload's `[...slug]`, so no collection slug may be `enquire`, `payments`, `revalidate` or
`legacy-media`.

**Proxy** (`src/proxy.ts`, Next 16's name for middleware, DEC-1). The matcher skips `_next/static`, `_next/image`, `favicon.ico`,
`media/`, `api/media/`. In order, first answer wins:
1. `/wp-json`, `/xmlrpc.php`, `/wp-login.php`, `/wp-admin` (and below) → 410.
2. `/admin` guard (`src/lib/security/adminGuard.ts`): when `ADMIN_BASIC_USER` and `ADMIN_BASIC_HASH` (SHA-256 hex of the password)
   are set, HTTP basic auth is required, else 401. A `cf-access-authenticated-user-email` header (Cloudflare Access) replaces it only
   with `ADMIN_GUARD_TRUST_CF_ACCESS=1`. Payload login still applies.
3. Legacy prefix/contains redirects from `src/lib/legacy-redirects.ts`: `/enquirenow/*` → `/courses/` 302 except
   `/enquirenow/scholarship/`; a path containing `learning-hub` → `/` and `emergency-services` → `/external-services/`, both 301.
4. `/(pdf|brochures|IHM_Domestic_SHB|International-SHB)/**.pdf` → rewrite to `/pdf/~<path>`, so the document route answers and the
   `documents` collection wins over a static copy in `public/`.
5. `/wp-content/uploads/*` → passed through untouched.
6. Everything else: security headers and CSP (90).

Trailing slashes come from `trailingSlash: true` in `next.config.ts`: `/x` → 308 `/x/`; paths with a file extension stay
slashless. Exact redirects are `redirects()` in `next.config.ts`, built from `src/content/redirects.ts` with `statusCode` 301/302;
they run before the proxy and a change needs a restart.

**Path resolution.** The file router decides. Order: config redirects → proxy rules → a route file for the exact path →
`courses/[slug]`, `blog/…`, `news/…` (published docs; drafts only in draft mode) → the catch-all (staff paths only) → `notFound()`.
`src/lib/paths.ts` holds `normalisePath`, `slugsToPath`, `slugify`, `courseUrl`, `postUrl`, `landingUrl`.
`src/content/pages.ts` (one row per content page) and `landing.ts` feed the sitemap, search and hubs: a new page
needs its route file and its registry row.

**Caching and revalidation**
- Code pages change on deploy and carry no tags.
- CMS reads go through `unstable_cache` with collection tags (`<slug>` and `collection:<slug>`), doc tags (`course:<slug>`,
  `post:<slug>`, `staff:<slug>`, `event:<slug>`, `document:<publicPath>`), `global:courseShared`, `sitemap` and `documents`.
  Course pages and template data (`src/components/templates/data.ts`) revalidate at most every 300 s, the sitemap every 3600 s, the
  document index every 86 400 s; tags normally expire them first.
- Publish hooks (`src/collections/shared/hooks.ts`): `revalidateHooks(slug)` on events, staff, testimonials and lookups (lookups
  also tag `courses`); `contentHooks('courses'|'posts')` adds `sitemap`; `revalidateGlobalAfterChange` on `courseShared`. They call
  `revalidateTag(tag, 'max')` when the doc is or was published, skip under `context.importing` / `context.disableRevalidate`, and
  never throw. `documents` expires its tags immediately (`{ expire: 0 }`) because Payload deletes the replaced file.
- Import steps run outside Next: `scripts/import/cli.ts` POSTs `/api/revalidate/` with `{all:true}` after every non-dry step (DEC-33).
- Portal data has its own cache (50).

## 5. URLs
Live paths keep their slash and status (AGENTS.md rule 1); file URLs keep their extensions. Canonical origin is
`NEXT_PUBLIC_SITE_URL`. Redirects, canonicals and sitemap: 70.

## 6. Integrations
Env names are validated at boot by `src/env.ts` (a missing `DATABASE_URL` or a `PAYLOAD_SECRET` under 32 characters stops the
app); `.env.example` lists them with comments. Values live only in `.env`. Every `process.env.X` read in `src/` or `scripts/` is a
key of the `src/env.ts` schema and appears in `.env.example` (DEC-24, `tests/import/env-declarations.test.ts`).

| Area | Names |
|---|---|
| core | `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `PAYLOAD_SECRET`, `REVALIDATE_SECRET`, `CRON_SECRET`, `DRY_RUN`, `NEXT_PUBLIC_ROBOTS`, `DISABLE_DB_PUSH`, `ENQUIRY_AUTORUN`, `PERF_TIMING`, `PREVIEW_SECRET`, `STUDENT_PORTAL_EMBED_ORIGIN`, `DEV_ADMIN_EMAIL`, `DEV_ADMIN_PASSWORD` |
| scripts only | `IMPORT_DRY`, `LEGACY_BASE_URL`, `CHECK_BASE_URL`, `VERIFY_GATEWAYS`, `VERIFY_PAYWAY_TOKEN` |
| admin guard | `ADMIN_BASIC_USER`, `ADMIN_BASIC_HASH`, `ADMIN_GUARD_TRUST_CF_ACCESS` |
| email | `EMAIL_FROM`, `RESEND_API_KEY`, `SMTP_HOST`, `SMTP_PORT` |
| enquiries (40) | `ENQUIRY_LIVE_ADAPTERS`, `ENQUIRY_NOTIFY_TO`, `RECAPTCHA_SECRET_KEY`, `RECAPTCHA_MIN_SCORE`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `HUBSPOT_*`, `PORTAL_CRM_URL`, `PORTAL_IHM_STAKEHOLDER_URL`, `PORTAL_IHNA_STAKEHOLDER_URL`, `ADMISSIONS_API_URL`, `ADMISSIONS_API_KEY`, `DYNAMICS_ENABLED`, `DYNAMICS_*`, `RATE_LIMIT_STORE` |
| payments (45) | `PAYMENTS_*`, `PAYWAY_*`, `SECUREPAY_*`, `AIRWALLEX_*`, `PORTAL_IHM_URL`, `PORTAL_HCLA_URL`, `PORTAL_IHNA_URL`, `MONDAY_*`, `MSGRAPH_*`, `CANVAS_*` |
| portal (50) | `PORTAL_ENABLED`, `PORTAL_QUERY_TIMEOUT_MS`, `PORTAL_DB_HOST`, `PORTAL_DB_PORT`, `PORTAL_DB_NAME`, `PORTAL_DB_RO_USER`, `PORTAL_DB_RO_PASSWORD`, `PORTAL_DB_PAY_USER`, `PORTAL_DB_PAY_PASSWORD` (aliases `PORTAL_DB_READ_USER`, `PORTAL_DB_READ_PASSWORD`, `PORTAL_DB_PAYMENTS_USER`, `PORTAL_DB_PAYMENTS_PASSWORD`), `PORTAL_TZ` |
| tracking (80) | `TRACKING_ENABLED` (the ids are in `src/content/site.ts`) |

`DRY_RUN` defaults to `1`: adapters and gateways record instead of sending. Email goes through Resend when `RESEND_API_KEY` is set,
otherwise SMTP (`SMTP_HOST`/`SMTP_PORT`, default `localhost:1025` = Mailpit) (`src/lib/adapters/transport.ts`).

**Dev services** (`docker-compose.yml`; the app runs on the host): `postgres:16` on host port 5433 (db `ihm`; a Homebrew Postgres
on 5432 works too, `DATABASE_URL` decides, DEC-27); `portal-mysql` (`mysql:8`, host port 3307, db `ihmedu_portal`; load the
fixtures with `docker/portal-fixtures/load.sh`); `mailpit` (SMTP 1025, UI 8025).

**Isolated laptop workflow (DEC-73).** `docs/LOCAL-DEVELOPMENT.md` documents the `local:*`
commands. `.env.localdev` supplies fresh private settings; the launcher accepts only
loopback PostgreSQL databases named `ihm_local` or `ihm_local_<suffix>`. It forces the
test protections and disables schema push except for explicit `local:schema`.
`LOCAL_DEV=1` switches the existing upload adapter to `.local-data/` without changing
Payload access controls or upload object-key fields. The Replit launcher forces
`LOCAL_DEV=0`. GitHub checks use a fresh disposable PostgreSQL database, not hosted data,
and do not publish. Full fixture-dependent integration checks remain a separate suite.

**Schema.** `postgresAdapter` with `blocksAsJSON: true`. Dev pushes the schema from the running dev server only; scripts run with
`DISABLE_DB_PUSH=1` (DEC-46). Production applies `src/migrations/` with `npm run payload migrate`:
`20261019_101350_cut_pages_to_code` (baseline), `20261020_071125_add_course_facts`, `20261020_071535_add_documents`. Every schema
change ships a migration (`npm run payload migrate:create`).

**Storage.** `media` and `documents` are Payload uploads on local disk (`media/` and `media/documents/`, gitignored). Production
must persist that directory or move both collections to a cloud storage adapter. Static files that are not documents are served
from `public/pdf/`, `public/brochures/`, `public/IHM_Domestic_SHB/`, `public/International-SHB/` (gitignored, filled by
`npm run import -- static`).

**Jobs** (`src/jobs/index.ts`): queues `enquiries`, `payments`, `maintenance`. `autoRun` runs in-process (every minute in
production, every 20 s in dev) unless `NODE_ENV=test` or `ENQUIRY_AUTORUN=0`. The Docker image's Node process is the only
scheduler; `/api/payload-jobs/run` (`Authorization: Bearer $CRON_SECRET` or an admin session) runs a queue on demand.

**Deploy.** `next.config.ts` sets `output: 'standalone'`; the `Dockerfile` builds with the production env as a BuildKit secret (never in a layer), copies `.next/standalone` and runs its `server.js`; `/app/media` is a persistent volume. `.dockerignore` keeps `.env`, `media/`, `.data/` and reports out of the build context. The hosting handover (dump, uploads, static PDF stores, source) is made by `deploy/make-handover.ps1`; the steps for the hosting team are in `docs/DEPLOYMENT.md`, and `deploy/mark-migrations.sql` records the bundled migrations after the dump is restored.
`poweredByHeader: false` drops `X-Powered-By`, and in production `headers()` adds `Strict-Transport-Security:
max-age=63072000; includeSubDomains` on every path (90 §4).

**Folders:** `src/collections/` (+ `shared/`), `src/globals/` (`courseShared`), `src/content/` (code constants and registries),
`src/blocks/<name>/{config.ts,Component.tsx}`,
`src/components/{ui,layout,page,templates,course,forms,payments,seo,tracking,audience,alumni,blocks}`,
`src/lib/{portal,adapters,payments,enquiries,seo,alumni,security}/`, `src/jobs/`, `src/migrations/`, `src/styles/theme.css`;
`scripts/{import,parity,dev}/` (reports in `out/`); `tests/`. npm only (`package-lock.json`).

## 7. Import / seed
Not owned (30). Import steps write through the Local API with `context.importing`, then clear the cache through `/api/revalidate`.

## 8. Acceptance checks
1. `docker compose up -d` starts postgres, portal-mysql and mailpit; `npm run dev` serves `/` and `/admin`.
2. `npm run check` (generate:types, typecheck, lint, check:blocks, test:int, test:blocks) is green.
3. `curl -I localhost:3000/about-us` → 308 `/about-us/`; `/pdf/<file>.pdf` gets no slash.
4. `/wp-json/`, `/xmlrpc.php`, `/wp-login.php`, `/wp-admin/` → 410.
5. With `ADMIN_BASIC_USER`/`ADMIN_BASIC_HASH` set, `/admin` without credentials → 401.
6. A row in `src/content/redirects.ts` answers its status at `/old/` (and `/old` via the slash redirect) after a restart.
7. A route-file path answers 200; a `staff-paths.ts` path answers 200 through the catch-all; an unknown path and a draft course or
   post answer 404.
8. Publishing a course title change shows on its page on the next request.

## 9. IHNA differences
`ihna-web` is a copy of this repo. `SHARED-FILES.md` lists the paths kept identical and the site-specific ones (theme palette,
portal queries, `src/content/**`, page route files, `.env`). IHNA enables the Dynamics adapter (`DYNAMICS_ENABLED=1`, DEC-12).

## 10. Open questions
The Replit test deployment uses the original Next/Payload app under `artifacts/ihm-test/site`.
CMS uploads use the Replit App Storage adapter; application files remain private behind Payload admin access.
Static assets are stored in App Storage and restored into public before a deployment build.
The test launcher forces dry-run/noindex/no-tracking and blocks live payment endpoints and student application embeds.
The initial admin API and admin UI both require the test Basic Auth gate. Email delivery fails explicitly.
Deploy only as one Reserved VM; enable ENQUIRY_AUTORUN=1 there for the sole scheduler.
No Payload migrations or schema push run during startup/build. Replit publishing manages its isolated database schema.
1. Production file storage for `media` and `documents`: a persistent volume or a cloud storage adapter (none is configured).
2. Production rate-limit store: `RATE_LIMIT_STORE=postgres` creates `enquiry_rate_limits` outside Payload's schema (DEC-54).
3. Draft preview: course and post routes honour `draftMode()`, but no route enables draft mode, so live preview shows the
   published version.
