// Copy for the short /lp/ enquiry pages (EnquiryPage template rows in src/content/landing.ts): each is the old "IHM Enquiry Form"
// page, a heading, an optional pitch and the row's form. Rendered by QuickEnquiry (src/components/landing/QuickEnquiry.tsx).
export type QuickEnquiryCopy = { title: string; pitch?: string }

export const QUICK_ENQUIRY: Record<string, QuickEnquiryCopy> = {
  '/lp/bsw-course-enquiry/': { title: "Talk to our Counsellor" },
  '/lp/course-enquiry/': { title: "Talk to our Counsellor" },
  '/lp/dcap-enquiry/': { title: "Talk to our Counsellor" },
  '/lp/enquiry/': { title: "Talk to our Counsellor" },
  '/lp/gcan-courses-enquiry/': { title: "Talk to our Counsellor" },
  '/lp/gcan-enquiry/': { title: "Talk to our Counsellor" },
  '/lp/gcan-offer-enquiry/': { title: "Talk to our Counsellor", pitch: "Act now and get a great opportunity to study abroad without the hassle of IELTS and with scholarship options available! Hurry - this offer won't last long. Secure your future today and apply now! Don't miss out - take advantage of this offer while you still can!" },
  '/lp/phone_number_validation/': { title: "Talk to our Counsellor" },
  '/lp/reception-toll-number/': { title: "Walk-in & Direct Enquiries Form", pitch: "Unlock Your Future in Healthcare. Whether you're starting fresh or upskilling, IHM's world-class programs and industry expertise will get you there. Hurry – this offer won't last long! Secure your future today and apply now. Don’t miss out – take advantage of this offer while it lasts!" },
  '/lp/refer-your-friend/': { title: "Refer and earn now.", pitch: "IHM Australia introduces a 'Refer and Earn' program. Share your positive experiences with IHM and refer potential students to benefit from the same advantages you've enjoyed during your time with us. To express our gratitude for your contribution, we've designed an attractive referral commission scheme. For each referral joining the Graduate Certificate in Advanced Nursing programs, receive a referral commission of 300 AUD." },
  '/lp/special-courses-enq/': { title: "Talk to Counsellors", pitch: "Developing Tomorrow's Healthcare Professionals with Advanced Learning and Practical Training" },
}
