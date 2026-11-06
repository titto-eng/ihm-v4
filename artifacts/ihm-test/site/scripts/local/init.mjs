import { randomBytes } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { assertLocalDatabase } from './env.mjs'

const database = process.argv[2] || 'postgresql://postgres:postgres@127.0.0.1:5433/ihm_local'
assertLocalDatabase(database)
const secrets = ['PAYLOAD_SECRET', 'ADMIN_BASIC_PASSWORD', 'REVALIDATE_SECRET', 'CRON_SECRET', 'PREVIEW_SECRET', 'PAYMENTS_DATA_KEY']
const lines = [
  '# Private local-only settings. Never commit or reuse these for hosting.',
  `DATABASE_URL=${database}`,
  ...secrets.map(name => `${name}=${randomBytes(32).toString('hex')}`),
]
writeFileSync('.env.localdev', `${lines.join('\n')}\n`, { flag: 'wx', mode: 0o600 })
mkdirSync('.local-data/uploads', { recursive: true })
mkdirSync('public', { recursive: true })
console.log('Created .env.localdev with new local-only secrets. It was not printed. Edit its local database connection before continuing. Existing files are never overwritten.')
