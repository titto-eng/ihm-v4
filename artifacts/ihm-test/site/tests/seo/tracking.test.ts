import { describe, expect, it } from 'vitest'
import { activeTags, buildTrackingConfig, hubspotScriptUrl } from '@/components/tracking/config'
import { assertNoPii, brochureDownload, eventRegistration, generateLead, pageViewVirtual, purchase } from '@/components/tracking/datalayer'
import { readHutk } from '@/components/tracking/hutk'
import { buildCsp, embedHostSources } from '@/lib/seo/csp'

describe('tracking config', () => {
  const cfg = buildTrackingConfig({ gtmId: 'GTM-KXFBMHL', clarityId: '9q34oifeju', hubspotPortalId: '39853473', hubspotRegion: 'na1', airgenticId: 'ihm' }, true)

  it('loads the default tags everywhere', () => {
    expect(activeTags(cfg, '/')).toEqual({
      gtmId: 'GTM-KXFBMHL', clarityId: '9q34oifeju', hubspot: { portalId: '39853473', region: 'na1' }, airgentic: { accountId: 'ihm', serviceId: 'website' },
    })
  })

  it('/enquirenow/scholarship/ swaps the GTM container', () => {
    expect(activeTags(cfg, '/enquirenow/scholarship/').gtmId).toBe('GTM-5CQFHKD')
    expect(activeTags(cfg, '/enquirenow/scholarship/thanks.php').gtmId).toBe('GTM-5CQFHKD')
    expect(activeTags(cfg, '/enquirenow/gcc/').gtmId).toBe('GTM-KXFBMHL')
  })

  it('SAE pages load GTM only', () => {
    const t = activeTags(cfg, '/school-of-american-education/about')
    expect(t.gtmId).toBe('GTM-KXFBMHL')
    expect(t.clarityId ?? t.hubspot ?? t.airgentic).toBeUndefined()
  })

  it('loads nothing when TRACKING_ENABLED is off', () => {
    expect(activeTags(buildTrackingConfig(null, false), '/')).toEqual({})
  })

  it('takes ids, overrides and exclusions from settings, ignoring malformed values', () => {
    const c = buildTrackingConfig(
      { gtmId: 'GTM-AAA', clarityId: '"><script>', hubspotRegion: 'eu1', hubspotPortalId: '26193905', gtmOverrides: [{ pathPrefix: '/x', containerId: 'GTM-BBB' }, { pathPrefix: 'nope', containerId: 'GTM-C' }], exclusions: [{ tool: 'hubspot', pathPrefix: '/pay' }, { tool: 'evil', pathPrefix: '/' }] },
      true,
    )
    expect(c.clarityId).toBe('9q34oifeju') // invalid -> site default, never injected
    expect(activeTags(c, '/x/y/').gtmId).toBe('GTM-BBB')
    expect(activeTags(c, '/pay/receipt/1').hubspot).toBeUndefined()
    expect(activeTags(c, '/').hubspot).toBeDefined()
    expect(c.exclusions).toHaveLength(1)
    expect(hubspotScriptUrl(c.hubspot!)).toBe('https://js-eu1.hs-scripts.com/26193905.js')
  })
})

describe('dataLayer builders', () => {
  it('generate_lead carries only opaque fields', () => {
    expect(generateLead({ formKey: 'quick-enquiry', campaign: 'c1', courseCode: 'BN01', campus: 'Melbourne', studentType: 'domestic', enquiryRef: 'abc123' })).toEqual({
      event: 'generate_lead', form_key: 'quick-enquiry', campaign: 'c1', course_code: 'BN01', campus: 'Melbourne', student_type: 'domestic', enquiry_ref: 'abc123',
    })
    expect(brochureDownload({ formKey: 'b', courseCode: 'X' })).toMatchObject({ event: 'brochure_download' })
    expect(eventRegistration({ eventSlug: 'open-day' })).toMatchObject({ event: 'event_registration', event_slug: 'open-day' })
    expect(pageViewVirtual('/a/', 'A')).toMatchObject({ event: 'page_view_virtual', page_path: '/a/' })
  })

  it('purchase uses server values, AUD and GA4 item shape', () => {
    expect(purchase({ transactionId: '550e8400-e29b-41d4-a716-446655440000', value: 123.45, paymentType: 'airwallex', items: [{ itemId: 'invoice', itemName: 'Invoice', price: 123.45 }] })).toEqual({
      event: 'purchase', transaction_id: '550e8400-e29b-41d4-a716-446655440000', value: 123.45, currency: 'AUD', payment_type: 'airwallex', items: [{ item_id: 'invoice', item_name: 'Invoice', price: 123.45 }],
    })
  })

  it('rejects PII-shaped keys and email-like values', () => {
    expect(() => assertNoPii({ event: 'x', email: 'a@b.co' })).toThrow(/PII key/)
    expect(() => assertNoPii({ event: 'x', items: [{ phone: '1' }] })).toThrow(/PII key/)
    expect(() => assertNoPii({ event: 'x', note: 'mail me at jo@example.com' })).toThrow(/email-like/)
    expect(() => generateLead({ formKey: 'f', campaign: 'jo@example.com' })).toThrow(/email-like/)
    expect(() => assertNoPii({ event: 'purchase', items: [{ item_name: 'Invoice' }] })).not.toThrow()
  })
})

describe('hutk', () => {
  it('reads hubspotutk from a cookie string', () => {
    expect(readHutk('a=1; hubspotutk=abc123; b=2')).toBe('abc123')
    expect(readHutk('xhubspotutk=no')).toBe('')
    expect(readHutk('')).toBe('')
  })
})

describe('CSP', () => {
  it('builds frame-src from the fixed list plus allowedEmbedHosts, and drops junk', () => {
    const hosts = embedHostSources(['my.matterport.com', 'https://forms.monday.com/x', 'portal.ihm.edu.au', "evil.com; script-src *", '', null])
    expect(hosts).toEqual(['https://my.matterport.com', 'https://forms.monday.com', 'https://portal.ihm.edu.au'])
    const { reportOnly, enforced } = buildCsp({ embedHosts: hosts })
    const frame = reportOnly.split('; ').find((d) => d.startsWith('frame-src'))!
    for (const h of ['https://www.youtube-nocookie.com', 'https://player.vimeo.com', 'https://www.google.com', 'https://chat.airgentic.com', 'https://www.googletagmanager.com', 'https://my.matterport.com', 'https://portal.ihm.edu.au']) expect(frame).toContain(h)
    expect(reportOnly).toContain('https://js.hs-scripts.com')
    expect(reportOnly).toContain('https://www.clarity.ms')
    expect(reportOnly).not.toContain('evil.com')
    expect(reportOnly).not.toContain("'unsafe-eval'")
    expect(enforced).toBe("object-src 'none'; base-uri 'self'; frame-ancestors 'self'")
  })

  it('the admin policy has no third-party host', () => {
    expect(buildCsp({ admin: true }).reportOnly).not.toMatch(/https:\/\//)
  })
})
