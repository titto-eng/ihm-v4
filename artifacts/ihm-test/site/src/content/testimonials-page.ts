// /student-testimonials/ — WordPress page 388: 67 student video stories (YouTube ids with the old captions) and 56 written
// testimonials (photos in public/images/testimonials/; people without a photo show initials). Edit here.
export type VideoStory = { id: string; title: string; name: string | null }
export type Quote = { name: string; quote: string; photo?: string }

export const VIDEO_STORIES: VideoStory[] = [
 {
  "id": "_ouNUDgUf4w",
  "title": "Master of Nursing at IHM",
  "name": "Vedika"
 },
 {
  "id": "VkAYKmD7XjU",
  "title": "Master of Nursing at IHM",
  "name": "Sheetal Devi"
 },
 {
  "id": "lRmniXvqDlo",
  "title": "Master of Nursing at IHM",
  "name": "Syu Huei Cih"
 },
 {
  "id": "MYx_4E4V4H4",
  "title": "Master of Nursing at IHM",
  "name": "Rosemary"
 },
 {
  "id": "st_N5GdFdg0",
  "title": "Bachelor of Social Work at IHM",
  "name": "Hussain Asif Sandhu"
 },
 {
  "id": "YscXHQX9vDk",
  "title": "Bachelor of Social Work at IHM",
  "name": "Faith"
 },
 {
  "id": "dh7TIi8bxis",
  "title": "Bachelor of Social Work at IHM",
  "name": "Poorva"
 },
 {
  "id": "XFdjbVGmWdA",
  "title": "Bachelor of Social Work at IHM",
  "name": "Hafsa Rahman Ali"
 },
 {
  "id": "Mzb56cmxRU4",
  "title": "Master of Nursing at IHM",
  "name": "Pema Dema"
 },
 {
  "id": "12fJSXasUVA",
  "title": "Master of Nursing at IHM",
  "name": "Patel Gunjan Harsh"
 },
 {
  "id": "a4NGnu0k5Pc",
  "title": "Master of Nursing at IHM",
  "name": "Bal Kumari Gurung"
 },
 {
  "id": "hjV3S9WwoiE",
  "title": "OSCE for RNs at IHM",
  "name": "Jessica james"
 },
 {
  "id": "KzRp_P9aYyo",
  "title": "Bachelor of Social Work at IHM",
  "name": "Mukul"
 },
 {
  "id": "Rh6IMIHEL14",
  "title": "Bachelor of Social Work at IHM",
  "name": "Ishnoorpreet Kaur"
 },
 {
  "id": "8X2gV6h_lT4",
  "title": "Bachelor of Social Work at IHM",
  "name": "Moil Raza Khan"
 },
 {
  "id": "9nu8gSkDwYk",
  "title": "Bachelor of Social Work at IHM",
  "name": "Zeeshan Ahmed Khan"
 },
 {
  "id": "JaXf4KftNok",
  "title": "Bachelor of Social Work at IHM",
  "name": "Arsum"
 },
 {
  "id": "hCvVpNS-t0Q",
  "title": "Master of Nursing at IHM",
  "name": "Sandhiya Naidu"
 },
 {
  "id": "fPO8ncu2grQ",
  "title": "Master of Nursing at IHM",
  "name": "Sapana"
 },
 {
  "id": "WXi5EvNdHrg",
  "title": "Master of Nursing at IHM",
  "name": "April Rose Mendoza"
 },
 {
  "id": "LSzlBlgu7GI",
  "title": "Graduate Certificate in Advanced Nursing at IHM",
  "name": "Brenda Retita"
 },
 {
  "id": "bONVvVWfj5k",
  "title": "Master of Nursing at IHM",
  "name": "Miho"
 },
 {
  "id": "HELJRR4qBbc",
  "title": "Master of Nursing at IHM",
  "name": "Tintu Varghese"
 },
 {
  "id": "bvlY8Jv7_YE",
  "title": "Graduate Certificate in Advanced Nursing and Master of nursing at IHM",
  "name": "Mikaela"
 },
 {
  "id": "HQC-Zx653Nc",
  "title": "Master of Nursing at IHM",
  "name": "Dulaji Ketipe Arachchige"
 },
 {
  "id": "A6zVpPF4UN8",
  "title": "Master of Nursing at IHM",
  "name": "Syliviah Mainga"
 },
 {
  "id": "bgkluk7d4Nw",
  "title": "Graduate Certificate in Advanced Nursing at IHM",
  "name": "Janitha"
 },
 {
  "id": "ZNTUd6VlzQI",
  "title": "Graduate Certificate in Advanced Nursing at IHM",
  "name": "Jyoti Bhandasi"
 },
 {
  "id": "5vJDdCVABr8",
  "title": "Graduate Certificate in Advanced Nursing at IHM",
  "name": "Mona Peter Dass"
 },
 {
  "id": "jRl2zXA4XBY",
  "title": "Graduate Certificate in Advanced Nursing at IHM",
  "name": "Koushalya"
 },
 {
  "id": "IfCjRAixDvk",
  "title": "Graduate Certificate in Advanced Nursing at IHM",
  "name": "Nicy Philip"
 },
 {
  "id": "11C1uSiNkDo",
  "title": "Graduate Certificate in Advanced Nursing at IHM",
  "name": "Geetha Lakshmi"
 },
 {
  "id": "_LqPtYbtG38",
  "title": "Graduate Certificate in Advanced Nursing at IHM, specializing in Critical Care Nursing",
  "name": "Nikeeta Dangal"
 },
 {
  "id": "XjtzJt92fCE",
  "title": "Graduate Certificate in Advanced Nursing at IHM, specializing in acute care",
  "name": "Diana Nyambura"
 },
 {
  "id": "oseYcu-JoXs",
  "title": "Master of Nursing in Australia from IHM Perth",
  "name": "Gurleen Kaur"
 },
 {
  "id": "djtVM1NtEBE",
  "title": "Master of Nursing graduate from IHM Perth",
  "name": "Sora Park"
 },
 {
  "id": "ywxio4_533I",
  "title": "Master of Nursing graduate from IHM Australia’s Perth Campus",
  "name": "Siggy Shaju"
 },
 {
  "id": "F0-30Q0pF6Q",
  "title": "A proud Master of Nursing graduate from IHM Perth",
  "name": "Sonam"
 },
 {
  "id": "5pT8edoY-tw",
  "title": "Master of Nursing Graduate from IHM!",
  "name": "Mariah"
 },
 {
  "id": "ZErTJAFAVmk",
  "title": "International Student Spotlight:",
  "name": "Anna Sakaguchi"
 },
 {
  "id": "jc_6os9NSYM",
  "title": "One of our proud graduates from the Master of Nursing (Batch 2025)",
  "name": "Eric"
 },
 {
  "id": "mPK3aSIjX8Q",
  "title": "Registered Nurse to Australia 🇦🇺",
  "name": "IHM Master of Nursing Journey"
 },
 {
  "id": "TXSyZpYCwAM",
  "title": "Master of Nursing Success Story",
  "name": "Anelisa"
 },
 {
  "id": "_Bog-3D8QzI",
  "title": "Graduate Certificate in Nursing course by IHM Australia – Student Testimonial",
  "name": "Divine Hunas"
 },
 {
  "id": "o9QQrK76BD4",
  "title": "Inspiring OSCE Success Story",
  "name": "Asha Latha"
 },
 {
  "id": "OPxQQiheo80",
  "title": "Celebrating Andy's Remarkable Success",
  "name": "OSCE Exam"
 },
 {
  "id": "szrd2Ifa0z8",
  "title": "IHM BSW Graduates' Inspiring Testimonies",
  "name": null
 },
 {
  "id": "u-TuuA93X8A",
  "title": "IHM BSW Graduates' Inspirational Testimonies",
  "name": "Angelo"
 },
 {
  "id": "eX3cps4i23g",
  "title": "IHM BSW Graduates' Inspirational Testimonies",
  "name": null
 },
 {
  "id": "4Tom2m7xZeQ",
  "title": "IHM Student Success Story: Tessy's Journey to Advancing Her Nursing Career",
  "name": "Tessy"
 },
 {
  "id": "KbJwBt5FCZo",
  "title": "IHM Student Testimonial: Jincy's Journey as a Registered Nurse",
  "name": "Jincy"
 },
 {
  "id": "sx__-QHXuMg",
  "title": "From Chartered Accountant to Social Worker: Inspiring Journey at IHM",
  "name": "Ali Hamza"
 },
 {
  "id": "tmb3MqhvSHE",
  "title": "Graduate Certificate in Nursing course by IHM Australia – Student Testimonial",
  "name": "Amandeep Kaur"
 },
 {
  "id": "13uBVWgC7X8",
  "title": "In conversation with Jinesh Kumar",
  "name": "IHM Alumni"
 },
 {
  "id": "hxCrZIWCGDw",
  "title": "Student job fair \"Sydney\" Testimonials",
  "name": null
 },
 {
  "id": "AqM6f7aaSJ4",
  "title": "Objective Structured Clinical Exam OSCE",
  "name": "Chithra Santhi"
 },
 {
  "id": "a3_6_dzSPXY",
  "title": "Nursing in Australia: Cracked the OSCE Australia - Overseas Registered Nursing Success",
  "name": "Gagandeep Kaur"
 },
 {
  "id": "xsSpeXcAkUg",
  "title": "Get Inspired by Our Overseas Registered Nursing Success Stories for IHM's EPIQ-RN",
  "name": "Teena D'souza"
 },
 {
  "id": "S6a22qruL3U",
  "title": "IHM GDN Graduate",
  "name": "Maria Angelica/ Sulochana"
 },
 {
  "id": "F50IzuQu528",
  "title": "Graduate Diploma in Nursing",
  "name": null
 },
 {
  "id": "CviOXc38j4A",
  "title": "Graduate Diploma in Nursing (GDN)",
  "name": "Meena James"
 },
 {
  "id": "APPLzcHeEWU",
  "title": "Graduate Diploma in Nursing",
  "name": "Bridging Program"
 },
 {
  "id": "Y6DwXuWGqmU",
  "title": "EPIQ-RN (Bridging Program)",
  "name": "Haron Santos"
 },
 {
  "id": "zBKNLJKY-9Q",
  "title": "Graduate Diploma in Nursing(GDN)",
  "name": "Bridging Program"
 },
 {
  "id": "r0wC6s96g6E",
  "title": "Graduate Diploma in Nursing (GDN)",
  "name": "Mark Johnry Go"
 },
 {
  "id": "bAhLswwL-U0",
  "title": "Graduate Diploma in Nursing (GDN)",
  "name": "Airelyn Albarillo"
 },
 {
  "id": "pKf-1t03ofQ",
  "title": "Graduate Diploma in Nursing (GDN)",
  "name": "Livia Wilson"
 }
]

export const WRITTEN_TESTIMONIALS: Quote[] = [
 {
  "name": "Ajitha Njarackel Arjunan",
  "quote": "Hi, I am Ajitha. I went through all the contents of the new generation of NCLEX several times. Initially, I took too much time, but it took only a few days with IHM to finish revising all the topics. So, I feel confident about the exam. The IHM teachers give me super guidance and support. They are always available to clarify my doubts and lead me to success. I am always thankful to them. The New Generation NCLEX is better than going through multiple-choice questions, reading a case study, and answering the questions. But the problem is that sometimes the case study consumes too much time to read, so time management is important, and if we don’t know the topic completely, we will lose more marks. Thank You",
  "photo": "/images/testimonials/ajitha-njarackel-arjunan.webp"
 },
 {
  "name": "Nimfa Marano",
  "quote": "What attracted me to enroll in the Master of Nursing program at IHM is the great campus in Melbourne, Victoria, dedicated to providing high-quality healthcare education and enhancing skills. The school's supportive environment and culture, along with helpful staff, have greatly contributed to my personal and professional development. The NCLEX Prep program, including lectures and question banks, has been invaluable in preparing for the exam. The blended learning approach and user-friendly system have facilitated a quick and efficient learning experience. The school's cultural gala promotes socialization and cultural exchange among students from diverse backgrounds. Additionally, the school recognizes and acknowledges high-performing students, fostering a culture of value and importance. I have had a profound learning experience with the knowledgeable lecturers. Ultimately, our attitude towards learning determines our success. Join IHM and let's cultivate a love for knowledge together.",
  "photo": "/images/testimonials/nimfa-marano.webp"
 },
 {
  "name": "Qhayam Mohammed",
  "quote": "I embarked on my Master of Nursing journey with IHM Australia in November 2021, amidst the challenges imposed by the COVID-19 pandemic. Initially unable to join physically due to restrictions, I eagerly awaited the opportunity to immerse myself in the program. Finally, in March 2022, I arrived, and what followed was an incredible and highly productive experience. Throughout my time with IHM, I had the privilege of expanding my nursing knowledge and developing crucial nursing management skills. The program gave me a comprehensive understanding of nursing, equipping me with the expertise needed to excel in my field. One of the most significant milestones I achieved during my Master's program was attaining nursing registration. This accomplishment was indeed the best thing that happened to me. It validated my skills and qualifications and opened doors to numerous opportunities for professional growth and advancement. I attribute my success and personal growth to the exceptional support I received from the IHM team, with a special mention to Ms. Sahaya. Her guidance, expertise, and unwavering dedication played a pivotal role in shaping my educational journey. Her encouragement and commitment to my development were truly invaluable, and I am deeply grateful for her mentorship. As I near the completion of my final semester, I reflect on the multitude of achievements I have already attained with IHM. The program has been transformative, enabling me to reach new heights in my nursing practice and instilling a sense of confidence and competence in me. I am proud to be associated with IHM and grateful for the opportunities it has provided me. The Master of Nursing program has broadened my horizons and empowered me to make a meaningful difference in the healthcare industry. I am excited to embark on the next chapter of my career, armed with the knowledge and skills I acquired during my time with IHM.",
  "photo": "/images/testimonials/qhayam-mohammed.webp"
 },
 {
  "name": "Sonam Palden",
  "quote": "Hi I am Sonam Palden, Thank you very much, and I would like to extend my heartfelt gratitude to IHM and all the lecturers for the NCLEX-RN coaching.",
  "photo": "/images/testimonials/sonam-palden.webp"
 },
 {
  "name": "Navneer",
  "quote": "Hi, I am Navneer I have passed my NCLEX examination in the new generation, thanks to all, especially my tutors.",
  "photo": "/images/testimonials/navneer.webp"
 },
 {
  "name": "Geetansh",
  "quote": "I passed my NCLEX RN exam with the assistance of IHM. Without the help of IHM, I was not capable to crack this exam. They boost my confidence and help me to achieve this success. The tutors are extremely helpful, motivating, and approachable."
 },
 {
  "name": "Siji Arimbooparambil Johny",
  "quote": "\"Thank you so much to the entire IHM team for your great effort. IHM study materials & online classes helped me a lot to achieve this goal.\"",
  "photo": "/images/testimonials/siji-arimbooparambil-johny.webp"
 },
 {
  "name": "Jilcy Lukose",
  "quote": "\"I have completed my 3 months NCLEX-RN training with IHM. The training was excellent and exceeded my expectations. The study materials provided were Saunders and Kaplan. These helped me to crack the exam in the first attempt itself. The SATA questions, assessment materials and prioritization questions were greatly helpful to get the feel of the exam during the training. \"",
  "photo": "/images/testimonials/jilcy-lukose.webp"
 },
 {
  "name": "Raveena Kumari",
  "quote": "\"Happiest Year of my life. IHM!!Thank you from the bottom of my heart for all you do! I was September batch student took my exam 29th December2022 and I got my result on 30th December early morning and was shocked when my husband said \"you cracked your Australia Nclex exam\". It was very tough for me. But great thanks to IHM teachers who helped me on my Nclex journey, Specifically Julie John Mam her way of teaching.In whole my journey my biggest support my husband, my in laws specially my mother in law she support me like a child I think I have no words to say anything.At the end, I would like to say everyone “Believe in yourself “",
  "photo": "/images/testimonials/raveena-kumari.webp"
 },
 {
  "name": "Tessy Thampy",
  "quote": "I wanted to extend my sincere thanks to all of you at the NCAP program. Especially to Madam Julie, Madam Sweety, Ms Praveena and Ms. Nimmy for all the help granted to me while doing the program. God enabled me to clear the NCLEX RN Exam. You all were always ready to help us.Hoping to complete the OBA program successfully soon. Thankyou once again...🙂🙂"
 },
 {
  "name": "Rakhi Duhan",
  "quote": "I got my NCLEX result and have successfully passed it (at 76 th question). It wouldn't have been impossible without IHM's guidance and classes to crack the exam in first attempt,so thank you so much for all the support that you have provided me. Iam very happy with IHM's course and would definitely recommend it to others🙂",
  "photo": "/images/testimonials/rakhi-duhan.webp"
 },
 {
  "name": "Pratikshya Bista",
  "quote": "I am Pratikshya Bista. Recently I have given NCLEX-RN exam and I was able to succeed it. I have got full 145 questions. It was very tough for me. But great thanks to IHM teachers who helped me on my journey to pass NCLEX. I had been attending the NCLEX-RN classes offered by IHM since September 2022. The 12 week preparatory programme was really helpful to understand the important topics. The Q-bank provided by IHM canvas was really helpful. The mock tests and the explanations provided against the answers were helpful too. Its very tough for the working students to balance work and study but thanks to the live class recordings provided by IHM, it helped me to go back to the topics and give continuity to my study. Recording also helps me to revise it again and take effective notes from it. Along with these classes i also used Saunder book for NCLEX-RN preparation and was very effective. Very grateful to IHM. “Thank You”",
  "photo": "/images/testimonials/pratikshya-bista.webp"
 },
 {
  "name": "Pooja Rani",
  "quote": "I pleased to inform you that I have cleared the NCLEX exam under your guidance. I would like to thank you for your effort you made. Thank you so much. You are a great teacher. I would like to be in touch with you in my future"
 },
 {
  "name": "Gwen",
  "quote": "I wanna thank all of you especially my mentors Julie and Jomin. i passed the nclex. Just got the news today. Send my luv to them please. Thank u thank u thank u soo sooo sooo much…"
 },
 {
  "name": "Jagdeep Kaur Sidhu",
  "quote": "I Jagdeep Kaur Sidhu.. I would like to share my personal experience with IHM college in Australia for NCLEX RN coaching classes. Thanks to all my teachers and IHM management members for your valuable support to clear the NCLEX in first attempt . It was wonderful experience with IHM ... thanks for online classes and additional resources 😊"
 },
 {
  "name": "Chithra Santhi",
  "quote": "I joined IHM to take taining for OSCE in August 2021 and i took exam in november 2021. Overall my experience was very good.Initially, the course was not organized and not up to my expectation. But, once after Divitha Subramonian joined the course, the quality of the programme started to to change gradually. At the end of the course, they have given me lots of mock test that was really beneficial for me. The lab was well-equipped and had mannequin. The assessors feedback was excellent especially sonu mam and jolly mam. The course content got well covered and also demonstrated the concept very well. The effort of Divitha Subramonian was really appreciable."
 },
 {
  "name": "Navdeep Kaur",
  "quote": "Hi , My name is Navdeep Kaur and recently I have cleared my NCLEX RN exam and I would like to thank to IHM and all the staff members for helping me to achieve my goal. .Ihm provided huge support to me , good study material as well as good online classes along with one to one session s. Educators are very friendly and very cooperative and available whenever I needed. Also I am very thankful to the student support team who is very helpful and proactive to assist the students whenever there is any technical issue . The online learning Management platform is very helpful to the student to prepare themselves for the NCLEX RN exam preparation and I am so impressed with their Learning management system which is quite flexible .Overall Whole IHM is very supportive and I would recommend everyone who is looking to get prepared themselves for NCLEX RN exam , I highly recommend them to get the training with IHM who want to clear the exam in one attempt only."
 },
 {
  "name": "Vinitha John",
  "quote": "I would strongly suggest IHM to anyone who wants to pass their NCLEX RN exam in one sitting, as I did. I was blown away by the quality of teaching and their Learning Management System, which was really helpful in helping me prepare for the exam and had a key factor in my passing the exam on the first try."
 },
 {
  "name": "Alex Johnson",
  "quote": "The training is extensive and generous in depth. IHM is also a wonderful investment because of the number of practise questions and other exam prep tools, as well as the one-on-one sessions with the educators."
 },
 {
  "name": "Brian Kipruto",
  "quote": "I would like to take this opportunity to thank you for all the support that you have given me on my studies all the support I really appreciate it. Thank you also for setting time aside for me every time I have question especially with my nursing registration and also giving me information to different study pathways all the way from graduated certificate in nursing program, masters and giving me information on NCLEX registration process got go approval to go and do my NCLEX today."
 },
 {
  "name": "Kristina George",
  "quote": "I am so delighted to say that I am now an Australian Registered Nurse, a dream that I believed would never come true. Mr. Noel, on the other hand, was the driving force behind my first step on the roller coaster and, I must say, made it feasible. I'd like to express my gratitude to God first, and the lovely IHM team for their continued support, motivation, and direction. Initially, I trusted them more than I trusted myself, taking the first step without considering the consequences, and they boosted my confidence, served as a motivator during my darkest hours, and now I feel as if they have caught my hand and pulled me up with this success. Thank you a lot."
 },
 {
  "name": "Sabrina Issac",
  "quote": "I want to thank everyone at IHM for a great support. I passed my NCLEX RN . IHM provided me with everything I needed to successfully prepare myself to take NCLEX RN exam."
 },
 {
  "name": "Seema",
  "quote": "I'm excited to share my experience of NCLEX RN preparation with IHM because they provided me the best training and support during my time with them. There is no comparison because they are so professional in delivering their lectures and answering the students' questions. Not only that, but because the course is online, they provide one-on-one sessions with the educators, ensuring that each and every query is resolved in order to build confidence. I must say that the question banks they provide are fantastic, and they are specifically prepared for the NCLEX RN exam, focusing on the important topics that carry a maximum passing percentage in the exam."
 },
 {
  "name": "Sabina Timalsina",
  "quote": "My first “International studies” at the Institute of Health & Management (IHM) expose me to a great mixture of relation of quality education, culture and social policies between countries from Australian perspectives. It was a unique opportunity that enriched me beyond what I believed possible. The program was a perfect length with enough time to learn and beneficial by becoming more confident in language skills. It is a fun program having opportunity to learn a lot.",
  "photo": "/images/testimonials/sabina-timalsina.webp"
 },
 {
  "name": "Alisha Bhandari",
  "quote": "Studying at IHM was a wonderful experience. I did my EPIQRN course at IHM and this has directed me to become a Registered Nurse in Australia. The course was extensive, however there was continuous support and supervision from all the HCI staff. The lab sessions were really helpful prior to my placements. I went to Canberra for my placement and had a memorable experience. Actually, going interstate for placement is really an extra advantage to you. The staffs, nurses everyone goes an extra mile to always help you develop professional skills. Overall, I would say I really enjoyed studying at IHM, Melbourne, City Campus."
 },
 {
  "name": "Soumya Manu",
  "quote": "As a student in IHM, I have gained valuable learning experience. The education system is completely different from my home country, which helped me to develop a new learning strategy in my career. Teachers are well qualified, very flexible mode of learning and always available to help us, at any time for our queries. We have a fully equipped campus for our professional development. Our academic team is always seeking feedback from the students to improve their level of practice.",
  "photo": "/images/testimonials/soumya-manu.webp"
 },
 {
  "name": "Amandeep Kaur Gahra",
  "quote": "I would like to share my experience of Nursing study GDN and EPIQRN at IHM. IHM allows graduates to have a variety of roles and lead to working overseas. The teachers are wonderful and experts in their fields. I was fortunate enough to find an amazing teachers and peers, which made classes so enjoyable. I feel more confident and the knowledge I have gained from these courses has laid a solid foundation for my future career. Thanks to IHM for the experience of a lifetime, it is one I will never forget or take for granted.",
  "photo": "/images/testimonials/amandeep-kaur-gahra.webp"
 },
 {
  "name": "Jaspreet Kaur",
  "quote": "I am Jaspreet Kaur and just passed out Graduate Diploma of Nursing from IHM. I had a great experience studying in IHM. All the tutors are highly educated, well experienced and provide individual attention especially towards students who need it. Apart from that the administration staff are also very cooperative and deals politely. I loved to have a chance to study in IHM Melbourne CBD campus. Thanks to all IHM staffs for giving me opportunity to get high education and distinctions which is going to help me looking forward to get nursing registration in Australia.",
  "photo": "/images/testimonials/jaspreet-kaur.webp"
 },
 {
  "name": "Prasanth Sebastian",
  "quote": "The EPIQR-RN program has created an excellent opportunity for my professional development in nursing. I have gained more confidence in maintaining professional and therapeutic relationships with my peers and my future patients, as well as communication skills. This course has the perfect balance of theory and practical, the content was very effective and important. Educators were extremely helpful and approachable.",
  "photo": "/images/testimonials/prasanth-sebastian.webp"
 },
 {
  "name": "Priya Prasad",
  "quote": "Thank You IHM for providing me an opportunity to be a part of your institution. I appreciate all the facilities which was provided. I also thank all my lectures. In India we mostly used pen and paper. Personally, now I have become more digital. Thank You so much for providing a better opportunity."
 },
 {
  "name": "Anita Dhakal Dahal",
  "quote": "I completed by EPIQ RN program from IHM. I would recommend this place for all students who want to move ahead in their career. Staff are really supportive and helpful. They have done their best for the benefit of students and support staff are really approachable. Thank you IHM staff for supporting me to achieve my goal.",
  "photo": "/images/testimonials/anita-dhakal-dahal.webp"
 },
 {
  "name": "Romvilla Moje",
  "quote": "I completed my Graduate Certificate in Nursing at IHM in 2018. I highly recommend IHM! everyone is very supportive, from teachers, admin and technical support. will definitely continue my diploma and master’s degree with them!",
  "photo": "/images/testimonials/romvilla-moje.webp"
 },
 {
  "name": "Deep Khera",
  "quote": "Good management, very flexible and wonderful, good teachers. Highly appreciated and highly recommended. Lucky to be here.",
  "photo": "/images/testimonials/deep-khera.webp"
 },
 {
  "name": "Preet Kaur",
  "quote": "Good and supportive management, especially the tutors who are always willing to help. Much appreciate the efforts put in together by the management to organise desired placements for students considering student’s other life commitments.",
  "photo": "/images/testimonials/preet-kaur.webp"
 },
 {
  "name": "Tintu Jeemon",
  "quote": "I am glad to share my amazing experience with IHM. The facilities are great, and the faculties are excellent and well supportive.",
  "photo": "/images/testimonials/tintu-jeemon.webp"
 },
 {
  "name": "Gemma Cabantog",
  "quote": "I have heard a lot of good reviews about IHM and I am glad that I got accepted here for my bridging course. Requirements are not complicated to comply with, and my application and enrolment process went on smoothly. Looking forward to the classes and clinical placements.",
  "photo": "/images/testimonials/gemma-cabantog.webp"
 },
 {
  "name": "Blessy Jacob",
  "quote": "IHM assists students at every step of their educational journey i.e.from the time of application into a course and throughout the education program till they graduate.",
  "photo": "/images/testimonials/blessy-jacob.webp"
 },
 {
  "name": "Davinder Kaur",
  "quote": "I recommend this institute as it provides the students effective services on priority basis and because of friendly environment of the staff."
 },
 {
  "name": "Bibin Issac Kainakary",
  "quote": "Being one of the most esteemed educational institutions, it is the great opportunity to have found the treasure trove of knowledge, in context to which it is essential to mention that IHM gives a golden opportunity to spread the wings and carve the calibre for greatest possible productivity in academics, skills and experience. Certainly, much obliged to IHM for being the helping hand."
 },
 {
  "name": "Rupinder Jit Kaur Padda",
  "quote": "I have heard a lot about IHM and I am glad that I got admissions there for bringing program. They have very good management and they assist you every time right from applying for application to admission and will provide quality of educational services.",
  "photo": "/images/testimonials/rupinder-jit-kaur-padda.webp"
 },
 {
  "name": "Vindoo Pannu",
  "quote": "Very supportive and knowledgeable staff who are very much concerned for their student’s issues. Hope it will reach to the greater heights.",
  "photo": "/images/testimonials/vindoo-pannu.webp"
 },
 {
  "name": "Prameela Chhetri",
  "quote": "I highly recommend IHM/IHNA for EPIQRN course (bridging program) without any doubt. Qualified educators/trainers and good management team.",
  "photo": "/images/testimonials/prameela-chhetri.webp"
 },
 {
  "name": "Sheeja Rohin",
  "quote": "Hi, I just completed my EPIQ- RN program with IHM, it was a wonderful experience in my life. Here we have very friendly and approachable staffs and they are very helpful if we need any help. Moreover, this friendly ambiance giving more opportunity to study without stress. Staffs are doing their job accurately, therefore we finished our EPIQ-RN course soon without any delay. I strongly recommend this institution for future students if they need to do any courses with them. Thank you."
 },
 {
  "name": "Nisha Bimal (Nisha Abraham)",
  "quote": "I just completed my EPIQ RN course from IHM. They guided me to plan in my career. It was an awesome experience.",
  "photo": "/images/testimonials/nisha-bimal.webp"
 },
 {
  "name": "Asha Rai",
  "quote": "IHM made my dream come true! I truly appreciate the technical and management team’s overall support.",
  "photo": "/images/testimonials/asha-rai.webp"
 },
 {
  "name": "Sajina Subedi",
  "quote": "IHM is very reliable, competent institute providing Australian practice-based course. I feel overwhelmed joining this institute and completing course on time. I recommend joining this college and get your registration on time.",
  "photo": "/images/testimonials/sajina-subedi.webp"
 },
 {
  "name": "Shreejana Bhandari",
  "quote": "Very supportive teachers and helpful educational tools. My journey in this institution for EPIQRN was very fruitful.",
  "photo": "/images/testimonials/shreejana-bhandari.webp"
 },
 {
  "name": "Jasvir Kamal",
  "quote": "Thank you IHM management and the staff including academic and administration staff for a wonderfull experience during my EPIQ-RN programme. I would strongly recommend IHM to anyone who is planning to nurture their career. The staff is really approachable and supportive here, I always felt the warmth and support from the first day till completion of the course. Once again thank you very much for helping me to achieve my career goals.",
  "photo": "/images/testimonials/jasvir-kamal.webp"
 },
 {
  "name": "Rakshya Niraula",
  "quote": "I would like to thank all the IHM staffs and lecturer who were very supportive and helpful during my EPIQ-RN program.",
  "photo": "/images/testimonials/rakshya-niraula.webp"
 },
 {
  "name": "Jessoppi Mimo",
  "quote": "I will highly recommend IHM to everyone. My journey with IHM was very fruitful and memorable. All the teachers and staff are very friendly and supportive. They keep on motivating us to achieve our desired goal. Thank you so much IHM.",
  "photo": "/images/testimonials/jessoppi-mimo.webp"
 },
 {
  "name": "Bijaya Adhikari",
  "quote": "Thank you, all the team members of IHM for making our journey of EPIQ-RN wonderful. Special thanks to our course coordinator, lecturers and student support team for guiding us to meet our career goals.",
  "photo": "/images/testimonials/bijaya-adhikari.webp"
 },
 {
  "name": "Pawanjeet Kaur Sanghera",
  "quote": "Best nursing study, excellent staff and management. I completed my EPIQ RN from IHM and it was a great journey. Everyone from management, lectures were very supportive including admin staff. Thanks a lot everyone.",
  "photo": "/images/testimonials/pawanjeet-kaur-sanghera.webp"
 },
 {
  "name": "Monty Kumar",
  "quote": "IHM is a very thorough and supportive institution to assist with your preparation, regardless of which course you are doing. Their approach is simple, yet effective and very self-directed. This feels overwhelming at times as you are unsure who to reach out to and to be fair the turnaround time is pretty slow, but eventually you'll get the support you need. Their resources, course content, and knowledge is up to date, relevant to current guidelines, and practically oriented so you can achieve your goals. They also lay out a framework that you can follow if you want, which is useful since the quantity of content is not the best. Overall, I would commend IHM and recommend them to my peers and colleagues",
  "photo": "/images/testimonials/monty-kumar.webp"
 },
 {
  "name": "Ricardo",
  "quote": "I've just cleared my ADC written exam and IHM was really helpful in providing me with the guidance and knowledge to pass the exam. Before I started the course, I felt completely overwhelmed with all the material that I had to study. I didn't know where to begin, so IHM's guidance was very important. The teachers were very generous with their time and always gave me time to answer and explain the questions. I would highly recommend IHM.",
  "photo": "/images/testimonials/ricardo.webp"
 },
 {
  "name": "Sameer Qadumi",
  "quote": "At first, I was hesitant which institution I should choose to help me clear the NCLEX. I did plenty of research and from the reviews of past students and participants IHM was the recommended choice. I was both relieved and amazed that the experience of the past students matched my own expectations and more. The class was small which made interactions with the teacher convenient and hassle free. NCLEX style quizzes and exams made sure that the student had to prepare and make a real effort. The IHM student hub also eased interaction between the students with coordinators. However, for me the program was unique because my teacher did the NCLEX and passed with top distinction and this was the reason I was well supplied with the knowledge, tips and tricks that made the impossible possible as the tutors and coordinators have experienced, studied, and aced the NCLEX. Thank you IHM for contributing towards my success!",
  "photo": "/images/testimonials/sameer-qadumi.webp"
 },
 {
  "name": "Sangeeta Bali",
  "quote": "My name is Sangeeta Bali, and I recently passed the NCLEX test from IHM all the teachers are very supportive and encouraging. They never hesitate to explain things again and again. I did fail my exam twice and I was hopeless before joining IHM, but all my teachers always encourage me not to give up. Special thanks to Julie mam, Nimmy mam, and Sweety mam for encouraging me to achieve my goal. They explained how to study and made notes that were very helpful for me. I think this is the best place to crack the NCLEX",
  "photo": "/images/testimonials/sangeeta-bali.webp"
 }
]
