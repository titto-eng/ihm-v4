// Legacy alias: PayWay's configured return URL is /payway-response/ (45-payments §3).
// Delegates to the new return handler; repoint PayWay at /pay/return/payway/ at cutover.
export { GET } from '@/app/(site)/pay/return/payway/route'
export const dynamic = 'force-dynamic'
