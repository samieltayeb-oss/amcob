const fs = require('fs');
const { renderLayout, events, esc } = require('./site-layout');

// 1. Master Events Hub (events.html)
const eventsContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Gatherings &amp; Mixers</span>
      <h1 class="page-title">AMCOB Events Calendar</h1>
      <p class="page-subtitle">
        Curated regional dinner mixers, virtual commercial roundtables, and annual executive convenings across North America.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <!-- Event Category Quick Links -->
      <div style="display: flex; gap: 12px; margin-bottom: 36px; flex-wrap: wrap;">
        <a href="/events" class="filter-pill active">All Gatherings (${events.length})</a>
        <a href="/dinner-mixers" class="filter-pill">In-Person Dinner Mixers</a>
        <a href="/virtual-mixers" class="filter-pill">Virtual Global Mixers</a>
        <a href="/upcoming-peer-advisory-meetings" class="filter-pill">Peer Advisory Schedule</a>
        <a href="/conferences-workshops" class="filter-pill">Conferences &amp; Summits</a>
      </div>

      <!-- Events Grid -->
      <div class="grid-3">
        ${events.slice(0, 18).map(e => `
          <div class="card">
            ${e.localImage ? `
              <div class="card-media">
                <img src="${e.localImage}" alt="${esc(e.title)}" loading="lazy">
              </div>
            ` : ''}
            <span class="badge ${e.type === 'Dinner Mixer' ? 'badge-gold' : 'badge-blue'}" style="width: fit-content; margin-bottom: 10px;">${esc(e.type)}</span>
            <h3 class="card-title">${esc(e.title)}</h3>
            <p class="card-meta">${esc(e.date)} | ${esc(e.location)}</p>
            <p class="card-body">High-signal networking connecting verified entrepreneurs, executives, and commercial operators.</p>
            <div class="card-footer">
              <span style="font-size: 13px; color: var(--text-muted);">${esc(e.category)}</span>
              ${e.lumaUrl ? `
                <a href="${e.lumaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">RSVP on Luma</a>
              ` : `
                <a href="/contact-us" class="btn btn-outline btn-sm">Inquire</a>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      ${events.length > 18 ? `
        <div style="margin-top: 48px; text-align: center;">
          <p style="font-size: 14.5px; color: var(--text-muted); margin-bottom: 16px;">Displaying 18 of ${events.length} regional and virtual events.</p>
          <a href="/dinner-mixers" class="btn btn-secondary">Browse All Regional Dinner Mixers &rarr;</a>
        </div>
      ` : ''}
    </div>
  </section>
`;

fs.writeFileSync('events.html', renderLayout({
  title: 'Events Calendar | Regional Mixers & Summits',
  description: 'Explore upcoming AMCOB executive gatherings, regional dinner mixers in Dallas, Houston, and Silicon Valley, and virtual business mixers.',
  activeNav: 'events',
  breadcrumbs: [{ label: 'Events', url: '/events' }],
  content: eventsContent
}));
console.log('Generated events.html');

// 2. Dinner Mixers (dinner-mixers.html)
const dinnerEvents = events.filter(e => e.type === 'Dinner Mixer');
const dinnerContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">In-Person Convenings</span>
      <h1 class="page-title">Regional Dinner Mixers</h1>
      <p class="page-subtitle">
        Curated private dinners hosted across 12 metropolitan chapters uniting Muslim founders and C-suite executives in an intimate, high-trust setting.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div style="display: flex; gap: 12px; margin-bottom: 36px; flex-wrap: wrap;">
        <a href="/events" class="filter-pill">All Events</a>
        <a href="/dinner-mixers" class="filter-pill active">Dinner Mixers (${dinnerEvents.length})</a>
        <a href="/virtual-mixers" class="filter-pill">Virtual Mixers</a>
      </div>

      <div class="grid-3">
        ${dinnerEvents.map(e => `
          <div class="card">
            ${e.localImage ? `
              <div class="card-media">
                <img src="${e.localImage}" alt="${esc(e.title)}" loading="lazy">
              </div>
            ` : ''}
            <span class="badge badge-gold" style="width: fit-content; margin-bottom: 10px;">Regional Dinner</span>
            <h3 class="card-title">${esc(e.title)}</h3>
            <p class="card-meta">${esc(e.date)} | ${esc(e.location)}</p>
            <p class="card-body">Private dinner gathering facilitating meaningful commercial introductions and peer relationships.</p>
            <div class="card-footer">
              <span style="font-size: 13px; color: var(--text-muted);">${esc(e.location.split(',')[0] || 'Chapter')}</span>
              ${e.lumaUrl ? `
                <a href="${e.lumaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">RSVP on Luma</a>
              ` : `
                <a href="/contact-us" class="btn btn-outline btn-sm">Inquire</a>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

fs.writeFileSync('dinner-mixers.html', renderLayout({
  title: 'Regional Dinner Mixers | In-Person Chapter Convenings',
  description: 'Join AMCOB private dinner mixers in Dallas, Houston, Silicon Valley, New York, Chicago, and major North American metropolitan centers.',
  activeNav: 'events',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'Dinner Mixers', url: '/dinner-mixers' }],
  content: dinnerContent
}));
console.log('Generated dinner-mixers.html');

// 3. Virtual Mixers (virtual-mixers.html)
const virtualEvents = events.filter(e => e.type === 'Virtual Mixer');
const virtualContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Online Networking</span>
      <h1 class="page-title">Global Virtual Mixers</h1>
      <p class="page-subtitle">
        Bi-weekly interactive video sessions connecting Muslim entrepreneurs, operators, and professionals across the globe.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div style="display: flex; gap: 12px; margin-bottom: 36px; flex-wrap: wrap;">
        <a href="/events" class="filter-pill">All Events</a>
        <a href="/dinner-mixers" class="filter-pill">Dinner Mixers</a>
        <a href="/virtual-mixers" class="filter-pill active">Virtual Mixers (${virtualEvents.length})</a>
      </div>

      <div class="grid-3">
        ${virtualEvents.map(e => `
          <div class="card">
            ${e.localImage ? `
              <div class="card-media">
                <img src="${e.localImage}" alt="${esc(e.title)}" loading="lazy">
              </div>
            ` : ''}
            <span class="badge badge-blue" style="width: fit-content; margin-bottom: 10px;">Virtual Session</span>
            <h3 class="card-title">${esc(e.title)}</h3>
            <p class="card-meta">Bi-Weekly Global Session | Online via Zoom / Luma</p>
            <p class="card-body">Structured 60-minute networking with breakout rooms focused on specific commercial sectors and partnerships.</p>
            <div class="card-footer">
              <span style="font-size: 13px; color: var(--brand-emerald); font-weight: 550;">Open Registration</span>
              ${e.lumaUrl ? `
                <a href="${e.lumaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Register on Luma</a>
              ` : `
                <a href="/contact-us" class="btn btn-outline btn-sm">Register</a>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

fs.writeFileSync('virtual-mixers.html', renderLayout({
  title: 'Global Virtual Mixers | Bi-Weekly Online Networking',
  description: 'Participate in AMCOB bi-weekly virtual mixers connecting founders and business leaders across North America and international hubs.',
  activeNav: 'events',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'Virtual Mixers', url: '/virtual-mixers' }],
  content: virtualContent
}));
console.log('Generated virtual-mixers.html');

// 4. Upcoming Peer Advisory Meetings (upcoming-peer-advisory-meetings.html)
const pagScheduleContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Cohort Schedules</span>
      <h1 class="page-title">Upcoming Peer Advisory Meetings</h1>
      <p class="page-subtitle">
        Closed-door cohort dates, briefing sessions, and executive retreats for enrolled PAG members.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 860px;">
      <h2 class="section-title">Cohort Meeting Protocol</h2>
      <p style="font-size: 16px; color: var(--text-body); margin-bottom: 28px; line-height: 1.65;">
        Peer Advisory Groups convene once monthly for three hours. Cohorts are facilitated by certified executive chairs. Members receive calendar invites with private secure meeting links and preliminary agenda packets 5 days prior to each session.
      </p>

      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div class="card" style="padding: 24px;">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 8px;">Emerging Cohort ($100k-$500k)</span>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">Monthly Advisory Board | First Thursday</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px;">Next Session: Thursday, 10:00 AM to 1:00 PM Central Time</p>
          <p style="font-size: 14px; color: var(--text-body); margin: 0;">Agenda: Operational hiring metrics, cash reserves, and customer lifetime value review.</p>
        </div>

        <div class="card" style="padding: 24px;">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 8px;">Scaling Cohort ($500k-$1M)</span>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">Monthly Advisory Board | Second Tuesday</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px;">Next Session: Tuesday, 1:00 PM to 4:00 PM Eastern Time</p>
          <p style="font-size: 14px; color: var(--text-body); margin: 0;">Agenda: Crossing seven figures, gross margin optimization, and bank credit facilities.</p>
        </div>

        <div class="card" style="padding: 24px;">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 8px;">Booming Cohort ($1M-$3M)</span>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">Monthly Advisory Board | Third Wednesday</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px;">Next Session: Wednesday, 10:00 AM to 1:00 PM Pacific Time</p>
          <p style="font-size: 14px; color: var(--text-body); margin: 0;">Agenda: Executive management compensation, enterprise commercial sales, and M&amp;A readiness.</p>
        </div>

        <div class="card" style="padding: 24px;">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 8px;">Powerhouse Cohort ($3M+)</span>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 6px;">Monthly Advisory Board | Fourth Thursday</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px;">Next Session: Thursday, 1:00 PM to 4:00 PM Central Time</p>
          <p style="font-size: 14px; color: var(--text-body); margin: 0;">Agenda: Formal board governance, private equity buyout evaluation, and succession planning.</p>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('upcoming-peer-advisory-meetings.html', renderLayout({
  title: 'Peer Advisory Meeting Schedule | PAG Cohort Calendar',
  description: 'View the scheduled monthly board sessions and briefing dates for AMCOB Peer Advisory Group cohorts.',
  activeNav: 'events',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'Peer Advisory Meetings', url: '/upcoming-peer-advisory-meetings' }],
  content: pagScheduleContent
}));
console.log('Generated upcoming-peer-advisory-meetings.html');

// 5. Conferences & Workshops (conferences-workshops.html)
const confContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Executive Learning &amp; Convenings</span>
      <h1 class="page-title">Conferences, Summits &amp; Educational Workshops</h1>
      <p class="page-subtitle">
        Flagship national gatherings, specialized executive masterclasses, and bilateral international delegations designed for verified business leaders.
      </p>
    </div>
  </section>

  <!-- Section 1: Flagship Annual Summits -->
  <section class="section">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 40px auto;">
        <span class="badge badge-gold" style="margin-bottom: 10px;">National Convenings</span>
        <h2 class="section-title">Annual Summits &amp; Global Trade Delegations</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Large-scale institutional gatherings uniting founders, investors, and industry leaders from across North America and partner economies.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        <div class="card">
          <div class="card-media">
            <img src="/assets/optimized/events/leadSummitHomeBanner.webp" alt="AMCOB LEAD Summit" style="object-fit: cover;">
          </div>
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 10px;">Annual Flagship</span>
          <h3 class="card-title">AMCOB LEAD Summit</h3>
          <p class="card-meta">National Conference | Held Annually in Irvine &amp; Dallas</p>
          <p class="card-body">
            The premier national convening of Muslim business executives, institutional investors, and enterprise builders. Features keynote deliberations, closed deal rooms, and curated B2B supplier exhibitions.
          </p>
          <div class="card-footer">
            <span style="font-size: 13px; color: var(--brand-navy); font-weight: 600;">Over 500 Attendees</span>
            <a href="/contact-us" class="btn btn-primary btn-sm">Inquire for 2027 Registration</a>
          </div>
        </div>

        <div class="card">
          <div class="card-media" style="background-color: var(--brand-navy); display: flex; align-items: center; justify-content: center; height: 220px; color: #ffffff;">
            <div style="text-align: center; padding: 24px;">
              <span style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--brand-gold);">Global Commerce</span>
              <div style="font-size: 24px; font-weight: 750; margin-top: 8px;">Bilateral Trade Missions</div>
            </div>
          </div>
          <span class="badge badge-blue" style="width: fit-content; margin-bottom: 10px;">Bilateral Delegation</span>
          <h3 class="card-title">Bilateral Trade Missions</h3>
          <p class="card-meta">International Delegations | Gulf &amp; United Kingdom</p>
          <p class="card-body">
            Coordinated executive delegations to key partner economies in Dubai, Riyadh, and London. Facilitates direct government relationships, free-zone enterprise licensing, and bilateral commercial joint ventures.
          </p>
          <div class="card-footer">
            <span style="font-size: 13px; color: var(--brand-navy); font-weight: 600;">Chamber Delegations</span>
            <a href="/contact-us" class="btn btn-outline btn-sm">Request Delegation Briefing</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: Educational Workshops & Executive Clinics -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-emerald" style="margin-bottom: 10px;">Executive Clinics</span>
        <h2 class="section-title">The AMCOB Educational Masterclass Series</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Quarterly high-signal clinics led by seasoned corporate practitioners, CPAs, and legal scholars covering the technical mechanics of enterprise scaling.
        </p>
      </div>

      <div class="grid-2" style="gap: 32px;">
        <!-- Workshop 1 -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-gold" style="margin-bottom: 10px;">Quarterly Clinic</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Corporate Tax Structuring &amp; Holding Company Formation
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">Faculty: Corporate CPAs &amp; Estate Attorneys</p>
          <p style="font-size: 14.5px; color: var(--text-body); line-height: 1.6; margin-bottom: 20px;">
            A practical clinic examining multi-entity operating structures, state nexus optimization, asset protection trusts, and tax-efficient dividend distributions for business owners exceeding $1M in taxable net income.
          </p>
          <div style="background: #ffffff; padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-light); font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
            <strong>Core Topics:</strong> Pass-through entity taxes, Delaware statutory trusts, family limited partnerships, and IP holding entities.
          </div>
          <a href="/contact-us" class="btn btn-outline btn-sm">Reserve Clinic Seat</a>
        </div>

        <!-- Workshop 2 -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-blue" style="margin-bottom: 10px;">Capital Structuring</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Sharia-Compliant Commercial Debt &amp; Equity Formations
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">Faculty: Islamic Finance Scholars &amp; Investment Bankers</p>
          <p style="font-size: 14.5px; color: var(--text-body); line-height: 1.6; margin-bottom: 20px;">
            Mastering asset-backed financing, Murabaha equipment leases, diminishing Musharaka commercial mortgages, and equity-sharing syndication term sheets that preserve ethical governance while meeting institutional underwriting standards.
          </p>
          <div style="background: #ffffff; padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-light); font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
            <strong>Core Topics:</strong> Term sheet review, avoidance of usurious clauses, capital partner alignment, and exit waterfalls.
          </div>
          <a href="/contact-us" class="btn btn-outline btn-sm">Reserve Clinic Seat</a>
        </div>

        <!-- Workshop 3 -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-emerald" style="margin-bottom: 10px;">International Expansion</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Cross-Border Trade, Free-Zone Licensing &amp; MENA Expansion
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">Faculty: International Trade Counsel &amp; Customs Directors</p>
          <p style="font-size: 14.5px; color: var(--text-body); line-height: 1.6; margin-bottom: 20px;">
            Step-by-step guidance for North American enterprises expanding operations into Dubai (DIFC, DMCC), Saudi Arabia (RHQ guidelines), and the United Kingdom, covering corporate registration, banking rails, and commercial contracts.
          </p>
          <div style="background: #ffffff; padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-light); font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
            <strong>Core Topics:</strong> Dual-entity compliance, transfer pricing rules, foreign corporate banking, and cross-border IP licensing.
          </div>
          <a href="/contact-us" class="btn btn-outline btn-sm">Reserve Clinic Seat</a>
        </div>

        <!-- Workshop 4: MLDL -->
        <div class="card" style="padding: 32px;">
          <span class="badge badge-gold" style="margin-bottom: 10px;">Life Design Lab (MLDL)</span>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">
            Founder Vitality, Spiritual Equilibrium &amp; Family Governance
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">Faculty: Muslim Life Design Lab Executive Chairs</p>
          <p style="font-size: 14.5px; color: var(--text-body); line-height: 1.6; margin-bottom: 20px;">
            Addressing the silent burdens of founder burnout, spiritual stagnation, and family strain during rapid enterprise expansion. Equips entrepreneurs with sustainable daily habits, intentional calendars, and generational governance frameworks.
          </p>
          <div style="background: #ffffff; padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-light); font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
            <strong>Core Topics:</strong> Energy management, executive sabbaticals, family council establishment, and barakah-centered routines.
          </div>
          <a href="/mldl" class="btn btn-outline btn-sm">Explore MLDL Framework &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Workshop Registration Banner -->
  <section class="section">
    <div class="container" style="max-width: 820px; text-align: center;">
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 40px; box-shadow: var(--shadow-sm);">
        <span class="badge badge-gold" style="margin-bottom: 12px;">Executive Access</span>
        <h2 class="section-title">Participate in Upcoming Masterclasses</h2>
        <p style="font-size: 15.5px; color: var(--text-body); line-height: 1.65; margin-bottom: 24px;">
          All AMCOB educational workshops are limited to 25 verified business owners per cohort to allow comprehensive case study discussions and individual strategy reviews. Active chamber members receive priority booking.
        </p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="/contact-us" class="btn btn-primary btn-md">Inquire for Next Workshop Cohort</a>
          <a href="/membership" class="btn btn-secondary btn-md">Explore Membership Benefits</a>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('conferences-workshops.html', renderLayout({
  title: 'Conferences, Summits & Educational Workshops | AMCOB',
  description: 'Discover AMCOB executive conferences including the national LEAD Summit, bilateral international trade missions, and quarterly corporate scaling clinics.',
  activeNav: 'events',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'Conferences & Workshops', url: '/conferences-workshops' }],
  content: confContent
}));
console.log('Generated conferences-workshops.html');
