// Copy for the exam-preparation campaign landing pages (CourseLanding rows in src/content/landing.ts): /lp/nclex-for-rns/, /lp/nclex-rn/,
// /lp/osce-for-rns/, /lp/ncap_hold/, /lp/mcap-for-amc-written-examination-part-1/, /lp/dcap-adaptive/ and
// /lp/dental-career-advancement-program/. Text as on the old pages (lp/<slug>/index.php, read from the HTML); the NCLEX student quotes
// are in NCLEX_QUOTES at the end (photos in public/images/testimonials/, live-only ones listed in legacy-assets.ts). Rendered by CampaignLanding.
import type { CampaignImage, CampaignPage, CampaignSection } from './landing-campaign'

const ex = (name: string, alt: string, width: number, height: number): CampaignImage => ({ src: `/images/landing/exam/${name}.webp`, alt, width, height })
const LAUNCH = { title: 'Launch your nursing career in Australia!', cta: 'Talk to our Academic Counsellor' }
const INTERNATIONAL: CampaignSection = { kind: 'prose', title: 'International Students', body: ['If you participate in this course, you may look forward to exploring a variety of prospects whether you are from Nepal, the Philippines, India, or any other Asian country. People from these three major nations are moving to Australia to look for better career opportunities.'] }
const NCLEX_RESOURCES = (q: string, feedback: string) => ['Online NCLEX books', 'Lecture ppt- system wise', 'Recorded lectures', `Online tutorial sessions-with mini lectures on disease conditions and discussion on ${q}, NCLEX strategies`, 'Online reading material e.g., articles, publications relevant to scope of practice of Nursing in Australia', 'Weekly practice quizzes', `Once in 4 weeks i.e.${feedback}`, 'Academic support days with lecturers']

/* ---------- /lp/nclex-for-rns/ ---------- */
const NCLEX_FOR_RNS = (quotes: CampaignSection): CampaignPage => ({
  hero: {
    eyebrow: 'Talk to an Enrolment Advisor', title: 'Join IHM\'s NCLEX for RNs course to fulfill your dream of becoming a Registered Nurse in Australia!', accent: 'Registered Nurse in Australia!',
    image: { src: '/images/landing/nclex.webp', alt: 'Nurse preparing for the NCLEX exam' },
    chips: ['12 Weeks', 'First Monday of every month', 'Online'],
  },
  formHeading: 'Talk to an Enrolment Advisor',
  brochure: true,
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Duration', value: '12 Weeks' }, { label: 'Course Start Date', value: 'First Monday of every month' }, { label: 'Mode of Delivery', value: 'Online' }] },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: ex('nclex-rns', 'Smiling nurse in blue scrubs with a stethoscope', 700, 701),
      body: ['IHM\'s NCLEX for RNs is a preparatory course that helps candidates enhance their professional knowledge and prepare for the Multiple-Choice Question (MCQ) examination that is part of the Outcomes-Based Assessment (OBA) in Australia. To be a registered nurse in Australia, candidates need to clear both the NCLEX MCQ (Part 1) and the OSCE Practical (Part 2).'],
    },
    {
      kind: 'stats', items: [
        { value: '$78,969', label: 'The average salary of a Registered Nurse in Australia per year', note: 'Source: au.talent.com' },
        { value: '194,500', label: 'Number of openings for Registered Nurses projected each year in Australia', note: 'Source: bls.gov' },
      ],
    },
    {
      kind: 'grid', tone: 'ink', eyebrow: 'Why IHM', title: 'Why NCLEX from IHM?',
      items: ['Australia\'s largest provider of NCLEX-RN preparation programmes since the commencement of NCELX in Australia.', 'Affordable course fee', 'State-of-the-art infrastructure', 'Industry practitioners as faculty members', 'One on one doubt clearing sessions', 'Work-study balance', '24*7 student support', 'Excellent online learning platform'],
    },
    { kind: 'prose', tone: 'blush', title: 'Who is this course for?', body: ['Anybody who is a Registered Nurse in his/her home country, that is nurses who have completed their BSc degree or higher or master\'s degree, are eligible to enrol in IHM\'s NCLEX for RNs course. So, this course is for Registered Nurses around the world who want to work in Australia.'] },
    {
      kind: 'pathway', eyebrow: 'Your pathway', title: 'Pathway to becoming a Registered Nurse in Australia',
      steps: ['Registered Nurse in home country', 'Enrol in the NCLEX for RNs course', 'Prepare for the NCLEX for RNs exam online', 'Book your seat for the NCLEX exam', 'Sit for the exam at PTE centres', 'Clear the NCLEX for RNs exam', 'Enrol in the OSCE for RNs', 'Migrate to Australia to prepare for the Practical exam', 'Book your seat for The OSCE Practical exam', 'Clear the exam', 'Get your nursing registration to practice in Australia.'].map((title) => ({ title })),
    },
    { kind: 'prose', tone: 'ink', eyebrow: 'Next step', title: 'Where will this course take you', body: ['You will be eligible to move to the OSCE stage after passing the NCLEX RN examination. AHPRA will contact you shortly to arrange for your OSCE assessment at the Adelaide Health Simulation Centre. We advise you to continue your studies for the Objective Structured Clinical Examination.'] },
    {
      kind: 'faq', title: 'Frequently Asked Questions',
      items: [
        {
          q: '1. How long does the NCLEX training last?',
          a: ['NCLEX preparation at the Institute of Health and Management is a 12-week online course.', '**Batch 1 :** 7.00 PM – 10.00 PM AEST (3.0 hours on Monday, Wednesday, and Friday).', '**Batch 2 :** 8.30 – 10.30 pm IST (2.0 hours on Monday, Wednesday, Friday, Saturday and Sunday).', 'To assist nurses worldwide, NCLEX for RN\'s course delivery is delivered at IHM in two separate time slots. We have two cohorts of online live sessions running from 7 p.m. to 10 p.m. AEST (Melbourne/Sydney time) and from 8.30 – 10.30 pm IST. Classes will be running 3 days (3 hours a day) or 5 days (2 hours a day) in a week.'],
        },
        { q: '2. Are the NCLEX classes recorded?', a: ['Yes, all NCLEX-RN classes are recorded and made available to students for future reference. As a result, students who skip class on any given day can watch the recorded lecture at their leisure. IHM uses the same learning management system as its Master of Nursing students, which distinguishes this course and provides students with flexibility. Your access to our Learning Management System will be valid for an additional nine months following the course (for a total of 12 months), providing you confidence in preparing for the next NCLEX-RN examination.'] },
        { q: '3. What resources are provided in NCLEX for RN\'s preparation course at IHM?', a: [], list: NCLEX_RESOURCES('NCLEX questions', ' 3 CAT mock examinations (computer adaptive examinations) with written feedback') },
        { q: '4. Do I have to pay extra if I want to continue preparing after my NCLEX preparation classes have ended after 12 weeks?', a: ['No, you do not have to pay anything more to continue your studies online. If you require additional assistance, our team would be pleased to assist you. Your access to our Learning Management System will be valid for an extra nine months (for a total of 12 months) following the course, giving you confidence in preparing for the next NCLEX-RN examination. Because all of our classes are recorded, you will not have to attend them again.'] },
        { q: '5. How many NCLEX examinations can I take in a year?', a: ['You can take the NCLEX examination eight times in a year, with a 45-day break between each attempt. But don\'t worry, IHM\'s goal is to assist you to pass the examination on your first try.'] },
        { q: '6. What Happens Now That I\'ve Passed the NCLEX-RN Examination?', a: ['After passing the NCLEX RN examination, you will be able to proceed to the OSCE stage. AHPRA will contact you shortly with instructions on how to schedule your OSCE examination at the Adelaide Health Simulation Centre. We encourage you to keep going by studying for your Objective Structured Clinical Examination. IHM provides face-to-face OSCE preparation courses at all three of our campuses in Melbourne, Sydney, and Perth. Do you know that IHM offered an EPIQ-RN bridging program for international nurses and that around 2155 nurses obtained Australian nursing registration? All of our educators have prior experience delivering EPIQ-RN courses, and our labs stay the same!! So you don\'t have to worry about the next step after NCLEX-RN, you are in safe hands!'] },
        { q: '7. How Many NCLEX-RN Questions Are There?', a: ['**Regular Circumstances:** minimum 75, maximum 265 questions, 6 Hours.', '**COVID Adaptation:** minimum 75, maximum 145 questions, 5 Hours (From 1st Oct, 2020 till further notice).'] },
        {
          q: '8. Why study NCLEX for RNs at IHM?',
          a: [
            '**24*7 Student Support:** Student welfare, administrative and educational support are paramount to IHM from the moment of application to the time of graduation and beyond. Whatever the mode of delivery – face-to-face, blended or online – students are supported and motivated on a one-on-one basis by the institute\'s lecturers. IHM\'s student support officers are available 24*7 to help students, if needed.',
            '**Excellent Online Learning Platform:** The online learning platform used by IHM is interactive and innovative, through which students receive immense support, flexibility and quality virtual learning experience. With IHM\'s Online learning platform students can experience learning that is centred around them, their work and other life commitments. Studying online with IHM means, care and support that students will receive at their fingertips, 7-days a week.',
            '**Experienced and Highly Skilled Faculty:** IHM\'s teaching faculty includes members with immense skills and years of experience. They not only help the students to understand the foundation of nursing in Australia but also nurture and empower them to strive for the best.',
          ],
        },
      ],
    },
    quotes,
  ],
  closing: { title: LAUNCH.title, body: 'IHM\'s NCLEX for RNs is the first step to getting nursing registration in Australia.', cta: LAUNCH.cta },
})

/* ---------- /lp/nclex-rn/ ---------- */
const NCLEX_RN: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrollment Advisor', title: 'NCLEX-RN', accent: 'RN',
    image: { src: '/images/landing/nclex.webp', alt: 'Nurse preparing for the NCLEX exam' }, chips: ['Course Duration: 12 Weeks', 'Course Units: 1'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  brochure: true,
  sections: [
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: ex('nclex-rn', 'Nurse with glasses and a stethoscope in a hospital corridor', 767, 790),
      body: ['The NCSBN has published the annual NCLEX volume and pass rate statistics for 2020. According to the statistics, 252,967 individuals took the NCLEX test, with 72.25 % passing the test. This amount (total number of examinees) includes 83.73 % first-timers and 37.74 % recurring students. Most students who passed this exam (77.75 %) were educated nurse candidates, while 32.27 % (30,578) were international grads. The Philippines leads the pack in terms of internationally educated applicants (NCLEX-RN and NCLEX-PN), comprising 6,204 test takers. India stood second with 1,485 NCLEX takers, while Puerto Rico had 1,190 domestically educated nurses and PNs. Nigeria finished fourth with 496 exam takers, with Nepal rounding out the top five with 429 participants.', '(Source: [ncsbn.org](https://www.ncsbn.org/15985.htm))'],
    },
    {
      kind: 'prose', eyebrow: 'About the NCLEX', title: 'About the NCLEX',
      body: ['The Australian Health Practitioner Regulation Agency (AHPRA) has implemented a standardised examination called the National Council Licensure Examination for Registered Nurses (NCLEX-RN) to assess whether an applicant is qualified to sit for nursing licencing exams in Australia. Pearson VUE NCLEX RN Examination conducts this test globally so it may be taken by students in most countries.', '**Resources provided during this course:**'],
      list: NCLEX_RESOURCES('NCLEX question', ', 3 CAT mock examinations (computer adaptive examinations) with written feedbacks'),
    },
    {
      kind: 'prose', tone: 'ink', title: 'What is NCLEX?',
      body: ['The National Council Licensure Examination (NCLEX) is designed to evaluate candidates to determine whether they are qualified to begin working in the nursing profession at the entry-level position. It is quite different from any other exam that you took throughout your tenure in nursing school. The NCLEX-RN examines your ability to apply and analyse the nursing information you gained in school, in contrast to the examinations you took in nursing school, which were knowledge-based. You are going to be evaluated based on how well you can apply your critical thinking abilities to make nursing decisions.'],
    },
    { kind: 'stats', title: 'NCLEX-RN Pass Rate:', items: [{ value: '86.57%', label: 'For 2020' }, { value: '83.75%', label: 'For 2021 (through the first 3 quarters)' }], note: '*2020 NCLEX Pass Rates and 2021 NCLEX Pass Rates: [ncsbn.org](https://www.ncsbn.org/1237.htm)' },
    {
      kind: 'prose', tone: 'blush', title: 'What you need to know to ace the RN NCLEX-RN Exam?',
      body: [
        'The National Council Licensure Examination for Registered Nurses (NCLEX-RN) preparation course is designed to assist students in improving their professional knowledge and perform better on the Multiple-Choice Question (MCQ) test included in Australia\'s Outcomes Based Assessment (OBA). This non-awarded NCLEX preparation course will help international nurses get ready for the OBA-NCLEX by exposing them to knowledge that is directly applicable to their work in Australia\'s healthcare system and facilitating regular practise tests of their nursing expertise. The primary objective of this curriculum is to integrate students\' prior nursing knowledge, expertise, nursing skills, and life experiences with their newfound knowledge of the Australian healthcare system, Australian Registered Nurse Standards of Practice, and Australian National Quality and Safety Health Standards.',
        'Participants will be better prepared to read, comprehend, and interpret NCLEX pattern questions. This is accomplished by training students on how to effectively use NCLEX knowledge, techniques, Bloom\'s taxonomy, and Maslow\'s hierarchy to answer even the most complex analytical problems on the NCLEX. The course\'s ultimate goal is to help students become competent, confident, and secure registered nurses in Australia by encouraging critical thinking, conceptual testing, and the creation and expansion of nursing knowledge.',
      ],
    },
    {
      kind: 'cards', title: 'What is this test based on?', intro: 'The NCLEX-RN has four different subject areas, each of which is described in more depth hereunder:',
      items: [
        { title: 'Safe and Effective Care Environment', body: 'This section is intended to evaluate a nurse\'s ability to provide patients with an environment that is both accommodating and operational. Emergency preparedness, ethics, client protection, and home safety are all possible areas of focus for academic enquiry.' },
        { title: 'Health Promotion and Maintenance', body: 'The primary goal of modern nursing practise is not only the treatment of existing conditions but also the prevention of the development of new diseases. The students\' understanding of growth and development concepts will be put to the test in this part, which covers themes such as the ageing process, the care of newborns, lifestyle choices, and the phases of development.' },
        { title: 'Psychosocial Integrity', body: 'A student\'s understanding of mental disease is also tested on the NCLEX. This section of the nursing exam focuses on the psychological, social, and emotional issues (such as substance misuse, chemical addictions, and stress) that might have an effect on the health of a patient.' },
        { title: 'Physiological Integrity', body: 'It is the responsibility of registered nurses to encourage patients\' physical well-being by retaining their composure and easing their pain. In this part, they discuss risk management, various therapeutic treatments, and unexpected reactions to treatment.' },
      ],
    },
    { kind: 'prose', title: 'NCLEX Retake Information', body: ['You are only allowed to retake this exam a maximum of eight times within a single year, but the National Council of State Boards of Nursing (NCSBN), which oversees the administration of the NCLEX exams, does not place a limit on the total number of times you can try to pass an assessment test over the course of your career. On the other hand, nursing boards in certain states or jurisdictions have adopted more stringent standards regarding NCLEX retakes.'] },
    INTERNATIONAL,
    {
      kind: 'faq', title: 'Frequently Asked Questions',
      items: [
        { q: '1. Does Australia have NCLEX exam?', a: ['Yes, it is mandatory for every healthcare professional to pass the NCLEX. The Australian Health Practitioner Regulation Agency (AHPRA) has adopted a standardised examination called the National Council Licensure Examination for Registered Nurses (NCLEX-RN) to assess whether an applicant is qualified to sit for nursing licencing exams in Australia.'] },
        { q: '2. How to Apply for NCLEX Exam in Australia?', a: ['The Australian Health Practitioner Regulation Agency must grant you permission to sit for the NCLEX before you can submit your NCLEX application to do so. After that, go ahead and pay the required fee and register your details online. In addition, you may reach out to our counsellor and support team. Once you have successfully passed the NCLEX-RN test, you will be eligible to go on to the OSCE phase of your nursing practice. Your OSCE test will be held at the Adelaide Health Simulation Centre, and AHPRA will contact you soon with scheduled and detailed information. Continuing to keep practicing and preparing for the OSCE is something experts strongly advise. In fact, OSCE preparation classes are offered by IHM and is regarded as one of the finest globally. You can relax knowing that you will be well taken care of after passing the NCLEX-RN.'] },
        { q: '3. Where is the best place to study NCLEX in Australia?', a: ['IHM is one of the pioneer educational institutions in Australia and is known for its quality education and training. They not only provide academic expertise but also help students understand the latest advancements in the industry and try to incorporate all the innovations into their specialized curriculum. Their courses are structured and framed by their expert educators so that students can cope with their professional endeavours efficiently.'] },
      ],
    },
  ],
  closing: LAUNCH,
}

/* ---------- /lp/osce-for-rns/ ---------- */
const OSCE: CampaignPage = {
  hero: {
    eyebrow: 'Unlock Your Nursing Career in Australia with IHM\'s', title: 'Objective Structured Clinical Examination for Registered Nurses (OSCE for RNs)', accent: '(OSCE for RNs)',
    image: { src: '/images/landing/osce.webp', alt: 'Nurses practising clinical skills in a simulation lab' },
    intro: ['Become part of Australia\'s healthcare legacy as a valued nurse.'], chips: ['On Campus', '2 weeks', 'North Melbourne, Perth'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Mode of learning', value: 'On Campus' }, { label: 'Duration', value: '2 weeks' }, { label: 'Location', value: 'North Melbourne, Perth' }] },
    {
      kind: 'prose', eyebrow: '"Step into a world of nursing excellence in Australia."', title: 'About the course',
      body: [
        'This course is specially designed for Internationally Qualified nurses to pass OSCE as part of Outcomes-Based Assessments. To prepare for the OSCE test, they must learn topics relevant to Australian nursing care and evaluate their existing nursing knowledge through ongoing assessment reviews.',
        'The course is offered on campus for four weeks; face-to-face sessions will take place Monday to Thursday, and on Friday of each week, students can practice or \'touch-up\' their skills in preparation for their OSCE testing. This service is provided free of charge to all IHM OSCE students.',
      ],
    },
    {
      kind: 'cards', title: 'Why is OSCE significant for RNs?',
      items: [
        { title: 'Standardized Assessment', body: 'OSCE provides a standardized and structured approach to assessing the clinical skills of RNs' },
        { title: 'Realistic Simulation', body: 'OSCE uses simulated scenarios that closely resemble real-life clinical situations' },
        { title: 'Comprehensive Evaluation', body: 'The OSCE covers a wide range of clinical skills and competencies relevant to nursing practice' },
        { title: 'Quality Assurance', body: 'OSCE serves as a quality assurance measure for nursing education programs and regulatory bodies' },
        { title: 'Enhanced Patient Safety', body: 'Competent nursing practice is crucial for patient safety' },
        { title: 'Professional Development', body: 'OSCE provides a valuable learning opportunity for RNs' },
      ],
    },
    { kind: 'prose', id: 'admission', tone: 'blush', eyebrow: 'Entry criteria', title: 'Admission Requirements', list: ['You must hold a current registration as a Registered Nurse in your own country'] },
    {
      kind: 'cards', title: 'Benefits of working as a nurse in Australia',
      items: [
        { title: 'Competitive Salaries', body: 'Australia offers competitive salaries for nurses, ensuring that their work is fairly compensated' },
        { title: 'Strong Healthcare System', body: 'Australia has a robust healthcare system with a high standard of care' },
        { title: 'Career Opportunities', body: 'Australia provides diverse career opportunities for nurses' },
        { title: 'Work-Life Balance', body: 'Australia places a strong emphasis on work-life balance, which is beneficial for nurses' },
        { title: 'Professional Development', body: 'Australia encourages ongoing professional development for nurses' },
        { title: 'High Standards of Safety and Quality', body: 'Australia maintains stringent safety and quality standards in healthcare' },
      ],
    },
    { kind: 'callout', title: 'Unlock Your Nursing Career in Australia', cta: 'Enquire Now' },
    {
      kind: 'cards', title: 'Why is training required for the Objective Structured Clinical Examination?',
      items: [
        { title: 'Familiarization with the OSCE Format', body: 'The OSCE has a unique format that includes multiple stations with different scenarios and tasks' },
        { title: 'Practice and Skill Refinement', body: 'Training allows RNs to practice the specific clinical skills and tasks commonly assessed in OSCE' },
        { title: 'Simulation of Realistic Scenarios', body: 'OSCE scenarios aim to replicate real-life clinical situations' },
        { title: 'Standardized Feedback and Assessment', body: 'Training sessions often involve experienced assessors who can provide standardised feedback to RNs' },
        { title: 'Confidence Building', body: 'Training helps boost the confidence of RNs as they approach the OSCE' },
        { title: 'Time Management and Stress Management', body: 'The OSCE can be a time-pressuring and demanding assessment. Students will learn to manage their time well' },
      ],
    },
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Why IHM', title: 'Our students choose us for the following reasons:',
      list: [
        'Unlimited lab access for OSCE training', 'Students will be provided with labs and practice equipment', '100% success rate as of now', 'The labs are set in a specific manner to mimic the exam centers',
        'Students receive demonstration from experts and then allowed practice time followed by OSCE examination with written feedback',
        'Students are taught core nursing skills such as effective communication, infection control measures, maintaining confidentiality and privacy, personal and patient safety, manual handling along with other exam-oriented specific skills',
        'Students are prepared to be OSCE-smart. They are taught specific strategies to handle stress during OSCE',
      ],
    },
  ],
  closing: { title: 'Step into a world of nursing excellence in Australia.', cta: 'Schedule a call back' },
}

/* ---------- /lp/ncap_hold/ ---------- */
const NCAP: CampaignPage = {
  hero: {
    eyebrow: 'Go global! Work as an International nurse.', title: 'Nursing Career Advancement Program NCAP Global', accent: 'NCAP Global',
    image: { src: '/images/landing/hero.webp', alt: 'Two nurses reviewing a tablet in a hospital corridor' },
    intro: ['Join the Nursing Career Advancement Program - NCAP Global to fulfill your dream of becoming an international nurse.'], chips: ['Online', 'English', '1-Year'],
  },
  formHeading: 'Contact Us',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Mode of Delivery', value: 'Online' }, { label: 'Medium of Instruction', value: 'English' }, { label: 'Course Duration', value: '1-Year' }] },
    { kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: ex('ncap', 'Nurse in teal scrubs with arms crossed', 767, 790), body: ['NCAP Global brings together a number of training courses and services to help you gain valuable work experience, improve your communication skills and successfully prepare for the online tests and to ace any practical OSCE or OBA assessment, which is required in many countries for nursing registration.'] },
    {
      kind: 'stats', items: [
        { value: '450,000', label: 'Number of registered nurses and midwives in Australia', note: 'Source: www.health.gov.au' },
        { value: 'AUD $73,000', label: 'Average salary of a registered nurse in Australia per year', note: 'Source: healthtimes.com.au' },
      ],
    },
    { kind: 'grid', tone: 'ink', eyebrow: 'Why IHM', title: 'Why study NCAP from IHM?', items: ['Industry experienced faculty members', 'Affordable pricing', 'Live interactive classes with one-on-one doubt clearing sessions', 'Modern training methodologies'] },
    { kind: 'prose', title: 'Who is this course for?', body: ['This course is for nurses who want to work internationally and have completed a Bachelor of Nursing degree or an equivalent qualification.'] },
    { kind: 'prose', tone: 'blush', title: 'Where will this take you?', body: ['You will be able to work as a registered nurse in hospitals, healthcare facilities and so on.'] },
    { kind: 'callout', title: 'Chase your dream of working as a nurse internationally.', cta: 'Talk to our Academic Counsellor' },
  ],
  closing: { title: 'To be the best, be with the best!', cta: 'Talk to our Academic Counsellor' },
}

/* ---------- /lp/mcap-for-amc-written-examination-part-1/ ---------- */
const MCAP: CampaignPage = {
  hero: {
    eyebrow: 'Do you want to launch your medical career in Australia?', title: 'Australian Medical Council (AMC) Written Examination – Part 1', accent: 'Part 1',
    image: { src: '/images/landing/mon/graduation.webp', alt: 'IHM graduates throwing their caps at a graduation ceremony' },
    intro: ['Enrol in the Medical Career Advancement Program (MCAP) and make your dream come true!'], chips: ['Online', '6 weeks', 'October 2022'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Course Delivery', value: 'Online' }, { label: 'Duration', value: '6 weeks, 3 sessions/week, 3 hours/session' }, { label: 'Course Start Date', value: 'October 2022' }] },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview', image: { src: '/images/landing/mon/nurses.webp', alt: 'Three smiling healthcare professionals in navy scrubs', width: 767, height: 790 },
      body: [
        'The Medical Career Advancement Program (MCAP), brought to you by the Institute of Health and Management (IHM), is a preparatory course that enhances your professional knowledge and helps you to prepare for the Australian Medical Council (AMC) written examination – Part 1 (MCQ). On clearing this exam, you may migrate to Australia and start practising your medical profession there. Later, when you clear the AMC practical exam – Part 2, you can apply for permanent residency in Australia.',
        'This MCAP course will seamlessly merge your previous knowledge, experience, skills and learnings and provide you with new knowledge about the Australian healthcare system.',
      ],
    },
    {
      kind: 'stats', items: [
        { value: 'AU$ 156,000', label: 'average salary of a doctor per year in Australia', note: 'Source: PayScale' },
        { value: '3.52 per 1,000', label: 'population, Australia\'s doctor to patient ratio. So, there is an acute shortage of doctors in Australia.', note: 'Source: [hwd.health.gov.au](https://hwd.health.gov.au/)' },
      ],
    },
    {
      kind: 'prose', tone: 'blush', title: 'Who is this Program for?',
      body: [
        'The comprehensive 6-week course offers proper guidance for International Medical Graduates (IMGs). The course will equip the student with the theoretical knowledge, approach to AMC exam and AMC study materials along with solved previous exam questions (recalls). This course is flexible as part-time study for the AMC exam.',
        'The intensive 8-week course is ideal for those who have finished the initial AMC assessment and have registered for the AMC MCQ exam (Written examination – Part 1). This is a full-time study program and covers all the topics required for the AMC exam.',
      ],
    },
    {
      kind: 'grid', tone: 'ink', eyebrow: 'Why IHM', title: 'Why MCAP from IHM?',
      intro: '3000+ IHM graduates have gone on to achieve fulfilling careers in the healthcare industry in Australia and abroad. Here are some of the reasons why our students choose us:',
      items: ['24*7 Digital Library', 'Flexible Payment Model', 'Curriculum relevant to medical practice in Australia', 'State-of-the-art Labs', 'Classes taken by Registered Doctors'],
    },
    { kind: 'callout', title: 'Transform yourself!', cta: 'Talk to our Academic Counsellor' },
  ],
  closing: { title: 'The Australian healthcare industry needs you.', cta: 'Talk to our Academic Counsellor' },
}

/* ---------- the two Dental Career Advancement Program pages ---------- */
const DENTAL_ELIGIBILITY = ['Hold a minimum qualification(s) i.e, a bachelors degree in Dentistry', 'The minimum required qualifications vary between professions.', 'Dentists: must hold at least a four-year, full-time university dental degree, or diploma at an acknowledged university']
const ADC_PROCESS: CampaignSection[] = [
  {
    kind: 'prose', tone: 'ink', eyebrow: 'ADC Registration Process', title: 'Australian Dental Council (ADC) Registration Process for Overseas Registered Dentists',
    body: ['The ADC process consists of 3 stages:', '**1: Initial Assessment** — A paper-based qualification and documentation assessment.', 'The initial assessment process involves the assessment of documents including professional qualifications, work experience, registration history, and a good standing to determine eligibility to appear for the written examination.'],
  },
  {
    kind: 'table', title: 'Stage 1: Initial Assessment', head: ['', ''],
    rows: [
      ['Timeframe', 'Approximately 8 weeks (not inclusive of the time taken to submit any additional document)'], ['Cost', 'AUD $610'],
      ['Eligibility', 'To be eligible to apply for initial assessment applicants must: hold a minimum qualification(s) at the required level that is comparable in duration and content to the nationally agreed minimal education standard for the relevant Australian dental profession, and have held registration or license in either in their home country, or country of training, with no withdrawal of registration. The minimum required qualifications vary between professions. Dentists: must hold at least a four-year, full-time university dental degree, or diploma at an acknowledged university.'],
    ],
  },
  {
    kind: 'table', title: 'Stage 2: Written Examination',
    intro: 'The Australian Dental Council (ADC) written examination for dentists is designed to test your knowledge of science and dentistry practice. This computer delivered examination will also assess reasoning skills along with the application of clinical judgement as per the dental practice in Australia. The two-day examination is delivered by Pearson VUE on behalf of the ADC. Each computer-based examination consists of four papers each containing 80 scenario-based and single-best answer multiple choice questions. The examination is held in multiple locations in Australia and overseas.',
    head: ['Activity', 'Timeframe'],
    rows: [['Written examination application period', 'Approximately 3 to 4 months before the examination'], ['Authorisation to test emails sent', '8 weeks before examination'], ['Pearson VUE bookings open', '8 weeks before examination'], ['Pearson VUE bookings close', '5 weeks before examination'], ['Notification of examination results', '6 weeks after examination'], ['Application for verifications and appeals close', '28 days from notification of results']],
    after: ['**Timeframe:** Approximately 5 months. **Cost:** AUD 2,000. **Eligibility:** To be eligible to apply for a written examination you must have successfully completed the initial assessment process'],
  },
  {
    kind: 'table', title: 'Stage 3: Practical Examination',
    intro: 'The Australian Dental Council (ADC) practical examination offers a platform for you to demonstrate that you are competent to practise safely as a dentist in Australia. The practical examination will assess you across the range of the Entry-level competencies of the newly qualified dentist. The two-day simulation-based examination will assess your technical and clinical skills. You must successfully complete each stage of the assessment process before being eligible to apply for the next stage. Upon successful completion of the practical examination, you are eligible to apply for registration with the Dental Board of Australia (DBA).',
    head: ['Activity', 'Timeframe'],
    rows: [['Practical examination application period', 'Approximately 3 months prior to examination'], ['Notification of application receipt', 'Within 2 weeks of receipt of application'], ['Notification of allocated practical examination date', 'Within 6 weeks of practical examination application period'], ['Notification of examination results', '6 weeks after examination']],
    after: ['**Timeframe:** Approximately 6 to 9 months (Examinations are held most weeks of the year at the ADC examination centre). **Cost:** AUD 4,500. **Eligibility:** You are eligible to sit the practical examination within three years of successful completion of the ADC written examination.', 'For more information visit: [adc.org.au](https://www.adc.org.au/)'],
  },
]
const DENTAL_WHERE: CampaignSection = {
  kind: 'prose', tone: 'blush', eyebrow: 'Where will this take me?', title: 'Where will this take me?',
  body: [
    'After successfully completing the IHM\'s ADC written examination preparation course, you will be well prepared to ace the Australian Dental Council\'s (ADC) Written examination. The curriculum will offer you all you need to know about the Australian healthcare system and current standards of practice.',
    'After passing the written examination, you may continue your study for the ADC practical examination by enrolling in IHM\'s complete ADC practical examination preparation course at our Melbourne campus. For students who have passed the ADC written examination, we offer a four-week comprehensive ADC practical examination preparation course and an online communication OSCE preparation course.',
    'Don\'t worry, we\'ll be there to help you through the process of obtaining your Australian dental practitioner registration and beyond.',
  ],
}
const DENTAL_HERO = { src: '/images/landing/hero.webp', alt: 'Healthcare professionals reviewing a tablet in a clinic corridor' }
const GET_IN_TOUCH = { title: 'Get in Touch We are here to help you!', body: 'Get an answer on courses, costs, careers as well as facilities, entry requirements or just about anything else relating to studying at IHM.', cta: 'Enquire Now' }

const DCAP_ADAPTIVE: CampaignPage = {
  hero: { eyebrow: 'Online · 16 Units · 32 Weeks', title: 'Dental Career Advancement Program (DCAP) – ADC Adaptive Program', accent: 'ADC Adaptive Program', image: DENTAL_HERO, chips: ['Online: AUD $1,500'] },
  formHeading: 'Get in Touch',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Delivery Mode', value: 'Online' }, { label: 'Units', value: '16' }, { label: 'Course Duration', value: '32 Weeks' }, { label: 'Online', value: 'AUD $1,500' }] },
    {
      kind: 'prose', eyebrow: 'About the Course', title: 'About the Course',
      body: [
        'If you are an international dentist or an intern/post-graduate dentistry student who has finished the four-year dental program and is awaiting provisional registration or post-graduate dentistry student this course is for you!',
        'The ADC-adaptive course is designed to help working dentists and new dentists presently completing their internships prepare for the Australian Dental Council written examination in a more adaptable manner.',
        'If you\'re an overseas dentist working, completing internships or a postgraduate student, DCAP-Adaptive is the course model for you. This 32-week course is specially designed to assist overseas dental graduates in preparing and clearing ADC written examination to be a registered Dentist in Australia.',
        'On **Saturdays only**, students will have two hours of live tutorial session, with all learning materials offered to students who have a busy work schedule that allows them to study at their own pace.',
        'With this course, ADC exam candidates will learn how to strengthen their academic knowledge by understanding the ideas of dental practice in Australia as well as how to use clinical judgment in accordance with the Australian Therapeutic Guidelines for Dental Practitioners.',
        'In order to become proficient, competent, and confident Australian registered dentists while completing their internship in their country of origin, students in this program engage in critical enquiry, test ideas, and generate and expand their dental knowledge.',
        'By understanding worldwide dental practice standards and preparing for the Australian Dental Council written tests, this course will help working dentists, interns, and postgraduate students better utilise their time.',
      ],
    },
    { kind: 'callout', title: 'Join the course to achieve your dreams', cta: 'Enquire Now' },
    {
      kind: 'prose', eyebrow: 'Details about the Course', title: 'About the Program',
      body: [
        'The ADC written examination – Adaptive course is a 32-week exam preparation course that assists ADC candidates in enhancing their professional knowledge and preparing for the Scenario-based Question (SBQ) exam, which is a component of the ADC dentist assessment process that evaluates the knowledge, judgment, clinical skills, and professional competences of overseas trained dentists.',
        'This non-awarded ADC exam preparation course will give International Dentists the opportunity to learn about the evaluation and examination procedures that have been accepted for registration in Australia.',
        'During this course, students will integrate their past understanding of dentistry and life experiences with new information on Australian healthcare systems, and then complete an exam to show that they "get" the Australian dental system.',
        'Students will learn how to read, interpret, and understand the ADC exam questions in the course. In order to answer the most difficult analytical questions on the ADC written examination, students are taught to be ADC-savvy and to execute ADC strategies through a full understanding of Therapeutic Guidelines and Odell Case situations for clinical Dentistry.',
        'To prepare students to be competent, confident, and safe licensed dentists in Australia, the course emphasises critical thinking, idea testing, and the development and growth of knowledge in dentistry.',
        'According to the disciplines and subdisciplines on which candidates will be examined, this course has been crafted and curated to meet their needs.',
        'Each discipline\'s specialised topic will be taught, along with educational tools and handbooks.',
      ],
    },
    {
      kind: 'prose', id: 'admission', eyebrow: 'Admission Requirements', title: 'Admission Requirements', body: ['To be eligible to apply for IHM\'s ADC written examination preparation course you must:'],
      list: [...DENTAL_ELIGIBILITY, 'A budding dentist who is currently undergoing an internship in a university/ college', 'To be eligible to apply for a written examination you must have successfully completed the initial assessment process'],
    },
    DENTAL_WHERE,
    ...ADC_PROCESS,
    { kind: 'table', eyebrow: 'Fees and Charges', title: 'Fees and Charges', head: ['Online', 'Amount'], rows: [['Tuition Fee', 'AUD $1,500.00']] },
    {
      kind: 'cards', numbered: true, eyebrow: 'How to apply', title: 'Are you Ready to Apply?',
      items: [
        { title: 'Application', body: 'Submit your online application by clicking "Enroll now" on the course page\'s upper right corner.' },
        { title: 'Enrollment Fee', body: 'After completing your application, you will be taken to the payment gateway, where you can make your payment immediately.' },
        { title: 'Confirmation of Admission', body: 'Once you\'ve paid the enrolment fee, we\'ll give you a confirmation of admission along with the orientation package so you can get ready for classes.' },
      ],
    },
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
  closing: GET_IN_TOUCH,
}

const DCAP: CampaignPage = {
  hero: { eyebrow: 'Online · 16 Units · 20 Weeks', title: 'Dental Career Advancement Program (DCAP) for Australian Dental Council (ADC) Comprehensive Program', accent: 'ADC', image: DENTAL_HERO, chips: ['Enroll any Time!'] },
  formHeading: 'Get in Touch',
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Delivery Mode', value: 'Online' }, { label: 'Units', value: '16' }, { label: 'Course Duration', value: '20 Weeks' }, { label: 'Start', value: 'Enroll any Time!' }] },
    {
      kind: 'prose', eyebrow: 'About the Course', title: 'About the Course',
      body: [
        'If you\'re an overseas dentist who wants to practice in Australia by passing the Australian Dental Council examination, this course is for you!',
        'As the need for competent dentists grows in Australia, the Australian Dental Council has established an examination system for dentists whose qualifications do not fulfill the requirements for registration in Australia (ADC).',
        'The Australian Dental Council (ADC) is the body that assesses foreign-trained dentists in order to allow them to practice in Australia. If a dentist has finished and passed a dental degree that included at least four years of full-time academic study at an ADC-recognized university and is registered as a dentist in their country of training or practice, they are qualified to take the ADC test. This course was created by Australian dentists who are registered with the AHPRA. They designed this course in order to assist dentists who have had their training outside of Australia in obtaining registration in that country.',
        'As a student in this exam preparatory course, you will have the opportunity to examine your reasoning and clinical judgment abilities in accordance with dental practice in Australia.',
        'As a student, you will be able to easily integrate your prior knowledge, expertise, abilities, and life experiences with the current norms of practice in the Australian healthcare system. With an emphasis on critical thinking, you\'ll learn how to become a professional, knowledgeable, confident, and critical-thinking registered dentist in Australia.',
      ],
    },
    { kind: 'callout', title: 'Join the course to achieve your dreams', cta: 'Enquire Now' },
    {
      kind: 'prose', eyebrow: 'Details about the Course', title: 'About the ADC Written examination (Part-1) preparation program',
      body: [
        'Dental Career Advancement Program (DCAP) for the ADC written examination (Part-1) is an exam preparatory course that helps ADC candidates to enhance their professional knowledge and prepare for the Scenario-based Question (SBQ) exam, which is part of the ADC dentist assessment process to assesses overseas trained dentists\' knowledge, judgment, clinical skills, and professional competencies.',
        'There will be an opportunity for International Dentists to study knowledge that is important for the evaluation and examination procedure approved for registration in Australia through this non-awarded ADC exam preparation program.',
        'Their prior dentistry knowledge and skills, as well as life experiences, will be combined with new information on Australian healthcare systems in this course, and they will be given the chance to demonstrate that they "get" the Australian dental system by completing an assessment.',
        'Additionally, the course aims to assist students in reading, interpreting, and understanding ADC examination questions. This is accomplished by teaching students to be ADC-savvy and to implement ADC techniques through a thorough grasp of Therapeutic Guidelines and Odell Case scenarios for clinical Dentistry in order to answer the most challenging analytical questions on the ADC written test.',
        'Overall, the course encourages critical thinking, concept testing, and the production and growth of knowledge in dentistry in order to prepare students to be competent, confident, and safe registered dentists in Australia.',
      ],
    },
    { kind: 'prose', tone: 'blush', title: 'Course Structure', body: ['The course has been specifically designed and curated to be aligned as per the disciplines and subdisciplines that the candidates will be tested on the day of examination.', 'Each topic within the specific disciplines will be taught in addition to which informative resources and handbooks will be provided.'] },
    {
      kind: 'faq', title: 'Frequently Asked Questions',
      items: [
        { q: '1. How long is the preparatory course and how much does it cost?', a: ['The Institute of Health and Management\'s ADC written examination preparation course is a 20-week online course with three-hour classes every Monday, Wednesday, and Friday from 7 p.m. to 10 p.m. in Melbourne / Sydney time. The course delivery time and duration have been carefully selected to fit the busy work schedules of practicing dentists worldwide.'] },
        { q: '2. What are the entry requirements for this preparatory course?', a: ['To be eligible to apply for IHM\'s ADC written examination preparation course you must:'], list: ['Hold a minimum qualification(s) i.e, a bachelors degree in Dentistry. The minimum required qualifications vary between professions.', 'Dentists: must hold at least a four-year, full-time university dental degree, or diploma at an acknowledged university', 'To be eligible to apply for a written examination you must have successfully completed the initial assessment process'] },
        {
          q: '3. What are the steps to becoming a Registered dentist in Australia?',
          a: ['**Dental practitioner assessment for registration**', 'Overseas qualified dental practitioners wanting to register to practice with the DBA, who are required to complete the ADC assessment, must complete the three-stage assessment process.'],
          list: ['**Step 1. Initial assessment:** A paper-based qualification and documentation assessment.', '**Step 2. Written examination:** A multi-choice question examination of knowledge and the clinical application of knowledge.', '**Step 3. Practical examination:** A two-day simulation-based examination assessing technical and clinical skills.', 'Candidates must successfully complete each stage of the assessment process before being eligible to apply for the next stage.', 'After successfully completing all the above steps, the candidate should get English test results and all other requirements advised by the Dental Board of Australia.'],
        },
        { q: '4. Is IELTS a prerequisite for the ADC exam?', a: ['No, the candidate should get English test results and all other requirements advised by the Dental Board of Australia after completing all the ADC assessment steps.'] },
        { q: '5. Does IHM assist with registration procedures, including the initial assessment?', a: ['Yes, our experts will gladly guide you through the ADC exam steps absolutely free. However, each application stage should be completed directly with ADC by the candidate.'] },
        { q: '6. What is the total number of questions on the ADC written exam?', a: ['The written examination is a two-day, computer-delivered, multiple-choice examination. The examination consists of 280 questions divided into four exams, each with 70 questions. Each paper will be given a two-hour time limit. On day one, two papers will be scheduled, and on day two, two papers will be scheduled.', 'For the written examination, the ADC uses scenario-based multiple-choice questions (MCQs). A scenario-based MCQ item is an overarching clinical vignette, with five multiple-choice questions attached. Each multiple-choice question has a single right answer and is linked to the facts included in the clinical vignette\'s clinical case.', 'With 280 questions spread across four papers, each examination will contain 56 scenarios (clinical vignettes), each with five related questions.'] },
        { q: '7. How is ADC written examination graded?', a: ['To pass the written examination, you must achieve a pass in each of the four written examination clusters.', 'For each cluster, you will be provided with a grade:'], list: ['Grades A and B indicate a Pass in the cluster', 'Grades C and D indicate a Fail in the cluster'] },
        { q: '8. What are the four clusters in the updated ADC written examination pattern?', a: [], list: ['Cluster 1 – Professionalism and Health promotion', 'Cluster 2 – Clinical information gathering', 'Cluster 3 – Diagnosis and management planning', 'Cluster 4 – Clinical treatment and evaluation'] },
        { q: '9. How long will it take for the ADC to make a decision following the initial assessment?', a: ['In a normal scenario, ADC will complete an initial evaluation in about two to three months provided all needed documents are submitted for verification.'] },
        { q: '10. What is the ADC assessment and examination fee for General dentist?', a: [], list: ['Application for initial assessment of overseas qualified dental practitioner: $610', 'Renewal of initial assessment of overseas qualified dental practitioner: $250', 'Written examination: $2,000', 'Practical examination: $4,500'] },
        { q: '11. Is there any available material that may assist me in preparing for the written examination?', a: ['Yes, with IHM\'s DCAP, course, you will receive all of the relevant resources for the ADC written examination. Our well-structured course design, which includes access to an online library, ensures that you have access to all of the relevant textbooks and reference resources for preparing for the ADC written exam.'] },
        { q: '12. How long is my test result on the written examination valid?', a: ['The written examination is valid for a period of three years following successful completion.'] },
      ],
    },
    {
      kind: 'prose', id: 'admission', eyebrow: 'Admission Requirements', title: 'Admission Requirements', body: ['To be eligible to apply for IHM\'s ADC written examination preparation course you must:'],
      list: [...DENTAL_ELIGIBILITY.slice(0, 2), 'Dentists: must hold at least a four-year, full-time university dental degree, or diploma at an acknowledged university.', 'To be eligible to apply for a written examination you must have successfully completed the initial assessment process.'],
    },
    DENTAL_WHERE,
    ...ADC_PROCESS,
    { kind: 'table', eyebrow: 'Course Start Dates', title: 'Course Start Dates', head: ['Campus', 'Delivery'], rows: [['Rosanna (Online)', 'Online Delivery']] },
  ],
  closing: GET_IN_TOUCH,
}

function examCampaigns(quotes: { name: string; text: string[]; photo?: string }[]): Record<string, CampaignPage> {
  const q: CampaignSection = { kind: 'quotes', eyebrow: 'Student stories', title: 'Student Testimonials', items: quotes }
  return {
    '/lp/nclex-for-rns/': NCLEX_FOR_RNS(q),
    '/lp/nclex-rn/': NCLEX_RN,
    '/lp/osce-for-rns/': OSCE,
    '/lp/ncap_hold/': NCAP,
    '/lp/mcap-for-amc-written-examination-part-1/': MCAP,
    '/lp/dcap-adaptive/': DCAP_ADAPTIVE,
    '/lp/dental-career-advancement-program/': DCAP,
  }
}

// The 29 NCLEX student testimonials as published on /lp/nclex-for-rns/ (text verbatim; photos where the old page had one).
const NCLEX_QUOTES: { name: string; text: string[]; photo?: string }[] = [
  {
    "name": "Sonam Palden",
    "text": [
      "Hi I am Sonam Palden, Thank you very much, and I would like to extend my heartfelt gratitude to IHM and all the lecturers for the NCLEX-RN coaching."
    ],
    "photo": "/images/testimonials/sonam-palden.webp"
  },
  {
    "name": "Navneer",
    "text": [
      "Hi, I am Navneer I have passed my NCLEX examination in the new generation, thanks to all, especially my tutors."
    ],
    "photo": "/images/testimonials/navneer.webp"
  },
  {
    "name": "Geetansh",
    "text": [
      "I passed my NCLEX RN exam with the assistance of IHM. Without the help of IHM, I was not capable to crack this exam. They boost my confidence and help me to achieve this success. The tutors are extremely helpful, motivating, and approachable."
    ]
  },
  {
    "name": "Jino George",
    "text": [
      "My name is Jino George, NCLEX RN student (July-September batch) I would like to inform you that I have passed my exam successfully. I express my sincere gratitude towards my lectures and the entire team who took part in this blissful moment. Once again thanks a lot for your precious guidelines and support throughout this journey."
    ],
    "photo": "/images/testimonials/jino-george.webp"
  },
  {
    "name": "Amanda Oguji",
    "text": [
      "Thanks, everyone, I passed my NCLEX. I got my results two days after writing. Thanks to all the tutors who helped me boost my confidence and thanks for your encouragement and guidance. And to my fellow nurses, you can do it."
    ],
    "photo": "/images/testimonials/amanda-oguji.webp"
  },
  {
    "name": "Siji Arimbooparambil Johny",
    "text": [
      "Thank you so much to the entire IHM team for your great effort. IHM study materials & online classes helped me a lot to achieve this goal."
    ],
    "photo": "/images/testimonials/siji-arimbooparambil-johny.webp"
  },
  {
    "name": "Jilcy Lukose",
    "text": [
      "I have completed my 3 months NCLEX-RN training with IHM. The training was excellent and exceeded my expectations. The study materials provided were Saunders and Kaplan. These helped me to crack the exam in the first attempt itself. The SATA questions, assessment materials and prioritization questions were greatly helpful to get the feel of the exam during the training."
    ],
    "photo": "/images/testimonials/jilcy-lukose.webp"
  },
  {
    "name": "Lekshmi A",
    "text": [
      "I passed my NCLEX RN with the help of IHM ..They gave me constant support and guidance throughout my NCLEX RN journey.. The teachers are highly professionals and resourceful. The entire structure of the course will help you to achieve your goal ..Thank you team IHM."
    ]
  },
  {
    "name": "Raveena Kumari",
    "text": [
      "\"Happiest Year of my life. IHM!!Thank you from the bottom of my heart for all you do! I was September batch student took my exam 29th December2022 and I got my result on 30th December early morning and was shocked when my husband said \"you cracked your Australia Nclex exam\". It was very tough for me. But great thanks to IHM teachers who helped me on my Nclex journey, Specifically Julie John Mam her way of teaching.In whole my journey my biggest support my husband, my in laws specially my mother in law she support me like a child I think I have no words to say anything.At the end, I would like to say everyone “Believe in yourself “"
    ],
    "photo": "/images/testimonials/raveena-kumari.webp"
  },
  {
    "name": "Rambabu Nalabolu",
    "text": [
      "\"Thank you IHM team who helped me crack the Nclex RN in the first attempt. Especially thanking Julie madam & Sweety madam for the guidance and tricks which was taught really helped me to crack it.\""
    ],
    "photo": "/images/testimonials/rambabu-nalabolu.webp"
  },
  {
    "name": "Richa Kanwar",
    "text": [
      "\"Thank you IHM team in helping me pass my NCLEX exam.\""
    ],
    "photo": "/images/testimonials/richa-kanwar.webp"
  },
  {
    "name": "Tessy Thampy",
    "text": [
      "I wanted to extend my sincere thanks to all of you at the NCAP program. Especially to Madam Julie, Madam Sweety, Ms Praveena and Ms. Nimmy for all the help granted to me while doing the program. God enabled me to clear the NCLEX RN Exam. You all were always ready to help us.Hoping to complete the OBA program successfully soon. Thankyou once again...🙂🙂"
    ]
  },
  {
    "name": "Rakhi Duhan",
    "text": [
      "I got my NCLEX result and have successfully passed it (at 76 th question). It wouldn't have been impossible without IHM's guidance and classes to crack the exam in first attempt,so thank you so much for all the support that you have provided me. Iam very happy with IHM's course and would definitely recommend it to others🙂"
    ],
    "photo": "/images/testimonials/rakhi-duhan.webp"
  },
  {
    "name": "Pratikshya Bista",
    "text": [
      "I am Pratikshya Bista. Recently I have given NCLEX-RN exam and I was able to succeed it. I have got full 145 questions. It was very tough for me. But great thanks to IHM teachers who helped me on my journey to pass NCLEX. I had been attending the NCLEX-RN classes offered by IHM since September 2022. The 12 week preparatory programme was really helpful to understand the important topics. The Q-bank provided by IHM canvas was really helpful. The mock tests and the explanations provided against the answers were helpful too. Its very tough for the working students to balance work and study but thanks to the live class recordings provided by IHM, it helped me to go back to the topics and give continuity to my study. Recording also helps me to revise it again and take effective notes from it. Along with these classes i also used Saunder book for NCLEX-RN preparation and was very effective. Very grateful to IHM. “Thank You”"
    ],
    "photo": "/images/testimonials/pratikshya-bista.webp"
  },
  {
    "name": "Mygie Bongoyan",
    "text": [
      "I would like to inform you and the team that I passed the NCLEX exam. It took me 7 weeks of waiting but it's all worth it. Thank you for your help, guys!"
    ]
  },
  {
    "name": "Sangeeta Bali",
    "text": [
      "My name is Sangeeta Bali, and I recently passed the NCLEX test from IHM all the teachers are very supportive and encouraging. They never hesitate to explain things again and again. I did fail my exam twice and I was hopeless before joining IHM, but all my teachers always encourage me not to give up. Special thanks to Julie mam, Nimmy mam, and Sweety mam for encouraging me to achieve my goal. They explained how to study and made notes that were very helpful for me. I think this is the best place to crack the NCLEX"
    ],
    "photo": "/images/testimonials/sangeeta-bali.webp"
  },
  {
    "name": "Shahdeep Kaur",
    "text": [
      "Before starting to prepare for NCLEX, I had a long break of 3 years, and I was really scared. The course brought me up to speed regarding the fundamentals and prepared me for NCLEX examination as well. I am thankful to my teachers who guided me and provided insight about the tricks to crack the examination."
    ],
    "photo": "/images/testimonials/shahdeep-kaur.webp"
  },
  {
    "name": "Milanpreet",
    "text": [
      "I would like to thank IHM and especially Julie mam for her constant support and motivation. I cleared my NCLEX in first attempt, all due to the right guidance and resources. Julie John is an amazing teacher who puts her 100% in her students and keep them in a positive spirit."
    ]
  },
  {
    "name": "Elna Ann Jose",
    "text": [
      "I am Elna Ann Jose. I had been attending the NCLEX-RN classes offered by IHM since January 2022. The 12 week preparatory programme was really helpful to understand the important topics. I used the tips from the classes to create my own short notes which really helped me with the final revisions prior to my exam. The mock tests and the explanations provided against the answers were quite helpful. The recordings also helped me to go back to the topics I was not thorough with, to refresh my knowledge again. The exam was a bit tough. However I could answer all the 145 questions that were asked. I would like to thank everyone at IHM for helping me clear my NCLEX-RN exam in the very first attempt."
    ]
  },
  {
    "name": "Gwen",
    "text": [
      "I wanna thank all of you especially my mentors Julie and Jomin. i passed the nclex. Just got the news today. Send my luv to them please. Thank u thank u thank u soo sooo sooo much…"
    ]
  },
  {
    "name": "Jagdeep Kaur Sidhu",
    "text": [
      "I Jagdeep Kaur Sidhu.. I would like to share my personal experience with IHM college in Australia for NCLEX RN coaching classes. Thanks to all my teachers and IHM management members for your valuable support to clear the NCLEX in first attempt . It was wonderful experience with IHM ... thanks for online classes and additional resources😊"
    ]
  },
  {
    "name": "Pooja Rani",
    "text": [
      "I pleased to inform you that I have cleared the NCLEX examination under your guidance. I would like to thank you for your effort you made. Thank you so much. You are a great teacher. I would like to be in touch with you in my future...."
    ]
  },
  {
    "name": "Navdeep Kaur",
    "text": [
      "Hi , My name is Navdeep Kaur and recently I have cleared my NCLEX RN examination and I would like to thank to IHM and all the staff members for helping me to achieve my goal. .Ihm provided huge support to me , good study material as well as good online classes along with one to one session s. Educators are very friendly and very cooperative and available whenever I needed. Also I am very thankful to the student support team who is very helpful and proactive to assist the students whenever there is any technical issue . The online learning Management platform is very helpful to the student to prepare themselves for the NCLEX RN examination preparation and I am so impressed with their Learning management system which is quite flexible .Overall Whole IHM is very supportive and I would recommend everyone who is looking to get prepared themselves for NCLEX RN examination , I highly recommend them to get the training with IHM who want to clear the examination in one attempt only."
    ]
  },
  {
    "name": "Vinitha John",
    "text": [
      "I would strongly suggest IHM to anyone who wants to pass their NCLEX RN examination in one sitting, as I did. I was blown away by the quality of teaching and their Learning Management System, which was really helpful in helping me prepare for the examination and had a key factor in my passing the examination on the first try."
    ]
  },
  {
    "name": "Alex Johnson",
    "text": [
      "The training is extensive and generous in depth. IHM is also a wonderful investment because of the number of practise questions and other examination prep tools, as well as the one-on-one sessions with the educators."
    ]
  },
  {
    "name": "Brian Kipruto",
    "text": [
      "I would like to take this opportunity to thank you for all the support that you have given me on my studies all the support I really appreciate it. Thank you also for setting time aside for me every time I have question especially with my nursing registration and also giving me information to different study pathways all the way from graduated certificate in nursing program, masters and giving me information on NCLEX registration process got go approval to go and do my NCLEX today."
    ]
  },
  {
    "name": "Kristina George",
    "text": [
      "I am so delighted to say that I am now an Australian Registered Nurse, a dream that I believed would never come true. Mr. Noel, on the other hand, was the driving force behind my first step on the roller coaster and, I must say, made it feasible. I'd like to express my gratitude to God first, and the lovely IHM team for their continued support, motivation, and direction. Initially, I trusted them more than I trusted myself, taking the first step without considering the consequences, and they boosted my confidence, served as a motivator during my darkest hours, and now I feel as if they have caught my hand and pulled me up with this success. Thank you a lot."
    ]
  },
  {
    "name": "Sabrina Issac",
    "text": [
      "I want to thank everyone at IHM for a great support. I passed my NCLEX RN . IHM provided me with everything I needed to successfully prepare myself to take NCLEX RN examination. Thanks …"
    ]
  },
  {
    "name": "Seema",
    "text": [
      "I'm excited to share my experience of NCLEX RN preparation with IHM because they provided me the best training and support during my time with them. There is no comparison because they are so professional in delivering their lectures and answering the students' questions. Not only that, but because the course is online, they provide one-on-one sessions with the educators, ensuring that each and every query is resolved in order to build confidence. I must say that the question banks they provide are fantastic, and they are specifically prepared for the NCLEX RN examination, focusing on the important topics that carry a maximum passing percentage in the examination."
    ]
  }
]

export const EXAM_CAMPAIGNS = examCampaigns(NCLEX_QUOTES)
