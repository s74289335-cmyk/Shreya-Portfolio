const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle?.setAttribute('aria-controls', 'nav');

function setMenu(open) {
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

menuToggle?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

document.getElementById('year').textContent = new Date().getFullYear();

const profile = {
  email: 'shreyavernekar007@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shreya-udaya-vernekar-570603345/',
  github: ''
};

const projectLinks = {
  'secureai-demo': 'https://cb11df24.secureai-8kt.pages.dev/',
  'secureai-repo': 'https://github.com/secureai79/SecureAI',
  'layerly-demo': '',
  'layerly-repo': '',
  'ranano-demo': 'https://ranano.pages.dev/',
  'ranano-repo': 'https://github.com/s74289335-cmyk/Ranano'
};

const emailLink = document.getElementById('emailLink');
if (emailLink && profile.email) emailLink.href = `mailto:${profile.email}`;

const externalLinks = document.querySelectorAll('.contact-link');
if (externalLinks[0] && profile.linkedin) externalLinks[0].href = profile.linkedin;
if (externalLinks[1] && profile.github) externalLinks[1].href = profile.github;

const toast = document.createElement('div');
toast.className = 'toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
document.body.appendChild(toast);
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('[data-project-link]').forEach(link => {
  const url = projectLinks[link.dataset.projectLink];
  if (url) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.removeAttribute('aria-disabled');
  } else {
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('role', 'link');
    link.addEventListener('click', e => {
      e.preventDefault();
      showToast('This link will be available soon.');
    });
  }
});

const bar = document.createElement('div');
bar.className = 'scroll-progress';
document.body.prepend(bar);

const header = document.querySelector('.site-header');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  header?.classList.toggle('is-stuck', scrollY > 20);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.project-card, .experience-card, .credential-preview, .toolkit, .contact-panel');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--d', `${(i % 3) * 70}ms`);
    io.observe(el);
  });
}

const navLinks = [...document.querySelectorAll('.nav a[href^="#"]:not(.nav-contact)')];
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => {
    const section = document.querySelector(a.getAttribute('href'));
    if (section) spy.observe(section);
  });
}

document.querySelectorAll('.project-card, .experience-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
