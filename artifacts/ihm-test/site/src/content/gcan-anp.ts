// /courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice/ — WordPress template-gcan-anp.php on course 6355
// (inc/gcan-anp/gcan-page.html, synced 2026-10-30). "Information current as at October 2026." Plain data.
export const GA_PATH = '/courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice/'
export const GA_ENQUIRY_FORM = 'https://crm.industryhub.ihna.edu.au/forms/16bc93f0-0a8b-4797-8fc8-23ab24ef6d32/?embed=true'
export const GA_APPLY = 'https://application.ihm.edu.au'

export const GA_MENU = [
  ['part1', 'Graduate Certificate'], ['part2', 'Master of Nursing pathway'], ['part3', 'Micro-credential'], ['part4', 'Two weeks in Melbourne'],
  ['part5', 'Professional experience'], ['part6', 'Clinical observation'], ['faq', 'FAQ'], ['contact', 'Contact'],
] as const

export const GA_BADGES = ['Graduate Certificate · AUD $8,000', 'With OSCE training · AUD $10,000', 'Micro-credential · AUD $5,000', 'Six start dates in 2027', 'TEQSA PRV14040'] as const

export const GA_OPTIONS = [
  ['part1', 'Part 1', 'Graduate Certificate', 'Australian Nursing Practice, three units online. AUD $8,000, or AUD $10,000 with optional two-week OSCE training.', 'See the Graduate Certificate'],
  ['part2', 'Part 2', 'Graduate Certificate + Master of Nursing', "The Graduate Certificate online, then IHM's two-year Master of Nursing on campus. Two qualifications.", 'See the progression pathway'],
  ['part3', 'Part 3', 'Micro-Credential Package', 'N8001 online plus two weeks of simulation in Melbourne. AUD $5,000. A single unit, not a full qualification.', 'See the package'],
  ['part4', 'Part 4', 'Two Weeks in Melbourne', 'OSCE preparation and nursing simulation, starting every month. Only AUD $2,000.', 'See the two-week offer'],
  ['part5', 'Part 5', 'Professional Experience Placement', 'For nurses already registered with Ahpra: four weeks of supervised clinical experience. Proposed AUD $3,000.', 'Register your interest'],
  ['part6', 'Part 6', 'Clinical Observation', 'For visiting nurses, nursing professionals and students: one week observing in Australian healthcare settings. Proposed AUD $1,000, or AUD $3,000 with Part 4.', 'See clinical observation'],
] as const

export const GA_PATHWAYS = [
  {
    id: 'explore', tag: 'Pathway 1 · Explore', title: 'Explore Australian Nursing Practice', best: 'registered nurses from overseas who want to understand Australian nursing before deciding their next step.',
    points: ['Australian nursing education online, with optional two weeks in Melbourne', 'Australian standards, cultural safety and person-centred care', 'Take your practice home, or plan your next step, including the Master of Nursing on campus'],
    option: 'Hybrid Global Edition (study from home, with optional ten days in Melbourne), with progression to the on-campus Master of Nursing.',
  },
  {
    id: 'prepare', tag: 'Pathway 2 · Prepare', title: 'Prepare for Australian Nursing Registration', best: 'nurses in the NMBA/Ahpra assessment process (for example, preparing for the OSCE).',
    points: ['For nurses in the NMBA/Ahpra assessment process', 'Online academic learning with simulation in Melbourne', 'Optional two-week OSCE training in Melbourne'],
    option: 'Hybrid Global Edition, ideally with the optional two-week OSCE training (AUD $10,000 total). Preparation only — the OSCE is run by Ahpra and no result is guaranteed.',
  },
  {
    id: 'advance', tag: 'Pathway 3 · Advance', title: 'Advance Your Nursing Career', best: 'nurses already registered with the NMBA who want an Australian postgraduate qualification.',
    points: ['For nurses already registered with the NMBA', 'Australian workplace expectations and networks', "A first step towards IHM's Master of Nursing"],
    option: "Hybrid Global Edition (online, one unit at a time, if your visa permits study), then the two-year Master of Nursing on campus. Only N9001 is intended to receive credit, subject to IHM's Credit Policy.",
  },
] as const

/** Pathway quiz: registration status → pathway; study plan refines the advice. */
export const GA_QUIZ = {
  registration: [['nmba', 'I am already registered with the NMBA (Ahpra)', 'advance'], ['assessment', 'I am in the NMBA assessment process (for example, preparing for the OSCE)', 'prepare'], ['home', 'I am a registered nurse in my home country only', 'explore']],
  plan: [['mon', 'The Graduate Certificate online, then the Master of Nursing on campus in Melbourne'], ['gcan', 'The Graduate Certificate only, mostly from home with a short stay in Melbourne']],
} as const

/** Compare table: [row, explore, prepare, advance] */
export const GA_COMPARE = [
  ['Objective', 'Understand and experience Australian nursing practice', 'Build Australian practice knowledge and OSCE readiness alongside accredited study', 'Strengthen your Australian career with a postgraduate qualification'],
  ['Registration status', 'Registered in your home country', 'In the NMBA/Ahpra assessment process', 'Registered with the NMBA'],
  ['Study arrangement', 'Hybrid Global Edition', 'Hybrid Global Edition, with optional OSCE training', 'Hybrid Global Edition (study while you work, if your visa permits), then the Master of Nursing on campus'],
  ['Two-week OSCE training', 'Optional; builds clinical confidence', 'Optional; recommended for your goal', 'Optional'],
  ['Potential benefits', 'AQF Level 8 qualification; Australian standards; time to plan your next step', 'Structured practice in Australian scenarios', 'Australian workplace expectations and networks; first step towards the Master of Nursing*'],
  ['Please note', 'Does not lead to NMBA registration', 'No OSCE result, date or venue is guaranteed; the NMBA does not endorse preparation programs', 'Employment is never guaranteed'],
] as const

export const GA_UNITS = [
  ['Unit 1 · 12 credit points', 'N9001', 'Professional Issues and Policies in Nursing. Your starting point: the Australian health system, policy and professional practice.'],
  ['Unit 2 · 12 credit points', 'N8001', 'Australian Nursing Practice. Assessment and management of complex conditions, person-centred care and cultural safety.'],
  ['Unit 3 · 8 credit points', 'N8002', 'Professional Reflection in Australian Nursing Practice. Reflect on your practice, including what you practised in simulation.'],
] as const

/** 2027 intakes: [weekday, day, month, apply by, total, results, N9001, N8001, OSCE, N8002, results date] */
export const GA_INTAKES = [
  ['4', 'January', 'Apply by 30 Dec', '24 weeks', '4 Jan 2027', '4 Jan – 21 Feb', '1 Mar – 18 Apr 2027', '3 May – 14 May 2027', '3 May – 20 Jun 2027', '9 Jul 2027'],
  ['1', 'March', 'Apply by 24 Feb', '25 weeks', '1 Mar 2027', '1 Mar – 18 Apr', '3 May – 20 Jun 2027', '5 Jul – 16 Jul 2027', '5 Jul – 22 Aug 2027', '10 Sep 2027'],
  ['3', 'May', 'Apply by 28 Apr', '25 weeks', '3 May 2027', '3 May – 20 Jun', '5 Jul – 22 Aug 2027', '6 Sep – 17 Sep 2027', '6 Sep – 24 Oct 2027', '12 Nov 2027'],
  ['5', 'July', 'Apply by 30 Jun', '24 weeks', '5 Jul 2027', '5 Jul – 22 Aug', '6 Sep – 24 Oct 2027', '1 Nov – 12 Nov 2027', '1 Nov – 19 Dec 2027', '14 Jan 2028'],
  ['6', 'September', 'Apply by 1 Sep', '24 weeks', '6 Sep 2027', '6 Sep – 24 Oct', '1 Nov – 19 Dec 2027', '3 Jan – 14 Jan 2028', '3 Jan – 20 Feb 2028', '10 Mar 2028'],
  ['1', 'November', 'Apply by 27 Oct', '25 weeks', '1 Nov 2027', '1 Nov – 19 Dec', '3 Jan – 20 Feb 2028', '6 Mar – 17 Mar 2028', '6 Mar – 23 Apr 2028', '12 May 2028'],
] as const

export const GA_ENTRY = [
  'Bachelor of Nursing or equivalent, or a three-year Diploma of Nursing leading to RN registration plus at least one year of experience',
  'Current registration as a nurse (home country or Ahpra)',
  "English language proficiency, or an English waiver where eligible: see IHM's English Language Proficiency or English Waiver requirements",
  'N9001 is always your first unit; you study one unit at a time (Hybrid Global Edition)',
] as const
export const GA_VISAS = [
  'Hybrid Global Edition: not available to student-visa holders; online study from overseas needs no Australian visa, and you are responsible for a visa that permits travel if you choose the optional OSCE training',
  'Master of Nursing and micro-credential visa information is in Part 2 and Part 3',
  'IHM does not give migration advice. Check with the Department of Home Affairs',
] as const

export const GA_STEP1 = [
  ['For', 'International nurses studying from home overseas, or in Australia on a visa that permits study. Not for student-visa holders'],
  ['Teaching', 'One unit at a time, online, in seven-week blocks: N9001, then N8001, then N8002'],
  ['In Melbourne', 'Two weeks, 10-day OSCE simulation (Optional).'],
  ['Duration', 'About 24–25 weeks for every 2027 start date, then results'],
  ['Fee', 'AUD $8,000 for the programme, or AUD $10,000 with the optional OSCE training (subject to approval)'],
  ['Starts', 'Six start dates in 2027'],
  ['Outcome', 'Graduate Certificate in Advanced Nursing (AQF Level 8). Does not confer NMBA registration'],
] as const
export const GA_STEP3 = [
  ['Duration', 'Two years, on campus in Melbourne. This is not an accelerated course'],
  ['Credit', "Only N9001 Professional Issues and Policies in Nursing, which is common to both courses, is intended to receive credit, subject to IHM's Credit Policy"],
  ['Entry', 'Subject to Master of Nursing admission requirements, including English language requirements'],
  ['Visa', 'You need a visa that permits on-campus study in Australia, usually a student visa (subclass 500), and must meet Home Affairs requirements'],
  ['Outcome', 'Master of Nursing from IHM, your second qualification'],
] as const

export const GA_MC_EXPERIENCE = [
  ['Australian standards and practices', 'NMBA standards for practice, the NSQHS Standards, ISBAR and clinical documentation'],
  ['Intensive simulation', 'realistic scenarios in our North Melbourne simulation laboratory, in small groups'],
  ['Experienced educators', 'Australian registered nurses, with specialty educators and practitioners contributing'],
  ['Cultural safety', 'culturally safe care, including Aboriginal and Torres Strait Islander health'],
  ['Recognition', 'an academic transcript for N8001 when it is completed with assessment, and a certificate of completion for the Melbourne training. Student-visa holders who take N8001 as a non-assessed CPD programme receive a certificate of completion, not a transcript or academic credit. Credit towards the GCAN and any CPD recognition apply only under approved arrangements'],
] as const
export const GA_SPECIALTIES = ['Critical care', 'Emergency', 'Aged care', 'Mental health', 'Perioperative', 'Paediatric', 'Renal', 'Rehabilitation', 'Community', 'Leadership and patient safety', 'Digital health'] as const
export const GA_MC_AUDIENCES = [
  ['Internationally qualified nurses', 'Considering Australian registration, from India, the UK, Ireland, Singapore, Japan, China and beyond'],
  ['Australian-registered, living overseas', 'Refresh your knowledge of current Australian practice before you return'],
  ['Exploring, not registering', 'Experience how nursing works in Australia for your own professional growth'],
  ['Experienced specialist nurses', 'Compare your specialty with Australian practice and models of care'],
] as const
export const GA_REG_PATHWAYS = [
  'New Zealand: registration under the Trans-Tasman Mutual Recognition Act, in the same category as current New Zealand practising registration',
  'Comparable jurisdictions (including the UK, Ireland, the United States, Singapore and Spain): the NMBA streamlined standard, in effect since 23 April 2025, with no NMBA examinations for eligible nurses who meet its practice criteria',
  'Other internationally qualified nurses: NMBA assessment in Stream A, or Stream B, which includes the MCQ exam and the OSCE',
] as const
export const GA_PARTNER_INCLUDES = [
  'N8001 Australian Nursing Practice studied online as a cohort, before arrival or early in employment',
  'Australian healthcare orientation module: the health system, NMBA standards, the NSQHS Standards, person-centred and culturally safe care',
  "Two weeks of simulation-based training at North Melbourne, tailored to your service, your nurses' backgrounds and their specialty",
  'Specialty-focused sessions, for example aged care, mental health, critical care or perioperative',
  'Customised cohorts and dates, with group enrolments and negotiated group discounts',
] as const
export const GA_MC_KEY = [
  ['N8001 start dates', '4 Jan, 1 Mar, 3 May, 5 Jul, 6 Sep, 1 Nov 2027'],
  ['Melbourne training', 'Two weeks every month, January to December 2027, starting the first Monday of the month'],
  ['Where', 'IHM North Melbourne campus, simulation laboratory'],
  ['Fee', 'AUD $5,000 for the package (subject to IHM fee approval). Group discounts negotiated for partner groups'],
  ['Group programs', 'Customised dates and specialty focus for hospital and institutional cohorts, with negotiated group discounts'],
] as const
export const GA_MC_VISA = [
  'Most participants studying from overseas will need an Australian visitor visa for the two weeks in Melbourne',
  'Visa type depends on your passport. Home Affairs advises people entering health-care or training environments as nurses to apply for a Visitor visa (subclass 600), which may need health checks',
  'Visitor visas allow up to three months of study and no work. The Melbourne training is simulation only, not a clinical placement or employment',
  'Check current requirements at immi.homeaffairs.gov.au. IHM does not give migration advice',
] as const
/** Monthly Melbourne runs 2027: [month, dates, N8001 intake month?, note] */
export const GA_MONTHLY = [
  ['Jan', '4–15 Jan', true, ''], ['Feb', '1–12 Feb', false, ''], ['Mar', '1–12 Mar', true, 'Labour Day · make-up day scheduled'], ['Apr', '5–16 Apr', false, ''],
  ['May', '3–14 May', true, ''], ['Jun', '7–18 Jun', false, "King's Birthday · make-up day scheduled"], ['Jul', '5–16 Jul', true, ''], ['Aug', '2–13 Aug', false, ''],
  ['Sep', '6–17 Sep', true, ''], ['Oct', '4–15 Oct', false, ''], ['Nov', '1–12 Nov', true, 'Melbourne Cup Day · make-up day scheduled'], ['Dec', '6–17 Dec', false, ''],
] as const
/** [N8001 start, block ends, earliest Melbourne training for the full package] */
export const GA_PACKAGE_DATES = [
  ['4 Jan 2027', '19 Feb', '1 Mar 2027'], ['1 Mar 2027', '16 Apr', '3 May 2027'], ['3 May 2027', '18 Jun', '5 Jul 2027'],
  ['5 Jul 2027', '20 Aug', '6 Sep 2027'], ['6 Sep 2027', '22 Oct', '1 Nov 2027'], ['1 Nov 2027', '17 Dec', '3 Jan 2028'],
] as const

export const GA_TWO_WEEKS = [
  ['January', '4 Jan – 15 Jan', ''], ['February', '1 Feb – 12 Feb', ''], ['March', '1 Mar – 15 Mar', 'Labour Day, Mon 8 Mar: no training. Tenth day on Mon 15 Mar'],
  ['April', '5 Apr – 16 Apr', ''], ['May', '3 May – 14 May', ''], ['June', '7 Jun – 21 Jun', "King's Birthday, Mon 14 Jun: no training. Tenth day on Mon 21 Jun"],
  ['July', '5 Jul – 16 Jul', ''], ['August', '2 Aug – 13 Aug', ''], ['September', '6 Sep – 17 Sep', ''], ['October', '4 Oct – 15 Oct', ''],
  ['November', '1 Nov – 15 Nov', 'Melbourne Cup Day, Tue 2 Nov: no training. Tenth day on Mon 15 Nov'], ['December', '6 Dec – 17 Dec', ''],
] as const
export const GA_OSCE_FOCUS = [
  'OSCE familiarisation: timed practice in simulated stations, with structured feedback and a mock OSCE',
  'NMBA standards: practice mapped to the Registered nurse standards for practice and the Code of conduct for nurses',
  'Core skills: person-centred assessment and care planning, ISBAR handover, medication safety, infection prevention and documentation',
  'Recognising and responding to clinical deterioration in simulation',
] as const
export const GA_SIM_FOCUS = [
  'How Australian healthcare works: the health system, the NSQHS Standards and the roles of nurses',
  'Person-centred and culturally safe care, including Aboriginal and Torres Strait Islander health',
  'Communication and teamwork: handover, escalation and working in Australian clinical teams, practised in simulation',
  'Specialty taster sessions when numbers allow, such as aged care, mental health or critical care',
] as const
export const GA_FOUR_GROUPS = [
  ['Nurses progressing through Ahpra registration', 'OSCE preparation focus', 'Internationally qualified nurses in Stream B of the NMBA assessment process who need practice before the OSCE.', 'The NMBA requires Orientation Part 1, the portfolio and the MCQ exam before the OSCE. The NMBA does not run or endorse preparation programs.'],
  ['Nurses planning to migrate or work in Australia', 'Simulation experience', 'Internationally qualified nurses who want exposure to Australian nursing practice before relocating or exploring employment.', 'You must hold NMBA registration before working as a nurse in Australia. Your pathway depends on where you qualified and are registered.'],
  ['Overseas nurses exploring Australian approaches', 'Simulation experience', 'Registered nurses who want short-term professional development in how nursing is practised in Australia.', 'A professional development experience; it does not change your registration status at home or in Australia.'],
  ['International Bachelor of Nursing student cohorts', 'Simulation experience', 'Students joining an exchange or an organised university group to experience Australian nursing practice as part of their studies.', 'Any recognition towards your Bachelor of Nursing requires agreement with your home institution. Groups are arranged with the university.'],
] as const
export const GA_TW_ELIGIBILITY = [
  'Nurses: current registration as a nurse in your home country or in Australia',
  'Students: current enrolment in a Bachelor of Nursing, nominated through your university',
  'English: enough English to take part safely in simulation; IHM will confirm the level required',
  'Visas: most overseas participants need a visitor visa. Home Affairs advises people who will study to be a nurse or enter health-care environments to apply for a Visitor visa (subclass 600), which may need health checks. Visitor visas allow up to three months of study and no work',
  'Not included: travel, accommodation, visa, insurance and NMBA or Ahpra examination fees. Check current requirements at immi.homeaffairs.gov.au; IHM does not give migration advice',
] as const
export const GA_TW_ISNOT = [
  'It is structured learning in a simulated clinical environment, with manikins, role-players and educator feedback',
  'It is not a clinical placement, registered nursing practice or direct patient-care experience',
  'It does not lead to NMBA registration or guarantee an OSCE result, date or venue. The OSCE is held by Ahpra in Adelaide or Melbourne',
  'It does not guarantee employment, a visa or a migration outcome, and it does not carry academic credit',
  'Participants receive a certificate of attendance from IHM',
] as const

export const GA_PEP_WHO = [
  'Nurses who have recently gained Australian registration through the NMBA assessment process, including the OSCE, and have not yet worked in Australia',
  'Nurses registered through recognition pathways, such as the streamlined pathway for nurses from the UK, Ireland and other comparable jurisdictions, or Trans-Tasman mutual recognition for New Zealand nurses, who want local experience before applying for roles',
  "Graduates of IHM's Parts 1 to 4 who have since gained registration. Completing those options does not itself give you registration",
  'Registered nurses returning to or re-entering Australian practice who want a structured, supported start (subject to any conditions on your registration)',
] as const
export const GA_PEP_WEEKS = [
  ['Before you start', 'Suitability conversation, registration and visa check, police check, immunisation records and host requirements'],
  ['Week 1', 'Host orientation and IHM induction: local policies, systems, safety and your learning plan'],
  ['Weeks 2–3', 'Supervised experience with an experienced Australian registered nurse, at a level agreed with the host'],
  ['Each week', 'IHM reflective sessions linked to the NMBA Registered nurse standards for practice'],
  ['Week 4', 'Supervisor feedback, a professional portfolio, and IHM support with your CV and interview preparation'],
] as const
export const GA_PEP_SUPPORTS = [
  'Experience Australian models of care, documentation and clinical handover in a real workplace',
  'Understand team roles, escalation and person-centred, culturally safe care in practice',
  'Build confidence and professional networks',
  'Reflect on your practice against the NMBA standards, with IHM educators',
  'Leave with a portfolio of your learning and support to prepare job applications',
] as const
export const GA_PEP_NOTE = [
  'Placements depend on partner availability and suitability. A placement is not guaranteed, and we will only confirm one once a host agrees',
  'The placement does not guarantee employment, a reference, a visa or a migration outcome',
  'It does not change your registration, carry academic credit or count towards any IHM qualification',
  'The level of hands-on involvement depends on the host and the approved placement model, and any conditions on your registration',
  'Your visa must permit this activity. Visitor visas do not allow work, including unpaid work that would normally be paid. IHM does not give migration advice',
] as const
/** [row, simulation (Parts 1, 3, 4), observation (Part 6), placement (Part 5)] */
export const GA_SOP = [
  ['Who', 'Nurses and nursing students, registered or not', 'Visiting overseas nurses, nursing professionals and nursing students', 'Nurses with current Ahpra registration only'],
  ['Where', "IHM's North Melbourne simulation laboratory", 'A host hospital or aged care home, subject to host approval', 'An Australian partner workplace, such as a hospital or aged care home'],
  ['What you do', 'Practise in simulated scenarios with manikins and role-players', 'Watch and discuss care with a supervisor; no hands-on involvement', 'Supervised experience in a real healthcare setting'],
  ['Patient contact', 'None', 'Observation only, with patient consent', 'As agreed with the host and the approved model'],
  ['Length and fee', 'Two weeks; fees as shown in each part', 'One week; proposed AUD $1,000', 'Four weeks; proposed AUD $3,000'],
] as const

export const GA_OBS_WHO = [
  ['Visiting overseas-qualified nurses', 'Registered nurses from other countries who want to see Australian nursing first-hand, for professional development or before deciding on future steps.', 'Observation is not nursing practice and does not count towards Australian registration.'],
  ['Nurse educators, managers and other nursing professionals', 'Leaders and educators who want to compare models of care, aged care practice, patient safety and clinical education.', 'Delegations and study tours can be arranged for groups.'],
  ['Overseas nursing students', 'Bachelor of Nursing students in organised university groups or exchanges who want an Australian perspective on nursing.', 'Any recognition towards your studies requires agreement with your home institution.'],
  ['Institutional groups from Southeast Asia and China', 'Nursing schools, hospitals and associations in countries such as Vietnam, the Philippines, Indonesia, Thailand, Malaysia, Singapore and China.', 'Group programs can combine Part 4 and Part 6, with group enquiries handled by our team.'],
  ['Visitors already in Australia', 'People in Australia on a working holiday or another visa who are interested in Australian nursing.', 'Eligibility depends on your individual visa conditions, not the visa type alone. Please check before you enquire.'],
  ['Nurses preparing for the OSCE', 'Nurses in the NMBA assessment process who want to see Australian care after two weeks of OSCE preparation in Part 4.', 'Observation does not prepare you for, or guarantee, an OSCE result.'],
] as const
export const GA_OBS_WEEK = [
  ['Before you arrive', 'Suitability check; host requirements such as police checks, immunisation records and a confidentiality agreement; travel and insurance guidance'],
  ['Day 1', 'IHM briefing on professional conduct, privacy, patient consent and infection prevention; host orientation'],
  ['Days 2–4', 'Observation with a designated supervisor in wards, units or aged care settings, with daily IHM debriefs'],
  ['Day 5', 'Reflection session on what you observed, linked to Australian standards, and a certificate of attendance'],
] as const
export const GA_OBS_RULES = [
  'You will not assess, examine, treat or perform procedures, or give any care',
  'You will always be with a supervisor and never left alone with patients or residents',
  'Patients and residents are asked for consent to your presence and may decline at any time; you may be asked to leave a room',
  'Everything you see is confidential. No photos, recordings or notes that identify anyone',
  'Hosts set their own rules and may end an observation at any time',
] as const
export const GA_OBS_NEED = [
  'Host approval: every observer must be accepted by the host organisation. A place is not guaranteed',
  'Checks: police checks, including from countries you have lived in, and immunisation evidence as the host requires',
  'Visa: a visa that permits this visit. Many visitors need a Visitor visa (subclass 600); people entering hospital environments may need health examinations. Observation must not become work. Check with Home Affairs; IHM does not give migration advice',
  'Insurance: travel and health insurance for your stay',
  'Time: allow at least eight weeks before your preferred start for checks and approvals',
] as const
export const GA_OBS_GROUP = ['Program outline and learning objectives for your institution', 'Group invitation letter on request, to support visa applications', 'Pre-departure briefing on requirements and timelines', 'Daily debriefs with IHM nurse educators'] as const

export const GA_DOES = [
  'Award an AQF Level 8 Graduate Certificate from IHM, a TEQSA-registered Institute of Higher Education',
  'Teach Australian nursing practice through accredited units',
  'Offer practical OSCE preparation, separate from the accredited units',
  "Connect you with a pathway into IHM's Master of Nursing*",
] as const
export const GA_DOES_NOT = [
  'Lead to NMBA registration or replace any NMBA assessment stage',
  'Guarantee an OSCE result, date or venue',
  'Guarantee employment, a visa or a migration outcome',
  'Allow you to work as a nurse unless you hold NMBA registration',
] as const

export const GA_FAQS = [
  ['Is N8001 really available at every intake?', "That is IHM's plan for 2027 for the Australian Nursing Practice stream, subject to approval: N8001 at all six intakes, so you move from N9001 to N8001 without waiting. Other GCAN specialty units run three times a year."],
  ['How long will it take?', 'Hybrid Global Edition: about 24–25 weeks of teaching for every 2027 start date, then results about three weeks later.'],
  ['Can IHM guarantee a placement or a job?', 'No. The Professional Experience Placement (Part 5) depends on partner availability and your suitability, and it does not guarantee employment. It is only for nurses who already hold Australian registration.'],
  ['What is the difference between simulation, clinical observation and a professional experience placement?', "Simulation (Parts 1, 3 and 4) is practice in IHM's simulation laboratory. Clinical observation (Part 6) is one week watching care in a host hospital or aged care home, with no hands-on involvement. A professional experience placement (Part 5) is four weeks of supervised experience for nurses who already hold Australian registration."],
  ['Can I combine Part 4 and Part 6?', 'Yes. Two weeks of training at North Melbourne (AUD $2,000) followed by one week of clinical observation (AUD $1,000) makes a three-week program for AUD $3,000. The observation week depends on host availability.'],
  ['Is the two-week OSCE training compulsory?', 'No. It is optional. The Graduate Certificate programme is AUD $8,000; with the two-week on-campus OSCE training it is AUD $10,000 in total (fees subject to approval). The micro-credential package is a separate offer at AUD $5,000.'],
  ['Which pathway should I choose?', 'Choose by your registration status and goals: Explore if you are registered overseas only, Prepare if you are in the NMBA assessment process, Advance if you are already NMBA-registered. You study the same course in each.'],
  ['Can I continue to the Master of Nursing?', "Yes, that is the intended pathway. After the Graduate Certificate you can apply for IHM's two-year Master of Nursing on campus in Melbourne, subject to admission and visa requirements. Only N9001 is intended to receive credit towards the Master of Nursing. Gaining the Graduate Certificate does not confer NMBA registration."],
  ['Will this help me pass the OSCE?', 'It gives you structured practice and feedback in Australian clinical scenarios. No provider can guarantee an OSCE result.'],
  ['Are these dates final?', 'No. The 2027 dates are subject to approval. Your Letter of Offer confirms your dates.'],
] as const

/** Course team: profile pages and portraits only (no personal email or direct lines, AGENTS.md rule 4). */
export const GA_TEAM = [
  { name: 'Wilma Jasmine Crasta', role: 'Course Coordinator - Graduate Certificate in Advanced Nursing', label: 'Course Coordinator', profile: '/ms-wilma-jasmine-crasta/', photo: '/images/people/wilma-jasmine-crasta.webp' },
  { name: 'Anjali Abraham', role: 'Course Manager - Graduate Certificate in Advanced Nursing', label: 'Course Manager', profile: '/anjali-abraham/', photo: '/images/people/anjali-abraham.webp' },
] as const
