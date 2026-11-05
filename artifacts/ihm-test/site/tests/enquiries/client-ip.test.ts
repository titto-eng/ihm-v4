import { describe, expect, it } from 'vitest'
import { clientIp } from '@/lib/enquiries/request'
import { ipOf } from '@/lib/alumni/rateLimit'

// 90-security §4 "Client IP": the enquiry, payment and receipt limiters key on the platform's client address, never on the
// leftmost X-Forwarded-For entry, which the client writes itself.
describe('clientIp', () => {
  it('takes the rightmost X-Forwarded-For entry, so a spoofed leftmost value does not change the bucket', () => {
    const h = new Headers({ 'x-forwarded-for': '1.2.3.4, 198.51.100.7' })
    expect(clientIp(h)).toBe('198.51.100.7')
    expect(clientIp(new Headers({ 'x-forwarded-for': '9.9.9.9, 8.8.8.8, 198.51.100.7' }))).toBe('198.51.100.7')
    expect(clientIp(new Headers({ 'x-forwarded-for': `${Math.random()}, 198.51.100.7` }))).toBe('198.51.100.7')
  })
  it('prefers the platform headers over X-Forwarded-For', () => {
    expect(clientIp(new Headers({ 'cf-connecting-ip': '203.0.113.5', 'x-forwarded-for': '1.2.3.4, 5.6.7.8' }))).toBe('203.0.113.5')
    expect(clientIp(new Headers({ 'x-real-ip': '203.0.113.6', 'x-forwarded-for': '1.2.3.4' }))).toBe('203.0.113.6')
  })
  it('a single-value header and no header still work', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': ' 198.51.100.9 ' }))).toBe('198.51.100.9')
    expect(clientIp(new Headers({ 'x-forwarded-for': ' , ' }))).toBe('unknown')
    expect(clientIp(new Headers())).toBe('unknown')
    expect(clientIp(new Headers({ 'x-forwarded-for': 'a'.repeat(200) })).length).toBe(64)
  })
  it('agrees with the alumni limiter for the same headers', () => {
    const cases: Record<string, string>[] = [{ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' }, { 'cf-connecting-ip': '3.3.3.3', 'x-forwarded-for': '1.1.1.1' }, { 'x-real-ip': '4.4.4.4' }, {}]
    for (const h of cases) {
      expect(clientIp(new Headers(h))).toBe(ipOf(new Headers(h)))
    }
  })
})
