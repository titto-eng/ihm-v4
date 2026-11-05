// Loads the portal fixtures into the docker-compose `portal-mysql` container: `npm run db:fixtures` (Windows, macOS, Linux).
// Same steps as docker/portal-fixtures/load.sh, without needing bash. Dev fixture container only: never point this at a real portal.
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const dir = join(root, 'docker', 'portal-fixtures')
// Fixed values of the local docker fixture (docker-compose.yml portal-mysql); not real credentials.
const db = 'ihmedu_portal'
const rootPw = 'root'
const payUser = 'portal_pay'
const payPw = 'portal_pay'

const mysql = (args, input) => spawnSync('docker', ['compose', 'exec', '-T', '-e', `MYSQL_PWD=${rootPw}`, 'portal-mysql', 'mysql', '-uroot', '--default-character-set=utf8mb4', ...args], { cwd: root, input, encoding: 'utf8' })

let ready = false
for (let i = 0; i < 60 && !ready; i++) {
  ready = mysql(['-e', 'SELECT 1']).status === 0
  if (!ready) await new Promise((r) => setTimeout(r, 1000))
}
if (!ready) {
  console.error('portal-mysql is not running or not ready. Start Docker Desktop, then: docker compose up -d portal-mysql')
  process.exit(1)
}
for (const f of ['schema.sql', 'data.sql', 'payments.schema.sql', 'payments.data.sql']) {
  const r = mysql([db], readFileSync(join(dir, f), 'utf8'))
  if (r.status !== 0) { console.error(`${f} failed:\n${r.stderr}`); process.exit(1) }
}
const grants = [
  "REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'portal_ro'@'%'", `GRANT SELECT ON \`${db}\`.* TO 'portal_ro'@'%'`,
  `CREATE USER IF NOT EXISTS '${payUser}'@'%' IDENTIFIED BY '${payPw}'`, `REVOKE ALL PRIVILEGES, GRANT OPTION FROM '${payUser}'@'%'`,
  `GRANT SELECT, INSERT ON \`${db}\`.payments TO '${payUser}'@'%'`,
  `GRANT UPDATE (status, paid_amount, paymentdate, payment_gateway, payment_number, response_code, payment_status, payment_response, type, sp_status, sp_bankTransactionId, sp_gatewayResponseCode, sp_gatewayResponseMessage, sp_orderId, sp_dcc_orderId, aw_intent_id) ON \`${db}\`.payments TO '${payUser}'@'%'`,
  'FLUSH PRIVILEGES',
].join('; ')
const g = mysql(['-e', grants])
if (g.status !== 0) { console.error(`grants failed:\n${g.stderr}`); process.exit(1) }
console.log(`portal fixtures loaded into ${db} (read user portal_ro: SELECT only; payments user ${payUser}: payments only, no DELETE)`)
