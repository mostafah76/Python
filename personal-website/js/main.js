// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.course-card, .research-card, .highlight-item, .contact-item, .expertise-item'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.exp-fill').forEach(fill => {
          const target = fill.style.width;
          fill.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { fill.style.width = target; }, 100);
          });
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const expertiseSection = document.querySelector('.about-expertise');
if (expertiseSection) barObserver.observe(expertiseSection);

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('formSuccess');
  form.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
  form.querySelector('button[type="submit"]').style.display = 'none';
  success.style.display = 'block';
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--primary)' : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => activeObserver.observe(s));
