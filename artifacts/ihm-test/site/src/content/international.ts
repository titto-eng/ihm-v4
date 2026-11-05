// International student pages (WordPress pages 161, 5917, 1378, 3621, 4862, 5205, 5510, 3180, 5311): new to Australia, advice
// for international students, before leaving, Genuine Student test, English language requirements, USI, ESOS, nursing
// registration and changes to enrolment. Extracted from the page content (2026-10-31); figures and requirements verbatim.
// Images: public/images/international/ (live-only ones via legacy-assets.ts).

export const INTL_NAV = [
  { href: '/new-to-australia/', label: 'New to Australia' },
  { href: '/international-students-before-leaving-for-australia/', label: 'Before you leave' },
  { href: '/advice-for-international-students/', label: 'Visa advice' },
  { href: '/genuine-student-test/', label: 'Genuine Student test' },
  { href: '/english-language-proficiency-entry-requirements/', label: 'English requirements' },
  { href: '/unique-student-identifier/', label: 'USI' },
  { href: '/education-services-for-overseas-students-internationalisation/', label: 'ESOS' },
  { href: '/nursing-registration-in-australia/', label: 'Nursing registration' },
  { href: '/students-deferral-suspension-or-cancelation-of-enrolment/', label: 'Changes to enrolment' },
]

export const ENQUIRY_EMAIL = 'enquiry@ihm.edu.au'
export const ENQUIRY_PHONE = '1800 763 757'

// ------------------------------------------------------------------ New to Australia
export const NEW_TO_AUSTRALIA = {
  states: [['Western Australia', 'WA'], ['Northern Territory', 'NT'], ['South Australia', 'SA'], ['New South Wales', 'NSW'], ['Victoria', 'VIC'], ['Tasmania', 'TAS'], ['Australian Capital Territory', 'ACT', 'our nation’s capital']],
  preArrivalLead: 'Australia is a natural wonderland of beautiful beaches, crystal blue waters, amazing ancient rock formations and pristine rainforests.',
  preArrivalBody: 'It is the sixth largest country in the world and has the lowest population density per square kilometre. Australia is made up of six states and two territories:',
  facts: [
    { title: 'Physical Parameters', body: ['Covering a total area of 7.69 million square kilometres, mainland Australia is the world’s largest island but smallest continent.', 'The continent stretches about 3700 kilometres from north to south and 4000 kilometres from east to west, making it the sixth-largest nation after Russia, Canada, China, the United States and Brazil.'] },
    { title: 'Climate', body: ['The majority of the Australian mainland has temperate weather for most of the year. The northern states of Australia are typically warm all the time, with the southern states experiencing cool winters but rarely sub-zero temperatures.'] },
    { title: 'Government', body: ['Australia has three levels of government – the Federal Australian Government, the governments of the six states and two territories, and around 700 local government authorities.', 'Australia has been a nation with a single national government since 1 January 1901. Although it is divided into states and territories which have their own state governments, all these states are united as one nation.', 'Australia follows a Westminster system of government and law, which is inherited from the British who originally colonised the country.'] },
    { title: 'Society', body: ['Australian society is made up of people from a rich variety of cultural, ethnic, linguistic and religious backgrounds; this is a defining feature of modern Australian society.', 'Aboriginal and Torres Strait Islander people have inhabited Australia for tens of thousands of years. Most Australians are immigrants or the descendants of immigrants who arrived during the past two hundred years from more than 200 countries.'] },
    { title: 'Language and Religion', body: ['The most common language in Australia is English, and the most practiced religion is Christianity, although foreign languages and other religions are common.'] },
  ],
  welcome: 'Regardless of where in the world you’re from, you’re sure to find someone who speaks your language and shares your culture!',
  why: [
    'Australia is a vibrant and lovely country, rich in natural resources and natural beauty. Australia has some of the world’s most beautiful natural environments, with diverse wildlife, spectacular landscapes and golden beaches that stretch as far as the eye can see. The Great Barrier Reef, the world’s largest coral reef system, is a jewel in Australia’s backyard.',
    'The country’s many national parks and World Heritage Areas are home to unique species of flora and fauna. They are also home to some of the deadliest animals in the world (snakes, spiders, crocodiles and sharks). Australia also has some of the most interesting native animals, including kangaroos, koala bears, wombats and more unique animals such as the Australian dingo.',
    'The multicultural lifestyle here is easy-going, without the stress associated with a fast-paced environment. While the standard of living and the quality of life is high, the cost of living is surprisingly affordable. Both in big cities and small towns, Australians have a laid-back lifestyle, and are ready to lend a hand when times are tough – or have fun when things are going well!',
    'There are plenty of opportunities available for both leisure and pleasure. Australia is a great place for work as well as study. Australians don’t want to live anywhere else in the world!',
  ],
  education: 'The quality and diversity of the education system in Australia attracts many international students to pursue their studies in this country. Degrees from Australian universities are recognised everywhere, and an education from an Australian University is considered on par with the best in the world.',
  figures: [
    'Australian cities are consistently ranked in the world’s ten most liveable cities',
    'Australia has the third-highest number of international students in the world behind the United Kingdom and the United States (despite having a population of only 24 million)',
    'Australia has seven of the top 100 universities in the world',
    'There are over 22,000 educational courses across 1,100 institutions',
    'Australia has five of the 30 best cities in the world for students based on parameters like student mix, affordability, quality of life, and employer activity',
    'The country has more than 260 languages spoken in Australian homes (besides English, the most common are Mandarin, Italian, Arabic, Cantonese and Greek)',
    'Australia had, until 2020, experienced more than 20 years of continued economic growth and withstood the 2008 global financial crisis better than most advanced economies',
    'Australians love their sports! There are more than 120 certified sports organisations around the country, covering popular activities such as AFL, cricket, football (soccer), rugby league, golf, tennis, netball and hockey to name just a few',
    'They also have world-class infrastructure, being in the top 40 cities with the best infrastructure in the world',
  ],
  livingCost: 'According to the Australian Government, you will need around AUD $29,710 per person per year for living expenses as a student visa holder. The exact cost, however, is dependent on your own lifestyle, and you should budget for roughly around it per year per adult. Keep in mind that your living expenses are separate from your tuition.',
  livingVaries: 'Living expenses vary depending on circumstances such as the type of accommodation you select, its location, the number of people you live with, and your lifestyle.',
  cities: [
    {
      city: 'Melbourne', image: '/images/international/melbourne.webp',
      intro: 'Over several years, Melbourne, Australia, has been ranked as one of the world’s top three Most Liveable Cities. Cosmopolitan and stylish, Melbourne is a dynamic, artsy city that is well known for its diversity in culture and food. Sports lovers will have plenty of company here, and you’ll find that the city exudes effortless charm and laid-back appeal.',
      extra: { title: 'Accommodation', body: ['If you need to rent apartments, units, or houses in Melbourne, you must choose between the two categories of apartment rentals: furnished and unfurnished.', 'People who plan to live in Melbourne for long periods of time usually opt for unfurnished apartments. The leases on these apartments usually begin at a minimum of 6 months, and you can ask for a lease of one year if you wish.', 'A quick guide to the cost of living in Melbourne can be found at the link below.'] },
      more: { label: 'More information about living in Melbourne', href: 'https://liveinmelbourne.vic.gov.au/discover/melbourne-victoria/about-melbourne' },
      weather: ['Melbourne has very unpredictable weather, there can even be four seasons in one day! In winter, the lowest temperature might be 10°C during the daytime. In summer, Melbourne residents experience two or three 40°C days, followed by a cool change.', 'Summer is experienced in Melbourne between December to February, Autumn is from March to May, Winter is from June to August, and Spring is from September to November.', 'Melbourne has a moderate, oceanic climate and is colder than other mainland Australian state capital cities in the winter.'],
      weatherMore: 'https://liveinmelbourne.vic.gov.au/live',
    },
    {
      city: 'Perth', image: '/images/international/perth.webp',
      intro: 'Perth is the capital of Western Australia and is Australia’s fourth largest city. Perth is free of the congestion and pollution in cities like Sydney, Brisbane and Melbourne, with an easy-going lifestyle that’s second to none. Life in this beautiful city unfolds on the banks of the gorgeous Swan River. With its clean air, beautiful beaches, wide open spaces, relaxed lifestyle and a multicultural society that welcomes people from all over the world, Perth is one of the most pleasing places to be in!',
      more: { label: 'More information about living in Perth', href: 'https://www.westernaustralia.com/au/Pages/Welcome_to_Western_Australia.aspx' },
      weather: ['Perth’s weather is one of its best features. Warm summers and mild winters let you make the most of the great outdoors. Perth receives moderate though highly seasonal rainfall, making it the fourth wettest Australian capital city after Darwin, Sydney and Brisbane.', 'Summers are generally hot and dry, lasting from December to late March, with February generally being the hottest month of the year.', 'Winters are relatively cool and wet, making Perth a classic example of a Mediterranean climate.'],
      weatherMore: 'https://migration.wa.gov.au/living-in-western-australia',
    },
    {
      city: 'Sydney', image: '/images/international/sydney.webp',
      intro: 'With a spectacular location around a glorious harbour, Sydney is draped around a coastal basin with the Pacific Ocean to the east and the rugged Blue Mountains to the west. One of the friendliest cities in Australia, Sydney offers visitors and students a plethora of attractions and activities. The cost of living in Sydney is not high considering that it is one of the best cities in the world.',
      more: { label: 'More information about living in Sydney', href: 'https://www.sydney.com/' },
      weather: ['The climate of Sydney is temperate, with warm summers and mild winters, and rainfall spread throughout the year. Average minimum temperatures in the winter months of June through to August are around 9°C (47-48 °F).', 'The summer season is from December to February.'],
      weatherMore: 'https://www.nsw.gov.au/living-in-nsw',
    },
  ],
  costs: { body: 'When planning for the cost of living and studying in Australia, international students must consider varying tuition fees determined by their chosen education provider, level of study, and study location. It’s crucial to meticulously assess these factors to ensure financial preparedness for an enriching academic experience in Australia.', href: 'https://www.studyaustralia.gov.au/en/life-in-australia/living-and-education-costs' },
  working: ['Australia offers great employment opportunities and is a wonderful place to call your home. The lifestyle is stress-free, there are plenty of employment opportunities available and the Australian Government welcomes skilled workers in any discipline with a passion to do their best.', 'To work, you must have a valid Australian visa with work rights, and a range of temporary and permanent skilled visas are available. In keeping with Australian laws, all employees are provided with basic rights and protection in the workplace.'],
  workingHref: 'http://www.homeaffairs.gov.au/Trav/Work',
  fairWork: {
    intro: 'The Fair Work Ombudsman is an independent statutory office. Their services are free to all workers and employers in Australia. They aim to:',
    aims: ['Promote harmonious, productive and cooperative workplace relations', 'Ensure compliance with Australian workplace laws', 'Monitor certain 457 and 482 subclass visa arrangements'],
    statement: 'They have outlined the Fair Work Information Statement, which provides new employees with information about their conditions of employment. The Statement has information on:',
    topics: ['The National Employment Standards', 'Right to request flexible working arrangements', 'Modern awards', 'Making agreements under the Fair Work Act 2009', 'Individual flexibility arrangements', 'Freedom of association and workplace rights (general protections)', 'Termination of employment', 'Right of entry', 'The role of the Fair Work Ombudsman and the Fair Work Commission'],
    statementHref: 'https://www.fairwork.gov.au/employee-entitlements/national-employment-standards/fair-work-information-statement',
  },
  entitlements: [
    { title: 'Employee Entitlement', body: 'There are rules about what employees get at work, such as what hours they work and how often they have to have a break. These rules can be set out in different places such as an award, registered agreement or an employment contract.' },
    { title: 'Bullying & harassment', body: 'Find out what bullying at work is, who is protected and how to get help.', href: 'https://www.fairwork.gov.au/employee-entitlements/bullying-and-harassment' },
    { title: 'Protections at work', body: 'Learn what employee rights are protected at work and where to get help.', href: 'https://www.fairwork.gov.au/employee-entitlements/protections-at-work' },
  ],
  afterGraduation: { intro: 'If you have completed your graduation from an Australian educational institute, you’ll find that there are several options open to you.', options: ['You could continue your studies and pursue a higher level of qualification.', 'Or, you can opt to switch to another field of study.', 'You could choose to put your new education to work in Australia, or go back to your country of origin.'], visa: 'If you wish to work or study in Australia, then you must check if your visa remains valid, or else apply for a new visa. Please visit the Department of Home Affairs website to check your visa status and conditions.', href: 'https://www.homeaffairs.gov.au/' },
  visaOptions: { body: 'There are different classes of Student Visas for Australia. They vary depending on the type of study (eg: English language course, graduate degree, vocational training, higher education, etc.) you are planning to undertake.', href: 'https://www.studyaustralia.gov.au/english/latest-travel-and-visa-advice/updates/travel-and-visas' },
  visaConditions: { body: 'For a full list of mandatory and discretionary student visa conditions follow the link below.', href: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder/study' },
  cricos: ['The Commonwealth Register of Institutions and Courses for Overseas Students (CRICOS) is an Australian government register that lists all Australian education providers offering courses to people studying in Australia on student visas and the courses offered.', 'Education institutions must be registered on CRICOS in order to enrol and deliver education services to students in Australia on a student visa.'],
  cricosProvider: { text: 'As a CRICOS provider, HCI has met, and continues to meet, the requirements of the Education Services for Overseas Students Act 2000 (ESOS Act) and the National Code of Practice for Providers of Education and Training to Overseas Students 2018.', href: 'https://www.legislation.gov.au/Details/F2017L01182' },
}

export const INTERNATIONAL_HANDBOOK = '/International-SHB/International-SHB.pdf'

// ------------------------------------------------------------------ Advice for international students
export const VISA_ADVICE = [
  { id: 'visa-conditions', title: 'International Student Visa Conditions', body: ['As a student enrolled at our Institution, it is imperative to understand the conditions of your student visa to ensure a smooth and positive study experience. Additionally, it is crucial to recognize that our Institution is obligated by law to report certain information to the Department of Home Affairs (DHA), particularly if there are changes to your enrolment status, such as cessation of studies.', 'In order to maintain a valid student visa, it is essential to possess a Confirmation of Enrolment (COE) issued by our Institution during the acceptance process.'] },
  { id: 'understanding', title: 'Understanding your Visa Conditions', body: ['It’s crucial to familiarize yourself with the conditions outlined in your student visa. For a comprehensive overview, please visit the Department of Home Affairs (DHA) website. You can also check your visa details and applicable conditions for you and your family members online through VEVO (Visa Entitlement Verification Online).'] },
  { id: 'work', title: 'Work Limitations', body: ['Upon commencement of your course, you are allowed to engage in paid employment for up to 48 hours per fortnight during term time. A fortnight is defined as a 14-day period starting on a Monday.', 'For more detailed information, please refer to the Australian Government’s official website.'] },
  { id: 'course-requirements', title: 'Meet Course Requirements', body: ['To uphold your student visa status, it is imperative to remain enrolled in your designated course and fulfil the progression criteria set forth by the institution.', 'In the event that you fall short of meeting the course progression standards, the institution will reach out to you to initiate an intervention strategy aimed at aiding you in restoring your academic trajectory and meeting the requisite benchmarks.', 'Should these intervention efforts prove insufficient and you continue to struggle to meet the course progression requirements, in accordance with the Academic Progression Policy, the possibility of exclusion from the institution may arise. However, you retain the right to challenge this decision through the established Complaints and Appeals Policy and Complaints and Appeals Procedures. Should you choose to contest the decision and your appeal is unsuccessful, or if you opt not to appeal, the institution will be obligated to report your status to the Department of Home Affairs (DHA) for non-compliance with course progress or attendance regulations. Consequently, this may lead to the cancellation of your student visa.'],
    links: [{ label: 'Academic Progression Policy', href: '/pdf/policies/Student_Academic_Progression_Policy.pdf' }, { label: 'Complaints and Appeals Policy', href: '/pdf/policies/Student_Complaints_and_Appeals_Policy.pdf' }] },
  { id: 'oshc', title: 'Overseas Student Health Cover', body: ['Overseas Student Health Cover (OSHC) is mandatory for all student visa holders and their dependents throughout their stay in Australia. This comprehensive insurance ensures access to medical and hospital services during your time in the country.', 'When accepting your offer, you have the option to have your OSHC arranged through your institution with Allianz Global Assistance. Alternatively, you can choose to purchase OSHC from an Australian Government approved provider independently.', 'Students from select countries such as Norway, Sweden, and Belgium may have specific arrangements under their national schemes. For further details, they are encouraged to reach out to the Department of Home Affairs (DHA).'] },
  { id: 'contact-details', title: 'Notification of Contact Details Update', body: ['It is imperative to inform the Student Support Team within seven days of the following instances:'], list: ['Your new address and updated contact details subsequent to your arrival in Australia.', 'Any modifications to your address or contact details during your enrolment at the institution.'], after: 'Ensuring the accuracy of your contact information is crucial, as the Department of Home Affairs (DHA) may need to reach out to you regarding visa-related matters. Failure to provide accurate details could potentially result in visa cancellation without prior notification.' },
]
export const TRANSFER = {
  body: 'For international students seeking to transfer to our institution or requesting release before completing the initial 6 months of their primary course, it is imperative to refer to the International Student Transfer Request Assessment Policy and Procedures. Approval for a release request will be granted only under specific and exceptional circumstances.',
  note: '*The primary course of study denotes the main academic program pursued by an international student, for which a student visa has been issued, even if multiple courses are planned.',
  links: [{ label: 'International Student Transfer Request Assessment Policy', href: '/pdf/policies/International_Student_Transfer_Request_Assessment_Policy.pdf' }, { label: 'International Student Transfer Request Assessment Procedure', href: '/pdf/procedures/International_Student_Transfer_Request_Assessment_Procedure.pdf' }],
}

// ------------------------------------------------------------------ Before leaving
export const BEFORE_LEAVING = {
  intro: ['With your luggage packed and ready to fly to Australia, we know you’re anxiously anticipating the next step in your journey.', 'The Institute of Health and Management is committed to helping you along this process. Our student support staff is available to assist you; simply call or email us if you require assistance. We will be by your side!', 'To guarantee that you can take advantage of everything that IHM and Australia have to offer, there are a few steps you must follow. This includes verifying your visa, securing housing, budgeting for living expenses, arranging an airport pickup, and packing your belongings.'],
  steps: [
    { title: 'Confirm the status of your student visa', body: ['To study at IHM as an international student, you must obtain a Confirmation of Enrolment (CoE) and a student visa (subclass 500). Verify that you have been granted a visa.'] },
    { title: 'Translate your immunisation certificate into English', body: ['To avoid unnecessary delays on your journey and upon arrival in Australia, ensure that your proof of vaccination is in English.'] },
    { title: 'Find an accommodation', body: ['International students have a variety of housing alternatives, including Residential Colleges, student apartments, private rentals, hostels, share houses, homestays, and temporary housing.'] },
    { title: 'Temporary housing', body: ['If you wish to find long-term housing after arriving in Melbourne, we recommend that you arrange temporary lodging before departing your home country.'] },
    { title: 'Arrange for an airport pickup', body: ['You must schedule your airport pickup three working days in advance of your arrival.', 'This is a 24-hour service provided by a variety of service providers; you can simply locate them by conducting a simple Google search. Don’t forget to reserve them before your arrival. You can also arrange for a cab / taxi service to take you directly from the airport to your accommodation centre.'] },
  ],
}

// ------------------------------------------------------------------ Genuine Student test
export const GST = {
  intro: 'The transition from the Genuine Temporary Entrant (GTE) requirement to the Genuine Student (GS) requirement for student visas in Australia, effective from 23 March 2024 onward, represents a significant shift in the assessment process. The Genuine Student Test (GST) in Australia represents a shift in assessing international student visa applications, replacing the Genuine Temporary Entrant (GTE) requirement. The GST is a comprehensive evaluation aimed at ensuring the authenticity and sincerity of students intending to study in Australia.',
  gsHref: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement',
  breakdownIntro: 'Here’s a breakdown of its benefits and how it differs from the previous GTE requirement:',
  breakdown: [
    ['Scope and Application', 'The GS requirement applies to student visa applications lodged on or after 23 March 2024. However, applications lodged before this date will continue to be assessed against the previous GTE requirement.'],
    ['Primary Intent of Studying', 'All applicants for a student visa must demonstrate genuine intent to study in Australia as their primary reason for obtaining the visa. This ensures that individuals entering Australia on student visas are committed to their education.'],
    ['Development of Skills and Pathway to Permanent Residence', 'The GS requirement aims to include students who, after studying in Australia, acquire skills that are valuable to the country. This implies that students who fulfill the GS requirement may have opportunities to apply for permanent residence in Australia.'],
    ['Genuine Student Criterion', 'To be granted a student visa, applicants must satisfy the genuine student criterion. This involves demonstrating a genuine intention to study in Australia and an understanding that studying is the primary purpose of their visa.'],
    ['Dependent Criterion', 'In addition to the genuine student criterion, applicants may also need to satisfy the genuine student dependent criterion if they are dependents of the primary student visa applicant.'],
  ],
  questionsTitle: 'In the online student visa application form, applicants will be asked the following questions to address the Genuine Student (GS) criteria:',
  questions: [
    ['Current Circumstances', 'Provide details of your current circumstances, including ties to family, community, employment, and economic situation.'],
    ['Reason for Choosing Course and Education Provider', 'Explain why you wish to study this course in Australia with this particular education provider. Include your understanding of the requirements of the intended course and studying and living in Australia.'],
    ['Benefits of Completing the Course', 'Explain how completing the course will be beneficial to you.'],
    ['Additional Relevant Information', 'Provide any other relevant information you would like to include.'],
  ],
  questionsNote: ['For applicants who have previously held a student visa or those lodging an application in Australia from a non-student visa, an additional question will be asked.', 'It’s crucial to provide evidence to support your claims, as generic statements will not carry significant weight in the GS assessment. Your overall personal circumstances will be considered during the assessment process.'],
  benefits: [
    ['Fairness and Transparency', 'The GST emphasises fairness and transparency in the evaluation process, treating all applicants equitably.'],
    ['Comprehensive Assessment Criteria', 'Unlike the previous GTE requirement, the GST employs a detailed set of criteria to accurately assess each applicant’s suitability for a student visa.'],
    ['Aligning Intentions with Visa Goals', 'The GST scrutinises applicants’ intentions to ensure they genuinely intend to pursue education in Australia, aligning with the purpose of the student visa.'],
    ['Confidence in Clarity', 'Applicants have a clear understanding of what is expected of them during the GST process, reducing uncertainties and instilling confidence.'],
    ['Building Trust in the System', 'The transparent and open nature of the GST fosters trust between applicants and the Australian immigration system, crucial for a positive visa application experience.'],
  ],
  comparisonIntro: 'While the GST may seem more challenging due to its broader criteria and thorough examination, it aims to bring genuine students and clarity to the evaluation process. The added effort required for the GST is offset by its equitable and transparent nature.',
  gte: 'Focuses on a personal statement explaining the student’s genuine reasons for migrating and studying in Australia, supported by documents and evidence.',
  gs: 'Based on targeted questions asked of students applying for a student visa, including explanations of their circumstances and the purpose of their visit to Australia.',
  close: 'The transition from GTE to GST signifies a commitment to maintaining the integrity of the Australian education system while ensuring that genuine students have the opportunity to study in Australia.',
  direction: 'https://immi.homeaffairs.gov.au/Visa-subsite/files/direction-no-106.pdf',
  form: '/pdf/IHM_Genuine_Student_Assessment_Form.pdf',
}

// ------------------------------------------------------------------ English language requirements
export const ENGLISH = {
  exemptIntro: 'IHM does not require applicants to provide evidence of English language if they are:',
  exempt: ['Citizens of English-speaking countries, OR', 'Permanent Residents of English-speaking countries, OR', 'Individuals who have resided in an English-speaking country for a minimum of TEN years and have completed secondary or tertiary education in an English-speaking country.'],
  evidence: ['Proof of citizenship or residency', 'Copies of official academic transcripts (where applicable)'],
  countries: ['Antigua and Barbuda', 'Australia', 'Bahamas', 'Barbados', 'Belize', 'Botswana', 'Canada (excl Quebec)', 'Cook Islands', 'Dominica', 'Fiji', 'Gibraltar', 'Ghana', 'Grenada', 'Guyana', 'Jamaica', 'Kenya', 'Kiribati', 'Lesotho', 'Liberia', 'Malawi', 'Mauritius', 'Micronesia', 'Namibia', 'New Zealand', 'Nigeria', 'Papua New Guinea', 'Sierra Leone', 'Singapore', 'Solomon Islands', 'South Africa', 'Tanzania', 'The Gambia', 'Tonga', 'Trinidad and Tobago', 'Uganda', 'Zambia', 'Zimbabwe', 'United States of America', 'United Kingdom (incl Northern Ireland) and Republic of Ireland'],
  testsIntro: 'IHM accepts the following English language tests, provided they were completed no more than two years before the intended start date and meet the minimum scores for the desired program. Applicants are required to provide copies of official Academic Transcripts as evidence.',
  courses: [
    {
      course: 'Graduate Certificate in Advanced Nursing (GCAN)# and Master of Nursing#',
      tests: [
        ['International English Language Testing System (IELTS) - Academic version', 'Overall 6.5, with no band less than 6'],
        ['Pearson Test of English (PTE) - Academic', 'Overall 59, with no band less than 52'],
        ['Occupational English Test (OET) - Nursing courses only', 'Minimum C+ in each component'],
        ['English for Academic Purposes (EAP)', 'Minimum score of 70%'],
      ],
      note: '# For the online-delivery/hybrid version of the course only, English Language Proficiency Test requirements do not apply if the applicant studied in a non-English speaking country and has completed a minimum of 5 years continuous education in English Language (including higher secondary and above levels).',
    },
    {
      course: 'Bachelor of Social Work',
      tests: [
        ['International English Language Testing System (IELTS) - Academic version', 'Overall 7, with no band less than 7'],
        ['Pearson Test of English (PTE) - Academic', 'Overall 65, with no band less than 65'],
      ],
    },
  ],
  exclusionsIntro: 'In addition to the online-delivery courses marked above, IHM acknowledges the following as exclusions to English Language Tests. Applicants are required to provide the following documents as evidence:',
  exclusionsEvidence: ['Certified copies of official Academic Transcripts.', 'An original statement or certificate (on official letterhead) issued by the Registrar, or equivalent, confirming that the sole language of instruction and assessment was in English.'],
  exclusionsNote: 'Please refer to the accredited curriculum documentation as some courses have specific requirements. Where this is the case, the requirements in the accredited document apply.',
  secondaryIntro: 'Applicant is from a non-English speaking country but has completed a Secondary School Education which has been taught and assessed in English: Applicants can satisfy the EL requirement with successful completion of one of the secondary school English subjects/courses listed below, which must have been completed within the last 2 years.',
  secondary: [
    ['All', 'Cambridge Pre-University Diploma', 'Achieve a P2 or higher in Literature in English or satisfactorily complete both Global Perspectives and Independent Research Report'],
    ['All', 'GCE A Levels', 'Grade of at least C in one of the following subjects: AS or A Level General Paper; AS or A Level General Studies; AS or A Level English Language; AS or A Level English Literature; AS or A Level English Language and Literature. Applicants who have completed their GCSE and A Levels in the United Kingdom may also satisfy the English language requirements by achieving a grade of at least B in GCSE English. Please note if you have completed Sri Lankan A Levels, you must satisfy the English language requirements by completing an approved English language proficiency test.'],
    ['All', 'International Baccalaureate Diploma', 'At least grade 4 in English A or English B at SL or HL'],
    ['Denmark', 'Studentereksamen', 'Grade 7 or higher in English in the final year (English B or English A)'],
    ['Germany', 'Abitur', 'Grade 10 or higher in Leistungskurs or Kurse mit erhöhtem Anforderungsniveau English'],
    ['Hong Kong', 'Hong Kong Diploma of Secondary Education', 'English with a grade of 4 or higher'],
    ['India', 'CBSE XII (All India Senior School Certificate Examination)', 'Pass the English subject in the CBSE'],
    ['India', 'CISCE Indian School Certificate', 'Pass the English subject in the ISC'],
    ['Malaysia', 'Sijil Tinggi Persekolahan Malaysia (STPM)', 'C pass in 920 English'],
    ['Netherlands', 'VWO', 'Grade 8 or higher in final year English'],
    ['Norway', 'Vitnemål For Videregående Opplæring', 'Grade of at least 4 in ENG1002 or ENG1003'],
    ['Singapore', 'Singapore A Levels', 'Grade of at least C in the Higher 2 (H2) Level subject Knowledge and Inquiry'],
    ['Sweden', 'Avgangsbetyg/Slutbetyg', 'At least VG or grade 4 in final year English or at least a C grade in English 6'],
    ['Switzerland', 'Swiss Matura', 'A grade of 5 (good) or better in English'],
    ['United States', 'Advanced Placement exam', 'A score of at least 3 in AP English Language and Composition or English Literature and Composition'],
  ],
  secondaryNote: ['Other countries not already listed will be considered on a case-by-case basis. The outcome will be documented and stored in the student management system.', 'Pearson curriculum is offered globally in many schools. A search function is available to identify individual schools delivering Pearson curriculum in English Language.'],
  pearsonHref: 'https://qualifications.pearson.com/en/support/support-topics/understanding-our-qualifications/find-a-pearson-centre.html',
  tertiaryIntro: 'Applicant has undertaken Tertiary Studies taught and assessed entirely in English: Applicants can satisfy the EL requirement if they satisfy the following:',
  tertiary: [
    ['Australia', 'AQF 5 or 6: VET Diploma, Advanced Diploma or Associate Degree', 'Passed at least the first year (studied full time), within the last 2 years', 'Taught and assessed entirely in English'],
    ['Australia', 'AQF 5 or higher', 'Passed at least 2 years (studied full time), within the last 5 years', 'Taught and assessed entirely in English'],
    ['All other countries ¹', 'Post secondary/tertiary course', 'Passed at least one-year of full time studies within the last 2 years', 'Taught and assessed entirely in English'],
  ],
  tertiaryNote: '¹ If you have completed your studies in a non-English speaking country, you will need to submit a letter on official letterhead, or an email from an official staff member email account, from the Academic Registrar or a suitable delegate, which specifies that the specific degree completed was entirely taught and assessed in English.',
  work: { condition: 'Lived and worked consistently in an English-speaking country', duration: '3 years', note: 'Must provide work reference letter on company letterhead with specific information on the type of work, dates of employment and contact details of supervisor' },
}

// ------------------------------------------------------------------ USI
export const USI = {
  what: ['The USI, or Unique Student Identifier, is a vital government-issued code in the realm of Australian education and training. Think of it as your exclusive educational identity card. This unique code, assigned to you, accompanies every educational endeavour you undertake in Australia.', 'An important thing to note is that your USI stays with you throughout your educational journey. It grants you access to a comprehensive online record, known as the USI transcript, where all your nationally recognised training is neatly documented.'],
  aboutHref: 'https://www.usi.gov.au/about-us',
  createHref: 'https://www.usi.gov.au/',
  ids: ['Australian passport', 'Australian Visa and non-Australian passport', 'Non-Australian Passport (New Zealand)', 'Australian birth certificate (a birth certificate extract or commemorative birth certificate will not be accepted)', 'Australian driver’s licence', 'Medicare card', 'Certificate of registration by descent', 'Centrelink concession card', 'Citizenship certificate', 'ImmiCard', 'Aviation-Maritime Security Identification Card'],
  idsHref: 'https://www.usi.gov.au/students/identification',
  notes: [
    'When setting up your USI, ensure consistency by using the exact personal information provided to IHM, avoiding any discrepancies.',
    'To cross-check your information with the Australian Government USI Office, visit their website and select the ‘Update Personal Details’ option. It’s crucial to use your legal name as stated on your passport or other identification documents.',
    'You only require one USI. If you suspect that you have one from previous studies, you can search the USI website to confirm and provide it to IHM accordingly.',
  ],
  updateHref: 'https://www.usi.gov.au/students/update-your-details',
  findHref: 'https://www.usi.gov.au/students/find-your-usi',
  phone: '1300 857 536',
  phoneHours: 'between 8:30am and 6:30pm (AEDT), Monday to Friday (excluding national and South Australian public holidays)',
  offshore: [
    { title: 'Are you currently offshore but coming to Australia to study?', body: ['You will need to arrive in Australia, go through customs and only then create a USI.'] },
    { title: 'Are you currently offshore, but have studied some of your degree in Australia?', body: ['You don’t need to provide a USI if you meet these criteria:'], list: ['You studied with an Australian education or training provider in Australia.', 'You didn’t use Commonwealth financial assistance for your studies.', 'You started your studies before 1 January 2023.', 'You completed your studies either partially or entirely within Australia, but you’re currently overseas and won’t be returning to Australia.'], after: 'However, if you intend to come back to Australia before finishing your degree, you must create a USI and provide it to IHM at that point.' },
    { title: 'Are you currently offshore, and have studied all your degree offshore?', body: ['If you started your course in 2022 or before and finished all your studies abroad, you are exempt from needing a USI.', 'However, if your course began in 2023 or later and you’re studying entirely overseas, you need to request a USI exemption through the Student Identifiers Registrar.'], href: 'https://www.usi.gov.au/exemptions', hrefLabel: 'Apply for a USI exemption' },
    { title: 'Are you a Permanent resident of Australia or a New Zealand citizen?', body: ['According to the Higher Education Support Act 2003 (HESA Act), permanent visa holders and New Zealand citizens need to be physically present in Australia to qualify for a Commonwealth Supported Place (CSP) or HECS-HELP.', 'To secure your CSP, you must have a USI. However, you can only create a USI and begin your studies after arriving in Australia and clearing customs. If you won’t be able to reach Australia before your course begins, you must apply to postpone the start of your studies.', 'If you plan to arrive in Australia before your first census date but wish to enrol from overseas, please reach out to us via an enquiry so we can provide the necessary assistance.'], href: 'https://www.studyassist.gov.au/help-loans/commonwealth-supported-places-csps', hrefLabel: 'Australian Government CSP page' },
  ],
  who: ['Students who started their studies in 2021 or later and are receiving funding from the Australian Commonwealth must have a USI. This applies to several types of Commonwealth funding, including HECS-HELP, FEE-HELP, OS-HELP, SA-HELP, Commonwealth Supported Place (CSP), Research Training Program (RTP) funding, and Australian Commonwealth grant-funded research scholarships like ARC and NHMRC funding.', 'Starting from January 1, 2023, students are required to create their USI before becoming eligible for graduation*. Please note that there might be earlier deadlines to ensure your USI is recorded before you complete your course.'],
  whoNote: '*Exemptions: Offshore international students who commenced their studies in 2022 or earlier and won’t be returning to Australia are automatically exempt from the USI requirement.',
  when: ['New students starting their courses in 2022 or later will be asked to provide their USI during the initial course enrolment process.', 'For those who began their courses before 2022, IHM will send you an email at the appropriate time, requesting your USI. However, you have the option to provide it earlier if you prefer.'],
  missingIntro: 'Ensuring you submit your USI by the specified deadline is crucial, as it’s a requirement mandated by the Australian government. Failure to comply can lead to severe consequences:',
  missing: [['New students, including domestic graduate researchers', 'You won’t be able to enrol and start your course.'], ['Domestic coursework students receiving Australian Commonwealth funding', 'Your enrolment will be cancelled after your earliest subject census date.'], ['All students and graduate researchers completing their course from January 1, 2023', 'Graduation will be put on hold until you provide your USI.'], ['Graduate researchers', 'There might be hindrances in submitting your thesis for examination.']],
}

// ------------------------------------------------------------------ ESOS
export const ESOS = {
  intro: 'In fulfilling our mission to provide education and training services to international students, IHM is unwaveringly dedicated to upholding the stringent guidelines and regulations set forth by both the Federal Government and the National Regulator, TEQSA (Tertiary Education Quality and Standards Agency). Our steadfast commitment to adhering to these standards not only exemplifies our pledge to excellence but also reinforces our devotion to delivering top-tier education and training to our international student community.',
  framework: [{ label: 'Education Services for Overseas Students (ESOS) Act 2000', href: 'https://www.education.gov.au/esos-framework/changes-legislative-framework-overseas-students' }, { label: 'National Code of Practice for Providers of Education and Training to Overseas Students (National Code) 2018', href: 'https://www.legislation.gov.au/Details/F2017L01182' }],
  body: ['The ESOS Framework has been crafted to institute and uphold national standards governing the delivery of education and training services for international students. The legislative framework is designed with the overarching goal of safeguarding the interests of international students and ensuring the delivery of high-quality education. Additionally, it empowers the Department of Education to take decisive action against providers found to be in violation of their obligations.', 'It is imperative to note that the Legislative Framework exclusively pertains to students enrolled in onshore programs who continue to reside in Australia on a Student Visa. This legislation does not extend its jurisdiction to students engaged in offshore programs or those remaining in Australia under a temporary visa other than a Student Visa.'],
  more: [
    { label: 'Student rights and responsibilities under the ESOS Act [PDF 605KB]', href: 'https://internationaleducation.gov.au/Regulatory-Information/Documents/esosstudentfactsheetv4%20-%20Final%20clean%20copy.pdf' },
    { label: 'Overview of the National Code 2018', href: 'https://internationaleducation.gov.au/Regulatory-Information/Pages/National-Code-2018-Factsheets-.aspx' },
    { label: 'The National Code 2018', href: 'https://www.legislation.gov.au/Details/F2017L01182' },
    { label: 'The Education Services for Overseas Students (ESOS) Act 2000', href: 'https://www.legislation.gov.au/Details/C2020C00039' },
    { label: 'Tuition Protection Service', href: 'https://tps.gov.au/Home' },
  ],
}

// ------------------------------------------------------------------ Nursing registration (AHPRA)
export const AHPRA = {
  intro: ['The Australian Health Practitioner Regulation Agency, popularly known as AHPRA, works in partnership with the Nursing and Midwifery Board of Australia (NMBA) to regulate Australian nurses, midwives and nursing and midwifery students and get registered in Australia.', 'AHPRA evaluates applications for registration very carefully and assesses every single criterion against the registration requirements set up by each Board. Once each and every requirement is satisfied, the Decision Letter is issued to the applicant.'],
  documents: ['Application Form', 'Application Fee', 'Passport', 'Name change Document', 'Qualification Certificates', 'Registration Certificates', 'Experience Certificates', 'Language Certificate', 'Criminal Check Report', 'Good Standing Certificate', 'Resume'],
  documentsHref: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/Supporting-documentation.aspx',
  applying: ['Once we lodge an application in AHPRA, they will assess the file against their registration standards. As soon as the assessment is complete, they will issue a Decision mentioning if you are eligible for Direct Registration or to complete a Bridging program / OBA.', 'If you are referred for a Bridging Program, you will have to complete the course within the expiry of your Decision letter and you can apply for Registration immediately after graduation.'],
  services: ['Application Submission Assistance', 'Visa Application Submission Assistance'],
  /** The AHPRA Nursing Council Registration Process flow chart (theme images/ahpra-flow-chart.jpg), as steps. */
  flow: { start: 'Self-Check', oba: ['Approval for OBA', 'Attend NCLEX-RN Exam', 'Filing of VISA', 'Travel to Australia & Attend OSCE Exam'], direct: 'Eligible for Direct Registration', after: ['Getting Registration', 'Apply for Job', 'Apply for Work VISA', 'Sponsor Family Members & Work as a Registered Nurse', 'Apply for PR', 'Become a Permanent Resident'] },
}

// ------------------------------------------------------------------ Deferral, suspension, cancellation
export const ENROLMENT_CHANGES = {
  intro: ['Any assessments and decisions made to change a student’s enrolment will comply with this policy and related procedures and supporting regulatory guidance.', 'A student’s enrolment can be deferred, suspended, or cancelled in response to a student’s request or be initiated by IHM in accordance with IHM’s regulatory obligations under the National Code in the case of international students.', 'The student may request enrolment deferral, suspension or cancellation in the circumstances outlined in this Policy and Procedure, which is in alignment with the Education Services for Overseas Students Act 2000 (ESOS Act 2000) and the National Code of Practice for Registration Authorities and Providers of Education and Training to Overseas Students 2018 (the National Code).'],
  reasonsIntro: 'Students must be aware that IHM reserves the right to defer, suspend, or cancel a student’s enrolment under certain circumstances including, but not limited to, the following:',
  reasons: ['Delay in visa grant.', 'Student Misconduct.', 'Failure to maintain satisfactory academic progress in accordance with course rules or visa requirements.', 'The student’s failure to pay an amount they were required to pay to IHM to undertake or continue the courses as stated in the written agreement.', 'A breach of course progress or attendance requirements by international students, which must occur in accordance with Standard 8 (Overseas student visa requirements).', 'Students who have failed to re-enrol.', 'Due to compassionate and compelling circumstances.'],
  notice: 'In the event that the Institute of Health & Management (IHM) initiates the suspension or cancellation of enrolment, IHM is obligated to provide written notification to the student, outlining the intention to take such action and providing a clear explanation of the reasons behind the decision, in accordance with this policy.',
  compassionateIntro: 'Compassionate and compelling circumstances are generally those beyond the student’s control and which have an impact upon the student’s course progress or wellbeing. These could include but are not limited to:',
  compassionate: ['Serious illness or injury, where a medical certificate states that the student was unable to attend classes.', 'Bereavement of close family members such as parents or grandparents (where possible a death certificate should be provided).', 'Major political upheaval or natural disaster in the home country requiring emergency travel and this has impacted on the overseas student’s studies.', 'A traumatic experience, which could include: (a) involvement in, or witnessing of a serious accident; or (b) witnessing or being the victim of a serious crime, and this has impacted on the overseas student (these cases should be supported by police or psychologists’ reports).'],
  evidence: 'All claims of compassionate or compelling circumstances must be supported by appropriate evidence such as an original or a certified copy of a death certificate, medical certificate, psychologist and police reports.',
  visa: 'The deferral, suspension or cancellation of enrolment may affect the student’s visa and the student is encouraged to seek advice from the Department of Home Affairs in order to determine the potential impact.',
  docs: [{ label: 'Changes to Enrolment Policy', href: '/pdf/policies/Changes_to_Enrolment_Policy.pdf' }, { label: 'Changes to Enrolment Procedure', href: '/pdf/procedures/Changes_to_Enrolment_Procedure.pdf' }],
  withdrawal: 'https://forms.monday.com/forms/eeded73b4dd6e79414bd612fa0afb134?r=use1',
}
