'use client'

import { useEffect, useRef, useState } from 'react'

// Counts a figure up once it scrolls into view. The final value is the server HTML and what assistive tech reads,
// so crawlers and no-JS visitors see the real number; reduced motion skips the animation.
export function CountUp({ value, decimals = 0, suffix = '', className }: { value: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState<number | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400)
        setShown(value * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      setShown(0)
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  const f = (n: number) => n.toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const text = f(shown ?? value)
  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{text}{suffix}</span>
      <span className="sr-only">{f(value)}{suffix}</span>
    </span>
  )
}
