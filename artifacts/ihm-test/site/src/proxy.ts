import { NextResponse, type NextRequest } from 'next/server'
import { matchLegacyRule } from '@/lib/legacy-redirects'
import { site } from '@/content/site'
import { buildCsp, embedHostSources } from '@/lib/seo/csp'
import { adminGuardDecision } from '@/lib/security/adminGuard'

// Next 16 "proxy" (formerly middleware). Runs at the edge: no DB access here.
// Order (00-architecture §3): 410 for WordPress internals → /admin guard → uploads pass-through → security headers.
// Trailing slashes are handled by next.config (trailingSlash: true → 308). Exact redirects live in next.config too (src/content/redirects.ts).

const GONE_PREFIXES = ['/wp-json', '/xmlrpc.php', '/wp-login.php', '/wp-admin']
const EMBED_HOSTS = embedHostSources([...site.allowedEmbedHosts])

function unauthorised() {
  return new NextResponse('Authentication required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="IHM CMS"' } })
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (GONE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return new NextResponse(null, { status: 410 })
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/') || (process.env.REPLIT_TEST_SITE === '1' && pathname.startsWith('/api/users'))) {
    // Basic auth when ADMIN_BASIC_* is set; the Cloudflare Access header counts only with ADMIN_GUARD_TRUST_CF_ACCESS=1 (90-security §4).
    if ((await adminGuardDecision(req.headers, process.env)) === 'challenge') return unauthorised()
  }

  if (process.env.REPLIT_TEST_SITE === '1' && /^\/api\/payments(?:\/|$)/.test(pathname)) {
    return NextResponse.json({ error: 'Payments are disabled on this test website.' }, { status: 503 })
  }

  const legacy = matchLegacyRule(pathname)
  if (legacy) return NextResponse.redirect(new URL(legacy.to, req.url), legacy.status)

  if (/^\/(pdf|brochures|IHM_Domestic_SHB|International-SHB)\/.+\.pdf$/i.test(pathname) && !pathname.startsWith('/pdf/~/')) return NextResponse.rewrite(new URL(`/pdf/~${pathname}`, req.url)) // `documents` collection wins over a copy in public/ (src/app/(site)/pdf/serve.ts)

  if (pathname.startsWith('/wp-content/uploads/')) {
    // Old image URLs: the route handler looks `media.legacyPath` up and answers 301 to the file. No page headers or CSP needed.
    return NextResponse.next()
  }

  const res = NextResponse.next()
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // CSP (90-security §4, DEC-21): script/connect/frame are Report-Only, the safe three are enforced.
  // `frame-src` includes site.allowedEmbedHosts (src/content/site.ts); no lookup, no DB.
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const csp = buildCsp({ embedHosts: isAdmin ? [] : EMBED_HOSTS, admin: isAdmin, dev: process.env.NODE_ENV !== 'production' })
  res.headers.set('Content-Security-Policy', csp.enforced)
  res.headers.set('Content-Security-Policy-Report-Only', csp.reportOnly)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|media/|api/media/).*)'],
}
