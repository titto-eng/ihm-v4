# 40 · Enquiries (single form pipeline)

## 1. Purpose
Every website form posts to one endpoint, `POST /api/enquire/`. The pipeline saves an `enquiries` row first (rule 2: nothing is sent before the row exists), then the `deliverEnquiry` job delivers it to each destination with retries, a `dead` state and an alert. Form definitions and recipient groups are code (`src/content/forms.ts`, `src/content/enquiry-routing.ts`, DEC-63). Campaign codes: `41`. Landing pages: `60`.

Code map: `src/app/api/enquire/route.ts` (HTTP adapter) → `src/lib/enquiries/process.ts` (`handleEnquire`, the pipeline) → `src/jobs/deliverEnquiry.ts` (`runDelivery`) → `src/lib/adapters/*` (one file per destination, live switch in `live.ts`).

## 2. Data model
**Form definitions** (`src/content/forms.ts`, `FormDef[]` typed in `src/lib/enquiries/types.ts`, looked up with `formByKey`). Exactly 25 keys (DEC-2, list in §7).
- `key`, `name`, `family` (where the form came from), `active`, `consentText`.
- `fields[]`: `name`, `type` (text, email, tel, select, radio, textarea, checkbox, hidden, country, course, campus), `label`, `required`, `maxLength`, `pattern`, `options`.
- `destinations[]`: `adapter` (email, hubspot, portalCrm, portalStakeholder, admissionsApi, dynamics) and optional `config` {`recipientGroup`, `fixedSourceId`, `defaultSourceId`, `hubspotCampaignSourceDefault`}.
- `thankYou`: `type` (path, brochure, whatsapp, inline) and `path`.
- `autoresponder`: `enabled`, `subject`, `body` (tokens `{{firstName}}`, `{{courseTitle}}`).
- `captcha` and `honeypot` (both on unless `false`).
- The browser only receives `toPublicDef(def)`: key, name, consentText, fields, captcha, honeypot, thankYouType (`src/lib/enquiries/lookups.ts`).

**Enquiry routing** (`src/content/enquiry-routing.ts`): `recipientGroups[]` {`key`, `to[]`, `cc[]`} (admissions, agents, alumni, business-development, events, marketing, partnerships, sae-admissions, scholarship; every `to` is currently empty), `alertTo[]` (empty), `defaultSourceId` 24. Empty lists fall back to `ENQUIRY_NOTIFY_TO`. The WhatsApp number is `site.whatsappNumber` in `src/content/site.ts` (currently `null`).

**`enquiries` collection** (`src/collections/Enquiries.ts`, append-only):
- `publicId` (12 hex chars, returned to the visitor as `enquiryId`), `submissionId` (uuid, unique), `formKey`.
- `status` (indexed): received, delivering, delivered, partial, dead, held, spam. `held`/`spam` are set at insert; the rest is derived from the deliveries by `deriveStatus` in `src/jobs/deliverEnquiry.ts`.
- `captchaStatus` (ok, low, unverified, missing), `captchaScore`, `honeypot`.
- Contact columns filled by `contactFrom` (`src/lib/enquiries/contact.ts`): `firstName`, `lastName` (split from `name` when the form has a single name field), `email`, `phone`, `country`, `studentType`, `consent`.
- `course` → `courses`, `campus` → `campuses` (lookup collection in `src/collections/Lookups.ts`).
- `campaignCode` (raw, indexed), `utm` group (`utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `referrer`, `landingPath`, `firstTouch`), `hutk`. See 41; nothing writes `firstTouch`.
- `data` (the validated fields as json), `pageUrl`, `source` (always `api`; the `legacy-post` option is unused), `ip` (nulled after 90 days).
- `deliveries[]`: `adapter`, `target`, `status` (pending, sent, failed, dead, held, dry_run), `attempts`, `at`, `responseCode`, `externalId`, `lastError` (≤500 chars, never a response body), `dryRunRequest` (json: the recorded request with secrets masked, or the live response excerpt), `hsSourceFallback`.

**Read from the CMS:** `courses` (`title`, `khId`, `splId`, `hubspotCourseId`, `dynamicsCourseOption`, and the brochure URL resolved by `brochureHrefFor` from `brochure`/`brochureUrl`, DEC-69) and `campuses` (`slug`, `name`, `portalCampusId`, `hubspotCampusValue`). The landing registry `src/content/landing.ts` supplies `thankYouPath` (60).

**Rate-limit table:** with `RATE_LIMIT_STORE=postgres` (the default when `NODE_ENV=production`) `src/lib/enquiries/rateLimit.ts` creates and uses a raw `enquiry_rate_limits` table outside Payload's schema (DEC-54). Otherwise an in-memory store is used.

## 3. Admin capabilities
- Access (DEC-3, DEC-20): read = admin, marketing, finance; create/update/delete = nobody (`denyAll`). All writes go through the Local API with `overrideAccess`.
- List: columns createdAt, formKey, email, campaignCode, status; search on email, submissionId, formKey, campaignCode. Payload's standard list filters work on any field (e.g. `deliveries.status` = dead, `formKey`, `campaignCode`, `createdAt`).
- **Retry dead / Release held** buttons above the list (`src/components/forms/RetryDeadButton.tsx`) call `POST /api/enquire/retry/` and `POST /api/enquire/release/` (`src/lib/enquiries/adminRoute.ts`): staff session, roles admin or marketing (401/403 otherwise). Body `{ action?, ids? }`; without ids every matching row is processed (200 at most).
  - `retry-dead`: rows with status dead or partial; `dead` deliveries → `pending`, attempts 0; row → `received`; job queued.
  - `release-held`: `held` rows; `held` deliveries → `pending`; queued. No autoresponder row is added on release.
  - `requeue-stuck` (retry route, `action` in the body only): `received` rows older than 5 minutes with `pending`/`failed` deliveries are queued again. Nothing calls it automatically.
- Labels, fields, autoresponders, destinations and recipient addresses change only by editing `src/content/forms.ts` / `src/content/enquiry-routing.ts` and deploying. Recipient addresses are typed by a person, never copied from old code.

## 4. Front-end behaviour
**Where forms are mounted**
- `EnquiryForm` block (`src/blocks/enquiryForm/`): fields `formKey`, `heading`, `variant` (card, inline, sidebar) plus the section fields. It renders nothing for an unknown or inactive key. The page's course (render context) preselects the course field.
- Site-wide dialog (`src/components/forms/EnquiryDialog.tsx`, mounted in the footer): `admission-popup` (default), `mon-popup` (on `/courses/master-of-nursing*`), `nclex-magnet`, `whatsapp`. Opened by `?enquire=1` (the header CTA in `src/content/nav.ts`), `?enquire=<formKey>`, or the WhatsApp button.
- Fixed placements: `quick-enquiry` (course detail and several route files such as contact and campus pages), `blog-enquiry` (blog posts), `course-brochure` (BrochureDownload block), `event-registration` (events listing and event pages), `alumni-signup` / `alumni-story`, `newsletter` (footer, `src/content/footer.ts`), landing keys through `src/content/landing.ts` (60).
- `sae-enquiry`, `sae-brochure`, `agent-registration`, `english-scholarship` and `lp-self-post-hubspot` are defined but not mounted on any page.

**Client** (`src/components/forms/EnquiryFormClient.tsx`): react-hook-form with the same `buildEnquirySchema` the server uses. `?course=<id>` preselects the course; a hidden field takes the same-named URL parameter. reCAPTCHA v3 (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, action `enquire`) loads only when the form has `captcha`. It posts JSON to `/api/enquire/` and follows only the server's `thankYouPath` (a same-site path or `https://api.whatsapp.com/send?...`); `null` shows an inline thank-you. On success, before navigating, it pushes one conversion per `submissionId` (`leadEventFor`, 80 §4) with the response's `enquiryId` as `enquiry_ref`.

**Request body** (`envelopeSchema` in `src/lib/enquiries/request.ts`): `formKey`, `submissionId` (uuid created on mount), `fields{}`, `campaign`, `utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `hutk` (else the `hubspotutk` cookie), `referrer`, `landingPath`, `pageUrl`, `_hp_url` (honeypot; must never match a real field name), `captchaToken`. Unknown keys are stripped; there is no thank-you field (DEC-4). JSON, or `application/x-www-form-urlencoded` (`fields[name]=` or bare `name=`); 32 KB max.

**Pipeline order** (`handleEnquire`):
1. Size check (413 `too_large`), parse, envelope validation (400 `validation` or `unknown_form`).
2. Rate limit: 10 per minute per IP + formKey (429 `rate_limited`, `Retry-After`). A failing store falls back to memory and never blocks.
3. Form lookup (400 `unknown_form` for a missing or inactive key).
4. Duplicate `submissionId`: answers like the first submission (`duplicate: true`), stores and queues nothing.
5. Honeypot `_hp_url` filled: stored as `spam` with no deliveries, ordinary 200.
6. Field validation with `buildEnquirySchema(def)` (`src/lib/enquiries/schema.ts`): strings trimmed, email lower-cased and checked with `z.email()`, tel `^[0-9 +()-]{5,20}$`, select/radio `z.enum` of the options, course/campus numeric ids that must exist, `pattern` on text/textarea/hidden, blank optional = absent. 400 with `fieldErrors`.
7. reCAPTCHA (`src/lib/enquiries/captcha.ts`, 3 s timeout): form `captcha: false` or no `RECAPTCHA_SECRET_KEY` (alias `RECAPTCHA_SECRET`) → `unverified`, delivered; no token → `missing`, held; failure, wrong action, wrong hostname or score below `RECAPTCHA_MIN_SCORE` (default 0.5) → `low`, held; siteverify error or timeout → `unverified`, delivered.
8. Campaign code and attribution (41).
9. INSERT with planned delivery rows (`planDeliveryRows`: one per adapter target, `held` when held, plus the autoresponder unless held). Failure → 500 `save_failed` with a safe message.
10. Queue `deliverEnquiry` (not for held rows or rows without deliveries) and run it right after the response (`after()` + `runJobNow`). A queue failure leaves the row `received`.
11. 200 `{ ok, enquiryId, thankYouPath }`.

No-JS (urlencoded) posts get 303 to `thankYouPath` (`/thanks/` when it is null) on success, else 303 to `/?enquiry=error`.

**Thank-you target** (`computeThankYou` in `src/lib/enquiries/thankYou.ts`, always server-side, DEC-4/DEC-18), first match:
1. the landing row for `pageUrl` (or its parent path, so `/lp/<slug>/<code>/` matches) with a local `thankYouPath`, plus `?campaign=<code>` and, for a brochure request (rule 4's test), `intent=brochure`, which shows the landing ThankYou view's BrochureDownload block (60);
2. `inline` → `null`;
3. `whatsapp` → `https://api.whatsapp.com/send?phone=<site.whatsappNumber>&text=<course-only prefill>`; while the number is `null`, the form path or `/thanks/`;
4. `brochure` (or field `intent`/`formType` = `brochure`) → the course brochure URL (`brochureHrefFor`: the `brochure` document's `publicPath`, else `brochureUrl`) when it is a local path or on our host, else the form path or `/thanks/`;
5. `quick-enquiry` → `/thanks/?course_id=<khId or id>&campaign_id=<code>&campus=<id>`;
6. the form's `thankYou.path`, else `/thanks/`.

## 5. URLs
- `POST /api/enquire/` (public), `POST /api/enquire/retry/` and `POST /api/enquire/release/` (staff). `trailingSlash` is on: post to the slash form.
- Thank-you pages: `/thanks/`, `/thanks-events/`, and the landing handlers in 60.
- `/action_page.php` returns 404 for GET and POST.

## 6. Integrations
**Job `deliverEnquiry`** (`src/jobs/deliverEnquiry.ts`, queue `enquiries`, input `{enquiryId}`)
- Task retries `{attempts: 5, backoff: exponential, delay 60000}`; the handler throws while any delivery is `failed`.
- Attempts only `pending`/`failed` rows; `sent` and `dry_run` rows are never touched again. Each row is persisted right after its attempt. Held and spam rows are skipped.
- A non-retryable failure or the 5th attempt (`MAX_DELIVERY_ATTEMPTS`) → `dead`. New dead rows mail `alertTo` (else `ENQUIRY_NOTIFY_TO`): reference, form, adapter, error, no personal data. The alert follows the email live switch (Mailpit only when not live).
- Runner (`src/jobs/index.ts`): `autoRun` every minute in production and every 20 s in dev, on queues `enquiries`, `payments` and `maintenance` (every 10 min); off when `NODE_ENV=test` or `ENQUIRY_AUTORUN=0`. The app deploys as the Docker image, so `autoRun` in its Node process is the only scheduler. `/api/payload-jobs/run` accepts `Authorization: Bearer $CRON_SECRET` or an admin session.
- `scrubEnquiryIps` (`src/jobs/scrubEnquiryIps.ts`): daily at 03:00 on queue `maintenance`; nulls `ip` on rows older than 90 days.

**Live switch (DEC-50, `src/lib/adapters/live.ts`).** An adapter sends for real only when `DRY_RUN` is not `1` (unset counts as `1`) AND its name is in `ENQUIRY_LIVE_ADAPTERS` (comma/space/semicolon list, case-insensitive) AND its variables are set:

| Adapter | Required env |
|---|---|
| `email` | `RESEND_API_KEY` or `SMTP_HOST` |
| `hubspot` | `HUBSPOT_ACCESS_TOKEN` (+ `HUBSPOT_PORTAL_ID` when `HUBSPOT_FORM_GUID` is set) |
| `portalCrm` | `PORTAL_CRM_URL` |
| `portalStakeholder` | `PORTAL_IHM_STAKEHOLDER_URL` or `PORTAL_IHNA_STAKEHOLDER_URL` (per target) |
| `admissionsApi` | `ADMISSIONS_API_URL`, `ADMISSIONS_API_KEY` |
| `dynamics` | `DYNAMICS_TENANT_ID`, `DYNAMICS_CLIENT_ID`, `DYNAMICS_CLIENT_SECRET`, `DYNAMICS_URL` |

Otherwise the delivery is `dry_run`: the planned request is stored in `dryRunRequest` (secrets masked) with a `reason`, and the reason is copied to `lastError` (`DRY_RUN=1`, `not listed in ENQUIRY_LIVE_ADAPTERS (...)`, `missing: ...`). A non-live email still goes to a local Mailpit (host localhost/127.0.0.1/::1/mailpit, port 1025/1026/2525/8025, no Resend key) and nowhere else. Live rows store `{live, response:{code, body}}` (body: 2000-char tag-free excerpt). HTTP outcome (`classify` in `src/lib/adapters/util.ts`): 2xx sent; network error, 10 s timeout, 5xx, 429 retryable; any other 4xx dead. Payments use `PAYMENTS_DRY_RUN` (falls back to `DRY_RUN`), so enquiries can be live while payments stay dry. `vitest.setup.ts` forces `DRY_RUN=1` and clears `ENQUIRY_LIVE_ADAPTERS`.

**email** (`src/lib/adapters/email.ts`; Payload transport `src/lib/adapters/transport.ts`: Resend when `RESEND_API_KEY`, else SMTP `SMTP_HOST`/`SMTP_PORT`, Mailpit localhost:1025 by default; sender `EMAIL_FROM`)
- One delivery per `recipientGroup` (target `default` when unnamed). Staff message: escaped HTML table of the fields, course/campus, form, campaign code, page, UTMs and reference; subject from `SUBJECTS`; Reply-To the enquirer; header `Idempotency-Key: <id>:<target>`. No recipients → dead.
- Autoresponder (target `autoresponder`): enabled on `admission-popup`, `agent-registration`, `event-registration`; never planned for held rows.

**portalCrm** (`src/lib/adapters/portalCrm.ts`): form-encoded `POST PORTAL_CRM_URL`, no credential (`X-API-Key` only if `PORTAL_CRM_API_KEY` is set). Fields `courseId` (course `khId`; `nclex-magnet` fixed 33; `mon-popup` maps gdn→1, gcn→21), `specialisation_index`, `firstName`, `lastName`, `phone`, `email`, `country`, `campus` (`portalCampusId`), `description`, `enquirySourceId` (41), `student_type` (international 1, domestic 0), `partner_id` (`agentCode`), `ip_address`, and fixed `campaignId`, `createdBy`, `modified_user_id` = 1. Any 2xx is sent.

**portalStakeholder** (`agent-registration`): two deliveries, targets `ihm` and `ihna`, each a form-encoded POST of the allow-listed agent fields (`STAKEHOLDER_FIELDS`). A response body of `fail` is dead.

**hubspot** (`src/lib/adapters/hubspot.ts`)
- `POST https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert` with one input `{id: email, idProperty: "email", properties}`, Bearer `HUBSPOT_ACCESS_TOKEN` (scope `crm.objects.contacts.write`); the contact id becomes `externalId`. The custom properties must exist in the portal, else HubSpot answers 400 (dead).
- Properties: `firstname`, `lastname`, `email`, `phone`, `campus` (`hubspotCampusValue`), `course` (`;<hubspotCourseId or khId>`), `course_specialization` (`;<splId>`), `campaign_source` (41), `where_did_you_hear_about_us`.
- `hutk` (DEC-13): always stored on the row; sent only when `HUBSPOT_FORM_GUID` is set, as a second request `POST https://api.hsforms.com/submissions/v3/integration/secure/submit/{HUBSPOT_PORTAL_ID}/{guid}` with the email/name/phone fields and `context.hutk` when stored.

**admissionsApi** (`lp-admissions`): JSON `POST ADMISSIONS_API_URL` with `X-API-Key: ADMISSIONS_API_KEY`. Body `first_name`, `last_name`, `email`, `mobile`, `mobile_country_code`, `course_code` "BN", `campus` (sydney/brisbane/melbourne/perth mapped to the API's names), `heard_about` (41), `promo_code` "", `message`, `submission_id` (the API dedupes on it), `page_url`, `utm_*`. A 400 is dead; the form's email destination is the backup.

**dynamics** (DEC-12): in the shared adapters folder (`SHARED-FILES.md`), planned only when `DYNAMICS_ENABLED=1`; no IHM form has this destination. Client-credentials token, then `leads`, then `new_enquiries` linked to the lead; the lead id is kept as `externalId` so a retry resumes at the second insert.

**Dev tool:** `scripts/dev/enquiry-live-test.ts` sends one marked real portal-CRM test submission (needs `DRY_RUN=0` and `ENQUIRY_LIVE_ADAPTERS=portalCrm`; refuses to run twice).

## 7. Import / seed
None: the 25 definitions in `src/content/forms.ts` are edited by hand. Destinations per key (P = portalCrm with its source config, H = hubspot with its `campaign_source` default, "IHM website" unless quoted; E = email group; A = autoresponder):

| formKey | Destinations | Thank-you |
|---|---|---|
| `quick-enquiry` | P (default 1), H, E marketing | `/thanks/` + GTM query |
| `blog-enquiry` | P (fixed 544), H "IHM Blog Digital Marketing SEO", E marketing | `/thanks/` |
| `mon-popup` | P (fixed 544), E marketing | `/thanks/` |
| `nclex-magnet` | P (fixed 710), H, E marketing | brochure |
| `whatsapp` | P (fixed 100), H, E marketing | whatsapp |
| `admission-popup` | P (fixed 1), E admissions, A | `/thanks/` |
| `english-scholarship` | P (fixed 667), E marketing | `/thanks/` |
| `event-registration` | P, E events, A | `/thanks-events/` |
| `lp-portal`, `lp-self-post`, `lp-refer-friend` | P, E admissions | `/thanks/` |
| `lp-portal-hubspot`, `lp-self-post-hubspot` | P, H, E marketing | `/thanks/` |
| `lp-hubspot` | H, E marketing | `/thanks/` |
| `lp-admissions` | admissionsApi, E admissions (captcha off) | `/thanks/` |
| `lp-event-email` | E business-development | `/thanks/` |
| `course-brochure` | E marketing, H "Course Brochure Download" | brochure |
| `sae-enquiry` / `sae-brochure` | E sae-admissions, H | `/thanks/` / brochure |
| `agent-registration` | portalStakeholder (ihm, ihna), E agents, A | `/thanks/` |
| `alumni-signup`, `alumni-story` | E alumni (captcha off) | inline |
| `scholarship` / `scholarship-eoi` | E scholarship / E partnerships (captcha off) | inline |
| `newsletter` | H "IHM Newsletter" | inline |

On a landing page the registry `thankYouPath` overrides the form's thank-you (60).

## 8. Acceptance checks
Unit and integration: `npm run test:int` (includes `tests/enquiries/*.test.ts`). E2E: `npm run test:e2e:enquiries` (`tests/enquiries/playwright.config.ts`; needs the dev server on :3000 with `DRY_RUN=1` and Mailpit).
1. `tests/enquiries/schema.test.ts`: schema builder rules; exactly 25 keys; every definition compiles and rejects empty input.
2. `tests/enquiries/enquire.test.ts`: 400/413/`unknown_form`; insert before queue; 500 `save_failed`; a queue failure keeps the row; idempotent `submissionId` (also concurrent); honeypot → spam; `_hp_url` vs the agent `website` field; 11th request → 429; captcha cases; campaign resolution; source ids; unknown course id → 400.
3. `tests/enquiries/route.test.ts`: JSON 200 `{ok, thankYouPath}`; no-JS 303; Retry/Release are admin/marketing only.
4. `tests/enquiries/adapters.test.ts` (dry-run records match `tests/enquiries/fixtures/*.json`, no credential recorded, HubSpot and Dynamics rules), `tests/enquiries/live-adapters.test.ts` (live switch; portal CRM, HubSpot and admissions request shapes), `tests/enquiries/email-dryrun.test.ts` (no real mail under `DRY_RUN=1`).
5. `tests/enquiries/deliver.test.ts`: sent rows not resent; five failures → dead + alert in Mailpit; held/spam never delivered; autoresponder row; Retry/Release/requeue.
6. `tests/enquiries/thankyou-ratelimit.test.ts` (thank-you rules; memory and Postgres rate-limit stores), `tests/enquiries/scrub-ips.test.ts`.
7. `tests/enquiries/e2e/all-keys.e2e.spec.ts`: each of the 25 keys stores one row with its `dry_run` deliveries and the right thank-you; the newsletter reaches HubSpot (dry run); `/action_page.php` is 404.
8. `tests/enquiries/e2e/enquiry-form.e2e.spec.ts` (client validation, honeypot, save failure, full submit with attribution), `tests/enquiries/e2e/admin-enquiries.e2e.spec.ts` (filters by formKey, campaignCode and dead deliveries; read-only access).

## 9. IHNA differences
`SHARED-FILES.md` keeps `src/app/api/enquire/**`, `src/jobs/**` and `src/lib/adapters/**` identical in both repos; `src/content/**` (forms, routing) is site-specific. On IHM, Dynamics stays off (`DYNAMICS_ENABLED` unset); agent registrations go to both the IHM and IHNA stakeholder portals.

## 10. Open questions
1. Every `recipientGroups[].to` and `alertTo` in `src/content/enquiry-routing.ts` is empty, so all staff mail and alerts go to `ENQUIRY_NOTIFY_TO`. Who receives each group?
2. Production rate-limit store: keep the raw `enquiry_rate_limits` table or bring it under Payload/Drizzle (DEC-54)?
3. HubSpot: do the custom properties exist in the portal, and will a form GUID (`HUBSPOT_FORM_GUID`) be created so `hutk` is sent?
4. The portal CRM returns no lead reference (any 2xx counts as sent). Is a confirmable response available?
5. Should `sae-enquiry`, `sae-brochure`, `agent-registration`, `english-scholarship` and `lp-self-post-hubspot` be mounted on pages?
