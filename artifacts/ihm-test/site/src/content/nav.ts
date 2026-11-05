// Header navigation (was the header global). Hand-edited since the 2026-10-19 cut (no CMS global behind it). Keep it plain data.
export type NavLink = { label: string; href: string }
/** `href` links the heading itself (a school page); `highlight` renders the group's links as call-to-action tiles. */
export type NavGroup = { heading: string | null; href?: string; highlight?: boolean; links: NavLink[] }
export type NavItem = { label: string; href: string; groups: NavGroup[] }

export const nav: {
  utilityLinks: NavLink[]
  menu: NavItem[]
  primaryCta: NavLink | null
  secondaryCta: NavLink | null
  promoBar: { enabled: boolean; text: string | null; label: string | null; href: string | null }
} = {
  utilityLinks: [
    { label: 'Current Students', href: '/student-login/' },
    { label: 'Alumni', href: '/alumni/' },
    { label: 'Online Library', href: '/library/' },
    { label: 'Careers', href: '/career/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact Us', href: '/contact/' },
  ],
  menu: [
    { label: 'Home', href: '/', groups: [] },
    {
      label: 'About',
      href: '/about-us/',
      groups: [
        {
          heading: null,
          links: [
            { label: 'About Us', href: '/about-us/' },
            { label: 'Governance', href: '/governance/' },
            { label: 'Our Policies & Procedures', href: '/policies-procedures/' },
            { label: 'Our People', href: '/our-people/' },
            { label: 'HCI Australia', href: '/hci-australia/' },
            { label: 'Cintana Education Strategic Collaboration', href: '/cintana-alliance-partnership-ihm/' },
            { label: 'Reconciliation Action Plan', href: '/ihm-australias-reconciliation-action-plan/' },
            { label: 'Meet Our Managing Director', href: '/meet-our-md/' },
            { label: 'Rankings and Recognitions', href: '/rankings-and-recognitions/' },
            { label: 'Careers', href: '/career/' },
            { label: 'IHM Course Guide', href: '/pdf/IHM_Course_Guide.pdf' },
          ],
        },
      ],
    },
    {
      label: 'Courses',
      href: '/courses/',
      groups: [
        {
          // the old site has no School of Nursing page: the heading opens the course finder filtered to the school
          heading: 'School of Nursing',
          href: '/courses/?school=school-of-nursing',
          links: [
            { label: 'Bachelor of Nursing', href: '/courses/bachelor-of-nursing/' },
            { label: 'Master of Nursing', href: '/courses/master-of-nursing-international/' },
            { label: 'Master of Nursing (Online) Specialisation Pathway', href: '/nursing-specialisation-pathway/' },
            {
              label: 'Graduate Certificate in Advanced Nursing (12 Specialisations)',
              href: '/graduate-certificate-in-advanced-nursing/',
            },
            { label: 'Micro-credentials', href: '/micro-credentials/' },
            {
              label: 'Graduate Certificate in Advanced Nursing – Australian Nursing Practice (RN Bridging Program)',
              href: '/courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice/',
            },
          ],
        },
        {
          heading: 'School of Social Work',
          href: '/school-of-social-work/',
          links: [{ label: 'Bachelor of Social Work', href: '/courses/bachelor-of-social-work-international/' }],
        },
        {
          heading: 'Package Courses',
          links: [
            {
              label: 'Graduate Certificate in Advanced Nursing (Australian Nursing Practice) to Master of Nursing',
              href: '/courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice-to-master-of-nursing/',
            },
            {
              label: 'Diploma of Community Service to Bachelor of Social Work',
              href: '/courses/diploma-of-community-service-to-bachelor-of-social-work/',
            },
          ],
        },
        {
          heading: 'Careers Advancement Programs (CAP)',
          links: [
            {
              label: 'NCLEX (National Council Licensure Examination) for RNs',
              href: '/courses/nclex-for-rns/',
            },
            {
              label: 'OSCE (Objective Structured Clinical Examination for Registered Nurses) for RNs',
              href: '/courses/osce-for-rns/',
            },
          ],
        },
        {
          heading: null,
          highlight: true,
          links: [
            { label: 'How to Apply', href: '/how-to-apply/' },
            { label: 'Find your perfect course', href: '/courses/' },
          ],
        },
      ],
    },
    {
      label: 'Research',
      href: '#',
      groups: [
        {
          heading: null,
          links: [
            { label: 'Overview', href: '/research-ihm/' },
            { label: 'Research Strategy', href: '/research-strategy-ihm/' },
            { label: 'Research Centres', href: '/research-centres/' },
            { label: 'Research Ethics and Integrity', href: '/research-innovation/' },
            {
              label: 'Research Initiatives & Global Collaborations',
              href: '/research-initiatives-global-collaborations/',
            },
          ],
        },
      ],
    },
    {
      label: 'Partnership',
      href: '#',
      groups: [
        {
          heading: null,
          links: [
            { label: 'Partner with Us', href: '/partner-with-us/' },
            { label: 'Articulation pathway', href: '/articulation-pathway/' },
            { label: 'Industry Hub', href: 'https://industryhub.ihm.edu.au/' },
          ],
        },
      ],
    },
    {
      label: 'Student Life',
      href: '#',
      groups: [
        {
          heading: null,
          links: [
            { label: 'Studying at IHM', href: '/study-at-ihm/' },
            { label: 'Student Support and Services', href: '/student-support-and-services/' },
            { label: 'Key Dates', href: '/key-dates/' },
            { label: 'Before Fly to Australia', href: '/international-students-before-leaving-for-australia/' },
            { label: 'Regulatory Announcements', href: '/regulatory-announcements/' },
            { label: 'New to Australia?', href: '/new-to-australia/' },
            { label: 'Genuine Student Test(GST)', href: '/genuine-student-test/' },
            { label: 'Fee help', href: '/fee-help/' },
            { label: 'Nursing Registration Process', href: '/nursing-registration-in-australia/' },
            { label: 'Campuses', href: '/campuses/' },
            { label: 'News and Events', href: '/news-and-events/' },
            { label: 'Career growth', href: '/career-growth/' },
            { label: 'Student Testimonials', href: '/student-testimonials/' },
            { label: 'Student Safety', href: '/student-safety/' },
            { label: 'Disability & Accessibility Support', href: '/disability-accessibility-support/' },
            {
              label: 'ESOS Act 2000 Obligations',
              href: '/education-services-for-overseas-students-internationalisation/',
            },
            { label: 'Complaints and Grievances Process', href: '/complaints-and-appeals/' },
            { label: 'Advice for International Students', href: '/advice-for-international-students/' },
          ],
        },
      ],
    },
    {
      label: 'Login',
      href: '#',
      groups: [
        {
          heading: null,
          links: [
            { label: 'Student Login', href: '/student-login/' },
            { label: 'Staff Login', href: '/staff-login/' },
          ],
        },
      ],
    },
  ],
  primaryCta: { label: 'Enquire now', href: '?enquire=1' },
  secondaryCta: { label: 'Enquire', href: '/contact-us/' },
  promoBar: {
    enabled: false,
    text: 'Semester 2 intakes are open.',
    label: 'See start dates',
    href: '/courses/',
  },
}
