/**
 * The platform's client address (90-security §4 "Client IP"). Never the leftmost `X-Forwarded-For` entry: the client writes that
 * one, so a spoofed multi-value header would give it a fresh rate-limit bucket per request. Order: `cf-connecting-ip`,
 * `x-vercel-forwarded-for`, `x-real-ip`, then the rightmost `X-Forwarded-For` entry (the hop our own proxy appended), else `unknown`.
 */
export function clientIp(headers: Headers): string {
  const direct = headers.get('cf-connecting-ip') ?? headers.get('x-vercel-forwarded-for') ?? headers.get('x-real-ip')
  const xff = headers.get('x-forwarded-for')?.split(',').map((s) => s.trim()).filter(Boolean).pop()
  return (direct?.trim() || xff || 'unknown').slice(0, 64)
}
