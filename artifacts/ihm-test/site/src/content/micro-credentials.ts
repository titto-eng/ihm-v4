// Micro-credentials module (WordPress theme inc/micro-credentials/mc-data.json and the four template-mc-*.php files, synced
// 2026-10-30). Plain data: the overview, the 12 specialty pages, requirements and industry partners all read from here.
export type McAreaId = 'critical-acute' | 'child-family' | 'ageing-chronic' | 'mental-health'
export type McArea = { id: McAreaId; label: string; blurb: string }
export type McCourse = {
  slug: string; title: string; short: string; area: McAreaId; unitCode: string; unitName: string; reflectionCode: string; reflectionName: string
  tagline: string; forWho: string; overview: string[]; topics: string[]; learningFocus: string[]; settings: string[]
  /** The GCAN specialisation page the overview is adapted from. */
  sourcePath: string; accent: string; image: string
}

export const MC_LINKS = {
  gcan: '/graduate-certificate-in-advanced-nursing/',
  contact: '/contact/',
  apply: 'https://courses.ihm.edu.au/admissions/apply/',
  english: '/english-language-proficiency-entry-requirements/',
  industryHub: 'https://industryhub.ihm.edu.au/',
  requirements: '/micro-credentials/requirements/',
  partners: '/micro-credentials/industry-partners/',
} as const

export const MC_AREAS: McArea[] = [
  {
    "id": "critical-acute",
    "label": "Critical and acute",
    "blurb": "High-acuity, time-critical care"
  },
  {
    "id": "child-family",
    "label": "Child and family",
    "blurb": "Newborns, children and their families"
  },
  {
    "id": "ageing-chronic",
    "label": "Ageing and chronic care",
    "blurb": "Long-term, complex and end-of-life care"
  },
  {
    "id": "mental-health",
    "label": "Mental health",
    "blurb": "Person-centred mental health practice"
  }
]

export const MC_COURSES: McCourse[] = [
  {
    "slug": "critical-care-nursing",
    "title": "Critical Care Nursing",
    "short": "Critical Care",
    "area": "critical-acute",
    "unitCode": "N8004",
    "unitName": "Critical Care Nursing",
    "reflectionCode": "N8005",
    "reflectionName": "Professional Reflection in Critical Care Nursing",
    "tagline": "Anticipate the change before it arrives.",
    "forWho": "Registered nurses working in, or moving toward, ICU and high-acuity environments.",
    "overview": [
      "Critically ill patients change quickly. This specialty focuses on assessing their nursing needs across clinical settings and on predicting, and responding to, changes in a patient’s condition with knowledge and confidence.",
      "Clinical reasoning and evidence-based specialist knowledge connect critical care theory to the work you already do on shift, so what you study this week can shape how you assess a deteriorating patient next week."
    ],
    "topics": [
      "Assessment of nursing needs for critically ill patients",
      "Anticipating and responding to clinical deterioration",
      "Clinical reasoning in critical care practice",
      "Evidence-based specialist critical care nursing",
      "Role and scope of the critical care nurse"
    ],
    "learningFocus": [
      "Apply critical thinking processes, problem-solving abilities and effective communication to the evaluation and administration of nursing care delivered to critically ill patients within the critical care healthcare team",
      "Critically review the roles, functions and the scope of practice of the critical care nurse in critical care settings",
      "Demonstrate leadership within a multidisciplinary healthcare team responsible for delivering excellent therapeutic treatment to patients in critical care settings",
      "Perform an assessment of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, evaluate and use evidence-based nursing strategies while caring for clients in critical care settings"
    ],
    "settings": [
      "Intensive care",
      "High dependency",
      "Critical care outreach"
    ],
    "accent": "#BD490E",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-critical-care-nursing/",
    "image": "/images/micro-credentials/critical-care-nursing.webp"
  },
  {
    "slug": "acute-care-nursing",
    "title": "Acute Care Nursing",
    "short": "Acute Care",
    "area": "critical-acute",
    "unitCode": "N8006",
    "unitName": "Acute Care Nursing",
    "reflectionCode": "N8007",
    "reflectionName": "Professional Reflection in Acute Care Nursing",
    "tagline": "Steady hands for the sudden and serious.",
    "forWho": "Registered nurses caring for patients with brief but serious conditions on busy acute wards.",
    "overview": [
      "Acute care asks you to manage a growing number of patients, across a range of conditions, whose needs can escalate within a single shift. This specialty broadens your practice to meet that reality.",
      "You will build on your current nursing knowledge to develop acute care strategies and the confidence to use them at the bedside, within a team, under pressure."
    ],
    "topics": [
      "Managing patients with brief but serious conditions",
      "Caring for multiple patients with complex needs",
      "Acute care nursing strategies and decision-making",
      "Teamwork and leadership in acute settings",
      "Legal, ethical and cultural dimensions of person-centred care"
    ],
    "learningFocus": [
      "Apply critical thinking processes, problem-solving abilities and effective communication to the evaluation and management of nursing care delivered to patients within the acute care healthcare team",
      "Lead a multidisciplinary healthcare team in the provision of excellent therapeutic treatment to clients in acute care settings",
      "Conduct an analysis of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, assess and use contemporary evidence-based nursing strategies in acute care settings"
    ],
    "settings": [
      "Medical and surgical wards",
      "Acute assessment units",
      "Step-down units"
    ],
    "accent": "#C85A16",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-acute-care-nursing/",
    "image": "/images/micro-credentials/acute-care-nursing.webp"
  },
  {
    "slug": "emergency-nursing",
    "title": "Emergency Nursing",
    "short": "Emergency",
    "area": "critical-acute",
    "unitCode": "N8008",
    "unitName": "Emergency Care Nursing",
    "reflectionCode": "N8009",
    "reflectionName": "Professional Reflection in Emergency Care Nursing",
    "tagline": "Clear thinking at the front door of the hospital.",
    "forWho": "Registered nurses in emergency departments, urgent care and regional EDs.",
    "overview": [
      "Emergency nursing means assessing nursing needs in situations that are often undifferentiated and urgent. This specialty focuses on the evaluation and nursing treatment of critically unwell people arriving in acute care.",
      "Clinical reasoning and evidence-based specialist knowledge link emergency care theory to your current practice, from triage conversations to handover."
    ],
    "topics": [
      "Assessment of nursing needs in emergency situations",
      "Evaluation and nursing treatment of critically unwell clients",
      "Clinical reasoning in emergency care",
      "Duties, functions and scope of practice in emergency settings",
      "Leading within the multidisciplinary emergency team"
    ],
    "learningFocus": [
      "Conduct a critical examination of the critical care nurse’s duties, functions and scope of practice in emergency care settings",
      "Apply critical thinking processes, problem-solving abilities and effective communication to the evaluation and administration of nursing care delivered to critically ill clients within the emergency care healthcare team",
      "Demonstrate leadership within a multidisciplinary healthcare team in order to provide effective therapeutic treatment to clients in acute care settings",
      "Conduct an analysis of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, evaluate and use current evidence-based nursing strategies while caring for clients in acute care settings"
    ],
    "settings": [
      "Emergency departments",
      "Urgent care centres",
      "Regional and rural EDs"
    ],
    "accent": "#A83F0C",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-emergency-nursing/",
    "image": "/images/micro-credentials/emergency-nursing.webp"
  },
  {
    "slug": "neonatal-nursing",
    "title": "Neonatal Nursing",
    "short": "Neonatal",
    "area": "child-family",
    "unitCode": "N8010",
    "unitName": "Neonatal Nursing",
    "reflectionCode": "N8011",
    "reflectionName": "Professional Reflection in Neonatal Nursing",
    "tagline": "The smallest patients, the most precise care.",
    "forWho": "Registered nurses supporting sick newborns and their families in neonatal and special care settings.",
    "overview": [
      "Caring for newborns with significant medical issues calls for a skilled team with specialised expertise. This specialty focuses on supportive health care of newborns and on assisting the family through a frightening time.",
      "It is a highly technical area of practice centred on newborn assessment and nursing management, using clinical reasoning and evidence-based specialist knowledge."
    ],
    "topics": [
      "Newborn assessment and nursing management",
      "Preterm birth, congenital conditions and respiratory illness",
      "Birth trauma, peripartum hypoxia and metabolic disorders",
      "Supporting families of sick infants",
      "Evidence-based neonatal nursing strategies"
    ],
    "learningFocus": [
      "Critically analyse the neonatal nurse’s duties, functions and scope of practice in newborn situations such as preterm delivery, congenital malformations, respiratory illness, birth trauma, peripartum hypoxia, brain damage and metabolic disorders",
      "Apply critical thinking processes, problem-solving abilities and effective communication skills to the evaluation and management of nursing care delivered to newborns in collaboration with the healthcare team",
      "Demonstrate leadership within a multidisciplinary healthcare team in order to provide excellent therapeutic treatment to newborn clients",
      "Conduct an analysis of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, evaluate and use current evidence-based nursing strategies while caring for newborn clients"
    ],
    "settings": [
      "Neonatal intensive care",
      "Special care nurseries",
      "Maternity units"
    ],
    "accent": "#D9822B",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-neonatal-nursing/",
    "image": "/images/micro-credentials/neonatal-nursing.webp"
  },
  {
    "slug": "paediatric-nursing",
    "title": "Paediatric Nursing",
    "short": "Paediatric",
    "area": "child-family",
    "unitCode": "N8012",
    "unitName": "Paediatric Nursing",
    "reflectionCode": "N8013",
    "reflectionName": "Professional Reflection in Paediatric Nursing",
    "tagline": "Care that grows up alongside the child.",
    "forWho": "Registered nurses caring for infants, children and adolescents in hospital and community settings.",
    "overview": [
      "Children and adolescents move quickly through physical, mental and social stages of development, and their nursing needs change with them. This specialty prepares nurses to work safely and professionally across paediatric settings.",
      "It places a strong focus on critical thinking, and on adapting new technology and treatments into safe, effective, high-quality nursing care for young people and their families."
    ],
    "topics": [
      "Developmental stages and paediatric nursing needs",
      "Safe, high-quality paediatric nursing interventions",
      "Critical thinking in paediatric practice",
      "Integrating new technology and treatments",
      "Family-centred communication"
    ],
    "learningFocus": [
      "Conduct a critical examination of the responsibilities, functions and scope of practice of paediatric nursing",
      "Demonstrate leadership within the multidisciplinary healthcare team in the provision of effective therapeutic treatment to clients in paediatric settings by using critical thinking processes, problem-solving abilities and effective communication",
      "Conduct an analysis of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, evaluate and use current evidence-based nursing strategies while caring for children in paediatric settings"
    ],
    "settings": [
      "Paediatric wards",
      "Children’s emergency",
      "Community child health"
    ],
    "accent": "#E39A2D",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-paediatric-nursing/",
    "image": "/images/micro-credentials/paediatric-nursing.webp"
  },
  {
    "slug": "mental-health-nursing",
    "title": "Mental Health Nursing",
    "short": "Mental Health",
    "area": "mental-health",
    "unitCode": "N8014",
    "unitName": "Mental Health Nursing",
    "reflectionCode": "N8015",
    "reflectionName": "Professional Reflection in Mental Health Nursing",
    "tagline": "Presence, theory and practice, held together.",
    "forWho": "Registered nurses supporting individual and community mental health across settings.",
    "overview": [
      "Rapid social change has created real challenges for individuals and communities, and every part of the health system needs nurses who can promote mental health. This specialty builds that capability.",
      "You will assess the nursing needs of people in a variety of clinical settings and develop a deeper understanding of mental health theory and how it shows up in day-to-day clinical practice."
    ],
    "topics": [
      "Mental health theory and clinical practice",
      "Assessing nursing needs across mental health settings",
      "Promoting individual and community mental health",
      "Role and scope of the mental health nurse",
      "Person-centred, culturally safe care"
    ],
    "learningFocus": [
      "Apply critical thinking processes, problem-solving abilities and effective communication to evaluate and administer nursing care delivered to patients within the healthcare system",
      "Critically review the roles, functions and the scope of practice of a nurse in mental health settings",
      "Demonstrate leadership within a multidisciplinary healthcare team responsible for delivering excellent therapeutic treatment to patients in mental health settings",
      "Perform an assessment of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, evaluate and use evidence-based nursing strategies while caring for clients in mental health settings"
    ],
    "settings": [
      "Inpatient mental health",
      "Community mental health teams",
      "Consultation-liaison"
    ],
    "accent": "#8E3A12",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-mental-health-nursing/",
    "image": "/images/micro-credentials/mental-health-nursing.webp"
  },
  {
    "slug": "gerontology-nursing",
    "title": "Gerontology Nursing",
    "short": "Gerontology",
    "area": "ageing-chronic",
    "unitCode": "N8016",
    "unitName": "Gerontology Nursing",
    "reflectionCode": "N8017",
    "reflectionName": "Professional Reflection in Gerontology Nursing",
    "tagline": "Dignity, expertise and leadership for later life.",
    "forWho": "Registered nurses in aged care, rehabilitation and community settings caring for older people.",
    "overview": [
      "Older people form a growing proportion of every community. This specialty expands your skills in chronic conditions, dementia and end-of-life care for people with complex needs as they age.",
      "It strengthens evidence-based, safe, ethical and professional practice that meets regulatory expectations, and helps you develop leadership while exploring the biological, psychological and social dimensions of ageing."
    ],
    "topics": [
      "Chronic conditions in older people",
      "Dementia care",
      "End-of-life care for ageing populations",
      "Scientific, psychological and social aspects of ageing",
      "Leadership and regulatory practice in aged care"
    ],
    "learningFocus": [
      "Apply critical thinking processes, problem-solving abilities and effective communication to the evaluation and administration of nursing care delivered to elderly patients within healthcare systems",
      "Critically review the roles, functions and the scope of practice of the geriatric nurse in aged care settings",
      "Demonstrate leadership within a multidisciplinary healthcare team responsible for delivering excellent therapeutic treatment to patients in aged care settings",
      "Perform an assessment of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, evaluate and use evidence-based nursing strategies while caring for clients in gerontology settings"
    ],
    "settings": [
      "Residential aged care",
      "Geriatric and rehab wards",
      "Home and community care"
    ],
    "accent": "#B7651C",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-gerontology-nursing/",
    "image": "/images/micro-credentials/gerontology-nursing.webp"
  },
  {
    "slug": "orthopaedic-nursing",
    "title": "Orthopaedic Nursing",
    "short": "Orthopaedic",
    "area": "critical-acute",
    "unitCode": "N8018",
    "unitName": "Orthopaedics Nursing",
    "reflectionCode": "N8019",
    "reflectionName": "Professional Reflection in Orthopaedics Nursing",
    "tagline": "From trauma to recovery, every movement matters.",
    "forWho": "Registered nurses in orthopaedic, trauma, rehabilitation and community settings.",
    "overview": [
      "Orthopaedic nursing focuses on preventing and treating musculoskeletal disorders and associated traumatic conditions. This specialty explores the impact of acute and chronic illness and the range of musculoskeletal dysfunction associated with trauma.",
      "It emphasises assessment and management strategies across adult and paediatric settings, using case studies, multimedia and discussion forums in a virtual classroom."
    ],
    "topics": [
      "Prevention and treatment of musculoskeletal disorders",
      "Musculoskeletal dysfunction associated with trauma",
      "Impact of acute and chronic illness",
      "Assessment and management in adult and paediatric settings",
      "Evidence-based orthopaedic nursing"
    ],
    "learningFocus": [
      "Apply critical thinking processes, problem-solving abilities and effective communication to the evaluation and administration of nursing care delivered to patients within healthcare settings",
      "Critically review the roles, functions and the scope of practice",
      "Demonstrate leadership within a multidisciplinary healthcare team responsible for delivering excellent therapeutic treatment to patients",
      "Perform an assessment of the legal, ethical, social, cultural and political issues that influence the delivery of person-centred healthcare",
      "Recognise, evaluate and use evidence-based nursing strategies while caring for clients"
    ],
    "settings": [
      "Orthopaedic wards",
      "Trauma units",
      "Rehabilitation"
    ],
    "accent": "#C0501A",
    "sourcePath": "/courses/graduate-certificate-in-advanced-nursing-orthopaedics-nursing/",
    "image": "/images/micro-credentials/orthopaedic-nursing.webp"
  },
  {
    "slug": "diabetes-nursing",
    "title": "Diabetes Nursing",
    "short": "Diabetes",
    "area": "ageing-chronic",
    "unitCode": "N8020",
    "unitName": "Diabetes Nursing",
    "reflectionCode": "N8021",
    "reflectionName": "Professional Reflection in Diabetes Nursing",
    "tagline": "Partnering with people to live well, every day.",
    "forWho": "Registered nurses supporting people with diabetes, from children to older adults.",
    "overview": [
      "Diabetes nurses are central to good patient care and to helping people manage their own condition. This specialty offers a systematic introduction to the fundamentals of diabetes nursing across healthcare settings.",
      "You will examine the causes, risk factors, pathophysiology, symptoms, therapies, interprofessional care, psychosocial support and nursing care of people with type 1 and type 2 diabetes, and their families and carers, through a person-centred lens."
    ],
    "topics": [
      "Causes, risk factors and pathophysiology of type 1 and type 2 diabetes",
      "Therapies and interprofessional care",
      "Psychosocial support for people, families and carers",
      "Self-care management and education",
      "Diabetes care across acute, chronic, aged care, disability and rehabilitation settings"
    ],
    "learningFocus": [
      "Critically review the principles and scope of diabetes nursing in different healthcare settings",
      "Identify the causes, risk factors, pathophysiology, manifestations, complications, interprofessional care and nursing care of diabetes (type 1 and 2) in the adult client",
      "Explore and implement an evidence-based and person-centred care approach to nursing assessments and management related to type 1 and 2 diabetes",
      "Critically examine the importance of the person-centred care approach to the needs of individuals and families in acute, chronic, aged care and rehabilitation settings"
    ],
    "settings": [
      "Endocrine and diabetes services",
      "Primary care",
      "Aged and disability care"
    ],
    "accent": "#D46F1F",
    "sourcePath": "/courses/diabetes-nursing/",
    "image": "/images/micro-credentials/diabetes-nursing.webp"
  },
  {
    "slug": "palliative-care-nursing",
    "title": "Palliative Care Nursing",
    "short": "Palliative Care",
    "area": "ageing-chronic",
    "unitCode": "N8022",
    "unitName": "Palliative Care Nursing",
    "reflectionCode": "N8023",
    "reflectionName": "Professional Reflection in Palliative Care Nursing",
    "tagline": "Comfort, dignity and courage at the end of life.",
    "forWho": "Registered nurses caring for people with life-limiting conditions and their families.",
    "overview": [
      "Nurses spend more time with people at the end of their lives than any other professional, and are uniquely placed to shape how palliative care is delivered. This specialty provides a systematic introduction to palliative care nursing concepts.",
      "Its person-centred approach supports safe, assured care in acute and palliative care units, haematology and oncology services, and aged care and community settings, using simulated case studies to build clinical reasoning."
    ],
    "topics": [
      "Palliative care nursing concepts",
      "Person-centred end-of-life care",
      "Caring for families through loss",
      "Palliative care across acute, oncology, aged and community settings",
      "Clinical reasoning through simulated case studies"
    ],
    "learningFocus": [],
    "settings": [
      "Palliative care units",
      "Oncology and haematology",
      "Community and aged care"
    ],
    "accent": "#9C4614",
    "sourcePath": "/courses/palliative-care-nursing/",
    "image": "/images/micro-credentials/palliative-care-nursing.webp"
  },
  {
    "slug": "perioperative-nursing",
    "title": "Perioperative Nursing",
    "short": "Perioperative",
    "area": "critical-acute",
    "unitCode": "N8024",
    "unitName": "Perioperative Care Nursing",
    "reflectionCode": "N8025",
    "reflectionName": "Professional Reflection in Perioperative Care Nursing",
    "tagline": "An advocate in the room, before, during and after.",
    "forWho": "Registered nurses in operating theatres, day surgery, endoscopy and recovery.",
    "overview": [
      "Perioperative nurses care for people having operative and other invasive procedures, planning, implementing and evaluating care alongside patients, families and the surgical team.",
      "This specialty is a structured introduction to perioperative principles, with a person-centred focus on advocacy, assurance, quality and safety for people who may be unable to speak for themselves during surgery."
    ],
    "topics": [
      "Principles and scope of perioperative nursing",
      "Care before, during and after surgical and invasive procedures",
      "Advocacy for patients unable to communicate",
      "Team approaches in the operating environment",
      "Ethico-legal and culturally safe perioperative care"
    ],
    "learningFocus": [
      "Critically review the principles, scope and components of perioperative nursing in terms of nursing intervention and management in different healthcare settings",
      "Explore and implement an evidence-based and person-centred care approach to nursing assessments and interventions related to clients before, during and after surgery",
      "Critically discuss aspects of a team approach in meeting a client’s specific immediate individual person-centred needs before, during and after surgery",
      "Critically examine the importance of the person-centred care approach to ethico-legal needs in an operative setting, being conscious of the individual needs of clients from various cultural groups including Aboriginal and Torres Strait Islander peoples"
    ],
    "settings": [
      "Operating theatres",
      "Day surgery centres",
      "Endoscopy suites"
    ],
    "accent": "#B44A10",
    "sourcePath": "/courses/perioperative-nursing/",
    "image": "/images/micro-credentials/perioperative-nursing.webp"
  },
  {
    "slug": "renal-nursing",
    "title": "Renal Nursing",
    "short": "Renal",
    "area": "ageing-chronic",
    "unitCode": "N8026",
    "unitName": "Renal Nursing",
    "reflectionCode": "N8027",
    "reflectionName": "Professional Reflection in Renal Nursing",
    "tagline": "Long relationships, careful science.",
    "forWho": "Registered nurses in dialysis, transplant, nephrology and chronic kidney disease care.",
    "overview": [
      "Renal nurses treat people with kidney disease and educate patients and families about treatment, taking on responsibilities from clinical care to administration. This specialty is a systematic introduction to renal nursing concepts.",
      "It examines person-centred care across acute, chronic, rehabilitative and residential settings, including culturally appropriate care for people from diverse communities, particularly Aboriginal and Torres Strait Islander peoples."
    ],
    "topics": [
      "Origins, risk factors and pathophysiology of renal disease",
      "Dialysis and transplantation management",
      "Patient and family education",
      "Culturally safe care, including for Aboriginal and Torres Strait Islander peoples",
      "Renal care across acute, chronic and rehabilitation settings"
    ],
    "learningFocus": [
      "Conduct a critical examination of the concepts and scope of renal nursing practice in a variety of healthcare settings",
      "Determine the origins, risk factors, pathophysiology, symptoms, consequences, interprofessional care and nursing care for clients with renal disease",
      "Investigate and implement an evidence-based and person-centred care strategy to nursing evaluations and interventions involving renal illnesses and conditions, transplantation and dialysis management"
    ],
    "settings": [
      "Dialysis units",
      "Nephrology wards",
      "Transplant services"
    ],
    "accent": "#C76420",
    "sourcePath": "/courses/renal-nursing/",
    "image": "/images/micro-credentials/renal-nursing.webp"
  }
]

export const mcCourse = (slug: string) => MC_COURSES.find((c) => c.slug === slug)
export const mcArea = (id: McAreaId) => MC_AREAS.find((a) => a.id === id)
export const mcPath = (slug: string) => `/micro-credentials/${slug}/`

/** "At a glance" on every specialty page (unit fields are added per course). */
export const MC_GLANCE = [
  ['Parent award', 'Graduate Certificate in Advanced Nursing'],
  ['Credential type', 'Proposed non-award micro-credential'],
  ['Duration', '7 weeks (orientation week + 6 class weeks)'],
  ['Delivery', 'Fully online, 12 credit points at AQF Level 8'],
  ['Fees', '$3,000 per unit ($250 per credit point)'],
  ['Next intake', '8 March 2027, then July and November'],
  ['Who can enrol', 'Domestic students and eligible non-student visa holders (proposed)'],
] as const

export const MC_DELIVERY = [
  ['Duration', '7 weeks: an orientation week and 6 class weeks'],
  ['Learning hours', '2 lectures and 2 tutorials each week (Weeks 2–7)'],
  ['Delivery mode', 'Fully online'],
] as const

export const MC_WHY = [
  ['Shaped around shift work', 'Study a focused unit rather than a full award, so learning fits between nights, weekends and family life.'],
  ['Compassion at the centre', 'Every specialty is framed by person-centred, culturally safe care, reflecting IHM’s commitment to caring with passion.'],
  ['Evidence you can use on Monday', 'Clinical reasoning and evidence-based specialist knowledge connected directly to the practice you already do.'],
  ['A door, not a dead end', 'Designed as the same unit taught in the Graduate Certificate, with a proposed credit pathway if you choose to keep going.'],
] as const

export const MC_STEPS = [
  ['Choose a specialty', 'Pick from twelve nursing specialties drawn from the official GCAN catalogue.'],
  ['Check eligibility', 'Review the parent-course reference requirements and confirm standalone admission with IHM.'],
  ['Study the unit online', 'Learn the specialty unit content online in a seven-week block, with intakes in March, July and November and the same assessments as award students.'],
  ['Keep going, if you like', 'Proposed credit into the Graduate Certificate in Advanced Nursing, subject to IHM policy.'],
] as const

export const MC_TODAY = [
  'The twelve specialty units and their codes, from the official GCAN Units of Study tables',
  'Specialty overviews and published topic themes from official IHM course pages',
  'Parent-course admission and English requirements, as reference information',
  'The parent Graduate Certificate is delivered online and TEQSA accredited at AQF Level 8',
] as const

export const MC_APPLY_STEPS = [
  ['Choose your specialty', 'Explore the twelve specialty pages and pick the one closest to your practice.'],
  ['Check the requirements', 'Review this page, including parent-course reference criteria and residency rules.'],
  ['Talk to IHM', 'Contact IHM to confirm availability, dates, fees and clinical access for your specialty.'],
  ['Prepare your documents', 'Typically qualifications, registration and identity evidence. IHM will confirm what is required.'],
  ['Apply when confirmed', 'Only after IHM confirms the micro-credential is open, follow their guidance to the official portal.'],
] as const

export const MC_ENGLISH = [
  ['IELTS Academic', 'Overall 6.5, no band below 6'],
  ['PTE Academic', 'Overall 59, no band below 52'],
  ['OET (nursing)', 'Minimum C+ in each component'],
  ['English for Academic Purposes', 'Minimum 70%'],
] as const

export const MC_PARTNER_PROPS = [
  ['Partner nomination', 'Nominate staff into a specialty aligned with your workforce plan. IHM admits each learner individually against the published eligibility rules.'],
  ['Roster-aware cohorts', 'Closed cohorts timetabled around rosters, with a named IHM academic liaison. Minimum cohort size is to be confirmed.'],
  ['Partner rate and invoicing', 'Options proposed include a partner rate, a single invoice to your organisation, or employee-paid with reimbursement. Rates are to be confirmed.'],
  ['Progress reporting', 'A partner progress report each study period covering enrolment, progression and completion, respecting student privacy.'],
  ['Co-design and endorsement', 'Partners may co-design future micro-credentials or endorse existing ones, with endorsement stated on the relevant page.'],
  ['Pathway to the award', 'Completers can be supported toward the parent award, with credit assessed under IHM policy, strengthening succession and retention.'],
] as const

export const MC_FAQS = [
  ['What is an IHM micro-credential?', 'In this proposal, a micro-credential is one specialty unit from the Graduate Certificate in Advanced Nursing, offered as a standalone, non-award enrolment. It is not an AQF qualification, and it does not lead to registration, endorsement or a specialist title. Standalone enrolment is subject to IHM approval.'],
  ['How long does it take, and how much does it cost?', 'Each micro-credential is one 12-credit-point unit studied fully online over a seven-week block (an orientation week and six class weeks), with intakes in March, July and November. The unit-based fee is $3,000 ($250 per credit point). The duration and fees published on the official Graduate Certificate pages apply to the whole award, not to a single unit.'],
  ['Will it count toward the Graduate Certificate in Advanced Nursing?', 'That is the intention of the proposal: the micro-credential is the same unit as in the award, so credit into the parent course is expected to be assessed under the IHM Credit and Recognition of Prior Learning Policy. Full credit into the Graduate Certificate applies if you enrol in the award within 24 months. Credit toward other courses or institutions, including ASU, is not guaranteed.'],
  ['Can international students on a student visa enrol?', 'No. Under the proposed model, micro-credentials are open to domestic students and eligible non-student visa holders only. They are not CRICOS registered and cannot be used to support a student visa.'],
  ['Does it count toward my CPD hours?', 'Completing a micro-credential provides formal tertiary study that may be recorded toward the Nursing and Midwifery Board of Australia CPD requirement, where it is relevant to your context of practice. You remain responsible for your own CPD records.'],
  ['Do I need to be working in the specialty while I study?', 'Clinical access expectations vary between specialties and have not yet been confirmed for standalone enrolment. Please ask IHM admissions about the clinical access requirements relevant to the specialty you are interested in before applying.'],
  ['Can I apply now?', 'Not yet as a standalone micro-credential. You can register your interest through the IHM contact page. The official application portal currently handles IHM award courses; please confirm with IHM that a micro-credential is available before starting an application.'],
] as const
