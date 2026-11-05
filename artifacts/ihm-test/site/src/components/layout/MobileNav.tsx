'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Menu, Phone } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CtaLink, type CtaItem } from '@/components/CtaLink'
import type { NavItem, NavLink } from './MainNav'
import { hasLandingPage, telHref } from './nav-utils'

// Below xl (1280px): a sheet with the whole menu as accordion groups, both CTAs, the phone and the utility links.
// Radix traps focus and closes on Esc (05 §4.2).
export function MobileNav({ items, utility, primary, secondary, phone }: {
  items: NavItem[]; utility: NavLink[]; primary?: CtaItem | null; secondary?: CtaItem | null; phone?: string | null
}) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu"><Menu className="size-6" /></Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(92vw,26rem)] gap-0 overflow-y-auto overscroll-contain bg-background p-0 sm:max-w-[26rem]">
        <SheetHeader className="relative border-b border-border p-5">
          <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />
          <SheetTitle className="display text-2xl">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-5 py-2">
          <Accordion type="single" collapsible>
            {items.map((item) =>
              item.groups.length ? (
                <AccordionItem key={item.href + item.label} value={item.href + item.label}>
                  <AccordionTrigger className="items-center py-4 text-lg font-semibold hover:no-underline">{item.label}</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    {hasLandingPage(item.href) && (
                      <Link href={item.href} onClick={close} className="mb-3 block text-sm font-semibold text-primary-strong underline underline-offset-4">All {item.label.toLowerCase()}</Link>
                    )}
                    {item.groups.map((g, gi) => (
                      <div key={gi} className="mb-4 last:mb-0">
                        {g.heading && (g.href
                          ? <Link href={g.href} onClick={close} className="label-mono mb-1 inline-flex items-center gap-1 text-[11px] leading-relaxed tracking-widest text-pretty text-accent underline-offset-4 hover:underline">{g.heading}<ArrowUpRight aria-hidden className="size-3" /></Link>
                          : <p className="label-mono mb-1 text-[11px] leading-relaxed tracking-widest text-pretty text-accent">{g.heading}</p>)}
                        <ul className={g.highlight ? 'mt-2 space-y-2' : undefined}>
                          {g.links.map((l) => (
                            <li key={l.href + l.label}>
                              <Link href={l.href} onClick={close} className={g.highlight ? 'bg-brand-gradient flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-foreground' : 'block py-2 text-base leading-snug text-pretty'}>
                                {l.label}{g.highlight && <ArrowRight aria-hidden className="size-4" />}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={item.href + item.label} className="border-b border-border">
                  <Link href={item.href} onClick={close} className="block py-4 text-lg font-semibold">{item.label}</Link>
                </div>
              ),
            )}
          </Accordion>
        </nav>
        <div className="flex flex-col gap-3 px-5 py-4">
          {primary && <CtaLink cta={{ ...primary, style: 'primary' }} />}
          {secondary && <CtaLink cta={{ ...secondary, style: 'secondary' }} />}
          {phone && (
            <a href={telHref(phone)} className="inline-flex items-center justify-center gap-2 py-2 font-semibold">
              <Phone aria-hidden className="size-4" />{phone}
            </a>
          )}
        </div>
        {utility.length > 0 && (
          <ul className="mt-auto grid grid-cols-2 gap-x-4 border-t border-border p-5 text-sm text-muted-foreground">
            {utility.map((l) => (
              <li key={l.href + l.label}><Link href={l.href} onClick={close} className="block py-1.5">{l.label}</Link></li>
            ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  )
}
