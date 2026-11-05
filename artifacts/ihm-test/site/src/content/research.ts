// Copy for the research pages: /research-innovation/ (Low-Risk Human Research Ethics Panel), /research-initiatives-global-collaborations/,
// /research-centres/, /research-strategy-ihm/ and /research-allied-health-research-centre/. Taken from the WordPress page content
// (.data/inventory/data/ihm/pages.json); edit here. Blocks render with src/components/page-kit/Kit.tsx.
import type { KitBlock } from '@/components/page-kit/Kit'

export const RESEARCH_NAV = [
  { href: '/research-innovation/', label: 'Research ethics & integrity' },
  { href: '/research-strategy-ihm/', label: 'Research strategy' },
  { href: '/research-centres/', label: 'Research centres' },
  { href: '/research-initiatives-global-collaborations/', label: 'Initiatives & collaborations' },
  { href: '/research-allied-health-research-centre/', label: 'Allied Health Research Centre' },
] as const

export const ETHICS_EMAIL = 'researchethics@ihm.edu.au'

export type Person = { name: string; role: string; image: string; bio?: string }

/** /research-innovation/ */
export const ETHICS = {
  title: 'Research Ethics and Integrity',
  panel: 'Low-Risk Human Research Ethics Panel (LR-HREP)',
  overview: [
    { p: 'The Institute of Health & Management (IHM) is committed to advancing knowledge, improving professional practice, and strengthening community outcomes through impactful, ethically sound research. Our Research & Innovation division supports staff, students, and partners to engage in high-quality scholarship across nursing, health, education, and management disciplines.' },
    { p: 'Guided by the [National Statement on Ethical Conduct in Human Research (2025)](https://www.nhmrc.gov.au/about-us/publications/national-statement-ethical-conduct-human-research-2025) and the Australian Code for the Responsible Conduct of Research, IHM provides structured pathways for research development, ethics review, researcher capability building, and collaboration. This includes the newly established Low-Risk Human Research Ethics Panel (LR-HREP), created to enable efficient and proportionate review of low- and negligible-risk projects.' },
    { p: 'Through research partnerships, practitioner-led inquiry, student research, and evidence-informed innovation, IHM fosters a culture of curiosity, critical thinking, and continuous improvement, helping transform ideas into meaningful contributions to the health and education sectors.' },
    { p: 'The LR-HREP reviews human research activities conducted within IHM that are of low or negligible/minimal risk to participants.' },
  ] as KitBlock[],
  purposeIntro: 'IHM Research & Innovation is designed to serve as a comprehensive and authoritative resource for understanding low-risk and negligible-risk human research at IHM Australia. Its purpose is to:',
  purpose: [
    { t: 'Clarify definitions and scope', b: 'Clarify key definitions and scope by clearly outlining what constitutes low-risk and negligible-risk human research within IHM, ensuring researchers understand the level of risk associated with different forms of inquiry.' },
    { t: 'Guide staff and students', b: 'Guide academic staff and students in determining whether their proposed projects, such as capstone studies, interviews, surveys, or small-scale investigations, may be eligible for review through the Low-Risk Human Research Ethics Panel (LR-HREP), in line with institutional procedures and the National Statement on Ethical Conduct in Human Research.' },
    { t: 'Explain the review pathway', b: 'Explain the LR-HREP review pathway, including the required processes, assessment criteria, documentation, and approval steps, to support efficient and proportionate ethics review for lower-risk projects.' },
    { t: 'Strengthen ethical decisions', b: 'Strengthen ethical decision-making by providing accessible, accurate, and practice-focused information that aligns with national ethical standards and IHM’s governance requirements.' },
    { t: 'Support internal research', b: 'Stimulate and support internal research activity, particularly student-led and practitioner-led projects that foster scholarly growth and may evolve into publishable research.' },
  ],
  governance: [
    'The Research Governance function at the **Institute of Health and Management (IHM Australia)** provides institutional oversight and coordination of research activity to ensure the highest standards of ethics, integrity, and quality. The team is responsible for coordinating research ethics processes, overseeing the implementation of the Australian Code for the Responsible Conduct of Research, and supporting responsible research practice across the Institute.',
    'The Low-Risk Human Research Ethics Panel (LR-HREP) at the **Institute of Health and Management (IHM Australia)** is established under the direct supervision of the Academic Board and operates in accordance with the rules and principles set out in the National Statement on Ethical Conduct in Human Research 2025 (National Statement 2025). The LR-HREP provides a proportionate and efficient ethics review pathway for low-risk and negligible-risk human research while ensuring full compliance with national standards and institutional governance requirements.',
    'In addition, the Research Governance team at the **Institute of Health and Management (IHM Australia)** offers advice and practical guidance to staff and students on understanding and applying the principles of low-risk and negligible-risk human research. This includes support in determining appropriate risk classification, identifying suitable ethics review pathways, and navigating LR-HREP processes in line with institutional guidelines and national requirements.',
  ],
  governanceTeam: [
    { name: 'Dr. Balasankar Ganesan', role: 'Academic Dean (Interim) & Associate Dean (Academic & Research), IHM', image: '/images/people/balasankar-ganesan.webp', bio: '/dr-balasankar-ganesan/' },
    { name: 'Dr. Abhishek Sharma', role: 'Research and Innovation Manager, IHM', image: '/images/people/abhishek-sharma.webp', bio: '/dr-abhishek-sharma/' },
    { name: 'Dr. Rifai Chai', role: 'Academic Director (Partnerships) and Associate Professor in Biomedical Engineering, Swinburne University', image: '/images/people/rifai-chai.webp' },
  ] as Person[],
  ria: [
    'Research Integrity Advisors (RIAs) at IHM play a central role in promoting a culture of responsible, ethical, and high-quality research across the Institute. They provide confidential, independent guidance to staff and students on matters relating to responsible research conduct, research integrity, and the ethical design and conduct of low-risk research.',
  ],
  riaAdviceIntro: 'RIAs can assist researchers by offering informed advice on:',
  riaAdvice: [
    'Applying the principles of responsible research and the Australian Code for the Responsible Conduct of Research (2018).',
    'Designing ethically robust research projects, including those classified as low-risk or negligible-risk under IHM’s guidelines.',
    'Good practices, strategies, and processes to prevent integrity concerns, disputes, or misunderstandings before they arise.',
    'Whether a particular situation may constitute a breach of research integrity or research misconduct, and what steps to take.',
    'Navigating IHM’s ethics review structures, including the Low-Risk Human Research Ethics Panel (LR-HREP) and institutional integrity arrangements.',
  ],
  riaAfter: [
    'Importantly, RIAs do not review, assess, or investigate alleged breaches of the Australian Code or IHM policies. Their role is advisory, not investigative. This ensures that researchers have access to impartial, supportive guidance without triggering formal processes prematurely.',
    'RIAs also contribute to strengthening research culture at IHM by supporting the development of policies, procedures, resources, and training programs related to research integrity. This aligns with IHM’s broader commitment to ensuring staff and students understand their responsibilities and receive appropriate training and support, as outlined in **Section 2.8 of the Guideline on Low-Risk Research**, which identifies the Research Ethics and Integrity Officer and the Research & Innovation Manager as key roles in guiding responsible research practice and ethics education.',
  ],
  riaTeam: [
    { name: 'Dr. Abhishek Sharma', role: 'Research and Innovation Manager, IHM', image: '/images/people/abhishek-sharma.webp', bio: '/dr-abhishek-sharma/' },
  ] as Person[],

  guidelinesIntro: 'Everything you need to know about applying for low-risk human research ethics approval at IHM.',
  whoMustApply: {
    lead: 'You must obtain LR-HREP approval before commencing any IHM research project that:',
    items: ['Involves human participants, their data or biospecimens', 'Is profiled as low or negligible/minimal risk', 'Is conducted by IHM staff, students or affiliates, or uses IHM data, facilities or branding'],
  },
  suitableIntro: 'Examples of projects appropriate for LR-HREP (provided risk does not exceed discomfort) include:',
  suitable: [
    { t: 'Data Collection and Use', items: ['Anonymous or non-identifiable surveys with non-sensitive questions', 'Online questionnaires via generic/public links (e.g. social media)', 'Focus groups or interviews that avoid highly sensitive topics and where accidental disclosure will not cause serious harm', 'Creation or use of data registries using non-identifiable data from existing datasets where data-owner permission is not required'] },
    { t: 'Use of Existing Biospecimens', items: ['Specimens collected under broad/unspecified consent', 'No risks beyond minor discomfort; specimens non-identifiable to researchers', 'No individual or family health-related findings generated'] },
    { t: 'Minimal or Non-Invasive Procedures', items: ['Activities such as reading, watching videos, playing online games, solving puzzles, or simple cognitive tasks', 'No physical or medical interventions'] },
    { t: 'Desk-Based Work', items: ['Literature reviews, document analyses or qualitative syntheses that do not use personal information and do not breach copyright or intellectual property laws'] },
  ],
  notSuitableWarning: 'Important: Some research must be reviewed by a full HREC, even if you believe the risk is low.',
  notSuitableIntro: 'These include projects involving:',
  notSuitable: [
    { t: 'Consent and Data Issues', items: ['Waiver of consent or the use of identifiable health information without consent', 'Unconsented biospecimens or use beyond the original consent scope', 'Genomic research or sharing of genomic data beyond original consent'] },
    { t: 'Biospecimens and Advanced Procedures', items: ['Derivation of products from human embryos or biobanking activities', 'Export of biospecimens or use of specimens that may yield significant health findings', 'Xenotransplantation'] },
    { t: 'Vulnerable or Higher-Risk Populations', items: ['Pregnant women and fetuses', 'People highly dependent on medical care (e.g. hospitalised or involuntary patients)', 'Individuals with cognitive impairment, intellectual disability or certain mental illnesses', 'Participants where research may expose illegal activity (unless fully de-identified data is used)', 'Aboriginal and Torres Strait Islander Peoples, where culturally appropriate engagement and HREC oversight are required'] },
  ],
  needGuidance: 'Need guidance? If your project falls into any of the above categories, you must apply to an external HREC. The Research and Innovation team can advise on suitable HRECs.',
  steps: [
    { t: 'Classify your project', blocks: [{ p: 'Review the Guideline on Low-Risk Research and use the decision-tree / governance chart to classify your project.' }] },
    { t: 'Discuss with Your Supervisor / Line Manager', blocks: [{ p: "Confirm the project's feasibility, supervision arrangements and resource needs." }] },
    { t: 'Prepare Application Documents', blocks: [{ ul: ['Application Form for Ethics Approval for Low-Risk Human Research', 'Research protocol / project plan', 'Participant Information Sheet (PIS)', 'Consent Form template(s)', 'Data management and privacy plan', 'Any instruments (e.g. survey, interview guide, recruitment materials)'] }] },
    { t: 'Submit to LR-HREP', blocks: [{ p: 'Send the completed application and all supporting documents to [researchethics@ihm.edu.au](mailto:researchethics@ihm.edu.au) by the advertised cut-off dates.' }] },
    { t: 'Ethics Review and Outcome', blocks: [{ ul: ['The LR-HREP will review your application in line with IHM procedures and the National Statement.', 'Outcomes may include approval, conditional approval (requiring amendments), request for further information, or referral to an external HREC.'] }] },
    { t: 'After Approval', blocks: [{ p: 'Conduct the project in accordance with the approved protocol. Submit progress/completion reports and notify LR-HREP of any:' }, { ul: ['Amendments to the protocol', 'Adverse events or unexpected issues', 'Early termination of the project'] }] },
  ] as { t: string; blocks: KitBlock[] }[],
  outcome: '**Outcome Notification:** Applicants will typically receive an outcome (approved, approved with conditions, request for amendment, or not approved) within 4-6 weeks of the submission deadline.',

  datesIntro: 'The Low-Risk Human Research Ethics Panel (LR-HREP) meets quarterly to review submissions for low-risk and negligible-risk human research. Researchers must submit completed applications, including all supporting documents, by the deadlines listed below to ensure consideration in the corresponding review cycle.',
  deadlinesTitle: '2026 Submission Deadlines (Quarterly)',
  deadlinesNote: 'Please note that following the Cycle Meeting, the IHM Low-Risk Human Research Ethics Panel (LR-HREP) will require approximately 3-4 weeks to reach and communicate a decision on submitted applications.',
  /** ISO dates drive the "next deadline" highlight. */
  deadlines: [
    { quarter: 'Quarter 1, 2026', date: '2026-01-01', label: '1 January 2026' },
    { quarter: 'Quarter 2, 2026', date: '2026-04-01', label: '1 April 2026' },
    { quarter: 'Quarter 3, 2026', date: '2026-07-01', label: '1 July 2026' },
    { quarter: 'Quarter 4, 2026', date: '2026-10-01', label: '1 October 2026' },
  ],
  requestDate: 'If your project requires review outside the scheduled quarterly rounds, you may request a specific review date. Requests will be assessed based on panel availability and the nature of the project.',

  policiesIntro: 'Our Policies and Procedures ensure consistent, safe, and compliant operations. They provide clear guidance for staff responsibilities and support best practices across the organisation.',
  policies: [
    { t: 'Procedure Low-Risk Human Research Ethics', href: '/pdf/risk-research/Procedure-Low-Risk-Human-Research-Ethics.pdf' },
    { t: 'Guideline on Low-Risk Research', href: '/pdf/risk-research/Guideline-on-Low-Risk-Research.pdf' },
  ],
  formsIntro: 'Access all the documents, templates, and resources you need for low-risk human research ethics applications.',
  forms: [
    { t: 'Participant Information Sheet (PIS) and Participant Consent Form (PCF) Checklist', href: '/pdf/risk-research/PIS-and-PCF-Checklist.pdf' },
    { t: 'Low-Risk Research Ethics Application Checklist', href: '/pdf/risk-research/Low-Risk-Research-Ethics-Application-Checklist.pdf' },
    { t: 'Application Form for Low-Risk Research Ethics Approval', href: '/pdf/risk-research/Low-Risk-Research-Ethics-Approval-Form.pdf' },
    { t: 'Low-Risk Human Research Ethics Procedure', href: '/pdf/risk-research/Procedure-Low-Risk-Human-Research-Ethics.pdf' },
    { t: 'Low-Risk Human Research Ethics Panel (LR-HREP)', href: '/pdf/risk-research/Low-Risk-Human-Research-Ethics-Panel.pdf' },
    { t: 'Risk Assessment for IHM Low-Risk Human Research Ethics Panel (LR-HREP)', href: '/pdf/risk-research/Risk-assessment-for-LR-HREP.pdf' },
  ],
  faqIntro: 'Find answers to common questions about low-risk human research ethics at IHM.',
  faq: [
    { title: 'What is considered low-risk human research at IHM?', blocks: [{ p: 'Low-risk research involves only foreseeable discomfort (physical, psychological, social, or cultural) but no risk of harm. Examples include brief surveys or routine measures like blood pressure checks.' }] },
    { title: 'What is negligible-risk research?', blocks: [{ p: 'Negligible-risk research involves no foreseeable risk of harm or discomfort, only minor inconveniences. Because risk is minimal, it requires only the simplest oversight.' }] },
    { title: 'Who must seek low-risk ethics approval?', blocks: [{ p: 'All IHM staff, students, and external researchers conducting low or negligible-risk human research at IHM must obtain ethics approval before starting their research.' }] },
    { title: 'How do researchers apply for low-risk ethics approval?', blocks: [{ p: 'Researchers submit a Low-Risk Ethics Application via the IHM website or portal, including methodology, risk assessment, participant information sheet, consent forms, and data management plans.' }] },
    { title: 'How long does the ethics review process take?', blocks: [{ p: 'IHM maintains a fast review process with a typical turnaround of 4–6 weeks for low-risk applications.' }] },
    { title: 'What decisions can the Low-Risk Human Research Ethics Panel make?', blocks: [{ p: 'The panel can make the following decisions:' }, { ul: ['Approved', 'Approved with conditions', 'Resubmit with changes', 'Rejected'] }] },
    { title: 'Are any projects exempt from ethics approval?', blocks: [{ p: 'Yes. Projects using de-identified data, public observations with no distress, training-only student projects, or analysis of publicly available information may be exempt if they meet the National Statement criteria. Researchers must still apply for exemption.' }] },
    { title: 'What special requirements apply to research involving Aboriginal and Torres Strait Islander Peoples?', blocks: [{ p: 'Such research must show meaningful engagement with communities, respect cultural protocols, provide community benefit, and comply with AIATSIS and NHMRC ethical guidelines.' }] },
  ] as { title: string; blocks: KitBlock[] }[],
  contact: 'For enquiries about low-risk human research ethics at IHM, including risk classification, application requirements, and external HREC referrals, please contact:',
}

/** /research-initiatives-global-collaborations/ */
export const INITIATIVES = {
  title: 'Research Initiatives & Global Collaborations',
  intro: [
    'The Institute of Health & Management (IHM) is committed to advancing impactful, ethical, and practice-informed research that addresses contemporary challenges in health, nursing, aged care, digital health, and health management. Our research agenda aligns with national and international priorities, industry needs, and community wellbeing, with a strong emphasis on applied research, innovation, and global collaboration.',
    'IHM research is grounded in academic rigor, cultural responsiveness, and real-world relevance, supporting evidence-based education, policy, and professional practice.',
  ],
  collaborateTitle: 'Partner with IHM in Research Collaboration',
  collaborate: [
    'At the Institute of Health & Management (IHM), we are committed to advancing research and innovation through meaningful collaborations with researchers, academics, and institutions globally.',
    'We welcome researchers from around the world who are interested in exploring opportunities to collaborate with IHM on impactful research projects across healthcare, nursing, social wellbeing, and related disciplines.',
    'If you would like to collaborate with IHM or explore potential research opportunities, please complete the Research Collaboration Interest Form below. Our team will review your submission and connect with you to discuss potential collaboration opportunities.',
  ],
  form: { t: 'Research Collaboration Interest Form', href: 'https://asps.ihm.edu.au/signup' },
  strategicTitle: 'Our Strategic Partnership',
  strategic: 'IHM is proud to be part of a transformative partnership that revolutionises healthcare education and research. By bridging the gap between Australia, the United States, and the global healthcare industry, we create a seamless “education‑to‑employment” pathway.',
  strategicPartners: [
    { t: 'Innovation & Global Research', logo: '/images/partnerships/asu-logo.webp', alt: 'Arizona State University logo', href: '/arizona-state-university-asu-partnership/', b: 'As a “Powered by ASU” institution, we leverage the world’s #1 university for innovation to enhance our research capabilities in digital health, nursing leadership, and wellness.' },
    { t: 'Clinical Excellence', logo: '/images/partnerships/ramsay-logo.webp', alt: 'Ramsay Health Care logo', href: '/collaboration-with-ramsay-healthcare/', b: 'Our partnership with Australia’s largest private healthcare provider integrates industry expertise directly into our curriculum, focusing on patient safety, acute care, and workforce readiness.' },
  ],
  pillarsTitle: 'Key Research Pillars',
  pillarsIntro: 'Our research initiatives focus on the most pressing issues in modern healthcare and social services.',
  pillars: [
    { t: 'Evidence‑Based Nursing Practice', b: 'Advancing clinical decision‑making and person‑centred care models to improve patient health outcomes.', image: '/images/research/krp-1.webp' },
    { t: 'Mental Health & Social Wellbeing', b: 'Using innovative qualitative methods and arts‑based research to address emerging issues in mental health and community resilience.', image: '/images/research/krp-2.webp' },
    { t: 'Digital Health & Innovation', b: 'Integrating Virtual Reality (VR) simulations, mHealth, and electronic records into healthcare education and research.', image: '/images/research/krp-3.webp' },
    { t: 'Aged Care & Dementia', b: 'Developing practical handbooks and scholarly insights to support the rapidly evolving aged care sector in Australia.', image: '/images/research/krp-4.webp' },
  ],
  benefitsTitle: 'Benefits for Students & Faculty',
  benefitsIntro: 'Our research initiatives focus on the most pressing issues in modern healthcare and social services.',
  benefits: [
    { t: 'Dual Degree Pathways', b: 'Through the ASU–Cintana Alliance, students can pursue advanced pathways that combine IHM’s clinical focus with ASU’s world‑class academic resources.', image: '/images/research/bsf-1.webp' },
    { t: 'Faculty Mobility', b: 'Our educators collaborate with international researchers, ensuring IHM remains at the forefront of global best practices in nursing and public health.', image: '/images/research/bsf-2.webp' },
    { t: 'Clinical Placements', b: 'Strategic ties with Ramsay Health Care provide students with elite clinical experience in both public and private hospital settings.', image: '/images/research/bsf-3.webp' },
  ],
  closingTitle: 'Education for Employment: Bridging the Gap Globally',
  closing: 'Our collaborations are designed to equip the next generation of healthcare leaders with the skills to drive positive change in an ever-changing world.',
}

export type Centre = { name: string; subtitle?: string; director?: string; focus: string; areas: string[]; impact: string; href?: string }

/** /research-centres/ */
export const CENTRES = {
  title: 'IHM Research Centres',
  intro: 'IHM’s research excellence is advanced through dedicated Research Centres that provide strategic focus, leadership, and collaboration across priority areas. These centres foster applied research, industry engagement, staff development, and high-quality scholarly outputs with real-world impact.',
  centres: [
    {
      name: 'Centre for Nursing Research (NRC)',
      focus: 'Advancing high-quality clinical nursing research, nursing education scholarship, and innovation in advanced nursing practice to improve patient outcomes and workforce capability.',
      areas: ['Evidence-based practice implementation in clinical settings', 'Clinical simulation, assessment, and nursing education innovation', 'Nursing workforce development and capability building', 'Patient safety, quality improvement, and clinical governance', 'Gerontology and chronic disease management'],
      impact: 'The Centre for Nursing Research (NRC) generates applied research that informs nursing education, strengthens clinical practice, and supports safe, high-quality patient care across diverse healthcare settings.',
    },
    {
      name: 'Allied Health Research Centre', subtitle: 'Centre for Aged Care and Chronic Disease Research', director: 'Dr. Balasankar Ganesan',
      focus: 'Improving quality, safety, and outcomes in aged care and chronic disease management through applied and policy‑relevant research.',
      areas: ['Healthy ageing and frailty', 'Dementia care and person-centred models of care', 'Chronic disease management and care coordination', 'Quality improvement in aged care services'],
      impact: 'Research from this centre informs workforce training, service improvement, and policy development to better support ageing populations and vulnerable communities.',
      href: '/research-allied-health-research-centre/',
    },
    {
      name: 'Centre for Digital Health and Health Systems Research',
      focus: 'Leveraging digital innovation and systems thinking to enhance healthcare delivery, education, and management.',
      areas: ['Digital health interventions and telehealth', 'Health informatics and data-driven decision-making', 'Technology-enabled learning and simulation', 'Health leadership, policy, and service improvement'],
      impact: 'This centre promotes research‑led innovation that improves access, efficiency, and quality across health systems.',
    },
  ] as Centre[],
}

/** /research-strategy-ihm/ */
export const STRATEGY = {
  title: 'Research Strategy (2026-2030)',
  focusTitle: 'IHM’s Research Strategy 2026–30 focuses on:',
  focus: ['Building a sustainable research culture', 'Increasing high-quality publications and scholarly outputs', 'Supporting early-career and teaching-focused academics', 'Strengthening national and international collaborations', 'Embedding research into teaching and learning'],
  initiatives: 'Key initiatives include structured research mentoring, seed funding, workload recognition, and targeted support for peer-reviewed publications.',
  themesIntro: 'IHM’s research activities are organised around the following priority themes:',
  themes: [
    { t: 'Nursing Practice, Workforce, and Innovation', items: ['Contemporary Nursing Practice and Clinical Excellence', 'Nursing Workforce, Wellbeing, and Professional Identity', 'Culturally Safe and Person-Centred Nursing Care', 'Innovation and Digital Transformation in Nursing'] },
    { t: 'Aged Care and Chronic Disease Management', items: ['Healthy ageing and frailty', 'Dementia care and chronic disease management', 'Models of care and quality improvement in aged care'] },
    { t: 'Digital Health and Health Technology', items: ['Digital health interventions and telehealth', 'Health informatics and data-driven decision-making', 'Technology-enabled education and simulation'] },
    { t: 'Public Health and Health Systems', items: ['Health equity and access to care', 'Policy, leadership, and health service management', 'Culturally responsive and community-based health research'] },
  ],
}

/** /research-allied-health-research-centre/ */
export const ALLIED = {
  title: 'Research at Allied Health Research Centre',
  body: [
    'At Allied Health Research Centre, our research is driven by innovation, interdisciplinary collaboration, and a commitment to global impact. As the world’s population ages, healthcare systems face increasing challenges in managing chronic diseases, ensuring quality elderly care, and integrating new technologies to support aging individuals. Our research focuses on advancing knowledge and solutions in Smart Aging, Public Health, and Rehabilitation, addressing critical health concerns through technological advancements, policy development, and evidence-based interventions.',
    'By bridging the gap between healthcare, engineering, and digital technology, Allied Health Research Centre is committed to developing practical, scalable, and sustainable solutions that improve quality of life, enhance healthcare access, and promote overall well-being for aging populations and individuals requiring rehabilitation.',
  ],
  focusAreas: ['Smart Aging', 'Public Health', 'Rehabilitation'],
}
