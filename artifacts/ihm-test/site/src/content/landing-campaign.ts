// Shape of the course-campaign landing pages (/lp/master-of-nursing*/, /lp/bachelor-of-social-work*/, ...). Each page is a list of
// typed sections rendered by src/components/landing/CampaignLanding.tsx inside LandingLayout (the row's form beside and after the
// content). Text strings may use **bold** and [label](href). Copy per family: landing-campaign-mon.ts, landing-campaign-bsw.ts.

export type CampaignImage = { src: string; alt: string; width: number; height: number }

export type CampaignSection =
  | { kind: 'facts'; id?: string; eyebrow?: string; title?: string; items: { label: string; value: string }[]; note?: string }
  | { kind: 'prose'; id?: string; eyebrow?: string; title: string; body?: string[]; list?: string[]; listStyle?: 'check' | 'number' | 'dot'; after?: string[]; image?: CampaignImage; tone?: 'plain' | 'blush' | 'ink' }
  | { kind: 'grid'; id?: string; eyebrow?: string; title: string; intro?: string; items: string[]; after?: string[]; tone?: 'plain' | 'ink' }
  | { kind: 'cards'; id?: string; eyebrow?: string; title: string; intro?: string; items: { title?: string; body: string }[]; numbered?: boolean; after?: string[] }
  | { kind: 'groups'; id?: string; eyebrow?: string; title: string; intro?: string; groups: { title: string; body: string; items: string[] }[] }
  | { kind: 'stats'; id?: string; eyebrow?: string; title?: string; intro?: string; items: { value: string; label: string; note?: string }[]; note?: string }
  | { kind: 'pathway'; id?: string; eyebrow?: string; title: string; steps: { title: string; sub?: string; meta?: string; points?: string[] }[] }
  | { kind: 'specialisations'; id?: string; eyebrow?: string; title: string; intro?: string; items: { title: string; body: string[]; image?: CampaignImage; facts?: string[] }[] }
  | { kind: 'table'; id?: string; eyebrow?: string; title: string; intro?: string; head: string[]; rows: string[][]; after?: string[] }
  | { kind: 'startDates'; title: string }
  /** student quotes; `photo` is a public/ path shown when the file exists (live-only photos are in legacy-assets.ts), else initials */
  | { kind: 'quotes'; eyebrow?: string; title: string; intro?: string; items: { name: string; text: string[]; photo?: string }[]; visible?: number }
  | { kind: 'faq'; id?: string; title: string; items: { q: string; a: string[]; list?: string[] }[] }
  | { kind: 'callout'; title: string; body?: string; cta?: string }
  | { kind: 'links'; items: { label: string; href: string }[] }
  | { kind: 'videos'; eyebrow?: string; title: string; intro?: string; videos: { title: string; youtubeId: string }[] }

export type CampaignPage = {
  hero: { eyebrow: string; title: string; accent?: string; intro?: string[]; chips?: string[]; note?: string; image: { src: string; alt: string } }
  formHeading: string
  sections: CampaignSection[]
  closing: { title: string; body?: string; cta: string }
  /** show the course-brochure download (needs the row's course) */
  brochure?: boolean
}
