import { createReadStream } from 'node:fs'
import { lstat, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'

const collections = new Set(['media', 'documents', 'application-files'])
const types: Record<string, string> = {
  '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.avif': 'image/avif',
  '.doc': 'application/msword', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

/** Private development files live outside public/. The Payload handler still owns authorization. */
export function localFiles(root = path.resolve('.local-data')) {
  async function location(area: string, collection: string, key: string) {
    if (!collections.has(collection) || !key || key.includes('\\') || key.includes('\0') ||
      key.split('/').some(part => !part || part === '.' || part === '..' || part.includes(':'))) {
      throw new Error('Invalid local storage path')
    }
    const filename = path.resolve(root, area, collection, key)
    // Reject existing symlinks, including a linked root; never escape into another directory.
    const parts = filename.split(path.sep)
    let cursor = path.parse(filename).root
    for (const part of parts.slice(1)) {
      cursor = path.join(cursor, part)
      const info = await lstat(cursor).catch((error: NodeJS.ErrnoException) => {
        if (error.code !== 'ENOENT') throw error
        return null
      })
      if (info?.isSymbolicLink()) throw new Error('Symlinks are not permitted in local storage')
    }
    return filename
  }
  return {
    async save(collection: string, key: string, bytes: Buffer, contentType: string) {
      const file = await location('uploads', collection, key)
      const metadata = await location('metadata', collection, `${key}.json`)
      await mkdir(path.dirname(file), { recursive: true })
      await mkdir(path.dirname(metadata), { recursive: true })
      await writeFile(file, bytes, { mode: 0o600 })
      await writeFile(metadata, JSON.stringify({ contentType }), { mode: 0o600 })
    },
    async delete(collection: string, key: string) {
      await rm(await location('uploads', collection, key), { force: true })
      await rm(await location('metadata', collection, `${key}.json`), { force: true })
    },
    async serve(collection: string, key: string, head = false) {
      const file = await location('uploads', collection, key)
      try {
        const info = await stat(file)
        if (!info.isFile()) return new Response('Not found', { status: 404 })
        const metadata = await readFile(await location('metadata', collection, `${key}.json`), 'utf8')
          .then(value => JSON.parse(value) as { contentType: string })
          .catch((error: NodeJS.ErrnoException) => {
            if (error.code !== 'ENOENT') throw error
            return { contentType: types[path.extname(file).toLowerCase()] || 'application/octet-stream' }
          })
        return new Response(head ? null : Readable.toWeb(createReadStream(file)) as ReadableStream, {
          headers: {
            'Content-Type': metadata.contentType, 'Content-Length': String(info.size),
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': collection === 'application-files' ? 'private, no-store' : 'public, max-age=0, must-revalidate',
          },
        })
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return new Response('Not found', { status: 404 })
        throw error
      }
    },
  }
}
