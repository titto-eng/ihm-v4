// /alumni/ — WordPress template-ihm-alumni.php (page 10138). Copy and media are in src/content/alumni.ts; the two forms are the
// `alumni-story` and `alumni-signup` enquiry forms (saved to Postgres first, then emailed to the alumni group). The anchor ids
// (#ihmrvStories, #ihmrvShareStory, #ihmrvSignup) are the old page's, so existing links still land on the right section.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, FileText, Mail, Quote } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Emphasis } from '@/components/Emphasis'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { CountUp } from '@/components/home/CountUp.client'
import { SocialIcon } from '@/components/layout/SocialIcon'
import { EnquiryFormClient } from '@/components/forms/EnquiryFormClient'
import { Spotlight, VideoStories } from '@/components/alumni/hub.client'
import { getFormView } from '@/lib/enquiries/formView'
import { siteOrigin } from '@/lib/seo/metadata'
import {
  ALUMNI_BENEFITS, ALUMNI_COUNTRIES, ALUMNI_GALLERY, ALUMNI_HERO, ALUMNI_MOMENTS, ALUMNI_QUOTES, ALUMNI_REFERRAL, ALUMNI_SIGNUP_PERKS,
  ALUMNI_SOCIAL, ALUMNI_STATS, ALUMNI_SUPPORT, ALUMNI_VIDEOS, ALUMNI_YOUTUBE,
} from '@/content/alumni'

export const metadata: Metadata = pageMetadata({
  title: 'IHM Alumni',
  path: '/alumni/',
  metaTitle: 'IHM Alumni Network | Stories, Benefits, Referrals and Sign-up | IHM',
  description: 'Join 17,000+ IHM alumni in 40+ countries: watch graduate stories, share your own, refer a friend and earn up to AUD $1,000, and sign up for alumni events, mentoring and career updates.',
})

const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-colors'

export default async function AlumniRoute() {
  const [story, signup] = await Promise.all([getFormView('alumni-story'), getFormView('alumni-signup')])
  const origin = siteOrigin()
  const [c0, c1, c2, c3, c4, c5] = ALUMNI_HERO.collage

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollegeOrUniversity', '@id': `${origin}/#organization`, name: 'Institute of Health and Management', url: origin,
            alumni: ALUMNI_QUOTES.map((q) => ({ '@type': 'Person', name: q.name })),
          },
          {
            '@type': 'ItemList', name: 'IHM alumni video stories', url: `${origin}/alumni/#ihmrvStories`,
            itemListElement: ALUMNI_VIDEOS.map((v, i) => ({
              '@type': 'ListItem', position: i + 1,
              item: { '@type': 'VideoObject', name: v.title, description: v.body, thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`, contentUrl: `https://www.youtube.com/watch?v=${v.id}` },
            })),
          },
        ],
      }} />

      {/* Hero: copy, CTAs and a graduation-day collage */}
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="alumni-rays" className="-top-24 -left-24 -z-10 w-[30rem] opacity-[0.12]" />
        <div className="mx-auto grid max-w-site gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="animate-rise">
            <Eyebrow onDark>{ALUMNI_HERO.eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.03]"><Emphasis text={ALUMNI_HERO.heading} tone="secondary" /></h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/80">{ALUMNI_HERO.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#ihmrvShareStory" className={`${btn} bg-primary text-foreground hover:bg-secondary`}>Share your story<ArrowRight aria-hidden className="size-4" /></a>
              <a href="#ihmrvStories" className={`${btn} border border-ink-foreground/30 hover:border-secondary hover:text-secondary`}>Explore alumni stories</a>
            </div>
          </div>
          <div className="relative grid grid-cols-6 grid-rows-[repeat(6,minmax(0,1fr))] gap-3 [aspect-ratio:1/0.92]" aria-label="Graduation moments photos">
            <Tile img={c0} className="col-span-4 row-span-3" priority sizes="(min-width: 1024px) 34vw, 62vw" />
            <Tile img={c1} className="col-span-2 row-span-2" />
            <Tile img={c2} className="col-span-2 row-span-2" />
            <Tile img={c3} className="col-span-2 row-span-3" />
            <Tile img={c4} className="col-span-2 row-span-3" />
            <Tile img={c5} className="col-span-2 row-span-2" />
            <span className="label-mono absolute top-4 left-4 rounded-full bg-card/95 px-3 py-1.5 text-[10px] text-foreground shadow-lg">{ALUMNI_HERO.badges[0]}</span>
            <span className="label-mono absolute right-4 bottom-4 rounded-full bg-secondary px-3 py-1.5 text-[10px] text-foreground shadow-lg">{ALUMNI_HERO.badges[1]}</span>
            <p className="sr-only">{ALUMNI_HERO.caption}</p>
          </div>
        </div>
        <div className="border-t border-ink-foreground/10">
          <dl className="mx-auto grid max-w-site grid-cols-2 px-5 md:grid-cols-4 md:px-8">
            {ALUMNI_STATS.map((s, i) => (
              <div key={s.label} className={`py-8 ${i % 2 ? 'pl-6' : ''} ${i > 0 ? 'md:border-l md:border-ink-foreground/10 md:pl-8' : ''}`}>
                <dd className="display text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-secondary"><CountUp value={s.value} suffix="+" /></dd>
                <dt className="mt-2 text-sm text-ink-foreground/75">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* A truly global family */}
      <Section className="overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <Eyebrow>A truly global family</Eyebrow>
            <h2 className="display text-display-md">Our alumni come from <em className="text-primary-strong">everywhere</em></h2>
          </div>
          <p className="text-lg text-muted-foreground">From Perth to the Philippines, Melbourne to Kenya — IHM graduates bring their cultures with them and carry Australian healthcare and social work expertise back to the world.</p>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {ALUMNI_COUNTRIES.map(([flag, name]) => (
            <li key={name} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-primary"><span aria-hidden className="text-lg leading-none">{flag}</span>{name}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">...and dozens more nations represented across our campuses in Melbourne, Sydney, Perth and Brisbane.</p>
        <div className="-mx-5 mt-12 overflow-hidden md:-mx-8 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="motion-marquee flex w-max animate-[marquee_60s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
            {[...ALUMNI_GALLERY, ...ALUMNI_GALLERY].map((g, i) => (
              <li key={i} aria-hidden={i >= ALUMNI_GALLERY.length || undefined} className="relative h-56 w-80 shrink-0 overflow-hidden rounded-card bg-muted md:h-64 md:w-96">
                <Image src={g.src} alt={i >= ALUMNI_GALLERY.length ? '' : g.alt} fill sizes="384px" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Video stories */}
      <Section tone="muted" anchorId="ihmrvStories">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Real journeys. Real impact.</Eyebrow>
            <h2 className="display text-display-md">Alumni stories in their <em className="text-primary-strong">own words</em></h2>
          </div>
          <p className="text-muted-foreground">Watch IHM graduates share how their course changed their careers - from the latest Master of Nursing cohort to Bachelor of Social Work, Graduate Certificate in Advanced Nursing to NCLEX and OSCE success stories.</p>
        </div>
        <VideoStories videos={ALUMNI_VIDEOS} channel={ALUMNI_YOUTUBE} />
        <a href={ALUMNI_YOUTUBE} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-semibold text-primary-strong">More stories on IHM&apos;s YouTube channel<ArrowUpRight aria-hidden className="size-4" /></a>
      </Section>

      {/* Written testimonials */}
      <Section>
        <Eyebrow>In their words</Eyebrow>
        <h2 className="display text-display-md">What our graduates say</h2>
        <p className="mt-3 text-muted-foreground">Written testimonials from IHM&apos;s <Link href="/student-testimonials/" className="font-semibold text-primary-strong underline underline-offset-4">student testimonial pages</Link>.</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {ALUMNI_QUOTES.map((q, i) => (
            <li key={q.name}>
              <figure className={`relative flex h-full flex-col rounded-card p-7 ${i === 1 ? 'bg-ink text-ink-foreground' : 'border border-border bg-card'}`}>
                <Quote aria-hidden className={`size-9 ${i === 1 ? 'text-secondary' : 'text-primary'}`} />
                <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed">“{q.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-current/15 pt-4">
                  <p className="font-semibold">{q.name}</p>
                  <p className={`text-sm ${i === 1 ? 'text-ink-foreground/70' : 'text-muted-foreground'}`}>{q.course}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      {/* Graduation moments */}
      <Section tone="card">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Graduation moments</Eyebrow>
            <h2 className="display text-display-md">Celebrating your <em className="text-primary-strong">achievement</em></h2>
          </div>
          <p className="text-muted-foreground">A compact graduate spotlight built from verified videos on IHM&apos;s current YouTube channel, with ceremony highlights from our Facebook community.</p>
        </div>
        <Spotlight items={ALUMNI_MOMENTS.spotlights} channel={ALUMNI_YOUTUBE} />
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {ALUMNI_MOMENTS.facebook.map((f) => (
            <li key={f.href}>
              <a href={f.href} target="_blank" rel="noopener noreferrer" className="group/f relative block aspect-[16/10] overflow-hidden rounded-card bg-ink text-ink-foreground">
                <Image src={f.image} alt="" fill sizes="(min-width: 640px) 30vw, 92vw" className="object-cover opacity-75 transition-transform duration-700 group-hover/f:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 font-semibold"><SocialIcon network="facebook" />{f.label}<ArrowUpRight aria-hidden className="size-4" /></span>
              </a>
            </li>
          ))}
        </ul>
        <a href={ALUMNI_YOUTUBE} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary-strong">Explore the IHM YouTube channel<ArrowUpRight aria-hidden className="size-4" /></a>
      </Section>

      {/* Benefits */}
      <Section>
        <Eyebrow>Why stay connected</Eyebrow>
        <h2 className="display text-display-md">Your alumni benefits</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Graduation is the beginning, not the end. Here&apos;s what the IHM Alumni network offers you for life.</p>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ALUMNI_BENEFITS.map((b, i) => {
            const ext = b.href.startsWith('http')
            return (
              <li key={b.title} className="group/b relative flex flex-col overflow-hidden rounded-card border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/b:scale-x-100" />
                <span className="display text-4xl text-primary/70">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display mt-4 text-xl">{b.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.body}</p>
                <a href={b.href} {...(ext && { target: '_blank', rel: 'noopener noreferrer' })} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong">{b.cta}{ext ? <ArrowUpRight aria-hidden className="size-4" /> : <ArrowRight aria-hidden className="size-4" />}</a>
              </li>
            )
          })}
        </ol>
      </Section>

      {/* Referral */}
      <section data-tone="sunrise" className="bg-sunrise-glow relative isolate overflow-hidden" id="referral">
        <div className="mx-auto grid max-w-site gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>Alumni referral</Eyebrow>
            <h2 className="display text-display-md"><Emphasis text={ALUMNI_REFERRAL.heading} /></h2>
            <p className="mt-4 max-w-xl text-lg">{ALUMNI_REFERRAL.lead}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {ALUMNI_REFERRAL.rewards.map((r) => (
                <li key={r.course} className="flex flex-col rounded-card bg-card/90 p-5 shadow-[0_18px_40px_-28px_hsl(5_60%_30%/0.5)] backdrop-blur">
                  <span className="display text-3xl text-primary-strong">{r.amount}</span>
                  <span className="mt-2 text-sm font-semibold leading-snug">{r.course}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid gap-2">
              {ALUMNI_REFERRAL.points.map((p) => <li key={p} className="flex items-center gap-2 font-medium"><Check aria-hidden className="size-5 shrink-0 text-primary-strong" />{p}</li>)}
            </ul>
            <a href={ALUMNI_REFERRAL.href} target="_blank" rel="noopener noreferrer" className={`${btn} mt-8 bg-ink text-ink-foreground hover:bg-primary hover:text-foreground`}>Refer today<ArrowUpRight aria-hidden className="size-4" /></a>
          </div>
          <div className="rounded-card bg-card p-3 shadow-[0_30px_60px_-36px_hsl(348_35%_13%/0.5)]">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)]">
              <Image src={ALUMNI_REFERRAL.image.src} alt={ALUMNI_REFERRAL.image.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
            </div>
            <div className="p-4 md:p-5">
              <h3 className="display text-2xl">How it works</h3>
              <ol className="mt-4 grid gap-3">
                {ALUMNI_REFERRAL.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="bg-brand-gradient grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold text-foreground">{i + 1}</span>
                    <span className="font-medium">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs text-muted-foreground">{ALUMNI_REFERRAL.terms}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Share your story + support shortcuts */}
      <Section tone="muted" anchorId="ihmrvShareStory">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Eyebrow>Share your story</Eyebrow>
            <h2 className="display text-display-md">Share your story</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">If IHM was part of your path into healthcare, we&apos;d love to hear from you. Share your experience, what you&apos;re doing now, and the milestone you&apos;re most proud of since graduation.</p>
            <div className="mt-8 rounded-card border border-border bg-card p-6 md:p-10" data-form-key="alumni-story">
              {story ? <EnquiryFormClient def={story.def} campuses={story.campuses} courses={story.courses} submitLabel="Submit my story" /> : <FormFallback />}
            </div>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Stay connected with IHM">
            <div className="rounded-card bg-ink p-6 text-ink-foreground">
              <p className="label-mono text-[10px] text-secondary">Stay connected with IHM</p>
              <h3 className="display mt-2 text-2xl">Need something from IHM?</h3>
              <ul className="mt-5 grid gap-4">
                {ALUMNI_SUPPORT.map((s) => (
                  <li key={s.title} className="rounded-2xl bg-ink-foreground/5 p-4">
                    <p className="flex items-center gap-2 font-semibold">{s.note ? <FileText aria-hidden className="size-4 text-secondary" /> : <Mail aria-hidden className="size-4 text-secondary" />}{s.title}</p>
                    <p className="mt-1 text-sm text-ink-foreground/75">{s.body}</p>
                    {s.note && <p className="mt-1 text-xs italic text-ink-foreground/60">{s.note}</p>}
                    <a href={`mailto:${s.email}`} className="mt-2 inline-block text-sm font-semibold break-all text-secondary underline underline-offset-4">{s.email}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border bg-card p-6">
              <h3 className="display text-xl">Stay connected across every IHM channel</h3>
              <p className="mt-1 text-sm text-muted-foreground">Follow alumni stories, student highlights, campus moments, and professional updates.</p>
              <ul className="mt-4 grid gap-2">
                {ALUMNI_SOCIAL.map((s) => (
                  <li key={s.network}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-blush">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-primary-strong"><SocialIcon network={s.network} /></span>
                      <span className="min-w-0"><span className="block font-semibold">{s.label}</span><span className="block text-xs text-muted-foreground">{s.body}</span></span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-sand/70 p-3 text-xs"><strong>Tip:</strong> Share your story here, then stay active on social to keep track of new alumni features, events, and opportunities.</p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Sign-up */}
      <section data-tone="ink" id="ihmrvSignup" className="bg-ink-glow relative isolate scroll-mt-24 overflow-hidden text-ink-foreground">
        <HeroRays id="alumni-rays-2" className="-right-24 -bottom-24 -z-10 w-[28rem] opacity-[0.12]" />
        <div className="mx-auto grid max-w-site gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow onDark>Join the network</Eyebrow>
            <h2 className="display text-display-md">Stay in the loop - <em className="text-secondary">sign up for alumni updates</em></h2>
            <p className="mt-4 text-lg text-ink-foreground/80">Whether you graduated last month or five years ago, register your details so we can keep you connected.</p>
            <ul className="mt-8 grid gap-3">
              {ALUMNI_SIGNUP_PERKS.map((p) => <li key={p} className="flex gap-3"><span className="bg-brand-gradient mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"><Check aria-hidden className="size-3.5 text-foreground" /></span>{p}</li>)}
            </ul>
            <p className="mt-8 text-sm text-ink-foreground/70">Already registered? <Link href="/alumni/login/" className="font-semibold text-secondary underline underline-offset-4">Sign in to the alumni portal</Link>.</p>
          </div>
          <div className="rounded-card bg-card p-6 text-foreground md:p-10" data-form-key="alumni-signup">
            <h3 className="display text-2xl">Alumni sign-up</h3>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">Fields marked * are required. Read our <a href="/pdf/policies/IHM_Privacy_Policy.pdf" target="_blank" rel="noopener" className="font-semibold text-primary-strong underline underline-offset-4">Privacy Policy</a>.</p>
            {signup ? <EnquiryFormClient def={signup.def} campuses={signup.campuses} courses={signup.courses} submitLabel="Join the IHM Alumni network" /> : <FormFallback />}
          </div>
        </div>
      </section>
    </>
  )
}

function Tile({ img, className, priority = false, sizes = '(min-width: 1024px) 17vw, 31vw' }: { img: { src: string; alt: string }; className: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={`group/t relative overflow-hidden rounded-2xl bg-ink-foreground/10 ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 group-hover/t:scale-105" />
    </div>
  )
}

function FormFallback() {
  return <p className="text-sm text-muted-foreground">This form is unavailable right now. Please email <a href="mailto:alumni@ihm.edu.au" className="font-semibold text-primary-strong underline">alumni@ihm.edu.au</a>.</p>
}
