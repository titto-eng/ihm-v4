import type { Adapter, Planned, PlannedHttp } from './types'
import { compact, envRef, sendPlannedHttp, str } from './util'
import { envValue } from '@/lib/enquiries/config'
import { contactFrom } from '@/lib/enquiries/contact'

// HubSpot (40 §6 "hubspot", 05 §1, §3.4). CRM v3 upsert on `email` replaces the old v1 createOrUpdate and its string-concatenated
// JSON. HubSpot's public docs (https://developers.hubspot.com/docs/api-reference/crm-contacts-v3/batch/post-crm-v3-objects-contacts-batch-upsert)
// define the upsert as `POST /crm/v3/objects/contacts/batch/upsert` with `inputs: [{ id: <email>, idProperty: 'email', properties }]`;
// the single `POST /crm/v3/objects/contacts` is create-only (409 when the email exists), so the batch endpoint with one input is used.
// Needs the private-app scope `crm.objects.contacts.write` and the custom properties below to exist in the portal (else HubSpot answers 400).
// `hutk` is always stored on the enquiry (DEC-13) but sent only through the Forms API, and only when HUBSPOT_FORM_GUID is set: the
// Contacts API cannot take it. Forms submit (https://developers.hubspot.com/docs/api-reference/legacy/marketing/forms/v3-legacy/submit-data-authenticated):
// `POST api.hsforms.com/submissions/v3/integration/secure/submit/{portalId}/{formGuid}`, Bearer token, scope `forms`.
export const HUBSPOT_BASE = 'https://api.hubapi.com'
export const HUBSPOT_FORMS_BASE = 'https://api.hsforms.com'
export const DEFAULT_CAMPAIGN_SOURCE = 'IHM website'

export const hubspotAdapter: Adapter = {
  name: 'hubspot',
  enabled: () => true,
  targets: () => ['contacts'],
  plan(input): Planned {
    const env = input.env ?? process.env
    const missing: string[] = []
    const { enquiry: e, course, campus, form, destination } = input
    const contact = contactFrom(e.data)
    const email = e.email ?? contact.email ?? ''

    // 41 §6: the form's default (DEC-41: a campaign code never sets it); recorded as a fallback for the later resync.
    const campaignSource = destination.config?.hubspotCampaignSourceDefault?.trim() || DEFAULT_CAMPAIGN_SOURCE
    const hsSourceFallback = true

    const courseValue = str(course?.hubspotCourseId) ?? (course?.khId ? String(course.khId) : undefined)
    const whereHear = [str(e.data.whereHear), str(e.data.whereHearOther)].filter(Boolean).join(' - ') || undefined
    const properties = compact({
      firstname: e.firstName ?? contact.firstName,
      lastname: e.lastName ?? contact.lastName,
      email,
      phone: e.phone ?? contact.phone,
      campus: str(campus?.hubspotCampusValue),
      course: courseValue ? `;${courseValue}` : undefined,
      course_specialization: course?.splId ? `;${course.splId}` : undefined,
      campaign_source: campaignSource,
      where_did_you_hear_about_us: whereHear,
    })

    const token = envRef('HUBSPOT_ACCESS_TOKEN', env, missing)
    const requests: PlannedHttp[] = [{
      method: 'POST',
      url: `${HUBSPOT_BASE}/crm/v3/objects/contacts/batch/upsert`,
      headers: { Authorization: `Bearer ${token}` },
      encoding: 'json',
      body: { inputs: [{ idProperty: 'email', id: email, properties }] },
      note: 'contacts upsert on email',
    }]

    const guid = envValue('HUBSPOT_FORM_GUID', env)
    if (guid) {
      const portalId = envRef('HUBSPOT_PORTAL_ID', env, missing)
      requests.push({
        method: 'POST',
        url: `${HUBSPOT_FORMS_BASE}/submissions/v3/integration/secure/submit/${portalId}/${guid}`,
        headers: { Authorization: `Bearer ${token}` },
        encoding: 'json',
        body: {
          fields: Object.entries(properties).filter(([k]) => ['email', 'firstname', 'lastname', 'phone'].includes(k)).map(([name, value]) => ({ objectTypeId: '0-1', name, value })),
          context: compact({ hutk: e.hutk, pageUri: e.pageUrl ?? undefined, pageName: form.name ?? form.key }),
        },
        note: e.hutk ? 'forms submit carrying hutk (DEC-13)' : 'forms submit (no hutk on this enquiry)',
      })
    }
    return { transport: 'http', requests, hsSourceFallback, missingEnv: missing }
  },
  // The contact id from the upsert response (`results[0].id`) is kept as the delivery's externalId.
  send: (planned) => sendPlannedHttp(planned, undefined, (i, text) => {
    if (i !== 0) return undefined
    try { return str((JSON.parse(text) as { results?: { id?: unknown }[] }).results?.[0]?.id) } catch { return undefined }
  }),
}
