/* ═══════════════════════════════════════
   AutoMob 24/7 — script.js
   ═══════════════════════════════════════ */

/* ── Preloader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 2000);
});

// /* ── Custom Cursor ── */
// const cursor = document.getElementById('cursor');
// const follower = document.getElementById('cursor-follower');
// let mx = 0, my = 0, fx = 0, fy = 0;

// document.addEventListener('mousemove', (e) => {
//   mx = e.clientX; my = e.clientY;
//   cursor.style.left = mx + 'px';
//   cursor.style.top = my + 'px';
// });

// function animateFollower() {
//   fx += (mx - fx) * 0.12;
//   fy += (my - fy) * 0.12;
//   follower.style.left = fx + 'px';
//   follower.style.top  = fy + 'px';
//   requestAnimationFrame(animateFollower);
// }
// animateFollower();

document.querySelectorAll('button, a, .login-card, .faq-item, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    follower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.opacity = '0.4';
  });
});

/* ── Header Scroll ── */
const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  if (s > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
  lastScroll = s;
});

/* ── Mobile Nav ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const overlay   = document.getElementById('overlay');
const mobileClose = document.getElementById('mobile-nav-close');

hamburger?.addEventListener('click', () => {
  mobileNav.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}
mobileClose?.addEventListener('click', closeMobileNav);
overlay?.addEventListener('click', closeMobileNav);

/* ── Login Modal ── */
const loginConfig = {
  user:      { icon: '👤', title: 'User Login',          sub: 'Access your AutoMob dashboard',          btn: 'Login as User',       color: '#f97316' },
  garage:    { icon: '🔧', title: 'Garage Login',         sub: 'Manage your garage bookings',            btn: 'Login as Garage',     color: '#06b6d4' },
  tow:       { icon: '🚗', title: 'Tow Provider Login',   sub: 'Accept and manage tow requests',         btn: 'Login as Provider',   color: '#f59e0b' },
  admin:     { icon: '🛡️', title: 'Admin Dashboard',      sub: 'Platform administration panel',          btn: 'Access Dashboard',    color: '#8b5cf6' },
  emergency: { icon: '🚨', title: 'Emergency Help',       sub: 'Get immediate roadside assistance',      btn: 'Find Help Now',       color: '#ef4444' },
};

function openLoginModal(type) {
  const cfg = loginConfig[type] || loginConfig.user;
  document.getElementById('modal-icon').textContent = cfg.icon;
  document.getElementById('modal-title').textContent = cfg.title;
  document.getElementById('modal-sub').textContent   = cfg.sub;
  const btn = document.getElementById('modal-btn');
  btn.textContent = cfg.btn;
  btn.style.background = `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)`;

  document.getElementById('modal-backdrop').classList.add('open');
  document.getElementById('login-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('modal-backdrop').classList.remove('open');
  document.getElementById('login-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLoginModal();
});

/* ── FAQ Accordion ── */
function toggleFaq(item) {
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => {
    if (i !== item) i.classList.remove('active');
  });
  item.classList.toggle('active');
}

/* ── Scroll Reveal (AOS-like) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => revealObserver.observe(el));

/* ── Particle Generator ── */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${3 + Math.random() * 5}s;
      --d: ${Math.random() * 4}s;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ── Counter Animation ── */
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const startVal = 0;
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(startVal + (target - startVal) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── Smooth Active Nav Highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active-nav');
          link.style.color = 'var(--text)';
        } else {
          link.style.color = '';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ── Search bar UX ── */
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const locationBtn = document.querySelector('.search-location-btn');

searchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && searchInput.value.trim()) {
    openLoginModal('user');
  }
});

searchBtn?.addEventListener('click', () => {
  if (searchInput && searchInput.value.trim()) {
    openLoginModal('user');
  } else if (searchInput) {
    searchInput.focus();
    searchInput.placeholder = 'Please enter a location or service...';
    setTimeout(() => {
      searchInput.placeholder = 'Find garages, tow trucks, petrol pumps near you...';
    }, 2500);
  }
});

locationBtn?.addEventListener('click', () => {
  if (navigator.geolocation) {
    locationBtn.innerHTML = '<span class="material-symbols-outlined" style="animation:spin 1s linear infinite">refresh</span>';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (searchInput) searchInput.value = `Near me (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
        locationBtn.innerHTML = '<span class="material-symbols-outlined">my_location</span>';
      },
      () => {
        locationBtn.innerHTML = '<span class="material-symbols-outlined">my_location</span>';
      }
    );
  }
});

/* Spin keyframe injected */
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

/* ── FAB show/hide on scroll ── */
const fab = document.getElementById('fab');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    fab.style.opacity = '1';
    fab.style.transform = 'scale(1)';
  } else {
    fab.style.opacity = '0';
    fab.style.transform = 'scale(0.7)';
  }
});
fab.style.opacity = '0';
fab.style.transform = 'scale(0.7)';
fab.style.transition = 'opacity 0.3s, transform 0.3s';