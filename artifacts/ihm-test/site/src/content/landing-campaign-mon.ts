// Copy for the Master of Nursing campaign landing pages (CourseLanding rows in src/content/landing.ts): /lp/master-of-nursing/,
// /lp/master-of-nursing-australia/, /lp/master-of-nursing-australia-anmj/, /lp/master-of-nursing-online/, /lp/master-nursing/ and the
// GCAN campaign /lp/post-graduate-nursing-courses-to-advance-your-career/. Text as on the old pages (lp/<slug>/index.php); images in
// public/images/landing/mon/. Rendered by src/components/landing/CampaignLanding.tsx.
import type { CampaignImage, CampaignPage, CampaignSection } from './landing-campaign'

const NURSES: CampaignImage = { src: '/images/landing/mon/nurses.webp', alt: 'Three smiling nurses in navy scrubs', width: 767, height: 790 }
const RPL: CampaignImage = { src: '/images/landing/mon/rpl.webp', alt: 'Graduate holding a laptop with a rolled certificate', width: 1060, height: 773 }
const HERO = { src: '/images/landing/mon/graduation.webp', alt: 'IHM graduates throwing their caps at a graduation ceremony' }

const OVERVIEW = 'The Master of Nursing is designed to prepare graduate nurses for emerging clinical roles, beginning research roles, educational roles, management and leadership roles, etc. On successful completion of the Master of Nursing, registered nurses can apply their advanced nursing knowledge and clinical skills to lead and shape the future of the nursing profession in the ever-changing world of healthcare.'
const SHORTFALL = { value: '123,000', label: 'Projected shortfall of nurses in Australia by 2030', note: 'Source: [health.gov.au](https://www.health.gov.au/)' }
const RPL_TEXT = 'Did you know that your previous work experience or formal or informal learning could lessen the time you take to complete your studies? When you apply to study at IHM, we will assess and grant you credit and recognize your work, formal or informal learning.'
const ROLES = ['Clinical Nurse Specialist', 'Staff development Nurse', 'Clinical Nurse', 'Nurse Educator', 'Associate Nurse Unit Manager']
const WHERE: CampaignSection = {
  kind: 'grid', eyebrow: 'Careers', title: 'Where will this take you?', items: ROLES,
  intro: 'IHM\'s Master of Nursing helps you sharpen your skills in professional communication, listening, critical thinking, and technology. With this degree in hand, you\'ll be able to take advantage of more professional and leadership opportunities, including:',
}
const PATHWAY: CampaignSection = {
  kind: 'pathway', eyebrow: 'Study pathway', title: 'The pathway to advanced expertise in nursing',
  steps: [
    { title: 'Graduate Certificate in Advanced Nursing (GCAN)', sub: 'Choose from 12 specialisation', meta: '26 weeks, 3 subjects' },
    { title: 'Master of Nursing', meta: '78 weeks, 9 subjects' },
  ],
}

/** /lp/master-of-nursing/ — the 2024 international campaign (scholarship + stay back). */
const MASTER_OF_NURSING: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrollment Advisor', title: 'Study Master of Nursing', accent: 'Master of Nursing', image: HERO,
    intro: ['Get a 4000 AUD scholarship for your master of nursing course, and get 5 years stay back after your studies'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  sections: [
    {
      kind: 'facts', eyebrow: 'Key facts', title: 'Study Master of Nursing',
      items: [
        { label: 'Starts On', value: 'March 4, 2024' }, { label: 'Course Fee', value: 'AUD $12,000 per Semester' }, { label: 'AQF Level', value: '9' },
        { label: 'Medium of Instruction', value: 'English' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'Duration', value: '2-Years Full Time' },
        { label: 'Course Delivery', value: 'On-Campus and online' }, { label: 'Location', value: 'Melbourne, Sydney & Perth' },
      ],
      note: 'Registered nurses who complete Institute of Health and Management\'s (IHM) Master of Nursing program, can get leadership roles in the Australian healthcare setting.',
    },
    { kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', body: [OVERVIEW], image: NURSES },
    {
      kind: 'stats', items: [SHORTFALL, { value: 'AU$94,000', label: 'The average annual salary of nursing professionals with a master\'s degree in Australia', note: 'Source: Payscale' }],
      note: 'Nursing is one of the most favourable occupations for migration to Australia.',
    },
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Why IHM', title: 'Why Master of Nursing from IHM?',
      body: ['Since its inception in 2012, the Institute of Health & Management (IHM) has established itself as Australia\'s premiere provider of exceptional healthcare education. The Master of Nursing degree offered by IHM will equip you for a wide range of positions in the Australian healthcare setting. You may find work in places like:'],
      list: ['Health care facilities', 'Community health centres'],
    },
    {
      kind: 'grid', title: 'Our students choose us for the following reasons:',
      items: ['Opportunity to obtain a scholarship and avail of a 5-year stay-back period after completing studies!', 'AQF Level 9 qualification', 'TEQSA accreditation', 'Projected shortfall of 123,000 nurses in Australia by 2030', 'This program offers a pathway to Permanent Residency and potential promotion to a lead role.', '24x7 student support'],
    },
    {
      kind: 'prose', eyebrow: 'Structure', title: 'Units & Credit Points',
      body: ['Graduates complete 9 core units, 2 compulsory units, and 1 elective unit within the first three semesters.'],
      list: ['In the first semester, one of the two following electives must be taken: N9003 Professional Reflection in Nursing or N9004 Professional Experience Placement.', 'In the final semester there\'s an option to select either 3 theoretical units or 1 nursing project'],
    },
    { kind: 'prose', tone: 'blush', eyebrow: 'RPL', title: 'Credit and Recognition of Prior Learning (RPL)', body: [RPL_TEXT], image: RPL },
    {
      kind: 'prose', id: 'admission', eyebrow: 'Entry criteria', title: 'Admissions Requirement',
      body: ['To be eligible for admission to the Master of Nursing course an applicant is required to:'],
      list: [
        'Have completed a Bachelor of Nursing degree or an equivalent qualification.',
        'Be an AHPRA registered nurse; or',
        'Be a registered nurse with the Nurses\' Board/Council from the country of origin or place of residence and must have English Language Proficiency as evidenced by:',
        'An IELTS level of at least 6.5 with no bands less than 6, or equivalent scores in OET/PTE/other recognised English examination; or',
      ],
    },
    { kind: 'cards', title: 'English Requirement:', items: [{ title: 'IELTS', body: 'Overall 6.5 and no band less than 6.0' }, { title: 'PTE', body: 'Overall 56 and no band less than 46' }, { title: 'OET', body: 'B for each test component' }] },
    {
      kind: 'prose', eyebrow: 'Who it is for', title: 'Who is this course for?',
      body: ['Nurses working in places like the USA, UK, India, the Middle East, Australia, New Zealand, Africa, Hong Kong and other parts of the globe can opt for IHM\'s Master of Nursing program. Nursing is one of the most favourable occupations for migration to Australia. It is a pathway to Permanent Residency. The program builds upon the theoretical knowledge and skills gained by nurses in their previous courses, preparing them to work in local, national and international healthcare settings.'],
    },
    WHERE,
  ],
  closing: { title: 'Make this opportunity count. Live, learn, Grow!', cta: 'Enquire Now' },
}

/** /lp/master-of-nursing-australia/ and the two Online variants share this FEE-HELP campaign body. */
function feeHelpPage(o: { title: string; fourth: string; fee: string; highlights: string[]; formHeading: string }): CampaignPage {
  return {
    hero: {
      eyebrow: 'Study', title: o.title, accent: o.title.replace('Master of Nursing', '').trim() || 'Nursing', image: HERO,
      intro: ['Upgrade Your Nursing Qualification (FEE-HELP Option Available) – Join IHM\'s MON Program!', 'Unlock more leadership opportunities and Lead Nursing Practice'],
      chips: ['AQF Level 9 qualification', o.fourth, 'Master of Nursing now available with FEE-HELP option*'],
    },
    formHeading: o.formHeading,
    sections: [
      {
        kind: 'facts', eyebrow: 'Key facts', title: o.title,
        items: [{ label: 'Course Fee', value: o.fee }, { label: 'AQF Level', value: '9' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'Duration', value: '2-Years Full Time or 4 Years Part Time' }],
        note: '**Note:** IHM\'s Master of Nursing course won\'t lead to direct nursing registration with AHPRA.',
      },
      { kind: 'grid', eyebrow: 'Highlights', title: 'Key Highlights', items: o.highlights },
      { kind: 'callout', title: 'FEE-HELP support', body: 'FEE-HELP support is exclusively for Australian citizens, New Zealand Citizens (who meet the long-term residency requirements), Humanitarian Visa Holder and Pacific Engagement Visa holder, making your education more accessible.', cta: 'Enquire Now' },
      { kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', body: [OVERVIEW], image: NURSES },
      { kind: 'stats', items: [SHORTFALL] },
      PATHWAY,
      { kind: 'prose', tone: 'blush', eyebrow: 'RPL', title: 'Credit and Recognition of Prior Learning (RPL)', body: [RPL_TEXT], image: RPL },
      {
        kind: 'prose', id: 'admission', eyebrow: 'Entry criteria', title: 'Admissions Requirement',
        body: ['To be eligible for admission to the Master of Nursing course an applicant is required to:'],
        list: [
          'Have completed a Bachelor of Nursing degree or an equivalent qualification;',
          'Be an AHPRA registered nurse; or',
          'Be a registered nurse with the Nurses\' Board/Council from the country of origin or place of residence and must have English Language proficiency as evidenced by:',
          'An IELTS level of at least 6.5 with no bands less than 6, or equivalent scores in OET/PTE/other recognised English examination; or',
          'Direct entry through a pass in English for Academic Purpose (EAP) course with a minimum score of 70%',
        ],
        after: ['English Language Proficiency Entry Requirements has to be met by the student'],
      },
      { kind: 'links', items: [{ label: 'English Language Proficiency Entry Requirements', href: '/english-language-proficiency-entry-requirements/' }] },
      WHERE,
    ],
    closing: { title: 'Learn More About Our Master of Nursing Program – Online', cta: 'Schedule a call back' },
  }
}

const HIGHLIGHTS = ['TEQSA accreditation', '24x7 student support', 'Payment plans available if you\'re not eligible for FEE HELP']
const HIGHLIGHTS_ONLINE = ['TEQSA accreditation', 'Recorded sessions will also be available', '24x7 student support', 'Payment plans available if you\'re not eligible for FEE HELP']

/** /lp/master-nursing/ — the long-form SEO article page. */
const MASTER_NURSING: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrollment Advisor', title: 'Master of Nursing', accent: 'Nursing', image: HERO,
    chips: ['AUD $23,500 per year', '104 Weeks', 'CRICOS 105600C'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  brochure: true,
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Course fee', value: 'AUD $23,500 per year' }, { label: 'Course Duration', value: '104 Weeks' }, { label: 'CRICOS Course Code', value: '105600C' }] },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: NURSES,
      body: [
        'According to a report by Health Workforce Australia, the workforce planning projections in this publication show that in the medium to long term, Australia\'s demand for nurses will significantly exceed supply with a projected shortfall of approximately 85,000 nurses by 2025, or 123,000 nurses by 2030 under current settings. It shows that no single policy scenario is capable of closing the gap between nursing workforce supply and demand. However, a combined scenario, which models improved retention of nursing students within education, improved employment rates following graduation, and increased early career retention; as well as assuming that slower future economic growth will slow the provision of health services and consequently demand nurses, demonstrates that the initial shortfall can be significantly reduced to approximately 39,000 by 2025 or 45,000 by 2030.',
        '([View Source](https://www.health.gov.au/sites/default/files/documents/2021/03/nurses-australia-s-future-health-workforce-reports-detailed-report.pdf))',
      ],
    },
    {
      kind: 'prose', eyebrow: 'About the course', title: 'About the Master of Nursing',
      body: ['This nursing course is intended to provide nurses with the opportunity for continuing education and professional growth while also advancing their knowledge to support practise in a variety of care settings. The course seeks to educate nurses in service of the global health industry and their commitment to nursing practise in a variety of settings. It is intended to offer Comprehensive Professional Training to an expanding population of nurses who are stationed globally.'],
      list: [
        'The analysis of political, social, cultural, and economic impacts on health and social care demands and service design will provide you with the opportunity to investigate contemporary nursing challenges as well as the role and practise of the nurse.',
        'You will learn about some of the most recent advancements in a variety of existing nursing challenges, covering several important topics including administration, evidence-based practise service delivery, and advancement.',
        'The research and scientific foundation for mentorship, service delivery, and development are granted considerable prominence.',
      ],
      after: [
        '**This curriculum will pave your way into a demanding industry:**',
        'Consider overseeing an organization or initiating reform in nursing interventions. Due to their vast variety of practise areas and medical care philosophies, nurses are in great demand in Australia\'s healthcare system. By finishing our Master of Nursing degree course, you might, as a nurse, play a crucial part in improving wellness, preventing illnesses, and providing care for everyone.',
      ],
    },
    {
      kind: 'prose', tone: 'blush', eyebrow: 'Structure', title: 'Course units',
      body: ['In the first three semesters, graduates try to complete their 9 core units, 2 compulsory units, and 1 elective unit.'],
      list: ['Professional Reflection in Nursing or Professional Experience Placement are the two electives that must be undertaken in the first semester.', 'Either three theoretical units or one nursing project can be chosen for the final semester.'],
      after: ['**For the completion of the Master of Nursing degree:** Students must attain 12 units to study with 128 credit points.'],
    },
    { kind: 'prose', title: 'What to expect from a Master of Nursing?', body: ['This IHM Master of Nursing Course focuses on the information, skills, and expertise you obtain during your academic nursing degree, allowing you to further improve your critical thinking abilities, use evidence in practise, and gain confidence in doing research. You\'ll discover new leadership skills that will help you promote change and ongoing development in your workplace.'] },
    {
      kind: 'prose', tone: 'ink', title: 'What can you accomplish with a degree in Nursing?',
      body: ['A Master\'s degree may help you pursue higher-level managerial, educational, or clinical responsibilities within healthcare settings. Nursing is a career where higher education is becoming more important.'],
      list: [
        'The quality-of-service users\' experiences, their careers, and their families\' livelihoods will all improve as a result of you being able to grow in your professional career.',
        'You can develop your nursing career and set yourself up for leadership roles with a Master of Nursing degree.',
        'You may enhance the quality of healthcare delivery at work by using the comprehensive clinical decision-making skills you\'ll learn throughout this degree course.',
        'To lead and alter their profession, registered nurses who successfully finish IHM\'s Master of Nursing Australia are expected to be able to combine advanced nursing knowledge and clinical skills.',
      ],
    },
    {
      kind: 'prose', title: 'Role of Nurses', listStyle: 'number',
      body: ['While nurses continue operating in a variety of contexts, they always have the same purpose in mind including the ones mentioned below:'],
      list: ['Keep track of the patient\'s symptoms and medical history.', 'Outline patient care in consultation with teams.', 'Promote the patients\' well-being and health.', 'Track the patient\'s health and document any changes.', 'Administering treatments and drugs.', 'Utilize medical equipment.', 'Run diagnostic procedures.', 'Inform patients on how to manage their ailments.', 'Support and counsel patients as required.'],
    },
    { kind: 'grid', title: 'Fundamental principles that define the profession of Nursing', items: ['Benevolence', 'Nonmaleficence', 'Fidelity', 'Accountability', 'Veracity'] },
    {
      kind: 'cards', title: 'Ethical standards are established by the concept of core values of nursing',
      items: [
        { title: 'Benevolence', body: 'Nurses must be dedicated to aiding patients and looking out for their best medical results.' },
        { title: 'Nonmaleficence', body: 'Nurses need to be careful not to intentionally hurt the people under their care. Although a therapy or procedure may have a negative effect on a patient, nurses would not purposefully injure them.' },
        { title: 'Fidelity', body: 'Nurses must uphold their commitments and fulfil their duty to provide high-standard, secure care.' },
        { title: 'Accountability', body: 'Nurses must undertake responsibility for their conduct on a personal and professional level.' },
        { title: 'Veracity', body: 'Patients rely on honesty, which is a cornerstone of nursing. Even if the information provided by nurses is upsetting, patients must be able to rely on them, to tell the truth.' },
      ],
    },
    { kind: 'prose', title: 'What is a Registered Nurse?', body: ['A nurse who has earned a nursing degree managed to pass the NCLEX-RN test and met all other state licencing standards is referred to as a registered nurse. Although a bachelor\'s degree or above is generally sought by organizations, an associate degree continues to be the minimum qualification required to take the NCLEX-RN test.'] },
    {
      kind: 'grid', title: 'Where Do Nurses Work?',
      intro: 'Not all Registered nurses work in medical facilities. A nurse may well be employed in a broad range of medical facilities, including clinics, urgent care facilities, pharmacies, hospitals, and many other places. Regardless of where they are situated, nurses may utilise their talents to care for their patient\'s needs. For instance, some nurses now provide in-home care for the elderly or incapacitated. The following are some typical sites where nurses work:',
      items: ['Hospitals', 'Clinics', 'Offices', 'Schools', 'Pharmacies', 'Ambulance/Helicopter', 'Home health care settings', 'Senior living communities'],
    },
    {
      kind: 'prose', tone: 'blush', title: 'Why Choose Nursing as a Profession?',
      body: [
        'A doctor might well be necessary to provide a diagnosis, but only a nurse can ensure survival. From a routine visit to the doctor\'s office to an unexpected trip to the emergency room, we can all think of a moment when we could have benefited from the help of a nurse the most. Whether it\'s a member of your own family, a close friend, a casual acquaintance, or the nurse who has cared for you at the doctor\'s office for years, most individuals can think of a nurse who has had a profound impact on their lives. If you still have unanswered medical questions, you may always call the nurse in your phonebook.',
        'Becoming a nurse means dedicating oneself to the betterment and perhaps even the saving of the lives of others. To put your caring nature and compassion to good use, nursing is a great profession to pursue.',
      ],
    },
    { kind: 'prose', title: 'International Students', body: ['If you participate in this course, you may look forward to exploring a variety of prospects whether you are from Nepal, the Philippines, India, or any other Asian country. People from these three major nations are moving to Australia to look for better career opportunities.'] },
    {
      kind: 'faq', title: 'Frequently Asked Questions',
      items: [
        { q: '1. How many years is a master\'s in nursing in Australia?', a: ['The Master of Nursing is a two-year graduate program that empowers nurse practitioners for academic, administrative, and clinical leadership positions in healthcare facilities. The advanced clinical decision-making skillset you\'ll need to enhance the delivery of healthcare on the job may be fostered in this degree course.'] },
        { q: '2. Which country is best for a master\'s in nursing?', a: ['It\'s no secret that Australia\'s nursing curriculum is a top choice among students around the world. Australia\'s top-tier graduate nursing courses are highly sought after around the world. 10 Australian universities are included in the top 50 worldwide nursing schools in the QS Nursing Rankings 2020.'] },
        { q: '3. Which Institute is best for a master\'s degree in nursing?', a: ['IHM is one of the pioneer educational institutions in Australia and is known for its quality education and training. They not only provide academic expertise but also help students understand the latest advancements in the industry and try to incorporate all the innovations into their specialized curriculum. Their Master of Nursing degree is structured and framed by their expert educators so that students can cope with their professional endeavours efficiently.'] },
      ],
    },
  ],
  closing: { title: 'Launch your nursing career in Australia!', cta: 'Talk to our Academic Counsellor' },
}

/** /lp/post-graduate-nursing-courses-to-advance-your-career/ — GCAN campaign (no course row). */
const GCAN_FACTS = [
  { label: 'AQF Level', value: '8' }, { label: 'Duration', value: '26 Weeks' }, { label: 'Accreditation', value: 'TEQSA' },
  { label: 'Mode of Learning', value: 'Online & Blended' },
  { label: 'Course fee', value: 'GCAN Online- AUD $8,000; Australian Nursing Practice (Hybrid - AUD $12,000, On Campus - AUD $12,000)' },
]
const POSTGRAD: CampaignPage = {
  hero: {
    eyebrow: 'Graduate Certificate in Advanced Nursing (GCAN)', title: 'Post Graduate Nursing Courses to Advance Your Career!', accent: 'Advance Your Career!',
    intro: ['An excellent opportunity for Bachelors/Diploma Nurses to upgrade your qualifications and achieve an Australian postgraduate degree'],
    chips: ['AQF Level 8', '26 Weeks', 'TEQSA', 'FEE-HELP'],
    image: { src: '/images/landing/gcan.webp', alt: 'Nurse studying for an advanced nursing qualification' },
  },
  formHeading: 'Enquire now',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', title: 'Graduate Certificate in Advanced Nursing (GCAN)', items: GCAN_FACTS },
    { kind: 'stats', items: [{ value: '#1', label: 'Non-University Higher Education Institute Post Graduate Nursing Institute In Australia', note: 'Ranked on QILT Surveys' }] },
    {
      kind: 'prose', tone: 'blush', eyebrow: 'Study now, pay later', title: 'FEE-HELP',
      body: [
        'FEE-HELP is an Australian government loan program designed to assist eligible fee-paying students in covering their tuition fees for higher education courses at approved institutions. It operates similarly to the HECS-HELP scheme but applies to students undertaking fee-paying undergraduate, postgraduate, or vocational education and training (VET) courses at approved providers.',
        'Through FEE-HELP, eligible students can borrow funds from the government to cover all or part of their tuition fees. Repayment of the loan occurs through the taxation system once their income reaches a specific threshold. This system aims to make tertiary education more accessible by allowing students to defer upfront tuition costs until they are earning a sufficient income.',
      ],
    },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: NURSES,
      body: [
        'Bachelors/Diploma nurses can now pursue a nursing career in Australia through the Graduate Certificate of Advanced Nursing (GCAN). This postgraduate nursing course makes you eligible for Australian Nursing Registration, opening doors to sought-after specialisations.',
        'Study online and earn an Advanced Nursing Certificate, to seize this excellent opportunity! Put your advanced nursing practice in Australia on the fast track!',
      ],
    },
    {
      kind: 'prose', id: 'admission', eyebrow: 'Entry criteria', title: 'Required eligibility',
      body: [
        'Registered Nurses from any country with GNM or a 3-year diploma in nursing with at least One year of relevant experience, OR B.Sc. nurses without experience can undertake this graduate certificate in nursing.',
        '5 years of study in an English medium OR successful completion of the IHM English test.',
        '**English Requirement for Australian Nursing Practice**',
      ],
      list: ['IELTS overall 6.5 no band less than 6, or PTE overall 56 no band less than 46, or OET B in each module.', 'Nurses currently registered and working in English speaking countries do not need this requirement.', 'Direct entry through a pass in English for Academic Purpose (EAP) course with a minimum score of 70%'],
    },
    {
      kind: 'grid', tone: 'ink', eyebrow: 'Specialisations', title: 'Pick from 13 in-demand Postgraduate Nursing Specialisations!',
      items: ['Renal Nursing', 'Paediatric Nursing', 'Critical Care Nursing', 'Mental Health Nursing', 'Neonatal Nursing', 'Acute Care Nursing', 'Emergency Nursing', 'Gerontology Nursing', 'Orthopaedic Nursing', 'Diabetes Nursing', 'Palliative Care Nursing', 'Perioperative Nursing', 'Australian Nursing Practice'],
    },
    {
      kind: 'cards', eyebrow: 'Why IHM', title: 'Why GCAN from IHM?',
      items: [
        { title: 'Elevated Qualification', body: 'Attain an AQF Level 8 postgraduate certificate in nursing from a prestigious Australian College' },
        { title: 'Flexible Finance', body: 'We offer convenient payment plans tailored to your needs.' },
        { title: 'Diverse Specialisations', body: 'From Renal to Emergency Nursing, we offer a wide array of postgraduate nursing courses, allowing you to hone your expertise in areas you\'re passionate about.' },
        { title: 'Flexibility', body: 'The Graduate Certificate in Advanced Nursing with 12 specialisations is delivered entirely online, allowing you to learn at your own pace. In just six months, you\'ll be a step closer to your Australian nursing registration and can work as an advanced practise registered nurse! For the Graduate Certificate in Advanced Nursing (GCAN) – Australian Nursing Practise, we offer a six-month programme that includes both online and on-campus study options.' },
        { title: 'Global Recognition', body: 'Our qualifications are acknowledged and accepted across all English-speaking countries' },
        { title: 'Real-World Success', body: 'Join the ranks of 4000+ advanced practice registered nurses we\'ve successfully trained in Australia!' },
      ],
    },
    { kind: 'callout', title: 'Download the Brochure', cta: 'Download Course Guide' },
    {
      kind: 'faq', title: 'FAQ',
      items: [
        { q: 'Can I apply for the program if I have a nursing degree from a different country?', a: ['If you have a current, valid nursing registration in your home country and meet the course\'s admission requirements, you are qualified to apply for the program.'] },
        { q: 'Can I pursue the program on a part-time basis?', a: ['The course is intended for registered nurses who are already in practice. You can choose between studying full time or part time.'] },
        { q: 'Are there any specific specialisation options within the program?', a: ['The Graduate Certificate in Advanced Nursing offers a choice of 13 different areas of specialisation. Nurses can select their areas of speciality depending on their prior experience as well as their areas of interest.'] },
        {
          q: 'What are the career prospects after completing the Graduate Certificate in Advanced Nursing?',
          a: ['Many nurses choose to study this course at IHM to upskill their qualifications and meet the nursing registration requirements set by the Australian Health Practitioner Regulation Agency (AHPRA). By obtaining an advanced nursing qualification, nurses can fulfil the criteria set by AHPRA for registration as an advanced practice nurse or for other specialised nursing roles.', 'Here are some of the potential career prospects for graduates of the Graduate Certificate in Advanced Nursing program at IHM after gaining Australian nursing registration:'],
          list: ['Pathway to IHM\'s Master of Nursing course, with 6 months credit transfer.', 'Advanced Practice Nurse', 'Nurse Educator', 'Nurse Manager/Administrator', 'Clinical Nurse Specialist', 'Nurse Researcher'],
        },
        { q: 'Are there any clinical placements or practical components included in the program?', a: ['The course does not include specific clinical placements or practical components as part of the course curriculum. However, it is recommended that students have access to a clinical specialty area relevant to their studies during the course'] },
        {
          q: 'How much does the program cost, and are there any scholarships or financial aid options available?',
          a: ['The Graduate Certificate in Advanced Nursing program at the Institute of Health and Management (IHM) has a course fee of AUD $8,000 for GCAN online. The fee is $12,000 for on campus and AUD $12,000 for hybrid delivery of Australian Nursing Practice. IHM provides a convenient payment plan option for eligible students to manage their tuition fees.', 'Additionally, IHM offers several scholarship opportunities:'],
          list: [
            '**Upfront Payment Scholarship:** Students who choose to pay the full course fees upfront are eligible for a 10% scholarship, reducing the fee to $7,200.',
            '**For Australian Nursing Practice:** Get 100% Payment Scholarship for NCLEX Preparation Course: Starting from March 2025, IHM offers a full scholarship for the NCLEX preparation course when students opt to make the full payment for the Graduate Certificate in Advanced Nursing program. This scholarship adds value and support to students preparing for the NCLEX examination.',
            '**Alumni Scholarship:** IHM also extends a 10% scholarship specifically for alumni students who enrol in the Graduate Certificate in Advanced Nursing program. This scholarship recognises the ongoing education and professional growth of IHM alumni.',
          ],
        },
      ],
    },
  ],
  closing: { title: 'Post Graduate Nursing Courses to Advance Your Career!', cta: 'Schedule a Call Back' },
}

export const MON_CAMPAIGNS: Record<string, CampaignPage> = {
  '/lp/master-of-nursing/': MASTER_OF_NURSING,
  '/lp/master-of-nursing-australia/': feeHelpPage({ title: 'Master of Nursing', fourth: 'Available on-campus and online', fee: 'AUD $12,000 per Semester', highlights: HIGHLIGHTS, formHeading: 'Apply Now!' }),
  '/lp/master-of-nursing-australia-anmj/': feeHelpPage({ title: 'Master of Nursing (Online)', fourth: 'Available on-campus and online', fee: 'AUD $5,000 per Semester', highlights: HIGHLIGHTS_ONLINE, formHeading: 'Apply Now!' }),
  '/lp/master-of-nursing-online/': feeHelpPage({ title: 'Master of Nursing (Online)', fourth: '100% Online', fee: 'AUD $5,000 per Semester', highlights: HIGHLIGHTS_ONLINE, formHeading: 'Enquire Now!' }),
  '/lp/master-nursing/': MASTER_NURSING,
  '/lp/post-graduate-nursing-courses-to-advance-your-career/': POSTGRAD,
}
