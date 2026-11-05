'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { PRIMO } from '@/content/library'

/**
 * The catalogue search (the old [LibrarySearchForm]): a GET to HCI's Primo with the same fixed parameters; `query` is
 * "any,contains,<terms>" with commas replaced by spaces, as before (kept in sync from the visible field).
 */
export function LibrarySearch({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const [q, setQ] = useState('')
  return (
    <form method="get" action={PRIMO.action} role="search" aria-label="Search the library catalogue" className={cn('flex w-full max-w-2xl gap-2 rounded-full p-1.5 shadow-[0_18px_40px_-20px_hsl(0_0%_0%/0.5)]', onDark ? 'bg-card' : 'border border-border bg-card', className)}>
      <input type="hidden" name="vid" value={PRIMO.vid} />
      <input type="hidden" name="tab" value="Everything" />
      <input type="hidden" name="search_scope" value="MyInst_and_CI" />
      <input type="hidden" name="mode" value="basic" />
      <input type="hidden" name="displayMode" value="full" />
      <input type="hidden" name="bulkSize" value="10" />
      <input type="hidden" name="highlight" value="true" />
      <input type="hidden" name="dum" value="true" />
      <input type="hidden" name="query" value={`any,contains,${q.replace(/,/g, ' ')}`} />
      <input type="hidden" name="displayField" value="all" />
      <input type="hidden" name="pcAvailabiltyMode" value="true" />
      <label className="relative flex-1">
        <span className="sr-only">Search books, eBooks, journals and audio-visual materials</span>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
        <input type="search" required value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books, eBooks, journals…" className="h-12 w-full rounded-full bg-transparent pr-4 pl-12 text-[16px] text-foreground outline-none placeholder:text-muted-foreground" />
      </label>
      <button type="submit" className="h-12 shrink-0 rounded-full bg-primary px-6 font-semibold text-foreground transition-colors hover:bg-secondary">Search</button>
    </form>
  )
}
