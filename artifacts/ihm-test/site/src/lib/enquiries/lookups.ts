import type { Payload } from 'payload'
import { enquiryRouting } from '@/content/enquiry-routing'
import { formByKey } from '@/content/forms'
import { landingAt } from '@/content/landing'
import { site } from '@/content/site'
import { brochureHrefFor } from '@/lib/courses/brochure'
import type { FormDef, PublicFormDef } from './types'

// Forms, routing and landing pages are code (src/content/*, DEC-62/63); courses and campuses are CMS rows,
// read server-side with overrideAccess (the public never reads them through here).

export type CourseLite = {
  id: number
  title: string
  khId?: number | null
  splId?: string | null
  hubspotCourseId?: string | null
  dynamicsCourseOption?: string | null
  brochureUrl?: string | null
  /** The resolved brochure URL (`brochureHrefFor`, DEC-69); `findCourse` sets it. */
  brochureHref?: string | null
}
export type CampusLite = { id: number; name: string; slug?: string | null; portalCampusId?: number | null; hubspotCampusValue?: string | null }
export type RoutingLite = {
  recipientGroups: { key: string; to: string[]; cc: string[] }[]
  alertTo: string[]
  whatsappNumber?: string | null
  defaultSourceId: number
}
export type LandingLite = { path: string; formKey?: string | null; thankYouPath?: string | null }

export async function loadFormDefinition(_payload: Payload | null, key: string, opts: { includeInactive?: boolean } = {}): Promise<FormDef | null> {
  const def = formByKey(key)
  if (!def || (def.active === false && !opts.includeInactive)) return null
  return def
}

export const toPublicDef = (def: FormDef): PublicFormDef => ({
  key: def.key,
  name: def.name,
  consentText: def.consentText,
  fields: def.fields.map(({ name, label, type, required, maxLength, pattern, options }) => ({ name, label, type, required, maxLength, pattern, options })),
  captcha: def.captcha !== false,
  honeypot: def.honeypot !== false,
  thankYouType: def.thankYou?.type ?? 'path',
})

export async function loadRouting(_payload?: Payload | null): Promise<RoutingLite> {
  return {
    recipientGroups: enquiryRouting.recipientGroups.map((r) => ({ key: r.key, to: [...r.to], cc: [...r.cc] })),
    alertTo: [...enquiryRouting.alertTo],
    whatsappNumber: site.whatsappNumber ?? null,
    defaultSourceId: enquiryRouting.defaultSourceId ?? 24,
  }
}

export async function findCourse(payload: Payload, id: string | number | null | undefined): Promise<CourseLite | null> {
  if (id === null || id === undefined || id === '') return null
  try {
    const course = (await payload.findByID({ collection: 'courses', id, depth: 0, overrideAccess: true, draft: false })) as unknown as CourseLite & { brochure?: number | null }
    return { ...course, brochureHref: await brochureHrefFor(course, { payload }) }
  } catch {
    return null
  }
}

export async function findCampus(payload: Payload, id: string | number | null | undefined): Promise<CampusLite | null> {
  if (id === null || id === undefined || id === '') return null
  try {
    return (await payload.findByID({ collection: 'campuses', id, depth: 0, overrideAccess: true })) as unknown as CampusLite
  } catch {
    return null
  }
}

/** The landing page the form was submitted from (matched on the path of `pageUrl`, never trusting the client for the target). */
export async function findLandingByPageUrl(_payload: Payload | null, pageUrl: string | undefined): Promise<LandingLite | null> {
  if (!pageUrl) return null
  let pathname: string
  try {
    pathname = new URL(pageUrl, 'http://placeholder.invalid').pathname
  } catch {
    return null
  }
  if (!/^\/(lp|enquirenow)\//.test(pathname)) return null
  const segments = pathname.split('/').filter(Boolean)
  // `/lp/<slug>/<campaign>/` and `/lp/<slug>/thanks.php`: also try the path without the last segment (60-landing).
  const candidates = [`/${segments.join('/')}/`, ...(segments.length > 2 ? [`/${segments.slice(0, -1).join('/')}/`] : [])]
  for (const path of candidates) {
    const entry = landingAt(path)
    if (entry) return { path: entry.path, formKey: entry.formKey, thankYouPath: entry.thankYouPath }
  }
  return null
}
