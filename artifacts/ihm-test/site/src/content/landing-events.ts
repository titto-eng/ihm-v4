// Copy for the two EventInvite landing pages: /lp/mwt-global-scholarship/ and /lp/webinar-global-agents-ncap/ (rows in
// src/content/landing.ts, form lp-event-email). From the old lp/<slug>/index.php. The "How to Apply" infographic is rebuilt as steps.
// The contact's personal mobile and mailbox are not republished (AGENTS.md rule 4): name and role stay, the role mailboxes are used.

export const OFFICES = [
  { name: 'Sydney Parramatta Office', address: 'Level 3, 1 Wentworth Street, Parramatta, NSW, 2150, Australia', tel: '02 8228 6403' },
  { name: 'Melbourne CBD Office', address: 'Level 5, 131 Queen Street, Melbourne, VIC 3000, Australia', tel: '08 6212 8289' },
  { name: 'Perth CBD Office', address: 'Level 4, 12 St. Georges Terrace, Perth, WA, 6000, Australia', tel: '08 6212 8289' },
]
export const LOCATED = 'We are located in Melbourne CBD • North Melbourne • Perth • Sydney'

export const MWT_SCHOLARSHIP = {
  title: 'MWT Global $500 Scholarship',
  kicker: 'Free Consultation',
  eligibility: [
    'The course is applied through MWT Global',
    'Available for primary CoE course commencement in 2021 and after',
    'Open to Australian on-shore international students only (Any nationality)',
    'Independent ELICOS course (include General English and English for Academic Purpose) might not be eligible. (Confirm with our consultant)',
    'It is not conflicting with any scholarship policy from the university',
  ],
  steps: [
    'Book a counselling consultation with MWT Global Education and Migration consultant',
    'Check academic, English language and financial requirement',
    'Make a decision on which course you want to apply',
    'Prepare the relevant documents requested by your counsellor',
    'Submit the application to the course provider',
    'Accept your offer',
    'Finalise the tuition fees payment and Overseas Student Health Cover (OSHC)',
    'Receive the Confirmation of Enrolment (CoE)',
    'Apply for the student visa',
    'Start your course and receive MWT Global $500 Scholarship',
  ],
  contact: { heading: 'Any questions, Please contact:', name: 'Owen Wang', role: 'Business Development Manager', email: 'education@mwtglobal.com.au' },
  partners: ['Charles Darwin University', 'Edith Cowan University', 'Flinders University', 'Griffith University', 'Health Careers Language Academy (HCLA)', 'Institute of Health and Nursing Australia (IHNA)', 'Western Sydney University', 'University of Southern Queensland', 'University of Wollongong', 'Navitas', 'Murdoch University', 'Institute of Health & Management (IHM)'],
}

export const AGENTS_WEBINAR = {
  title: 'IHM Pathway to Nursing Registration in Australia program',
  kicker: 'Online information session for global educational agents',
  greeting: 'Dear Educational Consultancy Partner',
  body: [
    'In this webinar, the IHM team will introduce the Pathway to Nursing Registration in Australia program to help overseas registered nurses successfully become registered nurses in Australia.',
    'After this webinar, your team will be invited to represent IHM to recruit overseas registered nurses to study at the Institute of Health & Management (IHM). IHM is a higher education provider which belongs to HCI.',
  ],
  contact: { heading: 'Any questions, Please contact:', name: 'Owen Wang', role: 'Business Development Manager (East Asia and Southeast Asia)', email: 'partner@hci.edu.au' },
  signUp: 'Sign up here and we will inform you of the online session date and time',
}
