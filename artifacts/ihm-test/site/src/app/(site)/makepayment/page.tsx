import type { Metadata } from 'next'
import { PayOnlineView } from '@/components/templates/PayOnline'
import { contactOf, gatewayParam, intParam, invoiceParam, loadPageOrStub, loadProducts } from '@/lib/payments/pages'

// IHM's pay page (DEC-11): the invoice form and the 12 English-test products from `products`. 45-payments §4. Never cached, never indexed.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Make a payment', robots: { index: false, follow: false }, referrer: 'no-referrer' }

type SP = Promise<Record<string, string | string[] | undefined>>

export default async function MakePayment({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const [page, products, contact] = await Promise.all([loadPageOrStub('/makepayment/', 'Make a payment'), loadProducts(), contactOf()])
  return <PayOnlineView page={page} contact={contact} products={products} gateway={gatewayParam(sp.gateway)} e2btn={intParam(sp.e2btn, 1, 12)} invoiceId={invoiceParam(sp.invoice_id)} />
}
