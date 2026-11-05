// /articulation-pathway/ (WordPress template-partnerships.php + inc/partnerships/pp-functions.php, synced 2026-10-30). Plain data.
export type Field = 'Nursing' | 'Community services'
export type Pathway = {
  id: string
  institute: 'Diploma' | 'Bachelor'
  destination: string
  code?: string
  field: Field
  provider: string
  eligible: { code?: string; title: string; note?: string }[]
  credit: string
  progression: string
  conditions: string[]
  locations: string
}

/** Role mailbox for pathway and RTO enquiries (typed from the old theme's PP_EMAIL constant; not a person). */
export const PATHWAYS_EMAIL = 'partnerships@hci.edu.au'
const mail = (subject: string, body: string) => `mailto:${PATHWAYS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
export const MAIL_STUDENT = mail('Student pathway enquiry', "Hello Pathway Advisor,\n\nMy current or completed qualification:\nThe pathway I'm interested in:\nDomestic or onshore international:\n\nThank you.")
export const MAIL_RTO = mail('RTO articulation partnership enquiry', "Hello,\n\nOrganisation name and RTO number:\nQualifications we deliver:\nContact person and role:\n\nWe'd like to discuss an articulation partnership.")

export const ROUTE = [
  ['Diploma of Nursing', 'e.g. HLT54121 Diploma of Nursing', 'Your foundation'],
  ['Credit assessment', 'Up to 12 months (8 units), assessed individually', 'Credit confirmed in writing'],
  ['Bachelor of Nursing', 'Entry to second year, where assessment supports it', 'Your next step'],
] as const

export const STATS = [
  ['2', 'diploma-to-degree pathways in nursing and social work'],
  ['12', 'months maximum credit into a bachelor degree, assessed'],
  ['2', 'working days — target for first advisor response'],
  ['5', 'working days — written indicative credit after verified documents'],
] as const

export const WHY = [
  ["Recognise what you've learned", 'Completed units that are identical or equivalent can transfer. Other evidenced learning can be assessed through RPL.'],
  ['Avoid repeating content', "Spend your time on what's new to you rather than relearning what you already know and can demonstrate."],
  ['Potentially shorten study and cost', 'Where your written assessment supports it, credit may reduce duration. The amount is set individually, never assumed.'],
  ['Keep building a caring career', 'Pathways connect certificate, diploma and degree study in nursing and community services.'],
] as const

export const PATHWAYS: Pathway[] = [
  {
    id: 'diploma-of-nursing', institute: 'Diploma', destination: 'Diploma of Nursing', code: 'HLT54121', field: 'Nursing',
    provider: 'Participating RTO — signed partner status to be confirmed',
    eligible: [
      { code: 'CHC33021', title: 'Certificate III in Individual Support' },
      { code: 'CHC43015', title: 'Certificate IV in Ageing Support' },
      { code: 'HLT33115', title: 'Certificate III in Health Services Assistance' },
      { title: 'Certificate IV in Allied Health Assistance' },
      { code: 'CHC43115', title: 'Disability-sector qualification' },
    ],
    credit: 'Credit transfer for identical or equivalent completed units; recognition of prior learning (RPL) assessed on evidence for other learning. No fixed number of months or units is promised.',
    progression: 'Onward study: Bachelor of Nursing, requiring current enrolled nurse registration.',
    conditions: ['Individual written assessment determines actual credit', 'Standard entry and English / LLN requirements apply', 'Placement requirements: police check, Working with Children check and immunisations'],
    locations: 'Melbourne, Sydney, Perth, Brisbane, Adelaide and Hobart, with blended options. Locations and modes are subject to course, intake and international registration confirmation.',
  },
  {
    id: 'diploma-of-community-services', institute: 'Diploma', destination: 'Diploma of Community Services', code: 'CHC52021', field: 'Community services',
    provider: 'Participating RTO — signed partner status to be confirmed',
    eligible: [
      { code: 'CHC32015', title: 'Certificate III in Community Services' },
      { code: 'CHC42021', title: 'Certificate IV in Community Services' },
      { code: 'CHC43315', title: 'Certificate IV in Mental Health' },
      { code: 'CHC40421', title: 'Certificate IV in Youth Work' },
      { code: 'CHC43115', title: 'Certificate IV in Disability Support' },
      { code: 'CHC33021', title: 'Certificate III in Individual Support' },
    ],
    credit: 'Unit-level credit transfer for identical or equivalent units, and evidence-based RPL. No fixed credit amount is promised.',
    progression: 'Onward study: Bachelor of Social Work.',
    conditions: ['Individual written assessment determines actual credit', 'Standard entry and English / LLN requirements apply'],
    locations: 'Campus-based, with blended and online options. Confirm course availability for your intake.',
  },
  {
    id: 'bachelor-of-nursing', institute: 'Bachelor', destination: 'Bachelor of Nursing', field: 'Nursing',
    provider: 'Diploma provider, or a participating RTO — signed partner status to be confirmed',
    eligible: [{ code: 'HLT54121', title: 'Diploma of Nursing', note: 'Plus current NMBA enrolled nurse registration' }],
    credit: 'Up to 12 months (8 units), with entry to second year subject to individual assessment. Credit is not automatic.',
    progression: 'Entry to second year of the degree, where assessment supports it.',
    conditions: ['Enrolment is conditional on accreditation and approvals', 'Current enrolled nurse registration required', 'Placement requirements: police check, Working with Children check and immunisations'],
    locations: 'Melbourne, Sydney, Perth and Brisbane, subject to approvals and intake confirmation.',
  },
  {
    id: 'bachelor-of-social-work', institute: 'Bachelor', destination: 'Bachelor of Social Work', field: 'Community services',
    provider: 'Diploma provider, or a participating RTO — signed partner status to be confirmed',
    eligible: [{ code: 'CHC52021', title: 'Diploma of Community Services' }, { code: 'CHC52015', title: 'Diploma of Community Services' }],
    credit: 'Up to 12 months, a maximum of 25% of the four-year degree, with entry to second year subject to assessment.',
    progression: 'Entry to second year of the degree, where assessment supports it.',
    conditions: ['No credit for core social work units or later placements', 'No blanket field-education exemption and no double counting', 'Described as AASW-accredited in the supplied sources'],
    locations: 'North Melbourne.',
  },
]

export const FLOWS = [
  { label: 'Nursing pathway', field: 'Nursing' as Field, from: 'diploma-of-nursing', to: 'bachelor-of-nursing', credit: 'Up to 12 months (8 units) credit', require: 'Requires current NMBA enrolled nurse registration' },
  { label: 'Community services pathway', field: 'Community services' as Field, from: 'diploma-of-community-services', to: 'bachelor-of-social-work', credit: 'Up to 12 months credit (max. 25% of the degree)', require: 'No credit for core social work units or later placements' },
]

export const STEPS = [
  ['Enquire', 'Email a Pathway Advisor directly. Target first response: within 2 working days.'],
  ['Share your record', 'Provide a verified USI transcript or academic record. Current students can share proof of enrolment for a conditional pre-assessment.'],
  ['Indicative credit', 'Receive written indicative credit within 5 working days after your documents are verified.'],
  ['Apply', 'Submit a formal application. Admission checks, entry and English / LLN requirements apply.'],
  ['Offer and acceptance', 'The manual describes a 5 working day target for complete applications — a target, not an unconditional promise.'],
  ['Start well', 'Priority orientation and a transition workshop help you settle into the new level of study.'],
] as const

export const SCHOLARSHIP_CONDITIONS = [
  'Eligibility for students from signed partner RTOs must be confirmed.',
  'Start within 18 months of completing your feeder qualification.',
  'Domestic students, and onshore international students eligible under Standard 7.',
  'All admission criteria must be met.',
  'Applied as credit on the first invoice; not cash, not transferable, first semester only.',
  'Cannot be combined with the Industry Hub discount or other HCI scholarships or promotions.',
  "Terms for future applicants may change on 60 days' partner notice; existing offers are unaffected.",
  'The scholarship does not change credit or admission decisions.',
] as const

export const RTO_POINTS = [
  ['No fees, commissions or minimum numbers', 'Participation costs nothing and carries no volume targets.'],
  ['A non-binding MOU', 'A memorandum of understanding records intent without locking either party in.'],
  ['You inform; we lead sessions', 'Your RTO informs its own students and hosts IHM-led information sessions.'],
  ['Clear separation', 'Only IHM issues offers and CoEs and collects tuition. No joint awards, joint delivery or agent relationship.'],
  ['Privacy by design', 'Students self-refer, so you never pass on personal information.'],
] as const
