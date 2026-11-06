import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { parse } from 'dotenv'

export function assertLocalDatabase(value) {
  let url
  try { url = new URL(value) } catch { throw new Error('A local PostgreSQL DATABASE_URL is required') }
  if (!['postgres:', 'postgresql:'].includes(url.protocol) ||
    !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
    !/^\/ihm_local(?:_[a-z0-9]+)*$/.test(url.pathname) || url.search || url.hash) {
    throw new Error('Refusing database: use loopback and a database named ihm_local or ihm_local_<suffix>, without URL query overrides')
  }
  return url
}

export function localEnvironment(values, command = 'dev') {
  assertLocalDatabase(values.DATABASE_URL)
  const secretNames = ['PAYLOAD_SECRET', 'ADMIN_BASIC_PASSWORD', 'REVALIDATE_SECRET', 'CRON_SECRET', 'PREVIEW_SECRET', 'PAYMENTS_DATA_KEY']
  for (const name of secretNames) {
    if (!values[name] || values[name].length < 32) throw new Error(`Run npm run local:init: ${name} must have at least 32 characters`)
  }
  return {
    DATABASE_URL: values.DATABASE_URL,
    ...Object.fromEntries(secretNames.map(name => [name, values[name]])),
    NODE_ENV: command === 'build' ? 'production' : 'development',
    LOCAL_DEV: '1', REPLIT_TEST_SITE: '1',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    ADMIN_BASIC_USER: 'ihm-test',
    ADMIN_BASIC_HASH: createHash('sha256').update(values.ADMIN_BASIC_PASSWORD).digest('hex'),
    ADMIN_GUARD_TRUST_CF_ACCESS: '0',
    DRY_RUN: '1', PAYMENTS_DRY_RUN: '1', PAYMENTS_ALLOW_PRODUCTION: '0',
    PAYMENTS_GATEWAY_MODE: 'real', PORTAL_ENABLED: '0', ENQUIRY_LIVE_ADAPTERS: '',
    TRACKING_ENABLED: '0', NEXT_PUBLIC_ROBOTS: 'noindex', ENQUIRY_AUTORUN: '0',
    RATE_LIMIT_STORE: 'memory', DISABLE_DB_PUSH: command === 'schema' ? '0' : '1',
    NEXT_TELEMETRY_DISABLED: '1',
  }
}

export function loadLocalEnvironment(command = 'dev') {
  // Deliberately read this file, not an inherited DATABASE_URL or production .env.
  return localEnvironment(parse(readFileSync('.env.localdev')), command)
}
