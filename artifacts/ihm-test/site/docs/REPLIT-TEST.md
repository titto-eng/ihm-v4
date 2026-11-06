# Isolated Replit test copy

For laptop development and GitHub checks, follow [LOCAL-DEVELOPMENT.md](LOCAL-DEVELOPMENT.md).

This is the supplied full Next.js/Payload source, not a new frontend. AWS, the live database,
DNS and ihm.edu.au are not deployment targets here.

## Hosting

- Use one Reserved VM instance (in-process scheduler). Do not attach the live domain.
- Set `NEXT_PUBLIC_SITE_URL` to the chosen Replit test URL before publishing.
- On the first publish, enable **Set up your production database with your current development data**
  in Publishing's Database settings. Otherwise the new test deployment will not contain the imported CMS content.
- Build/start commands are in the enclosing artifact configuration. The build installs this
  site's npm lockfile, restores static files from App Storage, builds standalone Next,
  and copies public and Next static assets into the standalone output.
- The launcher forces dry run, no indexing, no tracking, no portal access and an admin gate.
  The sole deployed process runs scheduled jobs; build and development processes do not.
- Do not run the original AWS migration/start instructions against this Replit deployment.
  Replit publishing handles the isolated database schema. Schema push is disabled.

## Admin access

Open `/admin/`; the outer gate username is `ihm-test` and its password is the
`ADMIN_BASIC_PASSWORD` entered in Replit Secrets. No password is stored in this document.
The gate also protects `/api/users/*`, including first-user creation.
Create your own Payload account behind that gate; the first test-site account receives the admin role. Payload login
is separate from the outer gate. No live staff accounts were imported.
Password-reset emails are unavailable because email delivery is deliberately disabled.

## Data and files

The supplied archive's four checksums were verified before import. The empty development
database received 25 courses, 91 posts, 56 staff, 482 media records and 254 documents.
No users, historical enquiries, payments or private application files were in the dump.
All five migration table/added-column requirements were checked against the restored schema
before recording their markers. The cloud upload adapter adds `_objectkey` columns to the
three upload tables in development.

Original files are persisted in App Storage under `ihm-test/static` and `ihm-test/uploads`.
Do not expose the bucket or application-files prefix publicly. Payload serves upload URLs
with collection access control, with an additional admin check for application files.
New document replacements retain their public URL and use their new object key.

## Verification and limitations

- Production Next build passed using Next 16.4.5. The supplied 16.3.3 and Vitest 4.0.18
  were blocked by Replit's critical-vulnerability policy; Vitest is now 5.1.0.
- Type generation, typecheck, lint and block-registry checks passed.
- The production standalone server returned 200 for home/course and served the noindex robots file.
- 3,071 uploaded objects (including preserved compatibility copies) matched their local MD5 hashes.
- Full integration tests stop because the separate portal MySQL and Mailpit fixtures are
  unavailable. Component tests: 93 passed, 2 payment-page tests failed; those tests also
  require the portal fixture. Do not describe the complete repository suite as green.
- Home, course, two post pages, policies and Social Work returned 200; `/about-us`
  returned 308; obsolete WordPress login returned 410.
- All 254 CMS document URLs passed HEAD checks; 125 policy/fee/alias URLs passed GET
  checks with `200 application/pdf`.
- Admin and first-user API require the outer gate (401 anonymously); guarded CMS login
  returned 200. Signed-in CMS editing has not been visually verified.
- Private file requests are denied anonymously (403); payment starts return 503.
- A synthetic test enquiry persisted and its two deliveries recorded `dry_run`.
- Robots returns `Disallow: /`.
- Live email, CRM, payments, portal dates/applications and tracking remain unavailable.
  The source handover itself documents missing American Education and Global Health
  microsites; no replacement pages were invented.
- Publishing and verification at a public test URL remain pending until the selected
  test origin is configured and the user clicks Publish.
