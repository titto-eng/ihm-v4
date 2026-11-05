import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'csv-parse/sync'
import { INVENTORY_DIR } from './config'

// Inventory loaders. Big files are read by code only and never printed (AGENTS.md).
export type WpItem = {
  id: number
  date: string
  modified: string
  slug: string
  type: string
  link: string
  title: { rendered: string }
  parent?: number
  menu_order?: number
  template?: string
  content: string | null
  content_error?: string | number
  excerpt?: string
  /** Featured image as a site path (`/wp-content/uploads/...`), from wp-db-inventory. */
  featured_media?: string
}
export type PageRow = Record<'url' | 'path' | 'title' | 'wp_type' | 'wp_id' | 'parent_path' | 'template' | 'suggested_page_type' | 'in_sitemap' | 'payload_collection' | 'notes', string>
export type AnalysisRow = Record<string, string> & { wp_id: string; class: string }

const json = <T>(file: string): T => JSON.parse(readFileSync(resolve(INVENTORY_DIR, 'data/ihm', file), 'utf8')) as T
const csv = <T>(file: string): T[] => parse(readFileSync(resolve(INVENTORY_DIR, 'v2/ihm', file), 'utf8'), { columns: true, skip_empty_lines: true, relax_column_count: true }) as T[]

export const loadPages = () => json<WpItem[]>('pages.json')
export const loadPosts = () => json<WpItem[]>('posts.json')
export const loadCourses = () => json<WpItem[]>('courses.json')
/** One row of the old `wp_mwt_events` table (status = 1), with its `wp_mwt_event_tags`. Exported by wp-db-inventory.ts. */
export type WpEvent = {
  id: number; name: string; date: string; day: string; time: string; frequency: string; discipline: string; hostedBy: string; description: string
  speaker: string; speakerBio: string; venue: string; link: string; link2: string; image: string; tags: string[]
}
export const loadEvents = (): WpEvent[] => (existsSync(resolve(INVENTORY_DIR, 'data/ihm', 'events.json')) ? json<WpEvent[]>('events.json') : [])
/** The old theme served event images from wp-content/uploads/mwt-events/<file>. */
export const eventImagePath = (file: string) => (file ? `wp-content/uploads/mwt-events/${file.trim()}` : '')
export const loadPageRows = () => csv<PageRow>('pages.csv')
export const loadAnalysis = () => csv<AnalysisRow>('html-analysis.csv')

export const pathOf = (link: string): string => {
  const p = new URL(link).pathname
  return p.endsWith('/') ? p : `${p}/`
}

/** Decodes the few HTML entities WordPress leaves in `title.rendered`. */
export const decodeTitle = (s: string): string =>
  s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .trim()
