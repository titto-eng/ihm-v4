// Copy for the four Bachelor of Nursing campus landing pages (/lp/bachelor-of-nursing-{brisbane,melbourne,perth,sydney}/, CampusBachelor
// rows in src/content/landing.ts, form lp-admissions). The old pages (lp/bachelor-of-nursing-<city>/index.php) are identical apart from the
// city. Update `intake` here when the next intake is announced. Images in public/images/landing/bon/.

export const BON_LANDING = {
  intake: '9 November 2026',
  title: 'Become a Registered Nurse. Start Your Bachelor of Nursing with IHM Australia',
  seats: 'Limited Seats Available',
  facts: [
    { label: 'Course Duration', value: '3 Year full-time or Equivalent part-time' },
    { label: 'Delivery', value: 'Blended Delivery' },
    { label: 'AQF Level', value: '7' },
    { label: 'CRICOS Course Code', value: '118071E' },
  ],
  creditTeaser: {
    title: 'You May Be Eligible for Credit',
    body: ['Eligible Diploma of Nursing students may receive up to 1 year of credit and enter Year 2 of the degree directly, subject to eligibility and individual credit assessment.', 'Your previous nursing studies could help you progress towards your Bachelor of Nursing sooner.'],
  },
  whyTitle: 'Why Study Bachelor of Nursing at IHM?',
  placementHighlight: { title: '800 Hours of Professional Experience Placement', body: 'Complete five professional experience placements totalling 800 hours across the Bachelor of Nursing program.', cta: 'Explore your placements' },
  why: [
    { title: 'Develop Practical Nursing Skills', body: 'Gain hands-on experience through professional experience placements designed to connect classroom learning with real-world nursing practice.' },
    { title: 'Learn in Simulated Nursing Environments', body: 'Develop your clinical skills through simulated educational laboratories and technology-enabled learning.' },
    { title: 'Prepare for Modern Healthcare', body: 'Learn about contemporary nursing practice, electronic health records, digital health technologies and evidence-based care.' },
    { title: 'Pathway Towards RN Registration', body: 'On successful completion of the course, graduates may apply for registration as a Registered Nurse with the Nursing and Midwifery Board of Australia (NMBA), subject to meeting all applicable registration requirements.' },
  ],
  learnTitle: 'What Will You Learn?',
  learnIntro: 'Develop knowledge and skills across key areas of nursing, including:',
  learn: ['Anatomy and physiology', 'Communication skills for nurses', 'Person-centred nursing care', 'Chronic and complex conditions', 'Pathophysiology and pharmacotherapeutics', 'Mental health nursing', 'Community health nursing', 'Health informatics', 'Clinical leadership', 'Evidence-based nursing practice', 'Rural, regional and remote healthcare', 'Transition to the role of a Registered Nurse'],
  diploma: {
    title: 'Already Have a Diploma of Nursing?',
    subtitle: 'Your Nursing Diploma Could Give You a Head Start',
    body: 'If you have completed an eligible Diploma of Nursing (AQF Level 5) and meet the relevant requirements, you may be eligible to receive up to 12 months of credit (8 units) towards the Bachelor of Nursing.',
    note: 'Credit is subject to eligibility and individual credit assessment.',
    question: 'Want to know if you can enter Year 2?',
    badge: { top: 'Up to', value: '12', bottom: 'months of credit' },
  },
  placements: {
    title: 'Gain Professional Experience During Your Degree',
    intro: ['The Bachelor of Nursing includes five Professional Experience Placements (PEPs) totalling 800 hours.', 'You\'ll progressively develop your clinical skills and experience across areas including:'],
    years: [
      'Year 1: Introduction to clinical practice and nursing care',
      'Year 2: Acute and chronic nursing care + mental health nursing',
      'Year 3: Community health + medical/surgical nursing and final professional experience',
    ],
    yearNote: 'This experience helps you connect your academic learning with professional nursing practice.',
    stats: [{ value: '5', label: 'PEPs' }, { value: '800', label: 'hours' }, { value: '3', label: 'years' }],
  },
  careers: {
    title: 'Where Can Your Nursing Career Take You?',
    intro: 'A Bachelor of Nursing can prepare graduates for nursing careers across a range of healthcare environments, including:',
    places: ['Hospitals', 'Clinics', 'Community health', 'Aged care', 'Healthcare facilities', 'Community-based services'],
  },
  recognition: {
    title: 'Professional Recognition',
    body: [
      'On successful completion of the IHM Australia Bachelor of Nursing, you will be eligible to apply for registration as a Registered Nurse with the Nursing and Midwifery Board of Australia (NMBA).',
      'The NMBA has mandatory registration standards that applicants need to meet to be registered. Core registration standards are available on the NMBA website.',
      'This course is accredited with the Australian Nursing and Midwifery Accreditation Council (ANMAC) and is an NMBA approved course.',
    ],
    links: [
      { t: 'Australian Health Practitioner Regulation Agency', href: 'https://www.ahpra.gov.au/' },
      { t: 'Nursing and Midwifery Board of Australia', href: 'https://www.nursingmidwiferyboard.gov.au/' },
      { t: 'Core registration standards', href: 'https://www.nursingmidwiferyboard.gov.au/Registration-Standards.aspx' },
      { t: 'ANMAC', href: 'https://anmac.org.au/' },
    ],
  },
  closing: 'Become a Registered Nurse.',
}
