// Copy for the seven Master of Nursing enquiry landing pages (/lp/master-of-nursing-enquiry{,-australia,-brisbane,-melbourne,
// -oncampus-and-online,-perth,-sydney}/, CampusMaster rows in src/content/landing.ts, form lp-portal-hubspot). The old pages
// (lp/<slug>/index.php) share one body; MON_VARIANTS holds what differs per page (offer badges, fee, campus list, testimonials). Images in public/images/landing/mon/.

export type MonVariant = {
  /** hero line under the title */
  tagline: string
  feeHelp: string
  /** the % badge beside the NCLEX & OSCE one in the hero */
  offer?: { value: string; strong: string; text: string }
  /** the scholarship note under "Program at a Glance" */
  offerNote?: { value: string; strong: string; text: string }
  fee: string | null
  campuses: string
  image: { src: string; width: number; height: number }
  testimonials: boolean
}

const OVERVIEW_SQUARE = { src: '/images/landing/mon/overview-square.webp', width: 624, height: 624 }
const OVERVIEW = { src: '/images/landing/mon/overview.webp', width: 893, height: 586 }
const ALL_CAMPUSES = 'Melbourne, Sydney, Perth & Brisbane'
const CITY = { tagline: 'TEQSA Accredited • AQF Level 09', feeHelp: 'FEE-HELP Available for Eligible Students*', fee: '$12,000', campuses: ALL_CAMPUSES, image: OVERVIEW, testimonials: true }

export const MON_VARIANTS: Record<string, MonVariant> = {
  '/lp/master-of-nursing-enquiry/': { tagline: 'TEQSA Accredited • AQF Level 09', feeHelp: 'FEE-HELP Available for Eligible Students', fee: '$12,000', campuses: 'Melbourne, Sydney and Perth', image: OVERVIEW_SQUARE, testimonials: false },
  '/lp/master-of-nursing-enquiry-oncampus-and-online/': { tagline: 'TEQSA Accredited • AQF Level 09 • On Campus or Online', feeHelp: 'FEE-HELP Available for Eligible Students', fee: null, campuses: 'Melbourne, Sydney and Perth', image: OVERVIEW_SQUARE, testimonials: false },
  '/lp/master-of-nursing-enquiry-australia/': { ...CITY, offer: { value: '15%', strong: 'Scholarship Available,', text: 'Intake Now Open' } },
  '/lp/master-of-nursing-enquiry-melbourne/': { ...CITY },
  '/lp/master-of-nursing-enquiry-perth/': { ...CITY, offer: { value: '15%', strong: 'Year-End Scholarship Available,', text: 'November Intake Now Open' } },
  '/lp/master-of-nursing-enquiry-brisbane/': {
    ...CITY,
    offer: { value: '15%', strong: 'Introductory Scholarship', text: 'for Brisbane, January Intake Now Open' },
    offerNote: { value: '15%', strong: 'Introductory Scholarship Available', text: '15% Introductory Scholarship for Brisbane, January Intake Now Open.' },
  },
  '/lp/master-of-nursing-enquiry-sydney/': {
    ...CITY,
    offer: { value: '15%', strong: 'Scholarship Available,', text: 'January Intake Now Open' },
    offerNote: { value: '15%', strong: 'Scholarship Available', text: '15% Scholarship for Sydney, January Intake Now Open.' },
  },
}

export const MASTER_ENQUIRY = {
  nclex: { value: '100%', strong: 'Scholarship Available for', text: 'NCLEX & OSCE Training' },
  intro: 'Advance your career with our comprehensive program designed for ambitious nursing professionals.',
  formHeading: 'Quick Enquiry',
  glanceTitle: 'Program at a Glance',
  /** `fee` and `campuses` come from the variant */
  glance: [
    { label: 'Delivery Mode', value: 'On Campus' },
    { label: 'Accreditation', value: 'TEQSA' },
    { label: 'AQF Level', value: '09' },
    { label: 'Course Duration', value: '2 years Full-time* / 4 years Part-time' },
    { label: 'CRICOS Code', value: '105600C' },
  ],
  registrationNote: 'The Master of Nursing program at IHM will not directly lead to AHPRA registration.',
  overview: {
    title: 'Program Overview',
    subtitle: 'Excellence in Clinical & Leadership Education',
    body: 'Designed for registered nurses seeking advanced clinical, leadership, and research skills, this program offers hands-on learning, expert faculty guidance, and a supportive environment. Gain the qualifications needed to expand your career opportunities in Australia\'s growing healthcare sector.',
    points: ['Advanced clinical practice and specialisation opportunities', 'Expert faculty with decades of clinical experience', 'Hands-on learning with simulation-based training', 'Globally recognised qualification and pathway to leadership roles'],
    footnotes: [
      '* IHM, we are dedicated to supporting your journey towards Australian Nursing registration.',
      '*This course does not lead to Direct Nursing Registration in Australia, Nurses aspiring to become Registered Nurses in Australia must need NMBA approved English Language Requirements and pass NCLEX & OSCE for Australia.',
    ],
  },
  testimonials: {
    title: 'Student Testimonial',
    intro: 'Hear directly from our students as they share how IHM supported their learning journey, confidence, and career progression in nursing.',
    items: [
      { name: 'Mikaela', role: 'Master of Nursing student sharing her IHM study experience.', videoUrl: 'https://www.youtube.com/watch?v=bvlY8Jv7_YE' },
      { name: 'Dulaji Ketipe Arachchige', role: 'A student perspective on academic support, learning, and growth at IHM.', videoUrl: 'https://www.youtube.com/watch?v=HQC-Zx653Nc' },
      { name: 'Syliviah Mainga', role: 'A student story about building skills and preparing for the next stage of nursing practice.', videoUrl: 'https://www.youtube.com/watch?v=A6zVpPF4UN8' },
    ],
  },
  why: {
    title: 'Why Choose IHM for Your Master of Nursing?',
    points: [
      'Expert faculty with decades of clinical and academic experience',
      'Advanced learning in leadership, clinical practice, and research',
      'Modern classrooms and simulation-based learning facilities',
      'Comprehensive support for domestic & international students',
      'Flexible intakes and personalised academic support',
      'Located in major Australian cities with excellent student amenities',
    ],
    rankingTitle: 'IHM Ranked Among the Top in Australia (QILT Ranking)*',
    rankings: [
      { rank: '#1', label: 'Skills Development' },
      { rank: '#1', label: 'Student Support & Services' },
      { rank: '#2', label: 'Student-to-Student Interactions' },
      { rank: '#3', label: 'Overall Student Experience' },
    ],
    closing: 'IHM prepares you for expanded career opportunities across Australia\'s growing healthcare sector. Start your journey with personalised guidance every step of the way.',
  },
  admission: {
    title: 'Admission Requirements',
    intro: 'To be eligible for admission to the Master of Nursing course, an applicant is required to meet the following criteria:',
    items: [
      { title: 'Educational Qualification', body: ['Have completed a Bachelor of Nursing degree or an equivalent qualification.'] },
      { title: 'Professional Registration', body: ['Be an AHPRA registered nurse; or be a registered nurse with the Nurses\' Board/Council from the country of origin or place of residence.'] },
      {
        title: 'English Language Proficiency',
        body: [
          'Option 1: An IELTS level of at least 6.5 with no bands less than 6, or equivalent scores in OET/PTE/other recognised English examination.',
          'Option 2: Direct entry through a pass in English for Academic Purpose (EAP) course with a minimum score of 70%.',
        ],
      },
    ],
    note: 'English Language Proficiency Entry Requirements must be met by the student before commencement of the course.',
    englishLink: { label: 'English Language Entry Requirements and Waivers', href: '/english-language-proficiency-entry-requirements/' },
  },
  closing: { title: 'Learn More About Our Master of Nursing Program', cta: 'Schedule a call back' },
}
