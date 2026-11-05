'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { GA_PATHWAYS, GA_QUIZ } from '@/content/gcan-anp'

function Group({ name, legend, items, value, set }: { name: string; legend: string; items: readonly (readonly string[])[]; value: string | null; set: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="label-mono mb-3 text-[11px] text-secondary">{legend}</legend>
      <div className="grid gap-2">
        {items.map(([id, label]) => (
          <label key={id} className={cn('flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm transition-colors', value === id ? 'border-secondary bg-ink-foreground/10' : 'border-ink-foreground/15 hover:border-ink-foreground/40')}>
            <input type="radio" name={name} value={id} checked={value === id} onChange={() => set(id)} className="mt-0.5 accent-[#edab37]" />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** "Which pathway fits me? Answer two questions." Registration status picks the pathway; the study plan adds the next step. */
export function PathwayQuiz() {
  const [reg, setReg] = useState<string | null>(null)
  const [plan, setPlan] = useState<string | null>(null)
  const pick = GA_QUIZ.registration.find(([id]) => id === reg)?.[2]
  const pathway = GA_PATHWAYS.find((p) => p.id === pick)
  return (
    <div className="grid gap-8 rounded-card bg-ink p-6 text-ink-foreground md:p-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <h3 className="display text-3xl">Which pathway fits me? <span className="text-secondary">Answer two questions.</span></h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Group name="ga-reg" legend="My registration status" items={GA_QUIZ.registration} value={reg} set={setReg} />
          <Group name="ga-plan" legend="My study plan" items={GA_QUIZ.plan} value={plan} set={setPlan} />
        </div>
      </div>
      <div aria-live="polite" className="bg-brand-gradient flex flex-col rounded-card p-6 text-foreground">
        {pathway && plan ? (
          <>
            <p className="label-mono text-[10px]">Suggested</p>
            <h4 className="display mt-2 text-3xl">{pathway.tag.split('· ')[1]}</h4>
            <p className="mt-2 font-semibold">{pathway.title}</p>
            <p className="mt-3 text-sm">{pathway.option}</p>
            {plan === 'mon' && <p className="mt-3 text-sm">Your plan includes the Master of Nursing on campus: see Part 2 for the two-qualification progression.</p>}
            <a href="#enquire" className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 pt-2.5 text-sm font-semibold text-ink-foreground">Talk to an adviser<ArrowRight aria-hidden className="size-4" /></a>
          </>
        ) : (
          <>
            <h4 className="display text-2xl">Your suggestion appears here</h4>
            <p className="mt-2 text-sm">Choose one answer in each group. An adviser will confirm what suits you.</p>
          </>
        )}
      </div>
    </div>
  )
}
