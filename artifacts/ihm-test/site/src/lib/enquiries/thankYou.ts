import type { FormDef } from './types'
import type { CampusLite, CourseLite, LandingLite } from './lookups'

export const DEFAULT_THANK_YOU = '/thanks/'

/** A same-host path only: `/x/`, never `//host` or a scheme. */
export const isLocalPath = (p: unknown): p is string => typeof p === 'string' && /^\/(?!\/)[^\s\\]*$/.test(p)

type Ctx = {
  def: FormDef
  data: Record<string, unknown>
  landing: LandingLite | null
  course: CourseLite | null
  campus: CampusLite | null
  campaignCode: string | null
  whatsappNumber?: string | null
  siteHost?: string
}

const withQuery = (path: string, params: Record<string, string | number | null | undefined>): string => {
  const q = Object.entries(params).filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
  if (!q.length) return path
  return `${path}${path.includes('?') ? '&' : '?'}${q.join('&')}`
}

/**
 * The thank-you target, always computed here (DEC-4, DEC-18). Order:
 * 1. a landing page with `thankYouPath` (keeps `?campaign=`, 60-landing; adds `intent=brochure` for a brochure request, which shows the
 *    page's BrochureDownload block);
 * 2. `thankYou.type`: brochure (course brochure on our host, else the form's path), whatsapp (course-only prefill),
 *    inline (null: the form shows its own message), path (the form's path, `quick-enquiry` adds the GTM query);
 * 3. `/thanks/`.
 * Returns null for `inline`.
 */
export function computeThankYou(ctx: Ctx): string | null {
  const { def, landing } = ctx
  const type = def.thankYou?.type ?? 'path'
  const brochure = type === 'brochure' || ctx.data.intent === 'brochure' || ctx.data.formType === 'brochure'
  if (landing?.thankYouPath && isLocalPath(landing.thankYouPath)) {
    return withQuery(landing.thankYouPath, { campaign: ctx.campaignCode, intent: brochure ? 'brochure' : null })
  }
  const formPath = isLocalPath(def.thankYou?.path) ? def.thankYou!.path! : null

  if (type === 'inline') return null
  if (type === 'whatsapp') {
    const number = (ctx.whatsappNumber ?? '').replace(/\D/g, '')
    if (!number) return formPath ?? DEFAULT_THANK_YOU
    const text = ctx.course ? `Hi, I would like to know more about the ${ctx.course.title}.` : 'Hi, I would like to know more about studying at IHM.'
    return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(text)}`
  }
  if (brochure) {
    const url = ctx.course?.brochureHref ?? ctx.course?.brochureUrl // findCourse resolves brochureHref (DEC-69)
    if (url) {
      if (isLocalPath(url)) return url
      try {
        const u = new URL(url)
        if (ctx.siteHost && u.hostname === ctx.siteHost) return `${u.pathname}${u.search}`
      } catch {
        /* fall through */
      }
    }
    return formPath ?? DEFAULT_THANK_YOU
  }
  if (def.key === 'quick-enquiry') {
    return withQuery(formPath ?? DEFAULT_THANK_YOU, { course_id: ctx.course?.khId ?? ctx.course?.id, campaign_id: ctx.campaignCode, campus: ctx.campus?.id })
  }
  return formPath ?? DEFAULT_THANK_YOU
}
