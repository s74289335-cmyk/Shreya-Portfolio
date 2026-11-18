cat > script.js <<'EOF'
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const profile = {
  email: 'shreyavernekar007@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shreya-udaya-vernekar-570603345/',
  github: 'https://github.com/s74289335-cmyk'
};

const projectLinks = {
  'secureai-demo': 'https://cb11df24.secureai-8kt.pages.dev/',
  'secureai-repo': 'https://github.com/secureai79/SecureAI',
  'layerly-demo': '',
  'layerly-repo': '',
  'ranano-demo': 'https://ranano.pages.dev/',
  'ranano-repo': 'https://github.com/s74289335-cmyk/Ranano',
  'diffusion-demo': '',
  'diffusion-repo': ''
};

const emailLink = document.getElementById('emailLink');

if (profile.email) {
  emailLink.href = `mailto:${profile.email}`;
} else {
  emailLink.addEventListener('click', event => {
    event.preventDefault();
    alert('Add your email address in script.js before publishing this portfolio.');
  });
}

const externalLinks = document.querySelectorAll('.contact-link');

if (profile.linkedin) externalLinks[0].href = profile.linkedin;
if (profile.github) externalLinks[1].href = profile.github;

document.querySelectorAll('[data-project-link]').forEach(link => {
  const url = projectLinks[link.dataset.projectLink];

  if (url) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.removeAttribute('aria-disabled');
  } else {
    link.addEventListener('click', event => {
      event.preventDefault();
      alert('This project link will be available soon.');
    });
  }
});
EOF
