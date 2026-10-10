# AMCOB Current Site & Technical Audit
**Document ID:** AMCOB-STAGE0-DOC-02  
**Status:** Complete / Diagnostic Analysis  
**Audit Date:** October 9, 2026  
**Audited Targets:** `https://amcob.org` and connected official subdomains  

---

## 1. Audit Scope & Coverage Disclosure

To maintain total integrity, we clearly distinguish between our broad index inventory and the focused set of page templates reviewed in forensic depth:

- **Broad Inventory Scope:** 673 discoverable public URLs identified across `amcob.org` and its subdomains (see [`/docs/url-inventory.csv`](file:///c:/Users/mcreg/Desktop/amcob.org/docs/url-inventory.csv)).
- **In-Depth Template Audit:** 24 representative core templates evaluated across desktop, tablet, and mobile viewports, including DOM inspection, asset waterfalls, script execution, accessibility checks, and form integration analysis.
- **Inaccessible Areas Reported Honestly:**
  - Authenticated Member Portal (`my.amcob.org/dashboard`, profile settings, private directories).
  - Admin backend (`amcob.org/admin/` - blocked by HTTP basic auth / custom login and `robots.txt`).
  - CRM lead destination (Salesforce, HubSpot, or custom MySQL database).
  - Backend payment gateway processor (Stripe, Authorize.Net, or custom processor).

---

## 2. Technology Stack & Architecture Forensics

```
                     DETECTED CURRENT RUNTIME ARCHITECTURE
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ EDGE & CDN LAYER                                                         │
 │ • Cloudflare CDN & DDoS Protection                                       │
 │ • Cloudflare Email Obfuscation (cdn-cgi/l/email-protection)              │
 │ • Cloudflare Web Analytics Beacon (v4bc70e2c01a94c73b74392e423484066179) │
 ├──────────────────────────────────────────────────────────────────────────┤
 │ BACKEND & APPLICATION SERVER                                             │
 │ • Server Runtime: PHP 8.x / Nginx or Apache (Linux)                      │
 │ • Web Framework: Laravel Framework (MVC)                                 │
 │ • Templating Engine: Laravel Blade (Confirmed via DOM debug markers:     │
 │   "resources/views/components/seo/meta-tags.blade.php", etc.)           │
 │ • State & Security: Laravel CSRF Token Protection (<meta csrf-token>)    │
 ├──────────────────────────────────────────────────────────────────────────┤
 │ FRONT-END CLIENT RUNTIME                                                 │
 │ • CSS Framework: Bootstrap 5.3.8 (bootstrap.min.css)                     │
 │ • Core Libraries: jQuery 3.6.0 (Global window.jQuery)                    │
 │ • Motion & Sliders: Swiper 11.x, GSAP 3.15.0 + ScrollTrigger + SplitText  │
 │ • Data & Widgets: jsvectormap 1.5.3 (Interactive SVG World Map)         │
 │ • Form Enhancements: Select2 4.0.13, intl-tel-input 17.0.8, SweetAlert2 │
 │ • Typography: Google Fonts (Playfair Display, Montserrat, Poppins,       │
 │   and legacy unused 'Black Ops One')                                     │
 ├──────────────────────────────────────────────────────────────────────────┤
 │ ANALYTICS, ADS & TRACKING                                                │
 │ • Google Tag Manager (GTM-P2H3NS42)                                      │
 │ • Google reCAPTCHA v3 (Sitekey: 6Lck1MQrAAAAAIxEdq3YEQV4y7A-w1I75iuFjGSN)│
 │ • LinkedIn Insight Tag (Partner ID: 10804593)                            │
 └──────────────────────────────────────────────────────────────────────────┘
```

### Architectural Ownership & Constraints
- **CMS Ownership:** Unknown. The presence of Blade components and static asset paths (`/assets/images/`, `/assets/css/`) indicates custom Laravel database models or hardcoded view templates, rather than a headless CMS (Sanity/Strapi) or standard WordPress.
- **Subdomain Routing:** `lead.amcob.org`, `prism.amcob.org`, and `tours.amcob.org` run independent web instances (or isolated virtual hosts), creating fragmented CSS releases, conflicting jQuery versions, and separate lead handling.

---

## 3. Template-by-Template Forensic Audit

### 3.1 Flagship Homepage (`https://amcob.org`)
- **First Impression & Stature:** The initial visual weight is dominated by an overwhelming dark blue hero container (`background: #0a1e54`) containing four continuously moving marquee tracks displaying over 230 uncurated member headshots. While intended to demonstrate community size, the continuous motion, raw avatar cropping, and neon grid animations (`gridShine 6s linear infinite`) generate severe visual turbulence.
- **Narrative Structure:** 
  1. Hero member marquee (infinite left/right motion).
  2. Geographic banner ("Serving Muslim Entrepreneurs in the USA, Canada, UAE, KSA, and Turkiye").
  3. "AMCOB Ecosystem" chart (radial diagram with translated pixel boxes).
  4. "Our Recent Members" Swiper showcase.
  5. Testimonial carousel with CEO Kashif mentions.
  6. "The AMCOB Lifetime Founding Circle" (prominent executive profiles: Dr. Sohail Masood, Kamal Solaiman, Umair Shah, Faheem Khwaja).
  7. "Khadija Collective" section (women founders network).
  8. Interactive world map and embedded 12-field lead form.
- **Critical Defects:**
  - Hero image overload: Dozens of `<img>` tags on row 0 specify `loading="eager"` without `srcset`, triggering massive initial network contention.
  - Font bloat: The page preloads `Black Ops One` (a heavy military stencil font) alongside Playfair Display and Montserrat.
  - Testimonial modal: Uses custom JavaScript overlays that trap tab focus improperly.

### 3.2 Membership Overview (`https://amcob.org/membership`)
- **Content Strategy:** Introduces the G.A.I.N. principle (Growth, Accountability, Isolation Relief, Networking) and compares the three primary tiers: Affiliate, Connect, and Peer Advisory Groups.
- **Pricing & Tier Cards:** Accurately reflects the revenue-tiered structure for PAG (Emerging \$1,925/yr to Powerhouse \$5,500/yr).
- **Critical Defects:**
  - Duplicate pricing loops: The page DOM duplicates the 5 PAG tier cards three times within responsive hiding wrappers (`d-none d-lg-block`, etc.), creating 15 redundant DOM cards and multiple duplicate ID attributes (`#productPrice`, `#tierCard`).
  - Ambiguous CTA routing: Clicking "Sign Up" on various cards routes inconsistently to `/interested`, `/join`, or `/pag/affiliate`.

### 3.3 AMCOB Connect (`https://amcob.org/connect`)
- **Content Strategy:** Pitches referral-based B2B growth and promises warm customer introductions.
- **AI Matchmaking Claim:** Features a dedicated section titled *"AI-powered client matching: Tell us who your ideal customer is. AI finds them for you."*
- **Critical Defects:**
  - Narrative contradiction: Explicitly states meetings take place *"on the 1st and 3rd Friday of every month"* (bi-weekly), directly conflicting with the *"weekly"* claim on `/join` and `/about`.
  - Lack of architectural credibility: The explanation of AI matching is generic and vague. To an executive, it feels like marketing embellishment rather than an enterprise capability.

### 3.4 Business Directory (`https://amcob.org/business-directory`)
- **Inventory Scale:** 373 indexed businesses across healthcare, IT, legal, finance, logistics, and retail.
- **UX & Search:** Features an industry dropdown, country filter, and keyword search box.
- **Critical Defects:**
  - Zero client-side instant filtering: Every filter change or search submission triggers a full page reload or heavy AJAX call without state preservation.
  - Unstructured detail pages: Individual business profiles lack structured JSON-LD (`LocalBusiness` or `Organization` schema), forfeiting massive local SEO visibility.
  - Weak trust verification: Verified badges appear as unclickable graphic marks without verification criteria or validation dates.

### 3.5 Events Hub & Dinner Mixers (`/events`, `/dinner-mixers`, `/virtual-mixers`)
- **Content Strategy:** Lists regional dinners, global virtual mixers, and annual summits.
- **Critical Defects:**
  - Temporal confusion: Completed dinners from 2024 and 2025 are displayed alongside upcoming mixers without status badges (`Concluded` vs. `Open for RSVP`), forcing users to read small body paragraphs to discover if an event has already happened.
  - Timezone ambiguity: Mixer cards list start times (e.g., "7:00 PM") without specifying timezones (PST vs. EST vs. GMT), creating confusion for international members.
  - Third-party redirection: Event RSVPs bounce users abruptly between internal forms, Calendly links, and Luma (`lu.ma/amcob`) without coherent session attribution.

### 3.6 About Page (`https://amcob.org/about`)
- **Content Strategy:** Features a founder letter from Mr. Kashif Zubair, the AMCOB origin story, and an internal team gallery.
- **Critical Defects:**
  - Inconsistent photography: Headshots range from high-res studio portraits (Mr. Kashif) to casual mobile selfies and low-res social crops.
  - Governance absence: Highlights operational staff (data analysts, junior developers) but omits the Board of Advisors, Chapter Chairs, and Founding Circle governance charters, diminishing institutional authority.

### 3.7 Subdomains (`my`, `lead`, `prism`, `tours`)
- **Lead Summit (`lead.amcob.org`):** A custom single-page conference site built for the Anaheim summit. It features high ticket prices (\$250 to \$1,800) but uses inconsistent typography, broken anchor links, and an unintegrated ticketing form.
- **PRISM Retreat (`prism.amcob.org`):** Executive retreat page emphasizing confidentiality and exclusive luxury. It visually clashes with the main site, using divergent color schemes and separate form scripts.
- **AMCOB Tours (`tours.amcob.org`):** Focuses on bilateral trade delegations to Turkiye. It reads like a travel agency landing page rather than an official Chamber of Commerce trade mission.
- **Member Portal (`my.amcob.org`):** Clean login gate, but completely disconnected from the flagship brand styling, creating an abrupt aesthetic drop when members log in.

---

## 4. Accessibility (WCAG 2.2 AA) Audit

An automated and manual inspection of the current site against WCAG 2.2 Level AA standards revealed several severe compliance failures:

```
                      ACCESSIBILITY SEVERITY MATRIX
  CRITICAL (Barrier)     HIGH (Non-Compliant)     MEDIUM (Degraded UX)
 ┌────────────────────┐ ┌──────────────────────┐ ┌─────────────────────┐
 │ Low Contrast Gold  │ │ Missing Focus Rings  │ │ Redundant Alt Text  │
 │ (2.8:1 vs 4.5:1)   │ │ (shadow-none)        │ │ ("alt='AMCOB'")     │
 │                    │ │                      │ │                     │
 │ Uncontrolled Motion│ │ Form Input Labels    │ │ Table / Div Overflow│
 │ (Marquee Tracks)   │ │ (Country Cascades)   │ │ On Mobile <360px    │
 └────────────────────┘ └──────────────────────┘ └─────────────────────┘
```

1. **Contrast Ratio Failures (WCAG 1.4.3):**
   - The primary gold accent `#ce8924` (and `#C9922E`) is used for text links, subtitles, and badges against a pure white `#ffffff` background. The resulting contrast ratio is **2.82:1**, well below the required **4.5:1** for regular body text.
   - Secondary gray text `#b2b2b2` on dark blue cards `#192666` achieves only **3.2:1**.
2. **Focus Visibility & Keyboard Traps (WCAG 2.4.7):**
   - Several interactive elements explicitly suppress browser focus rings using Bootstrap's `.shadow-none` and `outline: none`, making keyboard tab navigation impossible for sighted assistive tech users.
   - The testimonial modal (`.testimonial-modal`) does not trap keyboard focus when active, allowing background elements to receive focus while the modal is open.
3. **Motion Sensitivity (WCAG 2.2.2 - Pause, Stop, Hide):**
   - The four hero marquee tracks and grid shine animations run indefinitely without an accessible pause/stop toggle. While a CSS `@media (prefers-reduced-motion: reduce)` block is present, users who do not have OS-level reduced motion configured cannot pause the visual motion.
4. **Form Accessibility & Error Handling (WCAG 3.3.1 / 3.3.2):**
   - The Country -> State -> City cascading dropdowns dynamically toggle `disabled` attributes without `aria-busy` or screen reader live region announcements (`aria-live="polite"`), disorienting non-sighted users.

---

## 5. Performance & Media Weight Forensics

### Lab Observations (Desktop & Mobile Simulation)
- **Cumulative DOM Size:** Over **3,200 DOM nodes** on the homepage alone (largely due to redundant hidden tier cards, 230+ avatar elements, and uncurated footer menus).
- **Initial Network Payloads:**
  - Homepage transfer size: **~4.8 MB** (uncompressed images and heavy vendor libraries).
  - External Font Stylesheet: Loads **4 distinct font families** across multiple weights, blocking the first render pass.
  - Script Execution: Simultaneous initialization of Swiper, GSAP ScrollTrigger, SplitText, Select2, and jsvectormap delays Total Blocking Time (TBT) significantly on mid-tier mobile hardware.
- **Core Web Vitals Risk Profile:**
  - **LCP (Largest Contentful Paint):** High risk (>3.2s on mobile) due to the heavy background video/marquee slider at the top of the viewport.
  - **CLS (Cumulative Layout Shift):** High risk (>0.15) caused by client-side image swaps via `data-src` in mega menus and unreserved image aspect ratios.
  - **INP (Interaction to Next Paint):** Moderate risk (>220ms) during heavy script initialization and select2 DOM bindings.

---

## 6. SEO, Structured Data & Metadata Integrity

1. **Schema.org Coverage:**
   - Homepage includes basic `Organization` and `WebSite` JSON-LD schema, which is positive.
   - **Severe Gap:** The 373 business directory listings lack structured `LocalBusiness`, `PostalAddress`, and `Review` schema.
   - **Severe Gap:** The events and mixer pages lack `Event` schema (`startDate`, `endDate`, `eventStatus`, `location`), forfeiting Google Rich Event Snippets.
2. **Indexing Discrepancies:**
   - The sitemap contains **666 URLs**, but numerous thin, auto-generated tags and redundant pages (`/pag`, `/join-community`, `/add-listing`) are indexed without unique meta descriptions or canonical tags.
   - Canonical URLs point to root paths, but several parameter-based URLs (`?page=2`, `?category=finance`) lack self-referential canonicalization.
3. **OpenGraph & Social Assets:**
   - Deep articles and book review pages fall back to the generic `logo-og.png` rather than dynamic, article-specific social share cards, degrading click-through rates on LinkedIn and Twitter/X.

---

## 7. Form Behavior & Operational Handoff Boundaries

We audited the public intake forms across the ecosystem without submitting live test entries:

```
                         CURRENT FORM INTAKE MATRIX
 ┌──────────────────────┬──────────────────────┬───────────────────────────────┐
 │ Form Target          │ Visible Endpoint     │ Vulnerability / UX Defect     │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Homepage Interest    │ /membership-interest │ 12 fields inside nested       │
 │                      │ -form/store          │ double-scrollbar container.   │
 │                      │                      │ reCAPTCHA hidden input token. │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Membership Checkout  │ /pag/affiliate       │ Two-step wizard (Member &     │
 │                      │ (Form submit)        │ Company -> Billing). Exposes  │
 │                      │                      │ discount input without coupon.│
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Khadija Collective   │ Calendly direct link │ Abrupt jump off-domain to a   │
 │ Application          │ (kzubair/30-min-call)│ personal Calendly clone slug. │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Capital Raising      │ /opportunities       │ Generic input without secure  │
 │ Intake               │ (Direct post)        │ investor accreditation gate.  │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Sponsorship Inquiry  │ /sponsorship         │ Basic contact fields; lacks   │
 │                      │ (Generic post)       │ budget triage and media kit.  │
 └──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### Strategic Takeaways for the Redesign
1. **Unify the Intake Engine:** Eliminate the 5 disparate form handlers. Replace them with a single, multi-step, state-preserving application engine with smart branching (Affiliate vs. Connect vs. PAG vs. Khadija Collective vs. Sponsor).
2. **Eliminate Double Scrollbars:** Remove the fixed-height scroll container (`contact_form_scroll`) on mobile. Forms must flow naturally with the viewport.
3. **Decouple Third-Party Links:** Replate raw personal Calendly URLs with an integrated booking step or branded modal that preserves user trust.
