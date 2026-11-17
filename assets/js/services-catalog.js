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

  function waUrl(text) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  function renderDesktopDropdown(container) {
    if (!container) return;
    const colsHtml = SERVICE_CATEGORIES.map((cat) => {
      const items = SERVICES.filter((s) => s.category === cat.id);
      const linksHtml = items
        .map((s) => `<li><a href="services.html#service-${s.id}">${s.title}</a></li>`)
        .join('');
      return `
        <div>
          <div class="nav-dd-col-title"><span class="nav-dd-col-dot" aria-hidden="true"></span><span>${cat.label}</span></div>
          <ul class="nav-dd-list">${linksHtml}</ul>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="nav-dd-top">
        <span class="nav-dd-kicker">Complete Japan &amp; Travel Concierge · ${SERVICES.length} Services</span>
        <a href="services.html" class="nav-dd-all-link">View All Services &rarr;</a>
      </div>
      <div class="nav-dd-grid">${colsHtml}</div>
    `;
  }

  function renderMobileServicesList(container) {
    if (!container) return;
    const groupsHtml = SERVICE_CATEGORIES.map((cat) => {
      const items = SERVICES.filter((s) => s.category === cat.id);
      const linksHtml = items
        .map((s) => `<a href="services.html#service-${s.id}">${s.title}</a>`)
        .join('');
      return `
        <div>
          <span class="mobile-svc-cat-label">${cat.label}</span>
          <div class="mobile-svc-links">${linksHtml}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      ${groupsHtml}
      <div style="padding-top:4px;border-top:1px solid #e2e8f0;">
        <a href="services.html" class="mobile-services-all-link">Open Full Our Services Page &rarr;</a>
      </div>
    `;
  }

  function keepDropdownInsideViewport() {
    const item = document.querySelector('.nav-item-has-dropdown');
    const panel = document.querySelector('.nav-services-dropdown');
    if (!item || !panel) return;
    const rect = item.getBoundingClientRect();
    const panelW = Math.min(880, window.innerWidth - 40);
    const centerViewportX = window.innerWidth / 2;
    const itemCenterX = rect.left + rect.width / 2;
    const desiredLeftViewport = Math.max(20, Math.min(window.innerWidth - panelW - 20, centerViewportX - panelW / 2));
    const desiredCenterViewport = desiredLeftViewport + panelW / 2;
    const shiftPx = Math.round(desiredCenterViewport - itemCenterX);
    panel.style.setProperty('--dd-offset-x', `calc(-50% + ${shiftPx}px)`);
  }

  function initNavDropdowns() {
    document.querySelectorAll('[data-services-dropdown]').forEach(renderDesktopDropdown);
    document.querySelectorAll('[data-mobile-services-list]').forEach(renderMobileServicesList);

    const dropdownItem = document.querySelector('.nav-item-has-dropdown');
    if (dropdownItem) {
      dropdownItem.addEventListener('mouseenter', keepDropdownInsideViewport);
      dropdownItem.addEventListener('focusin', keepDropdownInsideViewport);
      window.addEventListener('resize', keepDropdownInsideViewport);
      requestAnimationFrame(keepDropdownInsideViewport);
    }

    document.querySelectorAll('[data-mobile-services-toggle]').forEach((btn) => {
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
