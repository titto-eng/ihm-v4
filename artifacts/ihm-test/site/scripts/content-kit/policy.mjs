import { readFile, lstat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

export const hash = bytes => createHash('sha256').update(bytes).digest('hex')
export const quote = name => `"${name.replaceAll('"', '""')}"`
const snapshotBytes = await readFile(new URL('../../src/migrations/20261101_134838_add_application_files.json', import.meta.url))
// This frozen, reviewed schema is the column allowlist, NOT the current live schema.
if (hash(snapshotBytes) !== '7c464cd6a97ef383a742cb1eac41e403d35dfc52270b7d10b844eb4702aa07e2') throw new Error('Content policy snapshot changed; review the allowlist first')
const snapshot = JSON.parse(snapshotBytes)
export const roots = ['media', 'documents', 'courses', 'posts', 'events', 'testimonials', 'staff', 'categories', 'disciplines', 'levels', 'campuses', 'delivery_modes', 'durations', 'universities']
const children = ['documents_listings', 'courses_sections', 'courses_rels', 'events_texts', 'staff_research', 'staff_grants', 'staff_activities', 'staff_supervision', 'staff_rels']
export const tables = [...roots, ...children]
export const policy = Object.fromEntries(tables.map(name => {
  const definition = snapshot.tables[`public.${name}`]
  const columns = Object.keys(definition.columns).filter(c =>
    !c.startsWith('import_') && !['email', 'enquiry_email', 'notes'].includes(c))
  if (['media', 'documents'].includes(name)) columns.push('_objectkey')
  return [name, { columns, foreignKeys: Object.values(definition.foreignKeys), parent: columns.includes('_parent_id') ? '_parent_id' : children.includes(name) ? 'parent_id' : null }]
}))

export function safePath(value) {
  if (typeof value !== 'string' || !value || /[\\:\0-\x1f%?#]/.test(value) ||
      value.split('/').some(p => !p || p === '.' || p === '..')) throw new Error('Unsafe file key')
  return value
}

export function validatePlan(plan) {
  if (plan.version !== 1 || !['replit-development', 'replit-published-test'].includes(plan.source?.environment) ||
      !plan.source.host || !plan.source.database || !plan.source.bucket ||
      !Number.isInteger(plan.source.port) || plan.source.port < 1 || plan.source.port > 65535 ||
      plan.review?.approved !== true || !plan.review?.reference) throw new Error('A reviewed plan and explicit Replit source identity are required')
  for (const [object, allowed] of [
    [plan, ['version', 'source', 'review', 'ids', 'requiredFiles']],
    [plan.source, ['environment', 'host', 'port', 'database', 'bucket']],
    [plan.review, ['approved', 'reference']],
  ]) if (Object.keys(object).some(key => !allowed.includes(key))) throw new Error('Unexpected plan field; never put credentials in a plan')
  if (Object.keys(plan.ids || {}).sort().join() !== [...roots].sort().join()) throw new Error('Plan must list exactly the allowed root tables')
  for (const ids of Object.values(plan.ids)) {
    if (!Array.isArray(ids) || ids.some(id => !Number.isSafeInteger(id) || id < 1) || new Set(ids).size !== ids.length) throw new Error('Use explicit unique positive record IDs')
  }
  for (const table of ['media', 'documents']) for (const id of plan.ids[table]) {
    if (!plan.requiredFiles?.[`${table}:${id}`]?.trim()) throw new Error('Every public file needs a reviewed reason/reference')
  }
}

export function assertSource(plan, environment) {
  validatePlan(plan)
  const url = new URL(environment.CONTENT_EXPORT_DATABASE_URL || '')
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || url.hostname !== plan.source.host ||
      Number(url.port || 5432) !== plan.source.port ||
      decodeURIComponent(url.pathname.slice(1)) !== plan.source.database ||
      environment.CONTENT_EXPORT_ENVIRONMENT !== plan.source.environment ||
      environment.DEFAULT_OBJECT_STORAGE_BUCKET_ID !== plan.source.bucket ||
      [...url.searchParams.keys()].some(k => k !== 'sslmode')) throw new Error('Source environment, database host/port/name or bucket does not match the reviewed plan')
  return url
}

export async function noSymlinks(filename) {
  const absolute = path.resolve(filename)
  let cursor = path.parse(absolute).root
  for (const part of absolute.slice(cursor.length).split(path.sep)) {
    cursor = path.join(cursor, part)
    const info = await lstat(cursor).catch(error => {
      if (error.code !== 'ENOENT') throw error
      return null
    })
    if (info?.isSymbolicLink()) throw new Error('Symlinks are forbidden in kit and upload paths')
  }
}

export function assetList(data) {
  const assets = []
  for (const table of ['media', 'documents']) for (const row of data[table]) {
    if (!row.filename) throw new Error('Upload has no filename')
    for (const [column, filename] of Object.entries(row)) {
      if (!(column === 'filename' || column.endsWith('_filename')) || !filename) continue
      const key = safePath(`${row._objectkey ? `${safePath(row._objectkey)}/` : ''}${safePath(filename)}`)
      assets.push({ table, id: row.id, key, object: `ihm-test/uploads/${table}/${key}`, file: `assets/${table}/${key}` })
    }
  }
  if (new Set(assets.map(a => a.file)).size !== assets.length) throw new Error('Duplicate asset destination')
  return assets
}

function validateRichRelationships(value, data) {
  if (!value || typeof value !== 'object') {
    if (typeof value === 'string' && /(?:application-files|\/api\/(?:users|alumni|enquiries|payments))(?:\/|$)/i.test(value)) throw new Error('Private content link is not exportable')
    return
  }
  const check = (table, reference) => {
    if (!tables.includes(table)) throw new Error('Private embedded relationship')
    if (reference == null) return
    const id = typeof reference === 'object' ? reference.id : reference
    if (!data[table]?.some(row => String(row.id) === String(id))) throw new Error('Missing or private embedded relationship')
  }
  if (value.relationTo) check(value.relationTo, value.value)
  for (const [key, child] of Object.entries(value)) {
    if (['image', 'images', 'media', 'photo', 'poster', 'logo'].includes(key)) {
      for (const reference of Array.isArray(child) ? child : [child]) check('media', reference)
    }
    validateRichRelationships(child, data)
  }
}

export function validateData(data, plan) {
  validatePlan(plan)
  if (Object.keys(data).sort().join() !== [...tables].sort().join()) throw new Error('Unapproved tables in bundle')
  for (const table of tables) {
    const rule = policy[table]
    if (!Array.isArray(data[table])) throw new Error('Invalid table data')
    const ids = new Set()
    for (const row of data[table]) {
      if (Object.keys(row).sort().join() !== [...rule.columns].sort().join()) throw new Error(`Unapproved/missing columns: ${table}`)
      if (ids.has(String(row.id))) throw new Error('Duplicate record ID')
      ids.add(String(row.id))
      if ('_status' in row && row._status !== 'published') throw new Error(`Unpublished record: ${table}`)
      if ('active' in row && row.active !== true) throw new Error(`Inactive record: ${table}`)
      if (table === 'documents' && row.audience !== 'public') throw new Error('Only public-audience documents are exportable')
      for (const field of ['layout', 'content']) validateRichRelationships(row[field], data)
      for (const fk of rule.foreignKeys) {
        const column = fk.columnsFrom[0]
        if (!(column in row) || row[column] == null) continue
        if (!data[fk.tableTo]?.some(target => String(target[fk.columnsTo[0]]) === String(row[column]))) throw new Error(`Missing relationship: ${table}.${column}`)
      }
    }
    if (roots.includes(table) && [...ids].sort().join() !== plan.ids[table].map(String).sort().join()) throw new Error(`Selected IDs changed: ${table}`)
  }
  assetList(data)
}
