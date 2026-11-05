// Legacy alias: Airwallex is configured today to POST to /airwallex-webhook/ (45-payments §5, DEC-5).
// Keep it alive until the gateway config is repointed at /api/payments/webhook/airwallex/.
export { POST } from '@/app/api/payments/webhook/airwallex/route'
export const dynamic = 'force-dynamic'
