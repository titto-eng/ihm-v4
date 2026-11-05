// /career-with-us/ — WordPress page 13: working at IHM. Open positions are listed on /career/ (the ELMO careers portal).
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, Sparkles, TrendingUp } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { heroBtn } from '@/components/student-support/parts'
import { CAREER_WITH_US as C } from '@/content/about'

export const metadata: Metadata = pageMetadata({
  title: 'Career With Us',
  path: '/career-with-us/',
  metaTitle: 'Careers at IHM | Work With Us',
  description: 'At IHM we are always looking for passionate, talented professionals who want to make a difference in healthcare education. See our open positions.',
})

const WHY = [[Sparkles, 'Make a difference', 'Shape the next generation of healthcare professionals.'], [TrendingUp, 'Grow your career', 'Every opportunity to grow and be recognised.'], [Briefcase, 'Talent first', 'Our people are our most important asset.']] as const

export default function CareerWithUsRoute() {
  return (
    <AboutShell path="" eyebrow="Careers" title={<>Let&apos;s work together to build a <em className="text-secondary">better world</em></>} intro={C.body}
      image={{ src: '/images/about/career.webp', alt: 'IHM team members collaborating' }}
      actions={<Link href="/career/" className={heroBtn(true)}>See our open positions<ArrowRight aria-hidden className="size-4" /></Link>}>
      <Section>
        <ul className="grid gap-4 md:grid-cols-3">{WHY.map(([Icon, t, d]) => <li key={t} className="rounded-card border border-border bg-card p-6"><Icon aria-hidden className="size-7 text-primary-strong" /><h2 className="display mt-4 text-2xl">{t}</h2><p className="mt-2 text-muted-foreground">{d}</p></li>)}</ul>
        <div className="mt-10 flex flex-col gap-4 rounded-card bg-ink p-6 text-ink-foreground md:flex-row md:items-center md:justify-between md:p-8">
          <div><p className="display text-2xl">{C.openTitle}</p><p className="mt-1 text-ink-foreground/75">{C.open}</p></div>
          <Link href="/career/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">View current openings<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
      </Section>
    </AboutShell>
  )
}
