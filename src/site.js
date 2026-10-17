const flowRepository = 'https://github.com/elvkun/ryvo-hardened';
const flowWebApp = 'https://zimlive-app-offocial-webiste.vercel.app/';

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function brandLink(caption, footer = false) {
  const brand = element('a', footer ? 'brand footer-brand' : 'brand');
  brand.href = '#top';
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
    for (const [label, href] of [['Flow', '#flow'], ['Principles', '#focus'], ['About', '#about']]) {
      const link = element('a', '', label);
      link.href = href;
      nav.append(link);
    }
    const projectLink = element('a', 'nav-project-link', 'Project ↗');
    projectLink.href = flowRepository;
    projectLink.target = '_blank';
    projectLink.rel = 'noopener noreferrer';
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
        detail: 'The broadest Flow interface today, with settings and a device-local app gate. Service screens use local demonstration data.',
      },
      {
        name: 'iOS',
        status: 'Introduction',
        symbol: 'i',
        detail: 'A native SwiftUI introduction to Flow. Shared accounts, data, and service integrations are not available yet.',
      },
      {
        name: 'Web',
        status: 'Browser app',
        symbol: 'W',
        detail: 'Email accounts, profiles, private reports and listing drafts, and published listing discovery when Firebase is configured.',
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
    note.textContent = 'The project repository includes implementation notes, architecture, and current limitations.';
    const link = document.createElement('a');
    link.href = flowRepository;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'text-link';
    link.textContent = 'Explore the Flow repository ↗';
    const appLink = document.createElement('a');
    appLink.href = flowWebApp;
    appLink.target = '_blank';
    appLink.rel = 'noopener noreferrer';
    appLink.className = 'text-link';
    appLink.textContent = 'Open Flow in your browser ↗';
    portfolio.append(note, appLink, link);
    this.replaceChildren(grid, portfolio);
  }
}

class FoundationPrinciples extends HTMLElement {
  connectedCallback() {
    const principles = [
      ['01', 'Security as a practice', 'Keep credentials and provider secrets on trusted server systems. Review data flows and boundaries before connecting a service.'],
    ['02', 'Accurate product language', 'Make clear which screens use local demonstration data and which actions reach a configured service.'],
      ['03', 'Steady, maintainable systems', 'Prefer small, reviewable changes and documented contracts that can be tested and operated responsibly.'],
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
    footer.id = 'about';
    const main = element('div', 'container footer-main');
    const statement = element('p', 'footer-statement', 'Building thoughtful digital products, one clear step at a time.');
    const project = element('a', 'footer-link', 'Flow on GitHub ↗');
    project.href = flowRepository;
    project.target = '_blank';
    project.rel = 'noopener noreferrer';
    main.append(brandLink('PARENT COMPANY BEHIND FLOW', true), statement, project);
    const meta = element('div', 'container footer-meta');
    meta.append(element('span', '', '© 2026 O’Riley Foundation'), element('span', '', 'Flow features vary by platform and configured services.'));
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
