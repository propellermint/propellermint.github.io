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

/* ── LIGHTBOX ── */
function initLightbox() {
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (!lightbox) return;

  // open on any img inside .media-placeholder
  document.querySelectorAll('.media-placeholder img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  // close on button, backdrop click, or Escape key
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

/* ── PROJECTS HORIZONTAL SCROLL ── */
function initProjectsScroll() {
  const outer    = document.getElementById('projects-track-outer');
  const prevBtn  = document.getElementById('proj-prev');
  const nextBtn  = document.getElementById('proj-next');
  const progress = document.getElementById('proj-progress');
  if (!outer) return;

  const STEP = 360;

  function updateProgress() {
    const max  = outer.scrollWidth - outer.clientWidth;
    const pct  = max > 0 ? (outer.scrollLeft / max) * 100 : 0;
    progress.style.width = Math.max(10, pct) + '%';
    prevBtn.disabled = outer.scrollLeft <= 0;
    nextBtn.disabled = outer.scrollLeft >= max - 1;
  }

  prevBtn.addEventListener('click', () => {
    outer.scrollBy({ left: -STEP, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    outer.scrollBy({ left: STEP, behavior: 'smooth' });
  });

  outer.addEventListener('scroll', updateProgress);
  updateProgress();

  // drag to scroll
  let isDragging = false, startX = 0, scrollStart = 0;

  outer.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX;
    scrollStart = outer.scrollLeft;
    outer.classList.add('dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    outer.scrollLeft = scrollStart - (e.pageX - startX);
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    outer.classList.remove('dragging');
  });

  // mouse wheel horizontal scroll
  outer.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    outer.scrollBy({ left: e.deltaY * 1.5 });
    updateProgress();
  }, { passive: false });
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
  initLightbox();
  initProjectsScroll();
});