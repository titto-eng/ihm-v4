// /our-people/ directory (WordPress page 23, synced from the database on 2026-10-29). Plain data: edit a line to change a card.
// Only public professional links are kept (LinkedIn, ORCID, Google Scholar); email addresses are not copied (AGENTS.md rule 4).
// `photo` is a portrait in public/images/people/; a person with a profile page shows the CMS staff photo first (our-people/page.tsx).
export type PersonLinks = { linkedin?: string; orcid?: string; scholar?: string }
export type Person = {
  name: string; role: string
  /** Portrait in public/. A path whose file is missing renders the initials tile; `npm run people:photos` downloads it. */
  photo?: string
  /** The portrait on the old site, relative to wp-content/themes/mwt-ihm/assets/images/ (source for `people:photos`). */
  legacyPhoto?: string
  bio?: string; links?: PersonLinks
}
export type PeopleGroup = { title: string; people: Person[] }
export type PeopleTab = { id: string; label: string; intro: string; groups: PeopleGroup[] }

export const PEOPLE_TABS: PeopleTab[] = [
  {
    id: 'board',
    label: 'Board of Directors',
    intro: 'The Board sets IHM’s strategic direction and oversees governance, risk and financial sustainability.',
    groups: [
      {
        title: '',
        people: [
          { name: 'Adjunct Prof. John G Kelly', role: 'Chair and Non-Executive Director – Higher Education Expert', photo: '/images/people/john-g-kelly.webp', legacyPhoto: 'john-kelly.webp' },
          { name: 'Professor Emeritus Anthony Welch', role: 'Non-Executive Director – Academic Expert', photo: '/images/people/anthony-welch.webp', links: { linkedin: 'https://www.linkedin.com/in/tony-welch-92072760/' } },
          { name: 'Dr. Bijo Kunnumpurath', role: 'Chief Executive Officer and Managing Director, IHM', photo: '/images/people/bijo-kunnumpurath.webp', bio: '/bijo-kunnumpurath/', links: { linkedin: 'https://www.linkedin.com/in/bijokunnumpurath/' } },
          { name: 'Christopher Thomas Hill', role: 'Non-Executive Director', photo: '/images/people/christopher-thomas-hill.webp' },
          { name: 'Mr. Scott Luckett', role: 'Non-Executive Director', links: { linkedin: 'https://www.linkedin.com/in/scott-luckett-317b4915/' }, photo: '/images/people/scott-luckett.webp', legacyPhoto: 'scott-luckett.png' },
          { name: 'Daniel Atkin', role: 'Non-Executive Director – Governance and Risk', photo: '/images/people/daniel-atkin.webp', links: { linkedin: 'https://www.linkedin.com/in/danielatkin/' } },
          { name: 'Trang Perrine', role: 'Non-Executive Director – Financial Management Expert', photo: '/images/people/trang-perrine.webp' },
          { name: 'Emal Dusst', role: 'Non-Executive Director', photo: '/images/people/emal-dusst.webp', legacyPhoto: 'emal-dusst.webp' },
          { name: 'Arun Thomas', role: 'Advisory Board Member', photo: '/images/people/arun-thomas.webp', legacyPhoto: 'arun-thomas.webp' },
        ],
      },
    ],
  },
  {
    id: 'academic-board',
    label: 'Academic Board',
    intro: 'The Academic Board safeguards academic quality, standards and integrity across every IHM course.',
    groups: [
      {
        title: '',
        people: [
          { name: 'Professor Emeritus Anthony Welch', role: 'Chairperson & Non-Executive Director – Academic Expert', photo: '/images/people/anthony-welch.webp', links: { linkedin: 'https://www.linkedin.com/in/tony-welch-92072760/' } },
          { name: 'Dr. Bijo Kunnumpurath', role: 'Chief Executive officer', photo: '/images/people/bijo-kunnumpurath.webp', bio: '/bijo-kunnumpurath/', links: { linkedin: 'https://www.linkedin.com/in/bijokunnumpurath/' } },
          { name: 'Assoc. Prof. Helen Mary Almond', role: 'BOE Acting Chair, Head of School – Nursing', photo: '/images/people/helen-almond.webp', bio: '/assoc-prof-helen-almond/', links: { linkedin: 'https://www.linkedin.com/in/helen-almond-504128176/' } },
          { name: 'Prof. Abraham P. Francis', role: 'Head of School – Social work', photo: '/images/people/abraham-p-francis.webp', links: { linkedin: 'https://www.linkedin.com/in/abraham-p-francis-31053953/' } },
          { name: 'Prof. Robert Bland', role: 'External Member' },
          { name: 'Prof. Maria Mckay', role: 'External Member' },
          { name: 'Dr. Prerna Khawas', role: 'Director – Quality Management', photo: '/images/people/prerna-khawas.webp', bio: '/dr-prerna-khawas/', links: { linkedin: 'https://www.linkedin.com/in/prerna-khawas-phd-sfhea-687548107/' } },
        ],
      },
    ],
  },
  {
    id: 'executive',
    label: 'Executive Management Team',
    intro: 'The team that leads IHM’s operations, finance, quality and schools day to day.',
    groups: [
      {
        title: '',
        people: [
          { name: 'Mr Simon Schweigert', role: 'Chief Operations Officer (Institute of Health and Management)', photo: '/images/people/simon-schweigert.webp', links: { linkedin: 'https://www.linkedin.com/in/simon-schweigert-8a8b3515/' } },
          { name: 'Mr Pankaj Patel', role: 'Chief Financial Officer, Institute of Health & Management', photo: '/images/people/pankaj-patel.webp', links: { linkedin: 'https://www.linkedin.com/in/pankaj-patel-7ba74b13/' } },
          { name: 'Dr. Prerna Khawas', role: 'Director – Quality Management', photo: '/images/people/prerna-khawas.webp', bio: '/dr-prerna-khawas/', links: { linkedin: 'https://www.linkedin.com/in/prerna-khawas-phd-sfhea-687548107/' } },
          { name: 'Mr Bimal Kumar', role: 'Director of Finance', photo: '/images/people/bimal-kumar.webp', links: { linkedin: 'https://www.linkedin.com/in/bimal-kumar-10939076/' } },
          { name: 'Assoc. Prof. Helen Almond', role: 'Head – School, School of Nursing, IHM', photo: '/images/people/helen-almond.webp', bio: '/assoc-prof-helen-almond/', links: { linkedin: 'https://www.linkedin.com/in/helen-almond-504128176/' } },
          { name: 'Prof. Abraham P. Francis', role: 'Head of School – Social work', photo: '/images/people/abraham-p-francis.webp', links: { linkedin: 'https://www.linkedin.com/in/abraham-p-francis-31053953/' } },
          { name: 'Mr Geons Jose', role: 'Director of Operations IHM Australia & Head of Marketing and Sales', photo: '/images/people/geons-jose.webp', links: { linkedin: 'https://www.linkedin.com/in/geonsjose/' } },
        ],
      },
    ],
  },
  {
    id: 'academic-staff',
    label: 'Academic Staff',
    intro: 'Educators, researchers and clinicians who teach across IHM’s Schools of Nursing and Social Work.',
    groups: [
      {
        title: 'Academic Lead',
        people: [
          { name: 'Assoc. Prof. Helen Almond', role: 'Head – School, School of Nursing, IHM', photo: '/images/people/helen-almond.webp', bio: '/assoc-prof-helen-almond/', links: { scholar: 'https://scholar.google.com.au/citations?user=s7CXRFAAAAAJ&hl=en&oi=ao', orcid: 'https://orcid.org/0000-0001-8918-7091', linkedin: 'https://www.linkedin.com/in/helen-almond-504128176/' } },
          { name: 'Prof. Abraham P. Francis', role: 'Head of school – Social work', photo: '/images/people/abraham-p-francis.webp', links: { linkedin: 'https://www.linkedin.com/in/abraham-p-francis-31053953/' } },
        ],
      },
      {
        title: 'School of Nursing',
        people: [
          { name: 'Assoc. Prof. Helen Almond', role: 'Head – School, School of Nursing, IHM', photo: '/images/people/helen-almond.webp', bio: '/assoc-prof-helen-almond/', links: { scholar: 'https://scholar.google.com.au/citations?user=s7CXRFAAAAAJ&hl=en&oi=ao', orcid: 'https://orcid.org/0000-0001-8918-7091', linkedin: 'https://www.linkedin.com/in/helen-almond-504128176/' } },
          { name: 'Dr. Parul', role: 'Senior Lecturer Level C & Course Coordinator, School of Nursing, IHM', photo: '/images/people/parul.webp', bio: '/parul-p/', links: { scholar: 'https://scholar.google.com.au/citations?user=ya9JyCsAAAAJ&hl=en', orcid: 'https://orcid.org/0000-0002-6153-6875', linkedin: 'https://www.linkedin.com/in/p-parul/' } },
          { name: 'Dr. Andy Emmanuel', role: 'Campus Academic Coordinator, Brisbane', photo: '/images/people/andy-emmanuel.webp', bio: '/dr-andy-emmanuel/', links: { scholar: 'https://scholar.google.com/citations?user=-zwwd1YAAAAJ&hl=en', linkedin: 'https://www.linkedin.com/in/andy-emmanuel-phd-98635279' } },
          { name: 'Jolly Mathews Philip', role: 'Campus Academic Coordinator, Perth', photo: '/images/people/jolly-mathews-philip.webp', bio: '/jolly-mathews-philip/', links: { orcid: 'https://orcid.org/0009-0003-5633-7702' } },
          { name: 'Wilma Jasmine Crasta', role: 'Course Coordinator – Graduate Certificate in Advanced Nursing', photo: '/images/people/wilma-jasmine-crasta.webp', bio: '/ms-wilma-jasmine-crasta/' },
          { name: 'Anjali Abraham', role: 'Course Manager – Graduate Certificate in Advanced Nursing', bio: '/anjali-abraham/', photo: '/images/people/anjali-abraham.webp', legacyPhoto: 'anjali-abraham.webp' },
          { name: 'Dr Shay Abed', role: 'Course Coordinator, Melbourne', bio: '/dr-shay-abed/', links: { scholar: 'https://scholar.google.com/citations?user=l0vnNigAAAAJ&hl=en', orcid: 'https://orcid.org/0000-0002-5851-4536' }, photo: '/images/people/shay-abed.webp', legacyPhoto: 'shay-abed.webp' },
          { name: 'Karpakam Aravinthan', role: 'Lecturer', bio: '/karpakam-aravinthan/', links: { orcid: 'https://orcid.org/0009-0003-5633-7702' }, photo: '/images/people/karpakam-aravinthan.webp', legacyPhoto: 'karpakam-aravinthan.webp' },
          { name: 'Dr. Ozgu Serce Yuksel', role: 'Senior Lecturer Level C, School of Nursing, IHM', photo: '/images/people/ozgu-serce-yuksel.webp', legacyPhoto: 'Ozgu.png' },
          { name: 'Dr. Mandeep Kaur', role: 'Senior Lecturer Level C, School of Nursing, IHM', photo: '/images/people/mandeep-kaur.webp', bio: '/mandeep-kaur/', links: { scholar: 'https://scholar.google.com.au/citations?user=9UIhZHQAAAAJ&hl=en', orcid: 'https://orcid.org/0000-0002-6984-3271', linkedin: 'https://www.linkedin.com/in/dr-mandeep-randhawa-95a49b285/' } },
          { name: 'Bindu Varughese', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/bindu-varughese.webp', bio: '/mrs-bindu-varughese/' },
          { name: 'Greety Antony', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/greety-antony.webp', bio: '/greety-antony/', links: { orcid: 'https://orcid.org/0000-0002-4864-6543', linkedin: 'https://www.linkedin.com/in/greety-antony-7aa6b6114/' } },
          { name: 'Annie Chang', role: 'Lecturer, School of Nursing, IHM', bio: '/annie-chang/', links: { scholar: 'https://scholar.google.com/citations?hl=en&user=LUk74fgAAAAJ', linkedin: 'https://www.linkedin.com/in/annie-chang-RN-researcher' }, photo: '/images/people/annie-chang.webp', legacyPhoto: 'Annie_Yen.webp' },
          { name: 'Taranjot Kaur', role: 'Lecturer and Clinical Simulation Officer, School of Nursing, IHM', photo: '/images/people/taranjot-kaur.webp', bio: '/taranjot-kaur/' },
          { name: 'Fariba Hosseinisazi', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/fariba-hosseinisazi.webp', bio: '/fariba-hosseinisazi/' },
          { name: 'Thilaka Chandanee Geekiyanage', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/thilaka-chandanee-geekiyanage.webp' },
          { name: 'Pratitha P', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/pratitha-p.webp', links: { orcid: 'https://orcid.org/0009-0004-1863-6266', linkedin: 'https://www.linkedin.com/in/pratitha-p-679104200/' } },
          { name: 'Dr. Ilona Pappne Demecs', role: 'Lecturer, School of Nursing, IHM' },
          { name: 'Kristi Latimore', role: 'Lecturer, School of Nursing, IHM', bio: '/kristi-latimore/' },
          { name: 'Dr. Nicole S H Chen', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/nicole-s-h-chen.webp', bio: '/dr-nicole-s-h-chen/' },
          { name: 'Sweety Sanju', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/sweety-sanju.webp', bio: '/sweety-sanju/', links: { linkedin: 'https://in.linkedin.com/in/sweety-sanju-256200143' } },
          { name: 'Gethsy Jayaseelan', role: 'Lecturer, School of Nursing, IHM', photo: '/images/people/gethsy-jayaseelan.webp', bio: '/gethsy-jayaseelan/', links: { orcid: 'https://orcid.org/0000-0001-9374-7442', linkedin: 'https://www.linkedin.com/in/gethsy-jayaseelan-1290b290/' } },
          { name: 'Sandra Vellara Sunil', role: 'Clinical Simulation Officer, IHM', photo: '/images/people/sandra-vellara-sunil.webp', bio: '/sandra-vellara-sunil/' },
          { name: 'Muna Paudel', role: 'Lecturer, School of Nursing, IHM' },
          { name: 'Tha\'er Mazin Jaber Kanaan', role: 'Lecturer, School of Nursing, IHM' },
        ],
      },
      {
        title: 'School of Social Work',
        people: [
          { name: 'Prof. Abraham Francis', role: 'Head of School – Social work', photo: '/images/people/abraham-p-francis.webp', links: { orcid: 'https://orcid.org/0000-0002-4054-8332', scholar: 'https://scholar.google.com.au/citations?user=ViEz3CcAAAAJ&hl=vi' } },
          { name: 'Dr. Maria Rani Dasari', role: 'Course Coordinator', photo: '/images/people/maria-rani-dasari.webp', bio: '/maria-rani-dasari/', links: { linkedin: 'https://www.linkedin.com/in/dr-maria-rani-dasari-1b5451114', orcid: 'https://orcid.org/0009-0000-5310-5381' } },
          { name: 'Dr. Shisir Prasad Manandhar', role: 'Senior Lecturer', photo: '/images/people/shisir-prasad-manandhar.webp', bio: '/dr-shisir-prasad-manandhar/', links: { linkedin: 'https://www.linkedin.com/in/shisir-manandhar-a22a0213', orcid: 'https://orcid.org/0000-0001-8664-1383', scholar: 'https://scholar.google.com/citations?hl=en&user=GWvHSwsAAAAJ' } },
          { name: 'Dr. Abhishek Sharma', role: 'Research and Innovation Manager, IHM', photo: '/images/people/abhishek-sharma.webp', bio: '/dr-abhishek-sharma/', links: { linkedin: 'https://www.linkedin.com/in/abhisheksharma1791/', orcid: 'https://orcid.org/0000-0001-8203-7568', scholar: 'https://scholar.google.com.au/citations?user=OeJBYCsAAAAJ&hl=en' } },
          { name: 'Dr Sambath My', role: 'Lecturer', photo: '/images/people/sambath-my.webp', bio: '/dr-sambath-my/', links: { linkedin: 'https://www.linkedin.com/in/sambath-my-phd-74b43b2b/', orcid: 'https://orcid.org/0000-0003-3087-7308', scholar: 'https://scholar.google.com/citations?user=ZVRzdhoAAAAJ' } },
          { name: 'Smitha Jeena', role: 'Lecturer', bio: '/smitha-jeena/', photo: '/images/people/smitha-jeena.webp', legacyPhoto: 'smitha_jeena.png' },
          { name: 'Dr Joseph Musasizi', role: 'Lecturer, School of Social Work, IHM', bio: '/dr-joseph-musasizi/', links: { linkedin: 'https://au.linkedin.com/in/joseph-musasizi-phd-03730326', orcid: 'https://orcid.org/0000-0003-0699-3923', scholar: 'https://scholar.google.com/citations?user=ev3hruEAAAAJ&hl=en' }, photo: '/images/people/joseph-musasizi.webp', legacyPhoto: 'Musasizi.png' },
          { name: 'Congxiao Mei', role: 'Lecturer, School of Social Work, IHM', photo: '/images/people/congxiao-mei.webp', bio: '/may-congxiao-mei/' },
          { name: 'Dr Samantha Ratnam', role: 'Lecturer, School of Social Work, IHM', photo: '/images/people/samantha-ratnam.webp', legacyPhoto: 'academic-staff/samantha-ratnam.webp' },
          { name: 'Triparna Lahiri De', role: 'Lecturer, School of Social Work, IHM', bio: '/triparna-lahiri-de/', links: { linkedin: 'https://www.linkedin.com/in/triparna-lahiri-de-1745073b5' }, photo: '/images/people/triparna-lahiri-de.webp', legacyPhoto: 'academic-staff/triparna-lahiri-de.webp' },
          { name: 'Dr Zhongjie Zhang', role: 'Lecturer, School of Social Work, IHM', bio: '/dr-zhongjie-zhang/', links: { orcid: 'https://orcid.org/0000-0002-6258-9557', scholar: 'https://scholar.google.com.au/citations?user=BWPJyRgAAAAJ&hl=en' }, photo: '/images/people/zhongjie-zhang.webp', legacyPhoto: 'academic-staff/zhongjie-zhang.webp' },
          { name: 'Dr Binoy Joseph', role: 'Lecturer, School of Social Work, IHM', bio: '/dr-binoy-joseph/', photo: '/images/people/binoy-joseph.webp', legacyPhoto: 'Binoy_joseph.png' },
          { name: 'Lydia Teatao', role: 'Lecturer, School of Social Work, IHM', bio: '/lydia-teatao/', photo: '/images/people/lydia-teatao.webp', legacyPhoto: 'academic-staff/lydia-teatao.webp' },
          { name: 'Dr. Upasana Baruah', role: 'Lecturer, School of Social Work, IHM', bio: '/dr-upasana-baruah/', links: { linkedin: 'https://www.linkedin.com/in/upasana-baruah-5573a125/', orcid: 'https://orcid.org/0000-0002-5569-3970', scholar: 'https://scholar.google.com/citations?user=rt7CEMQAAAAJ&hl=en' }, photo: '/images/people/upasana-baruah.webp', legacyPhoto: 'academic-staff/upasana-baruah.webp' },
          { name: 'Dr David Lukudu', role: 'Lecturer, School of Social Work, IHM', bio: '/dr-david-lukudu/', photo: '/images/people/david-lukudu.webp', legacyPhoto: 'academic-staff/david-lukudu.webp' },
          { name: 'Ambika Achanta', role: 'Lecturer, School of Social Work, IHM', bio: '/ambika-achanta/', links: { linkedin: 'https://www.linkedin.com/in/ambika-achanta-bb571b383' }, photo: '/images/people/ambika-achanta.webp', legacyPhoto: 'academic-staff/ambika-achanta.webp' },
          { name: 'Ajanaw Alemie Desta', role: 'Lecturer, School of Social Work, IHM', bio: '/ajanaw-alemie-desta/', links: { linkedin: 'https://www.linkedin.com/in/ajanaw-alemie-desta-a6768689/', orcid: 'https://orcid.org/0000-0001-7802-7121', scholar: 'https://scholar.google.com/citations?user=7qoKwVYAAAAJ&hl=en' }, photo: '/images/people/ajanaw-alemie-desta.webp', legacyPhoto: 'academic-staff/ajanaw-alemie-desta.webp' },
          { name: 'Dr Sajal Roy', role: 'Lecturer, School of Social Work, IHM', bio: '/dr-sajal-roy/', links: { orcid: 'https://orcid.org/0000-0003-1532-9792', scholar: 'https://scholar.google.com/citations?user=8Z08_EwAAAAJ&hl=en' }, photo: '/images/people/sajal-roy.webp', legacyPhoto: 'academic-staff/sajal-roy.webp' },
        ],
      },
      {
        title: 'Centre of Excellence in Education Leadership and Academic Quality',
        people: [
          { name: 'Dr. Abhishek Sharma', role: 'Research and Innovation Manager, IHM', photo: '/images/people/abhishek-sharma.webp', bio: '/dr-abhishek-sharma/', links: { scholar: 'https://scholar.google.com.au/citations?user=OeJBYCsAAAAJ&hl=en', orcid: 'https://orcid.org/0000-0001-8203-7568', linkedin: 'https://www.linkedin.com/in/abhisheksharma1791/' } },
          { name: 'Dr. Philomina Jacob', role: 'Director of Studies', photo: '/images/people/philomina-jacob.webp', bio: '/dr-philomina-jacob/', links: { scholar: 'https://scholar.google.co.in/citations?user=LH4AYmkAAAAJ&hl=en', orcid: 'https://orcid.org/0000-0002-2727-1447' } },
          { name: 'Dr. Bindu K Abraham', role: 'Academic Quality Manager, IHM', bio: '/dr-bindu-k-abraham/', links: { scholar: 'https://scholar.google.com/citations?hl=en&user=X2FtOiQAAAAJ&user=X2FtOiQAAAAJ', orcid: 'https://orcid.org/0000-0002-5824-8274' }, photo: '/images/people/bindu-k-abraham.webp', legacyPhoto: 'bindu-abraham.webp' },
          { name: 'Dr. Sumathi P V', role: 'Academic Quality Manager, IHM', photo: '/images/people/sumathi-p-v.webp', bio: '/dr-sumathi-p-v/', links: { scholar: 'https://scholar.google.com/citations?user=uzpxtH0AAAAJ&hl=en', orcid: 'https://orcid.org/0000-0001-7711-1647', linkedin: 'https://www.linkedin.com/in/sumathi-pv-86a06762/' } },
          { name: 'Dr. Alex Pannicottu Oommen', role: 'Librarian and eResources Coordinator, IHM', photo: '/images/people/alex-pannicottu-oommen.webp', bio: '/dr-alex-oommen/', links: { orcid: 'https://orcid.org/0000-0003-1854-1705', linkedin: 'https://www.linkedin.com/in/alex-pannicottu-oommen-aalia-bb4271124' } },
        ],
      },
    ],
  },
]
