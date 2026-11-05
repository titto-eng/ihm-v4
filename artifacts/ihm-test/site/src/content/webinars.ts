// /mon-events-and-webinars/ and /gcan-events-and-webinars/ — the session lists that were a JavaScript array on the WordPress pages.
// Edit here: add a row per session (date as YYYY-MM-DD). Upcoming/past is worked out from the date (Australia/Melbourne), so
// nothing needs moving after a session. Posters are live-only images (src/content/legacy-assets.ts).
export type Session = { id: number; kind: 'webinar' | 'event'; date: string; time: string; topic: string; market: string; presenter: string; image?: string; registrationLink?: string }

export const MARKETS: Record<string, string> = { Australia: 'Australia', 'UK & IRELAND': 'UK & Ireland', 'South Asia Singapore and Malaysia': 'Singapore & Malaysia', Canada: 'Canada', GCC: 'GCC', 'South Asia Srilanka': 'Sri Lanka' }
export const PRESENTERS: Record<string, string> = { 'IHM Australia': 'IHM Australia', 'Simon Schweigert': 'Simon Schweigert (COO, IHM)', 'TEAM MWT AUSTRALIA': 'Team MWT Australia', 'TEAM MWT DUBAI': 'Team MWT Dubai' }

export const MON_SESSIONS: Session[] = [
 {
  "id": 1,
  "kind": "webinar",
  "date": "2026-06-12",
  "time": "6:00 PM AEST",
  "topic": "Confused About Your Nursing Registration Options in Australia? Join Our Free Webinar and Get Clarity from the Experts",
  "market": "Australia",
  "presenter": "IHM Australia",
  "image": "/images/webinars/confused-about-your-nursing.webp"
 },
 {
  "id": 2,
  "kind": "webinar",
  "date": "2026-06-26",
  "time": "6:00 PM AEST",
  "topic": "Upgrade Your Nursing Qualification & Accelerate Your Career Growth in Australia",
  "market": "Australia",
  "presenter": "IHM Australia",
  "image": "/images/webinars/upgrade-your-nursing-qualification.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_UQKxuAcwSky3JcVHMWzIVw"
 },
 {
  "id": 3,
  "kind": "webinar",
  "date": "2026-07-10",
  "time": "6:00 PM AEST",
  "topic": "What's Next After AHPRA Registration? Exploring Advanced Nursing Opportunities",
  "market": "Australia",
  "presenter": "IHM Australia",
  "image": "/images/webinars/what-next-after-ahpra-registration.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_GSoY7jTPSY6IrpVNipOdhg"
 },
 {
  "id": 4,
  "kind": "webinar",
  "date": "2026-07-24",
  "time": "6:00 PM AEST",
  "topic": "Are You Stuck in Your Nursing Career? Explore New Opportunities in Nursing",
  "market": "Australia",
  "presenter": "IHM Australia",
  "image": "/images/webinars/are-you-stuck-in-your-nursing-career.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_MpyM2pcITeSq5Heh4mR_pw"
 },
 {
  "id": 5,
  "kind": "webinar",
  "date": "2026-08-14",
  "time": "6:00 PM AEST",
  "topic": "What's Next After AHPRA Registration? Exploring Advanced Nursing Opportunities",
  "market": "Australia",
  "presenter": "IHM Australia",
  "image": "/images/webinars/what-next-after-ahpra-registration.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_SSvn0LxzQT63MKUaRTO6dQ"
 },
 {
  "id": 6,
  "kind": "webinar",
  "date": "2026-08-28",
  "time": "6:00 PM AEST",
  "topic": "Are You Stuck in Your Nursing Career? Explore New Opportunities in Nursing",
  "market": "Australia",
  "presenter": "IHM Australia",
  "image": "/images/webinars/are-you-stuck-in-your-nursing-career.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_7q4tQWaBQY-21RU3lA5m6Q"
 },
 {
  "id": 25,
  "kind": "event",
  "date": "2026-07-11",
  "time": "09:30 AM - 04:00 PM",
  "topic": "MON Annual Healthcare Integration Summit (Melbourne Live)",
  "market": "Australia",
  "presenter": "Simon Schweigert"
 },
 {
  "id": 26,
  "kind": "event",
  "date": "2026-08-14",
  "time": "02:00 PM - 07:00 PM",
  "topic": "Australian Nursing Jobs Grand Expo (Dubai Landmark)",
  "market": "GCC",
  "presenter": "TEAM MWT DUBAI"
 },
 {
  "id": 27,
  "kind": "event",
  "date": "2026-09-05",
  "time": "10:00 AM onwards",
  "topic": "Global Nursing Mobility Networking Seminar (London Hub)",
  "market": "UK & IRELAND",
  "presenter": "TEAM MWT AUSTRALIA"
 },
 {
  "id": 28,
  "kind": "event",
  "date": "2026-10-22",
  "time": "01:00 PM - 06:00 PM",
  "topic": "IHM Practical Enrollment Clinic & Registration Drive",
  "market": "South Asia Srilanka",
  "presenter": "Simon Schweigert"
 },
 {
  "id": 29,
  "kind": "event",
  "date": "2026-03-02",
  "time": "10:00 AM",
  "topic": "Postgraduate Student Orientation and Clinical Induction 2026",
  "market": "Australia",
  "presenter": "Simon Schweigert"
 },
 {
  "id": 30,
  "kind": "event",
  "date": "2026-02-19",
  "time": "04:00 PM",
  "topic": "Middle East Nursing Association Collaborative Assembly",
  "market": "GCC",
  "presenter": "TEAM MWT DUBAI"
 },
 {
  "id": 31,
  "kind": "event",
  "date": "2025-12-10",
  "time": "11:00 AM",
  "topic": "Trans-Pacific Nursing Integration Round-Table Workshop",
  "market": "Canada",
  "presenter": "TEAM MWT AUSTRALIA"
 }
]

export const GCAN_SESSIONS: Session[] = [
 {
  "id": 1,
  "kind": "webinar",
  "date": "2026-06-08",
  "time": "07:00 PM (Local Time)",
  "topic": "Nursing Futures in Australia, with Simon Schweigert COO, IHM",
  "market": "South Asia Srilanka",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/nursing-futures-in-australia-sreelanka.webp"
 },
 {
  "id": 2,
  "kind": "webinar",
  "date": "2026-06-22",
  "time": "07:00 PM (Local Time)",
  "topic": "AHPRA Registration & General Skilled Migration for International Nurses",
  "market": "South Asia Srilanka",
  "presenter": "TEAM MWT AUSTRALIA",
  "image": "/images/webinars/ahpra-registration-general-skilled-migration-sreelanka.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_yxIaiO57Rli2_HjeQCCk7g"
 },
 {
  "id": 3,
  "kind": "webinar",
  "date": "2026-06-29",
  "time": "07:00 PM (Local Time)",
  "topic": "Continue your specialty nursing career in Australia",
  "market": "South Asia Srilanka",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/continue-your-specialty-nursing-career-sreelanka.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_2uJLn5eOTHi89S61o0T1pw"
 },
 {
  "id": 4,
  "kind": "webinar",
  "date": "2026-05-27",
  "time": "07:00 PM (Local Time)",
  "topic": "Nursing Futures in Australia, with Simon Schweigert COO, IHM",
  "market": "South Asia Singapore and Malaysia",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/nursing-futures-in-australia-singapore-malaysia.webp"
 },
 {
  "id": 5,
  "kind": "webinar",
  "date": "2026-06-10",
  "time": "07:00 PM (Local Time)",
  "topic": "AHPRA Registration & General Skilled Migration for International Nurses",
  "market": "South Asia Singapore and Malaysia",
  "presenter": "TEAM MWT AUSTRALIA",
  "image": "/images/webinars/ahpra-registration-general-skilled-migration-singapore-malaysia.webp"
 },
 {
  "id": 6,
  "kind": "webinar",
  "date": "2026-06-24",
  "time": "07:00 PM (Local Time)",
  "topic": "Continue your specialty nursing career in Australia",
  "market": "South Asia Singapore and Malaysia",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/continue-your-specialty-nursing-career-singapore-malaysia.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_bVMx54H-RdS8TQh71ZnFeQ"
 },
 {
  "id": 7,
  "kind": "webinar",
  "date": "2026-05-26",
  "time": "7:00:00 pm (UK) & 8:00pm (Ireland)",
  "topic": "Nursing Futures in Australia, with Simon Schweigert COO, IHM",
  "market": "UK & IRELAND",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/nursing-futures-in-australia-uk-ireland.webp"
 },
 {
  "id": 8,
  "kind": "webinar",
  "date": "2026-06-09",
  "time": "7:00:00 pm (UK) & 8:00pm (Ireland)",
  "topic": "AHPRA Registration & General Skilled Migration for International Nurses",
  "market": "UK & IRELAND",
  "presenter": "TEAM MWT AUSTRALIA",
  "image": "/images/webinars/ahpra-registration-general-skilled-migration-uk-ireland.webp"
 },
 {
  "id": 9,
  "kind": "webinar",
  "date": "2026-06-23",
  "time": "7:00:00 pm (UK) & 8:00pm (Ireland)",
  "topic": "Continue your specialty nursing career in Australia",
  "market": "UK & IRELAND",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/continue-your-specialty-nursing-career-uk-ireland.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_F5lJmjvLQ5OfzvZGwNrH2w"
 },
 {
  "id": 10,
  "kind": "webinar",
  "date": "2026-05-25",
  "time": "1:30 pm (AEST)",
  "topic": "Graduate Certificate in Advanced Nursing at IHM",
  "market": "Australia",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/graduate-certificate-in-advanced-nursing-australia.webp"
 },
 {
  "id": 11,
  "kind": "webinar",
  "date": "2026-06-08",
  "time": "1:30 pm (AEST)",
  "topic": "AHPRA Registration & General Skilled Migration for International Nurses",
  "market": "Australia",
  "presenter": "TEAM MWT AUSTRALIA",
  "image": "/images/webinars/ahpra-registration-general-skilled-migration-australia.webp"
 },
 {
  "id": 12,
  "kind": "webinar",
  "date": "2026-06-22",
  "time": "1:30 pm (AEST)",
  "topic": "Nursing Futures in Australia, with Simon Schweigert COO, IHM",
  "market": "Australia",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/nursing-futures-in-australia-australia.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_epZK2yDcS_-DVY0ibkS_kw"
 },
 {
  "id": 13,
  "kind": "webinar",
  "date": "2026-06-05",
  "time": "6:00 pm (All GCC)",
  "topic": "Nursing Futures in Australia, with Simon Schweigert COO, IHM",
  "market": "GCC",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/nursing-futures-in-australia-gcc.webp"
 },
 {
  "id": 14,
  "kind": "webinar",
  "date": "2026-06-19",
  "time": "6:00 pm (All GCC)",
  "topic": "Continue your specialty nursing career in Australia",
  "market": "GCC",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/continue-your-specialty-nursing-career-gcc.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_wQyByoK-Sh2CGcUbavyo3Q"
 },
 {
  "id": 15,
  "kind": "webinar",
  "date": "2026-06-27",
  "time": "6:00 pm (All GCC)",
  "topic": "AHPRA Registration & General Skilled Migration for International Nurses",
  "market": "GCC",
  "presenter": "TEAM MWT DUBAI",
  "image": "/images/webinars/ahpra-registration-general-skilled-migration-gcc.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_ZfFsnAzNRyGL3Za12bMWzA"
 },
 {
  "id": 16,
  "kind": "webinar",
  "date": "2026-06-02",
  "time": "7:00 pm (Toronto) & 4 pm (Vancouver)",
  "topic": "Nursing Futures in Australia, with Simon Schweigert COO, IHM",
  "market": "Canada",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/nursing-futures-in-australia-canada.webp"
 },
 {
  "id": 17,
  "kind": "webinar",
  "date": "2026-06-16",
  "time": "7:00 pm (Toronto) & 4 pm (Vancouver)",
  "topic": "AHPRA Registration & General Skilled Migration for International Nurses",
  "market": "Canada",
  "presenter": "TEAM MWT AUSTRALIA",
  "image": "/images/webinars/ahpra-registration-general-skilled-migration-canada.webp"
 },
 {
  "id": 18,
  "kind": "webinar",
  "date": "2026-06-30",
  "time": "7:00 pm (Toronto) & 4 pm (Vancouver)",
  "topic": "Continue your specialty nursing career in Australia",
  "market": "Canada",
  "presenter": "Simon Schweigert",
  "image": "/images/webinars/continue-your-specialty-nursing-career-canada.webp",
  "registrationLink": "https://hcigroup.zoom.us/webinar/register/WN_OdlYWro3QUamMGCT_VACPQ"
 },
 {
  "id": 25,
  "kind": "event",
  "date": "2026-07-11",
  "time": "09:30 AM - 04:00 PM",
  "topic": "GCAN Annual Healthcare Integration Summit (Melbourne Live)",
  "market": "Australia",
  "presenter": "Simon Schweigert"
 },
 {
  "id": 26,
  "kind": "event",
  "date": "2026-08-14",
  "time": "02:00 PM - 07:00 PM",
  "topic": "Australian Nursing Jobs Grand Expo (Dubai Landmark)",
  "market": "GCC",
  "presenter": "TEAM MWT DUBAI"
 },
 {
  "id": 27,
  "kind": "event",
  "date": "2026-09-05",
  "time": "10:00 AM onwards",
  "topic": "Global Nursing Mobility Networking Seminar (London Hub)",
  "market": "UK & IRELAND",
  "presenter": "TEAM MWT AUSTRALIA"
 },
 {
  "id": 28,
  "kind": "event",
  "date": "2026-10-22",
  "time": "01:00 PM - 06:00 PM",
  "topic": "IHM Practical Enrollment Clinic & Registration Drive",
  "market": "South Asia Srilanka",
  "presenter": "Simon Schweigert"
 },
 {
  "id": 29,
  "kind": "event",
  "date": "2026-03-02",
  "time": "10:00 AM",
  "topic": "Postgraduate Student Orientation and Clinical Induction 2026",
  "market": "Australia",
  "presenter": "Simon Schweigert"
 },
 {
  "id": 30,
  "kind": "event",
  "date": "2026-02-19",
  "time": "04:00 PM",
  "topic": "Middle East Nursing Association Collaborative Assembly",
  "market": "GCC",
  "presenter": "TEAM MWT DUBAI"
 },
 {
  "id": 31,
  "kind": "event",
  "date": "2025-12-10",
  "time": "11:00 AM",
  "topic": "Trans-Pacific Nursing Integration Round-Table Workshop",
  "market": "Canada",
  "presenter": "TEAM MWT AUSTRALIA"
 }
]
