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
      price: 48,
      priceJpy: '¥7,200',
      image: 'assets/products/uji-matcha.jpg',
      shortDesc: 'First-harvest stone-milled ceremonial matcha in matte crimson lacquer canister with 80-prong bamboo whisk.',
      variants: ['40g Canister + Whisk', '80g Refill Pouch'],
      specs: [
        'Single-cultivar Samidori leaves from Uji, Kyoto',
        'Airtight matte lacquer tin preserves vivid aroma',
        'Ships in protective gift sleeve from Kyoto'
      ],
      featured: true
    },
    {
      id: 'kyoto-tumbler',
      title: 'Kiyomizu-yaki Ceramic Tea Tumbler',
      origin: 'Kyoto',
      categoryLabel: 'Ceramics',
      category: 'tea',
      status: 'Hand-Thrown',
      price: 64,
      priceJpy: '¥9,600',
      image: 'assets/products/kyoto-tumbler.jpg',
      shortDesc: 'Wheel-thrown speckled stoneware tea cup finished with warm vermilion rim by fifth-generation Kyoto potters.',
      variants: ['Speckled Warm White', 'Moss Ash Glaze'],
      specs: [
        'Handcrafted in Higashiyama kiln workshop',
        '240ml capacity · Comfortably insulates warm brews',
        'Signed artisan paulownia wood presentation box'
      ],
      featured: true
    },
    {
      id: 'hakone-folio',
      title: 'Hakone Yosegi Passport & JR Folio',
      origin: 'Hakone',
      categoryLabel: 'Travel Goods',
      category: 'travel',
      status: 'In Stock',
      price: 92,
      priceJpy: '¥13,800',
      image: 'assets/products/hakone-folio.jpg',
      shortDesc: 'Full-grain charcoal calfskin passport sleeve and luggage tag featuring hand-inlaid Hakone geometric wood marquetry.',
      variants: ['Charcoal + Yosegi Set', 'Passport Folio Only'],
      specs: [
        'Dedicated JR Rail Pass, Suica & boarding card slots',
        'Traditional Edo wood marquetry inlay from Kanagawa',
        'Solid brushed brass luggage tag buckle'
      ],
      featured: true
    },
    {
      id: 'fuji-bottle',
      title: 'Mt. Fuji Titanium Thermo Bottle',
      origin: 'Tokyo',
      categoryLabel: 'Rail Gear',
      category: 'travel',
      status: '500ml Light',
      price: 58,
      priceJpy: '¥8,700',
      image: 'assets/products/fuji-bottle.jpg',
      shortDesc: 'Featherweight double-wall insulated bottle finished in matte Tanogaido crimson engineered for Shinkansen day trips.',
      variants: ['500ml Crimson Matte', '350ml Brushed Silver'],
      specs: [
        '18 hours hot / 24 hours cold vacuum insulation',
        'Ultra-lightweight at 195g for effortless walking tours',
        'Fits standard Shinkansen seat cup holders'
      ],
      featured: true
    },
    {
      id: 'hinoki-mist',
      title: 'Kyoto Hinoki & Yuzu Room Mist',
      origin: 'Kyoto',
      categoryLabel: 'Fragrance',
      category: 'home',
      status: '100ml Glass',
      price: 42,
      priceJpy: '¥6,300',
      image: 'assets/products/hinoki-mist.jpg',
      shortDesc: 'Essential oil botanical spray blending aromatic Japanese cypress timber with cold-pressed Kochi yuzu peel.',
      variants: ['100ml Smoked Amber', '200ml Refill Bottle'],
      specs: [
        '100% steam-distilled Kyoto temple cypress oil',
        'UV-shielded frosted amber apothecary glass',
        'Zero synthetic parabens or artificial fixatives'
      ],
      featured: false
    },
    {
      id: 'edo-glass',
      title: 'Edo Kiriko Crimson Sake Carafe',
      origin: 'Tokyo',
      categoryLabel: 'Glassware',
      category: 'craft',
      status: 'Signed Edition',
      price: 118,
      priceJpy: '¥17,700',
      image: 'assets/products/edo-glass.jpg',
      shortDesc: 'Mouth-blown lead crystal carafe and tasting cup hand-faceted with crisp Edo diamond geometric cuts.',
      variants: ['Carafe + 1 Ochoko Cup', 'Gift Set + 2 Cups'],
      specs: [
        'Hand-cut crystal crafted in Sumida, Tokyo',
        'Signature deep ruby overlay with clear interior facets',
        'Packed in cushioned wooden display crate'
      ],
      featured: false
    },
    {
      id: 'imabari-towel',
      title: 'Imabari Organic Travel Towel Duo',
      origin: 'Ehime',
      categoryLabel: 'Textile',
      category: 'craft',
      status: '100% Cotton',
      price: 54,
      priceJpy: '¥8,100',
      image: 'assets/products/imabari-towel.jpg',
      shortDesc: 'Breathable honeycomb-weave waffle cotton towels certified by the Shikoku Imabari Towel Guild.',
      variants: ['Off-White & Charcoal Duo', 'Crimson & Chalk Duo'],
      specs: [
        'Pure long-staple unbleached organic Japanese cotton',
        'Ultra-compact waffle weave dries quickly overnight',
        'Certified 5-second water absorption standard'
      ],
      featured: false
    },
    {
      id: 'pocket-wifi',
      title: 'Tanogaido Unlimited 5G WiFi Kit',
      origin: 'Nationwide',
      categoryLabel: 'Connectivity',
      category: 'travel',
      status: '7-Day Pass',
      price: 38,
      priceJpy: '¥5,700',
      image: 'assets/products/pocket-wifi.jpg',
      shortDesc: 'Pocket-sized unlimited data hotspot ready at Haneda, Narita, or Kansai airport arrival counters.',
      variants: ['7-Day Unlimited Pass', '14-Day Unlimited Pass'],
      specs: [
        'Connect up to 5 smartphones or laptops simultaneously',
        'True unlimited 4G/5G coverage on SoftBank & Docomo',
        'Includes canvas travel pouch & braided USB-C cable'
      ],
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
      // Ignore private browsing quota errors
    }
  }

  let bag = readStorage(STORAGE_BAG_KEY, []);
  let favs = readStorage(STORAGE_FAV_KEY, []);
  let activeQuickViewId = null;
  let activeVariant = '';
  let activeQty = 1;

  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id) || null;
  }

  function saveBag() {
    writeStorage(STORAGE_BAG_KEY, bag);
    syncAllBagCounts();
  }

  function getBagTotalCount() {
    return bag.reduce((sum, item) => sum + (item.qty || 0), 0);
  }

  function getBagSubtotal() {
    return bag.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function syncAllBagCounts() {
    const count = getBagTotalCount();
    document.querySelectorAll('[data-bag-count]').forEach((el) => {
      el.textContent = String(count);
    });
  }

  function ensureSharedModals() {
    if (document.getElementById('tg-qv-backdrop')) return;

    const modalHtml = `
      <div class="tg-qv-backdrop" id="tg-qv-backdrop" role="dialog" aria-modal="true" aria-labelledby="tg-qv-title">
        <div class="tg-qv-modal">
          <button class="tg-qv-close" id="tg-qv-close" type="button" aria-label="Close quick view">&times;</button>
          <div class="tg-qv-media">
            <img id="tg-qv-img" src="" alt="">
          </div>
          <div class="tg-qv-content">
            <span class="tg-qv-kicker" id="tg-qv-kicker"></span>
            <h3 class="tg-qv-title" id="tg-qv-title"></h3>
            <div class="tg-qv-price" id="tg-qv-price"></div>
            <p class="tg-qv-desc" id="tg-qv-desc"></p>
            <div class="tg-qv-variants" id="tg-qv-variants"></div>
            <ul class="tg-qv-specs" id="tg-qv-specs"></ul>
            <div class="tg-qv-actions">
              <div class="tg-qty-stepper">
                <button type="button" id="tg-qv-minus" aria-label="Decrease quantity">-</button>
                <span id="tg-qv-qty">1</span>
                <button type="button" id="tg-qv-plus" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="tg-qv-add-btn" id="tg-qv-add-btn">Add to Bag</button>
            </div>
            <a href="#" target="_blank" rel="noopener noreferrer" class="tg-qv-wa-link" id="tg-qv-wa-link">
              Ask Concierge About This Piece &rarr;
            </a>
          </div>
        </div>
      </div>

      <div class="tg-bag-backdrop" id="tg-bag-backdrop"></div>
      <aside class="tg-bag-drawer" id="tg-bag-drawer" aria-label="Shopping Bag">
        <div class="tg-bag-header">
          <h3 class="tg-bag-title">Shopping Bag (<span data-bag-count>0</span>)</h3>
          <button class="tg-qv-close" id="tg-bag-close" type="button" style="position:static;" aria-label="Close bag">&times;</button>
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
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('tg-qv-close').addEventListener('click', closeQuickView);
    document.getElementById('tg-qv-backdrop').addEventListener('click', (e) => {
      if (e.target.id === 'tg-qv-backdrop') closeQuickView();
    });
    document.getElementById('tg-qv-minus').addEventListener('click', () => {
      if (activeQty > 1) {
        activeQty -= 1;
        document.getElementById('tg-qv-qty').textContent = String(activeQty);
      }
    });
    document.getElementById('tg-qv-plus').addEventListener('click', () => {
      activeQty += 1;
      document.getElementById('tg-qv-qty').textContent = String(activeQty);
    });
    document.getElementById('tg-qv-add-btn').addEventListener('click', () => {
      if (!activeQuickViewId) return;
      addToBag(activeQuickViewId, activeVariant, activeQty);
      closeQuickView();
      openBag();
    });

    document.getElementById('tg-bag-close').addEventListener('click', closeBag);
    document.getElementById('tg-bag-backdrop').addEventListener('click', closeBag);
  }

  function openQuickView(productId) {
    const p = findProduct(productId);
    if (!p) return;
    ensureSharedModals();

    activeQuickViewId = p.id;
    activeVariant = p.variants[0] || '';
    activeQty = 1;

    document.getElementById('tg-qv-img').src = p.image;
    document.getElementById('tg-qv-img').alt = p.title;
    document.getElementById('tg-qv-kicker').textContent = `${p.origin} · ${p.categoryLabel} · ${p.status}`;
    document.getElementById('tg-qv-title').textContent = p.title;
    document.getElementById('tg-qv-price').innerHTML = `$${p.price}<span>${p.priceJpy}</span>`;
    document.getElementById('tg-qv-desc').textContent = p.shortDesc;
    document.getElementById('tg-qv-qty').textContent = '1';

    const variantsEl = document.getElementById('tg-qv-variants');
    variantsEl.innerHTML = p.variants
      .map((v, i) => `<button type="button" class="tg-qv-variant-btn ${i === 0 ? 'active' : ''}" data-variant="${v}">${v}</button>`)
      .join('');
    variantsEl.querySelectorAll('.tg-qv-variant-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeVariant = btn.getAttribute('data-variant') || '';
        variantsEl.querySelectorAll('.tg-qv-variant-btn').forEach((b) => b.classList.toggle('active', b === btn));
      });
    });

    const specsEl = document.getElementById('tg-qv-specs');
    specsEl.innerHTML = p.specs
      .map((s) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>${s}</span></li>`)
      .join('');

    const waText = encodeURIComponent(`Hello Tanogaido Shop, I would like to ask about "${p.title}" ($${p.price}).`);
    document.getElementById('tg-qv-wa-link').href = `https://wa.me/${WA_NUMBER}?text=${waText}`;

    document.getElementById('tg-qv-backdrop').classList.add('open');
  }

  function closeQuickView() {
    const el = document.getElementById('tg-qv-backdrop');
    if (el) el.classList.remove('open');
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
          <img class="tg-bag-item-img" src="${item.image}" alt="${item.title}">
          <div class="tg-bag-item-info">
            <div class="tg-bag-item-top">
              <span class="tg-bag-item-name">${item.title}</span>
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
    const isSaved = favs.includes(p.id);
    return `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-img-wrap" data-qv-trigger="${p.id}">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <button type="button" class="product-fav-btn ${isSaved ? 'saved' : ''}" data-fav-id="${p.id}" aria-label="Save ${p.title}">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <span class="product-quick-hint">Quick View</span>
        </div>
        <div class="product-body">
          <div class="product-meta-row">
            <span class="product-kicker">${p.origin} · ${p.categoryLabel}</span>
            <span class="product-status-note">${p.status}</span>
          </div>
          <h3 class="product-title" data-qv-trigger="${p.id}">${p.title}</h3>
          <p class="product-sub">${p.shortDesc}</p>
          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price">$${p.price}</span>
              <span class="product-price-jpy">${p.priceJpy}</span>
            </div>
            <button type="button" class="product-add-btn" data-add-id="${p.id}">Add to Bag</button>
          </div>
        </div>
      </article>
    `;
  }

  function bindProductCardEvents(container) {
    container.querySelectorAll('[data-qv-trigger]').forEach((el) => {
      el.addEventListener('click', () => {
        openQuickView(el.getAttribute('data-qv-trigger'));
      });
    });

    container.querySelectorAll('[data-fav-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-fav-id');
        if (favs.includes(id)) {
          favs = favs.filter((f) => f !== id);
        } else {
          favs.push(id);
        }
        writeStorage(STORAGE_FAV_KEY, favs);
        btn.classList.toggle('saved', favs.includes(id));
      });
    });

    container.querySelectorAll('[data-add-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-add-id');
        addToBag(id, null, 1);
        btn.classList.add('is-added');
        btn.textContent = 'Added';
        setTimeout(() => {
          btn.classList.remove('is-added');
          btn.textContent = 'Add to Bag';
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
    syncAllBagCounts();
    document.querySelectorAll('[data-open-bag]').forEach((btn) => {
      btn.addEventListener('click', openBag);
    });
  });

  window.TANOGAIDO_PRODUCTS = PRODUCTS;
  window.TanogaidoShop = {
    renderGrid,
    openBag,
    closeBag,
    openQuickView,
    addToBag,
    syncAllBagCounts
  };
})();
