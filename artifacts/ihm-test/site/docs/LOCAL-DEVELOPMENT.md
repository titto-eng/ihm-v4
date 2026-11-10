# Local development and GitHub checks

This workflow edits the isolated TEST copy. It never updates AWS, DNS, ihm.edu.au,
or a hosted database. Git pushes do **not** publish the Replit application.

## 1. Get the correct source

Use the normal GitHub HTTPS/SSH clone URL for the repository connected in Replit's
Git pane (currently `titto-eng/ihm-v4`, branch `main`). Do not use Replit's internal
Git proxy URL from a laptop, or overwrite this copy with the original upstream repository.

Install Node **24 LTS**, npm, and PostgreSQL **16** with `psql` and `pg_restore` on your
computer. Enter `artifacts/ihm-test/site`, not the monorepo root:

```sh
npm ci
npm run local:init
```

The initializer creates `.env.localdev` with fresh local-only secrets, without printing
them. It refuses to overwrite an existing file. Keep that file private; it and local
uploads are Git-ignored and excluded from publishing.

Create a new local PostgreSQL database named `ihm_local` (or `ihm_local_<suffix>`).
For example, using the credentials/port of your locally installed PostgreSQL:

```sh
createdb -h 127.0.0.1 -p 5433 -U postgres ihm_local
```

Edit **only the local** `DATABASE_URL` in `.env.localdev` to match. Port 5432 is also
supported. The launcher rejects remote hosts, URL query overrides and other database
names. Never paste the Replit production database connection here.

## 2. Choose an empty sandbox or the full content copy

**Empty sandbox / CI:** run `npm run local:schema`. This builds the Payload schema but
does not invent course/news content or supply photographs. It is enough for code checks;
it is not a full-content preview.

**Full content copy:** use your original verified handover archive. Extract its source,
media and public-static ZIPs. Before running `local:schema`, restore its custom database
dump into the **empty** local database:

```sh
npm run local:restore -- "/path/to/ihm-db-20261104-1246.dump"
npm run local:assets -- "/extracted/source/public" "/extracted/public-static" "/extracted/media"
npm run local:schema
```

Pass the actual extracted directories (the first must contain the original `images/`
and `brand/` folders, not the ZIP itself). `local:assets` copies static files into
`public/`, original CMS images into `.local-data/uploads/media/`, and policy documents
into `.local-data/uploads/documents/`. It does not import private application files.
Existing destination assets may be replaced; use a clean checkout for the initial copy.
Never commit a database dump, asset bundle or credential file.

`local:restore` refuses non-empty databases, uses a single transaction, and never drops
or overwrites an existing database. Only restore trusted handover files. PostgreSQL dump
files can contain executable SQL. For a reset, create a **new** local database name and
update `.env.localdev`; do not run a reset against a hosted connection.

The original handover is a point-in-time content copy. Later CMS changes made on the
published test site are not automatically pulled into it. Use the
[reviewed public-content refresh workflow](CONTENT-KIT.md) for a newer copy.
It requires source confirmation and explicit content/file approval, excludes private
records, and imports only into a new empty local database using `npm run local:kit`.
Do not run `local:schema` before a content-kit import.

## 3. Run and edit

```sh
npm run local:dev
```

Open `http://localhost:3000`. The server binds to loopback only.
At `/admin/`, the outer username is `ihm-test`; find its newly generated
`ADMIN_BASIC_PASSWORD` in your private `.env.localdev`. Create your own Payload account
behind that gate. The first account receives admin access.

Always use the `local:*` commands rather than the Replit launcher on your laptop.
They force dry run, disabled payments/portal/email/tracking, noindex, no scheduler and
local file storage. Files remain behind the original Payload authorization checks;
private files are outside `public/`. Replit's launcher explicitly forces cloud storage,
so a local setting cannot accidentally put published uploads on ephemeral disk.

Schema push is OFF during normal development/builds. After a deliberate collection
change, stop the server, run `npm run local:schema`, review any destructive-change
prompts, and restart. Back up local data before destructive schema edits. Schema push
only targets the guarded loopback database; this is not a production migration command.
Commit collection definitions and reviewed development migrations/snapshots when needed.
Use `npm run local:types` to regenerate types and `npm run local:migration -- descriptive_name`
to generate a migration against the local configuration; review the generated SQL.
Historical migration snapshots predate the Replit adapter, so never assume a generated
diff is safe without review. These migration files do not run against Replit production.
Do not blindly run the historical baseline migrations over a restored handover.

```sh
npm run local:check
npm run local:build
```

These run the vendored security regression, local storage/database safety tests,
TypeScript, ESLint, block-registry checks, and (separately) a Next production build.
The existing `npm run check` is broader: it also needs MySQL portal fixtures and Mailpit,
plus any external inventory fixtures its tests reference. Those are not silently mocked
or counted as passing by `local:check`.

## 4. Push, review, and publish

1. `git switch -c feature/your-change`
2. Edit locally, run the checks above, commit and push the branch.
3. Open a pull request into `main`. GitHub runs **IHM checks / Site checks and build**
   and **Enquiry, payment and portal integration**.
4. Merge after checks and review. In GitHub repository settings, optionally require this
   status check and a review through a branch rule; the workflow does not set that rule.
5. Pull `main` into the Replit workspace. Resolve any competing workspace edits instead
   of force-pushing or overwriting them.
6. For schema changes, apply and verify the corresponding changes on the **Replit
   development database** using the project's development migration workflow. Pulling
   Git files alone does not alter that database. The laptop-only schema command is
   intentionally not a way to target it.
7. Check Preview, then click Publish. Replit compares its development and production
   schemas. Review rename/destructive-change prompts carefully. Do **not** choose
   overwrite-production-data for a routine code release.

The GitHub workflow has read-only repository permissions and a disposable PostgreSQL
service. It generates its own throwaway secrets and builds without the real content
bundle. It does not publish, connect to Replit/AWS databases, or require your secrets.
A green check confirms code compilation and the listed checks, not full-content parity
or a successful Replit publish.

### Fixture-dependent PR checks

The separate integration job uses PostgreSQL 16 (`ihm_local_integration`), MySQL 8
(`ihmedu_portal`) and Mailpit. All are disposable GitHub service containers. The
documented `docker/portal-fixtures/load.sh` loads all four committed SQL files and
restricts `portal_ro` to SELECT and `portal_pay` to the payment-only grants.
No live database, dump, credentials, Replit storage, or content refresh is involved.

`npm run test:integration:ci` starts subprocesses with an allowlisted environment,
fresh random signing secrets, loopback database/SMTP endpoints, fake gateways,
dry-run adapters and tracking disabled. It initializes the empty PostgreSQL schema
once, then runs all enquiry, payment and portal `.test.ts` and `.test.tsx` files
serially, so reconciliation and email assertions do not race other suites.
Payment receipt assertions fail if Mailpit disappears. Unmocked external fetches
are rejected; gateway contract tests use injected fakes, never live credentials.
This harness does not use the hosted Replit email/portal kill switches, because
those would prevent the very fixture writes and Mailpit deliveries being checked.
Do not use it against a shared database.

The job uploads JUnit results and `coverage.txt` even on failure. The original
`npm run test:int` remains the wider archive/content suite. Its course importer
and section mapper require missing `data/ihm/courses.json` and `v2/ihm/pages.csv`;
the enquiry provenance cross-check also requires `v2/ihm/enquiries.csv`.
The integration job prints an explicit warning and records these missing inputs
in its coverage report rather than claiming archive checks passed. The committed
enquiry JSON request fixtures still run. Do not fabricate the missing inventory
from current application output, download it live in CI, or copy private records
to make those archive checks green.

## 5. What changes when?

| Change | How it reaches the published test site |
|---|---|
| UI/code | Git review → Replit pull → successful Publish |
| Database structure | Local validation → Replit development schema → Publish schema review |
| Courses, news, staff, PDFs | Edit in the published Payload CMS; its hooks refresh affected content |
| Locally edited CMS records | Explicit reviewed content import; not Git and not automatic database sync |

Never add production DDL to GitHub Actions, the build, or application startup.
Keep Replit's test origin, test secrets and App Storage in Replit settings. All live
integrations remain disabled; the final production hosting migration is a separate task.
