// Copy for the Bachelor of Social Work campaign landing pages (CourseLanding rows in src/content/landing.ts): /lp/bachelor-of-social-work/,
// /lp/bachelor-of-social-work-melbourne/ and /lp/bachelor-of-social-work-ihm/. Text as on the old pages (lp/<slug>/index.php); images
// in public/images/landing/bsw/. Rendered by src/components/landing/CampaignLanding.tsx.
import type { CampaignPage, CampaignSection } from './landing-campaign'

const HERO = { src: '/images/landing/bsw/students.webp', alt: 'Students working together on a tablet' }

const FAQ: CampaignSection = {
  kind: 'faq', title: 'Frequently Asked Questions',
  items: [
    // the old answer repeated its last sentence; it is shown once
    { q: '1. Is a Bachelor of social work hard?', a: ['Degree courses aren\'t always simple and direct. There is no doubt that the most important aspects of "on-the-job learning" are practical placements. When it comes to academics, like with any other aspect of your life, it\'s ideal to start early and plan rather than wait until the last minute to do a project. The discipline of a social worker is demanding, and so are the assignments.'] },
    { q: '2. Where is the best place to study social work in Australia?', a: ['IHM is one of the pioneer educational institutions in Australia and is known for its quality education and training. They not only provide academic expertise but also help students understand the latest advancements in the industry and try to incorporate all the innovations into their specialized curriculum. Their Bachelor\'s in Social work degree is structured and framed by their expert educators so that students can cope with their professional endeavours efficiently.'] },
    {
      q: '3. What field of social work pays the most?', a: ['According to the seek, the areas of social work that pay the most include'],
      list: ['Mental Health educators and community social workers: $90-100k/ year.', 'A social worker with an average salary of $80-95k/ year.', 'Case Manager with an average salary of $80k/ year', 'Mental Health Support Worker with an average salary of $70k/ year', 'Outreach Officer with an average salary of $70-85k/ year', 'Marriage and family therapists: $51,340.', 'Rehabilitation counsellors: $37,530.'],
    },
  ],
}

/** /lp/bachelor-of-social-work/ — the long-form article page. */
const BSW: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrolment Advisor', title: 'Bachelor of Social Work', accent: 'Social Work', image: HERO,
    chips: ['4 Years', 'CRICOS 108842E', '26 Course Units'],
  },
  formHeading: 'Talk to an Enrolment Advisor',
  brochure: true,
  sections: [
    { kind: 'facts', eyebrow: 'Key facts', items: [{ label: 'Course Duration', value: '4 Years' }, { label: 'CRICOS Course Code', value: '108842E' }, { label: 'Course Units', value: '26' }] },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview',
      image: { src: '/images/landing/bsw/counselling.webp', alt: 'Social worker in conversation with a client', width: 767, height: 790 },
      body: [
        'According to the Australian Association of Social Workers Code of Ethics, Social work is a practice-based profession and an academic discipline that promotes social change and development, social cohesion, and the empowerment and liberation of people. Principles of social justice, human rights, collective responsibility, and respect for diversities are central to social work. Underpinned by theories of social work, social sciences, humanities and indigenous knowledge, social work engages people and structures to address life challenges and enhance wellbeing.',
        '([View Source](https://www.aasw.asn.au/document/item/1201))',
      ],
    },
    {
      kind: 'prose', eyebrow: 'About the course', title: 'About the Bachelor\'s degree in Social Work',
      body: ['The code of ethics of the Australian Association of Social Workers informs the course objectives for the Bachelor of Social Work degree. The values and obligations of the social work profession are expressed in this Code of Ethics. Social workers and students currently in an established social work program are encouraged to use this guide as a means of ensuring that their actions are consistent with the institution\'s values.'],
      list: ['Identify and remove structural impediments to full recognition and engagement.', 'Protect the vulnerable against injustice and abuse.', 'Enhance and facilitate participation with the greater society.', 'Defend the weak against prejudice and violence'],
    },
    {
      kind: 'grid', tone: 'ink', title: 'The curriculum framework', intro: 'The curriculum framework includes major streams embedded across the social work degree including:',
      items: ['Society and culture', 'Behavioural science and public health', 'Generalist social work practices', 'Specialist social work practices', 'Field education experience'],
      after: ['**For the completion of the Bachelor of social work in Australia:** Students must attain 256 credit points.'],
    },
    { kind: 'prose', title: 'What is Social Work?', body: ['The discipline of social work course is one in which professional staff dedicate themselves to assisting vulnerable and marginalized people and their communities in overcoming the obstacles they experience on a day-to-day basis. Social workers are licenced professionals who advocate for and seek to improve the lives of people, families, communities, and societies in a wide range of settings. They are aligned in their commitment to this employment.'] },
    {
      kind: 'prose', tone: 'blush', title: 'Role of a Social Worker',
      body: ['While social workers continue operating in a variety of contexts, they always have the same purpose in mind including the ones mentioned below:'],
      list: ['Facilitate the well-being of the community.', 'You can help individuals from a wide range of backgrounds confront the specific challenges they are experiencing by extending a helping hand.', 'Those who are a part of a variety of communities must have access to both social and economic justice.', 'Integrate the code of ethics into your social work practise.'],
    },
    {
      kind: 'cards', numbered: true, title: 'Fundamental principles that define the profession of Social Workers',
      items: [
        { title: 'Service', body: 'Help those who are struggling and strive towards finding ways to address societal issues.' },
        { title: 'Social justice', body: 'Confronting social injustice and working for progressive transformation on account of vulnerable and oppressed people is an important part of social justice work.' },
        { title: 'Dignity and worth of the person', body: 'Respect every individual and be aware of the cultural and ethnic variety that exists.' },
        { title: 'Importance of human relationships', body: 'Recognize and appreciate the significance of human relationships, and then make efforts to bolster these connections to improve the health and well-being of both people and communities.' },
        { title: 'Integrity', body: 'Always be honest and support the purpose, beliefs, ethical principles, and professional standards you adhere to.' },
        { title: 'Competence', body: 'Maintain a practise that is restricted within one\'s areas of speciality, continually expand one\'s professional knowledge and skills, and make a significant contribution to the world of professional expertise.' },
      ],
    },
    {
      kind: 'grid', title: 'Your target individuals', intro: 'Social workers deal with and advocate for a wide range of individuals and groups. Some of them are:',
      items: ['People with disabilities.', 'Individuals who live through abject poverty or destitution.', 'Medical patients.', 'Refugees.', 'LGBTQ individuals.', 'Those who have been affected by addiction.', 'Students.', 'People with mental health concerns.', 'Aging individuals.', 'Families.', 'Children, teenagers, and youth.', 'Victims of violence or traumatic experiences.', 'Incarcerated people as well as those who have been charged with a crime', 'Veterans.'],
    },
    {
      kind: 'groups', title: 'What can you expect to do as a Social Worker?',
      intro: 'There are multiple ways whereby social workers enact change, from the macro scale of social transformation to the micro level of individual transformation. Social workers have an influence at every level of practise.',
      groups: [
        {
          title: 'Micro', body: 'Most people consider social services as micro-level social workers. These are the folks who operate one-on-one with participants to assist them in bringing about change in their personal life. Some examples of micro-level social workers are listed below:',
          items: ['Social workers in educational establishments assist youngsters in coping with challenges at school and in the community.', 'Caseworkers in a regional social services division deal with a wide range of at-risk groups, including children and families.', 'Assistance in navigating the criminal court system provided by attorneys.', 'Counsellors who specialise in clinical social work for addictions, mental health, marriage and family, trauma, etc.', 'Provide and organise services for individuals during and after their rehabilitation by medical social workers.'],
        },
        {
          title: 'General', body: 'General-level social workers are more likely to work with big organisations or institutions rather than with people, and they may even have a much more administrative function in the management of a new training program. The following are some examples of positions in middle-level social work:',
          items: ['Direct practise intervention programs are made available by social workers who manage and control a squad of other practitioners.', 'Non-profit or service organization members and administrators.', 'Community organisers work with residents to bring about positive change in their communities.', 'In the realm of public health, there are health educators who offer training and instruction to diverse communities.', 'Social work students are taught and trained by university faculty.'],
        },
        {
          title: 'Macro', body: 'Macro-level social workers are striving to bring about a major change. Their efforts in initiatives, policy, scientific studies, and other areas have an impact on the population, even when they don\'t interact directly with them. The following are some cases of social work at a macro level:',
          items: ['Individuals who conduct research in social work and data analysis.', 'Members of government at the local, state, and federal levels, as well as lobbyists and political campaigners.', 'Experts in the development of strategies and assessment of their effectiveness.', 'In comparison to micro-level social workers, macro-level social workers are less likely to include the term "social worker" in their assigned job titles. Yet, as a result of their extensive additional training, macro-level social workers are equally able to fill a wide variety of positions.', 'Responsible for formulating public policy and writing grant proposals.'],
        },
      ],
    },
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Careers', title: 'Career opportunities for Social Workers',
      body: ['As a result of the wide variety of settings in which BSW graduates are employed, the duties and responsibilities of these professionals might seem quite different from one organisation to the next. The following are some examples of institutions that hire social workers:'],
      list: ['Education at all levels, including institutions of higher learning', 'Medical facilities and other related organisations.', 'Government agencies and departments of the municipal, state, and federal governments, as well as branches of the Department of Veterans Affairs (VA) and the military services.', 'Organizations that focus on community outreach and advancement.', 'Local, state, and federal judicial institutions such as courts, jails, and other correctional facilities.', 'Places that provide counselling and medical services.', 'A few social workers also choose to go into business for themselves as licenced clinical social workers operating in private practise.'],
    },
    { kind: 'prose', title: 'International Students', body: ['If you participate in this course, you may look forward to exploring a variety of prospects whether you are from Nepal, the Philippines, India, or any other Asian country. People from these three major nations are moving to Australia to look for better career opportunities.'] },
    FAQ,
  ],
  // the old page closed with "Launch your nursing career in Australia!" (copied from the nursing page); this page is about social work
  closing: { title: 'Launch your social work career in Australia!', cta: 'Talk to our Academic Counsellor' },
}

/** /lp/bachelor-of-social-work-melbourne/ — "most low-priced" campaign. */
const BSW_MELBOURNE: CampaignPage = {
  hero: {
    eyebrow: 'Talk to an Enrollment Advisor', title: 'Discover the most low-priced Social Work Bachelor\'s program in Australia', accent: 'Social Work Bachelor\'s', image: HERO,
    chips: ['AQF level 7', 'TEQSA, AASW', 'North Melbourne'],
  },
  formHeading: 'Talk to an Enrollment Advisor',
  brochure: true,
  sections: [
    {
      kind: 'facts', eyebrow: 'Key facts',
      items: [
        { label: 'Course Starts On', value: 'Nov 6, 2023' }, { label: 'Course Delivery', value: 'On-Campus' }, { label: 'Course Duration', value: '4 Years' },
        { label: 'AQF level', value: '7' }, { label: 'Course Fee', value: 'AUD $10,000 per Semester' }, { label: 'Accreditation', value: 'TEQSA, AASW' }, { label: 'Location', value: 'North Melbourne' },
      ],
    },
    {
      kind: 'prose', eyebrow: 'Course overview', title: 'Course Overview',
      image: { src: '/images/landing/bsw/counselling.webp', alt: 'Social worker in conversation with a client', width: 767, height: 790 },
      body: [
        'The Bachelor of Social Work program at IHM aims to provide a professional social work education at a foundational level that is accessible and of high quality. The ultimate goal is to produce graduates who can practice in a variety of human services agencies and diverse communities, while complying with the 2020 ASWEAS Field Education Standards and linking to the IFSW Global Standards for Social Work Education and Training, as well as the UN Millennium Development Goals.',
        'The IHM Bachelor of Social Work program, which has AASW (Australian Association of Social Workers) accreditation, is delivered on-campus over four years, but Diploma of Community Services (DCS) holders may complete it in three years. Graduates are well-prepared for a variety of careers in areas such as Child and Family Services, Counselling, Child Protection, Disability, Ageing, Refugee and Settlement, Mental Health, Rehabilitation, Mediation, and beyond. Social work is one of the fastest growing professions and is highly in-demand; both in Australia and across the world. The Bachelor of Social Work is your ticket to building a fulfilling and satisfying global career!',
      ],
    },
    {
      kind: 'prose', title: 'Why Bachelor of Social Work',
      body: [
        'Consistently included in the Skilled Occupations List (SOL) for the Skilled Migration Program in Australia are the roles of Welfare Centre Manager, Welfare Worker, Social Worker, and Community Worker.',
        'The employment outlook for graduates of Bachelor of Social Work programs appears to be very positive, based on the JSA\'s employment projections for the five-year period from November 2021 to November 2026. The data suggests that the number of workers in this field is expected to grow very strongly over this period and is likely to reach 49,300 by 2026. This indicates a strong demand for qualified social workers and suggests that graduates of Bachelor of Social Work programs may have a range of job opportunities available to them in various settings, including human services agencies and diverse communities. However, it is important to note that employment opportunities may vary by location and other factors, and individual job prospects may depend on a range of factors such as work experience, specialized skills, and personal qualities.',
      ],
    },
    {
      kind: 'stats', intro: 'Expected demand for social work professionals in Australia over the next five year:',
      items: [
        { value: '23.2%', label: 'Projected change', note: '(or 9,300 jobs) from 40,000 in 2021 to 49,300 in 2026' },
        { value: '$1,736', label: 'Standard weekly wage for social work graduates in Australia', note: 'Source: [labourmarketinsights.gov.au](https://labourmarketinsights.gov.au/)' },
      ],
      note: 'Source: [labourmarketinsights.gov.au](https://labourmarketinsights.gov.au/)',
    },
    {
      kind: 'cards', eyebrow: 'Why IHM', title: 'Our students choose us for the following reasons:',
      items: [
        { title: 'Affordable Fee', body: 'For those looking for an affordable option to obtain a Bachelor of Social Work degree in Australia, IHM is the answer. The program offers the lowest tuition fees in the country, starting at only 10,000 AUD per semester. Payment plans are also offered to assist students in managing their finances.' },
        { title: 'Industry connections', body: 'IHM has established connections with a range of industry partners and community organizations, which allows students to gain real-world experience and build their professional networks before they graduate.' },
        { title: 'Preparation for professional registration', body: 'IHM\'s BSW program is designed to prepare students for professional registration with the AASW, which is a key requirement for working as a social worker in Australia. This can be an attractive feature for students who want to ensure that they are fully qualified and equipped to pursue a career in social work.' },
        { title: 'Stay back', body: 'The student will get 2 years of stay back after completing the Bachelor of Social work program.' },
        { title: 'Credit Transfer', body: 'IHM offers credit transfer from Diploma of Community Services courses from all ASQA accredited RTO\'s. Students who have completed the DCS will receive 8 units of credit points, which can help them complete the Bachelor of Social Work course in 3 years instead of 4.' },
        { title: 'Emphasis on lifelong learning', body: 'IHM\'s BSW program is designed to equip students with the skills and tools they need to continue learning and growing throughout their careers. This emphasis on lifelong learning can be an attractive feature for students who are looking to build a career in social work and want to stay up to date with the latest research and practices.' },
        { title: 'Experienced faculty', body: 'IHM\'s BSW program is taught by experienced social work professionals with years of experience in the field. This ensures that students receive high-quality instruction and guidance from people who have first-hand knowledge of the challenges and opportunities of social work.' },
        { body: '24x7 student support' },
        { body: 'Pathways to Permanent Residency (PR) and further higher studies' },
      ],
    },
    {
      kind: 'prose', id: 'admission', tone: 'blush', eyebrow: 'Entry criteria', title: 'Admission Requirements',
      body: ['To be eligible for admission to the Bachelor of Social Service, an applicant is required to have completed Year 12 or Certificate IV completion or equivalent and should have studied in English. Prior work and/or volunteer experience in human services will be considered alongside education requirements.'],
      list: [
        'English Language entry is an academic IELTS level of at least 6.5 with no band less than 6.0, or equivalent scores in OET/PTE/ other recognised English examination (note: IELTS is not required if an applicant has studied an Australian equivalent qualification in English for 12 months or more in the past 5 years)',
        'Students who studied year 12 in English Language, are eligible to get an exemption in the English language score. If a student receives 6.5 overall and no band lower than 6.0, they are qualified to participate in the course.',
        'Direct entry through a pass in an Australian General English (ELICOS) course with the minimum score of 70%, or',
        'Pathway entry with credits, completion of an Australian VET (Vocational Education and Training) Diploma in Community services or Youth Work or Mental Health, or',
        'Completion of an Overseas BSW (verified) allows an applicant/student to receive up to 8-unit credits.',
        'Australian based studies in relevant bachelor programs can also be considered up to a maximum of 12-unit credits in total pathway entry with credit for Year 1 and 2 for applicants with an Australian Bachelor\'s degree in Community Work, Youth Work, Human Services, or other Bachelor degrees that are deemed relevant.',
      ],
    },
    {
      kind: 'cards', title: 'Who is this course for?',
      intro: 'Anyone who meets the admission requirements of a Bachelor of Social Work program, and is passionate about making a real change in the community they live in, can undertake the degree.',
      items: [
        { title: 'Domestic and International Students', body: 'The program is designed for both domestic and international students who have completed their Year 12 education. The program can also be made available for students holding a Student Visa 500.' },
        { title: 'RTO Diploma of Community Service and Mental Health Alumni', body: 'The program is for students who have already completed their Diploma in Community Service or Mental Health from any Registered Training Organization (RTO). These students have already studied the foundational concepts and have a clear understanding of the social work sector.' },
      ],
    },
    {
      kind: 'prose', title: 'Where will this take you?',
      body: [
        'A Bachelor of Social Work in Australia can take you on a fulfilling career path in various fields such as community development, social services, mental health, child and family services, disability services, and more.',
        'Pathways after completing the Bachelor of Social Work at IHM extend beyond the Master of Social Work. Students who successfully complete the BSW may also pursue other postgraduate qualifications to enhance their skills and knowledge in specialized areas of social work.',
      ],
    },
    {
      kind: 'cards', numbered: true, title: 'These options include:',
      items: [
        { title: 'Master of Social Work (MSW)', body: 'This degree provides advanced knowledge and skills in social work practice, research, and leadership, building on the foundations developed in the BSW.' },
        { title: 'Graduate Diploma of Counselling', body: 'This qualification equips students with the skills and knowledge needed to provide counselling services in various settings, including community organizations, schools, and private practice.' },
        { title: 'Graduate Certificate in Humanitarian Assistance', body: 'This course focuses on the principles and practices of delivering effective humanitarian assistance in emergency and post-conflict situations.' },
        { title: 'Graduate Diploma of Indigenous Health Promotion', body: 'This qualification focuses on Indigenous health and wellbeing, equipping students with the knowledge and skills required to design, implement, and evaluate health promotion programs for Indigenous communities.' },
        { body: 'The Bachelor of Social Work program can lead to several job outcomes, including Child and Family Services, Counselling, Child Protection, Nanny, Rehabilitation, Mental Health, and Refugee & Settlement.' },
      ],
    },
    FAQ,
  ],
  closing: { title: 'Learn, Serve, Lead with a Bachelor of Social Work!', cta: 'Talk to our Academic Counsellor' },
}

/** /lp/bachelor-of-social-work-ihm/ — the 2026 campaign. */
const BSW_IHM: CampaignPage = {
  hero: {
    eyebrow: 'Bachelor Program', title: 'Bachelor of Social Work - IHM', accent: 'Social Work', image: HERO,
    intro: ['Care. Support. Empower. Become a Qualified Social Worker', 'Study Bachelor of Social Work at IHM Australia and become a qualified professional, ready to make a difference in people\'s lives every day.'],
    chips: ['AASW Accredited*', 'FEE-HELP Available*', 'Field Education 1000 hours', 'Delivery Mode: On campus Melbourne'],
    note: '*BSW offered by IHM holds Provisional Accreditation with AASW.',
  },
  formHeading: 'Course Enquiry',
  brochure: true,
  sections: [
    {
      kind: 'facts', eyebrow: 'Key facts', title: 'Course Highlights',
      items: [{ label: 'Duration', value: '4 Years Full-Time / 8 Years Part-Time' }, { label: 'Location', value: 'Melbourne' }, { label: 'Study Mode', value: 'On Campus' }, { label: 'FEE-HELP', value: 'Available' }, { label: 'Field Education', value: '1000 hours' }],
    },
    {
      kind: 'grid', eyebrow: 'Why social work', title: 'Why Choose Social Work?',
      intro: 'The Bachelor of Social Work emphasizes the wellbeing and building of relationships with individuals, families, and communities and linking the local with the global. The Bachelor of Social Work explores social care, health and wellness programs and initiatives that seek to locate and create systems and relationships that are preventative and educative in nature. Social workers are in high demand across Australia with opportunities in:',
      items: ['Mental Health', 'Child Protection', 'Community Services', 'Aged Care', 'Disability Support', 'Hospitals & Healthcare'],
    },
    { kind: 'stats', items: [{ value: '50,000+', label: 'Australia is projected to require over 50,000 social workers by the end of the decade.' }] },
    { kind: 'callout', title: 'Speak to a Course Advisor', cta: 'Speak to a Course Advisor' },
    {
      kind: 'prose', tone: 'ink', eyebrow: 'Why us', title: 'Why Study at IHM?',
      body: [
        'Graduates of the BSW will be able to influence local, national, and global social policy impacting all peoples and communities.',
        'The IHM Bachelor of Social Work offers significant interaction between students, their peers, social work academics, and social work/human services agencies that will provide the knowledge, skills and professional relationship building required to produce the quality and practice-ready graduates that are required by the social work profession.',
      ],
      list: ['IHM\'s Bachelor of Social Work has 1,000 field education hours embedded in the course', 'AASW Accredited Bachelor of Social Work', 'Dedicated Placement Coordinator', 'Practical Industry-Focused Learning', 'Employment-Focused Curriculum', 'Flexible Entry Pathways', 'FEE-HELP Available'],
    },
    { kind: 'callout', title: 'Ready to take the next step?', body: 'Flexible Entry Pathways and FEE-HELP available for eligible students.', cta: 'Book a Free Consultation' },
    {
      kind: 'prose', eyebrow: 'Careers', title: 'Possible Career Outcomes',
      image: { src: '/images/landing/bsw/group.webp', alt: 'Students discussing social work opportunities', width: 1000, height: 1500 },
      body: ['Career pathways in social work continue to grow across Australia.'],
      list: ['Mental Health Social Worker', 'Child Protection Officer', 'Youth Worker', 'Disability Support Coordinator', 'Community Development Officer', 'Family Support Worker', 'Hospital Social Worker', 'Aged Care Case Manager'],
    },
    {
      kind: 'grid', tone: 'ink', eyebrow: 'Placements', title: 'Industry Placement Experience',
      intro: 'IHM provides personalised student support and field education opportunities across hospitals, NGOs, aged care facilities, mental health organisations, and community services.',
      items: ['Dedicated Placement Coordinator', 'Industry Connections', 'Career Support', 'Academic Support', 'Student Success Team'],
    },
    {
      kind: 'videos', eyebrow: 'Student stories', title: 'Student Testimonials',
      videos: ['DpRsQ_m9ftQ', 'sx__-QHXuMg', 'eX3cps4i23g', 'u-TuuA93X8A', 'szrd2Ifa0z8', 'cyAkOSXNs8M', 'SX0JOVfUs-8', 'Z6AsI1AZ-Ng'].map((youtubeId, i) => ({ title: `Student Testimonial ${i + 1}`, youtubeId })),
    },
  ],
  closing: { title: 'Ready to Start Your Social Work Career?', body: 'Take the first step towards a rewarding career in social work. Our advisors are ready to help you navigate your journey.', cta: 'Enquire Now' },
}

export const BSW_CAMPAIGNS: Record<string, CampaignPage> = {
  '/lp/bachelor-of-social-work/': BSW,
  '/lp/bachelor-of-social-work-melbourne/': BSW_MELBOURNE,
  '/lp/bachelor-of-social-work-ihm/': BSW_IHM,
}
