# AMCOB Functional & Technical Architecture Blueprint
**Document ID:** AMCOB-STAGE0-DOC-05  
**Status:** Complete / Engineering Specification  
**Date:** October 9, 2026  
**Audience:** Codex Engineering Team, System Architects, Technical Leadership  

---

## 1. Architecture Evaluation & Recommendation

We evaluated three potential architectural pathways for the complete digital reinvention:

```
                      ARCHITECTURE OPTION COMPARISON
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ OPTION 1: Monolithic In-Place Laravel Refactor                              │
 │ Description: Rewrite Blade templates and styles directly in current Laravel.│
 │ Pros: Leverages current PHP stack; zero hosting migration.                  │
 │ Cons: Heavy technical debt; coupled frontend/backend releases; lacks modern │
 │ static generation (SSG) and edge performance required for a global flagship.│
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ OPTION 2: Decoupled Modern Flagship (Recommended)                           │
 │ Description: Next.js (App Router) + Tailwind CSS + Headless CMS on Vercel/  │
 │ Cloudflare Pages, cleanly integrated with existing `my.amcob.org` auth.     │
 │ Pros: Sub-second global LCP (<1.2s), exceptional developer velocity, type-   │
 │ safe design tokens, headless content editing, zero impact on member portal. │
 │ Cons: Requires configuring a clean subdomain/OAuth SSO handoff.             │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ OPTION 3: No-Code / SaaS Re-Platforming (Webflow / WordPress VIP)           │
 │ Description: Migrate public marketing site to Webflow or WP Engine.        │
 │ Pros: Fast visual marketing page assembly.                                  │
 │ Cons: Severe vendor lock-in; poor custom data modeling for 373+ directory   │
 │ listings; recurring subscription costs; rigid integration with portal DB.   │
 └─────────────────────────────────────────────────────────────────────────────┘
```

### Technical Recommendation: Option 2 (Decoupled Modern Flagship)
We strongly recommend **Option 2**. Rebuilding the public flagship in **Next.js (React Server Components) with Tailwind CSS** while leaving the internal member portal (`my.amcob.org`) intact behind a clean API/auth boundary delivers the highest performance, maximum security, and lowest risk.

---

## 2. Disciplined Functional Proposals

Each proposed functional enhancement is evaluated with strict engineering discipline:

```
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ 1. INTENT-LED MEMBERSHIP & PROGRAM NAVIGATOR                                │
 │ • User Problem: Prospects cannot determine whether they belong in Affiliate,│
 │   Connect, or which specific PAG tier (Emerging, Booming, Scaling, etc.).   │
 │ • Existing Capability: Static comparison table with duplicated DOM cards.   │
 │ • Proposed Change: Client-side interactive step router mapping revenue and  │
 │   strategic need directly to the verified tier with instant qualification.  │
 │ • Data Required: Revenue bracket, company size, primary goal.               │
 │ • Permissions: Publicly accessible; zero PII stored until form submit.      │
 │ • Effort / Risk: Low Effort / Very Low Risk.                                │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 2. UNIFIED TEMPORAL EVENTS & SUMMIT HUB                                     │
 │ • User Problem: Users cannot tell which mixers are past vs upcoming; LEAD   │
 │   Summit and PRISM exist on disconnected subdomains with separate tickets.  │
 │ • Existing Capability: Disjointed event listings and raw external links.    │
 │ • Proposed Change: Unified calendar with temporal status (Upcoming, Live,   │
 │   Concluded), local timezone conversion, format filters, and unified RSVP.  │
 │ • Integration Dependency: Luma API / Stripe Checkout / Member Portal Webhook│
 │ • Effort / Risk: Medium Effort / Low Risk.                                  │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 3. HIGH-PERFORMANCE STRUCTURED BUSINESS DIRECTORY                           │
 │ • User Problem: 373 listings load via heavy page refreshes; lack structured │
 │   data for Google local search; verified badges are unverified graphics.    │
 │ • Existing Capability: Basic Laravel database view with server-side reload. │
 │ • Proposed Change: Instant client-side faceted filtering (instant search),  │
 │   geocoded regional clustering, Schema.org Organization JSON-LD markup.     │
 │ • Data Required: Public business profile fields, category tags, location.   │
 │ • Effort / Risk: Medium Effort / Low Risk.                                  │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 4. DUAL-ENGINE MATCHMAKING (HUMAN CURATION + ALGORITHMIC ICP)               │
 │ • User Problem: Public Connect page advertises "AI matching in the portal"  │
 │   without transparent mechanics, risking credibility loss.                  │
 │ • Existing Capability: Unverified portal feature; manual referral meetings. │
 │ • Proposed Change: Reframe public narrative to honest dual-engine: Concierge│
 │   Facilitation by Chapter Chairs + Algorithmic ICP Pairing in Portal.       │
 │ • Guardrails: No fabricated trust scores; clear uncertainty communication;  │
 │   strict member consent required before contact sharing.                    │
 │ • Effort / Risk: Low Frontend Effort / Requires Portal Technical Review.    │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 5. ACCREDITED INVESTOR & CAPITAL INTAKE GATEWAY                             │
 │ • User Problem: Opportunities page presents private deals ($250k-$2M) with  │
 │   inadequate regulatory friction, creating potential compliance exposure.   │
 │ • Existing Capability: Generic web form without accreditation verification. │
 │ • Proposed Change: Two-tier gated intake: public teasers with prominent SEC │
 │   Regulation D disclaimers; full deal briefs require self-certified investor│
 │   accreditation and signed digital NDA.                                     │
 │ • Effort / Risk: Medium Effort / Critical Compliance Protection.            │
 └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Content Entities & Data Schema

The data model establishes clear relationships between organizational entities:

```
                            CORE ENTITY RELATIONSHIPS
  ┌──────────────────────┐          ┌──────────────────────┐
  │      MEMBER          │◄─────────│   PEER ADVISORY      │
  │ • id, name, title    │ belongs  │       GROUP          │
  │ • company_id (FK)    │   to     │ • tier (Emerging..   │
  │ • bio, linkedin_url  │          │   Powerhouse)        │
  │ • tier, joined_date  │          │ • chair_member_id    │
  └──────────┬───────────┘          └──────────────────────┘
             │ owns
             ▼
  ┌──────────────────────┐          ┌──────────────────────┐
  │      COMPANY         │          │       EVENT          │
  │ • id, name, slug     │          │ • id, title, slug    │
  │ • industry, size     │          │ • start_date, end_date│
  │ • revenue_bracket    │          │ • timezone, location │
  │ • address, verified  │          │ • type (Mixer/Summit)│
  └──────────────────────┘          └──────────────────────┘
```

---

## 4. Public / Member / Staff Permission Boundaries

```
 ┌──────────────────────┬──────────────────────┬───────────────────────────────┐
 │ Role                 │ Public Access Scope  │ Authenticated Boundaries      │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Anonymous Visitor    │ Full read-access to  │ Zero access to member phone/  │
 │                      │ marketing, directory │ email, confidential forums,   │
 │                      │ teasers, insights.   │ deal documents, or portal.    │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Verified Member      │ Seamless SSO from    │ Full access to unmasked       │
 │                      │ flagship to portal   │ directory, direct messaging,  │
 │                      │ (`my.amcob.org`).    │ forum vaults, and ICP engine. │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Chapter Chair /      │ Public profile badge │ Forum attendance management,  │
 │ Facilitator          │ on chapter page.     │ meeting agenda uploads.       │
 ├──────────────────────┼──────────────────────┼───────────────────────────────┤
 │ Staff Administrator  │ Content preview &    │ Full CMS access, application  │
 │                      │ staging workflows.   │ triage, analytics dashboards. │
 └──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

## 5. Design Token System & Component Responsibilities

All components will be built upon a shared, type-safe token contract matching **Direction 1 ("The Living Circle")**:

```typescript
// tokens/design-tokens.ts
export const tokens = {
  colors: {
    midnight: {
      950: '#060B16',
      900: '#0C162C', // Primary Canvas
      800: '#142346',
      700: '#1E3568',
    },
    cream: {
      50: '#FAF8F5',  // High-Contrast Card Background
      100: '#F4EFE6',
      200: '#E8DFC8',
    },
    ochre: {
      400: '#C9922E',
      500: '#B37D2E', // Calibrated Bronze (WCAG AA Compliant)
      600: '#94631F',
    },
    slate: {
      300: '#CBD5E1',
      400: '#94A3B8',
      600: '#475569',
      900: '#0F172A',
    }
  },
  typography: {
    fontDisplay: 'var(--font-fraunces), serif',
    fontBody: 'var(--font-plus-jakarta), sans-serif',
    fontMono: 'var(--font-jetbrains-mono), monospace',
  },
  radii: {
    pill: '9999px',
    card: '16px',
    button: '8px',
  },
  elevation: {
    subtle: '0 2px 8px rgba(12, 22, 44, 0.06)',
    card: '0 8px 24px rgba(12, 22, 44, 0.08)',
    popover: '0 16px 48px rgba(12, 22, 44, 0.16)',
  }
};
```

---

## 6. Performance Targets & Web Vital Guardrails

The production implementation must achieve exceptional Core Web Vitals under lab and field conditions:

```
                       CORE WEB VITAL TARGET THRESHOLDS
 ┌───────────────────────┬──────────────────────┬──────────────────────────────┐
 │ Metric                │ Google "Good" Ceiling│ AMCOB Flagship Target (P75)  │
 ├───────────────────────┼──────────────────────┼──────────────────────────────┤
 │ Largest Contentful    │ ≤ 2.5 seconds        │ ≤ 1.4 seconds                │
 │ Paint (LCP)           │                      │ (Instant hero render)        │
 ├───────────────────────┼──────────────────────┼──────────────────────────────┤
 │ Interaction to Next   │ ≤ 200 milliseconds   │ ≤ 80 milliseconds            │
 │ Paint (INP)           │                      │ (Instant client feedback)    │
 ├───────────────────────┼──────────────────────┼──────────────────────────────┤
 │ Cumulative Layout     │ ≤ 0.10               │ ≤ 0.02                       │
 │ Shift (CLS)           │                      │ (Reserved aspect ratios)     │
 ├───────────────────────┼──────────────────────┼──────────────────────────────┤
 │ Total Blocking Time   │ ≤ 200 ms (Lab TBT)   │ ≤ 50 ms (Lab TBT)            │
 └───────────────────────┴──────────────────────┴──────────────────────────────┘
```

### Technical Enforcement
1. **Zero Layout Shift:** All responsive images will utilize explicit aspect-ratio containers (`aspect-[4/3]`, `aspect-[1/1]`) and Next.js `<Image>` with blur-up placeholders.
2. **Font Optimization:** Zero render-blocking external Google Font calls. Fonts will be self-hosted via `next/font` with zero layout shift font fallbacks.
3. **Asset Compression:** AVIF and WebP delivery with automatic edge compression via Cloudflare Images.

---

## 7. SEO-Preserving Migration & 301 Redirect Architecture

With **673 discoverable URLs** on the live domain, an unmanaged rebuild would cause catastrophic loss of organic Google rankings and broken inbound links from social channels.

```
                      MIGRATION REDIRECT RULES (EXCERPT)
 ┌──────────────────────────────────────┬──────────────────────────────────────┐
 │ Legacy Inbound URL                   │ 301 Permanent Redirect Destination   │
 ├──────────────────────────────────────┼──────────────────────────────────────┤
 │ /membership                          │ /membership/overview                 │
 │ /affiliate                           │ /membership/affiliate                │
 │ /connect                             │ /membership/connect                  │
 │ /peer-advisory                       │ /membership/peer-advisory            │
 │ /pag/emerging                        │ /membership/peer-advisory#emerging   │
 │ /pag/booming                         │ /membership/peer-advisory#booming    │
 │ /pag/scaling                         │ /membership/peer-advisory#scaling    │
 │ /pag/summit                          │ /membership/peer-advisory#summit     │
 │ /pag/powerhouse                      │ /membership/peer-advisory#powerhouse │
 │ /join, /interested, /join-community  │ /apply                               │
 │ /business-directory                  │ /directory                           │
 │ /business-directory/:slug            │ /directory/:slug                     │
 │ /dinner-mixers, /virtual-mixers      │ /gatherings/calendar                 │
 │ /mldl                                │ /programs/mldl                       │
 │ /books                               │ /intelligence/executive-library      │
 │ /books/:slug                         │ /intelligence/executive-library/:slug│
 │ /blog                                │ /intelligence/insights               │
 │ /blog/:slug                          │ /intelligence/insights/:slug         │
 └──────────────────────────────────────┴──────────────────────────────────────┘
```

### Preservation Verification
A complete automated redirect table will be deployed at the Cloudflare Edge Worker level, intercepting legacy routes before they reach the origin server.
