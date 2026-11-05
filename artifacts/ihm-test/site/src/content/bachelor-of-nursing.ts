// /courses/bachelor-of-nursing/ — WordPress template-bachelor-of-nursing.php + inc/bachelor-of-nursing/bn-page.html and the intake
// planner data in assets/bachelor-of-nursing/bn.js (synced 2026-10-30). Images: public/images/bachelor-of-nursing/.
export const BN_APPLY = 'https://courses.ihm.edu.au/admissions/apply/?course=BN'
export const BN_BROCHURE = '/brochures/IHM_BON_Brochure_v1_26Oct20_NPV1.pdf'
export const BN_INHERENT = '/pdf/IHM_Appendix083_InherentRequirements.pdf'
export const BN_NMBA_ENGLISH = 'https://www.nursingmidwiferyboard.gov.au/registration-standards/english-language-skills.aspx'
export const BN_ENGLISH_POLICY = '/pdf/english-language-proficiency-entry-requirements.pdf'

export const BN_MENU = [
  ['pathways', 'Pathways'], ['intakes', 'Intakes'], ['course', 'The course'], ['placements', 'Placements'], ['timetable', 'Timetable'],
  ['curriculum', 'Curriculum'], ['outcomes', 'Learning outcomes'], ['admissions', 'Admissions'], ['fees', 'Fees'], ['faq', 'FAQ'],
] as const

export const BN_FACTS = [
  ['Duration', '3 years full-time', 'or part-time equivalent'],
  ['Units', '24 units', '19 theory + 5 placements'],
  ['Delivery', 'Face-to-Face', 'on campus + online'],
  ['Level', 'AQF 7', 'Bachelor degree'],
  ['Campuses', '4 cities', 'Melbourne · Sydney · Perth · Brisbane'],
] as const

export const BN_PATHWAYS = [
  {
    tag: 'Pathway 1 · Direct entry', who: 'School leavers, career changers and international applicants', title: 'Bachelor of Nursing', length: '3 years full-time',
    steps: [['Yr 1', 'Foundations + PEP 1 (160 h)'], ['Yr 2', 'Acute, chronic & mental health (240 h)'], ['Yr 3', 'Community, rural, leadership (400 h)']],
    points: ['24 units: 19 theory and 5 placements, 800 hours in total', 'ATAR 50 for domestic school leavers; international academic, English and interview requirements apply', 'Part-time may be available for domestic students, subject to unit availability', 'Graduates may apply for NMBA registration if they meet all standards'],
    note: 'Registration is never automatic.', links: [['Apply for the BN', BN_APPLY], ['Enquire', '#quickContact']],
  },
  {
    tag: 'Pathway 2 · Enrolled Nurses', who: 'Accredited AQF 5 Diploma AND current unrestricted NMBA/Ahpra EN registration', title: 'Diploma of Nursing + Bachelor', length: 'Up to 8 units of credit, assessed individually',
    steps: [['Before', 'Diploma of Nursing + EN registration'], ['Apply', 'Credit assessed via Credit & RPL'], ['Then', 'Complete remaining units + placements']],
    points: ['May receive up to 12 months (8 units) of credit', 'Builds on clinical experience you already hold', 'Year 2 entry and a shorter duration are not guaranteed', 'Credit depends on your own Diploma and registration; ask admissions how yours will be assessed'],
    note: 'Credit is decided case by case.', links: [['Apply for the BN', BN_APPLY], ['Credit & RPL', '/credit-and-recognition-of-prior-learning/']],
  },
  {
    tag: 'Pathway 3 · Bachelor, then Master’s', who: 'BN graduates who later want advanced study in leadership, research and education', title: 'Bachelor, then Master of Nursing', length: '3 + 2 years, two separate courses',
    steps: [['Yr 1–3', 'Bachelor of Nursing'], ['Next', 'Separate Master’s application'], ['2 yrs', 'Master of Nursing (AQF 9), if admitted']],
    points: ['Master’s admission has its own requirements, including nursing registration', 'Not an integrated package; progression is not guaranteed', 'Master’s study covers clinical leadership, research and evidence-based practice'],
    note: 'Master’s fees are on the official Master’s page.', links: [['Apply for the BN', BN_APPLY], ['Master of Nursing page', '/courses/master-of-nursing/']],
  },
] as const

export const BN_IHNA = {
  title: 'Not yet an Enrolled Nurse? Start with IHNA.',
  steps: ['Complete the IHNA Diploma of Nursing (HLT54121)', 'Apply for Enrolled Nurse registration (requirements apply)', 'Apply to the IHM BN; credit assessed individually'],
  note: 'IHNA and IHM admissions are separate. EN registration, BN admission and credit are not guaranteed.',
  links: [['Explore IHNA Diploma of Nursing', 'https://ihna.edu.au/courses/diploma-of-nursing'], ['International', 'https://ihna.edu.au/courses/diploma-of-nursing-int']],
} as const

/** Course commencement dates by campus (IHM planning timetables, 2026–2031). */
const LF = ['2026-11-09', '2027-03-01', '2027-07-05', '2027-11-01', '2028-03-06', '2028-07-03', '2028-11-06', '2029-03-05', '2029-07-02', '2029-11-05', '2030-03-04', '2030-07-01', '2030-11-04', '2031-03-03', '2031-07-07']
const RF = ['2027-01-04', '2027-05-03', '2027-09-06', '2028-01-03', '2028-05-01', '2028-09-04', '2029-01-01', '2029-05-07', '2029-09-03', '2030-01-07', '2030-05-06', '2030-09-02', '2031-01-06', '2031-05-05', '2031-09-01']
export const BN_CAMPUSES = [
  { id: 'melbourne', name: 'Melbourne', state: 'VIC', dates: LF },
  { id: 'perth', name: 'Perth', state: 'WA', dates: LF },
  { id: 'sydney', name: 'Sydney', state: 'NSW', dates: RF },
  { id: 'brisbane', name: 'Brisbane', state: 'QLD', dates: RF },
]

export const BN_FEATURES = [
  ['Person-centred, culturally safe care', 'Including culturally appropriate nursing of Aboriginal and Torres Strait Islander peoples and global, cultural health care.'],
  ['Simulation laboratories', 'Practise clinical skills in simulated educational labs before you meet patients on placement.'],
  ['Digital health', 'Electronic health records, mHealth apps, virtual simulation and a dedicated Health Informatics unit.'],
  ['Rural, Regional and Remote Health and Wellness', 'A final-year unit on health and wellness beyond the cities, where placements may also take you.'],
  ['Clinical leadership', 'Leadership, advocacy and a transition unit preparing you for the role of the Registered Nurse.'],
] as const

export const BN_PLACEMENTS = [
  ['PEP 1', '160 h', 'Year 1 · Sem 2', 'Introduction to clinical experience', 'Interpersonal and communication skills, the nurse in a multidisciplinary team, caring for a healthy older person.'],
  ['PEP 2', '120 h', 'Year 2 · Sem 3', 'Sub-acute and chronic care', 'Problem solving, assessment and nursing interventions across healthcare settings.'],
  ['PEP 3', '120 h', 'Year 2 · Sem 4', 'Mental health nursing', 'Developing critical thinking and therapeutic practice in mental health contexts.'],
  ['PEP 4', '160 h', 'Year 3 · Sem 5', 'Community care', 'Caring effectively for individuals within the community.'],
  ['PEP 5', '240 h', 'Year 3 · Sem 6', 'Medical / surgical consolidation', 'Translating theory and skills into practice before graduation.'],
] as const

export const BN_PREPLACEMENT = [
  'National police check (annual)', 'Working with Children Check', 'NDIS Worker Screening Check where required',
  'Immunisations incl. dTpa, MMR, Hep B, varicella, annual influenza, TB screening, COVID-19',
  'First Aid, CPR, hand hygiene, manual handling, infection control modules', 'Hand hygiene and medication / drug calculation hurdles',
  'IHM uniform (at least two recommended)', 'Full attendance; missed shifts must be made up, possibly at extra cost',
  'Facility requirements such as E-learning modules including orientation and mandatory trainings',
] as const
export const BN_MANDATORY = ['Hand Hygiene Certificate', 'First Aid Certificate', 'Cardio-pulmonary Resuscitation (CPR) Certificate', 'Manual Handling Certificate', 'Blood Safe E-learning module', 'Infection Control- Principles of infection prevention and control module'] as const

/** [year, semesters, on-campus days, online day] — days Mon..Sat: 'c' campus, 'o' online, '' not listed */
export const BN_WEEKS = [
  ['Year 1', 'Semesters 1 & 2', ['c', 'c', 'o', '', '', ''], 'Monday and Tuesday', 'Wednesday'],
  ['Year 2', 'Semesters 3 & 4', ['', '', 'c', 'c', 'o', ''], 'Wednesday and Thursday', 'Friday'],
  ['Year 3', 'Semesters 5 & 6', ['o', '', '', '', 'c', 'c'], 'Friday and Saturday', 'Monday'],
] as const

export const BN_CURRICULUM = [
  ['Year 1', [
    ['Semester 1', ['N7001 Nursing and the Australian Health Care System', 'N7002 Health and Wellness in Nursing Practice', 'N7003 Communication Skills for Nurses', 'N7004 Anatomy and Physiology']],
    ['Semester 2', ['N7005 Health and Wellness in Older Adults', 'N7006 Foundations of Patient Partnership in Nursing', 'N7007 Culturally Appropriate Nursing of Aboriginal and Torres Strait Islander Peoples', 'N7008 Professional Experience Placement 1 PEP']],
  ]],
  ['Year 2', [
    ['Semester 3', ['N7009 Integrating Person-Centred Care for Chronic and Complex Conditions', 'N7010 Transforming Clinical Knowledge: Pathophysiology and Pharmacotherapeutics', 'N7011 Ethical and Legal Nursing', 'N7012 Professional Experience Placement 2 PEP']],
    ['Semester 4', ['N7013 Mental Health and Wellness Nursing', 'N7014 Research and Evidence-Based Practice in Health Care', 'N7015 Global and Culture Health Care', 'N7016 Professional Experience Placement 3 PEP']],
  ]],
  ['Year 3', [
    ['Semester 5', ['N7017 Community Health Nursing', 'N7018 Health and Wellness in Children and Young People', 'N7019 Health Informatics', 'N7020 Professional Experience Placement 4 PEP']],
    ['Semester 6', ['N7021 Rural, Regional and Remote Health and Wellness', 'N7022 Clinical Leadership in Nursing', 'N7023 Transitioning to the Role of the Registered Nurse', 'N7024 Professional Experience Placement 5 PEP']],
  ]],
] as const

export const BN_OUTCOMES = [
  'Interpret and attribute NMBA’s Registered Nurse Standards for safe, ethical, evidence-based, person-centred care, demonstrating commitment to excellence.',
  'Analyse and implement anatomy, physiology, pathophysiology and pharmaco therapeutics knowledge and skills for safe, person-centred care.',
  'Appraise and integrate critical thinking, clinical reasoning, and problem-solving skills for the provision of holistic nursing care.',
  'Assess and present culturally sensitive and safe quality nursing care to Aboriginal and Torres Strait Islander peoples and people of other cultures',
  'Contextualise communication, teamwork, and digital health skills for collaborative engagement with individuals, families, carers, communities, and multidisciplinary health care teams.',
  'Evaluate and implement evidence-based nursing practices, integrating the best available research evidence with clinical expertise, for comprehensive and safe person-centred care.',
  'Critically review and exemplify technologically advanced, safe, and quality care across diverse settings for individuals and communities.',
  'Appraise nursing leadership and advocacy roles in providing safe, quality, person-centred care.',
] as const

export const BN_ADMISSIONS = {
  domestic: {
    heading: 'What you need, here at home.',
    intro: 'Domestic means an Australian citizen, permanent resident, New Zealand citizen or permanent humanitarian visa holder.',
    cards: [
      ['School leavers', 'ATAR 50', 'Direct school leaver entry for domestic students requires an ATAR of 50.'],
      ['Enrolled Nurses', 'AQF 5 + EN', 'Accredited Diploma of Nursing and current unrestricted NMBA/Ahpra EN registration. Credit of up to 8 units may be granted after individual assessment.'],
      ['Everyone', 'Interview', 'Eligible applicants are interviewed. English proficiency must meet IHM’s policy aligned to the NMBA English language skills standard.'],
    ],
    steps: ['Apply online through IHM', 'If eligible, an admissions counsellor contacts you to schedule an interview', 'Successful applicants receive an offer letter', 'Accept and receive your invoice', 'Complete enrolment and prepare for orientation'],
  },
  international: {
    heading: 'What you need, from anywhere.',
    intro: 'International students study predominantly on campus, with online study limited to one-third of the course.',
    cards: [
      ['Academic', '60% / GPA 2.75', 'International Year 12 or final secondary qualification with a minimum 60% in all completed units, or a minimum GPA of 2.75 where GPA is calculated.'],
      ['English (IELTS Academic)', '7.0 overall', 'Minimum 7 in listening, reading and speaking and 6.5 in writing. Other tests may be accepted; check the current policy for exact equivalents.'],
      ['Everyone', 'Interview', 'Eligible applicants are interviewed by an admissions counsellor before any offer is made. Overseas Student Health Cover is required for the visa.'],
    ],
    steps: ['Apply online through IHM', 'If eligible, an admissions counsellor contacts you to schedule an interview', 'Successful applicants receive an offer letter', 'Accept and receive your invoice', 'Pay the enrolment fee to receive your Confirmation of Enrolment, then you may apply for a subclass 500 student visa'],
  },
} as const

export const BN_INHERENT_TEXT = 'Inherent requirements are the essential components of a program or course that demonstrate the abilities, knowledge, and skills necessary to achieve the program or course’s core learning outcomes while maintaining the academic integrity of IHM’s learning, assessment, and accreditation processes. The inherent requirements are the abilities, knowledge, and skills required to complete a program and must be met by all students enrolled in it.'

const COSTS = ['Police, WWCC and NDIS screening', 'Immunisations and serology', 'Uniforms', 'Mandatory training certificates', 'Placement travel', 'Placement accommodation']
export const BN_FEES = {
  domestic: {
    amount: 'AUD $15,000', admin: null as string | null, costs: COSTS,
    policies: [['Domestic fees, charges & refunds policy', '/pdf/policies/IHM_Fees_Charges_and_Refunds_for_Domestic_Students_Policy.pdf'], ['Domestic fees procedure', '/pdf/procedures/IHM_Fees_Charges_and_Refunds_for_Domestic_Students_Procedure.pdf']],
    feeHelp: true,
  },
  international: {
    amount: 'AUD $18,250', admin: 'Administration* (Non-Tuition) Fee: AUD $250.00 (Non Refundable). *Only applicable to international students.', costs: [...COSTS, 'Overseas Student Health Cover (OSHC)', 'Visa application costs'],
    policies: [['International fees, charges & refunds policy', '/pdf/policies/Fees_Charges_and_Refunds_for_International_Students_Policy.pdf'], ['International fees procedure', '/pdf/procedures/Fees_Charges_and_Refunds_for_International_Students_Procedure.pdf']],
    feeHelp: false,
  },
}

export const BN_FAQS = [
  ['How long does the Bachelor of Nursing take?', 'Three years full-time, or equivalent part-time. Part-time study for domestic students depends on unit availability. International students should check study load conditions for their visa.'],
  ['Will I automatically become a Registered Nurse?', 'No. Graduates who successfully complete the BN may apply to the NMBA for registration and must meet all registration standards, including English language skills and criminal history requirements.'],
  ['I am an Enrolled Nurse. Can I finish faster?', 'If you hold an accredited Diploma of Nursing (AQF 5) and current unrestricted EN registration, you may be granted up to 12 months (8 units) of credit. Credit is individually assessed; Year 2 entry and a shorter duration are not guaranteed.'],
  ['Does the BN lead straight into the Master of Nursing?', 'No. The Master of Nursing is a separate course with a separate application and its own admission requirements, including nursing registration. Progression is not guaranteed.'],
  ['Where are placements and who pays for travel?', 'Placements are normally in the state where your campus is located and may be in rural areas. Unless otherwise advised, students pay their own placement travel and accommodation.'],
  ['When can I start?', 'IHM publishes intake dates on this course page (see the intake planner). Availability can differ by campus, so please confirm with admissions.'],
  ['What are the inherent requirements?', 'Inherent requirements are the essential abilities, knowledge and skills every student must meet to complete the course. Read IHM’s inherent requirements document linked in the Admissions section.'],
  ['Which English tests are accepted?', 'IHM’s published page lists IELTS Academic 7.0 overall with 7 in listening, reading and speaking and 6.5 in writing. For other tests, refer to the current IHM English policy and the NMBA standard.'],
] as const
