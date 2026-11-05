# 60 — Landing pages

## 1. Purpose
Serve every live landing URL at its old path from route files (DEC-62): one `src/app/(site)/lp/<slug>/page.tsx` per page plus `src/app/(site)/enquirenow/scholarship/page.tsx` and `.../expression-of-interest/page.tsx`, each registered in `src/content/landing.ts`. Five templates compose blocks around the route file's JSX; every form is the `enquiryForm` block posting to `/api/enquire/` (40). Thank-you URLs keep their old handler paths because GTM counts conversions on them (80).

## 2. Data model
**Registry row** (`src/content/landing.ts`, `LandingEntry`, read with `landingAt(path)`; 55 rows: 53 `/lp/`, 2 `/enquirenow/`):
- `path` (with trailing slash), `section` (`lp | enquirenow`), `slug`, `title`
- `template`: `CourseLanding` (28) | `CampusBachelor` (4) | `CampusMaster` (7) | `EnquiryPage` (14) | `EventInvite` (2)
- `formKey` (a key in `src/content/forms.ts`), `thankYouPath` (`<path>thanks.php`; `thankyou.php` for the two EventInvite rows; gcan-gcc and graduate-certificate-in-advanced-nursing-gcan-australia point at `/lp/graduate-certificate-in-advanced-nursing/thanks.php`)
- `course`, `campus`: CMS slugs or `null`
- `noindex` (21 rows `false`, 34 `true`), optional `canonical`, `metaTitle`, `description`
- `applicationCourseId` (portal course id behind `/lp/<slug>/application_form.php`, DEC-55; 7 rows)

**Route file**: `export const metadata = landingMetadata(path)` and a default export rendering one of `CourseLandingPage | CampusBachelorPage | CampusMasterPage | EnquiryLandingPage | EventInvitePage` (`src/components/templates/landing/pages.tsx`) with `path`, `hero` (hero block props) and the JSX slots `lead`, `body`, `trail`; optional `ownForm` (the page brings its own form) and `has` (block types the page provides itself: `startDates`, `brochureDownload`). Body JSX uses the authoring kit `src/components/page/` (`Rich`, `Pic`, `img`, `Table`, `Cta`; 20-blocks).

**Lazy route map** (`src/content/landing-routes.ts`): path → `import()` of the route file, used by `/lp/<slug>/<code>/` to render the base page. 55 entries, same paths as the registry.

**CMS reads** (`loadLanding` in `pages.tsx`): the published course by slug (cache tags `course:<slug>`, `collection:courses`, `courses`; 300 s) and the campus by slug (tags `collection:campuses`, `campuses`; 300 s).

## 3. Admin capabilities
None. A content change is an edit to the route file and a deploy. Enquiries from landing pages are found in the `enquiries` list by `formKey` or `pageUrl` (40).

## 4. Front-end behaviour
**Templates** (`src/components/templates/landing/`; slots in order):

| Template | Composition |
|---|---|
| `CourseLanding` | Hero (split) → CourseFacts (when the row has a course) → *body* with sticky sidebar form → *trail* → BrochureDownload (course has a brochure document or legacy `brochureUrl`, page `has` none) → CTA banner → EnquiryForm card → sticky mobile CTA. `lead` is not rendered. |
| `CampusBachelor` | Hero (split, campus eyebrow) → *lead* → StartDates (course set, page `has` none) → *body* with sidebar form → *trail* → EnquiryForm card → sticky mobile CTA |
| `CampusMaster` | Hero (split, campus eyebrow) → *lead* → *body* with sidebar form → *trail* → EnquiryForm card → sticky mobile CTA |
| `EnquiryPage` | Hero (compact) → EnquiryForm card → *lead* → *body* → *trail* (no sticky CTA) |
| `EventInvite` | Hero (full) → *lead* → *body* → *trail* → EnquiryForm card ("Register your interest") → sticky "Register" CTA |
| ThankYou view | Hero (compact, "Thank you") → one message for all pages with links to `/courses/` and `/` → BrochureDownload when the URL has `?intent=brochure` and the course has a brochure |

- `heroBlock` (`shared.tsx`) turns a split hero into compact when there is no image or the heading is longer than 48 characters, and a full hero into compact without an image. A hero without CTAs gets "Enquire now" → `#enquiry-end`.
- The sidebar form (`#enquiry`, lg and up) renders only when the page has a `body`; the end form is `#enquiry-end`. Both use the row's `formKey`; `ownForm` removes the end form. The page course preselects the form's course field.
- Campaign, UTM and click ids are read on the client (41), so the HTML does not vary.

**Companion routes** (`src/app/(site)/lp/[slug]/*`, logic in `src/components/templates/landing/route.tsx`):
- `thanks.php/` for every registered page; `thankyou/` and `thankyou.php/` for `EventInvite` rows only. Noindex, canonical to the thank-you URL. Unknown slug → 404. The two scholarship rows have their own `thanks.php/page.tsx` under `src/app/(site)/enquirenow/scholarship/` and `.../expression-of-interest/`, rendering the same view.
- `application_form.php/` (rows with `applicationCourseId`): compact hero + iframe of `<origin>/CrmEnquiries/application_form_auto_enrol?course_id=<id>&enqiry_src=<src>` (`ApplicationEmbed.tsx`). Origin `STUDENT_PORTAL_EMBED_ORIGIN` (https only, default `https://student.ihm.edu.au`); `src` from `?enquiry_src=` (digits, default 540). Noindex. Other slugs → 404.
- `index.php/`: permanent redirect (`permanentRedirect`, 308) to `/lp/<slug>/` with the query kept. It does not check the registry.
- `[campaign]/`: any other second segment. A registered slug with a segment matching `^[A-Za-z0-9_-]{2,64}$` renders the base page plus `CampaignCookie` (writes the code into `ihm_attr`, 41), canonical to the base path, noindex. A malformed segment or unknown slug → 404. Codes are never looked up.

**Forms on landing pages** post `pageUrl`; the server matches it (or its parent path) to the registry row and answers with the row's `thankYouPath` plus `?campaign=<code>` (40 §4).

## 5. URLs
- 53 `/lp/<slug>/` route files and the two `/enquirenow/scholarship/...` pages, plus the companions above.
- The two `/enquirenow/scholarship/...` pages are bespoke: `LandingLayout` (`src/components/landing/ScholarshipParts.tsx`) = photo hero, content beside the row's form as a sticky sidebar (lg+), the same form again at `#enquiry-end`, sticky mobile button; it uses the registry row, `LandingArticle` and `formBlock`, so the form key, thank-you URL and tracking are those of the row. Copy in `src/content/scholarship.ts`.
- Bespoke /lp/ pages (the rest still use the five templates):
  - the 11 short enquiry pages (`bsw-course-enquiry`, `course-enquiry`, `dcap-enquiry`, `enquiry`, `gcan-courses-enquiry`, `gcan-enquiry`, `gcan-offer-enquiry`, `phone_number_validation`, `reception-toll-number`, `refer-your-friend`, `special-courses-enq`) render `QuickEnquiry` (`src/components/landing/QuickEnquiry.tsx`): split screen, pitch + counsellors photo + contact chips on the left, the row's form at `#enquiry-end` on the right; copy in `src/content/landing-enquiry.ts`;
  - `/lp/enquiry-ihm/` uses `LandingLayout` + `CourseOfferCard` (six courses; the live page's duplicated course blocks are merged), copy in `src/content/landing-enquiry-ihm.ts`;
  - `/lp/mwt-global-scholarship/` and `/lp/webinar-global-agents-ncap/` use `LandingLayout` (the "How to Apply" infographic is rebuilt as 10 steps; the contact's personal mobile and mailbox are replaced by role mailboxes), copy in `src/content/landing-events.ts`.
  - the four `/lp/bachelor-of-nursing-<city>/` pages (CampusBachelor rows) render `BonCityLanding` (`src/components/landing/BonCityLanding.tsx`) on `LandingLayout`: the copy is shared in `src/content/landing-bon.ts` (update `intake` there), the city is the row's campus; the portal StartDates block follows the placements; "Download Course Brochure" and "Check My Credit Eligibility" go to `#enquiry-end` as on the old pages (the brochure is on the thank-you page); images in `public/images/landing/bon/`;
  - the seven `/lp/master-of-nursing-enquiry*/` pages (CampusMaster rows) render `MasterEnquiryLanding` (`src/components/landing/MasterEnquiryLanding.tsx`) on `LandingLayout`: shared copy `MASTER_ENQUIRY` and per-page `MON_VARIANTS` (offer badges, fee, campus list, testimonials) in `src/content/landing-mon.ts`; the brochure sits behind the `course-brochure` form (brochureDownload block); images in `public/images/landing/mon/`.
  - the course-campaign pages (CourseLanding rows: `/lp/master-of-nursing{,-australia,-australia-anmj,-online}/`, `/lp/master-nursing/`, `/lp/post-graduate-nursing-courses-to-advance-your-career/`, `/lp/bachelor-of-social-work{,-melbourne,-ihm}/`, the GCAN family `/lp/gcan/`, `/lp/gcan-anp/`, `/lp/gcan-gcc/`, `/lp/gcn/`, `/lp/graduate-certificate-advanced-nursing-critical-care/`, `/lp/graduate-certificate-in-advanced-nursing{,-all,-australia,-critical-care-nursing,-fee-help,-gcan-australia}/`, `/lp/graduate-certificate-nursing/`, and the exam-preparation pages `/lp/nclex-for-rns/`, `/lp/nclex-rn/`, `/lp/osce-for-rns/`, `/lp/ncap_hold/`, `/lp/mcap-for-amc-written-examination-part-1/`, `/lp/dcap-adaptive/`, `/lp/dental-career-advancement-program/`) render `CampaignLanding` (`src/components/landing/CampaignLanding.tsx`) on `LandingLayout`: each page is a `CampaignPage` (hero, typed `sections` — facts, prose, grid, cards, groups, stats, pathway, faq with FAQPage JSON-LD, callout, links, videos, specialisations, table, startDates (the portal intake block, when the row has a course), quotes (student testimonials, the first six shown and the rest behind "Show all"; photos through `legacyImage`, else initials) — and a closing band; shape in `src/content/landing-campaign.ts`), copy in `src/content/landing-campaign-mon.ts`, `landing-campaign-bsw.ts`, `landing-campaign-gcan.ts` and `landing-campaign-exam.ts`; copy strings allow `**bold**` and `[label](href)`; every "Enquire"/"Schedule a call back" button goes to `#enquiry-end`; images in `public/images/landing/{mon,bsw,gcan,exam}/`. No `/lp/` route renders the generic `CourseLandingPage`/`CampusBachelorPage`/`CampusMasterPage` templates any more; they stay for new rows.
- Every other `/enquirenow/*` path → 302 `/courses/` (prefix rule in `src/lib/legacy-redirects.ts`; `/enquirenow/scholarship/` and below are excepted).
- `/automated-gcan-enrolment/` is an ordinary page (`src/content/pages.ts`), not a landing row.
- `/IHM_CourseGuide/` and `/HCI_Australia_International_CourseGuide/` 301 to their PDFs via `src/content/redirects.ts`; brochure and handbook PDFs: 70.
- Robots: `/lp/*` is noindex unless the row has `noindex: false` (`landingMetadata` passes the row's value to `buildMetadata`; a route's own `noindex: true` overrides it); the 21 `noindex: false` rows are the only landing URLs in `/sitemap.xml` (`src/lib/seo/sitemap-data.ts`). Thank-you, application and campaign-suffix URLs are always noindex.
- Indexable rows: bachelor-of-nursing-{brisbane,melbourne,perth,sydney}, bachelor-of-social-work-ihm, enquiry-ihm, gcan-anp, gcan-gcc, graduate-certificate-in-advanced-nursing-gcan-australia, master-of-nursing, master-of-nursing-australia, master-of-nursing-australia-anmj, master-of-nursing-enquiry, master-of-nursing-enquiry-{australia,brisbane,melbourne,oncampus-and-online,perth,sydney}, master-of-nursing-online, post-graduate-nursing-courses-to-advance-your-career.
- Application rows: bachelor-of-social-work (60), bachelor-of-social-work-melbourne (60), dental-career-advancement-program (39), master-nursing (60), mcap-for-amc-written-examination-part-1 (69), nclex-for-rns (33), nclex-rn (60).

## 6. Integrations
- `/api/enquire/` and the thank-you computation (40); campaign capture (41); course data blocks through `src/lib/portal/` (50).
- GTM on the thank-you URLs (80). The application iframe host is passed to the `iframeEmbed` view directly; the CSP `frame-src` list is `site.allowedEmbedHosts` (90).
- Env: `STUDENT_PORTAL_EMBED_ORIGIN`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `NEXT_PUBLIC_SITE_URL`.

## 7. Import / seed
None. The route files are the source and are edited by hand. `scripts/dev/registry-json.ts` prints the registry as JSON for `npm run status-sheet`.

**Adding a landing page**
1. Create `src/app/(site)/lp/<slug>/page.tsx` as in §2. Images are `img({...})`/`Pic` references to existing media; never write a form inline: the template mounts `enquiryForm{formKey}`.
2. Add the row to `src/content/landing.ts` (`noindex: true` unless marketing asks otherwise) and the lazy import to `src/content/landing-routes.ts`. The thank-you, campaign-suffix and `application_form.php` URLs then work with no further file.
3. A new form is a definition in `src/content/forms.ts` (40). A retired page keeps its URL through a row in `src/content/redirects.ts` (70), never a 404.

Form keys in use: `lp-portal-hubspot` 19, `lp-portal` 14, `lp-self-post` 7, `lp-hubspot` 6, `lp-admissions` 4 (the bachelor-of-nursing pages), `lp-event-email` 2, `lp-refer-friend` 1, `scholarship` 1, `scholarship-eoi` 1.

## 8. Acceptance checks
Automated (`npm run test:int`):
1. `tests/seo/metadata.test.ts`: `/lp/*` is noindex unless `noindex: false`.
2. `tests/seo/sitemap.test.ts`: landing rows enter the sitemap only when `noindex` is `false`.
3. `tests/enquiries/thankyou-ratelimit.test.ts`: the landing `thankYouPath` wins and keeps `?campaign=`; a non-local target is refused.
4. `tests/seo/tracking.test.ts`: the GTM container chosen for `/enquirenow/scholarship/thanks.php`; `tests/seo/route-metadata.test.ts`: a `noindex: false` row renders indexable metadata and every row's `thankYouPath` has a route file.

Manual against the dev server (`localhost:3000`):
5. `/lp/master-of-nursing-enquiry/thanks.php` → 200, robots noindex; `/lp/webinar-global-agents-ncap/thankyou` and `/thankyou.php` → 200; `/lp/master-of-nursing-enquiry/thankyou` → 404.
6. `/lp/master-of-nursing-enquiry/zmniywrz/` → 200, canonical `/lp/master-of-nursing-enquiry/`, noindex, sets `ihm_attr`; `/lp/master-of-nursing-enquiry/x/` → 404.
7. `/lp/course-enquiry/index.php?campaign=gcanpopup` → 308 to `/lp/course-enquiry/?campaign=gcanpopup`.
8. `/lp/nclex-for-rns/application_form.php` → 200 with an iframe to `https://student.ihm.edu.au/CrmEnquiries/application_form_auto_enrol?course_id=33&enqiry_src=540`.
9. `/enquirenow/anything/` → 302 `/courses/`; `/enquirenow/scholarship/` → 200.
10. `npm run parity -- --site=ihm` compares the landing URLs with the live site (`scripts/parity/crawl.ts`).

## 9. IHNA differences
Templates and the companion routes are IHM code; `src/content/landing.ts`, `landing-routes.ts` and the route files are site-specific (`SHARED-FILES.md`). IHNA landing paths (`/study-at-ihna/...`, `/healthcare-courses-<city>/`) and its extra templates are not in this repo.

## 10. Open questions
1. Old cached landing HTML may still POST to `/lp/<slug>/` or `thanks.php`; no handler feeds those into the pipeline. Accept them?
2. Do GTM triggers rely on form DOM ids from the old pages? The templates use `#enquiry`, `#enquiry-end` and `#brochureForm`.
3. Which live landing URLs that are not served (left to 404) should 301 instead? Needs Ads and GA4 data.
