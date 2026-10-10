# AMCOB Open Questions & Leadership Approval Gates
**Document ID:** AMCOB-STAGE0-DOC-07  
**Status:** Complete / Decision Gates for Executive Leadership  
**Date:** October 9, 2026  
**Audience:** Sam (Project Sponsor), Mr. Kashif Zubair (CEO, AMCOB)  

---

## 1. Executive Approval Gates

The following 7 approval gates require formal sign-off from Sam and Mr. Kashif before Codex initiates Phase A production scaffolding:

```
                         EXECUTIVE APPROVAL SUMMARY
 ┌──────┬──────────────────────────────────┬─────────────────┬─────────┐
 │ Gate │ Strategic Decision               │ Recommendation  │ Status  │
 ├──────┼──────────────────────────────────┼─────────────────┼─────────┤
 │ AG-01│ Creative Direction Selection     │ Direction 1     │ PENDING │
 │      │                                  │ (Living Circle) │         │
 ├──────┼──────────────────────────────────┼─────────────────┼─────────┤
 │ AG-02│ AMCOB Connect Meeting Cadence    │ Bi-Weekly       │ PENDING │
 │      │ Synchronization                  │ (1st & 3rd Fri) │         │
 ├──────┼──────────────────────────────────┼─────────────────┼─────────┤
 │ AG-03│ Member Portal AI Matchmaking     │ Dual-Engine     │ PENDING │
 │      │ Technical Audit & Public Framing │ Narrative       │         │
 ├──────┼──────────────────────────────────┼─────────────────┼─────────┤
 │ AG-04│ Subdomain Consolidation          │ Full Subpath    │ PENDING │
 │      │ (lead, prism, tours -> amcob.org)│ Consolidation   │         │
 ├──────┼──────────────────────────────────┼─────────────────┼─────────┤
 │ AG-05│ Executive Documentary Shot List  │ Commission 8-Pt │ PENDING │
 │      │ & Photo Session Authorization    │ Shot List       │         │
 ├──────┼──────────────────────────────────┼─────────────────┼─────────┤
 │ AG-06│ Investment & Capital Raising     │ Two-Tier NDA &  │ PENDING │
 │      │ Regulatory Disclosure Sign-Off   │ Accreditation   │         │
 ├──────┼──────────────────────────────────┼─────────────────┼─────────┤
 │ AG-07│ Member Directory Privacy &       │ Unmask Behind   │ PENDING │
 │      │ PII Protection Boundary          │ Auth Gate       │         │
 └──────┴──────────────────────────────────┴─────────────────┴─────────┘
```

---

## 2. Detailed Gate Specifications

### Approval Gate AG-01: Creative Direction Selection
- **The Issue:** Three distinct design concepts have been developed: **Direction 1 ("The Living Circle")**, **Direction 2 ("The Sovereign Ledger")**, and **Direction 3 ("The Catalyst Studio")** (detailed in [`/docs/04-three-creative-directions.md`](file:///c:/Users/mcreg/Desktop/amcob.org/docs/04-three-creative-directions.md)).
- **Our Recommendation:** Approve **Direction 1 ("The Living Circle")**. It reflects the traditional *Halaqah* model, embodies the G.A.I.N. framework, and elevates executive isolation relief into a proprietary visual identity.
- **Decision Required:** Formal selection of the primary direction for component design tokens.

### Approval Gate AG-02: Connect Meeting Cadence Synchronization
- **The Issue:** The public site currently contradicts itself:
  - `amcob.org/connect` states: *"We meet on the 1st and 3rd Friday of every month... twice a month."*
  - `amcob.org/join` states: *"Weekly Referral-Based Revenue Sessions."*
- **Our Recommendation:** Confirm the official operational cadence as **bi-weekly (1st & 3rd Friday of each month)**, and update all marketing copy consistently.
- **Decision Required:** Confirmation from Mr. Kashif on the true meeting schedule.

### Approval Gate AG-03: AI Matchmaking Capability Verification
- **The Issue:** Public copy advertises AI-powered customer matching in the member portal, but the technical mechanics cannot be verified from the outside.
- **Our Recommendation:** Frame the public narrative honestly around a **Dual-Engine Value Proposition**: *"Curated Concierge Matchmaking by Chapter Chairs + Algorithmic ICP Pairing in the Member Portal."* Avoid speculative technical claims until the engineering team audits the portal backend.
- **Decision Required:** Leadership authorization for the dual-engine framing and read-access for technical audit.

### Approval Gate AG-04: Subdomain Consolidation
- **The Issue:** `lead.amcob.org`, `prism.amcob.org`, and `tours.amcob.org` exist as isolated microsites with fragmented branding and separate forms.
- **Our Recommendation:** Consolidate these programs as first-class subdirectories under `amcob.org` (`/gatherings/lead-summit`, `/gatherings/prism-retreat`, `/gatherings/trade-missions`) to consolidate domain authority and preserve SEO equity.
- **Decision Required:** Approval to sunset standalone subdomain styling in favor of unified master templates.

### Approval Gate AG-05: Executive Photography Commission
- **The Issue:** Current visual assets include low-resolution composites and uncurated social crops. Authentic, high-resolution photography is mandatory to achieve the multimillion-dollar flagship standard.
- **Our Recommendation:** Commission a local commercial photographer in Irvine, CA to execute the 8-point documentary shot list (CEO Mr. Kashif, Irvine leadership, roundtable dialogue).
- **Decision Required:** Authorization to schedule photography and secure signed member releases.

### Approval Gate AG-06: Capital Raising Regulatory Disclosures
- **The Issue:** Showcasing private business investment opportunities (\$250k–\$2M) requires strict compliance with US SEC and international financial regulations.
- **Our Recommendation:** Implement a strict two-tier information architecture: public overview with prominent regulatory disclaimers, followed by an accredited investor self-certification and digital NDA gate before full financials can be viewed.
- **Decision Required:** Legal review and sign-off on investment disclaimer text.

### Approval Gate AG-07: Member Directory Privacy & PII Boundary
- **The Issue:** The public directory currently lists business names, addresses, and contacts. 
- **Our Recommendation:** The public directory will show verified business teasers and category tags; direct executive phone numbers and email contacts will be masked behind member authentication to protect leaders from unsolicited scraping and spam.
- **Decision Required:** Policy approval on public vs. private directory fields.

---

## 3. Open Technical Questions for Codex Handoff

| Question Item | Context | Default Assumption | Criticality |
| :--- | :--- | :--- | :--- |
| **Q-01: CRM Destination** | Where should `/api/v1/apply` form submissions route? | Webhook dispatch to existing email/CRM + PostgreSQL table | High |
| **Q-02: Payment Processor** | Which merchant account processes membership dues? | Stripe Billing / Stripe Checkout | High |
| **Q-03: Headless CMS Choice** | What editing tool should non-technical staff use? | Strapi / Sanity or Git-based MDX | Medium |
| **Q-04: SSO Authentication** | How will `my.amcob.org` authenticate users from the flagship? | JWT cookie / OAuth2 redirect flow | High |
| **Q-05: Cloudflare DNS Control** | Will the engineering team have access to manage Cloudflare Page Rules & Edge Workers? | Direct access to Cloudflare dashboard required | Critical |
