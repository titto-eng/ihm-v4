import Link from 'next/link'
import { Phone } from 'lucide-react'
import { nav } from '@/content/nav'
import { site } from '@/content/site'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { SiteLogo } from './SiteLogo'
import { MainNav, type NavItem, type NavLink } from './MainNav'
import { MobileNav } from './MobileNav'
import { telHref } from './nav-utils'

// Header CTAs never wrap: a one-line pill keeps the 72px bar's height fixed (05 §4.2).
function HeaderCta({ cta, variant, className }: { cta: NavLink; variant: 'default' | 'outline'; className?: string }) {
  return (
    <Button asChild variant={variant} size="sm" className={cn('h-10 px-4 whitespace-nowrap 2xl:px-5', className)}>
      <Link href={cta.href}>{cta.label}</Link>
    </Button>
  )
}

// Navigation comes from src/content/nav.ts, contact details from src/content/site.ts (05 §4.2, DEC-70).
// Below xl (1280px) the menu lives in the MobileNav sheet; the secondary CTA sits in the utility row below 1440px.
export function Header() {
  const items: NavItem[] = nav.menu.map((m) => ({ label: m.label, href: m.href, groups: m.groups.filter((g) => g.links.length) }))
  const utility = nav.utilityLinks
  const primary = nav.primaryCta
  const secondary = nav.secondaryCta
  const promo = nav.promoBar.enabled && nav.promoBar.label && nav.promoBar.href ? { text: nav.promoBar.text, label: nav.promoBar.label, href: nav.promoBar.href } : null

  return (
    <>
      {promo && (
        <div className="bg-ink px-5 py-2.5 text-center text-sm text-pretty text-ink-foreground">
          {promo.text && <span className="mr-2">{promo.text}</span>}
          <Link href={promo.href} className="font-semibold text-secondary underline underline-offset-4">{promo.label}</Link>
        </div>
      )}
      {(utility.length > 0 || site.phone || secondary) && (
        <div data-slot="utility-bar" className="hidden bg-ink text-sm text-ink-foreground lg:block">
          <div className="mx-auto flex h-10 max-w-site items-center justify-between gap-6 px-8">
            {site.phone ? (
              <a href={telHref(site.phone)} className="inline-flex shrink-0 items-center gap-2 font-semibold text-secondary hover:text-ink-foreground"><Phone aria-hidden className="size-3.5" />{site.phone}</a>
            ) : <span />}
            <div className="flex min-w-0 items-center gap-5 xl:gap-6">
              <ul className="flex items-center gap-5 whitespace-nowrap text-ink-foreground/75 xl:gap-6">
                {utility.map((l) => (
                  <li key={l.href + l.label}><Link href={l.href} className="underline-offset-4 transition-colors hover:text-secondary hover:underline">{l.label}</Link></li>
                ))}
              </ul>
              {secondary && (
                <Link href={secondary.href} className="shrink-0 rounded-full border border-secondary/70 px-3 py-0.5 font-semibold whitespace-nowrap text-secondary hover:bg-secondary hover:text-secondary-foreground min-[1440px]:hidden">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 shadow-[0_6px_24px_-18px_hsl(348_35%_13%/0.35)] backdrop-blur">
        {/* `relative`: the wide mega-menu panels position against this bar, not against their trigger (MainNav). */}
        <div className="relative mx-auto flex h-[72px] max-w-site items-center gap-3 px-5 md:px-8 xl:gap-4">
          <SiteLogo className="shrink-0" priority />
          <div className="hidden min-w-0 flex-1 justify-center xl:flex"><MainNav items={items} /></div>
          <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
            {secondary && <HeaderCta cta={secondary} variant="outline" className="hidden min-[1440px]:inline-flex" />}
            {primary && <HeaderCta cta={primary} variant="default" className="hidden sm:inline-flex" />}
            <MobileNav items={items} utility={utility} primary={primary} secondary={secondary} phone={site.phone} />
          </div>
        </div>
      </header>
    </>
  )
}
