// /nursing-specialisation-pathway/ — WordPress template-nursing-specialisation-pathway.php (page 10423, synced 2026-10-30).
// Plain data; images in public/images/nursing-pathway/ (from the theme's assets/nursing-pathway/images/).
export const NP_LINKS = {
  gcanPage: '/graduate-certificate-in-advanced-nursing/',
  monPage: '/courses/master-of-nursing-online/',
  gcanEnquire: '/graduate-certificate-in-advanced-nursing/#quickContact',
  monEnquire: '/courses/master-of-nursing-online/#quickContact',
  applyGcan: 'https://courses.ihm.edu.au/admissions/apply/',
  applyMon: 'https://application.ihm.edu.au/',
  monGuide: '/brochures/IHM_NEW_Brochures/MON_Online.pdf',
  gcanGuide: '/brochures/IHM_NEW_Brochures/IHM_GCAN_Brch_23.pdf',
  credit: '/credit-and-recognition-of-prior-learning/',
  english: '/english-language-proficiency-entry-requirements/',
  feesPolicy: '/pdf/policies/IHM_Fees_Charges_and_Refunds_for_Domestic_Students_Policy.pdf',
  registration: '/nursing-registration-in-australia/',
} as const

export const NP_MENU = [
  ['overview', 'Overview'], ['specialisations', 'Specialisations'], ['pathway', 'Pathway'], ['masters', 'Research · Education · Leadership'],
  ['structure', 'Structure'], ['admission', 'Entry and fees'], ['faq', 'FAQ'],
] as const

export const NP_TAGS = ['100% online', '12 specialisations', 'One-semester credit pathway', 'Research', 'Education', 'Leadership and management', 'AQF Level 9', 'TEQSA-accredited', 'Study while you work'] as const

export const NP_TAKEAWAYS = [
  ['Start specialised.', 'Choose from 12 Graduate Certificate specialisations, from Critical Care to Renal Nursing.'],
  ['Your specialisation can count.', 'Eligible graduates may receive one semester of credit (three units) towards the Master of Nursing.'],
  ['Step up to Master’s level.', 'Build research, education and leadership and management capability.'],
  ['Two qualifications, one pathway.', 'Graduate Certificate (AQF 8), then Master of Nursing (AQF 9).'],
  ['Fits around your shifts.', 'Fully online, with recorded classes and part-time options.'],
] as const

/** [label, Graduate Certificate, Master of Nursing] */
export const NP_FACTS = [
  ['AQF level', 'Level 8', 'Level 9'],
  ['Accreditation', 'TEQSA', 'TEQSA'],
  ['Delivery', '100% online', '100% online'],
  ['Duration', '26 weeks full-time / 52 weeks part-time', '2 years full-time / 4 years part-time (full course). Remaining 1.5 years full-time after one-semester credit.'],
  ['Units', '3 units (1 core + 2 specialisation)', '12 units (8 core + 4 optional). May receive credit for 3 units'],
  ['Credit points', '32 credit points', '128 credit points'],
  ['Specialisations', '12', 'Builds on your chosen specialisation'],
  ['Focus', 'Deep specialty knowledge', 'Research · Education · Leadership and management'],
] as const

export const NP_WHY = [
  ['Depth where it matters.', 'Modern healthcare is organised around specialty teams. Advanced knowledge of the conditions, treatments and evidence in your field strengthens your clinical reasoning and confidence with complex patients.'],
  ['Grounded in your practice.', 'Study the specialty you work in now, or the one you want to move into, and apply it straight away on shift.'],
  ['A specialty lens for your Master’s.', 'Your research questions, education projects and leadership initiatives in the Master of Nursing can draw on your specialty — so your degree builds expertise rather than starting from general principles.'],
  ['A qualification in its own right.', 'Graduate with an AQF Level 8 Graduate Certificate in your chosen specialisation, whether or not you continue.'],
  ['Professional development that counts.', 'Relevant formal study can contribute to your annual NMBA continuing professional development (CPD) requirements.'],
] as const

export type NpGroup = 'acute' | 'surgical' | 'life' | 'community'
export const NP_FILTERS: [NpGroup | 'all', string][] = [['all', 'All 12'], ['acute', 'Acute and critical'], ['surgical', 'Surgical and specialty'], ['life', 'Across the lifespan'], ['community', 'Chronic and community']]

export type NpSpec = { title: string; summary: string; settings: string; course: string; group: NpGroup; image: string }
const img = (slug: string) => `/images/micro-credentials/${slug}.webp`
export const NP_SPECS: NpSpec[] = [
  { title: 'Critical Care Nursing', summary: 'Advanced assessment and management of critically ill patients, including haemodynamic monitoring and organ support principles.', settings: 'ICU, HDU, coronary care', course: '/courses/graduate-certificate-in-advanced-nursing-critical-care-nursing/', group: 'acute', image: img('critical-care-nursing') },
  { title: 'Acute Care Nursing', summary: 'Recognising and responding to clinical deterioration, and managing complex acute medical and surgical conditions.', settings: 'Medical and surgical wards', course: '/courses/graduate-certificate-in-advanced-nursing-acute-care-nursing/', group: 'acute', image: img('acute-care-nursing') },
  { title: 'Emergency Nursing', summary: 'Triage, rapid assessment and time-critical care across the lifespan.', settings: 'Emergency departments, urgent care', course: '/courses/graduate-certificate-in-advanced-nursing-emergency-nursing/', group: 'acute', image: img('emergency-nursing') },
  { title: 'Neonatal Nursing', summary: 'Care of the well, preterm and unwell newborn, and family-centred care.', settings: 'Neonatal units, special care nurseries', course: '/courses/graduate-certificate-in-advanced-nursing-neonatal-nursing/', group: 'life', image: img('neonatal-nursing') },
  { title: 'Paediatric Nursing', summary: 'Developmentally appropriate assessment and care of infants, children and adolescents.', settings: 'Paediatric wards, child health services', course: '/courses/graduate-certificate-in-advanced-nursing-paediatric-nursing/', group: 'life', image: img('paediatric-nursing') },
  { title: 'Mental Health Nursing', summary: 'Recovery-oriented, trauma-informed mental health assessment and therapeutic engagement.', settings: 'Inpatient and community mental health', course: '/courses/graduate-certificate-in-advanced-nursing-mental-health-nursing/', group: 'community', image: img('mental-health-nursing') },
  { title: 'Gerontology Nursing', summary: 'Person-centred care of older people, including frailty, dementia and multimorbidity.', settings: 'Aged care, sub-acute and community care', course: '/courses/graduate-certificate-in-advanced-nursing-gerontology-nursing/', group: 'life', image: img('gerontology-nursing') },
  { title: 'Orthopaedic Nursing', summary: 'Musculoskeletal assessment, trauma and elective orthopaedic care, and rehabilitation.', settings: 'Orthopaedic and rehabilitation wards', course: '/courses/graduate-certificate-in-advanced-nursing-orthopaedics-nursing/', group: 'surgical', image: img('orthopaedic-nursing') },
  { title: 'Diabetes Nursing', summary: 'Diabetes pathophysiology, management, self-management education and complication prevention.', settings: 'Endocrine, primary and community care', course: '/courses/diabetes-nursing/', group: 'community', image: img('diabetes-nursing') },
  { title: 'Palliative Care Nursing', summary: 'Symptom management, end-of-life care, and support for families and carers.', settings: 'Palliative care, hospice, aged care', course: '/courses/palliative-care-nursing/', group: 'community', image: img('palliative-care-nursing') },
  { title: 'Perioperative Nursing', summary: 'Pre-operative, intra-operative and post-anaesthesia care and patient safety.', settings: 'Operating theatres, day surgery, PACU', course: '/courses/perioperative-nursing/', group: 'surgical', image: img('perioperative-nursing') },
  { title: 'Renal Nursing', summary: 'Chronic kidney disease, dialysis therapies and transplant-related care.', settings: 'Renal and dialysis units', course: '/courses/renal-nursing/', group: 'surgical', image: img('renal-nursing') },
]

export const NP_STEPS = [
  ['Choose and enrol', 'Choose your specialisation and enrol in the Graduate Certificate in Advanced Nursing.'],
  ['Study three units online', '1 core unit and 2 specialisation units over 26 weeks full-time or 52 weeks part-time.'],
  ['Graduate — AQF Level 8', 'Graduate with your Graduate Certificate in Advanced Nursing, a complete qualification in its own right.'],
  ['Apply for the Master’s', 'Apply for the Master of Nursing (Online). Eligible GCAN graduates may receive one semester of credit (3 units).'],
  ['Complete at Master’s level', 'Around 1.5 years full-time remaining after credit, focusing on research, education and leadership and management.'],
] as const

export const NP_FOCUS = [
  { id: 'research', label: 'Research', title: 'Ask and answer the questions that change practice', develop: 'Appraise evidence, design and conduct research, and translate findings into safer, better care in your specialty.', units: ['N9006 Research in Nursing', 'N9007 Evidence-Based Practice in Nursing', 'N9009 Research for Practice', 'N9014 Nursing Project (32 cp, final-semester option)'], lead: 'Nurse researcher, clinical research nurse, evidence-based practice and quality improvement roles', image: '/images/nursing-pathway/study.webp' },
  { id: 'education', label: 'Education', title: 'Develop the next generation of nurses', develop: 'Design learning for colleagues and patients, mentor and precept, and build a professional portfolio.', units: ['N9011 Education for Practice', 'N9013 ePortfolio', 'N9010 Evolution and Innovation in Nursing'], lead: 'Clinical nurse educator, staff development nurse, preceptor and academic pathways', image: '/images/nursing-pathway/community.webp' },
  { id: 'leadership', label: 'Leadership and management', title: 'Lead teams and shape services', develop: 'Lead clinical teams, manage risk and patient safety, and respond to health policy and global health issues.', units: ['N9008 Clinical Leadership and Management in Nursing', 'N9005 Patient Safety and Risk Management', 'N9012 Contemporary Issues in Global Health'], lead: 'Associate nurse unit manager, nurse unit manager, team leader, patient safety and quality roles', image: '/images/nursing-pathway/lead.webp' },
] as const

/** [semester, credit points, units: [title, cp]] */
export const NP_SEMESTERS: [string, string, [string, string][]][] = [
  ['Semester 1', '32 (credit)', [['Credit for Graduate Certificate in Advanced Nursing (3 units), subject to assessment', '']]],
  ['Semester 2', '32', [['N9005 Patient Safety and Risk Management', '12'], ['N9006 Research in Nursing', '12'], ['N9007 Evidence-Based Practice in Nursing', '8']]],
  ['Semester 3', '32', [['N9008 Clinical Leadership and Management in Nursing', '12'], ['N9009 Research for Practice', '12'], ['N9010 Evolution and Innovation in Nursing', '8']]],
  ['Semester 4', '32', [['Option 1 — Education and global health: N9011 Education for Practice (12) · N9012 Contemporary Issues in Global Health (12) · N9013 ePortfolio (8)', ''], ['Option 2 — Research: N9014 Nursing Project', '32']]],
]

export const NP_OUTCOMES = [
  'Synthesise knowledge of the Australian healthcare system to critically analyse the impact of socio-political issues and health policies on the scope of nursing practice.',
  'Synthesise nursing and pathophysiological knowledge, applying clinical reasoning when conducting nursing assessments in the treatment and management of complex health conditions of patients.',
  'Appraise evidence-based nursing research and knowledge to inform critical clinical decision-making when providing quality and safe nursing practice.',
  'Critically analyse processes of risk management to consistently ensure patients’ physical and cultural safety, demonstrating autonomy, expert professional judgement, accountability, responsibility and leadership skills, when providing optimal nursing care.',
  'Facilitate the empowerment of self and others through positive and effective communication.',
  'Critically analyse legal, ethical, social, cultural and political dynamics impacting on person-centred nursing practice in a healthcare environment.',
  'Synthesise knowledge gained from critical reflection on nursing theories and contemporary health issues to engage in debates that contribute to innovation and future direction of person-centred care.',
  'Critically evaluate research methodologies and designs and their application to generate nursing knowledge.',
] as const

/** [requirement, Graduate Certificate, Master of Nursing] */
export const NP_ADMISSION = [
  ['Qualification', 'Bachelor of Nursing or equivalent; or 3-year Diploma of Nursing leading to registration, plus at least 1 year of nursing work experience', 'Bachelor of Nursing or equivalent'],
  ['Registration', 'Ahpra-registered nurse, or registered with the nursing board/council of the country of origin or residence', 'Same'],
  ['IELTS Academic', 'Overall 6.5, no band below 6.0', 'Overall 6.5, no band below 6.0'],
  ['PTE Academic', 'Overall 59, no band below 52', 'Overall 59, no band below 52'],
  ['OET', 'C+ in each component', 'Confirm current threshold with Admissions'],
  ['EAP', 'Minimum 70%', 'Minimum 70%'],
] as const

export const NP_FEES = [
  ['Graduate Certificate — total tuition fee', 'AUD $7,750'],
  ['Graduate Certificate — administration fee (non-refundable)', 'AUD $250'],
  ['Master of Nursing (Online) — total tuition, full course', 'AUD $20,000'],
  ['Master of Nursing — tuition after credit', 'Ask Admissions'],
] as const

export const NP_CAREERS = [
  ['Specialty practice', 'Clinical Nurse or Clinical Nurse Specialist in your field'],
  ['Research', 'Clinical research nurse, nurse researcher, evidence-based practice and quality improvement roles'],
  ['Education', 'Clinical nurse educator, staff development nurse, preceptor'],
  ['Leadership and management', 'Associate Nurse Unit Manager, Nurse Unit Manager, team leader, patient safety roles'],
] as const

export const NP_FAQS = [
  ['Which specialisations articulate into the Master of Nursing?', 'All 12 Graduate Certificate in Advanced Nursing specialisations sit within the pathway. Credit towards the Master of Nursing is assessed for each applicant who meets admission requirements.'],
  ['How much credit could I receive?', 'IHM’s course pages describe credit of one semester — three units — for eligible Graduate Certificate graduates, so you would begin the Master of Nursing at Semester 2. Credit is confirmed through IHM’s credit assessment.'],
  ['Is the whole pathway online?', 'Yes. Both the Graduate Certificate and the Master of Nursing (Online) are delivered 100% online, with recorded classes.'],
  ['Can I study part-time while working?', 'Yes. The Graduate Certificate takes 52 weeks part-time, and the Master of Nursing is offered part-time. Speak with Admissions about your part-time duration after credit.'],
  ['Can I stop after the Graduate Certificate?', 'Yes. The Graduate Certificate is a complete AQF Level 8 qualification in its own right.'],
  ['Do I have to choose between research, education and leadership?', 'No. You study all three. In your final semester you choose either a research Nursing Project or the education and global health option.'],
  ['Are the courses accredited?', 'Yes. Both are accredited by the Tertiary Education Quality and Standards Agency (TEQSA).'],
  ['Who do I contact?', 'Call 1800 763 757 (within Australia) or +61 3 7046 7777, or email enquiry@ihm.edu.au.'],
] as const

/** Course leadership: public profile pages only (no personal email addresses, AGENTS.md rule 4). */
export const NP_LEADERS = [
  { initials: 'HA', name: 'Associate Professor Helen Almond', role: 'Head of School (Nursing)', profile: '/assoc-prof-helen-almond/', photo: '/images/people/helen-almond.webp' },
  { initials: 'DP', name: 'Dr Parul', role: 'Course Coordinator', profile: '/parul-p/', photo: '/images/people/parul.webp' },
  { initials: 'WC', name: 'Wilma Jasmine Crasta', role: 'Course Coordinator, IHM', profile: '/ms-wilma-jasmine-crasta/', photo: '/images/people/wilma-jasmine-crasta.webp' },
] as const
