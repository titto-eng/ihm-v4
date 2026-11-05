// /unique-student-identifier/ — WordPress page 5205: what the USI is, how to create it (onshore and offshore cases), who needs
// it, when to provide it and what happens if you don't. The old "Share your USI" / "Submit your query" buttons were empty
// links; they now email Student Support and the enquiry mailbox.
import type { Metadata } from 'next'
import { AlertTriangle, ArrowUpRight, IdCard, Mail, Phone, PlaneLanding, Search } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { IntlShell } from '@/components/international/parts'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'
import { ENQUIRY_EMAIL, USI as U } from '@/content/international'
import { SUPPORT_EMAIL } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Unique Student Identifier',
  path: '/unique-student-identifier/',
  metaTitle: 'Unique Student Identifier (USI) | How to Create and Share Your USI with IHM',
  description: 'What the USI is, the ID you need to create one, how to share it with IHM, what offshore students and permanent residents must do, who needs a USI and what happens if you do not provide it.',
})

export default function UsiRoute() {
  const img = legacyImage('/images/international/usi.webp', '')
  const share = `mailto:${SUPPORT_EMAIL}?subject=My%20USI`
  return (
    <IntlShell
      path="/unique-student-identifier/"
      eyebrow="Students · USI"
      title={<>What is the <em className="text-secondary">USI?</em></>}
      intro={U.what[0]}
      image={img ? { src: img, alt: 'Unique Student Identifier' } : undefined}
      actions={<><a href={U.createHref} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Create your USI<ArrowUpRight aria-hidden className="size-4" /></a><a href={share} className={heroBtn()}>Share your USI with IHM</a></>}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: 'Create your USI and share it with IHM', step: [{ '@type': 'HowToStep', position: 1, name: 'Create your USI', text: 'Create your USI on the Australian Government USI website with at least one valid form of identification.', url: U.createHref }, { '@type': 'HowToStep', position: 2, name: 'Share your USI details with IHM', text: 'Provide your USI to the IHM Student Support Office so it is recorded on your student account.' }] }} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 text-[17px] leading-relaxed"><Eyebrow>Your educational identity</Eyebrow><p>{U.what[1]}</p><a href={U.aboutHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">See the USI website<ArrowUpRight aria-hidden className="size-4" /></a></div>
          <div className="rounded-card bg-ink p-6 text-ink-foreground"><p className="label-mono text-[10px] text-secondary">If you are in Australia, or are an Australian citizen</p><h2 className="display mt-2 text-3xl">How can you create your USI?</h2>
            <ol className="mt-5 grid gap-3">
              <li className="rounded-2xl bg-ink-foreground/5 p-4"><p className="font-semibold">Step 1: Create your USI</p><p className="mt-1 text-sm text-ink-foreground/80">You can create your USI on the Australian Government website. You will need at least one valid form of identification.</p></li>
              <li className="rounded-2xl bg-ink-foreground/5 p-4"><p className="font-semibold">Step 2: Share your USI details with the education provider</p><p className="mt-1 text-sm text-ink-foreground/80">Once you have your USI, you need to share it with IHM so it’s recorded on your student account. Provide it to your Student Support Office.</p><a href={share} className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-foreground"><Mail aria-hidden className="size-4" />Share your USI with IHM</a></li>
            </ol>
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-card border border-border bg-card p-6"><h3 className="flex items-center gap-2 font-semibold"><IdCard aria-hidden className="size-5 text-primary-strong" />Acceptable forms of identification</h3><ul className="mt-4 grid gap-2 sm:grid-cols-2">{U.ids.map((i) => <li key={i} className="rounded-xl bg-muted/60 px-3 py-2 text-sm">{i}</li>)}</ul><p className="mt-4 rounded-xl bg-blush p-3 text-sm"><strong>Important:</strong> The personal details you enter must match those shown on your identification. <a href={U.idsHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-strong underline">Know more</a></p></div>
          <div className="rounded-card bg-sand/60 p-6"><h3 className="font-semibold">Note</h3><div className="mt-3"><Ticks items={U.notes} /></div>
            <div className="mt-5 flex flex-wrap gap-2"><a href={U.updateHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-sm font-semibold">Update personal details<ArrowUpRight aria-hidden className="size-4" /></a><a href={U.findHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-sm font-semibold"><Search aria-hidden className="size-4" />Find your USI</a></div>
            <p className="mt-4 text-sm">If you are unable to find your USI, call the USI team on <a href={`tel:${U.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1 font-semibold text-primary-strong"><Phone aria-hidden className="size-4" />{U.phone}</a> {U.phoneHours}.</p>
          </div>
        </div>
      </Section>
      <Section tone="muted" anchorId="offshore">
        <Lead eyebrow="Outside Australia and not a citizen?" title="If you are outside Australia, here’s what you must do" />
        <ol className="grid gap-5 md:grid-cols-2">
          {U.offshore.map((o, i) => (
            <li key={o.title} className="rounded-card bg-card p-6">
              <span className="bg-brand-gradient grid size-10 place-items-center rounded-full font-bold">{i + 1}</span>
              <h3 className="display mt-3 text-xl">{o.title}</h3>
              <div className="mt-2 space-y-2 text-sm text-muted-foreground">{o.body.map((b) => <p key={b.slice(0, 30)}>{b}</p>)}</div>
              {'list' in o && o.list && <div className="mt-3"><Ticks items={o.list} /></div>}
              {'after' in o && o.after && <p className="mt-3 text-sm">{o.after}</p>}
              {'href' in o && o.href && <a href={o.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">{o.hrefLabel}<ArrowUpRight aria-hidden className="size-4" /></a>}
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-card border border-border bg-card p-6"><PlaneLanding aria-hidden className="size-6 text-primary-strong" /><h2 className="display mt-3 text-2xl">Who Needs a USI?</h2><div className="mt-3 space-y-2 text-sm text-muted-foreground">{U.who.map((w) => <p key={w.slice(0, 30)}>{w}</p>)}</div><p className="mt-3 text-xs">{U.whoNote}</p></div>
          <div className="rounded-card border border-border bg-card p-6"><IdCard aria-hidden className="size-6 text-primary-strong" /><h2 className="display mt-3 text-2xl">When Should I Provide My USI?</h2><div className="mt-3 space-y-2 text-sm text-muted-foreground">{U.when.map((w) => <p key={w.slice(0, 30)}>{w}</p>)}</div></div>
          <div className="rounded-card bg-ink p-6 text-ink-foreground"><AlertTriangle aria-hidden className="size-6 text-secondary" /><h2 className="display mt-3 text-2xl">What Will Happen if I Don’t Provide My USI?</h2><p className="mt-3 text-sm text-ink-foreground/80">{U.missingIntro}</p><dl className="mt-3 grid gap-2">{U.missing.map(([k, v]) => <div key={k} className="rounded-xl bg-ink-foreground/5 p-3 text-sm"><dt className="font-semibold text-secondary">{k}</dt><dd>{v}</dd></div>)}</dl></div>
        </div>
        <div className="mt-10 flex flex-col gap-4 rounded-card bg-sunrise-glow p-6 md:flex-row md:items-center md:justify-between"><div><h2 className="display text-2xl">Have More Doubts?</h2><p>We’re here to clear any doubts you may have.</p></div><a href={`mailto:${ENQUIRY_EMAIL}?subject=USI%20query`} className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3 font-semibold text-ink-foreground"><Mail aria-hidden className="size-4" />Submit your query</a></div>
      </Section>
    </IntlShell>
  )
}
