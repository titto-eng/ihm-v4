# 50 — Portal data (`src/lib/portal/`)

## 1. Purpose
Read live course data (start dates, census dates, intake calendar) from the admissions portal MySQL database `ihmedu_portal` and hand typed, cached results to the date blocks and the course JSON-LD. Nothing is copied into Postgres. A page never fails because the portal is down or switched off. The portal `payments` table writes (`payments-write.ts`) belong to 45-payments.

`PORTAL_ENABLED` defaults to `0`: no read opens a connection, every read returns `{ unavailable: true }` synchronously, and the date blocks show the static fallback (DEC-50).

## 2. Data model
**Payload** (`src/collections/Courses.ts`):
- `khId` (number, indexed, nullable): the portal `courses.id`. All portal reads for a course key on it (DEC-8).
- `khIdSource` (`dump | scrape`, read-only).
- `showStartDates` (checkbox, default false): gates the `startDates` block (DEC-7).

**Blocks:** `startDates { mode: all|f2f|online|blended }`, `censusDates { note }`, `intakeCalendar { months: 1–24, default 12 }`, each plus the shared section fields (`src/blocks/<name>/config.ts`).

**Portal tables read.** Base filter **B** on `course_batches`: `partner_id = 1 AND status = 'Active' AND enable = 1 AND show_in_website = 1`.

| Table | Columns used |
|---|---|
| `campuses` | id, campus_name |
| `course_batches` | id, course_id, campus_id, partner_id, status, enable, show_in_website, intake_id (1 fixed, 2 rolling), mod_of_delivery_id (1 face to face, 2 online, 3 blended), start_date, end_date, graduation_day, orientation_date |
| `course_batch_dates` | course_batch_id, enrollment_end_date, semester_census_date, semester |
| `courses` | id, course_name, enable, application_form5 (domestic), application_form6 (international), crm_courseid, crm_staff_id, application_form_flag/2/3/4/7/9 |
| `countries` | id, country_name, enable, default_country |

Table names are unqualified (the connection database is `PORTAL_DB_NAME`); `tests/portal/no-raw-sql.test.ts` fails on any `ihmedu_portal.` prefix in `src`.

**Return shapes** (`types.ts`; dates are `YYYY-MM-DD` strings, never `Date`):
- `PortalResult<T> = { unavailable: boolean; data: T }` — every public read returns this.
- `StartDates = { campuses: { campusId, campusName, f2f, online, blended: { fixed: string[]; rolling: string[] } }[] }`
- `CensusRow = { start, end, census, orientation }`
- `CalendarEntry = { date, khId, courseName, campusId, campusName, intake: 'fixed'|'rolling', mode: 'f2f'|'blended' }`
- `Country = { id, name }`, `PortalCourse = { khId, name, crmCourseId, crmStaffId, formFlags }`

## 3. Admin capabilities
Editors set `khId` and `showStartDates` on a course. Dates are never edited in `/admin`; the admin has no portal preview or refresh control.

## 4. Front-end behaviour
**Module** (`src/lib/portal/`; callers import `@/lib/portal` only, except payments code which imports `payments-write.ts` and `PortalUnavailable` from `client.ts`):
- `client.ts`: the only importer of `mysql2`. Read pool (connectionLimit 4, queueLimit 20, `dateStrings: true`, `timezone: 'Z'`). `runQuery(sql, params)` takes a connection explicitly, releases it after a clean query, destroys it after an error or timeout, and returns a late-arriving connection straight to the pool. Per-read deadline = `PORTAL_QUERY_TIMEOUT_MS`, capped at `PORTAL_MAX_TIMEOUT_MS` = 3000 (also the default). Failures throw `PortalUnavailable(code)` and log `portal.unavailable {code, ms}`. Missing read user → `PortalUnavailable('not-configured')`. Also holds the write-limited payments pool (`runPayWrite`, `runPayRead`) used only by `payments-write.ts`.
- `queries.ts`: Q1–Q5 as constant SQL strings with `?` placeholders (no template literals, no values concatenated in; enforced by `tests/portal/no-raw-sql.test.ts`).
- `cache.ts`: `cached(name, scope, args, fn, empty)` wraps `unstable_cache` with tags `['portal', 'portal:<scope>']` (scope = khId, `calendar` or `countries`) and `revalidate: 900`. A thrown error is not cached (Next keeps serving any stale entry); the failure is remembered in-process for 60 s (`PORTAL_NEGATIVE_SECONDS`), so a down portal costs one attempt per key per minute. Cold cache + error → `{ unavailable: true, data: <empty> }` and a `portal.unavailable {query, scope, code}` log. `revalidatePortal(scope?)` clears the negative cache and expires the tag.
- `index.ts`: public reads. `getCoursePortal(khId)` loads census + start dates as one bundle per course and day (React `cache` within a request, `cached('bundle', khId, [today])` across requests); `getStartDates` and `getCensusDates` read from that bundle. Also `getIntakeCalendar(year, month, studentType)`, `getCountries()`, `getCourseByKhId(khId)`. With `PORTAL_ENABLED` ≠ `1` each returns `{ unavailable: true, data: <empty> }` without awaiting anything.
- `format.ts`: `portalToday()` = today as `YYYY-MM-DD` in `PORTAL_TZ` (default `Australia/Melbourne`, `@date-fns/tz`), passed to queries as a parameter instead of `CURDATE()`. Formats: start date `MMM d, yyyy`, census table `dd-MM-yyyy`, intake `MMMM yyyy`. Also `describeStartDates`, `censusTable`, `calendarColour`, `contrastTextColour`, `calendarLabel`.

**Q1 Start dates** (`startDates`): campuses (`SELECT id, campus_name FROM campuses ORDER BY id`) plus one batch query, partitioned in TS by campus × mode × intake:
`… FROM course_batches cb WHERE B AND cb.course_id = ? AND ((cb.intake_id = 1 AND cb.start_date >= today) OR (cb.intake_id = 2 AND cb.end_date >= today AND (cb.mod_of_delivery_id <> 3 OR EXISTS (… course_batch_dates d … d.enrollment_end_date >= today)))) ORDER BY cb.start_date, cb.id`.
Presentation (`describeStartDates`): international = face to face only; domestic = face to face, online, blended. Fixed dates link to `?startDate=<MMM d, yyyy>&campus=<name>#quickContact`. Rolling face to face → one "Enrol any time — every <weekday> from <date> onwards" per row; rolling online/blended → one "Enrol any time" (both link to `#quickContact`). kh 29 (EPIQ-RN, `EPIQRN_KH_ID`): fixed dates link to the enquiry form like every other course (the site has no EPIQ-RN application page) and rolling dates are hidden. A campus appears only if one of its shown sections has entries.

**Q2 Census** (`censusDates`):
`SELECT cb.id, cb.start_date, cb.graduation_day, cb.orientation_date, d.semester_census_date FROM course_batches cb JOIN course_batch_dates d ON d.course_batch_id = cb.id AND d.semester IN (0, 1) WHERE B AND cb.course_id = ? AND cb.end_date >= ? AND d.enrollment_end_date >= ? ORDER BY cb.start_date, cb.id, d.course_batch_id`, keeping the first row per `start_date`. End = `graduation_day`.

**Q3 Intake calendar** (`intakeCalendar`, one query per month): batches joined to enabled `courses` and to `campuses`, B, `start_date BETWEEN from AND to`, `intake_id IN (1, 2)`, `mod_of_delivery_id IN (1, 3)`, student type via `application_form5` (0 domestic) / `application_form6` (1 international) / both (null), rolling blended only with an open enrolment date; `ORDER BY cb.start_date, cb.course_id, cb.campus_id, cb.id` (a stable order); deduped per (date, course, campus). Colour = `#` + first 6 hex chars of `crc32(course_name)`; labels "Face to Face", "Online (Blended)", "Online (Blended) : Enrol any time".

**Q4 Countries** (`SELECT id, country_name FROM countries WHERE enable = 1 AND default_country = 1 ORDER BY id`; `countryById`) and **Q5 Course by kh_id** (`SELECT id, course_name, crm_courseid, crm_staff_id, application_form_flag, … FROM courses WHERE id = ?`) are exported, but no page or form calls them; enquiry forms take countries from `src/lib/enquiries/countries.ts`.

**Consumers:**
- `src/app/(site)/courses/[slug]/page.tsx` starts `getCoursePortal(khId)` (not awaited) so the blocks and JSON-LD share one read.
- `src/components/templates/CourseDetail.tsx` fees region renders `feesTable`, then `startDates` (only when `showStartDates`), then `censusDates`, each only when the course's own sections do not already contain that block type.
- `startDates` block: nothing without a course context, `khId` or `showStartDates`; unavailable → `PortalNotice`; otherwise heading "Course Start Dates" and campus cards filtered by `mode`. A course with `studentType: 'both'` renders both audiences, each wrapped in `AudienceOnly`.
- `censusDates` block: nothing without `khId`; unavailable → `PortalNotice`; no rows → nothing; else heading "Course Start Dates", the five-column table (Course Intake, Course Start Date, Course End Date, Census Date, Orientation Date) and optional `note`.
- `intakeCalendar` block: `PORTAL_ENABLED` off, or every month unavailable → `PortalNotice`; reads `months` months from the current portal month; drops entries whose `khId` has no published Payload course and links each entry to that course's `path`; renders nothing when every month is empty.
- `src/components/seo/Course.tsx`: `hasCourseInstance` from fixed start dates (max 12) when the course has `khId` and `showStartDates === true` (DEC-7); none when unavailable.
- `PortalNotice` (`src/components/templates/PortalNotice.tsx`): "Dates coming soon — enquire for the next intake", linking to `#quickContact`.

## 5. URLs
- `/monthly-calendar/` and `/course-calendar/` (`src/app/(site)/<path>/page.tsx`): `CalendarShell` (`src/components/calendar/`) loads 12 months through `getIntakeCalendar` (`loadCalendar` in `load.ts`), drops entries without a published Payload course of that `khId`, and renders `MonthCalendar.client`; unavailable → `PortalNotice`; nothing scheduled → an enquiry prompt. The old query strings work: `?stud_type=0|1` (domestic / international, the SQL `studentType`) on both, and `?month=&year=` on /monthly-calendar/ (the month shown first; otherwise the first month with an intake). Reading `searchParams` makes both pages dynamic; the portal reads stay cached.
- Cache refresh: `POST /api/revalidate` with header `x-revalidate-secret: $REVALIDATE_SECRET` and body `{ "tags": ["portal:41"] }` (or `["portal"]`) → `revalidateTag(tag, 'max')`. `portal`, `portal:<khId|calendar|countries>` and `{ "all": true }` also call `revalidatePortal` (`all` and `portal` with no scope), which clears the 60 s negative cache for that scope (`tests/portal/revalidate-route.test.ts`).

## 6. Integrations
Env (read in `client.ts` and `format.ts`; defaults in brackets):
- `PORTAL_ENABLED` (`0`), `PORTAL_QUERY_TIMEOUT_MS` (3000; reads capped at 3000), `PORTAL_TZ` (`Australia/Melbourne`; blank or not a valid IANA zone also means `Australia/Melbourne`)
- `PORTAL_DB_HOST` (`127.0.0.1`), `PORTAL_DB_PORT` (3306; `.env.example` has 3307, the fixture container), `PORTAL_DB_NAME` (`ihmedu_portal`)
- Read user: `PORTAL_DB_RO_USER` / `PORTAL_DB_RO_PASSWORD` (aliases `PORTAL_DB_READ_USER` / `PORTAL_DB_READ_PASSWORD`)
- Payments user: `PORTAL_DB_PAY_USER` / `PORTAL_DB_PAY_PASSWORD` (aliases `PORTAL_DB_PAYMENTS_USER` / `PORTAL_DB_PAYMENTS_PASSWORD`; an empty `PORTAL_DB_PAY_*=` line counts as unset and falls back to the alias, `tests/portal/pay-user-alias.test.ts`); see 45-payments.

Users: **read** = `SELECT` only; **payments** = `SELECT, INSERT` and column-level `UPDATE` on `payments` only, no `DELETE`.

Docker (dev and tests only): `portal-mysql` (`mysql:8`, host port 3307 or `PORTAL_FIXTURE_PORT` from `.env` when 3307 is taken, e.g. by WAMP's MariaDB, root `root`, read user `portal_ro`/`portal_ro`) in `docker-compose.yml`. `npm run db:fixtures` (`scripts/dev/load-portal-fixtures.mjs`, any OS; `bash docker/portal-fixtures/load.sh` does the same) loads `schema.sql`, `data.sql`, `payments.schema.sql`, `payments.data.sql`, restricts `portal_ro` to `SELECT`, and creates `portal_pay` with the payments grants. `schema.sql` is provisional (column names follow the old PHP queries).

## 7. Import / seed
- `scripts/import/kh-id.ts`: `KH_EVIDENCE` maps WP post ids to kh ids, each citing its evidence in the old theme. `scripts/import/steps/wp-courses.ts` sets `courses.khId` and `khIdSource: 'scrape'` from it; unresolved courses get `khId: null` and `reviewStatus: kh-unresolved`. Report: `scripts/import/out/khid.report.json` (10 resolved, 14 unresolved, 2 test courses). DEC-8.
- `npx tsx scripts/import/fixtures/portal/build-fixtures.ts` regenerates, from `../inventory/data/ihm/courses.json`: the census fixtures `scripts/import/fixtures/portal/census/<slug>.json` (10 courses, `asOf` 2026-10-16), `fixture-courses.json`, and `docker/portal-fixtures/data.sql` (rows reproducing each census table at `asOf`, plus synthetic 9xxx courses for every Q1/Q2/Q3 branch). Idempotent. `SYNTHETIC_KH_IDS` never reach Payload.

## 8. Acceptance checks
`npm run test:int` runs `tests/portal/**`. `queries.test.ts` needs the fixture DB: `docker compose up -d portal-mysql && npm run db:fixtures`. `tests/global-setup.ts` stops `npm run test:int` before any suite runs when Postgres, the loaded fixture DB or Mailpit is missing, and says which and what to run.
1. `tests/portal/queries.test.ts`: Q2 reproduces the recorded census table for all 10 fixture courses (plus snapshot; `osce-for-rns` is the empty case); census edge rules; Q1 branches (domestic, international, kh 29, excluded rows, `mode` filter); the combined Q1 equals the six per-campus legacy WHERE clauses; Q3/Q4/Q5; a slow query is cut at the timeout; the read user cannot write.
2. `tests/portal/timeout.test.ts`: hung query or connect → `PortalUnavailable` within the timeout; connections released or destroyed, never leaked; 3 s cap; the public API returns `{ unavailable: true }` and never throws.
3. `tests/portal/cache.test.ts`: tags `portal` + `portal:<khId>`, `revalidate: 900`, key changes with `today`, calendar/countries tags, 60 s negative cache, one bundle per course and day, `revalidatePortal`.
4. `tests/portal/disabled.test.ts`: with `PORTAL_ENABLED=0` every read is a synchronous `{ unavailable: true }`, no pool is created, and the three date blocks render "Dates coming soon".
5. `tests/portal/format.test.ts`: Melbourne `today`, formats, census columns, calendar colour/contrast, labels.
6. `tests/portal/no-raw-sql.test.ts`: no template-literal or concatenated SQL in `src/lib/portal`; `mysql2` imported only by `client.ts`; no `ihmedu_portal.` in `src`.
7. `tests/payments/portal-user.test.ts`: payments user grants (no DELETE, no other table, column-limited UPDATE).
8. `tests/collections/courses.test.ts`: `showStartDates` defaults to false.

## 9. IHNA differences
IHNA uses its own `queries.ts` against `ihna_portal`; the rest of the module is shared. IHNA additionally reads fees (`funding_contracts`, `course_unit_state_fees`), census, units of study, overviews, `ihna_web_packages` and an agents directory.

## 10. Open questions
1. Real portal access: read and payments users, MySQL version, server timezone, and `SHOW CREATE TABLE` for the five tables (the fixture schema is provisional).
2. kh_id for the 14 unresolved courses: needs the WP database dump (`khIdSource: 'dump'`), DEC-8.
