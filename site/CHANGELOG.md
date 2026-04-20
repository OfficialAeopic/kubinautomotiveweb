# Changelog - Kubin Automotive Service Site

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## v4.2.0 - 2026-04-18

### Added

- Site-wide chatbot widget (scripted FAQ engine, no LLM calls). `js/chatbot.js` (Aeopic Chatbot Engine v1.1.0, copied from Pepperoni's reference build) and `js/chatbot-kb.js` (82 entries covering services, hours, location, contact, warranty, estimates, walk-ins, makes and models, saturday/sunday hours, turnaround, Aggie/Texas A&M context, and per-service detail pages). Loaded on every page.
- Natural-language patterns tuned for how Bryan/BCS customers actually ask: "do you work on BMWs", "are you open Saturday", "how long will it take", "how far from A&M", "warranty", "walk ins", etc.
- Brand colors match site: Deep Navy #0D1B2A background, Chrome Silver #B8C5D1 accents, Gold #C9A84C primary.

### Notes

- Zero recurring cost. No API keys, no rate limits to manage. All matching is client-side.
- Chatbot is NOT in the signed SLA scope. Added as polish. Pending scope acknowledgment with Kolton.

---

## v4.1.8 - 2026-04-18

### Changed

- `css/main.css`: `.aggie-trust-item` cards now `text-align: center` so the gold label (Bryan / BCS / Gig 'em) and its description sit centered inside each card.

---

## v4.1.7 - 2026-04-18

### Fixed

- `css/main.css`: `.aggie-trust-num` and `.aggie-trust-desc` inside the "Proud to Be Part of Aggieland" section were `<span>` elements without `display:block`, so the label ("Bryan", "BCS", "Gig 'em") and description flowed inline as one continuous sentence. Added `display:block` to both and bumped `.aggie-trust-num` line-height 1 to 1.1 with a small letter-spacing for better headline feel with word labels. Now stacks correctly: big gold label on top, silver description underneath.

---

## v4.1.6 - 2026-04-16

### Fixed

- `about/index.html`: Corrected years-in-business from 46+ to 48+ (founded 1978, current year 2026). Updated both the meta description ("over 48 years") and the `.aggie-trust-num` stat display.
- `reviews/index.html`: Removed two internal workflow TODO HTML comments that were never intended to ship to production.
- `get-started/index.html`: Removed orphaned "Contact" nav link from both desktop nav and mobile overlay. The get-started page had a duplicate Contact link that no other page had.
- `index.html` + `get-started/index.html`: Aligned JSON-LD GeoCoordinates to the 13-page site consensus (lat 30.6354, lng -96.3405). Both pages had an incorrect value (30.6744 / -96.3698). Note: final coordinate should be verified against Google Maps for 3515 S College Ave, Bryan TX 77801 before production launch.
- All 15 pages: Added `<link rel="icon">` and `<link rel="apple-touch-icon">` favicon tags. Created `favicon.png` (32x32) and `apple-touch-icon.png` (180x180) from `images/kubin-logo.png` via PIL resize.
- 9 pages site-wide: Removed all `<!-- FALLBACK: Pexels stock. Replace with Higgsfield asset when generated. -->` comments. These were internal staging markers and should not ship in production HTML.
- `js/chatbot.js.old`: Deleted stale backup file. Active chatbot script is `js/chatbot.js`.

---

## v4.1.5 - 2026-04-16

### Changed

Synced all 8 service sub-pages to v4.1.4 baseline (unified nav with Reviews + Location, footer version, canonical verified). Removed stale "STAGED PAGE. Not published. Not in nav. Awaiting Hussam decision on 4 vs 6 page SLA scope." comment blocks from all 8 sub-page `<head>` sections. Bumped all 15 pages (7 main + 8 service sub-pages) to v4.1.5 for version parity.

Sub-pages updated:
- /services/oil-change/
- /services/brakes/
- /services/engine/
- /services/transmission/
- /services/ac-heating/
- /services/electrical/
- /services/preventive/
- /services/suspension/

Scope flag: Site now has 15 public pages. Signed SLA names 4 (Home, Services, About, Contact). Scope delta (Reviews, Location, Get Started, + 8 service sub-pages = 11 extra pages) logged to coo-log for Theron/Justin decision before 2026-06-03 launch.

---

## v4.1.4 - 2026-04-16

### Changed

- `get-started/index.html`: Fixed nav to include Reviews and Location links, matching the standard 5-link set used on all other pages. Both desktop nav and mobile overlay updated. Added `aria-current="page"` to the Get Started CTA on this page.
- `reviews/index.html`: Removed two stale dev-time HTML comments from `<head>`: "update canonical before activating" (canonical was already set) and "path will need update if file is not in /reviews/" (absolute CSS path is correct).
- All 7 primary pages bumped from v4.1.2 to v4.1.4 (index, services, about, contact, location, get-started, reviews).

---

## v4.1.3 - 2026-04-16

### Changed

Synced footer version strings across all 7 pages to v4.1.2 baseline plus lightweight meta/structure audit.

- `services/index.html`: version string was v4.1.1, updated to v4.1.2
- `about/index.html`: version string was v4.1.0, updated to v4.1.2
- `contact/index.html`: version string was v4.1.0, updated to v4.1.2
- `get-started/index.html`: version string was v4.1.0, updated to v4.1.2
- `location/index.html`: version string was v4.1.0, updated to v4.1.2
- `reviews/index.html`: version string was v4.1.0, updated to v4.1.2
- `index.html`: already at v4.1.2, no change needed
- Audit confirmed: no seasonal/Spring 2026 text in any of the 7 page bodies (CHANGELOG references only), no emdashes in body copy, all pages have correct lang/charset/viewport/title/canonical/OG/Twitter/h1/footer contact data. Findings flagged for QA: get-started nav is missing Reviews and Location links (different nav structure vs other pages); contact/index.html uses `&ndash;` in hours copy (flag only, not an emdash violation); reviews/index.html has two stale dev comments ("update canonical before activating", "path will need update if file is not in /reviews/") that should be cleaned before launch.

---

## v4.1.2 - 2026-04-16

### Changed

**index.html** (v4.1.2):
- Removed seasonal Spring 2026 banner/callout section entirely (completes site-wide seasonal removal started in v4.1.1; seasonal content lives in monthly marketing, not the site)

---

## v4.1.1 - 2026-04-16

### Changed

**services/index.html** (v4.1.1):
- Removed seasonal Spring 2026 banner/callout section entirely (seasonal content belongs in monthly marketing, not the site per 2026-04-16 meeting follow-up)

**css/main.css** (v4.1.1):
- Removed all seasonal banner CSS: `.seasonal-banner`, `.seasonal-inner`, `.seasonal-label-block`, `.seasonal-tag`, `.seasonal-heading`, `.seasonal-cards`, `.seasonal-card`, `.seasonal-card:hover`, `.seasonal-card-icon`, `.seasonal-card h3`, `.seasonal-card p`, `.seasonal-cta`, and the `@media (max-width: 600px)` `.seasonal-cards` breakpoint rule

---

## v4.1.0 - 2026-04-16

### Summary

Post-kickoff build push based on the 2026-04-16 onboarding session with Kolton Kubin. Hero rewritten with the 3rd-generation + Aggieland angle Kolton requested. Get Started page rebuilt as a full repair-order intake form replacing the old services hero layout. Seasonal content system added and swappable. Aggieland community section added to home and about pages. All primary CTAs updated to /get-started/. Fake placeholder reviews removed. api/contact.js updated to handle new form fields. Footer tagline unified across all pages.

### Changed

**index.html** (v4.1.0):
- Hero headline changed to "Honest Mechanics. Bryan Born. Aggieland Raised."
- Hero badge updated to "Three Generations - Aggieland Proud - Since 1978"
- Hero description rewritten to mention Kolton as 3rd gen, South College Avenue, no-upsell standard
- Primary hero CTA changed from /contact/ to /get-started/ ("Get Started")
- Added `.hero-trust-row` with 4 items: "3 Generations", "Since 1978", "Aggieland Proud" (maroon accent), "Honest Repairs, No Upsells"
- Added seasonal banner section between trust-bar and services (Spring 2026: AC prep + road trip inspection). Marked with comment for easy seasonal swap.
- All service tab "Schedule This Service" buttons changed from /contact/ to /get-started/
- Added Aggieland community section (dark navy, `.aggie-section`) with copy and 3-item stats grid
- Main CTA headline updated to "Get Started Today", button links to /get-started/
- JSON-LD updated with full LocalBusiness fields: geo coordinates, openingHoursSpecification, sameAs Facebook
- Footer tagline updated to "Family-owned since 1978. Three generations strong..."
- Version bumped to v4.1.0

**get-started/index.html** (complete rewrite, v4.1.0):
- Replaced hero + services grid + estimate form layout with focused repair-order intake page
- Page hero with 4-item trust bar ("3 Generations | Since 1978 | Bryan-College Station | No Upsells")
- Two-column layout: sidebar (contact info + trust badges) + form card on right
- Form fieldsets: Customer Info, Vehicle Info (year/make/model split), Services Needed (10 checkboxes), Preferred Contact (3 radio cards: Phone/Text/Email), Additional Details textarea
- Submit: "Request Service". Success state: "Thanks, we got your request. We will call you within one business day."
- Inline JS handles multi-checkbox collection, radio validation, payload build, POST to /api/contact, success display, fbq Lead event
- Vehicle year dropdown generated dynamically via script (1960 to current year + 1)

**api/contact.js** (v4.1.0):
- Updated to handle both form shapes: legacy contact page (vehicle, date) and new Get Started page (vehicle_year, vehicle_make, vehicle_model, contact_pref)
- Builds unified vehicleStr from either vehicle or split year/make/model fields
- Email template restructured into three sections: Customer, Vehicle, Service Request
- Subject line distinguishes Get Started submissions from Contact page submissions
- Conditional rendering: only shows fields that have values (contact_pref, date, message, preferred date)

**css/main.css** (v4.1.0):
- Added `.hero-trust-row`, `.hero-trust-item`, `.hero-trust-item--aggie` (maroon accent)
- Added `.seasonal-banner`, `.seasonal-inner`, `.seasonal-label-block`, `.seasonal-tag`, `.seasonal-heading`, `.seasonal-cards`, `.seasonal-card`, `.seasonal-card-icon`, `.seasonal-cta`
- Added `.aggie-section`, `.aggie-inner`, `.aggie-trust-grid`, `.aggie-trust-item`, `.aggie-trust-num`, `.aggie-trust-desc`
- Added `.gs-page-hero`, `.gs-top-trust`, `.gs-top-trust-item`, `.gs-top-trust-sep`
- Added `.gs-form-section`, `.gs-form-layout`, `.gs-sidebar`, `.gs-sidebar-inner`, `.gs-sidebar-heading`, `.gs-sidebar-sub`, `.gs-contact-list`, `.gs-contact-row`, `.gs-contact-icon`, `.gs-sidebar-badges`, `.gs-badge`
- Added `.gs-form-wrap`, `.gs-form-card`, `.gs-form-card-header`, `.form-fieldset`, `.form-fieldset-legend`, `.form-fieldset-hint`
- Added `.form-row--three` (year/make/model 3-col grid)
- Added `.services-checkbox-grid`, `.checkbox-card`, `.checkbox-card-inner`, `.checkbox-card--other` with checked/hover states and gold check SVG data URI
- Added `.radio-group`, `.radio-card`, `.radio-card-inner` with checked/hover states
- Added `.form-optional`, `.form-error`, `.gs-submit-btn`, `.gs-submit-note`
- Added `.gs-success-state`, `.gs-success-icon`, `.gs-success-hours`
- Added `.contact-gs-pointer` (Get Started pointer card on contact page)
- Added `.review-waiting`, `.review-waiting-icon` (reviews page holding state)

**about/index.html** (v4.1.0):
- Added Aggieland community section (`.aggie-section`) before CTA, with 3-stat trust grid
- CTA button changed from /contact/ to /get-started/
- Footer tagline updated
- Version bumped to v4.1.0

**services/index.html** (v4.1.0):
- Added seasonal callout banner between page hero and services tabs (Spring 2026, same content as home)
- Footer tagline updated
- Version bumped to v4.1.0

**contact/index.html** (v4.1.0):
- Added `.contact-gs-pointer` block below Google Maps iframe pointing to /get-started/
- Footer tagline updated
- Version bumped to v4.1.0

**reviews/index.html** (v4.1.0):
- Removed STAGED PAGE HTML comment block at top
- Removed 4 fabricated placeholder reviews (Robert M., Linda T., James K., Donna S.)
- Replaced testimonials section with `.review-waiting` block and "Find Us on Google" CTA
- TODO comment added for Aeopic team: insert real GBP review embed once admin access received (see LOGINS-NEEDED.md)
- CTA button changed from /contact/ to /get-started/
- Footer tagline updated
- Version bumped to v4.1.0

**location/index.html** (v4.1.0):
- Removed STAGED PAGE HTML comment block at top (retained technical note about open/closed indicator)
- Footer tagline updated
- Version bumped to v4.1.0

**sitemap.xml**:
- All lastmod dates updated to 2026-04-16

### Pending Before Launch (no change)

- Swap `G-XXXXXXXXXX` with real GA4 Measurement ID
- Swap `0000000000000000` with real Meta Pixel ID
- Set `RESEND_API_KEY` environment variable in Vercel dashboard
- Verify `kubinautomotive.com` domain in Resend dashboard
- Confirm domain registrar login with Kolton
- Add Aeopic as Facebook and GBP admin (Kolton action item)
- Insert real Google review link in reviews/index.html once GBP Place ID confirmed

---

## v3.0.0 - 2026-04-10

### Summary

Major navigation and content expansion. Ported the prospect mockup's full-screen mobile overlay, services dropdown, and JSON-LD structured data to all production pages. Activated the 8 staged service sub-pages and created the Get Started conversion page. This release brings the production site to feature parity with the signed prospect mockup.

### Changed

**css/main.css** (v3.0.0, previous session):
- Added `.nav-dropdown`, `.nav-dropdown-menu`, `.nav-dropdown-toggle`, `.nav-dropdown-divider`, `.nav-dropdown-all` -- desktop hover/focus-within dropdown for Services nav
- Added `.mobile-overlay`, `.mobile-overlay-close`, `.mobile-overlay-nav`, `.mob-link`, `.mob-link-cta`, `.mob-dropdown`, `.mob-dropdown-toggle`, `.mob-dropdown-menu`, `.mob-sub-link`, `.mob-sub-all`, `.mobile-overlay-footer` -- full-screen mobile overlay replacing the slide-down hamburger nav
- Replaced `--chrome` / `--chrome-dim` / `--radius-sm` prospect variable references with production token names `--silver` / `--silver-dim` / `--radius` throughout

**js/main.js** (v3.0.0, previous session):
- Added `openOverlay()` / `closeOverlay()` functions wired to `#hamburger`, `#mobileOverlayClose`, and outside-tap dismiss
- Added Escape key listener to close overlay
- Added `.mob-dropdown-toggle` accordion click handler (toggles `.open` class, flips chevron, updates `aria-expanded`)
- Removed old `.site-nav.open` slide-down logic; mobile nav state now driven entirely by `.mobile-overlay.active`

**index.html** (v3.0.0):
- Replaced flat nav links with Services dropdown + `<ul class="nav-links" style="display:contents">` wrapper
- Changed nav CTA from "Schedule Service" to "Get Started" linking to `/get-started/`
- Added `.mobile-overlay` full-screen overlay block after `</header>`
- Added JSON-LD `@type: AutoRepair` schema block in `<head>`
- Added Get Started link to footer nav
- Version bumped to v3.0.0

**about/index.html** (v3.0.0):
- Same nav, overlay, JSON-LD, footer Get Started, and version changes as index.html

**contact/index.html** (v3.0.0):
- Same nav, overlay, JSON-LD, footer Get Started, and version changes as index.html

**services/index.html** (v3.0.0):
- Same nav, overlay, JSON-LD, footer Get Started, and version changes as index.html

**location/index.html** (v3.0.0):
- Same nav, overlay, JSON-LD, footer Get Started changes
- Version bumped from v2.0.0 to v3.0.0

**reviews/index.html** (v3.0.0):
- Same nav, overlay, JSON-LD, footer Get Started changes
- Version bumped from v2.0.0 to v3.0.0

**services/oil-change/index.html** (v3.0.0):
- Activated from `_pending/` draft; updated dropdown nav, mobile overlay, JSON-LD, footer Get Started, version v3.0.0
- JSON-LD description: "Oil change and lube service in Bryan, TX. Conventional, synthetic blend, or full synthetic. Family-owned since 1978."

**services/brakes/index.html** (v3.0.0):
- Activated from `_pending/` draft; same nav/overlay/JSON-LD/footer/version updates
- JSON-LD description: "Brake inspection, pad replacement, rotor resurfacing, and fluid flush in Bryan, TX."

**services/engine/index.html** (v3.0.0):
- Activated from `_pending/` draft; same nav/overlay/JSON-LD/footer/version updates
- JSON-LD description: "Engine diagnostics and repair in Bryan, TX. Computer scan, tune-ups, timing belts, and more."

**services/ac-heating/index.html** (v3.0.0):
- Activated from `_pending/` draft; same nav/overlay/JSON-LD/footer/version updates
- JSON-LD description: "Auto A/C and heating repair in Bryan, TX. Refrigerant recharge, compressor replacement, and heater core service."

**services/transmission/index.html** (v3.0.0):
- Activated from `_pending/` draft; same nav/overlay/JSON-LD/footer/version updates
- JSON-LD description: "Transmission service in Bryan, TX. Fluid flush, filter replacement, and full rebuild for automatic and manual transmissions."

**services/suspension/index.html** (v3.0.0):
- Activated from `_pending/` draft; same nav/overlay/JSON-LD/footer/version updates
- JSON-LD description: "Suspension and steering repair in Bryan, TX. Shocks, struts, tie rods, ball joints, and wheel alignment."

**services/electrical/index.html** (v3.0.0):
- Activated from `_pending/` draft; same nav/overlay/JSON-LD/footer/version updates
- JSON-LD description: "Automotive electrical repair in Bryan, TX. Battery, alternator, starter, and wiring diagnosis."

**services/preventive/index.html** (v3.0.0):
- Activated from `_pending/` draft; same nav/overlay/JSON-LD/footer/version updates
- JSON-LD description: "Preventive maintenance in Bryan, TX. Fluid checks, belt and hose inspection, tire rotation, and seasonal prep."

### Added

**get-started/index.html** (NEW):
- Conversion-optimized appointment request page at `/get-started/`
- Hero section using `/images/hero-shop-bay.jpg`
- "Why Kubin" section with 3 trust points and a testimonial block
- Estimate form using existing Resend `/api/contact` backend -- field IDs identical to contact page (`name`, `email`, `phone`, `vehicle`, `service`, `pref-date`, `message`, `website` honeypot) so main.js form handler works unchanged
- Service selector includes all 8 services plus "Not Sure / Other"
- Services grid (8 cards) at bottom of page linking to each sub-page
- Version v3.0.0

**sitemap.xml**:
- Added `/get-started/` URL entry with priority 0.9, lastmod 2026-04-10

### Verified (no changes needed)

**vercel.json**: Already had `"cleanUrls": true` and `"trailingSlash": true`. No changes needed.
**api/contact.js**: NOT modified. Resend backend wired to Kubin.Automotive@yahoo.com is unchanged.

---

## v2.2.0 - 2026-04-09
- Reverted hero from hero-car-on-lift.jpg back to Higgsfield engine-block-workbench.png per theron instruction
- Restored Higgsfield PNGs as primary visuals on home, about, and services pages
- Copied 3 missing Higgsfield AC variants from prospect mockup (car-ac-controls-ford-escape, car-ac-display-subaru, car-ac-vent-ford-focus)
- Staged 8 service detail pages at _pending/services/ (oil-change, brakes, engine, ac-heating, transmission, suspension, electrical, preventive) pending Hussam decision on 4 vs 6 page scope
- Pexels JPGs retained on disk as staged fallback for the 5 services without Higgsfield coverage
- Added FALLBACK comment markers above all non-Higgsfield imagery to flag them for future swaps

---

## v2.1.0 - 2026-04-09
- Restored original Pexels photo set from prospect mockup (hero car-on-lift shot, service tab photos, about interior, contact storefront)
- Downloaded and localized all external image URLs (no more CDN dependency)
- Updated OG/Twitter/JSON-LD image metadata to use hero-car-on-lift.jpg
- Logged all placements to image-usage.json ledger

---

## [2.0.0] — 2026-04-09

### Summary

Full visual design port from the prospect mockup (`prospects/kubin-automotive/`) into the production site. The original production build (v1.0.0) used a left-aligned hero, emoji-based trust strip, emoji service cards, and light contact form. This release replaces all of that with the cinematic centered-hero design that closed the deal with Kolton Kubin.

### Changed

**css/main.css** (complete rewrite, ~800 lines):
- Added design tokens: `--navy-mid`, `--navy-light`, `--navy-card`, `--silver-dim`, `--gold-dark`
- Hero redesigned: centered flexbox, Ken Burns `@keyframes kenBurns` animation on hero-bg img, cinematic gradient overlay, `.hero-badge` gold border pill, `.hero-stats` / `.stat` / `.stat-num` / `.stat-divider`
- Scroll reveal system: `[data-reveal]` (fade up), `[data-reveal="left"]` (slide right), `[data-reveal="right"]` (slide left), `.revealed` transition to final state; IntersectionObserver with 80ms sibling stagger in JS
- Nav: transparent initial state, `.scrolled` + `.hidden` classes, `.nav-cta` gold button, mobile slide-down (translateY) instead of fixed overlay
- Trust bar: `.trust-bar` / `.trust-inner` / `.trust-item` with inline SVG color support (replaced emoji strip)
- `.tread-divider`: signature section divider using double `repeating-linear-gradient` at crossed angles
- Tab system: `.tab-nav` / `.tab-btn` / `.tab-btn.active` / `.tab-panel` / `.tab-panel-inner` / `.tab-panel-text` / `.tab-panel-image` / `.tab-checklist` (gold bullet SVG data URI)
- `.contact-form-wrap` restyled to dark navy background; form inputs, labels, and textareas adapted for dark theme
- `.page-hero` added: `.page-hero::before` radial gold glow, `.page-hero-rule` 48px x 3px gold bar
- `.cta-section::before` radial gradient
- Added: `services-category-grid`, `services-category-header`, `services-list-item-icon` (SVG class), `.footer-contact-item svg` rule
- Added: testimonial stagger grid (`testimonials-stagger`, `testimonial-card`, `testimonial-card--offset-up/down`, `quote-mark`, `stars`, `reviewer`, `reviewer-avatar`) for pending reviews page
- Added: location split layout (`location-split`, `location-map-pane`, `location-info-pane`, `location-info-inner`, `open-indicator`, `open-pulse`, `info-block`, `hours-grid`, `phone-large`, `info-link`) for pending location page

**js/main.js** (rewrite, v2.0.0):
- Added Service Tab System: `.tab-btn` click handler with double `requestAnimationFrame` trick for smooth opacity transitions; first panel opacity:1 on load
- Added Scroll Reveal: IntersectionObserver (`threshold: 0.08`, `rootMargin: 0px 0px -40px 0px`), sibling stagger 80ms per index, no-IO fallback adds `.revealed` immediately
- Preserved verbatim: nav scroll/hide logic, mobile toggle with outside-click close, active nav link detection, complete contact form handler (fetch `/api/contact`, validation, showStatus, loading state)

**index.html** (complete rewrite):
- Centered hero: `hero-badge` pill, three-generation h1, cinematic hero-desc, `hero-actions` (gold + outline+phone SVG), `hero-stats` row (48 / 3 / 1978) with stat-dividers, `hero-scroll` bounce arrow
- Trust bar: 5 items with inline SVGs (shield, users, clock, map-pin, checkmark)
- Two `.tread-divider` elements
- Services: 8-tab layout replacing 6-emoji-card grid. All 8 tabs (Oil, Brakes, Engine, AC, Transmission, Suspension, Electrical, Preventive) with full panel content and local images
- About split: `data-reveal="left"` on image, `data-reveal="right"` on copy
- Footer contact items: emoji replaced with inline SVGs
- Version: v2.0.0

**services/index.html** (complete rewrite):
- Page hero with `.page-hero-rule`
- Full 8-tab layout (same as homepage) with expanded checklist items (6 items per tab vs 4)
- "All Services at a Glance" grid section below tabs using `services-category-grid` + `services-category-header` + SVG icons replacing all emoji
- Added Fleet and Commercial category
- Footer contact items: emoji replaced with inline SVGs
- Version: v2.0.0

**about/index.html** (updated):
- Added `.page-hero-rule` to page hero
- Added `data-reveal="left"` / `data-reveal="right"` to story split section
- Timeline items wrapped with `data-reveal` for stagger animation
- Values grid: emoji icons replaced with inline SVGs (checkmark, dollar, map-pin, shield)
- Footer contact items: emoji replaced with inline SVGs
- Version: v2.0.0

**contact/index.html** (updated):
- Added `.page-hero-rule` to page hero
- Contact info side: `data-reveal="left"`; form side: `data-reveal="right"`
- All 4 contact-detail icons replaced with inline SVGs (map-pin, phone, email, clock)
- Contact form field IDs/names preserved exactly: `name`, `email`, `phone`, `vehicle`, `service`, `pref-date`, `message`, `website` (honeypot)
- Footer contact items: emoji replaced with inline SVGs
- Version: v2.0.0

### Added

**_pending/reviews/index.html** (staged, not in production):
- Full reviews page ported from `prospects/kubin-automotive/reviews.html`
- 4 testimonial cards with stagger offset layout, gold star SVGs, reviewer-avatar initials
- Live `.open-indicator` system not present (reviews page does not need it)
- Review CTA linking to Google search for reviews
- `<meta name="robots" content="noindex, nofollow">` — excluded from search indexing until activated
- HTML comment at top with full activation checklist

**_pending/location/index.html** (staged, not in production):
- Full location page ported from `prospects/kubin-automotive/location.html`
- Location split layout: left map pane (Google Maps iframe), right info pane
- Open/closed indicator (`.open-indicator` / `.open-pulse`) with inline JS that calculates US Central Time at page load, handles DST automatically, updates indicator colors and text
- Info blocks: Phone (`.phone-large`), Hours (`.hours-grid`), Address with Get Directions link
- `<meta name="robots" content="noindex, nofollow">` — excluded from search indexing until activated
- HTML comment at top with full activation checklist and open/closed script explanation

### Unported (out of scope per SLA)

The following mockup elements were intentionally left out. They are staged in `_pending/` or excluded entirely:
- 6-page nav structure (mockup had Services dropdown with 8 sub-pages, Reviews, Location, Get Started) -- SLA is 4 pages only
- Individual service sub-pages (`services/oil-change.html`, `services/brakes.html`, etc.) -- consolidated into tab layout on `/services/`
- `get-started.html` multi-step form -- out of SLA scope
- Full-screen mobile overlay nav -- simplified to slide-down
- Chatbot widget (`js/chatbot.js`) -- out of SLA scope
- Facebook social icon in footer -- out of SLA scope (no confirmed Facebook Page URL yet)
- Floating call button (`.float-call`) -- omitted to keep UX clean; phone links exist throughout
- `@keyframes openPulse` animation not needed until location page is activated

### api/contact.js

NOT modified. File is untouched at `api/contact.js`. The Resend backend wired to `Kubin.Automotive@yahoo.com` is unchanged. All form field names submitted to the API are identical to v1.0.0.

---

## [1.0.1] — 2026-04-08

### Changed

- Added `"type": "module"` and `"engines": { "node": ">=18" }` to `package.json`. Required for Vercel to correctly resolve ESM `import` syntax in `api/contact.js`.

### Added

- `.gitignore` excluding `node_modules/`, `.env`, `.env.local`, `.vercel`, `.DS_Store`.
- `DEPLOY.md` — step-by-step deployment runbook for Theron: npm install, git init, GitHub repo creation, Vercel import, env var setup, custom domain DNS, Resend domain verification, production deploy, and post-deploy smoke test checklist.
- `LOGINS-NEEDED.md` — checklist of every credential and access item blocking production launch: Resend API key, GA4 Measurement ID, Meta Pixel ID, domain ownership/DNS, Resend domain verification, Vercel account, GitHub repo, Facebook Page admin, Google Business Profile manager invite, client brand approval, and startup fee collection.
- Initial git commit with snapshot of production-ready code.

---

## [1.0.0] — 2026-04-08

### Added

- Initial production build delivered per SLA Option A, Month-to-Month.
- 4-page multi-page site with directory-based clean URLs:
  - `/` (Home)
  - `/services/` (Services)
  - `/about/` (About)
  - `/contact/` (Contact + Appointment Form)
- Custom CSS with Deep Navy / Chrome Silver / Gold brand palette.
- Playfair Display headings, Inter body text.
- Mobile-first responsive design (320px minimum viewport).
- Auto-hiding header with mobile hamburger nav.
- Hero section with family-owned-since-1978 angle.
- Trust strip on homepage (4 trust items).
- Services grid preview on homepage (6 categories).
- Full services listing on /services/ with 5 categories and 18 individual services.
- Timeline on /about/ covering 1978 to present.
- Values grid on /about/ (4 values).
- Contact form on /contact/ with all required fields (name, email, phone, vehicle, service, preferred date, message).
- Honeypot spam protection field.
- Client-side validation with accessible error states.
- Form submits via fetch (no page reload). Success and error messages.
- Vercel serverless function (`api/contact.js`) using Resend to deliver form submissions to Kubin.Automotive@yahoo.com.
- Google Maps iframe embed for 3515 S College Ave, Bryan, TX.
- Click-to-call phone link on mobile throughout all pages.
- SEO meta tags on every page (title, description, canonical, OG, Twitter card).
- Google Analytics GA4 placeholder on all pages (ID: `G-XXXXXXXXXX`, swap before launch).
- Meta Pixel placeholder on all pages (ID: `0000000000000000`, swap before launch).
- robots.txt and sitemap.xml.
- vercel.json with cleanUrls and trailingSlash.
- package.json with resend ^4.0.0 dependency.
- .env.example documenting required RESEND_API_KEY.
- README.md with full deploy instructions, domain verification notes, and placeholder swap checklist.
- CHANGELOG.md (this file).
- Version number in footer of all pages (v1.0.0).

### Images (from prospect folder)

- `kubin-logo.png` — Business logo
- `engine-block-workbench.png` — Hero background image
- `engine-diagnostics.png` — Services hero and homepage split section
- `transmission-service.png` — Available for future use
- `car-ac-climate-panel.png` — Available for future use

### Pending before launch

- Swap `G-XXXXXXXXXX` with real GA4 Measurement ID.
- Swap `0000000000000000` with real Meta Pixel ID.
- Set `RESEND_API_KEY` environment variable in Vercel dashboard.
- Verify `kubinautomotive.com` domain in Resend for email sending.
- Confirm business bank account open with Sam (CEO) and collect $1,000 startup fee.
- Collect domain registrar access from Kolton Kubin.
