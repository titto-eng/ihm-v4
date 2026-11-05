// /library-guide-bsw/ — WordPress page 8215 (Social Work Library Guide): databases, eBooks, journals, referencing and writing
// help, academic integrity and GenAI, and IHM Library links. Extracted from the page content (2026-10-30). Book covers are on
// the live site only (theme images/library-bsw/), listed in legacy-assets.ts → public/images/library/bsw/; until downloaded the
// page draws a typographic cover. The old "Ask a librarian" went to a staff member's mailbox; it now goes to Student Support.

export type GuideLink = { name: string; url: string; body: string }
export type GuideBook = { title: string; author: string; year: string; url: string; cover: string }
export type GuideGroup<T> = { title: string; items: T[] }

export const BSW_ASK_LIBRARIAN = 'mailto:studentsupport@ihm.edu.au?subject=Library%20consultation'

export const BSW_GUIDE: {
  databases: GuideGroup<GuideLink>[]
  books: GuideBook[]
  journalsIntro: string
  journals: GuideGroup<{ name: string; url: string }>[]
  journalsNote: string
  writing: GuideLink[]
  writingNotes: Record<string, string>
  integrity: GuideLink[]
  integrityIntro: string[]
  integrityWhy: string
  integrityMore: string[]
  library: GuideLink[]
  librarian: string
} = {
 "databases": [
  {
   "title": "Key Social Work Databases",
   "items": [
    {
     "name": "Sociology Source Ultimate (EBSCO)",
     "url": "https://search.ebscohost.com/login.aspx?authtype=ip,shib&custid=ns234062&groupid=main&profile=ehost&defaultdb=sxi",
     "body": "Sociology Source Ultimate provides access to full-text sociology journals, including the highest number of peer-reviewed journals among all sociology research databases."
    },
    {
     "name": "CINAHL Ultimate (EBSCO)",
     "url": "https://search.ebscohost.com/login.aspx?authtype=ip,shib&custid=ns234062&groupid=main&profile=ehost&defaultdb=cul",
     "body": "It is a comprehensive full-text database for allied health and nursing research. It offers full-text access to a substantial portion of the most frequently cited journals in the CINAHL index, surpassing other databases."
    },
    {
     "name": "DOAJ (Directory of Open Access Journals)",
     "url": "https://doaj.org/",
     "body": "DOAJ is an extensive index of diverse open access journals from around the world, driven by a growing community, and is committed to ensuring quality content is freely available online for everyone."
    },
    {
     "name": "SAGE Open",
     "url": "https://journals.sagepub.com/home/sgo",
     "body": "SAGE Open is an open access publication from Sage. It publishes peer-reviewed, original research and review articles in an open access format. Articles may span the full spectrum of the social and behavioural sciences and the humanities."
    },
    {
     "name": "Sage Health Sciences",
     "url": "https://journals.sagepub.com/action/showPublications?CategoryFilterField=6352",
     "body": "This database includes journal titles published by Sage and participating societies. Covering such subjects as public health, clinical medicine, nursing, psychology, biomedical sciences, social work, sociology, aging and gerontology."
    },
    {
     "name": "Sage Research Methods",
     "url": "https://methods.sagepub.com/",
     "body": "Sage Research Methods is a comprehensive online resource for research methods, particularly within the social and behavioral sciences. It provides access to a vast collection of books, journal articles, and reference materials related to research methodologies, including both quantitative and qualitative approaches."
    },
    {
     "name": "Informit - Australian Public Affairs Full Text (APAFT)",
     "url": "https://search.informit.org/?dbs=ielapa",
     "body": "Explore diverse perspectives on Australia’s political, economic and social affairs with Informit’s Australian Public Affairs Full Text (APAFT) Collection."
    },
    {
     "name": "Informit - Families & Society Collection",
     "url": "https://search.informit.org/?dbs=ielfsc",
     "body": "Families and Societies Collection contains evidence-based information and resources spanning child development, parenting and family dynamics."
    },
    {
     "name": "Informit - Health Collection",
     "url": "https://search.informit.org/?dbs=ielhea",
     "body": "Supporting the professional practice of evidence-based treatment, this collection features comprehensive coverage of key disciplines across all aspects relevant to nursing, general, specialist and allied health."
    },
    {
     "name": "Informit - Humanities & Social Sciences Collection",
     "url": "https://search.informit.org/?dbs=ielhss",
     "body": "Features unique and specialised content sourced from Australian and international publishers. Expand your knowledge as you access the latest academic, authoritative and most trustworthy information specific to your search."
    },
    {
     "name": "Informit - Indigenous Collection",
     "url": "https://search.informit.org/?dbs=ielind",
     "body": "Offering broad scope for critical international engagement and debate surrounding Indigenous culture, health, human geography and other important aspects, this inter-disciplinary platform gives definitive voice to Indigenous communities in Australia, New Zealand and beyond."
    }
   ]
  },
  {
   "title": "Other Relevant Databases",
   "items": [
    {
     "name": "Sage Video",
     "url": "https://sk.sagepub.com/video",
     "body": "An expansive educational video library that immerses users in the social sciences through real-world scenarios with top experts."
    },
    {
     "name": "MEDLINE Ultimate",
     "url": "https://search.ebscohost.com/login.aspx?authtype=ip,shib&custid=ns234062&groupid=main&profile=ehost&defaultdb=mdl",
     "body": "MEDLINE Ultimate is the largest full-text companion to the MEDLINE index, designed for medical professionals and researchers. However, it can provide social workers with access to high-quality research on mental health, public health, and social determinants of health, all central to social work practice."
    },
    {
     "name": "PubMed",
     "url": "https://pubmed.ncbi.nlm.nih.gov/",
     "body": "PubMed can be helpful for health-related social work. PubMed covers a vast range of peer-reviewed journals in medicine, nursing, psychology, psychiatry, public health, and behavioural sciences. These areas strongly overlap with social work practice (e.g., mental health, substance use, family violence, disability, aged care, health policy). Many interventions in social work (motivational interviewing, trauma-informed care, chronic illness management, child protection in health settings) are evaluated in health journals indexed in PubMed."
    },
    {
     "name": "Ovid",
     "url": "https://ovidsp.dc2.ovid.com/ovid-new-b/ovidweb.cgi",
     "body": "The JBI EBP Database is very useful for social work where practice intersects with health, wellbeing, and care, and it can valuable for systematic reviews, evidence synthesis, and practice guidelines. However, it should be supplemented by social science/social work–focused databases for areas outside health and care contexts."
    },
    {
     "name": "Cochrane Library",
     "url": "https://www.cochranelibrary.com/",
     "body": "Collection of Cochrane databases containing high-quality reviews of research into human health to help people make informed choices about health."
    }
   ]
  },
  {
   "title": "Other Search Engines",
   "items": [
    {
     "name": "Google Scholar",
     "url": "https://scholar.google.com.au/",
     "body": "Google Scholar provides a simple way to broadly search for scholarly resources, including journal articles, conference papers, theses, books, preprints, abstracts, and technical reports. However, not all content is freely available in full text, as access often depends on subscriptions or institutional login."
    }
   ]
  }
 ],
 "books": [
  {
   "title": "Social Work Education: Breaking New Grounds and Addressing New Challenges",
   "author": "Keet, Annaline Caroline Sandra.; Noble, Carolyn.",
   "year": "2025",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/r7qp8j/alma99340095806811",
   "cover": "/images/library/bsw/soc-work-practice.webp"
  },
  {
   "title": "Working Together - Transforming Indigenous Mental Health and Wellbeing",
   "author": "Professor Pat Dudgeon AM, Professor Roz Walker, Professor Helen Milroy AM",
   "year": "2014",
   "url": "https://timhwb.org.au/working-together-book/",
   "cover": "/images/library/bsw/working-together-aboriginal-and-wellbeing-2014-angled-826x1024.webp"
  },
  {
   "title": "Social Work Practice in Mental Health: An Introduction",
   "author": "Bland, R.R",
   "year": "2022",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99213166606811",
   "cover": "/images/library/bsw/index2.webp"
  },
  {
   "title": "Mental Health and Social Withdrawal in Contemporary Japan: Beyond the Hikikomori Spectrum (1st ed.). Routledge",
   "author": "Tajan, N",
   "year": "2021",
   "url": "https://doi.org/10.4324/9781351260800",
   "cover": "/images/library/bsw/index3.webp"
  },
  {
   "title": "Australia’s Welfare Wars, The Players, The Politics and the Ideologies. University of New South Wales Press",
   "author": "Mendes, P",
   "year": "2003",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/19g9968/alma9933909706811",
   "cover": "/images/library/bsw/aus-wel-war-play.webp"
  },
  {
   "title": "Humanitarianism in the Modern World: The Moral Economy of Famine Relief. Cambridge University Press; 2020",
   "author": "Götz N, Brewis G, Werther S",
   "year": "2020",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99123486006811",
   "cover": "/images/library/bsw/humanitarianism-in-the-modern-world.webp"
  },
  {
   "title": "Modern social work theory (Fifth edition.). Red Globe Press an imprint of Macmillan Education",
   "author": "Payne, M",
   "year": "2021",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909506811",
   "cover": "/images/library/bsw/modern-social-work-theory.webp"
  },
  {
   "title": "Our Greatest Challenge: Aboriginal Children and Human Rights: Aboriginal Children and Human Rights. Aboriginal Studies Press",
   "author": "McGlade, H",
   "year": "2012",
   "url": "https://search.informit.org/doi/10.3316/informit.9781922059116",
   "cover": "/images/library/bsw/our-greatest-challenge-aboriginal-children-and-human-rights.webp"
  },
  {
   "title": "Cultural Expertise, Law, and Rights: A Comprehensive Guide (1st ed.). Routledge",
   "author": "Holden, L. (Ed.)",
   "year": "2023",
   "url": "https://library.oapen.org/bitstream/20.500.12657/75986/1/9781000884630.pdf",
   "cover": "/images/library/bsw/cultural-expertise-law-and-rights.webp"
  },
  {
   "title": "Social work and the law : a guide for ethical practice. Macmillan International Higher Education ; Red Globe Press",
   "author": "Maylea, C",
   "year": "2020",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9994844706811",
   "cover": "/images/library/bsw/social-work-and-the-law.webp"
  },
  {
   "title": "Human Rights from Below: Achieving Rights through Community Development (1st ed., pp. vii–vii). Cambridge University Press",
   "author": "Ife, J",
   "year": "2009",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_miscellaneous_861384903",
   "cover": "/images/library/bsw/human-rights-from-below.webp"
  },
  {
   "title": "Quantitative social research methods. SAGE",
   "author": "Singh, K",
   "year": "2016",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99216068606811",
   "cover": "/images/library/bsw/quantitative-social-research-methods.webp"
  },
  {
   "title": "Groupwork (Third edition.). Routledge",
   "author": "Brown, A.",
   "year": "2017",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909206811",
   "cover": "/images/library/bsw/groupwork.webp"
  },
  {
   "title": "Life span human development (Fourth Australian&New Zealand edition.). Cengage Learning Australia",
   "author": "Sigelman, C. K., De George, L., Cunial, K., Rider, E. A., Kholer, M., & Ballam, N.",
   "year": "2022",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99135166106811",
   "cover": "/images/library/bsw/life-span-human-development.webp"
  },
  {
   "title": "Understanding human development 3e ebook (3rd ed.). Oxford University Press Australia and New Zealand",
   "author": "Harms, L",
   "year": "2021",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99135166006811",
   "cover": "/images/library/bsw/understanding-human-development-ebook.webp"
  },
  {
   "title": "CRITICAL MULTICULTURAL PRACTICE in SOCIAL WORK: New perspectives and practices (1st edition). Routledge",
   "author": "Nipperess, S., & Williams, C.",
   "year": "2019",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781000256680",
   "cover": "/images/library/bsw/critical-multicultural-practice-in-social-work.webp"
  },
  {
   "title": "Transforming social work field education : new insights from practice research and scholarship (1st ed.). LCR Publishing Services",
   "author": "Drolet, J. L.",
   "year": "2022",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99123420706811",
   "cover": "/images/library/bsw/transforming-social-work-field-education.webp"
  },
  {
   "title": "Professional practice in human service organisations : a practical guide for human service workers. Allen & Unwin",
   "author": "McDonald, C",
   "year": "2011",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99190717106811",
   "cover": "/images/library/bsw/professional-practice-in-human-service-organisations.webp"
  },
  {
   "title": "Human Rights in Child Protection : Implications for Professional Practice and Policy (Asgeir. Falch-Eriksen & Elisabeth. Backe-Hansen, Eds.; 1st ed. 2018.). Springer International Publishing",
   "author": "Falch-Eriksen, A",
   "year": "2018",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9943507606811",
   "cover": "/images/library/bsw/human-rights-in-child-protection.webp"
  },
  {
   "title": "The Road to Social Work and Human Service Practice. (7th ed.). Cengage Learning Australia",
   "author": "McAuliffe, D., Boddy, J., & Chenoweth, L.",
   "year": "2023",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99209266506811",
   "cover": "/images/library/bsw/road-to-social-work.webp"
  },
  {
   "title": "Social work practice in mental health : an introduction (Third edition.). Routledge, Taylor & Francis Group",
   "author": "Bland, R., Drake, G., & Drayton, J",
   "year": "2021",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909906811",
   "cover": "/images/library/bsw/social-work-e-book.webp"
  },
  {
   "title": "International development : a global perspective on theory and practice (First edition.). Sage",
   "author": "Battersby, P., & Roy, R. K",
   "year": "2017",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99196066606811",
   "cover": "/images/library/bsw/international-development-a-global-perspective-on-theory-and-practice.webp"
  },
  {
   "title": "CRITICAL MULTICULTURAL PRACTICE in SOCIAL WORK: New perspectives and practices (1st edition). Routledge",
   "author": "Nipperess, S., & Williams, C Publication date: 2019",
   "year": "2019",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_askewsholts_vlebooks_9781000256680",
   "cover": "/images/library/bsw/critical-multicultural-practice-in-social-work.webp"
  },
  {
   "title": "Critical practice in social work (Second edition.). Palgrave Macmillan",
   "author": "Adams, R., Dominelli, L., & Payne, M. Publication date: 2009",
   "year": "2009",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933910106811",
   "cover": "/images/library/bsw/critical-practice-in-social-work.webp"
  },
  {
   "title": "The Road to Social Work and Human Service Practice. (7th ed.). Cengage Learning Australia",
   "author": "McAuliffe, D., Boddy, J., & Chenoweth, L Publication date: 2023",
   "year": "2023",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99209266506811",
   "cover": "/images/library/bsw/road-to-social-work.webp"
  },
  {
   "title": "Family Violence in Australia : The Legal Response. Federation Press",
   "author": "Alexander, R Publication date: 2018",
   "year": "2018",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99195566606811",
   "cover": "/images/library/bsw/family-violence-in-australia-the-legal-response-federation-press.webp"
  },
  {
   "title": "Our Greatest Challenge: Aboriginal Children and Human Rights (1st ed.). Aboriginal Studies Press",
   "author": "McGlade, H Publication date: 2012",
   "year": "2012",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/9s445t/cdi_proquest_ebookcentral_EBC988936",
   "cover": "/images/library/bsw/our-greatest-challenge-aboriginal-children-and-human-rights-1st-ed.webp"
  },
  {
   "title": "Fatal Family Violence and the Dementias : Gray Mist Killings (1st ed.). Routledge, Taylor & Francis Group",
   "author": "Websdale, N Publication date: 2024",
   "year": "2024",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/19g9968/alma99244756506811",
   "cover": "/images/library/bsw/fatal-family-violence.webp"
  },
  {
   "title": "Understanding Sharia Processes : women’s experiences of family disputes. HART Publishing",
   "author": "Ahmed, F., & Krayem, G Publication date: 2019",
   "year": "2019",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma99242181306811",
   "cover": "/images/library/bsw/understanding-sharia-processes-womens-experiences-of-family-disputes.webp"
  },
  {
   "title": "Growing up Disabled in Australia",
   "author": "Carly Findlay, Black Inc Publication date: 2021",
   "year": "2021",
   "url": "https://ebookcentral.proquest.com/lib/myihm/detail.action?docID=6458352",
   "cover": "/images/library/bsw/growing-up-disabled.webp"
  },
  {
   "title": "Australia's Rural, Remote and Indigenous Health - EBook, Elsevier, 2016. ProQuest Ebook Central,",
   "author": "Dade, Smith, Janie Publication date: 2016",
   "year": "2016",
   "url": "https://ebookcentral.proquest.com/lib/myihm/detail.action?docID=5553801",
   "cover": "/images/library/bsw/australia-rural-remote.webp"
  },
  {
   "title": "Public health practice in Australia : the organised effort (Second edition.). Allen & Unwin",
   "author": "Lin, V Publication date: 2014",
   "year": "2014",
   "url": "https://library.hci.edu.au/permalink/61IOHAM_INST/1o63dam/alma9933909606811",
   "cover": "/images/library/bsw/public-health-practice-in-australia-the-organised-effort-second-edition.webp"
  }
 ],
 "journalsIntro": "Online academic journals provide social workers with extensive access to peer-reviewed research literature. They are a valuable tool for staying informed about new developments, best practices, and emerging issues in social work and allied fields.",
 "journals": [
  {
   "title": "Children, Youth & Families",
   "items": [
    {
     "name": "American Journal of Family Therapy",
     "url": "https://www.tandfonline.com/journals/uaft20"
    },
    {
     "name": "American Journal of Sexuality Education",
     "url": "https://www.tandfonline.com/action/journalInformation?journalCode=wajs20"
    },
    {
     "name": "Attachment & Human Development",
     "url": "https://www.tandfonline.com/journals/rahd20"
    },
    {
     "name": "Child Abuse & Neglect",
     "url": "https://www.sciencedirect.com/journal/child-abuse-and-neglect"
    },
    {
     "name": "Child & Adolescent Social Work Journal",
     "url": "https://link.springer.com/journal/10560"
    },
    {
     "name": "Child & Family Behavior Therapy",
     "url": "https://www.tandfonline.com/journals/wcfb20"
    },
    {
     "name": "Child and Youth Care Forum: Journal of Research and Practice in Children's Services",
     "url": "https://link.springer.com/journal/10566"
    },
    {
     "name": "Child & Youth Services",
     "url": "https://link.springer.com/journal/10566"
    },
    {
     "name": "Child Maltreatment - Journal of the American Professional Society on the Abuse of Children",
     "url": "https://jamanetwork.com/journals/jama/article-abstract/414975"
    },
    {
     "name": "Child Psychiatry and Human Development",
     "url": "https://link.springer.com/journal/10578"
    },
    {
     "name": "Child and Youth Services",
     "url": "https://www.tandfonline.com/journals/wcys20"
    },
    {
     "name": "Child Welfare",
     "url": "https://www.cwla.org/child-welfare-journal/"
    },
    {
     "name": "Contemporary Family Therapy",
     "url": "https://link.springer.com/journal/10591"
    },
    {
     "name": "Families in Society: The Journal of Contemporary Human Services",
     "url": "https://archive.org/details/journalofcontemp0000unse_no2"
    },
    {
     "name": "Family Process",
     "url": "https://www.familyprocess.org/family-process-journal/"
    },
    {
     "name": "Family Relations: Interdisciplinary Journal of Applied Family Studies",
     "url": "https://www.ncfr.org/fr"
    },
    {
     "name": "Journal of Child and Adolescent Group Therapy",
     "url": "https://link.springer.com/journal/10821/volumes-and-issues"
    },
    {
     "name": "Journal of Child & Adolescent Substance Abuse",
     "url": "https://www.tandfonline.com/journals/wcas20"
    },
    {
     "name": "Journal of Child and Adolescent Trauma",
     "url": "https://www.scimagojr.com/journalsearch.php?q=19700187806&tip=sid#:~:text=The%20Journal%20of%20Child%20%26%20Adolescent%20Trauma%20presents,disorders%20related%20to%20the%20psychological%20effects%20of%20trauma."
    },
    {
     "name": "Journal of Child Psychology and Psychiatry",
     "url": "https://acamh.onlinelibrary.wiley.com/journal/14697610"
    },
    {
     "name": "Journal of Child Sexual Abuse",
     "url": "https://www.tandfonline.com/journals/wcsa20"
    },
    {
     "name": "Journal of Children and Poverty",
     "url": "https://www.tandfonline.com/journals/cjcp20"
    },
    {
     "name": "Journal of Divorce & Remarriage",
     "url": "https://www.scimagojr.com/journalsearch.php?q=25817&tip=sid"
    },
    {
     "name": "Journal of Family Issues",
     "url": "https://link.springer.com/journal/10834"
    },
    {
     "name": "Journal of Family Psychology",
     "url": "https://link.springer.com/rwe/10.1007/978-3-319-15877-8_632-1"
    },
    {
     "name": "Journal of Family Psychotherapy",
     "url": "https://link.springer.com/rwe/10.1007/978-3-319-49425-8_629"
    },
    {
     "name": "Journal of Family Social Work",
     "url": "https://www.ivysci.com/en/journals/1052-2158"
    },
    {
     "name": "Journal of Family Violence",
     "url": "https://link.springer.com/journal/10896"
    },
    {
     "name": "Journal of Feminist Family Therapy",
     "url": "https://www.tandfonline.com/journals/wfft20"
    },
    {
     "name": "Journal of Marriage & the Family",
     "url": "https://www.ncfr.org/jmf"
    },
    {
     "name": "Journal of Pediatric Psychology",
     "url": "https://pedpsych.org/journal_pediatric_psychology/#:~:text=The%20journal%20publishes%20papers%20on%20a%20wide%20variety,issues%20related%20to%20the%20training%20of%20pediatric%20psychologists."
    },
    {
     "name": "Journal of Public Child Welfare",
     "url": "https://www.tandfonline.com/journals/wpcw20"
    },
    {
     "name": "Journal of Sex and Marital Therapy",
     "url": "https://glossary.psywellpath.com/journal-of-sex-marital-therapy"
    },
    {
     "name": "Journal of Sexual Aggression",
     "url": "https://www.bing.com/search?q=Journal+of+Sexual+Aggression&form=ANNH01&refig=50ab46f629e6473d8411a70cd971afdb&pc=U531"
    },
    {
     "name": "Journal of Youth and Adolescence",
     "url": "https://link.springer.com/journal/10964"
    },
    {
     "name": "Journal of Youth Studies",
     "url": "https://www.tandfonline.com/journals/cjys20"
    },
    {
     "name": "Marriage & Family Review",
     "url": "https://www.tandfonline.com/journals/wmfr20"
    },
    {
     "name": "Merrill-Palmer Quarterly: Journal of Developmental Psychology",
     "url": "https://www.scimagojr.com/journalsearch.php?q=12691&tip=sid#:~:text=A%20high-quality%20resource%20for%20researchers%2C%20writers%2C%20teachers%2C%20and,and%20reviews%20of%20important%20new%20books%20in%20development."
    },
    {
     "name": "Physical & Occupational Therapy in Pediatrics",
     "url": "https://www.tandfonline.com/journals/ipop20"
    },
    {
     "name": "Residential Treatment for Children and Youth",
     "url": "https://ontario.cmha.ca/documents/residential-treatment-for-children-and-youth/"
    },
    {
     "name": "Social Work Forum",
     "url": "https://jswep.in/index.php/jswep"
    }
   ]
  },
  {
   "title": "Social Work in Education",
   "items": [
    {
     "name": "American Journal of Sexuality Education",
     "url": "https://www.tandfonline.com/journals/wajs20"
    },
    {
     "name": "Arete",
     "url": "https://arete.unimarconi.it/?lang=en"
    },
    {
     "name": "British Journal of Social Work",
     "url": "https://academic.oup.com/bjsw/advance-articles"
    },
    {
     "name": "Children & Schools: A Journal of Social Work Practice",
     "url": "https://miar.ub.edu/issn/1532-8759"
    },
    {
     "name": "Journal of Applied School Psychology",
     "url": "https://www.tandfonline.com/journals/wapp20"
    },
    {
     "name": "Journal of Baccalaureate Social Work",
     "url": "https://www.cswe.org/publications/journal-of-baccalaureate-social-work/"
    },
    {
     "name": "Journal of Lesbian Studies",
     "url": "https://www.tandfonline.com/journals/wjls20"
    },
    {
     "name": "Journal of Teaching and Learning",
     "url": "https://isetl.org/ijtlhe/"
    },
    {
     "name": "Journal of Social Work Education",
     "url": "https://www.tandfonline.com/journals/cswe20"
    },
    {
     "name": "Journal of Teaching in Social Work",
     "url": "https://www.tandfonline.com/journals/wtsw20"
    },
    {
     "name": "The New Social Worker: The Magazine for Social Work Professional Development Students and Recent Graduates",
     "url": ""
    },
    {
     "name": "School Social Work Journal",
     "url": "https://link.springer.com/subjects/school-and-social-work"
    },
    {
     "name": "Social Work Education: The International Journal",
     "url": "https://www.tandfonline.com/journals/cswe20"
    }
   ]
  },
  {
   "title": "Aging, Gerontology & Elder Care",
   "items": [
    {
     "name": "Activities, adaptation, & aging",
     "url": "https://www.tandfonline.com/journals/waaa20"
    },
    {
     "name": "Aging and Mental Health",
     "url": "https://www.tandfonline.com/journals/camh20"
    },
    {
     "name": "American Journal of Alzheimer's Disease and Other Dementias",
     "url": "https://journals.sagepub.com/loi/aja"
    },
    {
     "name": "Clinical Gerontologist",
     "url": "https://www.tandfonline.com/journals/wcli20"
    },
    {
     "name": "Dementia: International Journal of Social Research & Practice",
     "url": "https://journals.sagepub.com/home/dema"
    },
    {
     "name": "Gerontologist",
     "url": ""
    },
    {
     "name": "International Journal of Aging and Human Development",
     "url": "https://journals.sagepub.com/toc/ahd/current"
    },
    {
     "name": "Journal of Aging & Social Policy",
     "url": "https://www.tandfonline.com/journals/wasp20"
    },
    {
     "name": "Journal of Aging Studies",
     "url": "https://www.sciencedirect.com/journal/journal-of-aging-studies/issues"
    },
    {
     "name": "Journal of Elder Abuse & Neglect",
     "url": "https://www.tandfonline.com/journals/wean20"
    },
    {
     "name": "Journal of Gerontological Social Work",
     "url": "https://www.tandfonline.com/journals/wger20"
    },
    {
     "name": "Journal of Nutrition for the Elderly",
     "url": "https://www.tandfonline.com/journals/wjne20"
    },
    {
     "name": "Journal of Women and Aging",
     "url": "https://www.tandfonline.com/toc/wjwa20/current"
    },
    {
     "name": "Omega: Journal of Death and Dying",
     "url": "https://journals.sagepub.com/home/ome"
    },
    {
     "name": "Physical & Occupational Therapy in Geriatrics",
     "url": "https://www.tandfonline.com/journals/ipog20"
    },
    {
     "name": "Psychology and Aging",
     "url": "https://www.apa.org/pi/aging/resources/guides/psychology-and-aging"
    }
   ]
  },
  {
   "title": "Social Work Administration & Policy Journals",
   "items": [
    {
     "name": "Administration in Social Work",
     "url": ""
    },
    {
     "name": "Advances in Social Work",
     "url": "https://journalseeker.researchbib.com/view/issn/1527-8565"
    },
    {
     "name": "The Clinical Supervisor",
     "url": "https://www.tandfonline.com/journals/wcsu20"
    },
    {
     "name": "Evaluation and Program Planning",
     "url": "https://www.sciencedirect.com/journal/evaluation-and-program-planning"
    },
    {
     "name": "Journal of Policy Analysis and Management",
     "url": "https://onlinelibrary.wiley.com/journal/15206688?msockid=2c1fcd1acbcf6f903aa2db36cab06ef1"
    },
    {
     "name": "Journal of Social Service Research",
     "url": "https://www.tandfonline.com/journals/wssr20"
    },
    {
     "name": "Journal of Technology in Human Services",
     "url": "https://www.tandfonline.com/journals/wzch20"
    },
    {
     "name": "Nonprofit and Voluntary Sector Quarterly",
     "url": "https://journals.sagepub.com/home/nvs"
    },
    {
     "name": "Social Work in Public Health",
     "url": "https://www.tandfonline.com/journals/whsp20"
    }
   ]
  }
 ],
 "journalsNote": "This list is provided for your reference. Not all journals are accessible through the IHM library, but it will give you an overview of the literature published in specific fields of social work.",
 "writing": [
  {
   "name": "APA Style and Grammar Guidelines",
   "url": "https://apastyle.apa.org/style-grammar-guidelines",
   "body": "The style and grammar guidelines pages present information about APA Style as described in the Publication Manual of the American Psychological Association."
  },
  {
   "name": "Excelsior OWL Citation Style Guides",
   "url": "https://owl.excelsior.edu/citation-and-documentation/",
   "body": "The Excelsior OWL (“Online Writing Lab”) is a comprehensive online resource offering detailed guidance on academic writing formats and citation practices. It includes instructional videos, interactive checklists, and visual examples across major documentation styles such as APA, MLA, and Chicago, covering everything from in-text citations to final reference lists."
  },
  {
   "name": "Studiosity",
   "url": "https://studiosity.com/connect/users/sign_in",
   "body": "Studiosity is an ethically designed, AI‑enhanced study support platform that provides students, via their institution, with real-time, formative feedback on writing, assignments, and academic questions, backed by human oversight and academic integrity safeguards. It also offers peer mentoring, retention-focused analytics, and seamless integration with institutional support systems to enhance student success and engagement."
  },
  {
   "name": "Endnote 25",
   "url": "/end-note/",
   "body": "EndNote 2025 is the latest version of the EndNote reference management software, available to IHM students and staff. This advanced tool now features AI-powered capabilities, including AI Key Takeaways for generating concise research summaries and a Find a Journal tool that automatically recommends relevant journals for your academic work."
  }
 ],
 "integrity": [
  {
   "name": "IHM Academic Honesty and Integrity Policy and Procedure",
   "url": "/policies-procedures/",
   "body": "The IHM Academic Honesty and Integrity Policy and the accompanying Procedure on the IHM Policies & Procedures webpage set expectations for students and staff, define misconduct (e.g., plagiarism, collusion), outline roles and reporting/investigation processes, and explain outcomes, appeals, and related policies."
  },
  {
   "name": "IHM Academic Integrity Resources",
   "url": "/academic-integrity/",
   "body": "IHM's Academic Integrity library page explains what academic integrity means at IHM, why it matters, common breaches (e.g., plagiarism), and the tools and supports available, such as Turnitin and library guidance, to help students uphold honest, fair, and responsible scholarship."
  },
  {
   "name": "TEQSA: Understanding academic integrity",
   "url": "https://www.teqsa.gov.au/students/understanding-academic-integrity",
   "body": "TEQSA's \"Understanding academic integrity” explains what academic integrity is, the forms and risks of cheating, how to avoid and report illegal cheating services, and points students to practical resources and FAQs."
  },
  {
   "name": "TEQSA: Artificial intelligence (advice for students)",
   "url": "https://www.teqsa.gov.au/students/artificial-intelligence-advice-students",
   "body": "This page informs students about generative AI (such as ChatGPT) and academic integrity standards."
  }
 ],
 "library": [
  {
   "name": "IHM Library resources",
   "url": "/library/",
   "body": "The IHM Library provides students and staff with access to books, eBooks, journals, eJournals, audio-visual materials, and other scholarly resources through its digital and print collections. It also offers support services, including referencing guidance, academic integrity policies, and tools such as EndNote and Grammarly to help users manage their research and writing."
  },
  {
   "name": "Integrated Library (Primo)",
   "url": "https://library.hci.edu.au/discovery/search?vid=61IOHAM_INST:61IOHAM",
   "body": "Primo provides simple, one-stop searching for books and e-books, videos, articles, digital media, and more."
  },
  {
   "name": "Borrow books",
   "url": "https://www.superform.spot-nik.com/form/64a3a55c22d28fdab76ae94c",
   "body": "Students are welcome to borrow core textbooks for a period of up to 5 days. Please complete the form to submit your request for the titles you wish to borrow."
  }
 ],
 "writingNotes": {
  "Studiosity": "Disclaimer: available through IHM log in only"
 },
 "integrityIntro": [
  "Academic integrity means being honest and fair in your study. It's doing your own work, giving credit when you use other people's ideas, and following the rules for every task. In practice, it looks like writing in your own words, citing sources correctly (e.g., APA 7th), checking facts, and asking for help when you're unsure.",
  "Generative AI is now part of university life and professional practice, and the same academic integrity principles apply. When your unit permits it, you may use AI to spark ideas, plan your study, or clarify complex topics. You remain responsible for the accuracy, integrity, and originality of everything you submit."
 ],
 "integrityWhy": "Why it matters: it protects the value of your qualification, helps you actually learn the skills you need, and builds trust in you as a future professional.",
 "integrityMore": [
  "For further support, the resources below may be helpful.",
  "Additional assistance can be obtained through the IHM Library or Student Support teams."
 ],
 "librarian": "Our Librarian is available to provide personalised support sessions to help you make the most of the Library’s resources. You can book a session to learn how to search effectively in the Library catalogue and databases, receive guidance on installing and using EndNote for referencing, or get assistance with borrowing books and accessing other library services."
}
