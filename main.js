/* ═══════════════════════════════════════════════════════════
   VIBE CODING CLASS — main.js
   Theme toggle, nav interactions, scroll reveal, animations
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Theme Toggle ─────────────────────────────────────── */
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('vibe-theme', next); } catch (e) { /* ignore */ }
  });

  /* ── Navbar Scroll Shadow ─────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── Mobile Menu ──────────────────────────────────────── */
  const ham = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  ham.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });
  // Expose globally so inline onclick attributes can call it
  window.closeMobile = function () {
    mobileMenu.classList.remove('open');
  };

  /* ── Scroll Reveal ────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function (r) { io.observe(r); });

  /* ── Terminal Line Animation ──────────────────────────── */
  const term = document.getElementById('terminal');
  if (term) {
    const lines = term.querySelectorAll('.terminal-line');
    // Pause all line animations initially
    lines.forEach(function (l) { l.style.animationPlayState = 'paused'; });

    const tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          lines.forEach(function (l, i) {
            l.style.animationDelay = (0.4 + i * 0.18) + 's';
            l.style.animationPlayState = 'running';
          });
          tio.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    tio.observe(term);
  }

  /* ── Animated Seats Counter ───────────────────────────── */
  const seatsSection = document.querySelector('.seats-counter');
  if (seatsSection) {
    const sio = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        let pct = 0;
        const bar = document.getElementById('seatsBar');
        const pctEl = document.getElementById('seatsPct');
        const interval = setInterval(function () {
          pct++;
          if (pct > 68) { clearInterval(interval); return; }
          bar.style.width = pct + '%';
          pctEl.textContent = pct + '%';
        }, 20);
        sio.unobserve(seatsSection);
      }
    }, { threshold: 0.4 });
    sio.observe(seatsSection);
  }

})();
