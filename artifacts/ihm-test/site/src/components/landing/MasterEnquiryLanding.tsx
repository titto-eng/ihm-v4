import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, BookOpenCheck, CalendarDays, GraduationCap, Info, Languages, Stethoscope, Trophy } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { FORM_END_ANCHOR, nestedCtx } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { cn } from '@/lib/cn'
import { MASTER_ENQUIRY as M, MON_VARIANTS } from '@/content/landing-mon'

const cta = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold'
const ADMISSION_ICONS = [GraduationCap, Stethoscope, Languages]

function Offer({ o }: { o: { value: string; strong: string; text: string } }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-foreground/20 bg-ink/50 px-4 py-3 backdrop-blur">
      <span className="display text-3xl text-secondary">{o.value}</span>
      <span className="text-sm leading-snug"><strong>{o.strong}</strong> {o.text}</span>
    </div>
  )
}

/** /lp/master-of-nursing-enquiry*\/ (CampusMaster rows in src/content/landing.ts, form lp-portal-hubspot). Shared copy in
 *  src/content/landing-mon.ts (MASTER_ENQUIRY); MON_VARIANTS[path] holds what differs per page. "Have Questions?" and "Schedule a call back"
 *  go to the enquiry form; the course brochure sits behind the course-brochure form (brochureDownload block). */
export async function MasterEnquiryLanding({ path }: { path: string }) {
  const doc = await landingDoc(path)
  const v = MON_VARIANTS[path]
  if (!v) throw new Error(`no MON_VARIANTS row for ${path}`)
  const ctx = nestedCtx(doc)
  const glance = [...M.glance, ...(v.fee ? [{ label: 'Fee per Semester', value: v.fee }] : []), { label: 'Campus Locations', value: v.campuses }]
  // the last cell fills the row on 2 (mobile) and 3 (md+) columns
  const spanLast = cn(glance.length % 2 === 1 && 'col-span-2', glance.length % 3 === 1 && 'md:col-span-3', glance.length % 3 === 2 && 'md:col-span-2')
  const testimonials: AnyBlock[] = v.testimonials ? [{ blockType: 'testimonials', variant: 'carousel', inline: M.testimonials.items } as AnyBlock] : []
  const brochure: AnyBlock[] = doc.course ? [{ blockType: 'brochureDownload', label: 'Download Brochure', spacing: 'none' } as AnyBlock] : []
  return (
    <LandingLayout doc={doc} eyebrow={v.tagline} formHeading={M.formHeading}
      title={<>Master of <em className="text-secondary not-italic">Nursing</em></>}
      intro={<>
        <p className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/15 px-4 py-1.5 text-base font-semibold text-secondary"><BadgeCheck aria-hidden className="size-4" />{v.feeHelp}</p>
        <div className="mt-5 flex flex-wrap gap-3"><Offer o={M.nclex} />{v.offer && <Offer o={v.offer} />}</div>
        <p className="mt-5">{M.intro}</p>
      </>}
      image={{ src: '/images/landing/mon/hero.webp', alt: 'Registered nurses in a hospital setting' }}
      actions={<>
        <a href={`#${FORM_END_ANCHOR}`} className={`${cta} bg-primary text-foreground hover:bg-secondary`}>Enquire Now<ArrowRight aria-hidden className="size-4" /></a>
        <a href="#key-info" className={`${cta} border border-ink-foreground/30 hover:border-secondary`}>Program Details</a>
      </>}
      after={
        <section className="mx-auto max-w-site px-5 pb-6 md:px-8">
          <div className="bg-brand-gradient flex flex-col items-start justify-between gap-5 rounded-card p-8 text-foreground md:flex-row md:items-center md:p-10">
            <h2 className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{M.closing.title}</h2>
            <a href={`#${FORM_END_ANCHOR}`} className={`${cta} shrink-0 bg-ink text-ink-foreground hover:bg-ink/85`}><CalendarDays aria-hidden className="size-4" />{M.closing.cta}</a>
          </div>
        </section>
      }>

      <section id="key-info" className="scroll-mt-24">
        <Eyebrow>Key information</Eyebrow>
        <h2 className="display text-display-md">{M.glanceTitle}</h2>
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-3">
          {glance.map((g, i) => <div key={g.label} className={cn('bg-card p-5', i === glance.length - 1 && spanLast)}><dt className="label-mono text-muted-foreground">{g.label}</dt><dd className="mt-1 font-semibold">{g.value}</dd></div>)}
        </dl>
        <p className="mt-4 flex gap-2.5 rounded-2xl bg-blush px-4 py-3 text-[15px] font-semibold"><Info aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{M.registrationNote}</p>
        {v.offerNote && (
          <div className="bg-brand-gradient mt-4 flex items-center gap-4 rounded-2xl px-5 py-4 text-foreground">
            <span className="display text-4xl">{v.offerNote.value}</span>
            <p><strong>{v.offerNote.strong}</strong> {v.offerNote.text}</p>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-card">
          <Image src={v.image.src} alt="Nursing Program Overview" width={v.image.width} height={v.image.height} sizes="(min-width: 768px) 30vw, 92vw" className="h-auto w-full" />
        </div>
        <div>
          <Eyebrow>{M.overview.subtitle}</Eyebrow>
          <h2 className="display text-display-md">{M.overview.title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{M.overview.body}</p>
          <ul className="mt-5 space-y-2.5">{M.overview.points.map((p) => <li key={p} className="flex gap-2.5 font-semibold"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{p}</li>)}</ul>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground md:col-span-2">{M.overview.footnotes.map((f) => <p key={f.slice(0, 20)}>{f}</p>)}</div>
      </section>

      {testimonials.length > 0 && (
        <section>
          <Eyebrow>Student stories</Eyebrow>
          <h2 className="display text-display-md">{M.testimonials.title}</h2>
          <p className="mt-3 text-[17px] text-muted-foreground">{M.testimonials.intro}</p>
          <RenderBlocks blocks={testimonials} ctx={ctx} />
        </section>
      )}

      <section id="why-choose" className="scroll-mt-24 rounded-card bg-ink p-7 text-ink-foreground md:p-10">
        <Eyebrow onDark>Why IHM</Eyebrow>
        <h2 className="display text-display-md">{M.why.title}</h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{M.why.points.map((p) => <li key={p} className="flex gap-2.5"><BookOpenCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-secondary" />{p}</li>)}</ul>
        <h3 className="mt-10 flex items-center gap-2 text-lg font-semibold"><Trophy aria-hidden className="size-5 text-secondary" />{M.why.rankingTitle}</h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {M.why.rankings.map((r) => <li key={r.label} className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-4"><span className="display text-4xl text-secondary">{r.rank}</span><p className="mt-1 text-sm">in &lsquo;{r.label}&rsquo;</p></li>)}
        </ul>
        <p className="mt-6 text-ink-foreground/80">{M.why.closing}</p>
      </section>

      <section id="admission" className="scroll-mt-24">
        <Eyebrow>Entry criteria</Eyebrow>
        <h2 className="display text-display-md">{M.admission.title}</h2>
        <p className="mt-3 text-[17px] text-muted-foreground">{M.admission.intro}</p>
        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {M.admission.items.map((a, i) => {
            const Icon = ADMISSION_ICONS[i]
            return (
              <li key={a.title} className="rounded-card border border-border bg-card p-6">
                <Icon aria-hidden className="size-8 text-primary-strong" />
                <h3 className="mt-4 font-semibold">{a.title}</h3>
                <div className="mt-2 space-y-2 text-[15px] text-muted-foreground">
                  {a.body.map((b) => { const [k, ...rest] = b.split(': '); return <p key={b.slice(0, 20)}>{rest.length ? <><strong className="text-foreground">{k}:</strong> {rest.join(': ')}</> : b}</p> })}
                </div>
              </li>
            )
          })}
        </ol>
        <p className="mt-4 text-sm"><strong>Note:</strong> {M.admission.note}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`#${FORM_END_ANCHOR}`} className={`${cta} bg-primary text-foreground hover:bg-secondary`}>Have Questions?</a>
          <Link href={M.admission.englishLink.href} className={`${cta} border border-border hover:border-primary`}>{M.admission.englishLink.label}<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        {brochure.length > 0 && <div className="mt-6"><RenderBlocks blocks={brochure} ctx={ctx} /></div>}
      </section>
    </LandingLayout>
  )
}
