import Image from 'next/image'
import { ArrowRight, BadgeCheck, Building2, ExternalLink, FileDown, GraduationCap, HeartPulse, Hospital, MonitorSmartphone, Stethoscope, Users } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { FORM_END_ANCHOR, nestedCtx } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { BON_LANDING as B } from '@/content/landing-bon'

const WHY_ICONS = [Stethoscope, MonitorSmartphone, HeartPulse, BadgeCheck]
const CAREER_ICONS = [Hospital, Stethoscope, Users, HeartPulse, Building2, Users]
const cta = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold'

/** /lp/bachelor-of-nursing-<city>/ (CampusBachelor rows in src/content/landing.ts, form lp-admissions). The four pages share the copy in
 *  src/content/landing-bon.ts; only the city (the row's campus) changes. "Download Course Brochure" and "Check My Credit Eligibility" open the
 *  enquiry form, as on the old pages: the brochure is on the thank-you page. The portal start dates for the course follow the placements. */
export async function BonCityLanding({ path }: { path: string }) {
  const doc = await landingDoc(path)
  const city = doc.campus?.name ?? path.replace(/^\/lp\/bachelor-of-nursing-|\/$/g, '').replace(/^./, (c) => c.toUpperCase())
  const dates: AnyBlock[] = doc.course ? [{ blockType: 'startDates', mode: 'all' } as AnyBlock] : []
  return (
    <LandingLayout doc={doc} eyebrow={`${B.intake} Intake | ${city}`} formHeading="Course Enquiry"
      title={<>Become a <em className="text-secondary not-italic">Registered Nurse.</em> Start Your Bachelor of Nursing with IHM Australia</>}
      intro={<p className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/15 px-4 py-1.5 text-base font-semibold text-secondary">{B.seats}</p>}
      image={{ src: '/images/landing/bon/nursing-banner.webp', alt: 'Australian nursing students in a modern clinical learning environment' }}
      actions={<>
        <a href={`#${FORM_END_ANCHOR}`} className={`${cta} bg-primary text-foreground hover:bg-secondary`}><FileDown aria-hidden className="size-5" />Download Course Brochure</a>
        <a href="#credit" className={`${cta} border border-ink-foreground/30 hover:border-secondary`}>Check My Credit Eligibility</a>
      </>}
      after={
        <section className="mx-auto max-w-site px-5 pb-6 md:px-8">
          <div className="bg-brand-gradient rounded-card p-8 text-center text-foreground md:p-12">
            <GraduationCap aria-hidden className="mx-auto size-10" />
            <h2 className="display mt-3 text-display-md">{B.closing}</h2>
            <p className="mt-2 text-lg">{B.intake} Intake | {city}</p>
            <a href={`#${FORM_END_ANCHOR}`} className={`${cta} mt-6 bg-ink text-ink-foreground hover:bg-ink/85`}>Enquire now<ArrowRight aria-hidden className="size-4" /></a>
          </div>
        </section>
      }>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-4">
        {B.facts.map((f) => <div key={f.label} className="bg-card p-5"><dt className="label-mono text-muted-foreground">{f.label}</dt><dd className="mt-1 font-semibold">{f.value}</dd></div>)}
      </dl>

      <section className="rounded-card bg-blush p-7 md:p-9">
        <Eyebrow>Diploma of Nursing graduates</Eyebrow>
        <h2 className="display text-display-md">{B.creditTeaser.title}</h2>
        <div className="mt-3 space-y-3 text-[17px] leading-relaxed">{B.creditTeaser.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
      </section>

      <section>
        <Eyebrow>Why IHM</Eyebrow>
        <h2 className="display text-display-md">{B.whyTitle}</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-80 overflow-hidden rounded-card bg-ink text-ink-foreground">
            <Image src="/images/landing/bon/nursing-hero.webp" alt="Nursing students in an Australian clinical learning environment" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6 pt-20">
              <p className="display text-2xl leading-tight">{B.placementHighlight.title}</p>
              <p className="mt-2 text-sm text-ink-foreground/85">{B.placementHighlight.body}</p>
              <a href="#placements" className="mt-3 inline-flex items-center gap-1.5 font-semibold text-secondary hover:underline">{B.placementHighlight.cta}<ArrowRight aria-hidden className="size-4" /></a>
            </div>
          </div>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {B.why.map((w, i) => {
              const Icon = WHY_ICONS[i]
              return (
                <li key={w.title} className="rounded-card border border-border bg-card p-6 transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between"><Icon aria-hidden className="size-8 text-primary-strong" /><span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">{w.body}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section>
        <Eyebrow>Curriculum</Eyebrow>
        <h2 className="display text-display-md">{B.learnTitle}</h2>
        <p className="mt-3 text-[17px] text-muted-foreground">{B.learnIntro}</p>
        <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {B.learn.map((l, i) => (
            <li key={l} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="bg-brand-gradient display grid size-10 shrink-0 place-items-center rounded-xl text-foreground">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-semibold">{l}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="credit" className="grid scroll-mt-24 grid-cols-1 gap-8 rounded-card bg-ink p-7 text-ink-foreground md:grid-cols-[auto_1fr] md:items-center md:p-10">
        <div className="mx-auto text-center">
          <p className="label-mono text-ink-foreground/70">Diploma <ArrowRight aria-hidden className="inline size-3" /> Bachelor</p>
          <div className="bg-brand-gradient mx-auto mt-3 grid size-44 place-items-center rounded-full p-5 text-foreground shadow-[0_0_0_10px_rgb(241_92_78/0.18)]">
            <div><p className="label-mono">{B.diploma.badge.top}</p><p className="display text-6xl leading-none">{B.diploma.badge.value}</p><p className="label-mono max-w-[7rem] text-[10px] leading-tight">{B.diploma.badge.bottom}</p></div>
          </div>
        </div>
        <div>
          <h2 className="display text-display-md">{B.diploma.title}</h2>
          <p className="mt-1 text-lg font-semibold text-secondary">{B.diploma.subtitle}</p>
          <p className="mt-4 text-ink-foreground/85">{B.diploma.body}</p>
          <p className="mt-2 text-sm italic text-ink-foreground/70">{B.diploma.note}</p>
          <p className="mt-5 font-semibold">{B.diploma.question}</p>
          <a href={`#${FORM_END_ANCHOR}`} className={`${cta} mt-3 bg-primary text-foreground hover:bg-secondary`}>Check My Credit Eligibility<ArrowRight aria-hidden className="size-4" /></a>
        </div>
      </section>

      <section id="placements" className="scroll-mt-24">
        <Eyebrow>Professional experience</Eyebrow>
        <h2 className="display text-display-md">{B.placements.title}</h2>
        <div className="mt-3 space-y-2 text-[17px] text-muted-foreground">{B.placements.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
          <div className="relative aspect-[3/2] overflow-hidden rounded-card">
            <Image src="/images/landing/bon/nursing-placement.webp" alt="Australian nursing student practising clinical skills with a nurse educator in a simulation laboratory" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
          </div>
          <ol className="relative space-y-4 border-l-2 border-primary/40 pl-6">
            {B.placements.years.map((y, i) => (
              <li key={y} className="relative">
                <span aria-hidden className="absolute top-1 -left-[2.05rem] grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-foreground">{i + 1}</span>
                <h3 className="font-semibold">{y}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{B.placements.yearNote}</p>
              </li>
            ))}
          </ol>
        </div>
        <dl className="mt-6 grid grid-cols-3 gap-3">
          {B.placements.stats.map((s) => <div key={s.label} className="rounded-card bg-blush p-5 text-center"><dd className="display text-4xl text-primary-strong">{s.value}</dd><dt className="label-mono mt-1">{s.label}</dt></div>)}
        </dl>
      </section>

      {dates.length > 0 && <RenderBlocks blocks={dates} ctx={nestedCtx(doc)} />}

      <section>
        <div className="relative aspect-[21/9] overflow-hidden rounded-card">
          <Image src="/images/landing/bon/nursing-careers.webp" alt="Australian nursing professionals together in a modern hospital corridor" fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover" />
        </div>
        <div className="mt-8">
          <Eyebrow>Careers</Eyebrow>
          <h2 className="display text-display-md">{B.careers.title}</h2>
          <p className="mt-3 text-[17px] text-muted-foreground">{B.careers.intro}</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
            {B.careers.places.map((p, i) => {
              const Icon = CAREER_ICONS[i]
              return <li key={p} className="flex items-center gap-2.5 rounded-2xl border border-border bg-card p-3 font-semibold"><Icon aria-hidden className="size-5 shrink-0 text-primary-strong" />{p}</li>
            })}
          </ul>
        </div>
      </section>

      <section className="rounded-card border border-border bg-card p-7 md:p-9">
        <Eyebrow>Accreditation</Eyebrow>
        <h2 className="display text-display-md">{B.recognition.title}</h2>
        <div className="mt-4 space-y-3 text-[17px] leading-relaxed">{B.recognition.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {B.recognition.links.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary">{l.t}<ExternalLink aria-hidden className="size-3.5" /></a></li>)}
        </ul>
      </section>
    </LandingLayout>
  )
}
