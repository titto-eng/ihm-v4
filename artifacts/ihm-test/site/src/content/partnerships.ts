// Copy for the four partnership pages: /cintana-alliance-partnership-ihm/ (WP 7445), /cintana-education-partnership-how-are-we-leveraging-global-expertise/,
// /arizona-state-university-asu-partnership/ and /collaboration-with-ramsay-healthcare/. Taken from the WordPress page content
// (.data/inventory/data/ihm/pages.json); edit here. Images live under public/images/partnerships/ (live-only ones via src/content/legacy-assets.ts).

export type Partner = { key: 'cintana' | 'asu' | 'ramsay'; name: string; href: string; logo: string; summary: string }

export const PARTNERS: Partner[] = [
  {
    key: 'cintana', name: 'Cintana Education', href: '/cintana-education-partnership-how-are-we-leveraging-global-expertise/', logo: '/images/partnerships/cintana-logo.webp',
    summary: 'Through our collaboration with Cintana Education, we access a global network of resources and expertise. This collaboration allows us to stay at the forefront of educational innovation and ensures our programs meet the highest international standards.',
  },
  {
    key: 'asu', name: 'Arizona State University', href: '/arizona-state-university-asu-partnership/', logo: '/images/partnerships/asu-logo.webp',
    summary: 'Arizona State University is the most innovative university in the United States. It has formed a pioneering collaboration with IHM to deliver a practical, future-focused education for employment to enable students to make a positive impact on our world.',
  },
  {
    key: 'ramsay', name: 'Ramsay Health Care', href: '/collaboration-with-ramsay-healthcare/', logo: '/images/partnerships/ramsay-logo.webp',
    summary: "Australia's largest private hospital operator has joined hands with IHM and ASU to support the development of a highly skilled workforce, which is essential for delivering high-quality, safe, and effective clinical care for our patients.",
  },
]

/** /cintana-alliance-partnership-ihm/ */
export const ALLIANCE = {
  title: 'Cintana Education Strategic Collaboration',
  tagline: 'Education for Employment: Bridging the Gap Globally',
  introTitle: 'Transforming Healthcare Education: Introducing Our Revolutionary Partnership',
  leverageTitle: 'Cintana Education Partnership: How Are We Leveraging Global Expertise?',
  leverage: [
    'The strategic partnership between the Institute of Health & Management (IHM), Ramsay Health Care Group, and Arizona State University (ASU) is set to transform healthcare education worldwide.',
    'This collaboration unites the extensive knowledge and expertise of industry leaders from different continents, ensuring a modern and innovative approach to healthcare education. Students and professionals enrolled in this program will benefit from a well-rounded curriculum that addresses the evolving needs of the healthcare sector, establishing new benchmarks in education and training.',
  ],
  pillars: [
    { title: 'Vision', body: "To be ranked No.1 in Health Science Education in Australia's TVET sector." },
    { title: 'Mission', body: "Empowering tomorrow's healthcare leaders, our mission intertwines academia and industry through strategic collaboration, together we elevate healthcare education standards globally." },
    { title: 'Excellence in healthcare', body: 'Our strategy is centered on enhancing academic excellence by implementing innovative practices such as advanced teaching techniques and expanding program options in collaboration with our partners.' },
  ],
  futureTitle: 'Be Part of Our Future',
  future: [
    "This is more than a partnership: it's a movement towards creating a healthier world through education. We invite students, healthcare professionals, and industry partners to join us as we build this exciting future.",
    'Stay connected with us for ongoing updates and developments in our programs and initiatives.',
    'Discover how we are not just anticipating the future of healthcare education - but actively creating it.',
  ],
  leaders: [
    { name: 'Dr. Kunnumpurath Bijo', role: 'Group CEO & Managing Director', image: '/images/people/bijo-kunnumpurath.webp' },
    { name: 'Pankaj Patel', role: 'Chief Finance Officer', image: '/images/people/pankaj-patel.webp' },
    { name: 'Simon Schweigert', role: 'Chief Operations Officer, IHM', image: '/images/people/simon-schweigert.webp' },
    { name: 'Christopher Thomas Hill', role: 'Executive Director', image: '/images/people/christopher-thomas-hill.webp' },
    { name: 'Thomas Korah', role: 'Chief Of Staff, Sr. Director Strategic Initiatives, Cintana', image: '/images/people/thomas-korah.webp' },
    { name: 'Scott Luckett', role: 'Senior Advisor', image: '/images/people/scott-luckett.webp' },
    { name: 'Geons Jose', role: 'Director of Operations IHM Australia & Head of Marketing and Sales', image: '/images/people/geons-jose.webp' },
    { name: 'Dr Prerna Khawas', role: 'Director of Quality Management', image: '/images/people/prerna-khawas.webp' },
    { name: 'Sabarish Babu', role: 'Head of Digital Transformation', image: '/images/people/sabarish-babu.webp' },
    { name: 'Jimmy Jacob', role: 'Head of People & Culture', image: '/images/people/jimmy-jacob.webp' },
    { name: 'Nayana Babu Sreelatha', role: 'Project Manager', image: '' },
  ],
  contact: {
    address: 'Level 2/187 Boundary Rd, North Melbourne VIC 3051',
    phone: { t: '(03) 9450 5111', href: 'tel:+61394505111' },
    email: { t: 'partner@hci.edu.au', href: 'mailto:partner@hci.edu.au' },
  },
  closing: 'Join us at the vanguard of healthcare education and innovation. Together, let us collaborate in shaping the future of healthcare!',
}

/** /cintana-education-partnership-how-are-we-leveraging-global-expertise/ */
export const CINTANA = {
  title: 'Cintana Education Partnership: How Are We Leveraging Global Expertise?',
  about: 'Cintana Education enables universities around the world to increase quality and scale in order to provide more students with the education they need and deserve. We provide world class expertise and access to our own proprietary resources as well as those of Arizona State University, a top-ranked university that shares our vision of expanding access through growth and innovation. Together, we are building the Cintana Alliance, an international network of universities that will work together to meet the rising global demand for high quality post-secondary education.',
  highlights: [
    { title: 'Being Part of the ASU-Cintana Alliance', body: 'The ASU-Cintana Alliance is an international network of innovative and forward-looking universities working together to bring the best of higher education to each of its students. Members of the ASU-Cintana Alliance will share best practices across regions and fields of study, offer exchange opportunities for students and faculty, provide dual-degree programs with other members, and benefit from the scale of a global community of member institutions. Over time, our Alliance and its members will be a vital part of the global dialogue about the role and future of higher education.' },
    { title: 'Learning beyond the classroom', body: 'IHNA students have the exciting opportunity to connect and engage with students from all around the world. Through various initiatives like the Global Classroom, Global Competition, Summer Experience, and joint research opportunities, our students can exchange thoughts and ideas, while creating lasting friendships and building a global network.' },
    { title: "Faculty and Students' Mobility", body: 'With more than 20 universities in the fast-growing alliance network, faculty members and students can look forward to a diverse and international learning experience through the student exchange, and faculty mobility program in the future.' },
  ],
  faq: [
    { q: 'How does Cintana Education enhance our educational offerings?', a: "By partnering with Cintana Education, we gain access to a global network of resources and expertise. This partnership allows us to integrate innovative teaching methods and international best practices from leading universities, particularly in the United States, ensuring our programs are at the forefront of educational innovation. With Cintana Education's support, we develop cutting-edge curricula aligned with industry demands, enabling our graduates to compete globally. This collaboration facilitates the offering of dual degree programs, where students can earn degrees from IHM and partner institutions like Arizona State University (ASU), providing a comprehensive education combining theoretical knowledge and practical skills." },
    { q: 'What benefits do students and faculty receive?', a: 'Students and faculty members at IHM greatly benefit from our collaboration with Cintana Education. Students gain access to international exchange programs, internships, and collaborative projects, broadening their academic and professional horizons and enhancing their employability. These opportunities allow students to experience different healthcare systems, learn from diverse perspectives, and build a global network of peers and professionals. Faculty members have opportunities to collaborate on research projects, participate in exchange programs, and attend professional development workshops with counterparts at ASU. These interactions foster a culture of continuous learning and improvement, ensuring that our educators remain at the forefront of their fields and can deliver the highest quality education to our students. The partnership also supports faculty pursuing innovative research and contributing to healthcare education and practice advancements.' },
    { q: 'How does this partnership align with our strategic vision?', a: "This collaboration is pivotal in our mission of becoming a globally recognised university college specialising in health and wellness by 2030. By integrating Cintana Education's resources, we aim to elevate our education standards, enhance our reputation, and improve our global rankings. We are committed to providing our students with the best possible education and preparing them to become leaders in the healthcare industry. The partnership supports our strategic goals of expanding our academic offerings, fostering international collaborations, and enhancing our research capabilities. As we continue to grow and evolve, our alliance with Cintana Education ensures that we remain at the forefront of educational excellence and innovation." },
  ],
  photos: [
    { src: '/images/partnerships/cintana-1.webp', alt: 'Cintana Alliance event group photo' },
    { src: '/images/partnerships/cintana-2.webp', alt: 'Cintana Alliance event' },
    { src: '/images/partnerships/cintana-3.webp', alt: 'Cintana partners group photo' },
  ],
}

/** /arizona-state-university-asu-partnership/ */
export const ASU = {
  title: 'Arizona State University (ASU) Partnership: What Global Learning Opportunities Await?',
  intro: "Our collaboration with Arizona State University (ASU) opens a wealth of global learning opportunities for our students. This partnership allows students to study abroad at ASU campuses in Phoenix, Washington D.C., or Los Angeles, providing them with a diverse and enriching educational experience. ASU's recognition as the most innovative university in the U.S. ensures that our students benefit from cutting-edge educational models and research excellence. The opportunity to study at ASU not only broadens students' perspectives but also allows them to immerse themselves in different cultures and gain a global network of peers and professionals, enhancing their academic journey and personal growth.",
  campuses: ['Phoenix', 'Washington D.C.', 'Los Angeles'],
  rankings: [
    { src: '/images/partnerships/asu-ranking-1.webp', alt: 'ASU ranking poster 1' },
    { src: '/images/partnerships/asu-ranking-2.webp', alt: 'ASU ranking poster 2' },
    { src: '/images/partnerships/asu-ranking-3.webp', alt: 'ASU ranking poster 3' },
    { src: '/images/partnerships/asu-ranking-4.webp', alt: 'ASU ranking poster 4' },
  ],
  video: { id: '6V83dIgshrY', title: 'Judy Karshmer on Pioneering Partnership: HCI, ASU, and Ramsay Health Care' },
  sections: [
    { title: 'What unique programs are available through this partnership?', image: { src: '/images/partnerships/cintana-launch-day.webp', alt: 'Cintana launch day' }, body: 'Through this collaboration, students can participate in coordinated programmes that offer a unique blend of academic excellence and practical experience, making our graduates highly competitive in the global job market. These programmes are designed to provide comprehensive education, combining the strengths of both institutions and offering students a diverse range of courses and experiences. Additionally, ASU’s extensive online curriculum accelerates our digital learning capabilities, making high-quality education more accessible to our students. This flexibility allows students to balance their studies with other commitments and continue their education from anywhere in the world, ensuring they receive a well-rounded and robust education.' },
    { title: 'How do faculty benefit from this collaboration?', image: { src: '/images/partnerships/faculty-benefits.webp', alt: 'Faculty collaborating' }, body: "Faculty members have significant opportunities to collaborate with ASU's renowned academics on research projects, enhancing their professional growth and contributing to groundbreaking research. These collaborations foster innovation and drive advancements in healthcare education, allowing faculty to stay at the forefront of their fields. Faculty can also participate in professional development programs, enhancing their teaching skills and staying updated on the latest educational trends and practices. This continuous professional growth ensures that our educators can provide the highest quality education to our students, incorporating the latest research findings and innovative teaching methods into their instruction." },
  ],
}

/** /collaboration-with-ramsay-healthcare/ */
export const RAMSAY = {
  title: 'Collaboration with Ramsay Healthcare',
  sections: [
    { title: 'How does this partnership align with our strategic goals?', image: { src: '/images/partnerships/ramsay-1.webp', alt: 'IHM and Ramsay Health Care partnership' }, body: "This collaboration supports our mission to produce highly skilled healthcare professionals ready to meet the demands of the global healthcare industry, as HCI is now Ramsay's a valued partner. By integrating Ramsay Health Care's expertise, we aim to elevate the quality of our healthcare education and improve patient outcomes. Our graduates are equipped with the knowledge and skills needed to excel in their careers and positively impact the healthcare industry. The partnership aligns with our strategic goals of enhancing academic programs, fostering industry collaborations, and improving global rankings. As we continue to grow and evolve, our alliance with Ramsay Health Care ensures that we remain at the forefront of healthcare education and practice, providing our students with the best possible education and training." },
    { title: "What does being Ramsay's valued partner mean for us?", image: { src: '/images/partnerships/stock-partnership.webp', alt: 'Healthcare professionals in partnership' }, body: "As Ramsay Health Care's valued partner, we enjoy a privileged position that strengthens our collaboration and enhances the opportunities available to our students and faculty. This status reflects our shared commitment to excellence in healthcare education and underscores the value of our partnership. Being the valued partner means we can access exclusive resources, support, and opportunities unavailable to other institutions. This enhances our ability to provide high-quality education and training to our students and supports our mission to produce highly skilled healthcare professionals who are ready to meet the demands of the global healthcare industry." },
  ],
  valuesTitle: "Alignment with Ramsay's Purpose and Values",
  values: "Ramsay Health Care's purpose and values, encapsulated in “The Ramsay Way,” focus on strong relationships, continuous improvement, and sustainable growth. This aligns seamlessly with HCI's mission of 'Education for Employment,' which emphasises providing students with the skills and knowledge they need to be successful in the workforce. Both organizations prioritise caring for people, maintaining high standards of patient care, and achieving long-term success over short-term gains. This shared commitment ensures that our collaboration is built on a solid foundation of mutual respect and a dedication to advancing healthcare education and practice.",
  valueTags: ['Strong relationships', 'Continuous improvement', 'Sustainable growth'],
}
