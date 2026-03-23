const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');
const siteHeader = document.querySelector('.site-header');
const heroSection = document.querySelector('#home') || document.querySelector('.page-hero');
const yearEl = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const progressBar = document.querySelector('.scroll-progress');
const sections = document.querySelectorAll('main section[id]');
const interactiveBoxes = document.querySelectorAll(
  '.stat-card, .skill-item, .project-card, .capability-card, .stack-card, .certificate-card, .contact-card, .terminal-card, .feature-card, .panel-card'
);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const syncHeaderState = () => {
  if (!siteHeader || !heroSection) {
    return;
  }

  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const navHeight = siteHeader.offsetHeight;
  const hasScrolledPastHero = window.scrollY > heroBottom - navHeight - 40;
  const isMenuOpen = Boolean(menu && menu.classList.contains('open'));

  siteHeader.classList.toggle('nav-scrolled', hasScrolledPastHero);
  siteHeader.classList.toggle('menu-open', isMenuOpen);
};

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    syncHeaderState();
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      syncHeaderState();
    });
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const normalizePath = (value) => value.split('#')[0].split('/').pop() || 'index.html';
const currentPath = normalizePath(window.location.pathname);

const setActiveSection = () => {
  if (sections.length === 0) {
    menuLinks.forEach((link) => {
      const isActive = normalizePath(link.getAttribute('href') || '') === currentPath;
      link.classList.toggle('active', isActive);
    });
    return;
  }

  const scrollPosition = window.scrollY + 160;
  let currentId = 'home';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  menuLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const isActive = href === `#${currentId}` || normalizePath(href) === currentPath;
    link.classList.toggle('active', isActive);
  });
};

const setScrollProgress = () => {
  if (!progressBar) {
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
};

window.addEventListener('scroll', () => {
  setScrollProgress();
  setActiveSection();
  syncHeaderState();
});

window.addEventListener('resize', syncHeaderState);

setScrollProgress();
setActiveSection();
syncHeaderState();

interactiveBoxes.forEach((box) => {
  box.classList.add('floatable');
  box.addEventListener('click', () => {
    box.classList.remove('is-floating');
    void box.offsetWidth;
    box.classList.add('is-floating');
  });

  box.addEventListener('animationend', () => {
    box.classList.remove('is-floating');
  });
});
