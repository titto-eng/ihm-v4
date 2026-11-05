# 20 — Blocks: configs, renderers, registry

## 1. Purpose
Every layout block: Payload config, React renderer, registry. Blocks are how structured content reaches a page (AGENTS rule 5). Two sources render through the same components: block JSON stored in the CMS (`courses.sections[].layout`, the `courseShared` global) and the hardcoded route files, which use the authoring kit `src/components/page/`. A block looks and behaves the same from either source.
`Section`, `Prose`, tokens, templates, `CourseFacts`: `05-design-system.md`; collections: `10-content-model.md`.

## 2. Data model

**Files.** `src/blocks/<slug>/config.ts` (Payload `Block`), `src/blocks/<slug>/Component.tsx` (server component; client parts in `*Client.tsx`, `VideoPlayer.tsx`, `BrochureDialog.tsx`), `src/blocks/fields.ts` (builders `heading`, `media`, `textList`, `links`, `variant`), `src/blocks/sectionFields.ts` (`tone`, `spacing`, `anchorId` on every block), `src/blocks/nested.ts` (child slug lists), `src/blocks/embeds.ts` (pure URL validators), `src/blocks/defaults.ts` (one default per slug), `src/blocks/types.ts` (`BlockCtx`, `BlockProps`), `src/blocks/index.ts` (registry).

**Config rules.** ≤40 non-empty lines; `interfaceName: '<Name>Block'`; no Local API, `@/lib/portal` or `mysql2` (enforced by `scripts/check-blocks.ts`). Slugs are stored in the JSON (`blocksAsJSON: true`), so renaming one needs a data script.

**Renderer contract.** Every component takes `{ block, ctx }` with `ctx: BlockCtx = { depth, audience?, course? }` and wraps itself in `Section` (tone/spacing/anchor from the block; nested blocks get no background or container).

**Hosts.** `courses.sections[].layout` (one section per slot) and `courseShared.layout`, both `layoutField()` (`src/collections/shared/fields.ts`): a `blocks` field with `blockReferences` to every registered slug. Posts are Lexical rich text only.

### Generic blocks
`*` = required. `links` = array of {label*, href*, style: primary | secondary | link}. Every block also has `tone`, `spacing`, `anchorId`.

| Slug | Fields | Variants | Notes |
|---|---|---|---|
| `hero` | eyebrow, heading* (`*phrase*` = italic accent), subheading, image, imageCaption, audienceSwitch, ctas: links ≤2 | split / full / compact | renders the page h1; split shows the ECG line and the sunrise-glow image frame; full with image = ink overlay; `HeroContent` is the split / compact body without the section, used per slide by `HeroCarousel` (05 §4.6) |
| `richText` | content*: richText, width | prose / wide | `Prose` |
| `imageText` | eyebrow, heading, media*: upload, imageCaption, content*: richText, imageSide (left/right), chips: text list, ctas: links ≤2 | — | |
| `stats` | heading, items 2–6 (value*, label*, note) | — | `dl`, 2 columns → up to 6 |
| `cardGrid` | heading, intro, columns (2/3/4, default 3), cards (image, badge, title*, body, href) | grid / carousel | `href` makes the whole card a link |
| `accordion` | heading, intro, items (title*, blocks) | faq / plain | `faq` emits FAQPage JSON-LD from the item text |
| `tabs` | tabs ≥2 (label*, anchorId, blocks) | underline / pill | opens the tab whose `anchorId` matches `location.hash` (old `#tab` links) |
| `table` | caption, headerRow (default true), rows*: json `string[][]` | striped / plain | horizontal scroll wrapper |
| `cta` | heading, body, links ≤2 | centered / banner / inline | |
| `testimonials` | heading, inline (quote (required unless the item has a video), name*, role, photo, videoUrl (YouTube / Vimeo, validated)) | **carousel** (default) / grid / single | carousel = `CardCarousel`, 1 → 2 (md) → 3 (lg) cards per view, so the section height does not depend on the item count; an item with `videoUrl` is a video card: the `VideoPlayer` facade (photo as poster, no third-party request until play) plays inline inside the card; quotes over 280 characters show seven lines and a Read more toggle in carousel and grid cards; templates map `testimonials` docs (with their `videoUrl`) into `inline`; `groupVideoRuns` (`testimonials/video.ts`) turns two or more consecutive `videoEmbed` blocks into one carousel, used by `CourseDetail` on every section layout |
| `logoStrip` | heading, logos (logo*, alt*, href) | — | |
| `videoEmbed` | url* (YouTube/Vimeo, validated), title*, poster | inline / lightbox | poster facade, iframe only after play; lightbox = dialog; `VideoPlayer` takes `compact` (smaller play button, no title pill: the testimonial card) and `sizes` |
| `iframeEmbed` | url* (https), title*, height (200–2000 px; empty = 16:9) | — | host allowlist below |
| `mapEmbed` | embedUrl* (`https://www.google.com/maps/embed…` only), caption | — | |
| `teamGrid` | heading, members (photo, name*, role, bio) | grid / carousel | bio opens a dialog |
| `gallery` | heading, images: upload hasMany | grid / carousel | lightbox dialog with prev/next |
| `steps` | heading, intro, steps (label, value, title*, body) | numbered / timeline | timeline = BON 03 rising arc (label + big value) |
| `enquiryForm` | formKey*, heading | card / inline / sidebar | default tone muted, default anchor `quickContact` |

### BON blocks
| Slug | BON section | Fields |
|---|---|---|
| `pathways` | 01 "Three ways in" (always ink; A/B/C cards act as tabs) | eyebrow, heading, intro, paths 2–4 (label*, title*, tagline, structure, body, suits, advantages: text list, progression, notice, ctas) |
| `curriculum` | 04 year tabs, semesters in 2 columns | eyebrow, heading, years ≥1 (label*, units (semester, code, title*, credit, kind: core/elective/placement)) |
| `admissionsPanel` | 05 admissions (default tone card) | eyebrow, heading, domestic: richText, international: richText, cards ≤6 (audience: both/domestic/international, label*, value, body), steps: text list, links ≤3 |

`admissionsPanel` renders both audience versions on the server inside `AudienceOnly`; CSS from the `AudienceProvider` hides the inactive one (`05-design-system.md` §4.3).

### Course data blocks
They read the course from `ctx.course` (`courseOf`, `src/components/templates/courseContext.ts`); with no course they render nothing and warn once in dev. Each also returns nothing when it has no data.

| Slug | Extra fields | Source and behaviour |
|---|---|---|
| `courseFacts` | show: select hasMany (`FACT_KEYS`) | Thin wrapper around `<CourseFacts>` (`src/components/course/CourseFacts.tsx`): passes the course, `ctx.audience` and `show` (narrows the facts). Reads the course doc only. Default spacing compact. |
| `startDates` | mode: all / f2f / online / blended | Only when `courses.showStartDates` is true (DEC-7) and the course has `khId`; portal `getStartDates`; per-campus date pills, both audiences behind `AudienceOnly` for `both` courses. |
| `censusDates` | note | Portal `getCensusDates` by `khId`; table Intake / Start / End / Census / Orientation. The CourseDetail default (DEC-7). |
| `feesTable` | (section fields only) | Shows `courses.fees.displayAmount` and `fees.note` (default tone sunrise). IHM's imported fee tables stay `table` blocks in the `fees` slot (DEC-15e). |
| `intakeCalendar` | months (1–24, default 12) | Portal `getIntakeCalendar` per month (filtered by the course's student type when a course is in context); lists only khIds that have a published course; month cards linking to the course. |
| `relatedCourses` | limit (1–12, default 6) | `courses.relatedCourses`, else published, indexable courses of the same school; carousel of cards; cached 300 s, tags `course:<slug>`, `collection:courses`. |
| `brochureDownload` | label | Needs a course brochure (`hasBrochure`: `courses.brochure`, else the legacy `brochureUrl`; DEC-69); button opens a dialog with the `course-brochure` enquiry form, whose thank-you is the brochure URL (`brochureHrefFor`, `src/lib/courses/brochure.ts`). |
| `courseManagers` | heading (default "Course managers") | Published `staff` whose `courses` contains the course (DEC-60); team grid without emails; cached 300 s, tags `collection:staff`, `collection:media`, `collection:courses`. |

Portal reads go through `src/lib/portal/cache.ts`: `unstable_cache` tagged `portal` and `portal:<khId>` (calendar `portal:calendar`), 900 s; a failure is negative-cached for 60 s and, with nothing cached, returns `{ unavailable: true }`, which the date blocks render as `PortalNotice` ("Dates coming soon — enquire…"). With `PORTAL_ENABLED=0` no portal read opens a connection (`50-portal-data.md`). Payload is imported lazily inside the components that query it.

### Nesting (`nested.ts`, DEC-6)
All blocks are defined once at config level (`payload.config.ts` `blocks: blockConfigs`); `layout` fields and the `tabs`/`accordion` child fields reference them by slug with `blockReferences`.
- `accordion` children: `richText`, `imageText`, `table`, `videoEmbed`, `iframeEmbed`, `mapEmbed`, `cta`, `cardGrid`, `steps` and the 8 course data blocks.
- `tabs` children: the accordion list plus `accordion`, `stats`, `testimonials`, `logoStrip`, `teamGrid`, `gallery`, `pathways`, `curriculum`, `admissionsPanel`, `enquiryForm` (every block except `hero` and `tabs`).
- `RenderBlocks` skips any block list at `ctx.depth` > 3 (`MAX_DEPTH`, dev warning). `tabs` and `accordion` render children at `depth + 1`. CourseDetail renders section layouts at depth 1, so the deepest content the model produces, a leaf in tabs > accordion inside a course section, is at depth 3 (DEC-15).

### Registry (`src/blocks/index.ts`) and `RenderBlocks`
`configs` maps slug → config; `blockConfigs: Block[]` feeds `payload.config.ts`; `blockComponents: Record<BlockSlug, Loader>` lazily imports each component, typed so a config without a component fails `tsc`. `src/components/RenderBlocks.tsx` (async server component) maps `blockType` to its component and renders them in order; an unknown slug is skipped with one `console.warn` per slug outside production.

### Embeds (`embeds.ts`, DEC-5, DEC-29)
- `videoEmbed`: `parseVideoUrl` accepts YouTube (`youtube.com`, `www.`, `m.`, `youtube-nocookie.com`, `www.youtube-nocookie.com`, `youtu.be`; watch, embed, shorts, live) and Vimeo (`vimeo.com`, `player.vimeo.com`) and extracts the id; `videoSrc` builds `https://www.youtube-nocookie.com/embed/<id>` or `https://player.vimeo.com/video/<id>` itself, never from the stored URL.
- `iframeEmbed`: `hostAllowed(url, site.allowedEmbedHosts)` accepts https URLs whose host is in `BUILTIN_EMBED_HOSTS` (`www.youtube-nocookie.com`, `www.youtube.com`, `player.vimeo.com`), in `site.allowedEmbedHosts` (`src/content/site.ts`: `my.matterport.com`, `forms.monday.com`, `portal.ihm.edu.au`, `student.ihm.edu.au`, `superform.spot-nik.com`), or a Google Maps embed. The field validator checks https only; the host check runs at save in the `courses` `beforeValidate` hook `validateEmbedHosts` (`src/collections/shared/hooks.ts`, walks nested blocks) and again in the renderer, which renders nothing (dev warning) for a disallowed host.
- `mapEmbed`: `isMapEmbedUrl` = https, host `www.google.com`, path `/maps/embed…`, at save and render.
- Both render a lazy `<iframe>` with `title` and `referrerPolicy="strict-origin-when-cross-origin"`. CSP `frame-src` includes `site.allowedEmbedHosts` (`src/lib/seo/csp.ts`, `90-security.md`).

### EnquiryForm (DEC-4)
`formKey` names one of the 25 definitions in `src/content/forms.ts` (`40-enquiries.md`); the block stores no fields and no thank-you path. The server component loads the definition (`getFormView`) and renders nothing for an unknown or inactive key. The client form (react-hook-form + zod) posts JSON to `/api/enquire/`: `formKey`, `submissionId` (UUID created on mount), `fields`, attribution (`campaign`, UTM and click ids from the URL, else the `ihm_attr`/`ihm_attr_first` cookies), `hutk`, `pageUrl`, `referrer`, `landingPath`, honeypot `_hp_url`, and a reCAPTCHA v3 token when the definition has `captcha` and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set. The course field is preset from `ctx.course` (or `?course=<id>`); hidden fields fill from URL params. On success it navigates to the server-computed `thankYouPath` (a site path, or an `https://api.whatsapp.com/send?` link), else shows an inline thank-you; field errors (400) mark the fields; other errors show an inline message and do not navigate. The site-wide `EnquiryDialog` (`src/components/forms/`, keys `admission-popup`, `mon-popup`, `nclex-magnet`, `whatsapp`) renders the same form in a dialog.

### Rich text
`richText`, `imageText` and `admissionsPanel` rich text render through `Prose` (`src/components/layout/Prose.tsx`): `@payloadcms/richtext-lexical/react` with custom converters (h1 → h2, internal links → `docHref`, external links `rel="noopener noreferrer"`, upload → `MediaImage` or a download link). No raw-HTML converter. The editor is `lexicalEditor()` with its default features (`payload.config.ts`).

### JSON-LD
`accordion` (faq) and the kit `Accordion` emit FAQPage JSON-LD through `safeJsonLd` (`src/components/blocks/lexicalText.ts`), the only permitted `dangerouslySetInnerHTML` outside the Lexical renderer (DEC-26).

### Authoring kit (`src/components/page/`)
For hardcoded pages (`index.ts` re-exports everything).
- `blocks.tsx` wraps each block as a component taking the block's fields as props plus `depth`: `Hero`, `Cta`, `CardGrid`, `Table`, `VideoEmbed`, `IframeEmbed`, `MapEmbed`, `Stats`, `Steps`, `Testimonials`, `LogoStrip`, `Gallery`, `TeamGrid`, `Pathways`, `Curriculum`, `AdmissionsPanel`, `EnquiryForm`, and the course data blocks `CourseFacts`, `StartDates`, `CensusDates`, `FeesTable`, `IntakeCalendar`, `RelatedCourses`, `BrochureDownload`, `CourseManagers`. Each renders through `RenderBlocks` with `ctx = { depth }` and no course, so the course data wrappers render nothing on a hand-written page except `IntakeCalendar`; for key facts on a hand-written course page, import `CourseFacts` from `@/components/course/CourseFacts` and pass the course doc.
- JSX-children helpers: `Rich` (JSX children styled with `proseClassName`; `width` prose/wide), `Pic` (image in `Rich`, or a download link), `Tabs` (`tabs: {label, anchorId, content}[]`), `Accordion` (`items: {title, content, text}[]`; FAQPage JSON-LD from `text` unless `variant="plain"`), `ImageText` (children replace the Lexical `content`), `EmptyNotice`; re-exports `Link` and `Prose`.
- `img.ts`: `img({src, alt, width, height, mimeType, focal, sizes})` builds the `Media`-shaped object a block's upload field expects.
- `metadata.ts`: `pageMetadata({title, path, metaTitle, description, noindex, canonical, image})` (`70-urls-seo.md`).
- Nested kit components take an explicit `depth` (e.g. `<Rich depth={1}>` inside a `Tabs` panel).

### Extractor output
The course importer (`scripts/import/html-to-blocks.ts`, `section-mapper.ts`, `lib/to-payload.ts`; `30-import.md`) emits `hero`, `richText`, `tabs`, `accordion`, `table`, `videoEmbed`, `imageText`, `cardGrid`, `testimonials` (inline), `enquiryForm`, `cta`, `iframeEmbed`, `mapEmbed`, and the shortcode replacements `censusDates`, `startDates` and `courseManagers`. All other blocks are placed by templates or marketing.

## 3. Admin capabilities
Marketing adds, reorders, duplicates and nests blocks in a course's section layouts and in `courseShared` (Settings → Shared course section, drafts + autosave, `marketing` role), picks variants, tone, spacing and anchors, and gives an `enquiryForm` one of the 25 form keys. Embeds take a URL only; no HTML, classes, colours or iframe code can be entered. Hardcoded pages are not edited in the admin.

## 4. Front-end behaviour
Templates call `RenderBlocks`; route files use the kit. Course pages are cached under `course:<slug>` / `collection:courses` and `courseShared` under `global:courseShared`, revalidated by the collection and global hooks; hardcoded pages change on deploy; portal data refreshes every 15 min. Tabs, accordion, dialogs and carousels are Radix/shadcn (keyboard + ARIA). Hero text uses `animate-rise`, off under `prefers-reduced-motion`.

## 5. URLs
Blocks serve no routes. Internal links are relative paths.

## 6. Integrations
YouTube/Vimeo, Google Maps and the hosts in `site.allowedEmbedHosts` (CSP `frame-src`); reCAPTCHA v3 (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`). Portal and enquiry env vars: `50-portal-data.md`, `40-enquiries.md`.

## 7. Import / seed
Course content arrives via `npm run import -- wp-courses` (`30-import.md`); identical fragments across every course would be hoisted into `courseShared` (none are, DEC-35). `staff.courses` for `courseManagers` is written by the `link-course-managers` import step (DEC-60). `defaults.ts` holds one default per slug for tests.

## 8. Acceptance checks
1. `npm run check:blocks` (`scripts/check-blocks.ts`): fails if any `src/blocks/*/config.ts` has more than 40 non-empty lines or matches `getPayload(`, `payload.find`, `.findByID(`, `mysql2` or an `@/lib/portal` import.
2. `npm run test:blocks` → `tests/blocks/render.test.tsx`: registry keys = `blockConfigs` slugs = `defaults` keys; every slug renders its default without throwing; `RenderBlocks` skips an unknown slug between two valid blocks with one warning and returns null at depth 4; `tests/blocks/nesting-depth.test.tsx`: tabs > accordion > richText at section depth 1 renders the leaf; the video src is built from the id (nocookie / Vimeo), Maps and `javascript:` URLs are rejected as video; `hostAllowed` / `isMapEmbedUrl` enforce the allowlists; `iframeEmbed` renders no iframe for a non-allowlisted host.
3. `npm run test:int` → `tests/import/embed-hosts.test.ts` (embeds found at any depth; the `courses` save hook rejects disallowed hosts), `tests/courses/blocks.test.ts` (censusDates, startDates DEC-7, courseFacts, feesTable), `tests/courses/course-facts.test.ts` (the `courseFacts` block wraps `<CourseFacts>` and honours `show` and `ctx.audience`), `tests/import/html-to-blocks.test.ts` and `tests/courses/section-mapper.test.ts` (extractor output and slot mapping).
4. `npm run typecheck` passes (a config without a component fails `tsc`).

## 9. IHNA differences
Same block files and IHNA palette. IHNA work is paused.

## 10. Open questions
None.
