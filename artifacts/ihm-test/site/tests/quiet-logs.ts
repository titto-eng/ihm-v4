// Shared by vitest.setup.ts and tests/blocks/setup.ts. Tests run without a reCAPTCHA secret on purpose, so the warning the
// server prints for it on every submission is expected and only clutters the output. VERBOSE_TEST_LOGS=1 keeps every warning.
if (!process.env.VERBOSE_TEST_LOGS) {
  const warn = console.warn.bind(console)
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].startsWith('[enquire] reCAPTCHA secret not set')) return
    warn(...args)
  }
}
