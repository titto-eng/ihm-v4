// /disability-accessibility-support/ — WordPress page 5431: accessibility support, learning materials, national disability
// services, and Access, Accessibility and Equity (the old "Student Support – Access, Accessibility and Equity" tabs).
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight, Check, FileText, Mail, Phone } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { Lead, SupportShell, Ticks, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'
import { ACCESSIBILITY as A, SUPPORT_EMAIL } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Accessibility Support',
  path: '/disability-accessibility-support/',
  metaTitle: 'Accessibility and Disability Support at IHM | Reasonable Adjustments, Access and Equity',
  description: 'Accessibility support for IHM students with disability, health or mental health conditions: reasonable adjustments, assistive technology, alternative assessment, documentation requirements and national disability services.',
})

export default function AccessibilityRoute() {
  const photo = legacyImage(A.liaison.photo, '')
  return (
    <SupportShell
      path="/disability-accessibility-support/"
      eyebrow="Student support · Access, Accessibility and Equity"
      title={<>Accessibility <em className="text-secondary">Support</em></>}
      intro="An inclusive educational space where respect, dignity and student rights come first, and everyone has fair access to learning."
      actions={<><a href={`mailto:${SUPPORT_EMAIL}?subject=Accessibility%20support`} className={heroBtn(true)}><Mail aria-hidden className="size-4" />Ask for support</a><a href="#equity" className={heroBtn()}>Access, accessibility and equity</a></>}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="space-y-4 text-[17px] leading-relaxed">{A.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          <div className="overflow-hidden rounded-card border border-border bg-card lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] bg-ink">{photo ? <Image src={photo} alt={A.liaison.name} fill sizes="30vw" className="object-cover object-top" /> : <span className="display bg-brand-gradient grid size-full place-items-center text-6xl">DK</span>}</div>
            <div className="p-6">
              <p className="label-mono text-[10px] text-primary-strong">{A.liaison.role}</p>
              <p className="display mt-1 text-2xl">{A.liaison.name}</p>
              <a href={`mailto:${SUPPORT_EMAIL}?subject=Accessibility%20Liaison%20Officer`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-strong"><Mail aria-hidden className="size-4" />Contact via {SUPPORT_EMAIL}</a>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Lead eyebrow="Learning without barriers" title="Accessibility to Learning and Teaching Materials">{A.materials.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</Lead>
          </div>
          <div className="self-center rounded-card bg-card p-6 md:p-8"><Ticks items={A.measures} /></div>
        </div>
      </Section>
      <Section>
        <Lead eyebrow="Beyond IHM" title="What accessibility support services are available?"><p>If you are seeking accessibility support services, there is a wide range of options available.</p></Lead>
        <ul className="grid gap-5 md:grid-cols-2">
          {A.services.map((s) => (
            <li key={s.name} className="flex flex-col rounded-card border border-border bg-card p-6">
              <h3 className="display text-2xl">{s.name}</h3>
              <p className="mt-2 flex-1 text-[15px] text-muted-foreground">{s.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.links.map((l) => <li key={l.href}><a href={l.href} {...(l.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-semibold hover:bg-blush hover:text-primary-strong">{l.href.startsWith('tel:') ? <Phone aria-hidden className="size-4" /> : <ArrowUpRight aria-hidden className="size-4" />}{l.label}</a></li>)}
              </ul>
            </li>
          ))}
        </ul>
      </Section>
      <section data-tone="ink" id="equity" className="bg-ink-glow scroll-mt-24 text-ink-foreground">
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div><Eyebrow onDark>Fair and equitable</Eyebrow><h2 className="display text-display-md">Student Support – Access, Accessibility and Equity</h2><p className="mt-4 text-lg text-ink-foreground/80">{A.equityIntro}</p></div>
            <Ticks items={A.equityAims} onDark />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {A.panels.map((p) => (
              <div key={p.id} id={p.id} className="scroll-mt-28 rounded-card bg-card p-6 text-foreground md:p-7">
                <h3 className="display text-2xl">{p.title}</h3>
                {'intro' in p && p.intro && <p className="mt-2 text-[15px] text-muted-foreground">{p.intro}</p>}
                <ul className="mt-4 grid gap-2 text-[15px]">{p.items.map((t) => <li key={t} className="flex gap-2"><Check aria-hidden className="mt-1 size-4 shrink-0 text-primary-strong" />{t}</li>)}</ul>
                {'docsAge' in p && p.docsAge && p.docsMust && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-sand/70 p-4 text-sm"><p className="mb-2 font-semibold">Documentation must be dated and signed by the appropriate health or disability professional, and should be:</p><ul className="grid gap-1">{p.docsAge.map((t) => <li key={t}>• {t}</li>)}</ul></div>
                    <div className="rounded-2xl bg-sand/70 p-4 text-sm"><p className="mb-2 font-semibold">The documentation provided should be specific and:</p><ul className="grid gap-1">{p.docsMust.map((t) => <li key={t}>• {t}</li>)}</ul></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-6 rounded-card bg-ink-foreground/5 p-6 md:flex-row md:items-center md:justify-between">
            <p>For more information please email <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-secondary underline">{SUPPORT_EMAIL}</a>.</p>
            <ul className="flex flex-wrap gap-2">{A.docs.map((d) => <li key={d.href}><a href={d.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"><FileText aria-hidden className="size-4" />{d.label}</a></li>)}</ul>
          </div>
        </div>
      </section>
    </SupportShell>
  )
}
