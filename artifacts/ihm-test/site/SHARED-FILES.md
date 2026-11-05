# Files kept identical between ihm-web and ihna-web

A change to any path below is made in both repos in the same working session. Record the sync in the commit message
(`sync: <path> ← ihm-web@<sha>`).

```
AGENTS.md (rules and commands sections)   .claude/agents/**
src/blocks/**                              src/components/ui/**         src/components/layout/**
src/components/page/**                     src/lib/paths.ts             src/proxy.ts
src/lib/portal/client.ts (not queries.ts)  src/lib/adapters/**          src/lib/payments/**
src/lib/enquiries/**                       src/lib/access.ts            src/lib/portal/payments-write.ts
src/lib/cn.ts                              src/lib/media-sizes.ts       src/lib/security/**
src/lib/seo/metadata.ts                    src/lib/preview.ts           src/app/api/preview/**
src/app/api/enquire/**                     src/app/api/payments/**      src/jobs/**
scripts/import/** (except seeds/)          scripts/parity/**
docs/modules/** (structure; site-specific numbers differ)
```

Site-specific (never synced): `src/styles/theme.css`, `src/lib/portal/queries.ts`, `src/lib/legacy-redirects.ts`, `.env*`,
`scripts/import/seeds/`, the numbers in `docs/modules/*`, everything under `src/content/**` (site settings, nav, footer, forms,
enquiry routing, page and landing registries, redirects, staff paths), and every page route file under `src/app/(site)/**` except
the shared routes (`pay/**`, `alumni/**`, `courses/**`, `blog/**`, `news/**`, `wp-content/**`, `sitemap.xml`,
`robots.txt`).
