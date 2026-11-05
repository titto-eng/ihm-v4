// Campus street addresses (were cards on the imported /contact/ page). Hand-edited since the 2026-10-19 cut (no CMS global behind it). Keep it plain data.
export type CampusContact = { name: string; address: string; tel: string | null }

/** Keyed by the campus lookup slug. */
export const campusContacts: Record<string, CampusContact[]> = {
  sydney: [
    {
      name: 'Sydney Campus',
      address: 'Ground Floor, 1 Wentworth Street, Parramatta, NSW 2150, Australia',
      tel: '+61282286402',
    },
  ],
  perth: [
    {
      name: 'Perth Campus',
      address: 'Level 4, 12 St Georges Terrace, Perth, WA 6000, Australia',
      tel: '+61862128200',
    },
  ],
  melbourne: [
    {
      name: 'Melbourne Campus (North Melbourne)',
      address: 'Level 2, 187 Boundary Rd, North Melbourne, VIC 3051, Australia',
      tel: '+61394505111',
    },
    {
      name: 'Melbourne Campus (Lonsdale St)',
      address: 'Level 1/399 Lonsdale St, Melbourne VIC 3000, Australia',
      tel: null,
    },
  ],
  brisbane: [
    {
      name: 'Brisbane Campus',
      address: 'Level 2/47-59 Adelaide St, Brisbane City QLD 4000, Australia',
      tel: null,
    },
  ],
}
