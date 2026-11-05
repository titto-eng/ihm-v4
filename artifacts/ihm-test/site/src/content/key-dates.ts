// /key-dates/ — WordPress page "Key Dates": intake dates per year and the 2026 campus/intake table. Edit here each year:
// add the new year at the end of KEY_DATES (the page opens on the latest year).
export type KeyDateYear = { year: string; campus: string[][] | null; intakes: { name: string; rows: [string, string][] }[] }

export const KEY_DATES: KeyDateYear[] = [
 {
  "year": "2024",
  "campus": null,
  "intakes": [
   {
    "name": "March Intake (Intake 1)",
    "rows": [
     [
      "Orientation Week",
      "04/03/2024 – 08/03/2024"
     ],
     [
      "Theory Start Date",
      "11/03/2024"
     ],
     [
      "Theory End Date",
      "14/06/2024"
     ],
     [
      "Enrolment End Date",
      "18/03/2024"
     ],
     [
      "Census Date",
      "22/03/2024"
     ],
     [
      "Mid-Term Break",
      "17/06/2024 – 05/07/2024"
     ],
     [
      "Semester Break",
      "22/04/2024 – 03/05/2024"
     ],
     [
      "Semester Outcome Date",
      "05/07/2024"
     ]
    ]
   },
   {
    "name": "May Intake (Intake 2)",
    "rows": [
     [
      "Orientation Week",
      "06/05/2024 – 10/05/2024"
     ],
     [
      "Theory Start Date",
      "13/05/2024"
     ],
     [
      "Theory End Date",
      "11/10/2024"
     ],
     [
      "Enrolment End Date",
      "10/05/2024"
     ],
     [
      "Census Date",
      "31/05/2024"
     ],
     [
      "Mid-Term Break",
      "19/08/2024 – 30/08/2024"
     ],
     [
      "Semester Break",
      "14/10/2024- 08/11/2024"
     ],
     [
      "Semester Outcome Date",
      "08/11/2024"
     ]
    ]
   },
   {
    "name": "July Intake (Intake 3)",
    "rows": [
     [
      "Orientation Week",
      "01/07/2024 – 05/07/2024"
     ],
     [
      "Theory Start Date",
      "08/07/2024"
     ],
     [
      "Theory End Date",
      "11/10/2024"
     ],
     [
      "Enrolment End Date",
      "19/07/2024"
     ],
     [
      "Census Date",
      "13/08/2024"
     ],
     [
      "Mid-Term Break",
      "19/08/2024 – 30/08/2024"
     ],
     [
      "Semester Break",
      "14/10/2024 – 07/02/2025"
     ],
     [
      "Semester Outcome Date",
      "08/11/2024"
     ]
    ]
   },
   {
    "name": "September Intake (Intake 4)",
    "rows": [
     [
      "Orientation Week",
      "02/09/2024 – 06/09/2024"
     ],
     [
      "Theory Start Date",
      "09/09/2024"
     ],
     [
      "Theory End Date",
      "07/02/2025"
     ],
     [
      "Enrolment End Date",
      "13/09/2024"
     ],
     [
      "Census Date",
      "30/09/2024"
     ],
     [
      "Mid-Term Break",
      "21/10/2024 – 01/11/2024"
     ],
     [
      "Semester Break",
      "23/12/2024 – 03/01/2025"
     ],
     [
      "Semester Outcome Date",
      "07/03/2025"
     ]
    ]
   },
   {
    "name": "November Intake (Intake 5)",
    "rows": [
     [
      "Orientation Week",
      "04/11/2024 – 08/11/2024"
     ],
     [
      "Theory Start Date",
      "11/11/2024"
     ],
     [
      "Theory End Date",
      "14/02/2025"
     ],
     [
      "Enrolment End Date",
      "15/11/2024"
     ],
     [
      "Census Date",
      "02/12/2024"
     ],
     [
      "Mid-Term Break",
      "23/12/2024 – 03/01/2025"
     ],
     [
      "Semester Break",
      "17/02/2025 – 09/05/2025"
     ],
     [
      "Semester Outcome Date",
      "14/03/2025"
     ]
    ]
   },
   {
    "name": "December Intake (Intake 6)",
    "rows": [
     [
      "Orientation Week",
      "16/12/2024 – 20/12/2024"
     ],
     [
      "Theory Start Date",
      "06/01/2025"
     ],
     [
      "Theory End Date",
      "11/04/2025"
     ],
     [
      "Enrolment End Date",
      "20/12/2024"
     ],
     [
      "Census Date",
      "13/01/2025"
     ],
     [
      "Christmas Break",
      "23/12/2024 – 03/01/2025"
     ],
     [
      "Mid-Term Break",
      "17/02/2025 - 28/02/2025"
     ],
     [
      "Semester Break",
      "14/04/2025 – 08/08/2025"
     ],
     [
      "Semester Outcome Date",
      "09/05/2025"
     ]
    ]
   }
  ]
 },
 {
  "year": "2025",
  "campus": null,
  "intakes": [
   {
    "name": "February Intake (Intake 1)",
    "rows": [
     [
      "Orientation Week",
      "0/02/2025– 07/02/2025"
     ],
     [
      "Theory Start Date",
      "10/02/2025"
     ],
     [
      "Theory End Date",
      "16/05/2025"
     ],
     [
      "Enrolment End Date",
      "14/02/2025"
     ],
     [
      "Census Date",
      "03/03/2025"
     ],
     [
      "Mid-Term Break",
      "24/03/2025 – 04/04/2025"
     ],
     [
      "Semester Break",
      "19/05/2025 – 08/08/2025"
     ],
     [
      "Semester Outcome Date",
      "13/06/2025"
     ]
    ]
   },
   {
    "name": "May Intake (Intake 2)",
    "rows": [
     [
      "Orientation Week",
      "05/05/2025– 09/05/2025"
     ],
     [
      "Theory Start Date",
      "12/05/2025"
     ],
     [
      "Theory End Date",
      "15/08/2025"
     ],
     [
      "Enrolment End Date",
      "16/05/2025"
     ],
     [
      "Census Date",
      "05/06/2025"
     ],
     [
      "Mid-Term Break",
      "23/06/2025 – 04/07/2025"
     ],
     [
      "Semester Break",
      "18/08/2025 – 07/11/2025"
     ],
     [
      "Semester Outcome Date",
      "12/09/2025"
     ]
    ]
   },
   {
    "name": "August Intake (Intake 3)",
    "rows": [
     [
      "Orientation Week",
      "04/08/2025-08/08/2025"
     ],
     [
      "Theory Start Date",
      "11/08/2025"
     ],
     [
      "Theory End Date",
      "14/11/2025"
     ],
     [
      "Enrolment End Date",
      "15/08/2025"
     ],
     [
      "Census Date",
      "04/09/2025"
     ],
     [
      "Mid-Term Break",
      "22/09/2025 – 03/10/2025"
     ],
     [
      "Semester Break",
      "17/11/2025 – 06/03/2026"
     ],
     [
      "Semester Outcome Date",
      "12/12/2025"
     ]
    ]
   },
   {
    "name": "November Intake (Intake 4)",
    "rows": [
     [
      "Orientation Week",
      "03/11/2025-07/11/2025"
     ],
     [
      "Theory Start Date",
      "10/11/2025"
     ],
     [
      "Theory End Date",
      "13/02/2026"
     ],
     [
      "Enrolment End Date",
      "14/11/2025"
     ],
     [
      "Census Date",
      "04/12/2025"
     ],
     [
      "Mid-Term Break",
      "22/12/2025 – 02/01/2026"
     ],
     [
      "Semester Break",
      "16/02/2026 – 06/03/2026"
     ],
     [
      "Semester Outcome Date",
      "13/03/2026"
     ]
    ]
   }
  ]
 },
 {
  "year": "2026",
  "campus": [
   [
    "Intake / Campus",
    "Sydney",
    "Brisbane",
    "Melbourne",
    "Perth",
    "Online Courses"
   ],
   [
    "January",
    "MN",
    "MN",
    "GCAN-ANP",
    "—",
    "MN(O) GCAN"
   ],
   [
    "March",
    "—",
    "—",
    "GCAN-ANP BSW MN",
    "MN",
    "MN(O) GCAN"
   ],
   [
    "May",
    "MN",
    "MN",
    "GCAN-ANP",
    "—",
    "MN(O) GCAN"
   ],
   [
    "July",
    "—",
    "—",
    "BSW MN GCAN-ANP",
    "MN",
    "MN(O) GCAN"
   ],
   [
    "September",
    "MN",
    "MN",
    "GCAN-ANP",
    "—",
    "MN(O) GCAN"
   ],
   [
    "November",
    "—",
    "—",
    "BSW MN GCAN-ANP",
    "MN",
    "MN(O) GCAN"
   ]
  ],
  "intakes": [
   {
    "name": "January Intake (Intake 1)",
    "rows": [
     [
      "Orientation Week",
      "05/01/2026 - 09/01/2026"
     ],
     [
      "Theory Start Date",
      "12/01/2026"
     ],
     [
      "Theory End Date",
      "10/04/2026"
     ],
     [
      "Enrolment End Date",
      "16/01/2026"
     ],
     [
      "Census Date",
      "02/02/2026"
     ],
     [
      "Mid-Term Break",
      "23/02/2026 - 27/02/2026"
     ],
     [
      "Semester Break",
      "13/04/2026 - 08/05/2026"
     ],
     [
      "Semester Outcome Date",
      "04/05/2026"
     ]
    ]
   },
   {
    "name": "March Intake (Intake 2)",
    "rows": [
     [
      "Orientation Week",
      "02/03/2026 - 06/03/2026"
     ],
     [
      "Theory Start Date",
      "09/03/2026"
     ],
     [
      "Theory End Date",
      "05/06/2026"
     ],
     [
      "Enrolment End Date",
      "13/03/2026"
     ],
     [
      "Census Date",
      "01/04/2026"
     ],
     [
      "Mid-Term Break",
      "20/04/2026 - 24/04/2026"
     ],
     [
      "Semester Break",
      "08/06/2026 - 10/07/2026"
     ],
     [
      "Semester Outcome Date",
      "06/07/2026"
     ]
    ]
   },
   {
    "name": "May Intake (Intake 3)",
    "rows": [
     [
      "Orientation Week",
      "04/05/2026 - 08/05/2026"
     ],
     [
      "Theory Start Date",
      "11/05/2026"
     ],
     [
      "Theory End Date",
      "07/08/2026"
     ],
     [
      "Enrolment End Date",
      "15/05/2026"
     ],
     [
      "Census Date",
      "03/06/2026"
     ],
     [
      "Mid-Term Break",
      "22/06/2026 - 26/06/2026"
     ],
     [
      "Semester Break",
      "10/08/2026 - 08/01/2027"
     ],
     [
      "Semester Outcome Date",
      "07/09/2026"
     ]
    ]
   },
   {
    "name": "July Intake (Intake 4)",
    "rows": [
     [
      "Orientation Week",
      "06/07/2026 - 10/07/2026"
     ],
     [
      "Theory Start Date",
      "13/07/2026"
     ],
     [
      "Theory End Date",
      "09/10/2026"
     ],
     [
      "Enrolment End Date",
      "17/07/2026"
     ],
     [
      "Census Date",
      "05/08/2026"
     ],
     [
      "Mid-Term Break",
      "24/08/2026 - 28/08/2026"
     ],
     [
      "Semester Break",
      "12/10/2026 - 05/03/2027"
     ],
     [
      "Semester Outcome Date",
      "09/11/2026"
     ]
    ]
   },
   {
    "name": "September Intake (Intake 5)",
    "rows": [
     [
      "Orientation Week",
      "07/09/2026 - 11/09/2026"
     ],
     [
      "Theory Start Date",
      "14/09/2026"
     ],
     [
      "Theory End Date",
      "11/12/2026"
     ],
     [
      "Enrolment End Date",
      "18/09/2026"
     ],
     [
      "Census Date",
      "05/10/2026"
     ],
     [
      "Mid-Term Break",
      "26/10/2026 - 30/10/2026"
     ],
     [
      "Semester Break",
      "14/12/2026 - 08/01/2027"
     ],
     [
      "Semester Outcome Date",
      "04/01/2027"
     ]
    ]
   },
   {
    "name": "November Intake (Intake 6)",
    "rows": [
     [
      "Orientation Week",
      "02/11/2026 - 06/11/2026"
     ],
     [
      "Theory Start Date",
      "09/11/2026"
     ],
     [
      "Theory End Date",
      "05/02/2027"
     ],
     [
      "Enrolment End Date",
      "13/11/2026"
     ],
     [
      "Census Date",
      "30/11/2026"
     ],
     [
      "Mid-Term Break",
      "24/12/2026 - 01/01/2027"
     ],
     [
      "Semester Break",
      "08/02/2027 - 05/03/2027"
     ],
     [
      "Semester Outcome Date",
      "01/03/2027"
     ]
    ]
   }
  ]
 }
]

export const KEY_DATES_LEGEND: [string, string][] = [
  ['MN', 'Master of Nursing'],
  ['MN(O)', 'Master of Nursing (Online)'],
  ['GCAN', 'Graduate Certificate in Advanced Nursing'],
  ['GCAN-ANP', 'Graduate Certificate in Advanced Nursing – Australian Nursing Practice'],
  ['BSW', 'Bachelor of Social Work'],
]
