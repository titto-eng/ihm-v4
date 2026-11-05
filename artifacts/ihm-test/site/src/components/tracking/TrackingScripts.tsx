'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { activeTags, hubspotScriptUrl, type TrackingConfig } from './config'
import { pageViewVirtual, pushDataLayer } from './datalayer'

/** Applies per-path overrides and exclusions (80 §2) and reports client-side navigations as `page_view_virtual`. */
export function TrackingScripts({ config }: { config: TrackingConfig }) {
  const pathname = usePathname() ?? '/'
  const tags = activeTags(config, pathname)
  const first = useRef(true)

  useEffect(() => {
    // The first load is a real page view; only route changes are virtual. Pushes happen even when tags are off (tests).
    if (first.current) {
      first.current = false
      return
    }
    pushDataLayer(pageViewVirtual(pathname, document.title))
  }, [pathname])

  return (
    <>
      {tags.gtmId && (
        <>
          <GoogleTagManager key={tags.gtmId} gtmId={tags.gtmId} />
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${tags.gtmId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="Google Tag Manager" />
          </noscript>
        </>
      )}
      {tags.clarityId && (
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(tags.clarityId)});`}
        </Script>
      )}
      {tags.hubspot && <Script id="hs-script-loader" src={hubspotScriptUrl(tags.hubspot)} strategy="lazyOnload" async defer />}
      {tags.airgentic && (
        <Script
          id="airgentic-script"
          src="https://chat.airgentic.com/_js/airgentic-1.4.js"
          data-account-id={tags.airgentic.accountId}
          data-service-id={tags.airgentic.serviceId}
          strategy="lazyOnload"
        />
      )}
    </>
  )
}
