import { spawnSync } from 'node:child_process'
import { open } from 'node:fs/promises'
import { Pool } from 'pg'
import { assertLocalDatabase } from './env.mjs'

const url = assertLocalDatabase(process.env.DATABASE_URL)
const dump = process.argv[2]
if (!dump) throw new Error('Usage: npm run local:restore -- /path/to/trusted-handover.dump')
const handle = await open(dump)
const signature = Buffer.alloc(5)
await handle.read(signature, 0, 5, 0)
await handle.close()
if (signature.toString() !== 'PGDMP') throw new Error('Expected a PostgreSQL custom-format handover dump')
const pool = new Pool({ connectionString: url.href })
try {
  const result = await pool.query("SELECT count(*)::int AS count FROM information_schema.tables WHERE table_schema = 'public'")
  if (result.rows[0].count !== 0) throw new Error('Refusing restore: the local database is not empty. Create a NEW ihm_local_<suffix> database instead.')
} finally { await pool.end() }
const result = spawnSync('pg_restore', ['--exit-on-error', '--single-transaction', '--no-owner', '--no-privileges', '--dbname', url.pathname.slice(1), dump], {
  stdio: 'inherit',
  env: { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('PG'))),
    NODE_ENV: process.env.NODE_ENV || 'development',
    PGHOST: url.hostname.replace(/^\[|\]$/g, ''), PGPORT: url.port || '5432',
    PGUSER: decodeURIComponent(url.username), PGPASSWORD: decodeURIComponent(url.password) },
})
if (result.error) throw new Error('pg_restore is unavailable; install PostgreSQL 16 client tools')
if (result.status !== 0) process.exitCode = result.status || 1
else console.log('Restored into the previously empty local database. Run npm run local:schema next. No hosted database was contacted.')
