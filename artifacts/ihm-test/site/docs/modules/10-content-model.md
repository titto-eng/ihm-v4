# 10 — Content model

## 1. Purpose
Every Payload collection and global in ihm-web: fields, access per role, hooks, versions, auth; and the code registries that hold
the rest of the site's content. Change this doc when you add or change a field.

## 2. Data model
Legend: `*` required · `U` unique · `I` index · `→x` relationship · `[]` hasMany · `L` = a `blocks` field (`layoutField()` in
`src/collections/shared/fields.ts`) that references every config-level block by slug (`blockReferences`, DEC-6), stored as JSON
(`blocksAsJSON: true`).

Shared groups (`src/collections/shared/fields.ts`):
- **SEO**: the SEO plugin's `meta` tab (title, description, image) on `courses` and `posts`, plus `seo` {`noindex`, `canonical`,
  `structuredData` json}.
- **import** (`courses`, `posts`): `wpId` U (admin-only), `importClass` I (A, B, C-lite, C, D, new; admin-only), `reviewStatus` I
  (`auto`, `check`, `needs-rebuild`, `kh-unresolved`, `ok`; DEC-23), `importReport` json, `reviewedBy`, `reviewedAt` (admin-only).
- `slug`: kebab-case, generated from the title (or name) when empty. `path`: computed, read-only, U.

### Collections (`src/collections/index.ts`)
| Collection | Fields |
|---|---|
| `courses` | `title`*, `slug`* U, `path` U, `code` I, `cricosCode`, `courseStatus`, `studentType` domestic/international/both (default both), `courseType` award/non-award, **Key facts** (below), `khId` I (portal course id, DEC-8), `khIdSource` dump/scrape, `showStartDates` (default false, DEC-7), `school`* →categories, `categories`[], `disciplines`[], `levels`[], `campuses`[], `deliveryModes`[], `durations`[], `universities`[], `relatedCourses`[] →courses, `heroImage`, `excerpt`, `accreditation`, `units` number, `applyLink`, `brochure` →documents (category `brochure` only; DEC-69), `brochureUrl` (legacy fallback, hidden in the admin when `brochure` is set), `handbookUrl`, `hubspotCourseId`, `dynamicsCourseOption`, `splId`, `featured` I, `featuredOrder`, `sections` array {`slot`* overview/entry/structure/careers/placements/pathways/faq/fees/additional (each once per course), `title`, `layout` L}, SEO, import, `fees` {`displayAmount`, `note`} |
| `posts` | `title`*, `slug`* U, `path` U, `category`* blog/news I, `publishedAt`* I, `author`, `heroImage`, `excerpt`, `readTime`, `content`* (Lexical), SEO, import |
| `events` | `title`*, `slug` U, `startsAt`* I, `dayLabel`, `timeText`, `frequency`, `discipline` →disciplines, `description`, `speaker`, `speakerBio`, `venue`, `hostedBy`, `joinUrl`, `secondaryUrl`, `image`, `tags` text[], `registrationOpen`, `formKey` (default `event-registration`, a key in `src/content/forms.ts`), `legacyId` U |
| `testimonials` | `name`*, `course` →courses I, `quote`*, `image`, `videoUrl`, `headline`, `subheadline`, `featured` I, `source` mwt/hardcoded/alumni, `legacyId` U |
| `staff` | `name`*, `slug` U, `position`, `postNominals`, `school` →categories, `photo`, `bio`, `email` (staff-read only), `linkedin`, `googleScholar`, `orcid`, profile arrays `research`, `grants`, `activities`, `supervision`, `active` I, `sortOrder`, `courses`[] →courses (drives CourseManagers), `legacyId` U. Profile URLs come from `src/content/staff-paths.ts` (DEC-9, DEC-65) |
| `levels`, `deliveryModes` | `name`*, `slug` U, `active` I, `sortOrder`, `legacyId` U |
| `durations` | same + `months`* |
| `universities` | same + `image`, `detailPath` (path of its route file), `enquiryEmail` (admin/marketing only) |
| `campuses` | same as universities + `portalCampusId` I, `hubspotCampusValue` |
| `disciplines` | same + `description`, `image`, `color` (hex), `parent` →disciplines |
| `categories` (Schools) | same as disciplines (`parent` →categories) + `enquiryEmail` |
| `media` | upload (`media/` on local disk): jpeg, png, webp, avif, gif, pdf (no SVG); sizes `thumb` 400, `card` 768, `hero` 1600, `og` 1200×630; focal point. Fields `alt`*, `caption`, `credit`, `legacyPath` U (read-only, the old `wp-content/uploads` path). Pages read a media doc through `mediaOf` (`src/components/blocks/media.ts`), which makes same-origin URLs relative and drops the trailing slash Payload adds after the file name (`trailingSlash: true`; the slashed path redirects and next/image rejects redirects) |
| `documents` | upload (`media/documents/` on local disk), PDF only. `title`*, `category`* policy/procedure/staff-policy/form/guide/handbook/brochure/other (`brochure` = a course brochure, pickable as `courses.brochure`), `audience`* students/staff/public, `effectiveDate`, `publicPath`* U I, `listings` array {`section`* student-policies/student-procedures/staff-policies/staff-procedures/glossary, `order`*}, `notes` (staff-read only) |
| `enquiries` | `publicId` I, `submissionId`* U, `formKey`* I, `status`* I (received … dead, derived from deliveries), captcha {`captchaStatus`, `captchaScore`, `honeypot`}, `firstName`, `lastName`, `email` I, `phone`, `country`, `studentType`, `consent`, `course` →courses, `campus` →campuses, `campaignCode` I (raw code as received), `utm` group (utm_*, click ids, referrer, landingPath, firstTouch), `hutk` (DEC-13), `data` json, `pageUrl`, `source` api/legacy-post, `ip` (nulled after 90 days), `deliveries` array {adapter, target, status pending/sent/failed/dead/held/dry_run, attempts, at, responseCode, externalId, lastError, dryRunRequest, hsSourceFallback} |
| `application-files` | upload (PDF, DOC, DOCX; `media/application-files`), `publicId`* U (the reference a form's `file` field stores in `enquiries.data`), `formKey`* I. Read and delete: admin only; nobody creates through access control (the upload endpoint writes with `overrideAccess`) |
| `products` | `sku`* U, `legacyE2Btn` U (1–12, old `?e2btn=`), `name`*, `kind`* prep-package/mock-test, `description`, `priceCents`* ≥1, `currency` AUD, `studentDiscountPercent` (default 50), `accessMonths`, `gateways`[], `active` I, `sortOrder` |
| `payments` | mirror of the payment rows our flows create: `paymentId`* U (uuid), `kind` invoice/product/sae/portalReturn, `product`, `paymentFor`, `invoiceNo` I, `studentId` I, `payerName`, `payerEmail` I, `amountCents`*, `baseCents`, `surchargeCents`, `currency`, `gateway` I, `gatewayRef` I, `status`* I, `statusHistory`, `steps` (post-payment job status), `portalPaymentId`, `flags`, `ip`, `settledAt`, `lastSyncedAt`. Written only by `src/lib/payments` (45) |
| `users` (auth) | `email`, `name`, `roles`*[] admin/marketing/events/finance/viewer (default viewer, `saveToJWT`) |
| `alumni` (auth) | `email`, `firstName`*, `lastName`*, `graduationYear`, `course`, `marketingConsent`, `legacyId` U, `passwordSetAt` |

**Course key facts.** The collapsible "Key facts" holds group `facts` with sub-groups `duration`, `units`, `delivery`, `level`,
`campuses`, `cricos`, `fee`, each {`show` checkbox default true, `value`, `detail`}, and group `factsInternational` with the same
shape (shown in the admin only when `studentType` is `both`). Resolution (`src/components/course/facts.ts`, pure):
- `factsInternational.<key>` is used only when the course is `both`, the audience is international, and that sub-group has a
  `value` or `show = false`; otherwise `facts.<key>`.
- `show = false` hides the fact. A blank `value` falls back to the course: lookup names (`durations`, `deliveryModes`, `levels`,
  `campuses`, joined with " · "), `units` ("24 units"), `cricosCode`, `fees.displayAmount` (with `fees.note` as the detail). A fact
  with no value after the fallback is skipped. An own `value` uses only its own `detail`.
- Order: duration, units, delivery, level, campuses, cricos, fee.
Rendering is `CourseFacts` (`src/components/course/CourseFacts.tsx`, 20). `scripts/dev/fill-course-facts.ts` fills blank facts
(never `fee`) (30).

### Globals
- `courseShared` (label "Shared course section"): `layout` L, rendered on every course page after the course's own blocks
  (DEC-22). Drafts with autosave and scheduled publish, 25 versions.

### Code, not CMS
- **Pages:** `src/app/(site)/<path>/page.tsx` (home is `(site)/page.tsx`), JSX over the authoring kit `src/components/page/` (20)
  or a template from `src/components/templates/pages.tsx`. Registry `src/content/pages.ts` (`path`, `title`, `template`,
  `noindex`, `description`, `text` for search, `route: 'existing'` for routes with their own handler such as `/blog/`; `pageAt`,
  `pagesByTemplate`), one row per content page (DEC-61).
- **School of Social Work** (DEC-36): `src/content/school-of-social-work/` — `pages/*.json` (the 9 section pages as SSW blocks:
  kit blocks plus `chips`, `note`, `cards`, `links` (`"CAREERS"` expands to the 13 career areas), `people`, `tree`, `quote`, `quotes`,
  `videos`, `events`, `gallery`, `partners`, `pubs`, `faq`, `schedule`, `logos`, `pillars`; stats are `[value, label, note?]`; an h2
  may carry `tone` (dark / coral / sand), `layout: 'split'`, `img` or `band`, see 05), `data.ts` (`SSW_CAREERS`, `SSW_EVENTS`,
  `CAREER_PHOTO`) and `index.ts` (`SSW_PAGES`, `SSW_MENU` (the School navigation and its "Study with us" menu), `SSW_NAV` (breadcrumb names), `SSW_PATHS`, the
  `pages.ts` rows `SSW_PAGE_ENTRIES`, template `schoolOfSocialWork`).
- **Landing pages:** `src/app/(site)/lp/<slug>/page.tsx` and `enquirenow/scholarship/…`; registries `src/content/landing.ts`
  (`landingAt`) and `landing-routes.ts` (60, DEC-62).
- **Site constants** (DEC-63): `src/content/site.ts` (site settings, tracking ids, `allowedEmbedHosts`, WhatsApp number),
  `nav.ts` (menu groups may carry a heading `href` and `highlight`), `footer.ts` (columns with `kind`, brand marks, border image), `course-images.ts` (course hero photo fallbacks), `post-images.ts` (topic photo for a post without a `heroImage`), `campuses.ts` (campus contacts), `forms.ts` (the 27 form definitions, 40; field types include `file`, an upload reference — the `adjunct-application` form takes a CV), `enquiry-routing.ts`
  (recipient groups, alert addresses, default source id), `redirects.ts` (DEC-64), `staff-paths.ts` (DEC-65),
  `people.ts` (the /our-people/ directory: tabs, groups, name, role, portrait in `public/images/people/`, bio path and
  public LinkedIn/ORCID/Scholar links; no email addresses. A person whose `bio` is a staff profile shows the CMS staff photo first;
  a `photo` whose file is not in `public/` yet shows an initials tile, and `npm run people:photos` downloads it from the old
  theme's `legacyPhoto` on ihm.edu.au),
  `micro-credentials.ts` (the micro-credentials module: 4 care areas, the 12 specialties with unit codes, topics, settings and
  images in `public/images/micro-credentials/`, the shared "at a glance" facts and fee, FAQs and partner proposition; read by
  `/micro-credentials/`, its 12 specialty routes through `src/components/micro-credentials/Specialty.tsx`, `requirements/`
  (canonical; `microcredentials-requirements/` renders the same page) and `industry-partners/`),
  `articulation.ts` (/articulation-pathway/: the four diploma and bachelor pathways, the two flows, steps, scholarship
  conditions and RTO points; `partnerships@hci.edu.au` is the role mailbox), `nursing-pathway.ts` (/nursing-specialisation-pathway/:
  the 12 GCAN specialisations, GCAN vs MoN facts, Master's focus areas, semester structure, admission, fees, FAQs; course
  leadership links to profile pages only),
  `bachelor-of-nursing.ts` and `gcan-anp.ts` (the two bespoke course pages at `src/app/(site)/courses/bachelor-of-nursing/` and
  `courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice/`; these static routes take precedence over
  `courses/[slug]`, as WordPress served these two courses from their own templates. `/bachelor-of-nursing/` 308s to the course URL),
  `cultural-events.ts` (the student and staff cultural workshop events; images in `public/images/cultural-events/`),
  `alumni.ts` (/alumni/: hero collage, counters, countries, video stories, quotes, benefits, referral rewards, support and social
  links; photos in `public/images/alumni/`; its two forms are `alumni-story` and `alumni-signup`; /alumni-registration/ uses
  `alumni-registration`), `library.ts` (/library/ and its children: catalogue settings, services, videos, search tips, copyright
  text; thumbnails in `public/images/library/`), `library-guides.ts` (the course reading lists from the WordPress tables
  `library_courses` / `library_courses_unit_books`, served at /library/eresources/?course=<id> with the old ids), `library-bsw.ts` (/library-guide-bsw/: databases, eBooks with
  covers from the live site via `legacy-assets.ts`, journals, writing help, integrity and library links), `academic-integrity.ts`
  (/academic-integrity/: the page's sections, the five-step breach process, the penalty framework and the full procedure
  IHM-AHIP2-5.1 as `AI_PROCEDURE`),
  `student-support.ts` (the student support hub, counselling external/internal, accessibility, external services, complaints
  and appeals, student safety and cybersecurity pages, rendered with `src/components/student-support/parts.tsx`; staff appear
  without personal mailboxes, contact goes to the Student Support mailbox),
  `international.ts` (the nine international student pages: new to Australia, before leaving, visa advice, Genuine Student
  test, English requirements, USI, ESOS, nursing registration, changes to enrolment; rendered with `IntlShell` in
  `src/components/international/parts.tsx`, which reuses `SupportShell`),
  `admissions.ts` (how to apply, fees and charges, FEE-HELP and its 28 FAQs, credit and RPL, scholarship, the GCAN admission
  guide as `GCAN_GUIDE`; kit blocks rendered with `src/components/page-kit/Kit.tsx` and `AdmissionsShell`/`KitChapters` in
  `src/components/admissions/parts.tsx`), `key-dates.ts` (/key-dates/: intakes per year and the courses-by-campus table; add a
  year at the end each year),
  `study.ts` (/key-systems/, /career-growth/ with RN state shares and pay drawn as `stats` blocks, /study-at-ihm/,
  /student-success-gcan/), `webinars.ts` (the MON and GCAN session lists; upcoming/past is computed from the date in
  Australia/Melbourne, pages revalidate hourly), `testimonials-page.ts` (/student-testimonials/: 67 video stories and 56 written
  testimonials, photos in `public/images/testimonials/`), `gcan.ts` (/graduate-certificate-in-advanced-nursing/: about,
  specialisations linking to their course pages, steps, admission, fees, scholarships, 22 FAQs, video stories, blog slugs read
  from `posts` with `getPostsBySlugs`),
  `about.ts` (the About IHM pages: about us, governance, meet our MD, rankings, partner with us, Aboriginal and Torres Strait
  Islander, support staff, careers, HCI Australia, logo statement, gallery photo sets in `public/images/gallery/`, regulatory
  announcements, DataFlow; rendered with `AboutShell`, `Registration` and `Regulators` in `src/components/about/parts.tsx`),
  `about2.ts` (/global-recognition/ by region, keeping the `#pills-*` anchors, and the Reconciliation Action Plan). /staff-profile/
  redirects the old `?id=` links of people who have a profile page (map in the route file) and otherwise shows the staff directory,
  `landing-enquiry.ts`, `landing-enquiry-ihm.ts`, `landing-events.ts`, `landing-bon.ts`, `landing-mon.ts`, `landing-campaign.ts` (+ `-mon`, `-bsw`, `-gcan`, `-exam`) (copy for the bespoke /lp/ pages, see 60-landing),
  `scholarship.ts` (the two /enquirenow/scholarship/ landing pages: pathways, fees, eligibility, institutional partnership),
  `legal.ts` (/ihm-privacy-policy/ as chapters + associated information + change history, and the website privacy statement;
  the edits made to the old policy text are listed in the file header),
  `campus-pages.ts` (the campus pages, /campuses/, /contact/ and /talk-to-rishi/: city copy, photos, video or 3D tour, campus team
  by name and role only, locations with map and directions links; addresses for the old templates stay in `campuses.ts`),
  `partnerships.ts` (the Cintana, ASU and Ramsay partnership pages, rendered with `PartnerShell`, `PartnerCards`, `PersonCard` and
  `Feature` in `src/components/research/parts.tsx`), `research.ts` (the research pages: research ethics and the LR-HREP with its
  quarterly deadlines (the next one is highlighted from the date; the route revalidates daily), research strategy, research centres,
  initiatives and collaborations, the Allied Health Research Centre; rendered with `ResearchShell` and `ResearchBand`),
  `legacy-assets.ts` (images found only on the live site, by path on ihm.edu.au or by full URL when the live page loads them
  from another host; `npm run assets:legacy` downloads them (an `.svg` target is kept as vector), `src/lib/legacy-image.ts` falls
  back until then). /news-and-events/ reads the `events` collection and `news` posts; /career/ embeds the ELMO careers portal.

### Access (`src/lib/access.ts`)
Staff = a `users` doc; alumni are never staff. Every collection declares its operations explicitly.

| Collection | Read | Create / update | Delete |
|---|---|---|---|
| courses | published, or any staff | marketing; finance may update (only `fees` and the fee fact text, below) | admin |
| posts, staff, testimonials | published, or any staff | marketing | admin |
| events | published, or any staff | marketing, events | admin |
| lookups | `active`, or any staff | marketing | admin |
| media | anyone | marketing, events | admin |
| documents | anyone | marketing | admin |
| products | `active`, or any staff | create finance; update marketing, finance | admin |
| enquiries | marketing, finance | nobody (system writes with `overrideAccess`, DEC-3) | nobody |
| payments | finance | nobody (system writes) | nobody |
| users | self, admin | create admin; update self, admin | admin |
| alumni | self, admin | create admin; update self, admin | admin |
| `courseShared` | anyone | marketing | — |

Admin is included in every role list. `viewer` reads drafts and inactive rows and writes nothing.
Field-level: `courses.fees`, `courses.facts.fee.{value,detail}` and `courses.factsInternational.fee.{value,detail}` finance;
every other course field marketing (`lockFields`); `products.priceCents`, `currency`, `studentDiscountPercent` finance;
`documents.publicPath` marketing on create, admin only on update (a live URL never moves); `documents.notes` and `staff.email`
staff read; lookups `enquiryEmail` marketing; `users.roles` update admin; import system fields admin. Alumni cannot reach `/admin`
(`access.admin: () => false`) and cannot set `_verified` or change their email.

### Hooks (`src/collections/shared/hooks.ts` unless noted)
1. **Path** (courses, posts, `beforeValidate`): `path` = `/courses/<slug>/`, `/blog/<slug>/`, or `/news/<slug>/` for news posts;
   `assertPathFree` rejects a path another doc of the same collection uses.
2. **A live URL never changes** (courses, posts): `captureLiveUrl` + `refuseUrlChange` refuse to publish a doc under a new `path`
   when the old one is live. A developer adds the old URL to `src/content/redirects.ts`, then saves with `context.allowUrlChange`;
   `context.importing` also bypasses. Drafts that were never published change slug freely.
3. **Review**: `stampReview` sets `reviewedBy`/`reviewedAt` when a person sets `reviewStatus: ok`; scripts cannot set `ok`.
4. **Revalidate**: see 00 §4. Documents use their own hooks (`src/collections/Documents.ts`): `beforeValidate` normalises
   `publicPath` (pasted URL → decoded path); `afterChange`/`afterDelete` expire `documents`, `collection:documents` and
   `document:<publicPath>` at once; skipped under `context.importing`.
5. **Embed hosts** (`validateEmbedHosts`, `beforeValidate`, DEC-29): on `courses.sections` (and `posts`, which have no layout, so
   it never fires there); rejects an `iframeEmbed` whose host is not built in or in `site.allowedEmbedHosts`, and a `mapEmbed`
   that is not a Google Maps embed URL.
6. **Alumni** (`src/lib/alumni/hooks.ts`): login/forgot-password rate limit and password policy.

### Versions
Drafts + autosave (1.5 s) + scheduled publish, 25 versions: courses, posts, events, testimonials, staff, `courseShared`.
Versions only: products. None: lookups, media, documents, enquiries, payments, users, alumni. `livePreview` URLs: courses, posts.
Draft preview: `GET /api/preview/?path=<site path>&secret=<PREVIEW_SECRET>` (`src/app/api/preview/route.ts`, helpers in
`src/lib/preview.ts` and the pure `src/lib/preview-url.ts`) turns Next draft mode on for a signed-in staff user and redirects to
the path; `/api/preview/exit/` turns it off. The course and post routes fetch with `draft: true` while draft mode is on; otherwise
they show the published version. The `livePreview` URLs in `Courses.ts` and `Posts.ts` are built by `previewUrl(path)`, so the
admin live-preview pane goes through this route and shows the draft. With `PREVIEW_SECRET` unset the route answers 503 and
preview shows published content only.

### Auth
- `users`: 5 attempts then 15 min lock, 8 h token, `SameSite=Strict` cookie (secure in production), token removed from responses.
- `alumni`: same lockout, 12 h token, `SameSite=Lax`; email verification link `/alumni/verify/?token=`, reset link
  `/alumni/reset-password/?token=` (1 h). Accounts are created by staff or an import; `/alumni/register/` is a request form
  (`alumni-signup`) through the enquiry pipeline (DEC-47).

## 3. Admin capabilities
Marketing edits, schedules and publishes courses (including key facts except the fee text), posts, events, staff, testimonials,
media, documents, lookups and the shared course section; works the review queue (`reviewStatus`); reads enquiries. Events staff
edit events and media. Finance edits course fees, the fee fact text and product prices, and reads enquiries and payments. Pages,
landing pages, menus, footer, site settings, forms, recipients and redirects are code.

## 4. Front-end behaviour
Server components read through the Local API, cached under the tags in 00 §4; unknown or unpublished → `notFound()`. Code pages
read no collection for their own text; template pages read the courses, posts, staff, events, testimonials or lookups they list.
`/policies-procedures/` reads the document index (`getDocumentIndex()` in `src/app/(site)/pdf/documents.ts`).

## 5. URLs
Code page = its route file path; its row in `src/content/pages.ts` must match. Course `/courses/<slug>/`, post `/blog/<slug>/`
(news `/news/<slug>/`), staff profile = its `staff-paths.ts` key, document = its `publicPath`. Resolution order: 00 §4.

## 6. Integrations
`DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, `EMAIL_FROM`, `RESEND_API_KEY` / `SMTP_HOST`, `SMTP_PORT`.

## 7. Import / seed
Per `30-import.md`. Idempotency keys: `import.wpId` (courses, posts), `legacyId` (lookups, events, testimonials, staff, alumni),
`media.legacyPath`, `documents.publicPath`, `products.sku`. `seedProducts()` (`src/collections/seed/products.ts`) creates the 12
English-test products (`legacyE2Btn` 1–12); `scripts/dev/seed-admin.ts` creates the dev admin from `DEV_ADMIN_EMAIL` /
`DEV_ADMIN_PASSWORD`.

## 8. Acceptance checks
1. `npm run generate:types && npm run typecheck` pass; no `*_blocks_*` tables exist (`blocksAsJSON`).
2. `tests/collections/courses.test.ts`: path `/courses/<slug>/`, `showStartDates` default false; marketing cannot update `fees`,
   finance can and cannot touch other fields; a published course cannot be republished under a new URL; `allowUrlChange` and
   `importing` bypass; duplicate slug rejected.
3. `tests/collections/access.test.ts`: alumni auth and verification, enquiries and payments read/write rules, product price
   field access, lookups active-only and hidden `enquiryEmail`, users self-read and roles lock.
4. `tests/collections/content.test.ts`: `seedProducts` idempotent with `legacyE2Btn` 1–12 unique; lookup relations.
5. `tests/collections/documents.test.ts`: `publicPath` rules and normalisation, access, admin-only path change, uniqueness,
   PDF-only upload, served at its path with 200 `application/pdf`, 404 for traversal and unknown paths.
6. `tests/courses/course-facts.test.ts`: fallbacks, order, `show = false`, the international override, the rendered strip.
7. Every content page route file has a row in `src/content/pages.ts` (`/courses/`, `/makepayment/` and `/search/` have none);
   no automated test covers this yet.

## 9. IHNA differences
IHNA's schema lives in `ihna-web`; collections shared with this repo follow `SHARED-FILES.md`.

## 10. Open questions
1. Are staff emails public? `staff.email` is staff-read until decided.
2. Fee fact access: `lockFields` gives the `facts`/`factsInternational` groups marketing-only update access while their `fee`
   sub-fields are finance-only, so in practice only admin can set the fee fact text; confirm whether finance should be able to.
