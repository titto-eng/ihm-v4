import type { Adapter, Planned } from './types'
import { compact, envRef, sendPlannedHttp, str } from './util'
import { contactFrom } from '@/lib/enquiries/contact'

// Portal CRM (40 §6 "portalCrm"; inventory/05-ihm-enquiries-integrations.md §3.1 step 3 and §3.5 row 1):
// form POST to the portal's applicationFormFromWebsites endpoint. Fixed fields campaignId, createdBy and modified_user_id = 1.
// Auth: none. Report 05 §3.1 step 3 and §3.5 row 1 show a bare form POST (no header, no token) and §2.4 lists no portal-CRM credential.
// PORTAL_CRM_API_KEY stays optional (sent as `X-API-Key` if ever set) in case the portal adds one. The old handler ignored the response,
// so no success shape is documented: any 2xx is success and the body excerpt is kept on the delivery row (live.ts).
// Retries on network errors, 5xx and 429 only (see util.classify).

// KH course ids that the old handlers fixed per form (05 §3.5 rows 7-8) because the form had no course picker of its own.
const FIXED_KH_COURSE: Record<string, number> = { 'nclex-magnet': 33 }
const SELECT_KH_COURSE: Record<string, { field: string; values: Record<string, number> }> = { 'mon-popup': { field: 'course', values: { gdn: 1, gcn: 21 } } }

export function portalCourseId(formKey: string, data: Record<string, unknown>, khId?: number | null): number | undefined {
  if (khId) return khId
  if (FIXED_KH_COURSE[formKey]) return FIXED_KH_COURSE[formKey]
  const sel = SELECT_KH_COURSE[formKey]
  const v = sel ? str(data[sel.field])?.toLowerCase() : undefined
  return v ? sel!.values[v] : undefined
}

export const portalCrmAdapter: Adapter = {
  name: 'portalCrm',
  enabled: () => true,
  targets: () => ['portal'],
  plan(input): Planned {
    const env = input.env ?? process.env
    const missing: string[] = []
    const { enquiry: e, course, campus } = input
    const c = contactFrom(e.data)
    const headers: Record<string, string> = {}
    const key = env.PORTAL_CRM_API_KEY?.trim()
    if (key) headers['X-API-Key'] = key
    const student = (e.studentType ?? c.studentType) === 'international' ? '1' : (e.studentType ?? c.studentType) === 'domestic' ? '0' : undefined
    const body = compact({
      courseId: portalCourseId(e.formKey, e.data, course?.khId),
      specialisation_index: str(course?.splId),
      firstName: e.firstName ?? c.firstName,
      lastName: e.lastName ?? c.lastName,
      phone: e.phone ?? c.phone,
      email: e.email ?? c.email,
      country: e.country ?? c.country,
      campus: campus?.portalCampusId ?? undefined,
      description: str(e.data.message),
      enquirySourceId: input.sourceId,
      student_type: student,
      partner_id: str(e.data.agentCode),
      ip_address: str(e.ip),
      campaignId: 1,
      createdBy: 1,
      modified_user_id: 1,
    })
    return {
      transport: 'http',
      requests: [{ method: 'POST', url: envRef('PORTAL_CRM_URL', env, missing), headers, encoding: 'form', body, note: 'portal CRM applicationFormFromWebsites' }],
      missingEnv: missing,
    }
  },
  send: (planned) => sendPlannedHttp(planned),
}
