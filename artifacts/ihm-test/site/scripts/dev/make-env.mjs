// Dev only: creates or repairs .env with generated secrets, so nobody types them by hand.
//   node scripts/dev/make-env.mjs           keeps values that are already valid, fills the rest
//   node scripts/dev/make-env.mjs --force   regenerates every secret below
// Starts from .env.example when .env does not exist. Prints the admin login it set (never the secrets).
import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const force = process.argv.includes('--force')
const envPath = '.env'
const source = existsSync(envPath) ? envPath : '.env.example'
if (!existsSync(source)) throw new Error('Run this from the project folder (neither .env nor .env.example found).')

const lines = readFileSync(source, 'utf8').split(/\r?\n/)
const hex = (bytes) => randomBytes(bytes).toString('hex')

// key -> [is the current value acceptable?, value to set otherwise]
const rules = {
  DATABASE_URL: [(v) => v.startsWith('postgres'), () => 'postgres://postgres:postgres@127.0.0.1:5433/ihm'],
  PAYLOAD_SECRET: [(v) => v.length >= 32 && !v.startsWith('change-me'), () => hex(32)],
  REVALIDATE_SECRET: [(v) => v.length >= 16, () => hex(24)],
  PAYMENTS_DATA_KEY: [(v) => v.length >= 16, () => hex(32)],
  DEV_ADMIN_EMAIL: [(v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), () => 'admin@ihm.local'],
  DEV_ADMIN_PASSWORD: [(v) => v.length >= 12, () => `Ihm-${randomBytes(9).toString('base64url')}`],
}
const secrets = new Set(['PAYLOAD_SECRET', 'REVALIDATE_SECRET', 'PAYMENTS_DATA_KEY'])

const seen = new Set()
const changed = []
const out = lines.map((line) => {
  const m = /^([A-Z0-9_]+)=(.*)$/.exec(line)
  if (!m || !rules[m[1]]) return line
  const [key, value] = [m[1], m[2].trim()]
  seen.add(key)
  const [ok, make] = rules[key]
  if (ok(value) && !(force && secrets.has(key))) return line
  changed.push(key)
  return `${key}=${make()}`
})
for (const [key, [, make]] of Object.entries(rules)) {
  if (!seen.has(key)) { out.push(`${key}=${make()}`); changed.push(key) }
}

writeFileSync(envPath, out.join('\n').replace(/\n*$/, '\n'))
const get = (k) => out.find((l) => l.startsWith(`${k}=`))?.slice(k.length + 1)
console.log(`${source === envPath ? 'Updated' : 'Created'} .env${changed.length ? ` (set: ${changed.join(', ')})` : ' (nothing to change)'}`)
console.log(`Admin login for /admin after "npx tsx scripts/dev/seed-admin.ts":`)
console.log(`  email:    ${get('DEV_ADMIN_EMAIL')}`)
console.log(`  password: ${get('DEV_ADMIN_PASSWORD')}`)
