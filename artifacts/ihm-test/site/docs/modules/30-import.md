# 30 — Import (`scripts/import/`)

## 1. Purpose
Loads IHM content from the old WordPress site into Payload as blocks only (AGENTS.md rule 5): `posts`, `courses`, `staff`, lookups, `media`, `documents`, plus the static PDF stores in `public/`. Pages, landing pages, menus, forms and redirects are code (`src/app/(site)/**`, `src/content/*`) and have no import step.
Every step is a file in `scripts/import/steps/`, is idempotent, and writes `scripts/import/out/ihm-<step>.report.json`. Reports carry counts, ids, paths and reasons, never body text.

## 2. Data model
- `posts`, `courses`: `import` group (`importGroup()`, `src/collections/shared/fields.ts`): `wpId` (unique, the upsert key), `importClass` (`A | B | C-lite | C | D | new`, from `html-analysis.csv:class`), `reviewStatus` (`auto | check | needs-rebuild | kh-unresolved | ok`), `importReport` (json: hashes, reasons, coverage), `reviewedBy`, `reviewedAt`. Only a signed-in person can set `ok`; the `stampReview` hook stamps `reviewedBy`/`reviewedAt` and reverts `ok` written by a script.
- `staff.legacyId` (unique, the WP page id of the person's primary profile page), `staff.courses` (courses the person manages; read by the CourseManagers block).
- `media.legacyPath` (unique): original path without host or leading slash (`wp-content/uploads/...` or `wp-content/themes/mwt-ihm/assets/...`).
- Lookups (`src/collections/Lookups.ts`): keyed by `slug`; `legacyId` stays empty.
- `documents.publicPath` (unique): the public URL of the PDF.
- `courseShared` global: course blocks identical across every real course (written by `wp-courses` only when such blocks exist).

## 3. Admin capabilities
Imports are CLI-only. Marketing works the review queue by filtering `import.reviewStatus` (a default column on courses) and reading `import.importReport.reasons`, then sets `ok`. A doc set to `ok` is skipped by `import:refresh` and keeps `ok` on re-import while its source is unchanged.

## 4. Front-end behaviour
Imported docs render like any other. Writes pass `context: { importing: true }` and `overrideAccess: true`; collection hooks skip revalidation and the URL-change guard when `importing` is set. After every non-dry step `cli.ts` POSTs `{ all: true }` to `${NEXT_PUBLIC_SITE_URL}/api/revalidate/` with header `x-revalidate-secret: REVALIDATE_SECRET` (DEC-33); `documents` also posts `{ tags: ['documents', 'collection:documents'] }`. Without `REVALIDATE_SECRET`, or with the dev server down, the cache is not cleared and a warning is printed.

## 5. URLs
- Posts: `/blog/<slug>/`; the 9 posts whose live URL is under `/news/` get category `news` and keep `/news/<slug>/` (path computed in `src/collections/Posts.ts`). The upsert fails an item whose stored `path` differs from its live path.
- Courses: the `pages.csv:path` of the course (`/courses/<slug>/`).
- Staff profiles stay at their old root URLs through `src/content/staff-paths.ts` (57 URLs → 56 staff slugs; `/dr-md-parves-sultan-2/` shares one doc, DEC-9).
- Documents: served at `publicPath` (`/pdf/**`, `/brochures/**`, `/IHM_Domestic_SHB/*`, `/International-SHB/*`) through the proxy rewrite to `src/app/(site)/pdf/[...path]/route.ts`.
- Links in imported content: `https?://(www.)?ihm.edu.au/...` becomes site-relative; internal links not in `pages.csv` are reported as dead (`lib/links.ts`), `uat.*` links are reported, file links (PDF, uploads) are kept.

## 6. Integrations
- Inventory from the WordPress database: `npm run inventory:wp -- --db=<name> [--host --port --user --password --prefix=wp_]` (`scripts/import/wp-db-inventory.ts`, read-only SELECTs) writes `.data/inventory/` (git-ignored): `data/ihm/{pages,posts,courses}.json` in the REST shape the steps read (published items only; `content` = `post_content`, since the theme disables wpautop; `featured_media` = the `_thumbnail_id` file) and `v2/ihm/{pages,html-analysis}.csv` (staff rows from `src/content/staff-paths.ts`). No users, comments or form entries are read (rule 4). `lib/config.ts` uses `../inventory` when it exists, else `.data/inventory`.
- Featured images: `media` imports every item's `featured_media`; `wp-posts` uses it as `heroImage` (before the first body image); `wp-courses` sets `heroImage` from it when the file is imported.
- `media` reads a file from `../ihmv3/<legacyPath>` when the old install has it, and GETs it from `LEGACY_BASE_URL` otherwise (report `fromLocal`).
- Inputs (paths fixed relative to the repo root in `lib/config.ts` and the steps; no env override): `../inventory/data/ihm/{pages,posts,courses}.json` (186/91/26 WP REST items), `../inventory/v2/ihm/{pages,html-analysis,landing-pages}.csv`, and the old repo `../ihmv3/` (theme assets, uploads, static PDF stores, `kh_id` evidence).
- Env: `DATABASE_URL`, `PAYLOAD_SECRET` (Payload), `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL` (cache clear), `LEGACY_BASE_URL` (scripts only, default `https://ihm.edu.au`), `IMPORT_DRY=1` (same as `--dry`). `cli.ts` and `refresh-live.ts` set `DISABLE_DB_PUSH=1` so only the dev server pushes schema (DEC-46).
- Live site: GET only, no credentials, never a form post (`media`, `theme-photos`, `wp-json-check`, `import:refresh`, `fill-course-facts`).

## 7. Import / seed

### 7.1 CLI
`npm run import -- <step|a,b|all> [--dry|--dry-run] [--force] [--only=<wpId|path>,...] [--<flag>=<value>]` (`tsx scripts/import/cli.ts`, Payload Local API).
- Steps are discovered from `scripts/import/steps/*.ts`; each exports `name`, optional `order` (default 100) and `run(ctx)` (contract in `lib/context.ts`). `all` runs ascending `order`, ties by name. No argument prints the step list.
- Report contract (`StepReport`): `site, step, dryRun, startedAt, finishedAt, created, updated, skipped, failed[{id, reason}], reviewQueue[{id, path, reasons, confidence}]` plus step-specific counters. A thrown step records `failed[{id: 'step'}]` and exits 1.
- `--only` limits a step to the listed ids/paths (`ctx.wanted`). `--force` overrides the edit-conflict guard (and, per step, replaces files/images).
- A step also runs alone with `npx tsx scripts/import/steps/<step>.ts [--dry] [--force] [--only=...]` where the file ends with the `runStandalone` hook (`lib/standalone.ts`): `lookups`, `wp-courses`.

### 7.2 Steps (order of `all`)

| order | step | Reads | Writes / key | Notes |
|---|---|---|---|---|
| 20 | `media` | uploads URLs in `pages.json` + `posts.json` bodies | `media` by `legacyPath`; `out/ihm-media-map.json` (`legacyPath → id`, read by every later step) | GET from `LEGACY_BASE_URL` with retry, `p-limit` 4; allowlist jpg, jpeg, png, webp, gif, pdf, ≤ 25 MB; an existing `legacyPath` is skipped. |
| 21 | `theme-photos` | `../ihmv3/wp-content/themes/mwt-ihm/assets`, `../ihmv3/wp-content/uploads`, staff pages | `media` by `legacyPath`; `out/ihm-theme-photos-map.json` | IHM photographs only (rules in `lib/images-select.ts`: jpg/jpeg/png/webp, ≥ 600 px, near-duplicates collapsed); staff portraits only for people whose profile used them, missing ones GET from live. Resized with sharp. Flags `--offline`, `--limit=N`. `p-limit` 4. |
| 25 | `documents` | PDFs under `public/{pdf,brochures,IHM_Domestic_SHB,International-SHB}` | `documents` by `publicPath` | Skips `seeds/static-held.json` paths and `DOCUMENT_ALIASES` names (an alias whose target has no file is imported under the target path). Title/listings from the `/policies-procedures/` link list in the step, else the cleaned file name; category/audience from the folder. Existing rows get metadata refreshed; the file is replaced only with `--force`. Run: `npm run import -- documents [--dry] [--force] [--only=<publicPath>]`. Last report: 251 documents. |
| 30 | `lookups` | facts of the 26 course bodies (`section-mapper.ts`) | `levels`, `deliveryModes`, `durations`, `categories` (schools), `disciplines`, `campuses` by `slug` | Provisional values derived from the live course HTML; report lists them as provisional; `universities` stays empty. |
| 40 | `wp-courses` | `courses.json`, `pages.csv`, `html-analysis.csv`, media map | `courses` by `import.wpId`; `courseShared` global; `out/khid.report.json` | See §7.4. Flag `--hoist-min=N`. |
| 40 | `wp-posts` | `posts.json`, media map | `posts` by `import.wpId` (`lib/upsert.ts`) | Lexical `content`; first imported image becomes `heroImage` and leaves the body; category from URL prefix; `publishedAt` = WP `date` read as Australia/Melbourne time; `readTime` from word count. |
| 45 | `wp-events` | `data/ihm/events.json` (old `wp_mwt_events` rows with `status = 1` and their `wp_mwt_event_tags`, exported by `wp-db-inventory.ts`; 179 rows) | `events` by `legacyId`, published | Plain text only (tags stripped). Slug = title + legacy id (titles repeat). Image from the media map: `media` also imports `wp-content/uploads/mwt-events/<image>` from the live site (older images are gone there and stay empty; the page shows a default image). `registrationOpen` only for future dates with an https join link. Discipline text matches a `disciplines` lookup by name, else becomes a tag. |
| 50 | `staff` | `pages.csv` rows `suggested_page_type = staff-profile` (57) + their `pages.json` bodies | `staff` by `legacyId` | `lib/staff-parse.ts`, not the extractor (DEC-15g). Aborts unless the 5 sample pages validate (`VALIDATION_SAMPLES`). `-2/` twin pages join the base person (DEC-9). Emails and phones never stored. A published doc whose written fields have the same `fingerprint()` (`lib/hash.ts`) as the parsed profile is `skipped` (`staffUnchanged`), so a re-run writes nothing; any changed text, link or list row, from the source or an admin edit, is rewritten. `--force` writes every matched doc. |
| 60 | `assign-images` | media with `legacyPath`, theme-photos map | `staff.photo`, `courses.heroImage`, `campuses`/`categories`/`disciplines.image` | Fills empty fields; never touches a media doc without `legacyPath` (chosen in the admin); swaps an imported image only with `--force`. |
| 90 | `link-course-managers` | course bodies with literal `.courseManagers-card` markup | `staff.courses` | Name match to staff docs; bare `[CourseManagers]` shortcode text is reported, never guessed. Re-runs only add links. |
| 100 | `static` | `../ihmv3/{pdf,brochures,IHM_Domestic_SHB,International-SHB}`, `landing-pages.csv` rows `recommendation=copy-static` (optional: without the CSV the four stores alone are copied, which covers the same files) | files in `public/` at the same path; `out/ihm-static-manifest.json` | Allowlist pdf, jpg, jpeg, png, webp, gif, svg; ≤ 50 MB; an SVG holding `<script`, `javascript:` or an `on*=` handler (entities decoded, `unsafeSvgReason`) is skipped and listed; skips `seeds/static-held.json` paths (DEC-32); identical files (size + sha256) left alone; `/IHM_Domestic_SHB/IHM_Domestic_SHB.pdf` is copied from `Domestic-SHB.pdf`. `--dry` (`ctx.dry`; standalone also `--dry-run`) copies nothing and still writes the manifest and report. |
| 200 | `wp-json-check` | live `/wp-json/` index, `../ihmv3` | report only | Lists REST namespaces/routes, flags non-core ones into the review queue, probes `/wp-json/stripe/v1/subscriptions` (GET), counts `register_rest_route` in the old repo (DEC-58). |

`seeds/static-held.json`: `paths` (26 files that answer 404 on production; never copied or imported) and `missingOnServerOnly.paths` (3 files live on production but absent from `../ihmv3`, probed by `import:refresh`).

### 7.3 Extractor (`html-to-blocks.ts`)
`extract(html, { url, wpType, allowedEmbedHosts? })` → `{ layout, confidence, coverage, unplaced, stats, warnings, unknownClasses }`; `lib/to-payload.ts` turns the intermediate layout into real blocks (`toPayloadBlocks`, `convertHtml`, `reviewReasons`) and `lib/lexical.ts` into Lexical via `convertHTMLToLexical` (jsdom). Used by `wp-posts`, `wp-courses` and `extract-samples.ts`.
1. `sanitize-html` first pass drops `script`, `style`, `noscript`, `on*`, `javascript:` and every iframe not on YouTube, Vimeo, Google Maps or the embed allowlist (`SEED_EMBED_HOSTS` in `lib/config.ts`: `my.matterport.com`, `forms.monday.com`, `portal.ihm.edu.au`, plus `ctx.allowedEmbedHosts`). `class`/`id`/`style` survive for recognition only.
2. Shortcode output (`[StartDates]` `ul.start-date-ul`, `[IHMCensusDate]` census table, `[CourseManagers]` `.cmCard`, and their literal unexpanded text) becomes a `courseData` placeholder. Selectors are documented with their `../ihmv3/wp-content/themes/mwt-ihm/` sources in the file header.
3. A recursive walk recognises `tabs` (`.nav-tabs`, `.nav-pills`, `[role=tablist]` + panes, recursive), `accordion` (`.accordion-item`, `.card`, `.panel`; a table inside stays a nested `table`, DEC-15d), `table`, `videoEmbed` (YouTube/Vimeo, `.youtube-player[data-id]`), `mapEmbed`, `iframeEmbed`, `imageText`, `cardGrid` (≥ 3 cards; `.owl-carousel` cards → `cardGrid` variant carousel), `testimonial` (blockquote with a name, carousel quotes; never richText, DEC-15c), `enquiryForm` (form action → formKey via `lib/formkeys.ts`; other forms dropped), `cta` (link with a `*btn*` class), `hero` (`h1`); everything else is prose → `richText`.
4. Output HTML comes from an own serialiser that emits only `p, h2–h4, ul, ol, li, a[href], strong, em, img[src,alt], br`. `mailto:` not on `ROLE_MAILBOXES` and personal `tel:` links lose the link, keep the text, and are counted (rule 4). An image not in the media map is dropped and reported.
5. IHM fees are hand-written tables and stay `table` blocks; `FEES_WRAPPER_SELECTORS` is empty (DEC-15e).

`confidence = placed/expected − 0.05 × interactive fallbacks − 0.10 × unplaced`, clamped 0–1. `reviewReasons` adds `low-confidence` (< `CONFIDENCE_THRESHOLD` 0.85), `low-coverage` (< `COVERAGE_THRESHOLD` 0.98), `theme-asset-link`, `unplaced:*`. Posts with any reason (also `flattened:<block>`, `dead-link`, `uat-link`, `empty-content`, `image-not-imported`) get `check`, else `auto`.

**Idempotency for posts** (`lib/upsert.ts`): `sourceHash` = sha of extractor version + source HTML + resolved media ids + non-content data; equal hash → `skipped`. `contentHash` = `fingerprint()` (`lib/hash.ts`) of the content; if the stored content differs from it (edited in the admin) → skipped as a conflict with reason `edited-in-admin`, unless `--force`. A source change on an `ok` doc sets `check` + `source-changed`. A new item whose path is held by a hand-made doc is skipped (`path-held-by-hand-made-doc`). `assertNoLegacyMarkup` (`lib/assert-clean.ts`) runs before every write.

### 7.4 Courses (`wp-courses`, `section-mapper.ts`, `kh-id.ts`)
- `prepareCourseHtml` cuts page chrome into facts (title, delivery, AQF level, units, duration, CRICOS, campuses, fee lines, apply/brochure links, student-type switcher) and removes the commented-out `[StartDates]` (DEC-7: `showStartDates` is written `false`).
- `mapCourse` places blocks into slots by `.course-details-tabs` label (`SLOTS`: overview, entry, structure, careers, placements, pathways, faq, fees, additional; label rules in `RULES`); "Course Start Dates" tabs are removed; unknown labels go to `additional` with flag `unknown-tab:*`.
- Course review: `coveragePct` (source words after intended removals found in placed blocks) must be ≥ 98% (DEC-15f); reasons `low-coverage`, `unmatched-course-section`, `no-course-tabs`, `unplaced-fragments`, `extractor-review`, `fallback-richtext`, `test-course`. Status: `kh-unresolved` if no `kh_id`, else `check` with any reason, else `auto`.
- Hoisting (DEC-15a): blocks whose fingerprint occurs in at least `--hoist-min` real courses (default: all 24 real courses) go to the `courseShared` global once and are removed from each course. Last report: 0 hoisted.
- `kh_id` (DEC-8): `KH_EVIDENCE` in `kh-id.ts` maps 10 WP ids to portal ids with cited theme evidence; the other 14 real courses get `khId: null` and `kh-unresolved`; `test-1`/`test-2` (`TEST_COURSE_WP_IDS` 1476, 1478) are published with `seo.noindex` and `check` (DEC-34). Report: `out/khid.report.json`.
- Lookups are ensured per course (`ensureLookup`); `fees.displayAmount` gets the fee lines; `studentType` from the `-international` sibling and the "Available for" list.
- Upsert by `import.wpId`: same `sourceHash` (sha of the body) and same `layoutHash` (sha of the stored `sections`) → skipped; a stored `layoutHash` differing from the current sections (edited in the admin) → skipped with a conflict reason unless `--force`. `layoutHash` is written after the save, from what the database stored.

### 7.5 Refresh from live (`npm run import:refresh`)
`scripts/import/refresh-live.ts [-- --dry] [--resume] [--force] [--lazy] [--no-import] [--no-recover] [--no-content-diff]`; pure logic in `lib/refresh.ts`, file recovery in `lib/recover-missing.ts` (DEC-53).
1. Re-fetches pages, posts, courses from the WP REST API (GET, ≤ 3 req/s) into `../inventory/data/ihm/`, keeping the old files as `*.prev.json`.
2. Diffs by `id` + `modified` (and body unless `--no-content-diff`) → `../inventory/data/ihm/refresh-<date>.report.json`.
3. Probes previously missing uploads (`out/ihm-missing-uploads.json`), then runs `media`, `wp-posts`, `wp-courses`, `staff` through `cli.ts` with `--only=<new/changed ids>`; step reports are archived in `out/refresh/<date>/`. Docs with `reviewStatus: ok` are skipped and listed. An item deleted on live is never deleted: its doc gets `check` + reason `deleted-on-live`. WordPress pages are code (DEC-61): a new, changed or deleted page that is not a staff profile runs no step and is listed in the report under `import.pagesChangedOnLive` / `import.pagesDeletedOnLive` (id, path, title, `routeFile`) for a developer to update the route file; a deleted staff profile page keeps its doc. Only posts and courses are looked up by `import.wpId`.
4. Re-probes `missingOnServerOnly` and the live brochure rows of `landing-pages.csv`; recovered files go to `public/` at the same path (extension, content-type and magic bytes must agree), listed in `out/ihm-recovered.json`. Then clears the page cache.
An unfinished import leaves `importPending: true`; the next run refuses to fetch until `--resume`.

### 7.6 Other scripts
- `npm run extract:samples` (`extract-samples.ts`): runs `extract()` on 10 deterministic non-course items per class group (A, B, C-lite, C) and on all 26 courses, chosen from `html-analysis.csv`; writes `out/samples/<wpId>.json` and `out/extract-samples.report.json`. No database.
- `npx tsx scripts/import/smoke.ts [baseUrl]`: GETs 20 seeded-random `pages.csv` paths and every post URL against the local site → `out/ihm-import-smoke.json`. `smoke-courses.ts [--base=...]` does the 26 course URLs → `out/ihm-courses-smoke.json`. GET only; for the local site.
- `measure-overflow.ts`, `shots-images.ts`: 390 px overflow check and screenshots of pages with imported photographs.
- `npx tsx scripts/dev/fill-course-facts.ts [--dry] [--offline]`: fills blank `courses.facts.<fact>.value/detail` from the course's own fields, then from the live course page (HTML comments ignored); never writes `fee` (finance-owned, falls back to `fees`); sets `facts.cricos.show = false` on domestic-only courses; never overwrites a value. Report `scripts/dev/out/course-facts-report.json`.
- `npx tsx scripts/dev/check-document-links.ts [--base=http://localhost:3100] [--all]`: every PDF link on the rendered `/policies-procedures/`, the four course fee PDFs and the alias URLs must answer 200 `application/pdf`; `--all` HEADs every `documents.publicPath`. Exit 1 on failure.
- `npx tsx scripts/dev/seed-admin.ts`: creates the first admin from `DEV_ADMIN_EMAIL` / `DEV_ADMIN_PASSWORD`; refuses in production.

### 7.7 Tracking sheet (`../inventory/v2/ihm/TRACKING.csv`)
The place to look for "is this URL done". One row per public URL of the old site: pages, landing pages, courses, posts, staff profile URLs, documents (PDFs), redirects and gone URLs. Query and UTM variants fold into their path; thank-you and handler URLs, exposed backup files and redirect patterns (`/*`) are not rows. `../inventory/v2/tracking_sheet.py` builds it from the status columns of `pages.csv` and `landing-pages.csv`, the parity crawl, the `documents` table and the code registries; the same rows are the `Tracking` sheet of `IHM-inventory.xlsx` (autofilter, status cell green / amber / red / grey) and `Tracking summary` counts them by type and status.

| Column | Meaning |
|---|---|
| `url` | the old URL (`https://ihm.edu.au/...`) |
| `type` | `page`, `landing`, `course`, `post`, `staff`, `document`, `redirect` or `gone` |
| `where` | what answers it: the route file (`src/app/(site)/about-us/page.tsx`), `cms:courses`, `cms:posts`, `cms:staff <slug>`, `cms:documents "<title>"`, `redirect -> /target/`, or `none (404)` |
| `status` | `done`, `check`, `todo` or `gone` (rules below) |
| `note` | one line on why the row is not done |
| `checked` | date of the parity crawl result (for a URL the crawl skips, of the refresh) |

- **done**: answers as intended (200, or the redirect for a redirect row), parity `OK` or `TITLE_DIFF`, audit `one_to_one` yes (documents and redirects need no audit), no review flag.
- **check**: answers, but a person must look: partial content, a pending decision, an extractor `check` or `kh-unresolved` flag, a different redirect target, or no crawl result.
- **todo**: missing or failing: 404, 4xx or 5xx where the old site answers, or the content is missing (`one_to_one` no).
- **gone**: 404 or 410 on purpose: gone on the old site too, or marked gone in the inventory.

Refresh: `npm run parity` (crawls the site at `http://localhost:3000`), then `npm run status-sheet`, which rewrites the status columns and the workbook and ends by running the tracker. **Without the inventory folder** (`../inventory` absent, as on a machine that only has the repo): `npm run parity` takes its URL list from the live sitemaps (`/wp-sitemap.xml` and its post, page and course sitemaps, expected 200; taxonomy, author and `/sitemap.xml` URLs followed), the code registries (`pages.ts`, `landing.ts`, `redirects.ts`) and the 35 School of Social Work URLs, and `npm run status-sheet` (`scripts/parity/status-sheet.ts`) writes `scripts/parity/out/status-ihm.csv` from the crawl (status `done` for parity `OK` / `TITLE_DIFF`, else `check`) and prints the counts per category. `npm run tracking-sheet` rebuilds only `TRACKING.csv` and the two sheets from the CSVs as they stand. Both read the database from `DATABASE_URL` in `.env`; the workbook needs `openpyxl` (`../inventory/v2/.venv`).

## 8. Acceptance checks
1. `npm run import -- <step> --dry` exits 0 and writes `scripts/import/out/ihm-<step>.report.json` with `dryRun: true`.
2. A second run of `wp-posts`, `wp-courses`, `documents`, `lookups`, `media` reports `created=0, updated=0` (`tests/courses/wp-courses.test.ts` asserts it for courses).
3. After a full import: `posts` 91 (82 blog, 9 news), `courses` 26, `staff` 51 (42 script variant, 9 static), `documents` 251.
4. `npm run test:int` covers: `tests/import/html-to-blocks.test.ts` (patterns, nested table, sanitising, embed allowlist, formKeys, carousel, rule 4, upload nodes, registry slugs), `tests/import/no-legacy-markup.test.ts` (rule 5 on stored posts and staff), `tests/import/staff.test.ts`, `tests/import/images.test.ts`, `tests/import/refresh.test.ts`, `tests/import/embed-hosts.test.ts`, `tests/import/documents-step.test.ts`, `tests/courses/section-mapper.test.ts` (label vocabulary, StartDates never live, ≥ 98% coverage on all 26 bodies), `tests/courses/wp-courses.test.ts` (paths, `kh_id` 10 resolved / 14 unresolved, DEC-7, nested table), `tests/courses/course-facts.test.ts`, `tests/collections/documents.test.ts`, `tests/seo/document-urls.test.ts`.
5. With the site running: `npx tsx scripts/dev/check-document-links.ts --base=http://localhost:3000` exits 0.

## 9. IHNA differences
None in code: the importer is IHM-only (`SITE = 'ihm'` in `lib/config.ts`, IHM theme selectors and label rules).

## 10. Open questions
1. The WordPress DB dump: no step reads it. Until it arrives, `kh_id` for 14 courses stays unresolved (DEC-8), lookups stay provisional without `legacyId`, and gallery images (rendered by JS, absent from the HTML) are not imported (DEC-15b).
2. `test-1` / `test-2`: kept published with `noindex`; marketing decides after launch (DEC-34).
