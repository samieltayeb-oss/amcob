const fs = require('fs');
const { renderLayout, esc } = require('./site-layout');

// 1. Membership Overview (membership.html)
const membershipContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Membership Architecture</span>
      <h1 class="page-title">AMCOB Membership Structure</h1>
      <p class="page-subtitle">
        Structured peer accountability, commercial referral exchange, and executive community built to match your verified stage of business growth.
      </p>
    </div>
  </section>

  <!-- The GAIN Principle -->
  <section class="section">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-gold" style="margin-bottom: 12px;">Core Methodology</span>
        <h2 class="section-title">The G.A.I.N. Framework</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Every AMCOB membership tier is anchored in four tangible outcomes designed to strengthen Muslim enterprises.
        </p>
      </div>

      <div class="grid-4">
        <div class="card">
          <div style="font-size: 32px; font-weight: 800; color: var(--brand-gold); margin-bottom: 8px;">G</div>
          <h3 class="card-title">Growth</h3>
          <p class="card-body">Practical strategic guidance from peers who have already scaled through your current operational bottleneck.</p>
        </div>
        <div class="card">
          <div style="font-size: 32px; font-weight: 800; color: var(--brand-navy); margin-bottom: 8px;">A</div>
          <h3 class="card-title">Accountability</h3>
          <p class="card-body">Monthly commitments reviewed by fellow business owners who hold you to your highest executive promises.</p>
        </div>
        <div class="card">
          <div style="font-size: 32px; font-weight: 800; color: var(--brand-gold); margin-bottom: 8px;">I</div>
          <h3 class="card-title">Isolation Relief</h3>
          <p class="card-body">A safe, confidential environment to share real financial, organizational, and leadership burdens without judgment.</p>
        </div>
        <div class="card">
          <div style="font-size: 32px; font-weight: 800; color: var(--brand-navy); margin-bottom: 8px;">N</div>
          <h3 class="card-title">Networking</h3>
          <p class="card-body">Direct, high-trust commercial introductions that generate verified clients, partners, and supplier agreements.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Tier Comparison -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-blue" style="margin-bottom: 12px;">Comparison</span>
        <h2 class="section-title">Select Your Membership Level</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Review the three core paths designed to support emerging professionals, growing agencies, and established enterprise founders.
        </p>
      </div>

      <div class="grid-3">
        <!-- Tier 1: Affiliate -->
        <div class="card">
          <span class="badge" style="width: fit-content; margin-bottom: 12px;">Professional Tier</span>
          <h3 style="font-size: 24px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">Affiliate</h3>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">$550 <span style="font-size: 15px; font-weight: 400; color: var(--text-muted);">/ year</span></div>
          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">Ideal for solo practitioners and junior entrepreneurs.</p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 14px; margin-bottom: 24px; flex-grow: 1;">
            <li>&#10003; Verified Public Directory Listing</li>
            <li>&#10003; Invitations to Regional Dinner Mixers</li>
            <li>&#10003; Access to Global Virtual Mixers</li>
            <li>&#10003; Executive Book Summaries Access</li>
            <li>&#10003; Member Platform Profile</li>
          </ul>
          <a href="/affiliate" class="btn btn-secondary" style="width: 100%;">View Affiliate Program</a>
        </div>

        <!-- Tier 2: Connect -->
        <div class="card">
          <span class="badge badge-blue" style="width: fit-content; margin-bottom: 12px;">B2B Networking</span>
          <h3 style="font-size: 24px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">AMCOB Connect</h3>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">$850 <span style="font-size: 15px; font-weight: 400; color: var(--text-muted);">/ year</span></div>
          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">For companies focused on active B2B client acquisition.</p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 14px; margin-bottom: 24px; flex-grow: 1;">
            <li>&#10003; All Affiliate Tier Benefits</li>
            <li>&#10003; Bi-Weekly B2B Referral Meetings</li>
            <li>&#10003; Structured Client Introduction Exchange</li>
            <li>&#10003; Preferred Directory Spotlight</li>
            <li>&#10003; Direct Messaging in Member Portal</li>
          </ul>
          <a href="/connect" class="btn btn-secondary" style="width: 100%;">View Connect Program</a>
        </div>

        <!-- Tier 3: Peer Advisory Groups -->
        <div class="card" style="border: 2px solid var(--brand-navy);">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 12px;">Executive Flagship</span>
          <h3 style="font-size: 24px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">Peer Advisory Groups</h3>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">$1,925 - $5,500 <span style="font-size: 15px; font-weight: 400; color: var(--text-muted);">/ yr</span></div>
          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">Matched strictly by verified revenue stage ($100k to $3M+).</p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 14px; margin-bottom: 24px; flex-grow: 1;">
            <li>&#10003; Monthly 3-Hour Closed-Door Board Sessions</li>
            <li>&#10003; Matched with 8 to 12 Revenue-Stage Peers</li>
            <li>&#10003; Certified Professional Executive Facilitation</li>
            <li>&#10003; Strict Peer Confidentiality</li>
            <li>&#10003; All Connect &amp; Affiliate Privileges</li>
          </ul>
          <a href="/peer-advisory" class="btn btn-primary" style="width: 100%;">Explore PAG Cohorts</a>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('membership.html', renderLayout({
  title: 'Membership Structure & Programs',
  description: 'Compare AMCOB membership tiers including Peer Advisory Groups, AMCOB Connect, and Affiliate membership.',
  activeNav: 'membership',
  breadcrumbs: [{ label: 'Membership', url: '/membership' }],
  content: membershipContent
}));
console.log('Generated membership.html');

// 2. Peer Advisory Groups (peer-advisory.html)
const pagContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Executive Advisory Boards</span>
      <h1 class="page-title">Peer Advisory Groups (PAG)</h1>
      <p class="page-subtitle">
        Your confidential, non-competing board of directors. Matched strictly by verified revenue stage, guided by professional facilitators, and bound by strict confidentiality.
      </p>
    </div>
  </section>

  <!-- How It Works -->
  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;">
        <div>
          <h2 class="section-title">A Private Board of Directors for Founders</h2>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Most founders cannot share their deepest operational, financial, or governance anxieties with their staff, investors, or family. Peer Advisory Groups solve executive isolation by assembling a curated table of 8 to 12 seasoned Muslim entrepreneurs who understand your scale.
          </p>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Every group meets once each month for three focused hours. Sessions follow a structured agenda: personal check-ins, executive accountability scorecards, and deep-dive challenge processing for two members per meeting.
          </p>
          <p style="font-size: 16px; color: var(--text-body); line-height: 1.65;">
            Competitors are strictly excluded. All proceedings operate under strict non-disclosure commitments.
          </p>
        </div>

        <div style="background-color: var(--bg-subtle); padding: 36px; border: 1px solid var(--border-light); border-radius: 12px;">
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">The 5 Key Governance Rules</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 14.5px; color: var(--text-body);">
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">01</span>
              <span><strong>Revenue Verification:</strong> Members must verify tax or financial statements to ensure true stage peer matching.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">02</span>
              <span><strong>Zero Competitors:</strong> No direct competitors are ever placed in the same cohort.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">03</span>
              <span><strong>Confidentiality Commitment:</strong> Complete confidentiality is required from every participant.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">04</span>
              <span><strong>Attendance Commitment:</strong> Minimum 80% annual meeting attendance is strictly enforced.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">05</span>
              <span><strong>Experience Sharing:</strong> Advice is offered through personal case experience rather than theoretical opinion.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- The 5 Revenue Cohorts -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-gold" style="margin-bottom: 12px;">Verified Placement</span>
        <h2 class="section-title">The Five PAG Revenue Cohorts</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Click any cohort below to view complete eligibility standards, meeting formats, and fee details.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 900px; margin: 0 auto;">
        <!-- Cohort 1: Emerging -->
        <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 24px 32px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="badge badge-blue" style="margin-bottom: 6px;">$100,000 to $500,000 Revenue</span>
            <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy);">Emerging Cohort</h3>
            <p style="font-size: 14px; color: var(--text-muted); margin-top: 4px;">Transitioning from founder hustle to repeatable systems and early hiring.</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: 750; color: var(--brand-navy);">$1,925 <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">/ year</span></div>
            <a href="/pag/emerging" class="btn btn-outline btn-sm" style="margin-top: 8px;">View Emerging Cohort &rarr;</a>
          </div>
        </div>

        <!-- Cohort 2: Scaling -->
        <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 24px 32px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="badge badge-blue" style="margin-bottom: 6px;">$500,000 to $1,000,000 Revenue</span>
            <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy);">Scaling Cohort</h3>
            <p style="font-size: 14px; color: var(--text-muted); margin-top: 4px;">Breaking through seven figures with management infrastructure and cash flow modeling.</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: 750; color: var(--brand-navy);">$2,475 <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">/ year</span></div>
            <a href="/pag/scaling" class="btn btn-outline btn-sm" style="margin-top: 8px;">View Scaling Cohort &rarr;</a>
          </div>
        </div>

        <!-- Cohort 3: Booming -->
        <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 24px 32px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="badge badge-gold" style="margin-bottom: 6px;">$1,000,000 to $3,000,000 Revenue</span>
            <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy);">Booming Cohort</h3>
            <p style="font-size: 14px; color: var(--text-muted); margin-top: 4px;">Optimizing margins, executive compensation, M&amp;A readiness, and multi-market expansion.</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: 750; color: var(--brand-navy);">$3,025 <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">/ year</span></div>
            <a href="/pag/booming" class="btn btn-outline btn-sm" style="margin-top: 8px;">View Booming Cohort &rarr;</a>
          </div>
        </div>

        <!-- Cohort 4: Powerhouse -->
        <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 24px 32px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="badge badge-gold" style="margin-bottom: 6px;">$3,000,000+ Revenue</span>
            <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy);">Powerhouse Cohort</h3>
            <p style="font-size: 14px; color: var(--text-muted); margin-top: 4px;">Large-scale commercial operations, board dynamics, private equity, and institutional governance.</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: 750; color: var(--brand-navy);">$5,500 <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">/ year</span></div>
            <a href="/pag/powerhouse" class="btn btn-outline btn-sm" style="margin-top: 8px;">View Powerhouse Cohort &rarr;</a>
          </div>
        </div>

        <!-- Cohort 5: Summit -->
        <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 24px 32px; flex-wrap: wrap; gap: 16px; background-color: #ffffff; border-color: var(--brand-gold);">
          <div>
            <span class="badge badge-emerald" style="margin-bottom: 6px;">By Invitation Only</span>
            <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy);">Summit Cohort</h3>
            <p style="font-size: 14px; color: var(--text-muted); margin-top: 4px;">Exclusive national executive council and annual closed-door retreat for enterprise leaders.</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: 700; color: var(--brand-gold);">Invitation Only</div>
            <a href="/pag/summit" class="btn btn-outline btn-sm" style="margin-top: 8px;">View Summit Cohort &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('peer-advisory.html', renderLayout({
  title: 'Peer Advisory Groups (PAG) | Confidential Founder Boards',
  description: 'Discover AMCOB Peer Advisory Groups: monthly closed-door board meetings for Muslim business owners matched by revenue.',
  activeNav: 'membership',
  breadcrumbs: [{ label: 'Membership', url: '/membership' }, { label: 'Peer Advisory Groups', url: '/peer-advisory' }],
  content: pagContent
}));
console.log('Generated peer-advisory.html');

// Helper to create dedicated cohort pages
function generateCohortPage({ slug, name, range, price, focus, curriculum }) {
  const content = `
    <section class="page-intro">
      <div class="container">
        <span class="page-intro-badge">Peer Advisory Group</span>
        <h1 class="page-title">${name}</h1>
        <p class="page-subtitle">
          Designed specifically for Muslim entrepreneurs operating businesses with ${range}.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px;">
          <div>
            <h2 class="section-title">Cohort Focus and Strategic Mandate</h2>
            <p style="font-size: 16px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
              ${focus}
            </p>

            <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">Core Meeting Themes</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 15px; color: var(--text-body); margin-bottom: 32px;">
              ${curriculum.map(item => `
                <li style="display: flex; gap: 10px; align-items: flex-start;">
                  <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>

            <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">Eligibility Requirements</h3>
            <div style="background-color: var(--bg-subtle); padding: 24px; border: 1px solid var(--border-light); border-radius: 8px;">
              <p style="font-size: 14.5px; color: var(--text-body); margin-bottom: 8px;">
                <strong>Revenue Verification:</strong> Must demonstrate verified commercial revenue matching ${range}.
              </p>
              <p style="font-size: 14.5px; color: var(--text-body); margin-bottom: 8px;">
                <strong>Governance Role:</strong> Founder, CEO, Managing Partner, or Principal Owner with equity decision-making authority.
              </p>
              <p style="font-size: 14.5px; color: var(--text-body); margin-bottom: 0;">
                <strong>Commitment:</strong> Dedication of 3 hours per month for cohort board sessions and 80% annual attendance.
              </p>
            </div>
          </div>

          <div>
            <div style="background-color: #ffffff; border: 2px solid var(--brand-navy); border-radius: 12px; padding: 32px; box-shadow: var(--shadow-md);">
              <span class="badge badge-gold" style="margin-bottom: 12px;">Cohort Membership</span>
              <h3 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">${name}</h3>
              <div style="font-size: 36px; font-weight: 800; color: var(--brand-navy); margin-bottom: 6px;">${price}</div>
              <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 24px;">Billed annually upon application approval and verification.</p>

              <a href="/join" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 14px;">Apply for Placement</a>
              <a href="/peer-advisory" class="btn btn-outline btn-sm" style="width: 100%;">Compare All Cohorts</a>

              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-light); font-size: 13px; color: var(--text-muted);">
                Includes all AMCOB Connect B2B networking privileges, verified business directory listing, and regional mixer access.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  fs.writeFileSync(`pag/${slug}.html`, renderLayout({
    title: `${name} | Peer Advisory Groups`,
    description: `Eligibility, meeting structure, and application details for the AMCOB ${name} (${range}).`,
    activeNav: 'membership',
    breadcrumbs: [
      { label: 'Membership', url: '/membership' },
      { label: 'Peer Advisory Groups', url: '/peer-advisory' },
      { label: name, url: `/pag/${slug}` }
    ],
    content
  }));
  console.log(`Generated pag/${slug}.html`);
}

// Generate the 5 Cohorts
generateCohortPage({
  slug: 'emerging',
  name: 'Emerging Cohort',
  range: '$100,000 to $500,000 Annual Revenue',
  price: '$1,925 / year',
  focus: 'The Emerging Cohort helps founders break free from daily execution so they can build predictable sales funnels, hire their first operational managers, and stabilize working capital.',
  curriculum: [
    'Transitioning from founder-led sales to repeatable acquisition channels',
    'Financial budgeting, cash reserve discipline, and tax optimization',
    'Hiring and delegating to first key operational team members',
    'Pricing models, margin analysis, and customer contract structure'
  ]
});

generateCohortPage({
  slug: 'scaling',
  name: 'Scaling Cohort',
  range: '$500,000 to $1,000,000 Annual Revenue',
  price: '$2,475 / year',
  focus: 'The Scaling Cohort is tailored for established founders approaching the critical seven-figure revenue threshold, addressing middle-management leadership, gross margin erosion, and operational bottlenecks.',
  curriculum: [
    'Crossing the $1M revenue threshold with healthy net margins',
    'Departmental accountability and organizational charts',
    'Debt financing, Islamic line-of-credit facilities, and banking relationships',
    'Standard operating procedures (SOPs) and operational redundancy'
  ]
});

generateCohortPage({
  slug: 'booming',
  name: 'Booming Cohort',
  range: '$1,000,000 to $3,000,000 Annual Revenue',
  price: '$3,025 / year',
  focus: 'The Booming Cohort serves mature seven-figure businesses, focusing on leadership team empowerment, multi-state expansion, enterprise B2B contracts, and strategic asset protection.',
  curriculum: [
    'Empowering executive directors, general managers, and VP-level leaders',
    'Enterprise customer retention and complex contract negotiation',
    'Risk management, commercial insurance, and asset protection frameworks',
    'Preparation for corporate acquisitions and strategic joint ventures'
  ]
});

generateCohortPage({
  slug: 'powerhouse',
  name: 'Powerhouse Cohort',
  range: '$3,000,000+ Annual Revenue',
  price: '$5,500 / year',
  focus: 'The Powerhouse Cohort unites owners of significant commercial enterprises, dealing with corporate governance, private equity inquiries, executive equity plans, and intergenerational succession.',
  curriculum: [
    'Formal corporate boards of directors and governance structures',
    'Private equity, institutional buyout offers, and capitalization tables',
    'Executive equity incentives, profit-sharing trusts, and retention plans',
    'Family succession, estate planning, and institutional endowment strategies'
  ]
});

generateCohortPage({
  slug: 'summit',
  name: 'Summit Cohort',
  range: 'Enterprise Leaders by Invitation',
  price: 'Invitation Only',
  focus: 'The Summit Cohort is AMCOB\'s highest advisory circle, uniting the most prominent Muslim business leaders in North America for private economic deliberations and closed-door leadership summits.',
  curriculum: [
    'Macroeconomic positioning and North American commercial policy',
    'Bilateral cross-border trade delegations and international chambers',
    'Sovereign capital aggregation and large-scale joint investment funds',
    'Institutional philanthropy and community endowment stewardship'
  ]
});

// 3. AMCOB Connect (connect.html)
const connectContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Commercial Referral Engine</span>
      <h1 class="page-title">AMCOB Connect</h1>
      <p class="page-subtitle">
        Structured commercial introductions and high-trust B2B client referrals across North America for verified service providers and operating businesses.
      </p>
    </div>
  </section>

  <!-- Connect Metrics Banner -->
  <section style="background-color: var(--bg-subtle); padding: 36px 0; border-bottom: 1px solid var(--border-light);">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center;">
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">$850</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Annual Chamber Dues</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">Bi-Weekly</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Meeting Frequency</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">1 Seat</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Per Commercial Specialty</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">75 Min</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Structured Agenda</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How Connect Operates -->
  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: flex-start;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 12px;">Relationship Architecture</span>
          <h2 class="section-title">Turning High-Trust Relationships into Closed Contracts</h2>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Most traditional business mixers result in scattered business cards and zero commercial outcomes. AMCOB Connect was engineered specifically to replace unstructured mingling with disciplined, professional referral exchange.
          </p>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Every two weeks, members convene for a structured 75-minute virtual or in-person session facilitated by an appointed chamber director. Every participant presents their precise ideal customer profile, announces recent procurement needs, and receives warm, double opt-in introductions to verified corporate decision-makers.
          </p>
          <p style="font-size: 16px; color: var(--text-body); line-height: 1.65;">
            Because all members are vetted for ethical commercial conduct and verifiable operating history, referrals are made with high confidence.
          </p>
        </div>

        <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 32px; box-shadow: var(--shadow-sm);">
          <span class="badge badge-blue" style="margin-bottom: 12px;">The 75-Minute Session</span>
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">Standard Meeting Agenda</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 14px; color: var(--text-body);">
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-gold); font-weight: bold; width: 55px; flex-shrink: 0;">15 Min</span>
              <span><strong>Welcome &amp; Economic Briefing:</strong> Facilitator opening, chamber updates, and featured member commercial win announcements.</span>
            </li>
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-gold); font-weight: bold; width: 55px; flex-shrink: 0;">30 Min</span>
              <span><strong>60-Second Commercial Round:</strong> Each member articulates their specialty, current target accounts, and specific ideal referral introduction.</span>
            </li>
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-gold); font-weight: bold; width: 55px; flex-shrink: 0;">20 Min</span>
              <span><strong>One-on-One Breakout Rotations:</strong> Curated paired discussions to evaluate client fit, exchange proposal insights, and vet opportunities.</span>
            </li>
            <li style="display: flex; gap: 12px;">
              <span style="color: var(--brand-gold); font-weight: bold; width: 55px; flex-shrink: 0;">10 Min</span>
              <span><strong>Referral Logging &amp; Next Steps:</strong> Formal recording of warm introductions into the chamber tracking database.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Category Exclusivity Policy -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 40px auto;">
        <span class="badge badge-emerald" style="margin-bottom: 10px;">Seat Protection</span>
        <h2 class="section-title">Strict Category Exclusivity</h2>
        <p class="section-desc" style="margin: 0 auto;">
          To eliminate internal competition and maximize referral volume, only one business per specialty is permitted per Connect cohort table.
        </p>
      </div>

      <div class="grid-3">
        <div class="card" style="padding: 28px;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">Professional Advisory</h4>
          <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.55; margin-bottom: 12px;">
            One seat available per cohort for Corporate Tax CPA, Commercial Real Estate Attorney, Intellectual Property Counsel, and Wealth Manager.
          </p>
          <span style="font-size: 12px; font-weight: 600; color: var(--brand-emerald);">High Demand Category</span>
        </div>

        <div class="card" style="padding: 28px;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">Enterprise Technology</h4>
          <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.55; margin-bottom: 12px;">
            One seat available for Custom Software Development, Cybersecurity &amp; Compliance, Cloud Infrastructure, and IT Managed Services.
          </p>
          <span style="font-size: 12px; font-weight: 600; color: var(--brand-emerald);">Active Procurement</span>
        </div>

        <div class="card" style="padding: 28px;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">Commercial Services</h4>
          <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.55; margin-bottom: 12px;">
            One seat available for Commercial General Contractor, Freight &amp; Logistics Broker, Medical Billing Administrator, and Executive Recruiter.
          </p>
          <span style="font-size: 12px; font-weight: 600; color: var(--brand-emerald);">Regional Exchange</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Membership Pricing & Application -->
  <section class="section">
    <div class="container" style="max-width: 820px;">
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 40px; box-shadow: var(--shadow-sm); text-align: center;">
        <span class="badge badge-blue" style="margin-bottom: 12px;">Annual Membership</span>
        <h2 class="section-title">Join AMCOB Connect for $850 per Year</h2>
        <p style="font-size: 16px; color: var(--text-body); max-width: 640px; margin: 0 auto 24px auto; line-height: 1.6;">
          Your annual dues grant full participation in 24 bi-weekly referral sessions, a verified priority listing in the public AMCOB Business Directory, and invitations to regional chapter dinner mixers.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="/join" class="btn btn-primary btn-lg">Apply for Category Seat</a>
          <a href="/contact-us" class="btn btn-secondary btn-lg">Check Category Availability</a>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('connect.html', renderLayout({
  title: 'AMCOB Connect | Commercial Referral & Lead Generation Network',
  description: 'Join AMCOB Connect: bi-weekly business networking delivering verified client introductions and exclusive category seats for $850 per year.',
  activeNav: 'membership',
  breadcrumbs: [{ label: 'Membership', url: '/membership' }, { label: 'AMCOB Connect', url: '/connect' }],
  content: connectContent
}));
console.log('Generated connect.html');

// 4. Affiliate Membership (affiliate.html)
const affiliateContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Individual Membership</span>
      <h1 class="page-title">Affiliate Membership</h1>
      <p class="page-subtitle">
        An accessible entry point for solo practitioners, specialized consultants, and early-stage entrepreneurs.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px;">
        <div>
          <h2 class="section-title">Connect with North America's Muslim Business Community</h2>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 20px; line-height: 1.65;">
            The Affiliate Membership is designed for professionals and emerging business founders who want to establish credibility, gain directory visibility, and connect with established entrepreneurs through AMCOB mixers and educational resources.
          </p>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
            Whether you are a certified public accountant, legal advisor, software engineer, or early-stage founder, Affiliate membership gives you verified standing in the chamber ecosystem.
          </p>

          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">Affiliate Member Benefits</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 15px; color: var(--text-body);">
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Verified Directory Listing:</strong> Professional profile in the AMCOB public directory searchable by location and category.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Dinner Mixer Invitations:</strong> Member registration rates for regional chapter gatherings across North America.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Executive Library Access:</strong> Complete access to our repository of 64 business book summaries and frameworks.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Member Platform Login:</strong> Direct access to the AMCOB community portal and event calendar.</span>
            </li>
          </ul>
        </div>

        <div>
          <div style="background-color: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 32px;">
            <span class="badge" style="margin-bottom: 12px;">Annual Dues</span>
            <h3 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">Affiliate Tier</h3>
            <div style="font-size: 36px; font-weight: 800; color: var(--brand-navy); margin-bottom: 8px;">$550 <span style="font-size: 15px; font-weight: normal; color: var(--text-muted);">/ year</span></div>
            <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 24px;">Simple annual enrollment with immediate directory and event privileges.</p>

            <a href="/join" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 12px;">Join as Affiliate</a>
            <p style="font-size: 12.5px; color: var(--text-muted); text-align: center; margin: 0;">Instant onboarding through our secure registration system.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('affiliate.html', renderLayout({
  title: 'Affiliate Membership | Emerging Founders & Professionals',
  description: 'Join AMCOB as an Affiliate Member for $550/year. Verified directory listing, mixer access, and executive library resources.',
  activeNav: 'membership',
  breadcrumbs: [{ label: 'Membership', url: '/membership' }, { label: 'Affiliate', url: '/affiliate' }],
  content: affiliateContent
}));
console.log('Generated affiliate.html');

// 5. Virtual Accelerator (virtual-accelerator-program.html)
const acceleratorContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Venture Acceleration</span>
      <h1 class="page-title">AMCOB Virtual Accelerator Program</h1>
      <p class="page-subtitle">
        A 12-week intensive accelerator equipping early-stage Muslim-founded ventures with product-market fit, enterprise sales systems, and investor readiness.
      </p>
    </div>
  </section>

  <!-- Program Key Facts -->
  <section style="background-color: var(--bg-subtle); padding: 36px 0; border-bottom: 1px solid var(--border-light);">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center;">
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">12 Weeks</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Cohort Duration</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">0% Equity</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Zero Dilution Required</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">15 Founders</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Maximum Cohort Size</div>
        </div>
        <div>
          <div style="font-size: 32px; font-weight: 750; color: var(--brand-navy);">1-on-1</div>
          <div style="font-size: 13.5px; color: var(--text-muted); margin-top: 4px;">Executive Mentorship</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Accelerator Philosophy -->
  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: flex-start;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 12px;">Practical Scaling</span>
          <h2 class="section-title">Bridging Vision and Commercial Traction</h2>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            The AMCOB Virtual Accelerator was created to eliminate the common failure modes of early ventures: chasing vanity metrics, running out of working capital, and struggling with enterprise customer acquisition.
          </p>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Over twelve structured weeks, accepted founders work through rigorous weekly deliverables guided by operators who have built eight-figure corporations. We focus on real commercial mechanics: repeatable sales pipelines, gross margin durability, and investor-grade data rooms.
          </p>
          <p style="font-size: 16px; color: var(--text-body); line-height: 1.65;">
            Unlike conventional incubators that demand substantial equity stakes before delivering value, AMCOB takes 0% equity. The program is fully underwritten by chamber foundation grants and corporate partners.
          </p>
        </div>

        <div style="background-color: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 32px;">
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">Venture Eligibility Criteria</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 14px; color: var(--text-body);">
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">01</span>
              <span><strong>Full-Time Commitment:</strong> At least one founding executive must be dedicated full-time to the commercial venture.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">02</span>
              <span><strong>Product or Beta Traction:</strong> An existing working product, active beta customers, or early verifiable commercial revenue.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">03</span>
              <span><strong>Ethical Alignment:</strong> Products, services, and business models must align with halal business ethics and sound governance.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">04</span>
              <span><strong>Accountability Standard:</strong> Mandatory attendance across all 12 weekly sprint reviews and mentor consultations.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 12-Week Curriculum Breakdown -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-blue" style="margin-bottom: 10px;">Curriculum</span>
        <h2 class="section-title">The 12-Week Sprint Syllabus</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Four progressive three-week phases turning early promise into institutional enterprise execution.
        </p>
      </div>

      <div class="grid-2" style="gap: 32px;">
        <!-- Phase 1 -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-gold" style="margin-bottom: 10px;">Weeks 1 to 3</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Phase 1: Customer Discovery &amp; Unit Economics
          </h3>
          <p style="font-size: 14px; color: var(--text-body); line-height: 1.6; margin-bottom: 16px;">
            Validating ideal buyer personas, auditing pricing models, stress-testing gross margins, and establishing baseline customer acquisition metrics.
          </p>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-muted);">
            <li>&bull; 20 buyer discovery interviews</li>
            <li>&bull; Contribution margin and payback period modeling</li>
            <li>&bull; Competitive landscape and defensibility review</li>
          </ul>
        </div>

        <!-- Phase 2 -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-blue" style="margin-bottom: 10px;">Weeks 4 to 6</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Phase 2: Enterprise Sales &amp; Outbound Funnel
          </h3>
          <p style="font-size: 14px; color: var(--text-body); line-height: 1.6; margin-bottom: 16px;">
            Constructing a repeatable B2B sales motion, drafting enterprise proposal templates, and securing warm customer introductions through the chamber.
          </p>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-muted);">
            <li>&bull; Outbound sales cadence architecture</li>
            <li>&bull; Pilot contract and master services agreement drafting</li>
            <li>&bull; Chamber Connect referral introductions</li>
          </ul>
        </div>

        <!-- Phase 3 -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-emerald" style="margin-bottom: 10px;">Weeks 7 to 9</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Phase 3: Operations, Hiring &amp; Compliance
          </h3>
          <p style="font-size: 14px; color: var(--text-body); line-height: 1.6; margin-bottom: 16px;">
            Implementing core financial controls, cleaning capitalization tables, establishing employee equity plans, and setting up corporate governance boards.
          </p>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-muted);">
            <li>&bull; Monthly close checklist and cash burn runway</li>
            <li>&bull; Key hire scorecards and vesting schedules</li>
            <li>&bull; Advisory board charter establishment</li>
          </ul>
        </div>

        <!-- Phase 4 -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-gold" style="margin-bottom: 10px;">Weeks 10 to 12</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Phase 4: Investor Day &amp; Capital Assembly
          </h3>
          <p style="font-size: 14px; color: var(--text-body); line-height: 1.6; margin-bottom: 16px;">
            Refining investor decks, organizing virtual data rooms, rehearsing executive pitches, and presenting to accredited angel syndicates and family funds.
          </p>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-muted);">
            <li>&bull; Complete diligence data room audit</li>
            <li>&bull; Closed-door investor dress rehearsals</li>
            <li>&bull; Live presentation at AMCOB Virtual Demo Day</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Application Banner -->
  <section class="section">
    <div class="container" style="max-width: 820px; text-align: center;">
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 40px; box-shadow: var(--shadow-sm);">
        <span class="badge badge-emerald" style="margin-bottom: 12px;">Cohort Admissions</span>
        <h2 class="section-title">Apply for the Next Virtual Accelerator Cohort</h2>
        <p style="font-size: 16px; color: var(--text-body); max-width: 640px; margin: 0 auto 24px auto; line-height: 1.6;">
          Cohorts start twice annually in the Spring and Fall. Applications are evaluated on founder capability, commercial traction, and ethical alignment.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="/join" class="btn btn-primary btn-lg">Submit Venture Application</a>
          <a href="/contact-us" class="btn btn-secondary btn-lg">Consult Admissions Team</a>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('virtual-accelerator-program.html', renderLayout({
  title: 'Virtual Accelerator Program | 12-Week Venture Growth',
  description: 'The AMCOB Virtual Accelerator is a 12-week intensive program pairing early-stage Muslim founders with mentors and investor networks with zero equity dilution.',
  activeNav: 'membership',
  breadcrumbs: [{ label: 'Membership', url: '/membership' }, { label: 'Virtual Accelerator', url: '/virtual-accelerator-program' }],
  content: acceleratorContent
}));
console.log('Generated virtual-accelerator-program.html');

// 6. Ambassador Program (ambassador-program.html)
const ambassadorContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Chapter Leadership</span>
      <h1 class="page-title">Regional Chapter Ambassadors</h1>
      <p class="page-subtitle">
        Meet the regional leaders representing the Allied Muslim Chamber of Business across 12 North American metropolitan hubs.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <h2 class="section-title">Local Presence, Continental Impact</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Our chapter ambassadors host quarterly dinner mixers, welcome new members, and build relationships with local civic and commercial bodies.
        </p>
      </div>

      <div class="grid-4">
        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">Dallas / Fort Worth</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">North Texas Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Serving technology, logistics, and real estate enterprises across the DFW Metroplex.</p>
        </div>

        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">Houston</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Southeast Texas Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Convening energy executives, healthcare specialists, and international shipping founders.</p>
        </div>

        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">Silicon Valley / Bay Area</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Northern California Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Uniting software engineers, AI founders, venture capitalists, and biotech operators.</p>
        </div>

        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">New York Metro</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Tri-State Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Serving institutional finance, corporate law, real estate, and media enterprises.</p>
        </div>

        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">Chicago</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Midwest Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Connecting manufacturing, healthcare, commercial retail, and financial service leaders.</p>
        </div>

        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">Toronto Metro</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Canadian National Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Representing business builders across Ontario and cross-border US-Canada commerce.</p>
        </div>

        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">Seattle</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Pacific Northwest Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Connecting cloud computing, aerospace, e-commerce, and logistics founders.</p>
        </div>

        <div class="card" style="text-align: center;">
          <h4 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">Atlanta</h4>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Southeast Chapter</p>
          <p style="font-size: 13px; color: var(--text-muted);">Convening fintech, supply chain logistics, hospitality, and construction entrepreneurs.</p>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('ambassador-program.html', renderLayout({
  title: 'Chapter Ambassadors Network | Regional Leadership',
  description: 'Meet the 12 regional chapter ambassadors leading AMCOB community development and executive mixers across North America.',
  activeNav: 'membership',
  breadcrumbs: [{ label: 'Membership', url: '/membership' }, { label: 'Ambassadors', url: '/ambassador-program' }],
  content: ambassadorContent
}));
console.log('Generated ambassador-program.html');

// 7. Muslim Life Design Lab (mldl.html)
const mldlContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Special Initiative</span>
      <h1 class="page-title">Muslim Life Design Lab (MLDL)</h1>
      <p class="page-subtitle">
        Aligning commercial ambition with faith, family, holistic health, and spiritual purpose.
      </p>
    </div>
  </section>

  <!-- MLDL Introduction -->
  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 12px;">Holistic Enterprise</span>
          <h2 class="section-title">Beyond Profit: Holistic Enterprise Stewardship</h2>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            The Muslim Life Design Lab is an internal research, development, and executive retreat initiative at AMCOB. We study and teach how founders can scale high-growth enterprises while maintaining uncompromising spiritual integrity, vibrant family harmony, and physical vitality.
          </p>
          <p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.65;">
            Many founders build eight-figure enterprises only to discover they have depleted their health, alienated their families, and neglected their faith. MLDL provides practical frameworks, executive retreats, and peer accountability circles to prevent founder burnout and create enduring barakah.
          </p>
          <p style="font-size: 16px; color: var(--text-body); line-height: 1.65;">
            Sessions are led by experienced entrepreneurs, clinical health advisors, and spiritual teachers who understand the immense pressure of enterprise leadership.
          </p>
        </div>

        <div style="background-color: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 32px;">
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 16px;">The Four MLDL Stewardship Pillars</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 14px; color: var(--text-body);">
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">01</span>
              <span><strong>Barakah in Enterprise:</strong> Designing ethical commercial practices, uncompromised contracts, and employee dignity.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">02</span>
              <span><strong>Family Equilibrium:</strong> Intentional calendar protection, deep marital presence, and raising resilient children.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">03</span>
              <span><strong>Physical Longevity:</strong> Stress mitigation routines, recovery discipline, clean nutrition, and cognitive endurance.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-gold); font-weight: bold;">04</span>
              <span><strong>Generational Waqf:</strong> Designing charitable endowments, community institutions, and righteous family succession.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Retreats & Masterclasses -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 40px auto;">
        <span class="badge badge-emerald" style="margin-bottom: 10px;">Retreat Series</span>
        <h2 class="section-title">Executive Retreats &amp; Quarterly Clinics</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Intimate, closed-door gatherings held in peaceful natural environments away from daily operational turbulence.
        </p>
      </div>

      <div class="grid-3">
        <div class="card" style="padding: 28px;">
          <span class="badge badge-gold" style="margin-bottom: 10px;">Annual Retreat</span>
          <h4 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">The Founder Solitude Retreat</h4>
          <p style="font-size: 13.5px; color: var(--text-body); line-height: 1.55; margin-bottom: 14px;">
            A three-day silent reflection and strategic planning retreat for founders scaling past $2M, focusing on personal vision and spiritual renewal.
          </p>
          <span style="font-size: 12.5px; color: var(--text-muted);">Hosted annually in Southern California</span>
        </div>

        <div class="card" style="padding: 28px;">
          <span class="badge badge-blue" style="margin-bottom: 10px;">Family Governance</span>
          <h4 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">The Entrepreneur Family Clinic</h4>
          <p style="font-size: 13.5px; color: var(--text-body); line-height: 1.55; margin-bottom: 14px;">
            Specialized couples workshop designed to align spouses on enterprise risks, wealth stewardship, and setting healthy home boundaries.
          </p>
          <span style="font-size: 12.5px; color: var(--text-muted);">Quarterly virtual session</span>
        </div>

        <div class="card" style="padding: 28px;">
          <span class="badge badge-emerald" style="margin-bottom: 10px;">Executive Health</span>
          <h4 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">Founder Health &amp; Biomarkers</h4>
          <p style="font-size: 13.5px; color: var(--text-body); line-height: 1.55; margin-bottom: 14px;">
            Comprehensive clinical clinic led by functional medicine physicians covering cortisol management, cardiovascular health, and sleep architecture.
          </p>
          <span style="font-size: 12.5px; color: var(--text-muted);">Bi-annual executive clinic</span>
        </div>
      </div>
    </div>
  </section>

  <!-- MLDL Contact Form -->
  <section class="section">
    <div class="container" style="max-width: 820px; text-align: center;">
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 40px; box-shadow: var(--shadow-sm);">
        <span class="badge badge-gold" style="margin-bottom: 12px;">Participate in MLDL</span>
        <h2 class="section-title">Join an Upcoming MLDL Clinic</h2>
        <p style="font-size: 16px; color: var(--text-body); max-width: 640px; margin: 0 auto 24px auto; line-height: 1.6;">
          MLDL clinics are available to active AMCOB members and invited guests. Reach out to our program director to receive upcoming retreat dates and curriculum materials.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="/contact-us" class="btn btn-primary btn-md">Inquire About MLDL Retreats</a>
          <a href="/membership" class="btn btn-secondary btn-md">Explore Chamber Membership</a>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('mldl.html', renderLayout({
  title: 'Muslim Life Design Lab (MLDL) | Faith & Enterprise Alignment',
  description: 'The AMCOB Muslim Life Design Lab initiative helps founders integrate spiritual values, family life, physical health, and high-performance business scaling.',
  activeNav: 'membership',
  breadcrumbs: [{ label: 'Membership', url: '/membership' }, { label: 'MLDL', url: '/mldl' }],
  content: mldlContent
}));
console.log('Generated mldl.html');
