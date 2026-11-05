// /ihm-privacy-policy/ — IHM Privacy Policy (IHM-AEP1-4.0): chapters with a sticky contents list, then the associated information
// and change history tables. Copy in src/content/legal.ts (PRIVACY_POLICY).
import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { KitTable } from '@/components/page-kit/Kit'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LegalShell, PolicyDoc } from '@/components/legal/parts'
import { PRIVACY_POLICY as P } from '@/content/legal'

export const metadata: Metadata = pageMetadata({
  title: 'IHM Privacy Policy',
  path: '/ihm-privacy-policy/',
  metaTitle: 'Privacy Policy | Institute of Health & Management',
  description: 'How IHM complies with the Privacy Act 1988 and the Australian Privacy Principles: collecting, using, storing, accessing and correcting personal information of students and staff.',
})

export default function IhmPrivacyPolicyRoute() {
  const date = (label: string) => P.meta.find((r) => r[0] === label)?.[1]
  return (
    <LegalShell path="/ihm-privacy-policy/" eyebrow={`Policy · ${P.code}`} title={P.title}
      intro="How IHM complies with the Privacy Act 1988 and the Australian Privacy Principles."
      actions={<ul className="flex flex-wrap gap-2 text-sm">{['Date of Effect', 'Date of Next Review'].map((l) => <li key={l} className="rounded-full bg-ink-foreground/10 px-4 py-2"><span className="text-ink-foreground/70">{l}:</span> <span className="font-semibold">{date(l)}</span></li>)}</ul>}>
      <PolicyDoc chapters={P.chapters} after={
        <>
          <section id="associated-information" className="scroll-mt-28">
            <Eyebrow>Section 3</Eyebrow>
            <h2 className="display text-3xl">Associated information</h2>
            <div className="mt-5"><KitTable rows={P.meta} /></div>
          </section>
          <section id="change-history" className="scroll-mt-28">
            <h2 className="display text-3xl">Change history</h2>
            <div className="mt-5"><KitTable rows={[['Version', 'Date', 'Change summary'], ...P.history]} /></div>
          </section>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><FileText aria-hidden className="size-4" />All IHM policies and procedures: <Link href="/policies-procedures/" className="font-semibold text-primary-strong hover:underline">Policies &amp; procedures</Link></p>
        </>
      } />
    </LegalShell>
  )
}
