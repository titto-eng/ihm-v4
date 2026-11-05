// Copy for /enquirenow/scholarship/ (NCAP Gateway to Global Nursing Scholarship) and /enquirenow/scholarship/expression-of-interest/
// (institutional partnership EOI). Taken from the static pages in the old site's enquirenow/scholarship/ folder as served live; the
// commented-out blocks in those files are not part of the page. Images in public/images/scholarship/. Forms: `scholarship` and
// `scholarship-eoi` (src/content/forms.ts), registry rows in src/content/landing.ts.

export const SCHOLARSHIP_APPLY_URL = 'https://forms.monday.com/forms/435c2391b55bd35eef771043c775bfd6?r=use1'

export type Pathway = { n: number; title: string; short: string; lead?: string; body: string[]; note?: string; fee: string; duration?: string; extras: { t: string; b: string }[]; href: string }

const EXTRAS = [
  { t: 'NCAP for NCLEX-RN Course', b: 'This course has been developed to help prepare nurses for the NCLEX-RN for USA, Canada, New Zealand, Australia and CBT test for the UK.' },
  { t: 'English for Nurses', b: 'English for Academic Purposes Training and mock test.' },
]

export const SCHOLARSHIP = {
  title: 'NCAP Gateway to Global Nursing Scholarship Program',
  scholarshipValue: 'AUD 2,000',
  intro: [
    'We recognise the challenges that COVID-19 is presenting to our international as well as domestic students who wish to begin their study at IHM. We understand that this is a difficult time for our international students, particularly when it comes to their finances.',
    'Hence, through our scholarships along with continuing support to our students to help them advance in their career. A scholarship provides financial assistance during your study. Some scholarships provide a stipend that covers tuition fees, while others provide only partial funding. We understand how important education is to fulfil your potential, and that access to a scholarship can help make that happen.',
    'We want to ease your financial burden so that you can focus on your studies.',
  ],
  disclaimer: '*Please note, eligibility requirements do apply and not all applicants will be offered a scholarship.',
  about: [
    'According to the statistics provided by the World Health Organisation (WHO), nurses and midwives comprise nearly half of the universal health workforce. It is estimated that there are 20.7 million nurses and midwives out of the 43.5 million health across the world.',
    'Although nursing is an essential practice, there are evident differences in nursing consuetudes in different parts of the world. Factors such as the variations in topography, economic standing, religious beliefs and the healthcare system of a country affect the way a nurse conducts their job. From education, registration and accreditation to conditions in which medication and care are administered, the nursing practice varies immensely across the globe.',
    'With this understanding, IHM has developed the NCAP – Gateway to Global Nursing program that will assist the overseas nurses who wish to work towards attaining their Nursing Registration in countries such as Australia, USA, Canada, UK and New Zealand. Moreover, this program also equips the overseas nurses with skills needed to prepare themselves to work as a nurse in the gulf countries and European countries like Italy, Austria, Switzerland and Germany.',
    'The program is aligned with IHM’s purpose; "to enhance lives through healthcare and education", and employs innovative approaches to nursing education utilising technology-enhanced learning methodologies with virtual classrooms and resources to enhance the learning experience.',
  ],
  stats: [
    { value: '20.7M', label: 'nurses and midwives worldwide (WHO)' },
    { value: '43.5M', label: 'health workers across the world' },
    { value: '≈ 1/2', label: 'of the health workforce are nurses and midwives' },
  ],
  countries: ['Australia', 'USA', 'Canada', 'UK', 'New Zealand'],
  alsoCountries: ['Gulf countries', 'Italy', 'Austria', 'Switzerland', 'Germany'],
  pathways: [
    {
      n: 1, title: 'Graduate Certificate in Nursing (Non-Specialisation) – GCN', short: 'Graduate Certificate in Nursing',
      lead: 'Study GCN at IHM to be skilled nurses ready to take on nursing opportunities globally!',
      body: [
        'The Graduate Certificate in Nursing (Non-Specialisation), is a general qualification that aims to provide qualified nurses with educational opportunities specific to the advancing role of the registered nurse, thereby facilitating their professional growth and development. This course will also help you improve your analytical skills and ability to assess patients.',
        'This Graduate Certificate in Nursing provides students with an entry path to the Graduate Diploma in Nursing then subsequently into a Master’s degree in Nursing.',
      ],
      note: '* This course does not lead to direct registration as a Nurse or Midwife in Australia.',
      fee: 'AUD 10,000: Less AUD 2,000 NCAP Gateway to Global Nursing Scholarship',
      duration: 'Up to 6 months (full-time); Up to 12 months (part-time)',
      extras: EXTRAS, href: '/courses/',
    },
    {
      n: 2, title: 'Graduate Diploma in Nursing (GDN)', short: 'Graduate Diploma in Nursing',
      body: [
        'The Graduate Diploma in Nursing is directed towards a high degree of expertise as a nurse with greater levels of responsibility and leadership in provision of responsive nursing care for individuals and families in general and specialised care. It includes increased understanding of the value of research and evidence-based practice.',
        'Further, the course is guided by the belief that postgraduate education builds upon undergraduate education and previous clinical experience. Therefore, the course provides an environment conducive to critical inquiry, testing of ideas and generation and expansion of knowledge. This includes the development of leadership capability and increased awareness of research skills.',
        'Study GDN with an optional pathway to Master of Nursing with recognition of prior learning, to take on international nursing opportunities.',
      ],
      note: 'This course does not lead to direct registration as a Nurse or Midwife in Australia.',
      fee: 'AUD 17,000; Less AUD 2000 Gateway to Global Nursing Scholarship',
      duration: 'Up to 12 months (full-time); Up to 24 months (part-time)',
      extras: EXTRAS, href: '/courses/',
    },
    {
      n: 3, title: 'Master of Nursing', short: 'Master of Nursing',
      body: [
        'The Master of Nursing course enables registered nurses to advance their professional knowledge, skills and behaviour to higher levels of capability in the practice setting. The Master of Nursing builds upon the theoretical knowledge and skills gained by nurses in their previous courses. This Master of Nursing course will allow nurses to gain advanced knowledge and skills in the Australian Health Care context that will prepare them for management roles, educational practice roles, and research roles in hospitals, community health centres and aged care facilities in Australia.',
        'Graduates of the Master of Nursing course will have the ability to facilitate changes in practice that will lead to the provision of culturally safe, optimal and person-centred nursing care which will result in better patient health outcomes.',
        'Join the first semester online from overseas as an option or start your GCN or GDN course online now and prepare to continue studying the Master of Nursing in Australia when the international borders reopen.',
      ],
      fee: 'AUD 23,500 annually; Less AUD 2,000 Gateway to Global Nursing Scholarship',
      extras: [], href: '/courses/master-of-nursing-international/',
    },
  ] as Pathway[],
  eligibilityIntro: 'To be eligible for IHM\'s NCAP Gateway to Global Nursing Scholarship program an applicant should:',
  eligibility: [
    'Satisfy the admission criteria for IHM courses',
    'Demonstrate successful completion of a recognised Bachelor of Nursing course / 3 year international diploma of Nursing course with a minimum overall score of 70%',
    'Demonstrate superior leadership and initiative in nursing by completing a 500 word response detailing:',
  ],
  essay: ['why you should be considered for an IHM NCAP Gateway to Global Nursing Scholarship', 'what have you contributed to the nursing sector in your area(s) of work, and', 'your career plans and educational goals'],
  eligibilityLast: 'Include a Letter of Support from your current employer or from the Institute where you completed your undergraduate nursing education.',
  partnership: {
    title: 'Institutional Partnership',
    body: [
      'Our partnerships are built through positive, transparent, and engaging collaboration, and we’re grateful for the strong relationships we have built over the lifetime of IHM. These partnerships may vary in their nature but they all share the common fact that there’s mutual benefit and a strong sense of purpose to move the healthcare industry forward.',
      'We encourage Nursing institutions, Hospitals Healthcare Organisations and nursing associations to submit their expression of interest to become our partners!',
      'Our industry and clinical partners provide physical access to products that benefit the simulation experience for students at IHM. Other partners provide opportunities to develop clinical skills at their facilities, such as nursing homes and hospitals. We also provide opportunities to upskill staff with the latest course.',
      'If you’re interested in becoming a partner, make sure to express your interest with our staff today.',
    ],
  },
}

export const EOI = {
  title: 'Expression of Interest',
  intro: 'Submit your expression of interest here and one of our team members will get back to you shortly.',
}
