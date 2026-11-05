import type { HomeSlide } from './HomeHero.client'
import type { ChooserGroup } from './CourseChooser.client'

// Home page copy, migrated word for word from the WordPress front page (wp-content/themes/mwt-ihm/front-page.php).
// Photos: the theme's 2026 carousel banners and course thumbnails, copied to public/images/home/.

const APPLY = 'https://application.ihm.edu.au/'

export const HOME_SLIDES: HomeSlide[] = [
  {
    id: 'social-work-conference',
    eyebrow: 'Event',
    title: 'IHM Inaugural Social Work Conference - 2026',
    body: 'Dates: 16 and 17 November',
    image: { src: '/images/home/hero/social-work-conference.webp', alt: 'Speaker presenting to a full audience at a conference', position: '78% center' },
    ctas: [{ label: 'Register Now', href: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=niM6_UBfsk2J5NeaEQ7oONROCCqJZrBArysxPzo7ciBUQUNMVzNLQ0ozOFM3OUxDUVg5WUUxQ0VFNC4u', external: true }],
  },
  {
    id: 'brisbane-campus',
    eyebrow: 'New campus',
    title: 'IHM Expands to Brisbane',
    body: 'Now launching our 4th campus in Australia, located in the heart of Brisbane CBD.',
    image: { src: '/images/home/hero/brisbane-campus.webp', alt: 'Brisbane CBD skyline beside the Brisbane River', position: '70% center' },
    ctas: [{ label: 'Know More', href: '/brisbane-campus/' }],
  },
  {
    id: 'healthcare-professionals',
    title: "Creating Tomorrow's Healthcare Professionals",
    body: 'Aspiring medical practitioners with cutting-edge education and hands-on training.',
    image: { src: '/images/home/hero/healthcare-professionals-ihm-uniform.webp', alt: 'Smiling nurse in IHM maroon scrubs in a hospital ward', position: '72% center' },
    ctas: [{ label: 'Enquire now', href: '/contact/' }, { label: 'Find your perfect course', href: '/courses/' }],
  },
  {
    id: 'health-leaders',
    title: "Shaping Tomorrow's Health Leaders",
    body: 'Aspiring medical practitioners with cutting-edge education and hands-on training.',
    image: { src: '/images/home/hero/health-leaders-ihm-uniform.webp', alt: 'Nurse in IHM maroon scrubs standing in a hospital corridor', position: '72% center' },
    ctas: [{ label: 'Enquire now', href: '/contact/' }],
  },
  {
    id: 'community',
    title: 'A Community That Cares, Connects, and Create Change',
    body: 'Building compassionate social workers who empower people, strengthen communities, and make a meaningful difference.',
    // The live carousel's 11.webp (live site only): saved by `npm run assets:legacy`; until then HomeLanding shows the old photo.
    image: { src: '/images/home/hero/social-work-community.webp', alt: 'IHM social work students gathered together in a classroom', position: '62% center' },
    ctas: [{ label: 'Enquire Now', href: '/contact/' }],
  },
]

export const ABOUT = {
  heading: 'IHM prioritises the creation of innovative, technology-enhanced learning environments that emphasise *practical, outcome-driven* education.',
  paragraphs: [
    'The healthcare industry is undergoing transformation, and academics in this field must adapt in order to prepare professionals for best practices and care models. This is where an education from IHM truly shines. IHM courses are taught by experts with substantial experience in on-campus and online learning and teaching, bringing together the collective knowledge of experienced healthcare and social workers.',
    "Since its inception in 2012, the Institute of Health & Management (IHM) has established itself as Australia's premier provider of exceptional healthcare and social work education. IHM, which provides industry-recognised programmes for Nurses, social workers and other healthcare professionals, has been designated as an institute of higher education by the Australian Government's Tertiary Education Quality and Standards Agency (TEQSA).",
    'IHM emphasises technology-rich, creative learning environments that encourage outcome-driven, practical learning. Virtual reality simulations, immersive learning platforms, and curriculum aligned with worldwide best practices enable our students to gain access to the most up-to-date knowledge, tools, and techniques. Graduates of IHM will be equipped with skills and competencies that will offer them a competitive edge over their peers.',
  ],
  image: { src: '/images/home/about-community.webp', alt: 'IHM students and staff in IHM uniforms at a community gathering' },
}

/** Registration facts shown beside the About photo (from src/content/site.ts and the footer legal lines). */
export const KEY_FACTS = [
  { label: 'Since', value: '2012' },
  { label: 'Campuses', value: '4' },
  { label: 'TEQSA', value: 'PRV14040' },
  { label: 'CRICOS', value: '03407G' },
]

export const SCHOOLS: ChooserGroup[] = [
  {
    id: 'nursing',
    label: 'School of Nursing',
    courses: [
      { title: 'Bachelor of Nursing', href: '/courses/bachelor-of-nursing/', duration: '3 Years', award: 'Awarded', image: '/images/home/courses/bachelor-of-nursing.webp', enrol: APPLY },
      { title: 'Master of Nursing', href: '/courses/master-of-nursing-international/', duration: '104 Weeks', award: 'Awarded', image: '/images/home/courses/master-of-nursing.webp', enrol: APPLY },
      { title: 'Master of Nursing (online)', href: '/courses/master-of-nursing-online/', duration: '104 Weeks', award: 'Awarded', image: '/images/home/courses/master-of-nursing-online.webp', enrol: APPLY },
      { title: 'Graduate Certificate in Advanced Nursing (12 Specialisations)', href: '/graduate-certificate-in-advanced-nursing/', duration: '26 Weeks', award: 'Awarded', image: '/images/home/courses/gcan.webp', enrol: APPLY },
      { title: 'Registered Nurse Bridging Program (GCAN-ANP)', href: '/courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice/', duration: '26 Weeks', award: 'Awarded', image: '/images/home/courses/gcan-anp.webp', enrol: APPLY },
    ],
  },
  {
    id: 'social-work',
    label: 'School of Social Work',
    courses: [
      { title: 'Bachelor of Social Work (BSW)', href: '/courses/bachelor-of-social-work-international/', duration: '4 Years', award: 'Awarded', image: '/images/home/courses/bachelor-of-social-work.webp', enrol: APPLY },
    ],
  },
  {
    id: 'cap',
    label: 'Centre of Excellence in Health Careers Advancement Programs (CAP)',
    courses: [
      { title: 'National Council Licensure Examination for Registered Nurses (NCLEX for RNs)', href: '/courses/nclex-for-rns/', duration: '12 Weeks', award: 'Non-Awarded', image: '/images/home/courses/nclex-for-rns.webp', enrol: '/direct-enrol-application/?course_id=33' },
      { title: 'OSCE for RNs (Objective Structured Clinical Examination for Registered Nurses)', href: '/courses/osce-for-rns/', duration: '04 Weeks', award: 'Non-Awarded', image: '/images/home/courses/osce-for-rns.webp', enrol: '/direct-enrol-application/?course_id=61' },
    ],
  },
]

export const QILT = {
  intro: [
    'are a suite of government endorsed surveys for higher education, across the student life cycle from commencement to employment.',
    'QILT makes available robust, nationally consistent performance data for Australian higher education, helping drive quality improvement.',
    'The QILT surveys are funded by the Australian Government Department of Education and run by the Social Research Centre. The results are publicly available on the ComparED website.',
  ],
  surveyUrl: 'https://www.compared.edu.au/institution/institute-of-health-and-management/postgraduate',
  stats: [
    { value: 96, label: 'Were positive about their skills development' },
    { value: 89.3, label: 'Rated teaching practices positively' },
    { value: 83.7, label: 'Rated support and services positively' },
    { value: 89.8, label: 'Student interaction' },
    { value: 85.2, label: 'Had a positive overall experience' },
    { value: 85.2, label: 'Were happy with facilities and resources' },
    { value: 71.9, label: 'Peer engagement' },
  ],
}

export const FEATURES = [
  { icon: 'students', title: '5000+ Students', body: 'Thousands of IHM graduates have gone on to achieve fulfilling careers in the healthcare industry in Australia and abroad.' },
  { icon: 'experts', title: 'Expert Academics', body: 'We offer learning competencies and curriculum that are designed to bring you up-to-speed with global best practices in healthcare.' },
  { icon: 'innovation', title: 'Future Innovation', body: 'We stay on top of advancements in the healthcare environment, and are constantly aligned with future innovations in the industry.' },
]

export const CTA_STATEMENT = "IHM's world-class nursing and social work programmes, backed by strong industry expertise, can help you achieve your career goals, whether you're starting your journey in healthcare or human services or looking to advance and build on your existing skills."

export const QUICK_LINKS = [
  { icon: 'policy', label: 'Policies and Procedures', href: '/policies-procedures/' },
  { icon: 'support', label: 'Student Support Services', href: '/student-support-and-services/' },
  { icon: 'handbook', label: 'International Student Handbook', href: '/International-SHB/International-SHB.pdf' },
  { icon: 'handbook', label: 'Domestic Student Handbook', href: '/IHM_Domestic_SHB/IHM_Domestic_SHB.pdf' },
  { icon: 'testimonials', label: 'Student Testimonials', href: '/student-testimonials/' },
  { icon: 'guide', label: 'Course Guide', href: '/pdf/IHM_Course_Guide.pdf' },
]
