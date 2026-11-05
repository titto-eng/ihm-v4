// Copy for the Graduate Certificate in (Advanced) Nursing campaign landing pages (CourseLanding rows in src/content/landing.ts):
// /lp/gcan/, /lp/gcan-anp/, /lp/gcan-gcc/, /lp/gcn/, /lp/graduate-certificate-advanced-nursing-critical-care/,
// /lp/graduate-certificate-in-advanced-nursing{,-all,-australia,-critical-care-nursing,-fee-help,-gcan-australia}/ and
// /lp/graduate-certificate-nursing/. Text as on the old pages (lp/<slug>/index.php; the importer missed the specialisation cards, unit
// tables, FAQs and roadmaps, which were read from the source). Images in public/images/landing/gcan/. Rendered by CampaignLanding.
import type { CampaignImage, CampaignPage, CampaignSection } from './landing-campaign'

const img = (name: string, alt: string, width: number, height: number): CampaignImage => ({ src: `/images/landing/gcan/${name}.webp`, alt, width, height })
const HERO = { src: '/images/landing/gcan/hero.webp', alt: 'Team of nurses and healthcare staff seated together' }
const HERO_TEAM = { src: '/images/landing/gcan/career-team.webp', alt: 'Student giving a thumbs up in a study area' }
const RANKED = img('ranked', 'Nurse holding books — IHM ranked in the top 10 Post Graduate Nursing Institute in Australia', 566, 543)
const STUDY = img('study', 'Students with books giving a thumbs up outside a campus building', 1380, 920)
const CAREER = img('career', 'Nurse in blue scrubs with arms crossed in a hospital meeting room', 800, 428)
const TOP10 = { value: 'Top 10', label: 'Ranked in the top 10 Post Graduate Nursing Institute in Australia' }

/** The 12 online specialisations, short descriptions (gcan-gcc, gcan-australia). */
const SPECS_SHORT: [string, string][] = [
  ['Neonatal Nursing', 'Caring for newborns with significant medical issues demands a skilled team with specialised expertise. As a neonatal nurse specialist, your focus will be on providing supportive health care of newborns.'],
  ['Renal Nursing', 'Renal nursing is a specialised area of nursing practice that treats patients with kidney disease and educates both patients and families about treatment protocols.'],
  ['Paediatric Nursing', 'This course equips general nurses with increased knowledge and abilities in the specialised area of paediatric nursing and prepare nurses to work in a range of paediatric nursing settings safely and professionally.'],
  ['Diabetes Nursing', 'Diabetes Specialist Nurses are crucial in providing good patient care and promoting self-care management in a variety of care settings.'],
  ['Critical Care Nursing', 'This specialisation will equip you to assess nursing needs for critically ill patients in a variety of clinical settings and to predict and react to changes in your patient\'s condition.'],
  ['Acute care Nursing', 'In this course nurses will broaden their area of practise to prepare nurses to manage patients diagnosed with a brief but dangerous condition.'],
  ['Emergency Nursing', 'This specialty course will prepare you to assess nursing needs for patients in emergency situations. Emergency nursing involves knowledge, confidence, and abilities to care for patients successfully.'],
  ['Mental Health Nursing', 'Rapid changes in society have created challenges for individuals and their communities. All elements of the healthcare system need professionals with skills and expertise to promote individual and community mental health.'],
  ['Gerontology Nursing', 'The world\'s population is ageing, with older members of the community forming a growing proportion of the total population. In response, this course will expand your skills in chronic conditions, dementia and end-of-life care for complex ageing populations.'],
  ['Perioperative Nursing', 'Perioperative nurses work with patients who are having operative or other invasive procedures. They help plan, implement and evaluate treatment of the surgical patient and may work closely with the patient, family members, and other health care professionals.'],
  ['Palliative Care Nursing', 'Nurses spend the greatest period of time with patients at the end of their lives and are uniquely placed to shape and improve the delivery of palliative care services in countries around the world.'],
  ['Orthopaedics Nursing', 'An orthopaedic nurse focuses on the prevention and treatment of musculoskeletal disorders and associated traumatic conditions.'],
]
/** The 12 online specialisations, course descriptions (graduate-certificate-in-advanced-nursing, -all, -fee-help). */
const SPECS_LONG: [string, string][] = [
  ['Acute Care Nursing', 'The course is specifically intended to help you improve your ability to manage an expanding number of patients with a range of diseases and with advanced study nursing needs in an acute care setting.'],
  ['Emergency Nursing', 'This specialty course will prepare you to assess nursing needs for patients in emergency situations. Emergency nursing involves knowledge, confidence, and abilities to care for patients successfully.'],
  ['Neonatal Nursing', 'This course will enhance your current nursing knowledge and abilities by focusing on neonatal nursing methods and specialised talents. You will feel confident in your ability to use these abilities when giving nursing care to a sick infant and assistance to the family'],
  ['Gerontology Nursing', 'The course will enhance your practise in modern health settings by providing evidence-based, safe, ethical, and professional treatment that complies with regulatory criteria'],
  ['Orthopaedics Nursing', 'This course will enhance your current nursing knowledge and explores the impact of acute and chronic illness, differentiation of the range of musculoskeletal dysfunction associated with trauma and emphasises assessment and management strategies within both the adult and paediatric setting.'],
  ['Diabetes Nursing', 'This course provides a systematic introduction to the fundamentals of diabetes nursing, equipping students with the information and skills necessary to pursue a career as a Diabetes nurse in a variety of healthcare settings.'],
  ['Palliative Care Nursing', 'This course provides a systematic introduction to palliative care nursing concepts, emphasising the information and skills necessary to perform as a palliative care nurse in an average life health care context'],
  ['Perioperative Nursing', 'This course provides a structured introduction to the principles of perioperative nursing, laying the groundwork for the knowledge and skills necessary to practise as a perioperative nurse who provides client-centered care prior to, during, and after surgical and invasive procedures in a variety of healthcare settings (hospitals; day surgery centres; endoscopy suites).'],
  ['Critical Care Nursing', 'Enhance your current nursing knowledge and abilities by developing critical care nursing methods and specialised talents.'],
  ['Paediatric Nursing', 'Learn about paediatric nursing and get equipped with the skills to offer high-quality and safe nursing interventions.'],
  ['Mental Health Nursing', 'Learn to assess the nursing needs of patients in a variety of clinical settings and develop a greater understanding of mental health theory and clinical practice.'],
  ['Renal Nursing', 'Renal nursing is a specialised area of nursing practice that treats patients with kidney disease and educates both patients and families about treatment protocols.'],
]
const ANP_SPEC: [string, string] = ['Australian Nursing Practice', 'The GCAN-ANP course at IHM is specifically designed to cater to the needs of overseas registered nurses who aspire to obtain Australian Nursing registration.']
const specs = (title: string, list: [string, string][]): CampaignSection => ({ kind: 'specialisations', eyebrow: 'Specialisations', title, items: list.map(([t, b]) => ({ title: t, body: [b] })) })

const ADMISSION_ONLINE: CampaignSection = {
  kind: 'prose', id: 'admission', eyebrow: 'Entry criteria', title: 'Admission Requirements', image: img('admission', 'Students giving a thumbs up outside a campus building', 450, 433),
  body: ['To be eligible for admission to the Graduate Certificate in Advanced Nursing an applicant is required to:'],
  list: [
    'Have completed a Bachelor of Nursing degree or an equivalent qualification or 3 years Diploma of Nursing leading to Registered Nurses in home country having a one year of work experience.',
    'Be an AHPRA registered nurse; or',
    'Be a registered nurse with the Nurses\' Board/Council from the country of origin or place of residence.',
  ],
}
const PATHWAY: CampaignSection = {
  kind: 'pathway', eyebrow: 'Study pathway', title: 'The pathway to advanced expertise in nursing',
  steps: [{ title: 'Graduate Certificate in Advanced Nursing (GCAN)', sub: 'Choose from 12 specialisation', meta: '26 weeks, 3 subjects' }, { title: 'Master of Nursing', meta: '78 weeks, 9 subjects' }],
}
function careers(o: { credit: string; roles: string[] }): CampaignSection[] {
  return [
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Careers', title: 'Career Opportunities',
      list: [
        'This course will help you upgrade to a supervisory position with a higher pay scale.',
        'Projected nurse shortages in Australia are expected to reach 123,000 by 2030. With a projected job growth of 13.9% for registered nurses and 23.1% for nurse managers by 2026*, there is a growing industry demand for nurses who can assume senior roles within healthcare settings. (Source: [health.gov.au](https://www.health.gov.au/))',
        `Entry pathway to Master of Nursing. ${o.credit}`,
      ],
      after: ['*2021 Employment Outlook – for the five years to November 2026, Australian Government National Skills Commission.'],
    },
    {
      kind: 'prose', title: 'Roles you can step into', image: CAREER,
      body: ['The Graduate Certificate of Advanced Nursing will equip you with the skills and knowledge to meet the demand for specialized nurses, enabling you to take a leading role in driving positive patient outcomes across various positions. Depending on the units you have completed, your expertise will qualify you for a range of roles, including'],
      list: o.roles,
    },
  ]
}
const CREDIT_FIRST = 'Credit transfer is possible for the Master\'s program, allowing you to receive the first-semester credits for the Master of Nursing course upon completion of the GCAN Online course.'
const ROLES = ['Clinical nurse educator associate', 'Unit manager', 'Clinical nurse specialist research roles.', 'Associate Nurse Unit Manager']
const QUOTE: CampaignSection = {
  kind: 'videos', eyebrow: 'Student stories', title: 'Hear from Our Students',
  intro: '"I completed my Graduate Certificate in Nursing at IHM in 2018. I highly recommend IHM! Everyone is very supportive, from teachers, admin, and technical support. I will definitely continue my diploma and master\'s degree with them!" — Romvilla Moje, student',
  videos: [{ title: 'Romvilla Moje, student', youtubeId: 'usQ-u9oWAWQ' }],
}
const FAQ_ONLINE: CampaignSection = {
  kind: 'faq', title: 'Any Questions? We Got You.',
  items: [
    { q: 'Am I eligible if I have a GNM qualification only?', a: ['If you\'ve completed your GNM/3 year Diploma and have at least 1 year of experience working as a registered nurse in any country, you are eligible for this course.'] },
    { q: 'What is the difference between AQF Level 7 and 8?', a: ['The Australian Qualifications Framework (AQF) defines the levels of education in Australia.', 'AQF Level 7 refers to a Bachelor\'s degree, which focuses on developing broad knowledge and skills for professional work and further learning.', 'AQF Level 8 includes Graduate Certificates, Graduate Diplomas, and Honours degrees, which provide advanced knowledge and specialised skills in a particular field.'] },
    { q: 'Do I still need to do NCLEX-RN if I finish GCAN?', a: ['Yes, you do. Completing the GCAN program does not replace the NCLEX-RN requirement. To become a Registered Nurse in Australia, you must successfully pass both the NCLEX-RN and the OSCE.'] },
    { q: 'Can I study this course while working full-time?', a: ['Yes, you can! This course is designed with flexibility, making it ideal for working professionals. Since it\'s completely online and self-paced, you can easily balance your studies with a full-time job.'] },
  ],
}
const FAQ_INTRO = 'We\'ve gathered answers to some of the most common questions about the Graduate Certificate in Advanced Nursing. If you need more info, feel free to reach out anytime!'
const FEE_HELP_WHO = 'Australian citizens, New Zealand Citizens (who meet the long-term residency requirements), Humanitarian Visa Holder and Pacific Engagement Visa holder can now access FEE-HELP, making it easier to pursue this prestigious qualification. Gain expertise and elevate your professional standing with support from one of Australia\'s leading institutions.'
const ADVANCE = 'Advance your nursing career with IHM Australia\'s Graduate Certificate in Advanced Nursing. This AQF Level 8 Online Postgraduate Nursing programme develops your skills for leadership roles and better pay opportunities.'
const onlineFacts = (mode: string): CampaignSection => ({ kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Mode of learning', value: mode }, { label: 'AQF Level', value: '8' }, { label: 'Duration', value: '26 weeks' }, { label: 'Approved by', value: 'TEQSA' }] })

/* ---------- the GCC / India "fast track" pair ---------- */
const WHO_BSC = ['All B.Sc. Nurses already hold an AQF (Australian Qualifications Framework) Level 7 qualification.', 'With GCAN, move to AQF Level 8 and gain a competitive edge.', 'Boost your career with specialised skills and global recognition.']
const COURSE_HIGHLIGHTS: CampaignSection = {
  kind: 'grid', tone: 'ink', eyebrow: 'Highlights', title: 'Course Highlights',
  items: ['100% Online Classes, 26 weeks', 'Recorded sessions are also available', 'Payment plans available if you\'re not eligible for FEE HELP.', '100% Credit transfer available for full 1st semester of Master of Nursing', '24*7 student support service'],
}

const GCAN_GCC: CampaignPage = {
  hero: {
    eyebrow: 'For Nurses in the GCC Countries (Oman, Kuwait, UAE, Qatar, Saudi & Bahrain)', title: 'Dreaming of Working as a Nurse in Australia?', accent: 'Nurse in Australia?', image: HERO,
    intro: ['Get on the Fast Track to AHPRA Registration and Start Your Career in Australia'],
    chips: ['Next Intakes: May 2025, July 2025, Sep 2025'],
  },
  formHeading: 'Book a Free Consultation Today',
  sections: [
    { kind: 'grid', eyebrow: 'Key Highlights', title: '100% Online & Flexible Learning', items: ['Study while you are working'] },
    {
      kind: 'prose', eyebrow: 'Why IHM for GCC Nurses?', title: 'Australia\'s Most Trusted Nursing Education Partner for International Nurses', image: RANKED,
      body: ['The Graduate Certificate in Advanced Nursing (GCAN) from IHM is designed for GCC nurses (BSc and GNM) to meet Australia\'s AQF Level 8 standard, enabling AHPRA registration and unlocking rewarding nursing careers in Australia. Choose from 12 specialisations to align with your passion and career goals.'],
      list: ['Designed to help nurses from the GCC region to get AQF Level 8 qualification', 'Aligns with AHPRA requirements', '100% Online – Perfect for nurses working in Gulf countries', 'Learn from Australian experts while living in the Gulf', 'No need to leave your job – study while you work'],
    },
    { kind: 'stats', items: [TOP10] },
    { kind: 'prose', eyebrow: 'Who is this course for?', title: 'B.Sc. Nurses', image: img('bsc', 'Diverse team of nurses and doctors', 857, 466), list: [...WHO_BSC, 'Gives you a competitive edge for migration and job offers'] },
    { kind: 'prose', title: 'GNM Nurse/Diploma', image: img('gnm', 'Two nurses in light blue scrubs', 857, 466), list: ['All GNM Nurses already hold an AQF (Australian Qualifications Framework) Level 6 qualification', 'Skip expensive bridging programs', 'Start AHPRA process after GCAN', 'Designed to fast-track your eligibility'] },
    {
      kind: 'prose', tone: 'blush', eyebrow: 'Course Outcomes & Benefits', title: 'What you\'ll achieve with GCAN', image: img('outcomes', 'Two students studying with a laptop on outdoor steps', 484, 344),
      list: ['AQF Level 8 Qualification', 'Eligible to start AHPRA Registration', 'Pathway to work as a Registered Nurse in Australia', 'Clinical Leadership & Specialisation Units', 'Flexible for Nurses Working Shifts'],
    },
    COURSE_HIGHLIGHTS,
    {
      kind: 'pathway', eyebrow: 'Roadmap', title: 'Your Migration Roadmap – GCC to Australia',
      steps: [{ title: 'Enrol in IHM\'s GCAN Program' }, { title: 'Achieve AQF Level 8 Qualification in Australia' }, { title: 'Start AHPRA Registration Process' }, { title: 'Move to Australia as a Registered Nurse' }, { title: 'Secure a Nursing Job in High-Demand Specialisations' }],
    },
    specs('Choose from 12 available Nursing Specialisation Courses', SPECS_SHORT),
    ADMISSION_ONLINE,
    QUOTE,
    {
      kind: 'faq', title: 'Any Questions? We Got You.',
      items: [
        { q: 'Can I do this course while working in the GCC Countries?', a: ['Yes, absolutely! This course is 100% online and designed to be flexible. You can easily manage your studies alongside your job, even while working in the Gulf. The course duration is 6 months, and you can study at your own pace.'] },
        { q: 'What if I only have a GNM qualification?', a: ['If you\'ve completed your GNM/3 year Diploma and have at least 1 year of experience working as a registered nurse in any country, you are eligible for this course.'] },
        { q: 'Is NCLEX/OSCE still needed after GCAN?', a: ['Yes, The Graduate Certificate in Advanced Nursing (GCAN) program includes 12 speciality postgraduate courses that will develop your specialty nursing skills, competence, and professional knowledge. You must successfully pass both the NCLEX and OSCE to become a Registered Nurse in Australia.'] },
        { q: 'What support will I get during AHPRA process?', a: ['We offer comprehensive support throughout the AHPRA registration process. Our expert team can guide you at every step—from document submission to getting your registration certificate—for a smooth experience. Please note that this service is available at an additional cost.'] },
      ],
    },
  ],
  closing: { title: 'Let\'s Make Your Australian Dream a Reality', body: FAQ_INTRO, cta: 'Book Free Consultation' },
}

const GCAN_AUSTRALIA: CampaignPage = {
  hero: {
    eyebrow: '(100% Online) Scholarships Available for Eligible Students!', title: 'Graduate Certificate in Advanced Nursing', accent: 'Advanced Nursing', image: HERO,
    intro: ['Upgrade Your Nursing Career in Australia - Fast-Track AHPRA Registration with GCAN', 'For BSc and GNM Nurses'],
    chips: ['Get AQF Level 8', 'Become a Registered Nurse in Australia', 'Scholarships Available!'],
  },
  formHeading: 'Check your Scholarship Eligibility',
  sections: [
    {
      kind: 'facts', eyebrow: 'Key Highlights', title: 'Key Highlights',
      items: [
        { label: 'Designed for', value: 'B.Sc. and GNM Nurses' }, { label: 'Achieve', value: 'AQF Level 8 Qualification' }, { label: 'Pathway to', value: 'AHPRA Registration' },
        { label: '100% Online', value: 'and Flexible Learning' }, { label: 'Boost Employability', value: 'as a Registered Nurse in Australia' }, { label: 'Fee Help', value: 'Available for Eligible Students' },
        { label: 'Become a Specialised Nurse in', value: 'Your Area of Interest' }, { label: '24*7 student support', value: 'service' },
      ],
    },
    {
      kind: 'prose', eyebrow: 'Why Choose GCAN at IHM?', title: 'Why Choose GCAN at IHM?', image: RANKED,
      body: [
        'The Graduate Certificate in Advanced Nursing (GCAN) from IHM is tailored to help internationally qualified nurses meet the AQF Level 8 standard - opening doors to AHPRA registration and nursing careers in Australia. With a choice of 12 specialisations to become a nurse in your area of interest.',
        'Whether you are a GNM (Diploma) or B.Sc. Nurse, this course gives you the academic edge to meet eligibility faster and more efficiently.',
      ],
    },
    { kind: 'stats', items: [TOP10] },
    { kind: 'prose', eyebrow: 'Who is this course for?', title: 'B.Sc. Nurses', image: img('bsc', 'Diverse team of nurses and doctors', 857, 466), list: [...WHO_BSC, 'Develop the skills to step into higher roles.'] },
    { kind: 'prose', title: 'GNM Nurses (Diploma)', image: img('gnm', 'Two nurses in light blue scrubs', 857, 466), list: ['All GNM Nurses already hold an AQF (Australian Qualifications Framework) Level 6 qualification', 'GCAN upgrades you directly to AQF Level 8.', 'Making you eligible for starting the AHPRA process.', 'A clear alternative to long and expensive bridging programs.'] },
    {
      kind: 'prose', tone: 'blush', eyebrow: 'Course Outcomes & Benefits', title: 'What you\'ll achieve with GCAN', image: img('outcomes', 'Two students studying with a laptop on outdoor steps', 484, 344),
      list: ['Specialised Nurse (Clinical Nursing Specialist, Nursing Unit Manager, TL Position)', 'Pathway to becoming a Registered Nurse in Australia', 'Learn from Industry Experts & Mentors', 'Post Graduate Registered Nurses are eligible for Post graduation weekly allowance for some states in Australia.', 'Flexible Study Mode - Designed for working nurses'],
    },
    COURSE_HIGHLIGHTS,
    {
      kind: 'pathway', eyebrow: 'Roadmap', title: 'Your Road Map to Australian Nursing Registration',
      steps: [
        { title: 'Enrol in the Graduate Certificate in Advanced Nursing', points: ['Online program, 3 units (1 core + 2 specialisation units).', 'Flexible for working nurses - 100% Online.', 'Complete Assignment & MCQ (No Additional Exams).'] },
        { title: 'Achieve AQF Level 8', points: ['GNM Nurses: Upgrade from Diploma to postgraduate level.', 'B.Sc. Nurses: Qualification upgrade from Bachelor Level (Level 7) to Postgraduate Level (Level 8).'] },
        { title: 'Pursue AHPRA Registration', points: ['For GNM: Meet AHPRA qualification standards with GCAN.', 'For B.Sc: Combine with OBA completion for full registration.'] },
        { title: 'Work as a Registered Nurse in Australia', points: ['Open doors to high-demand nursing roles with specialised skills.'] },
      ],
    },
    specs('Choose from 12 available Nursing Specialisation Courses', SPECS_SHORT),
    ADMISSION_ONLINE,
    QUOTE,
    FAQ_ONLINE,
  ],
  closing: { title: 'Start Your Australian Nursing Journey Today', body: FAQ_INTRO, cta: 'Book Free Consultation' },
}

/* ---------- the online FEE-HELP / scholarship family ---------- */
const GCAN_FEE_HELP: CampaignPage = {
  hero: {
    eyebrow: '100% Online! Scholarships Available for Eligible Students!', title: 'Graduate Certificate in Advanced Nursing (Online)', accent: 'Advanced Nursing', image: HERO,
    intro: ['Upgrade Your Nursing Qualification Online with Fee Help Available – Join IHM\'s GCAN Program!'],
    chips: ['25 % scholarships available', 'Fee Help Available'],
  },
  formHeading: 'Check Your Eligibility',
  sections: [
    onlineFacts('100% Online'),
    {
      kind: 'grid', eyebrow: 'Highlights', title: 'Key Highlights',
      items: ['100% Online Classes', '26 weeks', 'Payment plans available if you\'re not eligible for FEE HELP.', 'Recorded sessions will also be available', 'Start with 1 subject for 12 weeks, then study 2 subjects for the remaining 2 weeks', '100% Credit transfer available for full 1st semester of Master of Nursing'],
    },
    { kind: 'prose', tone: 'blush', eyebrow: 'FEE-HELP', title: 'Study now with FEE-HELP', body: [ADVANCE, FEE_HELP_WHO], image: STUDY },
    { kind: 'callout', title: 'Don\'t miss this golden opportunity to study GCAN online with exclusive FEE-HELP', cta: 'Enquire Now' },
    specs('Choose from 12 available nursing specialisation courses.', SPECS_LONG),
    ADMISSION_ONLINE,
    PATHWAY,
    ...careers({ credit: CREDIT_FIRST, roles: ROLES }),
    { kind: 'callout', title: 'Download Course Brochure', cta: 'Get Fee Help' },
    QUOTE,
    FAQ_ONLINE,
  ],
  closing: { title: 'Get Fee Help', body: FAQ_INTRO, cta: 'Get Fee Help' },
}

const GCAN_AUSTRALIA_ONLINE: CampaignPage = {
  hero: {
    eyebrow: '100% Online!', title: 'Graduate Certificate in Advanced Nursing (Online)', accent: 'Advanced Nursing', image: HERO,
    intro: ['Upgrade Your Nursing Qualification Online (FEE-HELP Option Available) – Join IHM\'s GCAN Program!'],
    chips: ['Get 25% Scholarship!'],
  },
  formHeading: 'Get 25% Scholarship!',
  sections: [
    onlineFacts('Online'),
    {
      kind: 'grid', eyebrow: 'Highlights', title: 'Key Highlights',
      items: ['100% Online Classes', '26 weeks', 'Payment plans available if you\'re not eligible for FEE HELP.', 'Recorded sessions will also be available', 'Start with 1 Subject for 12 weeks, then study 3 subjects for remaining 12 weeks', '100% Credit transfer available for full 1st semester of Master of Nursing'],
    },
    { kind: 'prose', tone: 'blush', eyebrow: 'FEE-HELP', title: 'Study now with FEE-HELP', body: [ADVANCE, FEE_HELP_WHO], image: STUDY },
    ADMISSION_ONLINE,
    PATHWAY,
    ...careers({ credit: CREDIT_FIRST, roles: ROLES }),
  ],
  closing: { title: 'Graduate Certificate in Advanced Nursing (Online)', cta: 'Schedule a call back' },
}

/* ---------- the GNM / Diploma "golden opportunity" pair ---------- */
const GNM_INTRO = [
  'Want to take your Nursing career overseas? Here\'s an excellent opportunity for GNM/Diploma Nurses to pursue a nursing career in Australia!',
  'Currently, GNM/Diploma nurses are not eligible to apply for Australian Nursing Registration. The Graduate Certificate of Advanced Nursing will help you meet the eligibility requirements of the AHPRA Registration process. This outstanding Post Graduate study program allows you to gain an Advanced Nursing Certificate in the most sought-after nursing specialisations, and it is available for online study.',
]
const DIFFERENT: CampaignSection = {
  kind: 'cards', eyebrow: 'Why IHM', title: 'What makes IHM different from other institutes?',
  items: [
    { title: 'Affordable fees', body: 'The fees are lower compared to other universities or institutes.' },
    { title: 'Shorter duration', body: 'The course has a shorter duration compared to other universities or institutes.' },
    { title: 'Open to all', body: 'IHM is open to registered nurses from any country (including their home country) to join this course. However, other universities offering the same courses typically require registration as a registered nurse with the Nursing and Midwifery Board of Australia and 12 months of recent clinical experience in Australia as a registered nurse.' },
    { title: 'English language tests not required', body: 'IELTS and TOEFL scores are not required at IHM. In contrast, other universities offering the same courses typically require an IELTS or TOEFL score.' },
  ],
}
function gnmAdmission(experience: string): CampaignSection {
  return {
    kind: 'prose', id: 'admission', tone: 'blush', eyebrow: 'Entry criteria', title: 'Admission Requirements', image: STUDY,
    body: [
      `These courses are exclusively available to registered nurses from any country (including their home country) who have completed GNMs or a three-year diploma in nursing with at least ${experience} of relevant experience. Alternatively, B.Sc. nurses without experience are also eligible to apply for these courses.`,
      'Either a continuous five years of study in an English medium (including their highest qualification) or the successful completion of the IHM English test is required.',
    ],
  }
}
const REASONS_HEAD = ['You can obtain a AQF Level 8 Postgraduate Degree from an esteemed Australian college.', 'Flexible online classes for 26 weeks (about 6 months).', 'Payment plans are available.']
const REASONS_TAIL = ['Obtain a higher-level qualification beyond post B.Sc nursing. with lesser time and effort required for completion compared to Post B.Sc. for GNM nurses, where Post B.Sc. is only at Level 7. Additionally, upon completion of this course, you will become eligible to apply for Australian Nursing Registration.', 'IHM is one of Australia\'s most renowned nursing schools, which has successfully trained over 3000+ nurses in the country.']

const GCAN_GNM: CampaignPage = {
  hero: {
    eyebrow: 'Limited Time: Only Full Fee-Paying Students!', title: 'Graduate Certificate in Advanced Nursing (Online)', accent: 'Advanced Nursing', image: HERO_TEAM,
    intro: [GNM_INTRO[0]], chips: ['Get 10% Scholarship'],
  },
  formHeading: 'Get 10% Scholarship!',
  sections: [
    onlineFacts('Online'),
    { kind: 'prose', title: 'A pathway for GNM/Diploma nurses', body: GNM_INTRO.slice(1), image: RANKED },
    specs('Choose from 12 available nursing specialisation courses.', SPECS_LONG),
    gnmAdmission('1 year of experience'),
    DIFFERENT,
    ...careers({ credit: CREDIT_FIRST, roles: ROLES }),
    { kind: 'grid', tone: 'ink', title: 'Our students choose us for the following reasons:', items: [...REASONS_HEAD, 'Six months Online Course', ...REASONS_TAIL] },
  ],
  closing: { title: 'Get 10% Scholarship!', cta: 'Schedule a call back' },
}

const GCAN_ALL: CampaignPage = {
  hero: {
    eyebrow: 'Golden Opportunity for GNM / Diploma Nurses to Get Australian Post-Graduation!', title: 'Graduate Certificate in Advanced Nursing', accent: 'Advanced Nursing', image: HERO_TEAM,
    intro: [GNM_INTRO[0]], chips: ['On-campus & Online', 'AQF Level 8', '26 weeks', 'TEQSA'],
  },
  formHeading: 'Download the course guide',
  brochure: false,
  sections: [
    { kind: 'callout', title: 'Download the course guide', body: 'Our course guide outlines tuition fees, entry requirements, course subjects and learning outcomes.', cta: 'Download the course guide' },
    onlineFacts('On-campus & Online'),
    { kind: 'prose', title: 'A pathway for GNM/Diploma nurses', body: [GNM_INTRO[1].replace('specialisations', 'specializations')], image: RANKED, after: ['**Pay the full fees now and avail of a 10% scholarship and get free NCLEX Training**'] },
    specs('Choose from 13 available nursing specialization courses.', [...SPECS_LONG, ANP_SPEC]),
    gnmAdmission('three years'),
    DIFFERENT,
    ...careers({ credit: 'Credit transfer is possible for the Master\'s program, allowing you to skip the first semester of the Master of Nursing course upon completion of the GCAN Online course.', roles: ['clinical nurse educator associate', 'unit manager', 'clinical nurse specialist research roles.', 'Associate Nurse Unit Manager'] }),
    { kind: 'grid', tone: 'ink', title: 'Our students choose us for the following reasons:', items: [...REASONS_HEAD, 'Six months full-time or one year part-time.', ...REASONS_TAIL, 'Recognized and accepted in all English-speaking countries.'] },
  ],
  closing: { title: 'Download a course guide', cta: 'Download a course guide' },
}

/* ---------- /lp/gcan/ (2023: five specialisations) ---------- */
const FIVE = (facts: string[], spec: string): string[] => [`Duration: 26 Weeks`, 'AQF Level: 8', 'Approved by TEQSA', facts[0], spec].filter(Boolean)
const GCAN_FIVE: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrollment Advisor', title: 'Graduate Certificate in Advanced Nursing (GCAN)', accent: 'Advanced Nursing', image: HERO_TEAM,
    intro: ['Go for an advanced Nursing Specialization! Be at the heart of healthcare.'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'AQF Level', value: '8' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'Course Duration', value: '26 Weeks' }, { label: 'Mode of Delivery', value: 'On Campus, Online' }, { label: 'CRICOS Course Code', value: '107773K' }] },
    { kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', body: ['The Graduate Certificate in Advanced Nursing (GCAN), brought to you by the Institute of Health and Management (IHM), has been designed to meet the growing global demand for specialized registered nurses. The GCAN program includes five speciality postgraduate courses that will develop your specialty nursing skills, competence, and professional knowledge.'] },
    {
      kind: 'stats', items: [
        { value: '298,400', label: 'Number of registered nurses in Australia in 2020', note: 'Source: joboutlook.gov.au' },
        { value: '344,800', label: 'The number of Australian students who graduate with the projected number of registered nurses in Australia by 2025', note: 'Source: joboutlook.gov.au' },
      ],
    },
    {
      kind: 'specialisations', eyebrow: 'Specialisations', title: 'The five specializations are as follows',
      items: [
        { title: 'Australian Nursing Practice', image: img('spec-anp', 'Nurse in blue scrubs at a desk', 307, 391), facts: FIVE(['Mode of Learning: On Campus'], ''), body: ['Build on your knowledge and skills as an Internationally Qualified Registered Nurse and get introduced to nursing practice in Australia.', 'This course combines a valuable four-week clinical placement and work experience with intensive OSCE preparation to prepare you to ace the practical OBA assessment for nursing registration in Australia.'] },
        { title: 'Critical Care Nursing', image: img('spec-critical', 'Nurse caring for a patient in bed', 307, 391), facts: FIVE(['Mode of Learning: Online'], ''), body: ['Enhance your current nursing knowledge and abilities by developing critical care nursing methods and specialized talents.', 'The course is offered online and includes a requirement to work in a critical care setting under supervision while studying the course. This specialisation will equip you to assess nursing needs for critically ill patients in a variety of clinical settings.'] },
        { title: 'Paediatric Nursing', image: img('spec-paediatric', 'Nurse with a young child', 307, 391), facts: FIVE(['Mode of Learning: Online'], ''), body: ['Paediatric nurses meet the nursing care requirements of newborns, children, and adolescents as they quickly move through physical, mental, and social phases of development.', 'Learn about paediatric nursing and get equipped with the skills to offer high-quality and safe nursing interventions.'] },
        { title: 'Mental Health Nursing', image: img('spec-mental', 'Clinician talking with a patient', 307, 391), facts: FIVE(['Mode of Learning: Online'], ''), body: ['Learn to assess the nursing needs of patients in a variety of clinical settings and develop a greater understanding of mental health theory and clinical practice.', 'The course is offered online and includes a requirement to work in a mental health setting under supervision while studying the course.'] },
        { title: 'Renal Nursing', image: img('spec-renal', 'Nurse checking a patient on a hospital bed', 307, 391), facts: FIVE(['Mode of Learning: Online'], ''), body: ['Renal nursing is a specialised area of nursing practice that treats patients with kidney disease and educates both patients and families about treatment protocols.', 'Get a systematic introduction to the concepts of renal nursing, and the information and skills necessary to work as a person-centred care renal nurse in a lifespan healthcare context.'] },
      ],
    },
    {
      kind: 'prose', title: 'Who are these courses for?', image: STUDY,
      list: [
        'This GCAN course is for registered nurses with a bachelor\'s degree or comparable qualification and who are currently in practice.',
        'The course is certified in Australia and is also suitable for overseas students who are currently trained nurses working in a specialized nursing context and seeking to further develop their nursing knowledge and formalize their clinical abilities.',
        'If you are committed to improving your nursing practice, this course is for you. The course is intended to meet the requirements of nurses working in a variety of settings and with varying work schedules and family obligations.',
        'International nurses working in any country are invited to enrol in this course.',
      ],
    },
    { kind: 'grid', tone: 'ink', eyebrow: 'Why IHM', title: 'Why study GCAN from IHM?', items: ['Best in-class content', 'State-of-the-art laboratories', 'Affordable and easy payment options', 'Flexibility to find the balance between work and study', 'Classes taken by expert lecturers and nursing clinicians', 'Live interactive classes with one-on-one doubt clearing sessions'] },
    { kind: 'callout', title: 'Still not convinced?', cta: 'Talk to our Academic Counsellor' },
  ],
  closing: { title: 'Heal the World!', cta: 'Talk to our Academic Counsellor' },
}

/* ---------- /lp/gcn/ (2023: Graduate Certificate in Nursing, Perth) ---------- */
const GCN: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrollment Advisor', title: 'Graduate Certificate in Nursing (Non – Specialisation)', accent: 'Nursing', image: HERO_TEAM,
    intro: ['Advance your Nursing Career in Australia with Graduate Certificate in Nursing!'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'AQF Level', value: '8' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'Course Duration', value: '24 Weeks' }, { label: 'Mode of Delivery', value: 'On Campus, Online' }, { label: 'Location', value: 'Perth (SGT)' }] },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: STUDY,
      body: ['In Australia and across the world, the demand for postgraduate certified nurses is rising. With a Graduate Certificate in Nursing, you may improve your nursing career while contributing to the promotion of health, the prevention of disease, and the care of all individuals.', 'This is a postgraduate AQF level-8 qualification for registered nurses who have completed a bachelor\'s degree or its equivalent or a three-year diploma in nursing.'],
    },
    {
      kind: 'stats', items: [
        { value: '$78,964', label: 'The average graduate nurse program salary in Australia per year', note: 'Source: au.talent.com' },
        { value: '8,000', label: 'The number of Australian students who graduate with a nursing qualification. So, only those who have better skills or more knowledge will find the in-demand jobs.', note: 'Source: abc.net.au' },
      ],
    },
    { kind: 'prose', title: 'Why should you Enrol?', list: ['The Graduate Certificate in Nursing is designed to prepare Registered Nurses (RNs) for advanced specialty practice.', 'Increase your career potential to meet the market shortage for skilled nurses.', 'Pathway to Master of Nursing with advance credit standing.'] },
    { kind: 'grid', title: 'Benefits of the Program', items: ['Work in a leadership role', '100% Australian accredited program', 'Flexible learning', 'Easy payment options'] },
    // the old page headed this "Why study at IHNA?" (copied from the IHNA template); this is an IHM page
    { kind: 'grid', tone: 'ink', title: 'Why study at IHM?', intro: 'With a Graduate Certificate in Nursing, you may get job-roles such as:', items: ['Clinical Nurse Specialist', 'Nurse Educator and Supervising Nurse', 'Personnel Development Nurse', 'Associate Nurse Unit Manager Nurse Educator'] },
    { kind: 'callout', title: 'Take a positive step towards success.', cta: 'Talk to our Academic Counsellor' },
  ],
  closing: { title: 'Be Better! Do Better!', cta: 'Talk to our Academic Counsellor' },
}

/* ---------- /lp/gcan-anp/ ---------- */
const GCAN_ANP: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrollment Advisor', title: 'Graduate Certificate in Advanced Nursing – Australian Nursing Practice', accent: 'Australian Nursing Practice', image: HERO,
    intro: ['Study post graduate nursing and explore pathways to Australia.'],
    chips: ['Pay full fees now and avail 10% scholarship'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  sections: [
    {
      kind: 'facts', eyebrow: 'Key facts',
      items: [{ label: 'AQF Level', value: '8' }, { label: 'Course Fee', value: 'Blended, On Campus: AUD $12,000.00' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'Duration', value: '26 Weeks' }, { label: 'Course Delivery', value: 'On-Campus and online' }, { label: 'Location', value: 'Melbourne & Perth, Sydney' }],
    },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: img('bsc', 'Diverse team of nurses and doctors', 857, 466),
      body: ['The Graduate Certificate in Advanced Nursing has been designed to meet the growing global demand for specialised registered nurses. IHM began offering the GCAN Australian Nursing Practice course with the goal of assisting IQNM\'s (Internationally Qualified Nurses and Midwives) in acquiring the necessary knowledge as well as the necessary amount of hands-on experience to satisfy the AHPRA standards necessary for registration.', '**Please note that completion of this course does not directly lead to registration as a nurse or midwife in Australia.**'],
      after: ['Nursing is one of the most favourable occupations for migration to Australia.'],
    },
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Why IHM', title: 'Why Graduate Certificate in Advanced Nursing from IHM?',
      body: ['Since its inception in 2012, the Institute of Health & Management (IHM) has established itself as Australia\'s premiere provider of exceptional healthcare education. The Graduate Certificate in Advanced Nursing from IHM will equip you for a wide range of positions in the Australian healthcare setting including teaching positions once you gain registration with AHPRA', '**Our students choose us for the following reasons:**'],
      list: [
        'Only 26 weeks (about 6 months) Duration', 'Free NCLEX and OSCE preparation', 'AQF Level 8 Post Graduation Degree from Australian College', 'Payment plans available',
        'Obtain a higher-level qualification beyond post B.Sc. nursing- Lesser time and effort required for course completion in comparison to Post BSc for GNM nurses, where Post BSc is only Level 7. Also, you will be eligible to apply for AHPRA registration process.',
        'Recognized and accepted in all English-speaking countries', 'Online Blended- Option to join on-campus course without a language test with less fees compare than fully on campus.', 'Free Language Training provided', 'Trained more than 3000+ nurses in Australia',
      ],
    },
    {
      kind: 'table', eyebrow: 'Structure', title: 'Units & Credit Points', intro: 'Three units constitute the Graduate Certificate in Advanced Nursing Australian Nursing Practice course. One core unit and two units of specialisation.',
      head: ['Unit Code', 'Unit Name', 'Credit Points'],
      rows: [['NAU001', 'NCLEX-RN Preparation course', '0'], ['A1001', 'Academic Integrity', '0'], ['N9001', 'Professional Issues and Policies in Nursing', '12'], ['N8001', 'Australian Nursing Practice', '12'], ['N8002', 'Professional Reflection in Australian Nursing Practise', '8']],
      after: ['The course includes four weeks OSCE in preparation for OBA registration testing in Australia and a four-week Professional Experience Placement (PEP) in healthcare facilities.'],
    },
    {
      kind: 'prose', id: 'admission', tone: 'blush', eyebrow: 'Entry criteria', title: 'Admissions Requirement',
      body: ['To be eligible for admission to the Graduate Certificate in Advanced Nursing – Australian Nursing Practice, an applicant is required to:'],
      list: [
        'Have completed a Bachelor of Nursing degree or an equivalent qualification or 3 years Diploma of Nursing (3 years of work experience mandatory as RN) Diploma Nurses who have completed the ANP course are eligible to begin the OBA process.',
        'Be an AHPRA registered nurse; or', 'Be a registered nurse with the Nurses\' Board/Council from the country of origin or place of residence',
        'Registered Nurses having a three-year Diploma Of Nursing qualification and at least three years of experience as a registered nurse are eligible to enrol in this course.',
        'English Language proficiency requirement for International Students: Nurses currently registered and working in English Speaking Countries do not need this requirement. The recognised countries are: Australia, United States, United Kingdom, Canada, New Zealand, the Republic of Ireland and South Africa; OR Direct entry through a pass in English for Academic Purpose (EAP) course with the minimum score of 70%',
      ],
    },
    {
      kind: 'prose', title: 'English Requirement:',
      list: ['IETLS overall 6.5 no band less than 6 or PTE overall 56 no band less than 46 or OET B in each module.', 'Nurses currently registered and working in English Speaking Countries do not need this requirement. The recognized countries are: Australia, United States, United Kingdom, Canada, New Zealand, the Republic of Ireland and South Africa; OR', 'Direct entry through a pass in English for Academic Purpose (EAP) course with the minimum score of 70%'],
    },
    {
      kind: 'prose', title: 'Who is this course for?', image: STUDY,
      body: [
        'GCAN ANP course is meant for practising registered nurses who possess a Bachelor\'s degree or an equivalent qualification.',
        'If you are serious about enhancing your nursing skills, then this training is for you. The course is intended to address the requirements of nurses who have fluctuating work schedules, work in a variety of settings, and have family obligations.',
        'International nurses working in any country can access this online course. This is a great opportunity for internationally qualified nurses to register as nurses in Australia, by completing nursing registration with IHM\'s Graduate Certificate in Advanced Nursing – Australian Nursing Practice course.',
        'Australia has applied a new two-part registration process that is inclusive of the NCLEX online test and a two-day OBA practical assessment for international nurses.',
        'This programme merges a four-week clinical placement and Australian work experience (with the opportunity to work for up to 40 hours per week during your studies) with intense OSCE preparation to assist you in performing well in the practical OBA assessment.',
      ],
    },
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Careers', title: 'Where will this take you?', body: ['When you enrol for GCAN ANP you will:'],
      list: [
        'Gain work experience in Australian healthcare system as the program is offered under student visa scheme to assist with AHPRA registration process. Also, an easy pathway to work and PR.',
        'Gain full one-semester credit to Master of nursing course offered by IHM. Complete the Master of nursing in 1½ years and gain stay-back up to five years and accommodation available for spouses as well.',
        'Opportunity to work in various roles in nursing including teaching positions once gain registration with AHPRA. 123,000 Projected shortfall of nurses in Australia by 2030 (Source: [health.gov.au](https://www.health.gov.au/))',
        'This course will help you upgrade to a supervisory position with a high pay scale',
      ],
    },
  ],
  closing: { title: 'Make this opportunity count. Live, learn, Grow!', cta: 'Schedule a call back' },
}

/* ---------- the two Critical Care Nursing course pages ---------- */
const FEES_LINKS = 'See [Fees and Charges 2021](/pdf/IHM_Course_Fees_2021.pdf), [Fees, Charges and Refunds Policy](/pdf/policies/Fees_Charges_and_Refunds_Policy.pdf) and [Fees, Charges and Refunds Procedure](/pdf/procedures/Fees_Charges_and_Refunds_Procedure.pdf).'
const HOW_TO_APPLY: CampaignSection = {
  kind: 'cards', numbered: true, eyebrow: 'How to apply', title: 'Are you Ready to Apply?',
  items: [
    { title: 'Application', body: 'Submit your online application by clicking "Apply Online" on the top right corner of the course page.' },
    { title: 'Interview', body: 'If you meet IHM\'s eligibility criteria you\'ll be contacted for an interview with an admissions consultant.' },
    { title: 'Offer Letter', body: 'If you\'re successful with the interview you\'ll be offered a place for the course.' },
    { title: 'Enrolment Fee', body: 'Once you sign the acceptance offer, an invoice will be issued for the course. You may be eligible for government funding, so please call our team to know more.' },
    { title: 'Confirmation of Admission', body: 'Once you\'ve paid the enrollment fee, we\'ll send a confirmation of admission to you.' },
  ],
}
function criticalCare(related: boolean): CampaignPage {
  const sections: CampaignSection[] = [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Delivery Mode', value: 'Online' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'AQF Level', value: '08' }, { label: 'Units', value: '03' }, { label: 'Course Duration', value: '26 Weeks' }, { label: 'Online', value: 'AUD $8,000.00' }] },
    {
      kind: 'prose', eyebrow: 'About the course', title: 'About the Course', image: img('spec-critical', 'Nurse caring for a patient in bed', 307, 391),
      body: [
        'This specialisation will equip you to assess nursing needs for critically ill patients in a variety of clinical settings and to predict and react to changes in your patient\'s condition. Critical care nursing in an emergency setting demands knowledge, confidence, and abilities to care for patients successfully.',
        'The course is offered online and includes a requirement to work in a critical care setting under supervision while studying the course.',
        'The Graduate Certificate in Advanced Nursing - Critical Care Nursing will enhance your current nursing knowledge and abilities by developing critical care nursing methods and specialised talents. You will feel confident in your ability to utilise these abilities while caring for patients.',
        'The course encourages nurses to broaden their area of practise by focusing on the evaluation and nursing treatment of critically sick clients. Clinical reasoning abilities and evidence-based specialised nursing knowledge will be used to connect theoretical critical care knowledge to current nursing practice.',
        'The Graduate Certificate in Advanced Nursing also serves as a gateway for students wanting to pursue a Master of Nursing degree in Australia, either on-campus or online.',
      ],
    },
    { kind: 'callout', title: 'Join the course to achieve your dreams', cta: 'Enquire Now' },
    {
      kind: 'prose', eyebrow: 'Details about the Course', title: 'Students will learn to:',
      list: [
        'Apply critical thinking processes, problem-solving abilities, and effective communication to the evaluation and administration of nursing care delivered to critically ill patients within the critical care healthcare team',
        'Critically review the roles, functions and the scope of practice of the critical care nurse in critical care settings',
        'Demonstrate leadership within a multidisciplinary healthcare team responsible for delivering excellent therapeutic treatment to patients in critical care settings',
        'Perform an assessment of the legal, ethical, social, cultural, and political issues that influence the delivery of person-centered healthcare',
        'Recognize, evaluate, and use evidence-based nursing strategies while caring for clients in critical care settings',
      ],
    },
    {
      kind: 'prose', tone: 'blush', title: 'Course Aims',
      body: ['IHM\'s critical care speciality course is a postgraduate course leading to a Master of Nursing course. Students may continue their education by enrolling in a Master of Nursing programme online or on campus. The course is designed to elevate students\' patient care to an international level by sharpening their theoretical foundations in nursing science as well as their practical knowledge and abilities.'],
      list: ['AQF level 8', '26 weeks full time', 'Online', 'TEQSA accreditation'],
    },
  ]
  if (related) {
    sections.push({
      kind: 'prose', id: 'admission', eyebrow: 'Entry criteria', title: 'Admission Requirements',
      body: ['To be eligible for admission to the Graduate Certificate in Advanced Nursing - Critical Care Nursing specialisation an applicant is required to:'],
      list: [
        'Have completed a Bachelor of Nursing degree or an equivalent qualification', 'Be an AHPRA registered nurse; or', 'Be a registered nurse with the Nurses\' Board/Council from the country of origin or place of residence',
        'English Language proficiency requirement for International Students: IELTS level of at least 6.5 with no band less than 6, or equivalent scores in OET/PTE/other recognised English examination Nurses currently registered and working in English Speaking Countries do not need this requirement. The recognised countries are: Australia, United States, United Kingdom, Canada, New Zealand, the Republic of Ireland and South Africa, or Direct entry through a pass in English for Academic Purpose (EAP) course with the minimum score of 70% Applicants must have concurrent employment (or access to) in the Critical care nursing and one- year of full‐time post‐registration clinical experience',
      ],
    })
  }
  sections.push(
    { kind: 'grid', tone: 'ink', eyebrow: 'Career Option', title: 'Where critical care nurses work', items: ['Critical Care units', 'Cardiac units', 'Intensive care units', 'Emergency departments', 'High dependence nursing care areas', 'Acute care hospitals'] },
    {
      kind: 'table', eyebrow: 'Units of Study', title: 'Course units', intro: 'Three units constitute the Graduate Certificate in Advanced Nursing course. One core unit and two units of specialisation.',
      head: ['Unit Code', 'Unit Name', 'Credit Points'], rows: [['N9001', 'Professional Issues and Policies in Nursing', '12'], ['N8004', 'Critical Care Nursing', '12'], ['N8005', 'Professional Reflection in Critical Care Nursing', '8']],
    },
    { kind: 'startDates', title: 'Course Start Dates' },
    { kind: 'table', eyebrow: 'Course Fees', title: 'Course Fees', head: ['Online', 'Amount'], rows: [['Tuition Fee', 'AUD $8,000.00']], after: [FEES_LINKS] },
    HOW_TO_APPLY,
  )
  if (related) sections.push({ kind: 'links', items: [{ label: 'Graduate Certificate in Advanced Nursing (Emergency Nursing) · Online · 26 Weeks', href: '/courses/graduate-certificate-in-advanced-nursing-emergency-nursing/' }, { label: 'Graduate Certificate in Advanced Nursing (Acute care Nursing) · Online · 26 Weeks', href: '/courses/graduate-certificate-in-advanced-nursing-acute-care-nursing/' }, { label: 'View all Courses', href: '/courses/' }] })
  return {
    hero: { eyebrow: 'Online · TEQSA · AQF Level 08', title: 'Graduate Certificate in Advanced Nursing (Critical Care Nursing)', accent: 'Critical Care Nursing', image: HERO, chips: ['Online: AUD $8,000.00', '26 Weeks', '3 Units'] },
    formHeading: 'Get in Touch',
    sections,
    closing: { title: 'Get in Touch We are here to help you!', body: 'Get an answer on courses, costs, careers as well as facilities, entry requirements or just about anything else relating to studying at IHM. We are here to help you!', cta: 'Enquire Now' },
  }
}

/* ---------- /lp/graduate-certificate-nursing/ (GCN, Perth) ---------- */
const GCN_COURSE: CampaignPage = {
  hero: { eyebrow: 'On Campus, Online · TEQSA · AQF Level 08', title: 'Graduate Certificate in Nursing (Non – Specialisation)', accent: 'Nursing', image: HERO_TEAM, chips: ['4 Units', '24 Weeks', 'Perth'] },
  formHeading: 'Get in Touch',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Delivery Mode', value: 'On Campus, Online' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'AQF Level', value: '08' }, { label: 'Units', value: '04' }, { label: 'Course Duration', value: '24 Weeks' }, { label: 'Fees', value: 'Online: AUD $7,250 · On Campus: AUD $9,750' }] },
    {
      kind: 'prose', eyebrow: 'About the Course', title: 'About the Course', image: STUDY,
      body: [
        'This is a postgraduate AQF level-8 qualification for registered nurses who have completed a bachelor\'s degree or its equivalent Or a three-year diploma in nursing. This is one of the most popular courses in IHM; hundreds of overseas nurses who have completed this course have met the Australian Health Practitioner Regulation Agency\'s Australian nursing registration qualification eligibility requirements to work as a registered nurse in Australia by completing either the previous EPIQ-RN bridging program or the new nursing registration process for Internationally Qualified Registered Nurses, called Outcomes-based Assessment (OBA).',
        'In Australia and across the world, the demand for postgraduate certified nurses is rising. With a Graduate Certificate in Nursing, you may improve your nursing career while contributing to the promotion of health, the prevention of disease, and the care of all individuals.',
        'The program is a generic Graduate Certificate in Nursing designed to prepare registered nurses for entry to Australia\'s Master of Nursing program. You will gain strong analytical skills and the capacity to conduct thorough patient assessments throughout the course.',
        'This course is available online as well as on-campus. Our online course has been thoughtfully developed to accommodate the hectic schedules of nurses working across the world. On-campus delivery is available only in IHM\'s Perth campus in Western Australia.',
        'You will earn an internationally recognised Australian Government TEQSA authorised and qualified certificate upon completion of the course. If you hold a three-year diploma in nursing, this course will assist you in upgrading your qualification from AQF / NZQF level 6 to AQF / NZQF level 8 postgraduate nursing.',
        '**Please note that this course does not lead directly to nurse or midwife registration in Australia, New Zealand, the United Kingdom, or Ireland.** Studying this course will assist you in upgrading your qualification, and you will be needed to pass the applicable Nursing registration bodies\' registration exams or complete bridging programs, as well as meet other requirements, in order to get a nursing registration.',
      ],
    },
    { kind: 'callout', title: 'Join the course to achieve your dreams', cta: 'Enquire Now' },
    {
      kind: 'prose', eyebrow: 'Details about the Course', title: 'Course Details',
      list: [
        'This four-unit course is available both online and on-campus', 'Online intakes occur six times a year, while on-campus intakes occur three times a year at our Perth campus', 'The duration of the online course is eight months', 'The duration of the on-campus course is six months', 'Accredited by TEQSA', 'This program offers credits to the IHM\'s Master of Nursing',
        'Diploma holder Nurses (minimum 3 years study) can meet the qualification requirement for IHM\'s Master of Nursing after completion of this program',
        'This is a non-specialisation program. If you are a Bachelor\'s degree level nurse looking to upskill your qualification in nursing with a specialisation, IHM now offers 13 specialisation programs known as the Graduate Certificate in Advanced Nursing program. Please visit the [GCAN course page](/graduate-certificate-in-advanced-nursing/) for more details',
      ],
    },
    {
      kind: 'faq', title: 'Frequently Asked Questions',
      items: [
        { q: '1. Does this course directly result in Australian Nursing registration?', a: ['No, this course is not part of an NMBA-approved program of study. Only an approved program of study will qualify you for direct registration with the Australian nursing board. This is an AQF level- 8 qualifications accredited by TEQSA. If you are an overseas registered nurse with a three-year diploma, this course will assist you in obtaining an AQF level – 8 postgraduate certificate in nursing and may assist you in meeting the qualification criteria for proceeding with the Australian nursing registration procedure.'] },
        { q: '2. Is professional nursing experience required for admission to this program?', a: ['Yes, if you are a registered nurse with a three-year diploma, you must have a minimum of one-year of clinical nursing experience in getting admission to this course.', 'A bachelor\'s degree in nursing does not require any prior experience.'] },
        { q: '3. Is a payment plan possible?', a: ['Yes, both international and domestic students are eligible for a payment plan. Students are needed to make an initial payment of $1200, and a member of our Student Success team will contact you to arrange a direct debit plan with you following the initial payment.', 'At the moment, IHM is giving a 25% Covid Disaster Relief Scholarship to all full-time full fee-paying students.'] },
        { q: '4. What is the duration of the online course?', a: ['You will spend eight months studying the online GCN. This course is taught over two semesters. Each semester, you will study two units with a semester vacation in between. The course will last eight months in total.'] },
        { q: '5. Is it feasible to enroll in the course if I have a five-year break in my nursing career?', a: ['Graduate Certificate in Nursing is a postgraduate level 8 certificate that will assist you in regaining your nursing knowledge and abilities, as well as gaining the confidence necessary to re-enter practice.', 'To enroll in this course, IHM mandates that holders of a three-year nursing diploma have a minimum of one year of experience as a registered nurse.'] },
        { q: '6. Are there any face-to-face examinations that need the student to be physically present at an examination center?', a: ['No, none of the examinations need your physical presence. All of our modules include online assessments and quizzes. This may be accomplished from the comfort of your own home with good preparation and active participation in the course delivery.'] },
        { q: '7. Is it possible to obtain registration in Australia upon completion of this course?', a: ['No, this course does not automatically qualify you for registration in any country. This course will assist nurses in upgrading their qualifications to AQF level 8, which leads to a Master of Nursing degree. Each country\'s nursing bodies have its own registration standards, and the majority of them require a bachelor\'s degree or equivalent certification in nursing to qualify for registration. IHM\'s Graduate Certificate in Nursing- Non-Specialisation is a postgraduate certificate in nursing at AQF level 8, which should assist overseas qualified nurses with a three-year diploma in meeting the criteria of nursing registration bodies. Nursing regulatory bodies evaluate each student application on a case-by-case basis, with the final decision resting with the appropriate nursing regulating organisations in Australia, New Zealand, the United Kingdom, and Ireland.'] },
        { q: '8. Is there a three-year diploma holder from the overseas country who obtained nursing registration after studying GCN with IHM?', a: ['Yes, there are over 100 overseas diploma qualified registered nurses who have satisfied the Australian Health Practitioner Regulation Agency\'s qualification requirements, completed bridging programs or passed the licensing examination, and are now working in Australia as registered nurses.'] },
      ],
    },
    {
      kind: 'prose', id: 'admission', tone: 'blush', eyebrow: 'Entry criteria', title: 'Admission Requirements',
      body: ['To be considered for admission to the GCN course, an Australian resident student or international student must meet the following requirements:'],
      list: [
        'Be a registered nurse with their country of origin or practice\'s nursing board', 'Hold a minimum of one year of experience as a Registered Nurse – 3 years Diploma holders', 'Experience is not mandatory for Bachelors\'s degree-qualified nurses', 'Attend an interview with a member of the academic faculty at IHM',
        'Provide evidence of a minimum IELTS score of 6.5 with no band lower than 6, or comparable OET/PTE scores', 'Students who do not have a valid English language exam score may take the IHM\'s online English language test and meet the required pass mark',
      ],
      after: ['Before issuing an offer letter to enroll in the course, the academic staff will review all applications on a case-by-case basis'],
    },
    { kind: 'cards', title: 'English Language Requirement', items: [{ title: 'IELTS', body: '6.5 overall with no band below 6.0' }, { title: 'PTE', body: '56 overall with no band below 46' }, { title: 'OET', body: 'B for each exam component' }] },
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Careers', title: 'Where will this take me?',
      body: [
        'After completing the course, you will receive a globally recognised Australian Government TEQSA-accredited and qualified certification. If you possess a three-year diploma in nursing, this course will aid you in upgrading to AQF / NZQF level 8 postgraduate nursing from AQF / NZQF level 6.',
        'The course is a general Graduate Certificate in Nursing intended to prepare registered nurses for admission to a master\'s degree program in nursing.',
        'Additionally, students can begin NCLEX and OSCE preparation with IHM in order to get Australian nursing registration. IHM offers a three-month online NCLEX preparation course that is not accredited and a four-week on-campus OSCE preparation course at each of our campuses in Melbourne, Sydney, and Perth.',
        'With a Graduate Certificate in Nursing in hand, you can pursue career prospects as:',
      ],
      list: ['Clinical Nurse Specialist', 'Specialist in Clinical Nursing', 'Nurse Educator and Supervising Nurse', 'Personnel Development Nurse', 'Associate Nurse Unit Manager Nurse Educator'],
    },
    {
      kind: 'table', eyebrow: 'Course Units', title: 'Course Units', intro: 'The Graduate Certificate in Nursing consists of 4 units.',
      head: ['UoS Code', 'Title of UoS', 'Credit Points'], rows: [['GCNNK1', 'Nursing Knowledge 1', ''], ['GCNNK2', 'Nursing Knowledge 2', ''], ['GCNCP3', 'Clinical Project', ''], ['GCNRN4', 'Research in Nursing', ''], ['Total', '', '32']],
    },
    { kind: 'table', eyebrow: 'Course Start Dates', title: 'Course Start Dates', head: ['Campus', 'Delivery', 'Start date'], rows: [['Perth (SGT)', 'Face to Face Delivery', 'Mar 7, 2022']] },
    {
      kind: 'table', eyebrow: 'Fees and Charges', title: 'Fees and Charges', head: ['Mode', 'Tuition Fee', 'Administration (Non-Tuition) Fee'],
      rows: [['Online', 'AUD $7,250.00', 'AUD $250.00 (Non Refundable)'], ['On Campus', 'AUD $9,750.00', 'AUD $250.00 (Non Refundable)']],
      after: ['A 25% Covid Disaster Relief Scholarship is offered to full-fee paying students.', 'Payment plans available. Books, equipment and other materials are required to undertake the program and their cost is not included in the tuition fee.', FEES_LINKS],
    },
    HOW_TO_APPLY,
    { kind: 'prose', eyebrow: 'Registered Partners', title: 'Registered Partners', body: ['Our registered partners are here to provide visa guidance and assistance. [Please click here to know more](https://www.mwtglobal.com.au/).'] },
    {
      kind: 'prose', tone: 'blush', eyebrow: 'Institutional Partnership', title: 'Institutional Partnership',
      body: [
        'Our partnerships are built through positive, transparent, and engaging collaboration, and we\'re grateful for the strong relationships we\'ve built over the lifetime of IHM. These partnerships may vary in their nature but they all share the common fact that there\'s mutual benefit and a strong sense of purpose to move the healthcare industry forward.',
        'We encourage Nursing institutions, Hospitals, Healthcare Organisations and nursing associations to submit their expression of interest to become our partners!',
        'Our industry and clinical partners provide physical access to products that benefit the simulation experience for students at IHM. Other partners provide opportunities to develop clinical skills at their facilities, such as nursing homes and hospitals. We also provide opportunities to upskill staff with the latest course.',
        '[Institutional Partnership](https://forms.monday.com/forms/4c7e178b8361421b1ae8d43e93b97796?r=use1/) · [Corporate Profile](https://www.healthcareers.edu.au/corporate-profile/index.html#p=1)',
      ],
    },
  ],
  closing: { title: 'Get in Touch We are here to help you!', body: 'Get an answer on courses, costs, careers as well as facilities, entry requirements or just about anything else relating to studying at IHM.', cta: 'Enquire Now' },
}

export const GCAN_CAMPAIGNS: Record<string, CampaignPage> = {
  '/lp/gcan/': GCAN_FIVE,
  '/lp/gcn/': GCN,
  '/lp/gcan-anp/': GCAN_ANP,
  '/lp/gcan-gcc/': GCAN_GCC,
  '/lp/graduate-certificate-in-advanced-nursing-gcan-australia/': GCAN_AUSTRALIA,
  '/lp/graduate-certificate-in-advanced-nursing-fee-help/': GCAN_FEE_HELP,
  '/lp/graduate-certificate-in-advanced-nursing-australia/': GCAN_AUSTRALIA_ONLINE,
  '/lp/graduate-certificate-in-advanced-nursing/': GCAN_GNM,
  '/lp/graduate-certificate-in-advanced-nursing-all/': GCAN_ALL,
  '/lp/graduate-certificate-advanced-nursing-critical-care/': criticalCare(true),
  '/lp/graduate-certificate-in-advanced-nursing-critical-care-nursing/': criticalCare(false),
  '/lp/graduate-certificate-nursing/': GCN_COURSE,
}
