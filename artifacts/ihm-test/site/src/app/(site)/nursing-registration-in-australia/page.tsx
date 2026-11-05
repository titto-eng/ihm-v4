// /nursing-registration-in-australia/ — WordPress page 3180: AHPRA registration for overseas nurses (documents, the Decision
// letter, bridging programs) and the registration process flow chart, rebuilt as steps.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, FileCheck, Stethoscope } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { IntlShell } from '@/components/international/parts'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { AHPRA as A } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'Nursing Registration in Australia',
  path: '/nursing-registration-in-australia/',
  metaTitle: 'Nursing Registration in Australia | AHPRA Pathway for International Nurses | IHM',
  description: 'How overseas nurses register with AHPRA and the NMBA: the documents for a Decision/Eligibility letter, direct registration or a bridging program/OBA, NCLEX-RN and OSCE, and the path to work and permanent residency.',
})

const Pill = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <li className={`rounded-2xl px-4 py-3 text-center text-sm font-semibold ${dark ? 'bg-ink text-ink-foreground' : 'border border-border bg-card'}`}>{children}</li>

export default function NursingRegistrationRoute() {
  const steps = [A.flow.start, ...A.flow.oba, ...A.flow.after]
  return (
    <IntlShell
      path="/nursing-registration-in-australia/"
      eyebrow="International nurses · AHPRA"
      title={<>Nursing Registration <em className="text-secondary">in Australia</em></>}
      intro={A.intro[0]}
      actions={<><Link href="/courses/graduate-certificate-in-advanced-nursing-australian-nursing-practice/" className={heroBtn(true)}>Registered Nurse Bridging Program<ArrowRight aria-hidden className="size-4" /></Link><Link href="/courses/" className={heroBtn()}>Find Your Perfect Course</Link></>}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: 'AHPRA Nursing Council Registration Process', step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s })) }} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Lead eyebrow="AHPRA – Australian Health Practitioner Regulation Agency" title="How registration works"><p>{A.intro[1]}</p></Lead>
            <div className="rounded-card border border-border bg-card p-6"><h3 className="flex items-center gap-2 font-semibold"><FileCheck aria-hidden className="size-5 text-primary-strong" />Documents Required to gain Decision/ Eligibility Letter</h3><ul className="mt-4 grid gap-2 sm:grid-cols-2">{A.documents.map((d) => <li key={d} className="rounded-xl bg-muted/60 px-3 py-2 text-sm">{d}</li>)}</ul><a href={A.documentsHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">View details (NMBA supporting documentation)<ArrowUpRight aria-hidden className="size-4" /></a></div>
          </div>
          <div>
            <div className="rounded-card bg-ink p-6 text-ink-foreground md:p-8"><Stethoscope aria-hidden className="size-7 text-secondary" /><h2 className="display mt-3 text-3xl">Applying to Nursing Council</h2><div className="mt-3 space-y-3 text-ink-foreground/80">{A.applying.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div><p className="mt-5 font-semibold">Following are the guidance and services we offer to all our candidates:</p><div className="mt-3"><Ticks items={A.services} onDark /></div></div>
          </div>
        </div>
      </Section>
      <Section tone="muted" anchorId="registration-process">
        <Lead eyebrow="AHPRA Nursing Council" title="Registration Process" />
        <div className="mx-auto max-w-3xl">
          <ol className="grid gap-2"><Pill dark>{A.flow.start}</Pill></ol>
          <div className="my-3 flex justify-center"><ArrowDown aria-hidden className="size-5 text-primary-strong" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><p className="label-mono mb-2 text-center text-[10px] text-muted-foreground">Bridging route</p><ol className="grid gap-2">{A.flow.oba.map((s) => <Pill key={s}>{s}</Pill>)}</ol></div>
            <div><p className="label-mono mb-2 text-center text-[10px] text-muted-foreground">Direct route</p><ol className="grid gap-2"><Pill>{A.flow.direct}</Pill></ol></div>
          </div>
          <div className="my-3 flex justify-center"><ArrowDown aria-hidden className="size-5 text-primary-strong" /></div>
          <ol className="grid gap-2">{A.flow.after.map((s, i) => <Pill key={s} dark={i === A.flow.after.length - 1}>{s}</Pill>)}</ol>
        </div>
        <details className="mx-auto mt-8 max-w-3xl rounded-card border border-border bg-card"><summary className="cursor-pointer p-4 text-sm font-semibold">View the original flow chart</summary><div className="p-4 pt-0"><Image src="/images/international/ahpra-flow-chart.webp" alt="AHPRA Nursing Council Registration Process flow chart" width={1600} height={1921} className="mx-auto h-auto w-full max-w-md" /></div></details>
      </Section>
    </IntlShell>
  )
}
