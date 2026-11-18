(function () {
  const WA_NUMBER = '6281318939319';
  const STORAGE_BAG_KEY = 'tanogaido_bag_v1';
  const STORAGE_FAV_KEY = 'tanogaido_shop_fav_v1';
  const FREE_SHIPPING_THRESHOLD = 150;

  const PRODUCTS = [
    {
      id: 'uji-matcha',
      title: 'Uji Ceremonial Matcha Tin Set',
      origin: 'Kyoto',
      categoryLabel: 'Tea Craft',
      category: 'tea',
      status: 'Limited Harvest',
      rating: '4.9',
      reviewCount: 42,
      price: 48,
      priceJpy: '¥7,200',
      image: 'assets/products/uji-matcha.jpg',
      gallery: [
        { src: 'assets/products/uji-matcha.jpg', label: 'Studio Set' },
        { src: 'assets/products/shop-hero.jpg', label: 'Table Collection' }
      ],
      shortDesc: 'First-harvest stone-milled ceremonial matcha in matte crimson lacquer canister with 80-prong bamboo whisk.',
      craftStory: 'Shade-grown for twenty-four days along the Uji River mist slopes, these tender first-flush leaves are granite stone-milled in small batches for natural umami sweetness and vivid emerald crema.',
      variants: ['40g Canister + Whisk', '80g Refill Pouch'],
      specs: [
        'Single-cultivar Samidori leaves harvested in Uji, Kyoto',
        'Airtight matte crimson lacquer tin preserves vivid aroma',
        'Paired with hand-carved 80-prong Takayama bamboo whisk',
        'Ships sealed in protective paulownia & cotton sleeve'
      ],
      shippingNote: 'Dispatched from Kyoto/Tokyo within 48 hours · Cold-chain sealed pack',
      featured: true
    },
    {
      id: 'kyoto-tumbler',
      title: 'Kiyomizu-yaki Ceramic Tea Tumbler',
      origin: 'Kyoto',
      categoryLabel: 'Ceramics',
      category: 'tea',
      status: 'Hand-Thrown',
      rating: '4.9',
      reviewCount: 38,
      price: 64,
      priceJpy: '¥9,600',
      image: 'assets/products/kyoto-tumbler.jpg',
      gallery: [
        { src: 'assets/products/kyoto-tumbler.jpg', label: 'Front Profile' },
        { src: 'assets/products/shop-hero.jpg', label: 'Atelier Pairing' }
      ],
      shortDesc: 'Wheel-thrown speckled stoneware tea cup finished with warm vermilion rim by fifth-generation Kyoto potters.',
      craftStory: 'Each tumbler is shaped by hand on a potter’s wheel in Higashiyama using iron-speckled Shigaraki clay, then dipped in warm milk-white ash glaze with a fine vermilion kiln-fired rim.',
      variants: ['Speckled Warm White', 'Moss Ash Glaze'],
      specs: [
        'Handcrafted in Higashiyama family kiln workshop, Kyoto',
        '240ml balanced capacity · Double-walled tactile base',
        'Signed artisan paulownia wood presentation box included',
        'Lead-free natural ash glaze · Subtle unique speckles'
      ],
      shippingNote: 'Double-boxed in custom impact-cushioned Kyoto crate',
      featured: true
    },
    {
      id: 'hakone-folio',
      title: 'Hakone Yosegi Passport & JR Folio',
      origin: 'Hakone',
      categoryLabel: 'Travel Goods',
      category: 'travel',
      status: 'In Stock',
      rating: '5.0',
      reviewCount: 54,
      price: 92,
      priceJpy: '¥13,800',
      image: 'assets/products/hakone-folio.jpg',
      gallery: [
        { src: 'assets/products/hakone-folio.jpg', label: 'Travel Set' },
        { src: 'assets/products/shop-hero.jpg', label: 'Detail Scene' }
      ],
      shortDesc: 'Full-grain charcoal calfskin passport sleeve and luggage tag featuring hand-inlaid Hakone geometric wood marquetry.',
      craftStory: 'Combining supple vegetable-tanned charcoal leather with Edo-era Yosegi-zaiku parquetry crafted from natural walnut, cherry, and magnolia woods in Hakone.',
      variants: ['Charcoal + Yosegi Set', 'Passport Folio Only'],
      specs: [
        'Dedicated JR Rail Pass, Suica & boarding card sleeves',
        'Authentic hand-inlaid Hakone geometric wood marquetry',
        'Solid brushed brass buckle & privacy-flap luggage tag',
        'Slim silhouette tailored cleanly for coat or sling pockets'
      ],
      shippingNote: 'Ready for Tokyo hotel desk drop or international express',
      featured: true
    },
    {
      id: 'fuji-bottle',
      title: 'Mt. Fuji Titanium Thermo Bottle',
      origin: 'Tokyo',
      categoryLabel: 'Rail Gear',
      category: 'travel',
      status: '500ml Light',
      rating: '4.8',
      reviewCount: 61,
      price: 58,
      priceJpy: '¥8,700',
      image: 'assets/products/fuji-bottle.jpg',
      gallery: [
        { src: 'assets/products/fuji-bottle.jpg', label: 'Crimson Matte' },
        { src: 'assets/products/shop-hero.jpg', label: 'Collection View' }
      ],
      shortDesc: 'Featherweight double-wall insulated bottle finished in matte Tanogaido crimson engineered for Shinkansen day trips.',
      craftStory: 'Precision-spun from Japanese aerospace-grade titanium in Niigata for zero metallic aftertaste and ultra-low 195g carry weight across long temple walks.',
      variants: ['500ml Crimson Matte', '350ml Brushed Silver'],
      specs: [
        '18 hours piping hot / 24 hours crisp cold vacuum seal',
        'Ultra-lightweight 195g body for all-day Tokyo walking',
        'Sized for standard Tokaido Shinkansen cup holders',
        'Scratch-resistant matte powder coat finish'
      ],
      shippingNote: 'Ships worldwide via insured DHL air parcel',
      featured: true
    },
    {
      id: 'hinoki-mist',
      title: 'Kyoto Hinoki & Yuzu Room Mist',
      origin: 'Kyoto',
      categoryLabel: 'Fragrance',
      category: 'home',
      status: '100ml Glass',
      rating: '4.9',
      reviewCount: 29,
      price: 42,
      priceJpy: '¥6,300',
      image: 'assets/products/hinoki-mist.jpg',
      gallery: [
        { src: 'assets/products/hinoki-mist.jpg', label: '100ml Apothecary' },
        { src: 'assets/products/shop-hero.jpg', label: 'Tabletop Scene' }
      ],
      shortDesc: 'Essential oil botanical spray blending aromatic Japanese cypress timber with cold-pressed Kochi yuzu peel.',
      craftStory: 'Steam-distilled from sustainably pruned northern Kyoto hinoki cypress groves and layered with bright winter yuzu zest for an unmistakable onsen sanctuary atmosphere.',
      variants: ['100ml Smoked Amber', '200ml Refill Bottle'],
      specs: [
        '100% pure steam-distilled Kyoto cypress wood essential oil',
        'UV-shielded frosted amber apothecary spray bottle',
        'Notes: Rain-soaked cedarwood, sun-warmed hinoki, yuzu zest',
        'Zero synthetic parabens or artificial fixatives'
      ],
      shippingNote: 'Sealed leak-proof air freight packaging',
      featured: false
    },
    {
      id: 'edo-glass',
      title: 'Edo Kiriko Crimson Sake Carafe',
      origin: 'Tokyo',
      categoryLabel: 'Glassware',
      category: 'craft',
      status: 'Signed Edition',
      rating: '5.0',
      reviewCount: 19,
      price: 118,
      priceJpy: '¥17,700',
      image: 'assets/products/edo-glass.jpg',
      gallery: [
        { src: 'assets/products/edo-glass.jpg', label: 'Carafe & Cup' },
        { src: 'assets/products/shop-hero.jpg', label: 'Atelier Pairing' }
      ],
      shortDesc: 'Mouth-blown lead crystal carafe and tasting cup hand-faceted with crisp Edo diamond geometric cuts.',
      craftStory: 'Master cutters in Sumida ward incise razor-crisp Yarai diamond patterns through deep ruby-cased crystal glass so ambient light refracts like lanterns along the Sumida River.',
      variants: ['Carafe + 1 Ochoko Cup', 'Gift Set + 2 Cups'],
      specs: [
        'Mouth-blown and hand-faceted in Sumida ward, Tokyo',
        'Signature deep ruby crystal overlay with clear facets',
        'Presented in cushioned paulownia heirloom storage box',
        'Includes signed Tokyo artisan certificate of origin'
      ],
      shippingNote: 'Museum-grade foam-suspended wooden box delivery',
      featured: false
    },
    {
      id: 'imabari-towel',
      title: 'Imabari Organic Travel Towel Duo',
      origin: 'Ehime',
      categoryLabel: 'Textile',
      category: 'craft',
      status: '100% Cotton',
      rating: '4.8',
      reviewCount: 34,
      price: 54,
      priceJpy: '¥8,100',
      image: 'assets/products/imabari-towel.jpg',
      gallery: [
        { src: 'assets/products/imabari-towel.jpg', label: 'Waffle Duo' },
        { src: 'assets/products/shop-hero.jpg', label: 'Collection View' }
      ],
      shortDesc: 'Breathable honeycomb-weave waffle cotton towels certified by the Shikoku Imabari Towel Guild.',
      craftStory: 'Woven with mineral-soft Mount Ishizuchi snowmelt spring water in Ehime Prefecture, delivering Cloud-soft loft that packs flat inside carry-on luggage.',
      variants: ['Off-White & Charcoal Duo', 'Crimson & Chalk Duo'],
      specs: [
        'Pure long-staple unbleached organic Japanese cotton',
        'Ultra-compact waffle weave dries rapidly overnight',
        'Certified official Imabari 5-second absorbency mark',
        'Set includes 1 bath travel sheet + 1 hand towel'
      ],
      shippingNote: 'Ready to ship globally within 48 hours',
      featured: false
    },
    {
      id: 'pocket-wifi',
      title: 'Tanogaido Unlimited 5G WiFi Kit',
      origin: 'Nationwide',
      categoryLabel: 'Connectivity',
      category: 'travel',
      status: '7-Day Pass',
      rating: '4.9',
      reviewCount: 118,
      price: 38,
      priceJpy: '¥5,700',
      image: 'assets/products/pocket-wifi.jpg',
      gallery: [
        { src: 'assets/products/pocket-wifi.jpg', label: 'Device & Pouch' },
        { src: 'assets/products/shop-hero.jpg', label: 'Travel Setup' }
      ],
      shortDesc: 'Pocket-sized unlimited data hotspot ready at Haneda, Narita, or Kansai airport arrival counters.',
      craftStory: 'Zero throttling and multi-carrier switching across Docomo and SoftBank towers ensure uninterrupted Google Maps, Shinkansen seat booking, and crystal-clear video calls from Hokkaido to Okinawa.',
      variants: ['7-Day Unlimited Pass', '14-Day Unlimited Pass'],
      specs: [
        'Connect up to 5 smartphones, tablets, or laptops',
        'True unlimited 4G/5G coverage across Japan mountains & rail',
        '14-hour battery endurance + braided USB-C cable included',
        'Pre-paid airport return envelope & Tokyo hotel pickup'
      ],
      shippingNote: 'Airport counter pickup (HND/NRT/KIX) or Tokyo hotel drop',
      featured: false
    }
  ];

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      // Ignore storage errors
    }
  }

  let bag = readStorage(STORAGE_BAG_KEY, []);
  let favs = readStorage(STORAGE_FAV_KEY, []);

  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  }

  function getProductUrl(id) {
    return `product.html?id=${encodeURIComponent(id)}`;
  }

  function getBagTotalCount() {
    return bag.reduce((sum, item) => sum + (item.qty || 0), 0);
  }

  function getBagSubtotal() {
    return bag.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function saveBag() {
    writeStorage(STORAGE_BAG_KEY, bag);
    syncAllBagCounts();
  }

  function syncAllBagCounts() {
    const count = getBagTotalCount();
    const subtotal = getBagSubtotal();
    document.querySelectorAll('[data-bag-count]').forEach((el) => {
      el.textContent = String(count);
    });
    const isShopPage = document.body.classList.contains('is-shop-page');
    const mobileBar = document.getElementById('tg-mobile-bag-bar');
    if (mobileBar) {
      mobileBar.classList.toggle('has-items', isShopPage && count > 0);
      const summaryEl = mobileBar.querySelector('[data-mobile-bag-summary]');
      if (summaryEl) {
        summaryEl.textContent = `${count} ${count === 1 ? 'item' : 'items'} · $${subtotal}`;
      }
    }
  }

  function ensureSharedModals() {
    if (!document.getElementById('tg-bag-backdrop')) {
      const bagHtml = `
        <div class="tg-bag-backdrop" id="tg-bag-backdrop"></div>
        <aside class="tg-bag-drawer" id="tg-bag-drawer" aria-label="Shopping Bag">
          <div class="tg-bag-header">
            <h3 class="tg-bag-title">Shopping Bag (<span data-bag-count>0</span>)</h3>
            <button class="tg-qv-close" id="tg-bag-close" type="button" aria-label="Close bag">&times;</button>
          </div>
          <div class="tg-bag-shipping-bar">
            <span id="tg-bag-ship-text">Free Express Air Shipping from Tokyo on orders over $150</span>
            <div class="tg-bag-progress-track">
              <div class="tg-bag-progress-fill" id="tg-bag-progress-fill"></div>
            </div>
          </div>
          <div class="tg-bag-body" id="tg-bag-body"></div>
          <div class="tg-bag-footer" id="tg-bag-footer"></div>
        </aside>
      `;
      document.body.insertAdjacentHTML('beforeend', bagHtml);
      document.getElementById('tg-bag-close').addEventListener('click', closeBag);
      document.getElementById('tg-bag-backdrop').addEventListener('click', closeBag);
    }

    if (!document.getElementById('tg-mobile-bag-bar') && document.body.classList.contains('is-shop-page')) {
      const mobileBarHtml = `
        <div class="tg-mobile-bag-bar" id="tg-mobile-bag-bar" role="button" tabindex="0" aria-label="View Shopping Bag">
          <span data-mobile-bag-summary>0 items · $0</span>
          <button type="button" class="tg-mobile-bag-bar-cta">View Bag &rarr;</button>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', mobileBarHtml);
      document.getElementById('tg-mobile-bag-bar').addEventListener('click', openBag);
    }
  }

  function addToBag(productId, variant, qty = 1) {
    const p = findProduct(productId);
    if (!p) return;
    const chosenVariant = variant || p.variants[0] || 'Standard';
    const existing = bag.find((item) => item.id === p.id && item.variant === chosenVariant);
    if (existing) {
      existing.qty += qty;
    } else {
      bag.push({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        variant: chosenVariant,
        qty
      });
    }
    saveBag();
    renderBag();
  }

  function isFavorite(id) {
    return favs.includes(id);
  }

  function toggleFavorite(id) {
    if (favs.includes(id)) {
      favs = favs.filter((f) => f !== id);
    } else {
      favs.push(id);
    }
    writeStorage(STORAGE_FAV_KEY, favs);
    document.querySelectorAll(`[data-fav-id="${id}"]`).forEach((btn) => {
      btn.classList.toggle('saved', favs.includes(id));
    });
    return favs.includes(id);
  }

  function renderBag(orderConfirmedCode = null) {
    ensureSharedModals();
    const bodyEl = document.getElementById('tg-bag-body');
    const footerEl = document.getElementById('tg-bag-footer');
    const shipText = document.getElementById('tg-bag-ship-text');
    const fillEl = document.getElementById('tg-bag-progress-fill');

    const subtotal = getBagSubtotal();
    const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    fillEl.style.width = `${pct}%`;

    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shipText.textContent = 'Complimentary Express Air Shipping Unlocked!';
    } else {
      const rem = FREE_SHIPPING_THRESHOLD - subtotal;
      shipText.textContent = `Add $${rem} more for complimentary Express Air Shipping from Tokyo`;
    }

    if (orderConfirmedCode) {
      bodyEl.innerHTML = `
        <div class="tg-order-confirmed">
          <strong>Order #${orderConfirmedCode} Confirmed — Preparing Concierge Invoice</strong>
          Thank you for shopping with Tanogaido. Our Japan concierge team has logged your request and will confirm shipping details shortly via email or WhatsApp.
        </div>
      `;
      footerEl.innerHTML = `
        <button type="button" class="tg-bag-checkout-btn" id="tg-bag-continue">Continue Shopping</button>
      `;
      document.getElementById('tg-bag-continue').addEventListener('click', closeBag);
      return;
    }

    if (!bag.length) {
      bodyEl.innerHTML = `<div class="tg-bag-empty">Your curated Japan shopping bag is currently empty.<br>Explore our Kyoto tea craft, ceramics, and travel gear.</div>`;
      footerEl.innerHTML = `
        <a href="shop.html" class="tg-bag-wa-btn">Browse All Japan Goods &rarr;</a>
      `;
      return;
    }

    bodyEl.innerHTML = bag
      .map((item, idx) => `
        <div class="tg-bag-item">
          <a href="${getProductUrl(item.id)}"><img class="tg-bag-item-img" src="${item.image}" alt="${item.title}"></a>
          <div class="tg-bag-item-info">
            <div class="tg-bag-item-top">
              <a href="${getProductUrl(item.id)}" class="tg-bag-item-name">${item.title}</a>
              <button type="button" class="tg-bag-item-remove" data-remove-idx="${idx}">Remove</button>
            </div>
            <span class="tg-bag-item-variant">${item.variant}</span>
            <div class="tg-bag-item-bottom">
              <div class="tg-bag-mini-qty">
                <button type="button" data-dec-idx="${idx}" aria-label="Decrease quantity">-</button>
                <span>${item.qty}</span>
                <button type="button" data-inc-idx="${idx}" aria-label="Increase quantity">+</button>
              </div>
              <span class="tg-bag-item-price">$${item.price * item.qty}</span>
            </div>
          </div>
        </div>
      `)
      .join('');

    bodyEl.querySelectorAll('[data-remove-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-remove-idx'));
        bag.splice(idx, 1);
        saveBag();
        renderBag();
      });
    });

    bodyEl.querySelectorAll('[data-dec-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-dec-idx'));
        if (bag[idx].qty > 1) {
          bag[idx].qty -= 1;
        } else {
          bag.splice(idx, 1);
        }
        saveBag();
        renderBag();
      });
    });

    bodyEl.querySelectorAll('[data-inc-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-inc-idx'));
        bag[idx].qty += 1;
        saveBag();
        renderBag();
      });
    });

    const itemLines = bag.map((i) => `- ${i.qty}x ${i.title} (${i.variant}) [$${i.price * i.qty}]`).join('\n');
    const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello Tanogaido Shop, I would like to order:\n${itemLines}\nSubtotal: $${subtotal}`)}`;

    footerEl.innerHTML = `
      <div class="tg-bag-subtotal-row">
        <span>Subtotal</span>
        <span>$${subtotal}.00</span>
      </div>
      <form class="tg-bag-form" id="tg-bag-checkout-form">
        <input class="tg-bag-input" type="text" id="tg-order-name" required placeholder="Full name for invoice">
        <input class="tg-bag-input" type="text" id="tg-order-city" required placeholder="Delivery city or Tokyo hotel">
        <button type="submit" class="tg-bag-checkout-btn">Submit Order Request · $${subtotal}</button>
      </form>
      <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="tg-bag-wa-btn">Checkout via WhatsApp Concierge</a>
    `;

    document.getElementById('tg-bag-checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const orderNum = `TG-${Math.floor(1000 + Math.random() * 9000)}`;
      bag = [];
      saveBag();
      renderBag(orderNum);
    });
  }

  function openBag() {
    renderBag();
    document.getElementById('tg-bag-backdrop').classList.add('open');
    document.getElementById('tg-bag-drawer').classList.add('open');
  }

  function closeBag() {
    const bd = document.getElementById('tg-bag-backdrop');
    const dr = document.getElementById('tg-bag-drawer');
    if (bd) bd.classList.remove('open');
    if (dr) dr.classList.remove('open');
  }

  function buildProductCardHTML(p) {
    const isSaved = isFavorite(p.id);
    const url = getProductUrl(p.id);
    return `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-img-wrap">
          <a href="${url}" class="product-card-img-link" aria-label="View ${p.title}">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
          </a>
          <button type="button" class="product-fav-btn ${isSaved ? 'saved' : ''}" data-fav-id="${p.id}" aria-label="Save ${p.title}">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <span class="product-quick-hint">View Product</span>
        </div>
        <div class="product-body">
          <div class="product-meta-row">
            <span class="product-kicker">${p.origin} · ${p.categoryLabel}</span>
            <span class="product-status-note">${p.status}</span>
          </div>
          <a href="${url}" class="product-title-link">
            <h3 class="product-title">${p.title}</h3>
          </a>
          <p class="product-sub">${p.shortDesc}</p>
          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price">$${p.price}</span>
              <span class="product-price-jpy">${p.priceJpy}</span>
            </div>
            <button type="button" class="product-add-btn" data-add-id="${p.id}">+ Bag</button>
          </div>
        </div>
      </article>
    `;
  }

  function bindProductCardEvents(container) {
    container.querySelectorAll('[data-fav-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-fav-id');
        toggleFavorite(id);
      });
    });

    container.querySelectorAll('[data-add-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-add-id');
        addToBag(id, null, 1);
        btn.classList.add('is-added');
        btn.textContent = 'Added';
        setTimeout(() => {
          btn.classList.remove('is-added');
          btn.textContent = '+ Bag';
        }, 1150);
      });
    });
  }

  function renderGrid(container, list) {
    if (!container) return;
    if (!list.length) {
      container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:42px 16px;color:#64748b;font-size:14px;">No items match that filter. Try another category or keyword.</div>`;
      return;
    }
    container.innerHTML = list.map(buildProductCardHTML).join('');
    bindProductCardEvents(container);
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureSharedModals();
    syncAllBagCounts();
    document.querySelectorAll('[data-open-bag]').forEach((btn) => {
      btn.addEventListener('click', openBag);
    });
  });

  window.TANOGAIDO_PRODUCTS = PRODUCTS;
  window.TanogaidoShop = {
    findProduct,
    getProductUrl,
    renderGrid,
    openBag,
    closeBag,
    addToBag,
    isFavorite,
    toggleFavorite,
    syncAllBagCounts
  };
})();
