# Deploying ihm-web to AWS (handover guide)

For the team hosting **ihm.edu.au**. The site is one **Next.js 16** application with **Payload CMS 3.91** built in (admin at
`/admin`), backed by **PostgreSQL 16** and a folder of uploaded files. It replaces the WordPress site at the same URLs.

| Part | What it is | Where it comes from |
|---|---|---|
| Source code | this repository | GitHub `metaveotech/ihm-website-v4` (or `source-*.zip` in the handover) |
| Database | Postgres custom-format dump, content only | `ihm-db-*.dump` |
| Uploads | CMS images and policy PDFs (`media/`) | `media-*.zip` |
| Static PDF stores | git-ignored folders under `public/` (`pdf`, `brochures`, `IHM_Domestic_SHB`, `International-SHB`) | `public-static-*.zip` |
| Secrets | production `.env` values | sent separately (never in a file or the repo) |

The handover folder is made by `deploy\make-handover.ps1` on the developer's machine; `SHA256SUMS.txt` lists checksums.

## 1. Before the handover (developer)

1. Download live-only images into `public/`: `npm run assets:legacy`.
2. Import the policy PDFs (needs the old WordPress copy at `..\ihmv3`; on this machine it is `E:\wamp64\www\ihmv3`, so first
   create a link, which changes nothing in that folder: `cmd /c mklink /J %USERPROFILE%\Documents\ihmv3 E:\wamp64\www\ihmv3`):
   `npm run import -- static`, then `npm run import -- documents` (expects 251 documents).
3. `npm run check` is green.
4. Commit and push to GitHub; give the hosting team read access.
5. `powershell -ExecutionPolicy Bypass -File deploy\make-handover.ps1`, then share the folder (S3 pre-signed link, OneDrive with
   expiry, ...). The dump holds no users, enquiries, payments, CVs, jobs or sessions.

## 2. AWS shape (recommended)

- **Compute:** one container (ECS Fargate or EC2 with Docker), 2 vCPU / 4 GB RAM, Node 22. Run **one** instance at first: the
  background job runner (enquiry delivery, payment checks) is in-process. For more instances, set `ENQUIRY_AUTORUN=0` on all
  but one, or on all of them and call `POST /api/payload-jobs/run` (header `Authorization: Bearer $CRON_SECRET`) every minute.
- **Database:** Amazon RDS for PostgreSQL **16** (or newer), private subnet, automated backups on.
- **Uploads:** a persistent, writable volume mounted at `/app/media` (EFS for Fargate; an EBS path for EC2), owned by uid 1001.
  It is the CMS file store: losing it loses every uploaded image and PDF. Back it up with the database.
- **Edge:** ALB (or CloudFront + ALB) with an ACM certificate, HTTP→HTTPS redirect, target port 3000, health check `GET /`
  (200). Allow request bodies up to 50 MB on `/admin` and `/api` (document uploads).
- **Outbound (egress):** HTTPS to `fonts.googleapis.com` / `fonts.gstatic.com` at build time; at run time the enabled
  integrations (email provider, HubSpot, payment gateways, portal endpoints). If payments are enabled, give the PayWay team the
  fixed egress IP (NAT gateway EIP).
- **Build host:** `next build` needs about 8 GB of memory.

## 3. Environment (`.env.production`)

Start from `deploy/env.production.template` (the go-live set, with commands to generate each secret); every other variable is described in `.env.example`. The filled `.env.production` is git-ignored. Store the values in AWS Secrets Manager / SSM and inject them
into the container; for the build, pass the same file as a BuildKit secret (§4.2). Minimum for go-live:

| Variable | Production value |
|---|---|
| `NODE_ENV` | `production` (set by the image) |
| `NEXT_PUBLIC_SITE_URL` | `https://ihm.edu.au` (staging: its own URL) — inlined at build time |
| `DATABASE_URL` | `postgres://<user>:<password>@<rds-host>:5432/<db>?sslmode=require` |
| `PAYLOAD_SECRET` | new random value, 32+ characters (`openssl rand -hex 32`) |
| `ADMIN_BASIC_USER`, `ADMIN_BASIC_HASH` | basic-auth gate in front of `/admin` (hash = SHA-256 hex of the password) |
| `REVALIDATE_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`, `PAYMENTS_DATA_KEY` | new random values |
| `RATE_LIMIT_STORE` | `postgres` |
| `EMAIL_FROM` + `RESEND_API_KEY` **or** `SMTP_HOST`/`SMTP_PORT` | the mail provider IHM uses |
| `TRACKING_ENABLED` | `1` on production only (GTM, Clarity, HubSpot) |
| `NEXT_PUBLIC_ROBOTS` | `noindex` on staging; unset on production |
| `DRY_RUN`, `ENQUIRY_LIVE_ADAPTERS`, `PAYMENTS_*` | keep `DRY_RUN=1` until IHM confirms each integration; then follow `.env.example` |
| `PORTAL_*` | `PORTAL_ENABLED=0` unless the portal DB is reachable from the VPC with the read-only user |

## 4. First deployment

### 4.1 Database
```bash
createdb -h <rds-host> -U <admin> ihm                         # or create it in the RDS console
pg_restore --no-owner --no-privileges -h <rds-host> -U <admin> -d ihm ihm-db-<stamp>.dump
psql "$DATABASE_URL" -f deploy/mark-migrations.sql             # once: records the bundled migrations as applied
```
The dump comes from a development database built by Payload's schema push, so it already contains every table; the SQL file
replaces Payload's "dev" marker with the five migrations in `src/migrations/`, so that future `payload migrate` runs only apply
new ones.

### 4.2 Files and image
```bash
mkdir -p /srv/ihm/media && unzip media-<stamp>.zip -d /srv/ihm/media && chown -R 1001:1001 /srv/ihm/media
unzip public-static-<stamp>.zip -d public/                     # in the source checkout, before building
DOCKER_BUILDKIT=1 docker build --secret id=env,src=.env.production -t ihm-web .
docker run -d --name ihm-web --env-file .env.production -p 3000:3000 -v /srv/ihm/media:/app/media --restart unless-stopped ihm-web
```
(On ECS: push the image to ECR, mount EFS at `/app/media`, map secrets to environment variables.)

### 4.3 First admin user
The dump holds no users. Open `https://<site>/admin` — Payload asks for the first admin account. Then add staff accounts in
**Users** with the right roles (`admin`, `marketing`, `events`, `finance`, `viewer`).

## 5. Later deployments
1. `git pull` (or the new source), `docker build ...` as above.
2. If `src/migrations/` gained files: back up the database, then run the migrations with the full toolchain image:
   `docker build --target builder --secret id=env,src=.env.production -t ihm-web-tools .` and
   `docker run --rm --env-file .env.production ihm-web-tools npx payload migrate`.
3. Replace the running container. Content in the CMS and files in `/app/media` are untouched by a deploy.

## 6. Go-live checks
- `https://<site>/`, a course (`/courses/bachelor-of-nursing/`), a post, `/school-of-social-work/`, `/policies-procedures/`
  (PDF links open), `/admin` (basic-auth then login).
- `/sitemap.xml`, `/robots.txt` (production: allows crawling), `/llms.txt`.
- An old WordPress URL redirects (any row of `src/content/redirects.ts`).
- Submit one enquiry form: with `DRY_RUN=1` it is saved in **Enquiries** (admin) and not sent.
- From the repo, against the new host: `CHECK_BASE_URL=https://<site> npx tsx scripts/dev/check-document-links.ts --all`.
- Keep the WordPress server available until DNS has switched and the checks pass; lower the DNS TTL a day before.

## 7. Backups and operations
- Database: RDS automated backups (7+ days) and a manual snapshot before each migration.
- Uploads: EFS/EBS backup (AWS Backup) on the same schedule.
- Logs: container stdout/stderr to CloudWatch.
- Content editors work in `/admin`; code pages (most pages) change only through a new deploy from Git.
