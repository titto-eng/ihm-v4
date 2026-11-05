import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

// The IHM Australia logo (public/brand/, from ihm.edu.au). `onDark` swaps to the version with white
// "Powered by Arizona State University" text for the ink footer. The SVGs are served as-is (unoptimized).
export const LOGO = { light: '/brand/ihm-logo.svg', dark: '/brand/ihm-logo-on-dark.svg', width: 366, height: 178 } as const

export function SiteLogo({ onDark = false, className, imgClassName, priority = false }: { onDark?: boolean; className?: string; imgClassName?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.siteName}, home`} className={cn('inline-flex shrink-0 items-center', className)}>
      <Image
        src={onDark ? LOGO.dark : LOGO.light}
        alt={`${site.siteName} (IHM Australia) logo`}
        width={LOGO.width}
        height={LOGO.height}
        unoptimized
        priority={priority}
        className={cn('h-12 w-auto sm:h-[3.5rem]', imgClassName)}
      />
    </Link>
  )
}
