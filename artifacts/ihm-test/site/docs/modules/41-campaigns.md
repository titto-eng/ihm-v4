# 41 · Campaigns (attribution codes)

## 1. Purpose
A campaign is a raw code carried by the visitor (`?campaign=`, a landing URL segment, a cookie or a promo-code field). A well-formed code is stored as received on the enquiry (`campaignCode`) and shown to staff; nothing is looked up (DEC-62). Portal source ids and HubSpot `campaign_source` come from the form definition, never from the code. UTM and click ids are stored alongside.

## 2. Data model
- **Code format:** `^[A-Za-z0-9_-]{2,64}$` (`CODE_PATTERN` in `src/lib/enquiries/request.ts`), case-sensitive. Anything else is ignored: never stored, never reflected.
- **On `enquiries`** (40 §2): `campaignCode` (indexed), the `utm` group (`utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `referrer`, `landingPath`) and `hutk`.
- **Source settings** (code): per form `fixedSourceId`, `defaultSourceId`, `hubspotCampaignSourceDefault` in `destinations[].config` of `src/content/forms.ts`; site default `defaultSourceId: 24` in `src/content/enquiry-routing.ts`.
- `resolveCampaign` returns `{ campaignCode }`; `resolveSourceId(config, routing)` reads only the form and the site default. The adapter input still has a `campaign` field (`src/lib/adapters/types.ts`, `CampaignLite` in `src/lib/enquiries/lookups.ts`), always `null`; the HubSpot, admissions API and Dynamics adapters do not read it.

## 3. Admin capabilities
No campaign records to manage. Marketing finds enquiries by code with the `enquiries` list search or a `campaignCode` filter (40 §3). Any well-formed code works in an ad link (`/lp/<page>/?campaign=<code>` or `/lp/<page>/<code>/`) with no setup. Changing a form's portal source id is a code edit in `src/content/forms.ts`.

## 4. Front-end behaviour
**Cookie `ihm_attr`.** Only `CampaignCookie` (`src/components/templates/landing/CampaignCookie.tsx`, rendered by `/lp/<slug>/<code>/`) writes it: JSON with `campaign` set to the code, merged into any existing value, `Path=/`, 90 days, `SameSite=Lax`, `Secure` on https. No code writes `ihm_attr_first` or stores UTMs in a cookie; both cookies are still read if present.

**Client.** `EnquiryFormClient` sends `campaign`, `utm_*` and the click ids from the current URL first, then `ihm_attr`, then `ihm_attr_first`, plus `hutk` from the `hubspotutk` cookie, `referrer` and `landingPath`.

**Server** (`src/lib/enquiries/campaign.ts`, at insert):
- Code: the first well-formed value of the form's `promoCode` field (only `quick-enquiry` has one), body `campaign`, `ihm_attr.campaign`, `ihm_attr_first.campaign`.
- UTM and click ids: body values over the `ihm_attr` cookie values.
- Portal `enquirySourceId` (`resolveSourceId`, at delivery), first match: the form's `fixedSourceId` (blog-enquiry 544, mon-popup 544, nclex-magnet 710, english-scholarship 667, whatsapp 100, admission-popup 1), then its `defaultSourceId` (quick-enquiry 1), then 24. The code never changes it.

## 5. URLs
No routes of its own. `/lp/<slug>/<code>/` is served by 60 (canonical to the base page, noindex; malformed segment 404). Landing canonicals carry no query string. The landing thank-you keeps `?campaign=<code>`; `quick-enquiry` sends it as `campaign_id` on `/thanks/`.

## 6. Integrations
- **Portal CRM:** `enquirySourceId` as above, `campaignId=1`; the code itself is not sent.
- **Staff email:** a "Campaign code" row plus the UTM, gclid and fbclid rows.
- **HubSpot `campaign_source`:** always the form's `hubspotCampaignSourceDefault` ("IHM website" when unset), so every HubSpot delivery records `hsSourceFallback = true`.
- **Admissions API:** `utm_*` and `page_url`; `heard_about` is `BON <City> - Google Ads` from the campus.
- **Dynamics:** no campaign bind (no GUID per code). Off on IHM.

## 7. Import / seed
None. `scripts/import/out/ihm-campaigns.report.json` lists the codes and source ids recovered from the old site for reference; nothing reads it.

## 8. Acceptance checks
1. `tests/enquiries/enquire.test.ts` ("campaign resolution", "source id"): body code beats the cookie; an unknown well-formed code is stored raw; a malformed one is ignored; codes are case-sensitive; `promoCode` `MMF` on `quick-enquiry` is stored as the code; fixed source beats the default, default 24.
2. `tests/enquiries/e2e/all-keys.e2e.spec.ts` (newsletter): the HubSpot dry-run record carries the form default `campaign_source` ("IHM Newsletter").
3. `tests/enquiries/e2e/admin-enquiries.e2e.spec.ts`: the list filters by `campaignCode`.
4. `tests/enquiries/thankyou-ratelimit.test.ts`: the landing thank-you keeps `?campaign=` (and adds `intent=brochure` for a brochure request).
5. `tests/enquiries/adapters.test.ts`: HubSpot uses the form default and records the fallback; Dynamics sends no campaign bind or `new_campaign`.

## 9. IHNA differences
Source ids and HubSpot defaults live in the site-specific `src/content/forms.ts`. The Dynamics adapter binds no campaign: that would need a per-code GUID table, which does not exist.

## 10. Open questions
1. Does marketing need per-code portal source ids or HubSpot `campaign_source` values? That would need a code table in `src/content/`.
2. Should UTMs and click ids persist across pages (a cookie writer for `ihm_attr`/`ihm_attr_first`)? Today they reach the enquiry only when the form is on the page whose URL carries them.
3. Should the portal CRM receive UTMs (it has no field; e.g. append to `description`)?
4. Cookie consent: is the 90-day `ihm_attr` cookie acceptable without a consent banner (90-security)?
