# AI Chef website

Static GitHub Pages landing page, built with HTML, CSS and JavaScript. No build step or dependencies. The existing Pages configuration publishes the repository root from `main`.

## Current design

Warm editorial hero: ingredient scan illustration → real Braised Lamb Shanks recipe screen → supplied finished-meal photograph. Official Apple and Google store badges link to the existing store listings. Four steps explain the workflow, four feature cards summarize the product, four real screenshots show the app, and seven native FAQ disclosures answer common questions. A separate support page uses the existing support email.

The scan phone is an edited marketing illustration, not a real app screenshot. The central recipe screen and gallery use supplied real screenshots; CSS hides their Android status/navigation bars. Screenshot dialogs support keyboard activation, Escape, backdrop dismissal and focus restoration. Gallery images load lazily. The different recipes in gallery stages 02–04 remain as supplied: the owner deferred replacement screenshots.

## SEO

Homepage and support include titles, descriptions, canonical URLs, Open Graph/Twitter metadata and descriptive image text. The homepage has factual MobileApplication JSON-LD. `robots.txt` points to `sitemap.xml`, which lists the homepage, support and existing legal pages. Google Search Console verification requires the owner's actual verification token or file; none is invented.

## Analytics

GA4 is **disabled**: `assets/analytics-config.js` has an empty `measurementId` and `consentGranted: false`. No Google analytics script loads in this state.

To configure later, supply the actual `G-…` measurement ID and integrate a consent interface. After consent, set `window.AIChefAnalyticsConfig.consentGranted = true` and dispatch `window.dispatchEvent(new Event('aichef:analytics-consent'))`. Revocation uses `false` and the same event. This hook is not a completed consent UI. Existing legal pages and text have been preserved.

When configured and permitted, the code initializes a page view and tracks `google_play_click`, `app_store_click`, `privacy_click`, `terms_click` and `support_click`, with link URL/location. Advertising consent remains denied. Verify real collection in GA4 Realtime/DebugView once configured and deployed.

Consent reference: https://developers.google.com/tag-platform/security/guides/consent

## Validation — October 2, 2026

- Internal HTML links, anchors and image/script/style assets resolve.
- Homepage/support metadata, one H1 per page, image alt attributes, JSON-LD and XML sitemap checks pass.
- External new-tab links use `noopener noreferrer`; no inline event handlers or obvious credential patterns were found in authored assets.
- All three JavaScript files pass `node --check`.
- Mocked GA4 checks pass: absent ID/consent, invalid/placeholder IDs, initialization, click events, duplicate loader prevention, consent revocation/regrant and event allowlist. Tests send no network requests.
- Real browser checks cover desktop/mobile layout, screenshot dialogs and FAQ disclosures.
- Existing privacy, terms and app-ads files match the previous Git commit byte-for-byte.

These checks cover the static repository and local preview. They are not a penetration test, Lighthouse audit, ranking guarantee or live GA4 collection verification. Hosting headers and production behavior need verification after deployment.

## Preview and publish

Run `python3 -m http.server 8765 --bind 127.0.0.1` in the repository, then open `http://127.0.0.1:8765/`. Root-relative URLs match the existing GitHub Pages root deployment.

Push the reviewed commit when ready to publish. No Pages settings or workflow changes are required. The current task creates a local commit; it does not push or deploy.
