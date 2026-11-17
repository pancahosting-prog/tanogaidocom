(function () {
  const WA_NUMBER = '6281318939319';

  const SERVICE_CATEGORIES = [
    { id: 'tours', label: 'Tours & Guides' },
    { id: 'visa', label: 'Visa Concierge' },
    { id: 'transport', label: 'Transport & Passes' },
    { id: 'specialty', label: 'Specialty & Golf' },
    { id: 'essentials', label: 'Shopping & Essentials' }
  ];

  const SERVICES = [
    // 1. Tours & Guides
    {
      id: 'japan-tour-guide',
      category: 'tours',
      categoryLabel: 'Tours & Guides',
      kicker: 'ON-SITE · 24/7',
      title: 'Japan Tour Guide',
      shortDesc: 'Licensed bilingual local guides accompanying you on-site across Tokyo, Kyoto, Osaka, and Mt. Fuji.',
      image: 'assets/cards/card-4.jpg',
      features: [
        'Bilingual Indonesian, English & Japanese guides',
        'Real-time train transfers & dining reservations',
        'Trusted by 1,200+ travelers across Japan'
      ],
      waText: 'Hello Tanogaido, I would like to book an on-site Japan Tour Guide.'
    },
    {
      id: 'online-tour-guide',
      category: 'tours',
      categoryLabel: 'Tours & Guides',
      kicker: 'REMOTE · LIVE SUPPORT',
      title: 'Online Japan Tour Guide',
      shortDesc: 'Live virtual Japan guide via WhatsApp & video call to navigate routes, order food, and translate effortlessly.',
      image: 'assets/tokyo-pulse.jpg',
      features: [
        'Instant route & Shinkansen platform guidance',
        'Live menu & shop counter translation support',
        'Flexible daily remote concierge coverage'
      ],
      waText: 'Hello Tanogaido, I would like to book the Online Japan Tour Guide service.'
    },
    {
      id: 'tokyo-9-day-guide',
      category: 'tours',
      categoryLabel: 'Tours & Guides',
      kicker: 'DEDICATED · 9 DAYS',
      title: '9-Day Tokyo Tour Guide',
      shortDesc: 'Comprehensive 9-day dedicated tour guide covering Tokyo wards, Kamakura, Yokohama, Nikko, and Hakone.',
      image: 'assets/cards/card-1.jpg',
      features: [
        'Structured 9-day Tokyo & Kanto daily schedule',
        'Seamless metro, restaurant & attraction coordination',
        'Ideal for families, first-timers & small groups'
      ],
      waText: 'Hello Tanogaido, I am interested in the 9-Day Tokyo Tour Guide package.'
    },
    {
      id: 'japan-tour-packages',
      category: 'tours',
      categoryLabel: 'Tours & Guides',
      kicker: 'ALL-IN · 5–10 DAYS',
      title: 'Japan Tour Packages',
      shortDesc: 'Complete seasonal tours for Golden Route, Sakura spring, autumn koyo, and Hokkaido snow trips.',
      image: 'assets/fuji-climb.jpg',
      features: [
        'Tokyo, Mt. Fuji, Kyoto, Osaka & Hokkaido routes',
        'Handpicked hotels, breakfast & curated attractions',
        'Guaranteed departures with experienced tour leaders'
      ],
      waText: 'Hello Tanogaido, I would like to see available Japan Tour Packages.'
    },
    {
      id: 'private-japan-tour',
      category: 'tours',
      categoryLabel: 'Tours & Guides',
      kicker: 'BESPOKE · 1–15 PAX',
      title: 'Private Japan Tour',
      shortDesc: 'Custom-built private itineraries paced entirely around your family, honeymoon, or executive team.',
      image: 'assets/cards/card-5.jpg',
      features: [
        '100% private schedule with no outside joiners',
        'Child-friendly & senior-friendly travel pace',
        'Trusted by 650+ private & VIP groups'
      ],
      waText: 'Hello Tanogaido, I would like to plan a custom Private Japan Tour.'
    },

    // 2. Visa Concierge
    {
      id: 'japan-visa-processing',
      category: 'visa',
      categoryLabel: 'Visa Concierge',
      kicker: 'E-VISA · WAIVER',
      title: 'Japan Visa Processing',
      shortDesc: 'Thorough document pre-check and smooth embassy/VFS submission for Japan E-Visa, Waiver & Multiple Entry.',
      image: 'assets/cards/japan-documents.jpg',
      features: [
        'Complete document audit before embassy filing',
        'Tourism, family visit & business visa types',
        'Trusted by 940+ approved Japan applicants'
      ],
      waText: 'Hello Tanogaido, I need assistance with Japan Visa Processing.'
    },
    {
      id: 'china-visa-processing',
      category: 'visa',
      categoryLabel: 'Visa Concierge',
      kicker: 'TOURIST · BUSINESS',
      title: 'China Visa Processing',
      shortDesc: 'Hassle-free Chinese tourist, business, and transit visa assistance from form preparation to center filing.',
      image: 'assets/cards/card-6.jpg',
      features: [
        'Accurate application form & itinerary preparation',
        'Visa application center slot & biometric guidance',
        'Single, double & multiple-entry options'
      ],
      waText: 'Hello Tanogaido, I need assistance with China Visa Processing.'
    },
    {
      id: 'south-korea-visa-processing',
      category: 'visa',
      categoryLabel: 'Visa Concierge',
      kicker: 'SINGLE · MULTIPLE',
      title: 'South Korea Visa Processing',
      shortDesc: 'End-to-end South Korea tourist, family, and group visa handling with thorough financial document review.',
      image: 'assets/island-hop.jpg',
      features: [
        'Detailed sponsor & bank statement checklist',
        'KVAC submission coordination & status tracking',
        'Fast turnaround for holiday & business travelers'
      ],
      waText: 'Hello Tanogaido, I need assistance with South Korea Visa Processing.'
    },
    {
      id: 'europe-schengen-visa',
      category: 'visa',
      categoryLabel: 'Visa Concierge',
      kicker: 'SCHENGEN · EU',
      title: 'Europe Schengen Visa Processing',
      shortDesc: 'Full Schengen visa preparation including travel insurance, flight/hotel alignments & VFS appointment booking.',
      image: 'assets/zen-retreat.jpg',
      features: [
        'Embassy-compliant itinerary & hotel documentation',
        'Travel medical insurance & cover letter drafting',
        'Appointment scheduling across Schengen states'
      ],
      waText: 'Hello Tanogaido, I need assistance with Europe Schengen Visa Processing.'
    },

    // 3. Transport & Passes
    {
      id: 'jr-pass-tickets',
      category: 'transport',
      categoryLabel: 'Transport & Passes',
      kicker: 'OFFICIAL · SHINKANSEN',
      title: 'JR Pass Tickets',
      shortDesc: 'Official Whole Japan Rail Pass, Regional JR Passes, and Shinkansen seat reservations.',
      image: 'assets/shinkansen.jpg',
      features: [
        'Free route calculator to maximize rail savings',
        'Nationwide, Kansai, Takayama & Hokkaido passes',
        'Trusted by 890+ JR Pass travelers'
      ],
      waText: 'Hello Tanogaido, I would like to buy JR Pass Tickets.'
    },
    {
      id: 'attraction-theme-park-tickets',
      category: 'transport',
      categoryLabel: 'Transport & Passes',
      kicker: 'INSTANT QR · EXPRESS',
      title: 'Attraction, Theme Park & Rail Pass Tickets',
      shortDesc: 'Guaranteed QR entry for USJ, Tokyo Disney Resort, Super Nintendo World, teamLab, and regional train passes.',
      image: 'assets/cards/japan-theme-park.jpg',
      features: [
        'Tokyo Disneyland, DisneySea & USJ Express Passes',
        'Shibuya Sky, teamLab Planets & Mt. Fuji ropeway',
        'Regional transit & airport express train tickets'
      ],
      waText: 'Hello Tanogaido, I would like to buy Japan Attraction, Theme Park & Rail Pass Tickets.'
    },
    {
      id: 'car-bus-rental',
      category: 'transport',
      categoryLabel: 'Transport & Passes',
      kicker: 'ALPHARD · COACH',
      title: 'Car & Tour Bus Rental',
      shortDesc: 'Licensed green-plate Toyota Alphard, HiAce Grand Cabin, and executive coaches with professional drivers.',
      image: 'assets/cards/japan-van.jpg',
      features: [
        'Haneda, Narita, Kansai & New Chitose transfers',
        'Alphard, HiAce, Microbus & 45-seat coach fleet',
        'Transparent all-in rates with tolls & fuel'
      ],
      waText: 'Hello Tanogaido, I would like to book a Car or Tour Bus Rental in Japan.'
    },

    // 4. Specialty & Golf
    {
      id: 'japan-golf-tour',
      category: 'specialty',
      categoryLabel: 'Specialty & Golf',
      kicker: 'TEE TIMES · HAKONE & HOKKAIDO',
      title: 'Japan Golf Tour',
      shortDesc: 'Curated championship golf rounds near Mt. Fuji, Karuizawa, Chiba, and Hokkaido with private transfers.',
      image: 'assets/cards/japan-golf.jpg',
      features: [
        'Guaranteed tee times at premier Japanese courses',
        'Private Alphard/HiAce transport with golf bag space',
        'Caddy, luxury ryokan stays & club rental support'
      ],
      waText: 'Hello Tanogaido, I am interested in booking a Japan Golf Tour.'
    },
    {
      id: 'japan-prewedding',
      category: 'specialty',
      categoryLabel: 'Specialty & Golf',
      kicker: 'PRO CREW · KIMONO',
      title: 'Japan Prewedding Packages',
      shortDesc: 'Editorial couples photography across Kyoto temples, Mt. Fuji lakes, and Tokyo streets with full styling.',
      image: 'assets/cards/card-2.jpg',
      features: [
        'Experienced photographer & location director',
        'Kimono wardrobe, hair & hijab styling support',
        'High-resolution gallery with editorial color edit'
      ],
      waText: 'Hello Tanogaido, I would like to inquire about Japan Prewedding Packages.'
    },
    {
      id: 'japan-property-survey',
      category: 'specialty',
      categoryLabel: 'Specialty & Golf',
      kicker: 'REAL ESTATE · TOKYO & OSAKA',
      title: 'Japan Property Survey Tour',
      shortDesc: 'Guided inspection trips for residential apartments, akiya houses, and commercial property investments in Japan.',
      image: 'assets/tokyo-pulse.jpg',
      features: [
        'Scheduled viewings with licensed Japanese brokers',
        'On-site bilingual business & legal translation',
        'Private vehicle transport between districts'
      ],
      waText: 'Hello Tanogaido, I would like to arrange a Japan Property Survey Tour.'
    },
    {
      id: 'japan-collectibles-hunting',
      category: 'specialty',
      categoryLabel: 'Specialty & Golf',
      kicker: 'AKIHABARA · NAKANO',
      title: 'Japan Collectibles Hunting Tour',
      shortDesc: 'Dedicated collector tour targeting rare vintage watches, luxury items, anime figures, TCG & boutique drops.',
      image: 'assets/cards/card-3.jpg',
      features: [
        'Guided routes across Akihabara, Nakano & Ginza',
        'Price negotiation & tax-free paperwork support',
        'Safe packing & insured shipping coordination home'
      ],
      waText: 'Hello Tanogaido, I would like to book a Japan Collectibles Hunting Tour.'
    },

    // 5. Shopping & Essentials
    {
      id: 'pocket-wifi-rental',
      category: 'essentials',
      categoryLabel: 'Shopping & Essentials',
      kicker: '4G / 5G · 5 DEVICES',
      title: 'Japan Pocket WiFi Rental',
      shortDesc: 'True unlimited high-speed Japanese pocket WiFi and travel eSIM ready upon arrival at major airports.',
      image: 'assets/cards/card-7.jpg',
      features: [
        'Unlimited nationwide 4G/5G multi-carrier data',
        'Connect up to 5 phones, tablets, or laptops',
        'Convenient airport counter pickup or delivery'
      ],
      waText: 'Hello Tanogaido, I would like to rent a Japan Pocket WiFi.'
    },
    {
      id: 'japan-personal-shopper',
      category: 'essentials',
      categoryLabel: 'Shopping & Essentials',
      kicker: 'TOKYO PICKS · ORIGINAL',
      title: 'Japan Personal Shopper (Jastip)',
      shortDesc: 'On-demand boutique shopping in Tokyo for limited sneakers, luxury bags, ceremonial matcha, and skincare.',
      image: 'assets/cards/card-3.jpg',
      features: [
        'Direct store purchase with official boutique receipts',
        'Live video confirmation from Tokyo & Kyoto shops',
        'Curated snack, beauty & limited edition drops'
      ],
      waText: 'Hello Tanogaido, I would like to use the Japan Personal Shopper (Jastip) service.'
    },
    {
      id: 'japan-import-service',
      category: 'essentials',
      categoryLabel: 'Shopping & Essentials',
      kicker: 'AIR & SEA · INSURED',
      title: 'Japan Goods Import Service',
      shortDesc: 'Door-to-door air and sea cargo shipping from Japan to Indonesia with customs handling and tracking.',
      image: 'assets/cards/japan-cargo.jpg',
      features: [
        'Fast weekly air cargo & sea consolidation options',
        'Pickup, protective repacking & customs clearance',
        'Transparent per-kilogram shipping quotes'
      ],
      waText: 'Hello Tanogaido, I would like a quote for the Japan Goods Import Service.'
    },
    {
      id: 'document-translation',
      category: 'essentials',
      categoryLabel: 'Shopping & Essentials',
      kicker: 'CERTIFIED · JP-ID-EN',
      title: 'Document Translation',
      shortDesc: 'Certified Japanese, Indonesian, and English document translation for visa, academic, and corporate needs.',
      image: 'assets/tea-ceremony.jpg',
      features: [
        'Sworn legal, academic & civil certificate formatting',
        'Native Japanese & Indonesian editorial QA review',
        'Hardcopy stamp delivery & encrypted PDF files'
      ],
      waText: 'Hello Tanogaido, I need Document Translation service.'
    }
  ];

  const SERVICE_ICONS = {
    'japan-tour-guide': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    'online-tour-guide': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    'tokyo-9-day-guide': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    'japan-tour-packages': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l6-12 4 7 3-4 5 9H3z"/></svg>',
    'private-japan-tour': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'japan-visa-processing': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>',
    'china-visa-processing': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'south-korea-visa-processing': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h2"/><path d="M15 12h2"/><path d="M7 16h10"/></svg>',
    'europe-schengen-visa': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    'jr-pass-tickets': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16M8 17l-2 4M16 17l2 4"/><circle cx="8.5" cy="14" r="1"/><circle cx="15.5" cy="14" r="1"/></svg>',
    'attraction-theme-park-tickets': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><line x1="9" y1="4" x2="9" y2="20"/></svg>',
    'car-bus-rental': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>',
    'japan-golf-tour': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    'japan-prewedding': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    'japan-property-survey': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 13v.01"/><path d="M9 17v.01"/></svg>',
    'japan-collectibles-hunting': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'pocket-wifi-rental': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>',
    'japan-personal-shopper': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    'japan-import-service': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    'document-translation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>'
  };

  const DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';
  const ALL_SERVICES_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>';

  function waUrl(text) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  function renderDesktopDropdown(container) {
    if (!container) return;
    const itemsHtml = SERVICES.map((s) => {
      const iconSvg = SERVICE_ICONS[s.id] || DEFAULT_ICON;
      return `
        <a href="services.html#service-${s.id}" class="nav-svc-item">
          <span class="nav-svc-icon" aria-hidden="true">${iconSvg}</span>
          <span class="nav-svc-label">${s.title}</span>
        </a>
      `;
    }).join('');

    const allItemHtml = `
      <a href="services.html" class="nav-svc-item nav-svc-item-all">
        <span class="nav-svc-icon" aria-hidden="true">${ALL_SERVICES_ICON}</span>
        <span class="nav-svc-label">All Services &rarr;</span>
      </a>
    `;

    container.className = 'nav-services-drawer';
    container.innerHTML = `
      <div class="nav-services-drawer-body">
        <div class="nav-services-drawer-inner">
          <div class="nav-services-grid">${itemsHtml}${allItemHtml}</div>
        </div>
      </div>
    `;
  }

  function renderMobileServicesList(container) {
    if (!container) return;
    const linksHtml = SERVICES.map((s) => (
      `<a href="services.html#service-${s.id}">${s.title}</a>`
    )).join('');

    container.innerHTML = `
      <div class="mobile-services-sublist-inner">
        <div class="mobile-services-scroll">
          ${linksHtml}
          <a href="services.html" class="mobile-services-all-link">All Services &rarr;</a>
        </div>
      </div>
    `;
  }

  function initNavDropdowns() {
    const navbarContainer = document.getElementById('navbar-container');
    const dropdownEl = document.querySelector('[data-services-dropdown]');
    const dropdownItem = document.querySelector('.nav-item-has-dropdown');
    const triggerEl = dropdownItem ? dropdownItem.querySelector('.nav-services-trigger') : null;

    if (dropdownEl) {
      if (navbarContainer && dropdownEl.parentElement !== navbarContainer) {
        navbarContainer.appendChild(dropdownEl);
      }
      renderDesktopDropdown(dropdownEl);
    }

    document.querySelectorAll('[data-mobile-services-list]').forEach(renderMobileServicesList);

    if (navbarContainer && dropdownItem && dropdownEl) {
      let closeTimer = null;
      let lastPointerType = 'mouse';

      function isTouchInteraction() {
        return (
          lastPointerType === 'touch' ||
          lastPointerType === 'pen' ||
          !window.matchMedia('(hover: hover)').matches
        );
      }

      document.addEventListener('pointerdown', (e) => {
        if (e.pointerType) lastPointerType = e.pointerType;
      }, { passive: true });

      document.addEventListener('touchstart', () => {
        lastPointerType = 'touch';
      }, { passive: true });

      function isDrawerOpen() {
        return navbarContainer.classList.contains('is-services-open');
      }

      function openDrawer() {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        navbarContainer.classList.add('is-services-open');
        dropdownItem.classList.add('is-open');
        if (triggerEl) triggerEl.setAttribute('aria-expanded', 'true');
      }

      function scheduleClose() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          navbarContainer.classList.remove('is-services-open');
          dropdownItem.classList.remove('is-open');
          if (triggerEl) triggerEl.setAttribute('aria-expanded', 'false');
        }, 220);
      }

      function closeImmediate() {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        navbarContainer.classList.remove('is-services-open');
        dropdownItem.classList.remove('is-open');
        if (triggerEl) triggerEl.setAttribute('aria-expanded', 'false');
      }

      function isInsideServicesZone(target) {
        return Boolean(target && (dropdownItem.contains(target) || dropdownEl.contains(target)));
      }

      dropdownItem.addEventListener('mouseenter', () => {
        if (isTouchInteraction()) return;
        openDrawer();
      });

      dropdownItem.addEventListener('mouseleave', (e) => {
        if (isTouchInteraction()) return;
        if (isInsideServicesZone(e.relatedTarget)) return;
        scheduleClose();
      });

      dropdownEl.addEventListener('mouseenter', () => {
        if (isTouchInteraction()) return;
        openDrawer();
      });

      dropdownEl.addEventListener('mousemove', () => {
        if (isTouchInteraction()) return;
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
      });

      dropdownEl.addEventListener('mouseleave', (e) => {
        if (isTouchInteraction()) return;
        if (isInsideServicesZone(e.relatedTarget)) return;
        scheduleClose();
      });

      if (triggerEl) {
        triggerEl.setAttribute('aria-expanded', 'false');
        triggerEl.addEventListener('click', (e) => {
          if (isTouchInteraction()) {
            e.preventDefault();
            e.stopPropagation();
            if (isDrawerOpen()) {
              closeImmediate();
            } else {
              openDrawer();
            }
          }
        });
      }

      dropdownItem.addEventListener('focusin', () => {
        if (isTouchInteraction()) return;
        openDrawer();
      });

      navbarContainer.addEventListener('focusout', (e) => {
        if (isTouchInteraction()) return;
        const nextTarget = e.relatedTarget;
        if (nextTarget && !isInsideServicesZone(nextTarget)) {
          scheduleClose();
        }
      });

      document.querySelectorAll('.nav-links > li').forEach((li) => {
        if (li !== dropdownItem) {
          li.addEventListener('mouseenter', () => {
            if (isTouchInteraction()) return;
            scheduleClose();
          });
        }
      });

      document.addEventListener('pointerdown', (e) => {
        if (!isDrawerOpen()) return;
        if (!isInsideServicesZone(e.target)) {
          closeImmediate();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeImmediate();
      });

      dropdownEl.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          closeImmediate();
        }
      });
    }

    document.querySelectorAll('[data-mobile-services-toggle]').forEach((btn) => {
      if (btn.dataset.boundToggle === '1') return;
      btn.dataset.boundToggle = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const group = btn.closest('.mobile-services-group');
        if (!group) return;
        const expanded = group.classList.toggle('is-expanded');
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initNavDropdowns);

  window.TANOGAIDO_SERVICE_CATEGORIES = SERVICE_CATEGORIES;
  window.TANOGAIDO_SERVICES = SERVICES;
  window.TanogaidoServices = {
    getWhatsAppUrl: waUrl,
    refreshDropdowns: initNavDropdowns
  };
})();
