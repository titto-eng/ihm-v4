# Reviewed public-content refresh

This is an **operator-run, read-only Replit CMS export**, not an automatic sync.
No export is authorized merely by installing these scripts. Before each export, the
owner must confirm **development or published TEST**, the exact database host/port/name,
and the App Storage bucket. This workflow does not support the original AWS site;
it never writes the source database, uploads/deletes cloud files, changes AWS or DNS,
or publishes. Do not use `import:refresh` for this workflow.

## 1. Review the selection and confirm the source

From `artifacts/ihm-test/site`, copy `scripts/content-kit/plan.example.json` into
`.local-data/content-kits/review-plan.json`. Keep plans private and out of Git too.
Use the owner's approved CMS record list to fill in the IDs (numbers, never `*`).
Every root table must be present; use `[]` to explicitly exclude its records.
Child rows such as course sections, staff research and relationship rows are
included only for selected parents. Include their referenced lookups, related
courses and uploads; a missing relational or embedded upload target fails export.
Select only published content, active lookups/staff and public-audience documents.

For every selected upload, add a `requiredFiles` entry such as:

```json
{
  "media:42": "Hero of approved course 17",
  "documents:8": "Public brochure linked by approved course 17"
}
```

Public policy documents linked from code pages can be selected with that page as
their reason. **Do not select all uploads just because the CMS can read them.**
Review text/JSON content and the actual files for personal/private material.
Public staff biographies and testimonials are intentionally eligible; private
email addresses and internal notes are not. Review plain URLs and code-defined
links too: automated FK checks cannot prove that every arbitrary text link exists.

The allowlist is the named tables in `scripts/content-kit/policy.mjs` and the columns
of its hash-pinned historical schema, plus `_objectkey`. It excludes all users,
credentials, sessions, alumni, enquiries, payments, products, private application
files, jobs, versions, locks, globals and migration records. It also omits staff
email, lookup enquiry-routing email, document notes and all internal import/review
metadata. New fields/tables are **not automatically included**. Review policy changes
in Git before exporting newly added content types. No application hooks run.

Record the owner's source confirmation and selection approval in `review.reference`
(a non-sensitive approval reference) and set `review.approved` to `true` only after
review. The plan contains no credentials. Calculate its approval digest:

```sh
sha256sum .local-data/content-kits/review-plan.json
```

Any edit invalidates this approval digest.

## 2. Export from the confirmed source

An authorized operator supplies a **SELECT-only** PostgreSQL connection through
the private `CONTENT_EXPORT_DATABASE_URL` secret, not a command argument, plan,
chat message or committed file. Use the workspace's secure Secrets tooling.
Set `CONTENT_EXPORT_ENVIRONMENT` to the reviewed environment label
(`replit-development` or `replit-published-test`). The existing
`DEFAULT_OBJECT_STORAGE_BUCKET_ID` must match the plan. Do not replace the app's
normal database configuration or give the export account DDL/write permissions.
Run in the Replit environment with read access to the confirmed bucket.

```sh
npm run content:export -- .local-data/content-kits/review-plan.json REVIEWED_PLAN_SHA256 refresh-2026-11
```

The script checks the source against the plan before connecting, verifies the
database identity and transaction read-only setting, then performs explicit-column,
parameterized SELECTs in a repeatable-read, read-only transaction. It uses cloud
metadata/download operations only, never bucket listing or upload/delete. Every
selected upload and generated image size is copied with its original object key.
Downloads use CRC32C validation and a pinned generation; changed/missing objects
fail the export. Avoid concurrent CMS edits during capture/review, since database
and storage cannot share an atomic snapshot.

The new directory is `.local-data/content-kits/refresh-2026-11/`.
It contains `content.json`, `assets/` and a final `manifest.json` with row data
checksum, file sizes/SHA-256 checksums, object keys and generations, source identity
and the reviewed plan. IDs, relationship rows, timestamps, URLs, legacy/public paths
and `_objectkey` values are unchanged. The manifest is written last; failed partial
directories are not importable. Retry using a new bundle name.

## 3. Review and transfer the kit

Review the exported JSON and files against the approved selection; compare key
course/news/document URLs and confirm no private material is included. Approve the
**manifest SHA-256** printed on success, recording/transmitting it separately from
the bundle. A checksum detects tampering only when compared with this trusted
out-of-band digest; it is not a digital signature. Do not simply trust a digest
supplied inside an unreviewed archive.

Transfer the directory securely, retaining its structure. All generated bundles
must stay under `.local-data/` (Git-ignored and excluded from publishing). Do not
attach them to a public PR, commit archives, or copy them into `public/`.
This kit refreshes CMS content/uploads; code/static assets still come from the
reviewed checkout and original public-static kit (`local:assets`). No unrelated
static directory or private file directory is crawled.

## 4. Import into a new local database

Install the same reviewed checkout/dependencies and initialize `.env.localdev`
as in [LOCAL-DEVELOPMENT.md](LOCAL-DEVELOPMENT.md). Create a **brand-new** loopback
database named `ihm_local` or `ihm_local_<suffix>` and point `.env.localdev` at it.
Stop the local application. Do **not** run `local:schema` or restore a handover first.
Existing upload destinations must not collide with the selected kit's files;
use a fresh checkout/local data directory for a fresh content copy.

```sh
npm run local:kit -- .local-data/content-kits/refresh-2026-11 REVIEWED_MANIFEST_SHA256
npm run local:dev
```

Before any import writes, the importer checks all hashes, approved tables/columns,
IDs, relationships and safe paths. It refuses a remote connection, symlinks,
existing file destinations, or **any database with existing user tables**, even
schema-only databases. It never truncates, drops or merges existing records.
An advisory lock prevents concurrent kit imports.

Only after the empty-database check does it run the checkout's local Payload schema
initializer. It then inserts content in one transaction, defers/checks foreign keys,
and advances local sequences to avoid future ID collisions. No SQL or executable
code from the bundle runs. Files go outside `public/` under
`.local-data/uploads/{media,documents}/<original-object-key>/<filename>`, behind the
existing upload handlers. Source URLs and keys are not rewritten.

On failure, content inserts roll back and files written by this run are removed.
Schema initialization is separate: it can leave an empty schema on failure, and a
process crash can leave files. **Never retry by dropping/truncating a database**:
choose a new database and fresh local file destinations. The previous local copy
remains untouched. Create your own local admin; no users or sessions were copied.
All existing dry-run, noindex, disabled email/payment/portal safeguards still apply.

## Checks

`npm run test:content-kit` covers allowlist enforcement, restricted fields,
relationships, integrity/path checks and refusal of non-empty databases. It is
also included in `local:check`. Tests use synthetic records, never source data.
