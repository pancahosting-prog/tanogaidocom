import { SiteSettings, Testimonial, TravelStyle, Trip } from '@/types/cms';

export const WA_NUMBER = '6281318939319';
export const SITE_URL = 'https://tanogaido.com';

export const SITE_SETTINGS: SiteSettings = {
  siteName: 'Tanogaido',
  siteTagline: 'PT. Tanogaido Fantasi Pratama — Your Gateway to Japan since 2007.',
  companyLegalName: 'PT. Tanogaido Fantasi Pratama',
  establishedYear: 2007,
  nib: '2003230101593',
  decreeNumber: 'AHU-0022369.AH.01.01.TAHUN 2023',
  address: 'Jl. Boulevard Raya Blok PD 9 No. 12, Kelapa Gading, North Jakarta 14240, Indonesia',
  contactEmail: 'tanogaidocom@gmail.com',
  contactPhone: '+62 813-1893-9319',
  waNumber: WA_NUMBER,
  socials: {
    instagram: 'https://instagram.com/tanogaido',
    facebook: 'https://facebook.com/tanogaido',
    youtube: 'https://youtube.com/@tanogaido',
    whatsapp: `https://wa.me/${WA_NUMBER}`,
  },
};

export const TRAVEL_STYLES: TravelStyle[] = [
  {
    id: 'relax-onsen',
    label: 'Relax & Onsen',
    iconName: 'onsen',
    waText: 'Hello Tanogaido, I am interested in a Relax & Onsen Japan trip.',
  },
  {
    id: 'fuji-adventure',
    label: 'Mt. Fuji Adventure',
    iconName: 'mountain',
    waText: 'Hello Tanogaido, I am interested in a Mt. Fuji Adventure.',
  },
  {
    id: 'family-travel',
    label: 'Family Travel',
    iconName: 'users',
    waText: 'Hello Tanogaido, I would like to plan a Family Travel trip to Japan.',
  },
  {
    id: 'honeymoon-prewedding',
    label: 'Honeymoon & Prewed',
    iconName: 'heart',
    waText: 'Hello Tanogaido, I would like to plan a Honeymoon & Prewedding in Japan.',
  },
  {
    id: 'cultural-shrines',
    label: 'Cultural Shrines',
    iconName: 'torii',
    waText: 'Hello Tanogaido, I am interested in Cultural Experiences in Kyoto.',
  },
  {
    id: 'food-matcha',
    label: 'Food & Matcha',
    iconName: 'coffee',
    waText: 'Hello Tanogaido, I would like Culinary & Matcha tours in Japan.',
  },
  {
    id: 'theme-parks',
    label: 'Theme Parks',
    iconName: 'ticket',
    waText: 'Hello Tanogaido, I want to visit Japan Theme Parks.',
  },
  {
    id: 'solo-rail',
    label: 'Solo & Rail',
    iconName: 'train',
    waText: 'Hello Tanogaido, I am planning a Solo Rail trip with JR Pass.',
  },
];

export const FEATURED_TRIPS: Trip[] = [
  {
    id: 'golden-route',
    title: 'Golden Route: Tokyo, Mt. Fuji & Kyoto',
    durationDays: '7 Days',
    priceFrom: 1450,
    image: '/assets/fuji-climb.jpg',
    imageAlt: 'Golden Route Tokyo Mt Fuji and Kyoto',
    desc: 'Explore Shibuya skylines, Lake Kawaguchiko vistas, historic Fushimi Inari, and Dotonbori food streets.',
    destination: 'Tokyo · Kyoto',
    waText: 'Hello Tanogaido, I am interested in the 7-Day Golden Route Japan Trip.',
  },
  {
    id: 'kyoto-heritage',
    title: 'Kyoto Heritage & Kansai Cultural Escape',
    durationDays: '8 Days',
    priceFrom: 1590,
    image: '/assets/cards/card-2.jpg',
    imageAlt: 'Kyoto Heritage & Osaka Escape',
    desc: 'Private Alphard transfers across Arashiyama bamboo groves, Uji matcha houses, Nara, and Osaka Castle.',
    destination: 'Kyoto · Osaka',
    waText: 'Hello Tanogaido, I am interested in the 8-Day Kyoto & Kansai Cultural Escape.',
  },
  {
    id: 'hokkaido-winter',
    title: 'Hokkaido Winter & Alpine Retreat',
    durationDays: '6 Days',
    priceFrom: 1680,
    image: '/assets/zen-retreat.jpg',
    imageAlt: 'Hokkaido & Northern Alps Adventure',
    desc: 'Crisp mountain scenery across Sapporo, Otaru canal, Niseko snow fields, and relaxing open-air onsen stays.',
    destination: 'Hokkaido',
    waText: 'Hello Tanogaido, I am interested in the 6-Day Hokkaido Winter Retreat.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    author: 'Sarah L.',
    avatar: '/assets/avatars/traveler-1.jpg',
    quote: '"Tanogaido made our honeymoon and Kyoto prewedding shoot effortless. Every transfer, kimono fitting, and guide was seamless."',
    trip: 'Traveled to Kyoto & Mt. Fuji',
  },
  {
    id: 'rev-2',
    author: 'James T.',
    avatar: '/assets/avatars/traveler-2.jpg',
    quote: '"Our private Alphard driver and tour guide knew every hidden gem in Tokyo and Osaka. Zero stress with luggage and JR Passes."',
    trip: 'Private Family Tour · Tokyo',
  },
  {
    id: 'rev-3',
    author: 'Priya M.',
    avatar: '/assets/avatars/traveler-3.jpg',
    quote: '"From Japan E-Visa approval and Pocket WiFi to Express Passes at USJ, their team handled everything quickly via WhatsApp."',
    trip: 'Tokyo Disney & Osaka Trip',
  },
  {
    id: 'rev-4',
    author: 'Daniel R.',
    avatar: '/assets/avatars/traveler-2.jpg',
    quote: '"Booking our Hokkaido winter itinerary and JR Pass through Tanogaido saved us hours of guesswork. Seamless from airport pickup."',
    trip: '6-Day Hokkaido Winter Retreat',
  },
  {
    id: 'rev-5',
    author: 'Nadia K.',
    avatar: '/assets/avatars/traveler-3.jpg',
    quote: '"Their Tokyo personal shopper secured limited matcha tins and sneakers we could not find anywhere else, shipped straight home."',
    trip: 'Personal Shopper & Cargo · Tokyo',
  },
  {
    id: 'rev-6',
    author: 'Hannah W.',
    avatar: '/assets/avatars/traveler-1.jpg',
    quote: '"Certified document translation and visa assistance finished ahead of schedule. Super responsive concierge throughout our stay."',
    trip: 'Golden Route · Visa & Guide',
  },
];

export const ABOUT_PAGE_DATA = {
  eyebrow: 'COMPANY PROFILE & LEGAL IDENTITY',
  h1Lead: 'PT. Tanogaido Fantasi Pratama',
  h1Sub: 'Your Gateway to Japan — Established in 2007.',
  introText: 'Since 2007, PT. Tanogaido Fantasi Pratama has operated as an integrated private Japan travel concierge, licensed tour operator, and logistics bridge between Indonesia and Japan. Headquartered in Kelapa Gading, North Jakarta, with ground operations across Tokyo, Kyoto, and Osaka, we craft authentic journeys, secure visas, and provide end-to-end travel assurance.',
  visionTitle: 'Our Vision',
  visionText: 'To be the most trusted, personalized, and culturally enriching gateway connecting global travelers to the wonders, heritage, and modern dynamism of authentic Japan.',
  missions: [
    { title: 'Personalized Itineraries', desc: 'Craft flexible private journeys tailored strictly around each traveler’s family, rhythm, and passions.' },
    { title: 'Licensed Bilingual Teams', desc: 'Maintain certified Indonesian, English, and Japanese local guides and professional green-plate chauffeurs.' },
    { title: 'Rigorous Visa Compliance', desc: 'Provide meticulous pre-check audits for Japan, China, South Korea, and Schengen visa applications.' },
    { title: 'Seamless Mobility & Passes', desc: 'Deliver official JR Passes, Shinkansen seat bookings, theme park QR passes, and unlimited Pocket WiFi.' },
    { title: 'Authentic Sourcing & Freight', desc: 'Directly source ceremonial teas and artisan crafts, supported by weekly insured Japan-Indonesia air cargo.' },
    { title: '24/7 Human Concierge', desc: 'Deliver real-time assistance via dedicated WhatsApp and live support desks from touchdown to takeoff.' },
  ],
  pillars: [
    { num: '01', title: 'Private & Guided Tours', desc: 'Tailored private itineraries, licensed local guides, and seasonal Golden Route, Sakura, and Hokkaido snow packages.' },
    { num: '02', title: 'Visa Concierge Desk', desc: 'E-Visa, Visa Waiver, Multiple Entry, and global embassy dossier audits for Japan, China, Korea, and Schengen.' },
    { num: '03', title: 'Transport & Rail Logistics', desc: 'Official Whole Japan and Regional JR Passes, Shinkansen booking, airport express passes, and green-plate charter vans.' },
    { num: '04', title: 'Specialty Tours & Events', desc: 'Championship golf rounds, editorial prewedding photography, real estate property surveys, and anime collector hunts.' },
    { num: '05', title: 'Curated Goods & Jastip', desc: 'Authentic Kyoto matcha, ceramics, and personal shopping (Jastip) in Tokyo with official store receipts.' },
    { num: '06', title: 'Cargo & Translation', desc: 'Scheduled weekly air freight, sea cargo consolidation, and sworn certified Japanese-Indonesian-English translations.' },
  ],
  whyChoose: [
    { num: '01', title: '19+ Years of Specialized Japan Expertise', desc: 'Operating continuously since 2007, our team possesses deep ground relationships with hotels, ryokans, and transport providers across Japan.' },
    { num: '02', title: 'Full Legal Incorporation & Licensing', desc: 'Officially registered as PT. Tanogaido Fantasi Pratama with Indonesian Business Identification Number (NIB) 2003230101593 and Ministry Decree AHU-0022369.AH.01.01.TAHUN 2023.' },
    { num: '03', title: 'Bilingual Ground Concierge on Speed Dial', desc: 'Our dual presence in Jakarta and Tokyo ensures you have bilingual specialists who speak Indonesian, English, and Japanese ready to assist 24/7.' },
    { num: '04', title: 'Transparent All-Inclusive Pricing', desc: 'No hidden toll fees, driver hotel surcharges, or surprise currency markups. What we quote is what you pay.' },
    { num: '05', title: 'Integrated One-Stop Ecosystem', desc: 'From visa paperwork and flight timings to Shinkansen passes, luggage transfers, and shopping cargo — everything is managed under one roof.' },
  ],
};
