// Builds the import inventory (`../inventory/data/ihm/*.json`, `../inventory/v2/ihm/{pages,html-analysis}.csv`) straight
// from the WordPress MySQL database, so `npm run import -- <step>` works without the old REST crawl (30-import §6).
//
//   npm run inventory:wp -- --db=ihmv3 [--host=127.0.0.1] [--port=3306] [--user=root] [--password=]
//                            [--prefix=wp_] [--site=https://ihm.edu.au] [--out=.data/inventory]
//
// Read-only: one SELECT per table, no writes to WordPress. Only published pages, posts and courses are exported, and only
// their public fields (title, slug, dates, template, body). No users, comments, form entries or other personal data (rule 4).
// The theme disables wpautop on every post type (functions.php `disable_wp_auto_p`), so `post_content` is what visitors saw,
// apart from shortcodes, which the extractor recognises in their literal form (30-import §7.3).
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import mysql from 'mysql2/promise'
import { staffPaths } from '../../src/content/staff-paths'
import { ROOT } from './lib/config'

const arg = (k: string, d = '') => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d
const site = arg('site', 'https://ihm.edu.au').replace(/\/$/, '')
const prefix = arg('prefix', 'wp_')
const out = resolve(ROOT, arg('out', '.data/inventory'))
/** Published by mistake (keyboard mash slug); never a live URL. */
const SKIP_SLUGS = new Set(['jrfdklhfdhfjhdjfhdkjhfjsklhfkjdlsbhfjkbdsfkljdshnfds'])

type Row = {
  ID: number; post_parent: number; post_name: string; post_title: string; post_type: string; post_date: Date | string; post_modified: Date | string
  post_content: string; post_excerpt: string; menu_order: number; template: string | null; category: string | null; featured: string | null
}

const iso = (d: Date | string) => (d instanceof Date ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19) : String(d).replace(' ', 'T'))
const csvCell = (v: unknown) => { const s = String(v ?? ''); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s }
const csv = (rows: Record<string, unknown>[], cols: string[]) => [cols.join(','), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(','))].join('\n') + '\n'

const db = await mysql.createConnection({
  host: arg('host', '127.0.0.1'), port: Number(arg('port', '3306')), user: arg('user', 'root'), password: arg('password', ''), database: arg('db'),
  charset: 'utf8mb4', dateStrings: true,
})
const [rows] = await db.query(`
  SELECT p.ID, p.post_parent, p.post_name, p.post_title, p.post_type, p.post_date, p.post_modified, p.post_content, p.post_excerpt, p.menu_order,
         (SELECT meta_value FROM ${prefix}postmeta m WHERE m.post_id = p.ID AND m.meta_key = '_wp_page_template' LIMIT 1) AS template,
         (SELECT t.slug FROM ${prefix}term_relationships r JOIN ${prefix}term_taxonomy tt ON tt.term_taxonomy_id = r.term_taxonomy_id AND tt.taxonomy = 'category'
            JOIN ${prefix}terms t ON t.term_id = tt.term_id WHERE r.object_id = p.ID ORDER BY tt.term_taxonomy_id LIMIT 1) AS category,
         (SELECT f.meta_value FROM ${prefix}postmeta th JOIN ${prefix}postmeta f ON f.post_id = th.meta_value AND f.meta_key = '_wp_attached_file'
            WHERE th.post_id = p.ID AND th.meta_key = '_thumbnail_id' LIMIT 1) AS featured
  FROM ${prefix}posts p
  WHERE p.post_status = 'publish' AND p.post_type IN ('page', 'post', 'courses')
  ORDER BY p.post_type, p.ID`) as unknown as [Row[]]
// Events (old wp_mwt_events + wp_mwt_event_tags; theme template-events-and-news.php). Optional: older dumps lack the tables.
let events: Record<string, unknown>[] = []
try {
  const [ev] = (await db.query(`
    SELECT e.id, e.event_name AS name, DATE_FORMAT(e.event_date, '%Y-%m-%d') AS date, e.event_day AS day, IFNULL(e.event_time, '') AS time,
           e.event_frequency AS frequency, e.event_discipline AS discipline, e.hosted_by AS hostedBy, e.event_description AS description,
           e.handled_by AS speaker, e.handler_description AS speakerBio, e.venue, e.event_link AS link, e.eventd_link AS link2, TRIM(e.image) AS image,
           (SELECT GROUP_CONCAT(DISTINCT TRIM(t.event_tags) SEPARATOR '|') FROM ${prefix}mwt_event_tags t WHERE t.event_id = e.id) AS tags
    FROM ${prefix}mwt_events e WHERE e.status = 1 ORDER BY e.event_date DESC`)) as unknown as [Record<string, unknown>[]]
  events = ev.map((r) => ({ ...Object.fromEntries(Object.entries(r).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])), tags: String(r.tags ?? '').split('|').filter(Boolean) }))
} catch {
  console.log('  (no wp_mwt_events table: events.json not written)')
}
await db.end()

const pages = rows.filter((r) => r.post_type === 'page')
const byId = new Map(pages.map((p) => [p.ID, p]))
const pagePath = (p: Row): string => {
  const parts = [p.post_name]
  let parent = byId.get(p.post_parent)
  while (parent) { parts.unshift(parent.post_name); parent = byId.get(parent.post_parent) }
  return `/${parts.join('/')}/`
}
const pathOf = (r: Row) =>
  r.post_type === 'page' ? pagePath(r) : r.post_type === 'courses' ? `/courses/${r.post_name}/` : `/${r.category || 'blog'}/${r.post_name}/`

const items = rows.filter((r) => !SKIP_SLUGS.has(r.post_name)).map((r) => {
  const path = pathOf(r)
  return {
    row: r,
    path,
    item: {
      id: r.ID, date: iso(r.post_date), modified: iso(r.post_modified), slug: r.post_name, type: r.post_type, link: `${site}${path}`,
      title: { rendered: r.post_title }, parent: r.post_parent, menu_order: r.menu_order, template: r.template && r.template !== 'default' ? r.template : '',
      content: r.post_content ?? '', excerpt: r.post_excerpt ?? '',
      /** The WordPress featured image (`_thumbnail_id`), as a site path. */
      featured_media: r.featured ? `/wp-content/uploads/${r.featured}` : '',
    },
  }
})

const json = (file: string, data: unknown) => { const f = resolve(out, 'data/ihm', file); mkdirSync(resolve(f, '..'), { recursive: true }); writeFileSync(f, JSON.stringify(data)); return f }
const pick = (t: string) => items.filter((i) => i.row.post_type === t).map((i) => i.item)
json('pages.json', pick('page'))
json('posts.json', pick('post'))
json('courses.json', pick('courses'))
if (events.length) json('events.json', events)

const pageRows = items.map(({ row, path, item }) => {
  const staff = row.post_type === 'page' && path in staffPaths
  const parentPath = row.post_type === 'page' && byId.get(row.post_parent) ? pagePath(byId.get(row.post_parent)!) : ''
  return {
    url: item.link, path, title: row.post_title, wp_type: row.post_type, wp_id: row.ID, parent_path: parentPath, template: item.template,
    suggested_page_type: staff ? 'staff-profile' : row.post_type === 'courses' ? 'course' : row.post_type === 'post' ? 'post' : 'page',
    in_sitemap: 'yes', payload_collection: staff ? 'staff' : row.post_type === 'courses' ? 'courses' : row.post_type === 'post' ? 'posts' : '', notes: 'wp-db-inventory',
  }
})
const v2 = resolve(out, 'v2/ihm')
mkdirSync(v2, { recursive: true })
writeFileSync(resolve(v2, 'pages.csv'), csv(pageRows, ['url', 'path', 'title', 'wp_type', 'wp_id', 'parent_path', 'template', 'suggested_page_type', 'in_sitemap', 'payload_collection', 'notes']))
writeFileSync(resolve(v2, 'html-analysis.csv'), csv(items.map((i) => ({ wp_id: i.row.ID, class: 'B' })), ['wp_id', 'class']))

const count = (t: string) => items.filter((i) => i.row.post_type === t).length
console.log(`inventory written to ${out}`)
console.log(`  events ${events.length}`)
console.log(`  pages ${count('page')} (staff profiles ${pageRows.filter((r) => r.suggested_page_type === 'staff-profile').length}), posts ${count('post')}, courses ${count('courses')}`)
