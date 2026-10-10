# AMCOB: Allied Muslim Chamber of Business

The official multi-page digital platform for **AMCOB** (Allied Muslim Chamber of Business), the premier national network connecting Muslim founders, C-suite executives, institutional investors, and operating enterprises across North America.

***

## Architecture Overview

* **Multipage Static Engine:** 50 active production HTML pages with semantic URL routing and 100% route parity with legacy AMCOB endpoints.
* **Design System:** Institutional corporate aesthetic built on pure `#ffffff` background, deep AMCOB navy (`#0b1a30`), restrained champage-gold accents (`#c5a059`), and crisp typography.
* **Media & Imagery Standards:** Photorealistic corporate documentary photography depicting authentic Muslim business executives with modest corporate styling (all women depicted wear elegant covered hair in diverse styles: silk hijabs, contemporary turban wraps, draped shaylas, and formal evening wraps).
* **Editorial Standards:** Strictly 0 prose dashes across all copy, with verified facts, authentic member records, and 124+ searchable enterprise directory listings.

***

## Project Structure

```
amcob/
├── index.html                           # Flagship Homepage
├── about.html                           # Chamber Leadership & Advisory Council
├── membership.html                      # Executive Tiers & Value Architecture
├── peer-advisory.html                   # Peer Advisory Groups (PAG) Framework
├── upcoming-peer-advisory-meetings.html # Closed-Door Cohort Meeting Schedules
├── virtual-accelerator-program.html     # 12-Week Venture Syllabus (0% Equity)
├── dinner-mixers.html                   # Private Dining Summits across 12 Cities
├── virtual-mixers.html                  # Global Virtual Networking Lounges
├── conferences-workshops.html           # Annual LEAD Summit & Bilateral Missions
├── events.html                          # Master Events Calendar
├── networking-events-podcasts.html      # Official Video Broadcast Series
├── podcasts.html                        # Canonical Alias to Video Broadcasts
├── business-directory.html              # 124+ Verified Muslim-Owned Businesses
├── business-directory-detail.html       # Dynamic Member Company Profile
├── add-listing.html                     # Directory Onboarding Portal
├── blog.html                            # Editorial Thought Leadership Publication
├── blog-detail.html                     # Dynamic Article Reader
├── books.html                           # Curated Business & Leadership Library
├── book-detail.html                     # Dynamic Book Synopsis & Review Reader
├── opportunities.html                   # Commercial Deal Flow & Capital Raising
├── engage.html                          # 4-Pillar Strategic Partnership Gateway
├── sponsorship.html                     # Corporate Sponsorship Prospectus
├── advertisement.html                   # Digital Display & Newsletter Media Kit
├── affiliate.html                       # Independent Consulting & Advisory Tier
├── connect.html                         # Bi-Weekly Commercial Referral Engine
├── contact-us.html                      # Chamber Headquarters & Inquiries
├── join.html                            # Executive Membership Application
├── privacy-policy.html                  # Member Data Governance Policy
├── mldl.html                            # Muslim Life Design Lab
├── resources.html                       # Executive Toolkits & Research Reports
├── design-system.html                   # Living UI Component Library
├── ambassador-program/                  # Regional Chapter Ambassador Network
│   ├── index.html                       # Chapter Leadership Directory
│   └── [slug].html                      # 12 Individual Ambassador Profiles
├── pag/                                 # Peer Advisory Group Cohort Hubs
│   ├── emerging.html                    # $100K to $500K Revenue
│   ├── scaling.html                     # $500K to $1M Revenue
│   ├── booming.html                     # $1M to $3M Revenue
│   ├── powerhouse.html                  # $3M to $15M Revenue
│   └── summit.html                      # $15M+ Revenue
├── css/                                 # Style Sheets (Core, Glass Nav, Motion)
├── js/                                  # Client Scripts (Directory, Dynamic Detail)
├── data/                                # Clean JSON Databases (Ambassadors, Podcasts, Members)
├── assets/optimized/                    # WebP/JPG Photography, Logos, and Icons
└── vercel.json                          # Vercel Clean URL & Static Rewrite Config
```

***

## Local Development

Start the local multipage server:

```bash
npm start
```

The platform will be live at `http://127.0.0.1:8000/`.

***

## Automated Verification Suite

Run the full automated test suite to audit routes, internal links, local assets, and editorial copy standards:

```bash
npm run audit:all
```

Individual audit commands:
* `npm run audit:assets`: Audits all 545 local image and script references to ensure zero 404s.
* `npm run audit:links`: Crawls all 54 HTML files and tests 507 unique internal links.
* `npm run audit:routes`: Tests all 108 original AMCOB URLs for 200 OK parity.
* `npm run audit:copy`: Enforces 0 prose dashes and verifies absence of artificial buzzwords.

***

## Deployment to Vercel & GitHub

The repository is pre-configured with `vercel.json` for zero-configuration static deployment:
* Clean URLs enabled (`/about` routes directly to `/about.html`).
* Dynamic detail routing for `/business-directory/:slug`, `/blog/:slug`, and `/books/:slug`.
* Immutable cache headers for all assets in `/assets/`.

To deploy:
```bash
git init
git add .
git commit -m "feat: AMCOB complete multipage platform"
git branch -M main
git remote add origin https://github.com/<your-org>/amcob.git
git push -u origin main
```
