// /google-review-design/ — retired by the owner (2026-11-01): a WordPress design test page for the Reviews Feed plugin. The 301 is in
// src/content/redirects.ts (config redirects run before route files); this file only repeats it in case the config is not loaded.
import { permanentRedirect } from 'next/navigation'

export default function GoogleReviewDesignRoute() {
  permanentRedirect('/student-testimonials/')
}
