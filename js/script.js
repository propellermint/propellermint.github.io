/* ── BACK TO TOP ── */
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

/* ── NAV: transparent → solid on scroll ── */
const navbar = document.getElementById('navbar');

function updateNav() {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/* ── HERO FADE: fades dark color in over the background image ── */
const heroFade = document.getElementById('hero-fade');

function updateHeroFade() {
  if (!heroFade) return;
  const fadeZone = window.innerHeight * 0.65;
  heroFade.style.opacity = Math.min(1, window.scrollY / fadeZone);
}

/* ── ACTIVE NAV LINK: highlights current page ── */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) {
      link.classList.add('active');
    }
  });
}

/* ── SCROLL ANIMATIONS: fade in sections as they enter view ── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

/* ── INIT ── */
window.addEventListener('scroll', () => {
  updateNav();
  updateHeroFade();
  updateBackToTop();
});

document.addEventListener('DOMContentLoaded', () => {
  updateNav();
  setActiveNav();
  initScrollAnimations();
});