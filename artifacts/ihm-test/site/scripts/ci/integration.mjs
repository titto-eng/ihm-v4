// CI fixture harness. Never load .env or inherit application credentials.
import { spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { mkdirSync } from 'node:fs'

const os = Object.fromEntries(Object.entries(process.env).filter(([key]) =>
  /^(PATH|HOME|TMPDIR|LANG|LC_.*|CI)$/.test(key)))
const env = {
  ...os,
  DOTENV_CONFIG_PATH: '/dev/null',
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://postgres:postgres@127.0.0.1:5433/ihm_local_integration',
  PAYLOAD_SECRET: randomBytes(32).toString('hex'),
  PAYMENTS_DATA_KEY: randomBytes(32).toString('hex'),
  REVALIDATE_SECRET: randomBytes(32).toString('hex'),
  CRON_SECRET: randomBytes(32).toString('hex'),
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  // Not the hosted Replit safety mode: tests must write fixture portal rows and
  // deliver to Mailpit. Isolation here comes from this closed environment.
  REPLIT_TEST_SITE: '0', LOCAL_DEV: '1', DISABLE_DB_PUSH: '1',
  DRY_RUN: '1', ENQUIRY_LIVE_ADAPTERS: '', ENQUIRY_AUTORUN: '0',
  DYNAMICS_ENABLED: '0', PORTAL_ENABLED: '0',
  PORTAL_FIXTURE_PORT: '3307',
  PORTAL_DB_HOST: '127.0.0.1', PORTAL_DB_PORT: '3307', PORTAL_DB_NAME: 'ihmedu_portal',
  PORTAL_DB_RO_USER: 'portal_ro', PORTAL_DB_RO_PASSWORD: 'portal_ro',
  PORTAL_DB_PAY_USER: 'portal_pay', PORTAL_DB_PAY_PASSWORD: 'portal_pay',
  PAYMENTS_GATEWAY_MODE: 'fake', PAYMENTS_ALLOW_PRODUCTION: '0',
  SMTP_HOST: '127.0.0.1', SMTP_PORT: '1025', EMAIL_FROM: 'no-reply@example.test',
  TRACKING_ENABLED: '0', NEXT_PUBLIC_ROBOTS: 'noindex',
  RATE_LIMIT_STORE: 'memory', NEXT_TELEMETRY_DISABLED: '1',
}

function run(args, overrides = {}) {
  const result = spawnSync(process.execPath, args, {
    env: { ...env, ...overrides }, stdio: 'inherit',
  })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

mkdirSync('generated-artifacts/integration', { recursive: true })
run(['--import', 'tsx', 'scripts/local/schema.ts'], {
  // Include the hosted storage metadata in schema/type generation, but use local
  // files. Only the test subprocess disables the email/portal kill switches.
  NODE_ENV: 'development', DISABLE_DB_PUSH: '0', REPLIT_TEST_SITE: '1',
})
run(['node_modules/vitest/vitest.mjs', 'run', '--config', 'tests/integration/vitest.config.mts'])
