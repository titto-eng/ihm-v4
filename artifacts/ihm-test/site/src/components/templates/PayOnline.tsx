import { Section } from '@/components/layout/Section'
import { PayForm, type PayProduct } from '@/components/payments/PayForm.client'
import { LeadHero } from './pageParts'

// PayOnline (05 §4.4, 45 §4): IHM's pay page at /makepayment/ (IHNA's is /pay-online/). One form: an invoice (the payer types the amount,
// the server stores and signs it) or one of the English-test products (the server price, no amount field).
export function PayOnlineView({ page, products, gateway, e2btn, invoiceId }: { page: { title: string; path: string }; contact?: { phone?: string | null; email?: string | null }; products: PayProduct[]; gateway?: string; e2btn?: number | null; invoiceId?: string | null }) {
  return (
    <>
      <LeadHero hero={{ variant: 'compact', heading: page.title, eyebrow: 'Payments' }} />
      <Section tone="default" spacing="compact" anchorId="pay">
        <div className="mx-auto max-w-3xl">
          <PayForm products={products} initialGateway={gateway} initialE2btn={e2btn ?? null} initialInvoice={invoiceId ?? undefined} />
        </div>
      </Section>
    </>
  )
}
