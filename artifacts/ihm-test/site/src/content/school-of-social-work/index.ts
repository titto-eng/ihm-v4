// The School of Social Work microsite (DEC-36): ihm.edu.au serves it as static HTML under /school-of-social-work/; here every one
// of its 35 URLs is a page in the site design, rendered by src/app/(site)/school-of-social-work/[[...slug]]/page.tsx.
// Copy: pages/*.json (the 9 section pages, as SSW blocks) and data.ts (13 careers, 13 events). Personal staff mailboxes are
// replaced by role mailboxes (AGENTS rule 4).
import type { PageEntry } from '../pages'
import { SSW_BASE, SSW_CAREERS, SSW_EVENTS, eventPhoto, sswImg } from './data'
import conference from './pages/conference-2026.json'
import careers from './pages/careers.json'
import index from './pages/index.json'
import life from './pages/life.json'
import people from './pages/people.json'
import research from './pages/research.json'
import resources from './pages/resources.json'
import socialWork from './pages/social-work.json'
import study from './pages/study.json'

export * from './data'

type Link = [label: string, href: string]
/** One block of an SSW page. Strings may carry `**bold**` and `[label](href)`. `id` puts an anchor on the section. */
/** A photo used by a section or the hero. */
export type SswImage = { src: string; alt: string; /** a chart or screen: shown whole, never cropped */ natural?: boolean }

export type SswBlock = { id?: string } & (
  /**
   * A heading. On an h2 (a section): `tone` paints the band (cream by default, `dark` warm ink, `coral` brand coral, `sand`),
   * `layout: 'split'` puts the title beside the text, `img` adds a photo beside the section's text, `band` makes the section a
   * full-width photo band. In the h1, `_words_` are set in gold italics.
   */
  | { h: number; t: string; tone?: 'dark' | 'coral' | 'sand'; layout?: 'split'; img?: SswImage; band?: SswImage }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: string[][] }
  /** A photo. In the hero, `tag` and `caption` overlay the photo. */
  | { img: string; alt?: string; tag?: string; caption?: string }
  | { btn: { t: string; href: string }[] }
  /** [value, label, note?] */
  | { stats: [string, string, string?][] }
  | { chips: string[] }
  | { note: string }
  /** [title, body] */
  | { cards: [string, string][] }
  /** Link list, or "CAREERS" for the 13 career areas. */
  | { links: Link[] | 'CAREERS' }
  /** [name, role, photo slug] */
  | { people: [string, string, string][] }
  /** [title, description, child committees] */
  | { tree: [string, string, string[]][] }
  | { quote: string }
  /** [quote, attribution] */
  | { quotes: [string, string][] }
  /** [YouTube id, title] */
  | { videos: [string, string][] }
  | { events: 'ALL' }
  /** The Fielda showcase: [image, title, caption] per screen; tabs with the screen in an app window, rotating every 6.5 s. */
  | { gallery: [string, string, string][] }
  /** Columns with a coral top rule and an all-caps title (the Fielda audiences): [title, body] */
  | { audiences: [string, string][] }
  /** An italic status line; `**bold**` is set in gold (e.g. "coming soon"). */
  | { pending: string }
  /** [logo, short name, full name, description] */
  | { partners: [string, string, string, string][] }
  /** [group heading, references] */
  | { pubs: [string, string[]][] }
  /** [question, answer] */
  | { faq: [string, string][] }
  /** [day heading, [time, item][]] */
  | { schedule: [string, [string, string][]][] }
  /** [image, alt] */
  | { logos: [string, string][] }
  /** Numbered statement cards (vision / purpose); `items` are [title, body] rows inside the card. */
  | { pillars: { n: string; label: string; title: string; body: string[]; items?: [string, string][] }[] }
)

export type SswPageData = { title: string; desc: string; blocks: SswBlock[] }

/** The School's own navigation (the microsite header), in order. */
/** One School navigation item: a School page (`slug`), or a menu (`items`) whose own pages are listed in `slugs` for the active state. */
export type SswNavItem = { label: string; slug?: string; items?: { label: string; href: string }[]; slugs?: string[] }

/** The School sub-navigation, as on the microsite: Home, About social work, Study with us (menu), Careers, People and Governance,
 *  Research & impact, Resources; plus the conference page, which the microsite links from its home page. */
export const SSW_MENU: SswNavItem[] = [
  { slug: '', label: 'Home' },
  { slug: 'social-work', label: 'About social work' },
  {
    label: 'Study with us',
    slugs: ['study', 'life'],
    items: [
      { label: 'Bachelor of Social Work', href: '/courses/bachelor-of-social-work-international/' },
      { label: 'Study with us', href: '/school-of-social-work/study/' },
      { label: 'Life at School of Social Work', href: '/school-of-social-work/life/' },
      { label: 'Student support', href: '/school-of-social-work/study/#support' },
    ],
  },
  { slug: 'careers', label: 'Careers' },
  { slug: 'people', label: 'People and Governance' },
  { slug: 'research', label: 'Research & impact' },
  { slug: 'resources', label: 'Resources' },
  { slug: 'conference-2026', label: 'Conference 2026' },
]

/** Breadcrumb names of the School pages. */
export const SSW_NAV: { slug: string; label: string }[] = [
  { slug: '', label: 'Home' },
  { slug: 'social-work', label: 'About social work' },
  { slug: 'study', label: 'Study with us' },
  { slug: 'life', label: 'Life at School of Social Work' },
  { slug: 'careers', label: 'Careers' },
  { slug: 'people', label: 'People and Governance' },
  { slug: 'research', label: 'Research & impact' },
  { slug: 'resources', label: 'Resources' },
  { slug: 'conference-2026', label: 'Conference 2026' },
]

export const SSW_PAGES: Record<string, SswPageData> = {
  '': index as SswPageData,
  'social-work': socialWork as SswPageData,
  study: study as SswPageData,
  life: life as SswPageData,
  careers: careers as SswPageData,
  people: people as SswPageData,
  research: research as SswPageData,
  resources: resources as SswPageData,
  'conference-2026': conference as SswPageData,
}

/** Hero photo for pages whose live hero has none. */
export const SSW_HERO: Record<string, { src: string; alt: string }> = {
  '': { src: sswImg('hero.webp'), alt: 'IHM social work students walking together on campus' },
  'conference-2026': { src: sswImg('conference-2026/image1.webp'), alt: 'IHM Inaugural Social Work Conference 2026' },
}

/** The live microsite's image paths → the local copies (see assets.ts). Unknown paths pass through. */
export function sswLocalImage(src: string): string {
  const live = src.replace(/^https?:\/\/(www\.)?ihm\.edu\.au/, '')
  let m = /^\/school-of-social-work\/images\/([\w-]+)\.jpg$/.exec(live)
  if (m) return sswImg(`${m[1]}.webp`)
  m = /^\/school-of-social-work\/img\/fielda\/([\w-]+)-fielda\.png$/.exec(live)
  if (m) return sswImg(`fielda/${m[1]}.webp`)
  m = /^\/school-of-social-work\/img\/conference-2026\/(image\d)\.png$/.exec(live)
  if (m) return sswImg(`conference-2026/${m[1]}.webp`)
  m = /^\/school-of-social-work\/img\/events\/([\w-]+)\/(?:gallery|thumbs)\/(\d+)\.webp$/i.exec(live)
  if (m) return eventPhoto(m[1].toLowerCase() === 'wayapa-workshop' ? 'learning-beyond-the-classroom' : m[1].toLowerCase(), Number(m[2]))
  if (live === '/school-of-social-work/img/current-student-experience.webp') return sswImg('current-student-experience.webp')
  return src
}

/** Every SSW path (with trailing slash), for the route's static params, pages.ts and the parity check. */
export const SSW_PATHS: string[] = [
  ...Object.keys(SSW_PAGES).map((s) => `${SSW_BASE}/${s ? `${s}/` : ''}`),
  ...SSW_CAREERS.map((c) => `${SSW_BASE}/careers/${c.slug}/`),
  ...SSW_EVENTS.map((e) => `${SSW_BASE}/events/${e.slug}/`),
]

const textOf = (blocks: SswBlock[]): string =>
  blocks
    .flatMap((b) => ('t' in b ? [b.t] : 'p' in b ? [b.p] : 'ul' in b ? b.ul : 'ol' in b ? b.ol : 'note' in b ? [b.note] : 'pending' in b ? [b.pending] : 'cards' in b ? b.cards.flat() : 'audiences' in b ? b.audiences.flat() : 'gallery' in b ? b.gallery.flatMap(([, t, c]) => [t, c]) : 'faq' in b ? b.faq.flat() : []))
    .join(' ')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .slice(0, 4000)

const shortTitle = (t: string) => t.replace(/\s*\|\s*IHM School of Social Work$/, '').replace(/\s*\|\s*School of Social Work$/, '')

/** Registry rows (spread into pages.ts). */
export const SSW_PAGE_ENTRIES: PageEntry[] = [
  ...Object.entries(SSW_PAGES).map(([slug, p]) => ({
    path: `${SSW_BASE}/${slug ? `${slug}/` : ''}`,
    title: slug ? shortTitle(p.title) : 'School of Social Work',
    template: 'schoolOfSocialWork',
    description: p.desc,
    text: textOf(p.blocks),
  })),
  ...SSW_CAREERS.map((c) => ({
    path: `${SSW_BASE}/careers/${c.slug}/`,
    title: c.title,
    template: 'schoolOfSocialWork',
    description: c.desc,
    text: [c.heading, c.lead, ...c.dayToDay, ...c.whereYouWork, c.pathway].join(' '),
  })),
  ...SSW_EVENTS.map((e) => ({
    path: `${SSW_BASE}/events/${e.slug}/`,
    title: e.title,
    template: 'schoolOfSocialWork',
    description: e.summary,
    text: [e.title, e.summary, ...e.story].join(' '),
  })),
]
