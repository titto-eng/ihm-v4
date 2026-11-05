// Copy for the legal and utility pages (session 14): /ihm-privacy-policy/ (IHM-AEP1-4.0), /privacy-at-the-institute-of-health-and-management/,
// /make-a-payment/, /pay-online-error/, /thanks/, /thanks-events/. Taken from the WordPress pages (.data/inventory/data/ihm/pages.json)
// and edited: the policy's "Page 3 of 8" PDF fragment removed, its duplicated "Approval Authority" row dropped, the document number
// labelled, the version 4.0 date set to the approval date (the old table repeated "Version 4.0"). Blocks render with page-kit/Kit.tsx.
import type { KitBlock } from '@/components/page-kit/Kit'

export type PolicyChapter = { id: string; title: string; group?: string | null; blocks: KitBlock[] }

export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  code: 'IHM-AEP1-4.0',
  chapters: [
 {
  "id": "purpose",
  "title": "Purpose",
  "group": "Section 1 · Purpose and scope",
  "blocks": [
   {
    "p": "1. The purpose this policy is to outline how IHM complies with the [Privacy Act 1988](https://www.legislation.gov.au/C2004A03712/latest/versions) and the [Australian Privacy Principles (APPs) 2014](https://www.oaic.gov.au/privacy/australian-privacy-principles) and other federal laws on how IHM collects, stores, uses and disseminates student and staff personal information."
   }
  ]
 },
 {
  "id": "scope",
  "title": "Scope",
  "group": null,
  "blocks": [
   {
    "p": "2. IHM is bound by Australian Privacy Principles (APPs) in the [Privacy Act 1988 (Cth)](https://www.oaic.gov.au/privacy/privacy-legislation/the-privacy-act), Information Privacy Principles (IPPs) in the [Privacy and Data Protection Act 2014 (Vic)](https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/vic/consol_act/hra2001144/), the [Health Privacy Principles (HPPs) (Cth)](https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/vic/consol_act/hra2001144/) in the [Health Records Act 2001](https://www.health.vic.gov.au/legislation/health-records-act), and to the related legal obligations by which it is bound."
   },
   {
    "p": "3. This Policy covers IHM’s treatment of personally identifiable information that IHM collects through any means as part of the provision of its services. This Privacy and Security Statement does not apply to the practices of companies that IHM does not own or control or to people that IHM does not employ or manage."
   },
   {
    "p": "4. IHM Privacy Policy is technology neutral, applying equally to paper-based and digital environments. This is intended to preserve the relevance and applicability, in a context of continually changing and emerging technology."
   },
   {
    "p": "5. This policy covers all personal and sensitive information relating to students and staff and all institutional records including educational, training, assessment, policy, financial, Intellectual Property, compliance, and quality documents."
   }
  ]
 },
 {
  "id": "definitions",
  "title": "Definitions",
  "group": null,
  "blocks": [
   {
    "p": "6. Definitions for key terms are presented in the [Glossary of Terms](/policies-procedures/)."
   }
  ]
 },
 {
  "id": "suite-documents",
  "title": "Suite documents",
  "group": null,
  "blocks": [
   {
    "p": "7. This Policy is linked to the following:"
   },
   {
    "ul": [
     "Privacy Procedure",
     "See also Associated Information listed in the ‘Related Internal Documents’ in Section 3 below."
    ]
   }
  ]
 },
 {
  "id": "principles",
  "title": "Principles",
  "group": "Section 2 · Principles",
  "blocks": [
   {
    "p": "8. Personal information is defined in the [Privacy Act 1988](https://www.legislation.gov.au/C2004A03712/latest/versions) as “information or an opinion about an identified individual, or an individual who is reasonably identifiable:"
   },
   {
    "ul": [
     "whether the information or opinion is true or not; and",
     "whether the information or opinion is recorded in a material form or not”"
    ]
   },
   {
    "p": "9. Sensitive Personal information is defined in the [Privacy Act 1988](https://www.legislation.gov.au/C2004A03712/latest/versions) as “information or an opinion about an individual” that is also personal information, such as:"
   },
   {
    "ul": [
     "racial or ethnic origin",
     "political opinions",
     "membership of a political association",
     "religious beliefs or affiliations",
     "philosophical beliefs",
     "membership of a professional or trade association",
     "membership of a trade union",
     "sexual orientation or practices; or",
     "criminal record"
    ]
   }
  ]
 },
 {
  "id": "information-about-students",
  "title": "10. Information about Students",
  "group": null,
  "blocks": [
   {
    "p": "10.1 IHM collects personally identifiable information that students provide when they register or enrol for any educational courses or programs, when they use certain IHM online services or products, or when they enter promotions. IHM’s preferred source of personal information is the individual concerned. However, IHM may also receive information from other sources such as other members of the Health Careers International (HCI) Group."
   },
   {
    "p": "10.2 Under the Freedom of Information Act, Vic 1982, IHM will permit a student to apply for and receive a copy of the personal information that the provider holds on the student’s record."
   }
  ]
 },
 {
  "id": "information-about-staff",
  "title": "11. Information about Staff",
  "group": null,
  "blocks": [
   {
    "p": "11.1 IHM collects personal information from its staff which may be used for Selection, Appointment, Promotion, General Administration or Provision of Services to staff. IHM’s preferred source of personal information is the individual concerned. However, IHM may also receive information from other sources such as:"
   },
   {
    "ul": [
     "previous employers and referees nominated by prospective and current staff members.",
     "academic assessors.",
     "promotion and performance review assessments."
    ]
   },
   {
    "p": "11.2 IHM takes all reasonable steps to ensure that information collected is:"
   },
   {
    "ul": [
     "necessary for IHM’s purposes.",
     "relevant to the purpose of the collection; and",
     "collected in a fair way, without unreasonable intrusion.",
     "Provided to the respective student or staff when requested, following the Privacy Procedure"
    ]
   }
  ]
 },
 {
  "id": "collection-of-personal-information",
  "title": "12. Collection of Personal Information",
  "group": null,
  "blocks": [
   {
    "p": "12.1 Personal information will not be collected unless:"
   },
   {
    "ul": [
     "The information is collected for a purpose directly related to students.",
     "The collection of information is necessary for or directly related to the purpose for which the information is being collected.",
     "The collection of the information is authorised or required by law.",
     "With whom the information may be shared (such as the Australian Government, Placement Partners) the information collected is relevant to that purpose and is up to date and complete; and",
     "The collection of the information does not infringe upon the personal affairs of the student in an unreasonable manner."
    ]
   },
   {
    "p": "12.2 Personal information will not be collected by unlawful or unethical means."
   },
   {
    "p": "12.3 Where personal information is collected for inclusion in a record or in a generally available publication, IHM will take all reasonable and practicable steps to ensure that, the student concerned is made aware of:"
   },
   {
    "ul": [
     "the purpose for which the information is being collected.",
     "if the collection of the information is authorised or required by law and",
     "with whom the information may be shared (such as the Australian Government or Tuition Assurance Scheme)."
    ]
   },
   {
    "p": "12.4 Where IHM solicits and collects personal information for inclusion in a record or in a generally available publication it will take reasonable steps to ensure that:"
   },
   {
    "ul": [
     "the information collected is relevant to that purpose and is up to date and complete; and",
     "the collection of the information does not infringe upon the personal affairs of the student in an unreasonable manner"
    ]
   },
   {
    "p": "12.5 IHM is committed to complying with the obligation under the Privacy Act 1988, and the associated Australian Privacy Principles (APPs), in the way it specifically collects, uses, secures, and discloses personal information. IHM is committed to safeguarding any confidential information obtained by it. IHM will ensure that:"
   },
   {
    "ul": [
     "Information gathered for the express purpose of training and assessment matters will not be disclosed to a third party unless prior written consent is provided by the individual concerned, or in the case that it is required by law;",
     "There is a provision for the secure storage of all records.",
     "All information maintained on records is held in strict confidentiality."
    ]
   },
   {
    "p": "12.6 IHM may request access to a student’s device location for the sole purpose of attendance verification using geofencing."
   },
   {
    "p": "12.7 Location access may occur while the application is in foreground or background to detect when a student enters or leaves the registered campus area."
   },
   {
    "p": "12.8 The location is used to:"
   },
   {
    "ul": [
     "obtain the student’s current location for presence verification;",
     "compare it with the registered campus location; and",
     "determine whether the student is within an approved radius (approximately 20 metres) of the campus for attendance marking."
    ]
   },
   {
    "p": "12.9 Location tracking is enabled only for attendance monitoring and is designed to automatically stop when the student exits the campus geofence."
   },
   {
    "p": "12.10 IHM does not use location for advertising, profiling, or marketing and does not track users for unrelated purposes."
   },
   {
    "p": "12.11 IHM does not store a continuous location history or movement path. Location information is processed to validate geofence entry/exit and attendance status. Any retention (if required) is limited to what is necessary to support attendance records and meet legal or regulatory obligations."
   }
  ]
 },
 {
  "id": "accessing-and-correcting-personal-information",
  "title": "13. Accessing and Correcting Personal Information",
  "group": null,
  "blocks": [
   {
    "p": "13.1 A link to IHM's Privacy Policy is included in the Student Handbook, detailing the information collected and its intended uses."
   },
   {
    "p": "13.2 IHM will ensure individuals have access to their personal information held by institutions, in compliance with legal obligations."
   },
   {
    "p": "13.3 Requests for accessing information will be evaluated in accordance with relevant legislation, as well as IHM's Privacy Procedure and Records Management Policy and Procedure."
   },
   {
    "p": "13.4 Staff members encountering concerns regarding information access should seek guidance from People and Culture Officer."
   },
   {
    "p": "13.5 Upon notification of inaccuracies, incompleteness or outdatedness in personal information, IHM will endeavors to rectify the data or document the individual’s dissent."
   }
  ]
 },
 {
  "id": "securing-storing-and-retaining-data",
  "title": "14. Securing, Storing and Retaining Data",
  "group": null,
  "blocks": [
   {
    "p": "14.1 IHM will implement measures to safeguard information against misuse, loss, unauthorized access, modification, or disclosure."
   },
   {
    "p": "14.2 IHM’s protocols for Information technology security are delineated in the Cyber Security and Safety Policy, Records Management Policy and associated Procedure."
   }
  ]
 },
 {
  "id": "disposing-of-and-destroying-information",
  "title": "15. Disposing of and Destroying Information",
  "group": null,
  "blocks": [
   {
    "p": "15.1 IHM will only dispose of or permanently de-identify personal or sensitive information when no longer legally required. Destruction of documents will adhere to the Records Management Policy and related Procedure."
   },
   {
    "p": "15.2 IHM will only dispose of or de-identify health information in accordance with the [Health Records Act 2001](https://www.health.vic.gov.au/legislation/health-records-act)."
   }
  ]
 },
 {
  "id": "health-information",
  "title": "16. Health Information",
  "group": null,
  "blocks": [
   {
    "p": "16.1 In addition to general obligation, IHM has specific duties regarding confidential health information if collected from staff and students."
   },
   {
    "p": "16.2 Health records may be generated across various IHM operations, such as research, teaching, People and Culture functions, student counselling and student disability liaison. These records will be managed in compliance with [Health Records Act 2001](https://www.health.vic.gov.au/legislation/health-records-act) as detailed in the Privacy Procedure and Records Management Policy and Procedure."
   }
  ]
 },
 {
  "id": "anonymity-and-pseudonymity",
  "title": "17. Anonymity and Pseudonymity",
  "group": null,
  "blocks": [
   {
    "p": "17.1 IHM respects and acknowledges the choice of anonymity and pseudonymity by individuals dealing with IHM. IHM provides opportunities for individuals to interact anonymously or by pseudonym with IHM where appropriate. For example, anonymous dealings may include an unidentified individual telephoning IHM to make a general enquire about its courses or services."
   },
   {
    "p": "17.2 Pseudonymity requires that an individual may contact IHM and use a name, term or descriptor that is different from the person’s actual name. Examples may include an email address that does not contain the person’s actual name, and/or a username that a person uses when participating in an online forum."
   },
   {
    "p": "17.3 Personal information should only be linked to a pseudonym if this is required or authorised by law."
   },
   {
    "p": "17.4 Situations where it is impractical to implement Anonymity and/or Pseudonymity:"
   },
   {
    "ul": [
     "While IHM acknowledges Anonymity and Pseudonymity as a privacy principle, there are instances where identification is necessary to proceed with a matter."
    ]
   },
   {
    "p": "17.5 The following are examples where it may be impracticable to deal with an individual who has not disclosed their actual identity:"
   },
   {
    "ul": [
     "Dispute resolution: it would be impracticable to investigate and resolve an individual’s particular complaint about how their case was managed or follow up on a staff member’s behaviour unless the complainant provided their name, contact detail and other relevant information.",
     "Personal information requests: in responding to an individual’s request for personal information, IHM would require evidence of the person’s identity before proceeding with the enquiry; and",
     "Eligibility for government subsidies or support: in responding to an individual’s course enquiry and potential government subsidy, IHM may not be able to provide definitive information without knowing the potential applicant’s identity, education history and/or personal circumstances."
    ]
   }
  ]
 }
] as PolicyChapter[],
  /** Associated information (label, value; values are kit inline text) */
  meta: [
 [
  "Related Internal Documents",
  "Privacy Procedure · Records Management Policy · Records Management Procedure"
 ],
 [
  "Related Legislation, Standards, and Codes",
  "[Tertiary Education and Quality Standards Agency Act 2011](https://www.teqsa.gov.au/how-we-regulate/acts-and-standards/teqsa-act) · [Higher Education Standards Framework (Threshold Standards) 2021](https://www.teqsa.gov.au/how-we-regulate/higher-education-standards-framework-2021) · [Health Records Act 2001](https://www.health.vic.gov.au/legislation/health-records-act) · [Privacy and Data Protection Act 2014 (Vic)](https://www8.austlii.edu.au/cgi-bin/viewdb/au/legis/vic/num_act/padpa201460o2014317/) · [Higher Education Provider Guidelines (2023)](https://www.legislation.gov.au/F2023L00400/latest/downloads) · [Higher Education Support Act (2003)](https://www.legislation.gov.au/C2004A01234/2023-03-15/text)"
 ],
 [
  "Date Approved",
  "02.08.2024"
 ],
 [
  "Date of Effect",
  "03.08.2024"
 ],
 [
  "Date of Next Review",
  "30.07.2027"
 ],
 [
  "Approval Authority",
  "Audit and Risk Committee; endorsed by the Board of Directors"
 ],
 [
  "Responsibility for implementation",
  "Approval Authority"
 ],
 [
  "Document number",
  "IHM-AEP1-4.0"
 ]
],
  /** Change history: version, date, summary */
  history: [
 [
  "Version 2.0",
  "7/01/2021",
  "Added version number. Minor editorial changes. Amended by the Learning and Teaching Committee at its meeting in December 2020 and feedback incorporated by the Director, Quality Assurance. Version 2 approved by Academic Board in February 2021."
 ],
 [
  "Version 3.0",
  "6/10/2022",
  "Comments from FEE-HELP application response included"
 ],
 [
  "Version 4.0",
  "02.08.2024",
  "The definitions relocated to IHM glossary of terms. Template updated. Changes to align policy and procedure with Higher Education Support Act (2003) and Higher Education Provider Guidelines (2023)."
 ]
],
}

export const WEBSITE_PRIVACY = {
  title: 'Privacy at the Institute of Health and Management (IHM)',
  intro: "This page contains information about how IHM deals with personal information (also known as personal data) and the rights of the individual.",
  chapters: [
 {
  "id": "reporting-a-breach",
  "title": "Reporting a Breach",
  "blocks": [
   {
    "p": "If you suspect a breach of an IHM system, contact the helpdesk at [itsupport@hci.edu.au](mailto:itsupport@hci.edu.au)."
   }
  ]
 },
 {
  "id": "ihm-website-privacy",
  "title": "IHM Website Privacy",
  "blocks": [
   {
    "p": "**The Institute of Health and Management (IHM) is committed to protecting your privacy.**"
   },
   {
    "p": "We handle your personal information according to the Australian Privacy Principles (APPs) in the [Privacy Act 1988 (Cth)](https://www.oaic.gov.au/privacy/privacy-legislation/the-privacy-act), Information Privacy Principles (IPPs) in the [Privacy and Data Protection Act 2014 (Vic)](https://www8.austlii.edu.au/cgi-bin/viewdb/au/legis/vic/num_act/padpa201460o2014317/), the [Health Privacy Principles (HPPs) (Cth)](https://policy.vu.edu.au/directory/summary.php?legislation=11) in the [Health Records Act 2001](https://www.health.vic.gov.au/legislation/health-records-act), and to the related legal obligations by which we are bound."
   },
   {
    "p": "**This privacy statement explains:**"
   },
   {
    "ul": [
     "The information we collect through our websites.",
     "How we use and share that information.",
     "Your rights to access and manage your information.",
     "How to make a privacy complaint."
    ]
   }
  ]
 },
 {
  "id": "personal-information-defined",
  "title": "Personal Information Defined",
  "blocks": [
   {
    "p": "Personal information is any data that identifies you as an individual."
   }
  ]
 },
 {
  "id": "information-we-collect",
  "title": "Information We Collect",
  "blocks": [
   {
    "p": "**We collect personal information in two ways on our websites:**"
   },
   {
    "h": 3,
    "t": "1. Information You Provide"
   },
   {
    "p": "You may submit personal information when you inquire, subscribe to our services, update contact details, or provide website feedback. This may include your name, contact details, and other relevant information. Students and staff will need a Student ID and password to access specific areas."
   },
   {
    "p": "**The information you provide could include the following:**"
   },
   {
    "ul": [
     "**Information about Students** IHM collects personally identifiable information that students provide when they register or enrol for any educational courses or programs, when they use certain IHM online services or products, or when they enter promotions. IHM’s preferred source of personal information is the individual concerned. IHM may also receive information from other sources such as other members of the Health Careers International (HCI) Group. Under the Freedom of Information Act, Vic 1982, IHM will permit a student to apply for and receive a copy of the personal information that the provider holds on the student’s record.",
     "**Information about Staff** IHM collects personal information from its staff which may be used for Selection, Appointment, Promotion, General Administration or Provision of Services to staff. IHM’s preferred source of personal information is the individual concerned. IHM may also receive information from other sources such as:"
    ]
   },
   {
    "p": "**previous employers and referees nominated by prospective and current staff members.**"
   },
   {
    "ol": [
     "academic assessors.",
     "promotion and performance review assessments."
    ]
   },
   {
    "p": "**When IHM requests and collects personal information for inclusion in a record or publicly available publication, we will take reasonable steps to ensure that:**"
   },
   {
    "ul": [
     "The information is relevant to the intended purpose and is current and accurate.",
     "The collection of information does not unduly intrude on the staff member's personal affairs."
    ]
   },
   {
    "p": "IHM is committed to adhering to the Privacy Act 1988 and the Australian Privacy Principles (APPs). We handle personal information with care, ensuring it is collected, used, secured, and disclosed responsibly. IHM safeguards all confidential information obtained. We will ensure that:"
   },
   {
    "ul": [
     "Information collected for training and assessment purposes is not shared with third parties without written consent, except when required by law.",
     "All records are stored securely.",
     "All information in records is maintained in strict confidentiality."
    ]
   },
   {
    "h": 3,
    "t": "2. Information Collected Automatically"
   },
   {
    "p": "We collect information about your use of our websites using cookies and similar technologies. Cookies are small text files stored on your device to remember your actions and preferences. You can control cookies through your browser settings, but disabling them may affect website functionality."
   },
   {
    "p": "**We use cookies for various purposes, including:**"
   },
   {
    "ul": [
     "Recording website areas you visit, courses viewed, browsing time, and actions taken. This helps us improve website usability and user experience.",
     "Remembering your preferences and progress on the website.",
     "Tracking information you provide to avoid incomplete applications or remember favourited courses.",
     "Understanding your interests for personalised content and relevant advertising on other websites."
    ]
   }
  ]
 },
 {
  "id": "how-we-use-your-information",
  "title": "How We Use Your Information",
  "blocks": [
   {
    "p": "**We use your information only for the purpose it was collected or a directly related purpose.**"
   },
   {
    "ul": [
     "**Information You Provide:** We use information from online forms to process your requests, analyse trends for better service, and provide additional relevant content. Information from Alumni and Advancement forms may be used to update contact details, share news and achievements, manage gifts, or respond to bequest inquiries.",
     "**Information Collected Automatically:** We use cookie information to deliver website functionality, monitor performance, personalise content, and deliver targeted advertising through remarketing. We also use software tools to collect anonymous user interaction data to improve your experience and our websites."
    ]
   }
  ]
 },
 {
  "id": "sharing-your-information",
  "title": "Sharing Your Information",
  "blocks": [
   {
    "p": "Unless instructed otherwise, personal information may be shared with related companies within Health Careers International Pty Ltd (HCI) where it will remain confidential. We share your information with third parties in limited circumstances:"
   },
   {
    "ul": [
     "**Contractors and Consultants:** We share information with contracted service providers bound by IHM's privacy and security requirements to assist with services.",
     "**Website Service Providers:** External service providers hosting and supporting our websites will have access to information collected through them. These providers are also bound by IHM's privacy and security requirements.",
     "**Digital Engagement Service Providers:** We use external providers for website hosting, support, and personalised content delivery. These providers may collect information about your website use for those purposes. We also use them for targeted advertising through platforms like Facebook and Google.",
     "**Event Service Providers:** We use digital engagement platforms to personalise website content and conduct marketing activities. These platforms may collect information about your website use for this purpose."
    ]
   }
  ]
 },
 {
  "id": "storing-and-securing-your-information",
  "title": "Storing and Securing Your Information",
  "blocks": [
   {
    "p": "IHM implements security measures to protect your personal information from misuse, loss, unauthorised access, use, modification, or disclosure. IHM’s protocols for Information technology security are delineated in the Cyber Security and Safety Policy, Records Management Policy, and associated Procedure."
   }
  ]
 },
 {
  "id": "disposing-of-and-destroying-information",
  "title": "Disposing of and Destroying Information",
  "blocks": [
   {
    "p": "IHM will only dispose of or permanently de-identify personal or sensitive information when no longer legally required. Destruction of documents will adhere to the Records Management Policy and related Procedure. IHM will only dispose of or de-identify health information in accordance with the [Health Records Act 2001](https://www.health.vic.gov.au/legislation/health-records-act)."
   }
  ]
 },
 {
  "id": "health-information",
  "title": "Health Information",
  "blocks": [
   {
    "p": "In addition to general obligation, IHM has specific duties regarding confidential health information if collected from staff and students. Health records may be generated across various IHM operations, such as research, teaching, People and Culture functions, student counselling and student disability liaison. These records will be managed in compliance with [Health Records Act 2001](https://www.health.vic.gov.au/legislation/health-records-act) as detailed in the Privacy Procedure and Records Management Policy and Procedure."
   }
  ]
 },
 {
  "id": "links-to-external-websites",
  "title": "Links to External Websites",
  "blocks": [
   {
    "p": "Our websites may link to external websites operated by third parties. This privacy statement does not apply to those websites. We recommend you review their privacy information to understand how they handle your data."
   }
  ]
 },
 {
  "id": "accessing-and-correcting-your-information",
  "title": "Accessing and Correcting Your Information",
  "blocks": [
   {
    "p": "**Under Australian privacy laws, you have the right to access and correct your personal information held by IHM. Residents outside Australia may have additional rights, including:**"
   },
   {
    "ul": [
     "Restricting or objecting to our use of your information.",
     "Withdrawing your consent to our use of your information at any time.",
     "Objecting to direct marketing (including profiling).",
     "Requesting erasure of your information if we no longer have a lawful reason to hold it.",
     "Requesting data portability of your information."
    ]
   }
  ]
 },
 {
  "id": "making-a-privacy-complaint",
  "title": "Making a Privacy Complaint",
  "blocks": [
   {
    "p": "You have the right to complain if you believe IHM has breached your privacy. Complaints should be made in writing to [registrar@ihm.edu.au](mailto:registrar@ihm.edu.au) within six months of becoming aware of the breach."
   }
  ]
 }
] as PolicyChapter[],
}
