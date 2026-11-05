# 80 — Tracking, chat and conversion events (ihm-web)

## 1. Purpose
Load the site's third-party tags (GTM, Microsoft Clarity, HubSpot tracking, Airgentic chat) from ids in code, behind one gate and one env switch, and provide typed, PII-free `dataLayer` event builders. Every thank-you and receipt URL is a real page; reached by client navigation it is reported as `page_view_virtual`.

## 2. Data model
`site.tracking` in `src/content/site.ts` (plain data, edited by a developer, shipped by a deploy):
`{ gtmId: null, clarityId: null, hubspotPortalId: null, hubspotRegion: 'na1', airgenticId: null }`.
`buildTrackingConfig` (`src/components/tracking/config.ts`) also accepts optional `airgenticServiceId`, `gtmOverrides[] {pathPrefix, containerId}` and `exclusions[] {tool, pathPrefix}`. An empty or invalid id falls back to `TRACKING_DEFAULTS` (`src/components/tracking/defaults.ts`); a missing array uses the default array, a present array replaces it. Ids must match `^[A-Za-z0-9_-]{1,40}$`; prefixes must start with `/` (a trailing `/` is added); `tool` ∈ `gtm | clarity | hubspot | airgentic`.

Values that load today (all from `TRACKING_DEFAULTS`, since `site.tracking` is empty):

| Setting | Value |
|---|---|
| `gtmId` | `GTM-KXFBMHL` |
| `gtmOverrides` | `/enquirenow/scholarship/` → `GTM-5CQFHKD` (replaces the main container there) |
| `clarityId` | `9q34oifeju` |
| HubSpot | portal `39853473`, region `na1` |
| Airgentic | account `ihm`, service `website` |
| `exclusions` | `hubspot`, `clarity`, `airgentic` off under `/school-of-american-education/` (no page exists under that prefix) |

All ids are public. `enquiries.hutk` (text) is defined in `src/collections/Enquiries.ts` (40-enquiries).

## 3. Admin capabilities
None. A developer edits `src/content/site.ts` (or `defaults.ts`) and deploys.

## 4. Front-end behaviour
`Tracking` (`src/components/tracking/Tracking.tsx`, server component) renders once at the top of `<body>` in `src/app/(site)/layout.tsx`. It calls `buildTrackingConfig(site.tracking, env.TRACKING_ENABLED === '1')` and passes the result to the client component `TrackingScripts`, which picks tags for `usePathname()` with `activeTags` (longest override prefix wins; exclusions switch a tool off). With `TRACKING_ENABLED` off, `activeTags` returns nothing and no third-party script loads. `/admin` uses a different layout and loads no tags.

- **GTM:** `<GoogleTagManager gtmId>` from `@next/third-parties/google`, plus a `<noscript>` iframe to `www.googletagmanager.com/ns.html`. GA4, Ads and any other marketing tags live inside the container; the code calls no `gtag()`.
- **Clarity:** inline `next/script` `id="clarity-script"`, `afterInteractive`, standard loader for `https://www.clarity.ms/tag/<id>`.
- **HubSpot:** `next/script` `id="hs-script-loader"`, `https://js.hs-scripts.com/<portalId>.js` (`js-eu1.` for region `eu1`), `lazyOnload`.
- **Airgentic:** `next/script` `id="airgentic-script"`, `https://chat.airgentic.com/_js/airgentic-1.4.js` with `data-account-id` / `data-service-id`, `lazyOnload`.
- **Client navigation:** `TrackingScripts` pushes `{event: 'page_view_virtual', page_path, page_title}` on every route change after the first load, whether or not tags are enabled. Enquiry and pay forms navigate to a local thank-you/result path with `router.push` (client navigation, so it is reported as `page_view_virtual`) and to an absolute URL with `window.location.assign`; the SecurePay and Airwallex components use `window.location.assign`.

**`dataLayer` builders** (`src/components/tracking/datalayer.ts`). Every builder and `pushDataLayer` run `assertNoPii`, which throws on PII-shaped keys (name, email, phone, message, address, dob, …) at any depth and on email-like values; empty fields are dropped.

| Builder | Event | Fields |
|---|---|---|
| `generateLead` | `generate_lead` | `form_key`, `campaign`, `course_code`, `campus`, `student_type`, `enquiry_ref` |
| `brochureDownload` | `brochure_download` | `form_key`, `course_code` |
| `eventRegistration` | `event_registration` | `event_slug` |
| `thankYouView` | `thank_you_view` | `page_path` |
| `pageViewVirtual` | `page_view_virtual` | `page_path`, `page_title` |
| `purchase` | `purchase` | `transaction_id`, `value`, `currency: 'AUD'`, `payment_type`, `items[] {item_id, item_name, price}` |

Helpers: `pushOnce(key, event)` (one push per key per tab via `sessionStorage`), `storeEnquiry` / `takeEnquiry` (`sessionStorage` key `ihm:enquiry`, read-and-clear). `src/components/tracking/ConversionEvents.tsx` exports `ThankYouEvent` (pushes `generate_lead` / `brochure_download` from a stored enquiry, else `thank_you_view`; `event_registration` for events) and `PurchaseEvent` (one `purchase` per transaction).

Where events are pushed:
- **Enquiry forms** (`EnquiryFormClient`): on a successful submit, before navigating, `pushOnce('lead:<submissionId>', leadEventFor(...))`: `brochure_download` for a brochure form (`thankYouType` `brochure`), else `generate_lead` with the form key, the campaign code, the course and campus ids, `studentType` and `enquiry_ref` = the response's `enquiryId` (the row's `publicId`). The push happens whatever the target (thank-you page, brochure file, WhatsApp, inline) and a tracking error never blocks the redirect. No form calls `storeEnquiry`.
- **Landing thank-you pages** (`src/components/templates/landing/ThankYou.tsx`) render `<ThankYouEvent />`, which pushes `thank_you_view` (nothing is stored). `/thanks/` and `/thanks-events/` do not render it; they are reported by the page view (first load) or `page_view_virtual`.
- **Paid result page** (`/pay/result/[uuid]/`, where every gateway return lands with a 303) renders `PurchaseEvent` from `purchaseEventFor` (`src/lib/payments/handlers.ts`): `transaction_id` = payment uuid, `value` = the stored amount, `payment_type` = gateway, one item whose id is the payment kind and whose name is the product name for products, else the kind (an invoice's typed "payment for" text is never sent). Nothing is pushed for any other status.

**`hutk` handoff** (DEC-13). `EnquiryFormClient` sends the `hubspotutk` cookie value as `hutk` in the `POST /api/enquire/` body; `src/lib/enquiries/process.ts` falls back to the request's `hubspotutk` cookie (`hutkFromCookie`, alphanumeric, ≤ 64 chars). The value is always stored on `enquiries.hutk`. The HubSpot adapter (`src/lib/adapters/hubspot.ts`) sends it only as `context.hutk` on a Forms API v3 submit, which happens only when `HUBSPOT_FORM_GUID` is set; the Contacts upsert never carries it. `src/components/tracking/hutk.ts` (`readHutk`) parses the cookie but is used only by tests.

**CSP** (`src/lib/seo/csp.ts`, applied by `src/proxy.ts`). Enforced: `object-src 'none'; base-uri 'self'; frame-ancestors 'self'`. Everything else is `Content-Security-Policy-Report-Only` (report-uri `/api/csp-report`), because GTM custom-HTML tags can inject any host. Inline loaders are allowed by `'unsafe-inline'` (no nonces).
- `SCRIPT_HOSTS`: `www.googletagmanager.com`, `*.google-analytics.com`, `www.googleadservices.com`, `googleads.g.doubleclick.net`, `js.hs-scripts.com`, `js.hs-analytics.net`, `js.hs-banner.com`, `js.hscollectedforms.net`, `js.usemessages.com`, `www.clarity.ms`, `chat.airgentic.com`, `www.google.com/recaptcha/`, `www.gstatic.com`
- `CONNECT_HOSTS`: `*.google-analytics.com`, `*.analytics.google.com`, `*.hubspot.com`, `*.hsforms.com`, `*.clarity.ms`, `chat.airgentic.com`
- `FRAME_HOSTS`: `www.googletagmanager.com`, `chat.airgentic.com`, `www.google.com`, `www.youtube-nocookie.com`, `www.youtube.com`, `player.vimeo.com`, `healthcareers.elmotalent.com.au`, `superform.spot-nik.com`, plus `site.allowedEmbedHosts`
- img-src adds `i.ytimg.com`, `www.googletagmanager.com`, `*.google-analytics.com`, `*.clarity.ms`, `*.hubspot.com`, `googleads.g.doubleclick.net`. Payment gateway hosts are in 45-payments.

**Consent:** no consent banner or Consent Mode. `Tracking.tsx` is the single place to add one.

## 5. URLs
None of its own. Thank-you pages (`/thanks/`, `/thanks-events/`, `/enquirenow/scholarship/…`, landing-page thank-you paths) and `/pay/receipt/[uuid]` are owned by 40-enquiries and 45-payments.

## 6. Integrations
- External: GTM (GA4 and Ads inside it), Clarity, HubSpot NA1, Airgentic. reCAPTCHA belongs to 40-enquiries.
- Env: `TRACKING_ENABLED` (`0 | 1`, default `0`, set `1` in production only). `0` = no third-party tag loads; `dataLayer` pushes still happen.
- `HUBSPOT_FORM_GUID` (with `HUBSPOT_PORTAL_ID`) controls whether `hutk` is sent (40-enquiries).

## 7. Import / seed
None.

## 8. Acceptance checks
1. `tests/seo/tracking.test.ts` (`npm run test:int`): default tags everywhere; `/enquirenow/scholarship/` swaps to `GTM-5CQFHKD`; `/school-of-american-education/…` loads GTM only; nothing loads with tracking off; malformed ids, prefixes and tools are ignored; EU1 HubSpot URL; builders carry only opaque fields; `purchase` uses AUD and the GA4 item shape; PII keys and email-like values are rejected; `readHutk`; CSP frame-src and admin policy.
2. `tests/enquiries/adapters.test.ts`: the Forms API request carries `hutk` only when `HUBSPOT_FORM_GUID` is set; the Contacts request never contains it.
3. `tests/enquiries/lead-event.test.ts` (`leadEventFor`: opaque fields, `enquiry_ref` = `enquiryId`, brochure forms), `tests/payments/purchase-event.test.ts` (`purchaseEventFor`: paid only, no invoice text).
4. With `TRACKING_ENABLED=1`, `curl -s http://localhost:3000/ | grep -c 'ns.html?id=GTM-KXFBMHL'` is ≥ 1 (server-rendered noscript iframe); with it unset, 0.

## 9. IHNA differences
ihna-web carries its own `defaults.ts`. Its ids: GTM `GTM-M2PBNS` (overrides `GTM-KC4DVMW` on the Perth fee-free domestic landing pages, `GTM-K3TPCL` on one international thank-you page); HubSpot EU1 portal `26193905`, excluded on the pay-online and Airwallex pages; Clarity `9pyrntuztg`. IHNA also runs LiveChat (licence 12907932) and four Meta pixels, which need tag types and CSP hosts (`js-eu1.hs-scripts.com`, `connect.facebook.net`, `www.facebook.com`) that this module does not have.

## 10. Open questions
1. GTM container exports: triggers bound to old DOM selectors or form ids may not fire on the new markup. Who owns the containers?
2. GTM conversion tags that fire on a thank-you URL page view must also listen to `page_view_virtual` (client navigation) or switch to the `generate_lead` / `purchase` events.
3. Will marketing create a HubSpot form so `HUBSPOT_FORM_GUID` can be set (DEC-13)?
4. Consent for IHM (Australian Privacy Act): Consent Mode v2 defaults, a CMP, or none?
5. Is the Airgentic account (`ihm`) still contracted?
