# AMCOB Design System Specification (v1.0)
**Allied Muslim Chamber of Business**  
*Living Implementation URL: `http://127.0.0.1:8000/design-system`*  
*Local Codebase: `c:\Users\mcreg\Desktop\amcob.org`*

---

## 1. Executive Summary & Design Philosophy

The AMCOB Design System provides a coherent, bespoke visual language tailored to an elite institutional chamber uniting over 400 verified Muslim-owned enterprises, capital allocators, and executive leaders across North America.

### Core Creative Tenets
1. **Pure White Foundation (`#FFFFFF`)**: Primary page surfaces, headers, navigation bars, and content containers use pure white. No cream, beige, or pale gradients are substituted. Whitespace establishes hierarchy and executive calm.
2. **Editorial Typographic Authority**: Headings pair traditional serif gravitas (`Playfair Display`) with modern UI precision (`Inter`), communicating generational permanence and institutional governance.
3. **Restrained Imperial Contrast**: High-impact callouts, executive CTA banners, and the global chamber footer utilize deep imperial navy (`#0A1E54` and `#08102E`) accented by warm sovereign gold (`#CE8924`).
4. **Bespoke Motion Graphics**: Interactive elements use mathematical SVG geometries, orbital coordinate rings, and dynamic energy beams rather than generic stock icons or template cards.
5. **Zero Prose Dashes & Human Writing**: All copy adheres strictly to human editorial standards with zero em dashes, en dashes, or clause hyphens, delivering clear, dignified explanations.

---

## 2. Official Brand Marks & Assets

The chamber uses two approved high-resolution official brand marks (600x168 RGBA):

| Asset Name | Local File Path | Recommended Canvas | Description |
| :--- | :--- | :--- | :--- |
| **Primary Full-Color Logo** | `/assets/optimized/logos/logo.png` | Light surfaces (`#FFFFFF`, `#F8FAFC`) | Official deep navy lettering with sovereign gold arch and subline text. |
| **Monochrome White Transparent Mark** | `/assets/optimized/logos/logo-monochrome.png` | Dark surfaces (`#0A1E54`, `#08102E`) | High-resolution crisp white glyphs with alpha-transparent background. |

### Source Artwork Archive
- Color original: `assets/original/amcob-logo-official-highres.png`
- Monochrome original: `assets/original/amcob-logo-official-monochrome.png`

---

## 3. Design Tokens & Chromatic Architecture

All colors and spacing primitives are defined in CSS custom properties in `/css/style.css`.

### 3.1 Primary & Accent Palette
```css
:root {
  /* Brand Primitives */
  --brand-navy: #0a1e54;       /* Dominant governance navy */
  --brand-navy-dark: #08102e;  /* Deep imperial footer background */
  --brand-navy-deep: #0d1b48;  /* Secondary dark card fill */
  --brand-gold: #ce8924;       /* Radiant sovereign gold accent */
  --brand-gold-hover: #b87319; /* High-contrast gold hover */
  --brand-gold-light: #fffbeb; /* Gold tint badge background */
  --brand-gold-border: #fde68a;/* Gold badge border */

  /* Secondary Accents */
  --brand-emerald: #065f46;    /* Verification and trust accent */
  --brand-emerald-light: #ecfdf5;
  --brand-blue: #1d4ed8;       /* Primary interactive blue */
  --brand-blue-light: #eff6ff;

  /* Surfaces & Structural Borders */
  --bg-page: #ffffff;          /* Pure white dominant canvas */
  --bg-card: #ffffff;          /* Standard card background */
  --bg-subtle: #f8fafc;        /* Subtle slate divider surface */
  --border-light: #e2e8f0;     /* Crisp structural border */
  --border-focus: #0a1e54;

  /* Typography Scales */
  --text-main: #0f172a;        /* High-contrast ink primary */
  --text-body: #334155;        /* Balanced editorial body */
  --text-muted: #64748b;       /* Metadata, dates, and captions */
  --text-light: #94a3b8;
}
```

---

## 4. Typography Scale & Font Pairings

```css
:root {
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

### Type Hierarchy
| Scale Name | Family | Size / Line-Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `Playfair Display` | 46px - 48px / 1.15 | 750 Bold | Homepage masthead, design system title |
| **Headline Serif** | `Playfair Display` | 34px - 38px / 1.25 | 700 Bold | FAQ title, CTA flagship headline, section titles |
| **Section Title** | `Inter` / `Playfair` | 30px - 32px / 1.25 | 700 Bold | Multipage primary titles |
| **Card Title** | `Inter` | 17px - 19px / 1.35 | 650 Semi-Bold | Directory cards, event titles, program tiers |
| **Body Large** | `Inter` | 17px - 18px / 1.65 | 400 Regular | Hero intros, lead paragraphs, page descriptions |
| **Body Regular** | `Inter` | 15px - 15.5px / 1.60 | 400 Regular | Card copy, article paragraphs, accordion answers |
| **Meta & Captions** | `Inter` | 13px - 13.5px / 1.50 | 500 Medium | Image captions, pricing tags, badge labels |

---

## 5. Interactive Components & Layout Modules

### 5.1 Pill Buttons (`.btn-pill`)
Pill buttons feature a 50px pill radius with subtle elevation and GPU hover transitions:
- `.btn-pill-gold`: Radiant gold fill (`#CE8924`), white text, amber drop shadow.
- `.btn-pill-navy`: Imperial navy fill (`#0A1E54`), white text.
- `.btn-pill-outline-white`: Semi-transparent white border on imperial dark canvas, hover fill white with navy text.

### 5.2 Editorial FAQ Accordion (`.faq-section`)
A two-column responsive component:
- Left Column: `● FAQ` pill badge, Playfair Display title ("Questions, Answered."), and direct phone/contact link.
- Right Column: Rounded accordion items with smooth expansion, active gold perimeter borders (`#CE8924`), and rotating chevron glyphs (`&#9660;`).
- JavaScript Toggle: Accessible via keyboard and mouse in `/js/site.js`.

### 5.3 Imperial Flagship CTA Banner (`.cta-banner`)
- Surface: Imperial Navy (`#0A1E54`) with subtle gold-accented radial background gradient.
- Typography: 36px Playfair Display centered heading ("Grow With People Who Want You To Win."), 17px high-contrast subtitle.
- Action Group: Dual pill buttons ("Sign Up Now" gold pill, "Call 949-617-0529" white outline pill).

### 5.4 Imperial Navy Global Footer (`.site-footer-imperial`)
- Canvas: Deep Chamber Midnight (`#08102E`).
- Identity Column: White monochrome transparent logo (`logo-monochrome.png`), mission statement, circular social buttons (LinkedIn, Facebook, Instagram, YouTube).
- Link Columns: `Membership`, `Engage`, `Quick Links`, `Info` with gold serif column headings and gold chevron arrows (`>`).
- Direct Contact: Phone (`949-617-0529`), email (`info@amcob.org`), Irvine Spectrum Center address.

### 5.5 Orbital Motion Graphics Ecosystem Dial
- Container: `.ecosystem-stage` in `/css/ecosystem-motion.css` and `/js/ecosystem-motion.js`.
- SVG Architecture: 700x700 viewBox with concentric orbital rings (radii 130px, 165px, 235px, 305px).
- Dynamic Energy Beams: Live SVG `<line>` elements calculated with trigonometric coordinates (`cx + r * cos(angle)`), animating pulsating amber laser beams from the central chamber core to active nodes.
- Synchronized HUD Display: Floating detail card displaying active node number, program title, executive description, qualification badge, and direct deep-link.
- Auto-Cycle & Controls: Automatic rotation every 3.8 seconds with interactive Play/Pause toggle.

---

## 6. Multi-Page Architecture & Protected Programs

The design system is implemented across 34 HTML templates and 61 verified routes:

### 6.1 Core Pages
- `/` (`index.html`): Hero masthead, LEAD Summit authentic photography, metrics, orbital ecosystem dial, 3 pillars, executive leadership, member mosaic, upcoming regional mixers, FAQ accordion, imperial CTA banner, imperial footer.
- `/about`: Chamber mission, founding charter, executive officers, regional ambassadors.
- `/contact-us`: Executive consultation form, Irvine office map, direct telephone.
- `/privacy-policy`: Official chamber terms, data governance, privacy rights.
- `/resources`: Executive guides, whitepapers, bilateral trade reports.
- `/design-system`: Living design system specification and interactive component showcase.

### 6.2 Protected Programs & Pricing
All official tiers, pricing, and terms are strictly maintained:
1. **Peer Advisory Groups (PAG)**:
   - Emerging: $100k - $250k revenue ($1,925/yr)
   - Scaling: $250k - $750k revenue ($2,750/yr)
   - Booming: $750k - $1.5M revenue ($3,650/yr)
   - Powerhouse: $1.5M - $3M revenue ($4,400/yr)
   - Summit: $3M+ revenue ($5,500/yr)
2. **AMCOB Connect**: $850/yr, bi-weekly B2B referral meetings.
3. **Affiliate Membership**: $550/yr, early-stage founders and professionals.
4. **Virtual Accelerator Program**: 12-week venture readiness cohort.
5. **Ambassador Program**: Regional North American chapter leadership.
6. **Muslim Life Design Lab (MLDL)**: Specialized enterprise and lifestyle framework.

---

## 7. Verification Test Suites

Two automated verification suites ensure system health:
1. `node scripts/verify-copy-standards.js`: Validates 34 HTML files for zero prose dashes and no prohibited promotional buzzwords.
2. `node scripts/verify-all-routes.js`: Validates 61 endpoints on `http://127.0.0.1:8000/` returning HTTP 200 OK.
