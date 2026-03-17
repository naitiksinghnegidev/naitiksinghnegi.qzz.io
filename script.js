const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const THEME_KEY = 'portfolio-theme';

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  root.setAttribute('data-theme', isLight ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    const icon = themeToggle.querySelector('.theme-toggle-icon');
    const text = themeToggle.querySelector('.theme-toggle-text');

    if (icon) icon.textContent = isLight ? '☀️' : '🌙';
    if (text) text.textContent = isLight ? 'Light' : 'Dark';
  }
};

const initialTheme = localStorage.getItem(THEME_KEY) || 'dark';
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');
const yearEl = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const progressBar = document.querySelector('.scroll-progress');
const sections = document.querySelectorAll('main section[id]');
const interactiveBoxes = document.querySelectorAll(
  '.stat-card, .skill-item, .project-card, .capability-card, .stack-card, .certificate-card, .contact-card, .terminal-card'
);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
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

const setActiveSection = () => {
  const scrollPosition = window.scrollY + 160;
  let currentId = 'home';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  menuLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
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
});

setScrollProgress();
setActiveSection();

interactiveBoxes.forEach((box) => {
  box.classList.add('floatable');
  box.addEventListener('click', () => {
    box.classList.remove('is-floating');
    // Restart animation so each click triggers the effect.
    void box.offsetWidth;
    box.classList.add('is-floating');
  });

  box.addEventListener('animationend', () => {
    box.classList.remove('is-floating');
  });
});
