// Contract tests replace fetch with a spy. Any unmocked outbound HTTP is a bug:
// only Mailpit may be reached by real fetch in this fixture-only suite.
const realFetch = globalThis.fetch
globalThis.fetch = (input, init) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url)
  if (url.protocol !== 'http:' || !['localhost', '127.0.0.1'].includes(url.hostname) || url.port !== '8025') {
    throw new Error(`Integration test blocked outbound HTTP to ${url.origin}; mock the adapter instead`)
  }
  return realFetch(input, init)
}
