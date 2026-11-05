# Running ihm-web locally (Windows)

The site is a **Next.js 16** app with **Payload CMS 3.91** built in, a **PostgreSQL 16** database, and **Tailwind CSS v4**
(tokens in `src/styles/theme.css`). Pages are mostly code (`src/app/(site)/**/page.tsx`); courses, news, staff, media and
documents live in the CMS at `/admin`. Docker supplies the local database (and an optional mail catcher).

## 1. Install once

| Tool | Version | Notes |
|---|---|---|
| Node.js | 22 LTS (20.18+ works) | https://nodejs.org — tick "Add to PATH" |
| Docker Desktop | current | Uses WSL 2; start it before step 3 |
| Git | current | already used for this repo |

Use **npm** (not pnpm or yarn). Open **PowerShell** in the project folder (`Documents\ihm-website-v4`).

## 2. Environment file

`.env` is git-ignored, so each developer makes their own. One command creates it from `.env.example` with generated
secrets (or repairs an existing `.env`, keeping values that are already valid):

```powershell
node scripts/dev/make-env.mjs
```

It prints the admin email and password it set. `--force` regenerates the secrets. Keep `DRY_RUN=1`, `PORTAL_ENABLED=0`
and `TRACKING_ENABLED=0` locally: forms and payments are recorded, never sent.

## 3. Start the database

```powershell
docker compose up -d        # Postgres on localhost:5433, portal MySQL fixtures on 3307, Mailpit on 8025
docker compose ps           # all three should be "running"
```

## 4. Install packages and run

```powershell
npm install
npm run dev                 # first start takes ~1 minute; it creates the database tables
```

Open http://localhost:3000. In a **second** PowerShell window (while `npm run dev` keeps running) create your admin login once:

```powershell
npx tsx scripts/dev/seed-admin.ts
```

Then sign in at http://localhost:3000/admin with `DEV_ADMIN_EMAIL` / `DEV_ADMIN_PASSWORD`. Emails sent by the site in dev
appear in Mailpit at http://localhost:8025.

## 5. What you will see on a fresh database

Every code page renders (home, about, governance, campuses, landing pages, …). Course lists, news, staff and images are
empty until content is added in `/admin` or imported. Pictures that are not in the database yet show a branded placeholder
(the IHM emblem on a coral/gold wash) instead of a broken image. The import (`npm run import -- <step>`,
`docs/modules/30-import.md`) needs the `../inventory/` and `../ihmv3/` folders next to this project.

## 6. Everyday commands

```powershell
npm run dev                 # develop (hot reload)
npm run build; npm run start   # production build and server on :3000
npm run check               # types, lint, block checks and unit tests
docker compose down         # stop the database (data is kept in a Docker volume)
```

## 7. Import the WordPress content (courses, posts, staff, media)

The inventory exported from the WordPress database (`.data/inventory/`) is already in the project. With Docker and
`npm run dev` running, in a second PowerShell window:

```powershell
npm run import -- lookups          # schools, campuses, levels, durations
npm run import -- media            # every image the pages, posts and courses use (+ featured images)
npm run import -- wp-courses       # 25 courses into /admin → Courses, at /courses/<slug>/
npm run import -- wp-posts         # 91 posts: /blog/<slug>/ and /news/<slug>/
npm run import -- wp-events        # 179 events from the old events table, for /news-and-events/
npm run import -- staff            # 56 staff profiles at their old URLs
npm run import -- assign-images    # hero/portrait images onto courses, staff, campuses
```

Images that exist only on the live site (listed in `src/content/legacy-assets.ts`) and the missing /our-people/ portraits are
downloaded with `npm run assets:legacy` and `npm run people:photos`; pages show a fallback image until then.

`media` takes files from `../ihmv3` when that folder exists next to the project, otherwise downloads them from
ihm.edu.au. To use your local WordPress copy, link it once:

```powershell
New-Item -ItemType Junction -Path "$HOME\Documents\ihmv3" -Target "E:\wamp64\www\ihmv3"
```

To refresh the inventory from a newer database later, load the dump into MySQL (for example WAMP) and run
`npm run inventory:wp -- --db=<database> --user=root`. Re-running an import step updates changed items and skips
the rest; anything an editor changed in /admin is left alone. Review queue: /admin → Courses or Posts, filter
`import.reviewStatus = check`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `DATABASE_URL` / `PAYLOAD_SECRET` error on start | `.env` missing or the secret is shorter than 32 characters |
| `ECONNREFUSED 127.0.0.1:5433` | Docker Desktop is not running, or run `docker compose up -d` again |
| `Error verifying Nodemailer transport` in the log | Mailpit is not running; harmless, or start it with `docker compose up -d mailpit` |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Stale page after big changes | stop the server, delete the `.next` folder, run `npm run dev` again |
| Fonts fall back to Georgia | the first build downloads Fraunces, Bricolage Grotesque and Spline Sans Mono from Google Fonts; check your internet connection |

## Brand and layout reference

- Brand colours: coral `#f15c4e` and gold `#edab37` (from the logo), deep plum ink, warm white — tokens in
  `src/styles/theme.css`, documented in `docs/modules/05-design-system.md` §4.1.
- Logo files: `public/brand/ihm-logo.svg` (light backgrounds), `ihm-logo-on-dark.svg` (footer), `ihm-mark.svg` (emblem,
  favicon, image placeholder).
- New content pages: add `src/app/(site)/<path>/page.tsx` built from `src/components/page/` (`Hero`, `Rich`, `CardGrid`,
  `Tabs`, `Cta`, …) and a row in `src/content/pages.ts`. Every block picks up the brand styling and responsive layout.
