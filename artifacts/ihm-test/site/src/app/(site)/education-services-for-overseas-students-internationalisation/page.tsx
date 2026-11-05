// /education-services-for-overseas-students-internationalisation/ — WordPress page 5510: the ESOS legislative framework.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Landmark, Scale } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { IntlShell } from '@/components/international/parts'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { ESOS } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'Education Services for Overseas Students - Internationalisation',
  path: '/education-services-for-overseas-students-internationalisation/',
  metaTitle: 'ESOS Act and National Code 2018 | Protections for International Students at IHM',
  description: 'How IHM meets the Education Services for Overseas Students (ESOS) Act 2000 and the National Code 2018, who the framework covers, and links to student rights, the Tuition Protection Service and the legislation.',
})

export default function EsosRoute() {
  return (
    <IntlShell
      path="/education-services-for-overseas-students-internationalisation/"
      image={{ src: '/images/international/sydney.webp', alt: 'International students at an IHM campus' }}
      title={<>Education Services for <em className="text-secondary">Overseas Students</em></>}
      intro={ESOS.intro}
      actions={<Link href="/courses/" className={heroBtn(true)}>Find Your Perfect Course<ArrowRight aria-hidden className="size-4" /></Link>}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Lead eyebrow="Legislative Framework" title="The Legislative Framework incorporates the:" />
            <ul className="grid gap-3">{ESOS.framework.map((f) => <li key={f.href}><a href={f.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-card border border-border bg-card p-5 hover:border-primary"><span className="bg-brand-gradient grid size-11 shrink-0 place-items-center rounded-2xl"><Scale aria-hidden className="size-5" /></span><span className="font-semibold">{f.label}</span><ArrowUpRight aria-hidden className="ml-auto size-4 shrink-0" /></a></li>)}</ul>
            <div className="mt-6 space-y-4 text-[15px] text-muted-foreground">{ESOS.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </div>
          <div className="self-start rounded-card bg-ink p-6 text-ink-foreground md:p-8">
            <Landmark aria-hidden className="size-7 text-secondary" />
            <h2 className="display mt-3 text-3xl">More Information</h2>
            <ul className="mt-5 grid gap-2">{ESOS.more.map((m) => <li key={m.href}><a href={m.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl bg-ink-foreground/5 p-4 text-sm font-semibold hover:bg-ink-foreground/10">{m.label}<ArrowUpRight aria-hidden className="size-4 shrink-0" /></a></li>)}</ul>
          </div>
        </div>
      </Section>
    </IntlShell>
  )
}
