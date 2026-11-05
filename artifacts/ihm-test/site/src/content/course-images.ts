// Hero photo for a course page when the course has no `heroImage` in the CMS (none do since the import). First matching rule
// wins; the specialisation courses use their micro-credential photo. Paths are under public/.
export type CourseImage = { src: string; alt: string }

const SPECIALISATIONS: [RegExp, string, string][] = [
  [/acute-care/, 'acute-care-nursing', 'Acute care nurse'],
  [/critical-care/, 'critical-care-nursing', 'Critical care nurse at a bedside'],
  [/diabetes/, 'diabetes-nursing', 'Diabetes nurse with a patient'],
  [/emergency/, 'emergency-nursing', 'Emergency nurse at work'],
  [/gerontology/, 'gerontology-nursing', 'Nurse caring for an older patient'],
  [/mental-health/, 'mental-health-nursing', 'Mental health nurse talking with a patient'],
  [/neonatal/, 'neonatal-nursing', 'Neonatal nurse with a newborn'],
  [/orthopaedic/, 'orthopaedic-nursing', 'Orthopaedic nurse with a patient'],
  [/paediatric/, 'paediatric-nursing', 'Paediatric nurse with a child'],
  [/palliative/, 'palliative-care-nursing', 'Palliative care nurse holding a patient\'s hand'],
  [/perioperative/, 'perioperative-nursing', 'Perioperative nurse in theatre'],
  [/renal/, 'renal-nursing', 'Renal nurse with a patient'],
]

const RULES: [RegExp, CourseImage][] = [
  [/australian-nursing-practice-to-master/, { src: '/images/landing/gcan-anp.webp', alt: 'Internationally qualified nurses in a clinical skills lab' }],
  [/^master-of-nursing-online/, { src: '/images/landing/mon.webp', alt: 'Registered nurse studying online' }],
  [/^master-of-nursing/, { src: '/images/landing/mon/nurses.webp', alt: 'Three smiling nurses in navy scrubs' }],
  [/^diploma-of-community-service/, { src: '/images/landing/bsw/counselling.webp', alt: 'Social worker in conversation with a client' }],
  [/social-work/, { src: '/images/landing/bsw/group.webp', alt: 'Social work students discussing a case around a table' }],
  [/^nclex/, { src: '/images/landing/exam/nclex-rns.webp', alt: 'Smiling nurse in blue scrubs with a stethoscope' }],
  [/^osce/, { src: '/images/landing/osce.webp', alt: 'Nurses practising clinical skills in a simulation lab' }],
]

const DEFAULT: CourseImage = { src: '/images/landing/bon/nursing-hero.webp', alt: 'Nursing students in an Australian clinical learning environment' }

export function courseImage(slug: string): CourseImage {
  for (const [re, file, alt] of SPECIALISATIONS) if (re.test(slug)) return { src: `/images/micro-credentials/${file}.webp`, alt }
  for (const [re, image] of RULES) if (re.test(slug)) return image
  return DEFAULT
}
