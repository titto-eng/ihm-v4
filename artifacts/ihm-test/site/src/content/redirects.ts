// Exact-path redirects (70-urls-seo §4, DEC-64). Loaded by next.config.ts, so a change needs a restart.
// Only rules whose target is live are listed (DEC-31). Prefix rules (/enquirenow/*, "learning-hub",
// "emergency-services") live in src/lib/legacy-redirects.ts because next.config cannot express "contains".
export type Redirect = { from: string; to: string; permanent: boolean; note: string }

export const redirects: Redirect[] = [
  // Old theme functions.php page_redirects(): the two rules whose target is still live
  { from: '/emergency-services/', to: '/external-services/', permanent: true, note: 'functions.php:78' },
  { from: '/learning-hub/', to: '/', permanent: true, note: 'functions.php:63' },
  // The WordPress front page (page 8, slug home): WordPress itself 301s /home/ to / (redirect_canonical)
  { from: '/home/', to: '/', permanent: true, note: 'front page, page 8' },
  // Flipbook course guides and the international handbook folder -> the PDFs (DEC-10, DEC-17)
  { from: '/HCI_Australia_International_CourseGuide/', to: '/pdf/HCI_Course_Guide.pdf', permanent: true, note: 'fliphtml5 viewer' },
  { from: '/IHM_CourseGuide/', to: '/pdf/IHM_Course_Guide.pdf', permanent: true, note: 'fliphtml5 viewer' },
  { from: '/IHM_CourseGuide/IHM_CourseGuide.pdf', to: '/pdf/IHM_Course_Guide.pdf', permanent: true, note: 'the PDF inside the fliphtml5 folder' },
  { from: '/HCI_Australia_International_CourseGuide/HCI_Australia_International_CourseGuide.pdf', to: '/pdf/HCI_Course_Guide.pdf', permanent: true, note: 'the PDF inside the fliphtml5 folder' },
  { from: '/International-SHB/', to: '/International-SHB/International-SHB.pdf', permanent: true, note: '403 directory on the old site' },
  // Old payment pages -> the one payment entry (DEC-45)
  { from: '/airwallex-checkout/', to: '/makepayment/', permanent: true, note: 'payments' },
  { from: '/airwallex/', to: '/makepayment/', permanent: true, note: 'payments' },
  { from: '/pay-online/', to: '/makepayment/', permanent: true, note: 'payments' },
  { from: '/secure-pay/', to: '/makepayment/', permanent: true, note: 'payments' },
  { from: '/secure-pay-card/', to: '/makepayment/', permanent: true, note: 'payments (empty WP page)' },
  { from: '/secure-pay-card-dcc/', to: '/makepayment/', permanent: true, note: 'payments (empty WP page)' },
  { from: '/secure-pay-response/', to: '/makepayment/', permanent: true, note: 'payments' },
  { from: '/secure-pay-response-2/', to: '/makepayment/', permanent: true, note: 'payments (empty WP page)' },
  // A WordPress design test page for the Reviews Feed plugin; retired by the owner (2026-11-01)
  { from: '/google-review-design/', to: '/student-testimonials/', permanent: true, note: 'owner decision, session 14' },
  // Landing page backups that were live URLs
  { from: '/lp/enquiry-ihm-old/', to: '/lp/enquiry-ihm/', permanent: true, note: 'landing-pages.csv' },
  { from: '/lp/nclex-for-rns-old/', to: '/lp/nclex-for-rns/', permanent: true, note: 'landing-pages.csv' },
  { from: '/lp/osce-for-rns_bkp_21062023/', to: '/lp/osce-for-rns/', permanent: true, note: 'landing-pages.csv' },
  // School of Social Work microsite: its meta-refresh stubs (live 200 pages that forward) -> the page they forward to (DEC-36)
  { from: '/school-of-social-work/about/', to: '/school-of-social-work/social-work/', permanent: true, note: 'SSW microsite stub' },
  { from: '/school-of-social-work/about/content/', to: '/school-of-social-work/social-work/', permanent: true, note: 'SSW microsite stub' },
  { from: '/school-of-social-work/compliance/', to: '/school-of-social-work/study/', permanent: true, note: 'SSW microsite stub' },
  { from: '/school-of-social-work/courses/', to: '/school-of-social-work/study/', permanent: true, note: 'SSW microsite stub' },
  { from: '/school-of-social-work/events/', to: '/school-of-social-work/life/', permanent: true, note: 'SSW microsite stub' },
  { from: '/school-of-social-work/student-life/', to: '/school-of-social-work/life/', permanent: true, note: 'SSW microsite stub' },
  { from: '/school-of-social-work/governance/', to: '/school-of-social-work/people/', permanent: true, note: 'SSW microsite stub' },
  { from: '/school-of-social-work/policies/', to: '/school-of-social-work/resources/', permanent: true, note: 'SSW microsite stub' },
]
