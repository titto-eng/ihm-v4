import { cleanText, CODE_PATTERN, parseAttributionCookie } from './request'
import type { LandingLite, RoutingLite } from './lookups'
import type { DestinationDef } from './types'

export type CampaignResolution = {
  /** Raw code as received (valid format only), stored on the enquiry row and shown to staff (DEC-41, DEC-62). */
  campaignCode: string | null
}

/**
 * Resolution order (41 §4): a `promo_code` field, body `campaign`, `ihm_attr`, `ihm_attr_first`. An invalid code (anything outside
 * `^[A-Za-z0-9_-]{2,64}$`) is ignored, never stored or reflected. A valid code is stored raw; nothing is looked up.
 */
export async function resolveCampaign(
  _payload: unknown,
  args: { bodyCampaign?: string; cookieHeader?: string | null; landing?: LandingLite | null; promoCode?: string },
): Promise<CampaignResolution> {
  const candidates = [
    cleanText(args.promoCode, 64),
    cleanText(args.bodyCampaign, 64),
    parseAttributionCookie(args.cookieHeader, 'ihm_attr').campaign,
    parseAttributionCookie(args.cookieHeader, 'ihm_attr_first').campaign,
  ]
  const code = candidates.find((c) => c && CODE_PATTERN.test(c)) ?? null
  return { campaignCode: code }
}

/**
 * Portal `enquirySourceId`, first match wins (41 §4, DEC-41): the form's fixedSourceId, the form's defaultSourceId, then the site
 * default (24, "lpenquiry"). A campaign code never changes it.
 */
export function resolveSourceId(config: DestinationDef['config'], routing: Pick<RoutingLite, 'defaultSourceId'>): number {
  if (typeof config?.fixedSourceId === 'number') return config.fixedSourceId
  if (typeof config?.defaultSourceId === 'number') return config.defaultSourceId
  return routing.defaultSourceId ?? 24
}
