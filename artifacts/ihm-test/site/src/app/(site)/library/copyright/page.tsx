// /library/copyright/ — WordPress page 383: IHM copyright guidance (the Copyright Act 1968, moral rights, fair dealing, ...).
import type { Metadata } from 'next'
import { ArrowUpRight, Scale } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'
import { COPYRIGHT } from '@/content/library'

export const metadata: Metadata = pageMetadata({
  title: 'Copyright',
  path: '/library/copyright/',
  metaTitle: 'Copyright at IHM | Fair Dealing, Moral Rights and the Copyright Act 1968',
  description: 'How IHM students and staff comply with the Copyright Act 1968: first and third party materials, moral rights, fair dealing limits, online course materials and useful copyright websites.',
})

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function CopyrightRoute() {
  return (
    <LibraryShell path="/library/copyright/" image="/images/library/copyright.webp" eyebrow="Library · Copyright" title="Copyright" intro="Use copyrighted materials legally and confidently in your study, teaching and research.">
      <Section>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="label-mono mb-3 text-[10px] text-muted-foreground">On this page</p>
            <ul className="grid gap-1 border-l border-border text-sm">
              {['Overview', 'Definitions', ...COPYRIGHT.sections.map((s) => s.title), 'Relevant websites'].map((t) => <li key={t}><a href={`#${slug(t)}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 hover:border-primary hover:text-primary-strong">{t}</a></li>)}
            </ul>
          </nav>
          <div className="min-w-0 max-w-3xl space-y-12 text-[17px] leading-relaxed">
            <div id="overview" className="scroll-mt-28 space-y-4">
              <Eyebrow>Overview</Eyebrow>
              {COPYRIGHT.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            </div>
            <div id="definitions" className="scroll-mt-28">
              <h2 className="display text-3xl">Definitions</h2>
              <dl className="mt-5 grid gap-3">
                {COPYRIGHT.definitions.map((d) => <div key={d.term} className="rounded-2xl border border-border bg-card p-5"><dt className="flex items-center gap-2 font-semibold"><Scale aria-hidden className="size-4 text-primary-strong" />{d.term}</dt><dd className="mt-1 text-[15px] text-muted-foreground">{d.body}</dd></div>)}
              </dl>
            </div>
            {COPYRIGHT.sections.map((s) => (
              <div key={s.title} id={slug(s.title)} className="scroll-mt-28 space-y-3">
                <h2 className="display text-3xl">{s.title}</h2>
                {s.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
              </div>
            ))}
            <div id="relevant-websites" className="scroll-mt-28">
              <h2 className="display text-3xl">Relevant websites</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {COPYRIGHT.websites.map((w) => <li key={w.href}><a href={w.href} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary"><span><span className="block font-semibold">{w.label}</span><span className="text-sm text-primary-strong">{w.text}</span></span><ArrowUpRight aria-hidden className="size-4 shrink-0" /></a></li>)}
              </ul>
              <p className="mt-6 rounded-2xl bg-sand/70 p-5 text-[15px]">{COPYRIGHT.closing}</p>
            </div>
          </div>
        </div>
      </Section>
    </LibraryShell>
  )
}
