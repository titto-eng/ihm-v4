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

Keep committed npm tarball URLs portable rather than tied to the Replit-only
registry hostname.

**Why:** A successful workspace install can still leave internal download URLs
in the lockfile, causing laptop installs to fail with DNS ENOTFOUND. Changing
the laptop registry setting alone does not remove explicit locked URLs.

**How to apply:** Normalize only registry URL prefixes after dependency updates;
preserve versions, integrity hashes and local-fork links. Keep the workspace's
configured security registry active when installing.
