import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
const mode = process.argv[2] || 'start'
if (!process.env.ADMIN_BASIC_PASSWORD) throw new Error('Admin gate secret required')
Object.assign(process.env, {
  LOCAL_DEV: '0',
  ADMIN_BASIC_HASH: createHash('sha256').update(process.env.ADMIN_BASIC_PASSWORD).digest('hex'),
  ADMIN_BASIC_USER: 'ihm-test', REPLIT_TEST_SITE: '1', DRY_RUN: '1', PAYMENTS_DRY_RUN: '1',
  PAYMENTS_ALLOW_PRODUCTION: '0', TRACKING_ENABLED: '0', NEXT_PUBLIC_ROBOTS: 'noindex',
  PORTAL_ENABLED: '0', DISABLE_DB_PUSH: '1', ENQUIRY_LIVE_ADAPTERS: '', ADMIN_GUARD_TRUST_CF_ACCESS: '0',
  NEXT_TELEMETRY_DISABLED: '1', HOSTNAME: '0.0.0.0',
  ENQUIRY_AUTORUN: mode === 'standalone' ? '1' : '0',
})
// Workspace URL is used only for development. Published builds must have their own configured URL.
if (!process.env.NEXT_PUBLIC_SITE_URL && process.env.REPLIT_DEV_DOMAIN && mode !== 'publish-build') {
  process.env.NEXT_PUBLIC_SITE_URL = `https://${process.env.REPLIT_DEV_DOMAIN}`
}
if (!process.env.NEXT_PUBLIC_SITE_URL) throw new Error('Set NEXT_PUBLIC_SITE_URL to the test deployment URL before publishing')
const args = mode === 'standalone' ? ['.next/standalone/server.js'] : mode === 'check' ? ['run','check'] : mode.endsWith('build') ? ['run','build'] : ['run','dev','--','--hostname','0.0.0.0']
const child = spawn(mode === 'standalone' ? 'node' : 'npm', args, { stdio: 'inherit', env: process.env })
for (const sig of ['SIGTERM','SIGINT']) process.on(sig, () => child.kill(sig))
child.on('exit', code => process.exit(code ?? 1))
