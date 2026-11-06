import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, realpath, rm, symlink, writeFile, access } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { localFiles } from '../../src/lib/storage/localFiles'
import { assertLocalDatabase, localEnvironment } from '../../scripts/local/env.mjs'
import { testStorageAdapter } from '../../src/lib/replitStorage'
import type { CollectionConfig, PayloadRequest } from 'payload'

test('database guard accepts only explicitly named loopback databases', () => {
  for (const host of ['localhost', '127.0.0.1', '[::1]']) {
    assert.doesNotThrow(() => assertLocalDatabase(`postgresql://tester@${host}:5433/ihm_local_test`))
  }
  for (const value of [
    undefined, '', 'https://localhost/ihm_local', 'postgres://localhost/ihm',
    'postgres://db.example.com/ihm_local', 'postgres://127.0.0.1.example.com/ihm_local',
    'postgres://localhost/ihm_local?host=example.com', 'postgres://localhost/ihm_local#override',
  ]) assert.throws(() => assertLocalDatabase(value), /local|Refusing/)
})

test('local launcher forces safety controls and only explicit schema mode can push', () => {
  const secrets = Object.fromEntries(['PAYLOAD_SECRET', 'ADMIN_BASIC_PASSWORD', 'REVALIDATE_SECRET', 'CRON_SECRET', 'PREVIEW_SECRET', 'PAYMENTS_DATA_KEY'].map(key => [key, 'test-only-'.repeat(5)]))
  const values = { ...secrets, DATABASE_URL: 'postgres://localhost/ihm_local', DRY_RUN: '0', PORTAL_ENABLED: '1', LOCAL_DEV: '0', ENQUIRY_LIVE_ADAPTERS: 'email', TRACKING_ENABLED: '1', DISABLE_DB_PUSH: '0', PGHOSTADDR: '203.0.113.1' }
  const env = localEnvironment(values)
  assert.equal(env.DRY_RUN, '1')
  assert.equal(env.PORTAL_ENABLED, '0')
  assert.equal(env.LOCAL_DEV, '1')
  assert.equal(env.REPLIT_TEST_SITE, '1')
  assert.equal(env.ENQUIRY_LIVE_ADAPTERS, '')
  assert.equal(env.PAYMENTS_ALLOW_PRODUCTION, '0')
  assert.equal(env.TRACKING_ENABLED, '0')
  assert.equal(env.ENQUIRY_AUTORUN, '0')
  assert.equal(env.NEXT_PUBLIC_ROBOTS, 'noindex')
  assert.equal(env.DISABLE_DB_PUSH, '1')
  assert.equal(Object.hasOwn(env, 'PGHOSTADDR'), false)
  assert.equal(localEnvironment(values, 'schema').DISABLE_DB_PUSH, '0')
  assert.equal(localEnvironment(values, 'build').NODE_ENV, 'production')
  assert.equal(env.ADMIN_BASIC_HASH.length, 64)
  assert.throws(() => localEnvironment({ ...values, PAYLOAD_SECRET: '' }), /PAYLOAD_SECRET/)
})

test('local files support keyed upload, download, HEAD, replacement and deletion', async () => {
  const root = await mkdtemp(path.join(await realpath(tmpdir()), 'ihm-files-'))
  const files = localFiles(root)
  try {
    await files.save('documents', 'key/policy.pdf', Buffer.from('%PDF-test'), 'application/pdf')
    let response = await files.serve('documents', 'key/policy.pdf')
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('content-type'), 'application/pdf')
    assert.equal(await response.text(), '%PDF-test')
    response = await files.serve('documents', 'key/policy.pdf', true)
    assert.equal(response.headers.get('content-length'), '9')
    assert.equal(await response.text(), '')
    await files.save('documents', 'key/policy.pdf', Buffer.from('replacement'), 'application/pdf')
    assert.equal(await (await files.serve('documents', 'key/policy.pdf')).text(), 'replacement')
    await files.save('application-files', 'private.pdf', Buffer.from('private'), 'application/pdf')
    const privateResponse = await files.serve('application-files', 'private.pdf', true)
    assert.equal(privateResponse.headers.get('cache-control'), 'private, no-store')
    await files.delete('documents', 'key/policy.pdf')
    await files.delete('documents', 'key/policy.pdf')
    assert.equal((await files.serve('documents', 'key/policy.pdf')).status, 404)
  } finally { await rm(root, { recursive: true, force: true }) }
})

test('local files reject traversal and symlinks', async () => {
  const root = await mkdtemp(path.join(await realpath(tmpdir()), 'ihm-paths-'))
  const files = localFiles(root)
  try {
    for (const key of ['../secret', '/absolute', 'x/../secret', 'x\\secret', 'x//secret', 'C:/secret', 'x\0.pdf']) {
      await assert.rejects(files.save('media', key, Buffer.from('bad'), 'text/plain'), /Invalid/)
    }
    await assert.rejects(files.serve('users', 'secret'), /Invalid/)
    await mkdir(path.join(root, 'uploads/media'), { recursive: true })
    await symlink(root, path.join(root, 'uploads/media/link'), 'dir')
    await assert.rejects(files.save('media', 'link/secret', Buffer.from('bad'), 'text/plain'), /Symlinks/)
  } finally { await rm(root, { recursive: true, force: true }) }
})

test('private adapter rejects anonymous and non-admin access before reading storage', async () => {
  const adapter = testStorageAdapter({ collection: { slug: 'application-files' } as CollectionConfig })!
  for (const user of [null, { collection: 'users', roles: ['viewer'] }, { collection: 'alumni', roles: ['admin'] }]) {
    const response = await adapter.staticHandler({ user, method: 'GET' } as PayloadRequest, {
      params: { collection: 'application-files', filename: 'secret.pdf' },
    })
    assert.equal(response.status, 403)
    assert.equal(response.headers.get('cache-control'), 'private, no-store')
  }
})

test('Replit launcher explicitly disables local disk storage', async () => {
  const source = await readFile(new URL('../../scripts/replit-run.mjs', import.meta.url), 'utf8')
  assert.match(source, /LOCAL_DEV:\s*'0'/)
})

test('asset import preserves public paths and excludes private application files', async () => {
  const root = await mkdtemp(path.join(await realpath(tmpdir()), 'ihm-assets-'))
  try {
    for (const directory of ['source/images', 'source/brand', 'static/pdf', 'media/documents', 'media/application-files']) {
      await mkdir(path.join(root, directory), { recursive: true })
    }
    for (const filename of ['source/images/home.png', 'static/pdf/policy.pdf', 'media/photo.png', 'media/documents/policy.pdf', 'media/application-files/private.pdf']) {
      await writeFile(path.join(root, filename), 'fixture')
    }
    const script = fileURLToPath(new URL('../../scripts/local/assets.mjs', import.meta.url))
    const result = spawnSync(process.execPath, [script, path.join(root, 'source'), path.join(root, 'static'), path.join(root, 'media')], { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
    for (const filename of ['public/images/home.png', 'public/pdf/policy.pdf', '.local-data/uploads/media/photo.png', '.local-data/uploads/documents/policy.pdf']) {
      assert.equal(await readFile(path.join(root, filename), 'utf8'), 'fixture')
    }
    await assert.rejects(access(path.join(root, '.local-data/uploads/application-files/private.pdf')))
    const wrongSource = spawnSync(process.execPath, [script, root, path.join(root, 'static'), path.join(root, 'media')], { cwd: root, encoding: 'utf8' })
    assert.notEqual(wrongSource.status, 0)
  } finally { await rm(root, { recursive: true, force: true }) }
})
