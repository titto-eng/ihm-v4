# deepmerge security fork

API-compatible fork of the MIT-licensed `deepmerge@4.3.1` CommonJS distribution
and TypeScript declarations, installed as `deepmerge` by the site's npm override.
Upstream: https://github.com/TehShrike/deepmerge/tree/v4.3.1

The root dependency anchors `file:vendor/deepmerge-safe` and the override uses
`$deepmerge`. A bare relative file override on a transitive dependency can make
npm record a link relative to Payload's directory instead of the site root.
Verify changes with a clean `npm ci`, then `npm run test:security`; a passing
test against an existing installation alone does not establish reproducibility.

Upstream has no published patch for GHSA-gcqx-w48m-w2h4. Both target-copy and
source-merge writes here define own data properties instead of invoking inherited
setters. In particular an own enumerable `__proto__` cannot poison the returned
object's prototype, including with null-prototype inputs. The existing guard
against merging inherited properties is retained. Arrays, symbols, cloning,
custom merges, special objects, and `all` retain the upstream API.

This is a local fork, **not** a claimed upstream patched release. Do not remove
the override until an upstream fix is published and tested. No advisories are
suppressed. Run `node --test vendor/deepmerge-safe/test.cjs` from the site directory.
