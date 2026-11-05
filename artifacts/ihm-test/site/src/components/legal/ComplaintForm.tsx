import Link from 'next/link'
import { ArrowRight, Clock, FileText, LifeBuoy } from 'lucide-react'
import { IframeEmbed } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { LegalShell } from '@/components/legal/parts'
import { SUPPORT_EMAIL } from '@/content/student-support'

/** The two Spot-nik Superform forms (allowed embed host, src/content/site.ts). They post to Spot-nik; nothing is stored here. */
export const COMPLAINT_FORMS = {
  complaint: { path: '/ihm-student-complaints/', title: 'IHM Student Complaints', heading: 'Lodge a complaint', src: 'https://superform.spot-nik.com/form/654d8de1b317c512e0fe1286', frameTitle: 'IHM Student Complaints' },
  appeal: { path: '/ihm-student-appeals/', title: 'IHM Student Appeals', heading: 'Lodge an appeal', src: 'https://superform.spot-nik.com/form/6539eb7ffe986ee3082419a8', frameTitle: 'IHM Student Appeal' },
} as const

export function ComplaintForm({ kind }: { kind: keyof typeof COMPLAINT_FORMS }) {
  const f = COMPLAINT_FORMS[kind]
  const other = COMPLAINT_FORMS[kind === 'complaint' ? 'appeal' : 'complaint']
  return (
    <LegalShell path={f.path} eyebrow="Students" title={f.title}
      intro={kind === 'complaint' ? 'Lodge a student complaint online using the form below.' : 'Lodge a student appeal online using the form below.'}
      actions={<a href="#form" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">{f.heading}<ArrowRight aria-hidden className="size-4" /></a>}>
      <Section spacing="compact">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <li className="flex gap-4 rounded-card border border-border bg-card p-5"><FileText aria-hidden className="size-6 shrink-0 text-primary-strong" /><span className="text-[15px]">Read how it works first: <Link href="/complaints-and-appeals/" className="font-semibold text-primary-strong hover:underline">Complaints and appeals</Link></span></li>
          <li className="flex gap-4 rounded-card border border-border bg-card p-5"><Clock aria-hidden className="size-6 shrink-0 text-primary-strong" /><span className="text-[15px]">The form loads below, on this page.</span></li>
          <li className="flex gap-4 rounded-card border border-border bg-card p-5"><LifeBuoy aria-hidden className="size-6 shrink-0 text-primary-strong" /><span className="text-[15px]">Need help? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary-strong hover:underline">{SUPPORT_EMAIL}</a>, or <Link href={other.path} className="font-semibold text-primary-strong hover:underline">{other.heading.toLowerCase()}</Link> instead.</span></li>
        </ul>
      </Section>
      <IframeEmbed url={f.src} title={f.frameTitle} height={2000} spacing="compact" anchorId="form" />
    </LegalShell>
  )
}
