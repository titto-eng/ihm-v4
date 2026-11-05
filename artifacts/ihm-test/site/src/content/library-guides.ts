// Library guides (/library/eresources/?course=<id>): the core units of each course and their recommended readings, from the WordPress
// tables `library_courses` and `library_courses_unit_books` (template-parts/library-course-resources.php). Generated once from the
// WordPress dump (ihmedu_wp.sql, 2026-10-30); edit here. `id` is the old `?course=` value, so existing links keep working.

export type LibraryBook = { author: string; title: string; url: string }
export type LibraryUnit = { code: string; title: string; books: LibraryBook[] }
export type LibraryGuide = { id: number; slug: string; name: string; school: string; units: LibraryUnit[] }

export const LIBRARY_GUIDES: LibraryGuide[] = [
 {
  "id": 1,
  "slug": "graduate-certificate-in-nursing",
  "name": "Graduate Certificate in Nursing (Non-Specialisation)",
  "school": "School of Nursing",
  "units": [
   {
    "code": "N9001",
    "title": "Professional Issues and Policies in Nursing",
    "books": [
     {
      "author": "Waxman, K. (2013)",
      "title": "Financial and business management for the Doctor of Nursing practice. Springer",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826109484"
     },
     {
      "author": "Daly, J., & Chang, E. (2011)",
      "title": "Transitions in Nursing: Preparing for Professional Practice. Churchill Livingstone",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729580823"
     },
     {
      "author": "Goudreau, K. A., & Smolenski, M. C. (2013)",
      "title": "Health policy and advanced practice nursing: impact and implications (1st ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826169433"
     },
     {
      "author": "Chang, E., & Daly, J. (2012)",
      "title": "Transitions in Nursing - E-Book: Preparing for Professional Practice. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1722952"
     },
     {
      "author": "Hansen-Turton, T., Sherman, S., & King, E. S. (2015)",
      "title": "Nurse-led health clinics: operations, policy, and opportunities (1st ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826128034"
     },
     {
      "author": "Forrester, K., & Griffiths, D. (2010)",
      "title": "Essentials of Law for Health Professionals (3rd ed.). Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729579155"
     },
     {
      "author": "Patton MSN RN CNOR FAAN, R. (2014)",
      "title": "Nurses Making Policy. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826198914"
     },
     {
      "author": "Goudreau PhD RN ACNS-BC FAAN, K. A. (2013)",
      "title": "Health Policy and Advanced Practice Nursing. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826169433"
     }
    ]
   },
   {
    "code": "N8001",
    "title": "Australian Nursing Practice",
    "books": [
     {
      "author": "Lacey, G. (2008)",
      "title": "Reading the Land. Australian Scholarly Publishing. https://doi.org/10.3316/informit.9781740971553",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rmit_collectionsbits_10_3316_informit_9781740971553"
     },
     {
      "author": "Barraclough, S., & Gardner, H. (2007)",
      "title": "Analysing Health Policy: A Problem-Oriented Approach. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1721784"
     },
     {
      "author": "Gardner, H., & Barraclough, S. (2007)",
      "title": "Analysing Health Policy E-Book. Harcourt",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729578431"
     },
     {
      "author": "Chang, E., & Daly, J. (2012)",
      "title": "Transitions in nursing preparing for professional practice (3rd Ed.). Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729580823"
     },
     {
      "author": "Tollefson, J., & Hillman, E. (2019)",
      "title": "Clinical psychomotor skills: assessment tools for nurses, 3-Point standard assessment (Seventh edition.). Cengage Learning",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9912710106811"
     },
     {
      "author": "Cutcliffe, J. R., Fowler, J., & Hyrka's, K. (2010)",
      "title": "Routledge handbook of clinical supervision fundamental international themes. Routledge",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_informaworld_taylorfrancisbooks_9780203843437"
     },
     {
      "author": "Cutcliffe, J. R., Hyrkas, K., & Fowler, J. (2011)",
      "title": "Routledge Handbook of Clinical Supervision: Fundamental International Themes. Routledge. https://doi.org/10.4324/9780203843437",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781136912801"
     },
     {
      "author": "Tiziani, A. P. (2017)",
      "title": "Havard’s nursing guide to drugs. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729586054"
     },
     {
      "author": "Speedy, S., Daly, J., & Jackson, D. (2014)",
      "title": "Contexts of nursing: an introduction. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729581523"
     }
    ]
   },
   {
    "code": "N8004",
    "title": "Critical Care Nursing",
    "books": [
     {
      "author": "Elliott, D., Chaboyer, W., & Aitken, L. (2011)",
      "title": "ACCCN’s Critical Care Nursing. Mosby",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729580687"
     },
     {
      "author": "Elliott, D., Aitken, L., & Chaboyer, W. (2011)",
      "title": "ACCCN’s Critical Care Nursing - E-Book. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1723542"
     },
     {
      "author": "Standards for Critical Care Nursing Practice. (n.d.)",
      "title": "Canadian Association of Critical Care Nurses",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9910878506811"
     },
     {
      "author": "Critical Care Advanced Nursing Practice. (n.d.)",
      "title": "Canadian Association of Critical Care Nurses",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9910872006811"
     },
     {
      "author": "Elliott, D., Aitken, L., & Chaboyer, W. (2011)",
      "title": "ACCCN’s Critical Care Nursing - E-Book. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1723542"
     },
     {
      "author": "Keegan, L., & Drick, C. A. (2011)",
      "title": "End of life: nursing solutions for death with dignity. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826107602"
     },
     {
      "author": "Matzo, M. L., Sherman, D. W., & Martin, G. (2006)",
      "title": "Palliative Care Nursing: Quality Care to the End of Life, Third Edition. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC533769"
     },
     {
      "author": "Matzo, M., & Sherman, D. W. (2010)",
      "title": "Palliative care nursing: quality care to the end of life (3rd ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826157928"
     },
     {
      "author": "Gorman, L., & Anwar, R. (2019)",
      "title": "Neeb’s Mental Health Nursing (5th ed.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803669130"
     },
     {
      "author": "Trinder, L., & Reynolds, S. (2000)",
      "title": "Evidence-Based Practice: A Critical Appraisal. John Wiley & Sons, Incorporated",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC470342"
     },
     {
      "author": "Trinder, L. (2008)",
      "title": "Evidence-Based Practice: A Critical Appraisal (1. Aufl.). Wiley-Blackwell",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780470698433"
     },
     {
      "author": "Rowe, J., & Barnes, M. (2014)",
      "title": "Child, youth and family health: strengthening communities. Churchill Livingstone",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729581554"
     },
     {
      "author": "Fitzpatrick, J. J. (2008)",
      "title": "The Doctor of Nursing Practice and Clinical Nurse Leader. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826138286"
     },
     {
      "author": "Venes, D. (2017)",
      "title": "Taber’s Cyclopedic Medical Dictionary (23rd ed.). F. A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_statref_primary_tds57_9780803659049"
     },
     {
      "author": "Chiocca, E. M. M. (2014)",
      "title": "Advanced Pediatric Assessment, Second Edition. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826161758"
     },
     {
      "author": "Kuhn, K. ., Warren, J. ., & Leong, T.-Y. (2007)",
      "title": "MEDINFO 2007: Proceedings of the 12th World Congress on Health (Medical) Informatics. IOS Press, Incorporated",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC320323"
     }
    ]
   },
   {
    "code": "N8006",
    "title": "Acute Care Nursing",
    "books": [
     {
      "author": "Keegan, L., & Drick, C. A. (2011)",
      "title": "End of life nursing solutions for death with dignity. Springer",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826107602"
     },
     {
      "author": "Ackley, B. J., Ladwig, G. B., Swan, B. A., & Tucker, S. J. (2007)",
      "title": "Evidence-Based Nursing Care Guidelines: Medical-Surgical Interventions. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780323059336"
     },
     {
      "author": "Myers, J. L., & Gulanick, M. (2013)",
      "title": "Nursing care plans: diagnoses, interventions, and outcomes. Mosby",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780323113564"
     },
     {
      "author": "Dunning, T. (2009)",
      "title": "Care of people with diabetes: a manual of nursing practice (3rd ed.). Wiley",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_WILEYB0018344"
     },
     {
      "author": "Dealey, C. (2012)",
      "title": "The care of wounds a guide for nurses (4th ed.). Wiley-Blackwell",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781118276174"
     },
     {
      "author": "Ackley, B. J., Ladwig, G. B., Swan, B. A., & Tucker, S. J. (2007)",
      "title": "Evidence-Based Nursing Care Guidelines: Medical-Surgical Interventions. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780323059336"
     },
     {
      "author": "Keegan, L., & Drick, C. A. (2011)",
      "title": "End of life: nursing solutions for death with dignity. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826107602"
     },
     {
      "author": "Gulanick, M., & Myers, J. L. (2013)",
      "title": "Nursing Care Plans: Nursing Diagnosis and Intervention. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1746659"
     },
     {
      "author": "Doenges, M., Moorhouse, M., & Murr, A. (2019)",
      "title": "Nursing Diagnosis Manual: Planning, Individualizing, and Documenting Client Care (6th ed.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803676770"
     },
     {
      "author": "Stein, J., Harvey, R. L., Macko, R. F., Winstein, C. J., & Zorowitz, R. D. (2009)",
      "title": "Stroke recovery and rehabilitation (1st ed.). Demos Medical Publishing, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781935281054"
     }
    ]
   },
   {
    "code": "N8008",
    "title": "Emergency Nursing",
    "books": [
     {
      "author": "Proehl, J. A. (2009)",
      "title": "Emergency nursing procedures (4th ed.). Saunders",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922601406811"
     },
     {
      "author": "(7th ed.). (2007). Saunders",
      "title": "Emergency nursing core curriculum",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922600306811"
     },
     {
      "author": "Proehl, J. A. (2008)",
      "title": "Emergency Nursing Procedures. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781437725599"
     },
     {
      "author": "ENA, & Hoyt, K. S. (2007)",
      "title": "Emergency Nursing Core Curriculum. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781437726565"
     },
     {
      "author": "Ferrell, B. R., & Paice, J. A. (2019)",
      "title": "Oxford Textbook of Palliative Nursing (Fifth edition.). Oxford University Press USA - OSO",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780190862381"
     }
    ]
   },
   {
    "code": "N8010",
    "title": "Neonatal Nursing",
    "books": [
     {
      "author": "Kenner, C., Kenner, C., Altimier, L., & Boykova, M. V. (2020)",
      "title": "Comprehensive neonatal nursing care (Sixth edition.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826139146."
     },
     {
      "author": "Comprehensive Neonatal Nursing Care. (2019)",
      "title": "White Press Academics",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922609006811"
     },
     {
      "author": "Kenner, C. (2020)",
      "title": "Comprehensive Neonatal Nursing Care (6th ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826139146"
     },
     {
      "author": "Simpson, W. (2019)",
      "title": "Comprehensive Neonatal Nursing Care. White Press Academics",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781684692231"
     },
     {
      "author": "Beaulieu, M., & Bellini, S. (2016)",
      "title": "Neonatal Advanced Practice Nursing: A Case-Based Learning Approach (1st ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826194169"
     },
     {
      "author": "Bellini, S., & Beaulieu, M. (2017)",
      "title": "Neonatal advanced practice nursing: a case-based learning approach. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607606811"
     },
     {
      "author": "Boxwell, G., Petty, J., & Kaiser, L. (2020)",
      "title": "Neonatal intensive care nursing. (Third edition.). Routledge",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781351367493"
     },
     {
      "author": "Kenner, C., Altimier, L., & Boykova, M. V. (2019)",
      "title": "Comprehensive Neonatal Nursing Care, Sixth Edition. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC5890736"
     },
     {
      "author": "Boxwell (Connolly), G., Petty, J., & Kaiser, L. (2020)",
      "title": "Neonatal Intensive Care Nursing (3rd ed., Vol. 1). Routledge",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781351367493"
     },
     {
      "author": "Beaulieu, M. J., & Bellini, S. (2016)",
      "title": "Neonatal advanced practice nursing: a caase-baased leaarning approacach. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_SPCB0001720"
     },
     {
      "author": "Simpson, K. R., Creehan, P. A., O’Brien-Abel, N., Roth, C. K., & Rohan, A. J. (2021)",
      "title": "Perinatal nursing (5th ed.). Lippincott Williams & Wilkins",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Perinatal%20nursing%20(5th%20ed.)&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     }
    ]
   },
   {
    "code": "N8012",
    "title": "Paediatric Nursing",
    "books": [
     {
      "author": "Chiocca, E. M. (2015)",
      "title": "Advanced pediatric assessment (Second edition.). Springer Publishing Company, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922606806811"
     },
     {
      "author": "Hewitson, R., & Fertleman, C. (2014)",
      "title": "The hands-on guide to practical paediatrics. Wiley Blackwell",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781118463598."
     },
     {
      "author": "Chiocca, E. M. (2014)",
      "title": "Advanced pediatric assessment (2nd ed.). Springer Publishing Company, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826161758"
     },
     {
      "author": "Ellen M. Chiocca, M. (2014)",
      "title": "Study guide to accompany Advanced pediatric assessment. Springer Publishing Company, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826161789"
     },
     {
      "author": "Chiocca, E. M. M. (2014)",
      "title": "Advanced Pediatric Assessment, Second Edition. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826161758"
     },
     {
      "author": "Chiocca, E. M., & Chiocca, E. M. (2014)",
      "title": "Advanced Pediatric Assessment, Second Edition: A Case Study and Critical Thinking Review. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1887334"
     },
     {
      "author": "Chiocca, E. (2014)",
      "title": "Study Guide to Accompany Advanced Pediatric Assessment: A Case Study and Critical Thinking Review. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC3035212"
     },
     {
      "author": "Chiocca MSN APN RNC CPNP, E. (2014)",
      "title": "Study Guide to Accompany Advanced Pediatric Assessment, Second Edition. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826161772"
     },
     {
      "author": "Hewitson, R., & Fertleman, C. (2014)",
      "title": "The hands-on guide to practical paediatrics (1st ed.). WILEY",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781118463598."
     },
     {
      "author": "Beaulieu, M. J., & Bellini, S. (2016)",
      "title": "Neonatal advanced practice nursing: a caase-baased leaarning approacach. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_SPCB0001720"
     },
     {
      "author": "Estes, M. E. Z., Calleja, P., Karen Theobald, & Harvey, T. (2020)",
      "title": "Health assessment & physical examination (Third Australian and New Zealand edition.). Cengage",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9934010106811"
     },
     {
      "author": "Siddons, H., & Lancaster, S. (2004)",
      "title": "An Overview of the Use of the Child Behavior Checklist within Australia. Australian Council for Educational Research",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC242608"
     },
     {
      "author": "Doenges, M., Moorhouse, M., & Murr, A. (2019)",
      "title": "Nursing Diagnosis Manual: Planning, Individualizing, and Documenting Client Care (6th ed.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803676770"
     },
     {
      "author": "Williams, A. S., & Cowling, V. (2014)",
      "title": "Infants of Parents with Mental Illness: Developmental, Clinical, Cultural, and Personal Perspectives. Australian Academic Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rmit_primary_100113398795905"
     },
     {
      "author": "Barnes, M., & Rowe, J. (2013)",
      "title": "Child, Youth and Family Health. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1724342"
     }
    ]
   },
   {
    "code": "N8014",
    "title": "Mental Health Nursing",
    "books": [
     {
      "author": "Newell, R., & Gournay, K. (2009)",
      "title": "Mental health nursing an evidence-based approach (2nd ed.). Churchill Livingstone",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780443074516"
     },
     {
      "author": "Gorman, L. M. (2019)",
      "title": "Neeb’s mental health nursing (Fifth edition.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803669130"
     },
     {
      "author": "Clifton, A. (2018)",
      "title": "Fundamentals of mental health nursing: an essential guide for nursing and healthcare students. Wiley-Blackwell",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922608106811"
     },
     {
      "author": "Curtis, C. M., Fegley, A. B., & Tuzo, C. N. (2009)",
      "title": "Psychiatric mental health nursing success a course review applying critical thinking to test taking. F. A. Davis",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9910866706811"
     },
     {
      "author": "Trenoweth, S. (2016)",
      "title": "Promoting Recovery in Mental Health Nursing. Learning Matters",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781473965836"
     },
     {
      "author": "Estes, M. E. Z., Calleja, P., Karen Theobald, & Harvey, T. (2020)",
      "title": "Health assessment & physical examination (Third Australian and New Zealand edition.). Cengage",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9934010106811"
     },
     {
      "author": "Gorman, L., & Anwar, R. (2019)",
      "title": "Neeb’s Mental Health Nursing (5th ed.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803669130"
     },
     {
      "author": "Newell, R., & Gournay, K. (2008)",
      "title": "Mental Health Nursing: An Evidence-based Approach. Churchill Livingstone",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780702040795"
     },
     {
      "author": "Trenoweth, S. (2016)",
      "title": "Promoting Recovery in Mental Health Nursing. SAGE Publications",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781473965836"
     },
     {
      "author": "Newell, R., & Gournay, K. (2008)",
      "title": "Mental Health Nursing E-Book: An Evidence Based Approach. Elsevier Health Sciences",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780702040795"
     },
     {
      "author": "Newell, R., & Gournay, K. (2009)",
      "title": "Mental Health Nursing (2nd ed.). Elsevier Health Sciences",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780443074516"
     },
     {
      "author": "Dennison, R. D. (2012)",
      "title": "Future of Advanced Registered Nursing Practice, An Issue of Nursing Clinics. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1431206"
     },
     {
      "author": "Jackson, D., Nyamathi, A., Hayter, M., & Carter, B. (2012)",
      "title": "Advances in contemporary health care for vulnerable populations. eContent Management",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rmit_indexes_978192729287_pbk_ntemporary_community_and_family_health_c_a141661_Health_Society"
     }
    ]
   },
   {
    "code": "N8016",
    "title": "Gerontology Nursing",
    "books": [
     {
      "author": "Keegan, L., & Drick, C. A. (2011)",
      "title": "End of life: nursing solutions for death with dignity. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826107602"
     },
     {
      "author": "Doenges, M., Moorhouse, M., & Murr, A. (2019)",
      "title": "Nursing Diagnosis Manual: Planning, Individualizing, and Documenting Client Care (6th ed.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803676770"
     },
     {
      "author": "Kuiper, R., O’Donnell, S. M., Pesut, D. J., & Turrise, S. L. (2017)",
      "title": "The Essentials of Clinical Reasoning for Nurses. Sigma Theta Tau International",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC4865276"
     },
     {
      "author": "Ladwig, G. B., & Ackley, B. J. (2010)",
      "title": "Mosby’s Guide to Nursing Diagnosis. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1429619"
     },
     {
      "author": "Proehl, J. A. (2008)",
      "title": "Emergency Nursing Procedures. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781437725599"
     },
     {
      "author": "Dunning, T. (2003)",
      "title": "Care of People with Diabetes: A Manual of Nursing Practice. John Wiley & Sons, Incorporated",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781405151863"
     },
     {
      "author": "Stein, J., Harvey, R. L., Macko, R. F., Winstein, C. J., & Zorowitz, R. D. (2009)",
      "title": "Stroke recovery and rehabilitation (1st ed.). Demos Medical Publishing, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781935281054"
     }
    ]
   },
   {
    "code": "N8018",
    "title": "Orthopaedic Nursing",
    "books": [
     {
      "author": "Schilcher, J. (2013)",
      "title": "Epidemiology, radiology and histology of atypical femoral fractures: Development of understanding. In Acta orthopaedica (Vol. 84, Issue sup352, pp. 1–26). Taylor & Francis",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_informaworld_taylorfrancis_310_3109_17453674_2013_850008"
     },
     {
      "author": "Beaulieu, M., & Bellini, S. (2016)",
      "title": "Neonatal Advanced Practice Nursing: A Case-Based Learning Approach (1st ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_informaworld_taylorfrancis_310_3109_17453674_2013_850008"
     },
     {
      "author": "ENA, & Hoyt, K. S. (2007)",
      "title": "Emergency Nursing Core Curriculum. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781437726565"
     }
    ]
   },
   {
    "code": "N8020",
    "title": "Diabetes Nursing",
    "books": [
     {
      "author": "Dunning, T. (2009)",
      "title": "Care of people with diabetes: a manual of nursing practice (3rd ed.). Wiley",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_WILEYB0018344"
     },
     {
      "author": "Dunning, T. (2003)",
      "title": "Care of People with Diabetes: A Manual of Nursing Practice. John Wiley & Sons, Incorporated",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781405151863"
     },
     {
      "author": "Dunning, T. (2009)",
      "title": "Care of people with diabetes: a manual of nursing practice, third edition (3rd ed.). Wiley",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_WILEYB0018344"
     },
     {
      "author": "Fitzpatrick, J. (2017)",
      "title": "Encyclopedia of Nursing Research (4th ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780826133045"
     },
     {
      "author": "Myers, J. L., & Gulanick, M. (2013)",
      "title": "Nursing care plans: diagnoses, interventions, and outcomes. Mosby",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780323113564"
     },
     {
      "author": "Carrier, J. (2009)",
      "title": "Managing Long-term Conditions and Chronic Illness in Primary Care: A Guide to Good Practice. Taylor and Francis",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781134106370"
     },
     {
      "author": "Ozcanarslan, F., Shapekova, N. L., & Sancar, B. (2018)",
      "title": "Recent Developments in Nursing and Midwifery. Cambridge Scholars Publisher",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC5568632"
     }
    ]
   },
   {
    "code": "N8022",
    "title": "Palliative Care Nursing",
    "books": [
     {
      "author": "Matzo, M., & Sherman, D. W. (2010)",
      "title": "Palliative care nursing quality care to the end of life (3rd ed.). Springer",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826157928"
     },
     {
      "author": "Canadian Association of Schools of Nursing (2011)",
      "title": "Palliative & End-of-Life Care Entry-to-Practice Competencies & Indicators for Registered Nurses",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9910850506811"
     },
     {
      "author": "Keegan, L., & Drick, C. A. (2011)",
      "title": "End of life: nursing solutions for death with dignity. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826107602"
     },
     {
      "author": "Matzo, M., & Sherman, D. W. (2010)",
      "title": "Palliative care nursing: quality care to the end of life (3rd ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826157928"
     },
     {
      "author": "Ferrell, B. R., & Paice, J. A. (2019)",
      "title": "Oxford Textbook of Palliative Nursing (Fifth edition.). Oxford University Press USA - OSO",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780190862381"
     },
     {
      "author": "Keegan, L., & Drick, C. A. (2011)",
      "title": "End of life: nursing solutions for death with dignity. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826107602"
     },
     {
      "author": "Matzo, M. L., Sherman, D. W., & Martin, G. (2006)",
      "title": "Palliative Care Nursing: Quality Care to the End of Life, Third Edition. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC533769"
     },
     {
      "author": "Matzo, M. L. G.-B. (2009)",
      "title": "Palliative Care Nursing. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826157911"
     }
    ]
   },
   {
    "code": "N8024",
    "title": "Perioperative Nursing",
    "books": [
     {
      "author": "Ackley, B. J., Ladwig, G. B., Swan, B. A., & Tucker, S. J. (2007)",
      "title": "Evidence-Based Nursing Care Guidelines: Medical-Surgical Interventions. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780323059336"
     },
     {
      "author": "Kent, B., & McCormack, B. (2010)",
      "title": "Clinical context for evidence-based nursing practice. Blackwell Pub",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922601906811"
     },
     {
      "author": "Kent, B., Kent, B., & McCormack, B. (2011)",
      "title": "Clinical context for evidence-based nursing practice (Evidence-based nursing series). WILEY",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781118275887"
     },
     {
      "author": "Terrill, B. (2016)",
      "title": "Renal Nursing: A Guide to Practice (First edition.). Taylor and Francis",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922599906811"
     },
     {
      "author": "Terrill, B. (2002)",
      "title": "Renal Nursing: A Guide to Practice. Taylor & Francis Group",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC4711428"
     }
    ]
   },
   {
    "code": "",
    "title": "Professional Reflection",
    "books": [
     {
      "author": "Taylor, B. J. (2010)",
      "title": "Reflective practice for healthcare professionals a practical guide (3rd ed.). Open University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780335238361"
     },
     {
      "author": "Taylor, B. (2010)",
      "title": "Reflective Practice for Healthcare Professionals. McGraw-Hill Education",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC771426"
     },
     {
      "author": "McEwen, A., & Kraszewski, S. (2010)",
      "title": "Communication Skills for Adult Nurses. McGraw-Hill Education",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780335239993"
     }
    ]
   }
  ]
 },
 {
  "id": 2,
  "slug": "master-of-nursing",
  "name": "Master of Nursing",
  "school": "School of Nursing",
  "units": [
   {
    "code": "N9001",
    "title": "Professional Issues and Policies in Nursing",
    "books": [
     {
      "author": "Chang, E., & Daly, J. (2012)",
      "title": "Transitions in nursing preparing for professional practice (3rd Ed.). Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922604706811"
     },
     {
      "author": "Daly, J., & Chang, E. (2011)",
      "title": "Transitions in Nursing: Preparing for Professional Practice. Churchill Li",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729580823vingstone."
     },
     {
      "author": "Weiss, S. A., & Tappen, R. M. (2014)",
      "title": "Essentials of nursing leadership and management (6th ed.). F. A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803636637"
     },
     {
      "author": "Weiss, S. A., & Tappen, R. M. (2015)",
      "title": "Essentials of nursing leadership and management (6th ed.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607306811"
     },
     {
      "author": "Gaberson, K., Oermann, M., & Shellenbarger, T. (2015)",
      "title": "CLINICAL TEACHING STRATEGIES IN NURSING (4th ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826119629"
     },
     {
      "author": "Hansen-Turton, T., Sherman, S., & King, E. S. (2015)",
      "title": "Nurse-led health clinics: operations, policy, and opportunities (1st ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922606906811"
     },
     {
      "author": "Daly, J., Speedy, S., & Jackson, D. (2013)",
      "title": "Contexts of Nursing. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1723947"
     },
     {
      "author": "Forrester, K., & Griffiths, D. (2010)",
      "title": "Essentials of Law for Health Professionals (3rd ed.). Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729579155"
     },
     {
      "author": "Dennison, R. D. (2012)",
      "title": "Future of Advanced Registered Nursing Practice, An Issue of Nursing Clinics. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1431206"
     },
     {
      "author": "Dennison, R. D. (2014)",
      "title": "Future of advanced registered nursing practice (Vol. 47). Saunders",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781455744190"
     },
     {
      "author": "Barraclough, S., & Gardner, H. (2008)",
      "title": "Analysing Health Policy: A Problem-Oriented Approach. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922600706811"
     },
     {
      "author": "Patton MSN RN CNOR FAAN, R. (2014)",
      "title": "Nurses Making Policy. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826198914"
     },
     {
      "author": "Patton, R. M., Zalon, M. L., Ludwick, R., & Abood, S. A. (2015)",
      "title": "Nurses making policy: from bedside to boardroom . Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922606606811"
     }
    ]
   },
   {
    "code": "N9002",
    "title": "Assessment of Complex Health Condition",
    "books": [
     {
      "author": "Broyles, B., Reiss, B., Evans, M., McKenzie, G., Pleunik, S., & Page, R. (2017)",
      "title": "Pharmacology in nursing: Australia and New Zealand (2nd ed.). Melbourne, Australia: Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9934010006811"
     },
     {
      "author": "Estes, M., Calleja, P., Theobald, K., Harvey, T. (2016)",
      "title": "Health Assessment and Physical Examination (2nd ed.). Melbourne, Victoria: Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9934010106811"
     },
     {
      "author": "Hammer, G. & McPhee, S.J. (Eds.) (2019)",
      "title": "Pathophysiology of disease: an introduction to clinical medicine (8th ed.). China: McGraw- Hill Education",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Pathophysiology%20of%20disease:%20an%20introduction%20to%20clinical%20medicine&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "McKenna, L. & Mirkov, Sanja. (2019)",
      "title": "Drug handbook for Nursing and Midwifery Australia and New Zealand (8thed.). New South Wales, Australia: Wolters Kluwer",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Drug%20handbook%20for%20Nursing%20and%20Midwifery%20Australia%20and%20New%20Zealand&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Carrier, J. (2009)",
      "title": "Managing Long-term Conditions and Chronic Illness in Primary Care: A Guide to Good Practice. Taylor and Francis",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781134106370"
     },
     {
      "author": "Fawkes, S., Lin, V., Smith, J., Robinson, P., & Gifford, S. (2014)",
      "title": "Public Health Practice in Australia: The Organised Effort. Taylor & Francis Group",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781000250787"
     },
     {
      "author": "Lin, V. (2014)",
      "title": "Public health practice in Australia: the organised effort (Second edition.). Allen & Unwin",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909606811"
     },
     {
      "author": "Story, L. (2014)",
      "title": "Pathophysiology: A Practical Approach (2nd ed.). Jones & Bartlett Learning, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9781284043891"
     },
     {
      "author": "Story, L. (2015)",
      "title": "Pathophysiology: a practical approach (Second edition.). Jones & Bartlett Learning",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922608406811"
     },
     {
      "author": "Peate, I. (2018)",
      "title": "Fundamentals of applied pathophysiology: an essential guide for nursing and healthcare students (3rd ed). Wiley",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781119219484"
     },
     {
      "author": "Rogers, K., & Scott, W. (2011)",
      "title": "Nurses! Test Yourself in Essential Calculation Skills. McGraw-Hill Education",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780335243600"
     }
    ]
   },
   {
    "code": "N9003",
    "title": "Professional Reflection in Nursing",
    "books": [
     {
      "author": "Taylor, B. (2010)",
      "title": "Reflective practice for healthcare professionals: a practical guide. Open University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922602406811"
     },
     {
      "author": "Andre, K., & Heartfield, M. (2011)",
      "title": "Nursing and midwifery portfolios evidence of continuing competence (Second edition.). Churchill Livingstone",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922604306811"
     },
     {
      "author": "Johns, C. (2013)",
      "title": "Becoming a Reflective Practitioner (4. Aufl.). Wiley-Blackwell",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781118492307"
     },
     {
      "author": "Taylor, B. J. (2010)",
      "title": "Reflective practice for healthcare professionals a practical guide (3rd ed.). Open University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922602406811"
     }
    ]
   },
   {
    "code": "N9004",
    "title": "Professional Experience Placement",
    "books": [
     {
      "author": "Broyles, B., Reiss, B., Evans, M., McKenzie, G., Pleunik, S., & Page, R. (2017)",
      "title": "Pharmacology in nursing: Australia and New Zealand (2nd ed.). Melbourne, Australia: Cengage Learning Australia",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Pharmacology%20in%20nursing:%20Australia%20and%20New%20Zealand&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Estes, M., Calleja, P., Theobald, K., Harvey, T. (2016)",
      "title": "Health Assessment and Physical Examination (2nd edn.). Melbourne, Victoria: Cengage Learning Australia",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Health%20Assessment%20and%20Physical%20Examination&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Tiziani, A. (2017)",
      "title": "Havard’s Nursing Guide to Drugs (10th edn.). Chatswood, N.S.W: Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607706811"
     },
     {
      "author": "Levett-Jones, T., & Bourgeois, S. (2010)",
      "title": "The Clinical Placement: An Essential Guide for Nursing Students. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780729579582"
     },
     {
      "author": "Reidy, J. M. (2006)",
      "title": "Learning to Work: Students’ Experiences during Work Placements. Melbourne University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rmit_indexes_0522852378_pbk_rk_students_experiences_during_work_p_154312_AEIPT"
     },
     {
      "author": "Cowling, V. (2004)",
      "title": "Children of Parents with Mental Illness 2: Personal and Clinical Perspectives. ACER Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rmit_indexes_0864314736rents_with_mental_illness_2_personal_an_55813_Health_Society"
     }
    ]
   },
   {
    "code": "N9005",
    "title": "Patient Safety and Risk Management",
    "books": [
     {
      "author": "Youngberg, B. (2010)",
      "title": "Principles of Risk management and Patient Safety. MA: Jones & Bartlett Publishers",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9939010006811"
     },
     {
      "author": "Fisher, M., & Scott, M. (2013)",
      "title": "Patient Safety and Managing Risk in Nursing. SAGE Publications",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781473904651"
     },
     {
      "author": "Coulter, A. (2011)",
      "title": "Engaging patients in healthcare. Open University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922604006811"
     },
     {
      "author": "Gordon, S., Mendenhall, P., O’toole, B. B., & Sullenberger, C. “Sully.” (2012)",
      "title": "Beyond the Checklist: What Else Health Care Can Learn from Aviation Teamwork and Safety. Cornell University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780801465789"
     },
     {
      "author": "Myers, J. L., & Gulanick, M. (2013)",
      "title": "Nursing care plans: diagnoses, interventions, and outcomes. Mosby",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780323113564"
     },
     {
      "author": "Gulanick, M., & Myers, J. L. (2014)",
      "title": "Nursing care plans: diagnoses, interventions, and outcomes / [edited by] Meg Gulanick, Judith L. Myers. (8th ed.). Elsevier/Mosby",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922606506811"
     },
     {
      "author": "Gulanick, M., & Myers, J. L. (2013)",
      "title": "Nursing Care Plans: Nursing Diagnosis and Intervention. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC1746659"
     },
     {
      "author": "Gantz, N. R. (2009)",
      "title": "101 global leadership lessons for nurses: shared legacies from leaders and their mentors (1st ed.). Sigma Theta Tau International",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9781930538795"
     }
    ]
   },
   {
    "code": "N9006",
    "title": "Research in Nursing",
    "books": [
     {
      "author": "Schneider, Z., Whitehead, D., LoBiondo-Wood, G., & Haber, J. (2016)",
      "title": "Nursing and Midwifery Research: Methods and appraisal for evidence-based practice (5th ed.). Chatswood, NSW: Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_reports_1272309656"
     },
     {
      "author": "Polit, D,. Beck, C.T. (2016)",
      "title": "Nursing Research: Generating and Assessing Evidence for Nursing Practice (10th ed.). Philadelphia, PA: Walter Klaus",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_crossref_primary_10_1016_j_nepr_2013_04_001"
     },
     {
      "author": "Richardson-Tench, M., Nicholson, P., Taylor, K., Kermode, S. & Roberts, K. (2018)",
      "title": "Research in Nursing, Midwifery and Allied Health Evidence for best practice (6th ed.). Melbourne, Australia: Cengage Learning Australia",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Research%20in%20Nursing,%20Midwifery%20and%20Allied%20Health%20Evidence%20for%20best%20practice&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Fitzpatrick, J. J. (2018)",
      "title": "Encyclopedia of nursing research, 4th edition (4th ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_SPCB0001852"
     },
     {
      "author": "Fawcett, J., & Garity, J. (2009)",
      "title": "Evaluating research for evidence-based nursing practice. F.A. Davis. https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9910898706811",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9910898706811"
     }
    ]
   },
   {
    "code": "N9007",
    "title": "Evidence-Based Practice in Nursing",
    "books": [
     {
      "author": "Melnyk, B. M. & Fineout-Overholt, E. (2015)",
      "title": "Evidence-based practice in nursing & healthcare (3rd ed.). Philadelphia, PA: Wolters Kluwer/Lippincott Williams & Wilkins Health",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Evidence-based%20practice%20in%20nursing%20%26%20healthcare&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Kent, B., Kent, B., & McCormack, B. (2011)",
      "title": "Clinical context for evidence-based nursing practice (Evidence-based nursing series). WILEY",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781118275887"
     },
     {
      "author": "Ackley, B. J., Ladwig, G. B., Swan, B. A., & Tucker, S. J. (2007)",
      "title": "Evidence-Based Nursing Care Guidelines: Medical-Surgical Interventions. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780323059336"
     },
     {
      "author": "Reynolds, S., & Trinder, L. (2000)",
      "title": "Evidence-Based Practice: A Critical Appraisal. John Wiley & Sons, Incorporated",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922599706811"
     },
     {
      "author": "Trinder, L. (2008)",
      "title": "Evidence-Based Practice: A Critical Appraisal (1. Aufl.). Wiley-Blackwell",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780470698433"
     },
     {
      "author": "Ackley, B. J. (2008)",
      "title": "Evidence-based nursing care guidelines medical-surgical interventions. Mosby/Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922600406811"
     },
     {
      "author": "Newell, R., & Gournay, K. (2008)",
      "title": "Mental Health Nursing E-Book: An Evidence Based Approach. Elsevier Health Sciences",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780443074516"
     },
     {
      "author": "Courtney, M. D. (Mary D., & McCutcheon, H. (2010)",
      "title": "Using evidence to guide nursing practice (2nd ed.). Churchill Livingstone/Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922603006811"
     }
    ]
   },
   {
    "code": "N9008",
    "title": "Clinical Leadership and Management in Nursing",
    "books": [
     {
      "author": "Stanley, D. (2016)",
      "title": "Clinical Leadership in Nursing and Healthcare: Values Into Action. West Sussex, UK: John Wiley & Sons",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Clinical%20Leadership%20in%20Nursing%20and%20Healthcare:%20Values%20Into%20Action&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Weiss, S. A., & Tappen, R. M. (2015)",
      "title": "Essentials of nursing leadership and management (6th ed.). F.A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607306811"
     },
     {
      "author": "Waxman, K., & Waxman, K. (2013)",
      "title": "Financial and business management for the Doctor of Nursing practice. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826109484"
     },
     {
      "author": "Kristiina Hyrkas, John Fowler, & John R. Cutcliffe. (2010)",
      "title": "Routledge Handbook of Clinical Supervision: Fundamental International Themes. Taylor and Francis",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781136912801"
     }
    ]
   },
   {
    "code": "N9009",
    "title": "Research in Practice",
    "books": [
     {
      "author": "Schneider, Z., Whitehead, D., LoBiondo-Wood, G., & Haber, J. (2016)",
      "title": "Nursing and Midwifery Research: Methods and appraisal for evidence-based practice (5th ed.). Chatswood, Australia: Elsevier",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Nursing%20and%20Midwifery%20Research:%20Methods%20and%20appraisal%20for%20evidence-based%20practice%20(5th%20ed.)&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Fitzpatrick, J. J. (2018)",
      "title": "Encyclopedia of nursing research (Fourth edition.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_SPCB0001852"
     },
     {
      "author": "Fitzpatrick, J. J., & Kazer, M. W. (2012)",
      "title": "Encyclopedia of nursing research (3rd ed.). Springer Pub",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/19g9968/alma9922604606811"
     },
     {
      "author": "Butts, J. B., & Rich, K. L. (2018)",
      "title": "Philosophies and theories for advanced nursing practice (Third edition.). Jones & Bartlett Learning",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607906811"
     }
    ]
   },
   {
    "code": "N9010",
    "title": "Evolution and Innovation in Nursing",
    "books": [
     {
      "author": "Cody, W. K. (2013)",
      "title": "The nursing discipline and the development of nursing knowledge. In W.K. Cody (ed.). Philosophical and Theoretical Perspectives for Advanced Nursing Practice (5th edn.). Jones & Bartlett Learning",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,The%20nursing%20discipline%20and%20the%20development%20of%20nursing%20knowledge&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Burlington, M. A. Forss, A., Ceci, C., & Drummond, J. (2013)",
      "title": "Philosophy of Nursing: 5 Questions. USA; UK: Automatic Press/VIP",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_doaj_primary_oai_doaj_org_article_db0974af10c14f5c930938efbc5a2ab0"
     },
     {
      "author": "Butts, J. B., & Rich, K. L. (2017)",
      "title": "Philosophies and Theories for Advanced Nursing Practice (3rd ed.). Jones & Bartlett Learning, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607906811"
     },
     {
      "author": "Waxman, K., & Waxman, K. (2013)",
      "title": "Financial and business management for the doctor of nursing practice. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826109484"
     },
     {
      "author": "Chang, E., & Daly, J. (2012)",
      "title": "Transitions in Nursing - E-Book: Preparing for Professional Practice. Elsevier Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922604706811"
     }
    ]
   },
   {
    "code": "N9011",
    "title": "Education for Practice",
    "books": [
     {
      "author": "Bradshaw, M. & Hultquist, B. (2017)",
      "title": "Innovative Teaching Strategies in Nursing and Related Health Professions (7thed.). Burlington, MA: Jones & Bartlett",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Innovative%20Teaching%20Strategies%20in%20Nursing%20and%20Related%20Health%20Professions&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Bastable, S. (2019)",
      "title": "Nurse as Educator: Principles of Teaching and Learning for Nursing Practice (5th ed.). New York: Jones & Bartlett",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Nurse%20as%20Educator:%20Principles%20of%20Teaching%20and%20Learning%20for%20Nursing%20Practice&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "O’Neil, C., Fisher, C., & Newbold, S. K. (2008)",
      "title": "Developing Online Learning Environments in Nursing Education: Best Practices for Nurse Educators. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC423277"
     },
     {
      "author": "Fitzpatrick, J. J., & Kazer, M. (2009)",
      "title": "The doctor of nursing practice and clinical nurse leader: essentials of program development and implementation for clinical practice (1st ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826138293"
     },
     {
      "author": "Herrman, J. (2019)",
      "title": "Creative Teaching Strategies for the Nurse Educator (3rd ed.). F. A. Davis Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780803694057"
     },
     {
      "author": "Oermann, M. H. (2013)",
      "title": "Teaching in Nursing and Role of the Educator: The Complete Guide to Best Practice in Teaching, Evaluation and Curriculum Development. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9780826195616"
     },
     {
      "author": "Fitzpatrick, J. J. (2008)",
      "title": "The Doctor of Nursing Practice and Clinical Nurse Leader. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_springercompany_primary_9780826138286"
     },
     {
      "author": "Fitzpatrick, J. (2017)",
      "title": "Encyclopedia of Nursing Research (4th ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rittenhouse_primary_9780826133045"
     },
     {
      "author": "Oermann, M. H. (2013)",
      "title": "Teaching in nursing: the guide to best practice. Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_SPCB0001252"
     },
     {
      "author": "O’Neil, C. A., Fisher, C. A., & Newbold, S. K. (2009)",
      "title": "Developing online learning environments in nursing education (2nd ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922600906811"
     },
     {
      "author": "Fitzpatrick, J. J. (2018)",
      "title": "Encyclopedia of nursing research, 4th edition (4th ed.). Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_igpublishing_primary_SPCB0001852"
     },
     {
      "author": "Oermann, M. (2015)",
      "title": "Teaching in nursing and role of the educator: the complete guide to best practice in teaching, evaluation, and curriculum development . Springer Publishing Company",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607206811"
     }
    ]
   },
   {
    "code": "N9012",
    "title": "Contemporary Issues in Global Health",
    "books": [
     {
      "author": "Baum, F. (2016)",
      "title": "The New Public Health (4th ed.). Melbourne, Australia: Oxford University Press",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,The%20New%20Public%20Health&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Johnson, B. L., & Lichtveld, M. Y. (2018)",
      "title": "Environmental Policy and Public Health (2nd ed.). CRC Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781498799478"
     },
     {
      "author": "Friis, R. H. (2018)",
      "title": "Essentials of Environmental Health (3rd ed.). Jones & Bartlett Learning, LLC",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922608606811"
     },
     {
      "author": "Fawkes, S., Lin, V., Smith, J., Robinson, P., & Gifford, S. (2014)",
      "title": "Public Health Practice in Australia: The Organised Effort. Taylor & Francis Group",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781000250787"
     },
     {
      "author": "Lowell, R. (2005)",
      "title": "Localising Human Services: A History of Local Government Human Services in Victoria. Australian Scholarly Publishing",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rmit_primary_273661856082349"
     },
     {
      "author": "Lacey, G. (2008)",
      "title": "Reading the Land. Australian Scholarly Publishing",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_rmit_collectionsbits_10_3316_informit_9781740971553"
     }
    ]
   },
   {
    "code": "N9013",
    "title": "Eportfolio",
    "books": [
     {
      "author": "Andre, K. & Heartfield, M. (2017)",
      "title": "Portfolios for health professionals (3rd ed). Elsevier, Chatswood. N.S.W",
      "url": "https://library.hci.edu.au/discovery/search?query=any,contains,Portfolios%20for%20health%20professionals&tab=Everything&search_scope=MyInst_and_CI&vid=61IOHAM_INST:61IOHAM&offset=0"
     },
     {
      "author": "Hewitson, R., & Fertleman, C. (2014)",
      "title": "The hands-on guide to practical paediatrics (1st ed.). WILEY",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781118463598"
     },
     {
      "author": "Andre, K., & Heartfield, M. (2011)",
      "title": "Nursing and midwifery portfolios evidence of continuing competence (Second edition.). Churchill Livingstone",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922604306811"
     },
     {
      "author": "Reed, S. (2015)",
      "title": "Successful Professional Portfolios for Nursing Students. SAGE Publications",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781473927537"
     },
     {
      "author": "Reed, S. (2015)",
      "title": "Successful Professional Portfolios for Nursing Students. Learning Matters",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9922607006811"
     }
    ]
   },
   {
    "code": "N9014",
    "title": "Nursing Project",
    "books": []
   }
  ]
 },
 {
  "id": 3,
  "slug": "bachelor-of-nursing",
  "name": "Bachelor of Nursing",
  "school": "School of Nursing",
  "units": [
   {
    "code": "N7001",
    "title": "Nursing and the Australian Health Care System",
    "books": [
     {
      "author": "Reynolds, L., Debono, D., & Travaglia, J. (2023)",
      "title": "Understanding the Australian Health Care System. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200045366?origin=share&title=Understanding%20the%20Australian%20Health%20Care%20System&meta=2024%2C%20Reynolds%2C%20Louise%2C%20RP%2C%20PhD%2C%20BHSc(PHC)%2C%20GradCertEd%2C%20MPH%2C%20FACPara&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200045366%2Fcov200h.gif"
     },
     {
      "author": "Daly, J., Speedy, S., & Jackson, D. (Eds.). (2020)",
      "title": "Contexts of Nursing (6th ed.). NSW: Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/book/3-s2.0-B9780729543569500066?origin=share&title=Contexts%20of%20Nursing&meta=2021%2C%20Daly%2C%20John&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190011417%2Fcov200h.gif"
     },
     {
      "author": "Crisp, J., Douglas, C., Rebeiro, G., & Waters, D. (2020)",
      "title": "Potter and Perry’s Fundamentals of Nursing (6th ed.) Elsevier, Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180048495?origin=share&title=Potter%20%26%20Perry%E2%80%99s%20Fundamentals%20of%20Nursing%20-%20ANZ%20edition&meta=2021%2C%20Crisp%2C%20Jackie%2C%20RN%2C%20PhD&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180048495%2Fcov200h.gif"
     },
     {
      "author": "Fleming, M. L., & Baldwin, L. (2023)",
      "title": "Introduction to Public Health (5th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200045342?origin=share&title=Introduction%20to%20Public%20Health&meta=2023%2C%20Fleming%2C%20Mary%20Louise%2C%20PhD%2C%20MA%2C%20BEd%2C%20Dip%20Teach&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200045342%2Fcov200h.gif"
     },
     {
      "author": "Chang, E., & Hatcher, D. (2024)",
      "title": "Transitions in Nursing (6th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20210033800?origin=share&title=Transitions%20in%20Nursing&meta=2024%2C%20Chang%2C%20Emeritus%20Professor%20Esther%2C%20RN%2C%20CM%2C%20DNE%2C%20BAppSc(AdvNur)%2C%20MEdAdmin%2C%20PhD%2C%20FACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20210033800%2Fcov200h.gif"
     },
     {
      "author": "Almond, H. (2024)",
      "title": "Digital Health: A Transformative Approach. Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200041678?origin=share&title=Digital%20Health%3A%20A%20Transformative%20Approach&meta=2024%2C%20Almond%2C%20Helen%2C%20PhD%2C%20MSc%2C%20FAIDH%2C%20RN%2C%20RSCN%2C%20MACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200041678%2Fcov200h.gif"
     },
     {
      "author": "Munns, A., & Clendon, J. (2023)",
      "title": "Community Health and Wellness (7th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200024801?origin=share&title=Community%20Health%20and%20Wellness&meta=2023%2C%20Clendon%2C%20Jill&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200024801%2Fcov200h.gif"
     },
     {
      "author": "Koutoukidis, G., Stainton, K., & Hughson, J. (2020)",
      "title": "Tabbner’s nursing care. (8th ed.). Elsevier",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180047842&title=Tabbner%27s%20Nursing%20Care&meta=2021%2C%20Koutoukidis%2C%20Gabrielle%2C%20MPH%2C%20BN(Mid)%2C%20DipAppSci(Nur)%2C%20AdvDipN(Ed)%2C%20DipBus%2C%20Voc%20Grad%20Cert%20Business%20(Transformational%20Management)%2C%20MACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180047842%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7002",
    "title": "Health and Wellness in Nursing Practice",
    "books": [
     {
      "author": "Douglas, C., Rebeiro, G., Crisp, J., & Taylor, C. (2021)",
      "title": "Potter & Perry’s Fundamentals of Nursing - Australian Version(6th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180048495?origin=share&title=Potter%20%26%20Perry%E2%80%99s%20Fundamentals%20of%20Nursing%20-%20ANZ%20edition&meta=2021%2C%20Crisp%2C%20Jackie%2C%20RN%2C%20PhD&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180048495%2Fcov200h.gif"
     },
     {
      "author": "Susan Fickertt Wilson, & Jean Foret Giddens. (2020)",
      "title": "Health Assessment for Nursing Practice - E-Book. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180024597?origin=share&title=Health%20Assessment%20for%20Nursing%20Practice&meta=2022%2C%20Fickertt%20Wilson%2C%20Susan%2C%20PhD%2C%20RN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180024597%2Fcov200h.gif"
     },
     {
      "author": "Forbes, H., & Watt, E. (2020)",
      "title": "Jarvis’s Health Assessment and Physical Examination - E-Book: Australian and New Zealand. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180041924&title=Jarvis%27s%20Health%20Assessment%20and%20Physical%20Examination&meta=2021%2C%20Jarvis%2C%20Carolyn%2C%20PhD%2C%20APRN%2C%20CNP&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180041924%2Fcov200h.gif"
     },
     {
      "author": "Giddens, J. F",
      "title": "Concepts for Nursing Practice (4th ed.).. Elsevier - Evolve",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200014945?origin=share&title=Concepts%20for%20Nursing%20Practice%20(with%20eBook%20Access%20on%20VitalSource)&meta=2025%2C%20Giddens%2C%20Jean%20Foret%2C%20PhD%2C%20RN%2C%20FAAN%2C%20ANEF&img=https%3A%2F"
     },
     {
      "author": "Edelman, C. L., & Kudzma, E. C. (2021)",
      "title": "Health Promotion Throughout the Life Span (10th ed.). Elsevier Limited (UK)",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180048409?origin=share&title=Health%20Promotion%20thoughout%20the%20Life%20Span&meta=2022%2C%20Edelman%2C%20Carole%20Lium%2C%20MSN%2C%20GCNS-BC%2C%20CMC&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180048409%2Fcov200h.gif"
     },
     {
      "author": "Hagler, M.M.H.J.K. D",
      "title": "Lewis Medical-Surgical Nursing: Assessment and Management of Clinical Problems (12th ed.). Elsevier - Evolve",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190052867&title=Lewis%27s%20Medical-Surgical%20Nursing&meta=2023%2C%20Harding%2C%20Mariann%20M.%2C%20PhD%2C%20RN%2C%20CNE%2C%20FAADN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190052867%2Fcov200h.gif"
     },
     {
      "author": "Ball, J. W., Dains, J. E., Flynn, J. A., Solomon, B. S., & Stewart, R. W. (2021)",
      "title": "Seidel Guide to Physical Examination (10th ed.). Elsevier Health Sciences (US)",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180051506&title=Seidel%27s%20Guide%20to%20Physical%20Examination&meta=2023%2C%20Ball%2C%20Jane%20W.%2C%20DrPH%2C%20RN%2C%20CPNP&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180051506%2Fcov200h.gif"
     },
     {
      "author": "Cooper, K., & Gosnell, K. (2022)",
      "title": "Adult Health Nursing (9th ed.). Elsevier Limited (UK)",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200017962&title=Adult%20Health%20Nursing&meta=2023%2C%20Cooper%2C%20Kim%2C%20RN%2C%20MSN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200017962%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7003",
    "title": "Communication Skills for Nurses\\r",
    "books": [
     {
      "author": "O'Toole, G. (2020)",
      "title": "Communication: Core interpersonal skills for healthcare professionals (4th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180052755&title=Communication&meta=2021%2C%20O%E2%80%99Toole%2C%20Gjyn%2C%20DipTEFL%2C%20DipOccThy%2C%20BA%2C%20MEdStud&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180052755%2Fcov200h.gif"
     },
     {
      "author": "Julia Balzer Riley. (2023)",
      "title": "Communication in Nursing - E-Book (10th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200046074&title=Communication%20in%20Nursing&meta=2024%2C%20Balzer%20Riley%2C%20Julia&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200046074%2Fcov200h.gif"
     },
     {
      "author": "Boggs, K. (2023)",
      "title": "Interpersonal Relationships (9th ed.). Elsevier Health Sciences (US)",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20160053846?origin=share&title=Interpersonal%20Relationships&meta=2023%2C%20Boggs%2C%20Kathleen%20Underman%2C%20PhD%2C%20FNP-CS&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20160053846%2Fcov200h.gif-s2.0-C20200046074&title=Communication%20in%20Nursing&meta=2024%2C%20Balzer%20Riley%2C%20Julia&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200046074%2Fcov200h.gif"
     },
     {
      "author": "Koutoukidis, G., Stainton, K., & Hughson, J. (2020)",
      "title": "Tabbner’s nursing care. (8th ed.). Elsevier",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180047842&title=Tabbner%27s%20Nursing%20Care&meta=2021%2C%20Koutoukidis%2C%20Gabrielle%2C%20MPH%2C%20BN(Mid)%2C%20DipAppSci(Nur)%2C%20AdvDipN(Ed)%2C%20DipBus%2C%20Voc%20Grad%20Cert%20Business%20(Transformational%20Management)%2C%20MACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180047842%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7004",
    "title": "Anatomy and Physiology",
    "books": [
     {
      "author": "Waugh, A., & Grant, A. (2023)",
      "title": "Ross & Wilson Anatomy and Physiology in Health and Illness (14th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200027660&title=Ross%20%26%20Wilson%20Anatomy%20and%20Physiology%20in%20Health%20and%20Illness&meta=2023%2C%20Waugh%2C%20Anne%2C%20BSc%20(Hons)%20MSc%20CertEd%20SRN%20RNT%20PFHEA&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200027660%2Fcov200h.gif"
     },
     {
      "author": "Ellie (2022)",
      "title": "Herlihy’s the Human Body in Health and Illness, Australia and Ellie 2022). New Zealand edition, 2022 Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190054349&title=Herlihy%27s%20The%20Human%20Body%20in%20Health%20and%20Illness%201st%20ANZ%20edition&meta=2022%2C%20Herlihy%2C%20Barbara%2C%20BSN%2C%20MA%2C%20PhD%20(Physiology)%2C%20RN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190054349%2Fcov200h.gif"
     },
     {
      "author": "Patton, K. T., Bell, F., Thompson, T., & Williamson, P. (2023)",
      "title": "The Human Body in Health & Disease - E-Book (8th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190014719&title=The%20Human%20Body%20in%20Health%20%26%20Disease&meta=2024%2C%20Patton%2C%20Kevin%20T.%2C%20MS%2C%20PhD&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190014719%2Fcov200h.gif"
     },
     {
      "author": "Needham, A., & Kirov, E. (2023)",
      "title": "Foundations of Anatomy and Physiology. Elsevier Australia",
      "url": "https://clinicalkeymeded.elsevier.com/books/9780729589000"
     },
     {
      "author": "Herlihy Barbara ,Kirov Ellie (2022)",
      "title": "Herlihy’s The Human Body in Health and Illness Study Guide 1st ANZ edition (Australia and New Zealand edition)",
      "url": "https://www.clinicalkey.com/student/nursing/content/book/3-s2.0-B9780729543736000163"
     },
     {
      "author": "Muller, A. (2020)",
      "title": "Ross & Wilson Pocket Reference Guide to Anatomy and Physiology. Elsevier Health Sciences (US)",
      "url": "https://clinicalkeymeded.elsevier.com/books/9780702076176 https://clinicalkeymeded.elsevier.com/books/9780702076176"
     },
     {
      "author": "King Jennie Hawley Rhonda (2021)",
      "title": "Australian Nurses’ Dictionary (Seventh edition), ISBN 978-0-7295-4349-1,",
      "url": "https://www.clinicalkey.com/student/nursing/content/book/3-s2.0-B9780729543491000088"
     }
    ]
   },
   {
    "code": "N7005",
    "title": "Health and Wellness in Older Adults",
    "books": [
     {
      "author": "Scott, K., Webb, M., & Kosetelnick, C. (2023)",
      "title": "Long-term caring: residential, home and community aged care (5th ed.,). Chatswood, NSW Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20230002710&title=Long-Term%20Caring&meta=2023%2C%20Scott%2C%20Karen&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20230002710%2Fcov200h.gif"
     },
     {
      "author": "Ross, F. M., Harris, R., Fitzpatrick, J. M., & Abley, C. (2023)",
      "title": "Redfern’s Nursing Older People (5th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190018961&title=Redfern%27s%20Nursing%20Older%20People&meta=2023%2C%20Ross%2C%20Fiona&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190018961%2Fcov200h.gif"
     },
     {
      "author": "Slatyer, C.V. S. (2021)",
      "title": "Gerontological Nursing. Elsevier Health Sciences (US)",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190043798&title=Gerontological%20Nursing&meta=2021%2C%20VAFEAS%2C%20CAROLINE%2C%20PhD%2C%20BSc%20(Hons)%2C%20MA%20Nurse%20Education%2C%20RN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190043798%2Fcov200h.gif"
     },
     {
      "author": "Jett, T.T. K. (2022)",
      "title": "Ebersole and Hess Gerontological Nursing & Healthy Aging (6th ed.). Elsevier - Evolve",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180052032&title=Ebersole%20and%20Hess%27%20Gerontological%20Nursing%20%26%20Healthy%20Ageing&meta=2022%2C%20Touhy%2C%20Theris%20A.%2C%20DNP%2C%20CNS%2C%20DPNAP&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180052032%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7006",
    "title": "Considering Health Care Consumers as Partners",
    "books": [
     {
      "author": "Brown, D. (2020)",
      "title": "Lewis medical-surgical nursing: Assessment and management of clinical problems. Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20170033220&title=Lewis%E2%80%99s%20Medical-Surgical%20Nursing%20ANZ&meta=2020%2C%20Brown%2C%20Di%2C%20AO%2C%20RN%2C%20PhD%2C%20GDipHEd%2C%20BAppSci%2C%20Cert%20AcuteN%2C%20Obst%20Cert&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20170033220%2Fcov200h.gif"
     },
     {
      "author": "Gabby Koutoukidis, & Stainton, K. (2021)",
      "title": "Essential Enrolled Nursing Skills for Person-Centred Care. Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180047842&title=Tabbner%27s%20Nursing%20Care&meta=2021%2C%20Koutoukidis%2C%20Gabrielle%2C%20MPH%2C%20BN(Mid)%2C%20DipAppSci(Nur)%2C%20AdvDipN(Ed)%2C%20DipBus%2C%20Voc%20Grad%20Cert%20Business%20(Transformational%20Management)%2C%20MACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180047842%2Fcov200h.gif"
     },
     {
      "author": "Mitchell, B., Macbeth, D., Russo, P., & Shaban, R. Z. ([2024])",
      "title": "Healthcare-Associated Infections in Australia. Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190035315&title=Healthcare-Associated%20Infections%20in%20Australia&meta=2024%2C%20Shaban%2C%20Professor%20Ramon%20Z.&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190035315%2Fcov200h.gif"
     },
     {
      "author": "Perry, A. G., Potter, P. A., Ostendorf, W. R., & Laplante, N. (2021)",
      "title": "Clinical Nursing Skills and Techniques (11th ed.). Elsevier Health Sciences (US)",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20180048495&title=Potter%20%26%20Perry%E2%80%99s%20Fundamentals%20of%20Nursing%20-%20ANZ%20edition&meta=2021%2C%20Crisp%2C%20Jackie%2C%20RN%2C%20PhD&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180048495%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7007",
    "title": "Culturally Appropriate Nursing of Aboriginal and Torres Strait Islander Peoples",
    "books": [
     {
      "author": "Janie Dade Smith. (2016)",
      "title": "Australia’s Rural, Remote and Indigenous Health. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C2014004926X&title=Australia%27s%20Rural%2C%20Remote%20and%20Indigenous%20Health&meta=2016%2C%20Smith%2C%20Janie%20Dade&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC2014004926X%2Fcov200h.gif"
     },
     {
      "author": "Willis, E., Reynolds, L., & Judge, T. (2019)",
      "title": "Understanding the Australian Health Care System. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200045366&title=Understanding%20the%20Australian%20Health%20Care%20System&meta=2024%2C%20Reynolds%2C%20Louise%2C%20RP%2C%20PhD%2C%20BHSc(PHC)%2C%20GradCertEd%2C%20MPH%2C%20FACPara&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200045366%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7008",
    "title": "PEP 1",
    "books": []
   },
   {
    "code": "N7009",
    "title": "Person Centred Care for People living with Complex Conditions",
    "books": [
     {
      "author": "Brown, D., Edwards, H., Buckley, S., Aitken, R. (2020)",
      "title": "Lewis’s medical-surgical nursing. Assessment and management of clinical problems (5th. Ed). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20170033220&title=Lewis%E2%80%99s%20Medical-Surgical%20Nursing%20ANZ&meta=2020%2C%20Brown%2C%20Di%2C%20AO%2C%20RN%2C%20PhD%2C%20GDipHEd%2C%20BAppSci%2C%20Cert%20AcuteN%2C%20Obst%20Cert&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20170033220%2Fcov200h.gif"
     },
     {
      "author": "Johnson, E.C. A. ([2022])",
      "title": "Living with Chronic Illness and Disability (4th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190020079&title=Living%20with%20Chronic%20Illness%20and%20Disability&meta=2022%2C%20Chang%2C%20Esther&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190020079%2Fcov200h.gif"
     },
     {
      "author": "Marthe, S.M.L.K.D. M. (2024)",
      "title": "Introduction to Critical Care Nursing (8th ed.). Elsevier - Evolve",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20220005742&title=Sole%E2%80%99s%20Introduction%20to%20Critical%20Care%20Nursing&meta=2025%2C%20Makic%2C%20Mary%20Beth%20Flynn%2C%20PhD%2C%20APRN%2C%20CCNS%2C%20CCRN%2C%20FAAN%2C%20FNAP%2C%20FCNS&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20220005742%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7010",
    "title": "Pathophysiology and Pharmacotherapeutics",
    "books": [
     {
      "author": "Hubert, R. J., & Vanmeter, K. C. (2023)",
      "title": "Gould’s pathophysiology for the health professions (7th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200002963&title=Gould%27s%20Pathophysiology%20for%20the%20Health%20Professions&meta=2023%2C%20Hubert%2C%20Robert&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200002963%2Fcov200h.gif"
     },
     {
      "author": "Craft, J., Gordon, C., Huether, S. E., McCance, K. L., & Brashers, V. L. (2020)",
      "title": "Understanding Pathophysiology Australia and New Zealand Edition (4th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200021407&title=Understanding%20Pathophysiology%20Australia%20and%20New%20Zealand%20Edition&meta=2023%2C%20Craft%2C%20Judy%20A&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200021407%2Fcov200h.gif"
     },
     {
      "author": "VanMeter, K. C., & Hubert, R. J. (2022)",
      "title": "Gould’s Pathophysiology for the Health Professions - Binder Ready. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200002963&title=Gould%27s%20Pathophysiology%20for%20the%20Health%20Professions&meta=2023%2C%20Hubert%2C%20Robert&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200002963%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7011",
    "title": "Ethical and Legal Nursing",
    "books": [
     {
      "author": "Gibson, M. (2023)",
      "title": "Handbook of Medical Law and Ethics for Nurses. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20190036539&title=Handbook%20of%20Medical%20Law%20and%20Ethics%20for%20Nurses&meta=2023%2C%20Gibson%2C%20Mark&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190036539%2Fcov200h.gif"
     },
     {
      "author": "O Kane, D. (2023)",
      "title": "Psychology: An Introduction for Health Professionals (2nd ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200045330&title=Psychology%3A%20An%20Introduction%20for%20Health%20Professionals&meta=2024%2C%20O%E2%80%99Kane%2C%20Deb%2C%20RMN%2C%20ENB603%2C%20Grad%20Dip%20CN%2C%20MN%2C%20Grad%20Cert%20Ed%20(Higher%20Ed)&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200045330%2Fcov200h.gif"
     },
     {
      "author": "Allan, S. (2024)",
      "title": "Law and ethics for health practitioners. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/preview?target=%2Fstudent%2Fnursing%2Fcontent%2Ftoc%2F3-s2.0-C20200045329&title=Law%20and%20Ethics%20for%20Health%20Practitioners&meta=2025%2C%20Allan%2C%20Sonia%2C%20OAM%20CF%2C%20LLB%20(Hons)%2C%20BA%20(Hons)%2C%20MPH%20(Merit)%2C%20LLM%20(Dist)%2C%20PhD%2C%20GDLP%20GCHE&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200045329%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7012",
    "title": "PEP 2",
    "books": []
   },
   {
    "code": "N7013",
    "title": "Mental Health and Wellness Nursing",
    "books": [
     {
      "author": "Foster, Kim., Marks, P., O\\\\’Brien, A. J., & Raeburn, T. (2021)",
      "title": "Mental health in nursing: theory and practice for clinical settings (5th edition.). Australian Version. Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180042115?origin=share&title=Mental%20Health%20in%20Nursing&meta=2021%2C%20FOSTER%2C%20KIM%2C%20RN%2C%20DipAppSc%2C%20BN%2C%20MA%2C%20PhD%2C%20CF%2C%20FACMHN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180042115%2Fcov200h.gif"
     },
     {
      "author": "Marks, P. ([2023])",
      "title": "Mental Health in Emergency Care. Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200039988?origin=share&title=Mental%20Health%20in%20Emergency%20Care&meta=2023%2C%20Marks%2C%20Peta%2C%20RN%2C%20BNurs%2C%20MPH%2C%20MCFT%2C%20CMHN%2C%20FACMHN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200039988%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7014",
    "title": "Research and Evidence-Based Practice in Health Care",
    "books": [
     {
      "author": "Lobiondo-Wood, G., & Haber, J. (2022)",
      "title": "Nursing Research: Methods and Critical Appraisal for evidence-based Practice (10th ed.). Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180050811?origin=share&title=Nursing%20Research&meta=2022%2C%20Haber%2C%20Judith&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180050811%2Fcov200h.gif"
     },
     {
      "author": "Whitehead, D., Ferguson, C., LoBiondo-Wood, G., Haber, J. (2020)",
      "title": "Nursing and Midwifery Research Methods and Appraisal for Evidence Based Practice (6th ed.). Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180041511?origin=share&title=Nursing%20and%20Midwifery%20Research%3A%20Methods%20and%20Appraisal%20for%20Evidence%20based%20Practice&meta=2020%2C%20Whitehead%2C%20Dean&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180041511%2Fcov200h.gif"
     },
     {
      "author": "Whitehead, D., & Terry, D. (2024)",
      "title": "Nursing and Midwifery Research - E-Book. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20220012186?origin=share&title=Nursing%20and%20Midwifery%20Research&meta=2025%2C%20Whitehead%2C%20Dean%2C%20PhD%2C%20MSc%2FMPH%2C%20BEd%2C%20FCNA%20(NZ)&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20220012186%2Fcov200h.gif"
     },
     {
      "author": "DePoy, E., & Gitlin, L. N. (2019)",
      "title": "Introduction to Research (6th ed.). Elsevier Health Sciences (US)",
      "url": "https://clinicalkeymeded.elsevier.com/books/9780323612487"
     },
     {
      "author": "Gray, J. R., & Grove, S. K. (2020)",
      "title": "Burns and Groves The Practice of Nursing Research (9th ed.). Elsevier Limited (UK)",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180018599?origin=share&title=Burns%20and%20Grove's%20The%20Practice%20of%20Nursing%20Research&meta=2021%2C%20Gray%2C%20Jennifer%20R.%2C%20PhD%2C%20RN%2C%20FAAN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180018599%2Fcov200h.gif"
     },
     {
      "author": "Jackson, D., Power, T., & Walthall, H",
      "title": "Navigating the Maze of Research: Enhancing Nursing and Midwifery Practice (6th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20210009184?origin=share&title=Navigating%20the%20Maze%20of%20Research%3A%20Enhancing%20Nursing%20and%20Midwifery%20Practice&meta=2023%2C%20Jackson%2C%20Debra%2C%20AO%2C%20RN%2C%20PhD%2C%20SFHEA%2C%20FACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20210009184%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7015",
    "title": "Global and Culture Health Care",
    "books": [
     {
      "author": "Stilwell, B. (2024)",
      "title": "Global Health and Nursing- A New Narrative for the 21st Century (1st Edition) Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20210005836?origin=share&title=Global%20Health%20and%20Nursing&meta=2025%2C%20Stilwell%2C%20Barbara&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20210005836%2Fcov200h.gif"
     },
     {
      "author": "Clendon, J., & Munns, A. (2022)",
      "title": "Community Health and Wellness (7th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200024801?origin=share&title=Community%20Health%20and%20Wellness&meta=2023%2C%20Clendon%2C%20Jill&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200024801%2Fcov200h.gif"
     },
     {
      "author": "Rosser, E. (2023)",
      "title": "Leading And Managing in Contemporary Health and Social Care. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20190036205?origin=share&title=Leading%20and%20Managing%20in%20Contemporary%20Health%20and%20Social%20Care&meta=2023%2C%20Rosser%2C%20Elizabeth%20Anne%2C%20DPhil%2C%20MN%2C%20Dip%20N%20Ed%2C%20Dip%20RM%2C%20RN%2C%20RNT%2C%20PFHEA&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190036205%2Fcov200h.gif"
     },
     {
      "author": "Stanhope, M., & Lancaster, J. (2021)",
      "title": "Foundations for Population Health in Community/Public Health Nursing (6th ed.). Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180048677?origin=share&title=Foundations%20for%20Population%20Health%20in%20Community%2FPublic%20Health%20Nursing&meta=2022%2C%20Stanhope%2C%20Marcia%2C%20PhD%2C%20RN%2C%20FAAN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180048677%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7016",
    "title": "PEP 3",
    "books": []
   },
   {
    "code": "N7017",
    "title": "Community Health Nursing",
    "books": [
     {
      "author": "Fleming, M. L., & Baldwin, L. ([2023])",
      "title": "Introduction to Public Health (5th ed.). Elsevier Australia",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200045342?origin=share&title=Introduction%20to%20Public%20Health&meta=2023%2C%20Fleming%2C%20Mary%20Louise%2C%20PhD%2C%20MA%2C%20BEd%2C%20Dip%20Teach&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200045342%2Fcov200h.gif"
     },
     {
      "author": "Scriven, A., Morgan, G., & Woodall, J. (2023)",
      "title": "Ewles and Simnett’s Promoting Health: A Practical Guide - E-Book. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20210014164?origin=share&title=Ewles%20and%20Simnett%E2%80%99s%20Promoting%20Health%3A%20A%20Practical%20Guide&meta=2024%2C%20Scriven%2C%20Angela%2C%20BA%2C%20Cert%20Ed%2C%20MEd.&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20210014164%2Fcov200h.gif"
     },
     {
      "author": "Shaban, R. Z., Mitchell, B., Russo, P., & Macbeth, D. (2021)",
      "title": "Epidemiology of Healthcare-Associated Infections in Australia. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20190035315?origin=share&title=Healthcare-Associated%20Infections%20in%20Australia&meta=2024%2C%20Shaban%2C%20Professor%20Ramon%20Z.&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190035315%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7018",
    "title": "Health and Wellness in Children and Young People",
    "books": [
     {
      "author": "Hockenberry, M. J., Wilson, D., & Rodgers, C. C. (2023)",
      "title": "Wong’s Essentials of Pediatric Nursing - E-Book. (11th ed.) Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20190008230?origin=share&title=Wong's%20Nursing%20Care%20of%20Infants%20and%20Children&meta=2024%2C%20Hockenberry%2C%20Marilyn%20J.%2C%20PhD%2C%20RN%2C%20FAAN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190008230%2Fcov200h.gif"
     },
     {
      "author": "Speedie, L., & Middleton, A. (2022)",
      "title": "Wong’s Nursing Care of Infants and Children Australia and New Zealand Edition - E-Book. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20190037892?origin=share&title=Wong%E2%80%99s%20Nursing%20Care%20of%20Infants%20and%20Children%201st%20ANZ%20edition%20%E2%80%93%20for%20students&meta=2022%2C%20Speedie%2C%20Lisa%2C%20RN%20Div%201%2C%20BN%2C%20Grad%20Dip%20Women%E2%80%99s%20Health%2C%20MNS&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190037892%2Fcov200h.gif"
     },
     {
      "author": "Richardson, E.G. J.(2021)",
      "title": "Textbook of Childrens and Young Peoples Nursing (3rd ed.). Elsevier Health Sciences (US)",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20130194925?origin=share&title=A%20Textbook%20of%20Children's%20and%20Young%20People's%20Nursing&meta=2021%2C%20Glasper%2C%20Edward%20Alan%2C%20PhD&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20130194925%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7019",
    "title": "Health Informatics",
    "books": [
     {
      "author": "Almond, H., & Mather, C. (2023)",
      "title": "Digital Health: A Transformative Approach. Elsevier Health Sciences",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200041678?origin=share&title=Digital%20Health%3A%20A%20Transformative%20Approach&meta=2024%2C%20Almond%2C%20Helen%2C%20PhD%2C%20MSc%2C%20FAIDH%2C%20RN%2C%20RSCN%2C%20MACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200041678%2Fcov200h.gif"
     },
     {
      "author": "Hoffmann, T",
      "title": "Evidence-Based Practice Across the Health Professions (4th ed.). Elsevier - Evolve",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20210011524?origin=share&title=Evidence-Based%20Practice%20Across%20the%20Health%20Professions&meta=2024%2C%20Hoffmann%2C%20Tammy&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20210011524%2Fcov200h.gif"
     },
     {
      "author": "Noel, Kimberly (2023)",
      "title": "Telehealth. Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20190049072?origin=share&title=Telehealth&meta=2023%2C%20Noel%2C%20Kimberly%2C%20MD%2C%20MPH&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190049072%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7020",
    "title": "PEP 4",
    "books": []
   },
   {
    "code": "N7021",
    "title": "Rural, Regional and Remote Health and Wellness",
    "books": [
     {
      "author": "Edelman, C., & Kudzma, E. (2022)",
      "title": "Health Promotion Throughout the Life Span. (10th ed.). Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180048409?origin=share&title=Health%20Promotion%20thoughout%20the%20Life%20Span&meta=2022%2C%20Edelman%2C%20Carole%20Lium%2C%20MSN%2C%20GCNS-BC%2C%20CMC&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180048409%2Fcov200h.gif"
     },
     {
      "author": "Stanhope, M., Stanhope, M., Lancaster, J., & Lancaster, J. (2022)",
      "title": "Foundations for Population Health in Community/Public Health Nursing - Binder Ready. Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180048677?origin=share&title=Foundations%20for%20Population%20Health%20in%20Community%2FPublic%20Health%20Nursing&meta=2022%2C%20Stanhope%2C%20Marcia%2C%20PhD%2C%20RN%2C%20FAAN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180048677%2Fcov200h.gif"
     },
     {
      "author": "Anne Griffin Perry, Potter, P. A., Ostendorf, W., & Laplante, N. (2021)",
      "title": "Clinical Nursing Skills and Techniques - E-Book (10th ed.). Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20220001513?origin=share&title=Clinical%20Nursing%20Skills%20and%20Techniques&meta=2025%2C%20Perry%2C%20Anne%20Griffin%2C%20RN%2C%20MSN%2C%20EdD%2C%20FAAN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20220001513%2Fcov200h.gif"
     },
     {
      "author": "Chang, E., & Daly, J. (2024)",
      "title": "Transitions in Nursing: Preparing for Professional Practice. Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20210033800?origin=share&title=Transitions%20in%20Nursing&meta=2024%2C%20Chang%2C%20Emeritus%20Professor%20Esther%2C%20RN%2C%20CM%2C%20DNE%2C%20BAppSc(AdvNur)%2C%20MEdAdmin%2C%20PhD%2C%20FACN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20210033800%2Fcov200h.gif"
     },
     {
      "author": "Reynolds L (2024)",
      "title": "Understanding the Australian Health Care System, Fifth Edition ANZ. Australian Edition.? Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200045366?origin=share&title=Understanding%20the%20Australian%20Health%20Care%20System&meta=2024%2C%20Reynolds%2C%20Louise%2C%20RP%2C%20PhD%2C%20BHSc(PHC)%2C%20GradCertEd%2C%20MPH%2C%20FACPara&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200045366%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7022",
    "title": "Clinical Leadership in Nursing",
    "books": [
     {
      "author": "Huber, D., &amp; Joseph, M. L. (2022)",
      "title": "Leadership and nursing care management (7th ed.). Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20180051555?origin=share&title=Leadership%20and%20Nursing%20Care%20Management&meta=2022%2C%20Huber%2C%20Diane&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20180051555%2Fcov200h.gif"
     },
     {
      "author": "Henry, H. (2023)",
      "title": "Be a leader in nursing: a practical guide for nursing students. Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20200020931?origin=share&title=Be%20a%20Leader%20in%20Nursing&meta=2023%2C%20Henry%2C%20Heather%2C%20RN%2C%20BSC%20Hons%20Nursing%2C%20MBA%2C%20Queen%E2%80%99s%20Nurse&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20200020931%2Fcov200h.gif"
     },
     {
      "author": "Daly, J., Speedy, S., & Jackson, D. (2015)",
      "title": "Leadership & nursing : contemporary perspectives. Churchill Livingstone",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20140013809?origin=share&title=Leadership%20and%20Nursing%3A%20Contemporary%20Perspectives&meta=2015%2C%20Daly%2C%20John&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20140013809%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7023",
    "title": "Transitioning to the Role of the Registered Nurse",
    "books": [
     {
      "author": "Motacki, K., & Burke, K. (2022)",
      "title": "Nursing Delegation and Management of Patient Care. Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20170048085?origin=share&title=Nursing%20Delegation%20and%20Management%20of%20Patient%20Care&meta=2023%2C%20Motacki%2C%20Kathleen%2C%20MSN%2C%20BSN%2C%20RN&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20170048085%2Fcov200h.gif"
     },
     {
      "author": "Rosser, E. (2023)",
      "title": "Leading And Managing in Contemporary Health and Social Care. Elsevier Health Science",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20190036205?origin=share&title=Leading%20and%20Managing%20in%20Contemporary%20Health%20and%20Social%20Care&meta=2023%2C%20Rosser%2C%20Elizabeth%20Anne%2C%20DPhil%2C%20MN%2C%20Dip%20N%20Ed%2C%20Dip%20RM%2C%20RN%2C%20RNT%2C%20PFHEA&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20190036205%2Fcov200h.gif"
     },
     {
      "author": "Carter, C., Raleigh, M., Curr, S., Stewart, C., & Jones, A.(2024)",
      "title": "Handbook for Registered Nurses. Elsevier Limited (UK)",
      "url": "https://www.clinicalkey.com/student/nursing/content/toc/3-s2.0-C20160036148?origin=share&title=Handbook%20for%20Registered%20Nurses&meta=2024%2C%20Carter%2C%20Chris%2C%20MEd%2C%20BSc%20(Hons)%2C%20DipHE%2C%20RN(A)&img=https%3A%2F%2Fcdn.clinicalkey.com%2Fck-thumbnails%2FC20160036148%2Fcov200h.gif"
     }
    ]
   },
   {
    "code": "N7024",
    "title": "PEP 5",
    "books": []
   }
  ]
 },
 {
  "id": 4,
  "slug": "bachelor-of-social-work",
  "name": "Bachelor of Social Work",
  "school": "School of Social Work",
  "units": [
   {
    "code": "C7003",
    "title": "Introduction to Psychology & Sociology",
    "books": [
     {
      "author": "Griffiths, H. K. (2022)",
      "title": "Introduction to Sociology 2e. Openstax",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9921296650681"
     },
     {
      "author": "Bland, R., Drake, G., & Drayton, J. (2021)",
      "title": "Social work practice in mental health: an introduction(Third edition.). Routledge, Taylor & Francis Group",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909906811"
     },
     {
      "author": "Bland, R. R. (2022)",
      "title": "Social Work Practice in Mental Health: An Introduction",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213166606811"
     },
     {
      "author": "Tajan, N. (2021)",
      "title": "Mental Health and Social Withdrawal in Contemporary Japan: Beyond the Hikikomori Spectrum(1st ed.). Kyoto University",
      "url": "https://doi.org/10.4324/9781351260800"
     }
    ]
   },
   {
    "code": "A7003",
    "title": "Introduction to Values and Skills for Social Work",
    "books": [
     {
      "author": "McAuliffe, D., Boddy, J., & Chenoweth, L. (2023)",
      "title": "The Road to Social Work and Human Service Practice.(7th ed.). Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99209266506811"
     }
    ]
   },
   {
    "code": "A7007",
    "title": "Social Care System: history & contexts",
    "books": [
     {
      "author": "Mendes, P. (2003)",
      "title": "Australia’s welfare wars: the players, the politics and the ideologies. UNSW Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/19g9968/alma9933909706811"
     },
     {
      "author": "Mendes, P. (2022)",
      "title": "Australia’s Welfare Wars: The Players, the Politics and the Ideologies. NewSouth Books",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/19g9968/alma99213166506811"
     }
    ]
   },
   {
    "code": "A7005",
    "title": "Foundational Interpersonal Skills and Communications for Health and Social Services",
    "books": [
     {
      "author": "Koprowska, J. (2022)",
      "title": "Communication & Interpersonal Skills in Social Work. Learning Matters",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213166306811"
     },
     {
      "author": "Kumar, V. K., & Tahmaseb-McConatha, J. (2023)",
      "title": "Life Satisfaction and Psychological and Physical Well-Being. MDPI - Multidisciplinary Digital Publishing Institute",
      "url": "https://doi.org/10.3390/books978-3-0365-6821-8"
     }
    ]
   },
   {
    "code": "A7006",
    "title": "Critical Social Theories",
    "books": [
     {
      "author": "Payne, M. (2021)",
      "title": "Modern social work theory(Fifth edition.). Red Globe Press an imprint of Macmillan Education",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909506811"
     },
     {
      "author": "Nipperess, S. (2022)",
      "title": "Critical multicultural practice in social work: new perspectives and practices. Allen & Unwin",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/19g9968/alma99212966106811"
     },
     {
      "author": "Adams, R., Dominelli, L., & Payne, M. (Eds.). (2009)",
      "title": "Critical practice in social work(Second edition.). Palgrave Macmillan",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933910106811"
     },
     {
      "author": "Healy, K. (2022)",
      "title": "Social Work Theories in Context: Creating Frameworks for Practice. Palgrave Macmillan",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213165406811"
     },
     {
      "author": "Malcolm, P. D. (2022)",
      "title": "Modern Social Work Theory. Palgrave Macmillan",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213165606811"
     },
     {
      "author": "Götz, N., Brewis, G., & Werther, S. (2020)",
      "title": "Humanitarianism in the Modern World: The Moral Economy of Famine Relief. Cambridge University Press",
      "url": "https://doi.org/10.1017/9781108655903"
     },
     {
      "author": "Walby, S., & Shire, K. A. (2024)",
      "title": "Trafficking Chains: Modern Slavery in Society. Bristol University Press",
      "url": "https://doi.org/10.47674/9781529232363"
     },
     {
      "author": "Haapala, P., Harjula, M., Kokko, H., Harjula, M., Kokko, H., & Haapala, P. (2023)",
      "title": "Experiencing Society and the Lived Welfare State(1st ed.). Springer Nature",
      "url": "https://doi.org/10.1007/978-3-031-21663-3."
     }
    ]
   },
   {
    "code": "C7001",
    "title": "Aboriginal & Torres Strait Islander & Transcultural Healt",
    "books": [
     {
      "author": "Smith, J. D. (2016)",
      "title": "Australia’s rural, remote and indigenous health (3rd edition.). Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99211566506811."
     },
     {
      "author": "Dade Smith, J. (2022)",
      "title": "Australia’s Rural, Remote and Indigenous Health. Elsevier",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99224741106811."
     },
     {
      "author": "Dudgeon, P., Milroy, H., & Walker, R. (Eds.) (2014)",
      "title": "Working Together: Aboriginal and Torres Strait Islander Mental Health and Wellbeing Principles and Practice. (2nd Edition ed.) Commonwealth of Australia",
      "url": "https://www.indigenousjustice.gov.au/resources/working-together-aboriginal-and-torres-strait-islander-mental-health-and-wellbeing-principles-and-practice/"
     },
     {
      "author": "McGlade, H. (2012)",
      "title": "Our Greatest Challenge: Aboriginal Children and Human Rights: Aboriginal Children and Human Rights. Aboriginal Studies Press",
      "url": "https://search.informit.org/doi/10.3316/informit.9781922059116"
     }
    ]
   },
   {
    "code": "C7002",
    "title": "Ethics and Law",
    "books": [
     {
      "author": "Maylea, C. (2020)",
      "title": "Social work and the law: a guide for ethical practice. Macmillan International Higher Education?; Red Globe Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9994844706811."
     },
     {
      "author": "Holden, L., Holden, L., & Holden, L. (2023)",
      "title": "Cultural Expertise, Law, and Rights: A Comprehensive Guide (1st ed., Vol. 1). Routledge",
      "url": "https://doi.org/10.4324/9781003167075"
     }
    ]
   },
   {
    "code": "A7008",
    "title": "Introduction to Human Rights",
    "books": [
     {
      "author": "Jim Ife, K. S. (2022)",
      "title": "Human Rights and Social Work: Towards Rights-Based Practice. Cambridge University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213165306811."
     },
     {
      "author": "Ife, J. (2009)",
      "title": "Human Rights from Below: Achieving Rights through Community Development(1st ed., pp. vii–vii). Cambridge University Press",
      "url": "https://doi.org/10.1017/CBO9780511808340"
     }
    ]
   },
   {
    "code": "A7009",
    "title": "Social & Health Research Frameworks",
    "books": [
     {
      "author": "Bickman, L., & Rog, D. J. (2009)",
      "title": "The SAGE handbook of applied social research methods. SAGE Publications, Inc.,",
      "url": "https://doi.org/10.4135/9781483348858"
     },
     {
      "author": "Fairclough, N. (2022)",
      "title": "Analyzing Discourse: Textual Analysis for Social Research. Routledge",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213164006811."
     },
     {
      "author": "Ragin, C. C. (2023)",
      "title": "Analytic Induction for Social Research / (1st ed.). University of California Press,",
      "url": "https://doi.org/10.1525/9780520393745"
     },
     {
      "author": "Singh, K. (2016)",
      "title": "Quantitative social research methods. SAGE",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99216068606811"
     },
     {
      "author": "Loseke, D. R. (2021)",
      "title": "Narrative As Topic and Method in Social Research. SAGE Publications, Inc",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99216493706811"
     }
    ]
   },
   {
    "code": "",
    "title": "Group work Theory & practices",
    "books": [
     {
      "author": "Brown, A. (2017)",
      "title": "Groupwork (Third edition.). Routledge",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909206811"
     },
     {
      "author": "Boyles, J. (Ed.). (2022)",
      "title": "Groupwork with refugees and survivors of human rights abuses?: the power of togetherness. Taylor & Francis",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99110061606811"
     }
    ]
   },
   {
    "code": "H7002",
    "title": "Human Lifespan Development",
    "books": [
     {
      "author": "Sigelman, C. K., De George, L., Cunial, K., Rider, E. A., Kholer, M., & Ballam, N. (2022)",
      "title": "Life span human development(Fourth Australian&New Zealand edition.). Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99135166106811"
     },
     {
      "author": "Harms, L. (2021).Understanding human development 3e ebook?(3rd ed.)",
      "title": "Oxford University Press Australia and New Zealand",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99135166006811"
     },
     {
      "author": "John Stones, M., Baker, J., John Stones, M., & Baker, J. (2020)",
      "title": "Modeling Human Potential Across the Lifespan. Frontiers Media SA",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9978295806811"
     },
     {
      "author": "Poeggeler, B. (2023)",
      "title": "Tryptophan in Nutrition and Health. MDPI - Multidisciplinary Digital Publishing Institute",
      "url": "https://doi.org/10.3390/books978-3-0365-7076-1"
     },
     {
      "author": "Baker, J., & John Stones, M. (2020)",
      "title": "Modeling Human Potential Across the Lifespan. Frontiers Media SA",
      "url": "https://doi.org/10.3389/978-2-88963-559-7"
     },
     {
      "author": "Mohajeri, M. H., & Mohajeri, M. H. (2022)",
      "title": "Nutrition for Brain Development. MDPI - Multidisciplinary Digital Publishing Institute",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9983243506811"
     }
    ]
   },
   {
    "code": "A7011",
    "title": "Skills for Professional Social Work Practices",
    "books": [
     {
      "author": "Adams, R., Dominelli, L., & Payne, M. (Eds.). (2009)",
      "title": "Critical practice in social work(Second edition.). Palgrave Macmillan",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933910106811."
     },
     {
      "author": "Williams, C., Nipperess, S., & Williams, C. (2019)",
      "title": "CRITICAL MULTICULTURAL PRACTICE in SOCIAL WORK: New perspectives and practices (1st edition). Routledge",
      "url": "https://doi.org/10.4324/9781003115298"
     },
     {
      "author": "Drolet, J. L., Charles, G., McConnell, S. M., Bogo, M., Charles, G., Bogo, M., Drolet, J. L., & McConnell, S. (2022)",
      "title": "Transforming Social Work Field Education: New Insights from Practice Research and Scholarship (1st ed.). University of Calgary Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC30292341"
     }
    ]
   },
   {
    "code": "A7001",
    "title": "Managing Human Service Organisations",
    "books": [
     {
      "author": "McDonald, C. (2011)",
      "title": "Professional practice in human service organisations?: a practical guide for human service workers. Allen & Unwin",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99190717106811"
     },
     {
      "author": "Falch-Eriksen, A. (2018)",
      "title": "Human Rights in Child Protection: Implications for Professional Practice and Policy (Asgeir. Falch-Eriksen & Elisabeth. Backe-Hansen, Eds.; 1st ed. 2018.). Springer Nature. \\r \\r",
      "url": "https://doi.org/10.1007/978-3-319-94800-3"
     }
    ]
   },
   {
    "code": "A7013",
    "title": "Trauma, Health & Social Work",
    "books": [
     {
      "author": "McAuliffe, D., Boddy, J., & Chenoweth, L. (2023)",
      "title": "The Road to Social Work and Human Service Practice. (7th ed.). Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99209266506811"
     },
     {
      "author": "Bland, R., Drake, G., & Drayton, J. (2021)",
      "title": "Social work practice in mental health: an introduction?(Third edition.). Routledge, Taylor & Francis Group",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909906811"
     },
     {
      "author": "Bland, R. R. (2022)",
      "title": "Social Work Practice in Mental Health: An Introduction",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213166606811"
     }
    ]
   },
   {
    "code": "A7014",
    "title": "Culture, Identity & Race: Culturally Inclusive Practices",
    "books": [
     {
      "author": "Williams, C., Nipperess, S., & Williams, C. (2019)",
      "title": "CRITICAL MULTICULTURAL PRACTICE in SOCIAL WORK: New perspectives and practices (1st edition). Routledge",
      "url": "https://doi.org/10.4324/9781003115298"
     },
     {
      "author": "yter, S., & Susan Hayter. (2011)",
      "title": "The role of collective bargaining in the global economy: Negotiating for social justice (1st ed., pp. x–x). Elgar",
      "url": "https://doi.org/10.4337/978184980983"
     },
     {
      "author": "Heinz, M., Keane, E., & Mc Daid, R. (Eds.). (2023)",
      "title": "Diversifying the teaching profession: dimensions, dilemmas, and directions for the future. Routledge",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/19g9968/alma99227640806811"
     }
    ]
   },
   {
    "code": "A7015",
    "title": "Community Development & Advocacy",
    "books": [
     {
      "author": "Ife, J. (2022)",
      "title": "Community Development in an Uncertain World: Vision, Analysis and Practice. Cambridge University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213165106811"
     }
    ]
   },
   {
    "code": "H7003",
    "title": "Mental Health Frameworks",
    "books": [
     {
      "author": "Bland, R., Drake, G., & Drayton, J. (2021)",
      "title": "Social work practice in mental health: an introduction(Third edition.). Routledge, Taylor & Francis Group",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909906811"
     },
     {
      "author": "Bland, R. R. (2022)",
      "title": "Social Work Practice in Mental Health: An Introduction",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213166606811"
     }
    ]
   },
   {
    "code": "A7016",
    "title": "Global Development & Perspectives",
    "books": [
     {
      "author": "Battersby, P., & Roy, R. K. (2017)",
      "title": "International development: a global perspective on theory and practice (First edition.). Sage",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99196066606811"
     }
    ]
   },
   {
    "code": "A70118",
    "title": "Working with Children, Young People & Families",
    "books": [
     {
      "author": "McAuliffe, D., Boddy, J., & Chenoweth, L. (2023)",
      "title": "The Road to Social Work and Human Service Practice. (7th ed.). Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99209266506811"
     },
     {
      "author": "Bland, R., Drake, G., & Drayton, J. (2021)",
      "title": "Social work practice in mental health: an introduction (Third edition.). Routledge, Taylor & Francis Group",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909906811"
     },
     {
      "author": "Bland, R. R. (2022)",
      "title": "Social Work Practice in Mental Health: An Introduction",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213166606811"
     },
     {
      "author": "A.Adams, R., Dominelli, L., & Payne, M. (Eds.). (2009)",
      "title": "Critical practice in social work (Second edition.). Palgrave Macmillan",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933910106811."
     }
    ]
   },
   {
    "code": "A7019",
    "title": "Placement seminars",
    "books": []
   },
   {
    "code": "A7019",
    "title": "Professional Practice (Field Placement 1)",
    "books": [
     {
      "author": "Cleak, H. W. (2022)",
      "title": "Making the Most of Field Placement. Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213163406811."
     }
    ]
   },
   {
    "code": "A7020",
    "title": "Social Research Methods",
    "books": [
     {
      "author": "Walliman, N. (2006)",
      "title": "Social research methods. SAGE",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99216120606811"
     },
     {
      "author": "York, R. O. O. (2019)",
      "title": "Social Work Research Methods: Learning by Doing (1st ed.). SAGE Publications, Incorporated",
      "url": "https://doi.org/10.4135/9781506387215"
     },
     {
      "author": "Farmer, A. Y. Y., & Farmer, G. L. L. (2020)",
      "title": "Research Methods for Social Work: A Problem-Based Approach (1st ed.). SAGE Publications, Incorporated",
      "url": "https://doi.org/10.4135/9781071878873"
     },
     {
      "author": "Sloan, L., & Quan-Haase, A. (2017)",
      "title": "The SAGE Handbook of Social Media Research Methods (1st ed.). SAGE Publications, Limited",
      "url": "https://doi.org/10.4135/9781473983847"
     },
     {
      "author": "race, K., & CohenMiller, A. (2024)",
      "title": "How to embed social justice into mixed methods research. SAGE Publications Ltd",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99216444506811."
     }
    ]
   },
   {
    "code": "A7021",
    "title": "Social Policy Frameworks",
    "books": [
     {
      "author": "Ed Carson, L. K. (2022)",
      "title": "Australian Social Policy and the Human Services. Cambridge University Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213165206811"
     },
     {
      "author": "McAuliffe, D., Boddy, J., & Chenoweth, L. (2023)",
      "title": "The Road to Social Work and Human Service Practice. (7th ed.). Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99209266506811"
     }
    ]
   },
   {
    "code": "A7022",
    "title": "Abuse & Exploitation across the Lifespan: Empowerment Practices",
    "books": [
     {
      "author": "Alexander, R. (2018)",
      "title": "Family Violence in Australia: The Legal Response. Federation Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99195566606811"
     },
     {
      "author": "Stychin, C. F. (Ed.). (2023)",
      "title": "Law, Humanities and the COVID Crisis. University of London Press",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99135406206811"
     },
     {
      "author": "Websdale, N. (2024)",
      "title": "Fatal Family Violence and the Dementias: Gray Mist Killings (1st ed.). Routledge",
      "url": "https://doi.org/10.4324/9781003333869."
     },
     {
      "author": "McGlade, H. (2012)",
      "title": "Our Greatest Challenge: Aboriginal Children and Human Rights: Aboriginal Children and Human Rights. Aboriginal Studies Press",
      "url": "https://search.informit.org/doi/10.3316/informit.9781922059116."
     },
     {
      "author": "McGlade, H. (2012)",
      "title": "Our Greatest Challenge: Aboriginal Children and Human Rights: Aboriginal Children and Human Rights. Aboriginal Studies Press",
      "url": "https://search.informit.org/doi/10.3316/informit.9781922059116"
     },
     {
      "author": "Welchman, L., Hossain, S., Hossain, S., & Welchman, L. (2005)",
      "title": "Honour: Crimes, paradigms and violence against women (1st ed., pp. xiv–xiv). Zed Books",
      "url": "https://doi.org/10.5040/9781350220621"
     },
     {
      "author": "Ahmed, F., & Krayem, G. (2021)",
      "title": "Understanding Sharia Processes: Women’s Experiences of Family Disputes. Bloomsbury Academic",
      "url": "https://doi.org/10.5040/9781509920761"
     },
     {
      "author": "Gregory, J., & Lees, S. (1999)",
      "title": "Policing sexual assault (1st ed.). Routledge",
      "url": "https://doi.org/10.4324/9780203056714"
     }
    ]
   },
   {
    "code": "A7023",
    "title": "(Dis)Ability Experiences, Concepts & Change",
    "books": [
     {
      "author": "Findlay, C. (Ed.). (2021)",
      "title": "Growing up disabled in Australia. Black Inc",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99194880006811"
     },
     {
      "author": "Dening, T., Gordon, A., & Devi, R. (2022)",
      "title": "Enhancing the Quality of Care in Long-Term Care Settings. MDPI - Multidisciplinary Digital Publishing Institute",
      "url": "https://doi.org/10.3390/books978-3-0365-3156-4"
     }
    ]
   },
   {
    "code": "A7024",
    "title": "Placement seminars",
    "books": []
   },
   {
    "code": "A7024",
    "title": "Professional Practice (Field Placement 1)",
    "books": [
     {
      "author": "Cleak, H. W. (2022)",
      "title": "Making the Most of Field Placement. Cengage Learning Australia",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213163406811."
     }
    ]
   },
   {
    "code": "C7001",
    "title": "Introduction to Public Health & Wellbeing",
    "books": [
     {
      "author": "Lin, V. (2014)",
      "title": "Public health practice in Australia: the organised effort(Second edition.). Allen & Unwin",
      "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909606811"
     }
    ]
   }
  ]
 }
]
