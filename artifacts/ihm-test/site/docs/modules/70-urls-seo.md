# 70 — URLs, redirects, SEO (ihm-web)

## 1. Purpose
Every live URL of ihm.edu.au answers at the same path with the same outcome (AGENTS.md rule 1, DEC-10). This module owns the request order, exact and prefix redirects, page metadata, JSON-LD, `/sitemap.xml`, `/robots.txt`, the legacy image and document URL handlers, and the parity crawl.

## 2. Data model
- **Exact redirects:** `src/content/redirects.ts`, `Redirect = { from, to, permanent, note }`, 18 rows, all `permanent: true` (DEC-64). `next.config.ts` `redirects()` maps them with `statusCode: 301 | 302` (not Next's 308/307).
- **Prefix and substring rules:** `src/lib/legacy-redirects.ts` (`LEGACY_RULES`, `LEGACY_EXCEPTIONS`, `matchLegacyRule`, matched on the lower-cased path), run by `src/proxy.ts`.
- **Page registry:** `src/content/pages.ts` (`PageEntry`: `path`, `title`, `template`, `noindex?`, `description?`, `text?`; 124 rows, one per route file under `src/app/(site)/`). Feeds the sitemap, `/search/` and the hubs. Each route file sets its own `metadata` with `pageMetadata()`.
- **Landing registry:** `src/content/landing.ts` (55 rows, each with `noindex`; 21 are `noindex: false`). Landing route files use `landingMetadata(path)` (`src/components/templates/landing/pages.tsx`).
- **Staff profile URLs:** `src/content/staff-paths.ts`, 52 old paths → 51 staff slugs (`dr-md-parves-sultan` owns two; DEC-9, DEC-65).
- **Site SEO constants:** `src/content/site.ts`: `siteName`, `titleTemplate: '%s | IHM'`, `defaultDescription`, `defaultOgImage: null`, `logo: null`, `organisation`.
- **Courses and posts:** plugin-seo `meta` group (`title`, `description`, `image`; `generateTitle` = the bare `<title>` (the suffix comes from `site.titleTemplate` at render), `generateURL` = `NEXT_PUBLIC_SITE_URL` + path) and the `seo` group from `seoExtras()` in `src/collections/shared/fields.ts` (`noindex`, `canonical`, `structuredData` JSON). `path` is computed on save: courses `/courses/<slug>/`; posts `/blog/<slug>/`, or `/news/<slug>/` when `category = news`.
- **`media.legacyPath`:** the original `wp-content/uploads/...` path (unique), used by the uploads handler.
- **`documents.publicPath`:** unique, under one of `DOCUMENT_PREFIXES` (`/pdf/`, `/brochures/`, `/IHM_Domestic_SHB/`, `/International-SHB/`), ending `.pdf`, stored decoded. `DOCUMENT_ALIASES` (2 entries) serve an old file name with 200 from another document. All in `src/collections/Documents.ts`.

## 3. Admin capabilities
- Marketing edits `meta` (title, description, image) and `seo` (`noindex`, `canonical`, `structuredData`) on courses and posts.
- A published course or post keeps its URL. `refuseUrlChange` (`src/collections/shared/hooks.ts`) rejects a save that would publish a different `path` ("A live URL never changes"). To rename, a developer adds the old URL to `src/content/redirects.ts`, deploys, then saves with `context.allowUrlChange`. `context.importing` also bypasses. `assertPathFree` rejects a path that another document in the same collection already uses.
- Documents: marketing uploads a replacement file and the URL stays the same. Marketing sets `publicPath` on create; only admin can change it later (`docs/HOW-TO-REPLACE-A-POLICY-PDF.md`).
- Redirects, page titles and descriptions, landing pages and staff paths are code. A developer edits the file and deploys.

## 4. Front-end behaviour
**Trailing slashes:** `trailingSlash: true`. An extensionless path without a slash gets a 308 to the slashed path. Paths with an extension (`.pdf`, `.php`) never get a slash. The query string never affects routing.

**Request order:**
1. `next.config.ts` redirects: the trailing slash first, then `redirects.ts` (query kept).
2. `src/proxy.ts`, on every path except `_next/static`, `_next/image`, `favicon.ico`, `media/` and `api/media/`:
   - `/wp-json`, `/xmlrpc.php`, `/wp-login.php` and `/wp-admin` (and below) → 410 (DEC-58).
   - `/admin` guard (see 90).
   - `matchLegacyRule`:
     - `/enquirenow/*` → 302 `/courses/`, except under `/enquirenow/scholarship/` (DEC-40).
     - Any path containing `learning-hub` → 301 `/`.
     - Any path containing `emergency-services` → 301 `/external-services/`.
   - `/(pdf|brochures|IHM_Domestic_SHB|International-SHB)/….pdf` is rewritten to `/pdf/~<path>`, so the `documents` collection answers before a static copy in `public/`.
   - `/wp-content/uploads/*` passes through untouched.
   - Everything else gets the security headers and CSP (90).
3. A route file under `src/app/(site)/`: a hardcoded page, a landing page (`lp/…`), `courses/[slug]`, `blog/[[...parts]]` or `news/[[...parts]]`.
4. The catch-all `src/app/(site)/[...slug]/page.tsx` serves only the paths in `staff-paths.ts`, for an active staff doc. Every other path gets `notFound()`, a real 404.

Config redirects run before every route, so a `from` in `redirects.ts` must never equal a route file's path or a `staff-paths.ts` key.

**Metadata:**
- **Hardcoded pages and staff profiles:** `pageMetadata({ title, path, metaTitle?, description?, noindex?, canonical?, image? })` (`src/components/page/metadata.ts`) calls `buildMetadata` (`src/lib/seo/metadata.ts`) with `site`. That sets:
  - `<title>`: `site.titleTemplate` applied to `metaTitle || title`, as an absolute title.
  - description: the given one, else `site.defaultDescription`.
  - canonical: `NEXT_PUBLIC_SITE_URL` + path with the query stripped, or `canonical`.
  - OG and Twitter: OG image from `image`, else `site.defaultOgImage` (null today). `og:locale` is `en_AU`.
- **Landing pages:** `landingMetadata(path, extra?)` calls the same builder with the registry row and the row's `noindex` as is; `extra.noindex: true` forces noindex. The 21 `noindex: false` rows render indexable and are the landing rows in the sitemap.
- **Robots (`resolveRobots`, shared with the sitemap):**
  - `NEXT_PUBLIC_ROBOTS=noindex` → noindex,nofollow.
  - `/search/` → noindex,follow.
  - `noindex` set → noindex,nofollow.
  - `/lp/*` and `/enquirenow/*` → noindex unless the doc passes `noindex: false`.
- **Courses and posts:** `generateMetadata` in `src/app/(site)/courses/[slug]/page.tsx` and `blogMetadata` in `src/components/templates/blogRoute.tsx` pass the document to `getSeoMetadata` (`src/lib/seo/get-metadata.ts`, `buildMetadata` with `site`):
  - title `meta.title || title` through `site.titleTemplate` (one ` | IHM`).
  - description `meta.description || excerpt`, else `site.defaultDescription`.
  - canonical `seo.canonical || path`; robots from `resolveRobots` (`seo.noindex`, `NEXT_PUBLIC_ROBOTS`).
  - OG type `website` for courses; `article` for posts, with `publishedTime`, `modifiedTime` and the hero image.
  - Blog/news listings: the title plus "(page N)", with a canonical for each page, through the same builder.
- **Layout** (`src/app/(site)/layout.tsx`): `metadataBase` = `NEXT_PUBLIC_SITE_URL`, default title "Institute of Health and Management", template `%s | IHM`.

**JSON-LD:** the builders are in `src/lib/seo/jsonld.ts` and the components in `src/components/seo/`. They render through `<JsonLd>`, which escapes `<` (`safeJsonLd`) and renders nothing for empty data.

| Where | Types |
|---|---|
| Home (`HomePage`, `src/components/templates/pages.tsx`) | `EducationalOrganization` (name, url, phone, email, `sameAs` from the footer social links) + `WebSite` with a `SearchAction` to `/search/?q=` |
| Course (`CourseDetail`) | `Course` (`courseCode`, provider, `hasCourseInstance` from the portal start dates when `khId` is set and `showStartDates` is true, DEC-7) + `BreadcrumbList` Home › Courses › X |
| Post (`BlogPost`) | `BlogPosting`, or `NewsArticle` for `category = news`, + `BreadcrumbList` Home › Blog/News › X |
| Accordion block and the `Accordion` page component, any variant except `plain` | `FAQPage` built from the items that have answer text |

`seo.structuredData` is merged into `Course` and the post types. It cannot change `@type`.

**Revalidation:**
- Publishing a course or post revalidates `courses`/`collection:courses` or `posts`/`collection:posts`, `course:<slug>` or `post:<slug>`, and `sitemap`.
- A `documents` change expires `documents`, `collection:documents` and `document:<publicPath>` at once.
- `POST /api/revalidate` (header `x-revalidate-secret`) takes `tags`, `paths` or `all`.
- Code pages change on deploy.

## 5. URLs
- **`../inventory/v2/ihm/pages.csv`:** 347 distinct paths plus 115 query variants. Query variants answer like their path, and canonicals drop the query.
- **`redirects.ts` (18 rows):**

| Group | Rows |
|---|---|
| Old theme rules whose target is live | `/emergency-services/` → `/external-services/`, `/learning-hub/` → `/` |
| Flipbooks and the handbook folder → PDF (DEC-17) | `/IHM_CourseGuide/` and `/IHM_CourseGuide/IHM_CourseGuide.pdf` → `/pdf/IHM_Course_Guide.pdf`, `/HCI_Australia_International_CourseGuide/` and its inner `…CourseGuide.pdf` → `/pdf/HCI_Course_Guide.pdf`, `/International-SHB/` → `/International-SHB/International-SHB.pdf` |
| Old payment pages → `/makepayment/` (DEC-45) | `/airwallex/`, `/airwallex-checkout/`, `/pay-online/`, `/secure-pay/`, `/secure-pay-card/`, `/secure-pay-card-dcc/`, `/secure-pay-response/`, `/secure-pay-response-2/` |
| Landing backups that were live | `/lp/enquiry-ihm-old/`, `/lp/nclex-for-rns-old/`, `/lp/osce-for-rns_bkp_21062023/` → their base `/lp/<slug>/` |

- **Gone URLs:** a path with no route returns 404. This covers the 19 `gone` rows in `landing-pages.csv`.
- **Document URLs** (`/pdf/**`, `/brochures/**`, `/IHM_Domestic_SHB/**`, `/International-SHB/**`, `.pdf`): the proxy rewrites them to `src/app/(site)/pdf/[...path]/route.ts`, which calls `serveDocumentPath` (`serve.ts`). Lookup order:
  1. A `documents` row whose `publicPath` (or alias) matches. Its stored file under `media/documents` is served with 200 `application/pdf`, `inline`, an ETag and `Cache-Control: public, max-age=0, must-revalidate`.
  2. Otherwise the static copy under `public/`.
  3. Otherwise 404.

  `publicPathOf` rejects `.`/`..`/slash/backslash/NUL segments, foreign prefixes and non-PDF names. `fileInside` refuses files that resolve outside their root. The index (`getDocumentIndex`, `documents.ts`) is cached under the document tags for 24 h. `/policies-procedures/` lists documents by `listings.section` and `order`.
- **`/wp-content/uploads/<path>`** (DEC-59): `src/app/(site)/wp-content/uploads/[...path]/route.ts` calls `handleLegacyMedia` (`src/app/api/legacy-media/handler.ts`).
  - It looks up `media.legacyPath`, then the WordPress look-alikes (`-WxH`, `-scaled`, `-e<digits>`).
  - A hit answers 301 to `/api/media/file/<filename>` (cached 1 h).
  - No hit answers 404 (cached 60 s). A failed lookup answers 503.
- **`/sitemap.xml`** (`src/app/(site)/sitemap.xml/route.ts`, built by `src/lib/seo/sitemap.ts` and `sitemap-data.ts`):
  - One urlset. `loc` = `NEXT_PUBLIC_SITE_URL` + path. `lastmod` = `updatedAt`, or the server start time for code pages and landing rows.
  - Entries are cached under tag `sitemap` and refreshed hourly. The response sends `s-maxage=3600, stale-while-revalidate=86400`.
  - In: `pages.ts` rows without `noindex` (`/payment-options/` is `noindex: true`, like its page metadata), published courses and posts without `seo.noindex`, and landing rows with `noindex: false`.
  - Out (`EXCLUDED_PATH`): the payment paths (`airwallex`, `payway`, `secure-pay`, `pay-online`, `makepayment`, `make-a-payment`, `pay`), `search`, `alumni/login`, thank-you paths, `/page/N/` and `/courses/test-N/` (DEC-34).
  - Documents are not listed.
- **`/robots.txt`** (`src/app/(site)/robots.txt/route.ts`, `src/lib/seo/robots.ts`, read per request):
  - Production: `Allow: /`, `Allow: /api/media/`, `Disallow:` `/admin/`, `/api/`, `/pay/` and `/search/`, then `Sitemap:`.
  - With `NEXT_PUBLIC_ROBOTS=noindex`: only `Disallow: /`.

## 6. Integrations
- Env: `NEXT_PUBLIC_SITE_URL` (origin for canonicals, OG, sitemap and robots), `NEXT_PUBLIC_ROBOTS` (`index|noindex`), `REVALIDATE_SECRET`.
- The course JSON-LD reads the portal start dates (50-portal-data). Nothing else calls out at runtime.

## 7. Import / seed
- The media import writes `media.legacyPath`. `scripts/import/steps/documents.ts` creates one `documents` row per PDF and skips the alias names.
- No import step writes course or post `meta`, so their titles and descriptions fall back to `title` and `excerpt`.

**Parity crawl:** `scripts/parity/crawl.ts`, run as `npm run parity -- --site=ihm [--limit=N] [--only=<substring>] [--refresh]`. `--site` accepts only `ihm`.
- **Inputs:**
  - Files: `../inventory/v2/ihm/landing-pages.csv` (carries the expectations), `../inventory/v2/ihm/pages.csv` and `../inventory/ihm-urls.csv`.
  - Each path is deduplicated without its trailing slash, and the query is dropped.
  - Skipped: other hosts; thanks, handler and `.php` paths; `_bkp`, `application_form`, `/pay/return`, `/api/`; `backup-file-exposed` rows.
  - It does not read `src/content/redirects.ts`. A 301 target is the landing row's `redirects_to`.
- **Live side** (`https://ihm.edu.au`):
  - GET only, one request every 340 ms, User-Agent `Mozilla/5.0 (parity check)`.
  - Follows up to 4 redirects, and retries once after 15 s on 429/503.
  - Responses are cached in `scripts/parity/out/cache-live.json`; `--refresh` fetches them again.
- **New side** (`http://localhost:3000`): follows up to 5 redirects, 4 requests at a time, 20 s timeout.
- **Expectations:**

| Source row | Expected on the new site |
|---|---|
| Landing `gone` | 404 |
| Landing `live` with `recommendation=redirect` | 301 or 308 to `redirects_to` |
| Other landing `live` | 200 |
| Landing `redirected` | A redirect to the same final URL as live |
| `pages.csv` row that is not `sitemap-only` | 200 |
| `sitemap-only` and `ihm-urls.csv`-only rows | The live outcome |

  A trailing-slash hop counts as the same outcome. A live 5xx sets no expectation (`LIVE_5XX`, DEC-40). A path that is a key of `DOCUMENT_ALIASES` answers 200 by design: a new-site 200 there is `OK` with `exp=alias200` and note `DOCUMENT_ALIAS`, whatever the landing row recommends. It equals a live 200, and where live 404s or redirects it is a deliberate replacement, like the DEC-17 redirects. Titles are compared without the brand suffix, and a live H1 that is the site name is ignored (DEC-38).
- **Output:** `scripts/parity/out/parity-ihm.csv` with the columns `url,category,live_status,new_status,live_final,new_final,title_match,h1_match,result,note`.
  - The status columns hold the first response code.
  - `result`: `OK|STATUS_DIFF|TITLE_DIFF|REDIRECT_DIFF|NEW_ERROR`.
  - `note` flags include `H1_DIFF`, `CANONICAL_DIFF`, `LIVE_NO_TITLE`, `LIVE_H1_IS_LOGO`, `LIVE_5XX`, `LIVE_NOT_200`, `LIVE_ERROR` and `NEW_ERROR`.
- **Summary:** `scripts/parity/out/parity-ihm.summary.json` holds `results`, `by_category` and `gate` (`expected_live_status_diff`, `gone_not_404`, `redirect_diff`, `new_error`).
- **Gate:** every `gate` counter is 0. `TITLE_DIFF` is report-only.

## 8. Acceptance checks
1. `curl -sI localhost:3000/about-us` → 308, `Location: /about-us/`.
2. `curl -sI localhost:3000/learning-hub/` → 301 `/`. `/emergency-services/` → 301 `/external-services/`. `/IHM_CourseGuide/` → 301 `/pdf/IHM_Course_Guide.pdf`.
3. `/enquirenow/gcc/` → 302 `/courses/`. `/enquirenow/scholarship/` is not redirected.
4. `/wp-json/` and `/wp-login.php` → 410.
5. `tests/collections/courses.test.ts`:
   - Changing the slug of a published course is refused.
   - `context.allowUrlChange` and `context.importing` bypass the refusal.
   - A duplicate slug is rejected.
6. `tests/seo/metadata.test.ts`: fallbacks, canonical without query, OG image order, `noindex` rules, `NEXT_PUBLIC_ROBOTS=noindex`.
7. `tests/seo/jsonld.test.ts`: Course, BlogPosting/NewsArticle, BreadcrumbList, Organization + WebSite, FAQPage, `<` escaped, no empty tag.
8. `tests/seo/sitemap.test.ts`: sitemap entries and exclusions, XML shape, robots for production and staging. `tests/seo/route-metadata.test.ts`: landing `noindex: false` is indexable, course and post metadata honour `seo.noindex`, `seo.canonical` and `NEXT_PUBLIC_ROBOTS=noindex`, one title suffix, `/payment-options/` out of the sitemap, the application embed host is allowlisted, Course JSON-LD reads start dates only when `showStartDates` is true.
9. `tests/legacy-media/legacy-media.test.ts`: `legacyPathOf`, look-alike candidates, resolution.
10. Documents:
    - `tests/seo/document-urls.test.ts` and `tests/collections/documents.test.ts` pass.
    - Against a running server, `npx tsx scripts/dev/check-document-links.ts [--base=<url>] [--all]` exits 0.
11. With `NEXT_PUBLIC_ROBOTS=noindex`, `/robots.txt` is `User-agent: *` / `Disallow: /`.
12. `npm run parity -- --site=ihm`: every counter in `parity-ihm.summary.json` `gate` is 0.

## 9. IHNA differences
IHNA is not built. The redirects, registries and parity crawler cover IHM only.

## 10. Open questions
1. `/chat.php` is a live LiveChat iframe page (`landing-pages.csv`, `needs-decision`). It has no route, so it 404s, and the crawler skips `.php` paths.
2. `/IHM_Domestic_SHB/Domestic-SHB.pdf` is `live` with `recommendation=redirect` in `landing-pages.csv`, but the code serves it with 200 through `DOCUMENT_ALIASES`, and the crawler accepts that (`DOCUMENT_ALIAS`). Confirm that 200 is wanted rather than a redirect to `/IHM_Domestic_SHB/IHM_Domestic_SHB.pdf`.
3. Course and post SEO titles and descriptions from WordPress postmeta need the WP database dump. No step exists.
4. `/school-of-social-work/` is linked from `src/content/nav.ts` and `/site-map/` but has no route (DEC-36).
5. The live server and CDN rewrite rules (`.htaccess`, nginx) are not available, so URLs answered only by them are unknown.
