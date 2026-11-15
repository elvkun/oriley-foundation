# O’Riley Foundation

The O’Riley Foundation website presents a technology organization developing digital products and a broader portfolio of projects. Flow is its current featured project; additional projects have not been announced.

## Portfolio relationship

- **O’Riley Foundation** is the organization behind the project portfolio.
- **Flow** is the current featured project, a cross-platform product direction spanning native Android, native iPhone and iPad, and web clients intended to connect through shared services. Its repository is [`ryvo-hardened`](https://github.com/elvkun/ryvo-hardened). The marketing site in the legacy-named ZimLive repository now uses the Flow product name.

The Flow repository maintains the shared [product system](https://github.com/elvkun/ryvo-hardened/blob/main/docs/PRODUCT_SYSTEM.md), including the common palette and current feature-status language. Use that reference when describing Flow here.

The Flow repository contains the Android app, iOS introduction, browser app, and API source. The browser app uses Firebase Auth and Firestore for accounts, profiles, private listing drafts, reports, and published listing discovery when configured. Android service screens use local demonstration data; iOS does not yet connect to shared accounts or services. Payments, identity verification, messaging, and AI services are not available.

## Website

The site is a static, responsive website built from a semantic HTML entry page, a JavaScript module with reusable custom elements, and a separate CSS design system. It needs only a static host, with no package install for normal site builds, database, analytics, tracking pixel, remote font, or externally hosted script. The optional sample-data demo includes a locally bundled React runtime. Navigation, the illustrative Flow feature carousel, and the optional demo are the interactive elements. Public Flow documentation is available at `/docs/`, linked from the main navigation and product section. Its static content and section links also work without JavaScript.

The pages apply restrictive Content Security Policies for local assets and have no account flows. Demo forms update sample data in memory; native form submissions are blocked. The policies are delivered in meta elements for static-host compatibility. [`vercel.json`](vercel.json) adds response security headers, including `frame-ancestors 'none'` for the main pages and same-origin framing for the demo, when deployed with Vercel. Configure equivalent headers if using another host. Do not add contact or legal links until verified destinations are available.

Source files: `index.html`, `src/site.js`, and `styles/site.css`. Product content is kept in the platform and principles data arrays in `src/site.js`; components create their markup with DOM APIs and use `textContent` for text. Keep visitor-supplied values out of HTML-string insertion and URL attributes.

The page links to `sitemap.xml` and `robots.txt` for `www.orileyplatforms.com`. The sitemap lists the home page and `/docs/`; section fragments are in-page navigation, not separate sitemap pages. The footer links to the Flow Privacy Policy on `zimlive.app`. That notice covers Flow product surfaces and clearly identifies the operator/contact and jurisdiction details still requiring confirmation; it is not a privacy policy for any separate Foundation services.

## Security maintenance

GitHub CodeQL analyzes the website JavaScript on pushes, pull requests, and weekly. Dependabot checks GitHub Actions dependencies weekly. This static site has no package manifest; maintain the bundled demo dependencies through the Flow app's lockfile and refresh the demo after relevant updates. The Vercel response-header configuration adds framing protection and browser security headers; review code-scanning alerts and keep these workflows enabled.

## Public Flow documentation

`docs/index.html` is a visitor guide covering platform availability, demonstration content, feature limitations, and the existing Flow privacy notice. Developer setup, architecture, configuration, API details, and internal engineering links are intentionally excluded from public pages. Shared public navigation links to this guide rather than the source repository. It shares the Foundation stylesheet and navigation. Keep its feature claims aligned with `ryvo-hardened/docs/PRODUCT_SYSTEM.md` and review it when platform capabilities change. No additional dependencies are required.

Run `node scripts/build-public.mjs` before deployment or local review. The build copies exactly eleven reviewed public files into a clean `dist/` directory and rejects source symlinks. Vercel is configured to build and publish only `dist/`. For other hosts, explicitly publish only `dist/` and apply equivalent response security headers. Never serve the repository root: `.git`, `.codex`, agent instructions, maintenance documentation, and deployment configuration must remain outside the public artifact.

For a local preview, run `python3 -m http.server 8765 --bind 127.0.0.1 --directory dist` after building. Rebuild after source edits. Public browser-delivered JavaScript and HTML must never contain secrets; removing a link does not revoke access to a repository that is already public.

The homepage describes the broader Foundation portfolio at `/#projects`. Keep Flow platform availability scoped to Flow, and do not invent future project names, service offerings, launch dates, or shared account/data capabilities.

The Flow guide includes a CSS phone illustration with four fictional feature previews. Native horizontal scroll works without JavaScript. Enhanced controls support arrows, dots, keyboard navigation, and a pausable slideshow; reduced-motion preferences disable automatic rotation. Previews do not connect to accounts or app data.

## Interactive Flow demo

The phone can switch from marketing illustrations to the actual Flow browser demo interface. `/demo/` is a self-contained, sample-data React bundle shared with the app’s `/demo` route. It does not import the Firebase workspace or account SDK, connect to live services, persist demo inputs, or contain source maps. The app’s profile and private draft practice tools run in memory. The walkthrough is optional and can be skipped or replayed.

To refresh the reviewed demo after changes in the Flow app, install that repository’s locked dependencies, then run `node scripts/sync-flow-demo.mjs /absolute/path/to/ryvo-hardened` here, followed by `node scripts/build-public.mjs`. The sync script checks its module allowlist before copying the bundle and rejects CSS with asset URLs/imports. Keep the generated demo script and stylesheet with this site so normal Foundation builds do not depend on a neighboring checkout.

Only the docs page may embed same-origin frames. Only `/demo/` allows same-origin framing. Its sandbox permits scripts and local form events but excludes same-origin privileges, popups, and top navigation. Demo CSP denies network connections and native form submissions. Standard Foundation pages remain unframeable. Verify response headers on the real host after deployment; the Python preview serves content and meta CSP but does not apply Vercel HTTP headers.

Run `node --test tests/*.test.mjs` to check carousel/demo switching and the public build boundary. The build tests verify the exact file allowlist, removal of stale generated files, exclusion of private repository files, and rejection of source symlinks. These checks do not replace a real-browser review of layout, keyboard access, or iframe/CSP behavior.
