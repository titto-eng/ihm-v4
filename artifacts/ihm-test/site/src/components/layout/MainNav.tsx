'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { hasLandingPage, isWidePanel, linkCount } from './nav-utils'

export type NavLink = { label: string; href: string }
export type NavGroup = { heading?: string | null; href?: string; highlight?: boolean; links: NavLink[] }
export type NavItem = NavLink & { groups: NavGroup[] }

// Tighter at xl (1280-1535px), roomier from 2xl, so all items fit on one line from 1280px up (05 §4.2).
const trigger = 'h-10 rounded-full bg-transparent px-3 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-blush hover:text-primary-strong data-[state=open]:bg-blush data-[state=open]:text-primary-strong 2xl:px-4 2xl:text-[15px]'
const subLink = 'block rounded-lg px-3 py-2 text-[15px] leading-snug font-medium text-pretty transition-colors hover:bg-blush hover:text-primary-strong'
const viewAll = 'inline-flex rounded-none px-0 text-sm font-semibold text-primary-strong underline underline-offset-4 hover:bg-transparent'

function SubLinks({ links, className, itemClassName }: { links: NavLink[]; className?: string; itemClassName?: string }) {
  return (
    <ul className={cn('space-y-0.5', className)}>
      {links.map((l) => (
        <li key={l.href + l.label} className={itemClassName}>
          <NavigationMenuLink asChild><Link href={l.href} className={subLink}>{l.label}</Link></NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}


/** A group heading: a school name in the brand accent, linked when the school has a page. */
function GroupHeading({ group, className }: { group: NavGroup; className?: string }) {
  if (!group.heading) return null
  const label = 'label-mono text-[11px] leading-relaxed tracking-widest text-accent'
  return group.href ? (
    <NavigationMenuLink asChild>
      <Link href={group.href} className={cn(label, 'group/heading inline-flex flex-row items-center gap-1.5 rounded-lg px-3 py-1 hover:bg-blush hover:text-primary-strong', className)}>
        {group.heading}<ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover/heading:translate-x-0.5 group-hover/heading:-translate-y-0.5" />
      </Link>
    </NavigationMenuLink>
  ) : <p className={cn(label, 'px-3', className)}>{group.heading}</p>
}

/** Highlighted links (How to Apply, Find your perfect course): gradient tiles with an arrow. */
function HighlightTiles({ links }: { links: NavLink[] }) {
  return (
    <ul className="mt-6 space-y-2">
      {links.map((l) => (
        <li key={l.href + l.label}>
          <NavigationMenuLink asChild>
            <Link href={l.href} className="bg-brand-gradient group/tile flex flex-row items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-shadow hover:shadow-md">
              {l.label}<ArrowRight aria-hidden className="size-4 transition-transform group-hover/tile:translate-x-1" />
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}

// Mega-menu (05 §4.2, DEC-70). Radix navigation-menu gives keyboard operation, Escape and outside-click close.
// Wide panels (several groups or many links) span the header bar, centred and capped at 64rem; compact ones drop under their
// trigger, opening leftwards for items in the right half. Panels never exceed the viewport and scroll inside when tall.
export function MainNav({ items }: { items: NavItem[] }) {
  const ref = useRef<HTMLElement>(null)
  const [panelTop, setPanelTop] = useState<number | null>(null)
  // On open, record where the header ends so the panel's max-height fits the space left in the viewport.
  const onValueChange = (value: string) => {
    const bottom = value ? ref.current?.closest('header')?.getBoundingClientRect().bottom : undefined
    if (bottom) setPanelTop(Math.round(bottom))
  }
  const style = panelTop ? ({ '--nav-panel-top': `${panelTop}px` } as CSSProperties) : undefined

  return (
    <NavigationMenu
      ref={ref}
      viewport={false}
      onValueChange={onValueChange}
      style={style}
      // static (and the Radix list wrapper static) so a wide panel's containing block is the header bar.
      className="static max-w-none [&>div]:static!"
      aria-label="Main"
    >
      <NavigationMenuList className="gap-0.5 2xl:gap-1">
        {items.map((item, index) => {
          if (!item.groups.length) {
            return (
              <NavigationMenuItem key={item.href + item.label}>
                <NavigationMenuLink asChild>
                  <Link href={item.href} className={cn(trigger, 'inline-flex items-center justify-center')}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }
          const wide = isWidePanel(item.groups)
          const highlight = item.groups.find((g) => g.highlight)
          const regular = item.groups.filter((g) => !g.highlight)
          const single = regular.length === 1 && !highlight
          return (
            <NavigationMenuItem key={item.href + item.label} className={wide ? 'static' : undefined}>
              <NavigationMenuTrigger className={trigger}>{item.label}</NavigationMenuTrigger>
              {wide ? (
                <NavigationMenuContent className="inset-x-8 mx-auto max-w-[68rem] md:overflow-hidden md:rounded-card md:border-t-4 md:border-t-primary md:bg-card md:p-0 md:shadow-xl">
                  <div className={cn('grid gap-x-8 p-6 2xl:p-8', highlight ? 'grid-cols-[13rem_1fr] 2xl:grid-cols-[15rem_1fr]' : 'grid-cols-[9.5rem_1fr] 2xl:grid-cols-[11rem_1fr]')}>
                    <div className="border-r border-border pr-6">
                      <span aria-hidden className="bg-brand-gradient mb-4 block h-1 w-10 rounded-full" />
                      <p className="display text-2xl">{item.label}</p>
                      {hasLandingPage(item.href) && (
                        <NavigationMenuLink asChild>
                          <Link href={item.href} className={cn(viewAll, 'mt-3')}>View all {item.label.toLowerCase()}</Link>
                        </NavigationMenuLink>
                      )}
                      {highlight && <HighlightTiles links={highlight.links} />}
                    </div>
                    {single ? (
                      <SubLinks
                        links={item.groups[0].links}
                        className={cn('gap-6', linkCount(item.groups) > 12 ? 'columns-3' : 'columns-2')}
                        itemClassName="break-inside-avoid"
                      />
                    ) : (
                      <div className="columns-2 gap-8">
                        {regular.map((g, gi) => (
                          <div key={gi} className="mb-6 break-inside-avoid rounded-2xl bg-background/60 p-2">
                            <GroupHeading group={g} className="mb-1" />
                            <SubLinks links={g.links} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </NavigationMenuContent>
              ) : (
                <NavigationMenuContent
                  className={cn(
                    'md:w-[min(18rem,calc(100vw-2.5rem))] md:rounded-card md:border-t-4 md:border-t-primary md:bg-card md:p-2 md:shadow-xl',
                    // the trigger sits 16px above the 72px bar's bottom edge: drop the panel to line up with the wide ones
                    // (same group variant as the primitive's mt-1.5 so it wins)
                    'group-data-[viewport=false]/navigation-menu:mt-[22px]',
                    index >= items.length / 2 && 'right-0 left-auto',
                  )}
                >
                  {item.groups.map((g, gi) => (
                    <div key={gi}>
                      <GroupHeading group={g} className="mt-2 mb-1" />
                      <SubLinks links={g.links} />
                    </div>
                  ))}
                  {hasLandingPage(item.href) && (
                    <NavigationMenuLink asChild>
                      <Link href={item.href} className={cn(viewAll, 'mx-3 mt-2 mb-2')}>View all {item.label.toLowerCase()}</Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
