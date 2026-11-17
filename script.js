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

// Add verified contact details and project URLs here before publishing.
// Leave values blank until the real destination is confirmed.
const profile = {
  email: '',
  linkedin: '',
  github: ''
};
const projectLinks = {
  'secureai-demo': '',
  'secureai-repo': '',
  'layerly-demo': '',
  'layerly-repo': '',
  'diffusion-demo': '',
  'diffusion-repo': ''
};

const emailLink = document.getElementById('emailLink');
if (profile.email) emailLink.href = `mailto:${profile.email}`;
else emailLink.addEventListener('click', event => {
  event.preventDefault();
  alert('Add your email address in script.js before publishing this portfolio.');
});
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
      alert('The verified project URL has not been added yet. Add it in projectLinks inside script.js.');
    });
  }
});
