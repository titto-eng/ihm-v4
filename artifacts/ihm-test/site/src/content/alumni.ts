// /alumni/ — the IHM Alumni hub, from WordPress template-ihm-alumni.php (page 10138). Everything on the page is here; the route
// file (src/app/(site)/alumni/page.tsx) only lays it out. Photos are public/images/alumni/ (theme folder images/ihm-alumni/).

export const ALUMNI_YOUTUBE = 'https://www.youtube.com/channel/UCSvAFoQ0sdb2h8-zKzMu7Bw'

export const ALUMNI_HERO = {
  eyebrow: 'Stay Connected · Grow · Give Back',
  heading: 'Your healthcare career starts here. *Your impact lasts a lifetime.*',
  lead: "At IHM, we're proud to support healthcare and social work professionals at every stage of their careers. This space is for our students and alumni, to celebrate achievements, share inspiring journeys, stay connected, and discover new opportunities in healthcare.",
  collage: [
    { src: '/images/alumni/grad-8.webp', alt: 'IHM alumni graduation ceremony on stage' },
    { src: '/images/alumni/grad-1.webp', alt: 'IHM graduate receiving a certificate' },
    { src: '/images/alumni/grad-10.webp', alt: 'IHM graduation portrait on stage' },
    { src: '/images/alumni/grad-12.webp', alt: 'IHM graduate portrait with certificate' },
    { src: '/images/alumni/grad-13.webp', alt: 'IHM graduate portrait on ceremony stage' },
    { src: '/images/alumni/grad-17.webp', alt: 'IHM graduate receiving diploma on stage' },
  ],
  badges: ['Graduation Day · Melbourne', 'Graduation Day · Class of 2026'],
  caption: 'Celebrate the achievements of our students and alumni through graduation moments, inspiring journeys, and career milestones that reflect the IHM experience.',
}

export const ALUMNI_STATS = [
  { value: 17000, label: 'Alumni Worldwide' },
  { value: 200, label: 'Placement Partners' },
  { value: 40, label: 'Countries Represented' },
  { value: 10, label: 'Years of Excellence' },
]

export const ALUMNI_COUNTRIES = [
  ['🇰🇪', 'Kenya'], ['🇹🇼', 'Taiwan'], ['🇫🇯', 'Fiji'], ['🇬🇧', 'United Kingdom'], ['🇮🇪', 'Ireland'], ['🇨🇦', 'Canada'], ['🇯🇵', 'Japan'],
  ['🇮🇳', 'India'], ['🇵🇭', 'Philippines'], ['🇳🇵', 'Nepal'], ['🇰🇷', 'South Korea'], ['🇧🇹', 'Bhutan'], ['🇱🇰', 'Sri Lanka'], ['🇵🇰', 'Pakistan'],
  ['🇿🇲', 'Zambia'], ['🇦🇺', 'Australia'],
] as const

export const ALUMNI_GALLERY = [
  { src: '/images/alumni/grad-2.webp', alt: 'IHM alumni celebrating a graduation portrait moment' },
  { src: '/images/alumni/grad-8.webp', alt: 'IHM faculty and graduates on stage during the ceremony' },
  { src: '/images/alumni/grad-5.webp', alt: 'IHM graduate portrait beside ceremony curtain' },
  { src: '/images/alumni/grad-4.webp', alt: 'IHM alumni portrait with certificate' },
  { src: '/images/alumni/grad-6.webp', alt: 'IHM alumni graduation portrait on stage' },
  { src: '/images/alumni/grad-9.webp', alt: 'IHM alumni moment captured during graduation' },
  { src: '/images/alumni/grad-11.webp', alt: 'IHM graduation portrait with faculty member' },
  { src: '/images/alumni/grad-14.webp', alt: 'IHM graduate on stage with certificate' },
  { src: '/images/alumni/grad-15.webp', alt: 'IHM alumni portrait during graduation ceremony' },
]

export type AlumniVideo = { id: string; course: string; title: string; name: string; body: string }

export const ALUMNI_VIDEOS: AlumniVideo[] = [
  { id: '5pT8edoY-tw', course: 'Master of Nursing', name: 'Mariah', title: 'Meet Mariah - Master of Nursing graduate', body: 'Mariah shares what completing her Master of Nursing at IHM has meant for her career and her new life in Australia.' },
  { id: 'WXi5EvNdHrg', course: 'Master of Nursing', name: 'April Rose Mendoza', title: "April Rose's student journey", body: 'April Rose, from the Philippines, talks about the support and hands-on learning she found throughout the Master of Nursing program.' },
  { id: 'bvlY8Jv7_YE', course: 'Master of Nursing', name: 'Mikaela', title: 'From the Philippines to Registered Nurse in Australia', body: 'Mikaela shares how IHM helped her make the leap from the Philippines to practising as a Registered Nurse in Australia.' },
  { id: 'bONVvVWfj5k', course: 'Master of Nursing', name: 'Miho', title: 'Building a nursing career in Australia', body: 'Miho, from Japan, explains how IHM is helping her build her nursing career in Australia step by step.' },
  { id: 'LSzlBlgu7GI', course: 'GCAN', name: 'Brenda', title: 'Working full-time & prepping for AHPRA - why I chose GCAN', body: 'Brenda balanced full-time work with AHPRA registration prep, and shares why the Graduate Certificate in Advanced Nursing was the right fit.' },
  { id: 'hCvVpNS-t0Q', course: 'Master of Nursing', name: 'Sandhiya Naidu', title: "Sandhiya's IHM experience", body: 'Sandhiya reflects on her student experience at IHM and the confidence her training gave her as a nurse.' },
  { id: 'jc_6os9NSYM', course: 'Master of Nursing', name: 'Eric', title: 'Meet Eric - Master of Nursing graduate, Batch 2025', body: 'Eric, one of our proud Master of Nursing graduates from Batch 2025, shares the highlights of his IHM journey.' },
  { id: 'szrd2Ifa0z8', course: 'Bachelor of Social Work', name: 'Sherin', title: "Sherin's inspiring BSW testimony", body: "Sherin shares her inspiring journey through IHM's Bachelor of Social Work and where it has taken her career." },
]

export const ALUMNI_QUOTES = [
  { quote: "What attracted me to the Master of Nursing at IHM is the great campus in Melbourne and the supportive environment and culture. The school's cultural gala promotes socialisation and cultural exchange among students from diverse backgrounds.", name: 'Nimfa Marano', course: 'Master of Nursing' },
  { quote: "Attaining nursing registration during my Master's was the best thing that happened to me. The program has been transformative - it empowered me to make a meaningful difference in the healthcare industry.", name: 'Qhayam Mohammed', course: 'Master of Nursing' },
  { quote: 'The IHM teachers give me super guidance and support. They are always available to clarify my doubts and lead me to success. I am always thankful to them.', name: 'Ajitha Njarackel Arjunan', course: 'NCLEX-RN Preparation' },
]

/** "Celebrating your achievement": the two graduate spotlights, then the Facebook ceremony highlights. */
export const ALUMNI_MOMENTS = {
  spotlights: [
    { id: '5pT8edoY-tw', title: "Mariah's IHM graduate story", body: "A verified IHM graduate story focused on how the Master of Nursing experience shaped Mariah's career and life in Australia.", tag: 'Master of Nursing graduate story with a clear career-outcome angle and authentic IHM voice.' },
    { id: 'jc_6os9NSYM', title: "Eric's IHM graduate spotlight", body: 'Master of Nursing Batch 2025 graduate sharing the highlights of his IHM journey.', tag: 'Master of Nursing Batch 2025 graduate sharing the highlights of his IHM journey.' },
  ],
  facebook: [
    { href: 'https://www.facebook.com/share/p/1DWzXmp8te/', label: 'Facebook highlight 1', image: '/images/alumni/ceremony-stage.webp' },
    { href: 'https://www.facebook.com/share/p/1MVvf4MFvg/', label: 'Facebook highlight 2', image: '/images/alumni/ceremony-hall.webp' },
    { href: 'https://www.facebook.com/share/p/1BQNhXGVoD/', label: 'Facebook highlight 3', image: '/images/alumni/grad-16.webp' },
  ],
}

export const ALUMNI_BENEFITS = [
  { title: 'Mentoring & networking', body: 'Connect with senior alumni across nursing, health management and social work - or give back by mentoring a new graduate.', href: 'https://www.linkedin.com/showcase/alumni-of-institute-of-health-management-ihm/about/', cta: 'Join us on LinkedIn' },
  { title: 'Career growth', body: 'Access career resources, placement partner connections and pathways to further study, including NCLEX & OSCE preparation.', href: '/career-growth/', cta: 'Explore career support' },
  { title: 'Community meetups', body: 'Alumni meets, cultural celebrations and professional development touchpoints across our campuses - in person and online.', href: 'mailto:alumni@ihm.edu.au', cta: 'Ask about alumni activities' },
  { title: 'News & updates', body: 'Graduate spotlights, industry updates and community news delivered to your inbox. Sign up below to stay in the loop.', href: '#ihmrvSignup', cta: 'Sign up for updates' },
]

export const ALUMNI_REFERRAL = {
  heading: 'You already know the right person. Refer a friend and earn up to *AUD $1,000*',
  lead: 'You work with nurses, healthcare professionals and future social workers every day. Your recommendation changes their career.',
  rewards: [
    { course: 'Graduate Certificate in Advanced Nursing (GCAN)', amount: 'AUD $500' },
    { course: 'Master of Nursing - On Campus / Online', amount: 'AUD $1,000' },
    { course: 'Bachelor of Social Work', amount: 'AUD $1,000' },
  ],
  points: ['No limit on referrals for eligible students', 'More referrals = more impact', 'Payment processed once the student commences'],
  href: 'https://www.edupath.ai/ep-influencers',
  steps: ['Refer your friend through EduPath', 'IHM contacts your referral', 'They commence their course', 'Your reward payment is processed'],
  terms: '*Terms and conditions apply. Provider ID: PRV14040 - CRICOS Provider: 03407G',
  image: { src: '/images/alumni/referral.webp', alt: 'Graduation ceremony scene for referral section' },
}

export const ALUMNI_SUPPORT = [
  { title: 'Request your transcript', body: 'Email student support with your full name, course name, and student ID if you remember it.', note: 'Include: name / course / student ID', email: 'studentsupport@ihm.edu.au' },
  { title: 'Get in touch', body: 'Questions, alumni follow-up, or not sure where to go next? The IHM alumni team can guide you.', email: 'alumni@ihm.edu.au' },
]

export const ALUMNI_SOCIAL = [
  { network: 'facebook', href: 'https://www.facebook.com/ihmau/', label: 'Facebook', body: 'Community moments and announcements' },
  { network: 'instagram', href: 'https://www.instagram.com/ihmaustralia/', label: 'Instagram', body: 'Graduate highlights and campus snapshots' },
  { network: 'x', href: 'https://twitter.com/AustraliaIhm', label: 'X', body: 'News, updates, and quick announcements' },
  { network: 'linkedin', href: 'https://www.linkedin.com/showcase/institute-of-health-and-management-ihm-/about/?viewAsMember=true', label: 'LinkedIn', body: 'Professional updates and alumni visibility' },
  { network: 'youtube', href: ALUMNI_YOUTUBE, label: 'YouTube', body: 'Browse interviews, stories, and campus videos' },
] as const

export const ALUMNI_SIGNUP_PERKS = [
  'Invitations to alumni events, reunions and cultural celebrations',
  'Graduate spotlights and the alumni newsletter',
  'Career opportunities from our placement partners',
  'Pathways to further study and professional development',
  'Opportunities to mentor, volunteer and give back',
]
