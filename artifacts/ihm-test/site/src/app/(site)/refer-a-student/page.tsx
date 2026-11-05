// /refer-a-student/ — WordPress page 3640: the two student referral programs (BIRDS for people outside the HCI family, WOMP for
// people inside it) and the enquiry form. Logos are live-only images (src/content/legacy-assets.ts).
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight, Users, UserPlus } from 'lucide-react'
import { pageMetadata, EnquiryForm } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AdmissionsShell } from '@/components/admissions/parts'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'Refer a Student',
  path: '/refer-a-student/',
  metaTitle: 'Refer a Student to IHM | BIRDS and WOMP Referral Programs',
  description: 'Support a future student by referring them to IHNA or IHM: BIRDS for people outside the HCI family and WOMP for members of the HCI family.',
})

const PROGRAMS = [
  { name: 'BIRDS', who: 'Not part of the HCI family', text: 'This student referral program is for those who are not existing member of HCI family and would like to support the student by referring them to (IHNA/IHM).', href: 'https://birds.mwtglobal.com.au/login', logo: legacyImage('/images/admissions/birds-logo.webp', ''), Icon: UserPlus },
  { name: 'WOMP', who: 'Part of the HCI family', text: 'This student referral program is for those who are part of HCI family and would like to support the student by referring them to (IHNA/IHM).', href: 'https://womp.hci.edu.au/login', logo: legacyImage('/images/admissions/womp-logo.webp', ''), Icon: Users },
]

export default function ReferAStudentRoute() {
  return (
    <AdmissionsShell
      path="/refer-a-student/"
      title={<>Refer a <em className="text-secondary">student</em></>}
      intro="Know someone who would thrive at IHNA or IHM? Choose the referral program that fits you and refer them today."
      image={{ src: '/images/alumni/referral.webp', alt: 'IHM students together on campus' }}
      actions={<a href="#programs" className={heroBtn(true)}>Choose a program</a>}
    >
      <Section anchorId="programs">
        <Lead eyebrow="Referral programs" title="Two ways to refer" />
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <article key={p.name} className="group flex flex-col rounded-card border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-20 items-center">
                {p.logo ? <Image src={p.logo} alt={`${p.name} logo`} width={200} height={80} className="h-16 w-auto object-contain" /> : <span className="bg-brand-gradient grid size-16 place-items-center rounded-2xl text-foreground"><p.Icon aria-hidden className="size-7" /></span>}
              </div>
              <p className="label-mono mt-6 text-xs text-muted-foreground">{p.who}</p>
              <h2 className="display mt-1 text-3xl">{p.name}</h2>
              <p className="mt-3 text-muted-foreground">{p.text}</p>
              <div className="mt-auto pt-8"><a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground transition-colors hover:bg-primary hover:text-foreground">Refer now<ArrowUpRight aria-hidden className="size-4" /></a></div>
            </article>
          ))}
        </div>
      </Section>
      <EnquiryForm formKey="quick-enquiry" heading="Refer a Student" variant="card" anchorId="quickContact" tone="muted" />
    </AdmissionsShell>
  )
}
