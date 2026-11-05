/**
 * Parity crawl: live ihm.edu.au (old WordPress) vs the new site at localhost:3000.
 * Spec: docs/modules/70-urls-seo.md section 7; DEC-10, DEC-23; AGENTS.md rule 1.
 *
 *   npm run parity -- --site=ihm [--limit=N] [--only=<substring>] [--refresh]
 *
 * Live side: GET only, about 2.9 requests/s (global gate), User-Agent
 * "Mozilla/5.0 (parity check)", follows up to LIVE_MAX_REDIRECTS (4) redirects; the
 * new side follows up to NEW_MAX_REDIRECTS (5). Thanks/handler/backup URLs are never
 * requested. Successful live responses are cached in out/cache-live.json, so re-runs
 * only hit localhost (use --refresh to re-fetch the live side).
 *
 * Status columns hold the FIRST response code; *_final is the URL after following
 * redirects. Host differences (www, localhost) are ignored when comparing targets.
 *
 * Document aliases: a path that is a key of DOCUMENT_ALIASES (src/collections/Documents.ts)
 * serves another document's PDF with 200. A new-site 200 there is the intended outcome
 * whatever the landing row recommends: equal to a live 200, and, where live answers 404
 * or redirects, a deliberate replacement like the DEC-17 redirects. The row is OK with
 * note DOCUMENT_ALIAS and exp alias200.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';
import { DOCUMENT_ALIASES } from '../../src/collections/Documents';
import { SSW_PATHS } from '../../src/content/school-of-social-work';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const INV = path.resolve(ROOT, '..', 'inventory');
const OUT = path.join(HERE, 'out');
const CACHE_FILE = path.join(OUT, 'cache-live.json');
const CSV_FILE = path.join(OUT, 'parity-ihm.csv');
const SUMMARY_FILE = path.join(OUT, 'parity-ihm.summary.json');

const LIVE_ORIGIN = 'https://ihm.edu.au' // apex is canonical; www 301s to it;
const NEW_ORIGIN = 'http://localhost:3000';
const UA = 'Mozilla/5.0 (parity check)';
const LIVE_MAX_REDIRECTS = 4; // legacy paths hop apex→www→(500); follow far enough to see the real outcome
const NEW_MAX_REDIRECTS = 5;
const LIVE_INTERVAL_MS = 340;
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 4;
const MAX_BODY_BYTES = 2_000_000;

type Result = 'OK' | 'STATUS_DIFF' | 'TITLE_DIFF' | 'REDIRECT_DIFF' | 'NEW_ERROR';
type Expect = 'live200' | 'gone404' | 'redirect301' | 'redirected' | 'follow';

// ---------------------------------------------------------------- options

const opts = new Map<string, string>();
for (const a of process.argv.slice(2)) {
  const m = /^--([\w-]+)(?:=(.*))?$/.exec(a);
  if (m) opts.set(m[1], m[2] ?? 'true');
}
const SITE = opts.get('site') ?? 'ihm';
const ONLY = opts.get('only');
const REFRESH = opts.get('refresh') === 'true';
const LIMIT = opts.has('limit') ? Number(opts.get('limit')) : Infinity;
if (SITE !== 'ihm') {
  console.error(`Unknown --site=${SITE}. Only "ihm" is wired.`);
  process.exit(2);
}
if (opts.has('limit') && !(LIMIT > 0)) {
  console.error(`--limit must be a positive number, got "${opts.get('limit')}".`);
  process.exit(2);
}

// ---------------------------------------------------------------- helpers

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const norm = (s: string | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
const stripSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
const errMsg = (e: unknown): string => {
  const err = e as { name?: string; message?: string; cause?: { code?: string } };
  return err?.cause?.code ?? err?.name ?? err?.message ?? String(e);
};
const csvCell = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const isRedirect = (code: number) => code >= 300 && code < 400;

/** A CSV of the old-site inventory (../inventory). Missing inventory → [] and the crawl builds its URL list itself (see below). */
function readCsv(file: string): Record<string, string>[] {
  const full = path.join(INV, file);
  if (!fs.existsSync(full)) return [];
  const text = fs.readFileSync(full, 'utf8');
  return parse(text, { columns: true, skip_empty_lines: true, bom: true }) as Record<string, string>[];
}

/** Every <loc> of the live WordPress sitemaps (wp-sitemap.xml and its children) plus the static /sitemap.xml. */
async function liveSitemapUrls(): Promise<{ wp: string[]; other: string[] }> {
  const get = async (u: string) => {
    try {
      const res = await fetch(u, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(TIMEOUT_MS) });
      return res.ok ? await res.text() : '';
    } catch {
      return '';
    }
  };
  const locs = (xml: string) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  const index = locs(await get(`${LIVE_ORIGIN}/wp-sitemap.xml`));
  const wp: string[] = [];
  const other: string[] = [];
  for (const sm of index) {
    // Posts, pages and courses are published content (live by definition); taxonomy and author archives are followed.
    (/wp-sitemap-posts-/.test(sm) ? wp : other).push(...locs(await get(sm)));
  }
  other.push(...locs(await get(`${LIVE_ORIGIN}/sitemap.xml`)));
  return { wp, other };
}

/** URLs the new site's own registries promise (pages.ts, landing pages, redirects): checked with expectation "follow". */
async function registryPaths(): Promise<string[]> {
  const [{ pages }, { landingPages }, { redirects }] = await Promise.all([
    import('../../src/content/pages'), import('../../src/content/landing'), import('../../src/content/redirects'),
  ]);
  return [...pages.map((p) => p.path), ...landingPages.map((l) => l.path), ...redirects.map((r) => r.from)];
}

async function discard(res: Response) {
  await res.body?.cancel().catch(() => undefined);
}

async function readCapped(res: Response): Promise<string> {
  if (!res.body) return '';
  const reader = res.body.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  while (size < MAX_BODY_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    size += value.byteLength;
  }
  await reader.cancel().catch(() => undefined);
  return Buffer.concat(parts).toString('utf8');
}

// Live requests go through one serialised gate so the whole run stays under 3 req/s.
let liveQueue: Promise<void> = Promise.resolve();
let lastLiveAt = 0;
function liveGate(): Promise<void> {
  const next = liveQueue.then(async () => {
    const wait = lastLiveAt + LIVE_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastLiveAt = Date.now();
  });
  liveQueue = next.catch(() => undefined);
  return next;
}

async function request(url: string, live: boolean): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    if (live) await liveGate();
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,*/*;q=0.8' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    // One polite retry on rate-limit or overload from the live site.
    if (live && attempt === 0 && (res.status === 429 || res.status === 503)) {
      await discard(res);
      await sleep(15_000);
      continue;
    }
    return res;
  }
}

// ---------------------------------------------------------------- fetching

interface Fetched {
  error?: string;
  first: number; // status of the first response, 0 when no response at all
  firstLocation?: string; // absolute URL of the first redirect, if any
  slashOnly: boolean; // first hop only adds or removes the trailing slash
  finalUrl: string;
  finalStatus: number;
  title?: string;
  h1?: string;
  canonical?: string;
}

async function fetchChain(start: string, maxRedirects: number, live: boolean): Promise<Fetched> {
  const startPath = new URL(start).pathname;
  let url = start;
  let hops = 0;
  let first = 0;
  let firstLocation: string | undefined;
  let slashOnly = false;
  for (;;) {
    let res: Response;
    try {
      res = await request(url, live);
    } catch (e) {
      return { error: errMsg(e), first, firstLocation, slashOnly, finalUrl: url, finalStatus: 0 };
    }
    if (hops === 0) first = res.status;
    const location = res.headers.get('location');
    if (isRedirect(res.status) && location) {
      const next = new URL(location, url).toString();
      await discard(res);
      if (hops === 0) {
        firstLocation = next;
        const nextPath = new URL(next).pathname;
        slashOnly = nextPath === `${startPath}/` || startPath === `${nextPath}/`;
      }
      if (hops >= maxRedirects) {
        return { error: 'TOO_MANY_REDIRECTS', first, firstLocation, slashOnly, finalUrl: url, finalStatus: res.status };
      }
      url = next;
      hops++;
      continue;
    }
    const out: Fetched = { first, firstLocation, slashOnly, finalUrl: url, finalStatus: res.status };
    if (res.status === 200 && /html/i.test(res.headers.get('content-type') ?? '')) {
      const $ = cheerio.load(await readCapped(res));
      out.title = norm($('title').first().text());
      out.h1 = norm($('h1').first().text());
      out.canonical = $('link[rel="canonical"]').first().attr('href')?.trim() || undefined;
    } else {
      await discard(res);
    }
    return out;
  }
}

// Live responses are cached by URL. Only responses that got an HTTP status are cached,
// so network failures are retried on the next run.
type CacheFile = Record<string, { at: string; data: Fetched }>;
const cache: CacheFile = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
let cacheWrites = 0;
const stats = { liveFetches: 0, liveCacheHits: 0 };

function saveCache() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1));
}

async function getLive(p: string): Promise<Fetched> {
  const url = new URL(p, LIVE_ORIGIN).toString();
  const hit = cache[url];
  if (hit && !REFRESH) {
    stats.liveCacheHits++;
    return hit.data;
  }
  const data = await fetchChain(url, LIVE_MAX_REDIRECTS, true);
  stats.liveFetches++;
  if (data.first > 0) {
    cache[url] = { at: new Date().toISOString(), data };
    if (++cacheWrites % 25 === 0) saveCache();
  }
  return data;
}

function getNew(p: string): Promise<Fetched> {
  return fetchChain(new URL(p, NEW_ORIGIN).toString(), NEW_MAX_REDIRECTS, false);
}

// ---------------------------------------------------------------- targets

interface Target {
  path: string; // first-seen form, trailing slash kept as in the source
  key: string; // trailing slash removed, used for de-duplication
  ihmCategory?: string;
  landing?: { live_status: string; recommendation: string; redirects_to: string; section: string };
  pageType?: string;
}

const targets = new Map<string, Target>();
const skipped: Record<string, number> = {};
let duplicatesMerged = 0;
const skip = (why: string) => {
  skipped[why] = (skipped[why] ?? 0) + 1;
};

function addUrl(raw: string, category: string): Target | null {
  let u: URL;
  try {
    u = new URL(raw.trim(), LIVE_ORIGIN);
  } catch {
    skip('bad-url');
    return null;
  }
  if (!/(^|\.)ihm\.edu\.au$/i.test(u.hostname)) {
    skip('other-host');
    return null;
  }
  const p = u.pathname; // query and fragment (UTM variants) are dropped
  if (/thank|handler|\.php\b|_bkp|application_form|\/pay\/return|\/api\//i.test(p) || /thank/i.test(category)) {
    skip('thanks-or-handler');
    return null;
  }
  if (category === 'backup-file-exposed') {
    skip('backup-file-exposed');
    return null;
  }
  const key = stripSlash(p);
  let t = targets.get(key);
  if (t) duplicatesMerged++;
  else {
    t = { path: p, key };
    targets.set(key, t);
  }
  return t;
}

function categoryOf(t: Target): string {
  if (t.ihmCategory) return t.ihmCategory;
  if (t.landing) return `landing:${t.landing.section}`;
  if (t.pageType) return `pages:${t.pageType}`;
  return 'unknown';
}

// What the new site must do for this URL (DEC-10, AGENTS rule 1).
function expectationOf(t: Target): { exp: Expect; why: string } {
  if (t.landing) {
    const ls = t.landing.live_status.toLowerCase();
    const rec = t.landing.recommendation;
    if (ls.startsWith('gone')) {
      return {
        exp: 'gone404',
        why: rec === 'redirect' ? 'landing gone; rec=redirect conflicts, rule 1 keeps gone as 404' : 'landing gone',
      };
    }
    if (ls.startsWith('live')) {
      return rec === 'redirect'
        ? { exp: 'redirect301', why: 'landing live, rec=redirect' }
        : { exp: 'live200', why: 'landing live' };
    }
    if (ls.startsWith('redirected')) return { exp: 'redirected', why: 'landing redirected to same target' };
    return { exp: 'follow', why: 'landing other' };
  }
  if (t.pageType) {
    return t.pageType === 'sitemap-only'
      ? { exp: 'follow', why: 'pages.csv sitemap-only' }
      : { exp: 'live200', why: t.pageType === 'microsite' ? 'static microsite (DEC-36)' : t.pageType === 'sitemap-live' ? 'published in the live sitemap' : 'pages.csv live by definition' };
  }
  return { exp: 'follow', why: 'ihm-urls only' };
}

// ---------------------------------------------------------------- comparison

const code = (f: Fetched) => (f.first ? String(f.first) : 'ERR');
const describe = (f: Fetched) =>
  f.error ? `${code(f)} ${f.error}` : f.slashOnly ? `${code(f)} slash->${f.finalStatus}` : code(f);
const isLive200 = (f: Fetched) => !f.error && f.finalStatus === 200 && (f.first === 200 || f.slashOnly);
const pathOf = (u: string) => {
  try {
    return new URL(u, LIVE_ORIGIN).pathname;
  } catch {
    return u;
  }
};

// The document another old file name serves with 200 (see the header), or undefined. Paths are compared decoded.
function documentAliasTarget(p: string): string | undefined {
  let decoded = p;
  try {
    decoded = decodeURIComponent(p);
  } catch {
    /* keep */
  }
  return DOCUMENT_ALIASES[decoded];
}

// Same page regardless of host: ihm.edu.au, www and localhost count as one site.
function sameTarget(a: string, b: string): boolean {
  // Expected targets from the CSVs may be relative paths.
  const ua = new URL(a, LIVE_ORIGIN);
  const ub = new URL(b, LIVE_ORIGIN);
  const host = (h: string) => h.replace(/^www\./, '');
  const internal = (h: string) => h === 'localhost' || h === 'ihm.edu.au';
  const hostOk = (internal(host(ua.hostname)) && internal(host(ub.hostname))) || host(ua.hostname) === host(ub.hostname);
  return hostOk && stripSlash(ua.pathname) === stripSlash(ub.pathname);
}

// DEC-38: the old site puts the logo text in <h1> on every page and leaves <title> empty on many; neither is
// something to reproduce. Compare the core title without the brand suffix, ignore a live H1 that is the site name,
// and do not score a live page that has no title at all.
const SITE_NAMES = ['institute of health & management', 'institute of health and management', 'ihm'];
const normText = (v: string | undefined) =>
  (v ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
const coreTitle = (v: string | undefined) =>
  normText(v).replace(/\s*[|\-–—]\s*(ihm( australia)?|institute of health (&|and) management)\s*$/i, '').trim();
function compareTitle(live: string | undefined, next: string | undefined, notes: string[]): string {
  if (!normText(live)) { notes.push('LIVE_NO_TITLE'); return ''; }
  return coreTitle(live) === coreTitle(next) ? 'Y' : 'N';
}
function compareH1(live: string | undefined, next: string | undefined, notes: string[]): string {
  const l = normText(live);
  if (!l) return '';
  if (SITE_NAMES.includes(l)) { notes.push('LIVE_H1_IS_LOGO'); return ''; }
  return l === normText(next) ? 'Y' : 'N';
}

interface Verdict {
  exp: string;
  result: Result;
  titleMatch: string;
  h1Match: string;
  notes: string[];
}

function evaluate(t: Target, L: Fetched, N: Fetched): Verdict {
  const { exp, why } = expectationOf(t);
  let e: string = exp;
  if (exp === 'follow') {
    if (L.error) e = 'none';
    else if (isLive200(L)) e = 'live200';
    else if (L.first === 404 || (L.slashOnly && L.finalStatus === 404)) e = 'gone404';
    else if (isRedirect(L.first) && !L.slashOnly) e = 'redirected';
    else e = 'same';
  }

  const notes = [`exp=${e}${exp === 'follow' ? ' (from live)' : ''}: ${why}`];
  if (exp === 'live200' && !isLive200(L)) notes.push(`LIVE_NOT_200: live ${describe(L)}, source row says live`);
  if (L.error) notes.push(`LIVE_ERROR:${L.error}`);
  if (N.error) notes.push(`NEW_ERROR:${N.error}`);

  let result: Result = 'OK';
  let titleMatch = '';
  let h1Match = '';

  // DEC-40: a live 5xx cannot define an expectation (the old site is broken there); the new site only has to answer sanely.
  if (!L.error && (L.first >= 500 || L.finalStatus >= 500)) {
    notes.push(`LIVE_5XX ${describe(L)}`);
    if (N.error || N.first >= 500 || N.finalStatus >= 500) { result = 'NEW_ERROR'; notes.push(`new ${describe(N)}`); }
    else result = 'OK';
    return { exp: 'live-broken', result, titleMatch, h1Match, notes };
  }
  const alias = documentAliasTarget(t.path);
  if (N.error || N.first >= 500 || N.finalStatus >= 500) {
    result = 'NEW_ERROR';
    notes.push(`new ${describe(N)}`);
  } else if (alias && (N.first === 200 || (N.slashOnly && N.finalStatus === 200))) {
    // a document alias answers 200 by design (header): equal to a live 200, intentional where live 404s or redirects
    notes.push(`DOCUMENT_ALIAS: new 200 serves ${alias}; live ${describe(L)}`);
    return { exp: 'alias200', result, titleMatch, h1Match, notes };
  } else if (e === 'live200') {
    if (N.first === 200 || (N.slashOnly && N.finalStatus === 200)) {
      if (N.finalStatus === 200 && L.finalStatus === 200 && !L.error) {
        titleMatch = compareTitle(L.title, N.title, notes);
        h1Match = compareH1(L.h1, N.h1, notes);
        if (titleMatch === 'N') result = 'TITLE_DIFF';
        if (h1Match === 'N') notes.push('H1_DIFF');
        if (L.canonical && N.canonical && pathOf(L.canonical) !== pathOf(N.canonical)) {
          notes.push('CANONICAL_DIFF');
        }
      }
    } else {
      result = 'STATUS_DIFF';
      notes.push(`expected 200, new ${describe(N)}`);
    }
  } else if (e === 'gone404') {
    if (!(N.first === 404 || (N.slashOnly && N.finalStatus === 404))) {
      result = 'STATUS_DIFF';
      notes.push(`expected 404, new ${describe(N)}`);
    }
  } else if (e === 'redirect301') {
    if (N.first === 301 || N.first === 308) {
      const seeded = t.landing?.redirects_to;
      if (seeded && N.firstLocation && !N.slashOnly && !sameTarget(N.firstLocation, seeded)) {
        result = 'REDIRECT_DIFF';
        notes.push(`new -> ${pathOf(N.firstLocation)}, seeded target ${pathOf(seeded)}`);
      }
    } else {
      result = 'STATUS_DIFF';
      notes.push(`expected 301, new ${describe(N)}`);
    }
  } else if (e === 'redirected') {
    if (isRedirect(N.first)) {
      if (!sameTarget(N.finalUrl, L.finalUrl)) {
        result = 'REDIRECT_DIFF';
        notes.push(`new -> ${pathOf(N.finalUrl)}, live -> ${pathOf(L.finalUrl)}`);
      }
    } else {
      result = 'STATUS_DIFF';
      notes.push(`expected redirect, new ${describe(N)}`);
    }
  } else if (e === 'same') {
    if (N.finalStatus !== L.finalStatus) {
      result = 'STATUS_DIFF';
      notes.push(`live ${describe(L)}, new ${describe(N)}`);
    }
  }
  // e === 'none' (live unreachable, nothing to compare) stays OK unless the new site errors.

  return { exp: e, result, titleMatch, h1Match, notes };
}

// ---------------------------------------------------------------- main

interface Row {
  url: string;
  category: string;
  live_status: string;
  new_status: string;
  live_final: string;
  new_final: string;
  title_match: string;
  h1_match: string;
  result: Result;
  note: string;
  exp: string;
}

async function main() {
  const landing = readCsv('v2/ihm/landing-pages.csv');
  const pages = readCsv('v2/ihm/pages.csv');
  const ihmUrls = readCsv('ihm-urls.csv');

  // Order matters: landing rows first (they carry the expectations), then pages, then the rest.
  for (const r of landing) {
    const t = addUrl(r.url, '');
    if (t) {
      t.landing = {
        live_status: r.live_status ?? '',
        recommendation: r.recommendation ?? '',
        redirects_to: r.redirects_to ?? '',
        section: r.section ?? '',
      };
    }
  }
  for (const r of pages) {
    const t = addUrl(r.url, '');
    if (t) t.pageType = r.wp_type;
  }
  for (const r of ihmUrls) {
    const t = addUrl(r.url, r.category ?? '');
    if (t && !t.ihmCategory) t.ihmCategory = r.category;
  }
  // Without the inventory folder (../inventory/v2/ihm/*.csv), the URL list comes from the live sitemaps and the code registries.
  if (!landing.length && !pages.length) {
    console.error(`No inventory at ${INV}: using the live sitemaps and the code registries instead.`);
    const sm = await liveSitemapUrls();
    for (const u of sm.wp) {
      const t = addUrl(u, 'sitemap');
      if (t && !t.pageType) { t.pageType = 'sitemap-live'; t.ihmCategory ??= 'sitemap' }
    }
    for (const u of sm.other) { const t = addUrl(u, 'sitemap-other'); if (t) t.ihmCategory ??= 'sitemap-other' }
    for (const p of await registryPaths()) { const t = addUrl(p, 'registry'); if (t) t.ihmCategory ??= 'registry' }
    console.error(`  live sitemap: ${sm.wp.length} published + ${sm.other.length} other URLs`);
  }
  // The School of Social Work microsite (DEC-36) is static HTML on the live server, outside the WordPress inventory: its 35 URLs
  // must answer 200 on both sides.
  for (const p of SSW_PATHS) {
    const t = addUrl(p, 'school-of-social-work');
    if (t && !t.pageType && !t.landing) t.pageType = 'microsite';
  }

  let selected = [...targets.values()].filter((t) => !ONLY || t.path.includes(ONLY));
  const totalAfterFilter = selected.length;
  if (Number.isFinite(LIMIT)) selected = selected.slice(0, LIMIT);

  console.error(
    `targets=${targets.size} (merged repeats=${duplicatesMerged}) selected=${selected.length} of ${totalAfterFilter}`,
  );
  try {
    await fetch(`${NEW_ORIGIN}/`, { signal: AbortSignal.timeout(5000) });
  } catch (e) {
    console.error(`WARNING: new site not reachable at ${NEW_ORIGIN} (${errMsg(e)}). Rows will show NEW_ERROR.`);
  }

  const limit = pLimit(CONCURRENCY);
  const rows: Row[] = new Array(selected.length);
  let done = 0;
  await Promise.all(
    selected.map((t, i) =>
      limit(async () => {
        let L: Fetched, N: Fetched, v: ReturnType<typeof evaluate>;
        try {
          [L, N] = await Promise.all([getLive(t.path), getNew(t.path)]);
          v = evaluate(t, L, N);
        } catch (e) {
          // One timeout must not kill the run: record it as an error row and move on.
          const err = { first: 0, finalStatus: 0, finalUrl: '', title: '', h1: '', canonical: '', error: errMsg(e) } as unknown as Fetched;
          L = err; N = err;
          v = { result: 'NEW_ERROR', titleMatch: 'N', h1Match: 'N', notes: [`exception: ${errMsg(e)}`], exp: 'error' } as ReturnType<typeof evaluate>;
        }
        rows[i] = {
          url: `https://ihm.edu.au${t.path}`,
          category: categoryOf(t),
          live_status: code(L),
          new_status: code(N),
          live_final: L.finalUrl,
          new_final: N.finalUrl,
          title_match: v.titleMatch,
          h1_match: v.h1Match,
          result: v.result,
          note: v.notes.join('; '),
          exp: v.exp,
        };
        if (++done % 25 === 0) console.error(`  ${done}/${selected.length}`);
      }),
    ),
  );
  saveCache();

  // CSV
  fs.mkdirSync(OUT, { recursive: true });
  const header = [
    'url', 'category', 'live_status', 'new_status', 'live_final', 'new_final',
    'title_match', 'h1_match', 'result', 'note',
  ];
  const lines = [header.join(',')];
  for (const r of rows) {
    lines.push(
      [r.url, r.category, r.live_status, r.new_status, r.live_final, r.new_final, r.title_match, r.h1_match, r.result, r.note]
        .map(csvCell)
        .join(','),
    );
  }
  fs.writeFileSync(CSV_FILE, lines.join('\n') + '\n');

  // Summary
  const results: Record<Result, number> = { OK: 0, STATUS_DIFF: 0, TITLE_DIFF: 0, REDIRECT_DIFF: 0, NEW_ERROR: 0 };
  const byCategory: Record<string, Record<string, number>> = {};
  for (const r of rows) {
    results[r.result]++;
    const c = (byCategory[r.category] ??= { total: 0, OK: 0, STATUS_DIFF: 0, TITLE_DIFF: 0, REDIRECT_DIFF: 0, NEW_ERROR: 0 });
    c.total++;
    c[r.result]++;
  }
  const summary = {
    generated_at: new Date().toISOString(),
    site: SITE,
    live_origin: LIVE_ORIGIN,
    new_origin: NEW_ORIGIN,
    options: { limit: Number.isFinite(LIMIT) ? LIMIT : null, only: ONLY ?? null, refresh: REFRESH },
    sources: { 'landing-pages.csv': landing.length, 'pages.csv': pages.length, 'ihm-urls.csv': ihmUrls.length },
    unique_targets: targets.size,
    duplicates_merged: duplicatesMerged,
    skipped,
    crawled: rows.length,
    live: { requests: stats.liveFetches, cache_hits: stats.liveCacheHits },
    results,
    gate: {
      expected_live_status_diff: rows.filter((r) => r.exp === 'live200' && r.result === 'STATUS_DIFF').length,
      gone_not_404: rows.filter((r) => r.exp === 'gone404' && r.result === 'STATUS_DIFF').length,
      redirect_diff: results.REDIRECT_DIFF,
      new_error: results.NEW_ERROR,
    },
    by_category: byCategory,
  };
  fs.writeFileSync(SUMMARY_FILE, JSON.stringify(summary, null, 2) + '\n');

  console.error(`wrote ${CSV_FILE}`);
  console.error(`wrote ${SUMMARY_FILE}`);
  console.error(`results: ${JSON.stringify(results)}`);
  console.error(`live requests: ${stats.liveFetches}, cache hits: ${stats.liveCacheHits}`);
}

process.on('SIGINT', () => {
  saveCache();
  process.exit(130);
});

main().catch((e) => {
  saveCache();
  console.error(e);
  process.exit(1);
});
