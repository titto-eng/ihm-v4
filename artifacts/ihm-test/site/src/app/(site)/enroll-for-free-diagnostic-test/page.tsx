// /enroll-for-free-diagnostic-test/ — WordPress page: the monday.com registration form for the free diagnostic test, embedded
// (forms.monday.com is in site.allowedEmbedHosts).
import type { Metadata } from 'next'
import { ClipboardCheck, Gauge, Sparkles } from 'lucide-react'
import { pageMetadata, IframeEmbed } from '@/components/page'
import { FormSplit } from '@/components/admissions/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Enroll For Free Diagnostic Test',
  path: '/enroll-for-free-diagnostic-test/',
  metaTitle: 'Enrol for a Free Diagnostic Test | IHM',
  description: 'Register for a free IHM diagnostic test to see where you stand before you start your preparation or course.',
})

const POINTS = [
  { Icon: ClipboardCheck, t: 'Register in a couple of minutes' },
  { Icon: Gauge, t: 'Find out where you stand' },
  { Icon: Sparkles, t: 'It’s free' },
]

export default function EnrollForFreeDiagnosticTestRoute() {
  return (
    <FormSplit
      eyebrow="Free diagnostic test"
      title={<>Enrol for a <em className="text-secondary">free diagnostic test</em></>}
      intro={<p>Fill in the form to register. Our team will be in touch with the details of your test.</p>}
      aside={<ul className="grid gap-3">{POINTS.map(({ Icon, t }) => <li key={t} className="flex items-center gap-4 rounded-2xl bg-ink-foreground/5 p-4"><span className="bg-brand-gradient grid size-10 shrink-0 place-items-center rounded-full text-foreground"><Icon aria-hidden className="size-5" /></span><span className="font-semibold">{t}</span></li>)}</ul>}
    >
      <IframeEmbed url="https://forms.monday.com/forms/embed/b2b587eab3be4d86035c1457925295e9?r=use1" title="Free diagnostic test registration form" height={720} depth={1} />
    </FormSplit>
  )
}
