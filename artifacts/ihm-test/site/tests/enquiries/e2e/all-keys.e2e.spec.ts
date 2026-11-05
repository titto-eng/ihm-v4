import { expect, test } from '@playwright/test'
import type { Payload } from 'payload'
import { boot, nonce, seed, uuid } from '../helpers'
import { forms as FORM_SEEDS, formByKey } from '@/content/forms'
import type { FormDef } from '@/lib/enquiries/types'

// 40 §8 check 5: every one of the 25 formKeys, posted to the running dev server (DRY_RUN=1, localhost, no real CRM): one row,
// the number of dry_run deliveries the formDefinition promises, and the right thank-you. Check 6: the newsletter key stores a row
// (it used to post to /action_page.php, which does not exist).
let payload: Payload
const tag = nonce()
const submissionIds: string[] = []

test.beforeAll(async () => {
  expect(process.env.DRY_RUN ?? '1', 'e2e must run with DRY_RUN=1').toBe('1')
  payload = await boot()
  await seed(payload)
})
test.afterAll(async () => {
  if (payload) await payload.delete({ collection: 'enquiries', where: { submissionId: { in: submissionIds } }, overrideAccess: true }).catch(() => {})
})

/** A valid payload built from the stored definition: every required field, nothing else. */
async function validFields(def: FormDef, email: string): Promise<Record<string, unknown>> {
  const campus = (await payload.find({ collection: 'campuses', limit: 1, depth: 0, overrideAccess: true })).docs[0]
  const course = (await payload.find({ collection: 'courses', limit: 1, depth: 0, overrideAccess: true })).docs[0]
  const out: Record<string, unknown> = {}
  for (const f of def.fields) {
    if (!f.required && !['email', 'phone'].includes(f.name)) continue
    if (f.pattern === '^[0-9]{10}$') out[f.name] = '0412345678'
    else if (f.type === 'email') out[f.name] = f.name === 'email' ? email : `${f.name}-${tag}@example.test`
    else if (f.type === 'tel') out[f.name] = '+61 400 000 000'
    else if (f.type === 'select' || f.type === 'radio') out[f.name] = f.options![0].value
    else if (f.type === 'checkbox') out[f.name] = true
    else if (f.type === 'country') out[f.name] = 'Australia'
    else if (f.type === 'campus') out[f.name] = String(campus.id)
    else if (f.type === 'course') out[f.name] = String(course.id)
    else if (f.type === 'textarea') out[f.name] = 'Test message from the e2e suite'
    else out[f.name] = f.name === 'name' ? 'Playwright Tester' : 'Playwright'
  }
  if (!('email' in out) && def.fields.some((f) => f.name === 'email')) out.email = email
  if (def.fields.some((f) => f.name === 'phone')) out.phone = out.phone ?? '+61 400 000 000'
  return out
}

/** Deliveries the definition promises, counted from the definition itself (not from the pipeline's own planner). */
async function expectedDeliveries(key: string) {
  const def = formByKey(key)!
  const rows: string[] = []
  for (const d of def.destinations) {
    if (d.adapter === 'email') rows.push(`email:${d.config?.recipientGroup || 'default'}`)
    else if (d.adapter === 'hubspot') rows.push('hubspot:contacts')
    else if (d.adapter === 'portalCrm') rows.push('portalCrm:portal')
    else if (d.adapter === 'admissionsApi') rows.push('admissionsApi:admissions')
    else if (d.adapter === 'portalStakeholder') rows.push('portalStakeholder:ihm', 'portalStakeholder:ihna')
    else throw new Error(`unexpected adapter ${d.adapter} on ${key} (dynamics is off on IHM)`)
  }
  if (def.autoresponder?.enabled) rows.push('email:autoresponder')
  return { rows: rows.sort(), thankYou: def.thankYou }
}

test('the seeds cover exactly the 25 canonical keys', () => {
  expect(FORM_SEEDS).toHaveLength(25)
})

for (const seedDef of FORM_SEEDS) {
  test(`formKey ${seedDef.key}: one row, its dry_run deliveries and the right thank-you`, async ({ request }) => {
    const email = `e2e-${seedDef.key}-${tag}@example.test`
    const submissionId = uuid()
    submissionIds.push(submissionId)
    const fields = await validFields(seedDef, email)
    const res = await request.post('/api/enquire/', {
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `198.18.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}` },
      data: { formKey: seedDef.key, submissionId, fields, pageUrl: `http://localhost:3000/e2e/${seedDef.key}/`, _hp_url: '' },
    })
    const json = await res.json()
    expect(res.status(), JSON.stringify(json)).toBe(200)
    expect(json.ok).toBe(true)

    const expected = await expectedDeliveries(seedDef.key)
    const rowOf = async () => (await payload.find({ collection: 'enquiries', where: { submissionId: { equals: submissionId } }, limit: 1, depth: 0, overrideAccess: true })).docs[0] as unknown as { formKey: string; status: string; deliveries?: { adapter: string; target: string; status: string; dryRunRequest?: unknown }[] } | undefined
    const row = await rowOf()
    expect(row, 'a row exists').toBeTruthy()
    expect(row!.formKey).toBe(seedDef.key)
    expect(row!.deliveries!.map((d) => `${d.adapter}:${d.target}`).sort()).toEqual(expected.rows) // N rows saved with the enquiry

    // the dev server runs the job right after the response; the runner picks up anything slower
    await expect.poll(async () => (await rowOf())?.deliveries?.filter((d) => d.status === 'dry_run').length, { timeout: 90_000, intervals: [500, 1000, 2000] }).toBe(expected.rows.length)
    const done = (await rowOf())!
    expect(done.status).toBe('delivered')
    expect(done.deliveries!.every((d) => d.dryRunRequest)).toBe(true)

    const type = expected.thankYou?.type ?? 'path'
    if (type === 'inline') expect(json.thankYouPath).toBeNull()
    else if (type === 'path') expect(String(json.thankYouPath).startsWith(expected.thankYou?.path ?? '/thanks/')).toBe(true)
    else expect(String(json.thankYouPath)).toMatch(/^\/thanks\/|^https:\/\/api\.whatsapp\.com\/send\?/) // brochure without a course, whatsapp
  })
}

test('newsletter: the submission is stored and reaches HubSpot (dry run); /action_page.php is 404 (40 check 6)', async ({ request }) => {
  const email = `e2e-news-${tag}@example.test`
  const submissionId = uuid()
  submissionIds.push(submissionId)
  const res = await request.post('/api/enquire/', { headers: { 'x-forwarded-for': '198.19.1.1' }, data: { formKey: 'newsletter', submissionId, fields: { email }, pageUrl: 'http://localhost:3000/blog/', _hp_url: '' } })
  expect(res.status()).toBe(200)
  const q = async () => (await payload.find({ collection: 'enquiries', where: { submissionId: { equals: submissionId } }, limit: 1, depth: 0, overrideAccess: true })).docs[0] as unknown as { email: string; deliveries?: { adapter: string; status: string; dryRunRequest?: { requests: { body: { inputs: { id: string; properties: Record<string, string> }[] } }[] } }[] }
  await expect.poll(async () => (await q())?.deliveries?.[0]?.status, { timeout: 90_000 }).toBe('dry_run')
  const row = (await q())!
  expect(row.email).toBe(email)
  const hs = row.deliveries!.find((d) => d.adapter === 'hubspot')!
  expect(hs.dryRunRequest!.requests[0].body.inputs[0]).toMatchObject({ id: email, properties: { email, campaign_source: 'IHM Newsletter' } })

  expect((await request.get('/action_page.php')).status()).toBe(404)
  expect((await request.post('/action_page.php', { data: { email } })).status()).toBe(404)
})
