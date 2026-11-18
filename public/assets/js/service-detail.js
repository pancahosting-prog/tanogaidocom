(function () {
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenuModal = document.getElementById('mobile-menu-modal');
  const mobileMenuFluidSvg = document.getElementById('mobile-menu-fluid-svg');
  const mobileMenuFluidPath = document.getElementById('mobile-menu-fluid-path');
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let menuTarget = 0;
  let menuRaw = 0;
  let lastMenuKey = '';
  let lastTick = performance.now();

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeInOutQuart = (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

  function renderMobileFluid(tRaw) {
    if (!mobileMenuModal || !mobileMenuFluidSvg || !mobileMenuFluidPath) return;
    const isVisible = tRaw > 0.002;
    const isClosing = menuTarget === 0 && tRaw > 0.002;
    mobileMenuModal.classList.toggle('is-animating', isVisible);
    mobileMenuModal.classList.toggle('is-closing', isClosing);
    mobileMenuModal.classList.toggle('active', menuTarget === 1 && tRaw > 0.85);
    mobileMenuModal.classList.toggle('content-visible', menuTarget === 1 && tRaw >= 0.78);

    if (!isVisible) {
      if (lastMenuKey !== 'hidden') {
        mobileMenuFluidPath.setAttribute('d', 'M0 0 H0 V0 H0 Z');
        lastMenuKey = 'hidden';
      }
      return;
    }

    const vw = Math.max(window.innerWidth, 320);
    const vh = Math.max(window.innerHeight, 480);
    const key = `${vw}x${vh}:${tRaw.toFixed(3)}`;
    if (key === lastMenuKey) return;
    lastMenuKey = key;

    mobileMenuFluidSvg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    const t = easeInOutCubic(clamp(tRaw, 0, 1));
    const tSlow = easeInOutQuart(clamp(tRaw, 0, 1));

    const startRightX = vw - 8;
    const startLeftX = vw - 144;
    const startH = 52;
    const wingWidth = Math.min(vw + 40, lerp(startRightX - startLeftX, vw + 40, Math.pow(t, 0.85)));
    const rightX = Math.round(lerp(startRightX, vw + 16, t));
    const leftX = Math.round(rightX - wingWidth);
    const bottomY = Math.round(lerp(startH + 8, vh + 24, tSlow));
    const bellyDip = Math.round(Math.sin(t * Math.PI) * 56);
    const bottomEdgeY = Math.min(vh + 40, bottomY + bellyDip);
    const rCorner = Math.round(lerp(24, 0, clamp((t - 0.58) / 0.42, 0, 1)));
    const cLeftX = Math.round(lerp(leftX + wingWidth * 0.28, -20, t));
    const cLeftY = Math.round(Math.min(vh + 30, bottomY + bellyDip * 0.55));
    const cRightX = Math.round(lerp(leftX + wingWidth * 0.75, vw * 0.58, t));

    const d =
      t >= 0.995
        ? `M-8 -8 H${vw + 16} V${vh + 16} H-8 Z`
        : `M${leftX} 0 H${rightX} V${Math.max(24, bottomY - rCorner)} Q${rightX} ${bottomY} ${rightX - rCorner} ${bottomY} C${cRightX} ${bottomEdgeY} ${cLeftX} ${cLeftY} ${leftX} ${Math.max(12, bottomY - rCorner * 1.4)} Z`;
    mobileMenuFluidPath.setAttribute('d', d);
  }

  function setMobileMenu(open) {
    if (!mobileMenuModal) return;
    menuTarget = open ? 1 : 0;
    if (open) {
      mobileMenuModal.classList.remove('is-closing');
    } else {
      mobileMenuModal.classList.remove('content-visible');
      mobileMenuModal.classList.add('is-closing');
    }
    if (isReducedMotion) {
      menuRaw = menuTarget;
      renderMobileFluid(menuRaw);
    }
  }

  if (openMenuBtn) openMenuBtn.addEventListener('click', () => setMobileMenu(true));
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => setMobileMenu(false));
  if (mobileMenuModal) {
    mobileMenuModal.addEventListener('click', (e) => {
      if (e.target.closest('[data-mobile-services-toggle]')) return;
      if (e.target === mobileMenuModal || e.target.closest('.mobile-nav-list a, .mobile-menu-footer a')) {
        setMobileMenu(false);
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMobileMenu(false);
  });

  function tick(now) {
    const dt = clamp((now - lastTick) / 1000, 0.001, 0.05);
    lastTick = now;
    const speed = menuTarget === 1 ? 3.2 : 3.9;
    if (Math.abs(menuRaw - menuTarget) > 0.001) {
      menuRaw =
        menuRaw < menuTarget
          ? Math.min(menuTarget, menuRaw + dt * speed)
          : Math.max(menuTarget, menuRaw - dt * speed);
      renderMobileFluid(menuRaw);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const nForm = document.getElementById('newsletter-form');
  const nEmail = document.getElementById('newsletter-email');
  const nNote = document.getElementById('newsletter-note');
  if (nForm && nEmail && nNote) {
    nForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!nEmail.value.trim() || !nEmail.checkValidity()) {
        nEmail.focus();
        return;
      }
      nNote.textContent = 'Subscribed! Watch your inbox for curated Japan travel inspiration.';
      nNote.classList.add('is-success');
      nEmail.value = '';
    });
  }
})();
