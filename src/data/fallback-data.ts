import type {
  ProductCategorySlug,
  ProductItem,
  ServiceCategorySlug,
  ServiceItem,
  SiteSettingsData,
  TestimonialItem,
  TripItem,
} from '@/types/cms';
import { getSiteOrigin } from '@/lib/editorial';

export const WA_NUMBER = '6281318939319';
export const BASE_URL = getSiteOrigin();

export function getWhatsAppUrl(text: string, waNumber = WA_NUMBER): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}

export const SERVICE_CATEGORIES: { id: ServiceCategorySlug; label: string }[] = [
  { id: 'tours', label: 'Tours & Guides' },
  { id: 'visa', label: 'Visa Concierge' },
  { id: 'transport', label: 'Transport & Passes' },
  { id: 'specialty', label: 'Specialty & Golf' },
  { id: 'essentials', label: 'Shopping & Essentials' },
];

export const HOME_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'tours', label: 'Tours & Guides' },
  { id: 'transport', label: 'Transport & Rail' },
  { id: 'visa-wifi', label: 'Visa & WiFi' },
  { id: 'parks', label: 'Theme Parks' },
  { id: 'shopping', label: 'Shopping & Studio' },
] as const;

export const SHOP_CATEGORIES: { id: 'all' | ProductCategorySlug; label: string }[] = [
  { id: 'all', label: 'All Goods' },
  { id: 'tea', label: 'Tea & Ceramics' },
  { id: 'travel', label: 'Travel & Rail Gear' },
  { id: 'craft', label: 'Artisan Crafts' },
  { id: 'home', label: 'Home Sanctuary' },
];

export const FALLBACK_SITE_SETTINGS: SiteSettingsData = {
  brandName: 'tanogaido',
  companyName: 'PT. Tanogaido Fantasi Pratama',
  nibNumber: '2003230101593',
  ahuDecree: 'AHU-0022369.AH.01.01.TAHUN 2023',
  address: 'Jl. Boulevard Artha Gading, Blok A6B No. 32 Kelapa Gading, Jakarta Utara',
  email: 'tanogaidocom@gmail.com',
  whatsappNumber: '6281318939319',
  heroEyebrow: 'DISCOVER THE LAND OF THE RISING SUN',
  heroTitleLead: 'Explore Every Wonder.',
  heroTitleAccent: 'Across Japan.',
  heroDescription:
    "Curated private tours, seamless rail transport, and licensed bilingual guides for travelers who seek authentic Japan. From Kyoto's quiet shrines to Mount Fuji.",
  heroVideoUrl: '/assets/hero-japan.mp4',
};

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    slug: 'japan-tour-guide',
    title: 'Japan Tour Guide',
    category: 'tours',
    categoryLabel: 'Tours & Guides',
    kicker: 'ON-SITE · 24/7',
    shortDesc:
      'Licensed bilingual local guides accompanying you on-site across Tokyo, Kyoto, Osaka, and Mt. Fuji.',
    imagePath: '/assets/cards/card-4.jpg',
    heroImagePath: '/assets/cards/card-4.jpg',
    heroImageAlt:
      'Licensed bilingual Tanogaido Japan tour guide walking travelers through historic Kyoto temple streets',
    detailImagePath: '/assets/tokyo-pulse.jpg',
    detailImageAlt:
      'Travelers exploring Tokyo nightlife and illuminated pedestrian streets with a private Japan tour guide',
    features: [
      'Bilingual Indonesian, English & Japanese guides',
      'Real-time train transfers & dining reservations',
      'Trusted by 1,200+ travelers across Japan',
    ],
    seoTitle: 'Japan Tour Guide — Licensed Bilingual Local Guides | Tanogaido',
    metaDescription:
      'Hire a licensed bilingual Japan tour guide for Tokyo, Kyoto, Osaka, and Mt. Fuji. Seamless navigation, dining reservations, and 24/7 concierge care.',
    keywords:
      'Japan tour guide, bilingual Japan guide, Tokyo tour guide, Kyoto local guide, private guide Japan, Tanogaido tour guide',
    eyebrow: 'LICENSED LOCAL CONCIERGE · ON-SITE',
    h1Lead: 'Explore Japan With',
    h1Accent: 'Licensed Local Guides.',
    heroDesc:
      'Navigate Tokyo, Kyoto, Osaka, and Mt. Fuji effortlessly with a bilingual Tanogaido local guide handling train transfers, hidden dining spots, and cultural etiquette.',
    stats: [
      { val: '1,200+', label: 'Travelers Guided Across Japan' },
      { val: '3 Languages', label: 'English, Indonesian & Japanese' },
      { val: '100%', label: 'Custom Daily Route Pace' },
    ],
    highlights: [
      {
        title: 'Effortless Rail & Shinkansen Transfers',
        desc: 'Skip platform confusion at Shinjuku, Tokyo, and Kyoto stations with real-time route guidance.',
      },
      {
        title: 'Bilingual Restaurant & Activity Booking',
        desc: 'Communicate smoothly at omakase counters, halal kitchens, ryokan check-ins, and boutique shops.',
      },
      {
        title: 'Insider Neighborhood Discovery',
        desc: 'Go beyond crowded tourist traps to discover artisan alleys, scenic viewpoints, and local tea houses.',
      },
      {
        title: 'Flexible Group & Family Pacing',
        desc: 'Ideal for families with kids, senior travelers, and VIP couples seeking stress-free sightseeing.',
      },
    ],
    overviewTitle: 'Why Book a Dedicated On-Site Japan Tour Guide?',
    overviewText:
      'Traveling across Japan is infinitely richer when you have an experienced local guide beside you. Whether you are navigating multi-level Tokyo subway interchanges, visiting historic shrines in Kyoto, or enjoying day trips to Lake Kawaguchiko and Hakone, your Tanogaido guide adapts the day around your rhythm and interests.',
    included: [
      'Full-day licensed bilingual guide (up to 10 hours per day)',
      'Pre-trip itinerary calibration across Tokyo, Kansai, or Hokkaido',
      'Live train route navigation, IC card setup, and luggage forwarding tips',
      'On-the-spot translation for dining, shopping, and attraction counters',
      'Direct WhatsApp coordination with Tanogaido operations desk',
    ],
    steps: [
      {
        title: 'Share Your Travel Dates & Cities',
        desc: 'Tell our concierge your arrival city, group size, and must-see sights via WhatsApp.',
      },
      {
        title: 'Match With Your Ideal Guide',
        desc: 'We assign a vetted bilingual guide tailored to your route, food preferences, and pace.',
      },
      {
        title: 'Meet & Explore Stress-Free',
        desc: 'Your guide meets you right at your hotel lobby or airport gate ready to lead the journey.',
      },
    ],
    faqs: [
      {
        q: 'Which cities are covered by Tanogaido Japan tour guides?',
        a: 'Our licensed local guides operate across Tokyo, Yokohama, Mt. Fuji, Hakone, Kyoto, Osaka, Nara, Kobe, Sapporo, and Fukuoka.',
      },
      {
        q: 'What languages do Tanogaido tour guides speak?',
        a: 'All guides speak fluent Japanese alongside English and/or Indonesian to ensure seamless communication everywhere.',
      },
      {
        q: 'Can the guide help us use JR Pass and Shinkansen trains?',
        a: 'Yes. Your guide helps exchange vouchers, reserve Shinkansen seats, and escort you through station platforms.',
      },
      {
        q: 'Are guide transport and attraction fees included?',
        a: 'Guide service covers daily professional guiding fees; optional vehicle charter, rail passes, and entry tickets can be bundled cleanly on request.',
      },
    ],
    relatedSlugs: ['online-tour-guide', 'private-japan-tour', 'jr-pass-tickets', 'car-bus-rental'],
    waText: 'Hello Tanogaido, I would like to book an on-site Japan Tour Guide for my upcoming trip.',
    showOnHome: true,
    homeSortOrder: 1,
    sortOrder: 1,
    homeCategory: 'tours',
    homeCardTitle: 'Japan Tour Guide',
    homeCardTag: 'On-Site · 24/7',
    homeCardKicker: 'ON-SITE · 24/7',
    homeCardShort: 'Licensed bilingual local guides across Japan.',
    homeCardImage: '/assets/cards/card-4.jpg',
    homeCardSubtitle:
      'Licensed bilingual local guides or 24/7 live companion across Tokyo, Kyoto, and Osaka.',
    homeCardFeatures: [
      'Real-time rail navigation & etiquette help',
      'On-site guide or cost-saving live mode',
      'Trusted by 1,200+ travelers in Japan',
    ],
  },
  {
    slug: 'online-tour-guide',
    title: 'Online Japan Tour Guide',
    category: 'tours',
    categoryLabel: 'Tours & Guides',
    kicker: 'REMOTE · LIVE SUPPORT',
    shortDesc:
      'Live virtual Japan guide via WhatsApp & video call to navigate routes, order food, and translate effortlessly.',
    imagePath: '/assets/tokyo-pulse.jpg',
    heroImagePath: '/assets/tokyo-pulse.jpg',
    heroImageAlt:
      'Independent traveler navigating vibrant Tokyo Shibuya district with live online Japan tour guide support',
    detailImagePath: '/assets/shinkansen.jpg',
    detailImageAlt:
      'Japanese Shinkansen bullet train arrival guided remotely by Tanogaido online tour guide concierge',
    features: [
      'Instant route & Shinkansen platform guidance',
      'Live menu & shop counter translation support',
      'Flexible daily remote concierge coverage',
    ],
    seoTitle: 'Online Japan Tour Guide — 24/7 Live Virtual Support | Tanogaido',
    metaDescription:
      'Get an online Japan tour guide on WhatsApp for live train directions, Japanese menu translation, and real-time travel assistance across Japan.',
    keywords:
      'online Japan tour guide, virtual tour guide Japan, remote Japan travel assistant, WhatsApp guide Japan, independent Japan travel help',
    eyebrow: 'REMOTE CONCIERGE · LIVE WHATSAPP SUPPORT',
    h1Lead: 'Your Live Japan Expert.',
    h1Accent: 'Right In Your Pocket.',
    heroDesc:
      'Explore Japan independently with instant WhatsApp and video-call backup from our bilingual Tokyo and Kyoto travel desk for routes, menus, and bookings.',
    stats: [
      { val: '< 5 Min', label: 'Average Live Reply Time' },
      { val: '24/7', label: 'Active Trip Support Window' },
      { val: '60% Less', label: 'Cost vs. On-Site Guiding' },
    ],
    highlights: [
      {
        title: 'Instant Station & Exit Directions',
        desc: 'Send a photo of any train board or ticket gate and get step-by-step platform instructions immediately.',
      },
      {
        title: 'Live Voice & Menu Translation',
        desc: 'Let our team speak with restaurant staff, hotel front desks, or pharmacy cashiers on your behalf.',
      },
      {
        title: 'Dynamic Daily Route Tweaks',
        desc: 'Rainy weather or missed a train? We reorder your itinerary on the fly with zero wasted hours.',
      },
      {
        title: 'Budget-Friendly Freedom',
        desc: 'Enjoy total solo or couple privacy while keeping seasoned Japan specialists on speed dial.',
      },
    ],
    overviewTitle: 'Independent Japan Travel Without the Guesswork',
    overviewText:
      'Love traveling at your own pace without someone walking beside you all day, yet worried about language barriers or complex Japanese rail hubs? Our Online Japan Tour Guide gives you dedicated bilingual specialists via WhatsApp chat, voice note, and video call throughout your stay.',
    included: [
      'Dedicated WhatsApp concierge line throughout your trip dates',
      'Custom day-by-day Google Maps pins and train timing sheet',
      'Live photo & voice translation at restaurants and boutiques',
      'Real-time delay recovery, tax-free shopping help & restaurant calls',
      'Pre-departure checklist for Visit Japan Web and IC cards',
    ],
    steps: [
      {
        title: 'Pick Your Support Days',
        desc: 'Select single-day remote coverage or full-trip online concierge for your Japan dates.',
      },
      {
        title: 'Receive Your Custom Digital Playbook',
        desc: 'Before landing, we send mapped routes, train tips, and dining notes tailored to you.',
      },
      {
        title: 'Message Anytime During Your Trip',
        desc: 'Chat, send photos, or start a live call whenever you need instant local clarity.',
      },
    ],
    faqs: [
      {
        q: 'How does the Online Japan Tour Guide work during my trip?',
        a: 'You receive a dedicated WhatsApp concierge thread staffed by bilingual Japan specialists who reply within minutes to questions, photos, or calls.',
      },
      {
        q: 'Can you call Japanese restaurants or hotels for us?',
        a: 'Yes. We handle live phone reservations, dietary inquiries, and luggage coordination directly in Japanese.',
      },
      {
        q: 'Is Pocket WiFi needed to use the online guide?',
        a: 'Reliable mobile data is essential; we recommend pairing this service with our Japan Pocket WiFi Rental for uninterrupted coverage.',
      },
      {
        q: 'Can I upgrade to an on-site guide on specific days?',
        a: 'Absolutely. Many guests combine online guiding in Tokyo with an on-site guide for Kyoto or Mt. Fuji day trips.',
      },
    ],
    relatedSlugs: ['japan-tour-guide', 'pocket-wifi-rental', 'jr-pass-tickets', 'japan-tour-packages'],
    waText: 'Hello Tanogaido, I would like to book the Online Japan Tour Guide service.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 2,
  },
  {
    slug: 'tokyo-9-day-guide',
    title: '9-Day Tokyo Tour Guide',
    category: 'tours',
    categoryLabel: 'Tours & Guides',
    kicker: 'DEDICATED · 9 DAYS',
    shortDesc:
      'Comprehensive 9-day dedicated tour guide covering Tokyo wards, Kamakura, Yokohama, Nikko, and Hakone.',
    imagePath: '/assets/cards/card-1.jpg',
    heroImagePath: '/assets/cards/card-1.jpg',
    heroImageAlt:
      'Historic red lantern temple gate in Asakusa Tokyo featured on the 9-Day Tokyo Tour Guide route',
    detailImagePath: '/assets/fuji-climb.jpg',
    detailImageAlt:
      'Mount Fuji scenic sunrise view included in Tanogaido 9-day Tokyo and Kanto excursion',
    features: [
      'Structured 9-day Tokyo & Kanto daily schedule',
      'Seamless metro, restaurant & attraction coordination',
      'Ideal for families, first-timers & small groups',
    ],
    seoTitle: '9-Day Tokyo Tour Guide — Complete Kanto & Mt. Fuji Itinerary | Tanogaido',
    metaDescription:
      'Book a dedicated 9-day Tokyo tour guide covering Shibuya, Asakusa, Kamakura, Hakone, Nikko, and Mt. Fuji with seamless daily scheduling.',
    keywords:
      '9 day Tokyo tour guide, Tokyo itinerary 9 days, Tokyo and Mt Fuji guide, Kanto private guide, Tokyo family tour guide',
    eyebrow: 'DEDICATED MULTI-DAY · TOKYO & KANTO',
    h1Lead: 'Nine Unforgettable Days.',
    h1Accent: 'Tokyo & Kanto Mastered.',
    heroDesc:
      'Cover Tokyo neighborhoods, Mt. Fuji lakes, Kamakura coast, Yokohama waterfront, and Nikko shrines with one dedicated bilingual guide for 9 seamless days.',
    stats: [
      { val: '9 Days', label: 'Curated Kanto Coverage' },
      { val: '5 Regions', label: 'Tokyo, Fuji, Hakone, Kamakura, Nikko' },
      { val: 'Zero Stress', label: 'End-to-End Daily Escort' },
    ],
    highlights: [
      {
        title: 'Deep Tokyo District Immersion',
        desc: 'Experience Asakusa, Meiji Jingu, Ginza, Shibuya Sky, Tsukiji Market, Akihabara, and Shimokitazawa.',
      },
      {
        title: 'Iconic Day Trips Included',
        desc: 'Smooth rail or van excursions to Lake Kawaguchiko, Hakone ropeway, Kamakura Great Buddha, and Nikko.',
      },
      {
        title: 'One Consistent Guide All Trip',
        desc: 'Build rapport with a single trusted guide who learns your dining tastes and pacing from Day 1.',
      },
      {
        title: 'Optimized Shopping & Dining Days',
        desc: 'Smartly timed outlet trips, tax-free flagship stops, and hidden izakaya evenings.',
      },
    ],
    overviewTitle: 'A Complete 9-Day Tokyo Blueprint Without Hotel Hopping',
    overviewText:
      'Using Tokyo as your comfortable home base eliminates constant luggage packing while still letting you experience shrines, alpine views of Mt. Fuji, coastal temples, and neon cityscapes. Our 9-day guide coordinates every morning departure, timed attraction entry, and lunch reservation.',
    included: [
      '9 consecutive days with one dedicated bilingual Japan tour guide',
      'Balanced Tokyo ward routes plus 3 signature Kanto day excursions',
      'Timed ticket advisory for Shibuya Sky, teamLab Planets & Disney Resort',
      'Halal, vegetarian, or Michelin-bib dining curation each evening',
      'Airport arrival and departure orientation support',
    ],
    steps: [
      {
        title: 'Send Your Arrival & Departure Window',
        desc: 'Share your Tokyo flight schedule and preferred hotel neighborhood.',
      },
      {
        title: 'Customize Your 9-Day Balance',
        desc: 'Adjust days for theme parks, Gotemba outlets, anime districts, or peaceful gardens.',
      },
      {
        title: 'Enjoy Guided Discovery Every Day',
        desc: 'Step out each morning knowing every route, transfer, and dining table is ready.',
      },
    ],
    faqs: [
      {
        q: 'Can we include Tokyo Disneyland or DisneySea in the 9-day plan?',
        a: 'Yes. We reserve one or two days for Tokyo Disney Resort and can arrange official QR tickets alongside your guide schedule.',
      },
      {
        q: 'Should we combine this 9-day guide with a private van?',
        a: 'Public trains work great inside Tokyo, while adding a private Alphard or HiAce van for Mt. Fuji and Hakone days maximizes comfort.',
      },
      {
        q: 'Is this suitable for elderly parents or young children?',
        a: 'Yes. Having one dedicated guide lets us build rest breaks, elevator-friendly routes, and lighter walking days whenever needed.',
      },
      {
        q: 'Can the 9-day route be shortened or extended to Kyoto?',
        a: 'Yes, we can adapt the duration or add a Shinkansen leg to Kyoto and Osaka anytime.',
      },
    ],
    relatedSlugs: ['japan-tour-guide', 'attraction-theme-park-tickets', 'car-bus-rental', 'private-japan-tour'],
    waText: 'Hello Tanogaido, I am interested in booking the 9-Day Tokyo Tour Guide package.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 3,
  },
  {
    slug: 'japan-tour-packages',
    title: 'Japan Tour Packages',
    category: 'tours',
    categoryLabel: 'Tours & Guides',
    kicker: 'ALL-IN · 5–10 DAYS',
    shortDesc:
      'Complete seasonal tours for Golden Route, Sakura spring, autumn koyo, and Hokkaido snow trips.',
    imagePath: '/assets/fuji-climb.jpg',
    heroImagePath: '/assets/fuji-climb.jpg',
    heroImageAlt:
      'Mount Fuji rising behind red autumn maple foliage on a Tanogaido seasonal Japan tour package',
    detailImagePath: '/assets/zen-retreat.jpg',
    detailImageAlt:
      'Traditional Japanese wooden pavilion and tranquil garden pond included in Tanogaido tour packages',
    features: [
      'Tokyo, Mt. Fuji, Kyoto, Osaka & Hokkaido routes',
      'Handpicked hotels, breakfast & curated attractions',
      'Guaranteed departures with experienced tour leaders',
    ],
    seoTitle: 'Japan Tour Packages — Golden Route, Sakura & Hokkaido | Tanogaido',
    metaDescription:
      'Explore all-inclusive Japan tour packages for Golden Route, Sakura spring, autumn foliage, and Hokkaido winter snow with hotels, rail, and guides.',
    keywords:
      'Japan tour packages, Golden Route Japan tour, Sakura tour package, Hokkaido winter tour, all inclusive Japan tour, Tanogaido packages',
    eyebrow: 'ALL-IN SEASONAL TOURS · 5 TO 10 DAYS',
    h1Lead: 'Curated Seasonal Journeys.',
    h1Accent: 'All-Inclusive Japan.',
    heroDesc:
      'Discover Japan’s iconic Golden Route, spring cherry blossoms, autumn maple valleys, and Hokkaido winter powder in complete comfort with hotels and transport arranged.',
    stats: [
      { val: '4 Seasons', label: 'Sakura, Summer, Koyo & Snow' },
      { val: '4-Star+', label: 'Handpicked Central Hotels' },
      { val: 'All-In', label: 'Guides, Rail & Entries Bundled' },
    ],
    highlights: [
      {
        title: 'Iconic Golden Route & Beyond',
        desc: 'Seamless itineraries linking Tokyo, Mt. Fuji, Shirakawago, Kyoto, Nara, and Osaka.',
      },
      {
        title: 'Prime Central Accommodations',
        desc: 'Stay steps from major JR and metro stations or unwind in authentic hot-spring ryokans.',
      },
      {
        title: 'Seasonal Timing Expertise',
        desc: 'Routes calibrated to peak sakura blooms, momiji foliage forecasts, and Niseko snow.',
      },
      {
        title: 'Transparent All-In Pricing',
        desc: 'Clear package inclusions covering guides, transport, breakfasts, and key landmark tickets.',
      },
    ],
    overviewTitle: 'Turnkey Japan Packages Designed Around Authentic Experiences',
    overviewText:
      'Our seasonal Japan tour packages take the complexity out of multi-city trip planning. Rather than rushing from parking lot to parking lot, Tanogaido crafts well-paced journeys blending famous UNESCO temples with culinary tastings, Shinkansen rides, and artisan districts.',
    included: [
      'Handpicked 4-star city hotels & optional hot-spring ryokan stays',
      'Bullet train tickets or licensed private coach transport between cities',
      'Experienced bilingual tour leader throughout the itinerary',
      'Daily breakfast plus curated local dining recommendations',
      'Pre-booked admission for featured shrines, ropeways & cultural sites',
    ],
    steps: [
      {
        title: 'Choose Your Season & Duration',
        desc: 'Pick 5, 7, or 10-day itineraries across Golden Route, Alpine Route, or Hokkaido.',
      },
      {
        title: 'Review Package Details & Hotels',
        desc: 'Receive a clear itinerary breakdown, seasonal highlights, and rooming options.',
      },
      {
        title: 'Confirm & Prepare for Takeoff',
        desc: 'Bundle your Japan visa and Pocket WiFi in one step before departure.',
      },
    ],
    faqs: [
      {
        q: 'Are flights included in Tanogaido Japan tour packages?',
        a: 'Land-tour packages allow flexible flight booking from your city, and our team can advise optimal arrival/departure airports.',
      },
      {
        q: 'Can halal or Muslim-friendly meals be accommodated?',
        a: 'Yes. We provide curated halal-certified and seafood/vegetarian dining options across Tokyo, Kyoto, Osaka, and Hokkaido.',
      },
      {
        q: 'What is the typical group size for seasonal packages?',
        a: 'We focus on intimate small-group departures or private family bookings so every traveler receives attentive service.',
      },
      {
        q: 'When should I book Sakura or Winter packages?',
        a: 'We recommend reserving 3 to 5 months ahead for peak March–April cherry blossom and December–February snow dates.',
      },
    ],
    relatedSlugs: ['private-japan-tour', 'japan-visa-processing', 'jr-pass-tickets', 'pocket-wifi-rental'],
    waText: 'Hello Tanogaido, I would like to see available Japan Tour Packages and departure dates.',
    showOnHome: true,
    homeSortOrder: 2,
    sortOrder: 4,
    homeCategory: 'tours',
    homeCardTitle: 'Japan Tour Packages',
    homeCardTag: 'All-In · 5–10 Days',
    homeCardKicker: 'ALL-IN · 5–10 DAYS',
    homeCardShort: 'Golden Route, Sakura, and seasonal packages.',
    homeCardImage: '/assets/fuji-climb.jpg',
    homeCardSubtitle:
      'Complete seasonal tours covering hotels, iconic sights, dining, and transport.',
    homeCardFeatures: [
      'Tokyo, Mt. Fuji, Kyoto, Osaka & Hokkaido',
      'Sakura, autumn foliage & winter departures',
      'Handpicked hotels & experienced leaders',
    ],
  },
  {
    slug: 'private-japan-tour',
    title: 'Private Japan Tour',
    category: 'tours',
    categoryLabel: 'Tours & Guides',
    kicker: 'BESPOKE · 1–15 PAX',
    shortDesc:
      'Custom-built private itineraries paced entirely around your family, honeymoon, or executive team.',
    imagePath: '/assets/cards/card-5.jpg',
    heroImagePath: '/assets/cards/card-5.jpg',
    heroImageAlt:
      'Private luxury Japan cultural tour overlooking tranquil temple courtyard and gardens',
    detailImagePath: '/assets/tea-ceremony.jpg',
    detailImageAlt:
      'Exclusive private Japanese matcha tea ceremony arranged during bespoke Tanogaido tours',
    features: [
      '100% private schedule with no outside joiners',
      'Child-friendly & senior-friendly travel pace',
      'Trusted by 650+ private & VIP groups',
    ],
    seoTitle: 'Private Japan Tour — Bespoke Luxury & Family Trips | Tanogaido',
    metaDescription:
      'Design a 100% custom private Japan tour for your family, honeymoon, or corporate VIPs with private Alphard vehicles and licensed guides.',
    keywords:
      'private Japan tour, custom Japan itinerary, luxury family tour Japan, bespoke Japan travel, VIP Japan concierge',
    eyebrow: 'BESPOKE ITINERARIES · 1 TO 15 GUESTS',
    h1Lead: 'Crafted Strictly Around',
    h1Accent: 'Your Pace & Style.',
    heroDesc:
      'Experience Japan exclusively with your own family, partner, or executive team — complete with custom routes, private chauffeur vans, and dedicated bilingual hosts.',
    stats: [
      { val: '650+', label: 'Private & VIP Groups Hosted' },
      { val: '100%', label: 'Zero Outside Joiners' },
      { val: 'Custom', label: 'Door-to-Door Flexible Timing' },
    ],
    highlights: [
      {
        title: 'Zero Fixed Bus Schedules',
        desc: 'Sleep in when you want, linger longer at scenic spots, and pivot plans effortlessly.',
      },
      {
        title: 'Tailored For Kids & Seniors',
        desc: 'Gentle walking paths, stroller/wheelchair-friendly logistics, and private van pickups.',
      },
      {
        title: 'Exclusive Cultural Access',
        desc: 'Arrange private tea ceremonies, kimono fittings, sushi workshops, or ryokan suites.',
      },
      {
        title: 'Unified Concierge Billing',
        desc: 'Combine private guides, vehicles, theme park passes, and hotel bookings seamlessly.',
      },
    ],
    overviewTitle: 'Bespoke Japan Travel Designed From a Blank Canvas',
    overviewText:
      'Every traveler imagines Japan differently — from Michelin dining and serene Kyoto ryokans to family theme parks or snow resorts in Hokkaido. Our Private Japan Tour planners listen first, then architect a custom route where every transfer, meal, and local host fits your party alone.',
    included: [
      'One-on-one itinerary design consultation with senior Japan planners',
      'Private licensed bilingual tour guide and/or green-plate chauffeur vehicle',
      'Custom hotel, ryokan, and dining reservation management',
      'Priority attraction and Shinkansen seat coordination',
      'Dedicated 24/7 concierge desk throughout your stay in Japan',
    ],
    steps: [
      {
        title: 'Brief Our Travel Architects',
        desc: 'Share your traveler ages, dream destinations, hotel tier, and travel dates.',
      },
      {
        title: 'Refine Your Custom Blueprint',
        desc: 'Review your tailored route proposal and tweak activities until every day feels right.',
      },
      {
        title: 'Travel With Total Privacy',
        desc: 'Enjoy seamless airport meet-and-greet and white-glove local hosting from start to finish.',
      },
    ],
    faqs: [
      {
        q: 'What is the minimum group size for a Private Japan Tour?',
        a: 'We host solo VIPs and couples (2 guests) all the way up to multi-generational families and corporate incentives of 15+ guests.',
      },
      {
        q: 'Can we mix Shinkansen bullet trains with private cars?',
        a: 'Yes — a popular hybrid uses private Alphard vans in Tokyo/Fuji/Kyoto and the Shinkansen between cities.',
      },
      {
        q: 'How far in advance should we plan a bespoke private trip?',
        a: 'Ideally 6 to 12 weeks prior, though our concierge team also fulfills urgent last-minute requests.',
      },
      {
        q: 'Can you coordinate private corporate retreats or incentive trips?',
        a: 'Yes, PT. Tanogaido Fantasi Pratama regularly manages executive delegations, factory visits, and incentive programs.',
      },
    ],
    relatedSlugs: ['japan-tour-guide', 'car-bus-rental', 'japan-golf-tour', 'japan-prewedding'],
    waText: 'Hello Tanogaido, I would like to design a custom Private Japan Tour for my group.',
    showOnHome: true,
    homeSortOrder: 3,
    sortOrder: 5,
    homeCategory: 'tours',
    homeCardTitle: 'Private Japan Tour',
    homeCardTag: 'Bespoke · 1–15 Pax',
    homeCardKicker: 'BESPOKE · 1–15 PAX',
    homeCardShort: 'Tailored private itineraries for families & VIPs.',
    homeCardImage: '/assets/cards/card-5.jpg',
    homeCardSubtitle:
      'Tailor-made itineraries paced around your family, honeymoon, or corporate team.',
    homeCardFeatures: [
      '100% private schedule with no outside groups',
      'Child- and senior-friendly travel pacing',
      'Trusted by 650+ private & VIP groups',
    ],
  },
  {
    slug: 'japan-visa-processing',
    title: 'Japan Visa Processing',
    category: 'visa',
    categoryLabel: 'Visa Concierge',
    kicker: 'E-VISA · WAIVER',
    shortDesc:
      'Thorough document pre-check and smooth embassy/VFS submission for Japan E-Visa, Waiver & Multiple Entry.',
    imagePath: '/assets/cards/japan-documents.jpg',
    heroImagePath: '/assets/cards/japan-documents.jpg',
    heroImageAlt:
      'Passport and verified Japan visa application paperwork prepared by Tanogaido visa specialists',
    detailImagePath: '/assets/cards/card-6.jpg',
    detailImageAlt:
      'International travel documentation and flight itinerary checklist for Japan visa approval',
    features: [
      'Complete document audit before embassy filing',
      'Tourism, family visit & business visa types',
      'Trusted by 940+ approved Japan applicants',
    ],
    seoTitle: 'Japan Visa Processing — E-Visa, Waiver & Multiple Entry | Tanogaido',
    metaDescription:
      'Fast, accurate Japan visa processing for E-Visa, e-passport Visa Waiver, and Multiple Entry visas with thorough pre-submission document review.',
    keywords:
      'Japan visa processing, Japan E-Visa service, Japan visa waiver, Japan multiple entry visa, Japan tourist visa assistance',
    eyebrow: 'VISA CONCIERGE · E-VISA & WAIVER',
    h1Lead: 'Smooth, Accurate Filing.',
    h1Accent: 'Japan Visa Care.',
    heroDesc:
      'Avoid delays and document rejections with pre-submission embassy audits for Japan E-Visa, Visa Waiver registration, Single Entry, and Multiple Entry visas.',
    stats: [
      { val: '940+', label: 'Approved Japan Applicants' },
      { val: 'Pre-Check', label: 'Full Embassy Document Audit' },
      { val: 'All Types', label: 'Waiver, Single, Multi & Business' },
    ],
    highlights: [
      {
        title: 'Zero-Guesswork Document Audit',
        desc: 'Every bank statement, employment letter, and itinerary is verified against current embassy standards.',
      },
      {
        title: 'E-Visa & Waiver Specialists',
        desc: 'Fast registration for eligible e-passport holders plus full online E-Visa submission support.',
      },
      {
        title: 'Family & Group Coordination',
        desc: 'Streamlined sponsor letters and aligned flight/hotel dossiers for families traveling together.',
      },
      {
        title: 'Transparent Status Updates',
        desc: 'Track each milestone from document collection through JVAC/embassy clearance via WhatsApp.',
      },
    ],
    overviewTitle: 'Hassle-Free Japan Visa Assistance From Start to Approval',
    overviewText:
      'Small clerical errors on application forms, mismatched travel dates, or incomplete sponsor documents are the top causes of Japan visa delays. Since 2007, Tanogaido has guided hundreds of tourists, families, and corporate travelers smoothly through embassy and JVAC procedures.',
    included: [
      'Eligibility check for Visa Waiver, E-Visa, Single, or Multiple Entry',
      'Complete application form preparation and itinerary alignment',
      'Financial statement and sponsor letter compliance check',
      'Submission coordination and real-time pickup/E-Visa notice tracking',
      'Optional certified document translation if supporting records require it',
    ],
    steps: [
      {
        title: 'Confirm Your Passport & Visa Category',
        desc: 'Message our visa desk with your passport type and planned departure date.',
      },
      {
        title: 'Submit Scans for Pre-Audit',
        desc: 'We review every supporting page and advise quick fixes before submission.',
      },
      {
        title: 'Receive Your Approved Japan Visa',
        desc: 'Pick up your stamped passport or receive your digital Japan E-Visa notice ready for boarding.',
      },
    ],
    faqs: [
      {
        q: 'How long does Japan visa processing usually take?',
        a: 'Standard embassy/JVAC processing takes around 5 to 7 working days after filing, depending on seasonal volume.',
      },
      {
        q: 'Can you process Japan Visa Waiver for e-passports?',
        a: 'Yes, we handle e-passport Visa Waiver registration quickly and cleanly before your departure.',
      },
      {
        q: 'Who qualifies for a Japan Multiple Entry visa?',
        a: 'Frequent travelers with qualifying financial capacity or previous G7/Japan travel history may apply; we assess your eligibility upfront.',
      },
      {
        q: 'Do I need to buy flight tickets before applying?',
        a: 'We advise on compliant flight/hotel booking documentation so you do not risk non-refundable fares.',
      },
    ],
    relatedSlugs: ['document-translation', 'china-visa-processing', 'south-korea-visa-processing', 'japan-tour-packages'],
    waText: 'Hello Tanogaido, I need assistance with Japan Visa Processing.',
    showOnHome: true,
    homeSortOrder: 4,
    sortOrder: 6,
    homeCategory: 'visa-wifi',
    homeCardTitle: 'Japan Visa Assistance',
    homeCardTag: 'E-Visa · Waiver',
    homeCardKicker: 'E-VISA · WAIVER',
    homeCardShort: 'Fast pre-check and embassy filing support.',
    homeCardImage: '/assets/cards/japan-documents.jpg',
    homeCardSubtitle:
      'Thorough pre-check and smooth filing for E-Visa, Visa Waiver, and Multiple Entry.',
    homeCardFeatures: [
      'Document review prior to embassy filing',
      'Tourism, family & business visa support',
      'Trusted by 940+ approved applicants',
    ],
  },
  {
    slug: 'china-visa-processing',
    title: 'China Visa Processing',
    category: 'visa',
    categoryLabel: 'Visa Concierge',
    kicker: 'TOURIST · BUSINESS',
    shortDesc:
      'Hassle-free Chinese tourist, business, and transit visa assistance from form preparation to center filing.',
    imagePath: '/assets/cards/card-6.jpg',
    heroImagePath: '/assets/cards/card-6.jpg',
    heroImageAlt:
      'China visa application forms and passport documents reviewed by Tanogaido visa concierge',
    detailImagePath: '/assets/cards/japan-documents.jpg',
    detailImageAlt:
      'Verified international travel itineraries and supporting letters for China tourist and business visas',
    features: [
      'Accurate application form & itinerary preparation',
      'Visa application center slot & biometric guidance',
      'Single, double & multiple-entry options',
    ],
    seoTitle: 'China Visa Processing — Tourist, Business & Transit | Tanogaido',
    metaDescription:
      'Reliable China visa processing assistance for L tourist, M business, and family visit visas including online form filling and center scheduling.',
    keywords:
      'China visa processing, China tourist visa, China business visa M, China visa center appointment, Tanogaido visa concierge',
    eyebrow: 'GLOBAL VISA DESK · TOURIST & BUSINESS',
    h1Lead: 'Streamlined Filing For',
    h1Accent: 'China Visas.',
    heroDesc:
      'Navigate China’s online COVA application, invitation letter checks, and Visa Application Center appointments cleanly with Tanogaido’s experienced visa desk.',
    stats: [
      { val: 'L / M / Q', label: 'Tourist, Business & Family' },
      { val: '100% Audit', label: 'COVA Form & Photo Check' },
      { val: 'Single/Multi', label: 'Flexible Entry Validity' },
    ],
    highlights: [
      {
        title: 'COVA Online Form Preparation',
        desc: 'We accurately complete lengthy digital China visa forms so zero discrepancies hold up your slot.',
      },
      {
        title: 'Business & Exhibition Support',
        desc: 'Guidance on M-visa invitation letters for Canton Fair, supplier visits, and trade missions.',
      },
      {
        title: 'Center Appointment Scheduling',
        desc: 'Coordinated submission times and biometric readiness reminders for stress-free center visits.',
      },
      {
        title: 'Photo & Itinerary Alignment',
        desc: 'Strict checking of biometric photo specs, hotel stays, and multi-city schedules.',
      },
    ],
    overviewTitle: 'Accurate China Visa Handling Without Application Mistakes',
    overviewText:
      'China visa applications require detailed multi-page COVA forms, strict passport photo dimensions, and matching hotel or invitation documentation. Our visa team handles form preparation and pre-checks every detail before your submission date.',
    included: [
      'Visa type assessment (L Tourist, M Business, Q/S Family Visit)',
      'Full digital COVA form drafting and error inspection',
      'Invitation letter / flight & hotel reservation verification',
      'Application center appointment booking & biometric checklist',
      'Clear tracking until passport collection',
    ],
    steps: [
      {
        title: 'Select Your China Visa Purpose',
        desc: 'Let us know whether you are visiting for tourism, business, or family.',
      },
      {
        title: 'Document Audit & Form Drafting',
        desc: 'Send your passport bio page, photo, and trip details for full COVA preparation.',
      },
      {
        title: 'Submit & Collect Passport',
        desc: 'Complete center submission smoothly with our step-by-step escort and checklist.',
      },
    ],
    faqs: [
      {
        q: 'Do all applicants need to appear for fingerprints?',
        a: 'Fingerprint requirements depend on current embassy exemptions (e.g., certain single/double-entry short stays or age brackets); we confirm exact rules for your case.',
      },
      {
        q: 'Can you assist with business (M) visas for trade fairs?',
        a: 'Yes, we verify your Chinese host company invitation letter and align your business itinerary.',
      },
      {
        q: 'How early should I apply for a China visa?',
        a: 'We recommend starting 3 to 4 weeks prior to departure to allow comfortable appointment and processing lead time.',
      },
    ],
    relatedSlugs: ['japan-visa-processing', 'south-korea-visa-processing', 'europe-schengen-visa', 'document-translation'],
    waText: 'Hello Tanogaido, I need assistance with China Visa Processing.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 7,
  },
  {
    slug: 'south-korea-visa-processing',
    title: 'South Korea Visa Processing',
    category: 'visa',
    categoryLabel: 'Visa Concierge',
    kicker: 'SINGLE · MULTIPLE',
    shortDesc:
      'End-to-end South Korea tourist, family, and group visa handling with thorough financial document review.',
    imagePath: '/assets/island-hop.jpg',
    heroImagePath: '/assets/island-hop.jpg',
    heroImageAlt: 'Scenic coastal bridge and sea views celebrating approved South Korea visa travel',
    detailImagePath: '/assets/cards/japan-documents.jpg',
    detailImageAlt:
      'Financial statements and South Korea KVAC visa dossier prepared by Tanogaido specialists',
    features: [
      'Detailed sponsor & bank statement checklist',
      'KVAC submission coordination & status tracking',
      'Fast turnaround for holiday & business travelers',
    ],
    seoTitle: 'South Korea Visa Processing — Tourist & Multiple Entry | Tanogaido',
    metaDescription:
      'End-to-end South Korea visa processing with financial dossier review, KVAC coordination, and tourist, family, or multiple-entry support.',
    keywords:
      'South Korea visa processing, Korea tourist visa C-3-9, KVAC visa assistance, Korea multiple entry visa, Tanogaido visa service',
    eyebrow: 'GLOBAL VISA DESK · SINGLE & MULTIPLE',
    h1Lead: 'Confident Approval For',
    h1Accent: 'South Korea Visas.',
    heroDesc:
      'Prepare spotless financial records, sponsor proofs, and KVAC submissions for Seoul, Busan, and Jeju trips with Tanogaido’s dedicated visa team.',
    stats: [
      { val: 'C-3-9 / C-3-4', label: 'Tourist & Business Visas' },
      { val: 'KVAC Ready', label: 'Complete Financial Audit' },
      { val: 'Group/Solo', label: 'Individual & Family Filing' },
    ],
    highlights: [
      {
        title: 'Thorough Bank & Tax Record Check',
        desc: 'We audit 3-month bank statements, reference letters, and tax proofs before KVAC submission.',
      },
      {
        title: 'Multiple-Entry Assessment',
        desc: 'Check eligibility for 5-year or 10-year South Korea multiple-entry visas based on your profile.',
      },
      {
        title: 'Family & Group Bundling',
        desc: 'Cleanly link relationship certificates and sponsor letters for parents, spouses, and children.',
      },
      {
        title: 'Combine East Asia Trips',
        desc: 'Planning Japan and South Korea in one holiday? We align both visa timelines together.',
      },
    ],
    overviewTitle: 'Structured KVAC Preparation for Higher Peace of Mind',
    overviewText:
      'South Korea visa evaluations focus heavily on consistent employment, financial stability, and cleanly formatted supporting records. Our specialists organize your entire dossier in the exact order KVAC officers expect, saving you repeat trips.',
    included: [
      'Complete South Korea visa checklist tailored to your occupation',
      'Application form drafting and itinerary alignment',
      'Financial & employment proof verification prior to filing',
      'KVAC submission scheduling and tracking updates',
      'Multi-country East Asia timeline coordination with Japan visas',
    ],
    steps: [
      {
        title: 'Check Eligibility & Checklist',
        desc: 'Share your employment status and travel dates for a customized document list.',
      },
      {
        title: 'Pre-Screening & Dossier Assembly',
        desc: 'We review every statement and format your application package accurately.',
      },
      {
        title: 'KVAC Filing & Approval Notice',
        desc: 'Submit cleanly and track electronic visa grant status right up to issuance.',
      },
    ],
    faqs: [
      {
        q: 'Can I apply for Japan and South Korea visas together?',
        a: 'Yes! Because both require your physical passport during certain stages, our team sequences the filings so you make your flight on time.',
      },
      {
        q: 'What financial balance is recommended for a Korea tourist visa?',
        a: 'Balances should comfortably cover your trip duration with consistent monthly income activity; we review your statements confidentially before filing.',
      },
      {
        q: 'How long does KVAC processing take?',
        a: 'Typically 7 to 14 working days depending on peak spring or autumn demand.',
      },
    ],
    relatedSlugs: ['japan-visa-processing', 'china-visa-processing', 'europe-schengen-visa', 'document-translation'],
    waText: 'Hello Tanogaido, I need assistance with South Korea Visa Processing.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 8,
  },
  {
    slug: 'europe-schengen-visa',
    title: 'Europe Schengen Visa Processing',
    category: 'visa',
    categoryLabel: 'Visa Concierge',
    kicker: 'SCHENGEN · EU',
    shortDesc:
      'Full Schengen visa preparation including travel insurance, flight/hotel alignments & VFS appointment booking.',
    imagePath: '/assets/zen-retreat.jpg',
    heroImagePath: '/assets/zen-retreat.jpg',
    heroImageAlt:
      'Peaceful historic architecture representing stress-free Europe Schengen visa preparation by Tanogaido',
    detailImagePath: '/assets/cards/japan-documents.jpg',
    detailImageAlt:
      'Complete Schengen visa itinerary, insurance certificate, and VFS checklist reviewed by Tanogaido',
    features: [
      'Embassy-compliant itinerary & hotel documentation',
      'Travel medical insurance & cover letter drafting',
      'Appointment scheduling across Schengen states',
    ],
    seoTitle: 'Europe Schengen Visa Processing — EU Embassy & VFS Care | Tanogaido',
    metaDescription:
      'Complete Europe Schengen visa processing with compliant itineraries, travel medical insurance, cover letters, and VFS/TLS appointment booking.',
    keywords:
      'Europe Schengen visa processing, Schengen tourist visa assistance, VFS Schengen appointment, EU travel insurance visa, Tanogaido visa',
    eyebrow: 'GLOBAL VISA DESK · 29 SCHENGEN STATES',
    h1Lead: 'Seamless Preparation For',
    h1Accent: 'Europe Schengen Visas.',
    heroDesc:
      'From multi-country EU itineraries and embassy cover letters to compliant Schengen travel insurance and VFS appointments, we simplify every requirement.',
    stats: [
      { val: '29 States', label: 'Schengen Area Coverage' },
      { val: 'VFS / TLS', label: 'Slot & Biometric Prep' },
      { val: 'Full Kit', label: 'Insurance & Cover Letter' },
    ],
    highlights: [
      {
        title: 'Main-Destination Routing Check',
        desc: 'We verify which EU embassy should receive your application based on stay duration and entry point.',
      },
      {
        title: 'Embassy-Compliant Insurance & Itineraries',
        desc: 'Minimum €30,000 medical coverage and coherent hotel/rail/flight alignments arranged cleanly.',
      },
      {
        title: 'Tailored Cover Letters',
        desc: 'Clear, professional purpose-of-travel letters addressing ties, funding, and day-by-day plans.',
      },
      {
        title: 'Sworn Document Translation Support',
        desc: 'Need civil or family documents translated into English? Handled seamlessly in-house.',
      },
    ],
    overviewTitle: 'Organized Schengen Visa Dossiers Built for Embassy Clarity',
    overviewText:
      'Applying for a Europe Schengen visa involves strict routing rules, Schengen-compliant medical insurance, translated civil records, and tight VFS/TLS appointment slots. Tanogaido prepares every page methodically so you walk into your biometric appointment confident and complete.',
    included: [
      'Embassy jurisdiction check across France, Switzerland, Italy, Germany, Netherlands & more',
      'Day-by-day Schengen travel itinerary & accommodation alignment',
      'Professional Schengen cover letter and sponsorship drafting',
      'Schengen-compliant €30,000 travel medical insurance arrangement',
      'VFS Global / TLScontact appointment scheduling and interview prep',
    ],
    steps: [
      {
        title: 'Share Your European Route',
        desc: 'Tell us which countries you plan to visit and how many nights in each city.',
      },
      {
        title: 'Assemble & Translate Your Dossier',
        desc: 'We prepare forms, cover letters, insurance, and any required English translations.',
      },
      {
        title: 'Attend Biometrics & Receive Passport',
        desc: 'Complete your VFS/TLS appointment smoothly with full document organization.',
      },
    ],
    faqs: [
      {
        q: 'Which embassy do I apply to if visiting multiple European countries?',
        a: 'You apply to the Schengen state where you spend the most nights, or your first port of entry if nights are equal across countries.',
      },
      {
        q: 'How early can I apply for a Schengen visa?',
        a: 'Applications can be submitted up to 6 months before travel, and we strongly advise starting at least 6–8 weeks early due to VFS slot demand.',
      },
      {
        q: 'Do you also provide travel medical insurance for Schengen?',
        a: 'Yes, we arrange embassy-approved travel insurance meeting the €30,000 medical & repatriation mandate.',
      },
    ],
    relatedSlugs: ['document-translation', 'japan-visa-processing', 'south-korea-visa-processing', 'china-visa-processing'],
    waText: 'Hello Tanogaido, I need assistance with Europe Schengen Visa Processing.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 9,
  },
  {
    slug: 'jr-pass-tickets',
    title: 'JR Pass Tickets',
    category: 'transport',
    categoryLabel: 'Transport & Passes',
    kicker: 'OFFICIAL · SHINKANSEN',
    shortDesc: 'Official Whole Japan Rail Pass, Regional JR Passes, and Shinkansen seat reservations.',
    imagePath: '/assets/shinkansen.jpg',
    heroImagePath: '/assets/shinkansen.jpg',
    heroImageAlt:
      'High-speed Japanese Shinkansen bullet train speeding along tracks for Tanogaido JR Pass holders',
    detailImagePath: '/assets/fuji-climb.jpg',
    detailImageAlt:
      'Mount Fuji view from the Tokaido Shinkansen bullet train between Tokyo and Kyoto',
    features: [
      'Free route calculator to maximize rail savings',
      'Nationwide, Kansai, Takayama & Hokkaido passes',
      'Trusted by 890+ JR Pass travelers',
    ],
    seoTitle: 'JR Pass Tickets — Official Japan Rail & Shinkansen | Tanogaido',
    metaDescription:
      'Buy official Japan Rail Pass, Regional JR Passes, and Shinkansen point-to-point tickets with free route savings calculation from Tanogaido.',
    keywords:
      'JR Pass tickets, official Japan Rail Pass, Shinkansen bullet train tickets, Kansai JR pass, Hokkaido rail pass, Tanogaido JR Pass',
    eyebrow: 'OFFICIAL RAIL PARTNER · SHINKANSEN',
    h1Lead: 'Ride The Shinkansen.',
    h1Accent: 'Maximize Rail Savings.',
    heroDesc:
      'Get official Whole Japan Rail Passes, Regional JR Passes, and point-to-point Shinkansen tickets — backed by a free route-cost check so you never overpay.',
    stats: [
      { val: '890+', label: 'JR Pass Holders Served' },
      { val: 'Free Check', label: 'Pass vs. Point-to-Point Audit' },
      { val: '7 / 14 / 21d', label: 'Whole Japan & Regional Passes' },
    ],
    highlights: [
      {
        title: 'Honest Route Savings Calculator',
        desc: 'We compare total point-to-point Shinkansen fares against JR Pass prices before you buy.',
      },
      {
        title: 'Regional Pass Expertise',
        desc: 'Save big with JR Kansai-Hiroshima, JR East Tohoku, Hokuriku Arch, or Hokkaido Rail Passes.',
      },
      {
        title: 'Oversized Luggage Seat Guidance',
        desc: 'Clear instructions on reserving Shinkansen seats with dedicated large suitcase spaces.',
      },
      {
        title: 'Ordinary & Green Car Options',
        desc: 'Choose standard comfort or first-class Green Car cabins across Japan’s rail network.',
      },
    ],
    overviewTitle: 'Smart Japan Rail Planning Before You Board',
    overviewText:
      'Since nationwide JR Pass pricing updated, choosing between a Whole Japan Rail Pass, a Regional JR Pass, or single Shinkansen e-tickets makes a huge difference to your budget. Send us your cities and we calculate the smartest combination in minutes.',
    included: [
      'Free multi-city fare comparison before issuing any rail pass',
      'Official Whole Japan Rail Pass (7, 14, or 21 consecutive days)',
      'Regional JR Passes (Kansai, JR East, Kyushu, Hokkaido, Alpine)',
      'Point-to-point Shinkansen seat tickets including Nozomi & Mizuho',
      'Step-by-step voucher exchange and seat reservation instructions',
    ],
    steps: [
      {
        title: 'Send Your City-to-City Route',
        desc: 'Tell us where you fly in, which cities you visit, and your travel dates.',
      },
      {
        title: 'Receive Best-Value Rail Recommendation',
        desc: 'We show whether a Whole Pass, Regional Pass, or single tickets save you more.',
      },
      {
        title: 'Issue Passes & Reserve Seats',
        desc: 'Receive your official exchange voucher or QR ticket with easy station pickup steps.',
      },
    ],
    faqs: [
      {
        q: 'Is the nationwide 7-day JR Pass still worth it for Tokyo–Kyoto–Osaka?',
        a: 'For a simple Tokyo–Osaka round-trip alone, single Shinkansen tickets are usually cheaper; adding Hiroshima, Kanazawa, or Kyushu makes passes shine. We calculate it free for you.',
      },
      {
        q: 'Can you issue tickets for the fast Nozomi Shinkansen?',
        a: 'Yes, we book direct Nozomi point-to-point tickets as well as Nozomi upgrade supplements if needed.',
      },
      {
        q: 'What is the difference between Ordinary and Green Car?',
        a: 'Green Car offers wider 2+2 seating, extra legroom, quieter cabins, and attendant service similar to business class.',
      },
    ],
    relatedSlugs: ['attraction-theme-park-tickets', 'car-bus-rental', 'pocket-wifi-rental', 'online-tour-guide'],
    waText: 'Hello Tanogaido, I would like to check and buy JR Pass or Shinkansen Tickets.',
    showOnHome: true,
    homeSortOrder: 7,
    sortOrder: 10,
    homeCategory: 'transport',
    homeCardTitle: 'JR Pass Tickets',
    homeCardTag: 'Official · Shinkansen',
    homeCardKicker: 'OFFICIAL · SHINKANSEN',
    homeCardShort: 'Whole Japan & Regional Shinkansen passes.',
    homeCardImage: '/assets/shinkansen.jpg',
    homeCardSubtitle:
      'Official Whole Japan Rail Pass, Regional Passes, and Shinkansen seat reservations.',
    homeCardFeatures: [
      'Free fare check to maximize rail savings',
      'Nationwide, Kansai & Hokkaido passes',
      'Trusted by 890+ JR Pass holders',
    ],
  },
  {
    slug: 'attraction-theme-park-tickets',
    title: 'Attraction, Theme Park & Rail Pass Tickets',
    category: 'transport',
    categoryLabel: 'Transport & Passes',
    kicker: 'INSTANT QR · EXPRESS',
    shortDesc:
      'Guaranteed QR entry for USJ, Tokyo Disney Resort, Super Nintendo World, teamLab, and regional train passes.',
    imagePath: '/assets/cards/japan-theme-park.jpg',
    heroImagePath: '/assets/cards/japan-theme-park.jpg',
    heroImageAlt:
      'Illuminated Japanese theme park castle and evening attractions available via Tanogaido QR tickets',
    detailImagePath: '/assets/tokyo-pulse.jpg',
    detailImageAlt:
      'Tokyo Shibuya skyline observation view included in Tanogaido attraction ticket concierge',
    features: [
      'Tokyo Disneyland, DisneySea & USJ Express Passes',
      'Shibuya Sky, teamLab Planets & Mt. Fuji ropeway',
      'Regional transit & airport express train tickets',
    ],
    seoTitle: 'Japan Theme Park & Attraction Tickets — USJ, Disney & Passes | Tanogaido',
    metaDescription:
      'Book official QR tickets for Universal Studios Japan, USJ Express Pass, Tokyo Disneyland, DisneySea, Shibuya Sky, teamLab, and regional rail passes.',
    keywords:
      'Japan theme park tickets, USJ Express Pass tickets, Tokyo DisneySea tickets, Shibuya Sky tickets, teamLab Planets tickets, Japan attraction QR',
    eyebrow: 'INSTANT QR · EXPRESS PASSES',
    h1Lead: 'Guaranteed Entry To',
    h1Accent: 'Japan’s Top Parks.',
    heroDesc:
      'Lock in high-demand tickets for Universal Studios Japan, Super Nintendo World Express Passes, Tokyo Disney Resort, Shibuya Sky, and regional transit passes.',
    stats: [
      { val: 'QR Ready', label: 'Fast Mobile Gate Scanning' },
      { val: 'USJ & Disney', label: 'High-Demand Timed Slots' },
      { val: 'Bundled', label: 'Parks, Observatories & Rail' },
    ],
    highlights: [
      {
        title: 'USJ Studio & Express Passes',
        desc: 'Skip multi-hour queues at Super Nintendo World, Harry Potter, and Flying Dinosaur.',
      },
      {
        title: 'Tokyo Disneyland & DisneySea',
        desc: 'Secure preferred date admission including Fantasy Springs access guidance.',
      },
      {
        title: 'Sold-Out Observatory & Art Slots',
        desc: 'Early assistance for sunset Shibuya Sky windows and teamLab Planets / Borderless.',
      },
      {
        title: 'Airport & Regional Transit Passes',
        desc: 'Bundle Skyliner, Haruka Express, Tokyo Subway 24–72h, and Kansai Thru Passes.',
      },
    ],
    overviewTitle: 'Never Miss Timed Entry at Japan’s Most Popular Attractions',
    overviewText:
      'Japan’s top attractions now rely strictly on timed online quotas that sell out weeks in advance — especially sunset slots at Shibuya Sky and USJ Express Passes. Our ticketing desk secures verified QR vouchers and walks you through park entry apps.',
    included: [
      'Official QR e-tickets for USJ, Tokyo Disneyland & Tokyo DisneySea',
      'Universal Express Pass 4 / 7 options with Nintendo timed entry',
      'Shibuya Sky, Tokyo Skytree, teamLab Planets & Warner Bros. Studio Tour',
      'Airport rail transfers (Narita Skyliner, N’EX, Kansai Haruka)',
      'Park strategy tips for rides, mobile food orders, and fireworks',
    ],
    steps: [
      {
        title: 'Send Your Preferred Park Dates',
        desc: 'Share your target dates, traveler ages, and wish-list rides or time slots.',
      },
      {
        title: 'Check Live Slot Availability',
        desc: 'Our desk verifies available Express Pass combinations and sunset observatory slots.',
      },
      {
        title: 'Receive Instant QR Vouchers',
        desc: 'Get ready-to-scan mobile vouchers and app setup instructions before park day.',
      },
    ],
    faqs: [
      {
        q: 'How early should I book USJ Express Passes?',
        a: 'Express Passes frequently sell out 3 to 6 weeks ahead, especially for weekends and school holidays — message us as soon as your Osaka dates are set.',
      },
      {
        q: 'Do children need separate tickets for theme parks?',
        a: 'Yes, child pricing applies based on age tiers (typically ages 4–11 at USJ/Disney); we verify exact brackets when quoting.',
      },
      {
        q: 'Can you bundle Tokyo Subway passes or Narita Skyliner tickets?',
        a: 'Yes, we can issue airport express and city subway passes alongside your attraction tickets in one order.',
      },
    ],
    relatedSlugs: ['jr-pass-tickets', 'car-bus-rental', 'tokyo-9-day-guide', 'pocket-wifi-rental'],
    waText: 'Hello Tanogaido, I would like to buy Japan Attraction, Theme Park & Rail Pass Tickets.',
    showOnHome: true,
    homeSortOrder: 8,
    sortOrder: 11,
    homeCategory: 'parks',
    homeCardTitle: 'Theme Park Tickets',
    homeCardTag: 'Instant QR · Express',
    homeCardKicker: 'INSTANT QR · EXPRESS',
    homeCardShort: 'Tokyo Disney, USJ, Super Nintendo & teamLab.',
    homeCardImage: '/assets/cards/japan-theme-park.jpg',
    homeCardSubtitle: 'Guaranteed entry & Express Passes for USJ, Tokyo Disney, and teamLab.',
    homeCardFeatures: [
      'Disneyland, DisneySea & Universal Studios',
      'Nintendo World, Shibuya Sky & teamLab',
      'Instant QR e-tickets to skip queues',
    ],
  },
  {
    slug: 'car-bus-rental',
    title: 'Car & Tour Bus Rental',
    category: 'transport',
    categoryLabel: 'Transport & Passes',
    kicker: 'ALPHARD · COACH',
    shortDesc:
      'Licensed green-plate Toyota Alphard, HiAce Grand Cabin, and executive coaches with professional drivers.',
    imagePath: '/assets/cards/japan-van.jpg',
    heroImagePath: '/assets/cards/japan-van.jpg',
    heroImageAlt:
      'Executive black Toyota Alphard and HiAce private charter fleet for Tanogaido Japan transfers',
    detailImagePath: '/assets/fuji-climb.jpg',
    detailImageAlt:
      'Scenic highway route toward Mount Fuji traveled comfortably in a Tanogaido private charter van',
    features: [
      'Haneda, Narita, Kansai & New Chitose transfers',
      'Alphard, HiAce, Microbus & 45-seat coach fleet',
      'Transparent all-in rates with tolls & fuel',
    ],
    seoTitle: 'Japan Car & Tour Bus Rental — Private Alphard, HiAce & Coach | Tanogaido',
    metaDescription:
      'Charter licensed green-plate Toyota Alphard, HiAce Grand Cabin, microbus, or tour buses with professional drivers across Japan.',
    keywords:
      'Japan car rental with driver, Tokyo Alphard charter, Japan HiAce rental, Japan tour bus charter, airport transfer Haneda Narita Kansai',
    eyebrow: 'LICENSED GREEN-PLATE FLEET · CHAUFFEUR',
    h1Lead: 'Private Chauffeur Fleet.',
    h1Accent: 'Door-To-Door Comfort.',
    heroDesc:
      'Travel across Tokyo, Mt. Fuji, Kyoto, Osaka, and Hokkaido in licensed green-plate Toyota Alphards, HiAce Grand Cabins, and executive tour coaches with spacious luggage capacity.',
    stats: [
      { val: 'Green Plate', label: '100% Licensed Commercial Fleet' },
      { val: '4 to 45 Pax', label: 'Alphard, HiAce & Tour Coaches' },
      { val: 'All-In Rate', label: 'Driver, Tolls & Fuel Included' },
    ],
    highlights: [
      {
        title: 'Legally Licensed Green-Plate Vehicles',
        desc: 'Full commercial insurance and government-licensed drivers for worry-free airport and highway travel.',
      },
      {
        title: 'Generous Suitcase Space',
        desc: 'HiAce Grand Cabins and coaches fit large luggage effortlessly — no hauling bags up station stairs.',
      },
      {
        title: '10-Hour Custom Day Charters',
        desc: 'Explore Mt. Fuji 5th Station, Lake Kawaguchiko, Gotemba Outlets, or Kyoto outskirts at your own pace.',
      },
      {
        title: 'Major Airport Meet & Greet',
        desc: 'Seamless pickups and drop-offs at Narita, Haneda, Kansai, Chubu Centrair, and New Chitose.',
      },
    ],
    overviewTitle: 'Seamless Private Transport for Families, Seniors & Groups',
    overviewText:
      'Nothing beats stepping straight out of your hotel lobby into a climate-controlled Toyota Alphard or HiAce when traveling with kids, elderly parents, golf bags, or winter luggage. Our transparent charter quotes clearly cover driver, fuel, expressway tolls, and parking.',
    included: [
      'Licensed green-plate vehicle matched to passenger and luggage count',
      'Experienced professional driver (optional bilingual tour guide onboard)',
      '10-hour daily charter service or direct airport-to-hotel transfer',
      'All highway expressway tolls, fuel, and standard parking fees',
      'Child car seats available upon advance request',
    ],
    steps: [
      {
        title: 'Share Headcount & Suitcase Total',
        desc: 'Tell us how many passengers, large suitcases, and strollers or golf bags you have.',
      },
      {
        title: 'Match the Ideal Vehicle Class',
        desc: 'Choose from Toyota Alphard, HiAce Commuter/Grand Cabin, 20-seat Microbus, or 45-seat Coach.',
      },
      {
        title: 'Enjoy Effortless Pickup',
        desc: 'Your driver meets you on schedule with real-time flight and route monitoring.',
      },
    ],
    faqs: [
      {
        q: 'How many passengers and suitcases fit in a Toyota Alphard vs. HiAce?',
        a: 'A Toyota Alphard comfortably fits 4–5 passengers with 4 large suitcases; a HiAce Grand Cabin accommodates up to 8–9 passengers with 8–9 suitcases.',
      },
      {
        q: 'Why does a licensed green-plate vehicle matter in Japan?',
        a: 'Green license plates guarantee legal commercial transport authorization and full passenger liability insurance — unlike unlicensed private white-plate rides.',
      },
      {
        q: 'Can we book a van just for a 1-day Mt. Fuji trip from Tokyo?',
        a: 'Yes! Single-day 10-hour charters from Tokyo to Mt. Fuji, Hakone, Kamakura, or Karuizawa are among our most popular bookings.',
      },
    ],
    relatedSlugs: ['private-japan-tour', 'japan-golf-tour', 'japan-tour-guide', 'jr-pass-tickets'],
    waText: 'Hello Tanogaido, I would like a quote for a Car or Tour Bus Rental in Japan.',
    showOnHome: true,
    homeSortOrder: 6,
    sortOrder: 12,
    homeCategory: 'transport',
    homeCardTitle: 'Car & Tour Bus Rental',
    homeCardTag: 'Alphard · Bus',
    homeCardKicker: 'ALPHARD · BUS',
    homeCardShort: 'Green-plate Alphard, HiAce & coach fleet.',
    homeCardImage: '/assets/cards/japan-van.jpg',
    homeCardSubtitle:
      'Official green-plate charter fleet from Toyota Alphard and HiAce to executive coaches.',
    homeCardFeatures: [
      'Haneda, Narita, Kansai & Chitose pickups',
      'Alphard, HiAce Grand Cabin & coach buses',
      'Includes licensed driver, fuel & tolls',
    ],
  },
  {
    slug: 'japan-golf-tour',
    title: 'Japan Golf Tour',
    category: 'specialty',
    categoryLabel: 'Specialty & Golf',
    kicker: 'TEE TIMES · HAKONE & HOKKAIDO',
    shortDesc:
      'Curated championship golf rounds near Mt. Fuji, Karuizawa, Chiba, and Hokkaido with private transfers.',
    imagePath: '/assets/cards/japan-golf.jpg',
    heroImagePath: '/assets/cards/japan-golf.jpg',
    heroImageAlt:
      'Championship Japan golf course overlooking Mount Fuji arranged by Tanogaido Golf Tours',
    detailImagePath: '/assets/zen-retreat.jpg',
    detailImageAlt:
      'Luxury Japanese onsen ryokan accommodation paired with Tanogaido golf tour itineraries',
    features: [
      'Guaranteed tee times at premier Japanese courses',
      'Private Alphard/HiAce transport with golf bag space',
      'Caddy, luxury ryokan stays & club rental support',
    ],
    seoTitle: 'Japan Golf Tour — Championship Courses & Private Transfers | Tanogaido',
    metaDescription:
      'Play premier Japanese golf courses near Mt. Fuji, Hakone, Chiba, Karuizawa, and Hokkaido with guaranteed tee times, private vans, and ryokan stays.',
    keywords:
      'Japan golf tour, Mt Fuji golf courses, Hokkaido golf package, Tokyo golf tee times, luxury golf trip Japan, Tanogaido golf tour',
    eyebrow: 'CHAMPIONSHIP TEE TIMES · FUJI & HOKKAIDO',
    h1Lead: 'Play Iconic Fairways',
    h1Accent: 'Beneath Mount Fuji.',
    heroDesc:
      'Experience immaculate Japanese fairways, courteous caddies, clubhouse onsen baths, and gourmet dining with guaranteed tee times and private Alphard/HiAce bag transfers.',
    stats: [
      { val: 'Top Clubs', label: 'Fuji, Chiba, Karuizawa & Hokkaido' },
      { val: 'Private Van', label: 'Dedicated Golf Bag Transport' },
      { val: 'All-In', label: 'Tee Times, Caddies & Stays' },
    ],
    highlights: [
      {
        title: 'Guaranteed Tee Times at Private & Resort Clubs',
        desc: 'Skip Japanese booking portals — we reserve weekday and weekend tee times directly with top clubs.',
      },
      {
        title: 'Dedicated Golf Bag Logistics',
        desc: 'Private HiAce/Alphard transfers or Takkyubin courier delivery straight between hotels and clubhouses.',
      },
      {
        title: 'Scenic Mt. Fuji & Hokkaido Fairways',
        desc: 'Tee off with views of Mount Fuji in Gotemba/Kawaguchiko or enjoy cool summer rounds in Hokkaido.',
      },
      {
        title: 'Authentic Clubhouse & Onsen Culture',
        desc: 'Savor traditional clubhouse lunches and post-round hot spring baths seamlessly.',
      },
    ],
    overviewTitle: 'Turnkey Golf Holidays Tailored for Enthusiasts & Executives',
    overviewText:
      'Golf in Japan is world-renowned for pristine greens, remarkable hospitality, and unforgettable mountain scenery — yet many premier clubs require Japanese residency or phone bookings. Tanogaido handles course reservations, caddies, carts, rental sets, and transfers effortlessly.',
    included: [
      'Guaranteed green fees, cart & caddie reservations at selected clubs',
      'Private green-plate HiAce or Alphard transport with golf bag room',
      'Hotel or luxury hot-spring ryokan accommodations near courses',
      'Club rental coordination and airport-to-course golf bag courier',
      'Bilingual host support for smooth clubhouse check-in and dining',
    ],
    steps: [
      {
        title: 'Share Your Group Size & Handicap Mix',
        desc: 'Tell us how many flights, preferred dates, and regions (Fuji, Tokyo/Chiba, Kansai, or Hokkaido).',
      },
      {
        title: 'Choose From Curated Course Pairings',
        desc: 'Select 2 to 5 championship rounds paired with city hotels or onsen resorts.',
      },
      {
        title: 'Arrive & Tee Off Smoothly',
        desc: 'Your driver and host handle every bag transfer, tee check-in, and dinner booking.',
      },
    ],
    faqs: [
      {
        q: 'Can we rent premium golf clubs in Japan instead of bringing our own?',
        a: 'Yes, most partner clubs carry current Japanese and international sets (Titleist, Callaway, Honma, TaylorMade) which we pre-reserve for your handedness and flex.',
      },
      {
        q: 'What is the best season for a Japan Golf Tour?',
        a: 'April–June and September–November are ideal around Mt. Fuji, Tokyo, and Kyoto; July–August offers superb cool-weather golf in Hokkaido and Karuizawa.',
      },
      {
        q: 'Can non-golfing partners join the trip?',
        a: 'Definitely — we arrange outlet shopping, spa days, or guided sightseeing for spouses while golfers are on the course.',
      },
    ],
    relatedSlugs: ['car-bus-rental', 'private-japan-tour', 'japan-property-survey', 'japan-tour-guide'],
    waText: 'Hello Tanogaido, I am interested in booking a custom Japan Golf Tour.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 13,
  },
  {
    slug: 'japan-prewedding',
    title: 'Japan Prewedding Packages',
    category: 'specialty',
    categoryLabel: 'Specialty & Golf',
    kicker: 'PRO CREW · KIMONO',
    shortDesc:
      'Editorial couples photography across Kyoto temples, Mt. Fuji lakes, and Tokyo streets with full styling.',
    imagePath: '/assets/cards/card-2.jpg',
    heroImagePath: '/assets/cards/card-2.jpg',
    heroImageAlt:
      'Couple in traditional Japanese kimono posing along historic Kyoto street for Tanogaido prewedding shoot',
    detailImagePath: '/assets/fuji-climb.jpg',
    detailImageAlt:
      'Scenic Mount Fuji lakeside sunrise backdrop for Japan prewedding photography sessions',
    features: [
      'Experienced photographer & location director',
      'Kimono wardrobe, hair & hijab styling support',
      'High-resolution gallery with editorial color edit',
    ],
    seoTitle: 'Japan Prewedding Packages — Kyoto, Mt. Fuji & Tokyo Shoots | Tanogaido',
    metaDescription:
      'Book editorial Japan prewedding photography in Kyoto, Mt. Fuji, and Tokyo with experienced photographers, kimono wardrobe, hair, hijab styling & transport.',
    keywords:
      'Japan prewedding packages, Kyoto prewedding photoshoot, Mt Fuji prewedding photography, Tokyo couples photoshoot, kimono prewedding Japan',
    eyebrow: 'EDITORIAL CREW · KIMONO & STYLING',
    h1Lead: 'Timeless Love Stories',
    h1Accent: 'Framed In Japan.',
    heroDesc:
      'Capture editorial engagement and prewedding portraits in Kyoto’s historic alleys, beside Mount Fuji’s lakes, or beneath sakura and autumn maples with full production care.',
    stats: [
      { val: 'Full Crew', label: 'Photographer, Stylist & Assistant' },
      { val: '3 Regions', label: 'Kyoto, Mt. Fuji & Tokyo' },
      { val: 'Hijab Ready', label: 'Custom Makeup & Kimono Styling' },
    ],
    highlights: [
      {
        title: 'Permit-Smart Location Timing',
        desc: 'Dawn schedules and permit-compliant Kyoto, Nara, and Lake Kawaguchiko routes for clean, crowd-free frames.',
      },
      {
        title: 'Traditional Kimono & Modern Gown Options',
        desc: 'Coordinate authentic furisode/montsuki kimono rentals or bring your own bridal gowns effortlessly.',
      },
      {
        title: 'Dedicated Hair, Makeup & Hijab Styling',
        desc: 'Experienced stylists remain on set for touch-ups between outdoor shoots and weather shifts.',
      },
      {
        title: 'Private Van Production Support',
        desc: 'Travel comfortably between 3 to 4 shoot locations with changing space, umbrellas, and warmers.',
      },
    ],
    overviewTitle: 'Stress-Free Prewedding Production Across Japan’s Most Photogenic Spots',
    overviewText:
      'Shooting abroad shouldn’t feel chaotic. Our bilingual prewedding production team handles location scouting, sunrise timing, kimono dressing, makeup touch-ups, private vehicle transport, and curated color-graded photo delivery so you simply enjoy the moment.',
    included: [
      'Full-day or half-day professional prewedding photographer & assistant',
      'Professional hair, makeup & hijab styling support on location',
      'Private chauffeur vehicle between morning and sunset backdrops',
      'Optional kimono rental coordination & dressing assistance',
      'All edited high-resolution digital images plus selected fine-art retouches',
    ],
    steps: [
      {
        title: 'Pick Your Season & Dream City',
        desc: 'Choose Kyoto temples, Mt. Fuji lakes, Shirakawago, or modern Tokyo neon.',
      },
      {
        title: 'Select Wardrobe & Shoot Locations',
        desc: 'Lock in kimono or bridal looks and our team plans your golden-hour timeline.',
      },
      {
        title: 'Shoot Effortlessly With Full Crew',
        desc: 'Our driver, stylist, and photographer guide every pose and transition smoothly.',
      },
    ],
    faqs: [
      {
        q: 'Do you respect Kyoto photography rules around Gion and private alleys?',
        a: 'Yes. We strictly follow all municipal rules and shoot exclusively at authorized public temples, parks, Arashiyama groves, and scenic Kyoto streets.',
      },
      {
        q: 'What happens if it rains on our shoot day?',
        a: 'We monitor forecasts closely and offer flexible backup date shifts or covered traditional wooden architecture locations.',
      },
      {
        q: 'How soon do we receive our edited prewedding photos?',
        a: 'Preview selects arrive within days, and your full color-graded gallery is delivered within 3 to 4 weeks.',
      },
    ],
    relatedSlugs: ['private-japan-tour', 'car-bus-rental', 'japan-tour-guide', 'japan-personal-shopper'],
    waText: 'Hello Tanogaido, I would like to inquire about Japan Prewedding Packages.',
    showOnHome: true,
    homeSortOrder: 11,
    sortOrder: 14,
    homeCategory: 'shopping',
    homeCardTitle: 'Japan Prewedding Shoot',
    homeCardTag: 'Pro Crew · Kimono',
    homeCardKicker: 'PRO CREW · KIMONO',
    homeCardShort: 'Editorial couples shoot in Kyoto & Mt. Fuji.',
    homeCardImage: '/assets/cards/card-2.jpg',
    homeCardSubtitle:
      'Editorial couples photography across Kyoto, Mt. Fuji, and Tokyo with full styling.',
    homeCardFeatures: [
      'Experienced local photographer & director',
      'Kimono wardrobe & hair or hijab styling',
      'High-res gallery + editorial color edit',
    ],
  },
  {
    slug: 'japan-property-survey',
    title: 'Japan Property Survey Tour',
    category: 'specialty',
    categoryLabel: 'Specialty & Golf',
    kicker: 'REAL ESTATE · TOKYO & OSAKA',
    shortDesc:
      'Guided inspection trips for residential apartments, akiya houses, and commercial property investments in Japan.',
    imagePath: '/assets/tokyo-pulse.jpg',
    heroImagePath: '/assets/tokyo-pulse.jpg',
    heroImageAlt:
      'Tokyo metropolitan skyline showcasing residential and commercial districts on a Japan property survey tour',
    detailImagePath: '/assets/cards/japan-van.jpg',
    detailImageAlt:
      'Private executive Alphard vehicle used for multi-district property viewings in Japan',
    features: [
      'Scheduled viewings with licensed Japanese brokers',
      'On-site bilingual business & legal translation',
      'Private vehicle transport between districts',
    ],
    seoTitle: 'Japan Property Survey Tour — Real Estate & Akiya Inspections | Tanogaido',
    metaDescription:
      'Book a guided Japan property survey tour for Tokyo, Osaka, and Kyoto apartments, commercial buildings, or akiya homes with bilingual translation and vans.',
    keywords:
      'Japan property survey tour, buy property in Japan tour, Tokyo real estate inspection, Osaka investment property tour, akiya house Japan viewing',
    eyebrow: 'REAL ESTATE · TOKYO, OSAKA & KYOTO',
    h1Lead: 'Inspect Japanese Real Estate',
    h1Accent: 'With Local Clarity.',
    heroDesc:
      'Conduct focused on-site property viewings across Tokyo, Osaka, Kyoto, or resort towns with licensed broker scheduling, private transport, and bilingual business translation.',
    stats: [
      { val: 'On-Site', label: 'Multi-Property Daily Scheduling' },
      { val: 'Bilingual', label: 'Broker & Legal Term Translation' },
      { val: 'Private Van', label: 'Efficient District-to-District Route' },
    ],
    highlights: [
      {
        title: 'Coordinated Broker Appointments',
        desc: 'We organize back-to-back viewings with Japanese listing agents so every hour counts.',
      },
      {
        title: 'Accurate Business & Property Translation',
        desc: 'Understand building management fees, repair reserves, zoning rules, and tax terms clearly.',
      },
      {
        title: 'Neighborhood Due Diligence',
        desc: 'Inspect station walking times, flood maps, surrounding amenities, and rental demand firsthand.',
      },
      {
        title: 'Private Executive Transport',
        desc: 'Move smoothly between 4 to 6 properties a day in a quiet Alphard with laptop space.',
      },
    ],
    overviewTitle: 'Turn Online Listings Into Informed Real-World Decisions',
    overviewText:
      'Buying residential apartments, minpaku guesthouses, commercial buildings, or rural akiya in Japan requires seeing neighborhood context and understanding Japanese management disclosures in person. Tanogaido bridges the language and logistics gap for international investors.',
    included: [
      'Customized viewing schedule coordinated with Japanese real estate agencies',
      'Bilingual business interpreter accompanying every site visit & broker meeting',
      'Private chauffeur vehicle for seamless district-to-district inspections',
      'Neighborhood walkability, transit & local amenity evaluation notes',
      'Follow-up document translation support for contracts and building registries',
    ],
    steps: [
      {
        title: 'Share Target Cities & Property Criteria',
        desc: 'Send your shortlist, budget range, and desired dates in Tokyo, Osaka, Kyoto, or Hokkaido.',
      },
      {
        title: 'Confirm Viewing Appointments',
        desc: 'We align property access times with local brokers and map the fastest vehicle route.',
      },
      {
        title: 'Inspect & Review With Clarity',
        desc: 'Tour each property in person with live translation and structured notes.',
      },
    ],
    faqs: [
      {
        q: 'Can foreigners buy freehold property in Japan?',
        a: 'Yes, foreign nationals can purchase land and buildings in Japan without residency restrictions, though cash purchases are typical for non-residents.',
      },
      {
        q: 'Can I send listings I already found online for you to schedule?',
        a: 'Yes — share your links from Suumo, Homes, or broker PDFs and we coordinate viewing permissions and translation.',
      },
      {
        q: 'Do you also translate purchase agreements or management disclosures?',
        a: 'Yes, our certified Document Translation desk can translate key contracts, floor plans, and registry excerpts.',
      },
    ],
    relatedSlugs: ['document-translation', 'car-bus-rental', 'private-japan-tour', 'japan-golf-tour'],
    waText: 'Hello Tanogaido, I would like to arrange a Japan Property Survey Tour.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 15,
  },
  {
    slug: 'japan-collectibles-hunting',
    title: 'Japan Collectibles Hunting Tour',
    category: 'specialty',
    categoryLabel: 'Specialty & Golf',
    kicker: 'AKIHABARA · NAKANO',
    shortDesc:
      'Dedicated collector tour targeting rare vintage watches, luxury items, anime figures, TCG & boutique drops.',
    imagePath: '/assets/cards/card-3.jpg',
    heroImagePath: '/assets/cards/card-3.jpg',
    heroImageAlt:
      'Curated Tokyo collectible shopping district covered during Tanogaido Japan collectibles hunting tours',
    detailImagePath: '/assets/tokyo-pulse.jpg',
    detailImageAlt:
      'Vibrant Akihabara and Tokyo collector streets explored with a Tanogaido bilingual hunting host',
    features: [
      'Guided routes across Akihabara, Nakano & Ginza',
      'Price negotiation & tax-free paperwork support',
      'Safe packing & insured shipping coordination home',
    ],
    seoTitle: 'Japan Collectibles Hunting Tour — Watches, Anime & TCG | Tanogaido',
    metaDescription:
      'Join a guided Japan collectibles hunting tour across Akihabara, Nakano Broadway, Ginza, and Shimokitazawa for vintage watches, figures, cards, and luxury drops.',
    keywords:
      'Japan collectibles hunting tour, Akihabara anime figure tour, Nakano Broadway watch tour, Tokyo vintage Rolex hunt, Pokemon card hunting Japan',
    eyebrow: 'COLLECTORS · AKIHABARA, NAKANO & GINZA',
    h1Lead: 'Track Down Rare Gems.',
    h1Accent: 'Collect With Confidence.',
    heroDesc:
      'Navigate Akihabara, Nakano Broadway, Ginza watch boutiques, and Harajuku consignment vaults with an insider bilingual host who knows where rare pieces surface.',
    stats: [
      { val: 'Targeted', label: 'Watches, TCG, Figures & Vintage' },
      { val: 'Tax-Free', label: 'Duty-Free & Condition Checks' },
      { val: 'Ship Home', label: 'Insured Cargo Option Available' },
    ],
    highlights: [
      {
        title: 'Deep Specialty Store Mapping',
        desc: 'Hit hidden multi-floor vaults in Nakano Broadway, Akihabara, Shibuya, and Osaka Den Den Town.',
      },
      {
        title: 'Condition & Authenticity Dialogue',
        desc: 'Communicate directly in Japanese regarding watch service history, card grading, or box completeness.',
      },
      {
        title: 'Negotiation & Tax-Free Support',
        desc: 'Handle tax-free passport steps, payment limits, and multi-store price comparisons effortlessly.',
      },
      {
        title: 'Safe Packing & Air Cargo Handoff',
        desc: 'Found oversized statues or bulk boxes? Send them straight home via our insured Japan Import Service.',
      },
    ],
    overviewTitle: 'Stop Wandering Random Floors — Hunt Smarter in Tokyo & Osaka',
    overviewText:
      'Japan is the world’s capital for vintage Swiss watches, Pokemon & One Piece TCG, rare sneakers, retro consoles, designer archive fashion, and anime figures — yet the best stock hides in unmarked upstairs shops. Our collector guides map your wish list straight to the right counters.',
    included: [
      'Custom half-day or full-day collector route tailored to your target items',
      'Bilingual host translating store staff questions, condition grades & warranties',
      'Guidance on Japanese tax-free checkout & shipping regulations',
      'Optional private car standby for high-value watch or large box hauls',
      'Seamless handoff to Tanogaido Cargo Import for insured home shipping',
    ],
    steps: [
      {
        title: 'Send Your Grail Wish List',
        desc: 'Tell us whether you are hunting vintage watches, graded TCG slabs, statues, or luxury bags.',
      },
      {
        title: 'Get a Targeted District Route',
        desc: 'We map top specialty dealers and consignment shops in Tokyo or Osaka.',
      },
      {
        title: 'Hunt, Inspect & Ship Safely',
        desc: 'Inspect items thoroughly in Japanese and arrange insured shipping if needed.',
      },
    ],
    faqs: [
      {
        q: 'What collectible categories do your guides specialize in?',
        a: 'Vintage & pre-owned luxury watches, designer archive/bags, Pokemon/One Piece TCG, Bandai/Hot Toys figures, vinyl, cameras, and retro gaming.',
      },
      {
        q: 'Can you buy and ship items for me if I am not flying to Japan?',
        a: 'Yes! Use our Japan Personal Shopper (Jastip) + Cargo Import services and we will hunt and ship directly to you.',
      },
      {
        q: 'Can we use a private car during a high-value watch or large statue hunt?',
        a: 'Yes, pairing this tour with a private Alphard keeps your purchases secure between districts.',
      },
    ],
    relatedSlugs: ['japan-personal-shopper', 'japan-import-service', 'car-bus-rental', 'japan-tour-guide'],
    waText: 'Hello Tanogaido, I would like to book a Japan Collectibles Hunting Tour.',
    showOnHome: false,
    homeSortOrder: 99,
    sortOrder: 16,
  },
  {
    slug: 'pocket-wifi-rental',
    title: 'Japan Pocket WiFi Rental',
    category: 'essentials',
    categoryLabel: 'Shopping & Essentials',
    kicker: '4G / 5G · 5 DEVICES',
    shortDesc:
      'True unlimited high-speed Japanese pocket WiFi and travel eSIM ready upon arrival at major airports.',
    imagePath: '/assets/cards/card-7.jpg',
    heroImagePath: '/assets/products/pocket-wifi.jpg',
    heroImageAlt: 'Tanogaido unlimited 4G/5G Japan Pocket WiFi router with travel pouch and charging cable',
    detailImagePath: '/assets/cards/card-7.jpg',
    detailImageAlt:
      'Seamless high-speed Japanese mobile connectivity for maps, translation, and trip sharing',
    features: [
      'Unlimited nationwide 4G/5G multi-carrier data',
      'Connect up to 5 phones, tablets, or laptops',
      'Convenient airport counter pickup or delivery',
    ],
    seoTitle: 'Japan Pocket WiFi Rental — Unlimited 4G/5G Internet | Tanogaido',
    metaDescription:
      'Rent unlimited high-speed 4G/5G Japan Pocket WiFi connecting up to 5 devices across Tokyo, Kyoto, Osaka, and Hokkaido with easy airport pickup.',
    keywords:
      'Japan pocket WiFi rental, unlimited Japan WiFi, Haneda Narita pocket WiFi pickup, Japan travel internet, 5G pocket WiFi Japan',
    eyebrow: 'UNLIMITED 4G / 5G · UP TO 5 DEVICES',
    h1Lead: 'Fast Unlimited Data.',
    h1Accent: 'Everywhere In Japan.',
    heroDesc:
      'Stay connected across bullet trains, alpine valleys, and neon city streets with true unlimited Japanese 4G/5G Pocket WiFi supporting up to 5 devices simultaneously.',
    stats: [
      { val: 'Unlimited', label: 'High-Speed Multi-Carrier Data' },
      { val: '5 Devices', label: 'Phones, Tablets & Laptops' },
      { val: 'Easy Return', label: 'Airport Counter or Drop Box' },
    ],
    highlights: [
      {
        title: 'True Unlimited Nationwide Coverage',
        desc: 'Run Google Maps, live video calls, social uploads, and Hyperdia checks without sudden throttling.',
      },
      {
        title: 'Share Across 5 Devices',
        desc: 'Ideal for couples, families, and small groups — one compact router keeps everyone online.',
      },
      {
        title: 'Zero SIM Swapping Hassle',
        desc: 'Keep your home SIM active for bank OTPs and emergency calls while browsing over WiFi.',
      },
      {
        title: 'Airport & Hotel Delivery Options',
        desc: 'Collect upon landing at Haneda, Narita, or Kansai or have it waiting at your hotel front desk.',
      },
    ],
    overviewTitle: 'Dependable Japanese Internet From Touchdown to Boarding',
    overviewText:
      'Modern Japan travel relies on instant internet — from QR attraction passes and Visit Japan Web immigration codes to live train schedules and translation apps. Our Pocket WiFi kits arrive fully charged with USB cables and simple drop-off return instructions.',
    included: [
      'Unlimited 4G/5G Japanese multi-carrier Pocket WiFi router',
      'Protective travel pouch, USB charging cable, and power adapter',
      'Simultaneous encrypted connection for up to 5 devices',
      'Flexible airport pickup, hotel delivery, or pre-departure dispatch',
      'Prepaid return envelope or airport drop-box return on departure',
    ],
    steps: [
      {
        title: 'Share Your Arrival & Return Dates',
        desc: 'Send your landing airport and trip duration via WhatsApp.',
      },
      {
        title: 'Choose Pickup or Delivery',
        desc: 'Collect at major Japanese airports, your first hotel, or pre-trip.',
      },
      {
        title: 'Power On & Connect Instantly',
        desc: 'Scan the SSID password on the screen and enjoy fast data all trip long.',
      },
    ],
    faqs: [
      {
        q: 'How long does the Pocket WiFi battery last per charge?',
        a: 'Typical continuous battery life is 10 to 12 hours; we recommend carrying a compact power bank for heavy full-day navigation.',
      },
      {
        q: 'Does it work on the Shinkansen and in Hokkaido or Mt. Fuji?',
        a: 'Yes, it connects to Japan’s major nationwide networks across cities, rural rail corridors, and resort areas.',
      },
      {
        q: 'Can I also buy a Pocket WiFi unit or travel accessories in your shop?',
        a: 'Yes! Visit our Tanogaido Shop for curated travel gear and Pocket WiFi options.',
      },
    ],
    relatedSlugs: ['online-tour-guide', 'jr-pass-tickets', 'attraction-theme-park-tickets', 'japan-visa-processing'],
    waText: 'Hello Tanogaido, I would like to rent a Japan Pocket WiFi for my trip.',
    showOnHome: true,
    homeSortOrder: 5,
    sortOrder: 17,
    homeCategory: 'visa-wifi',
    homeCardTitle: 'Pocket WiFi Rental',
    homeCardTag: '4G LTE · 5 Devices',
    homeCardKicker: '4G LTE · 5 DEVICES',
    homeCardShort: 'Unlimited 4G LTE pocket WiFi & eSIMs.',
    homeCardImage: '/assets/cards/card-7.jpg',
    homeCardSubtitle:
      'Reliable unlimited Japanese 4G LTE pocket WiFi and travel eSIM ready from touchdown.',
    homeCardFeatures: [
      'True unlimited nationwide high-speed data',
      'Connect up to 5 devices securely',
      'Airport pickup or doorstep delivery',
    ],
  },
  {
    slug: 'japan-personal-shopper',
    title: 'Japan Personal Shopper (Jastip)',
    category: 'essentials',
    categoryLabel: 'Shopping & Essentials',
    kicker: 'TOKYO PICKS · ORIGINAL',
    shortDesc:
      'On-demand boutique shopping in Tokyo for limited sneakers, luxury bags, ceremonial matcha, and skincare.',
    imagePath: '/assets/cards/card-3.jpg',
    heroImagePath: '/assets/cards/card-3.jpg',
    heroImageAlt:
      'Curated Japanese retail bags and boutique goods sourced by Tanogaido Japan Personal Shopper',
    detailImagePath: '/assets/products/shop-hero.jpg',
    detailImageAlt:
      'Artisan Japanese ceramics, tea tins, and lifestyle goods available via Tanogaido shopping concierge',
    features: [
      'Direct store purchase with official boutique receipts',
      'Live video confirmation from Tokyo & Kyoto shops',
      'Curated snack, beauty & limited edition drops',
    ],
    seoTitle: 'Japan Personal Shopper (Jastip) — Authentic Tokyo Finds | Tanogaido',
    metaDescription:
      'Order authentic Japanese snacks, ceremonial Uji matcha, skincare, sneakers, luxury goods, and limited editions with Tanogaido Personal Shopper (Jastip).',
    keywords:
      'Japan personal shopper, jastip Japan, buy from Japan proxy, Tokyo personal shopper, Japanese matcha cosmetics proxy, Tanogaido jastip',
    eyebrow: 'TOKYO PICKS · 100% AUTHENTIC',
    h1Lead: 'Authentic Japan Finds.',
    h1Accent: 'Shopped Live For You.',
    heroDesc:
      'From ceremonial Uji matcha and Ginza skincare to limited-edition sneakers, stationery, and department-store exclusives — our Tokyo team buys directly in-store with receipts.',
    stats: [
      { val: '100%', label: 'Official Store Receipts' },
      { val: 'Live Video', label: 'Real-Time Store Confirmation' },
      { val: 'Air Cargo', label: 'Fast Weekly Home Delivery' },
    ],
    highlights: [
      {
        title: 'Direct Boutique & Department Store Access',
        desc: 'We shop in person at Isetan, Mitsukoshi, Ginza Six, Shibuya, Uji tea houses, and flagship outlets.',
      },
      {
        title: 'Live Photo & Video Verification',
        desc: 'Verify sizes, colors, shades, and freshness dates directly on WhatsApp at the counter.',
      },
      {
        title: 'No Japanese Card or Address Required',
        desc: 'Overcome Japan-only online checkouts and domestic shipping restrictions effortlessly.',
      },
      {
        title: 'Seamless Consolidation & Shipping',
        desc: 'Combine multiple store purchases into one protective air-cargo parcel straight to your door.',
      },
    ],
    overviewTitle: 'Your Trusted Personal Buyer on the Ground in Japan',
    overviewText:
      'Whether you are craving seasonal Tokyo Banana & KitKat editions, luxury watches, Shiseido/SK-II sets, Snow Peak gear, or boutique Japanese ceramics, our Personal Shopper (Jastip) desk sources authentic items directly in Japan and handles careful export packing.',
    included: [
      'Dedicated personal shopper visiting physical & official online stores in Japan',
      'Live price quote in transparent breakdown before purchase',
      'Photo/video verification with original store receipts',
      'Protective bubble-wrap repacking for fragile glass or tea tins',
      'Door-to-door air cargo delivery with customs handling',
    ],
    steps: [
      {
        title: 'Send Links, Photos, or Item Names',
        desc: 'Message us the exact products, sizes, or flavors you want from Japan.',
      },
      {
        title: 'Approve Transparent Purchase Quote',
        desc: 'Review item cost, shopper fee, and estimated shipping weight upfront.',
      },
      {
        title: 'Shopped & Shipped to Your Door',
        desc: 'Receive live purchase photos and tracking right until delivery.',
      },
    ],
    faqs: [
      {
        q: 'Can you purchase from Japan-only websites like Mercari, Rakuten, or Amazon JP?',
        a: 'Yes! We process both physical store runs in Tokyo/Kyoto and domestic Japanese online marketplace orders.',
      },
      {
        q: 'How do I know items are 100% genuine?',
        a: 'We purchase strictly from authorized Japanese boutiques and department stores and share live video/receipt proofs.',
      },
      {
        q: 'Can I browse ready-to-order Japanese crafts right now?',
        a: 'Yes, check our curated Tanogaido Shop for Uji matcha, Imabari towels, Edo Kiriko glassware, and more.',
      },
    ],
    relatedSlugs: ['japan-import-service', 'japan-collectibles-hunting', 'pocket-wifi-rental', 'japan-tour-packages'],
    waText: 'Hello Tanogaido, I would like to use the Japan Personal Shopper (Jastip) service.',
    showOnHome: true,
    homeSortOrder: 9,
    sortOrder: 18,
    homeCategory: 'shopping',
    homeCardTitle: 'Japan Personal Shopper',
    homeCardTag: 'Tokyo Picks · Original',
    homeCardKicker: 'TOKYO PICKS · ORIGINAL',
    homeCardShort: 'Limited sneakers, luxury goods & matcha.',
    homeCardImage: '/assets/cards/card-3.jpg',
    homeCardSubtitle:
      'Shop limited fashion, sneakers, skincare, snacks, and collectibles directly from Tokyo.',
    homeCardFeatures: [
      'Sneakers, luxury boutiques & streetwear',
      'Matcha, skincare & Pokémon Center',
      '100% genuine store receipts included',
    ],
  },
  {
    slug: 'japan-import-service',
    title: 'Japan Goods Import Service',
    category: 'essentials',
    categoryLabel: 'Shopping & Essentials',
    kicker: 'AIR & SEA · INSURED',
    shortDesc:
      'Door-to-door air and sea cargo shipping from Japan to Indonesia with customs handling and tracking.',
    imagePath: '/assets/cards/japan-cargo.jpg',
    heroImagePath: '/assets/cards/japan-cargo.jpg',
    heroImageAlt:
      'Securely packed export boxes and cargo logistics managed by Tanogaido Japan Goods Import Service',
    detailImagePath: '/assets/cards/japan-van.jpg',
    detailImageAlt:
      'Dedicated pickup and logistics transport supporting Tanogaido Japan cargo consolidation',
    features: [
      'Fast weekly air cargo & sea consolidation options',
      'Pickup, protective repacking & customs clearance',
      'Transparent per-kilogram shipping quotes',
    ],
    seoTitle: 'Japan Goods Import Service — Air & Sea Cargo Shipping | Tanogaido',
    metaDescription:
      'Reliable door-to-door Japan goods import service with weekly air cargo, sea consolidation, warehouse pickup, repacking, and customs clearance.',
    keywords:
      'Japan goods import service, ship from Japan to Indonesia, Japan air cargo service, Japan sea cargo forwarder, Tanogaido cargo Japan',
    eyebrow: 'LOGISTICS & CARGO · AIR & SEA',
    h1Lead: 'Ship From Japan',
    h1Accent: 'Door-To-Door Safely.',
    heroDesc:
      'Move commercial stock, personal shopping boxes, oversized luggage, or factory components from Japan to Indonesia with weekly air cargo, sea freight, and full customs care.',
    stats: [
      { val: 'Weekly', label: 'Scheduled Air Cargo Flights' },
      { val: 'Air & Sea', label: 'Flexible Speed & Bulk Rates' },
      { val: 'All-In', label: 'Customs & Door Delivery' },
    ],
    highlights: [
      {
        title: 'Weekly Express Air & Sea Consolidation',
        desc: 'Choose fast 7–10 day air cargo for urgent orders or cost-effective sea freight for heavy volume.',
      },
      {
        title: 'Japan Warehouse Receiving Address',
        desc: 'Send parcels from Japanese suppliers or online stores straight to our Tokyo warehouse.',
      },
      {
        title: 'Protective Repacking & Fragile Care',
        desc: 'We consolidate multiple small cartons, reduce volumetric bulk, and pad delicate ceramics or machinery.',
      },
      {
        title: 'Transparent All-In Per-Kg Quotes',
        desc: 'Clear customs-cleared pricing with no surprise port clearance headaches upon arrival.',
      },
    ],
    overviewTitle: 'End-to-End Japan Logistics for Businesses & Travelers',
    overviewText:
      'Importing goods from Japan independently often stalls at Japanese export paperwork, courier limits, or destination customs clearance. PT. Tanogaido Fantasi Pratama runs an established Japan-to-Indonesia cargo pipeline handling everything from 2 kg personal parcels to bulk commercial stock.',
    included: [
      'Dedicated Japan receiving warehouse for supplier or marketplace deliveries',
      'Inspection, weight consolidation, and protective export repacking',
      'Weekly air freight or scheduled sea cargo departures',
      'Complete export & destination customs clearance handling',
      'Final-mile delivery tracking right to your home or warehouse',
    ],
    steps: [
      {
        title: 'Share Cargo Specs & Estimated Weight',
        desc: 'Tell us your item category, dimensions/weight, and air vs. sea preference.',
      },
      {
        title: 'Send or Schedule Japan Pickup',
        desc: 'Ship to our Japan warehouse or arrange direct Tokyo pickup for bulk cartons.',
      },
      {
        title: 'Track Until Doorstep Delivery',
        desc: 'Receive weight confirmation, departure updates, and smooth home delivery.',
      },
    ],
    faqs: [
      {
        q: 'What is the minimum weight for Japan air cargo?',
        a: 'Even small 1–2 kg shipments can be processed cleanly; contact our logistics desk for current minimum rates.',
      },
      {
        q: 'Can travelers send excess shopping luggage home mid-trip?',
        a: 'Yes! Drop boxes at our Tokyo warehouse or schedule hotel pickup so you can travel light around the rest of Japan.',
      },
      {
        q: 'Are restricted items or batteries allowed?',
        a: 'Certain batteries, aerosols, and regulated items follow strict IATA air rules — send us your item list upfront so we advise safe shipping modes.',
      },
    ],
    relatedSlugs: ['japan-personal-shopper', 'japan-collectibles-hunting', 'document-translation', 'car-bus-rental'],
    waText: 'Hello Tanogaido, I would like a shipping quote for the Japan Goods Import Service.',
    showOnHome: true,
    homeSortOrder: 10,
    sortOrder: 19,
    homeCategory: 'shopping',
    homeCardTitle: 'Japan Cargo & Import',
    homeCardTag: 'Air & Sea · Insured',
    homeCardKicker: 'AIR & SEA · INSURED',
    homeCardShort: 'Door-to-door air & sea shipping from Japan.',
    homeCardImage: '/assets/cards/japan-cargo.jpg',
    homeCardSubtitle:
      'Reliable door-to-door air and sea freight from Japan with smooth customs handling.',
    homeCardFeatures: [
      'Fast air freight & sea consolidation',
      'Pickup, safe repacking & customs clearance',
      'Transparent per-kg shipping rates',
    ],
  },
  {
    slug: 'document-translation',
    title: 'Document Translation',
    category: 'essentials',
    categoryLabel: 'Shopping & Essentials',
    kicker: 'CERTIFIED · JP-ID-EN',
    shortDesc:
      'Certified Japanese, Indonesian, and English document translation for visa, academic, and corporate needs.',
    imagePath: '/assets/tea-ceremony.jpg',
    heroImagePath: '/assets/tea-ceremony.jpg',
    heroImageAlt:
      'Refined Japanese craftsmanship symbolizing precision in Tanogaido certified document translation',
    detailImagePath: '/assets/cards/japan-documents.jpg',
    detailImageAlt:
      'Official stamped legal and visa certificates prepared by Tanogaido certified translators',
    features: [
      'Sworn legal, academic & civil certificate formatting',
      'Native Japanese & Indonesian editorial QA review',
      'Hardcopy stamp delivery & encrypted PDF files',
    ],
    seoTitle: 'Document Translation — Certified JP, EN & ID | Tanogaido',
    metaDescription:
      'Certified Japanese, Indonesian, and English document translation for visas, diplomas, birth certificates, contracts, and business records.',
    keywords:
      'Japanese document translation, certified Indonesian Japanese translator, visa document translation, legal translation Japan, Tanogaido translation',
    eyebrow: 'CERTIFIED TRANSLATION · JP · ID · EN',
    h1Lead: 'Sworn & Certified',
    h1Accent: 'Document Translation.',
    heroDesc:
      'Accurate, embassy-ready translations across Japanese, English, and Indonesian for academic transcripts, civil certificates, property deeds, and corporate contracts.',
    stats: [
      { val: 'JP · ID · EN', label: 'Bidirectional Language Pairs' },
      { val: 'Sworn QA', label: 'Embassy & University Ready' },
      { val: 'PDF + Hard', label: 'Digital & Stamped Delivery' },
    ],
    highlights: [
      {
        title: 'Sworn & Embassy-Accepted Formatting',
        desc: 'Formatted specifically to meet Japanese Embassy, MEXT, university, and Schengen visa standards.',
      },
      {
        title: 'Native Bilingual QA Review',
        desc: 'Every page undergoes dual review for exact terminology, dates, seals, and proper name romanization.',
      },
      {
        title: 'Personal, Academic & Legal Scope',
        desc: 'From birth/marriage certificates and diplomas to commercial contracts and real estate registries.',
      },
      {
        title: 'Strict Confidentiality & Fast Turnaround',
        desc: 'Encrypted PDF delivery for immediate online uploads plus couriered stamped hardcopies.',
      },
    ],
    overviewTitle: 'Precision Language Conversion You Can Submit With Confidence',
    overviewText:
      'Whether you are applying for a Japanese work/study visa, enrolling at a university in Tokyo, submitting Schengen civil records, or reviewing a Japanese real estate contract, mistranslated terminology can derail approvals. Our certified translators ensure every seal and clause is exact.',
    included: [
      'Certified translation between Japanese, Indonesian, and English',
      'Mirror layout preservation matching original certificates and tables',
      'Official translator certification stamp and signature where required',
      'Encrypted high-resolution PDF plus optional hardcopy courier dispatch',
      'Express turnaround options for urgent embassy or court deadlines',
    ],
    steps: [
      {
        title: 'Send Clear Scans via WhatsApp or Email',
        desc: 'Share photos or PDFs of the pages needing translation and your target language pair.',
      },
      {
        title: 'Receive Instant Page Quote & Timeline',
        desc: 'Get transparent per-page pricing and exact completion date before we begin.',
      },
      {
        title: 'Receive Certified Digital & Stamped Files',
        desc: 'Download ready-to-submit PDFs and receive signed hardcopies if required.',
      },
    ],
    faqs: [
      {
        q: 'Which document types do you translate most often?',
        a: 'Birth certificates, family registers (KK/Koseki), marriage certificates, academic diplomas/transcripts, employment letters, bank records, and business contracts.',
      },
      {
        q: 'How long does translation typically take?',
        a: 'Standard civil documents take 2 to 3 working days; express 24-hour turnaround is available for urgent visa deadlines.',
      },
      {
        q: 'Can you bundle translation directly with Japan or Schengen visa filing?',
        a: 'Yes! Our visa and translation teams work side by side so your translated records go straight into your visa dossier.',
      },
    ],
    relatedSlugs: ['japan-visa-processing', 'europe-schengen-visa', 'japan-property-survey', 'japan-import-service'],
    waText: 'Hello Tanogaido, I need Certified Document Translation service.',
    showOnHome: true,
    homeSortOrder: 12,
    sortOrder: 20,
    homeCategory: 'shopping',
    homeCardTitle: 'Document Translation',
    homeCardTag: 'Certified · Sworn',
    homeCardKicker: 'CERTIFIED · SWORN',
    homeCardShort: 'Certified Japanese legal & visa translation.',
    homeCardImage: '/assets/cards/card-1.jpg',
    homeCardSubtitle:
      'Accurate certified Japanese translation for visa, academic, legal, and corporate files.',
    homeCardFeatures: [
      'Certificates, transcripts & family registries',
      'Business contracts & legal paperwork',
      'Fast turnaround with strict privacy',
    ],
  },
];

export const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    slug: 'uji-matcha',
    title: 'Uji Ceremonial Matcha Tin Set',
    origin: 'Kyoto',
    categoryLabel: 'Tea Craft',
    category: 'tea',
    status: 'Limited Harvest',
    rating: '4.9',
    reviewCount: 42,
    price: 48,
    priceJpy: '¥7,200',
    imagePath: '/assets/products/uji-matcha.jpg',
    gallery: [
      { src: '/assets/products/uji-matcha.jpg', label: 'Studio Set' },
      { src: '/assets/products/shop-hero.jpg', label: 'Table Collection' },
    ],
    shortDesc:
      'First-harvest stone-milled ceremonial matcha in matte crimson lacquer canister with 80-prong bamboo whisk.',
    craftStory:
      'Shade-grown for twenty-four days along the Uji River mist slopes, these tender first-flush leaves are granite stone-milled in small batches for natural umami sweetness and vivid emerald crema.',
    variants: ['40g Canister + Whisk', '80g Refill Pouch'],
    specs: [
      'Single-cultivar Samidori leaves harvested in Uji, Kyoto',
      'Airtight matte crimson lacquer tin preserves vivid aroma',
      'Paired with hand-carved 80-prong Takayama bamboo whisk',
      'Ships sealed in protective paulownia & cotton sleeve',
    ],
    shippingNote: 'Dispatched from Kyoto/Tokyo within 48 hours · Cold-chain sealed pack',
    featured: true,
    sortOrder: 1,
  },
  {
    slug: 'kyoto-tumbler',
    title: 'Kiyomizu-yaki Ceramic Tea Tumbler',
    origin: 'Kyoto',
    categoryLabel: 'Ceramics',
    category: 'tea',
    status: 'Hand-Thrown',
    rating: '4.9',
    reviewCount: 38,
    price: 64,
    priceJpy: '¥9,600',
    imagePath: '/assets/products/kyoto-tumbler.jpg',
    gallery: [
      { src: '/assets/products/kyoto-tumbler.jpg', label: 'Front Profile' },
      { src: '/assets/products/shop-hero.jpg', label: 'Atelier Pairing' },
    ],
    shortDesc:
      'Wheel-thrown speckled stoneware tea cup finished with warm vermilion rim by fifth-generation Kyoto potters.',
    craftStory:
      'Each tumbler is shaped by hand on a potter’s wheel in Higashiyama using iron-speckled Shigaraki clay, then dipped in warm milk-white ash glaze with a fine vermilion kiln-fired rim.',
    variants: ['Speckled Warm White', 'Moss Ash Glaze'],
    specs: [
      'Handcrafted in Higashiyama family kiln workshop, Kyoto',
      '240ml balanced capacity · Double-walled tactile base',
      'Signed artisan paulownia wood presentation box included',
      'Lead-free natural ash glaze · Subtle unique speckles',
    ],
    shippingNote: 'Double-boxed in custom impact-cushioned Kyoto crate',
    featured: true,
    sortOrder: 2,
  },
  {
    slug: 'hakone-folio',
    title: 'Hakone Yosegi Passport & JR Folio',
    origin: 'Hakone',
    categoryLabel: 'Travel Goods',
    category: 'travel',
    status: 'In Stock',
    rating: '5.0',
    reviewCount: 54,
    price: 92,
    priceJpy: '¥13,800',
    imagePath: '/assets/products/hakone-folio.jpg',
    gallery: [
      { src: '/assets/products/hakone-folio.jpg', label: 'Travel Set' },
      { src: '/assets/products/shop-hero.jpg', label: 'Detail Scene' },
    ],
    shortDesc:
      'Full-grain charcoal calfskin passport sleeve and luggage tag featuring hand-inlaid Hakone geometric wood marquetry.',
    craftStory:
      'Combining supple vegetable-tanned charcoal leather with Edo-era Yosegi-zaiku parquetry crafted from natural walnut, cherry, and magnolia woods in Hakone.',
    variants: ['Charcoal + Yosegi Set', 'Passport Folio Only'],
    specs: [
      'Dedicated JR Rail Pass, Suica & boarding card sleeves',
      'Authentic hand-inlaid Hakone geometric wood marquetry',
      'Solid brushed brass buckle & privacy-flap luggage tag',
      'Slim silhouette tailored cleanly for coat or sling pockets',
    ],
    shippingNote: 'Ready for Tokyo hotel desk drop or international express',
    featured: true,
    sortOrder: 3,
  },
  {
    slug: 'fuji-bottle',
    title: 'Mt. Fuji Titanium Thermo Bottle',
    origin: 'Tokyo',
    categoryLabel: 'Rail Gear',
    category: 'travel',
    status: '500ml Light',
    rating: '4.8',
    reviewCount: 61,
    price: 58,
    priceJpy: '¥8,700',
    imagePath: '/assets/products/fuji-bottle.jpg',
    gallery: [
      { src: '/assets/products/fuji-bottle.jpg', label: 'Crimson Matte' },
      { src: '/assets/products/shop-hero.jpg', label: 'Collection View' },
    ],
    shortDesc:
      'Featherweight double-wall insulated bottle finished in matte Tanogaido crimson engineered for Shinkansen day trips.',
    craftStory:
      'Precision-spun from Japanese aerospace-grade titanium in Niigata for zero metallic aftertaste and ultra-low 195g carry weight across long temple walks.',
    variants: ['500ml Crimson Matte', '350ml Brushed Silver'],
    specs: [
      '18 hours piping hot / 24 hours crisp cold vacuum seal',
      'Ultra-lightweight 195g body for all-day Tokyo walking',
      'Sized for standard Tokaido Shinkansen cup holders',
      'Scratch-resistant matte powder coat finish',
    ],
    shippingNote: 'Ships worldwide via insured DHL air parcel',
    featured: true,
    sortOrder: 4,
  },
  {
    slug: 'hinoki-mist',
    title: 'Kyoto Hinoki & Yuzu Room Mist',
    origin: 'Kyoto',
    categoryLabel: 'Fragrance',
    category: 'home',
    status: '100ml Glass',
    rating: '4.9',
    reviewCount: 29,
    price: 42,
    priceJpy: '¥6,300',
    imagePath: '/assets/products/hinoki-mist.jpg',
    gallery: [
      { src: '/assets/products/hinoki-mist.jpg', label: '100ml Apothecary' },
      { src: '/assets/products/shop-hero.jpg', label: 'Tabletop Scene' },
    ],
    shortDesc:
      'Essential oil botanical spray blending aromatic Japanese cypress timber with cold-pressed Kochi yuzu peel.',
    craftStory:
      'Steam-distilled from sustainably pruned northern Kyoto hinoki cypress groves and layered with bright winter yuzu zest for an unmistakable onsen sanctuary atmosphere.',
    variants: ['100ml Smoked Amber', '200ml Refill Bottle'],
    specs: [
      '100% pure steam-distilled Kyoto cypress wood essential oil',
      'UV-shielded frosted amber apothecary spray bottle',
      'Notes: Rain-soaked cedarwood, sun-warmed hinoki, yuzu zest',
      'Zero synthetic parabens or artificial fixatives',
    ],
    shippingNote: 'Sealed leak-proof air freight packaging',
    featured: false,
    sortOrder: 5,
  },
  {
    slug: 'edo-glass',
    title: 'Edo Kiriko Crimson Sake Carafe',
    origin: 'Tokyo',
    categoryLabel: 'Glassware',
    category: 'craft',
    status: 'Signed Edition',
    rating: '5.0',
    reviewCount: 19,
    price: 118,
    priceJpy: '¥17,700',
    imagePath: '/assets/products/edo-glass.jpg',
    gallery: [
      { src: '/assets/products/edo-glass.jpg', label: 'Carafe & Cup' },
      { src: '/assets/products/shop-hero.jpg', label: 'Atelier Pairing' },
    ],
    shortDesc:
      'Mouth-blown lead crystal carafe and tasting cup hand-faceted with crisp Edo diamond geometric cuts.',
    craftStory:
      'Master cutters in Sumida ward incise razor-crisp Yarai diamond patterns through deep ruby-cased crystal glass so ambient light refracts like lanterns along the Sumida River.',
    variants: ['Carafe + 1 Ochoko Cup', 'Gift Set + 2 Cups'],
    specs: [
      'Mouth-blown and hand-faceted in Sumida ward, Tokyo',
      'Signature deep ruby crystal overlay with clear facets',
      'Presented in cushioned paulownia heirloom storage box',
      'Includes signed Tokyo artisan certificate of origin',
    ],
    shippingNote: 'Museum-grade foam-suspended wooden box delivery',
    featured: false,
    sortOrder: 6,
  },
  {
    slug: 'imabari-towel',
    title: 'Imabari Organic Travel Towel Duo',
    origin: 'Ehime',
    categoryLabel: 'Textile',
    category: 'craft',
    status: '100% Cotton',
    rating: '4.8',
    reviewCount: 34,
    price: 54,
    priceJpy: '¥8,100',
    imagePath: '/assets/products/imabari-towel.jpg',
    gallery: [
      { src: '/assets/products/imabari-towel.jpg', label: 'Waffle Duo' },
      { src: '/assets/products/shop-hero.jpg', label: 'Collection View' },
    ],
    shortDesc:
      'Breathable honeycomb-weave waffle cotton towels certified by the Shikoku Imabari Towel Guild.',
    craftStory:
      'Woven with mineral-soft Mount Ishizuchi snowmelt spring water in Ehime Prefecture, delivering Cloud-soft loft that packs flat inside carry-on luggage.',
    variants: ['Off-White & Charcoal Duo', 'Crimson & Chalk Duo'],
    specs: [
      'Pure long-staple unbleached organic Japanese cotton',
      'Ultra-compact waffle weave dries rapidly overnight',
      'Certified official Imabari 5-second absorbency mark',
      'Set includes 1 bath travel sheet + 1 hand towel',
    ],
    shippingNote: 'Ready to ship globally within 48 hours',
    featured: false,
    sortOrder: 7,
  },
  {
    slug: 'pocket-wifi',
    title: 'Tanogaido Unlimited 5G WiFi Kit',
    origin: 'Nationwide',
    categoryLabel: 'Connectivity',
    category: 'travel',
    status: '7-Day Pass',
    rating: '4.9',
    reviewCount: 118,
    price: 38,
    priceJpy: '¥5,700',
    imagePath: '/assets/products/pocket-wifi.jpg',
    gallery: [
      { src: '/assets/products/pocket-wifi.jpg', label: 'Device & Pouch' },
      { src: '/assets/products/shop-hero.jpg', label: 'Travel Setup' },
    ],
    shortDesc:
      'Pocket-sized unlimited data hotspot ready at Haneda, Narita, or Kansai airport arrival counters.',
    craftStory:
      'Zero throttling and multi-carrier switching across Docomo and SoftBank towers ensure uninterrupted Google Maps, Shinkansen seat booking, and crystal-clear video calls from Hokkaido to Okinawa.',
    variants: ['7-Day Unlimited Pass', '14-Day Unlimited Pass'],
    specs: [
      'Connect up to 5 smartphones, tablets, or laptops',
      'True unlimited 4G/5G coverage across Japan mountains & rail',
      '14-hour battery endurance + braided USB-C cable included',
      'Pre-paid airport return envelope & Tokyo hotel pickup',
    ],
    shippingNote: 'Airport counter pickup (HND/NRT/KIX) or Tokyo hotel drop',
    featured: false,
    sortOrder: 8,
  },
];

export const FALLBACK_TRIPS: TripItem[] = [
  {
    slug: 'golden-route-7-days',
    title: 'Golden Route: Tokyo, Mt. Fuji & Kyoto',
    daysLabel: '7 Days',
    locationLabel: 'Tokyo · Kyoto',
    priceFrom: '$1,450',
    shortDesc:
      'Explore Shibuya skylines, Lake Kawaguchiko vistas, historic Fushimi Inari, and Dotonbori food streets.',
    imagePath: '/assets/fuji-climb.jpg',
    waText: 'Hello Tanogaido, I am interested in the 7-Day Golden Route Japan Trip.',
    sortOrder: 1,
  },
  {
    slug: 'kyoto-kansai-8-days',
    title: 'Kyoto Heritage & Kansai Cultural Escape',
    daysLabel: '8 Days',
    locationLabel: 'Kyoto · Osaka',
    priceFrom: '$1,590',
    shortDesc:
      'Private Alphard transfers across Arashiyama bamboo groves, Uji matcha houses, Nara, and Osaka Castle.',
    imagePath: '/assets/cards/card-2.jpg',
    waText: 'Hello Tanogaido, I am interested in the 8-Day Kyoto & Kansai Cultural Escape.',
    sortOrder: 2,
  },
  {
    slug: 'hokkaido-winter-6-days',
    title: 'Hokkaido Winter & Alpine Retreat',
    daysLabel: '6 Days',
    locationLabel: 'Hokkaido',
    priceFrom: '$1,680',
    shortDesc:
      'Crisp mountain scenery across Sapporo, Otaru canal, Niseko snow fields, and relaxing open-air onsen stays.',
    imagePath: '/assets/zen-retreat.jpg',
    waText: 'Hello Tanogaido, I am interested in the 6-Day Hokkaido Winter Retreat.',
    sortOrder: 3,
  },
];

export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    author: 'Sarah L.',
    trip: 'Traveled to Kyoto & Mt. Fuji',
    quote:
      '"Tanogaido made our honeymoon and Kyoto prewedding shoot effortless. Every transfer, kimono fitting, and guide was seamless."',
    avatarPath: '/assets/avatars/traveler-1.jpg',
    sortOrder: 1,
  },
  {
    id: 'rev-2',
    author: 'James T.',
    trip: 'Private Family Tour · Tokyo',
    quote:
      '"Our private Alphard driver and tour guide knew every hidden gem in Tokyo and Osaka. Zero stress with luggage and JR Passes."',
    avatarPath: '/assets/avatars/traveler-2.jpg',
    sortOrder: 2,
  },
  {
    id: 'rev-3',
    author: 'Priya M.',
    trip: 'Tokyo Disney & Osaka Trip',
    quote:
      '"From Japan E-Visa approval and Pocket WiFi to Express Passes at USJ, their team handled everything quickly via WhatsApp."',
    avatarPath: '/assets/avatars/traveler-3.jpg',
    sortOrder: 3,
  },
  {
    id: 'rev-4',
    author: 'Daniel R.',
    trip: '6-Day Hokkaido Winter Retreat',
    quote:
      '"Booking our Hokkaido winter itinerary and JR Pass through Tanogaido saved us hours of guesswork. Seamless from airport pickup."',
    avatarPath: '/assets/avatars/traveler-2.jpg',
    sortOrder: 4,
  },
  {
    id: 'rev-5',
    author: 'Nadia K.',
    trip: 'Personal Shopper & Cargo · Tokyo',
    quote:
      '"Their Tokyo personal shopper secured limited matcha tins and sneakers we could not find anywhere else, shipped straight home."',
    avatarPath: '/assets/avatars/traveler-3.jpg',
    sortOrder: 5,
  },
  {
    id: 'rev-6',
    author: 'Hannah W.',
    trip: 'Golden Route · Visa & Guide',
    quote:
      '"Certified document translation and visa assistance finished ahead of schedule. Super responsive concierge throughout our stay."',
    avatarPath: '/assets/avatars/traveler-1.jpg',
    sortOrder: 6,
  },
];
