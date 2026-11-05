'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/cn'

// next/image for CMS media. With `trailingSlash: true` Next hands the optimiser `/api/media/file/x.jpg/`, which
// Payload answers with a 308, so the optimised image never loads. Local media is served as-is until next.config
// gets a loader (see report); remote URLs (S3 later) still go through the optimiser.
// When a file is missing (a fresh database before `npm run import -- media`, or a deleted upload) the slot shows a
// branded placeholder of the same size instead of the browser's broken-image icon and alt text.
export default function MediaImage(props: ImageProps) {
  const local = typeof props.src === 'string' && props.src.startsWith('/api/media/')
  const ref = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)

  // An image that failed before hydration never fires onError on the client: check it once mounted.
  useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0 && el.currentSrc) setFailed(true)
  }, [])

  if (failed) {
    const ratio = !props.fill && props.width && props.height ? `${props.width} / ${props.height}` : undefined
    return (
      <span
        role={props.alt ? 'img' : undefined}
        aria-label={props.alt || undefined}
        aria-hidden={props.alt ? undefined : true}
        className={cn('bg-brand-wash overflow-hidden', props.fill && 'absolute inset-0', props.className, 'grid place-items-center')}
        style={{ ...(ratio ? { aspectRatio: ratio } : null), ...props.style }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/ihm-mark.svg" alt="" width={114} height={147} className="h-auto w-[18%] max-w-24 min-w-10 opacity-60" />
      </span>
    )
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image ref={ref} {...props} unoptimized={local || props.unoptimized} onError={() => setFailed(true)} />
}
