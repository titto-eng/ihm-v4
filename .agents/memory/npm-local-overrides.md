---
name: Local npm override resolution
description: Reproducibility pitfall for npm relative file overrides on transitive packages.
---

Anchor a local fork as a direct root dependency and refer to it with npm's
`$dependency` override syntax rather than a bare relative file override.

**Why:** npm can interpret a transitive relative override against the parent's
directory when writing the lockfile, while an existing installation still links
correctly. Tests against that installation can pass although a clean install
would resolve a nonexistent nested path.

**How to apply:** Inspect the lockfile's local link target and run clean `npm ci`
followed by actual consumer-resolution and regression tests before delivery.
