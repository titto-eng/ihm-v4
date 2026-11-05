import type { ImportContext } from '../lib/context'
import { loadMediaMap } from '../lib/context'
import { eventImagePath, loadEvents } from '../lib/data'

// `wp-events`: the old `wp_mwt_events` rows (status = 1) → the `events` collection, upserted by `legacyId`. Text only (the old
// description is plain text; tags are not HTML). Images come from the media map (`media` imports uploads/mwt-events/*).
// The discipline relationship is matched by name to the `disciplines` lookup when one exists; otherwise the text becomes a tag.
// Run: `npm run import -- wp-events [--dry]` after `media` and `lookups`.
export const name = 'wp-events'
export const order = 45

const strip = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+\n/g, '\n').replace(/[ \t]+/g, ' ').trim()
const url = (s: string) => (/^https?:\/\//i.test(s.trim()) ? s.trim() : undefined)

export async function run(ctx: ImportContext) {
  const { payload, report } = ctx
  const events = loadEvents()
  if (!events.length) {
    ctx.log('no events.json in the inventory: run `npm run inventory:wp` first')
    return
  }
  const media = loadMediaMap()
  const { docs: disciplines } = await payload.find({ collection: 'disciplines', limit: 0, pagination: false, depth: 0, overrideAccess: true })
  const disciplineId = (n: string) => disciplines.find((d) => String((d as { name?: string }).name ?? '').toLowerCase() === n.trim().toLowerCase())?.id
  const today = new Date().toISOString().slice(0, 10)
  let withImage = 0

  for (const e of events) {
    if (!ctx.wanted(e.id)) continue
    try {
      const image = media[eventImagePath(e.image)]
      if (image) withImage++
      const discipline = e.discipline ? disciplineId(e.discipline) : undefined
      const tags = [...new Set([...e.tags.map((t) => t.trim()), ...(e.discipline && !discipline ? [e.discipline] : [])].filter(Boolean))]
      const data = {
        title: e.name.trim(),
        // Old event names repeat (the same seminar run many times), so the id keeps each slug unique.
        slug: `${e.name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)}-${e.id}`,
        startsAt: new Date(`${e.date}T00:00:00+10:00`).toISOString(),
        dayLabel: e.day || undefined,
        timeText: e.time || undefined,
        frequency: e.frequency || undefined,
        ...(discipline && { discipline }),
        description: strip(e.description) || undefined,
        speaker: e.speaker || undefined,
        speakerBio: strip(e.speakerBio) || undefined,
        venue: e.venue || undefined,
        hostedBy: e.hostedBy || undefined,
        joinUrl: url(e.link),
        secondaryUrl: url(e.link2),
        ...(image && { image }),
        tags,
        registrationOpen: e.date >= today && Boolean(url(e.link)),
        legacyId: e.id,
        _status: 'published' as const,
      }
      const existing = (await payload.find({ collection: 'events', where: { legacyId: { equals: e.id } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
      if (ctx.dry) {
        if (existing) report.updated++
        else report.created++
        continue
      }
      if (existing) {
        await payload.update({ collection: 'events', id: existing.id, data, ...ctx.opts })
        report.updated++
      } else {
        await payload.create({ collection: 'events', data, ...ctx.opts })
        report.created++
      }
    } catch (err) {
      report.failed.push({ id: e.id, reason: err instanceof Error ? err.message : String(err) })
    }
  }
  return { events: events.length, withImage } as never
}
