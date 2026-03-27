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

/* ── CAROUSEL ── */
function initCarousel() {
  const track    = document.getElementById('carousel-track');
  const outer    = document.getElementById('carousel-outer');
  const cards    = track ? track.querySelectorAll('.carousel-card') : [];
  const prevBtn  = document.getElementById('proj-prev');
  const nextBtn  = document.getElementById('proj-next');
  const counter  = document.getElementById('proj-counter');
  const dotsWrap = document.getElementById('proj-dots');
  const progress = document.getElementById('proj-progress');
  if (!cards.length || !prevBtn) return;
 
  let current = 0;
  let timer   = null;
 
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'proj-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    // dotsWrap.appendChild(dot);
  });
 
  function goTo(i) {
    cards[current].classList.remove('active');
    // dotsWrap.children[current].classList.remove('active');
    current = (i + cards.length) % cards.length;
    cards[current].classList.add('active');
    // dotsWrap.children[current].classList.add('active');
    const cardW = cards[0].offsetWidth + 19;
    track.style.transform = 'translateX(' + (-current * cardW) + 'px)';
    counter.textContent = (current + 1) + ' / ' + cards.length;
    progress.style.width = Math.round((current + 1) / cards.length * 100) + '%';
  }
 
  function startTimer() { timer = setInterval(() => goTo(current + 1), 5000); }
  function stopTimer()  { clearInterval(timer); timer = null; }
  function resetTimer() { stopTimer(); startTimer(); }
 
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  outer.addEventListener('mouseenter', stopTimer);
  outer.addEventListener('mouseleave', startTimer);
 
  goTo(0);
  startTimer();
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
  initLightbox();
  initCarousel();
});