# AMCOB Review Corrections & Stage 0 Verification Log
**Document ID:** AMCOB-STAGE0-DOC-08  
**Status:** Approved Corrections Baseline  
**Date:** October 9, 2026  
**Auditor:** Principal Creative Director & Discovery Team  

---

## 1. Inventory Recount & Scope Verification

We conducted a forensic recount of all items from the physical files in `docs/`:

### 1.1 URL Inventory Breakdown (`docs/url-inventory.csv`)
* **Total Recorded URLs:** **673 entries** (666 discovered via `sitemap.xml` + 7 discovered via navigation/subdomains).
* **Unique Content Pages (~648 URLs):**
  * Business Directory Profiles: **372 unique listings** (`/business-directory/[slug]`).
  * Editorial Articles: **191 unique articles** (`/blog/[slug]`).
  * Executive Book Summaries: **61 unique summaries** (`/books/[slug]`).
  * Core Institutional & Program Pages: **24 unique pages** (`/`, `/about`, `/membership`, `/connect`, `/peer-advisory`, `/sponsorship`, `/advertisement`, `/opportunities`, `/ambassador-program`, `/events`, `/dinner-mixers`, `/virtual-mixers`, `/mldl`, `/contact-us`, `/privacy-policy`, etc.).
* **Duplicates, Redirects, Technical & Broken URLs (25 entries):**
  * Duplicate Conversion Intakes: 3 routes (`/join`, `/interested`, `/join-community`) render variations of the same general inquiry form.
  * Duplicate Directory Entry: 2 routes (`/business-directory`, `/business-listing`).
  * Broken / Inconsistent Route: `https://amcob.org/virtual-accelerator-program` returns **HTTP 404: Not Found**, while `https://amcob.org/pag/virtual-accelerator-program` returns **HTTP 200: OK** ($500/mo checkout).
  * Duplicate Checkout Form: `/pag/affiliate` duplicates `/affiliate` checkout.
  * Technical Meta: 2 routes (`/robots.txt`, `/sitemap.xml`).
* **Inaccessible Areas (Explicitly Reported as Un-audited):**
  * Member Portal Intranet (`my.amcob.org/dashboard`, authenticated member profile views).
  * System Administration Backend (`/admin/`, `/private/`, `/api/` — restricted by HTTP basic auth and `robots.txt`).
  * Underlying CRM and database schema (leads destination unknown).
  * Payment gateway merchant configurations.
* **Templates Visually Inspected in Depth:** **24 distinct page templates**.
* **Coverage Scope Boundary:** Crawl scope was limited to discoverable public routes and metadata. We do **not** claim complete coverage beyond the documented crawl scope.

### 1.2 Asset Inventory & Reuse Permission Breakdown (`docs/asset-register.csv`)
* **Total Assets Documented:** **243 rows**.
  * **235 Discovered Live Assets:** Harvested from public pages (82 member/leader portraits, 132 contextual/event images, 7 decorative banners, 8 SVG UI icons, 6 official brand marks).
  * **8 Planned Commission Shot List Items:** Specifications for future professional photography.
* **Reuse Permission Reality Check:**
  > [!IMPORTANT]
  > **Public Accessibility ≠ Reuse Permission:**  
  > Public accessibility on `amcob.org` does **not** constitute legal permission for third-party reuse, advertising, or derivative publishing. Zero member headshots or event photos are legally cleared for new production releases without AMCOB's internal media consent verification. All real member photography in prototypes is strictly provisional for local review.

---

## 2. Status Classification: Replacing Blanket "100% Complete" Language

Blanket claims of "100% complete and verified" have been retracted. Project findings are now categorized into five discrete evidentiary layers:

```
                      PROJECT VERIFICATION STATUS MATRIX
 ┌──────────────────────┬─────────────┬────────────────────────────────────────┐
 │ Layer                │ Status      │ Scope & Evidence Boundary              │
 ├──────────────────────┼─────────────┼────────────────────────────────────────┤
 │ 1. Public Research   │ CONFIRMED   │ Verified via HTTP response, sitemap,   │
 │                      │             │ and live metadata (Oct 9, 2026).       │
 ├──────────────────────┼─────────────┼────────────────────────────────────────┤
 │ 2. Technical         │ INFERRED    │ Deduced from DOM markers (Laravel,     │
 │    Inference         │             │ Bootstrap, Cloudflare). Untested in DB.│
 ├──────────────────────┼─────────────┼────────────────────────────────────────┤
 │ 3. Owner             │ PENDING     │ Requires formal sign-off from Sam and  │
 │    Confirmation      │ APPROVAL    │ Mr. Kashif Zubair (7 Approval Gates).  │
 ├──────────────────────┼─────────────┼────────────────────────────────────────┤
 │ 4. Artifact          │ VALIDATED   │ All 10 documentation files & CSVs exist│
 │    Validation        │ LOCALLY     │ and are physically verified in workspace│
 ├──────────────────────┼─────────────┼────────────────────────────────────────┤
 │ 5. Visual Concept    │ PROVISIONAL │ "The Living Circle" is a leading       │
 │    Approval          │ HYPOTHESIS  │ hypothesis for local review, not final.│
 └──────────────────────┴──────────────────────────────────────────────────────┘
```

---

## 3. Reversal of Unapproved Business Policy Changes

All unapproved modifications to AMCOB's baseline business policies, program names, and membership structures are hereby reversed in the official baseline:

1. **Restoration of Official Tier Name:**
   * **Reversed:** The suggested renaming of "Emerging Enterprises" to "AMCOB Scale Accelerator" is rescinded.
   * **Restored Baseline:** The official tier remains **"Emerging Enterprises"** (<$1M annual revenue, $1,925/year).
2. **Restoration of Pricing & Eligibility:**
   * Official pricing remains: Affiliate ($550/yr), Connect ($850/yr), Emerging ($1,925/yr), Booming ($2,750/yr), Scaling ($3,850/yr), Summit ($4,675/yr), Powerhouse ($5,500/yr). No price changes or initiation fees are introduced.
3. **Reversal of Mandated Communication Protocols & Doctrines:**
   * Do **not** mandate EO's "Gestalt Language Protocol" or declare a new organizational doctrine called the "Amanah Covenant."
   * These concepts are moved to: **"Optional organizational recommendations — AMCOB approval required."**
4. **Preservation of Program Autonomy:**
   * No programs (e.g. Khadija Collective, MLDL, Tours) are merged without AMCOB's written instruction.

### 3.1 Conflict Log: Emerging Enterprises vs. Virtual Accelerator Program
Forensic inspection revealed a direct conflict on the live site:
* **Route A (`/membership` & `/pag/emerging`):** Promotes **"Emerging Enterprises Peer Advisory Group"** for businesses under $1M revenue at **$1,925.00 / year**, which includes AMCOB Connect.
* **Route B (`/pag/virtual-accelerator-program`):** Promotes a **"Virtual Accelerator Program"** priced at **$500.00 / month** ($6,000.00 / year commitment under a 12-month contract, updated Oct 13, 2025).
* **Route C (`/virtual-accelerator-program`):** Returns **HTTP 404: Not Found**, despite being linked in navigation and the homepage ecosystem chart.
* **Finding:** It is currently ambiguous whether the Virtual Accelerator Program is an active premium installment program, an older experiment, or a distinct offering from Emerging Enterprises. We log this conflict for owner resolution without picking an arbitrary winner.

---

## 4. Faithful AI Presentation & Event Schedule Conflicts

### 4.1 AI Customer Matching: Grounded in Public Evidence
* **Verified Public Fact:** AMCOB's public Connect page (`amcob.org/connect`) states: *"In the Member Portal, describe the customers you serve best: their industry, size, location... AMCOB Connect uses AI to match you with prospective customers."*
* **Correction:** Any description of concierge matchmaking or custom vector algorithms represents an *optional narrative suggestion requiring AMCOB verification*, not an established operational fact. The production site will not make specific algorithmic claims until the portal engine is formally audited.

### 4.2 Event Schedule Discrepancies
* **Connect Cadence:** `amcob.org/connect` explicitly states: *"We meet on the 1st and 3rd Friday of every month... twice a month."*
* **Join & About Cadence:** `amcob.org/join` and `amcob.org/about` state: *"Weekly Referral-Based Revenue Sessions."*
* **Status:** This conflict is preserved in the audit log. The prototype will display the verified bi-weekly schedule with an owner notation.

---

## 5. System Decisions Kept Strictly Pending

The following technical and operational proposals are strictly pending future owner and engineering decisions:
* **Subdomain Consolidation:** Merging `lead`, `prism`, and `tours` into `amcob.org` subpaths remains an architectural recommendation; standalone subdomains remain live.
* **Single Sign-On (SSO):** A visible login link to `my.amcob.org` is **not** evidence of integrated SSO. SSO is not implemented or promised in this phase.
* **Payment Gateways & Recurring Dues:** Processor selection (Stripe vs. Authorize.net) is unconfirmed.
* **Investment Opportunities:** A proposed disclaimer modal does **not** constitute legal or regulatory compliance. Private investment pages remain strictly informational prototypes.
* **Member Contact Privacy:** Masking email/phone numbers in the directory is an operational recommendation requiring AMCOB policy approval.

---

## 6. URL Migration Classification Framework

Rather than assuming every legacy URL requires a 301 redirect or promising SEO gains from consolidation alone, URLs are classified into four disciplined categories:

1. **Retain (Direct 1:1 Preservation):** URLs that preserve their exact canonical path (e.g. `/about`, `/contact-us`, `/privacy-policy`).
2. **Move to Relevant Equivalent:** Specific URLs moved to a clean, modernized route with a 301 permanent redirect (e.g. `/business-directory/[slug]` -> `/directory/[slug]`).
3. **Merge with Justification:** Duplicate conversion routes merged into a single high-converting intake (`/join`, `/interested`, `/join-community` -> `/apply`) to eliminate cannibalization.
4. **Retire with Approval:** Broken or thin URLs retired with HTTP 410 Gone or redirected to parent hubs with owner approval (e.g. `/virtual-accelerator-program` 404).
