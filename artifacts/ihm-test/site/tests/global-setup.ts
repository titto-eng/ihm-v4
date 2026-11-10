// Runs once before `npm run test:int`. The integration suites need the docker-compose services (00-architecture §Commands):
// Postgres (Payload), the portal-mysql fixture DB with the fixtures loaded, and Mailpit. When one is missing, every suite that
// uses it fails with a connection error, so stop early with one message that says exactly what to start.
import 'dotenv/config'
import net from 'node:net'
import mysql from 'mysql2/promise'

const reachable = (host: string, port: number, ms = 1500) =>
  new Promise<boolean>((resolve) => {
    const s = net.connect({ host, port })
    const done = (ok: boolean) => { s.destroy(); resolve(ok) }
    s.setTimeout(ms, () => done(false))
    s.once('connect', () => done(true))
    s.once('error', () => done(false))
  })

/** The fixture DB answers for the fixture read user (WAMP's MariaDB also listens on 3307 and refuses it). */
async function portalFixtureProblem(port: number): Promise<string | null> {
  let c: mysql.Connection | undefined
  try {
    c = await mysql.createConnection({ host: '127.0.0.1', port, user: 'portal_ro', password: 'portal_ro', database: 'ihmedu_portal', connectTimeout: 3000 })
    const [rows] = await c.query("SELECT COUNT(*) AS n FROM payments WHERE invoice_number IN ('FIX-INV-0001', 'FIX-INV-0002', 'FIX-E2-0001')")
    const [courses] = await c.query('SELECT COUNT(*) AS n FROM courses WHERE id IN (41, 9101, 9107)')
    return (rows as { n: number }[])[0]?.n === 3 && (courses as { n: number }[])[0]?.n === 3
      ? null : `portal fixture rows are missing on 127.0.0.1:${port}: run npm run db:fixtures (all four SQL files)`
  } catch (e) {
    const code = (e as { code?: string }).code ?? String(e)
    if (code === 'ER_ACCESS_DENIED_ERROR' || code === 'ER_BAD_DB_ERROR')
      return `127.0.0.1:${port} is another MySQL/MariaDB, not the fixture container (${code}). WAMP's MariaDB uses 3307: either stop it while testing, or add PORTAL_FIXTURE_PORT=3308 to .env, then  docker compose up -d portal-mysql  and  npm run db:fixtures`
    if (code === 'ER_NO_SUCH_TABLE' || code === 'ER_BAD_FIELD_ERROR')
      return `portal fixture schema is missing or stale (${code}): run npm run db:fixtures (all four SQL files)`
    return `portal-mysql is not reachable on 127.0.0.1:${port} (${code})`
  } finally {
    await c?.end()
  }
}

export default async function setup() {
  const uri = process.env.DATABASE_URI || process.env.DATABASE_URL || ''
  let pg = { host: '127.0.0.1', port: 5433 }
  try { const u = new URL(uri); pg = { host: u.hostname || pg.host, port: Number(u.port || 5432) } } catch { /* keep the docker default */ }
  const fixturePort = Number(process.env.PORTAL_FIXTURE_PORT || 3307)
  const problems: string[] = []
  if (!(await reachable(pg.host, pg.port))) problems.push(`Postgres is not reachable on ${pg.host}:${pg.port}`)
  const portal = await portalFixtureProblem(fixturePort)
  if (portal) problems.push(portal)
  if (!(await reachable('127.0.0.1', 1025))) problems.push('Mailpit is not reachable on 127.0.0.1:1025')
  try {
    const response = await fetch('http://127.0.0.1:8025/api/v1/info', { signal: AbortSignal.timeout(3000) })
    if (!response.ok) problems.push(`Mailpit API returned HTTP ${response.status} on :8025`)
  } catch {
    problems.push('Mailpit API is not reachable on 127.0.0.1:8025 (receipt assertions require it)')
  }
  if (!problems.length) return
  throw new Error(`\nThe integration tests need the local services:\n${problems.map((p) => `  - ${p}`).join('\n')}\n\nStart Docker Desktop, then run:\n    docker compose up -d\n    npm run db:fixtures\n`)
}
