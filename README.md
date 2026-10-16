# O’Riley Foundation

The O’Riley Foundation website describes the parent company behind Flow.

## Portfolio relationship

- **O’Riley Foundation** is the parent company.
- **Flow** is a cross-platform product direction spanning native Android, native iPhone and iPad, and web clients intended to connect through shared services. Its repository is [`ryvo-hardened`](https://github.com/elvkun/ryvo-hardened). The marketing site in the legacy-named ZimLive repository now uses the Flow product name.

The Flow repository contains the Android prototype and iOS and web previews. The web preview supports a limited listing flow when its API and Supabase services are configured. Production payments, identity verification, messaging, and AI services are not available.

## Website

The site is a static, responsive website built from a semantic HTML entry page, a JavaScript module with reusable custom elements, and a separate CSS design system. It needs only a static host; there is no framework runtime, package install, database, analytics, tracking pixel, remote font, or third-party script. The navigation is the only interactive behavior.

The page applies a restrictive Content Security Policy for local assets and has no forms or account flows. When hosting supports response headers, also set `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `frame-ancestors 'none'` in the CSP response header. Do not add contact or legal links until verified destinations are available.

Source files: `index.html`, `src/site.js`, and `styles/site.css`. Product content is kept in the platform and principles data arrays in `src/site.js`; use text nodes for dynamic content rather than inserting visitor-supplied strings into HTML.

The page links to `sitemap.xml` and `robots.txt` for `www.orileyplatforms.com`. The sitemap lists the home page only; section fragments are in-page navigation, not separate sitemap pages. No contact channel, privacy policy, or terms destination is published because verified details have not been supplied.
