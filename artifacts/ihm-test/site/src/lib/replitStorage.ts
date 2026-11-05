import { Storage } from '@google-cloud/storage'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import { Readable } from 'node:stream'

const storage = new Storage({
  credentials: {
    audience: 'replit', subject_token_type: 'access_token',
    token_url: 'http://127.0.0.1:1106/token', type: 'external_account',
    credential_source: { url: 'http://127.0.0.1:1106/credential', format: { type: 'json', subject_token_field_name: 'access_token' } },
    universe_domain: 'googleapis.com',
  },
  projectId: '',
})
function object(collection: string, filename: string) {
  if (!filename || filename.split('/').some(p => !p || p === '..' || p === '.') || filename.includes('\\')) throw new Error('Invalid storage path')
  const bucket = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID
  if (!bucket) throw new Error('App Storage is required')
  return storage.bucket(bucket).file(`ihm-test/uploads/${collection}/${filename}`)
}
export async function storedFile(collection: string, filename: string, head = false) {
  const file = object(collection, filename)
  try {
    const [meta] = await file.getMetadata()
    return new Response(head ? null : Readable.toWeb(file.createReadStream()) as ReadableStream, {
      headers: {
        'Content-Type': meta.contentType || 'application/octet-stream',
        'Content-Length': String(meta.size),
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': collection === 'application-files' ? 'private, no-store' : 'public, max-age=0, must-revalidate',
      },
    })
  } catch (error) {
    if ((error as {code?: number}).code === 404) return new Response('Not found', { status: 404 })
    throw error
  }
}
const adapter: Adapter = ({ collection }) => ({
  name: 'replit-app-storage',
  handleUpload: async ({ file, storageFilePath }) => {
    await object(collection.slug, storageFilePath).save(file.buffer, { resumable: false, contentType: file.mimeType })
  },
  handleDelete: async ({ storageFilePath }) => { await object(collection.slug, storageFilePath).delete({ ignoreNotFound: true }) },
  staticHandler: async (req, { params, doc }) => {
    if (collection.slug === 'application-files' && (req.user?.collection !== 'users' || !req.user.roles?.includes('admin'))) {
      return new Response('Forbidden', { status: 403, headers: { 'Cache-Control': 'private, no-store' } })
    }
    // Payload enforces collection read access before invoking its upload handlers.
    const objectKey = (doc as { _objectKey?: string } | undefined)?._objectKey
    const key = objectKey ? `${objectKey}/${params.filename}` : params.filename
    return storedFile(collection.slug, key, req.method === 'HEAD')
  },
})
export const replitStorage = cloudStoragePlugin({
  collections: {
    media: { adapter },
    documents: { adapter },
    'application-files': { adapter },
  },
})
