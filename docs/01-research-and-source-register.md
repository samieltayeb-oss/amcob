# AMCOB Research & Source Register
**Document ID:** AMCOB-STAGE0-DOC-01  
**Status:** Complete / Evidentiary Baseline  
**Retrieval & Audit Date:** October 9, 2026  
**Auditor:** Principal Creative Director & Discovery Team  

---

## 1. Evidentiary Taxonomy & Methodology

To ensure institutional credibility, every statement, metric, and assertion in this project is categorized into one of five rigorous evidential tiers:

1. **[FACT - VERIFIED]**: Confirmed by public primary sources, corporate filings, live HTTP endpoints, or official social metadata.
2. **[MARKETING CLAIM]**: Stated on public AMCOB marketing pages or collateral, but not independently verified with technical logs or third-party audits.
3. **[HYPOTHESIS]**: Reasonable professional inference based on observed architecture, industry conventions, or organizational behavior.
4. **[RECOMMENDATION]**: Strategic, architectural, or design proposal formulated by the digital reinvention team.
5. **[APPROVAL GATE]**: Information or operational decision requiring explicit review, documentation, or administrative access from AMCOB leadership.

---

## 2. Primary Source Register

| Source Identifier | Exact URL / Resource | Retrieval Timestamp | Scope & Extracted Evidence | Evidentiary Status |
| :--- | :--- | :--- | :--- | :--- |
| **SRC-01** | `https://amcob.org/` | 2026-10-09 16:45 UTC | Flagship homepage HTML, metadata, JSON-LD schema, footer disclosures, team script bundles, and live styling. | [FACT - VERIFIED] |
| **SRC-02** | `https://amcob.org/robots.txt` | 2026-10-09 16:47 UTC | Disallow rules: `/admin/`, `/private/`, `/api/`, `/storage/`. Content signals: `ai-input=yes, ai-train=yes`. Sitemap declaration. | [FACT - VERIFIED] |
| **SRC-03** | `https://amcob.org/sitemap.xml` | 2026-10-09 16:47 UTC | Complete XML index containing 666 discoverable canonical URLs across 12 distinct content categories. | [FACT - VERIFIED] |
| **SRC-04** | `https://amcob.org/membership` | 2026-10-09 16:48 UTC | Membership overview, G.A.I.N. framework definition, 5 Peer Advisory Group tiers, pricing cards, and inclusions. | [FACT - VERIFIED] |
| **SRC-05** | `https://amcob.org/connect` | 2026-10-09 16:48 UTC | AMCOB Connect program details, bi-weekly meeting cadence claim, and AI-powered client matching claims. | [FACT - VERIFIED] / [MARKETING CLAIM] |
| **SRC-06** | `https://amcob.org/join` | 2026-10-09 16:48 UTC | Direct checkout / join flow; contains contradictory "Weekly Referral-Based Revenue Sessions" claim. | [FACT - VERIFIED] / [CONFLICT] |
| **SRC-07** | `https://amcob.org/affiliate` | 2026-10-09 16:48 UTC | Affiliate tier landing, \$550.00 annual pricing card, target audience description, and checkout form. | [FACT - VERIFIED] |
| **SRC-08** | `https://amcob.org/peer-advisory` | 2026-10-09 16:48 UTC | Mastermind/PAG value proposition, cohort breakdown, testimonials, and confidentiality guidelines. | [FACT - VERIFIED] |
| **SRC-09** | `https://amcob.org/about` | 2026-10-09 16:49 UTC | Institutional story, CEO message, 12 internal team members with explicit names and roles. | [FACT - VERIFIED] |
| **SRC-10** | `https://amcob.org/opportunities` | 2026-10-09 16:48 UTC | Capital raising, deal flow tickets (\$250k - \$2M), investor intake questionnaire. | [FACT - VERIFIED] |
| **SRC-11** | `https://amcob.org/sponsorship` | 2026-10-09 16:48 UTC | Corporate sponsorship tiers (\$5,000 to \$250,000), audience demographics, brand exposure benefits. | [FACT - VERIFIED] |
| **SRC-12** | `https://amcob.org/advertisement` | 2026-10-09 16:48 UTC | Digital advertising packages (\$200 to \$800), directory banner specifications. | [FACT - VERIFIED] |
| **SRC-13** | `https://amcob.org/ambassador-program` | 2026-10-09 16:49 UTC | Ambassador roles, chapter leadership criteria, verified current ambassadors (Detroit, Chicago). | [FACT - VERIFIED] |
| **SRC-14** | `https://amcob.org/business-directory` | 2026-10-09 16:48 UTC | 373 public directory listings, search interface, industry taxonomy, location cascade. | [FACT - VERIFIED] |
| **SRC-15** | `https://amcob.org/events` | 2026-10-09 16:48 UTC | Central events hub, dinner mixers, virtual mixers, and calendar listings. | [FACT - VERIFIED] |
| **SRC-16** | `https://my.amcob.org/` | 2026-10-09 16:48 UTC | Member portal login interface, session auth boundary, CSRF tokens. | [FACT - VERIFIED] |
| **SRC-17** | `https://lead.amcob.org/` | 2026-10-09 16:48 UTC | LEAD Summit Anaheim microsite, ticket tiers (\$250 - \$1,800), speaker lineups, agenda tracks. | [FACT - VERIFIED] |
| **SRC-18** | `https://prism.amcob.org/` | 2026-10-09 16:48 UTC | PRISM Executive Retreat microsite, Chatham House rules, invitation application flow. | [FACT - VERIFIED] |
| **SRC-19** | `https://tours.amcob.org/` | 2026-10-09 16:48 UTC | AMCOB Tours microsite, international trade delegation details (Turkiye), itinerary, B2B meetings. | [FACT - VERIFIED] |
| **SRC-20** | `https://www.linkedin.com/company/amcob/` | 2026-10-09 16:47 UTC | 7,134 followers, JSON-LD organization schema, 17 recorded employees, daily member spotlights. | [FACT - VERIFIED] |
| **SRC-21** | `https://lu.ma/amcob` | 2026-10-09 16:47 UTC | Luma ticketing platform profile for AMCOB event registrations and community gatherings. | [FACT - VERIFIED] |

---

## 3. Verified Organizational Baseline

### 3.1 Positioning, Legal Identity & Headquarters
- **Legal Entity:** AMCOB LLC [FACT - VERIFIED via homepage footer, California address, and schema.org data].
- **Official Name:** Allied Muslim Chamber of Business (AMCOB) [FACT - VERIFIED].
- **Preservation Boundary:** The name "AMCOB", the expanded name "Allied Muslim Chamber of Business", and the official geometric brand mark must be strictly preserved. This project is a digital reinvention, not an authorized corporate rebrand [RECOMMENDATION / REQUIREMENT].
- **Physical Headquarters:** 300 Spectrum Center Drive, Suite 400, Irvine, CA 92618, United States [FACT - VERIFIED].
- **Contact Channels:** Phone: `(949) 617-0529` | Support Email: Encrypted Cloudflare endpoint / `info@amcob.org` [FACT - VERIFIED].
- **Hours of Operation:** Monday–Friday, 9:00 AM – 5:00 PM PST [FACT - VERIFIED].

### 3.2 Leadership & Operational Team
- **CEO & Founder:** **Mr. Kashif Zubair** [FACT - VERIFIED].
  - Background: Former enterprise auditor and corporate strategist at Ernst & Young (EY) and PricewaterhouseCoopers (PwC); MBA (1997) from the Institute of Business Administration (IBA), Karachi; Predictive Index (PI) Certified Partner; named in the "Top 50 Influential Muslims in the Americas (2024)" by EqualityX [FACT - VERIFIED via corporate bio, interviews, and public filings].
- **Internal Staff Roster (as listed on `/about` and verified via LinkedIn):**
  - Talha Khan (Operations Lead)
  - Samar Naeem (Finance Lead)
  - Zainab Gohar (Sales & Member Intake)
  - Hamza Zahid (Data Analytics)
  - Effa Khanum (Data Analytics)
  - Aamna Qamar (Data Analyst)
  - Mahnoor Asif (Assistant Project Manager)
  - Danish Raj (Manager of Software Development)
  - Jahanzaib Ansari (Sr. Front-End Developer)
  - Nikhil Kumar / "Nick" (Front-End Developer)
  - Farzam Yousuf (Senior Mobile App Developer)
- **Active Regional Chapter Ambassadors:**
  - **Ayesha Qureshi** (Detroit Chapter Ambassador; Founder, Q line Media)
  - **Haris Ahmed** (Chicago Chapter Ambassador; Founder & CEO, Pragmatium Consulting Group)
- **Key Observation:** AMCOB already maintains an in-house engineering and data team. The redesign must deliver clean, maintainable codebases and component systems that respect their existing development capabilities [RECOMMENDATION].

### 3.3 Geographic Scope & Chapter Ambiguity
- **Claimed Territory:** United States, Canada, United Kingdom, United Arab Emirates, Kingdom of Saudi Arabia, and Republic of Turkiye [FACT - VERIFIED via homepage header and world map markers].
- **Chapter Evidence:** Active ambassador programs and regional event listings confirmed in **Detroit, MI** (Ambassador Ayesha Qureshi), **Chicago, IL** (Ambassador Haris Ahmed), Southern California / Anaheim (LEAD Summit), and Toronto, Canada [FACT - VERIFIED].
- **Uncertainty:** Whether overseas territories (UAE, KSA, UK, Turkiye) represent fully incorporated legal entities, formal chamber chapters, informal member clusters, or delegation destinations remains unverified from public sources [INFORMATION REQUIRING AMCOB ACCESS].

---

## 4. Program Taxonomy, Inclusions & Pricing Structure

AMCOB operates a multi-tiered offering structured across four distinct categories:

```
                            AMCOB OFFERING SPECTRUM
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ 1. ENTRY & REFERRALS                                                        │
 │    • Affiliate Membership: $550/year (Directory profile, basic events)      │
 │    • AMCOB Connect: $850/year (Referral sessions, client matchmaking)       │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 2. EXECUTIVE PEER ADVISORY GROUPS (PAG) - Revenue Qualified                 │
 │    • Emerging Enterprises (<$1M Revenue): $1,925/year (Includes Connect)   │
 │    • Booming Enterprises ($1M-$5M Revenue): $2,750/year (Includes Connect)  │
 │    • Scaling Enterprises ($5M-$25M Revenue): $3,850/year (Includes Connect) │
 │    • Summit ($25M-$100M Revenue): $4,675/year (Includes Connect)            │
 │    • Powerhouse ($100M+ Revenue): $5,500/year (Includes Connect)            │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 3. SPECIALIZED & HIGH-HONOR CIRCLES                                         │
 │    • Khadija Collective: Circle for Muslim Women Founders (Interview only)  │
 │    • Lifetime Founding Circle: Permanent honor for institutional stewards   │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 4. EXPERIENTIAL & INSTITUTIONAL INITIATIVES                                 │
 │    • LEAD Summit: Annual Anaheim business conference ($250 - $1,800 passes) │
 │    • PRISM Retreat: Private high-net-worth salon retreats (Invite-only)     │
 │    • AMCOB Tours: Bilateral international trade delegations (Turkiye, Gulf) │
 │    • Muslim Life Design Lab (MLDL): Work-life-faith integration workshops   │
 └─────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Peer Advisory Groups (PAG) & The G.A.I.N. Framework
PAG is AMCOB’s primary high-conviction mastermind product. It is anchored around the proprietary **G.A.I.N.** framework:
- **G — Growth:** Shared operational wisdom, scaling frameworks, and leadership evolution.
- **A — Accountability:** Peer board review keeping CEOs focused on high-leverage quarterly priorities.
- **I — Isolation Relief:** Safe haven for Muslim executives to address vulnerable business and personal burdens with peers of equal stature.
- **N — Networking & Collaboration:** Direct access to vetted partners, high-value supplier terms, and cross-border ventures.

---

## 5. Critical Research Leads & Discrepancy Log

### 5.1 Research Lead: AI Customer Matching in the Member Portal
- **Public Claim:** `https://amcob.org/connect` explicitly advertises:  
  *"We meet on the 1st and 3rd Friday of every month, match you with prospective customers using AI... In the Member Portal, describe the customers you serve best: their industry, size, location, and AMCOB Connect uses AI to match you with prospective customers."*
- **What Can Be Verified:**
  1. The marketing copy and step-by-step UI explanation on `amcob.org/connect` are confirmed public facts [FACT - VERIFIED].
  2. The Member Portal (`my.amcob.org`) enforces an authentication wall [FACT - VERIFIED].
- **What Remains Unverified:**
  1. The underlying technology (LLM API, deterministic database query, embedding vector search, or manual concierge matching disguised as AI) cannot be determined without member access [INFORMATION REQUIRING AMCOB ACCESS].
  2. The quality, volume, and satisfaction rates of AI-generated matches are unknown [UNVERIFIED].
- **Strategic Rule:** The reinvention team will **not** claim to invent AI customer matching as a new feature. It will be treated as an existing claimed capability. In the technical blueprint, we recommend framing this as a dual-engine architecture: **"Curated Human Facilitation + Algorithmic ICP Matchmaking."**

### 5.2 Discrepancy Log: Referral Meeting Frequency
- **Conflict:**
  - `https://amcob.org/connect` states: *"Turn word of mouth into a steady flow of warm introductions, twice a month."* and *"We meet on the 1st and 3rd Friday of every month."*
  - `https://amcob.org/join` states: *"Weekly Referral-Based Revenue Sessions."*
  - `https://amcob.org/about` states: *"Generate qualified business leads through our weekly referral exchanges."*
- **Status:** [CONFIRMED CONFLICT].
- **Resolution Path:** Logged under Approval Gate AG-02. Sam and Mr. Kashif must confirm whether Connect meets bi-weekly or weekly so all copy can be synchronized.

### 5.3 Discrepancy Log: Geographic Scope Representation
- **Conflict:**
  - Hero header lists 5 countries: USA, Canada, UAE, KSA, Turkiye.
  - Interactive map data lists 7 countries: USA, Canada, UK, UAE, Saudi Arabia, Turkiye, New Zealand.
  - LinkedIn and footer copy list: US, Canada, UK, and the Gulf.
- **Status:** [CONFIRMED CONFLICT].
- **Resolution Path:** Establish a clear hierarchy: **Official Chapters** (North America), **Regional Hubs** (London, Dubai, Riyadh), **Delegation Corridors** (Turkiye), and **Global Member Network** (New Zealand, etc.).

---

## 6. Event Status & Temporal Classification

Audit of `/events`, `/dinner-mixers`, `/virtual-mixers`, and Luma profile `lu.ma/amcob`:

| Event / Gathering | Series / Channel | Stated / Historical Date | Timezone / Location | Verified Classification | Audit Observation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LEAD Summit Anaheim** | Flagship Conference | Past session October 2025 / Recurring Annual | PST / Anaheim, CA | **Past Event / Ongoing Annual Flagship** | Requires explicit "Next Date Announcement / Waitlist" state rather than ambiguous live ticketing. |
| **Orange County Dinner Mixer** | In-Person Dinner Series | Monthly / Bi-monthly | PST / Irvine / Newport Beach | **Past Event (Gallery Archive)** | Displayed alongside current forms without date stamps; needs temporal badge. |
| **Toronto Executive Mixer** | In-Person Dinner Series | Quarterly | EST / Toronto, ON | **Past Event (Archive)** | Lacks clear past/upcoming segmentation. |
| **AMCOB Connect Bi-Weekly** | Virtual Referral Session | 1st & 3rd Friday Monthly | 8:00 AM PST / Zoom | **Ongoing Recurring Program** | Needs live countdown, calendar subscription (.ics/Google), and clear timezone selector. |
| **PRISM Retreat 2026** | Executive Retreat | Scheduled Q3/Q4 2026 | Private Destination | **Upcoming / Application Open** | High-end presentation; invitation vetting must be crystal clear. |
| **AMCOB Trade Tour: Morocco**| Trade Delegation | October 26–30, 2026 | Rabat, Casablanca, Marrakech | **Active Upcoming Delegation** | 5-day structured B2B mission across Morocco; requires pre-trip briefing dossier and bilateral B2B meeting schedule. |
| **AMCOB Trade Tour: Turkiye**| Trade Delegation | Annual / Delegation Schedule | Istanbul / Ankara, Turkiye | **Upcoming Trade Mission** | Needs clear application window, travel dates, and business visa requirements. |

> [!IMPORTANT]
> **Strict Anti-Recycling Rule:** The new digital flagship will **never** display past event dates as current, nor recycle expired mixer schedules. All events will use automated temporal classification (`Upcoming`, `In Progress`, `Concluded Archive`).

---

## 7. Investment & Capital Raising Workflow Boundaries

On `https://amcob.org/opportunities`, AMCOB showcases investment listings and capital raising deal flow with ticket sizes ranging from **\$250,000 to \$2,000,000**:
- **Regulatory Constraint:** Promoting private investment offerings touches complex securities regulations in the United States (SEC Regulation D / Rule 506), Canada, the UK (FCA), and the UAE (DFSA/ADGM).
- **Current Observation:** The current page features a general intake form and basic disclaimer text.
- **Architectural Boundary:** The public website must strictly remain an **informational showcase and accredited investor intake point**. It must **never** perform transaction clearing, investment advice, securities brokerage, or custodial fund routing. All investment promotions must feature prominent legal disclosures and require self-certification of accredited investor status.
