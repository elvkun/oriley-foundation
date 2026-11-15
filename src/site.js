const flowDocumentation = '/docs/';
const flowWebApp = 'https://zimlive-app-offocial-webiste.vercel.app/';

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function brandLink(caption, footer = false) {
  const brand = element('a', footer ? 'brand footer-brand' : 'brand');
  brand.href = '/#top';
  brand.setAttribute('aria-label', 'O’Riley Foundation home');
  const mark = element('span', 'brand-mark', 'O');
  mark.setAttribute('aria-hidden', 'true');
  const copy = element('span', 'brand-copy');
  copy.append(element('span', 'brand-name', 'O’Riley Foundation'), element('span', 'brand-caption', caption));
  brand.append(mark, copy);
  return brand;
}

class FoundationHeader extends HTMLElement {
  connectedCallback() {
    const header = element('header', 'site-header');
    const shell = element('div', 'container nav-shell');
    const button = element('button', 'menu-toggle');
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'primary-nav');
    const icon = element('span', 'menu-icon');
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon, element('span', 'visually-hidden', 'Toggle navigation'));
    const nav = element('nav', 'primary-nav');
    nav.id = 'primary-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    for (const [label, href] of [['Projects', '/#projects'], ['Flow docs', '/docs/'], ['Principles', '/#focus'], ['About', '/#about']]) {
      const link = element('a', '', label);
      link.href = href;
      if (href === '/docs/' && location.pathname.startsWith('/docs/')) link.setAttribute('aria-current', 'page');
      nav.append(link);
    }
    const projectLink = element('a', 'nav-project-link', 'Our work');
    projectLink.href = '/#projects';
    nav.append(projectLink);
    shell.append(brandLink('PRODUCTS WITH PURPOSE'), button, nav);
    header.append(shell);
    this.replaceChildren(header);

    button?.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      nav?.classList.toggle('is-open', !isOpen);
    });
    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      button?.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
  }
}

class FlowPlatforms extends HTMLElement {
  connectedCallback() {
    const platforms = [
      {
        name: 'Android',
        status: 'Local app',
        symbol: 'A',
        detail: 'Explore Flow’s broader interface and settings. Service screens use demonstration data.',
      },
      {
        name: 'iOS',
        status: 'Introduction',
        symbol: 'i',
        detail: 'An introduction to Flow. Shared accounts and connected service features are not available yet.',
      },
      {
        name: 'Web',
        status: 'Browser app',
        symbol: 'W',
        detail: 'Email accounts, profiles, private reports and listing drafts, and published listing discovery where enabled.',
      },
    ];
    const grid = document.createElement('div');
    grid.className = 'platform-grid';
    platforms.forEach(({ name, status, symbol, detail }, index) => {
      const card = document.createElement('article');
      card.className = 'platform-card';
      const top = document.createElement('div');
      top.className = 'platform-card-top';
      const mark = document.createElement('span');
      mark.className = 'platform-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = symbol;
      const statusTag = document.createElement('span');
      statusTag.className = 'status-tag';
      statusTag.textContent = status;
      top.append(mark, statusTag);
      const number = document.createElement('span');
      number.className = 'card-number';
      number.textContent = `0${index + 1}`;
      const title = document.createElement('h3');
      title.textContent = name;
      const copy = document.createElement('p');
      copy.textContent = detail;
      card.append(top, number, title, copy);
      grid.append(card);
    });
    const portfolio = document.createElement('div');
    portfolio.className = 'portfolio-link-row';
    const note = document.createElement('p');
    note.textContent = 'Read the public guide to Flow’s platforms and current limitations.';
    const link = document.createElement('a');
    link.href = flowDocumentation;
    link.className = 'text-link';
    link.textContent = 'Explore the Flow guide →';
    const appLink = document.createElement('a');
    appLink.href = flowWebApp;
    appLink.target = '_blank';
    appLink.rel = 'noopener noreferrer';
    appLink.className = 'text-link';
    appLink.textContent = 'Open Flow in your browser ↗';
    portfolio.append(note, link, appLink);
    this.replaceChildren(grid, portfolio);
  }
}

class FoundationPrinciples extends HTMLElement {
  connectedCallback() {
    const principles = [
      ['01', 'Security as a practice', 'Keep public information focused on what visitors need, and clearly explain the limits of available features.'],
    ['02', 'Accurate product language', 'Make clear which screens show examples and which features are available to use.'],
      ['03', 'Steady, maintainable systems', 'Build carefully and check changes before making them available to visitors.'],
    ];
    const grid = document.createElement('div');
    grid.className = 'principles-grid';
    principles.forEach(([number, titleText, detail]) => {
      const article = document.createElement('article');
      article.className = 'principle-card';
      const index = document.createElement('span');
      index.className = 'principle-number';
      index.textContent = number;
      const title = document.createElement('h3');
      title.textContent = titleText;
      const copy = document.createElement('p');
      copy.textContent = detail;
      article.append(index, title, copy);
      grid.append(article);
    });
    this.replaceChildren(grid);
  }
}

class FoundationFooter extends HTMLElement {
  connectedCallback() {
    const footer = element('footer', 'site-footer');
    const main = element('div', 'container footer-main');
    const statement = element('p', 'footer-statement', 'Building thoughtful digital products, one clear step at a time.');
    const project = element('a', 'footer-link', 'Flow documentation');
    project.href = flowDocumentation;
    main.append(brandLink('TECHNOLOGY & DIGITAL PRODUCTS', true), statement, project);
    const meta = element('div', 'container footer-meta');
    meta.append(element('span', '', '© 2026 O’Riley Foundation'), element('span', '', 'Technology projects, built with intention.'));
    const privacy = element('a', 'footer-link', 'Flow Privacy Policy');
    privacy.href = 'https://zimlive.app/privacy-policy.html';
    meta.append(privacy);
    footer.append(main, meta);
    this.replaceChildren(footer);
  }
}

customElements.define('foundation-header', FoundationHeader);
customElements.define('flow-platforms', FlowPlatforms);
customElements.define('foundation-principles', FoundationPrinciples);
customElements.define('foundation-footer', FoundationFooter);

// The showcase is an illustration only; it never reads accounts or app data.
for (const showcase of document.querySelectorAll('.flow-showcase')) {
  const track = showcase.querySelector('.phone-carousel');
  const slides = [...track.querySelectorAll('.phone-slide')];
  const dots = [...showcase.querySelectorAll('[data-slide]')];
  const play = showcase.querySelector('[data-play]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = motion.matches;
  let inView = false;
  let hovered = false;
  let demoOpen = false;
  let timer;
  function render() {
    showcase.querySelector('[data-showcase-index]').textContent = demoOpen ? 'TRY / FLOW' : `${String(current + 1).padStart(2, '0')} / 04`;
    showcase.querySelector('[data-showcase-title]').textContent = demoOpen ? 'Try the app interface' : slides[current].dataset.title;
    showcase.querySelector('[data-showcase-caption]').textContent = demoOpen ? 'Skip or start the optional guide. Use the app menu to try profiles, marketplace drafts, and other sample-data journeys. Changes reset on reload.' : slides[current].dataset.caption;
    dots.forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === current)));
    play.hidden = demoOpen || motion.matches;
    play.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
  }
  function go(index) {
    if (demoOpen) return;
    track.scrollTo({ left: ((index + slides.length) % slides.length) * track.clientWidth, behavior: motion.matches ? 'instant' : 'smooth' });
  }
  function schedule() {
    clearInterval(timer);
    if (!demoOpen && !paused && !hovered && inView && !document.hidden && !motion.matches) timer = setInterval(() => go(current + 1), 5500);
  }
  function manual(index) { paused = true; go(index); render(); schedule(); }
  const toggleDemo = showcase.querySelector('[data-toggle-demo]');
  const demoFrame = showcase.querySelector('.phone-live-demo');
  toggleDemo.hidden = false;
  toggleDemo.addEventListener('click', () => {
    demoOpen = !demoOpen;
    paused = true;
    track.hidden = demoOpen;
    demoFrame.hidden = !demoOpen;
    if (demoOpen && !demoFrame.hasAttribute('src')) demoFrame.src = '/demo/';
    if (demoOpen) demoFrame.scrollIntoView?.({ block: 'nearest', behavior: motion.matches ? 'instant' : 'smooth' });
    toggleDemo.setAttribute('aria-pressed', String(demoOpen));
    toggleDemo.textContent = demoOpen ? 'Back to feature previews' : 'Try interactive demo';
    showcase.querySelector('.showcase-controls').hidden = demoOpen;
    render();
    schedule();
  });
  showcase.querySelector('.showcase-controls').hidden = false;
  showcase.querySelector('[data-previous]').addEventListener('click', () => manual(current - 1));
  showcase.querySelector('[data-next]').addEventListener('click', () => manual(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => manual(index)));
  play.addEventListener('click', () => { paused = !paused; render(); schedule(); });
  track.addEventListener('scroll', () => {
    const index = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    if (index !== current) { current = index; render(); }
  }, { passive: true });
  track.addEventListener('pointerdown', () => { paused = true; render(); schedule(); });
  track.addEventListener('keydown', (event) => {
    const destinations = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
    if (event.key in destinations) { event.preventDefault(); manual(destinations[event.key]); }
  });
  showcase.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  showcase.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  showcase.addEventListener('focusin', () => { paused = true; render(); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { if (motion.matches) paused = true; render(); schedule(); });
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting && entry.intersectionRatio >= .4; schedule(); }, { threshold: .4 }).observe(showcase);
  new ResizeObserver(() => { if (!demoOpen) track.scrollTo({ left: current * track.clientWidth, behavior: 'instant' }); }).observe(track);
  render();
}
