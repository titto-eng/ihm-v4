// Footer (was the footer global). Hand-edited since the 2026-10-19 cut (no CMS global behind it). Keep it plain data.
import type { NavLink } from './nav'

export type SocialNetwork = 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'x' | 'tiktok'

export const footer: {
  /** `kind` picks the column's look: plain links, contact lines (label : value) or campus pins. */
  columns: { heading: string; kind?: 'links' | 'contact' | 'campuses'; links: NavLink[] }[]
  /** The brand column (as on ihm.edu.au): institute name, the registration lines and the partner marks. */
  brand: { name: string; registration: string[]; marks: { src: string; alt: string; width: number; height: number; href?: string }[] }
  acknowledgementHeading: string
  /** Aboriginal design line across the top of the footer (theme footer-line-design.webp). */
  borderImage: string | null
  newsletter: { enabled: boolean; formKey: string; heading: string; text: string }
  acknowledgement: string | null
  legalLines: string[]
  legalLinks: NavLink[]
  social: { network: SocialNetwork; href: string }[]
} = {
  columns: [
    {
      heading: 'Quick Links',
      links: [
        { label: 'About us', href: '/about-us/' },
        { label: 'Library', href: '/library/' },
        { label: 'Careers', href: '/career/' },
        { label: 'Policies', href: '/policies-procedures/' },
        { label: 'Alumni Registration', href: '/alumni-registration/' },
        {
          label: 'Aboriginal and Torres Strait Islander Students',
          href: '/aboriginal-and-torres-strait-islander/',
        },
        { label: 'Pay Online', href: '/payment-options/' },
        { label: 'Contact us', href: '/contact/' },
        { label: 'IHM Course Guide', href: '/pdf/IHM_Course_Guide.pdf' },
        { label: 'Sitemap', href: '/site-map/' },
      ],
    },
    {
      heading: 'Contact Us',
      kind: 'contact',
      links: [
        { label: 'From within Australia : 1800 763 757', href: 'tel:1800763757' },
        { label: 'From outside Australia : +61 3 7046 7777', href: 'tel:+61370467777' },
        { label: 'Email : enquiry@ihm.edu.au', href: 'mailto:enquiry@ihm.edu.au' },
        { label: 'Download Corporate Profile', href: 'https://online.fliphtml5.com/wmka/kheh/#p=1' },
      ],
    },
    {
      heading: 'Campuses',
      kind: 'campuses',
      links: [
        { label: 'Melbourne', href: '/melbourne-campuses/' },
        { label: 'Perth', href: '/perth-campus/' },
        { label: 'Sydney', href: '/sydney-campus/' },
        { label: 'Brisbane', href: '/brisbane-campus/' },
      ],
    },
  ],
  brand: {
    name: 'Institute of Health & Management',
    registration: ['Category: Institute of Higher Education', 'CRICOS Provider: 03407G', 'Provider ID: PRV14040', 'ABN: 19 155 760 437 | ACN: 155 760 437'],
    marks: [
      { src: '/images/footer/study-australia-toolkit.png', alt: 'Study Australia Toolkit', width: 400, height: 100 },
      { src: '/images/footer/e4e-logo-white.svg', alt: 'Education for Employment (E4E) logo', width: 684, height: 300 },
    ],
  },
  acknowledgementHeading: 'Acknowledgement of Country',
  borderImage: '/images/footer/aboriginal-line.webp',
  newsletter: {
    enabled: true,
    formKey: 'newsletter',
    heading: 'Stay in the loop',
    text: 'Course news, events and study tips from IHM, straight to your inbox.',
  },
  acknowledgement: 'IHM acknowledges the Traditional Owners of country throughout Australia and recognises continuing connection to land, waters and culture. We pay our respects to Elders past, present and emerging.',
  // the bottom line; the year is added by the Footer ("© 2026.")
  legalLines: ['Legal entity: Institute of Health & Management Pty Ltd.'],
  legalLinks: [],
  social: [
    { network: 'facebook', href: 'https://www.facebook.com/ihmau/' },
    { network: 'instagram', href: 'https://www.instagram.com/ihmaustralia/' },
    { network: 'x', href: 'https://twitter.com/AustraliaIhm' },
    { network: 'youtube', href: 'https://www.youtube.com/channel/UCSvAFoQ0sdb2h8-zKzMu7Bw' },
    {
      network: 'linkedin',
      href: 'https://www.linkedin.com/showcase/institute-of-health-and-management-ihm-/about/?viewAsMember=true',
    },
  ],
}
