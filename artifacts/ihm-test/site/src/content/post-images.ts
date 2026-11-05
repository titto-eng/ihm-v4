// Photo for a blog or news post that has no `heroImage` in the CMS (05-design-system §4.5, BlogPost / PostCard / Article JSON-LD).
// First matching topic wins, read from the post's title and slug; otherwise one of the nursing photos, picked by slug so a post
// always gets the same one. Paths are under public/.
export type PostImage = { src: string; alt: string }

const MC = (file: string, alt: string): PostImage => ({ src: `/images/micro-credentials/${file}.webp`, alt })

const TOPICS: [RegExp, PostImage][] = [
  [/naidoc|indigenous|reconciliation/, { src: '/images/cultural-events/naidoc-week-2025/dsc04013.webp', alt: 'IHM students and staff celebrating NAIDOC Week' }],
  [/nclex/, { src: '/images/landing/exam/nclex-rns.webp', alt: 'Internationally qualified nurse preparing for the NCLEX' }],
  [/osce/, { src: '/images/landing/osce.webp', alt: 'Nurses practising clinical skills for the OSCE' }],
  [/social-work/, { src: '/images/landing/bsw/group.webp', alt: 'Social work students discussing a case' }],
  [/paediatric/, MC('paediatric-nursing', 'Paediatric nurse caring for a child')],
  [/neonatal/, MC('neonatal-nursing', 'Neonatal nurse caring for a newborn')],
  [/critical-care/, MC('critical-care-nursing', 'Critical care nurse at a patient bedside')],
  [/emergency|-er-|code-blue/, MC('emergency-nursing', 'Emergency nurse at work')],
  [/palliative/, MC('palliative-care-nursing', 'Palliative care nurse holding a patient\'s hand')],
  [/perioperative/, MC('perioperative-nursing', 'Perioperative nurse in theatre')],
  [/mental-health/, MC('mental-health-nursing', 'Mental health nurse talking with a patient')],
  [/acute-care/, MC('acute-care-nursing', 'Acute care nurse with a patient')],
  [/ageism|aged-care|gerontolog/, MC('gerontology-nursing', 'Nurse caring for an older patient')],
  [/qilt|ranking/, { src: '/images/landing/gcan/ranked.webp', alt: 'IHM recognised for the quality of its educational experience' }],
  [/graduates|graduation|congratulations/, { src: '/images/alumni/grad-1.webp', alt: 'IHM graduates celebrating at their ceremony' }],
  [/master-of-nursing|masters-in-nursing|masters-of-nursing|online-master/, { src: '/images/landing/mon/nurses.webp', alt: 'Registered nurses advancing their careers' }],
  [/graduate-certificate|advanced-nursing|specialisation|specialty/, { src: '/images/landing/gcan.webp', alt: 'Nurses studying an advanced nursing specialisation' }],
  [/leader|manager|educator|doctor|dentist|upskill/, { src: '/images/home/hero/health-leaders-ihm-uniform.webp', alt: 'Health professionals and leaders' }],
  [/international-student|visa|study-in|western-australia|india/, { src: '/images/international/new-to-australia.webp', alt: 'International student starting study in Australia' }],
]

const NURSING: PostImage[] = [
  { src: '/images/bachelor-of-nursing/hero.webp', alt: 'Nursing students in an Australian clinical learning environment' },
  { src: '/images/landing/bon/nursing-careers.webp', alt: 'Registered nurses at work in an Australian hospital' },
  { src: '/images/landing/bon/nursing-placement.webp', alt: 'Nursing student on clinical placement' },
  { src: '/images/nursing-pathway/hero.webp', alt: 'Nurse planning her next career step' },
  { src: '/images/bachelor-of-nursing/sim.webp', alt: 'Nursing students in a simulation lab' },
  { src: '/images/landing/bon/nursing-hero.webp', alt: 'Nursing students at IHM' },
]

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

export function postImage(post: { title?: string | null; slug?: string | null; path?: string | null; category?: string | null }): PostImage {
  const key = `${post.slug ?? post.path ?? ''} ${(post.title ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  for (const [re, image] of TOPICS) if (re.test(key)) return image
  if (post.category === 'news') return { src: '/images/news-events/default.webp', alt: 'News from the Institute of Health & Management' }
  return NURSING[hash(key) % NURSING.length]
}
