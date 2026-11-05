// Shapes shared by the route, the job and the adapters. Plain data: no Payload types leak into adapters.
export const FIELD_TYPES = ['text', 'email', 'tel', 'select', 'radio', 'textarea', 'checkbox', 'hidden', 'country', 'course', 'campus', 'file'] as const
/** A `file` field's value is the reference returned by `POST /api/enquire/upload/` (an `application-files` publicId). */
export const FILE_REF_PATTERN = /^[a-f0-9]{24}$/
export type FieldType = (typeof FIELD_TYPES)[number]

export type FormFieldDef = {
  name: string
  label?: string | null
  type: FieldType
  required?: boolean | null
  maxLength?: number | null
  pattern?: string | null
  options?: { value: string; label?: string | null }[] | null
}

export type AdapterName = 'email' | 'hubspot' | 'portalCrm' | 'portalStakeholder' | 'admissionsApi' | 'dynamics'

export type DestinationDef = {
  adapter: AdapterName
  config?: {
    recipientGroup?: string | null
    fixedSourceId?: number | null
    defaultSourceId?: number | null
    hubspotCampaignSourceDefault?: string | null
  } | null
}

export type FormDef = {
  key: string
  name?: string | null
  family?: string | null
  active?: boolean | null
  consentText?: string | null
  fields: FormFieldDef[]
  destinations: DestinationDef[]
  thankYou?: { type?: 'path' | 'brochure' | 'whatsapp' | 'inline' | null; path?: string | null } | null
  autoresponder?: { enabled?: boolean | null; subject?: string | null; body?: string | null } | null
  captcha?: boolean | null
  honeypot?: boolean | null
}

/** What the browser may see of a definition: no destinations, recipients or autoresponder text. */
export type PublicFormDef = {
  key: string
  name?: string | null
  consentText?: string | null
  fields: FormFieldDef[]
  captcha: boolean
  honeypot: boolean
  thankYouType: 'path' | 'brochure' | 'whatsapp' | 'inline'
}

export type DeliveryStatus = 'pending' | 'sent' | 'failed' | 'dead' | 'held' | 'dry_run'
export type DeliveryRow = {
  id?: string | null
  adapter: string
  target?: string | null
  status?: DeliveryStatus | null
  attempts?: number | null
  at?: string | null
  responseCode?: number | null
  externalId?: string | null
  lastError?: string | null
  dryRunRequest?: unknown
  hsSourceFallback?: boolean | null
}

export const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'] as const
export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number]

export const MAX_DELIVERY_ATTEMPTS = 5
