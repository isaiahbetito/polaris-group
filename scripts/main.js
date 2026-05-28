/* Polaris Group — nav, language toggle, reveal-on-scroll, counters, hover glow */

(function () {
  'use strict';

  // ---- Language toggle ----------------------------------------------------

  const STORAGE_KEY = 'polaris-lang';
  const html = document.documentElement;

  function setLang(lang) {
    if (lang !== 'it' && lang !== 'en') lang = 'it';
    html.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }

    document.querySelectorAll('[data-it], [data-en]').forEach((el) => {
      const text = el.dataset[lang];
      if (text === undefined) return;
      if (el.dataset.html === '1' || /<[a-z][\s\S]*>/i.test(text)) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('meta[data-it-content], meta[data-en-content]').forEach((el) => {
      const c = el.dataset[lang + 'Content'];
      if (c !== undefined) el.setAttribute('content', c);
    });

    document.querySelectorAll('[data-it-placeholder], [data-en-placeholder]').forEach((el) => {
      const p = el.dataset[lang + 'Placeholder'];
      if (p !== undefined) el.setAttribute('placeholder', p);
    });

    document.querySelectorAll('.lang-switch__opt').forEach((opt) => {
      opt.classList.toggle('is-active', opt.dataset.lang === lang);
    });
  }

  let initialLang = 'it';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'it' || stored === 'en') {
      initialLang = stored;
    } else if (navigator.language && navigator.language.toLowerCase().startsWith('en')) {
      initialLang = 'en';
    }
  } catch (e) { /* ignore */ }
  setLang(initialLang);

  document.addEventListener('click', (e) => {
    const sw = e.target.closest('.lang-switch');
    if (!sw) return;
    const opt = e.target.closest('.lang-switch__opt');
    if (opt) {
      setLang(opt.dataset.lang);
    } else {
      setLang(html.lang === 'it' ? 'en' : 'it');
    }
  });

  // ---- Nav scroll state ---------------------------------------------------

  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Mobile nav toggle --------------------------------------------------

  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('is-open')) setOpen(false);
    });
  }

  // ---- Reveal on scroll + counter animations ------------------------------

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    document.body.classList.add('has-js');

    // Reveal observer
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));

    // Counter animation: targets [data-counter-to="N"] or auto-detects numeric content
    const animateNumber = (el, to, duration = 1400) => {
      const isPercent = String(to).endsWith('%');
      const hasPlus = String(to).endsWith('+');
      const target = parseFloat(String(to).replace(/[+%]/g, ''));
      if (isNaN(target)) return;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = Math.round(target * eased);
        el.textContent = v + (isPercent ? '%' : '') + (hasPlus ? '+' : '');
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = to;
      };
      requestAnimationFrame(tick);
    };

    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = (el.dataset.counterTo || el.textContent).trim();
        if (/^[0-9]+(\.[0-9]+)?[+%]?$/.test(raw)) {
          el.dataset.counterTo = raw;
          el.textContent = '0' + (raw.endsWith('%') ? '%' : '');
          animateNumber(el, raw);
        }
        counterIO.unobserve(el);
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.counter, .svc__stat-num, .stat-row__num').forEach((el) => counterIO.observe(el));
  }

  // ---- Cursor-follow glow on service cards --------------------------------

  if (!prefersReducedMotion) {
    document.querySelectorAll('.svc').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  // ---- Lazy load videos (don't autoplay until in view, save bandwidth) ----

  if ('IntersectionObserver' in window) {
    const videoIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting) {
          if (v.dataset.src && !v.src) v.src = v.dataset.src;
          v.play().catch(() => { /* autoplay blocked */ });
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('video[data-autoplay-in-view]').forEach((v) => videoIO.observe(v));
  }

})();
