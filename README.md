# O’Riley Foundation

The O’Riley Foundation website describes the parent company behind Flow.

## Portfolio relationship

- **O’Riley Foundation** is the parent company.
- **Flow** is a cross-platform product direction spanning native Android, native iPhone and iPad, and web clients intended to connect through shared services. Its repository is [`ryvo-hardened`](https://github.com/elvkun/ryvo-hardened). The marketing site in the legacy-named ZimLive repository now uses the Flow product name.

The Flow repository maintains the shared [product system](https://github.com/elvkun/ryvo-hardened/blob/main/docs/PRODUCT_SYSTEM.md), including the common palette and current feature-status language. Use that reference when describing Flow here.

The Flow repository contains the Android app, iOS introduction, browser app, and API source. The browser app uses Firebase Auth and Firestore for accounts, profiles, private listing drafts, reports, and published listing discovery when configured. Android service screens use local demonstration data; iOS does not yet connect to shared accounts or services. Payments, identity verification, messaging, and AI services are not available.

## Website

The site is a static, responsive website built from a semantic HTML entry page, a JavaScript module with reusable custom elements, and a separate CSS design system. It needs only a static host; there is no framework runtime, package install, database, analytics, tracking pixel, remote font, or third-party script. The navigation is the only interactive behavior.

The page applies a restrictive Content Security Policy for local assets and has no forms or account flows. The policy is delivered in a meta element for static-host compatibility. [`vercel.json`](vercel.json) adds response security headers, including `frame-ancestors 'none'`, when deployed with Vercel. Configure equivalent headers if using another host. Do not add contact or legal links until verified destinations are available.

Source files: `index.html`, `src/site.js`, and `styles/site.css`. Product content is kept in the platform and principles data arrays in `src/site.js`; components create their markup with DOM APIs and use `textContent` for text. Keep visitor-supplied values out of HTML-string insertion and URL attributes.

The page links to `sitemap.xml` and `robots.txt` for `www.orileyplatforms.com`. The sitemap lists the home page only; section fragments are in-page navigation, not separate sitemap pages. No contact channel, privacy policy, or terms destination is published because verified details have not been supplied.

## Security maintenance

GitHub CodeQL analyzes the website JavaScript on pushes, pull requests, and weekly. Dependabot checks GitHub Actions dependencies weekly. This static site has no package-manager dependencies to audit. The Vercel response-header configuration adds framing protection and browser security headers; review code-scanning alerts and keep these workflows enabled.
