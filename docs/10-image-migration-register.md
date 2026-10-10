# AMCOB Image Preservation & Complete Asset Migration Register
**Document ID:** AMCOB-STAGE0-DOC-10  
**Status:** Complete Migration Specification & Asset Audit  
**Date:** October 9, 2026  
**Originating Agent:** AGY (Discovery & Creative Direction)  
**Receiving Agent:** Codex (Architecture & Implementation)  

---

## 1. Executive Summary & Migration Principle

> [!IMPORTANT]
> **Strict Asset Migration Mandate:**  
> All existing public website imagery across AMCOB's digital footprint has been preserved, cataloged, downloaded into local project storage, and mapped to its appropriate architectural destination. This is an exhaustive preservation migration, not a selective curation. No authentic content assets have been discarded or dropped.

During deep discovery across the public website, directory listings, event hubs, Luma proxies, article archives, and AWS S3 buckets:
- **Discovered Unique Image URLs:** **653** (expanded from the initial 243-asset baseline by 410 newly discovered assets).
- **Downloaded & Preserved Locally:** **651** assets stored in `assets/original/` and organized into `assets/optimized/`.
- **Byte-Exact Duplicates Identified & Consolidated:** **11** assets (consolidated by SHA-256 checksum without losing page references).
- **Technical Third-Party Pixels Archived:** **1** deprecated 1x1 tracking beacon (LinkedIn Insight tag `px.ads.linkedin.com`), isolated for privacy compliance.
- **Inaccessible / Broken Live Links Recovered:** **1** live URL (`/asseet/images/67eff37139379ae25002ddb5.jpg`) suffered from a developer typo on the live host; the asset was recovered by fixing the path to `/assets/images/...`.
- **Zero Hotlinks in Modern Flagship:** The redesigned local prototype (`concepts/index.html`) relies exclusively on local, optimized assets with zero hotlinks to `amcob.org`.

---

## 2. Local Asset Library Architecture

All files are organized into a two-tier directory structure within the repository:

```
c:\Users\mcreg\Desktop\amcob.org\assets\
├── original/                         // Immutable archive of downloaded raw source files
│   ├── 001_1788812226_z9zT8486Fd.jpeg
│   ├── 026_logo.png
│   ├── 322_JoinAMCOBBannerWebsite.webp
│   └── ... (651 verified source binaries)
└── optimized/                        // Categorized, web-ready display assets
    ├── logos/                        // Official AMCOB marks & Founding Circle corporate identities
    ├── leadership/                   // CEO Kashif Zubair, officers, and board members
    ├── ambassadors/                  // 12 Regional Chapter Ambassadors across North America
    ├── events/                       // LEAD Summit photography, trade missions, & 40+ city mixers
    ├── programs/                     // Khadija Collective, Virtual Accelerator, & member mosaics
    ├── members/                      // 211 verified member portraits
    ├── businesses/                   // 63 member business logos and listing headers
    ├── articles/                     // 161 editorial thought leadership article covers
    ├── books/                        // 63 Executive Library book summary covers
    ├── ui/                           // 46 genuine vector SVGs, hairline icons, and badges
    └── archived/                     // Retired technical beacons & tracking assets
```

---

## 3. Comprehensive Asset Inventory by Category

| Category | Discovered Count | Local Storage Folder | Target Modern Route Destination | Prototype Placement Status |
| :--- | :---: | :--- | :--- | :--- |
| **Official Logos** | 10 | `assets/optimized/logos/` | `/`, Global Header, Global Footer, Trust Strip | Placed in Flagship Prototype |
| **Leadership & Officers** | 20 | `assets/optimized/leadership/` | `/about`, `/about/leadership`, `/about/founding-circle` | Placed in Flagship (Kashif Zubair, Founding Circle) |
| **Chapter Ambassadors** | 12 | `assets/optimized/ambassadors/` | `/community/ambassadors`, `/about/chapters` | Mapped for Phase A/B Chapter Pages |
| **Events & City Mixers** | 57 | `assets/optimized/events/` | `/gatherings`, `/gatherings/trade-missions`, `/gatherings/mixers` | Placed in Flagship (LEAD Summit, Morocco, Mixers) |
| **Program Artworks** | 9 | `assets/optimized/programs/` | `/membership`, `/membership/programs`, `/apply` | Placed in Flagship (Member Mosaic, Khadija) |
| **Verified Member Portraits** | 211 | `assets/optimized/members/` | `/directory`, `/membership`, `/directory/[slug]` | Mapped for Phase B Member Directory (372 listings) |
| **Business Directory Assets** | 63 | `assets/optimized/businesses/` | `/directory`, `/directory/[slug]` | Placed in Prototype Directory Cards |
| **Executive Library Covers** | 63 | `assets/optimized/books/` | `/intelligence/executive-library` | Mapped for Phase B Executive Library |
| **Editorial Article Features** | 161 | `assets/optimized/articles/` | `/intelligence/insights` | Mapped for Phase B CMS Article Routes |
| **UI Icons & Vectors** | 46 | `assets/optimized/ui/` | Shared UI Component Token Library | Placed in Global Styles |
| **Archived Technical Beacons**| 1 | `assets/optimized/archived/` | Retired from production DOM | Archived for Privacy Compliance |
| **Total Cataloged** | **653** | `assets/` | **Complete Site Architecture** | **100% Accounted For** |

---

## 4. Key Authentic Visual Highlights Placed in Flagship

### 4.1 The Hero Opening: Real Summit Documentary Photography
- **Asset ID:** `IMG-0648` (Source: `assets/optimized/events/WVxXGzlIkhJuZjVaUcALnLmQh3JvBSfjAgxM8emt.jpg`)
- **Dimensions:** 1920 × 1080 pixels (High-Resolution JPEG).
- **Subject:** Real documentary photograph from an AMCOB LEAD Summit executive roundtable session. Shows Muslim founders, C-suite executives, and business owners seated around conference tables in active discussion with panoramic skyline windows and the AMCOB LEAD Summit auditorium backdrop.
- **Compositional Role:** Replaced the rejected abstract dark blue swirl. Rooted in authentic executive dialogue on pure white `#FFFFFF` canvas.

### 4.2 Official AMCOB Brand Identity & Proportions
- **Asset ID:** `IMG-0026` (Source: `assets/optimized/logos/logo.png`)
- **Dimensions:** 600 × 168 pixels (Natural aspect ratio: 3.57:1).
- **Subject:** Official AMCOB wordmark with serif typography and corporate navy finish.
- **Implementation:** Displayed in header and footer with explicit natural aspect ratio scaling (`height: 40px; width: auto;`) preventing letter stretching or compression.

### 4.3 Founding Circle Leadership & Corporate Marks
- **Dr. Sohail Masood (KabaFusion):** `assets/optimized/leadership/1516800934459.webp` (400×400)
- **Kamal Solaiman (Primary Capital Holdings):** `assets/optimized/leadership/1734487025310.webp` (400×400)
- **Umair Shah (Arbisoft Global):** `assets/optimized/leadership/umair-shah.jpg` (400×400)
- **Corporate Enterprise Anchor Marks:**
  - KabaFusion: `assets/optimized/logos/kabafusion.jpeg`
  - Arbisoft Global: `assets/optimized/logos/arbisoft.svg`
  - Primary Capital Holdings: `assets/optimized/logos/primaryCapitalHoldings.webp`
  - Merrill Lynch: `assets/optimized/logos/merrillImage.webp`

### 4.4 Member Community Network Mosaic
- **Asset ID:** `IMG-0322` (Source: `assets/optimized/programs/JoinAMCOBBannerWebsite.webp`)
- **Dimensions:** 1920 × 680 pixels.
- **Subject:** High-density authentic photographic mosaic showcasing over 100 real AMCOB members from diverse industries across North America.
- **Role:** Positioned above the footer as visual proof of chamber scale and community breadth.

### 4.5 Bilateral Trade Delegations & Regional Mixers
- **Morocco Trade Mission:** `assets/optimized/events/cta_faces.png` (October 26 to 30, 2026 delegation).
- **Regional Event Artwork:** Luma mixer covers for Boston, Chicago, Dubai, San Jose, Istanbul, Dallas, Houston, and Seattle preserved and mapped to the upcoming Gatherings calendar.

---

## 5. Duplicate Consolidation & Broken Link Recovery

### 5.1 Byte-Exact Duplicates Consolidated
Eleven assets share identical SHA-256 checksums across multiple URLs on the live website (e.g., placeholder images, repeated icons, identical company logos uploaded to multiple directories). These have been consolidated to single physical storage files in `assets/optimized/` while retaining their full mapping across all source pages in `docs/image-migration-register.csv`.

### 5.2 Broken Live Link Recovery
- **Live Defect:** `https://amcob.org/asseet/images/67eff37139379ae25002ddb5.jpg` returns HTTP 404 on the live website due to a directory typo (`asseet` instead of `assets`).
- **Resolution:** AGY tested the corrected path `https://amcob.org/assets/images/67eff37139379ae25002ddb5.jpg`, which returns HTTP 200. The asset was successfully downloaded to `assets/original/359_67eff37139379ae25002ddb5.jpg` and mapped to `/contact-us`.

---

## 6. Permissions, Quality Audit & Engineering Rules for Codex

1. **Clearance Notice Standard:**  
   In compliance with Stage 0 legal and ethical boundaries, all live member portraits and company logos carry the standard:  
   *"Reuse permission not verified in this research."*  
   Codex must confirm explicit media releases with AMCOB management before final production deployment.
2. **Zero Distortion Rule:**  
   Never apply fixed width and height that force aspect ratio distortion (e.g. `width: 160px; height: 42px;` on a 3.57:1 logo). Always use `width: auto; height: Xpx;` or modern CSS `aspect-ratio`.
3. **No Synthetic Faces:**  
   Zero AI-generated portraits or synthetic stock people. Only authentic photographs of real AMCOB leaders, members, and event attendees are cleared.
4. **Next.js Image Pipeline:**  
   Codex will map all local assets from `assets/optimized/` into Next.js `<Image>` components with automatic WebP/AVIF generation, blur placeholders, and explicit responsive `sizes`.
