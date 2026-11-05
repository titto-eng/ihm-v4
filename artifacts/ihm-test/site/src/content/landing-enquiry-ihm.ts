// Copy for /lp/enquiry-ihm/ ("Enhance Your Nursing Career with Advanced Certifications from IHM!"), from the old lp/enquiry-ihm/index.php.
// The live page printed courses 2–5 twice (once without and once with the fee, slightly different details); each pair is merged
// here into one card that keeps every fact (fee, both locations/durations as worded, notes). Images in public/images/landing/.

export type OfferFact = { label: string; value: string }
export type CourseOffer = {
  n: number; title: string; href: string; image: string; body: string[]; highlight?: string; note?: string
  facts: OfferFact[]; eligibilityIntro?: string; eligibility: string[]; eligibilitySub?: string[]; englishTitle?: string; english?: string[]; englishNote?: string
}

export const ENQUIRY_IHM = {
  title: 'Enhance Your Nursing Career with Advanced Certifications from IHM!',
  kicker: 'Enquire Now to know more!',
  question: 'Are you looking for an overseas Nursing career, but lack the qualifications needed to work abroad?',
  questionBody: 'As the healthcare landscape keeps evolving in countries like Australia, UK, USA and more, there is a need for skilled nurses who can adapt to new patient care methods and emerging technologies.',
  whyTitle: 'Why choose a nursing career in Australia?',
  whyBody: 'There is a huge industry demand for overseas qualified nurses who can assume senior healthcare roles in Australia.',
  stats: [
    { value: '123,000', label: 'projected nurse shortage in Australia by 2030' },
    { value: '13.9%', label: 'job growth for registered nurses by 2026*' },
    { value: '23.1%', label: 'job growth for nurse managers by 2026*' },
  ],
  source: { t: '(Source: https://www.health.gov.au/)', href: 'https://www.health.gov.au/' },
  registrationNote: 'Note: These courses do not lead directly to registration as a nurse or midwife in Australia.',
  coursesTitle: 'Step into a global nursing career with these advanced courses from the Institute of Health and Management (IHM), Australia!',
  coursesIntro: 'Gain expertise in cutting-edge practices, specialised patient care, advanced diagnostics, and new-age clinical skills.',
  differentTitle: 'What makes IHM different from other institutes?',
  different: [
    { t: 'Affordable fees', b: 'The fees are lower compared to other universities or institutes.' },
    { t: 'Flexible delivery', b: 'Courses are delivered through flexible online and blended learning modes to help you balance your work-life commitments.' },
    { t: 'Open to all', b: 'IHM is open to registered nurses from any country (including their home country). However, other universities offering the same courses typically require registration as a registered nurse with the Nursing and Midwifery Board of Australia and 12 months of recent clinical experience in Australia as a registered nurse.' },
    { t: 'English language tests not required', b: 'IELTS and TOEFL scores are not required at IHM. In contrast, other universities offering the same courses typically require an IELTS or TOEFL score.' },
  ],
  courses: [
    {
      n: 1, title: 'Graduate Certificate in Advanced Nursing (Online) – 12 Specialisations', href: '/graduate-certificate-in-advanced-nursing/', image: '/images/landing/gcan.webp',
      body: ['GNM/Diploma nurses can now pursue a nursing career in Australia through the Graduate Certificate of Advanced Nursing (GCAN). This program makes you eligible for Australian Nursing Registration, opening doors to sought-after specialisations. Study online and earn an Advanced Nursing Certificate to seize this excellent opportunity!'],
      facts: [{ label: 'Mode of Learning', value: 'Online' }, { label: 'AQF Level', value: '8' }, { label: 'Duration', value: '26 Weeks' }, { label: 'Accreditation', value: 'TEQSA' }],
      eligibility: ['Registered Nurses from any country with GNM or a 3-year diploma in nursing with at least three years of relevant experience, OR B.Sc. nurses without experience.', '5 years of study in an English medium OR successful completion of the IHM English test.'],
    },
    {
      n: 2, title: 'Graduate Certificate in Advanced Nursing – Australian Nursing Practice', href: '/courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice/', image: '/images/landing/gcan-anp.webp',
      body: ['Unlock global opportunities with IHM’s Graduate Certificate in Advanced Nursing (Australian Nursing Practice)! This course aims to help IQNM\'s (Internationally Qualified Nurses and Midwives) meet AHPRA registration standards by providing specialised knowledge and hands-on experience. Diploma Nurses who have completed the ANP course are eligible to begin the OBA process.'],
      highlight: 'Join now to meet the growing demand for skilled registered nurses worldwide!',
      note: 'Please note that completion of this course does not directly lead to registration as a nurse or midwife in Australia.',
      facts: [{ label: 'Course Fee', value: 'Blended, On Campus: AUD $12,000' }, { label: 'Mode of Learning', value: 'On-Campus and online' }, { label: 'AQF Level', value: '8' }, { label: 'Duration', value: '26 Weeks' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'Location', value: 'Melbourne, Perth & Sydney' }],
      eligibility: ['Have completed a Bachelor of Nursing degree or an equivalent qualification or 3 years Diploma of Nursing (3 years of work experience mandatory as RN), or', 'Be an AHPRA registered nurse; or', 'Be a registered nurse with the Nurses’ Board/Council from the country of origin or place of residence'],
      englishTitle: 'English Language Requirement:',
      english: ['IELTS overall 6.5 no band less than 6 or PTE overall 56 no band less than 46 or OET B in each module, OR Direct entry through a pass in English for Academic Purpose (EAP) course with the minimum score of 70%.'],
      englishNote: 'Nurses currently registered and working in English Speaking Countries do not need this requirement. The recognized countries are Australia, United States, United Kingdom, Canada, New Zealand, the Republic of Ireland and South Africa.',
    },
    {
      n: 3, title: 'Master of Nursing', href: '/courses/master-of-nursing-international/', image: '/images/landing/mon.webp',
      body: ['Elevate your nursing career with the Master of Nursing program! This comprehensive course prepares graduate nurses for diverse roles in clinical nursing, research, education, management, and leadership. With advanced nursing knowledge and clinical skills, Registered Nurses can lead the future of healthcare with confidence and expertise.'],
      highlight: 'Get a scholarship for your Master of Nursing course, and get 5 years stay back after your studies!',
      facts: [{ label: 'Course Fee', value: 'AUD $9,000 per Semester' }, { label: 'Mode of Learning', value: 'On-Campus and online' }, { label: 'AQF Level', value: '9' }, { label: 'Duration', value: '2-Years Full Time Or 4-years Part-time' }, { label: 'Accreditation', value: 'TEQSA' }, { label: 'Location', value: 'Melbourne, Perth & Sydney' }],
      eligibilityIntro: 'To be eligible for admission to the Master of Nursing course an applicant is required to:',
      eligibility: ['Have completed a Bachelor of Nursing degree or an equivalent qualification.', 'Be an AHPRA registered nurse; or', 'Be a registered nurse with the Nurses’ Board/Council from the country of origin or place of residence and must have English Language Proficiency as evidenced by:'],
      eligibilitySub: ['An IELTS level of at least 6.5 with no bands less than 6, or equivalent scores in OET/PTE/other recognised English examination; or', 'Direct entry through a pass in English for Academic Purpose (EAP) course with a minimum score of 70%'],
    },
    {
      n: 4, title: 'National Council Licensure Examination for Registered Nurses (NCLEX for RNs)', href: '/courses/nclex-for-rns/', image: '/images/landing/nclex.webp',
      body: ['Unlock Australian Nursing Registration with IHM\'s NCLEX for RNs! This preparatory course allows you to enhance your professional knowledge and excel in the Multiple-Choice Question (MCQ) examination, a crucial part of Australia\'s Outcomes-Based Assessment (OBA). To become a registered nurse in Australia, clearing both the NCLEX MCQ (Part 1) and the OSCE Practical (Part 2) is essential. Prepare with confidence and take the first step to achieve a rewarding nursing career in Australia!'],
      highlight: 'Australia\'s most sought-after provider of NCLEX-RN preparation programmes!',
      facts: [{ label: 'Course Fee', value: 'AUD $500' }, { label: 'Mode of Learning', value: 'Online' }, { label: 'Duration', value: '12 Weeks' }, { label: 'Course Start Date', value: 'Every month' }],
      eligibility: ['Registered Nurses with BSc degrees or higher, including those with master\'s degrees, from anywhere in the world are eligible.'],
    },
    {
      n: 5, title: 'Objective Structured Clinical Examination for Registered Nurses (OSCE for RNs)', href: '/courses/osce-for-rns/', image: '/images/landing/osce.webp',
      body: [
        'Designed with the specific needs of Internationally Qualified nurses in mind, this course guides them through successfully passing the OSCE as part of the Outcomes-Based Assessments. Participants will master topics relevant to Australian nursing care while continually evaluating their existing nursing knowledge through ongoing assessment reviews.',
        'Conducted on-campus over a four-week period, the course features face-to-face sessions from Monday to Thursday. Additionally, Fridays provide students with an opportunity to practice and refine their skills in preparation for the OSCE testing. This service is provided free of charge to all IHM OSCE students.',
      ],
      facts: [{ label: 'Course Fee', value: 'AUD $2000' }, { label: 'Mode of Learning', value: 'On-Campus' }, { label: 'Duration', value: '2 Weeks' }, { label: 'Location', value: 'Melbourne CBD, Perth & Sydney' }],
      eligibility: ['You must hold a current registration as a Registered Nurse in your own country.'],
    },
    {
      n: 6, title: 'Bachelor of Social Work', href: '/courses/bachelor-of-social-work-international/', image: '/images/landing/bsw.webp',
      body: ['IHM’s Bachelor of Social Work program accredited by AASW (Australian Association of Social Workers) is delivered on-campus over four years, but Diploma of Community Services (DCS) holders can complete it in three years. Graduates are well-prepared for various careers in Child and Family Services, Counselling, Child Protection, Disability, Ageing, Refugee and Settlement, Mental Health, Rehabilitation, Mediation, and more. Social work is a rapidly growing and in-demand profession both in Australia and globally, and the Bachelor of Social Work can open doors to a satisfying global career!'],
      facts: [{ label: 'Mode of Learning', value: 'On-Campus' }, { label: 'AQF Level', value: '7' }, { label: 'Duration', value: '4-Years' }, { label: 'Accreditation', value: 'TEQSA, AASW' }, { label: 'Location', value: 'North Melbourne' }],
      eligibilityIntro: 'To be eligible for admission to the Bachelor of Social Service, an applicant is required to have completed Year 12 or Certificate IV completion or equivalent and should have studied in English. Prior work and/or volunteer experience in human services will be considered alongside education requirements.',
      eligibility: [
        'English Language entry is an academic IELTS level of at least 6.5 with no band less than 6.0, or equivalent scores in OET/PTE/ other recognised English examination (note: IELTS is not required if an applicant has studied an Australian equivalent qualification in English for 12 months or more in the past 5 years).',
        'Students who studied year 12 in English Language, are eligible to get an exemption in the English language score. If a student receives 6.5 overall and no band lower than 6.0, they are qualified to participate in the course.',
        'Direct entry through a pass in an Australian General English (ELICOS) course with the minimum score of 70%, or',
        'Pathway entry with credits, completion of an Australian VET (Vocational Education and Training) Diploma in Community services or Youth Work or Mental Health, or',
        'Completion of an Overseas BSW (verified) allows an applicant/student to receive up to 8-unit credits.',
        'Australian based studies in relevant bachelor programs can also be considered up to a maximum of 12-unit credits in total pathway entry with credit for Year 1 and 2 for applicants with an Australian Bachelor’s degree in Community Work, Youth Work, Human Services, or other Bachelor degrees that are deemed relevant.',
      ],
    },
  ] as CourseOffer[],
  closing: ['Make this opportunity count.', 'Live, learn, Grow!'],
}
