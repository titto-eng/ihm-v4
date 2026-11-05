// Cultural workshops and events (WordPress template-student-aboriginal-workshops.php and template-staff-aboriginal-workshops.php,
// inline `data` arrays, synced 2026-10-30). Images: public/images/cultural-events/. Add a new event at the top of its list.
export type CulturalEvent = { id: number; title: string; category: 'Workshop' | 'Seminar' | 'Event'; year: string; date: string; time?: string; venue: string; ledBy: string; body: string[]; agenda: string; status: 'open' | 'closed'; images: string[]; creditLabel?: string }

export const STUDENT_EVENTS: CulturalEvent[] = [
  {
    "id": 101,
    "title": "IHM Perth First Nations Cultural Awareness Workshop",
    "category": "Workshop",
    "year": "2025",
    "date": "15 December 2025",
    "venue": "IHM Perth Campus",
    "ledBy": "Kristi Lee Latimore",
    "body": [
      "IHM Perth recently hosted a First Nations Cultural Awareness Workshop for Master of Nursing students, conducted on 15 December 2025. The workshop, held at IHM’s Perth campus, was led by guest lecturer Kristi Lee Latimore and titled “Introduction to First Nations Cultural Awareness.”",
      "The session encouraged open dialogue, challenged stereotypes, and supported culturally safe practice in line with Australian Nursing and Midwifery standards. Student feedback highlighted the insightful content and the safe, respectful learning environment."
    ],
    "agenda": "Introduction to First Nations Cultural Awareness, focusing on open dialogue, challenging stereotypes, and promoting culturally safe nursing practice.",
    "status": "closed",
    "images": [
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop1.webp",
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop2.webp",
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop3.webp",
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop4.webp",
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop5.webp",
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop6.webp",
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop7.webp",
      "/images/cultural-events/cultural-workshops/ihm-perth-first-nations-cultural-awareness-workshop8.webp"
    ]
  },
  {
    "id": 102,
    "title": "Wayapa Wuurrk Workshop Connects Wellbeing, Culture and Country",
    "category": "Workshop",
    "year": "2026",
    "date": "11 August 2026",
    "venue": "IHM North Melbourne Campus",
    "ledBy": "Prof. Maria Mackay",
    "body": [
      "IHM North Melbourne Campus welcomed Prof. Maria Mackay for a meaningful Wayapa Wuurrk Workshop with Nursing students and staff on 11 August 2026.",
      "Through storytelling, mindfulness, breath and gentle movement, participants explored Aboriginal perspectives on wellbeing and the connection between Country, culture and community. The session also encouraged students to reflect on cultural awareness and culturally responsive practice in their future healthcare careers."
    ],
    "agenda": "An introduction to Wayapa Wuurrk through storytelling, mindfulness, breath and gentle movement, exploring holistic wellbeing, connection to Country and culturally responsive healthcare practice.",
    "status": "closed",
    "images": [
      "/images/cultural-events/wayapa-wuurrk-workshop/1-3.webp",
      "/images/cultural-events/wayapa-wuurrk-workshop/3-1.webp",
      "/images/cultural-events/wayapa-wuurrk-workshop/4-1.webp",
      "/images/cultural-events/wayapa-wuurrk-workshop/6-1.webp",
      "/images/cultural-events/wayapa-wuurrk-workshop/8-1.webp"
    ]
  },
  {
    "id": 103,
    "title": "Learning Beyond the Classroom",
    "category": "Workshop",
    "year": "2026",
    "date": "11 August 2026",
    "venue": "IHM Melbourne Campus",
    "ledBy": "Prof. Maria Mackay and Ashlee Williams Barnes",
    "body": [
      "Bachelor of Social Work students at IHM Melbourne participated in a meaningful Wayapa Wuurrk Workshop led by Prof. Maria Mackay and Ashlee Williams Barnes on 11 August 2026.",
      "Through shared teachings and discussion, students explored Indigenous perspectives on culture, connection and respect, gaining valuable insights into culturally responsive social work practice and their future roles as social workers."
    ],
    "agenda": "An engaging Wayapa Wuurrk session exploring Indigenous knowledge and perspectives on culture, connection, respect and culturally responsive social work practice.",
    "status": "closed",
    "images": [
      "/images/cultural-events/learning-beyond-the-classroom/img-0477.webp",
      "/images/cultural-events/learning-beyond-the-classroom/img-0487.webp",
      "/images/cultural-events/learning-beyond-the-classroom/img-0490.webp",
      "/images/cultural-events/learning-beyond-the-classroom/img-0494.webp",
      "/images/cultural-events/learning-beyond-the-classroom/img-0506.webp",
      "/images/cultural-events/learning-beyond-the-classroom/img-0518.webp",
      "/images/cultural-events/learning-beyond-the-classroom/img-0528.webp"
    ]
  },
  {
    "id": 104,
    "title": "National Reconciliation Week at IHM Sydney Campus",
    "category": "Event",
    "year": "",
    "date": "27 May",
    "venue": "IHM Sydney Campus",
    "ledBy": "Mr Trent Kelly, Koori Kinnections",
    "body": [
      "IHM Sydney Campus marked National Reconciliation Week with engaging cultural learning sessions for students and staff on 27 May.",
      "Facilitated by Mr Trent Kelly, a proud Yuin and Wailwan man from Koori Kinnections, the sessions included Aboriginal Cultural Awareness and Contemporary Art – Stone Painting. Participants explored Aboriginal culture, history and beliefs while reflecting on reconciliation and Australia’s shared histories, cultures, values and achievements."
    ],
    "agenda": "Aboriginal Cultural Awareness and Contemporary Art – Stone Painting activities focused on Aboriginal culture, history, reconciliation and shared learning.",
    "status": "closed",
    "images": [
      "/images/cultural-events/national-reconciliation-week-at-ihm-sydney-campus/syd-nrw-feature.webp",
      "/images/cultural-events/national-reconciliation-week-at-ihm-sydney-campus/image-l2.webp",
      "/images/cultural-events/national-reconciliation-week-at-ihm-sydney-campus/image-l3.webp",
      "/images/cultural-events/national-reconciliation-week-at-ihm-sydney-campus/image-l4.webp",
      "/images/cultural-events/national-reconciliation-week-at-ihm-sydney-campus/image-l7.webp"
    ]
  },
  {
    "id": 105,
    "title": "NAIDOC Week 2025 Celebration at IHM Perth Campus",
    "category": "Event",
    "year": "2025",
    "date": "NAIDOC Week 2025",
    "venue": "IHM Perth Campus",
    "ledBy": "Dr Nicole S H Chen and Perth Campus staff",
    "body": [
      "IHM Perth Campus celebrated NAIDOC Week 2025 with students and staff coming together to honour Aboriginal and Torres Strait Islander cultures, histories and achievements.",
      "The celebration included a Welcome to Country, a presentation on the theme Strength, Vision & Legacy, and a Boomerang Art Competition that encouraged creativity and cultural appreciation. More than 100 students participated, embracing the spirit of recognition, respect and unity."
    ],
    "agenda": "Welcome to Country, NAIDOC Week theme presentation and Boomerang Art Competition celebrating culture, creativity and connection.",
    "status": "closed",
    "images": [
      "/images/cultural-events/naidoc-week-2025/13-2.webp",
      "/images/cultural-events/naidoc-week-2025/4-12.webp",
      "/images/cultural-events/naidoc-week-2025/8-6.webp",
      "/images/cultural-events/naidoc-week-2025/dsc04005.webp",
      "/images/cultural-events/naidoc-week-2025/dsc04013.webp",
      "/images/cultural-events/naidoc-week-2025/dsc04031.webp",
      "/images/cultural-events/naidoc-week-2025/img-2001.webp",
      "/images/cultural-events/naidoc-week-2025/img-2017.webp",
      "/images/cultural-events/naidoc-week-2025/img-2019.webp"
    ],
    "creditLabel": "Acknowledgement"
  }
]

export const STAFF_EVENTS: CulturalEvent[] = [
  {
    "id": 101,
    "title": "Virtual Cultural Awareness Workshop",
    "category": "Workshop",
    "year": "2025",
    "date": "04 December 2025",
    "time": "2:00 PM – 5:00 PM (AEDT)",
    "venue": "Online",
    "ledBy": "Koori Kinnections",
    "body": [
      "IHM and IHNA staff recently participated in a Cultural Awareness Workshop led by Koori Kinnnections, gaining valuable insights into the history, culture, and lived experiences of Aboriginal and Torres Strait Islander peoples.",
      "The session encouraged reflection, respectful understanding, and reinforced our commitment to inclusive and culturally safe workplaces."
    ],
    "agenda": "Introduction to Aboriginal and Torres Strait Islander histories, cultures, and lived experiences; reflective and respectful discussion; and reinforcing cultural safety and inclusive workplace practices.",
    "status": "closed",
    "images": [
      "/images/cultural-events/cultural-workshops/cultural-awareness-workshop3.webp",
      "/images/cultural-events/cultural-workshops/cultural-awareness-workshop2.webp"
    ]
  }
]
