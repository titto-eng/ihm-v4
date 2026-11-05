// The IHM Library pages (/library/ and its six children), from the WordPress pages 377–409 (template-library-pages.php). The
// catalogue is HCI's Primo (library.hci.edu.au); the search box builds the same query the old [LibrarySearchForm] did.
// Thumbnails are public/images/library/ (theme images/*.jpg). Course reading lists are in src/content/library-guides.ts.

export const PRIMO = {
  action: 'https://library.hci.edu.au/discovery/search',
  vid: '61IOHAM_INST:61IOHAM',
  home: 'https://library.hci.edu.au/discovery/search?vid=61IOHAM_INST:61IOHAM',
}

export const LIBRARY_NAV = [
  { href: '/library/', label: 'Library home' },
  { href: '/library/bibliography/', label: 'Library guides' },
  { href: '/library/referencing/', label: 'Referencing' },
  { href: '/library/assessment-guide/', label: 'Assessment guide' },
  { href: '/library/search-tips/', label: 'Search tips' },
  { href: '/library/copyright/', label: 'Copyright' },
]

export const LIBRARY_SERVICES = [
  { title: 'Library Guides', body: 'Search for books, eBooks, journals, eJournals and audio-visual materials, with reading lists for each course.', href: '/library/bibliography/', image: '/images/library/bibliography.webp' },
  { title: 'Academic Integrity', body: 'Academic integrity is the expectation that teachers, students, researchers and all members of the academic community act with honesty, trust, fairness, respect and responsibility.', href: '/academic-integrity/', image: '/images/library/academic-integrity.webp' },
  { title: 'Copyright', body: 'IHM is committed to ensuring compliance to copyright legislation in all areas of the teaching and learning which relate to third party copyright materials.', href: '/library/copyright/', image: '/images/library/copyright.webp' },
  { title: 'Referencing', body: 'All higher education courses at the Institute of Health & Management (IHM) require the use of the APA 7th referencing and formatting style.', href: '/library/referencing/', image: '/images/library/referencing.webp' },
  { title: 'Assessment Guide', body: 'Assessment guide is the major component of IHM postgraduate courses: essays, discussion papers, literature reviews, appraisals, reports and reflective journals.', href: '/library/assessment-guide/', image: '/images/library/assessment-guide.webp' },
  { title: 'Search Tips', body: 'Improve your searches. Refine your search if you find too many or not enough results.', href: '/library/search-tips/', image: '/images/library/search-tips.webp' },
  { title: 'Grammarly', body: 'Grammarly is a digital writing tool that offers grammar and spell checking, plagiarism detection and suggestions about clarity and style.', href: '/grammarly/', image: '/images/library/grammarly.webp' },
  { title: 'EndNote', body: 'EndNote 21 speeds up your research process, allowing you to focus on your research and less on formatting.', href: '/end-note/', image: '/images/library/end-note.webp' },
  { title: 'Academic & Language Support Services', body: 'Empowering every student for success and growth! Book a one-to-one academic and language support session.', href: 'https://outlook.office365.com/owa/calendar/AcademicLanguageSupport@hcig.onmicrosoft.com/bookings/?skipRedirect=1', image: '/images/library/academic-language-support.webp', fallback: '/images/library/referencing.webp' },
]

export const LIBRARY_REQUEST = 'https://forms.monday.com/forms/c71ef8156926ca9c06558c291da3d1d6?r=use1'

export type LibraryVideo = { id: string; title: string }

/** "Digital Resources" on /library/ (titles from the YouTube videos). */
export const LIBRARY_VIDEOS: LibraryVideo[] = [
  { id: 'S4uYcX_ZY6k', title: 'Understanding Review Types in Research' },
  { id: 'SzLmDB8Qz-k', title: 'Appraising the Literature: Systematic Reviews' },
  { id: 'anTjuWtBCU0', title: 'Support Section Booking' },
  { id: '4ik10FPAGMI', title: 'Covidence Extraction 1 tool' },
  { id: '-upvTrTww3g', title: 'Office 365 set ups' },
  { id: '1rVObD0TpIY', title: 'Covidence' },
  { id: 'QyRhiLcS5z4', title: 'EBSCO AI Tools: A Practical Introduction' },
  { id: 'DVNmR0RaMBI', title: 'EBSCO Advanced search tips in 15 mins' },
  { id: 'Z2IesAZNdZ8', title: 'Library and EndNote, Part 01' },
  { id: '7gblfrN0uoY', title: 'Library and EndNote, Part 02' },
  { id: 'gGBM_ePcIDk', title: 'MEDLINE advanced search' },
  { id: 'dUMgtmp3hO8', title: 'How to do a Literature Review' },
]

/** "Digital Resources" on /library/referencing/. */
export const REFERENCING_VIDEOS: LibraryVideo[] = [
  { id: 'gUT0HM_h7Ac', title: 'Academic SCRUM: Academic Integrity' },
  { id: 'vXJcauqIhYI', title: 'Academic SCRUM: APA Referencing' },
  { id: '7kKo8weU6N8', title: 'Business SCRUM: Introduction to Canvas' },
  { id: 'MrR2meeC4sc', title: 'HCI SCRUM: Library for Web 3.0' },
  { id: '8S_6bAlFCO8', title: 'Academic SCRUM: Student Support Services' },
]

export const SEARCH_TIPS = [
  {
    title: 'Combination Words', example: 'nursing AND dementia',
    body: ['AND, OR and NOT: combinations of keywords to find more relevant information.', 'They are specific words used to combine keywords to improve the chances of finding relevant information. The most used are AND, OR and NOT.'],
  },
  {
    title: 'Omitting Words', example: 'diabetes NOT gestational',
    body: ['To exclude words or phrases from your search results, type NOT before the word or phrase you want to exclude.'],
    tip: 'Always type OR, AND, NOT in upper case. Otherwise, LibrarySearch will treat them as keywords.',
  },
  {
    title: 'Grouping Words', example: 'Shakespeare (Drama OR Poem)',
    body: ['Use parentheses () to group the words you are searching.', 'For example: Shakespeare (Drama OR Poem).'],
    tip: "With the parentheses, LibrarySearch results contain 'Shakespeare' and 'Drama', or 'Shakespeare' and 'Poem'. Without the parentheses this search will not work properly.",
  },
  {
    title: 'Wildcards', example: 'Nurs*',
    body: ['Wildcards are single characters that allow you to expand your search, using special characters like * and ?.', 'Insert an asterisk (*) wildcard to replace multiple characters in a word. For example: Nurs* finds nurse, nurses, nursing.'],
  },
]

export const COPYRIGHT = {
  intro: [
    'IHM is committed to ensuring compliance to copyright legislation in all areas of the teaching and learning which relate to third party copyright materials. The purpose of this policy is to promote copyright compliance in both the academic and non-academic activities of the institution by ensuring that all students and staff are made aware of their obligations when using copyrighted materials in any format whether by copying, reproducing, communicating, recording, or performing.',
    'It assists IHM students and staff to make full legal use of the materials at their disposal and limits any risk to the institution associated with the use of copyrighted materials. This policy applies to all students and staff at IHM campuses and relates to all IHM approved or sponsored activities.',
  ],
  definitions: [
    { term: 'The Act', body: 'The Copyright Act 1968 shall, for the purposes of this document, be referred to as the Act.' },
    { term: 'First party copyright materials', body: 'Materials created by IHM staff as part of their employment in which copyright has not been transferred or exclusively licensed to a third party.' },
    { term: 'Third party copyright materials', body: 'Both licensed and unlicensed third party copyright material. Licensed third party copyright material is any copyright protected material for which the terms of use are governed by a licence or other form of agreement. Unlicensed third party copyright material is any copyright material not governed by an agreement between the copyright owner and the user. This includes material copied in reliance upon Part VA or VB of the Copyright Act 1968.' },
  ],
  sections: [
    { title: 'Moral Rights', body: ['Whenever another person’s intellectual property is used, users must also ensure that they comply with moral rights legislation that is also part of the Copyright Act. This means that the author must be correctly acknowledged, and the work should not be treated in any way which would harm the reputation of its creator.'] },
    {
      title: 'Fair Dealing',
      body: [
        'Students can reproduce copyright materials without permission provided that the dealing is for research or study and that the copying is fair. Fair dealing applies to work copied by an individual for their own use, but not to copying materials for others.',
        'Section 40 of the Act deems fair to mean an article in a periodical publication, more than one article in the same edition of a periodical if on the same subject matter, or a reasonable portion, which is 10% or one chapter if the work is a published edition of 10 pages or more. In the case of electronic materials, 10% of the number of words may be reproduced or communicated for educational purposes under Part VB of the Act. For materials on the internet the same rules apply. It should not be assumed that all materials on the internet are freely available: check whether materials are copyright or public domain.',
        'In general, for literary, dramatic and musical works copyright ends 70 years after the death of the creator. For published sound recordings and films copyright ends 70 years after publication of the work. For artistic works copyright lasts for the life of the artist plus 70 years.',
      ],
    },
    {
      title: 'Compliance Responsibilities',
      body: ['It is the responsibility of all students and staff to make themselves aware of their obligations in relation to copyright by reading the handouts on copyright supplied at orientation and the accompanying information on IHM’s copyright webpage, attending copyright information and training sessions, and consulting the Copyright Officer when in doubt as to their copyright responsibilities.', 'Students are entirely responsible for any copyright infringement resulting from their actions. Faculty are responsible for the copyright compliance of all third party copyright materials supplied to students enrolled in their courses.'],
    },
    { title: 'Reproduction to assist people with disabilities', body: ['Sections 135ZN–ZT of the Act allow for the reproduction of certain materials for people with sight and intellectual disabilities.'] },
    {
      title: 'Online course materials',
      body: [
        'All third party copyright materials, print or digital, which staff provide for students to access via Canvas must be lodged with the Copyright Officer and uploaded through the e-reserve program, which monitors copyright compliance.',
        'Any materials that are transmitted in any other electronic format, including emails, by or on behalf of lecturers, should also be accompanied by the appropriate copyright notice. See the IHM Copyright Officer or copyright webpages for the correct wording.',
        'Student material is generally protected by copyright. Lecturers wishing to use a student’s work must ensure that they keep adequate documentary proof that they have the student’s permission.',
        'Education licensing cannot be relied upon for non-academic activities such as social activities, community outreach, fundraising, religious and cultural programs. Staff and students should check with the Copyright Officer on their campus to ensure their activity is covered by the current IHM licensing agreements.',
        'The libraries on each campus hold several books published by the Australian Copyright Council that will assist in the understanding and implementation of Australian copyright law.',
      ],
    },
  ],
  websites: [
    { label: 'Australian Copyright Council', href: 'http://www.copyright.org.au/', text: 'www.copyright.org.au' },
    { label: 'Australian Digital Alliance', href: 'http://www.digital.org.au/', text: 'www.digital.org.au' },
    { label: 'CAL – Copyright Agency Limited', href: 'http://www.copyright.com.au/', text: 'www.copyright.com.au' },
    { label: 'Copyright Act 1968', href: 'http://www.comlaw.gov.au/series/C2004A07378', text: 'Read the Act' },
  ],
  closing: 'Any non-complying activities will be brought to the attention of those responsible. Failure to take appropriate action will be brought to the attention of the copyright committee and may result in disciplinary action.',
}
