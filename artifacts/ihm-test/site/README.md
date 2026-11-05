# ihm-web

The ihm.edu.au website: Next.js 16 (App Router) + Payload CMS 3.91 on Postgres, Tailwind v4.
Agents and developers: read `AGENTS.md` first; module docs are in `docs/modules/`.

## Quick start (local)

Step-by-step Windows guide: `docs/LOCAL-SETUP.md`.

Requirements: Node 20.18+ (22 in use), npm (not pnpm), Docker.

```
cp .env.example .env          # fill in DATABASE_URL, PAYLOAD_SECRET (32+ chars), DEV_ADMIN_EMAIL, DEV_ADMIN_PASSWORD
docker compose up -d          # postgres:16 on localhost:5433 (db ihm), portal MySQL fixtures on 3307, Mailpit on 1025/8025
npm install
npm run dev                   # http://localhost:3000 ; pushes the dev schema on start
npx tsx scripts/dev/seed-admin.ts   # first admin user from DEV_ADMIN_EMAIL / DEV_ADMIN_PASSWORD (dev only)
```

Then sign in at http://localhost:3000/admin. Dev email lands in Mailpit (http://localhost:8025). `DRY_RUN=1` (the default) records
enquiry deliveries and payments instead of sending them; `PORTAL_ENABLED=0` (the default) shows course pages without portal data.

`DATABASE_URL` example for the Docker database: `postgres://postgres:postgres@localhost:5433/ihm`. To use the portal fixtures,
run `docker/portal-fixtures/load.sh` and set `PORTAL_ENABLED=1` and the `PORTAL_DB_*` values.

Content comes from the import steps (`npm run import -- <step>`, see `docs/modules/30-import.md`); they read `../inventory/` and
`../ihmv3/`.

## Checks

```
npm run check                 # generate:types, typecheck, lint, check:blocks, test:int (vitest, node), test:blocks (vitest, happy-dom)
npm run test:e2e              # Playwright (also test:e2e:payments, test:e2e:enquiries, test:e2e:alumni)
```

## Production

- `npm run build && npm run start`.
- Apply migrations with `npm run payload migrate` (`src/migrations/`); every schema change ships `npm run payload migrate:create`.
- Uploads (`media`, `documents`) are stored on local disk under `media/`: persist that directory.
- Scheduled jobs run in-process (`autoRun`); `/api/payload-jobs/run` with `Authorization: Bearer $CRON_SECRET` runs a queue on demand.
- Env names and their meaning: `src/env.ts`, `.env.example`, `docs/modules/00-architecture.md` §6.
