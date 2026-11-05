// /career-growth/ — WordPress page 5052: employment outlook, demand/supply projections, pay and career paths for registered
// nurses, then six social work career paths. Copy in src/content/study.ts (CAREER_*); graphs in public/images/study/
// (the state shares and the pay curve are drawn as data tiles).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { SupportShell, Lead, heroBtn } from '@/components/student-support/parts'
import { KitChapters, ChapterBody } from '@/components/admissions/parts'
import { CAREER_NURSING, CAREER_SOCIAL_WORK, CAREER_SOCIAL_WORK_TITLE } from '@/content/study'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'Career Growth',
  path: '/career-growth/',
  metaTitle: 'Career Growth for Registered Nurses and Social Workers | IHM',
  description: 'Employment outlook, workforce demand, pay by experience and popular career paths for registered nurses in Australia, plus six social work career paths for BSW and MSW graduates.',
})

const NAV = [
  { href: '#growing-employment-and-further-education-outcomes-for-registered-nurses', label: 'Registered nurses' },
  { href: '#payscale-for-registered-nurses-industry-average', label: 'Pay' },
  { href: '#occupational-titles-and-popular-career-paths-rn-s-for-registered-nurse', label: 'Career paths' },
  { href: '#social-work', label: 'Social work' },
]

export default function CareerGrowthRoute() {
  const sw = [legacyImage('/images/study/social-work-graph-1.webp', ''), legacyImage('/images/study/social-work-graph-2.webp', '')].filter(Boolean)
  return (
    <SupportShell
      path=""
      eyebrow="Careers"
      title={<>Career <em className="text-secondary">growth</em></>}
      intro="Where an IHM qualification can take you: the employment outlook, pay and popular career paths for registered nurses, and the many directions a social work degree opens up."
      image={{ src: '/images/study/career-growth.webp', alt: 'A nurse reviewing career options' }}
      actions={<Link href="/courses/" className={heroBtn(true)}>Find your course<ArrowRight aria-hidden className="size-4" /></Link>}
      nav={NAV}
      navLabel="On this page"
    >
      <KitChapters blocks={CAREER_NURSING} />
      <Section tone="ink" anchorId="social-work" className="bg-ink-glow">
        <Lead onDark eyebrow="Social work" title={CAREER_SOCIAL_WORK_TITLE} />
      </Section>
      <Section>
        <div className="mx-auto max-w-4xl"><ChapterBody blocks={CAREER_SOCIAL_WORK} /></div>
        {sw.length > 0 && <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">{sw.map((src, i) => <Image key={src} src={src} alt={`Social work careers graph ${i + 1}`} width={1200} height={800} className="h-auto w-full rounded-card border border-border" />)}</div>}
      </Section>
    </SupportShell>
  )
}
