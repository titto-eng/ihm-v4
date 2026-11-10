import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Keep exact package versions and integrity hashes; only normalize registry URLs.
// npm uses the active registry configuration when installing canonical npm URLs.
const path = fileURLToPath(new URL('../../package-lock.json', import.meta.url));
const original = readFileSync(path, 'utf8');
const prefix = 'http://package-firewall.replit.internal/npm/';
const count = original.split(prefix).length - 1;
const portable = original.replaceAll(prefix, 'https://registry.npmjs.org/');
JSON.parse(portable);
if (process.argv.includes('--check')) {
  if (count) {
    console.error(`Lockfile contains ${count} Replit-only download URLs. Run node scripts/local/portable-lock.mjs before committing.`);
    process.exitCode = 1;
  } else {
    console.log('Lockfile download URLs are portable.');
  }
} else {
  if (count) writeFileSync(path, portable);
  console.log(`Normalized ${count} download URLs; versions and integrity hashes unchanged.`);
}
