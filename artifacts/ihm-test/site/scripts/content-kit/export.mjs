import { Pool } from 'pg'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { hash, quote, tables, policy, assertSource, validateData, assetList, noSymlinks } from './policy.mjs'

// No Payload initialization, hooks, schema push, jobs, migrations or cloud writes.
export async function readContent(client, plan) {
  const data = {}
  for (const table of tables) {
    const rule = policy[table]
    const parentTable = rule.parent ? table.split('_')[0] : null
    const ids = plan.ids[parentTable || table]
    const result = await client.query(
      `SELECT row_to_json(kit_row.*) AS row FROM (SELECT ${rule.columns.map(quote).join(',')} FROM public.${quote(table)} WHERE ${quote(rule.parent || 'id')}::text = ANY($1::text[]) ORDER BY id) kit_row`,
      [ids.map(String)])
    data[table] = result.rows.map(r => r.row)
  }
  validateData(data, plan)
  return data
}

async function main() {
  const [planFile, approval, name] = process.argv.slice(2)
  if (!planFile || !approval || !/^[a-z0-9][a-z0-9-]*$/.test(name || '')) throw new Error('Usage: node scripts/content-kit/export.mjs plan.json <reviewed-plan-sha256> <bundle-name>')
  const bytes = await readFile(planFile)
  if (hash(bytes) !== approval) throw new Error('Plan approval hash does not match')
  const plan = JSON.parse(bytes)
  const url = assertSource(plan, process.env)
  const pool = new Pool({ connectionString: url.href, options: '-c default_transaction_read_only=on', max: 1 })
  let client
  try {
    client = await pool.connect()
    await client.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY')
    await client.query("SET LOCAL statement_timeout = '60s'")
    const identity = await client.query('SELECT current_database() AS name, current_setting(\'transaction_read_only\') AS readonly')
    if (identity.rows[0].name !== plan.source.database || identity.rows[0].readonly !== 'on') throw new Error('Source identity/read-only check failed')
    const data = await readContent(client, plan)
    const assets = assetList(data)
    const output = path.resolve('.local-data/content-kits', name)
    await noSymlinks(output)
    await mkdir(path.dirname(output), { recursive: true, mode: 0o700 })
    await mkdir(output, { mode: 0o700 }) // Never overwrite a prior kit.
    const { bucket } = await import('../replit-storage.mjs')
    for (const asset of assets) {
      const file = bucket().file(asset.object)
      const [before] = await file.getMetadata()
      // Pin a generation: replacement during export fails instead of mixing versions.
      const [body] = await bucket().file(asset.object, { generation: before.generation }).download({ validation: 'crc32c' })
      asset.sha256 = hash(body)
      asset.bytes = body.length
      asset.generation = before.generation
      const target = path.join(output, asset.file)
      await mkdir(path.dirname(target), { recursive: true, mode: 0o700 })
      await writeFile(target, body, { flag: 'wx', mode: 0o600 })
    }
    // Detect replacements during the export as well as corrupted downloads.
    for (const asset of assets) {
      const [current] = await bucket().file(asset.object).getMetadata()
      if (current.generation !== asset.generation) throw new Error('Asset changed during export; start a new export')
    }
    await client.query('COMMIT')
    const content = Buffer.from(JSON.stringify(data))
    await writeFile(path.join(output, 'content.json'), content, { flag: 'wx', mode: 0o600 })
    const manifest = Buffer.from(JSON.stringify({ version: 1, createdAt: new Date().toISOString(), plan, planHash: approval, contentHash: hash(content), assets }, null, 2))
    // Written last; an interrupted export has no valid manifest.
    await writeFile(path.join(output, 'manifest.json'), manifest, { flag: 'wx', mode: 0o600 })
    console.log(`Created ${output}\nManifest SHA-256: ${hash(manifest)}\nReview content and files before approving this digest for local import.`)
  } finally {
    if (client) { await client.query('ROLLBACK').catch(() => {}); client.release() }
    await pool.end()
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  main().catch(() => { console.error('Content export failed. Check the reviewed plan, source access, schema and public file availability. No source writes were made.'); process.exitCode = 1 })
}
