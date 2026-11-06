# 90 — Security

## 1. Purpose
Who may do what (access matrix, auth), what is reachable (admin guard, API, rate limits, headers, uploads), and what must never exist in the repo or a page (secrets, personal data, old HTML). Enforces AGENTS.md rules 2–6.

## 2. Data model
**Access helpers** (`src/lib/access.ts`):
- `isStaff(user)`: the user is a `users` doc, or a Local API user object with `roles`. Alumni are never staff.
- `hasRole`, `isAdmin`, `roles(...)` (admin plus the listed roles), `fieldRoles(...)` (the same check at field level).
- `anyone`, `denyAll`, `staffOnly`, `staffField`.
- `publishedOrStaff`: anyone else sees only `_status = published`.
- `activeOrStaff`: anyone else sees only `active = true`.
- `selfOrAdmin(collection)`: own doc only, except admin.

Payload's default access is "any logged-in user", which includes alumni, so every collection declares its operations explicitly.

**Staff roles:** `users.roles` (select, hasMany, `saveToJWT`): `admin`, `marketing`, `events`, `finance`, `viewer`; the default is `viewer`. Only admin can update the field.

**Matrix.** P = anonymous or alumni; C/R/U/D = create/read/update/delete; R* = published only; Ra = active only; – = denied. "Staff" means any role, `viewer` included.

| Collection | P | admin | marketing | events | finance | viewer |
|---|---|---|---|---|---|---|
| posts, staff, testimonials | R* | CRUD | CRU | R | R | R |
| courses | R* | CRUD | CRU (not `fees`, not the `facts.fee` text) | R | RU (`fees` and the `facts.fee`/`factsInternational.fee` value and detail only) | R |
| events | R* | CRUD | CRU | CRU | R | R |
| 7 lookups (levels, deliveryModes, durations, universities, campuses, disciplines, categories) | Ra | CRUD | CRU | R | R | R |
| products | Ra | CRUD | RU (not `priceCents`, `currency`, `studentDiscountPercent`) | R | CRU | R |
| media | R | CRUD | CRU | CRU | R | R |
| documents | R | CRUD | CRU (`publicPath` on create only) | R | R | R |
| global `courseShared` | R | RU | RU | R | R | R |
| enquiries | – | R | R | – | R | – |
| payments | – | R | – | – | R | – |
| users | – | CRUD | self RU | self RU | self RU | self RU |
| alumni | own doc RU (alumni) | CRUD | – | – | – | – |

**Rules the matrix does not show:**
- Nobody creates, updates or deletes `enquiries` or `payments` through access control (`denyAll`). The system writes them through the Local API with `overrideAccess`.
- `readVersions` is staff-only wherever drafts exist.
- Every content delete is admin-only.

**Field-level rules:**
- **Courses:** `lockFields` locks every `courses` field except `fees` to admin and marketing. `fees` and the fee fact text are admin and finance only.
- **Products:** `priceCents`, `currency` and `studentDiscountPercent` are admin and finance only.
- **Documents:** `publicPath` can be created by admin and marketing and updated by admin only. `notes` is readable by staff only.
- **Lookups:** `enquiryEmail` on lookups is admin and marketing only, read included.
- **Staff:** `staff.email` is readable by staff only.
- **Import fields:** the `import.*` system fields are admin only.
- **Alumni:** `legacyId` and `passwordSetAt` are admin only. An alumnus's own write drops `_verified` and restores `email`.

**Jobs:** `/api/payload-jobs/run` needs `Authorization: Bearer $CRON_SECRET` or an admin session (`src/jobs/index.ts`).

## 3. Admin capabilities
- Admin manages users and roles, unlocks accounts, and creates or deletes alumni.
- Admin and marketing release held enquiries and retry deliveries through `POST /api/enquire/release/` and `POST /api/enquire/retry/`. Both need a staff session with role admin or marketing (`src/lib/enquiries/adminRoute.ts`).
- Admin and finance re-queue a payment's dead fulfilment steps through `POST /api/payments/retry/` (`src/app/api/payments/retry/route.ts`, 45 §6); it needs a staff session with role admin or finance.
- Finance edits fees and prices.
- The embed allowlist is code (`site.allowedEmbedHosts` in `src/content/site.ts`), not an admin field.

## 4. Front-end behaviour
**Payload auth** (`src/collections/Users.ts`, `src/collections/Alumni.ts`):

| Setting | users | alumni |
|---|---|---|
| `tokenExpiration` | 8 h | 12 h |
| `maxLoginAttempts` / `lockTime` | 5 / 15 min | 5 / 15 min |
| `verify` | off | on (link to `/alumni/verify/?token=`) |
| `forgotPassword.expiration` | Payload default | 1 h (link to `/alumni/reset-password/?token=`) |
| cookies | `sameSite: 'Strict'`, `secure` in production | `sameSite: 'Lax'`, `secure` in production |
| `removeTokenFromResponses` | true | true |
| admin panel | yes (`admin.user: 'users'`) | no (`access.admin: () => false`) |

- **Alumni password policy** (`src/lib/alumni/password.ts`): 12–128 characters, not in the bundled common-password list, and not containing the email local part. It applies on `resetPassword` and on an alumnus's own update (`src/lib/alumni/hooks.ts`).
- **Account enumeration:** an alumni login with a wrong password and one with an unknown email get the same 401. Forgot-password answers the same 200 for an unknown email.
- **Alumni sign-up:** there is no self-registration. `/alumni/register/` carries the `alumni-signup` enquiry form (DEC-47).

**`/admin` guard** (`src/proxy.ts` calls `adminGuardDecision` in `src/lib/security/adminGuard.ts`):
- It applies to `/admin` and `/admin/*` only.
- When `ADMIN_BASIC_USER` and `ADMIN_BASIC_HASH` are set, a request needs HTTP Basic auth with that user and a password whose SHA-256 hex equals `ADMIN_BASIC_HASH`. Otherwise it gets a 401. User and hash are compared in constant time.
- A `cf-access-authenticated-user-email` header skips the check only when `ADMIN_GUARD_TRUST_CF_ACCESS=1`. The operator sets it only when the origin is reachable through Cloudflare Access alone. Without it the header is ignored, because anyone who reaches the origin directly can send it.
- With either basic-auth variable unset, there is no guard.
- `/api/*`, including `/api/users/login`, is not behind the guard. Payload access control protects the data.

**API surface:**
- `graphQL: { disable: true }`, and no GraphQL route files exist.
- REST is served at `src/app/(payload)/api/[...slug]/route.ts`, gated by the matrix.
- Custom routes:
  - `/api/enquire` (plus `retry` and `release`).
  - `/api/payments/start`, `/api/payments/securepay/charge`, `/api/payments/webhook/{airwallex,payway}` and `/api/payments/fake/[uuid]` (45).
  - `/api/revalidate`: needs `x-revalidate-secret` equal to `REVALIDATE_SECRET`, else 401. With the variable unset it always answers 401.
  - `/api/csp-report`: POST only (other methods 405). It accepts `application/csp-report`, `application/reports+json` and `application/json` (else 415), refuses a body over 16 KB (413) or bad JSON (400), logs one `csp.violation` line per report with `console.warn` (document, directive, blocked URL, disposition) and answers 204. Nothing is stored.

**Secret comparisons:** secrets and password hashes are compared with `safeEqual` (`src/lib/security/safeEqual.ts`, constant time, edge-safe), never `===`. It covers the `/admin` basic-auth user and hash and `x-revalidate-secret`.

**Rate limits:**
- **Counter:** one fixed-window counter, `rateLimit()` in `src/lib/enquiries/rateLimit.ts`, keyed `<ip>|<bucket>` with a 60 s default window.
- **Store:** `RATE_LIMIT_STORE` (`memory|postgres`; the default is `postgres` in production, `memory` elsewhere). The Postgres table `enquiry_rate_limits` is created on first use.
- **Store failure:** the counter falls back to memory. It never blocks on a store failure.

| Route | Limit | Over the limit |
|---|---|---|
| POST `/api/enquire` | 10/min per IP + formKey | 429 + `Retry-After` |
| POST `/api/payments/start` | 5/min per IP | 429 + `Retry-After` |
| POST `/api/payments/securepay/charge` | 10/min per IP | 429 + `Retry-After` |
| `/pay/receipt/[uuid]/` | 10/min per IP | 404 (same as a wrong id or email) |
| REST `/api/alumni/login`, `/api/alumni/forgot-password` | 10/min per IP each (`src/lib/alumni/rateLimit.ts`) | 429 + `Retry-After` |
| REST `/api/alumni/forgot-password` | 3/h per email (HMAC of the email with `PAYLOAD_SECRET`) | 429 + `Retry-After` |

**Client IP and limit scope:**
- The enquiry, payment and receipt limits use `clientIp` (`src/lib/security/clientIp.ts`, re-exported by `src/lib/enquiries/request.ts`); the alumni limits use `ipOf` (`src/lib/alumni/rateLimit.ts`), which gives the same answer.
- Order: `cf-connecting-ip`, then `x-vercel-forwarded-for`, then `x-real-ip`, then the rightmost `X-Forwarded-For` entry (the hop our own proxy appended), else `unknown`. The leftmost entry is never used: the client writes it.
- Local API calls are not rate limited.

**Headers** (`src/proxy.ts`): set on every response that reaches the end of the proxy. Not on 410s, redirects, the document rewrite or `/wp-content/uploads/*`.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `X-Frame-Options: SAMEORIGIN`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

`next.config.ts` adds, in production only, `Strict-Transport-Security: max-age=63072000; includeSubDomains` on every path (`productionHeaders`), so a local `http://localhost` never pins itself. `poweredByHeader: false` drops `X-Powered-By`.

**CSP** (`buildCsp` in `src/lib/seo/csp.ts`, DEC-5, DEC-21):
- **Enforced** (`Content-Security-Policy`): `object-src 'none'; base-uri 'self'; frame-ancestors 'self'`. `'self'` is there because Payload live preview frames the site.
- **Full policy** (`Content-Security-Policy-Report-Only`, `report-uri /api/csp-report`):
  - `default-src 'self'`.
  - `script-src 'self' 'unsafe-inline'` + `SCRIPT_HOSTS` + `GATEWAY_HOSTS`; `'unsafe-eval'` in development only.
  - `connect-src` with `CONNECT_HOSTS` + `GATEWAY_HOSTS`.
  - `img-src` with the analytics and YouTube image hosts.
  - `frame-src`: `FRAME_HOSTS` + `GATEWAY_HOSTS` + `embedHostSources(site.allowedEmbedHosts)`. The embed list is computed once when the proxy module loads, so adding a host is a code change and a deploy.
  - `form-action 'self' https://api.payway.com.au`.
- **`/admin`:** the Report-Only policy names no third-party host.

**Embeds:**
- **Video:** `VideoEmbed` stores a provider and id (`src/blocks/embeds.ts`).
- **iframes:** `iframeEmbed` hosts must be in `BUILTIN_EMBED_HOSTS` or `site.allowedEmbedHosts`. They are checked at save by `validateEmbedHosts` (courses `sections`, posts) and again at render.
- **Maps:** `mapEmbed` accepts only `https://www.google.com/maps/embed…`.

**Runtime HTML (rule 5):**
- `sanitize-html` is used only by `scripts/import/html-to-blocks.ts`.
- Pages render Lexical through our converters and blocks.
- `dangerouslySetInnerHTML` appears only for JSON-LD, always through `safeJsonLd`, which escapes `<`:
  - `src/components/seo/JsonLd.tsx`
  - `src/blocks/accordion/Component.tsx`
  - `src/components/page/blocks.tsx`
- No ESLint rule enforces this.

**Uploads:**
- **Size:** `payload.config.ts` `upload.limits.fileSize` caps any file at 50 MB (`requestSizeLimit` 51 MB). `media` caps its files at 20 MB in the `limitMediaSize` beforeValidate hook (`MEDIA_MAX_BYTES`, 413 over it).
- **`media`:** jpeg, png, webp, avif, gif and pdf. No SVG.
- **`documents`:** `application/pdf` only.
- **Storage:** both live on local disk under the gitignored `media/` tree (`media/`, `media/documents/`).
- **Who uploads:** only staff with create access. There is no public upload endpoint.
- **Document serving:** `src/app/(site)/pdf/serve.ts` reads only inside `public/` and the documents upload dir, with symlinks resolved.

## 5. URLs
- `/admin/*` is guarded when the basic-auth variables are set.
- `/wp-json/*`, `/xmlrpc.php`, `/wp-login.php` and `/wp-admin/*` answer 410 (DEC-58).
- Alumni REST endpoints: `/api/alumni/{login,logout,forgot-password,reset-password,verify/:token}`.
- `/alumni/dashboard/` redirects to `/alumni/login/` without an alumni session.
- `/pay/receipt/[uuid]/?e=<email>` shows a receipt only when the email matches the row.
- `/api/revalidate` and `/api/payload-jobs/run` need their secrets.

## 6. Integrations
**Env** (`src/env.ts`, one zod schema parsed when the module loads; an invalid value throws `Invalid environment` listing the variable names and messages):
- `PAYLOAD_SECRET` (≥32 characters, required).
- `DATABASE_URL` (must start with `postgres`).
- `NEXT_PUBLIC_SITE_URL`.
- `ADMIN_BASIC_USER`, `ADMIN_BASIC_HASH`, `ADMIN_GUARD_TRUST_CF_ACCESS` (`0|1`, default off).
- `REVALIDATE_SECRET` (≥16 when set).
- `CRON_SECRET`.
- `RATE_LIMIT_STORE`.
- `DEV_ADMIN_EMAIL`, `DEV_ADMIN_PASSWORD`.
- `.env.example` lists names with empty secrets.

**Secrets:** every secret lives in `.env`, and only public ids are `NEXT_PUBLIC_*`. `tests/payments/no-raw-sql.test.ts` asserts that `src/lib/payments`, `src/jobs` and the payment pages hold no hard-coded secret or old-theme id.

**Retention:** the `scrubEnquiryIps` job (`src/jobs/scrubEnquiryIps.ts`, daily at 03:00 on the `maintenance` queue) nulls `enquiries.ip` after 90 days. The rows and their deliveries stay.

## 7. Import / seed
- **First admin:** `npx tsx scripts/dev/seed-admin.ts` creates it from `DEV_ADMIN_EMAIL`/`DEV_ADMIN_PASSWORD` (dev only; it refuses to run in production).
- **Personal data (rule 4):** none is imported or committed from the old repos. That covers CVs and application uploads, error and audit logs, enquiry history, student and portal rows, agent personal emails, and OTPs.
- **`static` import step** (`scripts/import/steps/static.ts`):
  - Copies only `pdf, jpg, jpeg, png, webp, gif, svg` into `public/`.
  - Never `.php`, `.htaccess`, `.js`, backup names or dotfiles.
  - Skips files over 50 MB.
  - Skips an SVG whose text (entities decoded) holds `<script`, `javascript:` or an `on*=` handler (`unsafeSvgReason`), and lists it in the report.
- **Credentials to rotate before cutover:** these were committed in the old repos' history. None may be copied into this repo (rule 3).
  - HubSpot private-app token.
  - Dynamics 365 service account and OAuth client secret.
  - Production RDS MySQL master credentials.
  - Two reCAPTCHA secrets.
  - monday.com API token.
  - Microsoft Graph client secret.
  - Canvas API token.
  - Admissions-portal leads API key.
  - Portal CRM and payment-callback keys.
  - Airwallex IHM live client id, API key and webhook secret, plus the IHNA live pair.
  - PayWay encryption key, PayWay Net user and password, and the second biller set.
  - SecurePay client credential and UI client id.
  - Dev DB password.
  - n8n webhook URL.
  - WordPress DB credentials and salts.

## 8. Acceptance checks
1. `tests/collections/access.test.ts`:
   - Alumni auth needs verification and has lockout.
   - An alumnus cannot verify themselves.
   - Enquiries and payments cannot be written by anyone, and are read by the matrix roles.
   - Product price is finance-only.
   - Lookup `enquiryEmail` is hidden from the public.
   - Users read only themselves, cannot change their own roles, and alumni ids never match staff rows.
2. `tests/collections/courses.test.ts`:
   - Marketing cannot update `fees`; finance can, and touches nothing else.
   - Viewer is read-only, and anonymous users cannot read a draft.
3. `tests/collections/documents.test.ts`:
   - Anyone reads; marketing and admin create and update; only admin deletes.
   - `notes` is staff-only, and only admin changes `publicPath`.
   - Only PDFs upload.
4. `tests/alumni/access.test.ts`:
   - An alumni token cannot read users, enquiries or payments, or another alumnus.
   - It cannot create, delete or unlock accounts, change its email or verification, or set a weak password.
   - The admin panel refuses it.
5. `tests/alumni/login.test.ts`:
   - Login sets an HttpOnly cookie and returns no token in the body.
   - A wrong password and an unknown email get the same 401.
   - The account locks after 5 failures.
   - Staff credentials fail on the alumni endpoint.
   - The 11th login in a minute gets 429 + `Retry-After`.
   - The auth settings match §4.
6. `tests/alumni/forgot-reset.test.ts`: single-use tokens, no enumeration, 10/min per IP and 3/h per email.
7. `tests/alumni/password.test.ts`: the password policy.
8. `tests/enquiries/thankyou-ratelimit.test.ts`: the memory and Postgres rate-limit stores.
9. `tests/enquiries/scrub-ips.test.ts`: the IP is nulled after 90 days and the rows are kept.
10. `tests/seo/tracking.test.ts` ("CSP"):
    - `frame-src` = the fixed list + `allowedEmbedHosts`, with junk dropped.
    - No `'unsafe-eval'` in production.
    - The enforced policy is `object-src 'none'; base-uri 'self'; frame-ancestors 'self'`.
    - The admin policy has no third-party host.
11. `tests/payments/csp.test.ts`: the CSP carries the payment page hosts.
12. `tests/seo/jsonld.test.ts`: `<` is escaped in JSON-LD.
13. `tests/import/no-legacy-markup.test.ts`: no legacy markup is stored in posts or staff.
14. `tests/payments/no-raw-sql.test.ts` and `tests/portal/no-raw-sql.test.ts`: parameterised SQL only, and no hard-coded credentials.
15. `tests/enquiries/client-ip.test.ts`: a spoofed multi-value `X-Forwarded-For` gives the rightmost entry; `clientIp` and `ipOf` agree.
16. `tests/seo/admin-guard.test.ts`: the CF Access header is ignored without `ADMIN_GUARD_TRUST_CF_ACCESS=1`; basic auth passes only with the right user and password; `safeEqual`.
17. `tests/seo/headers.test.ts`: HSTS in production only; `poweredByHeader: false`; `output: 'standalone'`.
18. `tests/seo/csp-report.test.ts`: 204 and one log line per report, 413 over 16 KB, 415 for other types, 405 for GET.
19. `tests/collections/upload-limits.test.ts`: the 50 MB parser limit and the 20 MB `media` hook.
20. `tests/import/static-svg.test.ts`: script-bearing SVGs are rejected; the step reads `ctx.dry`.
21. Running server:
    - `curl -s -o /dev/null -w '%{http_code}' localhost:3000/wp-login.php` → 410.
    - With `ADMIN_BASIC_*` set, `curl -sI localhost:3000/admin/` → 401 with `WWW-Authenticate: Basic`.
    - `curl -sI localhost:3000/` carries `Content-Security-Policy`, `Content-Security-Policy-Report-Only`, `X-Frame-Options: SAMEORIGIN` and `X-Content-Type-Options: nosniff`.
    - `curl -X POST localhost:3000/api/revalidate` → 401.

## 9. IHNA differences
IHNA is not built. When it is, rotate the IHNA credentials that were in the old repos (Dynamics, HubSpot, Airwallex) and keep committed CVs out of the import.

## Dependency maintenance

The imported site remains npm-isolated; the surrounding workspace uses pnpm.
Audit both dependency trees with `npm audit` in this directory and `pnpm audit`
at the workspace root. Both lockfiles must be committed.

The npm overrides enforce patched transitive dependencies where the latest
parent still pins an affected release: Happy DOM, Nodemailer, Undici, fast-uri,
the v6 selector parser, and the v10 minimatch branch. The deprecated esbuild-kit
loader is replaced with its maintained successor, tsx, to remove esbuild 0.18.

`deepmerge` has no upstream patched release for GHSA-gcqx-w48m-w2h4. Its override
uses the MIT-licensed API-compatible security fork in `vendor/deepmerge-safe`,
which defines own data properties for **both** target-copy and source-merge
writes instead of invoking inherited setters. Do not downgrade to an old branch
to escape an advisory's version range. Replace the fork only after an upstream
fix is available and verified. `npm run test:security` checks prototype poisoning,
ordinary merge compatibility, and Payload's actual resolution of the fork; it
also runs as part of `npm run check`.

Nodemailer uses its maintained v10 API; SMTP and stream transports retain the
existing test/live safety controls. Happy DOM disables external resource loading
by default; tests must not re-enable it to make iframe fixtures load.

## 10. Open questions
1. Who rotates each credential in §7, and by when?
2. Is the origin reachable only through Cloudflare Access? `ADMIN_GUARD_TRUST_CF_ACCESS=1` is safe only if it is.
3. The receipt URL carries the payer email (`?e=<email>`). Should it move to an HMAC token (with 45-payments)?
4. How long are enquiry personal fields kept? Only the IP is scrubbed today (privacy officer).
5. Alumni self-registration: stay invite/import only (DEC-47)?
6. Cookie consent: there is no banner or Consent Mode (`src/components/tracking/Tracking.tsx`).
