import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { Pool } from 'pg'
import { hash, roots, tables, policy, validatePlan, validateData, assetList, safePath, quote, assertSource } from '../../scripts/content-kit/policy.mjs'
import { verifyBundle, assertEmptyDatabase, insertContent } from '../../scripts/content-kit/import.mjs'
import { readContent } from '../../scripts/content-kit/export.mjs'

const empty = () => Object.fromEntries(tables.map(t => [t, []]))
const plan = () => ({
  version: 1,
  source: { environment: 'replit-development', host: 'confirmed.example', port: 5432, database: 'test', bucket: 'test' },
  review: { approved: true, reference: 'synthetic test approval' },
  ids: Object.fromEntries(roots.map(t => [t, []])),
  requiredFiles: {},
})
function row(table, values) {
  return { ...Object.fromEntries(policy[table].columns.map(c => [c, null])), ...values }
}
function fixture() {
  const data = empty(), approval = plan()
  data.media.push(row('media', { id: 42, filename: 'image.png', _objectkey: 'original/key', url: '/api/media/file/image.png', sizes_thumb_filename: 'thumb.png' }))
  data.categories.push(row('categories', { id: 10, name: 'Public school', active: true, image_id: 42 }))
  data.courses.push(row('courses', { id: 17, title: 'Public course', slug: 'course', path: '/courses/course/', _status: 'published', school_id: 10, hero_image_id: 42 }))
  data.courses_sections.push(row('courses_sections', { id: 'section-one', _parent_id: 17, _order: 1, layout: [{ blockType: 'hero', image: 42 }] }))
  approval.ids.media = [42]
  approval.ids.categories = [10]
  approval.ids.courses = [17]
  approval.requiredFiles['media:42'] = 'Course 17 hero'
  return { data, approval }
}
async function temporary() {
  await mkdir('.local-data/content-kit-tests', { recursive: true })
  return mkdtemp(path.resolve('.local-data/content-kit-tests/run-'))
}

test('only named public tables and pinned columns are allowed', () => {
  const { data, approval } = fixture()
  validateData(data, approval)
  for (const name of ['users', 'users_sessions', 'alumni', 'payments', 'enquiries', 'application_files', '_courses_v', 'payload_jobs']) assert.ok(!tables.includes(name))
  for (const rule of Object.values(policy)) {
    assert.ok(!rule.columns.some(c => ['email', 'enquiry_email', 'notes'].includes(c) || c.startsWith('import_')))
  }
  data.users = [{ password: 'must-not-export' }]
  assert.throws(() => validateData(data, approval), /tables/)
  delete data.users
  data.courses[0].import_reviewed_by = 'private'
  assert.throws(() => validateData(data, approval), /columns/)
})

test('approval is explicit and every upload needs a public-content reason', () => {
  const p = plan()
  p.review.approved = false
  assert.throws(() => validatePlan(p), /reviewed/)
  p.review.approved = true
  p.ids.media = [1]
  assert.throws(() => validatePlan(p), /reason/)
  p.ids.media = ['*']
  assert.throws(() => validatePlan(p), /IDs/)
  p.ids.media = []
  p.ids.users = [1]
  assert.throws(() => validatePlan(p), /root tables/)
})

test('source confirmation binds environment, host, port, database and bucket before connecting', () => {
  const p = plan()
  const environment = {
    CONTENT_EXPORT_DATABASE_URL: 'postgresql://confirmed.example/test',
    CONTENT_EXPORT_ENVIRONMENT: 'replit-development',
    DEFAULT_OBJECT_STORAGE_BUCKET_ID: 'test',
  }
  assertSource(p, environment)
  for (const change of [
    { CONTENT_EXPORT_DATABASE_URL: 'postgresql://wrong.example/test' },
    { CONTENT_EXPORT_DATABASE_URL: 'postgresql://confirmed.example:5433/test' },
    { CONTENT_EXPORT_DATABASE_URL: 'postgresql://confirmed.example/wrong' },
    { CONTENT_EXPORT_DATABASE_URL: 'postgresql://confirmed.example/test?options=unsafe' },
    { CONTENT_EXPORT_ENVIRONMENT: 'replit-published-test' },
    { DEFAULT_OBJECT_STORAGE_BUCKET_ID: 'wrong' },
  ]) assert.throws(() => assertSource(p, { ...environment, ...change }), /does not match/)
  p.source.password = 'should not enter bundle'
  assert.throws(() => validatePlan(p), /Unexpected/)
})

test('rejects drafts, inactive content, restricted documents and missing relationships', () => {
  for (const change of [
    d => { d.courses[0]._status = 'draft' },
    d => { d.categories[0].active = false },
    d => { d.courses[0].hero_image_id = 999 },
    d => { d.courses_sections[0].layout[0].image = 999 },
    d => { d.courses_sections[0].layout = [{ relationTo: 'application-files', value: 1 }] },
  ]) {
    const { data, approval } = fixture()
    change(data)
    assert.throws(() => validateData(data, approval))
  }
  const { data, approval } = fixture()
  data.documents = [row('documents', { id: 8, audience: 'staff', filename: 'policy.pdf' })]
  approval.ids.documents = [8]
  approval.requiredFiles['documents:8'] = 'not sufficient to override audience'
  assert.throws(() => validateData(data, approval), /public-audience/)
})

test('preserves IDs, URLs, keys and all generated image sizes', () => {
  const { data, approval } = fixture()
  const before = JSON.stringify(data)
  validateData(data, approval)
  assert.equal(JSON.stringify(data), before)
  assert.deepEqual(assetList(data).map(a => a.object), [
    'ihm-test/uploads/media/original/key/image.png',
    'ihm-test/uploads/media/original/key/thumb.png',
  ])
  for (const value of ['../x', '/x', 'a/../x', 'a\\x', 'a%2fx', 'a//x', 'a\0x', 'C:/x']) assert.throws(() => safePath(value))
})

test('verifies trusted manifest, content and every asset; rejects symlinks', async () => {
  const dir = await temporary()
  try {
    const { data, approval } = fixture()
    const assets = assetList(data)
    const body = Buffer.from('synthetic public image bytes')
    for (const asset of assets) {
      await mkdir(path.dirname(path.join(dir, asset.file)), { recursive: true })
      await writeFile(path.join(dir, asset.file), body)
      asset.bytes = body.length
      asset.sha256 = hash(body)
    }
    const content = JSON.stringify(data)
    const manifest = JSON.stringify({ version: 1, plan: approval, contentHash: hash(content), assets })
    await writeFile(path.join(dir, 'content.json'), content)
    await writeFile(path.join(dir, 'manifest.json'), manifest)
    assert.equal((await verifyBundle(dir, hash(manifest))).files.length, 2)
    await assert.rejects(verifyBundle(dir, 'unapproved'), /digest/)
    await writeFile(path.join(dir, 'content.json'), `${content} `)
    await assert.rejects(verifyBundle(dir, hash(manifest)), /Content checksum/)
    await writeFile(path.join(dir, 'content.json'), content)
    const assetPath = path.join(dir, assets[0].file)
    await writeFile(assetPath, 'corrupt')
    await assert.rejects(verifyBundle(dir, hash(manifest)), /Asset checksum/)
    await rm(assetPath)
    await symlink(path.join(dir, 'content.json'), assetPath)
    await assert.rejects(verifyBundle(dir, hash(manifest)), /Symlinks/)
  } finally { await rm(dir, { recursive: true, force: true }) }
})

test('non-empty databases, including schema-only databases, are refused', async () => {
  await assert.rejects(assertEmptyDatabase({ query: async () => ({ rows: [{ count: 1 }] }) }), /not empty/)
  await assertEmptyDatabase({ query: async () => ({ rows: [{ count: 0 }] }) })
})

test('real PostgreSQL: read-only export, private sentinels, round trip and sequences', { timeout: 120000 }, async t => {
  if (spawnSync('initdb', ['--version']).status !== 0) return t.skip('PostgreSQL initdb is required for the isolated integration fixture')
  // Unix-domain socket paths have a small OS limit; workspace paths can exceed it.
  const directory = await mkdtemp('/tmp/ihm-kit-')
  const cluster = path.join(directory, 'pg')
  const socket = path.join(directory, 'socket')
  await mkdir(socket)
  const run = (cmd, args) => {
    const result = spawnSync(cmd, args, { encoding: 'utf8' })
    assert.equal(result.status, 0, `${cmd}: ${result.stderr}`)
  }
  let source, target, client
  try {
    run('initdb', ['-D', cluster, '-A', 'trust', '-U', 'kit_test', '--no-locale'])
    run('pg_ctl', ['-D', cluster, '-l', path.join(directory, 'postgres.log'), '-o', `-h '' -k ${socket}`, '-w', 'start'])
    source = new Pool({ host: socket, user: 'kit_test', database: 'postgres', max: 1 })
    await assertEmptyDatabase(source)
    const snapshot = JSON.parse(await readFile(new URL('../../src/migrations/20261101_134838_add_application_files.json', import.meta.url)))
    async function schema(db) {
      for (const definition of Object.values(snapshot.enums)) {
        await db.query(`CREATE TYPE ${quote(definition.name)} AS ENUM (${definition.values.map(v => `'${v.replaceAll("'", "''")}'`).join(',')})`)
      }
      for (const table of tables) {
        const columns = snapshot.tables[`public.${table}`].columns
        await db.query(`CREATE TABLE ${quote(table)} (${policy[table].columns.map(c => `${quote(c)} ${c === '_objectkey' ? 'varchar' : columns[c].type}${c === 'id' ? ' PRIMARY KEY' : ''}`).join(',')})`)
      }
      for (const table of tables) for (const fk of policy[table].foreignKeys) {
        if (!policy[table].columns.includes(fk.columnsFrom[0])) continue
        await db.query(`ALTER TABLE ${quote(table)} ADD CONSTRAINT ${quote(fk.name)} FOREIGN KEY (${fk.columnsFrom.map(quote)}) REFERENCES ${quote(fk.tableTo)} (${fk.columnsTo.map(quote)})`)
      }
    }
    await schema(source)
    await source.query('CREATE TABLE users (id serial, password text)')
    await source.query("INSERT INTO users(password) VALUES ('PRIVATE-SENTINEL')")
    const { data, approval } = fixture()
    client = await source.connect()
    await client.query('BEGIN')
    await insertContent(client, data)
    await client.query('COMMIT')
    await assert.rejects(assertEmptyDatabase(client), /not empty/)
    await client.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY')
    const exported = await readContent(client, approval)
    assert.equal(JSON.stringify(exported).includes('PRIVATE-SENTINEL'), false)
    assert.deepEqual(exported.courses_sections[0].layout, data.courses_sections[0].layout)
    await assert.rejects(client.query("INSERT INTO users(password) VALUES ('forbidden')"), /read-only/)
    await client.query('ROLLBACK')
    client.release(); client = null
    await source.query('CREATE DATABASE kit_target')
    target = new Pool({ host: socket, user: 'kit_test', database: 'kit_target', max: 1 })
    await assertEmptyDatabase(target)
    await schema(target)
    client = await target.connect()
    await client.query('BEGIN')
    await insertContent(client, exported)
    await client.query('COMMIT')
    assert.equal((await client.query('SELECT path FROM courses WHERE id=17')).rows[0].path, '/courses/course/')
    assert.equal((await client.query('INSERT INTO media DEFAULT VALUES RETURNING id')).rows[0].id, 43)
    assert.equal((await client.query('SELECT _objectkey FROM media WHERE id=42')).rows[0]._objectkey, 'original/key')
    client.release(); client = null
  } finally {
    client?.release()
    await source?.end()
    await target?.end()
    spawnSync('pg_ctl', ['-D', cluster, '-m', 'immediate', '-w', 'stop'])
    await rm(directory, { recursive: true, force: true })
  }
})
