import { Pool } from 'pg'
import { readFile, lstat, mkdir, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { assertLocalDatabase } from '../local/env.mjs'
import { hash, quote, tables, policy, validateData, assetList, noSymlinks } from './policy.mjs'

export async function verifyBundle(directory, approval) {
  await noSymlinks(path.join(directory, 'manifest.json'))
  const bytes = await readFile(path.join(directory, 'manifest.json'))
  if (hash(bytes) !== approval) throw new Error('Reviewed manifest digest does not match')
  const manifest = JSON.parse(bytes)
  if (manifest.version !== 1) throw new Error('Unsupported kit version')
  await noSymlinks(path.join(directory, 'content.json'))
  const content = await readFile(path.join(directory, 'content.json'))
  if (hash(content) !== manifest.contentHash) throw new Error('Content checksum mismatch')
  const data = JSON.parse(content)
  validateData(data, manifest.plan)
  const expected = assetList(data)
  if (!Array.isArray(manifest.assets) || manifest.assets.length !== expected.length) throw new Error('Asset inventory mismatch')
  const files = []
  for (const [i, asset] of expected.entries()) {
    const actual = manifest.assets[i]
    if (Object.entries(asset).some(([k, v]) => actual[k] !== v)) throw new Error('Unapproved asset mapping')
    const location = path.join(directory, asset.file)
    await noSymlinks(location)
    const body = await readFile(location)
    if (body.length !== actual.bytes || hash(body) !== actual.sha256) throw new Error('Asset checksum mismatch')
    files.push({ ...asset, body })
  }
  return { data, files }
}

export async function assertEmptyDatabase(client) {
  const result = await client.query(`SELECT count(*)::int AS count FROM information_schema.tables
    WHERE table_schema NOT IN ('pg_catalog', 'information_schema')`)
  if (result.rows[0].count !== 0) throw new Error('Refusing import: database is not empty. Create a NEW ihm_local_<suffix> database; do not run local:schema first.')
}

export async function insertContent(client, data) {
  // Local schema only. Defer existing FKs temporarily to support self/cyclic relationships.
  const constraints = await client.query(`SELECT c.conname, t.relname, c.condeferrable, c.condeferred
    FROM pg_constraint c JOIN pg_class t ON t.oid=c.conrelid JOIN pg_namespace n ON n.oid=t.relnamespace
    WHERE c.contype='f' AND n.nspname='public'`)
  for (const c of constraints.rows) await client.query(`ALTER TABLE public.${quote(c.relname)} ALTER CONSTRAINT ${quote(c.conname)} DEFERRABLE INITIALLY DEFERRED`)
  await client.query('SET CONSTRAINTS ALL DEFERRED')
  for (const table of tables) {
    const columns = policy[table].columns
    for (const row of data[table]) {
      await client.query(`INSERT INTO public.${quote(table)} (${columns.map(quote).join(',')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(',')})`,
        columns.map(c => row[c] !== null && typeof row[c] === 'object' ? JSON.stringify(row[c]) : row[c]))
    }
    const serial = await client.query('SELECT pg_get_serial_sequence($1, $2) AS name', [`public.${table}`, 'id'])
    if (serial.rows[0].name) {
      await client.query(`SELECT setval($1::regclass, COALESCE((SELECT max(id) FROM public.${quote(table)}), 1), EXISTS(SELECT 1 FROM public.${quote(table)}))`, [serial.rows[0].name])
    }
  }
  // Check every FK before restoring its original deferral settings.
  await client.query('SET CONSTRAINTS ALL IMMEDIATE')
  for (const c of constraints.rows) await client.query(`ALTER TABLE public.${quote(c.relname)} ALTER CONSTRAINT ${quote(c.conname)} ${c.condeferrable ? `DEFERRABLE INITIALLY ${c.condeferred ? 'DEFERRED' : 'IMMEDIATE'}` : 'NOT DEFERRABLE'}`)
}

async function main() {
  const [directory, approval] = process.argv.slice(2)
  if (!directory || !approval || process.env.LOCAL_DEV !== '1') throw new Error('Use npm run local:kit -- <kit-directory> <reviewed-manifest-sha256>')
  const url = assertLocalDatabase(process.env.DATABASE_URL)
  const { data, files } = await verifyBundle(directory, approval)
  // Preflight all destinations before creating schema or writing anything.
  for (const file of files) {
    file.target = path.resolve('.local-data/uploads', file.table, file.key)
    await noSymlinks(file.target)
    if (await lstat(file.target).catch(error => { if (error.code !== 'ENOENT') throw error; return null })) throw new Error('Refusing to overwrite an existing local upload')
  }
  const pool = new Pool({ connectionString: url.href, max: 1 })
  const client = await pool.connect()
  const written = []
  try {
    const lock = await client.query('SELECT pg_try_advisory_lock(741908213) AS locked')
    if (!lock.rows[0].locked) throw new Error('Another content import is running')
    await assertEmptyDatabase(client)
    const schema = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/local/schema.ts'], {
      stdio: 'inherit', env: { ...process.env, DISABLE_DB_PUSH: '0' },
    })
    if (schema.error || schema.status !== 0) throw new Error('Local schema creation failed; use a new empty database on retry')
    await client.query('BEGIN')
    await insertContent(client, data)
    for (const file of files) {
      await noSymlinks(file.target)
      await mkdir(path.dirname(file.target), { recursive: true, mode: 0o700 })
      await writeFile(file.target, file.body, { flag: 'wx', mode: 0o600 })
      written.push(file.target)
    }
    await client.query('COMMIT')
    console.log('Imported reviewed public content and files. IDs, URLs and object keys retained. Create a new local admin; no accounts were copied.')
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {})
    for (const file of written) await unlink(file)
    throw error
  } finally {
    await client.query('SELECT pg_advisory_unlock(741908213)').catch(() => {})
    client.release()
    await pool.end()
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  main().catch(error => { console.error(error.message); process.exitCode = 1 })
}
