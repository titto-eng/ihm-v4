// /graduate-certificate-in-advanced-nursing/ — WordPress page 874: the GCAN hub (12 specialisations). About, the specialisations
// (linking to their course pages), course details and how to apply, intakes, admission requirements, fees and scholarships,
// FEE-HELP, payment-safety notice, 22 FAQs, the course team, student video stories, blogs and the enquiry form.
// Copy in src/content/gcan.ts; intake months come from src/content/key-dates.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgePercent, CalendarDays, Download, ShieldAlert, Sparkles } from 'lucide-react'
import { pageMetadata, EnquiryForm } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { Lead } from '@/components/student-support/parts'
import { KitBlocks, KitFaq, KitTable, kitFaqJsonLd } from '@/components/page-kit/Kit'
import { VideoGallery } from '@/components/media/VideoGallery.client'
import { PostCard } from '@/components/templates/BlogListing'
import { getPostsBySlugs } from '@/components/templates/data'
import * as G from '@/content/gcan'
import { KEY_DATES } from '@/content/key-dates'
import { legacyImage } from '@/lib/legacy-image'
import { siteOrigin } from '@/lib/seo/metadata'

const PATH = '/graduate-certificate-in-advanced-nursing/'

export const metadata: Metadata = pageMetadata({
  title: 'Graduate Certificate in Advanced Nursing',
  path: PATH,
  metaTitle: 'Graduate Certificate in Advanced Nursing (GCAN) Online | 12 Specialisations | IHM',
  description: 'Study the TEQSA-accredited, AQF level 8 Graduate Certificate in Advanced Nursing online in 26 weeks: 12 specialisations, AUD $7,750 tuition, scholarships, FEE-HELP and a pathway to the Master of Nursing.',
})

const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-all hover:-translate-y-0.5'
const NAV = [['about', 'About'], ['specialisations', 'Specialisations'], ['details', 'Course details'], ['admission', 'Admission'], ['fees', 'Fees & scholarships'], ['faq', 'FAQs'], ['team', 'Course team']] as const
const TEAM = [
  { name: 'Associate Prof. Helen Almond', role: 'Head of School', photo: '/images/people/helen-almond.webp', href: '/assoc-prof-helen-almond/' },
  { name: 'Dr. Parul', role: 'Course Coordinator', photo: '/images/people/parul.webp', href: '/parul-p/' },
]
const stepTitle = (s: string) => { const i = s.indexOf(': '); return i > 0 ? { t: s.slice(0, i), d: s.slice(i + 2) } : { t: s, d: '' } }

export default async function GraduateCertificateInAdvancedNursingRoute() {
  const posts = await getPostsBySlugs(G.GCAN_BLOG_SLUGS.slice(0, 9)).catch(() => [])
  const year = KEY_DATES.find((y) => y.campus)
  const intakes = year?.campus?.slice(1).filter((r) => /\bGCAN\b/.test(r[r.length - 1])).map((r) => r[0]) ?? []
  const poster = legacyImage('/images/study/nclex-event.webp', '')
  return (
    <>
      <JsonLd data={kitFaqJsonLd(G.GCAN_FAQ)} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Course', name: 'Graduate Certificate in Advanced Nursing', url: `${siteOrigin()}${PATH}`,
        description: G.GCAN_ABOUT[0], educationalCredentialAwarded: 'Graduate Certificate (AQF level 8)',
        provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', sameAs: siteOrigin() },
        offers: { '@type': 'Offer', category: 'Tuition', price: 7750, priceCurrency: 'AUD' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'P26W' },
      }} />

      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="gcan-rays" className="-right-24 -bottom-28 -z-10 w-[30rem] opacity-[0.12]" />
        <div className="mx-auto grid max-w-site gap-10 px-5 pt-14 pb-10 md:px-8 md:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="animate-rise">
            <Eyebrow onDark>Postgraduate · 12 specialisations</Eyebrow>
            <h1 className="display text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.04]">Graduate Certificate in <em className="text-secondary">Advanced Nursing</em></h1>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {G.GCAN_FACTS.map(([k, v]) => <div key={k} className="rounded-2xl bg-ink-foreground/5 p-4 ring-1 ring-ink-foreground/10"><dt className="label-mono text-[10px] text-secondary">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>)}
              <div className="bg-brand-gradient flex items-center gap-3 rounded-2xl p-4 text-foreground"><BadgePercent aria-hidden className="size-6 shrink-0" /><span className="font-semibold">{G.GCAN_HIGHLIGHT}</span></div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={G.GCAN_APPLY} target="_blank" rel="noopener noreferrer" className={`${btn} bg-primary text-foreground hover:bg-secondary`}>Apply Now<ArrowUpRight aria-hidden className="size-4" /></a>
              <a href="#quickContact" className={`${btn} border border-ink-foreground/30 hover:border-secondary hover:text-secondary`}>Enquire Now</a>
              <a href={G.GCAN_BROCHURE} target="_blank" rel="noopener" className={`${btn} border border-ink-foreground/30 hover:border-secondary hover:text-secondary`}><Download aria-hidden className="size-4" />Brochure</a>
            </div>
          </div>
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] lg:block">
            <Image src="/images/home/courses/gcan.webp" alt="A registered nurse studying advanced nursing online" fill priority sizes="35vw" className="object-cover" />
          </div>
        </div>
        <nav aria-label="On this page" className="mx-auto max-w-site px-5 pb-6 md:px-8">
          <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">{NAV.map(([id, l]) => <li key={id} className="shrink-0"><a href={`#${id}`} className="inline-block rounded-full bg-ink-foreground/10 px-4 py-2 text-sm font-semibold hover:bg-ink-foreground/20">{l}</a></li>)}</ul>
        </nav>
      </section>

      <Section anchorId="about">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Lead eyebrow="About the course" title={<>Advance your <em className="text-primary-strong">nursing career</em></>} />
            <ul className="grid gap-3 text-[16px] leading-relaxed">{G.GCAN_ABOUT.map((t) => <li key={t.slice(0, 30)} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />{t}</li>)}</ul>
            <div className="mt-6 space-y-2 rounded-card bg-blush/60 p-5 text-sm">{G.GCAN_NOTES.map((n) => <p key={n.slice(0, 20)}>{n}</p>)}</div>
          </div>
          <VideoGallery videos={[{ id: G.GCAN_VIDEO, title: 'Advance your nursing career with the Graduate Certificate in Advanced Nursing (12 specialisations)' }]} columns={1} />
        </div>
      </Section>

      <Section tone="muted" anchorId="specialisations">
        <Lead eyebrow="What courses do we offer?" title={<>Choose from <em className="text-primary-strong">12 specialisations</em></>} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {G.GCAN_SPECIALISATIONS.map((s) => (
            <li key={s.name}>
              <Link href={s.href} className="group block overflow-hidden rounded-card bg-card ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-xl">
                <span className="relative block aspect-[4/3] overflow-hidden"><Image src={s.image} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></span>
                <span className="flex items-center justify-between gap-3 p-4"><span className="display text-lg">{s.name}</span><ArrowRight aria-hidden className="size-4 shrink-0 text-primary-strong transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section anchorId="details">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Lead eyebrow="Course details" title="Built for working registered nurses" />
            <KitBlocks blocks={G.GCAN_DETAILS} />
            <div className="mt-8 rounded-card border border-border bg-card p-6">
              <p className="flex items-center gap-2 font-semibold"><CalendarDays aria-hidden className="size-5 text-primary-strong" />Course start dates {year?.year}</p>
              {intakes.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{intakes.map((m) => <li key={m} className="rounded-full bg-blush px-3 py-1 text-sm font-semibold">{m}</li>)}</ul>}
              <Link href="/key-dates/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong">Census and key dates<ArrowRight aria-hidden className="size-4" /></Link>
            </div>
          </div>
          <div>
            <Lead eyebrow="Are you ready to apply?" title="Five steps to enrol" />
            <ol className="relative space-y-3 before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-border">
              {G.GCAN_STEPS.map((s, i) => { const x = stepTitle(s); return (
                <li key={x.t} className="relative flex gap-4"><span className="bg-brand-gradient relative z-10 grid size-10 shrink-0 place-items-center rounded-full font-bold text-foreground">{i + 1}</span><div className="rounded-card border border-border bg-card p-4"><p className="font-semibold">{x.t}</p>{x.d && <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>}</div></li>
              ) })}
            </ol>
            <KitBlocks blocks={G.GCAN_LINKS} className="mt-6" />
          </div>
        </div>
      </Section>

      <Section tone="muted" anchorId="admission">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Lead eyebrow="Admission requirements" title="Who can apply" />
          <KitBlocks blocks={G.GCAN_ADMISSION} />
        </div>
      </Section>

      <Section anchorId="fees">
        <Lead eyebrow="Fees & scholarships" title={<>Invest in your <em className="text-primary-strong">specialty</em></>} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <KitTable rows={G.GCAN_FEES} />
            <div className="rounded-card bg-ink p-6 text-ink-foreground">
              <Sparkles aria-hidden className="size-6 text-secondary" />
              <p className="display mt-3 text-2xl">FEE-HELP available</p>
              <KitBlocks blocks={G.GCAN_FEE_HELP} onDark className="mt-3 text-[15px]" />
            </div>
          </div>
          <div className="space-y-4">
            <KitTable rows={G.GCAN_SCHOLARSHIPS} />
            <p className="text-sm text-muted-foreground">{G.GCAN_SCHOLARSHIP_NOTE}</p>
            <div><p className="mb-3 font-semibold">Policies & procedures</p><KitBlocks blocks={G.GCAN_POLICIES} /></div>
          </div>
        </div>
        <aside className="mt-10 rounded-card border border-primary/40 bg-blush/60 p-6 md:p-8" aria-labelledby="scam-notice">
          <p id="scam-notice" className="flex items-center gap-2 font-semibold text-primary-strong"><ShieldAlert aria-hidden className="size-5" />Attention students! Stay safe from payment scams</p>
          <KitBlocks blocks={G.GCAN_SCAM_NOTICE} className="mt-3 text-[15px]" />
        </aside>
      </Section>

      <Section tone="muted" anchorId="faq">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start"><Lead eyebrow="FAQs" title="Frequently asked questions" /></div>
          <KitFaq items={G.GCAN_FAQ} />
        </div>
      </Section>

      <Section anchorId="team">
        <Lead eyebrow="Course team" title="Meet your academic leaders" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
          {TEAM.map((p) => (
            <li key={p.name}><Link href={p.href} className="group flex items-center gap-5 rounded-card border border-border bg-card p-5 transition-shadow hover:shadow-lg">
              <Image src={p.photo} alt={p.name} width={96} height={96} className="size-24 rounded-2xl object-cover" />
              <span><span className="label-mono block text-[11px] text-primary-strong">{p.role}</span><span className="display mt-1 block text-xl">{p.name}</span><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground group-hover:text-primary-strong">View profile<ArrowRight aria-hidden className="size-4" /></span></span>
            </Link></li>
          ))}
        </ul>
      </Section>

      <Section tone="ink" className="bg-ink-glow" anchorId="student-stories">
        <Lead onDark eyebrow="Student testimonials" title="Hear from GCAN students" />
        <VideoGallery videos={G.GCAN_VIDEO_STORIES.map((v) => ({ id: v.id, title: v.name }))} columns={4} />
      </Section>

      {posts.length > 0 && (
        <Section anchorId="blogs">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4"><Lead eyebrow="Blogs" title="Read more from IHM" /><Link href="/blog/" className="inline-flex items-center gap-2 font-semibold text-primary-strong">All blogs<ArrowRight aria-hidden className="size-4" /></Link></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>
        </Section>
      )}

      <Section tone="muted" anchorId="student-success-events">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div><Lead eyebrow="Student Success Program" title="Student Success Program events"><p>Workshops, registration guidance and career events for GCAN students.</p></Lead><Link href="/student-success-gcan/" className={`${btn} bg-ink text-ink-foreground hover:bg-primary hover:text-foreground`}>Student Success Program<ArrowRight aria-hidden className="size-4" /></Link></div>
          {poster && <Link href="/student-success-gcan/#upcomingEvents" className="block overflow-hidden rounded-card border border-secondary/60"><Image src={poster} alt="NCLEX event poster" width={900} height={900} className="h-auto w-full" /></Link>}
        </div>
      </Section>

      <EnquiryForm formKey="quick-enquiry" heading="Enquire about the Graduate Certificate in Advanced Nursing" variant="card" anchorId="quickContact" />
    </>
  )
}
