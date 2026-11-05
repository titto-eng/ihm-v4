import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, FileText, GraduationCap, Headphones, Lightbulb, MessageSquareQuote, Phone, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/blocks/SectionHeader'
import { Emphasis } from '@/components/Emphasis'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { HeroRays } from '@/blocks/hero/Component'
import { OrganizationJsonLd } from '@/components/seo/Organization'
import { JsonLd } from '@/components/seo/JsonLd'
import { PostCard } from '@/components/templates/BlogListing'
import { getLatestPosts, getTestimonials } from '@/components/templates/data'
import { footer } from '@/content/footer'
import { site } from '@/content/site'
import { telHref } from '@/components/layout/nav-utils'
import { HomeHero } from './HomeHero.client'
import { CourseChooser } from './CourseChooser.client'
import { CountUp } from './CountUp.client'
import { legacyImage } from '@/lib/legacy-image'
import { ABOUT, CTA_STATEMENT, FEATURES, HOME_SLIDES, KEY_FACTS, QILT, QUICK_LINKS, SCHOOLS } from './homeContent'

/** Shown for a carousel photo that is on the live site only until `npm run assets:legacy` has saved it. */
const HERO_FALLBACK = '/images/home/hero/community.webp'

type Icon = ComponentType<SVGProps<SVGSVGElement>>
const FEATURE_ICONS: Record<string, Icon> = { students: Users, experts: GraduationCap, innovation: Lightbulb }
const LINK_ICONS: Record<string, Icon> = { policy: ShieldCheck, support: Headphones, handbook: BookOpen, testimonials: MessageSquareQuote, guide: FileText }

// The home page, migrated from the WordPress front page (front-page.php): hero carousel, about, course chooser,
// latest blogs, QILT results, features, statement, quick links. Copy lives in homeContent.ts; CMS data (posts,
// testimonials) is optional and its sections drop out when empty.
export async function HomeLanding() {
  const [posts, testimonials] = await Promise.all([getLatestPosts(3).catch(() => []), getTestimonials(6).catch(() => [])])
  return (
    <>
      <OrganizationJsonLd sameAs={footer.social.map((s) => s.href)} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Courses at the Institute of Health and Management',
        itemListElement: SCHOOLS.flatMap((g) => g.courses).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.title, url: c.href })),
      }} />

      <HomeHero slides={HOME_SLIDES.map((sl) => ({ ...sl, image: { ...sl.image, src: legacyImage(sl.image.src, HERO_FALLBACK) } }))} />

      {/* About + key facts (plain, quotable statements for search and AI answers) */}
      <Section anchorId="about">
        {/* The heading spans the width; below it the text and the photo column share one height (the photo fills it), so neither side leaves gaps. */}
        <header className="max-w-5xl">
          <p className="label-mono mb-5 flex items-center gap-3 text-primary-strong"><span aria-hidden className="bg-brand-gradient h-0.5 w-8 rounded-full" />About IHM</p>
          <h2 className="display text-[clamp(1.9rem,3.6vw,3rem)] leading-tight text-balance"><Emphasis text={ABOUT.heading} /></h2>
        </header>
        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-14">
          <div>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {ABOUT.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about-us/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-strong">About us <ArrowRight aria-hidden className="size-4" /></Link>
              <a href={site.courseGuidePdf} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-current px-6 font-semibold transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-blush hover:text-primary-strong">IHM Course Guide <FileText aria-hidden className="size-4" /></a>
            </div>
          </div>
          <div className="relative flex flex-col">
            <span aria-hidden className="bg-brand-gradient absolute -top-4 -right-2 bottom-12 left-10 rounded-card opacity-25 md:-right-4" />
            <figure className="relative aspect-[5/4] overflow-hidden rounded-card shadow-[0_40px_80px_-40px_hsl(5_60%_30%/0.55)] lg:aspect-auto lg:min-h-[22rem] lg:flex-1">
              <Image src={ABOUT.image.src} alt={ABOUT.image.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover object-[center_65%]" />
            </figure>
            <dl className="relative -mt-10 grid grid-cols-2 gap-3 px-4 sm:grid-cols-4 lg:grid-cols-2 lg:px-6 xl:grid-cols-4">
              {KEY_FACTS.map((f) => (
                <div key={f.label} className="rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
                  <dt className="label-mono text-[10px] text-muted-foreground">{f.label}</dt>
                  <dd className="display mt-1 text-xl text-primary-strong">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Course chooser */}
      <Section tone="muted" anchorId="courses">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Study with IHM" heading="Choose the best *course* for you" className="mb-0" />
          <div className="flex flex-wrap gap-3">
            <Link href="/courses/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-foreground shadow-[0_10px_24px_-14px_hsl(5_85%_45%/0.8)] transition-all hover:-translate-y-0.5 hover:bg-primary-strong hover:text-primary-foreground">Find your perfect course <ArrowRight aria-hidden className="size-4" /></Link>
          </div>
        </div>
        <CourseChooser groups={SCHOOLS} />
      </Section>

      {/* QILT results */}
      <section id="qilt" data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden py-16 text-ink-foreground md:py-24">
        <HeroRays id="qilt-rays" className="-top-40 -right-40 -z-10 w-[36rem] opacity-[0.08]" />
        <div className="mx-auto grid max-w-site gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="label-mono mb-5 flex items-center gap-3 text-secondary"><span aria-hidden className="bg-brand-gradient h-0.5 w-8 rounded-full" />Student experience</p>
            <h2 className="display text-[clamp(1.9rem,3.6vw,3rem)] leading-tight">Overall postgraduate results for <em className="font-normal text-secondary">Institute of Health and Management</em></h2>
            <div className="mt-6 space-y-4 text-ink-foreground/80">
              <p><a href="https://qilt.edu.au/" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink-foreground underline decoration-secondary underline-offset-4">The Quality Indicators for Learning and Teaching (QILT)</a> {QILT.intro[0]}</p>
              {QILT.intro.slice(1).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href={QILT.surveyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-secondary px-6 font-semibold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary">Check survey <ArrowUpRight aria-hidden className="size-4" /></a>
              <span className="rounded-xl bg-white px-4 py-2"><Image src="/images/home/qilt-logo.svg" alt="QILT – Quality Indicators for Learning and Teaching" width={120} height={40} unoptimized className="h-8 w-auto" /></span>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {QILT.stats.map((s, i) => (
              <div key={s.label} className={`group rounded-2xl border border-ink-foreground/10 bg-ink-raised/70 p-5 transition-colors hover:border-secondary/50 ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}>
                <dd className="display text-[clamp(2.2rem,4vw,3.2rem)] leading-none">
                  <CountUp value={s.value} decimals={s.value % 1 ? 1 : 0} suffix="%" className={i % 2 ? 'text-secondary' : 'text-primary'} />
                </dd>
                <dt className="mt-3 text-sm leading-snug text-ink-foreground/80">{s.label}</dt>
                <div aria-hidden className="mt-4 h-1 overflow-hidden rounded-full bg-ink-foreground/10"><div className="bg-brand-gradient h-full rounded-full" style={{ width: `${s.value}%` }} /></div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features */}
      <Section anchorId="features">
        <SectionHeader eyebrow="Why IHM" heading="Our *features*" />
        <ul className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => {
            const I = FEATURE_ICONS[f.icon] ?? Sparkles
            return (
              <li key={f.title} className="reveal group relative overflow-hidden rounded-card border border-border bg-card p-8 shadow-[0_18px_40px_-28px_hsl(348_35%_13%/0.28)] transition-all duration-300 hover:-translate-y-1">
                <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />
                <span className={`grid size-14 place-items-center rounded-2xl ${i % 2 ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong'} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}><I aria-hidden className="size-7" /></span>
                <h3 className="display mt-6 text-2xl">{f.title}</h3>
                <p className="mt-3 text-muted-foreground">{f.body}</p>
              </li>
            )
          })}
        </ul>
      </Section>

      {testimonials.length > 0 && (
        <RenderBlocks blocks={[{ blockType: 'testimonials', tone: 'muted', heading: 'In their *words*', variant: 'carousel', inline: testimonials } as AnyBlock]} />
      )}

      {posts.length > 0 && (
        <Section anchorId="latest-blogs">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader eyebrow="From the blog" heading="Latest *blogs*" className="mb-0" />
            <Link href="/blog/" className="inline-flex items-center gap-2 font-semibold text-primary-strong underline-offset-4 hover:underline">All blogs <ArrowRight aria-hidden className="size-4" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>
        </Section>
      )}

      {/* Statement */}
      <section data-tone="sunrise" className="bg-sunrise-glow relative isolate overflow-hidden py-16 md:py-20">
        <HeroRays id="cta-statement-rays" className="-bottom-40 -left-32 -z-10 w-[30rem] opacity-20 mix-blend-soft-light" />
        <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
          <Sparkles aria-hidden className="mx-auto size-8 text-ink/70" />
          <p className="display mt-6 text-[clamp(1.5rem,2.8vw,2.3rem)] leading-snug text-ink">{CTA_STATEMENT}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground transition-all hover:-translate-y-0.5">Enquire now <ArrowRight aria-hidden className="size-4" /></Link>
            <Link href="/courses/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-card px-6 font-semibold transition-all hover:-translate-y-0.5">Browse courses</Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <Section anchorId="quick-links">
        <SectionHeader eyebrow="Helpful resources" heading="Quick *links*" />
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {QUICK_LINKS.map((l, i) => {
            const I = LINK_ICONS[l.icon] ?? FileText
            return (
              <li key={l.href}>
                <Link href={l.href} className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_40px_-26px_hsl(5_60%_30%/0.5)]">
                  <span className={`grid size-12 place-items-center rounded-xl ${i % 2 ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong'}`}><I aria-hidden className="size-6" /></span>
                  <span className="font-semibold leading-snug">{l.label}</span>
                  <ArrowUpRight aria-hidden className="mt-auto size-4 text-primary-strong transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-card bg-ink px-6 py-6 text-ink-foreground sm:flex-row md:px-10">
          <p className="display text-xl md:text-2xl">Would you like to learn more? Give us a call right away!</p>
          <a href={telHref(site.phone)} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-secondary px-6 font-semibold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary"><Phone aria-hidden className="size-4" />{site.phone}</a>
        </div>
      </Section>
    </>
  )
}
