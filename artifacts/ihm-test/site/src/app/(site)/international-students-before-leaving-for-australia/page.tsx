// /international-students-before-leaving-for-australia/ — WordPress page 1378: the five steps before you fly.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BedDouble, Building, FileCheck2, Plane, Syringe } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { IntlShell } from '@/components/international/parts'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { BEFORE_LEAVING as B, ENQUIRY_EMAIL, ENQUIRY_PHONE } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'International students before leaving for Australia',
  path: '/international-students-before-leaving-for-australia/',
  metaTitle: 'Before You Leave for Australia | Checklist for IHM International Students',
  description: 'Five steps before you fly to study at IHM: confirm your CoE and subclass 500 visa, translate your immunisation certificate, find accommodation and temporary housing, and book an airport pickup.',
})

const ICONS = [FileCheck2, Syringe, Building, BedDouble, Plane]

export default function BeforeLeavingRoute() {
  return (
    <IntlShell
      path="/international-students-before-leaving-for-australia/"
      image={{ src: '/images/international/new-to-australia.webp', alt: 'An international student arriving in Australia' }}
      title={<>Before leaving for <em className="text-secondary">Australia</em></>}
      intro={B.intro[0]}
      actions={<><a href={`tel:+611800763757`} className={heroBtn(true)}>Call {ENQUIRY_PHONE}</a><a href={`mailto:${ENQUIRY_EMAIL}`} className={heroBtn()}>{ENQUIRY_EMAIL}</a><Link href="/courses/" className={heroBtn()}>Find Your Perfect Course</Link></>}
    >
      <Section>
        <Lead eyebrow="We will be by your side" title="Your pre-departure checklist">{B.intro.slice(1).map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</Lead>
        <ol className="relative grid gap-5 before:absolute before:top-6 before:bottom-6 before:left-6 before:w-0.5 before:bg-primary/25 md:before:hidden md:grid-cols-5">
          {B.steps.map((s, i) => { const Icon = ICONS[i]; return (
            <li key={s.title} className="relative pl-16 md:pl-0">
              <span className="bg-brand-gradient absolute top-0 left-0 grid size-12 place-items-center rounded-full text-foreground ring-4 ring-background md:relative md:mb-4"><Icon aria-hidden className="size-5" /></span>
              <div className="rounded-card border border-border bg-card p-5 md:min-h-56"><p className="label-mono text-[10px] text-muted-foreground">Step {i + 1}</p><h2 className="display mt-1 text-xl">{s.title}</h2><div className="mt-2 space-y-2 text-sm text-muted-foreground">{s.body.map((b) => <p key={b.slice(0, 30)}>{b}</p>)}</div></div>
            </li>
          ) })}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/new-to-australia/" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">New to Australia guide<ArrowRight aria-hidden className="size-4" /></Link>
          <Link href="/external-services/#accommodation" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">Student accommodation options<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
      </Section>
    </IntlShell>
  )
}
