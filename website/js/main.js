// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== FILTER RESOURCES =====
const filterBtns = document.querySelectorAll('.filter-btn');
const resourceCards = document.querySelectorAll('.resource-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tag = btn.dataset.tag;
    resourceCards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (tag === 'all' || tags.includes(tag)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.3s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== NEWSLETTER FORM =====
function handleSubscribe(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('newsletterSuccess');
  form.style.display = 'none';
  success.style.display = 'block';
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===== SMOOTH REVEAL ON SCROLL =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.topic-card, .resource-card, .tool-card, .notebook-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
