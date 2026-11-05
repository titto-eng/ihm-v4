// Student support pages (WordPress pages 127, 132, 6683, 5431, 138, 135, 3154, 5776): the hub, external and internal
// counselling, accessibility, external services, complaints and appeals, student safety and cybersecurity tips. Extracted from
// the page content (2026-10-30). Staff appear with name, role, location and bio only; contact goes to the Student Support mailbox
// (no personal mailboxes). Images: public/images/student-support/ (live-only ones via legacy-assets.ts).

export const SUPPORT_EMAIL = 'ihmstudentsupport@ihm.edu.au'
export const LIVECHAT = 'https://secure.livechatinc.com/licence/12907932/v2/open_chat.cgi?groups=1'

export const SUPPORT_NAV = [
  { href: '/student-support-and-services/', label: 'Support hub' },
  { href: '/counselling/', label: 'Counselling (External)' },
  { href: '/student-counselling-internal/', label: 'Counselling (Internal)' },
  { href: '/disability-accessibility-support/', label: 'Accessibility' },
  { href: '/complaints-and-appeals/', label: 'Complaints & Appeals' },
  { href: '/external-services/', label: 'External Services' },
  { href: '/student-safety/', label: 'Safety & Wellbeing' },
  { href: '/cybersecurity-tips/', label: 'Cybersecurity' },
]

/** /student-support-and-services/ tiles, in the old order. `group` only arranges them on the page. */
export const SUPPORT_TILES = [
  { group: 'Wellbeing', title: 'Counselling Support (External)', href: '/counselling/' },
  { group: 'Wellbeing', title: 'Counselling Support (Internal)', href: '/student-counselling-internal/' },
  { group: 'Wellbeing', title: 'Student Support - Access, Accessibility and Equity', href: '/disability-accessibility-support/' },
  { group: 'Wellbeing', title: 'External Services', href: '/external-services/' },
  { group: 'Your studies', title: 'Policies & Procedures', href: '/policies-procedures/' },
  { group: 'Your studies', title: 'Complaints & Appeals', href: '/complaints-and-appeals/' },
  { group: 'Your studies', title: 'Credit & RPL', href: '/credit-and-recognition-of-prior-learning/' },
  { group: 'Your studies', title: 'Student Success (GCAN)', href: '/student-success-gcan/' },
  { group: 'Your studies', title: 'Student Application for an Award / Testamur', href: 'https://forms.office.com/Pages/ResponsePage.aspx?id=niM6_UBfsk2J5NeaEQ7oODdGTkhoKrFPhr2xZZ43US5UOEg4Wkg4SDIxWTZFQ0dQQjBEQkZXWDJJOS4u' },
  { group: 'Money & documents', title: 'Pay Online', href: '/payment-options/' },
  { group: 'Money & documents', title: 'Fees, Charges and Refund', href: '/fees-and-charges/' },
  { group: 'Money & documents', title: 'Student Handbook (International)', href: '/International-SHB/International-SHB.pdf' },
  { group: 'Money & documents', title: 'Student Handbook (Domestic)', href: '/IHM_Domestic_SHB/Domestic-SHB.pdf' },
  { group: 'Money & documents', title: 'Advice for International Students', href: '/advice-for-international-students/' },
  { group: 'Connect', title: 'Yammer – Student Engagement Platform', body: 'Connect with fellow students, participate in discussions, and stay updated.', href: 'https://engage.cloud.microsoft/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIzNTAzMzM1MDE0NCJ9/all' },
  { group: 'Connect', title: 'Contact us via LiveChat!', body: 'Get instant support. Available 24/7', href: LIVECHAT },
] as const

// ------------------------------------------------------------------ Counselling (external)
export const TALK_ABOUT = ['Stress and depression', 'Relationships and family matters', 'Sexual assault', 'Identity issues', 'Study issues', 'Suicidal thoughts or self-injury', 'Homesickness', 'Adjusting to the new environment or the Institute', 'Motivation issues', 'Exam stress', 'Any other matters you would like to talk about in confidence.']

export const RELATIONSHIPS_AUSTRALIA = {
  about: 'Relationships Australia is a leading provider of relationship support services for individuals, families, and communities. It has offices in WA, NSW, and VIC making it convenient for IHM students to access their services. They are a community-based, not-for-profit Australian organisation with no religious affiliations. Their services are for all members of the community, regardless of religious beliefs, age, gender, sexual orientation, lifestyle choice, cultural background, or economic circumstances.',
  access: 'IHM students can access Counselling and Support Services from Relationships Australia. Upon identifying the counselling requirements for IHM students, the Student Support Officer will coordinate and plan for the counselling sessions. Relationships Australia will contact the students and organise their appointments.',
  costs: [
    'Up to two (2) sessions over a 12-month period are available free of charge at no costs to IHM students.',
    'Additional sessions requested by students will be borne by the students’ cost at Relationships Australia’s standard private counselling rates (indicative costs are $150 per session).',
    'Counselling rates for additional private sessions are also based on student income.',
  ],
  href: 'https://www.relationships.org.au/',
}

export const OTHER_COUNSELLING = [
  { name: 'Beyond Blue', phone: '1300 22 4636', hours: '24 hours / 7 days a week', href: 'https://www.beyondblue.org.au/', body: 'Beyond Blue is another counselling and support agency that students can access for support and advice. Beyond Blue is a registered ‘charity’ with the Australian Charities and Not-for-profits Commission providing information and support to help anyone in Australia achieve their best possible mental health, regardless of age and/or location. They offer support, provide information and advice, and point the students to where they can get help.' },
  { name: 'Head to Health', href: 'https://www.headtohealth.gov.au/', body: 'Students are also encouraged to explore the Head to Health website, where students can find digital mental health services from some of Australia’s most trusted mental health organisations, including the numbers to 24×7 phone counselling services that are free to access. Resources listed on Head to Health are trusted Australian service providers with free or low-cost digital mental health resources that are nationally available.' },
  { name: 'Embrace Multicultural Mental Health services', href: 'https://embracementalhealth.org.au/', body: 'Students can also find information and support in other languages through Embrace Multicultural Mental Health services.' },
  { name: '13YARN', phone: '13 92 76', hours: '24 hours / 7 days a week', href: 'https://www.13yarn.org.au/', body: '13YARN is a dedicated 24/7 crisis support line by Aboriginal and Torres Strait Islander peoples. It offers a culturally safe and respectful space for individuals to speak with trained Indigenous crisis supporters. This service is free, available nationwide, and aims to provide tailored mental health support for the First Nations community.' },
]

// ------------------------------------------------------------------ Counselling (internal)
export const INTERNAL_COUNSELLING = {
  intro: [
    'At the Institute of Health & Management (IHM), we understand that the journey of education can sometimes be overwhelming. Balancing academic responsibilities with personal life, especially in a new environment, can lead to stress and emotional challenges. That’s why we are committed to offering comprehensive counselling services, designed to support your mental health and well-being throughout your time at IHM.',
    'Our Student Counselling Services provide a safe, confidential space where you can share your concerns, receive guidance, and explore strategies for managing both academic and personal challenges. Our professional counsellors are here to help you build resilience, manage stress, and focus on achieving your academic goals.',
  ],
  pastoral: 'At IHM, we recognize that student well-being encompasses more than just academic success—it involves emotional, spiritual, and social well-being as well. Our Pastoral Care services are designed to provide holistic support, ensuring you feel cared for and valued as a member of the IHM community. Whether you’re navigating personal difficulties, dealing with homesickness, or adjusting to a new culture, we’re here to support you.',
  pastoralHelp: [
    ['Emotional Support', 'We provide a compassionate and understanding space to help you process and manage personal challenges.'],
    ['Spiritual Guidance', 'If you’re feeling lost or seeking deeper meaning, our counsellors can offer spiritual support in line with your values and beliefs.'],
    ['Community Engagement', 'We encourage students to engage in campus life, helping to foster a sense of belonging and connection with others.'],
  ],
  pastoralClose: 'By offering pastoral care, we aim to create an inclusive, caring environment where all students can thrive. We encourage you to reach out if you need help managing your well-being beyond academic pressures.',
  mental: 'Maintaining good mental health is essential to succeeding in both your studies and your personal life. Our Mental Health Support services are here to assist you in managing any emotional or psychological challenges you may face during your time at IHM. We recognise that students may experience issues such as stress, anxiety, depression, or other mental health concerns. Whether you’re feeling overwhelmed by academic demands, facing personal struggles, or need support coping with stress, our experienced counsellors are here to listen and help.',
  mentalServices: [
    ['Individual Counselling Sessions', 'We offer one-on-one, confidential counselling to help you address personal concerns in a supportive setting.'],
    ['Stress and Anxiety Management', 'Learn techniques and coping mechanisms to manage stress, reduce anxiety, and improve your overall mental health.'],
    ['Well-being Workshops', 'Attend our workshops to develop practical skills for maintaining emotional and mental well-being, including mindfulness, time management, and relaxation techniques.'],
    ['Crisis Intervention', 'If you find yourself in an emotional or psychological crisis, we are here to offer immediate support and guidance.'],
  ],
  team: [
    {
      name: 'Dr. Alex Pannicottu Oommen', role: 'Librarian and eResources Coordinator · Pastoral Care', location: 'North Melbourne', photo: '/images/people/alex-pannicottu-oommen.webp', profile: '/dr-alex-oommen/',
      bio: 'Rev. Fr. Dr. Alex Pannicottu Oommen is an ordained priest in the Jacobite Syrian Christian Church with over 16 years of experience in pastoral ministry, theological education, and academic leadership across Australia and abroad. He holds a PhD in Christian Studies, with a specialization in Church history and liturgical heritage. Currently, he provides pastoral care to students at IHM, while also serving as the institution\'s Librarian and eLearning Coordinator. Dr. Alex’s academic and pastoral work integrates theological reflection with the innovative use of digital tools to enhance learning and spiritual growth. His approach fosters a dynamic environment where faith, scholarship, and technology converge, supporting the intellectual, emotional, and spiritual development of students.',
    },
    {
      name: 'Som Varghese', role: 'Course Coordinator · Pastoral Care', location: 'Brisbane', photo: '/images/student-support/som-varghese.webp',
      bio: 'Som Varghese-Thomas is a seasoned Christian minister and registered nurse academic, bringing over 32 years of diverse nursing experience from India, Kuwait, New Zealand, and Australia. As a South Indian-born New Zealander, she combines a unique cultural perspective with her dedication to serving others. Currently based in Brisbane as the lead pastor of a congregation in the northern suburbs, Som has been an active Christian minister with Life Churches International (LCI) for over 15 years, supporting youth, women, and couples in their journeys of faith and personal growth. In her role as a counselor and pastoral care provider, Som offers a compassionate, holistic approach to student wellbeing, grounded in her extensive ministry background.',
    },
    { name: 'Vishwa Mehta', role: 'Counsellor — Student & Staff Wellbeing', location: 'Melbourne', photo: '/images/student-support/vishwa-mehta.webp', legacy: true },
  ],
}

// ------------------------------------------------------------------ Accessibility
export const ACCESSIBILITY = {
  intro: [
    'At IHM, we’re passionate about creating an inclusive educational space where respect, dignity, and student rights are paramount. Our approach ensures everyone has fair access to learning opportunities, safeguarding their privacy. Students are invited to share any disabilities or accessibility requirements, while maintaining privacy, should they require any special assistance. This transparency helps us provide the most effective support, tailored to each individual’s needs, while maintaining utmost confidentiality.',
    'Our partnership with a specialised Disability Support Centre amplifies our commitment. This centre champions accessibility, offering bespoke services for those impacted by disabilities, health conditions, or mental health conditions. IHM staff are trained to guide students to this supportive environment, where detailed discussions and personalised planning take place, ensuring every student’s unique needs are met, and their educational experience is enriched.',
    'At IHM, our goal is to dismantle barriers that students with disabilities encounter in higher education. We’re dedicated to enhancing participation, retention, and success for these students, with a strong focus on accessible learning environments. Our approach is not just about meeting needs; it’s about actively improving experiences and outcomes, ensuring all students have equal opportunities to thrive and succeed in their academic pursuits. This commitment reflects our core values of inclusivity and educational equality.',
  ],
  liaison: { name: 'Dominique Lubabu Kasole', role: 'Accessibility Liaison Officer', photo: '/images/student-support/dominique-kasole.webp' },
  materials: [
    'The online course delivery methods chosen for some IHM courses provide many advantages in terms of overcoming barriers to participation in study.',
    'In the case of students with a physical disability or other access requirements, travelling to a physical location can add additional barriers, and we avoid this by teaching them online.',
    'However, there are still specific measures needed to provide access for students with access requirements.',
  ],
  measures: [
    'IHM will provide information and resources regarding screen reading, voice recognition software and other adaptive technologies and techniques that can enable study.',
    'IHM will ensure that on campus students have access to support facilities, and support is available to all students.',
    'Course materials can be modified to meet individual student access requirements.',
  ],
  services: [
    { name: 'Disability Gateway', body: 'The Disability Gateway is a free, Australia-wide service. It helps all people with disabilities, their families and carers to find trusted information and connect to services in their area.', links: [{ label: 'Call 1800 643 787 (Mon–Fri, 8am–8pm AEST/AEDT)', href: 'tel:1800643787' }, { label: 'www.disabilitygateway.gov.au', href: 'https://www.disabilitygateway.gov.au/' }] },
    { name: 'National Disability Advocacy Program (NDAP)', body: 'NDAP provides people with disabilities access to effective advocacy support. This support promotes and protects the rights of people with disabilities by helping to remove barriers to their full and equal participation in the community.', links: [{ label: 'dss.gov.au/national-disability-advocacy-program', href: 'https://www.dss.gov.au/our-responsibilities/disability-and-carers/program-services/for-people-with-disability/national-disability-advocacy-program-ndap' }] },
    { name: 'Disability Advocacy Support Helpline', body: 'The Disability Advocacy Support Helpline provides short term and phone-based disability advocacy support, no matter where you live in Australia. The Helpline may refer you to other supports in your local area based on your individual access requirements. There are Easy Read, Auslan and translated resources.', links: [{ label: 'Helpline resources page', href: 'https://www.dss.gov.au/disability-and-carers-programs-services-for-people-with-disability-national-disability-advocacy-program/disability-advocacy-support-helpline' }, { label: 'Request support: Contact Us Form', href: 'https://www.disabilitygateway.gov.au/contact-us-form' }] },
    { name: 'Ask Izzy', body: 'You can also find an advocacy support provider near you by visiting Ask Izzy.', links: [{ label: 'askizzy.org.au/disability-advocacy-finder', href: 'https://askizzy.org.au/disability-advocacy-finder' }] },
  ],
  equityIntro: 'IHM follows and uses policies and procedures to ensure that students and staff are treated in a fair and equitable manner. At IHM, we aim to:',
  equityAims: [
    'Create an educational environment at IHM free from discrimination and which recognises and promotes the equal opportunity of students with disability',
    'Ensure that IHM students with a disability are aware of their rights with respect to equal opportunity and access to education',
    'Articulate an effective procedure for dealing with complaints relating to any failure to provide students with disabilities equal opportunity with respect to access to education at IHM',
    'Ensure that students with a disability are given the greatest possible opportunity to participate in study and work',
  ],
  panels: [
    { id: 'special-needs', title: 'Support Services for Students with Special Needs', intro: 'The Student Support and Disability Policies (Accessibility Policy and Access and Equity) assure a variety of services to assist students with special needs. Should a student, who has special needs, apply to participate in a course of study at IHM, reasonable steps will be taken to enable participation. Reasonable steps may include:', items: ['The use of adaptive/assistive technology', 'Educational support', 'Alternative assessment methods', 'Extra time to complete a course or assessment task', 'Learning support for basic literacy or numeracy difficulties'] },
    { id: 'enrolment', title: 'Enrolment', items: ['Students intending to enrol for a course with IHM are requested prior to enrolment to advise if they have any disability, physical or other impairment which may adversely affect their ability to successfully undertake training and assessment', 'The IHM enrolment form seeks self-disclosure of a disability', 'Students are encouraged to discuss any ‘special needs’ and/or ‘reasonable adjustments’ to the study environment that they consider necessary or would assist them in their studies with IHM admission consultants or staff', 'The Admissions Team or delegate interviews domestic students either on campus or via Zoom/phone to discuss their course choice, background and any limiting factors or areas requiring special support'] },
    { id: 'participation', title: 'Participation', items: ['Students with disabilities who wish IHM to provide reasonable adjustments to the learning environment, including examination adjustments, or who require assistive technology (such as equipment or other physical aids), must disclose the nature and extent of their disability', 'IHM assesses each student based on the provision of appropriate medical documentation and an interview with the student', 'On approval of the request for special adjustments, the formal notification is uploaded in the student management system and is accessible to all IHM staff to ensure the provision of the agreed and/or required adjustments during the course of study'],
      docsAge: ['No more than two weeks old for temporary conditions', 'No more than six months old for fluctuating conditions', 'No more than three years old for a physical or mental/learning disability'],
      docsMust: ['State the impairment, mental health or medical condition', 'Indicate whether the disability is permanent, temporary, or fluctuating', 'Outline the impact on the student', 'Recommend reasonable accommodations', 'Clearly identify the health professional and their credentials', 'Be legible, on a letterhead, dated and signed'] },
    { id: 'services', title: 'Student Support Services', items: ['Where appropriate, Course Coordinators will assist academic staff in the development of individual arrangements and alternative methods of assessment (for example, oral examinations/presentations) to accommodate students with particular disabilities (for example, hearing or hand/arm impairment). Scribe, reader, or practice assistance will be provided to students with vision impairment', 'Students with disabilities requiring any student support service can submit requests as needed to Student Services', 'Student administration staff will organise and schedule the requested service, including academic support, counselling and/or course advice with the help of relevant staff', 'Support and reasonable special arrangements within the scope of the support request will be provided.'] },
  ],
  docs: [
    { label: 'Access and Equity Policy', href: '/pdf/policies/Access_and_Equity_Policy.pdf' },
    { label: 'Access and Equity Procedure', href: '/pdf/procedures/Access_and_Equity_Procedure.pdf' },
    { label: 'Accessibility Policy', href: '/pdf/policies/Accessibility_Policy.pdf' },
    { label: 'Accessibility Procedure', href: '/pdf/procedures/Accessibility_Procedure.pdf' },
  ],
}

// ------------------------------------------------------------------ External services
export type Service = { name: string; href?: string; phone?: string; note?: string }
export const EXTERNAL_SERVICES: { id: string; title: string; items: Service[] }[] = [
  { id: 'emergency', title: 'Emergency Contacts', items: [{ name: 'Police, Fire & Ambulance', phone: '000' }, { name: 'Police General Enquiries (24 Hours)', phone: '131 444' }, { name: 'Department of Home Affairs', href: 'https://immi.homeaffairs.gov.au/' }] },
  { id: 'campuses', title: 'Important Information: IHM campuses', items: [{ name: 'North Melbourne Campus', note: 'Level 2/187 Boundary Road North Melbourne, Vic – 3051', phone: '03 9450 5111', href: '/melbourne-campuses/' }, { name: 'Sydney Campus', note: '1 Wentworth St, Parramatta NSW - 2150', phone: '02 8228 6402', href: '/sydney-campus/' }, { name: 'Perth Campus', note: 'Level 4, 12 St Georges Terrace Perth, WA - 6000', phone: '08 6212 8261', href: '/perth-campus/' }] },
  { id: 'community', title: 'Family & Community Services', items: [{ name: 'Alcoholics Anonymous', href: 'http://www.aa.org.au/' }, { name: 'Samaritans', href: 'http://www.thesamaritans.org.au/' }] },
  { id: 'health', title: 'Medical and Health', items: [{ name: 'Australian Health Management', href: 'https://www.ahmoshc.com.au/' }, { name: 'Healthdirect Australia', href: 'https://www.healthdirect.gov.au/', phone: '1800 022 222' }] },
  { id: 'money', title: 'Money and Credit Services', items: [{ name: 'Centrelink Youth & Students Line', href: 'https://www.servicesaustralia.gov.au/', phone: '132 490' }] },
  { id: 'legal', title: 'Legal Services', items: [{ name: 'Victoria Legal Aid (Melbourne)', href: 'https://www.legalaid.vic.gov.au/', phone: '03 9269 0234' }, { name: 'Legal Aid New South Wales (Sydney)', href: 'https://www.legalaid.nsw.gov.au/contact-us/our-offices', phone: '02 9219 5000' }, { name: 'Legal Aid Western Australia (Perth)', href: 'https://www.legalaid.wa.gov.au/', phone: '1800 319 803' }] },
  { id: 'mental-health', title: 'Free Mental Health Support Services (Online)', items: [{ name: 'Relationships Australia', href: 'https://relationships.org.au/', phone: '1300 364 277' }, { name: 'Beyond Blue – National Depression Initiative', href: 'https://www.beyondblue.org.au/', phone: '1300 22 4636' }, { name: 'Lifeline – 24-hour telephone counselling', href: 'https://www.lifeline.org.au/', phone: '13 11 14' }, { name: 'SANE Helpline – Information & Referral service', href: 'https://www.sane.org/', phone: '1800 18 7263' }] },
  { id: 'consumer', title: 'Consumer Affairs', items: [{ name: 'Consumer Affairs Victoria (Melbourne)', href: 'https://www.consumer.vic.gov.au/' }, { name: 'NSW Fair Trading (Sydney)', href: 'https://www.fairtrading.nsw.gov.au/' }, { name: 'Consumer Protection WA (Perth)', href: 'https://www.commerce.wa.gov.au/consumer-protection' }] },
  { id: 'transport', title: 'Public Transport', items: [{ name: 'Public Transport Victoria (Melbourne)', href: 'http://ptv.vic.gov.au/' }, { name: 'Transport for NSW (Sydney)', href: 'http://www.transport.nsw.gov.au/' }, { name: 'Transperth (Perth)', href: 'https://www.transperth.wa.gov.au/' }] },
  { id: 'housing', title: 'Housing Services', items: [{ name: 'Tenants Victoria (Melbourne)', href: 'https://tenantsvic.org.au/' }, { name: 'Tenants’ Union of New South Wales (Sydney)', href: 'https://www.tenants.org.au/' }, { name: 'Tenancy advice and education services (Perth)', href: 'https://www.commerce.wa.gov.au/' }] },
]

export const ACCOMMODATION: { city: string; items: { name: string; href: string }[] }[] = [
  { city: 'Melbourne', items: [{ name: 'UniLodge', href: 'https://www.unilodge.com.au/student-accommodation-melbourne' }, { name: 'Campus Living Villages', href: 'https://campuslivingvillages.com/australia/melbourne/student-village-the-university-of-melbourne-campus' }, { name: 'Dwell Village Melbourne City', href: 'https://dwellstudent.com.au/melbourne/' }, { name: 'University Living', href: 'https://www.universityliving.com/australia/city/melbourne' }, { name: 'Iglu', href: 'https://iglu.com.au/sydney/' }, { name: 'Melbourne Homestay', href: 'https://www.melbournehomestay.org/homestay-rosanna-victoria' }] },
  { city: 'Sydney', items: [{ name: 'Campus Living Villages', href: 'https://campuslivingvillages.com/australia/sydney/' }, { name: 'University Living', href: 'https://www.universityliving.com/australia/city/sydney' }, { name: 'Flatmates', href: 'https://flatmates.com.au/student-accommodation/parramatta-2150' }, { name: 'Student Accommodation One', href: 'https://www.studentaccommodationone.com/au/student-accommodation/parramatta/new-south-wales' }, { name: 'Mitula Property', href: 'https://properties.mitula.com.au/apartments-for-rent-student-parramatta' }, { name: 'Iglu', href: 'https://iglu.com.au/sydney/' }] },
  { city: 'Perth', items: [{ name: 'Campus Living Villages', href: 'https://campuslivingvillages.com/australia/perth/murdoch-university-village' }, { name: 'Campus Perth', href: 'https://www.campusperth.com/' }, { name: 'Flatmate Finders', href: 'https://www.flatmatefinders.com.au/flatmates/perth' }, { name: 'Student.com', href: 'https://www.student.com/au/perth' }, { name: 'Study Perth', href: 'https://www.studyperth.com.au/living-in-perth/student-accommodation/' }, { name: 'Yugo', href: 'https://yugo.com/en-gb/global/australia/perth/perth-city' }] },
]

// ------------------------------------------------------------------ Complaints and appeals
export const COMPLAINTS = {
  intro: [
    'The Institute of Health & Management (IHM) takes complaints very seriously and respects the right of students to appeal decisions that are made during academic and administrative procedures. The Student Complaints and Appeals process sets out the procedures and principles that govern how your complaint will be handled. You can also find information about making a complaint in the Student Handbook.',
    'IHM staff will endeavour to address your needs if they are brought to their attention, so it is recommended that you discuss your complaint or grievance with a Student Support Staff member. At the very least, they can give you information about how to have your complaint heard.',
    'You will not be disadvantaged, provided your complaint is not knowingly false or vexatious. Complaints help us to improve our services.',
  ],
  form: 'https://portal.ihm.edu.au/student_complaint_form.php',
  docs: [
    { label: 'Student Complaints and Appeals Policy', href: '/pdf/policies/Student_Complaints_and_Appeals_Policy.pdf' },
    { label: 'Student Complaints and Appeals Procedure', href: '/pdf/procedures/Student_Complaints_and_Appeals_Procedure.pdf' },
  ],
  informal: ['Students are encouraged to resolve complaints informally with the Lecturer/Student Support staff before making a formal complaint.', 'If unsatisfied, students are further encouraged to speak to the Course Coordinator of their enrolled course and present their complaint. The Course Coordinator will try and resolve the issue and come to a satisfactory solution.'],
  formal: [
    'Students should complete the ‘Complaints and Grievances Form’. A hard-copy form is available at IHM campus.',
    'The complaint is recorded through the Student management system and student profile. The students are informed of the outcome and it will be recorded in the student portal.',
    'IHM will convene a panel which will investigate the complaint and decide on a verdict. This decision is recorded and will be reviewed by the Quality Assurance team for opportunities for continuous improvement.',
    'During the investigation, the complainant will be given an opportunity to formally present their case and have the option of being accompanied/assisted by a nominee (such as a family member, friend or counsellor) if they so desire. If the students are using a paid nominee, it will be at their own cost. The nominee must present their photo ID while accompanying the student at any of the appointments at IHM.',
    'Students may use the Formal Appeals Process if they are not satisfied with the outcome of the complaint resolution process.',
    'If the student is dissatisfied with the resolution proposed by IHM, IHM can refer students to an independent mediator: the Student Mediation Scheme provided by Resolution Institute.',
  ],
  appeals: [
    'Students should complete the ‘Complaints and Grievances Form’. A hard-copy form is available at IHM campus.',
    'The Appeal is recorded in the Student Complaints and Appeal in the Student management system and Student Profile. The students are informed by email of the outcome of the appeal and it will be recorded in the student portal.',
    'IHM will convene a panel (someone more senior and not previously involved in the case is added to the panel for appeals) who will investigate the appeal and decide on a verdict.',
    'The appellant will be given an opportunity to formally present their case to the panel and have the option of being accompanied/assisted by a nominee (such as a family member, friend or counsellor) if they so desire.',
    'If the student is dissatisfied with the appeals process by IHM, they can access the provision of an independent mediator: the Student Mediation Scheme provided by Resolution Institute.',
    'For international students, if not satisfied, students may take up the complaint with the Ombudsman.',
  ],
  externalIntro: 'At the completion of the internal resolution process, if a student is dissatisfied with the outcome of the complaint/appeal decision made by IHM, the student may wish to refer the matter to an external, independent mediator, such as:',
  external: [
    { name: 'National Student Ombudsman (NSO)', href: 'https://www.nso.gov.au/' },
    { name: 'Victorian Ombudsman', href: 'https://www.ombudsman.vic.gov.au/', note: 'The applicable state Ombudsman for domestic student complaints, depending on IHM campus location' },
    { name: 'NSW Ombudsman', href: 'https://www.ombo.nsw.gov.au/', note: 'The applicable state Ombudsman for domestic student complaints, depending on IHM campus location' },
    { name: 'Ombudsman Western Australia', href: 'http://www.ombudsman.wa.gov.au/', note: 'The applicable state Ombudsman for domestic student complaints, depending on IHM campus location' },
    { name: 'Commonwealth Ombudsman', href: 'https://www.ombudsman.gov.au/complaints/international-student-complaints', note: 'For international student complaints' },
    { name: 'The Australian Human Rights Commission', href: 'https://humanrights.gov.au/' },
    { name: 'The Office of the Australian Information Commissioner (OAIC)', href: 'https://www.oaic.gov.au/' },
    { name: 'Resolution Institute', href: 'https://www.resolution.institute/' },
    { name: 'The Australian Competition & Consumer Commission (ACCC)', href: 'https://www.accc.gov.au/' },
    { name: 'Administrative Appeals Tribunal' },
    { name: 'The Tertiary Education Quality and Standards Agency (TEQSA)', note: 'Complaints can be lodged to TEQSA if they relate to education quality issues and TEQSA will determine a response to the issues on a case by case basis.' },
  ],
  timely: ['IHM must consider complaints and grievances in a timely manner: the acknowledgement of receipt of a complaint must be sent within five (5) working days and the outcome of the complaint/appeal must be sent to the student within twenty (20) working days from the initial response.', 'IHM will take all reasonable measures to ensure that complaints are resolved within a specified and achievable timeframe.', 'In the case of more serious complaints, this may include measures such as calling on board or committee members to bring forward the date of their next scheduled meeting or to attend an extraordinary meeting.'],
  anonymous: 'Anonymous or unidentified complaints will be investigated at IHM’s discretion. This is dependent upon the nature of the complaint and whether there is enough information for the investigation. IHM is not required to send a response to an anonymous or unidentified complainant.',
  confidentiality: ['Students who raise complaints and grievances have the right to do so in the knowledge that confidentiality will be maintained. Information about matters raised may be passed on only with the prior consent of the complainant.', 'In cases where it is necessary to escalate the complaint beyond the person who initially addressed the complaint, the complainant will be informed. The student has the right to decide whether to proceed.', 'Where a complaint is escalated to a Committee or Board, it will be tabled as a confidential item, to be disclosed only to the members of that Committee or Board and will be heard and voted upon prior to the admission of observers or those deemed to have a conflict of interest.', 'If the complainant remains unidentified or submits a complaint anonymously, this complaint will be investigated and acted upon at IHM’s discretion.'],
  advocacy: [
    'Welcome to the Institute of Health and Management (IHM) Student Advocacy service. Our team is committed to offering support, guidance, representation, and assistance to all IHM students across a variety of issues and challenges they might face during their academic journey.',
    'Our Student Advocates are also on hand to liaise with IHM staff regarding complex student matters and to provide insights into the institute’s policies and procedures that are relevant to student interests.',
    'At the Institute of Health and Management, our advocacy model is rooted in pastoral care, designed to exert a positive influence on several key aspects of student life. These include engagement in learning, attendance, academic achievement, retention rates, and both psychological and social wellbeing.',
    'An ‘Advocate’ within our institution is a staff member assigned to a group of students. These groups convene weekly to delve into matters concerning the students’ engagement with their learning environment and to identify any obstacles that may be hindering their success.',
    'We encourage all students to familiarise themselves with the IHM Student Charter, which delineates the rights and responsibilities of every student within the Institute of Health and Management.',
  ],
  ssaf: { text: 'Guided by the IHM Independent Advocacy Service, part of our Student Life and Wellbeing protocol, our student support department is dedicated to offering confidential and independent support to students, adhering to the guidelines set forth by the Student Services and Amenities Fee (SSAF).', href: 'https://www.education.gov.au/higher-education-loan-program/approved-hep-information/student-services-and-amenities-fee-ssaf-and-sa-help' },
  advocacyTopics: [
    ['Positive Education/Positive Psychology', 'Fostering an environment that promotes a positive mindset and psychological resilience among students.'],
    ['Goal Setting, Study Skills, Time Management', 'Equipping students with the tools and strategies to effectively plan and achieve their academic and personal goals.'],
    ['Resilience', 'Building the capacity to recover quickly from difficulties; a crucial skill in both academic and personal spheres.'],
    ['Respectful Relationships', 'Encouraging healthy and respectful interactions within the academic community and beyond.'],
    ['Student Attendance and Retention', 'Addressing factors that contribute to regular attendance and sustained engagement with the Institute.'],
    ['General Engagement in Learning and Academic Achievement', 'Enhancing motivation and commitment to learning, leading to improved academic outcomes.'],
    ['Psychological and Social Wellbeing', 'Supporting the overall mental and social health of students, recognising its importance for academic success.'],
    ['Career Guidance', 'Offering advice and resources to help students navigate their future career paths and make informed decisions about their professional lives.'],
  ],
  advocacyClose: 'Our advocacy service aims to create a supportive and nurturing environment that recognises and addresses the diverse needs of our students, ensuring they have the support they need to thrive academically, socially, and emotionally.',
}

export const STATE_MENTAL_HEALTH = [
  { state: 'Victoria', href: 'https://www.health.vic.gov.au/mental-health/about-victorias-mental-health-services' },
  { state: 'New South Wales', href: 'https://www.health.nsw.gov.au/mentalhealth/services/Pages/support-contact-list.aspx' },
  { state: 'Western Australia', href: 'https://www.mhc.wa.gov.au/getting-help/' },
  { state: 'Australia', href: 'https://www.health.gov.au/topics/mental-health-and-suicide-prevention/about-mental-health' },
]

// ------------------------------------------------------------------ Student safety
export const SAFETY = {
  intro: 'At every Australian institution, safety and wellbeing is a top priority. At IHM, we believe that our students’ well-being is boosted, and their learning outcomes are optimised when they feel connected to others and experience safe, trustworthy relationships. Students who feel connected, safe, and secure are more likely to be engaged learners and to achieve higher physical, emotional, social, and academic achievements.',
  custodian: ['Handling and investigating allegations of student misconduct', 'Critical incident processes', 'Responses to sexual misconduct complaints and disclosures', 'Harassment and assault', 'The comprehensive care provided to students, inclusive of disabilities, training, counselling, and financial assistance.'],
  custodianClose: 'Our team focuses on implementing best-practice policies, procedures, and training efforts to ensure that the institution provides the safest possible environment for students.',
  counselling: 'Students at IHM have access to the Mental Health Support programme accessible to IHM students and employees. The professional and discreet counselling service is available to assist you with a variety of work-related and personal issues. This service provides access to licensed specialists, such as psychologists, social workers, and management support counsellors. IHM has arrangements in place with Relationships Australia to provide IHM counselling sessions and tele services to IHM students.',
}

// ------------------------------------------------------------------ Cybersecurity
export const CYBER = {
  intro: [
    'In an era where cybersecurity threats are on the rise, it’s important to take proactive steps to safeguard your digital presence and that of our organisation. Cybercriminals are becoming more sophisticated, making it imperative for each of us to adopt protective measures.',
    'To help you navigate the digital landscape securely, we offer the following essential cybersecurity tips. By staying informed and implementing these practices, you can significantly reduce the risk of falling victim to cyber threats and ensure a safer online experience.',
    'Together, let’s stay safe and keep our organisation resilient in the face of cyber threats!',
  ],
  tips: [
    { title: 'Keep Everything Updated', items: ['Regularly update your apps and devices to fix issues, address security concerns, and add new features.', 'Updates make it harder for hackers to access your devices or accounts.'] },
    { title: 'Use Multi-Factor Authentication (MFA)', items: ['Turn on MFA for an extra layer of security for both personal and organisational accounts.', 'MFA requires more than one check, like a code from a text message and your passphrase, making it tough for cybercriminals to access your accounts.'] },
    { title: 'Backup Your Information', items: ['Set up regular backups to keep a digital copy of your important data.', 'Backups can be stored on external devices or online servers (like the cloud), helping you restore your files if needed.'] },
    { title: 'Secure Passphrases', items: ['When MFA isn’t an option, use strong passphrases with four or more random words.', 'Passphrases are hard for cybercriminals to guess but easy for you to remember.'] },
    { title: 'Recognise and Report Scams', items: ['Be cautious with emails, SMS, calls, and social media messages.', 'Criminals may pretend to be someone you know; avoid clicking on attachments or links.'] },
  ],
  levelUp: [
    ['Think Before You Post Online', 'Be mindful of the information you share.'],
    ['Sign Up for Alerts', 'Stay informed about new threats with the free alert service.'],
    ['Talk About Cybersecurity', 'Share tips with your family and friends.'],
    ['Avoid Public Wi-Fi for Banking', 'Use secure networks for online banking or shopping.'],
    ['Report Incidents', 'Help keep Australia secure by reporting cyber-attacks and incidents.'],
  ],
  mfaIntro: 'At HCI, safeguarding the security of our staff and the sensitive data we handle is our top priority. As part of our ongoing commitment to fortify our systems, we have implemented Multi-Factor Authentication (MFA) for all Microsoft 365 accounts.',
  mfaWhat: 'Multi-Factor Authentication adds an extra layer of protection to your account by requiring a second form of verification alongside your password. This additional step enhances the security of your account and reduces the risk of unauthorised access.',
  mfaSteps: [
    ['Sign in to Microsoft 365', 'Using your work or school account, log in to Microsoft 365 with your password as usual.'],
    ['Choose Next', 'After entering your password, click on "Next" when prompted for more information.'],
    ['Set Up Microsoft Authenticator App', 'We recommend using the free Microsoft Authenticator app as the authentication method. If you already have the app installed, select "Next" and follow the prompts to add your account. If not, download the app from the links below.'],
    ['Specify Your Additional Verification Method', 'Follow the instructions to specify your additional verification method, which may involve linking the app to your account. After completing this step, the next time you sign in to Microsoft 365, you’ll be prompted to provide additional verification information or take action, such as entering the verification code from your authenticator app or received via text message.'],
  ],
  apps: [
    { label: 'Google Android: Google Play Store', href: 'https://play.google.com/store/apps/details?id=com.azure.authenticator' },
    { label: 'Apple iOS: App Store', href: 'https://apps.apple.com/app/microsoft-authenticator/id983156458' },
  ],
  mfaNote: 'You’ll likely only need the additional verification method the first time you sign in to a new app or device or after changing your password. In most cases, daily use won’t require the additional verification unless specified by our organisation.',
  phishing: 'Phishing emails are deceptive messages designed to extract sensitive information from you by posing as legitimate sources, including your bank, colleagues, or clients. Recognising the severity of this issue, we aim to raise awareness and prevent any potential scams. An illustrative example of these phishing attempts is provided below:',
  phishingScam: 'In these incidents, scammers request the sharing of a WhatsApp number and subsequently coerce individuals into purchasing gift cards (such as Apple or STEAM cards) and sharing the voucher codes. These actions are executed with a sense of urgency and confidentiality.',
  phishingNever: 'It is crucial to note that HCI staff or management will never request any payment from staff for workplace-related matters. Exercise extra caution when handling such emails, refrain from disclosing bank details or personal contacts, and safeguard your finances by avoiding these traps.',
  phishingRules: [
    'Avoid opening attachments or clicking on links in suspicious emails. These may contain viruses or spyware that can compromise your computer or steal your data.',
    'Do not reply to or forward suspicious emails. Report such emails to the IT department or student support team and promptly delete them.',
    'Carefully check the sender’s email address. Phishing emails often use spoofed or similar-looking addresses. Double-check the email ID, not just the Display Name. For instance, even if the sender’s name is listed as Dr. Bijo Kunnumpurath, the actual email ID may be different (e.g., mailbox.hr.com@gmail.com).',
    'Be vigilant for spelling and grammar errors, unusual or urgent requests, or offers that seem too good to be true. These are common indicators of phishing emails.',
    'If uncertain about an email’s legitimacy, verify with the sender through an alternate channel. Avoid using contact information provided in the email, as it may be fraudulent.',
  ],
  atlassian: {
    intro: 'This advisory is crucial for Australian users of Atlassian products, including Confluence, Jira, and Bitbucket. Atlassian has released security patches addressing vulnerabilities in certain product versions. Here’s a summary of the key information:',
    background: [
      'Atlassian has released patches for security vulnerabilities, including critical ones (CVE-2023-22522, CVE-2023-22523, and CVE-2022-1471), impacting various versions of Confluence, Jira, and Bitbucket.',
      'The Australian Signal Directorate’s Australian Cyber Security Centre (ASD’s ACSC) emphasises the possibility of exploitation, given the historical significance of critical vulnerabilities in Confluence and Jira.',
      'Malicious cyber actors may employ patch differential analysis to reverse engineer vulnerabilities, making an exploitation campaign likely.',
      'Atlassian Cloud operated sites are not affected.',
      'An additional critical vulnerability has been addressed in the MacOS Atlassian Companion Application (CVE-2023-22524), requiring user interaction but still deemed critical.',
    ],
    mitigation: [
      'If you operate Confluence, Jira, or Bitbucket, especially in internet-facing configurations, review the vendor advisories to determine if you are affected.',
      'Apply all vendor-recommended mitigations carefully if you are affected.',
      'Reassess the necessity of making your system internet-facing and consider filtering from the internet if possible.',
    ],
    advisories: [
      { label: 'CVE-2023-22522: RCE vulnerability in Confluence Data Center and Server', href: 'https://confluence.atlassian.com/security/cve-2023-22522-rce-vulnerability-in-confluence-data-center-and-confluence-server-1319570362.html' },
      { label: 'CVE-2022-1471: SnakeYAML library RCE vulnerability in multiple products', href: 'https://confluence.atlassian.com/security/cve-2022-1471-snakeyaml-library-rce-vulnerability-in-multiple-products-1296171009.html' },
      { label: 'CVE-2023-22523: RCE vulnerability in Assets Discovery', href: 'https://confluence.atlassian.com/security/cve-2023-22523-rce-vulnerability-in-assets-discovery-1319248914.html' },
      { label: 'CVE-2023-22524: RCE vulnerability in Atlassian Companion App for macOS', href: 'https://confluence.atlassian.com/security/cve-2023-22524-rce-vulnerability-in-atlassian-companion-app-for-macos-1319249492.html' },
    ],
  },
}
