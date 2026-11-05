// Copy for /campuses/, the four campus pages, /contact/ and /talk-to-rishi/. Taken from the WordPress pages
// (.data/inventory/data/ihm/pages.json); edit here. Street addresses and phone numbers live in src/content/campuses.ts.
// Campus team members are shown with name, role and photo only: their personal mailboxes are not republished (AGENTS.md rule 4);
// the campus phone and the Student Support mailbox are the contact.
import type { Person } from '@/content/research'

export type Photo = { src: string; alt: string }
export type CampusLocation = { name: string; lines: string[]; map: string; directions: string; tel?: string }

export type CampusPageData = {
  /** campus lookup slug (src/content/campuses.ts, the `campuses` collection) */
  slug: 'melbourne' | 'sydney' | 'perth' | 'brisbane'
  path: string
  city: string
  state: string
  hero: Photo
  /** one line under the heading */
  tagline: string
  /** /campuses/ card text */
  summary: string[]
  about: string[]
  /** photos set between the paragraphs on the old page, in order */
  photos: Photo[]
  highlights: string[]
  video?: { id: string; title: string }
  tour?: { src: string; title: string }
  teamTitle: string
  teamIntro?: string
  team: Person[]
  locations: CampusLocation[]
  transport?: { intro: string; items: string[]; note: string }
}

const dir = (q: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`

export const CAMPUS_PAGES: CampusPageData[] = [
  {
    slug: 'sydney', path: '/sydney-campus/', city: 'Sydney', state: 'New South Wales',
    hero: { src: '/images/campuses/sydney-header.webp', alt: 'Sydney Harbour Bridge and Opera House' },
    tagline: 'Parramatta, NSW: 30 minutes west of the Sydney CBD.',
    summary: ['The Sydney campus is located in Parramatta in the culturally sophisticated state of New South Wales (NSW), 30 minutes away from west of Sydney CBD. Neighboring suburbs in Parramatta include: Northmead, North Parramatta, Westmead, Greystanes, Mays Hill, Harris Park, Rosehill and Oatlands.'],
    about: [
      'The oldest among Australia’s capital cities, Sydney is known around the world for its iconic Opera House. A popular go-to port for the summer, Sydney’s sunshine and golden beaches attract flocks of tourists of all ages. Overseas students have consistently picked Sydney as their study destination of choice, due to its excellent education system, high standards of living and the friendly warmth of the locals. Immigrants from countries such as Italy, China, Korea, Greece, Thailand, Vietnam, India, among others, have made it a melting pot of cultures and added international diversity to the city.',
      'Set on a gorgeous natural harbour, Sydney offers an endless list of leisure pursuits and opportunities for limitless fun: over 70 sparkling beaches, enticing food, and a melange of exotic festivals. The agreeable climate is another reason for its popularity among travellers and students alike - Sydney’s skies are clear and blue most of the year, and the warm summers and mild winters suit just about everyone. Swimming, snorkelling, yachting and other various water-based activities are possible almost every day, with the city averaging 300 sunny days a year.',
      'For those who love to sample new tastes, you will find delightful food from nearly every country including Chinese, Indian, Japanese, Malaysian, Korean, Italian, Irish and Turkish cuisines. Ranging from fish ‘n chips from The Boathouse, modern Vietnamese at Luke Nguyen’s Red Lantern… to award-winning desserts from Adriano Zumbo’s Lab and sinfully decadent chocolate éclairs and cakes from Black Star Pastry, you can run the entire gamut of gastronomic experiences here!',
      'There is never a dull moment in Sydney’s cultural scene, with events that keep you on your toes at the hot and happening clubs in town. New places to visit include the Sydney Opera House, Sydney Harbour Bridge, Bondi Beach, Taronga Zoo, Luna Park Sydney, among many, many others. Travelling around Sydney is a breeze, with affordable public transport, including buses, ferries or water taxis that cross the waters daily to prime harbour locations, and bikes or cars that are readily available for hire.',
    ],
    photos: [
      { src: '/images/campuses/sydney-1.webp', alt: 'Sydney city skyline' },
      { src: '/images/campuses/sydney-2.webp', alt: 'Sydney beach from above' },
      { src: '/images/campuses/sydney-3.webp', alt: 'Sydney harbour' },
      { src: '/images/campuses/sydney-4.webp', alt: 'Sydney streets' },
    ],
    highlights: ['Over 70 beaches', '300 sunny days a year', 'Parramatta, NSW'],
    video: { id: 'C25Yzf7jVOQ', title: 'IHM Sydney campus' },
    teamTitle: 'Meet the Sydney Team',
    team: [{ name: 'Bharti Sharma', role: 'Student Support Staff', image: '/images/people/bharti-sharma.webp' }],
    locations: [{
      name: 'Sydney Campus', tel: '+61282286402', lines: ['1 Wentworth St,', 'Parramatta NSW 2150, Australia'],
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13258.85027156742!2d151.0050662!3d-33.8197299!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc38e2b6b85b2cbfe!2sInstitute%20of%20Health%20%26%20Management%20-%20(Sydney%20Campus)!5e0!3m2!1sen!2sin!4v1663578072217!5m2!1sen!2sin',
      directions: dir('Institute of Health & Management, 1 Wentworth St, Parramatta NSW 2150'),
    }],
  },
  {
    slug: 'melbourne', path: '/melbourne-campuses/', city: 'Melbourne', state: 'Victoria',
    hero: { src: '/images/campuses/melbourne-header.webp', alt: 'Melbourne skyline at dusk' },
    tagline: 'Two campuses: North Melbourne and Lonsdale Street in the CBD.',
    summary: [
      'Our North Melbourne campus is located a minute away from Flemington Bridge station and less than 5 kms from CBD and city loop stations with easy access by public transport.',
      'Our Melbourne CBD campus, situated on Lonsdale Street in the heart of the city, is conveniently located near Melbourne Central, Flinders street, and Southern Cross stations, making it easily accessible for students travelling from across Melbourne.',
    ],
    about: [
      'Well known as Australia’s sporting and cultural capital, Melbourne is a city with a touch of class. As Australia’s second largest city, it is a potpourri of cultures, cuisines and ideas and is a city known for the diversity of its style, fashion, food, architecture, theatres, galleries, and gardens. Melbourne is home to almost four million residents from over 140 nations and international students are sure to find friends from somewhere close to home.',
      'This city is an eclectic blend of the old and the new, which is best reflected in its architecture – while the Flinders Street Train Station and ornate boulevards showcase the beauty of its elaborate Victorian architecture and reflect the city’s rich history, its modern face is evident in the contemporary style of starkly modern buildings like Federation Square. The economy of Melbourne is particularly strong in education, finance, manufacturing, research, logistics and transportation and tourism sectors, and the city is home to the headquarters of many of Australia’s largest corporations.',
      'Melbourne is infamous for its unpredictable weather that can catch you off guard, and tends to experience colder winters than other Australian capital cities. During the springtime, gardens and parks are frequented by tourists, and during the summer, the lovely golden beaches are always packed. Cozy and warm European-style cafés and bars are happening places during the seasons of autumn and winter.',
      'Among the main attractions in Melbourne include Federation Square, Flinders Street Station, Queen Victoria Market, Crown Casino and Southbank. Those who love nature and animals would find the Great Ocean Road, Yarra Valley, Melbourne Zoo/Healesville Sanctuary and Melbourne Aquarium of particular interest. If you’re looking for some more places of tourist interest, do check out Phillip Island, Sovereign Hill, Dandenong Ranges/Puffing Billy, Docklands, National Gallery of Victoria, Melbourne Museum, Melbourne Observation Deck, Grampians, The Arts Centre, Mornington Peninsula, The Snowfield, and the Melbourne Cricket Ground (MCG).',
    ],
    photos: [
      { src: '/images/campuses/mel-1.webp', alt: 'Melbourne city and the Yarra River' },
      { src: '/images/campuses/mel-2.webp', alt: 'Melbourne laneway' },
      { src: '/images/campuses/mel-3.webp', alt: 'Melbourne landmarks' },
      { src: '/images/campuses/mel-4.webp', alt: 'Melbourne skyline over the Yarra' },
    ],
    highlights: ['Residents from 140+ nations', 'Two campuses', '1 minute to Flemington Bridge station'],
    video: { id: 'RXgCFsjFLm8', title: 'IHM Melbourne campus video' },
    teamTitle: 'Meet the Melbourne Team',
    teamIntro: 'Real people. Real support. Here in Melbourne. Say hi when you see us on campus.',
    team: [
      { name: 'Justin Jose', role: 'Deputy Campus Manager', image: '/images/people/justin-jose.webp' },
      { name: 'Mehroz Minaz Chogle', role: 'Campus Administration Coordinator', image: '/images/people/mehroz-minaz-chogle.webp' },
      { name: 'Swathi Chandra Jithesh', role: 'Student Support Officer', image: '/images/people/swathi-chandra-jithesh.webp' },
      { name: 'Shruti Arora', role: 'Student Support Officer', image: '/images/people/shruti-arora.webp' },
      { name: 'Matthew Schweigert', role: 'Student Support Officer', image: '/images/people/matthew-schweigert.webp' },
    ],
    locations: [
      {
        name: 'Melbourne Campus (North Melbourne)', tel: '+61394505111', lines: ['Level 2', '187 Boundary Road, North Melbourne', 'VIC 3051, Australia'],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.059185998437!2d144.9399132!3d-37.7886527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc7c9582860498783!2sInstitute%20of%20Health%20%26%20Management%20(Melbourne%20Campus)!5e0!3m2!1sen!2sin!4v1663577571470!5m2!1sen!2sin',
        directions: dir('Institute of Health & Management, Level 2, 187 Boundary Rd, North Melbourne VIC 3051'),
      },
      {
        name: 'Melbourne Campus (Melbourne CBD)', lines: ['Level 1/399 Lonsdale street,', 'Melbourne VIC 3000,', 'Australia'],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.018545091767!2d144.9606532!3d-37.8130346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65dec02b76fcf%3A0x85c19429785564ab!2sInstitute%20of%20Health%20%26%20Management%20(Lonsdale%20Campus)!5e0!3m2!1sen!2sin!4v1765521265068!5m2!1sen!2sin',
        directions: dir('Institute of Health & Management, Level 1/399 Lonsdale St, Melbourne VIC 3000'),
      },
    ],
  },
  {
    slug: 'perth', path: '/perth-campus/', city: 'Perth', state: 'Western Australia',
    hero: { src: '/images/campuses/perth-header.webp', alt: 'Perth skyline across the Swan River' },
    tagline: 'In the heart of the Perth CBD, Western Australia.',
    summary: ['The Perth campus is conveniently located in the vibrant Perth CBD in Western Australia (WA), Australia’s largest state. Suburbs close to campus include: West Perth, North bridge, East Perth and Crowley. IHM Perth Campus is well connected to public transport.'],
    about: [
      'Nature’s bounty is evident in Perth, famous for its gorgeous beaches with endless stretches of sand, sea and sky. Due to its great outdoorsy weather, WA is a haven for activities such as kayaking, surfing, diving, sailing and more. With its burgeoning bar scenes, open arts festivals, world-class beaches and expansive parklands, the people of Perth enjoy a relaxed lifestyle unlike any other!',
      'Tourists can enjoy a picnic at the one of the biggest inner-city parks in the world, Kings Park or dive into the crystal clear waters at Cottesloe Beach. Further south, Fremantle is known for its ferry rides and relaxing cruises up the Swan river with swimming and snorkelling at Rottnest Island. Even further down the coast is Rockingham, where you can view a spectacular array of marine life including wild dolphins and humpback whales. Taste sweet vines at Swan Valley, Western Australia’s oldest wine growing region. Margaret River, three hours from Perth, is home to lovely iconic vineyards, produce farms and art galleries that are a feast for the senses. The cultural scene at Perth is buzzing with music, theatre, film and art.',
      'The Mediterranean climate of Perth boasts warm, sunny weather for most of the year. Summers are generally hot and dry and last from December to February, while winters are from June to August and are relatively cool and wet. This region is known for its economic prosperity, with large-scale investments in mining, energy, construction, technology and research.',
      'The main attractions for tourists are Kings Park & Botanic Gardens, Bell Tower, Perth Zoo, Perth Mint, Adventure World, Fremantle Prison, Crown Casino, Cottesloe Beach, Scarborough Beach, Rottnest Island, Penguin Island, The Pinnacles, Caversham Wildlife Park, SciTech Discovery Centre, Museum of Western Australia, Art Gallery of WA, Mundaring Weir, Avon Valley, Swan Valley, Margaret River, and Yanchep National Park, among others.',
      'Students can seek accommodation that is close to a train station or buses that stop at the CBD. Make sure that you do some research before you start looking for rentals, as some places are expensive. You will find Perth’s Public Transport System is easy to navigate as it is divided into travel ‘zones’. International students can avail of a sizeable 40 percentage discount on all public transport throughout WA.',
      'Perth is known for its cuisine and offers an eclectic mix of cafes, cool bars, fresh seafood, and eateries from every part of the world including Thai, Chinese, Indonesian, Italian, Vietnamese, Indian, Korean and Japanese restaurants. Don’t forget to sample the delights at the Jamie’s Italian and Brookfield Place in Perth’s CBD.',
    ],
    photos: [
      { src: '/images/campuses/perth-1.webp', alt: 'Perth city skyline' },
      { src: '/images/campuses/perth-2.webp', alt: 'Perth parklands' },
      { src: '/images/campuses/perth-3.webp', alt: 'Perth and the Swan River from above' },
      { src: '/images/campuses/perth-4.webp', alt: 'Perth beach' },
      { src: '/images/campuses/perth-5.webp', alt: 'Perth city life' },
      { src: '/images/campuses/perth-6.webp', alt: 'Perth at sunset' },
    ],
    highlights: ['40% student transport discount', 'Free CAT buses', 'Perth CBD'],
    teamTitle: 'Meet the Perth Team',
    team: [
      { name: 'Justin Jacob', role: 'Campus Manager', image: '/images/people/justin-jacob.webp' },
      { name: 'Jolly Mathew Philip', role: 'Academic Lead', image: '/images/people/jolly-mathews-philip.webp' },
      { name: 'Avanish Kaur', role: 'Student Support Staff', image: '/images/people/avanish-kaur.webp' },
    ],
    locations: [{
      name: 'Perth Campus', tel: '+61862128200', lines: ['Level 4, 12 St Georges Terrace', 'Perth, WA 6000', 'Australia'],
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1692.5699509244744!2d115.86369735872195!3d-31.957101099999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bb764aa2aeab%3A0xe1effa8fc5830372!2sInstitute%20of%20Health%20%26%20Management%20-%20Perth!5e0!3m2!1sen!2sin!4v1635472742129!5m2!1sen!2sin',
      directions: dir('Institute of Health & Management, Level 4, 12 St Georges Terrace, Perth WA 6000'),
    }],
    transport: {
      intro: 'Perth Central Area Transit (CAT) buses are free. You may get on and off them as often as you like without paying a fare. These services are brought to you by Transperth and the City of Perth.',
      items: ['11 Minutes’ Walk to McIver Train Station, Perth WA 6000', '13 Minutes’ Walk to Perth Train Station', 'Red Cat – from Hay Street, Victoria Avenue'],
      note: 'Frequent Bus Services available.',
    },
  },
  {
    slug: 'brisbane', path: '/brisbane-campus/', city: 'Brisbane', state: 'Queensland',
    hero: { src: '/images/campuses/brisbane-1.webp', alt: 'Brisbane city and river' },
    tagline: 'In the heart of the Brisbane CBD, Queensland’s capital.',
    summary: ['The Brisbane campus is conveniently located in the heart of Brisbane CBD, Queensland’s vibrant capital city. Surrounded by a diverse range of cultural, dining, and lifestyle experiences, the campus offers students a convenient and connected study environment. Suburbs close to campus include: Spring Hill, Fortitude Valley, South Brisbane, and Kangaroo Point. The IHM Brisbane Campus is well connected by public transport, with easy access to buses, trains, and other city transport options.'],
    about: [
      'Brisbane, the vibrant capital of Queensland, is one of Australia’s fastest-growing cities and a leading destination for international education. Known for its relaxed lifestyle, warm climate, and welcoming multicultural community, Brisbane offers students the perfect balance between academic focus and lifestyle enjoyment.',
      'With the iconic Brisbane River flowing through the city and a skyline that blends modern architecture with natural beauty, Brisbane provides an inspiring environment for students pursuing careers in healthcare. The city is home to a growing healthcare and education sector, creating strong pathways for professional growth, employment, and industry engagement.',
      'International students studying in Brisbane benefit from a safe, student-friendly environment with excellent public transport, affordable living compared to other major Australian cities, and easy access to beaches, parks, and cultural attractions.',
    ],
    photos: [
      { src: '/images/campuses/brisbane-2.webp', alt: 'Brisbane riverside' },
      { src: '/images/campuses/brisbane-3.webp', alt: 'Brisbane city life' },
    ],
    highlights: ['One of Australia’s fastest-growing cities', 'Warm climate', 'Brisbane CBD'],
    tour: { src: 'https://my.matterport.com/show/?m=ArHq5sdfQVj', title: 'IHM Brisbane campus 3D virtual tour' },
    teamTitle: 'Meet the Brisbane Team',
    team: [{ name: 'Sabarish Babu', role: 'Campus Manager', image: '/images/people/sabarish-babu.webp' }],
    locations: [{
      name: 'Brisbane Campus', lines: ['Level 2/47-59 Adelaide St,', 'Brisbane City QLD 4000, Australia'],
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.9852327448552!2d153.0237637!3d-27.4697191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915b4fc9dc1c03%3A0xb68f7457fd1e01b3!2sInstitute%20of%20Health%20%26%20Management%20(Brisbane%20Campus)%2C%20IHM%20Brisbane!5e0!3m2!1sen!2sin!4v1781756663808!5m2!1sen!2sin',
      directions: dir('Institute of Health & Management, Level 2/47-59 Adelaide St, Brisbane City QLD 4000'),
    }],
  },
]

/** Address lines as one line: "Level 2, 187 Boundary Road, North Melbourne, VIC 3051" (without the country). */
export const oneLine = (l: CampusLocation) => l.lines.map((x) => x.trim().replace(/,$/, '')).join(', ').replace(/,\s*Australia$/, '')

export const campusPage = (slug: CampusPageData['slug']) => CAMPUS_PAGES.find((c) => c.slug === slug)!

/** Shared by every campus page and /campuses/. */
export const STUDENT_LIFE = {
  life: 'We believe that your period of study with us should be an extraordinary experience, where you get to reach your highest potential both in your academic life as well as your personal life. Our faculty are always available to lend a guiding hand whenever you need it. We are aware that every student has a unique background and a different set of needs, and all our programs and services are tuned to this understanding. We support our students in leading healthy and fulfilling lives both inside and outside the confines of the classroom and throughout the duration of their study. All our programs are designed to foster excellence and equip our students to create a mark for themselves in the global healthcare environment.',
  culture: 'Our community is a celebration of diversity, with students from many nationalities, races, religions, gender identities, ages, physical capabilities and socio-economic backgrounds. We work hard to build an inclusive culture that welcomes all students regardless of who they are and where they come from, and help them to feel welcomed and safe within our community. We love teamwork and collaboration and have a strong culture of appreciation and gratitude for what others do to support us. Our faculty and students participate in community social initiatives, and believe in helping those less fortunate than ourselves in a variety of ways.',
}

/** /contact/ */
export const CONTACT = {
  intro: 'Get an answer on courses, costs, careers as well as facilities, entry requirements or just about anything else relating to studying at IHM. We are here to help you!',
  global: [
    { label: 'From within Australia', value: '1800 763 757', href: 'tel:1800763757' },
    { label: 'From outside Australia', value: '+61 3 7046 7777', href: 'tel:+61370467777' },
  ],
  founder: {
    name: 'Dr. Bijo Kunnumpurath', title: 'Meet our Founder & Managing Director', image: '/images/people/bijo-kunnumpurath.webp',
    body: 'Dr. Bijo is the Founder, Managing Director and CEO of the Health Careers International group. His demonstrated passion towards education, entrepreneurship, and technology has shaped the vision of the HCI group.',
    cta: { t: 'Talk to Bijo', href: '/meet-our-md/' },
  },
}

/** /talk-to-rishi/ */
export const RISHI = {
  title: 'Talk to Rishi!',
  intro: 'Our expert counsellors are at hand to help you make the right decisions. Get the advice you need, when you need it!',
  topicsTitle: 'Rishi chatbot can handle the following issues',
  topics: [
    { key: 'academic', t: 'Academic', b: 'Get assistance if you need any assistance in Assessment Extension, Withdrawal, Deferral and Course Extension.' },
    { key: 'admin', t: 'Administration', b: 'Get assistance if you have any specific questions about your course, units or assessments.' },
    { key: 'it', t: 'IT Support', b: 'We’ve got all your IT essentials covered. From accessing services, to printing support and technical help.' },
    { key: 'finance', t: 'Finance', b: 'We can help you make a financial plan, with your budgeting or to apply for financial support.' },
    { key: 'job', t: 'Job', b: 'You can submit your CV and details here so that we can assist you in finding jobs.' },
    { key: 'complaints', t: 'Complaints', b: 'Get assistance if you are not satisfied with a mark on an assignment or final grade in a subject.' },
    { key: 'appeals', t: 'Appeals', b: 'Resolutions to your Complaints are not satisfactory? You can Appeal here.' },
    { key: 'covid', t: 'COVID-19', b: 'Under the Covid-19 situations you can reach out to us for help and support on highly critical situations. Please keep your evidences handy for submitting.' },
  ],
} as const
