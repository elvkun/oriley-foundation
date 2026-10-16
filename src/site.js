const flowRepository = 'https://github.com/elvkun/ryvo-hardened';

class FoundationHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="container nav-shell">
          <a class="brand" href="#top" aria-label="O’Riley Foundation home">
            <span class="brand-mark" aria-hidden="true">O</span>
            <span class="brand-copy"><span class="brand-name">O’Riley Foundation</span><span class="brand-caption">PRODUCTS WITH PURPOSE</span></span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
            <span class="menu-icon" aria-hidden="true"></span><span class="visually-hidden">Toggle navigation</span>
          </button>
          <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
            <a href="#flow">Flow</a><a href="#focus">Principles</a><a href="#about">About</a>
            <a class="nav-project-link" href="${flowRepository}" target="_blank" rel="noopener noreferrer">Project <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>`;

    const button = this.querySelector('.menu-toggle');
    const nav = this.querySelector('.primary-nav');
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
        status: 'Prototype',
        symbol: 'A',
        detail: 'The most complete client today: a native demonstration app with local sample content, settings, and a device-local app gate.',
      },
      {
        name: 'iOS',
        status: 'Preview',
        symbol: 'i',
        detail: 'A native SwiftUI introduction to Flow. Account features, persistence, and service integrations are not included.',
      },
      {
        name: 'Web',
        status: 'Preview',
        symbol: 'W',
        detail: 'A focused marketplace experience for published listings and private seller drafts when the API and Supabase are configured.',
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
    portfolio.append(note, link);
    this.replaceChildren(grid, portfolio);
  }
}

class FoundationPrinciples extends HTMLElement {
  connectedCallback() {
    const principles = [
      ['01', 'Security as a practice', 'Keep credentials and provider secrets on trusted server systems. Review data flows and boundaries before connecting a service.'],
      ['02', 'Accurate product language', 'Describe a prototype as a prototype. Make clear which screens are local demonstrations and which actions reach a configured service.'],
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
    this.innerHTML = `
      <footer class="site-footer" id="about">
        <div class="container footer-main">
          <a class="brand footer-brand" href="#top" aria-label="O’Riley Foundation home">
            <span class="brand-mark" aria-hidden="true">O</span>
            <span class="brand-copy"><span class="brand-name">O’Riley Foundation</span><span class="brand-caption">PARENT COMPANY BEHIND FLOW</span></span>
          </a>
          <p class="footer-statement">Building thoughtful digital products, one clear step at a time.</p>
          <a class="footer-link" href="${flowRepository}" target="_blank" rel="noopener noreferrer">Flow on GitHub <span aria-hidden="true">↗</span></a>
        </div>
        <div class="container footer-meta"><span>© 2026 O’Riley Foundation</span><span>Flow is an early product prototype.</span></div>
      </footer>`;
  }
}

customElements.define('foundation-header', FoundationHeader);
customElements.define('flow-platforms', FlowPlatforms);
customElements.define('foundation-principles', FoundationPrinciples);
customElements.define('foundation-footer', FoundationFooter);
