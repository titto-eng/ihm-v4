// /academic-integrity/ — WordPress page 9451: academic integrity at IHM (types of dishonesty, the breach process, the
// Academic Honesty and Integrity Procedure IHM-AHIP2-5.1 in full, penalties, student tips, FAQs and staff expectations).
// Extracted from the page content (2026-10-30). Procedure clauses and the two penalty tables are verbatim; garbled sentences in
// the student-facing sections were tidied without changing their meaning.

export type ProcBlock = { h?: string; p?: string; list?: string[]; table?: string[][] }

export const ACADEMIC_INTEGRITY = {
 "docs": {
  "policy": "/pdf/policies/Academic_Honesty_and_Integrity_Policy.pdf",
  "procedure": "/pdf/procedures/Academic_Honesty_and_Integrity_Procedure.pdf"
 },
 "why": {
  "title": "Why Academic Integrity is Important at IHM",
  "body": [
   "Academic integrity is the expectation that teachers, students, researchers and all members of the Institute of Health & Management academic community act with honesty, trust, fairness, respect and responsibility. Breaching academic integrity is known as academic misconduct or academic dishonesty. Academic integrity principles will assist you to work with the ethical expectations of your career in the healthcare industry."
  ]
 },
 "turnitin": [
  "Educators at IHM Australia use Turnitin to assist in identifying potential academic integrity concerns in assessments and examinations. Turnitin is an originality checking and plagiarism detection tool that helps identify similarity, citation issues, or possible inappropriate copying in student work.",
  "At IHM Australia, Turnitin reports are used as an initial screening tool only and are not relied upon as the sole basis for determining an academic integrity breach. Where concerns arise, educators must review the evidence, follow the Academic Integrity Procedure, and ensure that all steps of the investigation are appropriately documented before initiating an Academic Integrity case."
 ],
 "accepted": [
  "Acknowledging where the information used comes from, clearly citing or referencing the source",
  "Using your own exams and submitting your own work",
  "Accurately reporting research findings and abiding by research policies",
  "Using information appropriately, according to copyright and privacy laws",
  "Acting ethically or doing the right thing, even when facing difficulties"
 ],
 "acceptedNote": "Breaching any of the above, substantial penalties can be enforced on students.",
 "types": [
  {
   "id": "plagiarism",
   "title": "Plagiarism",
   "body": "Submitting work without acknowledging the original source. When using another person's thoughts and ideas, you must reference the source materials. Resubmitting work which has already been assessed without prior permission from the assessor."
  },
  {
   "id": "falsification",
   "title": "Falsification",
   "body": "Incorrect data which does not exist. Fabricating information for research-focused assessment tasks, such as experimental or interview data."
  },
  {
   "id": "collusion",
   "title": "Collusion",
   "body": "Cooperation with one or more other students to complete assessed work that is supposed to be an individual piece of work. This includes sharing test questions and answers with other students, as well as written assessments. Students should never share or circulate their work with others. This is different from working on group assignments set by teachers."
  },
  {
   "id": "examCheating",
   "title": "Exam Cheating",
   "body": "Writing cheat notes on your body or materials taken to the exam room, attempting to copy from other students, communicating externally while in the exam venue, using electronic devices to access information while the exam is in progress, and bringing prohibited items such as unspecified calculators or textbooks into exams."
  },
  {
   "id": "contractCheating",
   "title": "Contract Cheating",
   "body": "Approaching someone else to complete your assessment and submitting that work as if you had completed it. This includes asking someone else to sit an exam for you or having them write an essay, report or some other form of assignment, whether paid or voluntary."
  }
 ],
 "consequences": [
  "Having to repeat the assessment task or unit of study",
  "Being expelled from the institution, which may impact student visa",
  "Major impact on relationships with colleagues",
  "Possible loss of student visa",
  "Failing the assessment task, unit of study or course",
  "Facing criminal charges",
  "Impact on future career and potential financial loss"
 ],
 "what": [
  "Academic integrity is the commitment to honest, trustworthy, fair, respectful, and responsible academic work. It is fundamental to the mission of the Institute of Health & Management and to the quality of education we provide in healthcare.",
  "At IHM, we believe that academic integrity underpins the professional standards expected in the healthcare industry. As future healthcare professionals, our students must demonstrate ethical behaviour that begins with their academic work."
 ],
 "healthcare": [
  {
   "title": "Patient Safety",
   "body": "Healthcare professionals must have genuine knowledge and skills. Academic dishonesty can lead to unqualified practitioners, endangering patient safety."
  },
  {
   "title": "Professional Standards",
   "body": "Regulatory bodies like AHPRA require healthcare graduates to meet strict competency standards. Your academic work reflects your readiness for practice."
  },
  {
   "title": "Trust & Responsibility",
   "body": "The healthcare sector relies on trust. Demonstrating integrity in your studies builds the ethical foundation for your career."
  },
  {
   "title": "Legal Compliance",
   "body": "Healthcare professionals must comply with legal and ethical standards. Academic integrity teaches the discipline required for regulatory compliance."
  }
 ],
 "commitment": "IHM is committed to fostering a culture of academic integrity through education, prevention, and fair processes. Our Academic Honesty and Integrity Policy (IHM-AHIP2-5.1) establishes the principles that guide all academic activities at the institute.",
 "corePrinciples": [
  [
   "Honesty",
   "in all academic work and assessments"
  ],
  [
   "Trust",
   "between students, staff, and the institution"
  ],
  [
   "Fairness",
   "in assessment design and misconduct processes"
  ],
  [
   "Respect",
   "for intellectual property and the work of others"
  ],
  [
   "Responsibility",
   "for one's own learning and academic conduct"
  ],
  [
   "Courage",
   "to uphold integrity standards even when it is difficult"
  ]
 ],
 "aiIntro": "IHM recognises that AI tools such as ChatGPT and similar technologies are part of the modern academic landscape. Our Procedure (Clauses 5.1-5.13) provides clear guidelines on the responsible use of AI in your assessments.",
 "aiKey": [
  [
   "ok",
   "Always check your unit outline for specific AI usage permissions"
  ],
  [
   "ok",
   "If AI use is permitted, you must declare and reference it appropriately"
  ],
  [
   "no",
   "Using AI to generate work that you submit as your own (considered academic misconduct)"
  ],
  [
   "ok",
   "AI generated content must be critically evaluated and properly attributed"
  ],
  [
   "ok",
   "When in doubt, ask your lecturer about acceptable AI use for your assessment"
  ]
 ],
 "citeIntro": "Proper citation and referencing are essential components of academic integrity (Policy Clause 8). IHM uses specific referencing styles depending on your course and discipline.",
 "module": {
  "body": "An interactive training module on academic integrity is being developed and will be available here soon. This module will cover all aspects of academic integrity in detail.",
  "href": "https://canvas.ihna.edu.au/courses/1434"
 },
 "breachIntro": "If a potential breach of academic integrity is identified, the following process will be followed in accordance with IHM's Academic Honesty and Integrity Procedure (IHM-AHIP2-5.1).",
 "steps": [
  {
   "title": "Initial Determination of Breach Status",
   "points": [
    "When a breach of academic integrity has been judged probable, and verified by at least one other member of the academic staff, a decision regarding the status of the potential breach will be determined as follows:",
    "The lecturer determines whether the breach was likely unintended or deliberate with knowledge of the actions constituting a breach of academic integrity.",
    "If the breach is the first occurrence for the student, an Academic Integrity Warning may be used to require the student alleged to have committed a minor breach to undertake an educative action.",
    "Academic Integrity Warnings are not considered academic misconduct or a penalty for that.",
    "If the breach is determined to be the first occurrence but is of a serious type (such as cheating, plagiarism, or collusion) or when the occurrence is determined not to be a first occurrence, then the breach will be investigated as potential academic misconduct."
   ]
  },
  {
   "title": "Academic Integrity Breach as Academic Misconduct",
   "points": [
    "Academic misconduct is a deliberate and planned action that undermines academic integrity.",
    "Subject to clause 15.1.c), allegations of academic integrity breaches will be reported in a prescribed form to the relevant Head of School for further investigation."
   ]
  },
  {
   "title": "Investigation of Academic Integrity Breaches",
   "points": [
    "When a breach of academic integrity has been judged probable, and verified by at least one other member of the academic staff, a decision regarding the status of the potential breach will be determined as follows:",
    "The lecturer determines whether the breach was likely unintended or deliberate with knowledge of the actions constituting a breach of academic integrity.",
    "If the breach is the first occurrence for the student, an Academic Integrity Warning may be used to require the student alleged to have committed a minor breach to undertake an educative action.",
    "Academic Integrity Warnings are not considered academic misconduct or a penalty for that.",
    "If the breach is determined to be the first occurrence but is of a serious type (such as cheating, plagiarism, or collusion) or when the occurrence is determined not to be a first occurrence, then the breach will be investigated as potential academic misconduct.",
    "If the Head of School decides for further investigation, they will appoint an Academic Integrity Panel comprising the Academic Integrity Officer, the relevant Course Coordinator (not being the complainant), and a lecturer from a School different to the school to which the respondent student belongs.",
    "Following the decision to investigate the breach, the Academic Integrity Officer must notify the student of the allegation and the process and inform the student of their right to participate and bring in a support person.",
    "The Panel will investigate the allegation at a hearing attended by the student and will consider all relevant evidence.",
    "The student may be accompanied by a support person (not being under the age of 18) at the hearing.",
    "If the student declines to attend the hearing or fails to attend the hearing, the Panel will continue with the investigation in their absence.",
    "The Panel will complete the investigation within five (5) working days from the day a decision to investigate was made by the Head of School."
   ]
  },
  {
   "title": "Imposition of Penalty, Notification of Outcomes",
   "points": [
    "If the Panel decides that the student breached academic integrity, they will recommend an appropriate penalty in accordance with policies and procedures relating to the academic integrity and student misconduct.",
    "The relevant Head of School will confirm that the recommended penalty is appropriate and will then issue an outcome letter to the student within five (5) working days from the day the Panel concluded the investigation.",
    "The outcome letter must inform the student of their rights and obligations, especially their right to seek an internal review and make an appeal."
   ]
  },
  {
   "title": "Internal Review and Appeal",
   "points": [
    "If unsatisfied by the outcome, the student may apply to the Academic Dean to get the outcome reviewed.",
    "The Academic Dean has the power to review the decision and award an appropriate penalty for the breach.",
    "Any request to the Academic Dean for the review of the decision of penalty will be completed within three (3) working days from the receipt of such request.",
    "If unsatisfied by the Academic Dean's decision, the student may appeal to the IHM Appeals Committee in accordance with the Student Complaints and Appeals Procedure."
   ]
  }
 ],
 "policyIntro": "The following documents outline IHM's position on academic integrity. This procedure applies to all students and provides a comprehensive framework for maintaining the highest standards of academic honesty.",
 "overviewFlow": [
  [
   "Educate",
   "Set expectations early through induction, unit outlines, and workshops."
  ],
  [
   "Detect",
   "Identify risks using assessment design, Turnitin, and staff review."
  ],
  [
   "Investigate",
   "Collect evidence and give students the opportunity to respond."
  ],
  [
   "Decide",
   "Apply proportionate outcomes based on breach severity."
  ],
  [
   "Review",
   "Ensure review and appeal rights are clearly communicated."
  ]
 ],
 "overviewIntro": "This procedure provides a consistent and fair response to academic integrity matters while supporting students to learn and improve.",
 "scope": [
  "Work produced by students in response to assessment tasks",
  "Documents produced by staff such as curricula, study guides, research papers by staff and students"
 ],
 "definitions": [
  [
   "Academic Integrity",
   "The commitment to and demonstration of honest and ethical behaviour in an academic setting."
  ],
  [
   "Academic Misconduct",
   "Behaviour that undermines the principles of academic integrity through deliberate actions."
  ],
  [
   "Plagiarism",
   "Presenting another person's ideas, words, or work as one's own without appropriate acknowledgment."
  ],
  [
   "Collusion",
   "Unauthorised collaboration with others on work that should be completed individually."
  ],
  [
   "Contract Cheating",
   "Arranging for someone else to complete assessable work, whether paid or unpaid."
  ]
 ],
 "principlesIntro": "IHM uses clear, educative approaches to communicate the importance of academic integrity. The principles include:",
 "principles": [
  "Clear communication of academic integrity requirements to students and staff",
  "Preventative strategies that mitigate the risk of academic misconduct",
  "Vigilant detection of cases of academic misconduct",
  "Fair and transparent investigation processes",
  "Appropriate penalties proportionate to the breach",
  "Support for students in developing academic skills"
 ],
 "values": [
  "Transparency",
  "Fairness",
  "Education First",
  "Consistency"
 ],
 "responsibilities": [
  {
   "title": "Students",
   "items": [
    "Submit their own original work for all assessments",
    "Properly cite and reference all sources used",
    "Follow all examination rules and assessment requirements",
    "Use AI tools only as permitted and with appropriate declaration",
    "Seek help when unsure about academic integrity requirements",
    "Not engage in plagiarism, collusion, cheating, or contract cheating"
   ]
  },
  {
   "title": "Academic and Teaching Staff (Clause 21)",
   "items": [
    "Ensure students receive appropriate education about academic integrity expectations",
    "Provide support to students in fulfilling academic honesty requirements",
    "Detect potential breaches through review of assessments and observations",
    "Report suspected breaches using prescribed procedures",
    "Participate in investigation processes when required",
    "Maintain confidentiality and fairness throughout all processes",
    "Model research integrity and ethical academic practice"
   ]
  }
 ],
 "aiPolicyIntro": "IHM recognizes that AI tools such as ChatGPT, Claude, and other generative AI technologies are part of the modern academic landscape. The following guidelines govern the responsible use of AI in academic work:",
 "aiPermitted": [
  "Brainstorming and idea generation (with disclosure)",
  "Grammar and language checking",
  "Researching general concepts and background information",
  "Generating initial outlines or structures (with substantial original development)",
  "Translation assistance for international students"
 ],
 "aiProhibited": [
  "Generating complete assessment responses or substantial portions thereof",
  "Using AI output verbatim without critical analysis and original input",
  "Failing to declare AI use when it has been used",
  "Using AI during examinations or in-class assessments (unless explicitly permitted)",
  "Using AI to paraphrase or disguise plagiarized content",
  "Relying on AI-generated citations without verification"
 ],
 "aiImportant": "When in doubt about AI usage, students must consult with their unit lecturer before submission. Unauthorized AI use will be treated as a serious breach of academic integrity and may result in significant penalties.",
 "turnitinPolicyIntro": "IHM uses Turnitin as a tool to support academic integrity. Understanding how Turnitin is used is important for both students and staff:",
 "turnitinPolicy": [
  {
   "title": "Purpose and Application",
   "items": [
    "Turnitin compares submitted work against a database of academic publications, websites, and previously submitted student papers.",
    "Similarity reports highlight text matches and provide a similarity percentage.",
    "The tool supports early detection of citation and originality issues."
   ]
  },
  {
   "title": "Important Limitations",
   "items": [
    "Turnitin reports are used as an initial screening tool only.",
    "A similarity score is not a definitive indication of plagiarism.",
    "All flagged content must be manually reviewed by academic staff."
   ]
  },
  {
   "title": "Investigation Process",
   "items": [
    "Educators review evidence thoroughly before initiating a case.",
    "All steps of the investigation are documented.",
    "Students have the right to respond to allegations and present evidence."
   ]
  }
 ],
 "turnitinTip": "Use draft submissions where available to identify similarity issues and improve referencing before final submission.",
 "referencingIntro": "Proper referencing and citation are fundamental to academic integrity. IHM requires all students to:",
 "referencing": [
  {
   "title": "General Requirements",
   "items": [
    "Acknowledge all sources of information used in academic work",
    "Use the referencing style specified in the unit outline",
    "Include both in-text citations and a complete reference list",
    "Cite all direct quotes, paraphrased ideas, data, images, and other materials",
    "Ensure all in-text citations have corresponding entries in the reference list"
   ]
  },
  {
   "title": "Resources Available",
   "items": [
    "IHM Referencing and Style Guide (Library)",
    "Unit-specific referencing guidelines in unit outlines",
    "Library workshops on referencing and academic writing",
    "Online referencing tools and tutorials",
    "One-on-one support through Student Support Services"
   ]
  }
 ],
 "referencingNote": "Lack of knowledge about proper referencing is not accepted as an excuse for plagiarism. Students are expected to seek help and use available resources.",
 "penaltiesIntro": "Penalties are applied based on the severity and frequency of the breach. The following framework guides penalty decisions:",
 "penalties": [
  [
   "Breach Type",
   "First Occurrence",
   "Second Occurrence",
   "Third or Subsequent Occurrence"
  ],
  [
   "Minor Breach (e.g., inadequate referencing, unintentional poor citation)",
   "Academic Integrity Warning with requirement to undertake educative action",
   "Zero mark for the assessment component; resubmission may be permitted",
   "Zero mark for the unit; notation on academic transcript"
  ],
  [
   "Moderate Breach (e.g., plagiarism of a section of work, unauthorized collaboration)",
   "Zero mark for the assessment; resubmission not permitted; Academic Integrity Module completion required",
   "Zero mark for the unit; suspension for one teaching period",
   "Expulsion from IHM; permanent notation on transcript"
  ],
  [
   "Serious Breach (e.g., contract cheating, exam cheating, substantial plagiarism)",
   "Zero mark for the unit; suspension for one teaching period; permanent notation on transcript",
   "Expulsion from IHM; transcript notation indicating academic misconduct",
   "Expulsion from IHM; may report to regulatory bodies if relevant to professional registration"
  ],
  [
   "Very Serious Breach (e.g., multiple instances of contract cheating, falsifying official documents, impersonation)",
   "Expulsion from IHM; permanent transcript notation; may report to relevant authorities",
   "N/A - Expulsion on first occurrence"
  ]
 ],
 "penaltiesNote": "Suspension or expulsion may impact student visa status. Academic misconduct findings may be reported to professional registration bodies. Transcript notations are permanent.",
 "rights": [
  "Right to be informed of allegations and process details",
  "Right to respond in writing and/or at a hearing",
  "Right to support person at meetings (non-legal)",
  "Right to review evidence and present evidence",
  "Right to fair, timely, and confidential process",
  "Right to review and appeal decisions"
 ],
 "support": [
  "Student Support Services for process guidance",
  "Academic Skills Support for referencing and writing",
  "Counselling services for stress and wellbeing",
  "International Student Support for additional guidance"
 ],
 "tips": [
  {
   "title": "How to Avoid Plagiarism",
   "items": [
    "Start your research and writing early to avoid last-minute pressure",
    "Take notes in your own words and always record the source",
    "Use quotation marks for any text copied directly from a source",
    "Paraphrase by understanding the idea first, then writing it in your own words",
    "Always include proper citations and a complete reference list",
    "Use the Turnitin draft submission feature to check your work"
   ]
  },
  {
   "title": "How to Properly Paraphrase & Cite",
   "items": [
    "Read the original text several times until you understand the meaning",
    "Put the original text aside and write the idea in your own words",
    "Use your own sentence structure; don't just swap or re-arrange the words",
    "Add an in-text citation even when you have changed the words",
    "Use signal phrases like 'According to Smith (2024)...' to introduce the idea and maintain your voice"
   ]
  },
  {
   "title": "Understanding Turnitin Reports",
   "items": [
    "A similarity score is not a grade and does not indicate plagiarism",
    "Common phrases and terminology may show as matches",
    "Focus on the highlighted text sections to understand what has been flagged",
    "Check that all matches represent proper citations and not plagiarism",
    "Ask your lecturer if you're unsure about your Turnitin report"
   ]
  },
  {
   "title": "Using AI Responsibly",
   "items": [
    "Always check your unit outline for specific AI usage permissions",
    "If permitted, use AI as a brainstorming or learning aid, not to write your work",
    "Properly acknowledge AI generated content as per IHM's procedure (Clauses 5.8-5.10)",
    "Critically evaluate and edit AI output; don't use it verbatim",
    "Declare all AI tool usage when asked"
   ]
  },
  {
   "title": "What to Do If Accused",
   "items": [
    "Stay calm and read the written notice carefully",
    "Respond to the notice within the timeframe it gives",
    "Gather all evidence of your work process (drafts, notes, references)",
    "You can bring a support person to any meeting",
    "Seek help from IHM Student Support if you need assistance with the process",
    "You have the right to appeal a decision; see the Review and Appeals process"
   ]
  },
  {
   "title": "Good Academic Practice",
   "items": [
    "Attend all academic skills workshops offered by IHM",
    "Use the Library resources and referencing guides",
    "Plan your assessments early and manage your time effectively",
    "Keep all drafts and working notes as evidence of your process",
    "Ask questions early if you don't understand what's being taught",
    "Complete the Academic Integrity Module at the start of your studies"
   ]
  }
 ],
 "faqs": [
  [
   "What happens if I accidentally plagiarise?",
   "Accidental plagiarism, such as poor referencing or inadequate paraphrasing, is typically treated as incomplete academic practice. Your Course Convenor will address this through normal feedback processes. You may be asked to resubmit your work with proper references. However, it is your responsibility to learn and apply correct referencing practices, so take advantage of IHM's academic skills support if you need assistance with this."
  ],
  [
   "Can I use AI tools in my assessments?",
   "This depends on the specific use and assignment. Each unit outline will specify whether AI tools are permitted and under what conditions. If the unit outline does not mention a use, you should assume it is not permitted. Where AI use is allowed, you must declare it and demonstrate your own critical analysis. Using AI to generate work that you submit as your own without disclosure and analysis is considered academic misconduct."
  ],
  [
   "What is the difference between collaboration and collusion?",
   "Collaboration is working together with others on an activity that is explicitly set as a group assignment or group activity. Collusion is working with others on work that is supposed to be completed individually. Sharing your individual assessment answers, responses or written work with other students is collusion, even if you have good intentions. If you are unsure, ask your lecturer what level of cooperation is acceptable."
  ],
  [
   "How does Turnitin work?",
   "Turnitin compares your submitted work against a vast database of academic publications, websites, and previously submitted student papers. It generates a similarity report that highlights any matches. Your lecturer reviews this report in context - a high similarity score doesn't automatically mean plagiarism. Properly cited quotes will show as matches. You can use draft submissions to check and improve your work before the final deadline."
  ],
  [
   "What are the penalties for academic misconduct?",
   "Penalties vary depending on the severity and frequency of the misconduct. For minor first offences, you may be asked to resubmit with counselling. Moderate offences may result in reduced marks. Serious offences can result in zero marks for the assessment, failure of the unit, suspension, or expulsion from IHM. For international students, severe penalties may also impact your student visa. See the Policy and Procedure section for full details."
  ],
  [
   "Can I appeal an academic misconduct decision?",
   "Yes. Students who have a finding of Academic Misconduct are entitled to request a review and, where provided, an appeal. You can submit a review of decision through IHM's Student Complaints and Appeals process. The outcome letter you receive will detail the process for seeking a review. Contact IHM Student Support if you need assistance with the appeals process."
  ]
 ],
 "external": [
  [
   "Academic Integrity Basics",
   "What is academic integrity?",
   "https://www.teqsa.gov.au/students/understanding-academic-integrity/what-academic-integrity"
  ],
  [
   "Integrity Explained",
   "Understanding academic integrity",
   "https://www.teqsa.gov.au/students/understanding-academic-integrity"
  ],
  [
   "AI Advice for Students",
   "Artificial intelligence: advice for students",
   "https://www.teqsa.gov.au/students/artificial-intelligence-advice-students"
  ]
 ],
 "staffIntro": "As outlined in the Academic Honesty and Integrity Policy (Clause 21), all academic and teaching staff have a responsibility to uphold and promote academic integrity. Key responsibilities include:",
 "staff": [
  "Educate students about academic integrity expectations at the start of each unit",
  "Include academic integrity information and AI usage guidance in all unit outlines",
  "Design assessments that promote integrity and minimise opportunities for misconduct",
  "Model ethical academic practice in all teaching and research activities",
  "Be vigilant in identifying potential breaches during marking and assessment",
  "Report suspected breaches promptly and follow the documented procedure",
  "Maintain confidentiality throughout investigation processes",
  "Support students in developing their academic skills and understanding of integrity"
 ],
 "contact": {
  "officer": "Contact through your Course Coordinator or Head of School.",
  "email": "studentsupport@ihm.edu.au",
  "phone": "Available through student portal"
 }
}

/** The Procedure (IHM-AHIP2-5.1) as the old page showed it, section by section. */
export const AI_PROCEDURE: { title: string; blocks: ProcBlock[] }[] = [
 {
  "title": "Section 1: Purpose, Scope & Suite Documents",
  "blocks": [
   {
    "h": "Purpose"
   },
   {
    "p": "1. The purpose of this document is to set out the procedure the Institute of Health and Management (IHM) will follow and use to ensure that standards of academic honesty and integrity befitting of a higher education institute are maintained."
   },
   {
    "h": "Scope"
   },
   {
    "p": "2. This procedure applies to all documents and media produced by IHM staff and students, including but not limited to:"
   },
   {
    "list": [
     "2.1 Work produced by students in response to assessment tasks,",
     "2.2 Documents produced by staff such as curricula, study guides, research papers by staff and students and marketing materials."
    ]
   },
   {
    "h": "Definitions"
   },
   {
    "p": "3. Definitions for key terms are presented in the Glossary of Terms."
   },
   {
    "h": "Suite documents"
   },
   {
    "p": "4. This Policy is linked to the following Procedure:"
   },
   {
    "list": [
     "4.1 Academic Honesty and Integrity Policy",
     "4.2 Other documents as listed in the \"Related Internal Documents\" in Section 3 below."
    ]
   }
  ]
 },
 {
  "title": "Section 2: Guidelines for Students",
  "blocks": [
   {
    "p": "5. Guidelines for students"
   },
   {
    "list": [
     "5.1 Generative Artificial Intelligence is evolving rapidly, IHM students are advised to use these tools critically, effectively, and ethically.",
     "5.2 IHM encourages students to develop the awareness, knowledge, and skills to use these technologies ethically and responsibly as digitally fluent citizens.",
     "5.3 Students need to develop Artificial Intelligence literacy skills in addition to traditional information literacy skills and generic digital literacy skills. Artificial Intelligence literacy skills enable individuals to critically evaluate Artificial Intelligence technologies, communicate and collaborate effectively with Artificial Intelligence, and use Artificial Intelligence as a tool online, at home, and in the workplace.",
     "5.4 Students should use Artificial Intelligence models in ethical and responsible ways that are consistent with IHM's learning, assessment and Academic Honesty and Integrity Policy and procedure, and the terms of use of the Artificial Intelligence providers.",
     "5.5 Ethical use of generative Artificial Intelligence includes an obligation to follow IHM's policy, procedure, and guidelines regarding academic activities, including the use of generative Artificial Intelligence in any unit or course, and with an understanding that it may not be appropriate to use generative Artificial Intelligence in all circumstances.",
     "5.6 Students should check any output from generative Artificial Intelligence against reliable sources of information and understand that they will be responsible for any errors or omissions in material generated by Artificial Intelligence.",
     "5.7 Students are required to identify Artificial Intelligence models, tools and/or prompts that are appropriate for their discipline and acknowledge the use of Artificial Intelligence in written assessments following the Referencing and Style Guide (please see Section on AI Outputs).",
     "5.8 If it is not possible to identify and cite the original sources used in the written assignment or report developed by using Artificial Intelligence tools, this may result in a finding of plagiarism and academic misconduct.",
     "5.9 Students also need to be aware of the possibility of \"hallucinated references\" or the tendency of generative Artificial Intelligence language models to make up references from constituent parts of actual references.",
     "5.10 Students should acknowledge the use of generative Artificial Intelligence language models in assessment tasks, following IHM policy and procedure. The student should describe the way they have used the tool and integrate the results into their work as appropriate to the specific guidelines within their discipline, unit or course.",
     "5.11 The unauthorised use of Artificial Intelligence language models or paraphrasing tools may be a form of cheating and may result in academic misconduct. Students must make sure that the final product is their own work and not just copied from an Artificial Intelligence generator.",
     "5.12 Students need to be aware that using the output from Artificial Intelligence models without appropriate acknowledgment may constitute academic misconduct. If unsure, students should confirm assessment requirements with teaching staff or seek advice on how to acknowledge the output from Artificial Intelligence from academic support services, such as their library or other academic services.",
     "5.13 Where appropriate, students should familiarise themselves with any relevant expectations of or constraints on the use of generative Artificial Intelligence related to their future professional accreditation and be aware that these may be updated."
    ]
   }
  ]
 },
 {
  "title": "Guidelines for Academic Staff",
  "blocks": [
   {
    "p": "6. Guidelines for academic staff"
   },
   {
    "list": [
     "6.1 Academic staff will help students to develop capabilities in the ethical use of generative Artificial Intelligence relevant to their discipline and future professional practice through ethical engagement with generative Artificial Intelligence tools in learning and teaching activities and assessment.",
     "6.2 Existing and likely future uses of Artificial Intelligence in professional contexts and in platforms such as Microsoft Office and search engines need to be considered when developing unit or course learning outcomes, activities, and assessments.",
     "6.3 Expectations regarding the appropriate use of generative Artificial Intelligence in assessment tasks and learning activities should be consistent with IHM policies and clearly communicated to students via instructions in student-facing documents such as Unit Outlines and the learning management system.",
     "6.4 To ensure procedural fairness, it is important to communicate to students any inappropriate uses of generative Artificial Intelligence that may result in breaches of academic integrity.",
     "6.5 Students should be aware that they are risking academic misconduct if using generative Artificial Intelligence without appropriate acknowledgement in accordance with referencing guidelines provided by IHM.",
     "6.6 Having conversations with students early in regard to units and courses will improve a shared understanding of how and when they can use Artificial Intelligence tools.",
     "6.7 Staff should educate students on how and when generative Artificial Intelligence can be used and acknowledged.",
     "6.8 Staff should make students aware of the limitations of generative Artificial Intelligence such as biased or negative responses, hallucinations, and the limitation of currency.",
     "6.9 Artificial Intelligence tools may be used within IHM policy, procedure and guidelines to support learning and assessment development and design. However, critical evaluation of generative Artificial Intelligence output is required to ensure appropriateness against learning outcomes.",
     "6.10 Unit and course learning outcomes, assessment tasks and marking criteria may require review to incorporate the ethical use of generative Artificial Intelligence, or to indicate when such use is not permitted, following IHM policies, procedures and guidelines.",
     "6.11 In designing formative and summative assessment tasks, teaching staff should consider the capabilities of generative Artificial Intelligence."
    ]
   }
  ]
 },
 {
  "title": "Guidelines for Student Support Staff",
  "blocks": [
   {
    "p": "7. Guidelines for student support staff"
   },
   {
    "p": "7.1 All academic and student support staff (including library and teaching staff) are encouraged to support students to develop academic skills and academic integrity by:"
   },
   {
    "list": [
     "a) Promoting the ethical and responsible use of Artificial Intelligence tools in academic writing and research.",
     "b) Providing guidance on correct attribution and acknowledgement conventions to be used when incorporating generative Artificial Intelligence outputs.",
     "c) Providing advice and training to enable and enhance effective use of Artificial Intelligence tools.",
     "d) Providing information and links to approved Artificial Intelligence tools that are available for students."
    ]
   }
  ]
 },
 {
  "title": "Procedure for Students: AI, Similarity Checks & Ethics",
  "blocks": [
   {
    "h": "8. Academic Integrity procedure when using Artificial Intelligence"
   },
   {
    "list": [
     "8.1 All work submitted by an individual students must be their own. In case of group work, the individual contribution of each student must be their own work.",
     "8.2 Students should ensure that the use of Artificial Intelligence does not compromise the integrity of the work.",
     "8.3 If a student uses Artificial Intelligence software such as ChatGPT or Quilbot to generate material for assessment that they represent as their own ideas, research and/or analysis, they are NOT submitting their own work.",
     "8.4 If a student uses Artificial Intelligence generated material in the preparation of their assessment submission, this must be appropriately acknowledged, disclosed and cited in their work, where relevant, in accordance with the Referencing and Style Guide.",
     "8.5 Where Artificial Intelligence software has been used in the preparation of submitted work, students may be required to provide evidence of the prompts and transcripts to qualify the nature and extent of use of Artificial Intelligence software.",
     "8.6 Students should ensure that the use of Artificial Intelligence is transparent and accountable, which includes documenting the use of Artificial Intelligence and making information available to relevant staff whenever requested.",
     "8.7 Knowingly using a third party, Artificial Intelligence technologies, to write or produce any work (paid or unpaid) that a student submits as their own work for assessment is deliberate cheating and is considered as academic misconduct."
    ]
   },
   {
    "h": "9. Similarity check procedure for student assignments"
   },
   {
    "list": [
     "9.1 Before submitting any written assignment, students are required to check and confirm the similarity report in Turnitin, download the report, check highlighted words and phrases, and make amendments before submission.",
     "9.2 Students are advised that each assignment they submit will be reviewed in context irrespective of any similarity score produced by Turnitin."
    ]
   },
   {
    "h": "10. Ethical consideration and academic honesty when using Artificial Intelligence"
   },
   {
    "list": [
     "10.1 Students must ensure that the use of Artificial Intelligence in academic work adheres to ethical considerations, including the privacy of individuals and the protection of data.",
     "10.2 Students must consult with academic staff if they are unsure of the ethical implications of using Artificial Intelligence in their academic work.",
     "10.3 Students are expected to uphold the principles of academic honesty, including not plagiarizing or falsifying academic work, even when using Artificial Intelligence.",
     "10.4 Students should ensure that the use of Artificial Intelligence does not infringe on the academic integrity of their work."
    ]
   }
  ]
 },
 {
  "title": "Procedure for Staff: Managing Breaches",
  "blocks": [
   {
    "h": "11. General principles of managing breaches of academic integrity"
   },
   {
    "list": [
     "11.1 IHM supports an educative response to first-time breaches of academic integrity where this is appropriate and possible.",
     "11.2 All instances of potential breach of academic integrity are reviewed by at least 1 academic staff member before determining if and what penalties and further actions are deemed appropriate in accordance with this IHM procedure.",
     "11.3 Students may appeal any decisions or actions taken in this process as per IHM Student Complaints and Appeals Policy and Procedure.",
     "11.4 Any potential breach of academic integrity is reviewed and investigated according to IHM endeavouring that no person will suffer any discrimination or victimisation as a result of raising an allegation in good faith.",
     "11.5 IHM staff involved in reviewing/investigating any breaches of policy and procedure are to conduct their activities based on a fair hearing and will respect the privacy and confidentiality of all parties.",
     "11.6 Each academic staff must have strategies in place to ensure that students receive appropriate education about, and support to fulfil, the IHM's expectations of students in terms of academic honesty and integrity.",
     "11.7 It is the duty of the academic staff member who detects a potential breach of academic integrity to review available evidence and assess if further action is required as per Clauses 12 and 13."
    ]
   },
   {
    "h": "12. Identifying breaches of academic integrity"
   },
   {
    "list": [
     "12.1 Potential breaches of academic integrity are primarily identified through assessment marking and moderation procedures, plagiarism checking tools, and observation from academic team members.",
     "12.2 Assessments are reviewed for originality, authorship and scholarship. Incorrect or failure to properly cite source material as per assessment criteria is considered a breach of academic integrity.",
     "12.3 IHM employs an automated plagiarism detection tool (Turnitin). Any similarity detected indicates a potential breach of academic integrity and will be reviewed by the academic staff member to assess if further investigation is required.",
     "12.4 Observation by any academic staff member that a student may have breached academic integrity by collusion, plagiarism, contract cheating, academic fraud, non-compliance, solicitation or other activities is to be reviewed by a senior member of the academic team."
    ]
   },
   {
    "h": "13. Reviewing potential breaches of academic integrity"
   },
   {
    "list": [
     "13.1 All potential breaches of academic integrity are to be registered in the academic integrity register, and the outcome of all decisions regarding status, penalties and further actions will be recorded.",
     "13.2 Upon initial review of the evidence available to the academic staff member, if a breach is not found to be likely the instructor can report that they do not deem a breach of academic integrity has occurred as part of standard academic reporting processes.",
     "13.3 If the instructor deems a breach of academic integrity to have been likely, the course coordinator must be notified with a request to review the available evidence.",
     "13.4 If the course coordinator also deems the breach to have been likely, the student is to be notified in writing with advice regarding the course of action to follow.",
     "13.5 In the instance of failure to properly acknowledge or properly cite use of Artificial Intelligence that has been confirmed by the student, supporting evidence of prompts and transcripts used in generating the assessment content may be requested."
    ]
   },
   {
    "h": "14. Monitoring academic integrity breaches"
   },
   {
    "list": [
     "14.1 Upon receipt of any work submitted by a student in response to an assessment task, academic staff are required to ensure that the student has signed a Plagiarism Declaration and review a Turnitin similarity report where applicable.",
     "14.2 For written assignments, staff should check the highlighted words and phrases in the similarity report utilising the filters and contextual and scholarly judgement to assess validity of the detection."
    ]
   }
  ]
 },
 {
  "title": "Determination, Investigation, Penalties & Appeals",
  "blocks": [
   {
    "h": "15. Initial determination of breach status"
   },
   {
    "list": [
     "15.1 When a breach of academic integrity has been judged probable, and verified by at least one other member of the academic staff, a decision regarding the status of the potential breach will be determined.",
     "a) The lecturer determines whether the breach was likely unintended or deliberate with knowledge of the actions constituting a breach of academic integrity.",
     "b) If the breach is the first occurrence for the student, an Academic Integrity Warning may be used to require the student alleged to have committed a minor breach to undertake an educative action.",
     "c) Academic Integrity Warnings are not considered academic misconduct or a penalty for that.",
     "d) If the breach is determined to be the first occurrence but is of a serious type or not a first occurrence, then the breach will be investigated as potential academic misconduct."
    ]
   },
   {
    "h": "16. Academic integrity breach as academic misconduct"
   },
   {
    "list": [
     "16.1 Academic misconduct is a deliberate and planned action that undermines academic integrity.",
     "16.2 Allegations of academic integrity breaches will be reported in a prescribed form to the relevant Head of School for further investigation."
    ]
   },
   {
    "h": "17. Investigation of academic integrity breaches"
   },
   {
    "list": [
     "17.1 If the Head of School decides for further investigation, they will appoint an Academic Integrity Panel.",
     "17.2 A member of Student Representative Council will be invited to be an observer on the Panel.",
     "17.3 The Academic Integrity Officer must notify the student of the allegation and the process and inform the student of their right to participate and bring in a support person.",
     "17.4 The Panel will investigate the allegation at a hearing attended by the student and will consider all relevant evidence.",
     "17.5 The student may be accompanied by a support person at the hearing.",
     "17.6 If the student declines to attend the hearing or fails to attend the hearing, the Panel will continue with the investigation in their absence.",
     "17.7 The Panel will complete the investigation within five (5) working days from the day a decision to investigate was made by the Head of School."
    ]
   },
   {
    "h": "18. Imposition of penalty, notification of outcomes"
   },
   {
    "list": [
     "18.1 If the Panel decides that the student breached academic integrity, they will recommend an appropriate penalty.",
     "18.2 The relevant Head of School will confirm that the recommended penalty is appropriate and will then issue an outcome letter to the student within three (3) working days from the day the Panel concluded the investigation.",
     "18.3 The outcome letter must inform the student of their rights and obligations, especially their right to seek an internal review and make an appeal."
    ]
   },
   {
    "h": "19. Internal review and appeal"
   },
   {
    "list": [
     "19.1 If unsatisfied by the outcome, the student may apply to the Academic Dean to get the outcome reviewed.",
     "19.2 The Academic Dean has the power to review the decision and award an appropriate penalty for the breach.",
     "19.3 Any request to the Academic Dean for the review of the decision of penalty will be completed within three (3) working days from the receipt of such request.",
     "19.4 If unsatisfied by the Academic Dean's decision, the student may appeal to the IHM Appeals Committee in accordance with the Student Complaints and Appeals Procedure."
    ]
   }
  ]
 },
 {
  "title": "20. Penalties for Breaching Academic Integrity",
  "blocks": [
   {
    "p": "20.1 Penalties may be imposed only in accordance with this Procedure."
   },
   {
    "p": "20.2 Once imposed, all penalty decisions should be recorded in the Academic Integrity Register."
   },
   {
    "p": "20.3 The penalties per type of breach are described in Table 1 below."
   },
   {
    "table": [
     [
      "Criteria",
      "Similarity/Authorship",
      "Assessment",
      "Observation"
     ],
     [
      "Detection Type",
      "Similarity/Authorship",
      "Assessment",
      "Observation"
     ],
     [
      "Detection Format",
      "Automated",
      "Manual",
      "Manual"
     ],
     [
      "Evidence format",
      "Turnitin Report",
      "Marking by Rubric",
      "Engagement in teaching, learning and/or assessment activities"
     ],
     [
      "Breach type",
      "Plagiarism",
      "Collusion, Plagiarism, Falsified citations",
      "Collusion, contract cheating, Academic Fraud, Non-Compliance, Solicitation"
     ],
     [
      "Penalty on 1st Breach",
      "Formative guidance and education support Marking proceeds excluding flagged content",
      "Formative guidance and education support",
      "Report to the course-coordinator for further investigation"
     ],
     [
      "Penalty beyond 1st Breach",
      "Resubmission with 50% marks limit. Supplementary verbal interview with 50% marks. Supplementary or resubmission decisions MUST be approved by the Head of School. Approved resubmissions and supplementary assessments should be enacted withing 5 working days."
     ]
    ]
   }
  ]
 },
 {
  "title": "21-22. Communication with Student & Academic Integrity Register",
  "blocks": [
   {
    "h": "21. Communication with the student"
   },
   {
    "list": [
     "21.1 The student will be promptly communicated at all stages of the investigation and determination processes.",
     "21.2 The Academic Integrity Officer will ensure that the Course Coordinator is informed of the outcomes of investigation under this Procedure."
    ]
   },
   {
    "h": "22. Academic Integrity Register"
   },
   {
    "p": "22.1 A register will be maintained to record:"
   },
   {
    "list": [
     "a) Breaches of academic integrity as reported by educators.",
     "b) All entries, including assessment (review) of the allegation, investigation, and decision outcomes.",
     "c) Warnings that have been given to students even where no formal action for academic misconduct has been taken.",
     "d) Penalties applied in response to instances of breaches of academic integrity.",
     "e) Any other relevant information."
    ]
   }
  ]
 },
 {
  "title": "Section 3: Associated Information & Document Control",
  "blocks": [
   {
    "table": [
     [
      "Related Internal Documents",
      "Academic Honesty and Integrity Policy; Copyright Policy for Students; Learning and Teaching Policy; Learning and Teaching Procedure; Student Academic Progression Policy; Student Academic Progression Procedure; Student Assessment and Examination Policy; Student Assessment and Examination Procedure; Referencing and Style Guide; Student Code of Conduct; Student Code of Conduct Implementation Guidelines; Student Complaints and Appeals Policy; Student Complaints and Appeals Procedure; Student Misconduct Policy; Student Misconduct Procedure; Student Support Framework; Student Support Services Policy; Student Support Services Procedure"
     ],
     [
      "Related Legislation, Standards, and Codes",
      "Tertiary Education and Quality Standards Agency Act 2011; Higher Education Standards Framework (Threshold Standards) 2021; TEQSA Guidance Note: Academic integrity"
     ],
     [
      "Date Approved",
      "14/05/2025"
     ],
     [
      "Date of Effect",
      "15/05/2025"
     ],
     [
      "Date of Next Review",
      "14/05/2028"
     ],
     [
      "Approval Authority",
      "Academic Board (endorsed by Board of Directors)"
     ],
     [
      "Responsibility for implementation",
      "Academic Dean"
     ],
     [
      "Document Custodian",
      "Director of Studies"
     ],
     [
      "IHM Doc ID",
      "IHM-AHIP2-5.1"
     ]
    ]
   }
  ]
 }
]
