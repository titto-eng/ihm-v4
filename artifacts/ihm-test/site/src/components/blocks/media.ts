import type { Media } from '@/payload-types'

// Payload returns absolute URLs (serverURL); next/image only allows local paths under /api/media/file/**,
// and an absolute http://localhost URL would need a remote pattern. Keep same-origin URLs relative.
// With `trailingSlash: true` Payload builds file URLs like /api/media/file/x.webp/ ; that path answers with a 308, and the image
// optimiser rejects redirects ("isn't a valid image"), so the slash after a file name is dropped.
const fileSlash = (path: string) => path.replace(/(\/api\/media\/file\/[^/?#]+\.[a-z0-9]+)\/(?=$|[?#])/i, '$1')

export const localUrl = (url: string): string => {
  try {
    const u = new URL(url)
    return u.hostname === 'localhost' || u.pathname.startsWith('/api/media/') ? fileSlash(`${u.pathname}${u.search}`) : url
  } catch {
    return fileSlash(url)
  }
}

// Upload relationships arrive as ids (depth 0) or populated docs; only populated docs render.
export const mediaOf = (m: number | Media | null | undefined): Media | null =>
  m && typeof m === 'object' && m.url ? { ...m, url: localUrl(m.url) } : null
