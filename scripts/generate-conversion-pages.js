const fs = require('fs');
const { renderLayout, esc } = require('./site-layout');

// 1. Join / Application Page (join.html)
const joinContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Membership Application</span>
      <h1 class="page-title">Apply for AMCOB Membership</h1>
      <p class="page-subtitle">
        Join over 400 verified Muslim entrepreneurs, peer advisory cohorts, and executive chapters across North America.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 840px;">
      <div style="background-color: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 40px; box-shadow: var(--shadow-sm);">
        <h2 style="font-size: 24px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px;">Membership Qualification Intake</h2>
        <p style="font-size: 15px; color: var(--text-muted); margin-bottom: 32px;">
          Select your intended membership tier and provide your business details. Applications are reviewed within two business days.
        </p>

        <form id="membershipForm" onsubmit="event.preventDefault(); alert('Application submitted successfully. An AMCOB membership director will contact you within two business days to finalize onboarding.');">
          <!-- Step 1: Membership Tier Selection -->
          <div style="margin-bottom: 32px;">
            <label style="display: block; font-size: 15px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">1. Select Membership Tier *</label>
            <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
              <!-- Option 1: Affiliate -->
              <label style="display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; background: var(--bg-subtle);">
                <input type="radio" name="membership_tier" value="affiliate" data-name="Affiliate Membership" data-price="$550/year" style="margin-top: 4px;">
                <div>
                  <strong style="color: var(--brand-navy); font-size: 15px;">Affiliate Tier ($550 / year)</strong>
                  <p style="font-size: 13.5px; color: var(--text-muted); margin: 2px 0 0 0;">For solo practitioners, independent consultants, and early founders.</p>
                </div>
              </label>

              <!-- Option 2: Connect -->
              <label style="display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; background: var(--bg-subtle);">
                <input type="radio" name="membership_tier" value="connect" data-name="AMCOB Connect" data-price="$850/year" style="margin-top: 4px;">
                <div>
                  <strong style="color: var(--brand-navy); font-size: 15px;">AMCOB Connect ($850 / year)</strong>
                  <p style="font-size: 13.5px; color: var(--text-muted); margin: 2px 0 0 0;">Bi-weekly commercial referral networking and structured B2B introductions.</p>
                </div>
              </label>

              <!-- Option 3: PAG Emerging -->
              <label style="display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; background: var(--bg-subtle);">
                <input type="radio" name="membership_tier" value="pag_emerging" data-name="PAG Emerging Cohort" data-price="$1,925/year" checked style="margin-top: 4px;">
                <div>
                  <strong style="color: var(--brand-navy); font-size: 15px;">PAG: Emerging Cohort ($1,925 / year)</strong>
                  <p style="font-size: 13.5px; color: var(--text-muted); margin: 2px 0 0 0;">Monthly peer advisory board for companies with $100,000 to $500,000 in revenue.</p>
                </div>
              </label>

              <!-- Option 4: PAG Scaling -->
              <label style="display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; background: var(--bg-subtle);">
                <input type="radio" name="membership_tier" value="pag_scaling" data-name="PAG Scaling Cohort" data-price="$2,475/year" style="margin-top: 4px;">
                <div>
                  <strong style="color: var(--brand-navy); font-size: 15px;">PAG: Scaling Cohort ($2,475 / year)</strong>
                  <p style="font-size: 13.5px; color: var(--text-muted); margin: 2px 0 0 0;">Monthly peer advisory board for companies with $500,000 to $1,000,000 in revenue.</p>
                </div>
              </label>

              <!-- Option 5: PAG Booming -->
              <label style="display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; background: var(--bg-subtle);">
                <input type="radio" name="membership_tier" value="pag_booming" data-name="PAG Booming Cohort" data-price="$3,025/year" style="margin-top: 4px;">
                <div>
                  <strong style="color: var(--brand-navy); font-size: 15px;">PAG: Booming Cohort ($3,025 / year)</strong>
                  <p style="font-size: 13.5px; color: var(--text-muted); margin: 2px 0 0 0;">Monthly peer advisory board for enterprises with $1,000,000 to $3,000,000 in revenue.</p>
                </div>
              </label>

              <!-- Option 6: PAG Powerhouse -->
              <label style="display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; background: var(--bg-subtle);">
                <input type="radio" name="membership_tier" value="pag_powerhouse" data-name="PAG Powerhouse Cohort" data-price="$5,500/year" style="margin-top: 4px;">
                <div>
                  <strong style="color: var(--brand-navy); font-size: 15px;">PAG: Powerhouse Cohort ($5,500 / year)</strong>
                  <p style="font-size: 13.5px; color: var(--text-muted); margin: 2px 0 0 0;">Executive board governance for commercial enterprises with over $3,000,000 in revenue.</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 2: Executive Details -->
          <div style="margin-bottom: 32px;">
            <label style="display: block; font-size: 15px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">2. Executive Contact Details *</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Full Name *</label>
                <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Bilal Ahmed">
              </div>
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Executive Title *</label>
                <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Founder &amp; CEO">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Corporate Email *</label>
                <input type="email" required class="search-input" style="width: 100%;" placeholder="bilal@company.com">
              </div>
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Mobile Phone *</label>
                <input type="tel" required class="search-input" style="width: 100%;" placeholder="+1 (555) 000-0000">
              </div>
            </div>
          </div>

          <!-- Step 3: Company Profile -->
          <div style="margin-bottom: 32px;">
            <label style="display: block; font-size: 15px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">3. Commercial Entity Profile *</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Company Legal Name *</label>
                <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Apex Health Logistics, LLC">
              </div>
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Company Website *</label>
                <input type="url" required class="search-input" style="width: 100%;" placeholder="https://apexhealth.com">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Primary Industry Sector *</label>
                <select class="filter-select" style="width: 100%;">
                  <option value="healthcare">Healthcare &amp; Medicine</option>
                  <option value="software">Enterprise Software &amp; IT</option>
                  <option value="finance">Finance, Tax &amp; Wealth Advisory</option>
                  <option value="legal">Legal Counsel &amp; Corporate Law</option>
                  <option value="real_estate">Real Estate &amp; Construction</option>
                  <option value="logistics">Supply Chain &amp; Logistics</option>
                  <option value="manufacturing">Manufacturing &amp; Engineering</option>
                  <option value="retail">Specialized Retail &amp; Food</option>
                  <option value="other">Other Commercial Sector</option>
                </select>
              </div>
              <div>
                <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Nearest Metropolitan Chapter *</label>
                <select class="filter-select" style="width: 100%;">
                  <option value="dallas">Dallas / Fort Worth, TX</option>
                  <option value="houston">Houston, TX</option>
                  <option value="silicon_valley">Silicon Valley / Bay Area, CA</option>
                  <option value="nyc">New York / Tri-State</option>
                  <option value="chicago">Chicago, IL</option>
                  <option value="atlanta">Atlanta, GA</option>
                  <option value="toronto">Toronto, Ontario</option>
                  <option value="seattle">Seattle, WA</option>
                  <option value="orange_county">Orange County / LA, CA</option>
                  <option value="other">Other / Virtual Global</option>
                </select>
              </div>
            </div>
          </div>

          <div id="selectedTierSummary" style="padding: 16px 20px; background-color: #eff6ff; border-radius: 8px; color: #1e40af; font-size: 14px; font-weight: 600; margin-bottom: 24px;">
            Selected: PAG Emerging Cohort ($1,925/year)
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Submit Membership Application</button>
        </form>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('join.html', renderLayout({
  title: 'Apply for Membership | Chamber Intake',
  description: 'Apply for AMCOB membership across Affiliate, Connect, and Peer Advisory Group tiers.',
  activeNav: '',
  breadcrumbs: [{ label: 'Apply', url: '/join' }],
  content: joinContent
}));
console.log('Generated join.html');

// 2. Sponsorship (sponsorship.html)
const sponsorshipContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Corporate Partnerships</span>
      <h1 class="page-title">Corporate Sponsorship &amp; Brand Alignment</h1>
      <p class="page-subtitle">
        Position your institution before established Muslim business owners, high-net-worth investors, and corporate decision-makers across twelve metropolitan markets.
      </p>
    </div>
  </section>

  <!-- Network Demographics -->
  <section style="background-color: var(--bg-subtle); padding: 36px 0; border-bottom: 1px solid var(--border-light);">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center;">
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">400+</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Verified Member Enterprises</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">$100M+</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Annual Gatherings</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">12</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">North American Metropolitan Chapters</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">82%</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Founder &amp; C-Suite Demographic</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Sponsor AMCOB -->
  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 12px;">Strategic Alignment</span>
          <h2 class="section-title">Direct Engagement with Enterprise Buyers</h2>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            AMCOB convenes established business builders across healthcare, commercial real estate, corporate law, private equity, supply chain distribution, and technology infrastructure.
          </p>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Our members control significant corporate balance sheets and actively seek high-trust enterprise banking, commercial insurance, cloud infrastructure, professional advisory, and investment partnerships.
          </p>
          <p style="font-size: 16px; color: var(--text-body); line-height: 1.65;">
            Unlike standard business conventions where vendor pitches are lost in crowd noise, AMCOB sponsorship integrates your leadership into private executive roundtables, curated dinner mixers, and annual summit deliberations.
          </p>
        </div>

        <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 32px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">Core Engagement Channels</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 14.5px; color: var(--text-body);">
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>LEAD Summit Main Stage:</strong> Keynote address, panel seating, and executive exhibition at our flagship national gathering.</span>
            </li>
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Regional Dinner Host:</strong> Exclusive underwriting of private chapter dinners in Dallas, Houston, Orange County, Chicago, or Toronto.</span>
            </li>
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Executive Media:</strong> Sponsored episodes and brand features on the AMCOB Executive Dialogues podcast and weekly journal.</span>
            </li>
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Directory Authority:</strong> Verified enterprise partner badge and permanent category placement in the AMCOB Business Directory.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Sponsorship Tiers -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-gold" style="margin-bottom: 10px;">Tier Structure</span>
        <h2 class="section-title">Institutional Partnership Packages</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Select an underwriting level tailored to your institutional growth targets. Custom multi-year commitments are available upon request.
        </p>
      </div>

      <div class="grid-3">
        <!-- Tier 1 -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="badge badge-gold" style="margin-bottom: 10px;">National Flagship</span>
            <h3 class="card-title">Title Summit Partner</h3>
            <div style="font-size: 28px; font-weight: 750; color: var(--brand-navy); margin: 8px 0 14px 0;">
              $25,000 <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">/ year</span>
            </div>
            <p style="font-size: 14px; color: var(--text-body); line-height: 1.55; margin-bottom: 18px;">
              Category exclusive partnership with marquee branding across the entire AMCOB ecosystem and premier national summit presence.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; color: var(--text-body);">
              <li>&bull; 20-minute main stage keynote at LEAD Summit</li>
              <li>&bull; Premium exhibition pavilion and 10 VIP summit passes</li>
              <li>&bull; Co-host 4 regional executive dinners in cities of choice</li>
              <li>&bull; Dedicated feature episode on AMCOB Executive Dialogues</li>
              <li>&bull; Permanent logo recognition on global chamber masthead</li>
            </ul>
          </div>
          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-light);">
            <a href="#inquire" class="btn btn-primary btn-sm" style="width: 100%; text-align: center;">Inquire for Title Tier</a>
          </div>
        </div>

        <!-- Tier 2 -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="badge badge-blue" style="margin-bottom: 10px;">Regional Leadership</span>
            <h3 class="card-title">Chapter Underwriter</h3>
            <div style="font-size: 28px; font-weight: 750; color: var(--brand-navy); margin: 8px 0 14px 0;">
              $10,000 <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">/ year</span>
            </div>
            <p style="font-size: 14px; color: var(--text-body); line-height: 1.55; margin-bottom: 18px;">
              Targeted presence within designated metropolitan chapter markets, delivering direct face to face founder access.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; color: var(--text-body);">
              <li>&bull; Exclusive host of 4 chapter dinner mixers annually</li>
              <li>&bull; 5-minute welcome remarks at every regional dinner</li>
              <li>&bull; 4 executive passes to the annual LEAD Summit</li>
              <li>&bull; Featured sponsor profile in chapter communications</li>
              <li>&bull; Direct commercial introductions to chapter members</li>
            </ul>
          </div>
          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-light);">
            <a href="#inquire" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">Inquire for Chapter Tier</a>
          </div>
        </div>

        <!-- Tier 3 -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="badge" style="margin-bottom: 10px; background: #ffffff; border: 1px solid var(--border-light);">Media &amp; Digital</span>
            <h3 class="card-title">Executive Media Sponsor</h3>
            <div style="font-size: 28px; font-weight: 750; color: var(--brand-navy); margin: 8px 0 14px 0;">
              $5,000 <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">/ year</span>
            </div>
            <p style="font-size: 14px; color: var(--text-body); line-height: 1.55; margin-bottom: 18px;">
              Digital brand amplification through AMCOB audio podcasts, video interviews, and curated editorial journals.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; color: var(--text-body);">
              <li>&bull; Audio and video sponsor tags across 12 podcast episodes</li>
              <li>&bull; Dedicated partner editorial in monthly chamber review</li>
              <li>&bull; 2 executive passes to the annual national summit</li>
              <li>&bull; Business directory banner placement for 12 months</li>
              <li>&bull; Inclusion in bi-weekly member email briefings</li>
            </ul>
          </div>
          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-light);">
            <a href="#inquire" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">Inquire for Media Tier</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Partnership Intake Form -->
  <section class="section" id="inquire">
    <div class="container" style="max-width: 760px;">
      <div style="background-color: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 40px; box-shadow: var(--shadow-sm);">
        <span class="badge badge-gold" style="margin-bottom: 10px;">Corporate Intake</span>
        <h2 class="section-title">Request Official Partnership Prospectus</h2>
        <p style="font-size: 15px; color: var(--text-body); margin-bottom: 24px; line-height: 1.6;">
          Complete this inquiry to receive the AMCOB Corporate Sponsorship Kit, attendee demographics, and schedule a consultation with chamber leadership.
        </p>

        <form onsubmit="event.preventDefault(); alert('Prospectus request received. A partnership director will send the complete kit within one business day.');" style="display: flex; flex-direction: column; gap: 18px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Institution / Company Name *</label>
              <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Sterling Commercial Bank">
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Executive Contact Name &amp; Title *</label>
              <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Michael Vance, VP Corporate Partnerships">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Corporate Email *</label>
              <input type="email" required class="search-input" style="width: 100%;" placeholder="mvance@sterlingbank.com">
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Direct Telephone *</label>
              <input type="tel" required class="search-input" style="width: 100%;" placeholder="e.g. 949-555-0199">
            </div>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Target Partnership Tier *</label>
            <select class="search-input" style="width: 100%;" required>
              <option value="">Select Target Partnership Package</option>
              <option value="title">Title Summit Partner ($25,000 / year)</option>
              <option value="chapter">Regional Chapter Underwriter ($10,000 / year)</option>
              <option value="media">Executive Media Sponsor ($5,000 / year)</option>
              <option value="custom">Custom Multi-Year Institutional Engagement</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Strategic Alignment Goals</label>
            <textarea class="search-input" rows="3" style="width: 100%; font-family: inherit;" placeholder="Tell us briefly about the commercial products, services, or brand positioning you wish to highlight."></textarea>
          </div>

          <div>
            <button type="submit" class="btn btn-primary btn-md">Submit Corporate Request</button>
          </div>
        </form>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('sponsorship.html', renderLayout({
  title: 'Corporate Sponsorship & Brand Alignment | AMCOB',
  description: 'Explore institutional sponsorship, LEAD summit packages, regional chapter underwriting, and brand partnerships with the Allied Muslim Chamber of Business.',
  activeNav: '',
  breadcrumbs: [{ label: 'Sponsorship', url: '/sponsorship' }],
  content: sponsorshipContent
}));
console.log('Generated sponsorship.html');

// 3. Opportunities / Deal Flow (opportunities.html)
const oppContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Commercial Capital</span>
      <h1 class="page-title">Capital Raising &amp; Private Deal Flow</h1>
      <p class="page-subtitle">
        Connecting qualified Muslim-owned operating companies, commercial syndications, and high-growth ventures with accredited angel syndicates and family offices.
      </p>
    </div>
  </section>

  <!-- Capital Pillars -->
  <section style="background-color: var(--bg-subtle); padding: 36px 0; border-bottom: 1px solid var(--border-light);">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center;">
        <div>
          <div style="font-size: 20px; font-weight: 750; color: var(--brand-navy);">Real Estate</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Commercial &amp; Multifamily</div>
        </div>
        <div>
          <div style="font-size: 20px; font-weight: 750; color: var(--brand-navy);">Healthcare</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Specialty Care &amp; Clinics</div>
        </div>
        <div>
          <div style="font-size: 20px; font-weight: 750; color: var(--brand-navy);">Enterprise Tech</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Profitable B2B Software</div>
        </div>
        <div>
          <div style="font-size: 20px; font-weight: 750; color: var(--brand-navy);">Global Trade</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Logistics &amp; Import Facilities</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How Capital Flow Works -->
  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: flex-start;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 12px;">Institutional Syndicate</span>
          <h2 class="section-title">Facilitating Direct Private Capital Formation</h2>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            AMCOB facilitates closed-door commercial deal flow between thoroughly screened operating businesses and qualified private investors. We emphasize ethical, equity-aligned structures that comply with Islamic commercial jurisprudence and applicable federal securities laws.
          </p>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Whether a member is syndicating a $10M commercial real estate development, acquiring a specialized medical practice, or scaling a high-margin enterprise SaaS platform, our private deal network provides direct access to accredited investors who understand the business.
          </p>
          <p style="font-size: 16px; color: var(--text-body); line-height: 1.65;">
            All transactions are private bilateral investments between sponsors and participating investors. AMCOB does not hold investor capital, underwrite securities, or provide formal investment advisory services.
          </p>
        </div>

        <div style="background-color: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 32px;">
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">Founder Deal Submission Standards</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 14px; color: var(--text-body);">
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">01</span>
              <span><strong>Verifiable Operating Track Record:</strong> Minimum $500,000 trailing twelve-month revenue or proven cash-flowing commercial real estate assets.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">02</span>
              <span><strong>Clean Governance &amp; Entity Structuring:</strong> Organized LLC or corporate entity with documented financial statements and clear cap table.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">03</span>
              <span><strong>Ethical Capital Alignment:</strong> Pure equity participation, revenue-share, or asset-backed partnerships free from prohibited debt instruments.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">04</span>
              <span><strong>Confidential Committee Review:</strong> Every pitch deck and private placement memorandum is vetted by our capital committee before presentation.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Investor Pathway & Founder Pathway -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div class="grid-2">
        <!-- Card 1: For Accredited Investors -->
        <div class="card" style="padding: 36px;">
          <span class="badge badge-blue" style="margin-bottom: 12px;">For Investors</span>
          <h3 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 12px;">Accredited Investor Syndicate</h3>
          <p style="font-size: 14.5px; color: var(--text-body); line-height: 1.6; margin-bottom: 20px;">
            Join a trusted circle of angel investors, family office directors, and seasoned executives reviewing curated private deal flow across North America.
          </p>
          <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; color: var(--text-muted);">
            <li>&bull; Direct access to verified commercial syndications</li>
            <li>&bull; Co-investment opportunities alongside lead institutional sponsors</li>
            <li>&bull; Peer due-diligence notes and quarterly closed-room briefings</li>
            <li>&bull; Strictly verified under SEC Rule 501 accredited criteria</li>
          </ul>
          <a href="#intake" class="btn btn-primary btn-sm">Register as Accredited Investor</a>
        </div>

        <!-- Card 2: For Founders Raising Capital -->
        <div class="card" style="padding: 36px;">
          <span class="badge badge-gold" style="margin-bottom: 12px;">For Founders</span>
          <h3 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 12px;">Submit Your Commercial Venture</h3>
          <p style="font-size: 14.5px; color: var(--text-body); line-height: 1.6; margin-bottom: 20px;">
            Present your expansion round or commercial syndication to vetted Muslim investors seeking high-integrity commercial returns.
          </p>
          <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; color: var(--text-muted);">
            <li>&bull; Stage screening by seasoned multi-million dollar operators</li>
            <li>&bull; Pitch preparation and term sheet guidance</li>
            <li>&bull; Presentation at private AMCOB Deal Day convenings</li>
            <li>&bull; Zero upfront placement broker fees or retainers</li>
          </ul>
          <a href="#intake" class="btn btn-secondary btn-sm">Submit Deal Memorandum</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Intake Form -->
  <section class="section" id="intake">
    <div class="container" style="max-width: 760px;">
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 40px; box-shadow: var(--shadow-sm);">
        <span class="badge badge-gold" style="margin-bottom: 10px;">Confidential Registration</span>
        <h2 class="section-title">Capital Network Intake Form</h2>
        <p style="font-size: 15px; color: var(--text-body); margin-bottom: 24px; line-height: 1.6;">
          Please indicate your interest below. Our capital committee will contact you confidentially within two business days.
        </p>

        <form onsubmit="event.preventDefault(); alert('Registration submitted confidentially. A member of the capital committee will contact you shortly.');" style="display: flex; flex-direction: column; gap: 18px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">I am registering as *</label>
            <select class="search-input" style="width: 100%;" required>
              <option value="">Select Registration Track</option>
              <option value="investor">Accredited Investor / Family Office (Seeking Deal Flow)</option>
              <option value="founder">Operating Founder / Sponsor (Seeking Expansion Capital)</option>
              <option value="advisor">Financial Advisor / Corporate Structuring Specialist</option>
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Full Legal Name *</label>
              <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Asad Qureshi">
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Company / Entity Name *</label>
              <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Crescent Ridge Holdings">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Email Address *</label>
              <input type="email" required class="search-input" style="width: 100%;" placeholder="asad@crescentridge.com">
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Telephone Number *</label>
              <input type="tel" required class="search-input" style="width: 100%;" placeholder="e.g. 949-555-0144">
            </div>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Brief Description of Commercial Focus or Capital Size *</label>
            <textarea required class="search-input" rows="3" style="width: 100%; font-family: inherit;" placeholder="Please outline target transaction size, sector focus (real estate, healthcare, software), or current capital requirement."></textarea>
          </div>

          <div style="background-color: var(--bg-subtle); padding: 14px 18px; border-radius: 8px; font-size: 12.5px; color: var(--text-muted); line-height: 1.5; border: 1px solid var(--border-light);">
            <strong>Regulatory Notice:</strong> AMCOB is a private business chamber facilitating commercial connections and member introductions. AMCOB is not a registered broker-dealer, registered investment adviser, or commodities trading intermediary. All investments carry risk, and participants must conduct their own independent legal and financial due diligence.
          </div>

          <div>
            <button type="submit" class="btn btn-primary btn-md">Submit Capital Registration</button>
          </div>
        </form>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('opportunities.html', renderLayout({
  title: 'Capital Raising & Commercial Deal Flow | AMCOB',
  description: 'Private market investments, commercial real estate syndications, and expansion capital intake for accredited investors and operating founders.',
  activeNav: '',
  breadcrumbs: [{ label: 'Opportunities', url: '/opportunities' }],
  content: oppContent
}));
console.log('Generated opportunities.html');

// 4. Add Listing (add-listing.html)
const addListingContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Directory Inclusion</span>
      <h1 class="page-title">Add Your Business to the AMCOB Directory</h1>
      <p class="page-subtitle">
        Join North America's most authoritative index of verified Muslim-owned commercial enterprises.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 760px;">
      <div style="background-color: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 36px; box-shadow: var(--shadow-sm);">
        <h2 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 12px;">Directory Submission Form</h2>
        <p style="font-size: 14.5px; color: var(--text-muted); margin-bottom: 28px;">
          All submissions are reviewed by the chamber directory committee to ensure commercial legitimacy and community standing.
        </p>

        <form onsubmit="event.preventDefault(); alert('Listing submitted for verification.');" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Business Legal Name *</label>
            <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Salam Health Group">
          </div>
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Official Website URL *</label>
            <input type="url" required class="search-input" style="width: 100%;" placeholder="https://salamhealth.com">
          </div>
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Industry Classification *</label>
            <select class="filter-select" style="width: 100%;">
              <option value="Healthcare">Healthcare &amp; Medicine</option>
              <option value="Technology">Technology &amp; Software</option>
              <option value="Finance">Finance &amp; Accounting</option>
              <option value="Legal">Legal Services</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Logistics">Logistics &amp; Transport</option>
              <option value="Food">Food &amp; Hospitality</option>
              <option value="Consulting">Professional Consulting</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-body); margin-bottom: 6px;">Business Description *</label>
            <textarea rows="4" required class="search-input" style="width: 100%; resize: vertical;" placeholder="Describe your core commercial offerings, founding year, and service territory..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Submit Business for Verification</button>
        </form>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('add-listing.html', renderLayout({
  title: 'Add a Business Listing | AMCOB Directory Intake',
  description: 'Submit your Muslim-owned enterprise for verification and inclusion in the official AMCOB Business Directory.',
  activeNav: 'directory',
  breadcrumbs: [{ label: 'Directory', url: '/business-directory' }, { label: 'Add Listing', url: '/add-listing' }],
  content: addListingContent
}));
console.log('Generated add-listing.html');

// 5. Advertisement (advertisement.html)
const adContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Digital Placements</span>
      <h1 class="page-title">Directory Advertising &amp; Media Specs</h1>
      <p class="page-subtitle">
        Target high-net-worth Muslim business owners and decision-makers through targeted directory spots and executive newsletters.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 820px;">
      <h2 class="section-title">Reach B2B Commercial Buyers</h2>
      <p style="font-size: 16px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
        AMCOB offers curated digital advertising opportunities across our public business directory, weekly executive newsletters, and event programs. We prioritize reputable B2B vendors offering enterprise banking, software, insurance, and professional services.
      </p>

      <div class="grid-2" style="margin-bottom: 36px;">
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 8px;">Featured Spotlight</span>
          <h3 class="card-title">Directory Category Spotlight</h3>
          <p class="card-body">Pinned placement at the top of your relevant business directory category with verified gold border.</p>
        </div>
        <div class="card">
          <span class="badge badge-blue" style="width: fit-content; margin-bottom: 8px;">Direct Inbox</span>
          <h3 class="card-title">Executive Newsletter Banner</h3>
          <p class="card-body">Exclusive sponsor placement in the weekly AMCOB briefing delivered to over 5,000 Muslim founders.</p>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="/contact-us" class="btn btn-primary btn-lg">Request Media Kit &amp; Rates &rarr;</a>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('advertisement.html', renderLayout({
  title: 'Directory Advertising & Media Kit | AMCOB Digital Placements',
  description: 'Digital advertising opportunities, banner specifications, and executive newsletter placements across the AMCOB ecosystem.',
  activeNav: '',
  breadcrumbs: [{ label: 'Advertising', url: '/advertisement' }],
  content: adContent
}));
console.log('Generated advertisement.html');
