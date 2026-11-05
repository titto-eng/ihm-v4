'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Check, FileUp, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { pushOnce } from '@/components/tracking/datalayer'
import { buildEnquirySchema } from '@/lib/enquiries/schema'
import type { PublicFormDef } from '@/lib/enquiries/types'
import { cn } from '@/lib/cn'
import { FieldControl, attribution, captchaToken, cookie, leadEventFor, loadRecaptcha } from './EnquiryFormClient'

// The adjunct application (40-enquiries §7, form `adjunct-application`): the live page's three steps — applicant details, proposed
// appointment and eligibility, declarations with a review — on the SAME zod schema the server builds. On submit the CV goes to
// POST /api/enquire/upload/ first (saved before anything else), then the enquiry posts to /api/enquire/ with the file reference.
type Values = Record<string, string | boolean>
const STEPS = [
  { key: 'A', label: 'Applicant details', fields: ['name', 'preferredName', 'email', 'phone', 'postalAddress', 'orcid', 'profile', 'applicationOrigin', 'ihmContact'] },
  { key: 'B', label: 'Proposed appointment & eligibility', fields: ['appointmentType', 'adjunctLevel', 'hostSchool', 'cv'] },
  { key: 'C', label: 'Declarations and consent', fields: [] as string[] },
] as const
const WIDE = new Set(['postalAddress', 'ihmContact', 'hostSchool'])
const CV_TYPES = /\.(pdf|docx?)$/i
const CV_MAX = 10 * 1024 * 1024
const ERROR_FALLBACK = 'We could not save your application. Please try again in a moment, or email People and Culture.'

export function AdjunctApplicationForm({ def }: { def: PublicFormDef }) {
  const fileField = def.fields.find((f) => f.type === 'file')
  // The browser validates everything but the file reference (it exists only after the upload, at submit).
  const schema = useMemo(() => buildEnquirySchema({ fields: def.fields.filter((f) => f.type !== 'file') }), [def])
  const defaults = useMemo(() => Object.fromEntries(def.fields.filter((f) => f.type !== 'file').map((f) => [f.name, f.type === 'checkbox' ? false : ''])) as Values, [def])
  const form = useForm<Values>({ resolver: zodResolver(schema as never) as never, defaultValues: defaults, mode: 'onTouched' })
  const [step, setStep] = useState(0)
  const [reached, setReached] = useState(0)
  const [cv, setCv] = useState<File | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [cvRef, setCvRef] = useState<{ file: File; ref: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)
  const [submissionId] = useState(() => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : ''))
  const top = useRef<HTMLDivElement>(null)

  const values = useWatch({ control: form.control }) as Values

  useEffect(() => { if (def.captcha) loadRecaptcha() }, [def])

  const byName = (n: string) => def.fields.find((f) => f.name === n)
  const checkCv = (f: File | null): string | null => {
    if (!f) return `${fileField?.label ?? 'Your CV'} is required`
    if (!CV_TYPES.test(f.name)) return 'Please upload a PDF, DOC or DOCX file.'
    if (f.size > CV_MAX) return 'Your CV must be 10MB or smaller.'
    if (!f.size) return 'Your CV file is empty. Please choose a valid file.'
    return null
  }

  async function go(to: number) {
    if (to > step) {
      for (let s = step; s < to; s++) {
        const names = STEPS[s].fields.filter((n) => n !== 'cv')
        const ok = await form.trigger(names as string[], { shouldFocus: true })
        const cvMsg = STEPS[s].fields.includes('cv' as never) ? checkCv(cv) : null
        setCvError(cvMsg)
        if (!ok || cvMsg) { setStep(s); return }
      }
    }
    setStep(to)
    setReached((r) => Math.max(r, to))
    setFormError(null)
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function onSubmit(values: Values) {
    setFormError(null)
    const cvMsg = checkCv(cv)
    if (cvMsg) { setCvError(cvMsg); setStep(1); return }
    setBusy(true)
    try {
      // 1. The CV (once per chosen file: a retry after a failed enquiry reuses the stored file).
      let ref = cvRef && cvRef.file === cv ? cvRef.ref : null
      if (!ref) {
        const body = new FormData()
        body.set('formKey', def.key)
        body.set('field', fileField?.name ?? 'cv')
        body.set('file', cv!)
        const up = await fetch('/api/enquire/upload/', { method: 'POST', body })
        const uj = (await up.json().catch(() => ({}))) as { ok?: boolean; file?: string; message?: string }
        if (!up.ok || !uj.ok || !uj.file) { setCvError(uj.message ?? 'We could not upload your CV. Please try again.'); setStep(1); return }
        ref = uj.file
        setCvRef({ file: cv!, ref })
      }
      // 2. The application.
      const attr = attribution()
      const envelope = {
        formKey: def.key,
        submissionId: submissionId || crypto.randomUUID(),
        fields: { ...values, [fileField?.name ?? 'cv']: ref },
        ...attr,
        hutk: cookie('hubspotutk'),
        pageUrl: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || undefined,
        landingPath: window.location.pathname,
        _hp_url: (document.getElementById('aa-hp') as HTMLInputElement | null)?.value ?? '',
        captchaToken: def.captcha ? await captchaToken() : undefined,
      }
      const res = await fetch('/api/enquire/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(envelope) })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; fieldErrors?: Record<string, string>; enquiryId?: string }
      if (res.ok && json.ok) {
        try { pushOnce(`lead:${envelope.submissionId}`, leadEventFor(def, values, attr.campaign, json.enquiryId)) } catch { /* tracking only */ }
        setDone(json.enquiryId ?? '')
        top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (res.status === 400 && json.fieldErrors) {
        let first: number | null = null
        for (const [name, message] of Object.entries(json.fieldErrors)) {
          if (name === (fileField?.name ?? 'cv')) { setCvRef(null); setCvError(message); first = first ?? 1; continue }
          form.setError(name, { type: 'server', message })
          const s = STEPS.findIndex((x) => (x.fields as readonly string[]).includes(name))
          first = Math.min(first ?? 2, s === -1 ? 2 : s)
        }
        if (first !== null) setStep(first)
        setFormError('Please check the highlighted fields.')
        return
      }
      setFormError(json.message ?? (res.status >= 500 ? ERROR_FALLBACK : 'Something went wrong. Please try again.'))
    } catch {
      setFormError('We could not reach the server. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  if (done !== null) {
    return (
      <div ref={top} role="status" className="rounded-card border border-border bg-card p-8" data-testid="enquiry-success">
        <span className="bg-brand-gradient grid size-12 place-items-center rounded-full"><Check aria-hidden className="size-6" /></span>
        <h3 className="display mt-4 text-2xl">Your application has been submitted</h3>
        <p className="mt-2 text-muted-foreground">Thank you. The Research Coordinator checks applications for completeness and eligibility, usually within 5 business days. A confirmation is on its way to your email.{done ? ` Reference: ${done}.` : ''}</p>
      </div>
    )
  }

  const label = (n: string) => byName(n)?.label ?? n
  const display = (n: string) => {
    const f = byName(n)
    const v = values[n]
    if (f?.type === 'select') return f.options?.find((o) => o.value === v)?.label ?? '—'
    return typeof v === 'string' && v ? v : '—'
  }
  const declarations = def.fields.filter((f) => f.type === 'checkbox')
  const pct = ((step + 1) / STEPS.length) * 100

  return (
    <div ref={top} className="scroll-mt-28 overflow-hidden rounded-card border border-border bg-card shadow-[0_24px_60px_-40px_hsl(348_35%_13%/0.5)]">
      <div className="border-b border-border bg-blush/40 px-5 pt-5 pb-4 md:px-8">
        <p className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground"><span>Step {step + 1} of {STEPS.length}</span><span className="font-semibold text-foreground">{STEPS[step].label}</span></p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"><div className="bg-brand-gradient h-full transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${pct}%` }} /></div>
        <ol className="mt-4 grid grid-cols-3 gap-2">
          {STEPS.map((s, i) => (
            <li key={s.key}>
              <button type="button" disabled={i > reached || busy} onClick={() => go(i)} aria-current={i === step ? 'step' : undefined}
                className={cn('flex min-h-14 w-full items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-xs font-semibold transition-colors disabled:opacity-45 sm:text-sm', i === step ? 'border-ink bg-ink text-ink-foreground' : 'border-border bg-card hover:border-primary/50')}>
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-current text-[11px]">{i < reached && i !== step ? <Check aria-hidden className="size-3.5" /> : i + 1}</span>
                <span className="min-w-0 [overflow-wrap:anywhere]">{s.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <Form {...form}>
        <form noValidate onSubmit={(e) => {
          // Enter in an earlier step moves on instead of submitting.
          if (step < 2) { e.preventDefault(); void go(step + 1); return }
          return form.handleSubmit(onSubmit, () => setFormError('Please check the highlighted fields.'))(e)
        }} data-form-key={def.key} aria-label="Adjunct application form" className="px-5 py-6 md:px-8 md:py-8">
          <p className="mb-6 text-sm text-muted-foreground">Fields marked * are required. Your entries are kept as you move between steps.</p>

          {step < 2 && (
            <div className="grid gap-5 md:grid-cols-2">
              {STEPS[step].fields.map((n) => {
                const f = byName(n)
                if (!f) return null
                if (f.type === 'file') {
                  return (
                    <div key={n} className="md:col-span-2">
                      <label htmlFor="aa-cv" className="text-sm font-medium">{f.label}{f.required ? <span aria-hidden> *</span> : null}</label>
                      <label htmlFor="aa-cv" className={cn('mt-2 flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed p-5 transition-colors hover:border-primary/60', cvError ? 'border-destructive' : 'border-border')}>
                        <FileUp aria-hidden className="size-8 shrink-0 text-primary" />
                        <span className="min-w-0 text-sm"><span className="block font-semibold [overflow-wrap:anywhere]">{cv ? cv.name : 'Choose your CV'}</span><span className="text-muted-foreground">{cv ? `${(cv.size / 1024 / 1024).toFixed(1)} MB` : 'One PDF, DOC or DOCX file, maximum 10MB.'}</span></span>
                      </label>
                      <input id="aa-cv" type="file" className="sr-only" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        aria-invalid={Boolean(cvError)} aria-describedby={cvError ? 'aa-cv-error' : undefined}
                        onChange={(e) => { const file = e.target.files?.[0] ?? null; setCv(file); setCvError(file ? checkCv(file) : null) }} />
                      {cvError && <p id="aa-cv-error" role="alert" className="mt-2 text-sm font-medium text-destructive">{cvError}</p>}
                    </div>
                  )
                }
                return (
                  <FormField key={n} control={form.control} name={n} render={({ field }) => (
                    <FormItem className={cn('min-w-0', (WIDE.has(n) || f.type === 'textarea') && 'md:col-span-2')}>
                      <FormLabel>{f.label}{f.required ? <span aria-hidden> *</span> : null}</FormLabel>
                      <FieldControl f={f} field={field} campuses={[]} courses={[]} countries={[]} />
                      <FormMessage />
                    </FormItem>
                  )} />
                )
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <details className="rounded-2xl border border-border p-4">
                <summary className="cursor-pointer text-sm font-semibold text-primary-strong">Review your application</summary>
                {[0, 1].map((s) => (
                  <div key={s} className="mt-4 border-t border-border pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-semibold">{STEPS[s].label}</h4>
                      <button type="button" onClick={() => go(s)} className="inline-flex items-center gap-1 text-sm text-primary-strong underline-offset-4 hover:underline"><Pencil aria-hidden className="size-3.5" />Edit</button>
                    </div>
                    <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                      {STEPS[s].fields.map((n) => (
                        <div key={n} className="min-w-0">
                          <dt className="text-xs text-muted-foreground">{label(n)}</dt>
                          <dd className="whitespace-pre-wrap [overflow-wrap:anywhere]">{n === 'cv' ? (cv?.name ?? '—') : display(n)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </details>
              <p className="text-sm text-muted-foreground">Confirm each declaration below. All six are required.</p>
              <div className="grid gap-3">
                {declarations.map((f) => (
                  <FormField key={f.name} control={form.control} name={f.name} render={({ field }) => (
                    <FormItem className="rounded-2xl bg-muted/60 p-4">
                      <div className="flex items-start gap-3">
                        <FormControl><Checkbox checked={field.value === true} onCheckedChange={(c) => field.onChange(c === true)} onBlur={field.onBlur} /></FormControl>
                        <FormLabel className="text-sm font-normal leading-snug">{f.label}{f.required ? ' *' : ''}</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                ))}
              </div>
              {def.consentText && <p className="text-xs text-muted-foreground">{def.consentText}</p>}
            </div>
          )}

          {def.honeypot && (
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Leave this field empty<input id="aa-hp" type="text" name="_hp_url" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
            </div>
          )}

          {formError && <p role="alert" data-testid="enquiry-error" className="mt-6 text-sm font-medium text-destructive">{formError}</p>}
          <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
            <Button type="button" variant="outline" size="lg" disabled={step === 0 || busy} onClick={() => go(step - 1)}>Previous</Button>
            {step < 2
              ? <Button type="button" size="lg" disabled={busy} onClick={() => go(step + 1)}>Next step</Button>
              : <Button type="submit" size="lg" disabled={busy}>{busy ? 'Submitting…' : 'Submit application'}</Button>}
          </div>
        </form>
      </Form>
    </div>
  )
}
