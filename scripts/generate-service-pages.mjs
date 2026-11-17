import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const servicesOutDir = path.join(rootDir, 'services');
const BASE_URL = 'https://tanogaido.com';
const WA_NUMBER = '6281318939319';

const SERVICE_PAGES = [
  {
    id: 'japan-tour-guide',
    title: 'Japan Tour Guide',
    categoryLabel: 'Tours & Guides',
    seoTitle: 'Japan Tour Guide — Licensed Bilingual Local Guides | Tanogaido',
    metaDescription: 'Hire a licensed bilingual Japan tour guide for Tokyo, Kyoto, Osaka, and Mt. Fuji. Seamless navigation, dining reservations, and 24/7 concierge care.',
    keywords: 'Japan tour guide, bilingual Japan guide, Tokyo tour guide, Kyoto local guide, private guide Japan, Tanogaido tour guide',
    eyebrow: 'LICENSED LOCAL CONCIERGE · ON-SITE',
    h1Lead: 'Explore Japan With',
    h1Accent: 'Licensed Local Guides.',
    heroDesc: 'Navigate Tokyo, Kyoto, Osaka, and Mt. Fuji effortlessly with a bilingual Tanogaido local guide handling train transfers, hidden dining spots, and cultural etiquette.',
    heroImage: 'assets/cards/card-4.jpg',
    heroImageAlt: 'Licensed bilingual Tanogaido Japan tour guide walking travelers through historic Kyoto temple streets',
    detailImage: 'assets/tokyo-pulse.jpg',
    detailImageAlt: 'Travelers exploring Tokyo nightlife and illuminated pedestrian streets with a private Japan tour guide',
    stats: [
      { val: '1,200+', label: 'Travelers Guided Across Japan' },
      { val: '3 Languages', label: 'English, Indonesian & Japanese' },
      { val: '100%', label: 'Custom Daily Route Pace' }
    ],
    highlights: [
      { title: 'Effortless Rail & Shinkansen Transfers', desc: 'Skip platform confusion at Shinjuku, Tokyo, and Kyoto stations with real-time route guidance.' },
      { title: 'Bilingual Restaurant & Activity Booking', desc: 'Communicate smoothly at omakase counters, halal kitchens, ryokan check-ins, and boutique shops.' },
      { title: 'Insider Neighborhood Discovery', desc: 'Go beyond crowded tourist traps to discover artisan alleys, scenic viewpoints, and local tea houses.' },
      { title: 'Flexible Group & Family Pacing', desc: 'Ideal for families with kids, senior travelers, and VIP couples seeking stress-free sightseeing.' }
    ],
    overviewTitle: 'Why Book a Dedicated On-Site Japan Tour Guide?',
    overviewText: 'Traveling across Japan is infinitely richer when you have an experienced local guide beside you. Whether you are navigating multi-level Tokyo subway interchanges, visiting historic shrines in Kyoto, or enjoying day trips to Lake Kawaguchiko and Hakone, your Tanogaido guide adapts the day around your rhythm and interests.',
    included: [
      'Full-day licensed bilingual guide (up to 10 hours per day)',
      'Pre-trip itinerary calibration across Tokyo, Kansai, or Hokkaido',
      'Live train route navigation, IC card setup, and luggage forwarding tips',
      'On-the-spot translation for dining, shopping, and attraction counters',
      'Direct WhatsApp coordination with Tanogaido operations desk'
    ],
    steps: [
      { title: 'Share Your Travel Dates & Cities', desc: 'Tell our concierge your arrival city, group size, and must-see sights via WhatsApp.' },
      { title: 'Match With Your Ideal Guide', desc: 'We assign a vetted bilingual guide tailored to your route, food preferences, and pace.' },
      { title: 'Meet & Explore Stress-Free', desc: 'Your guide meets you right at your hotel lobby or airport gate ready to lead the journey.' }
    ],
    faqs: [
      {
        q: 'Which cities are covered by Tanogaido Japan tour guides?',
        a: 'Our licensed local guides operate across Tokyo, Yokohama, Mt. Fuji, Hakone, Kyoto, Osaka, Nara, Kobe, Sapporo, and Fukuoka.'
      },
      {
        q: 'What languages do Tanogaido tour guides speak?',
        a: 'All guides speak fluent Japanese alongside English and/or Indonesian to ensure seamless communication everywhere.'
      },
      {
        q: 'Can the guide help us use JR Pass and Shinkansen trains?',
        a: 'Yes. Your guide helps exchange vouchers, reserve Shinkansen seats, and escort you through station platforms.'
      },
      {
        q: 'Are guide transport and attraction fees included?',
        a: 'Guide service covers daily professional guiding fees; optional vehicle charter, rail passes, and entry tickets can be bundled cleanly on request.'
      }
    ],
    relatedIds: ['online-tour-guide', 'private-japan-tour', 'jr-pass-tickets', 'car-bus-rental'],
    waText: 'Hello Tanogaido, I would like to book an on-site Japan Tour Guide for my upcoming trip.'
  },
  {
    id: 'online-tour-guide',
    title: 'Online Japan Tour Guide',
    categoryLabel: 'Tours & Guides',
    seoTitle: 'Online Japan Tour Guide — 24/7 Live Virtual Support | Tanogaido',
    metaDescription: 'Get an online Japan tour guide on WhatsApp for live train directions, Japanese menu translation, and real-time travel assistance across Japan.',
    keywords: 'online Japan tour guide, virtual tour guide Japan, remote Japan travel assistant, WhatsApp guide Japan, independent Japan travel help',
    eyebrow: 'REMOTE CONCIERGE · LIVE WHATSAPP SUPPORT',
    h1Lead: 'Your Live Japan Expert.',
    h1Accent: 'Right In Your Pocket.',
    heroDesc: 'Explore Japan independently with instant WhatsApp and video-call backup from our bilingual Tokyo and Kyoto travel desk for routes, menus, and bookings.',
    heroImage: 'assets/tokyo-pulse.jpg',
    heroImageAlt: 'Independent traveler navigating vibrant Tokyo Shibuya district with live online Japan tour guide support',
    detailImage: 'assets/shinkansen.jpg',
    detailImageAlt: 'Japanese Shinkansen bullet train arrival guided remotely by Tanogaido online tour guide concierge',
    stats: [
      { val: '< 5 Min', label: 'Average Live Reply Time' },
      { val: '24/7', label: 'Active Trip Support Window' },
      { val: '60% Less', label: 'Cost vs. On-Site Guiding' }
    ],
    highlights: [
      { title: 'Instant Station & Exit Directions', desc: 'Send a photo of any train board or ticket gate and get step-by-step platform instructions immediately.' },
      { title: 'Live Voice & Menu Translation', desc: 'Let our team speak with restaurant staff, hotel front desks, or pharmacy cashiers on your behalf.' },
      { title: 'Dynamic Daily Route Tweaks', desc: 'Rainy weather or missed a train? We reorder your itinerary on the fly with zero wasted hours.' },
      { title: 'Budget-Friendly Freedom', desc: 'Enjoy total solo or couple privacy while keeping seasoned Japan specialists on speed dial.' }
    ],
    overviewTitle: 'Independent Japan Travel Without the Guesswork',
    overviewText: 'Love traveling at your own pace without someone walking beside you all day, yet worried about language barriers or complex Japanese rail hubs? Our Online Japan Tour Guide gives you dedicated bilingual specialists via WhatsApp chat, voice note, and video call throughout your stay.',
    included: [
      'Dedicated WhatsApp concierge line throughout your trip dates',
      'Custom day-by-day Google Maps pins and train timing sheet',
      'Live photo & voice translation at restaurants and boutiques',
      'Real-time delay recovery, tax-free shopping help & restaurant calls',
      'Pre-departure checklist for Visit Japan Web and IC cards'
    ],
    steps: [
      { title: 'Pick Your Support Days', desc: 'Select single-day remote coverage or full-trip online concierge for your Japan dates.' },
      { title: 'Receive Your Custom Digital Playbook', desc: 'Before landing, we send mapped routes, train tips, and dining notes tailored to you.' },
      { title: 'Message Anytime During Your Trip', desc: 'Chat, send photos, or start a live call whenever you need instant local clarity.' }
    ],
    faqs: [
      {
        q: 'How does the Online Japan Tour Guide work during my trip?',
        a: 'You receive a dedicated WhatsApp concierge thread staffed by bilingual Japan specialists who reply within minutes to questions, photos, or calls.'
      },
      {
        q: 'Can you call Japanese restaurants or hotels for us?',
        a: 'Yes. We handle live phone reservations, dietary inquiries, and luggage coordination directly in Japanese.'
      },
      {
        q: 'Is Pocket WiFi needed to use the online guide?',
        a: 'Reliable mobile data is essential; we recommend pairing this service with our Japan Pocket WiFi Rental for uninterrupted coverage.'
      },
      {
        q: 'Can I upgrade to an on-site guide on specific days?',
        a: 'Absolutely. Many guests combine online guiding in Tokyo with an on-site guide for Kyoto or Mt. Fuji day trips.'
      }
    ],
    relatedIds: ['japan-tour-guide', 'pocket-wifi-rental', 'jr-pass-tickets', 'japan-tour-packages'],
    waText: 'Hello Tanogaido, I would like to book the Online Japan Tour Guide service.'
  },
  {
    id: 'tokyo-9-day-guide',
    title: '9-Day Tokyo Tour Guide',
    categoryLabel: 'Tours & Guides',
    seoTitle: '9-Day Tokyo Tour Guide — Complete Kanto & Mt. Fuji Itinerary | Tanogaido',
    metaDescription: 'Book a dedicated 9-day Tokyo tour guide covering Shibuya, Asakusa, Kamakura, Hakone, Nikko, and Mt. Fuji with seamless daily scheduling.',
    keywords: '9 day Tokyo tour guide, Tokyo itinerary 9 days, Tokyo and Mt Fuji guide, Kanto private guide, Tokyo family tour guide',
    eyebrow: 'DEDICATED MULTI-DAY · TOKYO & KANTO',
    h1Lead: 'Nine Unforgettable Days.',
    h1Accent: 'Tokyo & Kanto Mastered.',
    heroDesc: 'Cover Tokyo neighborhoods, Mt. Fuji lakes, Kamakura coast, Yokohama waterfront, and Nikko shrines with one dedicated bilingual guide for 9 seamless days.',
    heroImage: 'assets/cards/card-1.jpg',
    heroImageAlt: 'Historic red lantern temple gate in Asakusa Tokyo featured on the 9-Day Tokyo Tour Guide route',
    detailImage: 'assets/fuji-climb.jpg',
    detailImageAlt: 'Mount Fuji scenic sunrise view included in Tanogaido 9-day Tokyo and Kanto excursion',
    stats: [
      { val: '9 Days', label: 'Curated Kanto Coverage' },
      { val: '5 Regions', label: 'Tokyo, Fuji, Hakone, Kamakura, Nikko' },
      { val: 'Zero Stress', label: 'End-to-End Daily Escort' }
    ],
    highlights: [
      { title: 'Deep Tokyo District Immersion', desc: 'Experience Asakusa, Meiji Jingu, Ginza, Shibuya Sky, Tsukiji Market, Akihabara, and Shimokitazawa.' },
      { title: 'Iconic Day Trips Included', desc: 'Smooth rail or van excursions to Lake Kawaguchiko, Hakone ropeway, Kamakura Great Buddha, and Nikko.' },
      { title: 'One Consistent Guide All Trip', desc: 'Build rapport with a single trusted guide who learns your dining tastes and pacing from Day 1.' },
      { title: 'Optimized Shopping & Dining Days', desc: 'Smartly timed outlet trips, tax-free flagship stops, and hidden izakaya evenings.' }
    ],
    overviewTitle: 'A Complete 9-Day Tokyo Blueprint Without Hotel Hopping',
    overviewText: 'Using Tokyo as your comfortable home base eliminates constant luggage packing while still letting you experience shrines, alpine views of Mt. Fuji, coastal temples, and neon cityscapes. Our 9-day guide coordinates every morning departure, timed attraction entry, and lunch reservation.',
    included: [
      '9 consecutive days with one dedicated bilingual Japan tour guide',
      'Balanced Tokyo ward routes plus 3 signature Kanto day excursions',
      'Timed ticket advisory for Shibuya Sky, teamLab Planets & Disney Resort',
      'Halal, vegetarian, or Michelin-bib dining curation each evening',
      'Airport arrival and departure orientation support'
    ],
    steps: [
      { title: 'Send Your Arrival & Departure Window', desc: 'Share your Tokyo flight schedule and preferred hotel neighborhood.' },
      { title: 'Customize Your 9-Day Balance', desc: 'Adjust days for theme parks, Gotemba outlets, anime districts, or peaceful gardens.' },
      { title: 'Enjoy Guided Discovery Every Day', desc: 'Step out each morning knowing every route, transfer, and dining table is ready.' }
    ],
    faqs: [
      {
        q: 'Can we include Tokyo Disneyland or DisneySea in the 9-day plan?',
        a: 'Yes. We reserve one or two days for Tokyo Disney Resort and can arrange official QR tickets alongside your guide schedule.'
      },
      {
        q: 'Should we combine this 9-day guide with a private van?',
        a: 'Public trains work great inside Tokyo, while adding a private Alphard or HiAce van for Mt. Fuji and Hakone days maximizes comfort.'
      },
      {
        q: 'Is this suitable for elderly parents or young children?',
        a: 'Yes. Having one dedicated guide lets us build rest breaks, elevator-friendly routes, and lighter walking days whenever needed.'
      },
      {
        q: 'Can the 9-day route be shortened or extended to Kyoto?',
        a: 'Yes, we can adapt the duration or add a Shinkansen leg to Kyoto and Osaka anytime.'
      }
    ],
    relatedIds: ['japan-tour-guide', 'attraction-theme-park-tickets', 'car-bus-rental', 'private-japan-tour'],
    waText: 'Hello Tanogaido, I am interested in booking the 9-Day Tokyo Tour Guide package.'
  },
  {
    id: 'japan-tour-packages',
    title: 'Japan Tour Packages',
    categoryLabel: 'Tours & Guides',
    seoTitle: 'Japan Tour Packages — Golden Route, Sakura & Hokkaido | Tanogaido',
    metaDescription: 'Explore all-inclusive Japan tour packages for Golden Route, Sakura spring, autumn foliage, and Hokkaido winter snow with hotels, rail, and guides.',
    keywords: 'Japan tour packages, Golden Route Japan tour, Sakura tour package, Hokkaido winter tour, all inclusive Japan tour, Tanogaido packages',
    eyebrow: 'ALL-IN SEASONAL TOURS · 5 TO 10 DAYS',
    h1Lead: 'Curated Seasonal Journeys.',
    h1Accent: 'All-Inclusive Japan.',
    heroDesc: 'Discover Japan’s iconic Golden Route, spring cherry blossoms, autumn maple valleys, and Hokkaido winter powder in complete comfort with hotels and transport arranged.',
    heroImage: 'assets/fuji-climb.jpg',
    heroImageAlt: 'Mount Fuji rising behind red autumn maple foliage on a Tanogaido seasonal Japan tour package',
    detailImage: 'assets/zen-retreat.jpg',
    detailImageAlt: 'Traditional Japanese wooden pavilion and tranquil garden pond included in Tanogaido tour packages',
    stats: [
      { val: '4 Seasons', label: 'Sakura, Summer, Koyo & Snow' },
      { val: '4-Star+', label: 'Handpicked Central Hotels' },
      { val: 'All-In', label: 'Guides, Rail & Entries Bundled' }
    ],
    highlights: [
      { title: 'Iconic Golden Route & Beyond', desc: 'Seamless itineraries linking Tokyo, Mt. Fuji, Shirakawago, Kyoto, Nara, and Osaka.' },
      { title: 'Prime Central Accommodations', desc: 'Stay steps from major JR and metro stations or unwind in authentic hot-spring ryokans.' },
      { title: 'Seasonal Timing Expertise', desc: 'Routes calibrated to peak sakura blooms, momiji foliage forecasts, and Niseko snow.' },
      { title: 'Transparent All-In Pricing', desc: 'Clear package inclusions covering guides, transport, breakfasts, and key landmark tickets.' }
    ],
    overviewTitle: 'Turnkey Japan Packages Designed Around Authentic Experiences',
    overviewText: 'Our seasonal Japan tour packages take the complexity out of multi-city trip planning. Rather than rushing from parking lot to parking lot, Tanogaido crafts well-paced journeys blending famous UNESCO temples with culinary tastings, Shinkansen rides, and artisan districts.',
    included: [
      'Handpicked 4-star city hotels & optional hot-spring ryokan stays',
      'Bullet train tickets or licensed private coach transport between cities',
      'Experienced bilingual tour leader throughout the itinerary',
      'Daily breakfast plus curated local dining recommendations',
      'Pre-booked admission for featured shrines, ropeways & cultural sites'
    ],
    steps: [
      { title: 'Choose Your Season & Duration', desc: 'Pick 5, 7, or 10-day itineraries across Golden Route, Alpine Route, or Hokkaido.' },
      { title: 'Review Package Details & Hotels', desc: 'Receive a clear itinerary breakdown, seasonal highlights, and rooming options.' },
      { title: 'Confirm & Prepare for Takeoff', desc: 'Bundle your Japan visa and Pocket WiFi in one step before departure.' }
    ],
    faqs: [
      {
        q: 'Are flights included in Tanogaido Japan tour packages?',
        a: 'Land-tour packages allow flexible flight booking from your city, and our team can advise optimal arrival/departure airports.'
      },
      {
        q: 'Can halal or Muslim-friendly meals be accommodated?',
        a: 'Yes. We provide curated halal-certified and seafood/vegetarian dining options across Tokyo, Kyoto, Osaka, and Hokkaido.'
      },
      {
        q: 'What is the typical group size for seasonal packages?',
        a: 'We focus on intimate small-group departures or private family bookings so every traveler receives attentive service.'
      },
      {
        q: 'When should I book Sakura or Winter packages?',
        a: 'We recommend reserving 3 to 5 months ahead for peak March–April cherry blossom and December–February snow dates.'
      }
    ],
    relatedIds: ['private-japan-tour', 'japan-visa-processing', 'jr-pass-tickets', 'pocket-wifi-rental'],
    waText: 'Hello Tanogaido, I would like to see available Japan Tour Packages and departure dates.'
  },
  {
    id: 'private-japan-tour',
    title: 'Private Japan Tour',
    categoryLabel: 'Tours & Guides',
    seoTitle: 'Private Japan Tour — Bespoke Luxury & Family Trips | Tanogaido',
    metaDescription: 'Design a 100% custom private Japan tour for your family, honeymoon, or corporate VIPs with private Alphard vehicles and licensed guides.',
    keywords: 'private Japan tour, custom Japan itinerary, luxury family tour Japan, bespoke Japan travel, VIP Japan concierge',
    eyebrow: 'BESPOKE ITINERARIES · 1 TO 15 GUESTS',
    h1Lead: 'Crafted Strictly Around',
    h1Accent: 'Your Pace & Style.',
    heroDesc: 'Experience Japan exclusively with your own family, partner, or executive team — complete with custom routes, private chauffeur vans, and dedicated bilingual hosts.',
    heroImage: 'assets/cards/card-5.jpg',
    heroImageAlt: 'Private luxury Japan cultural tour overlooking tranquil temple courtyard and gardens',
    detailImage: 'assets/tea-ceremony.jpg',
    detailImageAlt: 'Exclusive private Japanese matcha tea ceremony arranged during bespoke Tanogaido tours',
    stats: [
      { val: '650+', label: 'Private & VIP Groups Hosted' },
      { val: '100%', label: 'Zero Outside Joiners' },
      { val: 'Custom', label: 'Door-to-Door Flexible Timing' }
    ],
    highlights: [
      { title: 'Zero Fixed Bus Schedules', desc: 'Sleep in when you want, linger longer at scenic spots, and pivot plans effortlessly.' },
      { title: 'Tailored For Kids & Seniors', desc: 'Gentle walking paths, stroller/wheelchair-friendly logistics, and private van pickups.' },
      { title: 'Exclusive Cultural Access', desc: 'Arrange private tea ceremonies, kimono fittings, sushi workshops, or ryokan suites.' },
      { title: 'Unified Concierge Billing', desc: 'Combine private guides, vehicles, theme park passes, and hotel bookings seamlessly.' }
    ],
    overviewTitle: 'Bespoke Japan Travel Designed From a Blank Canvas',
    overviewText: 'Every traveler imagines Japan differently — from Michelin dining and serene Kyoto ryokans to family theme parks or snow resorts in Hokkaido. Our Private Japan Tour planners listen first, then architect a custom route where every transfer, meal, and local host fits your party alone.',
    included: [
      'One-on-one itinerary design consultation with senior Japan planners',
      'Private licensed bilingual tour guide and/or green-plate chauffeur vehicle',
      'Custom hotel, ryokan, and dining reservation management',
      'Priority attraction and Shinkansen seat coordination',
      'Dedicated 24/7 concierge desk throughout your stay in Japan'
    ],
    steps: [
      { title: 'Brief Our Travel Architects', desc: 'Share your traveler ages, dream destinations, hotel tier, and travel dates.' },
      { title: 'Refine Your Custom Blueprint', desc: 'Review your tailored route proposal and tweak activities until every day feels right.' },
      { title: 'Travel With Total Privacy', desc: 'Enjoy seamless airport meet-and-greet and white-glove local hosting from start to finish.' }
    ],
    faqs: [
      {
        q: 'What is the minimum group size for a Private Japan Tour?',
        a: 'We host solo VIPs and couples (2 guests) all the way up to multi-generational families and corporate incentives of 15+ guests.'
      },
      {
        q: 'Can we mix Shinkansen bullet trains with private cars?',
        a: 'Yes — a popular hybrid uses private Alphard vans in Tokyo/Fuji/Kyoto and the Shinkansen between cities.'
      },
      {
        q: 'How far in advance should we plan a bespoke private trip?',
        a: 'Ideally 6 to 12 weeks prior, though our concierge team also fulfills urgent last-minute requests.'
      },
      {
        q: 'Can you coordinate private corporate retreats or incentive trips?',
        a: 'Yes, PT. Tanogaido Fantasi Pratama regularly manages executive delegations, factory visits, and incentive programs.'
      }
    ],
    relatedIds: ['japan-tour-guide', 'car-bus-rental', 'japan-golf-tour', 'japan-prewedding'],
    waText: 'Hello Tanogaido, I would like to design a custom Private Japan Tour for my group.'
  },
  {
    id: 'japan-visa-processing',
    title: 'Japan Visa Processing',
    categoryLabel: 'Visa Concierge',
    seoTitle: 'Japan Visa Processing — E-Visa, Waiver & Multiple Entry | Tanogaido',
    metaDescription: 'Fast, accurate Japan visa processing for E-Visa, e-passport Visa Waiver, and Multiple Entry visas with thorough pre-submission document review.',
    keywords: 'Japan visa processing, Japan E-Visa service, Japan visa waiver, Japan multiple entry visa, Japan tourist visa assistance',
    eyebrow: 'VISA CONCIERGE · E-VISA & WAIVER',
    h1Lead: 'Smooth, Accurate Filing.',
    h1Accent: 'Japan Visa Care.',
    heroDesc: 'Avoid delays and document rejections with pre-submission embassy audits for Japan E-Visa, Visa Waiver registration, Single Entry, and Multiple Entry visas.',
    heroImage: 'assets/cards/japan-documents.jpg',
    heroImageAlt: 'Passport and verified Japan visa application paperwork prepared by Tanogaido visa specialists',
    detailImage: 'assets/cards/card-6.jpg',
    detailImageAlt: 'International travel documentation and flight itinerary checklist for Japan visa approval',
    stats: [
      { val: '940+', label: 'Approved Japan Applicants' },
      { val: 'Pre-Check', label: 'Full Embassy Document Audit' },
      { val: 'All Types', label: 'Waiver, Single, Multi & Business' }
    ],
    highlights: [
      { title: 'Zero-Guesswork Document Audit', desc: 'Every bank statement, employment letter, and itinerary is verified against current embassy standards.' },
      { title: 'E-Visa & Waiver Specialists', desc: 'Fast registration for eligible e-passport holders plus full online E-Visa submission support.' },
      { title: 'Family & Group Coordination', desc: 'Streamlined sponsor letters and aligned flight/hotel dossiers for families traveling together.' },
      { title: 'Transparent Status Updates', desc: 'Track each milestone from document collection through JVAC/embassy clearance via WhatsApp.' }
    ],
    overviewTitle: 'Hassle-Free Japan Visa Assistance From Start to Approval',
    overviewText: 'Small clerical errors on application forms, mismatched travel dates, or incomplete sponsor documents are the top causes of Japan visa delays. Since 2007, Tanogaido has guided hundreds of tourists, families, and corporate travelers smoothly through embassy and JVAC procedures.',
    included: [
      'Eligibility check for Visa Waiver, E-Visa, Single, or Multiple Entry',
      'Complete application form preparation and itinerary alignment',
      'Financial statement and sponsor letter compliance check',
      'Submission coordination and real-time pickup/E-Visa notice tracking',
      'Optional certified document translation if supporting records require it'
    ],
    steps: [
      { title: 'Confirm Your Passport & Visa Category', desc: 'Message our visa desk with your passport type and planned departure date.' },
      { title: 'Submit Scans for Pre-Audit', desc: 'We review every supporting page and advise quick fixes before submission.' },
      { title: 'Receive Your Approved Japan Visa', desc: 'Pick up your stamped passport or receive your digital Japan E-Visa notice ready for boarding.' }
    ],
    faqs: [
      {
        q: 'How long does Japan visa processing usually take?',
        a: 'Standard embassy/JVAC processing takes around 5 to 7 working days after filing, depending on seasonal volume.'
      },
      {
        q: 'Can you process Japan Visa Waiver for e-passports?',
        a: 'Yes, we handle e-passport Visa Waiver registration quickly and cleanly before your departure.'
      },
      {
        q: 'Who qualifies for a Japan Multiple Entry visa?',
        a: 'Frequent travelers with qualifying financial capacity or previous G7/Japan travel history may apply; we assess your eligibility upfront.'
      },
      {
        q: 'Do I need to buy flight tickets before applying?',
        a: 'We advise on compliant flight/hotel booking documentation so you do not risk non-refundable fares.'
      }
    ],
    relatedIds: ['document-translation', 'china-visa-processing', 'south-korea-visa-processing', 'japan-tour-packages'],
    waText: 'Hello Tanogaido, I need assistance with Japan Visa Processing.'
  },
  {
    id: 'china-visa-processing',
    title: 'China Visa Processing',
    categoryLabel: 'Visa Concierge',
    seoTitle: 'China Visa Processing — Tourist, Business & Transit | Tanogaido',
    metaDescription: 'Reliable China visa processing assistance for L tourist, M business, and family visit visas including online form filling and center scheduling.',
    keywords: 'China visa processing, China tourist visa, China business visa M, China visa center appointment, Tanogaido visa concierge',
    eyebrow: 'GLOBAL VISA DESK · TOURIST & BUSINESS',
    h1Lead: 'Streamlined Filing For',
    h1Accent: 'China Visas.',
    heroDesc: 'Navigate China’s online COVA application, invitation letter checks, and Visa Application Center appointments cleanly with Tanogaido’s experienced visa desk.',
    heroImage: 'assets/cards/card-6.jpg',
    heroImageAlt: 'China visa application forms and passport documents reviewed by Tanogaido visa concierge',
    detailImage: 'assets/cards/japan-documents.jpg',
    detailImageAlt: 'Verified international travel itineraries and supporting letters for China tourist and business visas',
    stats: [
      { val: 'L / M / Q', label: 'Tourist, Business & Family' },
      { val: '100% Audit', label: 'COVA Form & Photo Check' },
      { val: 'Single/Multi', label: 'Flexible Entry Validity' }
    ],
    highlights: [
      { title: 'COVA Online Form Preparation', desc: 'We accurately complete lengthy digital China visa forms so zero discrepancies hold up your slot.' },
      { title: 'Business & Exhibition Support', desc: 'Guidance on M-visa invitation letters for Canton Fair, supplier visits, and trade missions.' },
      { title: 'Center Appointment Scheduling', desc: 'Coordinated submission times and biometric readiness reminders for stress-free center visits.' },
      { title: 'Photo & Itinerary Alignment', desc: 'Strict checking of biometric photo specs, hotel stays, and multi-city schedules.' }
    ],
    overviewTitle: 'Accurate China Visa Handling Without Application Mistakes',
    overviewText: 'China visa applications require detailed multi-page COVA forms, strict passport photo dimensions, and matching hotel or invitation documentation. Our visa team handles form preparation and pre-checks every detail before your submission date.',
    included: [
      'Visa type assessment (L Tourist, M Business, Q/S Family Visit)',
      'Full digital COVA form drafting and error inspection',
      'Invitation letter / flight & hotel reservation verification',
      'Application center appointment booking & biometric checklist',
      'Clear tracking until passport collection'
    ],
    steps: [
      { title: 'Select Your China Visa Purpose', desc: 'Let us know whether you are visiting for tourism, business, or family.' },
      { title: 'Document Audit & Form Drafting', desc: 'Send your passport bio page, photo, and trip details for full COVA preparation.' },
      { title: 'Submit & Collect Passport', desc: 'Complete center submission smoothly with our step-by-step escort and checklist.' }
    ],
    faqs: [
      {
        q: 'Do all applicants need to appear for fingerprints?',
        a: 'Fingerprint requirements depend on current embassy exemptions (e.g., certain single/double-entry short stays or age brackets); we confirm exact rules for your case.'
      },
      {
        q: 'Can you assist with business (M) visas for trade fairs?',
        a: 'Yes, we verify your Chinese host company invitation letter and align your business itinerary.'
      },
      {
        q: 'How early should I apply for a China visa?',
        a: 'We recommend starting 3 to 4 weeks prior to departure to allow comfortable appointment and processing lead time.'
      }
    ],
    relatedIds: ['japan-visa-processing', 'south-korea-visa-processing', 'europe-schengen-visa', 'document-translation'],
    waText: 'Hello Tanogaido, I need assistance with China Visa Processing.'
  },
  {
    id: 'south-korea-visa-processing',
    title: 'South Korea Visa Processing',
    categoryLabel: 'Visa Concierge',
    seoTitle: 'South Korea Visa Processing — Tourist & Multiple Entry | Tanogaido',
    metaDescription: 'End-to-end South Korea visa processing with financial dossier review, KVAC coordination, and tourist, family, or multiple-entry support.',
    keywords: 'South Korea visa processing, Korea tourist visa C-3-9, KVAC visa assistance, Korea multiple entry visa, Tanogaido visa service',
    eyebrow: 'GLOBAL VISA DESK · SINGLE & MULTIPLE',
    h1Lead: 'Confident Approval For',
    h1Accent: 'South Korea Visas.',
    heroDesc: 'Prepare spotless financial records, sponsor proofs, and KVAC submissions for Seoul, Busan, and Jeju trips with Tanogaido’s dedicated visa team.',
    heroImage: 'assets/island-hop.jpg',
    heroImageAlt: 'Scenic coastal bridge and sea views celebrating approved South Korea visa travel',
    detailImage: 'assets/cards/japan-documents.jpg',
    detailImageAlt: 'Financial statements and South Korea KVAC visa dossier prepared by Tanogaido specialists',
    stats: [
      { val: 'C-3-9 / C-3-4', label: 'Tourist & Business Visas' },
      { val: 'KVAC Ready', label: 'Complete Financial Audit' },
      { val: 'Group/Solo', label: 'Individual & Family Filing' }
    ],
    highlights: [
      { title: 'Thorough Bank & Tax Record Check', desc: 'We audit 3-month bank statements, reference letters, and tax proofs before KVAC submission.' },
      { title: 'Multiple-Entry Assessment', desc: 'Check eligibility for 5-year or 10-year South Korea multiple-entry visas based on your profile.' },
      { title: 'Family & Group Bundling', desc: 'Cleanly link relationship certificates and sponsor letters for parents, spouses, and children.' },
      { title: 'Combine East Asia Trips', desc: 'Planning Japan and South Korea in one holiday? We align both visa timelines together.' }
    ],
    overviewTitle: 'Structured KVAC Preparation for Higher Peace of Mind',
    overviewText: 'South Korea visa evaluations focus heavily on consistent employment, financial stability, and cleanly formatted supporting records. Our specialists organize your entire dossier in the exact order KVAC officers expect, saving you repeat trips.',
    included: [
      'Complete South Korea visa checklist tailored to your occupation',
      'Application form drafting and itinerary alignment',
      'Financial & employment proof verification prior to filing',
      'KVAC submission scheduling and tracking updates',
      'Multi-country East Asia timeline coordination with Japan visas'
    ],
    steps: [
      { title: 'Check Eligibility & Checklist', desc: 'Share your employment status and travel dates for a customized document list.' },
      { title: 'Pre-Screening & Dossier Assembly', desc: 'We review every statement and format your application package accurately.' },
      { title: 'KVAC Filing & Approval Notice', desc: 'Submit cleanly and track electronic visa grant status right up to issuance.' }
    ],
    faqs: [
      {
        q: 'Can I apply for Japan and South Korea visas together?',
        a: 'Yes! Because both require your physical passport during certain stages, our team sequences the filings so you make your flight on time.'
      },
      {
        q: 'What financial balance is recommended for a Korea tourist visa?',
        a: 'Balances should comfortably cover your trip duration with consistent monthly income activity; we review your statements confidentially before filing.'
      },
      {
        q: 'How long does KVAC processing take?',
        a: 'Typically 7 to 14 working days depending on peak spring or autumn demand.'
      }
    ],
    relatedIds: ['japan-visa-processing', 'china-visa-processing', 'europe-schengen-visa', 'document-translation'],
    waText: 'Hello Tanogaido, I need assistance with South Korea Visa Processing.'
  },
  {
    id: 'europe-schengen-visa',
    title: 'Europe Schengen Visa Processing',
    categoryLabel: 'Visa Concierge',
    seoTitle: 'Europe Schengen Visa Processing — EU Embassy & VFS Care | Tanogaido',
    metaDescription: 'Complete Europe Schengen visa processing with compliant itineraries, travel medical insurance, cover letters, and VFS/TLS appointment booking.',
    keywords: 'Europe Schengen visa processing, Schengen tourist visa assistance, VFS Schengen appointment, EU travel insurance visa, Tanogaido visa',
    eyebrow: 'GLOBAL VISA DESK · 29 SCHENGEN STATES',
    h1Lead: 'Seamless Preparation For',
    h1Accent: 'Europe Schengen Visas.',
    heroDesc: 'From multi-country EU itineraries and embassy cover letters to compliant Schengen travel insurance and VFS appointments, we simplify every requirement.',
    heroImage: 'assets/zen-retreat.jpg',
    heroImageAlt: 'Peaceful historic architecture representing stress-free Europe Schengen visa preparation by Tanogaido',
    detailImage: 'assets/cards/japan-documents.jpg',
    detailImageAlt: 'Complete Schengen visa itinerary, insurance certificate, and VFS checklist reviewed by Tanogaido',
    stats: [
      { val: '29 States', label: 'Schengen Area Coverage' },
      { val: 'VFS / TLS', label: 'Slot & Biometric Prep' },
      { val: 'Full Kit', label: 'Insurance & Cover Letter' }
    ],
    highlights: [
      { title: 'Main-Destination Routing Check', desc: 'We verify which EU embassy should receive your application based on stay duration and entry point.' },
      { title: 'Embassy-Compliant Insurance & Itineraries', desc: 'Minimum €30,000 medical coverage and coherent hotel/rail/flight alignments arranged cleanly.' },
      { title: 'Tailored Cover Letters', desc: 'Clear, professional purpose-of-travel letters addressing ties, funding, and day-by-day plans.' },
      { title: 'Sworn Document Translation Support', desc: 'Need civil or family documents translated into English? Handled seamlessly in-house.' }
    ],
    overviewTitle: 'Organized Schengen Visa Dossiers Built for Embassy Clarity',
    overviewText: 'Applying for a Europe Schengen visa involves strict routing rules, Schengen-compliant medical insurance, translated civil records, and tight VFS/TLS appointment slots. Tanogaido prepares every page methodically so you walk into your biometric appointment confident and complete.',
    included: [
      'Embassy jurisdiction check across France, Switzerland, Italy, Germany, Netherlands & more',
      'Day-by-day Schengen travel itinerary & accommodation alignment',
      'Professional Schengen cover letter and sponsorship drafting',
      'Schengen-compliant €30,000 travel medical insurance arrangement',
      'VFS Global / TLScontact appointment scheduling and interview prep'
    ],
    steps: [
      { title: 'Share Your European Route', desc: 'Tell us which countries you plan to visit and how many nights in each city.' },
      { title: 'Assemble & Translate Your Dossier', desc: 'We prepare forms, cover letters, insurance, and any required English translations.' },
      { title: 'Attend Biometrics & Receive Passport', desc: 'Complete your VFS/TLS appointment smoothly with full document organization.' }
    ],
    faqs: [
      {
        q: 'Which embassy do I apply to if visiting multiple European countries?',
        a: 'You apply to the Schengen state where you spend the most nights, or your first port of entry if nights are equal across countries.'
      },
      {
        q: 'How early can I apply for a Schengen visa?',
        a: 'Applications can be submitted up to 6 months before travel, and we strongly advise starting at least 6–8 weeks early due to VFS slot demand.'
      },
      {
        q: 'Do you also provide travel medical insurance for Schengen?',
        a: 'Yes, we arrange embassy-approved travel insurance meeting the €30,000 medical & repatriation mandate.'
      }
    ],
    relatedIds: ['document-translation', 'japan-visa-processing', 'south-korea-visa-processing', 'china-visa-processing'],
    waText: 'Hello Tanogaido, I need assistance with Europe Schengen Visa Processing.'
  },
  {
    id: 'jr-pass-tickets',
    title: 'JR Pass Tickets',
    categoryLabel: 'Transport & Passes',
    seoTitle: 'JR Pass Tickets — Official Japan Rail & Shinkansen | Tanogaido',
    metaDescription: 'Buy official Japan Rail Pass, Regional JR Passes, and Shinkansen point-to-point tickets with free route savings calculation from Tanogaido.',
    keywords: 'JR Pass tickets, official Japan Rail Pass, Shinkansen bullet train tickets, Kansai JR pass, Hokkaido rail pass, Tanogaido JR Pass',
    eyebrow: 'OFFICIAL RAIL PARTNER · SHINKANSEN',
    h1Lead: 'Ride The Shinkansen.',
    h1Accent: 'Maximize Rail Savings.',
    heroDesc: 'Get official Whole Japan Rail Passes, Regional JR Passes, and point-to-point Shinkansen tickets — backed by a free route-cost check so you never overpay.',
    heroImage: 'assets/shinkansen.jpg',
    heroImageAlt: 'High-speed Japanese Shinkansen bullet train speeding along tracks for Tanogaido JR Pass holders',
    detailImage: 'assets/fuji-climb.jpg',
    detailImageAlt: 'Mount Fuji view from the Tokaido Shinkansen bullet train between Tokyo and Kyoto',
    stats: [
      { val: '890+', label: 'JR Pass Holders Served' },
      { val: 'Free Check', label: 'Pass vs. Point-to-Point Audit' },
      { val: '7 / 14 / 21d', label: 'Whole Japan & Regional Passes' }
    ],
    highlights: [
      { title: 'Honest Route Savings Calculator', desc: 'We compare total point-to-point Shinkansen fares against JR Pass prices before you buy.' },
      { title: 'Regional Pass Expertise', desc: 'Save big with JR Kansai-Hiroshima, JR East Tohoku, Hokuriku Arch, or Hokkaido Rail Passes.' },
      { title: 'Oversized Luggage Seat Guidance', desc: 'Clear instructions on reserving Shinkansen seats with dedicated large suitcase spaces.' },
      { title: 'Ordinary & Green Car Options', desc: 'Choose standard comfort or first-class Green Car cabins across Japan’s rail network.' }
    ],
    overviewTitle: 'Smart Japan Rail Planning Before You Board',
    overviewText: 'Since nationwide JR Pass pricing updated, choosing between a Whole Japan Rail Pass, a Regional JR Pass, or single Shinkansen e-tickets makes a huge difference to your budget. Send us your cities and we calculate the smartest combination in minutes.',
    included: [
      'Free multi-city fare comparison before issuing any rail pass',
      'Official Whole Japan Rail Pass (7, 14, or 21 consecutive days)',
      'Regional JR Passes (Kansai, JR East, Kyushu, Hokkaido, Alpine)',
      'Point-to-point Shinkansen seat tickets including Nozomi & Mizuho',
      'Step-by-step voucher exchange and seat reservation instructions'
    ],
    steps: [
      { title: 'Send Your City-to-City Route', desc: 'Tell us where you fly in, which cities you visit, and your travel dates.' },
      { title: 'Receive Best-Value Rail Recommendation', desc: 'We show whether a Whole Pass, Regional Pass, or single tickets save you more.' },
      { title: 'Issue Passes & Reserve Seats', desc: 'Receive your official exchange voucher or QR ticket with easy station pickup steps.' }
    ],
    faqs: [
      {
        q: 'Is the nationwide 7-day JR Pass still worth it for Tokyo–Kyoto–Osaka?',
        a: 'For a simple Tokyo–Osaka round-trip alone, single Shinkansen tickets are usually cheaper; adding Hiroshima, Kanazawa, or Kyushu makes passes shine. We calculate it free for you.'
      },
      {
        q: 'Can you issue tickets for the fast Nozomi Shinkansen?',
        a: 'Yes, we book direct Nozomi point-to-point tickets as well as Nozomi upgrade supplements if needed.'
      },
      {
        q: 'What is the difference between Ordinary and Green Car?',
        a: 'Green Car offers wider 2+2 seating, extra legroom, quieter cabins, and attendant service similar to business class.'
      }
    ],
    relatedIds: ['attraction-theme-park-tickets', 'car-bus-rental', 'pocket-wifi-rental', 'online-tour-guide'],
    waText: 'Hello Tanogaido, I would like to check and buy JR Pass or Shinkansen Tickets.'
  },
  {
    id: 'attraction-theme-park-tickets',
    title: 'Attraction, Theme Park & Rail Pass Tickets',
    categoryLabel: 'Transport & Passes',
    seoTitle: 'Japan Theme Park & Attraction Tickets — USJ, Disney & Passes | Tanogaido',
    metaDescription: 'Book official QR tickets for Universal Studios Japan, USJ Express Pass, Tokyo Disneyland, DisneySea, Shibuya Sky, teamLab, and regional rail passes.',
    keywords: 'Japan theme park tickets, USJ Express Pass tickets, Tokyo DisneySea tickets, Shibuya Sky tickets, teamLab Planets tickets, Japan attraction QR',
    eyebrow: 'INSTANT QR · EXPRESS PASSES',
    h1Lead: 'Guaranteed Entry To',
    h1Accent: 'Japan’s Top Parks.',
    heroDesc: 'Lock in high-demand tickets for Universal Studios Japan, Super Nintendo World Express Passes, Tokyo Disney Resort, Shibuya Sky, and regional transit passes.',
    heroImage: 'assets/cards/japan-theme-park.jpg',
    heroImageAlt: 'Illuminated Japanese theme park castle and evening attractions available via Tanogaido QR tickets',
    detailImage: 'assets/tokyo-pulse.jpg',
    detailImageAlt: 'Tokyo Shibuya skyline observation view included in Tanogaido attraction ticket concierge',
    stats: [
      { val: 'QR Ready', label: 'Fast Mobile Gate Scanning' },
      { val: 'USJ & Disney', label: 'High-Demand Timed Slots' },
      { val: 'Bundled', label: 'Parks, Observatories & Rail' }
    ],
    highlights: [
      { title: 'USJ Studio & Express Passes', desc: 'Skip multi-hour queues at Super Nintendo World, Harry Potter, and Flying Dinosaur.' },
      { title: 'Tokyo Disneyland & DisneySea', desc: 'Secure preferred date admission including Fantasy Springs access guidance.' },
      { title: 'Sold-Out Observatory & Art Slots', desc: 'Early assistance for sunset Shibuya Sky windows and teamLab Planets / Borderless.' },
      { title: 'Airport & Regional Transit Passes', desc: 'Bundle Skyliner, Haruka Express, Tokyo Subway 24–72h, and Kansai Thru Passes.' }
    ],
    overviewTitle: 'Never Miss Timed Entry at Japan’s Most Popular Attractions',
    overviewText: 'Japan’s top attractions now rely strictly on timed online quotas that sell out weeks in advance — especially sunset slots at Shibuya Sky and USJ Express Passes. Our ticketing desk secures verified QR vouchers and walks you through park entry apps.',
    included: [
      'Official QR e-tickets for USJ, Tokyo Disneyland & Tokyo DisneySea',
      'Universal Express Pass 4 / 7 options with Nintendo timed entry',
      'Shibuya Sky, Tokyo Skytree, teamLab Planets & Warner Bros. Studio Tour',
      'Airport rail transfers (Narita Skyliner, N’EX, Kansai Haruka)',
      'Park strategy tips for rides, mobile food orders, and fireworks'
    ],
    steps: [
      { title: 'Send Your Preferred Park Dates', desc: 'Share your target dates, traveler ages, and wish-list rides or time slots.' },
      { title: 'Check Live Slot Availability', desc: 'Our desk verifies available Express Pass combinations and sunset observatory slots.' },
      { title: 'Receive Instant QR Vouchers', desc: 'Get ready-to-scan mobile vouchers and app setup instructions before park day.' }
    ],
    faqs: [
      {
        q: 'How early should I book USJ Express Passes?',
        a: 'Express Passes frequently sell out 3 to 6 weeks ahead, especially for weekends and school holidays — message us as soon as your Osaka dates are set.'
      },
      {
        q: 'Do children need separate tickets for theme parks?',
        a: 'Yes, child pricing applies based on age tiers (typically ages 4–11 at USJ/Disney); we verify exact brackets when quoting.'
      },
      {
        q: 'Can you bundle Tokyo Subway passes or Narita Skyliner tickets?',
        a: 'Yes, we can issue airport express and city subway passes alongside your attraction tickets in one order.'
      }
    ],
    relatedIds: ['jr-pass-tickets', 'car-bus-rental', 'tokyo-9-day-guide', 'pocket-wifi-rental'],
    waText: 'Hello Tanogaido, I would like to buy Japan Attraction, Theme Park & Rail Pass Tickets.'
  },
  {
    id: 'car-bus-rental',
    title: 'Car & Tour Bus Rental',
    categoryLabel: 'Transport & Passes',
    seoTitle: 'Japan Car & Tour Bus Rental — Private Alphard, HiAce & Coach | Tanogaido',
    metaDescription: 'Charter licensed green-plate Toyota Alphard, HiAce Grand Cabin, microbus, or tour buses with professional drivers across Japan.',
    keywords: 'Japan car rental with driver, Tokyo Alphard charter, Japan HiAce rental, Japan tour bus charter, airport transfer Haneda Narita Kansai',
    eyebrow: 'LICENSED GREEN-PLATE FLEET · CHAUFFEUR',
    h1Lead: 'Private Chauffeur Fleet.',
    h1Accent: 'Door-To-Door Comfort.',
    heroDesc: 'Travel across Tokyo, Mt. Fuji, Kyoto, Osaka, and Hokkaido in licensed green-plate Toyota Alphards, HiAce Grand Cabins, and executive tour coaches with spacious luggage capacity.',
    heroImage: 'assets/cards/japan-van.jpg',
    heroImageAlt: 'Executive black Toyota Alphard and HiAce private charter fleet for Tanogaido Japan transfers',
    detailImage: 'assets/fuji-climb.jpg',
    detailImageAlt: 'Scenic highway route toward Mount Fuji traveled comfortably in a Tanogaido private charter van',
    stats: [
      { val: 'Green Plate', label: '100% Licensed Commercial Fleet' },
      { val: '4 to 45 Pax', label: 'Alphard, HiAce & Tour Coaches' },
      { val: 'All-In Rate', label: 'Driver, Tolls & Fuel Included' }
    ],
    highlights: [
      { title: 'Legally Licensed Green-Plate Vehicles', desc: 'Full commercial insurance and government-licensed drivers for worry-free airport and highway travel.' },
      { title: 'Generous Suitcase Space', desc: 'HiAce Grand Cabins and coaches fit large luggage effortlessly — no hauling bags up station stairs.' },
      { title: '10-Hour Custom Day Charters', desc: 'Explore Mt. Fuji 5th Station, Lake Kawaguchiko, Gotemba Outlets, or Kyoto outskirts at your own pace.' },
      { title: 'Major Airport Meet & Greet', desc: 'Seamless pickups and drop-offs at Narita, Haneda, Kansai, Chubu Centrair, and New Chitose.' }
    ],
    overviewTitle: 'Seamless Private Transport for Families, Seniors & Groups',
    overviewText: 'Nothing beats stepping straight out of your hotel lobby into a climate-controlled Toyota Alphard or HiAce when traveling with kids, elderly parents, golf bags, or winter luggage. Our transparent charter quotes clearly cover driver, fuel, expressway tolls, and parking.',
    included: [
      'Licensed green-plate vehicle matched to passenger and luggage count',
      'Experienced professional driver (optional bilingual tour guide onboard)',
      '10-hour daily charter service or direct airport-to-hotel transfer',
      'All highway expressway tolls, fuel, and standard parking fees',
      'Child car seats available upon advance request'
    ],
    steps: [
      { title: 'Share Headcount & Suitcase Total', desc: 'Tell us how many passengers, large suitcases, and strollers or golf bags you have.' },
      { title: 'Match the Ideal Vehicle Class', desc: 'Choose from Toyota Alphard, HiAce Commuter/Grand Cabin, 20-seat Microbus, or 45-seat Coach.' },
      { title: 'Enjoy Effortless Pickup', desc: 'Your driver meets you on schedule with real-time flight and route monitoring.' }
    ],
    faqs: [
      {
        q: 'How many passengers and suitcases fit in a Toyota Alphard vs. HiAce?',
        a: 'A Toyota Alphard comfortably fits 4–5 passengers with 4 large suitcases; a HiAce Grand Cabin accommodates up to 8–9 passengers with 8–9 suitcases.'
      },
      {
        q: 'Why does a licensed green-plate vehicle matter in Japan?',
        a: 'Green license plates guarantee legal commercial transport authorization and full passenger liability insurance — unlike unlicensed private white-plate rides.'
      },
      {
        q: 'Can we book a van just for a 1-day Mt. Fuji trip from Tokyo?',
        a: 'Yes! Single-day 10-hour charters from Tokyo to Mt. Fuji, Hakone, Kamakura, or Karuizawa are among our most popular bookings.'
      }
    ],
    relatedIds: ['private-japan-tour', 'japan-golf-tour', 'japan-tour-guide', 'jr-pass-tickets'],
    waText: 'Hello Tanogaido, I would like a quote for a Car or Tour Bus Rental in Japan.'
  },
  {
    id: 'japan-golf-tour',
    title: 'Japan Golf Tour',
    categoryLabel: 'Specialty & Golf',
    seoTitle: 'Japan Golf Tour — Championship Courses & Private Transfers | Tanogaido',
    metaDescription: 'Play premier Japanese golf courses near Mt. Fuji, Hakone, Chiba, Karuizawa, and Hokkaido with guaranteed tee times, private vans, and ryokan stays.',
    keywords: 'Japan golf tour, Mt Fuji golf courses, Hokkaido golf package, Tokyo golf tee times, luxury golf trip Japan, Tanogaido golf tour',
    eyebrow: 'CHAMPIONSHIP TEE TIMES · FUJI & HOKKAIDO',
    h1Lead: 'Play Iconic Fairways',
    h1Accent: 'Beneath Mount Fuji.',
    heroDesc: 'Experience immaculate Japanese fairways, courteous caddies, clubhouse onsen baths, and gourmet dining with guaranteed tee times and private Alphard/HiAce bag transfers.',
    heroImage: 'assets/cards/japan-golf.jpg',
    heroImageAlt: 'Championship Japan golf course overlooking Mount Fuji arranged by Tanogaido Golf Tours',
    detailImage: 'assets/zen-retreat.jpg',
    detailImageAlt: 'Luxury Japanese onsen ryokan accommodation paired with Tanogaido golf tour itineraries',
    stats: [
      { val: 'Top Clubs', label: 'Fuji, Chiba, Karuizawa & Hokkaido' },
      { val: 'Private Van', label: 'Dedicated Golf Bag Transport' },
      { val: 'All-In', label: 'Tee Times, Caddies & Stays' }
    ],
    highlights: [
      { title: 'Guaranteed Tee Times at Private & Resort Clubs', desc: 'Skip Japanese booking portals — we reserve weekday and weekend tee times directly with top clubs.' },
      { title: 'Dedicated Golf Bag Logistics', desc: 'Private HiAce/Alphard transfers or Takkyubin courier delivery straight between hotels and clubhouses.' },
      { title: 'Scenic Mt. Fuji & Hokkaido Fairways', desc: 'Tee off with views of Mount Fuji in Gotemba/Kawaguchiko or enjoy cool summer rounds in Hokkaido.' },
      { title: 'Authentic Clubhouse & Onsen Culture', desc: 'Savor traditional clubhouse lunches and post-round hot spring baths seamlessly.' }
    ],
    overviewTitle: 'Turnkey Golf Holidays Tailored for Enthusiasts & Executives',
    overviewText: 'Golf in Japan is world-renowned for pristine greens, remarkable hospitality, and unforgettable mountain scenery — yet many premier clubs require Japanese residency or phone bookings. Tanogaido handles course reservations, caddies, carts, rental sets, and transfers effortlessly.',
    included: [
      'Guaranteed green fees, cart & caddie reservations at selected clubs',
      'Private green-plate HiAce or Alphard transport with golf bag room',
      'Hotel or luxury hot-spring ryokan accommodations near courses',
      'Club rental coordination and airport-to-course golf bag courier',
      'Bilingual host support for smooth clubhouse check-in and dining'
    ],
    steps: [
      { title: 'Share Your Group Size & Handicap Mix', desc: 'Tell us how many flights, preferred dates, and regions (Fuji, Tokyo/Chiba, Kansai, or Hokkaido).' },
      { title: 'Choose From Curated Course Pairings', desc: 'Select 2 to 5 championship rounds paired with city hotels or onsen resorts.' },
      { title: 'Arrive & Tee Off Smoothly', desc: 'Your driver and host handle every bag transfer, tee check-in, and dinner booking.' }
    ],
    faqs: [
      {
        q: 'Can we rent premium golf clubs in Japan instead of bringing our own?',
        a: 'Yes, most partner clubs carry current Japanese and international sets (Titleist, Callaway, Honma, TaylorMade) which we pre-reserve for your handedness and flex.'
      },
      {
        q: 'What is the best season for a Japan Golf Tour?',
        a: 'April–June and September–November are ideal around Mt. Fuji, Tokyo, and Kyoto; July–August offers superb cool-weather golf in Hokkaido and Karuizawa.'
      },
      {
        q: 'Can non-golfing partners join the trip?',
        a: 'Definitely — we arrange outlet shopping, spa days, or guided sightseeing for spouses while golfers are on the course.'
      }
    ],
    relatedIds: ['car-bus-rental', 'private-japan-tour', 'japan-property-survey', 'japan-tour-guide'],
    waText: 'Hello Tanogaido, I am interested in booking a custom Japan Golf Tour.'
  },
  {
    id: 'japan-prewedding',
    title: 'Japan Prewedding Packages',
    categoryLabel: 'Specialty & Golf',
    seoTitle: 'Japan Prewedding Packages — Kyoto, Mt. Fuji & Tokyo Shoots | Tanogaido',
    metaDescription: 'Book editorial Japan prewedding photography in Kyoto, Mt. Fuji, and Tokyo with experienced photographers, kimono wardrobe, hair, hijab styling & transport.',
    keywords: 'Japan prewedding packages, Kyoto prewedding photoshoot, Mt Fuji prewedding photography, Tokyo couples photoshoot, kimono prewedding Japan',
    eyebrow: 'EDITORIAL CREW · KIMONO & STYLING',
    h1Lead: 'Timeless Love Stories',
    h1Accent: 'Framed In Japan.',
    heroDesc: 'Capture editorial engagement and prewedding portraits in Kyoto’s historic alleys, beside Mount Fuji’s lakes, or beneath sakura and autumn maples with full production care.',
    heroImage: 'assets/cards/card-2.jpg',
    heroImageAlt: 'Couple in traditional Japanese kimono posing along historic Kyoto street for Tanogaido prewedding shoot',
    detailImage: 'assets/fuji-climb.jpg',
    detailImageAlt: 'Scenic Mount Fuji lakeside sunrise backdrop for Japan prewedding photography sessions',
    stats: [
      { val: 'Full Crew', label: 'Photographer, Stylist & Assistant' },
      { val: '3 Regions', label: 'Kyoto, Mt. Fuji & Tokyo' },
      { val: 'Hijab Ready', label: 'Custom Makeup & Kimono Styling' }
    ],
    highlights: [
      { title: 'Permit-Smart Location Timing', desc: 'Dawn schedules and permit-compliant Kyoto, Nara, and Lake Kawaguchiko routes for clean, crowd-free frames.' },
      { title: 'Traditional Kimono & Modern Gown Options', desc: 'Coordinate authentic furisode/montsuki kimono rentals or bring your own bridal gowns effortlessly.' },
      { title: 'Dedicated Hair, Makeup & Hijab Styling', desc: 'Experienced stylists remain on set for touch-ups between outdoor shoots and weather shifts.' },
      { title: 'Private Van Production Support', desc: 'Travel comfortably between 3 to 4 shoot locations with changing space, umbrellas, and warmers.' }
    ],
    overviewTitle: 'Stress-Free Prewedding Production Across Japan’s Most Photogenic Spots',
    overviewText: 'Shooting abroad shouldn’t feel chaotic. Our bilingual prewedding production team handles location scouting, sunrise timing, kimono dressing, makeup touch-ups, private vehicle transport, and curated color-graded photo delivery so you simply enjoy the moment.',
    included: [
      'Full-day or half-day professional prewedding photographer & assistant',
      'Professional hair, makeup & hijab styling support on location',
      'Private chauffeur vehicle between morning and sunset backdrops',
      'Optional kimono rental coordination & dressing assistance',
      'All edited high-resolution digital images plus selected fine-art retouches'
    ],
    steps: [
      { title: 'Pick Your Season & Dream City', desc: 'Choose Kyoto temples, Mt. Fuji lakes, Shirakawago, or modern Tokyo neon.' },
      { title: 'Select Wardrobe & Shoot Locations', desc: 'Lock in kimono or bridal looks and our team plans your golden-hour timeline.' },
      { title: 'Shoot Effortlessly With Full Crew', desc: 'Our driver, stylist, and photographer guide every pose and transition smoothly.' }
    ],
    faqs: [
      {
        q: 'Do you respect Kyoto photography rules around Gion and private alleys?',
        a: 'Yes. We strictly follow all municipal rules and shoot exclusively at authorized public temples, parks, Arashiyama groves, and scenic Kyoto streets.'
      },
      {
        q: 'What happens if it rains on our shoot day?',
        a: 'We monitor forecasts closely and offer flexible backup date shifts or covered traditional wooden architecture locations.'
      },
      {
        q: 'How soon do we receive our edited prewedding photos?',
        a: 'Preview selects arrive within days, and your full color-graded gallery is delivered within 3 to 4 weeks.'
      }
    ],
    relatedIds: ['private-japan-tour', 'car-bus-rental', 'japan-tour-guide', 'japan-personal-shopper'],
    waText: 'Hello Tanogaido, I would like to inquire about Japan Prewedding Packages.'
  },
  {
    id: 'japan-property-survey',
    title: 'Japan Property Survey Tour',
    categoryLabel: 'Specialty & Golf',
    seoTitle: 'Japan Property Survey Tour — Real Estate & Akiya Inspections | Tanogaido',
    metaDescription: 'Book a guided Japan property survey tour for Tokyo, Osaka, and Kyoto apartments, commercial buildings, or akiya homes with bilingual translation and vans.',
    keywords: 'Japan property survey tour, buy property in Japan tour, Tokyo real estate inspection, Osaka investment property tour, akiya house Japan viewing',
    eyebrow: 'REAL ESTATE · TOKYO, OSAKA & KYOTO',
    h1Lead: 'Inspect Japanese Real Estate',
    h1Accent: 'With Local Clarity.',
    heroDesc: 'Conduct focused on-site property viewings across Tokyo, Osaka, Kyoto, or resort towns with licensed broker scheduling, private transport, and bilingual business translation.',
    heroImage: 'assets/tokyo-pulse.jpg',
    heroImageAlt: 'Tokyo metropolitan skyline showcasing residential and commercial districts on a Japan property survey tour',
    detailImage: 'assets/cards/japan-van.jpg',
    detailImageAlt: 'Private executive Alphard vehicle used for multi-district property viewings in Japan',
    stats: [
      { val: 'On-Site', label: 'Multi-Property Daily Scheduling' },
      { val: 'Bilingual', label: 'Broker & Legal Term Translation' },
      { val: 'Private Van', label: 'Efficient District-to-District Route' }
    ],
    highlights: [
      { title: 'Coordinated Broker Appointments', desc: 'We organize back-to-back viewings with Japanese listing agents so every hour counts.' },
      { title: 'Accurate Business & Property Translation', desc: 'Understand building management fees, repair reserves, zoning rules, and tax terms clearly.' },
      { title: 'Neighborhood Due Diligence', desc: 'Inspect station walking times, flood maps, surrounding amenities, and rental demand firsthand.' },
      { title: 'Private Executive Transport', desc: 'Move smoothly between 4 to 6 properties a day in a quiet Alphard with laptop space.' }
    ],
    overviewTitle: 'Turn Online Listings Into Informed Real-World Decisions',
    overviewText: 'Buying residential apartments, minpaku guesthouses, commercial buildings, or rural akiya in Japan requires seeing neighborhood context and understanding Japanese management disclosures in person. Tanogaido bridges the language and logistics gap for international investors.',
    included: [
      'Customized viewing schedule coordinated with Japanese real estate agencies',
      'Bilingual business interpreter accompanying every site visit & broker meeting',
      'Private chauffeur vehicle for seamless district-to-district inspections',
      'Neighborhood walkability, transit & local amenity evaluation notes',
      'Follow-up document translation support for contracts and building registries'
    ],
    steps: [
      { title: 'Share Target Cities & Property Criteria', desc: 'Send your shortlist, budget range, and desired dates in Tokyo, Osaka, Kyoto, or Hokkaido.' },
      { title: 'Confirm Viewing Appointments', desc: 'We align property access times with local brokers and map the fastest vehicle route.' },
      { title: 'Inspect & Review With Clarity', desc: 'Tour each property in person with live translation and structured notes.' }
    ],
    faqs: [
      {
        q: 'Can foreigners buy freehold property in Japan?',
        a: 'Yes, foreign nationals can purchase land and buildings in Japan without residency restrictions, though cash purchases are typical for non-residents.'
      },
      {
        q: 'Can I send listings I already found online for you to schedule?',
        a: 'Yes — share your links from Suumo, Homes, or broker PDFs and we coordinate viewing permissions and translation.'
      },
      {
        q: 'Do you also translate purchase agreements or management disclosures?',
        a: 'Yes, our certified Document Translation desk can translate key contracts, floor plans, and registry excerpts.'
      }
    ],
    relatedIds: ['document-translation', 'car-bus-rental', 'private-japan-tour', 'japan-golf-tour'],
    waText: 'Hello Tanogaido, I would like to arrange a Japan Property Survey Tour.'
  },
  {
    id: 'japan-collectibles-hunting',
    title: 'Japan Collectibles Hunting Tour',
    categoryLabel: 'Specialty & Golf',
    seoTitle: 'Japan Collectibles Hunting Tour — Watches, Anime & TCG | Tanogaido',
    metaDescription: 'Join a guided Japan collectibles hunting tour across Akihabara, Nakano Broadway, Ginza, and Shimokitazawa for vintage watches, figures, cards, and luxury drops.',
    keywords: 'Japan collectibles hunting tour, Akihabara anime figure tour, Nakano Broadway watch tour, Tokyo vintage Rolex hunt, Pokemon card hunting Japan',
    eyebrow: 'COLLECTORS · AKIHABARA, NAKANO & GINZA',
    h1Lead: 'Track Down Rare Gems.',
    h1Accent: 'Collect With Confidence.',
    heroDesc: 'Navigate Akihabara, Nakano Broadway, Ginza watch boutiques, and Harajuku consignment vaults with an insider bilingual host who knows where rare pieces surface.',
    heroImage: 'assets/cards/card-3.jpg',
    heroImageAlt: 'Curated Tokyo collectible shopping district covered during Tanogaido Japan collectibles hunting tours',
    detailImage: 'assets/tokyo-pulse.jpg',
    detailImageAlt: 'Vibrant Akihabara and Tokyo collector streets explored with a Tanogaido bilingual hunting host',
    stats: [
      { val: 'Targeted', label: 'Watches, TCG, Figures & Vintage' },
      { val: 'Tax-Free', label: 'Duty-Free & Condition Checks' },
      { val: 'Ship Home', label: 'Insured Cargo Option Available' }
    ],
    highlights: [
      { title: 'Deep Specialty Store Mapping', desc: 'Hit hidden multi-floor vaults in Nakano Broadway, Akihabara, Shibuya, and Osaka Den Den Town.' },
      { title: 'Condition & Authenticity Dialogue', desc: 'Communicate directly in Japanese regarding watch service history, card grading, or box completeness.' },
      { title: 'Negotiation & Tax-Free Support', desc: 'Handle tax-free passport steps, payment limits, and multi-store price comparisons effortlessly.' },
      { title: 'Safe Packing & Air Cargo Handoff', desc: 'Found oversized statues or bulk boxes? Send them straight home via our insured Japan Import Service.' }
    ],
    overviewTitle: 'Stop Wandering Random Floors — Hunt Smarter in Tokyo & Osaka',
    overviewText: 'Japan is the world’s capital for vintage Swiss watches, Pokemon & One Piece TCG, rare sneakers, retro consoles, designer archive fashion, and anime figures — yet the best stock hides in unmarked upstairs shops. Our collector guides map your wish list straight to the right counters.',
    included: [
      'Custom half-day or full-day collector route tailored to your target items',
      'Bilingual host translating store staff questions, condition grades & warranties',
      'Guidance on Japanese tax-free checkout & shipping regulations',
      'Optional private car standby for high-value watch or large box hauls',
      'Seamless handoff to Tanogaido Cargo Import for insured home shipping'
    ],
    steps: [
      { title: 'Send Your Grail Wish List', desc: 'Tell us whether you are hunting vintage watches, graded TCG slabs, statues, or luxury bags.' },
      { title: 'Get a Targeted District Route', desc: 'We map top specialty dealers and consignment shops in Tokyo or Osaka.' },
      { title: 'Hunt, Inspect & Ship Safely', desc: 'Inspect items thoroughly in Japanese and arrange insured shipping if needed.' }
    ],
    faqs: [
      {
        q: 'What collectible categories do your guides specialize in?',
        a: 'Vintage & pre-owned luxury watches, designer archive/bags, Pokemon/One Piece TCG, Bandai/Hot Toys figures, vinyl, cameras, and retro gaming.'
      },
      {
        q: 'Can you buy and ship items for me if I am not flying to Japan?',
        a: 'Yes! Use our Japan Personal Shopper (Jastip) + Cargo Import services and we will hunt and ship directly to you.'
      },
      {
        q: 'Can we use a private car during a high-value watch or large statue hunt?',
        a: 'Yes, pairing this tour with a private Alphard keeps your purchases secure between districts.'
      }
    ],
    relatedIds: ['japan-personal-shopper', 'japan-import-service', 'car-bus-rental', 'japan-tour-guide'],
    waText: 'Hello Tanogaido, I would like to book a Japan Collectibles Hunting Tour.'
  },
  {
    id: 'pocket-wifi-rental',
    title: 'Japan Pocket WiFi Rental',
    categoryLabel: 'Shopping & Essentials',
    seoTitle: 'Japan Pocket WiFi Rental — Unlimited 4G/5G Internet | Tanogaido',
    metaDescription: 'Rent unlimited high-speed 4G/5G Japan Pocket WiFi connecting up to 5 devices across Tokyo, Kyoto, Osaka, and Hokkaido with easy airport pickup.',
    keywords: 'Japan pocket WiFi rental, unlimited Japan WiFi, Haneda Narita pocket WiFi pickup, Japan travel internet, 5G pocket WiFi Japan',
    eyebrow: 'UNLIMITED 4G / 5G · UP TO 5 DEVICES',
    h1Lead: 'Fast Unlimited Data.',
    h1Accent: 'Everywhere In Japan.',
    heroDesc: 'Stay connected across bullet trains, alpine valleys, and neon city streets with true unlimited Japanese 4G/5G Pocket WiFi supporting up to 5 devices simultaneously.',
    heroImage: 'assets/products/pocket-wifi.jpg',
    heroImageAlt: 'Tanogaido unlimited 4G/5G Japan Pocket WiFi router with travel pouch and charging cable',
    detailImage: 'assets/cards/card-7.jpg',
    detailImageAlt: 'Seamless high-speed Japanese mobile connectivity for maps, translation, and trip sharing',
    stats: [
      { val: 'Unlimited', label: 'High-Speed Multi-Carrier Data' },
      { val: '5 Devices', label: 'Phones, Tablets & Laptops' },
      { val: 'Easy Return', label: 'Airport Counter or Drop Box' }
    ],
    highlights: [
      { title: 'True Unlimited Nationwide Coverage', desc: 'Run Google Maps, live video calls, social uploads, and Hyperdia checks without sudden throttling.' },
      { title: 'Share Across 5 Devices', desc: 'Ideal for couples, families, and small groups — one compact router keeps everyone online.' },
      { title: 'Zero SIM Swapping Hassle', desc: 'Keep your home SIM active for bank OTPs and emergency calls while browsing over WiFi.' },
      { title: 'Airport & Hotel Delivery Options', desc: 'Collect upon landing at Haneda, Narita, or Kansai or have it waiting at your hotel front desk.' }
    ],
    overviewTitle: 'Dependable Japanese Internet From Touchdown to Boarding',
    overviewText: 'Modern Japan travel relies on instant internet — from QR attraction passes and Visit Japan Web immigration codes to live train schedules and translation apps. Our Pocket WiFi kits arrive fully charged with USB cables and simple drop-off return instructions.',
    included: [
      'Unlimited 4G/5G Japanese multi-carrier Pocket WiFi router',
      'Protective travel pouch, USB charging cable, and power adapter',
      'Simultaneous encrypted connection for up to 5 devices',
      'Flexible airport pickup, hotel delivery, or pre-departure dispatch',
      'Prepaid return envelope or airport drop-box return on departure'
    ],
    steps: [
      { title: 'Share Your Arrival & Return Dates', desc: 'Send your landing airport and trip duration via WhatsApp.' },
      { title: 'Choose Pickup or Delivery', desc: 'Collect at major Japanese airports, your first hotel, or pre-trip.' },
      { title: 'Power On & Connect Instantly', desc: 'Scan the SSID password on the screen and enjoy fast data all trip long.' }
    ],
    faqs: [
      {
        q: 'How long does the Pocket WiFi battery last per charge?',
        a: 'Typical continuous battery life is 10 to 12 hours; we recommend carrying a compact power bank for heavy full-day navigation.'
      },
      {
        q: 'Does it work on the Shinkansen and in Hokkaido or Mt. Fuji?',
        a: 'Yes, it connects to Japan’s major nationwide networks across cities, rural rail corridors, and resort areas.'
      },
      {
        q: 'Can I also buy a Pocket WiFi unit or travel accessories in your shop?',
        a: 'Yes! Visit our Tanogaido Shop for curated travel gear and Pocket WiFi options.'
      }
    ],
    relatedIds: ['online-tour-guide', 'jr-pass-tickets', 'attraction-theme-park-tickets', 'japan-visa-processing'],
    waText: 'Hello Tanogaido, I would like to rent a Japan Pocket WiFi for my trip.'
  },
  {
    id: 'japan-personal-shopper',
    title: 'Japan Personal Shopper (Jastip)',
    categoryLabel: 'Shopping & Essentials',
    seoTitle: 'Japan Personal Shopper (Jastip) — Authentic Tokyo Finds | Tanogaido',
    metaDescription: 'Order authentic Japanese snacks, ceremonial Uji matcha, skincare, sneakers, luxury goods, and limited editions with Tanogaido Personal Shopper (Jastip).',
    keywords: 'Japan personal shopper, jastip Japan, buy from Japan proxy, Tokyo personal shopper, Japanese matcha cosmetics proxy, Tanogaido jastip',
    eyebrow: 'TOKYO PICKS · 100% AUTHENTIC',
    h1Lead: 'Authentic Japan Finds.',
    h1Accent: 'Shopped Live For You.',
    heroDesc: 'From ceremonial Uji matcha and Ginza skincare to limited-edition sneakers, stationery, and department-store exclusives — our Tokyo team buys directly in-store with receipts.',
    heroImage: 'assets/cards/card-3.jpg',
    heroImageAlt: 'Curated Japanese retail bags and boutique goods sourced by Tanogaido Japan Personal Shopper',
    detailImage: 'assets/products/shop-hero.jpg',
    detailImageAlt: 'Artisan Japanese ceramics, tea tins, and lifestyle goods available via Tanogaido shopping concierge',
    stats: [
      { val: '100%', label: 'Official Store Receipts' },
      { val: 'Live Video', label: 'Real-Time Store Confirmation' },
      { val: 'Air Cargo', label: 'Fast Weekly Home Delivery' }
    ],
    highlights: [
      { title: 'Direct Boutique & Department Store Access', desc: 'We shop in person at Isetan, Mitsukoshi, Ginza Six, Shibuya, Uji tea houses, and flagship outlets.' },
      { title: 'Live Photo & Video Verification', desc: 'Verify sizes, colors, shades, and freshness dates directly on WhatsApp at the counter.' },
      { title: 'No Japanese Card or Address Required', desc: 'Overcome Japan-only online checkouts and domestic shipping restrictions effortlessly.' },
      { title: 'Seamless Consolidation & Shipping', desc: 'Combine multiple store purchases into one protective air-cargo parcel straight to your door.' }
    ],
    overviewTitle: 'Your Trusted Personal Buyer on the Ground in Japan',
    overviewText: 'Whether you are craving seasonal Tokyo Banana & KitKat editions, luxury watches, Shiseido/SK-II sets, Snow Peak gear, or boutique Japanese ceramics, our Personal Shopper (Jastip) desk sources authentic items directly in Japan and handles careful export packing.',
    included: [
      'Dedicated personal shopper visiting physical & official online stores in Japan',
      'Live price quote in transparent breakdown before purchase',
      'Photo/video verification with original store receipts',
      'Protective bubble-wrap repacking for fragile glass or tea tins',
      'Door-to-door air cargo delivery with customs handling'
    ],
    steps: [
      { title: 'Send Links, Photos, or Item Names', desc: 'Message us the exact products, sizes, or flavors you want from Japan.' },
      { title: 'Approve Transparent Purchase Quote', desc: 'Review item cost, shopper fee, and estimated shipping weight upfront.' },
      { title: 'Shopped & Shipped to Your Door', desc: 'Receive live purchase photos and tracking right until delivery.' }
    ],
    faqs: [
      {
        q: 'Can you purchase from Japan-only websites like Mercari, Rakuten, or Amazon JP?',
        a: 'Yes! We process both physical store runs in Tokyo/Kyoto and domestic Japanese online marketplace orders.'
      },
      {
        q: 'How do I know items are 100% genuine?',
        a: 'We purchase strictly from authorized Japanese boutiques and department stores and share live video/receipt proofs.'
      },
      {
        q: 'Can I browse ready-to-order Japanese crafts right now?',
        a: 'Yes, check our curated Tanogaido Shop for Uji matcha, Imabari towels, Edo Kiriko glassware, and more.'
      }
    ],
    relatedIds: ['japan-import-service', 'japan-collectibles-hunting', 'pocket-wifi-rental', 'japan-tour-packages'],
    waText: 'Hello Tanogaido, I would like to use the Japan Personal Shopper (Jastip) service.'
  },
  {
    id: 'japan-import-service',
    title: 'Japan Goods Import Service',
    categoryLabel: 'Shopping & Essentials',
    seoTitle: 'Japan Goods Import Service — Air & Sea Cargo Shipping | Tanogaido',
    metaDescription: 'Reliable door-to-door Japan goods import service with weekly air cargo, sea consolidation, warehouse pickup, repacking, and customs clearance.',
    keywords: 'Japan goods import service, ship from Japan to Indonesia, Japan air cargo service, Japan sea cargo forwarder, Tanogaido cargo Japan',
    eyebrow: 'LOGISTICS & CARGO · AIR & SEA',
    h1Lead: 'Ship From Japan',
    h1Accent: 'Door-To-Door Safely.',
    heroDesc: 'Move commercial stock, personal shopping boxes, oversized luggage, or factory components from Japan to Indonesia with weekly air cargo, sea freight, and full customs care.',
    heroImage: 'assets/cards/japan-cargo.jpg',
    heroImageAlt: 'Securely packed export boxes and cargo logistics managed by Tanogaido Japan Goods Import Service',
    detailImage: 'assets/cards/japan-van.jpg',
    detailImageAlt: 'Dedicated pickup and logistics transport supporting Tanogaido Japan cargo consolidation',
    stats: [
      { val: 'Weekly', label: 'Scheduled Air Cargo Flights' },
      { val: 'Air & Sea', label: 'Flexible Speed & Bulk Rates' },
      { val: 'All-In', label: 'Customs & Door Delivery' }
    ],
    highlights: [
      { title: 'Weekly Express Air & Sea Consolidation', desc: 'Choose fast 7–10 day air cargo for urgent orders or cost-effective sea freight for heavy volume.' },
      { title: 'Japan Warehouse Receiving Address', desc: 'Send parcels from Japanese suppliers or online stores straight to our Tokyo warehouse.' },
      { title: 'Protective Repacking & Fragile Care', desc: 'We consolidate multiple small cartons, reduce volumetric bulk, and pad delicate ceramics or machinery.' },
      { title: 'Transparent All-In Per-Kg Quotes', desc: 'Clear customs-cleared pricing with no surprise port clearance headaches upon arrival.' }
    ],
    overviewTitle: 'End-to-End Japan Logistics for Businesses & Travelers',
    overviewText: 'Importing goods from Japan independently often stalls at Japanese export paperwork, courier limits, or destination customs clearance. PT. Tanogaido Fantasi Pratama runs an established Japan-to-Indonesia cargo pipeline handling everything from 2 kg personal parcels to bulk commercial stock.',
    included: [
      'Dedicated Japan receiving warehouse for supplier or marketplace deliveries',
      'Inspection, weight consolidation, and protective export repacking',
      'Weekly air freight or scheduled sea cargo departures',
      'Complete export & destination customs clearance handling',
      'Final-mile delivery tracking right to your home or warehouse'
    ],
    steps: [
      { title: 'Share Cargo Specs & Estimated Weight', desc: 'Tell us your item category, dimensions/weight, and air vs. sea preference.' },
      { title: 'Send or Schedule Japan Pickup', desc: 'Ship to our Japan warehouse or arrange direct Tokyo pickup for bulk cartons.' },
      { title: 'Track Until Doorstep Delivery', desc: 'Receive weight confirmation, departure updates, and smooth home delivery.' }
    ],
    faqs: [
      {
        q: 'What is the minimum weight for Japan air cargo?',
        a: 'Even small 1–2 kg shipments can be processed cleanly; contact our logistics desk for current minimum rates.'
      },
      {
        q: 'Can travelers send excess shopping luggage home mid-trip?',
        a: 'Yes! Drop boxes at our Tokyo warehouse or schedule hotel pickup so you can travel light around the rest of Japan.'
      },
      {
        q: 'Are restricted items or batteries allowed?',
        a: 'Certain batteries, aerosols, and regulated items follow strict IATA air rules — send us your item list upfront so we advise safe shipping modes.'
      }
    ],
    relatedIds: ['japan-personal-shopper', 'japan-collectibles-hunting', 'document-translation', 'car-bus-rental'],
    waText: 'Hello Tanogaido, I would like a shipping quote for the Japan Goods Import Service.'
  },
  {
    id: 'document-translation',
    title: 'Document Translation',
    categoryLabel: 'Shopping & Essentials',
    seoTitle: 'Document Translation — Certified JP, EN & ID | Tanogaido',
    metaDescription: 'Certified Japanese, Indonesian, and English document translation for visas, diplomas, birth certificates, contracts, and business records.',
    keywords: 'Japanese document translation, certified Indonesian Japanese translator, visa document translation, legal translation Japan, Tanogaido translation',
    eyebrow: 'CERTIFIED TRANSLATION · JP · ID · EN',
    h1Lead: 'Sworn & Certified',
    h1Accent: 'Document Translation.',
    heroDesc: 'Accurate, embassy-ready translations across Japanese, English, and Indonesian for academic transcripts, civil certificates, property deeds, and corporate contracts.',
    heroImage: 'assets/tea-ceremony.jpg',
    heroImageAlt: 'Refined Japanese craftsmanship symbolizing precision in Tanogaido certified document translation',
    detailImage: 'assets/cards/japan-documents.jpg',
    detailImageAlt: 'Official stamped legal and visa certificates prepared by Tanogaido certified translators',
    stats: [
      { val: 'JP · ID · EN', label: 'Bidirectional Language Pairs' },
      { val: 'Sworn QA', label: 'Embassy & University Ready' },
      { val: 'PDF + Hard', label: 'Digital & Stamped Delivery' }
    ],
    highlights: [
      { title: 'Sworn & Embassy-Accepted Formatting', desc: 'Formatted specifically to meet Japanese Embassy, MEXT, university, and Schengen visa standards.' },
      { title: 'Native Bilingual QA Review', desc: 'Every page undergoes dual review for exact terminology, dates, seals, and proper name romanization.' },
      { title: 'Personal, Academic & Legal Scope', desc: 'From birth/marriage certificates and diplomas to commercial contracts and real estate registries.' },
      { title: 'Strict Confidentiality & Fast Turnaround', desc: 'Encrypted PDF delivery for immediate online uploads plus couriered stamped hardcopies.' }
    ],
    overviewTitle: 'Precision Language Conversion You Can Submit With Confidence',
    overviewText: 'Whether you are applying for a Japanese work/study visa, enrolling at a university in Tokyo, submitting Schengen civil records, or reviewing a Japanese real estate contract, mistranslated terminology can derail approvals. Our certified translators ensure every seal and clause is exact.',
    included: [
      'Certified translation between Japanese, Indonesian, and English',
      'Mirror layout preservation matching original certificates and tables',
      'Official translator certification stamp and signature where required',
      'Encrypted high-resolution PDF plus optional hardcopy courier dispatch',
      'Express turnaround options for urgent embassy or court deadlines'
    ],
    steps: [
      { title: 'Send Clear Scans via WhatsApp or Email', desc: 'Share photos or PDFs of the pages needing translation and your target language pair.' },
      { title: 'Receive Instant Page Quote & Timeline', desc: 'Get transparent per-page pricing and exact completion date before we begin.' },
      { title: 'Receive Certified Digital & Stamped Files', desc: 'Download ready-to-submit PDFs and receive signed hardcopies if required.' }
    ],
    faqs: [
      {
        q: 'Which document types do you translate most often?',
        a: 'Birth certificates, family registers (KK/Koseki), marriage certificates, academic diplomas/transcripts, employment letters, bank records, and business contracts.'
      },
      {
        q: 'How long does translation typically take?',
        a: 'Standard civil documents take 2 to 3 working days; express 24-hour turnaround is available for urgent visa deadlines.'
      },
      {
        q: 'Can you bundle translation directly with Japan or Schengen visa filing?',
        a: 'Yes! Our visa and translation teams work side by side so your translated records go straight into your visa dossier.'
      }
    ],
    relatedIds: ['japan-visa-processing', 'europe-schengen-visa', 'japan-property-survey', 'japan-import-service'],
    waText: 'Hello Tanogaido, I need Certified Document Translation service.'
  }
];

const BY_ID = Object.fromEntries(SERVICE_PAGES.map((s) => [s.id, s]));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildJsonLd(svc) {
  const pageUrl = `${BASE_URL}/services/${svc.id}.html`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.title,
    serviceType: svc.categoryLabel,
    description: svc.metaDescription,
    url: pageUrl,
    image: `${BASE_URL}/${svc.heroImage}`,
    provider: {
      '@type': 'TravelAgency',
      name: 'PT. Tanogaido Fantasi Pratama',
      url: BASE_URL,
      telephone: '+62-813-1893-9319',
      email: 'tanogaidocom@gmail.com'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services.html` },
      { '@type': 'ListItem', position: 3, name: svc.title, item: pageUrl }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: svc.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return [serviceSchema, breadcrumbSchema, faqSchema]
    .map((obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n  </script>`)
    .join('\n  ');
}

function renderServicePage(svc) {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(svc.waText)}`;
  const canonicalUrl = `${BASE_URL}/services/${svc.id}.html`;
  const ogImageUrl = `${BASE_URL}/${svc.heroImage}`;
  const related = svc.relatedIds.map((id) => BY_ID[id]).filter(Boolean);

  const statsHtml = svc.stats
    .map(
      (st) => `
            <div class="svc-stat-glass">
              <div class="svc-stat-val">${escapeHtml(st.val)}</div>
              <div class="svc-stat-label">${escapeHtml(st.label)}</div>
            </div>`
    )
    .join('');

  const highlightsHtml = svc.highlights
    .map(
      (h, idx) => `
          <article class="svc-highlight-card">
            <span class="svc-highlight-num">0${idx + 1}</span>
            <h3 class="svc-highlight-title">${escapeHtml(h.title)}</h3>
            <p class="svc-highlight-desc">${escapeHtml(h.desc)}</p>
          </article>`
    )
    .join('');

  const includedHtml = svc.included
    .map(
      (item) => `
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${escapeHtml(item)}</span>
            </li>`
    )
    .join('');

  const stepsHtml = svc.steps
    .map(
      (st, idx) => `
          <article class="svc-step-card">
            <span class="svc-step-tag">STEP 0${idx + 1}</span>
            <h3>${escapeHtml(st.title)}</h3>
            <p>${escapeHtml(st.desc)}</p>
          </article>`
    )
    .join('');

  const faqsHtml = svc.faqs
    .map(
      (f, idx) => `
          <details class="svc-faq-item"${idx === 0 ? ' open' : ''}>
            <summary>
              <span>${escapeHtml(f.q)}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p>${escapeHtml(f.a)}</p>
          </details>`
    )
    .join('');

  const relatedHtml = related
    .map(
      (rel) => `
          <a href="${rel.id}.html" class="svc-related-card">
            <div class="svc-related-img">
              <img src="../${rel.heroImage}" alt="${escapeHtml(rel.heroImageAlt)}" loading="lazy">
            </div>
            <div class="svc-related-body">
              <span class="svc-related-kicker">${escapeHtml(rel.categoryLabel)}</span>
              <h3 class="svc-related-title">${escapeHtml(rel.title)}</h3>
              <p class="svc-related-desc">${escapeHtml(rel.heroDesc)}</p>
              <span class="svc-related-more">Explore Service &rarr;</span>
            </div>
          </a>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${escapeHtml(svc.seoTitle)}</title>
  <meta name="description" content="${escapeHtml(svc.metaDescription)}">
  <meta name="keywords" content="${escapeHtml(svc.keywords)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Tanogaido">
  <meta property="og:title" content="${escapeHtml(svc.seoTitle)}">
  <meta property="og:description" content="${escapeHtml(svc.metaDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:alt" content="${escapeHtml(svc.heroImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(svc.seoTitle)}">
  <meta name="twitter:description" content="${escapeHtml(svc.metaDescription)}">
  <meta name="twitter:image" content="${ogImageUrl}">
  ${buildJsonLd(svc)}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/services-nav.css">
  <link rel="stylesheet" href="../assets/css/service-detail.css">
</head>

<body>
  <!-- Fixed Architectural Header Matching Main Page -->
  <div class="navbar-container unified" id="navbar-container">
    <nav class="navbar" id="main-navbar" aria-label="Primary Navigation">
      <div class="nav-brand-zone">
        <a href="../index.html" class="brand-logo">tanogaido<span class="dot">.</span></a>
      </div>
      <div class="nav-center-zone">
        <ul class="nav-links">
          <li class="nav-item-has-dropdown">
            <a href="../services.html" class="nav-services-trigger nav-active" aria-current="page">
              <span>Services</span>
              <svg class="nav-services-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </a>
            <div class="nav-services-dropdown" data-services-dropdown></div>
          </li>
          <li><a href="../index.html#destinations">Destinations</a></li>
          <li><a href="../index.html#passes">JR Pass</a></li>
          <li><a href="../shop.html">Shop</a></li>
          <li><a href="../about.html">About</a></li>
        </ul>
      </div>
      <div class="nav-actions">
        <div class="header-cta-group">
          <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="btn-explore">Consult Now</a>
          <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="btn-explore-circle" aria-label="Chat on WhatsApp about ${escapeHtml(svc.title)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </a>
        </div>
        <button class="btn-mobile-menu" id="open-menu-btn" aria-label="Open Navigation Menu">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <span>Menu</span>
        </button>
      </div>
    </nav>
  </div>

  <!-- Fluid Mobile Drawer Menu -->
  <div class="mobile-menu-overlay" id="mobile-menu-modal">
    <svg class="mobile-menu-fluid-svg" id="mobile-menu-fluid-svg" preserveAspectRatio="none" aria-hidden="true">
      <path id="mobile-menu-fluid-path" d="M0 0 H0 V0 H0 Z" fill="#ffffff" />
    </svg>
    <div class="mobile-menu-card">
      <div class="mobile-menu-header">
        <a href="../index.html" class="brand-logo mobile-nav-item">tanogaido<span class="dot">.</span></a>
        <button class="btn-close-menu" id="close-menu-btn" aria-label="Close menu">
          <span>Close</span>
          <span style="font-size:16px;line-height:1;">&times;</span>
        </button>
      </div>
      <ul class="mobile-nav-list">
        <li>
          <div class="mobile-services-group mobile-nav-item">
            <div class="mobile-services-row">
              <a href="../services.html" class="nav-active">Services</a>
              <button type="button" class="mobile-services-toggle" data-mobile-services-toggle aria-expanded="false" aria-label="Toggle services list">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
            <div class="mobile-services-sublist" data-mobile-services-list></div>
          </div>
        </li>
        <li><a href="../index.html#destinations" class="mobile-nav-item">Destinations</a></li>
        <li><a href="../index.html#passes" class="mobile-nav-item">JR Pass</a></li>
        <li><a href="../shop.html" class="mobile-nav-item">Shop</a></li>
        <li><a href="../about.html" class="mobile-nav-item">About</a></li>
      </ul>
      <div class="mobile-menu-footer">
        <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="hero-cta-btn mobile-nav-item" style="width: 100%; justify-content: space-between;">
          <span>Consult About ${escapeHtml(svc.title)}</span>
          <span class="hero-cta-circle" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </span>
        </a>
        <p style="font-size: 11.5px; color: #64748b; text-align: center;">PT. Tanogaido Fantasi Pratama &middot; Trusted Japan Concierge Since 2007</p>
      </div>
    </div>
  </div>

  <main class="svc-detail-main">
    <!-- Breadcrumb Bar -->
    <div class="breadcrumb-bar">
      <div class="page-container">
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <a href="../index.html">Home</a>
          <span class="breadcrumb-sep" aria-hidden="true">/</span>
          <a href="../services.html">Our Services</a>
          <span class="breadcrumb-sep" aria-hidden="true">/</span>
          <span class="breadcrumb-current">${escapeHtml(svc.title)}</span>
        </nav>
      </div>
    </div>

    <!-- 1. Home-Style Architectural Hero Stage -->
    <section class="svc-hero-band">
      <div class="page-container">
        <div class="svc-hero-frame">
          <img class="svc-hero-bg" src="../${svc.heroImage}" alt="${escapeHtml(svc.heroImageAlt)}">
          <div class="svc-hero-scrim" aria-hidden="true"></div>
          <div class="svc-hero-inner">
            <div class="svc-hero-copy">
              <div class="eyebrow-row">
                <span class="eyebrow">${escapeHtml(svc.eyebrow)}</span>
                <span class="eyebrow-line" aria-hidden="true"></span>
              </div>
              <h1 class="svc-hero-title">
                ${escapeHtml(svc.h1Lead)}<br>
                <span class="line-red">${escapeHtml(svc.h1Accent)}</span>
              </h1>
              <p class="svc-hero-desc">${escapeHtml(svc.heroDesc)}</p>
              <div class="svc-hero-cta-row">
                <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="hero-cta-btn">
                  <span>Book via WhatsApp</span>
                  <span class="hero-cta-circle" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </span>
                </a>
                <a href="#service-included" class="svc-hero-secondary-link">See What&rsquo;s Included &darr;</a>
              </div>
            </div>

            <div class="svc-hero-stats">${statsHtml}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Key Service Highlights -->
    <section class="svc-highlights-band">
      <div class="page-container">
        <div class="section-header-row">
          <div>
            <h2 class="section-heading-editorial">Why Choose Tanogaido for ${escapeHtml(svc.title)}</h2>
            <p class="section-subtitle">Engineered for clarity, bilingual support, and seamless execution across Japan and global hubs.</p>
          </div>
          <a href="../services.html" class="section-link-cta">View All 20 Services <span>&rarr;</span></a>
        </div>

        <div class="svc-highlights-grid">${highlightsHtml}
        </div>
      </div>
    </section>

    <!-- 3. Detailed Scope & Inclusions -->
    <section class="svc-details-band" id="service-included">
      <div class="page-container">
        <div class="svc-details-grid">
          <div class="svc-detail-media">
            <img src="../${svc.detailImage}" alt="${escapeHtml(svc.detailImageAlt)}" loading="lazy">
          </div>
          <div class="svc-detail-copy">
            <span class="svc-detail-kicker">${escapeHtml(svc.categoryLabel)} &middot; SERVICE SCOPE</span>
            <h2 class="section-heading-editorial">${escapeHtml(svc.overviewTitle)}</h2>
            <p>${escapeHtml(svc.overviewText)}</p>
            <ul class="svc-included-list">${includedHtml}
            </ul>
            <div class="svc-inline-links">
              <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="hero-cta-btn" style="border:1px solid #e2e8f0;box-shadow:0 10px 24px -10px rgba(15,23,42,0.18);">
                <span>Request Free Quote</span>
                <span class="hero-cta-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </span>
              </a>
              <span>Explore also: <a href="../shop.html">Tanogaido Japan Shop</a> &middot; <a href="../about.html">About PT. Tanogaido</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. How It Works -->
    <section class="svc-steps-band">
      <div class="page-container">
        <div class="section-header-row">
          <div>
            <h2 class="section-heading-editorial">How Booking Works</h2>
            <p class="section-subtitle">Three straightforward steps to lock in your ${escapeHtml(svc.title)} reservation.</p>
          </div>
        </div>
        <div class="svc-steps-grid">${stepsHtml}
        </div>
      </div>
    </section>

    <!-- 5. Frequently Asked Questions -->
    <section class="svc-faq-band">
      <div class="page-container">
        <div class="section-header-row">
          <div>
            <h2 class="section-heading-editorial">${escapeHtml(svc.title)} &mdash; Frequently Asked Questions</h2>
            <p class="section-subtitle">Quick answers before you book with our bilingual Japan concierge desk.</p>
          </div>
        </div>
        <div class="svc-faq-list">${faqsHtml}
        </div>
      </div>
    </section>

    <!-- 6. Related Services Internal Linking -->
    <section class="svc-related-band">
      <div class="page-container">
        <div class="section-header-row">
          <div>
            <h2 class="section-heading-editorial">Pair With Complementary Services</h2>
            <p class="section-subtitle">Combine your ${escapeHtml(svc.title)} request with other Tanogaido travel, visa, or transport essentials.</p>
          </div>
          <a href="../services.html" class="section-link-cta">Browse Full Catalog <span>&rarr;</span></a>
        </div>
        <div class="svc-related-grid">${relatedHtml}
        </div>
      </div>
    </section>

    <!-- 7. Conversion CTA Banner -->
    <section class="concierge-banner-band">
      <div class="page-container">
        <div class="concierge-banner-card">
          <div>
            <span class="eyebrow" style="color:#fca5a5;">DIRECT CONCIERGE DESK</span>
            <h2>Ready to Plan Your ${escapeHtml(svc.title)}?</h2>
            <p>Speak directly with our bilingual travel specialists on WhatsApp for transparent quotes, schedule availability, and customized multi-service bundles.</p>
          </div>
          <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="hero-cta-btn">
            <span>Chat With Concierge Now</span>
            <span class="hero-cta-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- 8. Newsletter Band -->
    <section class="newsletter-band" id="newsletter-band">
      <div class="newsletter-scenic-edge" aria-hidden="true"></div>
      <div class="page-container">
        <div class="newsletter-inner">
          <div>
            <span class="newsletter-eyebrow">STAY INSPIRED</span>
            <h2 class="newsletter-heading">Get Travel Inspiration in Your Inbox</h2>
            <p class="newsletter-sub">Exclusive seasonal tour dates, JR Pass guides, and curated Japan offers &mdash; straight to you.</p>
          </div>
          <div class="newsletter-form-wrap">
            <form class="newsletter-form" id="newsletter-form">
              <input class="newsletter-input" id="newsletter-email" type="email" required placeholder="Enter your email address" aria-label="Email address">
              <button class="newsletter-submit" type="submit">Subscribe</button>
            </form>
            <p class="newsletter-note" id="newsletter-note">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. Multi-Column Footer with Internal Links -->
    <footer class="site-footer" id="site-footer">
      <div class="page-container">
        <div class="footer-grid">
          <div>
            <a href="../index.html" class="footer-brand brand-logo">tanogaido<span class="dot">.</span></a>
            <p class="footer-tagline">PT. Tanogaido Fantasi Pratama &mdash; Your Gateway to Japan since 2007.</p>
          </div>
          <div>
            <h3 class="footer-col-title">Explore</h3>
            <ul class="footer-links">
              <li><a href="../index.html">Home</a></li>
              <li><a href="../services.html">All 20 Services</a></li>
              <li><a href="../index.html#trips">Featured Trips</a></li>
              <li><a href="../shop.html">Japan Goods Shop</a></li>
              <li><a href="../about.html">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-col-title">Popular Services</h3>
            <ul class="footer-links">
              <li><a href="japan-tour-guide.html">Japan Tour Guide</a></li>
              <li><a href="private-japan-tour.html">Private Japan Tour</a></li>
              <li><a href="japan-golf-tour.html">Japan Golf Tour</a></li>
              <li><a href="jr-pass-tickets.html">JR Pass Tickets</a></li>
              <li><a href="car-bus-rental.html">Car &amp; Tour Bus Rental</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-col-title">Visas &amp; Essentials</h3>
            <ul class="footer-links">
              <li><a href="japan-visa-processing.html">Japan Visa Processing</a></li>
              <li><a href="pocket-wifi-rental.html">Pocket WiFi Rental</a></li>
              <li><a href="japan-personal-shopper.html">Personal Shopper (Jastip)</a></li>
              <li><a href="japan-import-service.html">Japan Cargo Import</a></li>
              <li><a href="document-translation.html">Document Translation</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-col-title">Follow Us</h3>
            <div class="footer-socials">
              <a href="https://instagram.com/tanogaido" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
              <a href="https://facebook.com/tanogaido" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="https://youtube.com/@tanogaido" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
              <a href="${waHref}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; 2026 PT. Tanogaido Fantasi Pratama. All rights reserved.</span>
          <div class="footer-legal">
            <a href="../services.html">Our Services</a>
            <a href="../shop.html">Shop</a>
            <a href="../about.html">About Us</a>
            <a href="../about.html#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  </main>

  <script src="../assets/js/services-catalog.js"></script>
  <script src="../assets/js/service-detail.js"></script>
</body>

</html>
`;
}

function generateSitemap() {
  const staticUrls = [
    { loc: `${BASE_URL}/`, priority: '1.0' },
    { loc: `${BASE_URL}/services.html`, priority: '0.9' },
    { loc: `${BASE_URL}/shop.html`, priority: '0.8' },
    { loc: `${BASE_URL}/about.html`, priority: '0.8' },
    ...SERVICE_PAGES.map((s) => ({
      loc: `${BASE_URL}/services/${s.id}.html`,
      priority: '0.85'
    }))
  ];

  const today = new Date().toISOString().slice(0, 10);
  const urlset = staticUrls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;
}

fs.mkdirSync(servicesOutDir, { recursive: true });
for (const svc of SERVICE_PAGES) {
  const html = renderServicePage(svc);
  fs.writeFileSync(path.join(servicesOutDir, `${svc.id}.html`), html, 'utf8');
}

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), generateSitemap(), 'utf8');
fs.writeFileSync(
  path.join(rootDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`,
  'utf8'
);

console.log(`Generated ${SERVICE_PAGES.length} SEO service pages in services/, plus sitemap.xml and robots.txt`);
