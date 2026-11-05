import type { Metadata } from 'next'
import { PaymentOptionsView } from '@/components/templates/PaymentOptions'
import { contactOf, intParam, invoiceParam, loadPageOrStub, loadProducts } from '@/lib/payments/pages'

// The chooser. Keeps `?invoice_id=` and `?e2btn=1..12` (45-payments §4, §5). Never cached, never indexed (45: all payment pages).
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Payment options', robots: { index: false, follow: false }, alternates: { canonical: '/payment-options/' } }

type SP = Promise<Record<string, string | string[] | undefined>>

export default async function PaymentOptions({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const e2btn = intParam(sp.e2btn, 1, 12)
  const [page, products, contact] = await Promise.all([loadPageOrStub('/payment-options/', 'Payment options'), e2btn ? loadProducts() : Promise.resolve([]), contactOf()])
  const product = e2btn ? (products.find((p) => p.legacyE2Btn === e2btn) ?? null) : null
  return <PaymentOptionsView page={page} contact={contact} product={product} e2btn={e2btn} invoiceId={invoiceParam(sp.invoice_id)} />
}
