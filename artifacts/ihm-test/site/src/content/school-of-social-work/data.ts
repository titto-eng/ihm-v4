// School of Social Work: the 13 career pages and 13 event pages, copied from the static microsite that ihm.edu.au serves under
// /school-of-social-work/ (DEC-36). Images are in public/images/school-of-social-work/ (converted to WebP from the microsite's own
// files, the copy in the old site's school-of-social-work folder).

export type SswCareer = {
  slug: string
  /** Page <title> (without the " | IHM School of Social Work" suffix). */
  title: string
  desc: string
  heading: string
  lead: string
  dayToDay: string[]
  whereYouWork: string[]
  pathway: string
}

export type SswEvent = {
  slug: string
  title: string
  summary: string
  story: string[]
  /** Number of photos, at /images/school-of-social-work/events/<slug>/<n>.webp (1-based). */
  photos: number
}

export const SSW_BASE = '/school-of-social-work'
export const sswImg = (p: string) => `/images/school-of-social-work/${p}`
export const eventPhoto = (slug: string, n: number) => sswImg(`events/${slug}/${n}.webp`)

export const SSW_CAREERS: SswCareer[] = [
  {
    slug: 'mental-health', title: 'Mental Health Social Work Careers', heading: 'Mental health social work.',
    desc: 'How a Bachelor of Social Work leads to mental health practice in Australia - clinical roles, settings, Medicare accreditation pathways and demand.',
    lead: "Mental health is one of the largest and fastest-growing areas of social work practice in Australia. Mental health social workers provide psychosocial assessment, therapeutic interventions and counselling, and coordinate care for people experiencing mental ill-health - always in the context of a person's relationships, housing, culture and community.",
    dayToDay: ['Psychosocial assessment and mental health treatment plans', 'Therapeutic interventions and focused psychological strategies', 'Crisis intervention and suicide risk assessment', 'Care coordination across clinical and community teams', 'Family support and psychoeducation'],
    whereYouWork: ['Community mental health services', 'Hospital inpatient and outpatient units', 'headspace and youth mental health services', 'Private practice (with AASW accreditation)', 'Crisis assessment and treatment teams'],
    pathway: 'Experienced social workers can pursue AASW accreditation as a Mental Health Social Worker, which can lead to providing Medicare-funded mental health services - one of the few allied health professions with this pathway.',
  },
  {
    slug: 'hospitals-and-healthcare', title: 'Hospital Social Work Careers', heading: 'Hospital and healthcare social work.',
    desc: 'Hospital social workers manage discharge planning, safeguarding and family support in Australian health services. See where a BSW can take you.',
    lead: 'Hospital social workers are core members of multidisciplinary healthcare teams. They help patients and families navigate serious illness, injury and hospitalisation - assessing psychosocial needs, planning safe discharges and safeguarding people at risk.',
    dayToDay: ['Discharge planning and coordinating post-hospital supports', 'Psychosocial assessment of patients and carers', 'Safeguarding responses for patients at risk of harm', 'Adjustment-to-illness counselling and grief support', 'Linking families to community services, NDIS and My Aged Care'],
    whereYouWork: ['Public and private hospitals', 'Emergency departments', 'Rehabilitation and subacute services', 'Palliative care teams', 'Community health centres'],
    pathway: 'The IHM BSW includes 1,000 hours of supervised field education across at least two distinct practice settings - health placements such as hospital and community health teams are a core part of the placement network.',
  },
  {
    slug: 'child-protection-and-family-services', title: 'Child Protection Social Work Careers', heading: 'Child protection and family services.',
    desc: 'Child protection and family services social work in Australia - statutory practice, family preservation and out-of-home care roles for BSW graduates.',
    lead: 'Child protection social workers safeguard children and young people while working to strengthen and preserve families. This is demanding, statutory practice where assessment skills, ethical judgement and cultural responsiveness matter every day.',
    dayToDay: ['Risk and safety assessment for children and young people', 'Case management within statutory frameworks', 'Family preservation and reunification work', 'Court reports and giving evidence', 'Working with kinship and foster carers'],
    whereYouWork: ['State child protection departments', 'Family preservation services', 'Out-of-home care agencies', 'Early intervention and family support programs', 'Aboriginal community-controlled organisations'],
    pathway: "Government child protection departments are among the largest employers of new social work graduates in Australia, with structured graduate programs in most states - including the Department of Child Protection placements in IHM's partner network.",
  },
  {
    slug: 'family-and-domestic-violence', title: 'Family & Domestic Violence Social Work', heading: 'Family and domestic violence.',
    desc: 'Specialist family violence social work - safety planning, risk assessment and recovery support. A growing area of practice for BSW graduates.',
    lead: "Family and domestic violence practitioners support victim-survivors to be safe and recover, while holding systems accountable. Social workers bring trauma-informed practice, risk assessment frameworks and advocacy to one of Australia's most urgent social challenges.",
    dayToDay: ['Safety planning and specialist risk assessment (e.g. MARAM in Victoria)', 'Crisis response and refuge intake', 'Court support and intervention order assistance', 'Therapeutic recovery work with adults and children', 'Coordinating with police, courts, housing and child protection'],
    whereYouWork: ['Specialist family violence services', 'Refuges and crisis accommodation', 'The Orange Door and intake hubs (Victoria)', "Men's behaviour change programs", 'Community legal centres'],
    pathway: "Sustained national investment in family violence responses has created strong demand for qualified social workers with specialist risk assessment skills - skills built through the IHM BSW's practice-led curriculum and field education.",
  },
  {
    slug: 'disability-and-ndis', title: 'Disability & NDIS Social Work Careers', heading: 'Disability and the NDIS.',
    desc: 'Social work in the NDIS and disability sector - support coordination, advocacy and capacity building roles for Bachelor of Social Work graduates.',
    lead: "The National Disability Insurance Scheme has reshaped Australia's disability sector and created significant demand for social workers. Practitioners support people with disability to exercise choice and control, build capacity and navigate a complex service system.",
    dayToDay: ['Support coordination and psychosocial recovery coaching', 'NDIS access requests and plan reviews', "Advocacy for participants' rights and entitlements", 'Capacity building with participants and families', 'Safeguarding and restrictive practice oversight'],
    whereYouWork: ['NDIS support coordination providers', 'Psychosocial disability services', 'Disability advocacy organisations', 'The NDIA and partner organisations', 'Ability and community support providers'],
    pathway: "Placement partners in IHM's network include NDIS and ability support providers, giving students direct experience of the scheme before graduation.",
  },
  {
    slug: 'aged-care', title: 'Aged Care Social Work Careers', heading: 'Aged care social work.',
    desc: 'Aged care social work in Australia - assessment, advocacy and support for older people and carers. Career paths for BSW graduates.',
    lead: "Australia's ageing population is driving sustained demand for social workers in aged care. Practitioners support older people's dignity, rights and wellbeing through assessment, counselling, advocacy and support for families and carers.",
    dayToDay: ['Comprehensive psychosocial assessment for older people', 'Support with My Aged Care access and navigation', 'Elder abuse identification and response', 'Grief, loss and end-of-life support', 'Carer support and family mediation'],
    whereYouWork: ['Residential aged care', 'Home and community care programs', 'Aged care assessment teams', 'Hospital geriatric and memory services', 'Seniors rights and advocacy services'],
    pathway: 'Aged care reform following the Royal Commission has expanded allied health and social work roles across the sector - IHM placement partners include residential aged care providers such as San Carlos-Aged Care.',
  },
  {
    slug: 'housing-and-homelessness', title: 'Housing & Homelessness Social Work', heading: 'Housing and homelessness.',
    desc: 'Housing and homelessness social work - assertive outreach, crisis accommodation and tenancy sustainment careers for social work graduates.',
    lead: 'Housing is a human right and a foundation for health and wellbeing. Social workers in this field combine practical crisis response with advocacy for systemic change, supporting people to find and keep safe housing.',
    dayToDay: ['Crisis and transitional housing intake and assessment', 'Assertive outreach with people sleeping rough', 'Tenancy sustainment and eviction prevention', 'Coordinating with mental health, AOD and family violence services', 'Housing advocacy and policy work'],
    whereYouWork: ['Specialist homelessness services', 'Community housing providers', 'Assertive outreach teams', 'Youth foyers and refuges', 'Local government and policy units'],
    pathway: 'Housing and homelessness services value social work graduates for their systemic thinking and case coordination skills - capabilities developed across the IHM BSW curriculum and field placements with community support partners.',
  },
  {
    slug: 'schools-and-education', title: 'School Social Work Careers', heading: 'School social work.',
    desc: 'School social workers support student wellbeing, attendance and family engagement in Australian schools. Explore this career path with a BSW.',
    lead: 'School social workers support students to engage with education by addressing the wellbeing, family and social factors that affect learning. They are a bridge between school, home and community services.',
    dayToDay: ['Individual counselling and wellbeing support for students', 'Attendance and engagement interventions', 'Responding to child safety concerns in schools', 'Group programs on resilience, relationships and mental health', 'Connecting families to community supports'],
    whereYouWork: ['Government, Catholic and independent schools', 'Student wellbeing and inclusion teams', 'Alternative and flexible learning programs', 'Early childhood and family services', 'Education department regional teams'],
    pathway: 'Growing investment in student mental health and wellbeing teams across Australian schools is expanding social work roles in education settings.',
  },
  {
    slug: 'alcohol-and-other-drugs', title: 'AOD Social Work Careers', heading: 'Alcohol and other drug services.',
    desc: 'Alcohol and other drug (AOD) social work - harm reduction, counselling and residential rehabilitation careers for social work graduates.',
    lead: 'AOD social workers support people to reduce harm from alcohol and other drug use, grounded in evidence, compassion and a commitment to meeting people where they are.',
    dayToDay: ['AOD assessment and treatment planning', 'Individual and group counselling', 'Harm reduction education and support', 'Withdrawal and residential rehabilitation support', 'Dual diagnosis work with mental health services'],
    whereYouWork: ['Community AOD treatment services', 'Residential rehabilitation programs', 'Withdrawal (detox) units', 'Needle and syringe programs', 'Forensic and court-ordered treatment programs'],
    pathway: 'AOD practice draws directly on the counselling, group work and case management skills developed through the IHM BSW and its 1,000 hours of supervised field education.',
  },
  {
    slug: 'justice-and-corrections', title: 'Justice & Corrections Social Work', heading: 'Justice and corrections.',
    desc: 'Forensic and justice social work in Australia - youth justice, courts and corrections careers for Bachelor of Social Work graduates.',
    lead: 'Justice social workers work at the intersection of welfare and the legal system - supporting rehabilitation, addressing the causes of offending and advocating for fair treatment of people in contact with the justice system.',
    dayToDay: ['Assessment and case management of people on community orders', 'Court reports and pre-sentence assessments', 'Rehabilitation and reintegration planning', 'Youth justice supervision and diversion programs', 'Victim support and restorative justice processes'],
    whereYouWork: ['Youth justice services', 'Adult corrections and community correctional services', 'Courts (including specialist and drug courts)', 'Forensic mental health services', 'Post-release and reintegration programs'],
    pathway: "Social work's dual focus on individual needs and structural critique - a core commitment of the IHM program - is central to ethical practice in justice settings.",
  },
  {
    slug: 'community-development', title: 'Community Development Careers', heading: 'Community development.',
    desc: 'Community development social work - place-based programs, community organising and capacity building careers with a Bachelor of Social Work.',
    lead: 'Community development practitioners work with communities rather than for them - building on local strengths, organising collective action and creating the conditions for communities to thrive.',
    dayToDay: ['Community consultation and needs assessment', 'Designing and running place-based programs', 'Supporting community groups and resident action', 'Grant writing and program evaluation', 'Partnership building across services and government'],
    whereYouWork: ['Neighbourhood and community centres', 'Local government community teams', 'Multicultural and settlement services', 'Aboriginal community-controlled organisations', 'International development NGOs'],
    pathway: "IHM's diverse, internationally rich student community brings lived experience that is a genuine asset in multicultural community development practice across Australia and beyond.",
  },
  {
    slug: 'government-and-public-policy', title: 'Social Policy Careers', heading: 'Government and public policy.',
    desc: 'Policy and government careers for social workers - program design, policy analysis and advocacy roles for Bachelor of Social Work graduates.',
    lead: 'Social workers in policy roles shape the systems that everyone else practises within. Their frontline understanding of how policy lands in real lives makes them powerful policy analysts, program designers and advocates.',
    dayToDay: ['Policy analysis and briefing papers', 'Program design, commissioning and evaluation', 'Stakeholder consultation and co-design', 'Legislative review and reform advocacy', 'Data analysis and social research translation'],
    whereYouWork: ['Federal and state government departments', 'Peak bodies and advocacy organisations', 'Royal commissions and inquiries', 'Think tanks and research institutes', 'Local government social planning teams'],
    pathway: 'The IHM BSW builds structural critique alongside direct practice skills, preparing graduates who can move between frontline work and the policy roles that reshape it.',
  },
  {
    slug: 'research-and-academia', title: 'Social Work Research Careers', heading: 'Research and academia.',
    desc: 'Research and academic careers in social work - practice research, teaching and higher degrees after a Bachelor of Social Work.',
    lead: "Social work research builds the evidence base for practice - testing what works, amplifying the voices of service users and holding systems to account. Academic social workers teach and mentor the profession's next generation.",
    dayToDay: ['Designing and conducting practice-based research', 'Publishing in peer-reviewed journals', 'Teaching and supervising social work students', 'Evaluation of programs and services', 'Community-based participatory research'],
    whereYouWork: ['Universities and higher education providers', 'Research institutes and centres', 'Government research and evaluation units', 'NGO research and policy teams', 'PhD and research higher degree pathways'],
    pathway: "IHM's practitioner-scholars model practice-based research - developing projects that build social work knowledge directly from real-world practice experience, and involving students in that scholarship.",
  },
]

export const SSW_EVENTS: SswEvent[] = [
  {
    slug: 'wayapa-wuurrk', title: 'Wayapa Wuurrk', photos: 10,
    summary: 'Exploring the deep connection between Country, wellbeing and Indigenous wisdom.',
    story: [
      'Our Bachelor of Social Work staff at the Institute of Health & Management Melbourne Campus had the privilege of participating in an inspiring Indigenous workshop session led by Prof. Maria Mackay from Wayapa Wuurrk.',
      'Through this meaningful experience, our team explored the deep connection between Country, wellbeing and Indigenous wisdom. Wayapa® is an Earth-centred practice that reminds us that caring for Country is the first step towards creating balance in Earth, Mind, Body and Spirit.',
      'We extend our sincere thanks to Prof. Maria Mackay for sharing her knowledge, stories and teachings with our staff.',
    ],
  },
  {
    slug: 'back-on-campus-and-ready-for-an-exciting-new-semester', title: 'Back on campus and ready for a new semester', photos: 7,
    summary: 'Connection, conversation and a warm welcome back to campus.',
    story: [
      'Our Bachelor of Social Work students kicked off Week 1 after the semester break with an engaging student session filled with connection, conversations and a warm welcome back to campus.',
      'It was a great opportunity to reconnect, meet fellow students and start the new semester with energy and enthusiasm. Here’s to another semester of learning, growth and unforgettable experiences at IHM.',
    ],
  },
  {
    slug: 'challenges-support-pathways-care', title: 'Challenges & Support Pathways, Care', photos: 8,
    summary: 'Building confidence through knowledge, reflection and real-world preparation.',
    story: [
      'Our Bachelor of Social Work students participated in a pre-placement workshop delivered by Dr Moses G. Adepoju from Delba Counselling.',
      'With the theme “Challenges & Support Pathways, Care”, Dr Adepoju shared valuable insights into navigating challenges in the social work profession, building effective support pathways and developing the skills needed to provide compassionate and meaningful care.',
      'Dr Moses Adepoju is a clinical social worker, educator, facilitator, personal and executive coach, psychotherapist, clinical counsellor and professional supervisor. His extensive academic and professional experience brought valuable expertise and perspectives to our students.',
    ],
  },
  {
    slug: 'pre-placement-preparation', title: 'Pre-Placement Preparation with Ben William', photos: 9,
    summary: 'Practice-based insight into contemporary social work and placement readiness.',
    story: [
      'We were privileged to host Ben William from Luminar Health for a Pre-Placement Preparation Workshop with our Bachelor of Social Work students at IHM.',
      'With over 26 years of experience across community services in Victoria, Ben shared insights from alcohol and other drug services, forensic settings, residential rehabilitation, withdrawal units, intake and assessment, counselling, harm reduction and medically supervised environments.',
      'Students connected theory with lived practice and gained a clearer understanding of workforce expectations, service challenges and the realities of contemporary social work practice.',
    ],
  },
  {
    slug: 'pre-placement-preparation-workshop', title: 'Pre-Placement Preparation Workshop', photos: 9,
    summary: 'Preparing students for meaningful placement experiences.',
    story: [
      'A big thank you to Michael from the IHM Placement Team for conducting an engaging Pre-Placement Preparation Workshop for our Bachelor of Social Work students, alongside Ambika Achanta and Binoy Joseph.',
      'The session provided valuable guidance on placement expectations, professional practice, communication skills and preparing students for real-world social work environments. Workshops like these play an important role in building student confidence and readiness before entering the field.',
    ],
  },
  {
    slug: 'building-meaningful-community-connections-through-real-world-learning', title: 'Building meaningful community connections', photos: 9,
    summary: 'Real-world learning with a valued community placement partner.',
    story: [
      'We were pleased to welcome Simone Schweigert from Clota Cottage Neighbourhood House, one of our valued placement partners supporting Bachelor of Social Work students through placements, meaningful community engagement and real-world learning experiences.',
      'Partnerships like these provide students with meaningful real-world experience, professional guidance and the opportunity to make a positive impact within the community.',
    ],
  },
  {
    slug: 'guest-speaker-professor-robert-bland-am', title: 'Guest Speaker Professor Robert Bland AM', photos: 7,
    summary: 'Self-awareness, ethical practice, lived experience and resilience in the profession.',
    story: [
      'Students had the privilege of learning from one of Australia’s most respected voices in mental health and social work practice, whose contributions to the AASW Practice Standards and Mental Health Practice Standards continue to shape the profession.',
      'Professor Bland shared valuable insights on self-awareness, ethical practice, lived experience, resilience and the realities of working alongside individuals through some of life’s most challenging moments.',
      'His reflections encouraged students to embrace compassion, courage and professional responsibility as they prepare for their future careers in social work.',
    ],
  },
  {
    slug: 'national-reconciliation-week', title: 'National Reconciliation Week', photos: 9,
    summary: 'Honouring culture, connection and community at IHM Melbourne.',
    story: [
      'We celebrated National Reconciliation Week by coming together in the spirit of reflection, respect and reconciliation.',
      'We were privileged to begin with a heartfelt Welcome to Country by Aunty Narweet, followed by a powerful Yidaki performance by Ben.',
      'It was a meaningful day of learning, listening and celebrating the rich cultures and histories of Aboriginal and Torres Strait Islander peoples.',
    ],
  },
  {
    slug: 'practice-education-forum', title: 'Practice Education Forum', photos: 6,
    summary: 'A day of learning, collaboration and professional growth with industry insights.',
    story: [
      'A wonderful day of learning, collaboration and professional growth took place at the Practice Education Forum held on 13 May for our Bachelor of Social Work students at the Melbourne campus.',
      'The forum gave students an opportunity to engage with industry insights, strengthen practice knowledge and prepare for meaningful careers in social work. We are proud to see our future social workers taking confident steps toward making a positive impact in the community.',
    ],
  },
  {
    slug: 'advancing-person-centred-care-in-the-age-of-artificial-intelligence', title: 'Advancing Person-Centred Care in the Age of Artificial Intelligence', photos: 6,
    summary: 'Ethical, person-centred care in an increasingly digital landscape.',
    story: [
      'IHM students participated in an engaging guest lecture by Prof. John Kelly on Advancing Person-Centred Care in the Age of Artificial Intelligence.',
      'The session explored how AI is transforming healthcare and social work while reinforcing the importance of maintaining ethical, person-centred care in an increasingly digital landscape.',
      'Strong engagement, curiosity and thoughtful discussion helped turn the session into an impactful learning experience at our Lonsdale campus.',
    ],
  },
  {
    slug: '10-years-of-ihm-a-decade-of-impact', title: '10 Years of IHM - A Decade of Impact', photos: 9,
    summary: 'Celebrating a decade of growth, learning and leadership.',
    story: [
      'We proudly celebrated IHM’s 10th anniversary with our students at Lonsdale Campus.',
      'Dr Bijo shared how IHM has grown into a trusted institution in Nursing and Social Work, preparing professionals who make a real difference in communities across Australia and beyond.',
      'Thank you to our students, faculty and teams who continue to be part of this journey. Here’s to the next decade of growth, learning and leadership.',
    ],
  },
  {
    slug: 'student-engagement-activity', title: 'Student Engagement Activity', photos: 13,
    summary: 'Learning, connection, celebration and a proud certificate moment.',
    story: [
      'A great day of learning, connection and celebration for our Bachelor of Social Work students.',
      'From engaging activities to meaningful reflections and a proud certificate moment, we loved seeing the energy, teamwork and passion everyone brought. Keep growing, keep leading and keep making a difference.',
    ],
  },
  {
    slug: 'learning-beyond-the-classroom', title: 'Learning Beyond the Classroom', photos: 12,
    summary: 'A powerful Wayapa workshop grounded in culture, connection and respect.',
    story: [
      'Our Bachelor of Social Work students at IHM Melbourne took part in a powerful and thought-provoking workshop with Prof. Maria Mackay and Ashlee Williams Barnes from Wayapa Wuurrk.',
      'The session gave students an opportunity to engage with Indigenous knowledge, perspectives and practices while reflecting on the importance of culture, connection and respect in social work.',
      'Through meaningful conversations and shared teachings, students gained valuable insights that will help shape culturally responsive practice and their future roles as social workers.',
    ],
  },
]

/** Photo for each career area (career cards and the career page hero), from the School's own photos. */
const E = (event: string, n: number) => eventPhoto(event, n)
export const CAREER_PHOTO: Record<string, string> = {
  'mental-health': E('challenges-support-pathways-care', 2),
  'hospitals-and-healthcare': E('advancing-person-centred-care-in-the-age-of-artificial-intelligence', 1),
  'child-protection-and-family-services': E('pre-placement-preparation-workshop', 3),
  'family-and-domestic-violence': E('student-engagement-activity', 2),
  'disability-and-ndis': E('back-on-campus-and-ready-for-an-exciting-new-semester', 1),
  'aged-care': sswImg('community-practice.webp'),
  'housing-and-homelessness': sswImg('placement.webp'),
  'schools-and-education': sswImg('student-collaboration.webp'),
  'alcohol-and-other-drugs': E('pre-placement-preparation', 2),
  'justice-and-corrections': E('guest-speaker-professor-robert-bland-am', 2),
  'community-development': E('learning-beyond-the-classroom', 2),
  'government-and-public-policy': sswImg('research-collaboration.webp'),
  'research-and-academia': E('advancing-person-centred-care-in-the-age-of-artificial-intelligence', 2),
}
