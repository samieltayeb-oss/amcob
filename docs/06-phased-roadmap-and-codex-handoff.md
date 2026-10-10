# AMCOB Phased Roadmap & Codex Engineering Handoff
**Document ID:** AMCOB-STAGE0-DOC-06  
**Status:** Prototype prepared for Sam's visual review. Creative approval pending.  
**Date:** October 9, 2026  
**Originating Agent:** AGY (Discovery & Creative Direction)  
**Receiving Agent:** Codex (Architecture & Implementation)  

---

## 1. Phased Delivery Roadmap

> [!CAUTION]
> **CRITICAL MANDATE: 3D WITHDRAWN & REPLACED WITH 2D CORPORATE ARCHITECTURE (October 2026):**  
> Sam has explicitly rejected all 3D scenes, floating frames, pedestals, and perspective effects. The 3D requirement has been officially withdrawn.
> 1. **REJECTED PATTERNS (DO NOT REINTRODUCE):**
>    - Any 3D scenes, WebGL canvases, Three.js render loops, or perspective tricks.
>    - Floating picture frames, rotating photo cards, overlapping photo panels, platforms, or pedestals.
>    - Conventional split hero (text column left, visual box trapped right).
>    - Random object piles, decorative globes, circular navigators, synthetic/AI imagery.
> 2. **ACTIVE CREATIVE DIRECTION:**
>    - **White Dominant Background (`#ffffff`):** Uncompromising institutional clarity, deliberate whitespace, and dignified chamber authority.
>    - **Architectural 2D Composition:** Monumental typography (`Connecting Muslim Business Leaders Across North America.`) leading into an expansive, undistorted panoramic photographic stage of real AMCOB gatherings.
>    - **Sophisticated 2D Motion System:** Synchronized entrance reveals, expanding hairlines, native IntersectionObserver scroll triggers, and explicit accessible interactions.
>    - **Convincing Glass Navigation:** Translucent glass masthead with crisp contrast and solid `#ffffff` mega-dropdown panels to guarantee legibility over high-contrast text.
>    - **Protected Project Scope:** Complete multipage website (35 pages, 63 working routes), 100% authentic AMCOB photography (zero AI or stock), verified program pricing ($1,925 to $5,500 PAG, $850 Connect, $550 Affiliate), and human writing with zero prose dashes.

To prevent scope creep and maintain operational velocity, future implementation is divided into four distinct phases:

```
                          FOUR-PHASE IMPLEMENTATION ROADMAP
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ PHASE A: PUBLIC FLAGSHIP LAUNCH ESSENTIALS (Weeks 1–6)                      │
 │ • Brand Reinvention & "The Living Circle" design system implementation.     │
 │ • High-performance Next.js application shell with Tailwind tokens.          │
 │ • Core marketing routes: Homepage, About, Leadership, Founding Circle.      │
 │ • Tier presentation: G.A.I.N. framework & 5 Peer Advisory Group tiers.      │
 │ • Unified multi-step qualification & application engine (`/apply`).         │
 │ • 301 Redirect engine preserving all 673 legacy URLs.                       │
 │ • WCAG 2.2 AA accessibility compliance & Core Web Vitals (<1.4s LCP).       │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ PHASE B: EXISTING SYSTEMS INTEGRATION (Weeks 7–9)                           │
 │ • Structured Business Directory migration (373 listings with Schema.org).   │
 │ • Unified Events Hub integrating Luma / Stripe ticketing.                   │
 │ • Subdomain consolidation: `/summits/lead`, `/programs/prism`, `/tours`.    │
 │ • Member Portal authentication handoff styling (`my.amcob.org`).            │
 │ • Executive Library & Insights CMS migration (MDX / Headless CMS).          │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ PHASE C: MEMBER PLATFORM ENHANCEMENTS (Separately Scoped / Weeks 10–14)     │
 │ • Upgraded member dashboard UI at `my.amcob.org`.                           │
 │ • Transparent ICP definition form & verified client matchmaking engine.     │
 │ • Peer Advisory Group private document vault & meeting minutes repository.  │
 │ • Integrated direct messaging / Slack webhook sync.                         │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ PHASE D: FUTURE INNOVATION EXPERIMENTS (Phase 2 Roadmap)                    │
 │ • Native Mobile Applications (iOS / Android) powered by React Native.       │
 │ • Accredited Investor Deal Room & Private Capital Syndicate Portal.         │
 │ • Bilateral Chamber-to-Chamber B2B Procurement Marketplace.                 │
 └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. AGY vs. Codex Ownership Boundaries

To eliminate file overlap, code conflicts, and ownership confusion, strict boundaries are established:

```
 ┌──────────────────────────────────────┬──────────────────────────────────────┐
 │ AGY RESPONSIBILITIES (Creative/UX)   │ CODEX RESPONSIBILITIES (Engineering) │
 ├──────────────────────────────────────┼──────────────────────────────────────┤
 │ • Brand Strategy & Art Direction     │ • Next.js App Router Scaffold        │
 │ • Copywriting & Narrative Structure  │ • TypeScript Component Architecture  │
 │ • Design Token Definition            │ • Tailwind Token Configuration       │
 │ • Wireframes & Visual Concept Studio │ • API Routing & Form Handlers        │
 │ • URL Inventory & Redirect Mapping   │ • Database Schemas & Migrations      │
 │ • Accessibility Standards Definition │ • Cloudflare Worker Edge Rules       │
 │ • Asset Registry & Shot List         │ • CI/CD Deployment & Unit Testing    │
 └──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 3. Engineering Route Map & Component Boundaries

```
src/
├── app/
│   ├── layout.tsx                     // Root layout, self-hosted fonts, global nav
│   ├── page.tsx                       // Flagship Homepage (Direction 1)
│   ├── about/
│   │   ├── page.tsx                   // Chamber story, mission, chapters map
│   │   ├── leadership/page.tsx        // CEO Kashif Zubair, board, team
│   │   └── founding-circle/page.tsx   // Lifetime Founding Circle hall of honor
│   ├── membership/
│   │   ├── page.tsx                   // Overview & G.A.I.N. comparison matrix
│   │   ├── peer-advisory/page.tsx     // 5 revenue tiers, forum anatomy
│   │   ├── connect/page.tsx           // Referral exchange & dual-engine matching
│   │   ├── khadija-collective/page.tsx// Muslim women leaders circle
│   │   └── affiliate/page.tsx         // Professional directory tier
│   ├── apply/
│   │   └── page.tsx                   // Multi-step intent qualification engine
│   ├── gatherings/
│   │   ├── page.tsx                   // Unified calendar (Upcoming vs Concluded)
│   │   ├── lead-summit/page.tsx       // Anaheim flagship summit
│   │   ├── prism-retreat/page.tsx     // Exclusive private salon retreat
│   │   └── trade-missions/page.tsx    // Bilateral delegations (AMCOB Tours)
│   ├── directory/
│   │   ├── page.tsx                   // Instant faceted search & map
│   │   └── [slug]/page.tsx            // Structured company profile (Schema.org)
│   ├── intelligence/
│   │   ├── insights/page.tsx          // Articles and thought leadership
│   │   └── executive-library/page.tsx // Curated book summaries
│   └── partnerships/
│       ├── sponsorship/page.tsx       // Corporate packages & media kit
│       └── capital/page.tsx           // Accredited deal flow & disclaimers
```

---

## 4. Data Contracts & Form Integration Specs

### 4.1 Unified Application Engine (`POST /api/v1/apply`)
```typescript
export interface MemberApplicationPayload {
  intent: 'peer_advisory' | 'connect' | 'affiliate' | 'khadija_collective';
  revenueBracket: 'under_1m' | '1m_5m' | '5m_25m' | '25m_100m' | 'over_100m';
  company: {
    name: string;
    website: string;
    employeeCount: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
    industry: string;
    city: string;
    country: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    linkedinUrl: string;
  };
  motivation: string;
  consent: {
    termsAccepted: boolean;
    confidentialityAcknowledged: boolean;
    dataProcessingAgreed: boolean;
  };
}
```

---

## 5. Acceptance Testing & QA Checklist

Before production release, Codex must verify each gate:

- [ ] **Complete Multipage Coverage:** All routes from the URL inventory are built as dedicated, directly accessible pages with working URLs, breadcrumbs, and natural navigation. Zero single-page landing or modal-only substitutions.
- [ ] **Pure White Canvas Foundation:** Dominant page background is pure `#FFFFFF` across all pages, headers, and primary content areas. High-contrast dark typography and hairline borders.
- [ ] **Exact Authentic Imagery Only:** Zero AI-generated portraits, fabricated meetings, stock illustrations, or synthetic community photos. Every image is matched to authentic AMCOB sources.
- [ ] **No Public Permission Badges:** Provenance, copyright, and clearance notes remain strictly in internal documentation. No synthetic clearance badges or warning labels on the public interface.
- [ ] **Accurate Commercial Relationships:** Member company logos are never represented as corporate sponsors or partners unless officially verified.
- [ ] **Program & Pricing Protection:** Exact preservation of official names, 5 PAG tiers ($100k-$500k at $1,925, $500k-$1M at $2,475, $1M-$3M at $3,025, $3M+ at $5,500, Summit by invitation), AMCOB Connect ($850), and Affiliate ($550).
- [ ] **Editorial Writing Standard (Doc 09 Enforcement):** All copy sounds natural, grounded, and confident. Zero em dashes (—), en dashes (–), or connecting hyphens in prose. Zero barred promotional clichés ("unlock your potential", "elevate your journey", "seamless ecosystem", "transformative experience", "where ambition meets opportunity"). Direct, meaningful button labels.
- [ ] **Full Data Collections:** Content collections (Directory, Editorial, Library, Events) are populated with complete authentic datasets, not small sample subsets.
- [ ] **Asset Preservation & Quality (Doc 10 Enforcement):** All 651 preserved assets from `assets/optimized/` mapped into their corresponding routes. Zero hotlinking to legacy `amcob.org`. Natural aspect ratios strictly preserved without letter squishing or stretching. Zero synthetic AI people.

---

## 6. Staging, Release & Rollback Procedures

```
                       DEPLOYMENT & ROLLBACK LIFECYCLE
  [ Feature Branch ] ──► [ Codex Pull Request ] ──► [ Automated Vitals CI ]
                                                          │ Pass
                                                          ▼
  [ Production Edge ] ◄── [ Cloudflare Instant DNS ] ◄── [ Staging Preview ]
          │
          └── If Critical Incident Detected:
              Instant 1-Click Rollback via Cloudflare Worker route alias (<10s).
```
