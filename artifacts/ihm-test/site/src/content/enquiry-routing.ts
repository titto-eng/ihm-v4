// Enquiry routing (DEC-19/63). Hand-edited constants; keep it plain data.
// Form destinations name a recipient group; the addresses are typed HERE, never copied from the old code (rule 4).
// `to`/`cc` are email addresses. `alertTo` gets the "delivery dead" alerts (no personal data in them).
export type RecipientGroup = { key: string; to: string[]; cc: string[] }

export const enquiryRouting: { recipientGroups: RecipientGroup[]; alertTo: string[]; defaultSourceId: number } = {
  recipientGroups: [
    { key: 'admissions', to: [], cc: [] },
    { key: 'agents', to: [], cc: [] },
    { key: 'alumni', to: [], cc: [] },
    { key: 'business-development', to: [], cc: [] },
    { key: 'events', to: [], cc: [] },
    { key: 'marketing', to: [], cc: [] },
    { key: 'partnerships', to: [], cc: [] },
    { key: 'people-and-culture', to: [], cc: [] },
    { key: 'sae-admissions', to: [], cc: [] },
    { key: 'scholarship', to: [], cc: [] },
  ],
  alertTo: [],
  defaultSourceId: 24,
}
