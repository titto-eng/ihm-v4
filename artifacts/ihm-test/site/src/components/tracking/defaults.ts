// Site-specific tracking defaults (80-tracking §2 "IHM seed"). They apply only where `site.tracking` (src/content/site.ts)
// leaves a value empty, so a fresh database still loads the live site's tags. ihna-web carries its own copy.
export const TRACKING_DEFAULTS = {
  gtmId: 'GTM-KXFBMHL',
  clarityId: '9q34oifeju',
  hubspotPortalId: '39853473',
  hubspotRegion: 'na1' as 'na1' | 'eu1',
  airgentic: { accountId: 'ihm', serviceId: 'website' },
  /** The scholarship page has its own container; it replaces the main id there (enquirenow/scholarship/index.html:175). */
  gtmOverrides: [{ pathPrefix: '/enquirenow/scholarship/', containerId: 'GTM-5CQFHKD' }],
  /** SAE pages load GTM only, as header-sae.php does. */
  exclusions: [
    { tool: 'hubspot', pathPrefix: '/school-of-american-education/' },
    { tool: 'clarity', pathPrefix: '/school-of-american-education/' },
    { tool: 'airgentic', pathPrefix: '/school-of-american-education/' },
  ] as { tool: ToolName; pathPrefix: string }[],
}

export type ToolName = 'gtm' | 'clarity' | 'hubspot' | 'airgentic'
