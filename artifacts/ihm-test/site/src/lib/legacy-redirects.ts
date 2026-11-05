// Prefix / contains rules, applied by src/proxy.ts BEFORE routing (DEC-64). Exact redirects are src/content/redirects.ts.
// Only rules whose target is live are listed (DEC-31).

export type LegacyRule =
  | { kind: 'contains'; needle: string; to: string; status: 301 | 302; note: string }
  | { kind: 'prefix'; prefix: string; to: string; status: 301 | 302; note: string }

// Live pages under a redirected prefix (landing-pages.csv live rows) are served, not redirected.
export const LEGACY_EXCEPTIONS = ['/enquirenow/scholarship/']

export const LEGACY_RULES: LegacyRule[] = [
  { kind: 'prefix', prefix: '/enquirenow/', to: '/courses/', status: 302, note: 'production already 302s enquirenow/* to /courses/ (landing-pages.csv); exposed *_bkp_*.php backups go the same way (DEC-40)' },
  { kind: 'contains', needle: 'learning-hub', to: '/', status: 301, note: 'functions.php:63' },
  { kind: 'contains', needle: 'emergency-services', to: '/external-services/', status: 301, note: 'functions.php:78' },
]

/** Returns the target for a legacy rule, or null. Exact redirects are answered by next.config.ts (src/content/redirects.ts). */
export function matchLegacyRule(pathname: string): { to: string; status: 301 | 302 } | null {
  const path = pathname.toLowerCase()
  if (LEGACY_EXCEPTIONS.some((e) => path === e || path.startsWith(e))) return null
  for (const rule of LEGACY_RULES) {
    if (rule.kind === 'prefix' && path.startsWith(rule.prefix) && path !== rule.to) return { to: rule.to, status: rule.status }
    if (rule.kind === 'contains' && path.includes(rule.needle) && path !== rule.to) return { to: rule.to, status: rule.status }
  }
  return null
}
