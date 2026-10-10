const fs = require('fs');
const { renderLayout, esc } = require('./site-layout');
const recentMembers = JSON.parse(fs.readFileSync('data/recent-members.json', 'utf8'));

// 1. Homepage (index.html)
const homeContent = `
  <!-- Modern Corporate Hero Opening: Typographic Introduction & Wide Panoramic Photography -->
  <section class="hero-corporate" id="hero">
    <div class="container">
      <div class="hero-content-wrapper">
        <div class="hero-eyebrow">
          <span class="eyebrow-rule"></span>
          <span class="eyebrow-text">Allied Muslim Chamber of Business</span>
          <span class="eyebrow-rule"></span>
        </div>
        <h1 class="hero-headline">
          Connecting Muslim Business Leaders<br>Across North America.
        </h1>
        <p class="hero-subhead">
          AMCOB unites premier executives, founders, and enterprises through confidential peer advisory groups, cross-border commercial networks, bilateral trade delegations, and curated growth capital.
        </p>
        <div class="hero-cta-bar">
          <a href="/membership" class="btn-hero-primary">Explore Membership Pathways &rarr;</a>
          <a href="/business-directory" class="btn-hero-secondary">Browse Business Directory</a>
        </div>
        <div class="hero-footprint">
          <span class="footprint-item"><strong>370+</strong> Verified Member Businesses</span>
          <span class="footprint-sep">&bull;</span>
          <span class="footprint-item"><strong>12</strong> Regional Metropolitan Chapters</span>
          <span class="footprint-sep">&bull;</span>
          <span class="footprint-item"><strong>5</strong> PAG Forum Tiers ($100k to $3M+)</span>
        </div>
      </div>

      <!-- Substantial Wide Original AMCOB Panoramic Stage with Perspective Switcher -->
      <div class="hero-panoramic-stage">
        <div class="hero-photo-frame">
          <!-- Perspective Selector Segmented Controls -->
          <div class="hero-perspective-bar">
            <span class="perspective-label">Chamber Convening:</span>
            <button class="perspective-pill active" data-perspective="summit" onclick="setHeroPerspective('summit')">1. Summit Assembly</button>
            <button class="perspective-pill" data-perspective="boardroom" onclick="setHeroPerspective('boardroom')">2. Boardroom Strategy</button>
            <button class="perspective-pill" data-perspective="gala" onclick="setHeroPerspective('gala')">3. Annual Gala &amp; Keynote</button>
          </div>

          <img id="heroPhotoImg"
               src="/assets/optimized/hero/amcob-summit-atrium.webp" 
               alt="AMCOB Annual LEAD Summit Convening of Executives and Business Leaders" 
               class="hero-photo-img" 
               width="1200" 
               height="520" 
               loading="eager" 
               fetchpriority="high">
          
          <div class="hero-stage-caption-bar">
            <div class="caption-meta-group">
              <div class="caption-meta-item">
                <span class="caption-meta-label">Assembly</span>
                <span id="captionAssembly" class="caption-meta-val">Annual LEAD Summit Executive Assembly</span>
              </div>
              <div class="caption-meta-item">
                <span class="caption-meta-label">Scope</span>
                <span id="captionScope" class="caption-meta-val">North American Chapters and Bilateral Delegations</span>
              </div>
            </div>
            
            <div class="caption-founder-badge">
              <img src="/assets/optimized/leadership/Kashif_Zubair.webp" alt="Kashif Zubair" class="caption-founder-avatar">
              <div class="caption-founder-details">
                <span class="caption-founder-name">Kashif Zubair</span>
                <span class="caption-founder-role">Founder and CEO, AMCOB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Culture & Ethos: Faith in Enterprise, Excellence in Governance -->
  <section class="section motion-reveal" style="background-color: #ffffff; border-bottom: 1px solid var(--border-light);">
    <div class="container">
      <div style="text-align: center; max-width: 760px; margin: 0 auto 48px auto;">
        <span class="badge badge-gold" style="margin-bottom: 14px;">The AMCOB Ethos</span>
        <h2 class="section-title">Faith in Enterprise, Excellence in Governance</h2>
        <p class="section-desc" style="margin: 0 auto; font-size: 16.5px; line-height: 1.7;">
          AMCOB is rooted in the timeless principle of Ihsan: bringing intentional excellence, integrity, and ethical stewardship to every transaction. We replace transactional networking with an authentic brotherhood and sisterhood of leaders committed to mutual growth, peer trust, and generational economic self-determination.
        </p>
      </div>

      <div class="grid-4 motion-stagger-parent">
        <!-- Ethos 1 -->
        <div class="card card-motion motion-stagger-item">
          <div class="ethos-icon-box">01</div>
          <h3 class="card-title" style="font-size: 18px;">Ihsan in Commerce</h3>
          <p class="card-body" style="font-size: 14px; line-height: 1.6;">
            Approaching business not as a zero-sum contest, but as sacred stewardship (Amanah). We hold our member enterprises to the highest standards of contract integrity, fair labor, and transparent dealings.
          </p>
        </div>

        <!-- Ethos 2 -->
        <div class="card card-motion motion-stagger-item">
          <div class="ethos-icon-box">02</div>
          <h3 class="card-title" style="font-size: 18px;">Safe Peer Sanctuary</h3>
          <p class="card-body" style="font-size: 14px; line-height: 1.6;">
            Leadership can be isolating. Our Peer Advisory Groups create a protected space without posturing, where founders openly examine audited financials, operational vulnerabilities, and honest peer counsel.
          </p>
        </div>

        <!-- Ethos 3 -->
        <div class="card card-motion motion-stagger-item">
          <div class="ethos-icon-box">03</div>
          <h3 class="card-title" style="font-size: 18px;">Collective Economic Clout</h3>
          <p class="card-body" style="font-size: 14px; line-height: 1.6;">
            By aggregating over 370 member enterprises across North America, we establish institutional procurement corridors, bilateral trade delegations, and private capital co-investment syndicates.
          </p>
        </div>

        <!-- Ethos 4 -->
        <div class="card card-motion motion-stagger-item">
          <div class="ethos-icon-box">04</div>
          <h3 class="card-title" style="font-size: 18px;">Generational Stewardship</h3>
          <p class="card-body" style="font-size: 14px; line-height: 1.6;">
            Building enduring business institutions that outlast their founders. Through the Khadija Collective and executive mentorship, we cultivate the next generation of Muslim innovators and leaders.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- The AMCOB Ecosystem Architecture (Rebuilt with 2D Motion Graphics, Radial Beams & Interactive Dial) -->
  <section class="ecosystem-section motion-reveal" id="ecosystem">
    <div class="container">
      <!-- Section Header -->
      <div class="ecosystem-header">
        <span class="badge badge-gold" style="margin-bottom: 12px;">Institutional Universe</span>
        <h2 class="section-title">AMCOB <span class="text-gold">Ecosystem</span></h2>
        <p class="ecosystem-intro">
          AMCOB is where premier Muslim entrepreneurs from the US, Canada, the UK, and the Gulf unite. Through exclusive peer advisory groups, high-impact events, and elite networking mixers, we cultivate a community of visionaries driving innovation, building lasting legacies, and shaping the future.
        </p>
      </div>

      <!-- Quick Engine Chips Bar & Play Controls -->
      <div class="ecosystem-chips-bar">
        <button type="button" class="ecosystem-chip active" id="chip-0" aria-label="Peer Advisory Groups"><span class="chip-num">01</span> Peer Advisory</button>
        <button type="button" class="ecosystem-chip" id="chip-1" aria-label="Lead Generation"><span class="chip-num">02</span> Lead Generation</button>
        <button type="button" class="ecosystem-chip" id="chip-2" aria-label="Networking Mixers"><span class="chip-num">03</span> Networking Mixers</button>
        <button type="button" class="ecosystem-chip" id="chip-3" aria-label="Podcasts"><span class="chip-num">04</span> Podcasts</button>
        <button type="button" class="ecosystem-chip" id="chip-4" aria-label="Educational Workshops"><span class="chip-num">05</span> Workshops</button>
        <button type="button" class="ecosystem-chip" id="chip-5" aria-label="Capital Raising"><span class="chip-num">06</span> Capital Raising</button>
        <button type="button" class="ecosystem-chip" id="chip-6" aria-label="Accelerator Program"><span class="chip-num">07</span> Accelerator</button>
        <button type="button" class="ecosystem-chip" id="chip-7" aria-label="Sponsorship Opportunities"><span class="chip-num">08</span> Sponsorship</button>
        <button type="button" class="ecosystem-toggle-play" id="ecosystemTogglePlay" aria-label="Toggle Auto Orbit">
          <span>&#10074;&#10074;</span> Pause Orbit
        </button>
      </div>

      <!-- Desktop Motion Graphics Stage (1140 x 560 coordinate space) -->
      <div class="ecosystem-stage" id="ecosystemStage">
        <!-- SVG Motion Stage: Orbit rings, dynamic laser energy beams, and center ring pins -->
        <svg class="ecosystem-svg-stage" viewBox="0 0 1140 560" preserveAspectRatio="xMidYMid meet">
          <!-- Background Concentric Orbital Rings centered at (570, 280) -->
          <circle class="orbit-pulse-wave" cx="570" cy="280" r="140" fill="none" stroke="rgba(206,137,36,0.3)" />
          <circle class="orbit-ring-outer" cx="570" cy="280" r="230" fill="none" />
          <circle class="orbit-ring-middle" cx="570" cy="280" r="170" fill="none" />

          <!-- Dynamic Energy Laser Beams connecting Center Pins to Outer Pills -->
          <line id="beam-0" class="ecosystem-beam active" x1="470" y1="180" x2="346" y2="58" />
          <line id="beam-1" class="ecosystem-beam" x1="670" y1="180" x2="794" y2="58" />
          <line id="beam-2" class="ecosystem-beam" x1="707" y1="243" x2="804" y2="198" />
          <line id="beam-3" class="ecosystem-beam" x1="703" y1="329" x2="804" y2="338" />
          <line id="beam-4" class="ecosystem-beam" x1="651" y1="396" x2="794" y2="478" />
          <line id="beam-5" class="ecosystem-beam" x1="489" y1="396" x2="346" y2="478" />
          <line id="beam-6" class="ecosystem-beam" x1="437" y1="329" x2="336" y2="338" />
          <line id="beam-7" class="ecosystem-beam" x1="433" y1="243" x2="336" y2="198" />

          <!-- Central Segmented Navy Ring Architecture -->
          <circle cx="570" cy="280" r="142" fill="none" stroke="#0b162c" stroke-width="26" />
          <circle cx="570" cy="280" r="118" fill="none" stroke="rgba(206,137,36,0.35)" stroke-width="1.5" stroke-dasharray="4 6" />

          <!-- Segment Divider Hairlines on the Navy Ring -->
          <line x1="699" y1="280" x2="725" y2="280" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <line x1="661" y1="189" x2="680" y2="170" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <line x1="570" y1="151" x2="570" y2="125" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <line x1="479" y1="189" x2="460" y2="170" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <line x1="441" y1="280" x2="415" y2="280" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <line x1="479" y1="371" x2="460" y2="390" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <line x1="570" y1="409" x2="570" y2="435" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <line x1="661" y1="371" x2="680" y2="390" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

          <!-- Center Ring Numbered Pins (Exact 8 Nodes from Sam's Diagram) -->
          <g id="pin-0" class="ring-pin active">
            <circle cx="470" cy="180" r="16" />
            <text x="470" y="180">01</text>
          </g>
          <g id="pin-1" class="ring-pin">
            <circle cx="670" cy="180" r="16" />
            <text x="670" y="180">02</text>
          </g>
          <g id="pin-2" class="ring-pin">
            <circle cx="707" cy="243" r="16" />
            <text x="707" y="243">03</text>
          </g>
          <g id="pin-3" class="ring-pin">
            <circle cx="703" cy="329" r="16" />
            <text x="703" y="329">04</text>
          </g>
          <g id="pin-4" class="ring-pin">
            <circle cx="651" cy="396" r="16" />
            <text x="651" y="396">05</text>
          </g>
          <g id="pin-5" class="ring-pin">
            <circle cx="489" cy="396" r="16" />
            <text x="489" y="396">06</text>
          </g>
          <g id="pin-6" class="ring-pin">
            <circle cx="437" cy="329" r="16" />
            <text x="437" y="329">07</text>
          </g>
          <g id="pin-7" class="ring-pin">
            <circle cx="433" cy="243" r="16" />
            <text x="433" y="243">08</text>
          </g>
        </svg>

        <!-- Central Hub: Official AMCOB Crest Medallion -->
        <div class="ecosystem-center-hub">
          <img src="/assets/optimized/logos/logo.png" alt="AMCOB Allied Muslim Chamber of Business" class="center-hub-crest">
          <span class="center-hub-title">Ecosystem Hub</span>
          <div class="center-hub-live-badge">
            <span class="center-hub-live-dot"></span>
            <span id="centerHubActiveLabel">01 &bull; Peer Advisory Groups</span>
          </div>
        </div>

        <!-- The 8 Orbital Pills in Bilateral / Mobile-Grid Layout -->
        <div class="ecosystem-nodes-grid">
          <!-- Left Column (01, 08, 07, 06) -->
          <!-- 01: Peer Advisory Groups -->
          <a href="/peer-advisory" class="ecosystem-pill pill-left active" id="pill-0" title="Visit Peer Advisory Groups">
            <span class="pill-badge">01</span>
            <div class="pill-info">
              <span class="pill-title">Peer Advisory Groups</span>
              <span class="pill-subtitle">Revenue-Stage CEO Cohorts</span>
            </div>
          </a>

          <!-- 08: Sponsorship Opportunities -->
          <a href="/sponsorship" class="ecosystem-pill pill-left" id="pill-7" title="Visit Sponsorship Opportunities">
            <span class="pill-badge">08</span>
            <div class="pill-info">
              <span class="pill-title">Sponsorship Opportunities</span>
              <span class="pill-subtitle">Enterprise Brand Alignment</span>
            </div>
          </a>

          <!-- 07: Accelerator Program -->
          <a href="/virtual-accelerator-program" class="ecosystem-pill pill-left" id="pill-6" title="Visit Accelerator Program">
            <span class="pill-badge">07</span>
            <div class="pill-info">
              <span class="pill-title">Accelerator Program</span>
              <span class="pill-subtitle">12-Week Venture Scaling</span>
            </div>
          </a>

          <!-- 06: Capital Raising -->
          <a href="/opportunities" class="ecosystem-pill pill-left" id="pill-5" title="Visit Capital Raising">
            <span class="pill-badge">06</span>
            <div class="pill-info">
              <span class="pill-title">Capital Raising</span>
              <span class="pill-subtitle">Syndicates &amp; Family Offices</span>
            </div>
          </a>

          <!-- Right Column (02, 03, 04, 05) -->
          <!-- 02: Lead Generation -->
          <a href="/connect" class="ecosystem-pill pill-right" id="pill-1" title="Visit AMCOB Connect">
            <span class="pill-badge">02</span>
            <div class="pill-info">
              <span class="pill-title">Lead Generation</span>
              <span class="pill-subtitle">AMCOB Connect Engine</span>
            </div>
          </a>

          <!-- 03: Networking Mixers -->
          <a href="/dinner-mixers" class="ecosystem-pill pill-right" id="pill-2" title="Visit Networking Mixers">
            <span class="pill-badge">03</span>
            <div class="pill-info">
              <span class="pill-title">Networking Mixers</span>
              <span class="pill-subtitle">12 Metro Chapters</span>
            </div>
          </a>

          <!-- 04: Podcasts -->
          <a href="/podcasts" class="ecosystem-pill pill-right" id="pill-3" title="Visit Podcasts &amp; Media">
            <span class="pill-badge">04</span>
            <div class="pill-info">
              <span class="pill-title">Podcasts &amp; Media</span>
              <span class="pill-subtitle">Executive Founder Dialogues</span>
            </div>
          </a>

          <!-- 05: Educational Workshops -->
          <a href="/conferences-workshops" class="ecosystem-pill pill-right" id="pill-4" title="Visit Educational Workshops">
            <span class="pill-badge">05</span>
            <div class="pill-info">
              <span class="pill-title">Educational Workshops</span>
              <span class="pill-subtitle">LEAD Summits &amp; Masterclasses</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Interactive Cockpit HUD -->
      <div class="ecosystem-cockpit">
        <div class="cockpit-left">
          <div class="cockpit-num" id="cockpitNum">01</div>
          <div class="cockpit-details">
            <h3 id="cockpitTitle">Peer Advisory Groups <span class="cockpit-tag" id="cockpitTag">Flagship Governance</span></h3>
            <p id="cockpitDesc">
              Confidential CEO cohorts of 8 to 12 verified founders meeting monthly for structured accountability, problem triage, and operational governance.
            </p>
          </div>
        </div>
        <div class="cockpit-right">
          <button type="button" class="cockpit-stepper-btn" id="cockpitPrev" title="Previous Node" aria-label="Previous">&larr;</button>
          <button type="button" class="cockpit-stepper-btn" id="cockpitNext" title="Next Node" aria-label="Next">&rarr;</button>
          <a href="/peer-advisory" class="cockpit-btn" id="cockpitBtn">Explore Cohorts &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Core Membership Pillars (Designed for Founders at Every Scale) -->
  <section class="section motion-reveal" style="background-color: #ffffff;">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-blue" style="margin-bottom: 12px;">Three Strategic Pillars</span>
        <h2 class="section-title">Designed for Founders at Every Scale</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Whether scaling past your first million or governing an established enterprise, AMCOB offers structured peer groups, direct introductions, and professional community.
        </p>
      </div>

      <div class="grid-3 motion-stagger-parent">
        <!-- Card 1: PAG -->
        <div class="card card-motion motion-stagger-item">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 14px;">Core Flagship</span>
          <h3 class="card-title">Peer Advisory Groups (PAG)</h3>
          <p class="card-meta">From $1,925 to $5,500 per year</p>
          <p class="card-body">
            A confidential board of directors composed of fellow Muslim entrepreneurs matched strictly by verified revenue stage. Meets monthly for three hours under strict peer confidentiality.
          </p>
          <div class="card-footer">
            <span style="font-size: 13px; color: var(--text-muted);">$100k to $3M+ Revenue</span>
            <a href="/peer-advisory" class="btn btn-outline btn-sm">Explore Cohorts &rarr;</a>
          </div>
        </div>

        <!-- Card 2: AMCOB Connect -->
        <div class="card card-motion motion-stagger-item">
          <span class="badge badge-blue" style="width: fit-content; margin-bottom: 14px;">Referral Engine</span>
          <h3 class="card-title">AMCOB Connect</h3>
          <p class="card-meta">$850 per year</p>
          <p class="card-body">
            Structured bi-weekly business networking delivering high-trust client introductions. Connects enterprise buyers with verified service providers across North American chapters.
          </p>
          <div class="card-footer">
            <span style="font-size: 13px; color: var(--text-muted);">Bi-Weekly Sessions</span>
            <a href="/connect" class="btn btn-outline btn-sm">Learn More &rarr;</a>
          </div>
        </div>

        <!-- Card 3: Affiliate -->
        <div class="card card-motion motion-stagger-item">
          <span class="badge" style="width: fit-content; margin-bottom: 14px;">Professional Tier</span>
          <h3 class="card-title">Affiliate Membership</h3>
          <p class="card-meta">$550 per year</p>
          <p class="card-body">
            Tailored for solo practitioners, emerging entrepreneurs, and industry specialists. Includes verified directory placement, mixer invitations, and access to the executive knowledge base.
          </p>
          <div class="card-footer">
            <span style="font-size: 13px; color: var(--text-muted);">Individual Practitioners</span>
            <a href="/affiliate" class="btn btn-outline btn-sm">View Benefits &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Recent Members Carousel Showcase -->
  <section class="recent-members-section motion-reveal" id="recent-members">
    <div class="container">
      <div class="recent-members-head">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 12px;">Chamber Community</span>
          <h2 class="section-title" style="margin-bottom: 8px;">Our Recent <span class="text-gold">Members</span></h2>
          <p class="section-desc" style="margin-bottom: 0; max-width: 680px;">
            We are proud to represent a diverse network of member companies across industries, driving innovation, collaboration, and growth together.
          </p>
        </div>
        <div class="recent-members-controls">
          <button type="button" class="recent-members-nav-btn" id="recentMembersPrev" title="Scroll Previous" aria-label="Previous Members">&larr;</button>
          <button type="button" class="recent-members-nav-btn" id="recentMembersNext" title="Scroll Next" aria-label="Next Members">&rarr;</button>
        </div>
      </div>

      <div class="recent-members-track" id="recentMembersTrack">
        ${recentMembers.map(m => `
          <div class="recent-member-card">
            <div class="recent-member-photo-wrap">
              <img src="${m.localImage}" alt="${esc(m.name)}" loading="lazy" width="260" height="250">
            </div>
            <div class="recent-member-info">
              <div class="recent-member-name-row">
                <span class="recent-member-name">${esc(m.name)}</span>
                ${m.linkedin ? `
                  <a href="${esc(m.linkedin)}" target="_blank" rel="noopener noreferrer" class="recent-member-linkedin" title="LinkedIn profile of ${esc(m.name)}" aria-label="LinkedIn profile of ${esc(m.name)}">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#0077b5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.763z"/></svg>
                  </a>
                ` : ''}
              </div>
              <span class="recent-member-title">${esc(m.title)}</span>
              <span class="recent-member-company">${esc(m.company)}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 36px; text-align: center;">
        <a href="/join" class="btn btn-primary">Join our Network &rarr;</a>
      </div>
    </div>
  </section>

  <!-- Executive Leadership & Founding Circle -->
  <section class="section motion-reveal">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; flex-wrap: wrap; gap: 16px;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 10px;">Chamber Leadership</span>
          <h2 class="section-title">The AMCOB Lifetime Founding Circle</h2>
          <p class="section-desc" style="margin-bottom: 0;">
            Guided by accomplished entrepreneurs and business builders committed to collective economic strength.
          </p>
        </div>
        <a href="/about" class="btn btn-secondary btn-sm">Chamber Governance &rarr;</a>
      </div>

      <div class="grid-4 motion-stagger-parent">
        <!-- Kashif Zubair -->
        <div class="card card-motion motion-stagger-item" style="text-align: center;">
          <div style="width: 110px; height: 110px; margin: 0 auto 16px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light);">
            <img src="/assets/optimized/leadership/Kashif_Zubair.webp" alt="Kashif Zubair" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h3 style="font-size: 16px; font-weight: 650; color: var(--brand-navy); margin-bottom: 4px;">Kashif Zubair</h3>
          <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;">Founder and CEO</p>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">Leading AMCOB's strategic expansion across North America and bilateral trade partnerships.</p>
        </div>

        <!-- Dr. Sohail Masood -->
        <div class="card card-motion motion-stagger-item" style="text-align: center;">
          <div style="width: 110px; height: 110px; margin: 0 auto 16px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light);">
            <img src="/assets/optimized/leadership/1516800934459.webp" alt="Dr. Sohail Masood" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h3 style="font-size: 16px; font-weight: 650; color: var(--brand-navy); margin-bottom: 4px;">Dr. Sohail Masood</h3>
          <p style="font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px;">CEO, KabaFusion</p>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">Healthcare innovator and entrepreneur heading national specialty infusion therapy operations.</p>
        </div>

        <!-- Kamal Solaiman -->
        <div class="card card-motion motion-stagger-item" style="text-align: center;">
          <div style="width: 110px; height: 110px; margin: 0 auto 16px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light);">
            <img src="/assets/optimized/leadership/1734487025310.webp" alt="Kamal Solaiman" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h3 style="font-size: 16px; font-weight: 650; color: var(--brand-navy); margin-bottom: 4px;">Kamal Solaiman</h3>
          <p style="font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px;">Managing Partner, Primary Capital</p>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">Private equity and real estate investment strategist guiding capital allocation and fund structures.</p>
        </div>

        <!-- Umair Shah -->
        <div class="card card-motion motion-stagger-item" style="text-align: center;">
          <div style="width: 110px; height: 110px; margin: 0 auto 16px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light);">
            <img src="/assets/optimized/leadership/umair-shah.jpg" alt="Umair Shah" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h3 style="font-size: 16px; font-weight: 650; color: var(--brand-navy); margin-bottom: 4px;">Umair Shah</h3>
          <p style="font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px;">Global Executive, Arbisoft</p>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">Enterprise software executive leading global engineering teams and digital transformation initiatives.</p>
        </div>
      </div>

      <!-- Founding Enterprise Marks -->
      <div style="margin-top: 40px; padding: 24px 32px; background: #ffffff; border: 1px solid var(--border-light); border-radius: 8px; display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 24px;">
        <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Executive Companies:</span>
        <img src="/assets/optimized/logos/kabafusion.jpeg" alt="KabaFusion" style="height: 32px; width: auto; object-fit: contain; filter: grayscale(100%); opacity: 0.85;">
        <img src="/assets/optimized/logos/arbisoft.svg" alt="Arbisoft" style="height: 30px; width: auto; object-fit: contain; filter: grayscale(100%); opacity: 0.85;">
        <img src="/assets/optimized/logos/primaryCapitalHoldings.webp" alt="Primary Capital Holdings" style="height: 32px; width: auto; object-fit: contain; filter: grayscale(100%); opacity: 0.85;">
        <img src="/assets/optimized/logos/merrillImage.webp" alt="Merrill Lynch" style="height: 28px; width: auto; object-fit: contain; filter: grayscale(100%); opacity: 0.85;">
      </div>
    </div>
  </section>

  <!-- Authentic Member Community Mosaic -->
  <section class="section motion-reveal" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 36px auto;">
        <span class="badge badge-emerald" style="margin-bottom: 12px;">North American Network</span>
        <h2 class="section-title">An Authentic Community of Over 400 Businesses</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Our members operate across healthcare, enterprise software, civil engineering, wealth advisory, supply chain logistics, and specialized retail.
        </p>
      </div>

      <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); background: #ffffff;">
        <img src="/assets/optimized/programs/JoinAMCOBBannerWebsite.webp" alt="AMCOB Member Community Mosaic" width="1440" height="500" style="width: 100%; height: auto; object-fit: cover;">
      </div>

      <div style="margin-top: 32px; text-align: center;">
        <a href="/business-directory" class="btn btn-primary">Search the Business Directory &rarr;</a>
      </div>
    </div>
  </section>

  <!-- Upcoming Events & Chapter Gatherings -->
  <section class="section motion-reveal">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; flex-wrap: wrap; gap: 16px;">
        <div>
          <span class="badge badge-blue" style="margin-bottom: 10px;">Executive Gatherings</span>
          <h2 class="section-title">Upcoming Regional Chapter Mixers</h2>
          <p class="section-desc" style="margin-bottom: 0;">
            Regular regional dinners and global virtual mixers designed for high-signal relationship building.
          </p>
        </div>
        <a href="/events" class="btn btn-secondary btn-sm">Full Events Calendar &rarr;</a>
      </div>

      <div class="grid-3 motion-stagger-parent">
        <!-- Event 1: Dallas -->
        <div class="card card-motion motion-stagger-item">
          <div class="card-media">
            <img src="/assets/optimized/events/event_dallas_c8912b94-fd60-423b-86bb-3de97ffd15bc.png" alt="Dallas Executive Dinner">
          </div>
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 10px;">Dallas Chapter</span>
          <h3 class="card-title">Dallas Executive Dinner Mixer</h3>
          <p class="card-meta">In-Person | Dallas, Texas</p>
          <p class="card-body">Curated evening gathering for North Texas Muslim entrepreneurs and executives.</p>
          <div class="card-footer">
            <a href="/dinner-mixers" class="btn btn-outline btn-sm">Event Details</a>
            <a href="https://luma.com/34yq548q" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">RSVP on Luma</a>
          </div>
        </div>

        <!-- Event 2: Houston -->
        <div class="card card-motion motion-stagger-item">
          <div class="card-media">
            <img src="/assets/optimized/events/event_houston_597cf5e8-ae95-4d8f-b4d6-965dd1ca33fe.png" alt="Houston Founders Dinner">
          </div>
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 10px;">Houston Chapter</span>
          <h3 class="card-title">Houston Founders and Executive Mixer</h3>
          <p class="card-meta">In-Person | Houston, Texas</p>
          <p class="card-body">High-signal networking for Houston energy, medical, and software founders.</p>
          <div class="card-footer">
            <a href="/dinner-mixers" class="btn btn-outline btn-sm">Event Details</a>
            <a href="https://luma.com/2ah8g6wd" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">RSVP on Luma</a>
          </div>
        </div>

        <!-- Event 3: Virtual Mixer -->
        <div class="card card-motion motion-stagger-item">
          <div class="card-media">
            <img src="/assets/optimized/events/event_98c73207-744b-4123-bdac-ab7eacad6dc1.png" alt="Virtual Global Mixer">
          </div>
          <span class="badge badge-blue" style="width: fit-content; margin-bottom: 10px;">Online / Global</span>
          <h3 class="card-title">Global Virtual Business Mixer</h3>
          <p class="card-meta">Online | Bi-Weekly Session</p>
          <p class="card-body">Connecting founders and executives across North America, the UK, UAE, and beyond.</p>
          <div class="card-footer">
            <a href="/virtual-mixers" class="btn btn-outline btn-sm">Session Info</a>
            <a href="https://luma.com/oxpfmizl" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Register Free</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Component (Design System) -->
  <section class="faq-section motion-reveal" id="faq">
    <div class="container">
      <div class="faq-layout">
        <!-- Left Header -->
        <div>
          <span class="faq-badge">&#9679; FAQ</span>
          <h2 class="faq-title">Questions, Answered.</h2>
          <p class="faq-desc">
            Still curious? Call <a href="tel:9496170529">949-617-0529</a> or <a href="/contact-us">contact us</a>.
          </p>
        </div>

        <!-- Right Accordion List -->
        <div class="faq-accordion">
          <!-- Item 1 -->
          <div class="faq-item active">
            <button type="button" class="faq-header">
              <span>How does capital-raise promotion work?</span>
              <span class="faq-chevron">&#9660;</span>
            </button>
            <div class="faq-body">
              AMCOB provides structured deal flow exposure for verified members. Qualified investment offerings are reviewed by chamber leadership and presented directly to accredited angel investors, venture syndicates, and family offices within our private network.
            </div>
          </div>

          <!-- Item 2 -->
          <div class="faq-item">
            <button type="button" class="faq-header">
              <span>How does membership work for nonprofits?</span>
              <span class="faq-chevron">&#9660;</span>
            </button>
            <div class="faq-body">
              Registered 501(c)(3) nonprofit organizations and charitable endowments participate through specialized Affiliate pathways. Leadership gains access to our executive network, planned giving connections, and community partnership initiatives.
            </div>
          </div>

          <!-- Item 3 -->
          <div class="faq-item">
            <button type="button" class="faq-header">
              <span>Can I attend a meeting before I join?</span>
              <span class="faq-chevron">&#9660;</span>
            </button>
            <div class="faq-body">
              Prospective members may attend one regional dinner mixer or virtual mixer as an invited guest. Peer Advisory Group (PAG) sessions remain closed to guests to protect strict peer confidentiality commitments.
            </div>
          </div>

          <!-- Item 4 -->
          <div class="faq-item">
            <button type="button" class="faq-header">
              <span>How is this different from a Peer Advisory Group?</span>
              <span class="faq-chevron">&#9660;</span>
            </button>
            <div class="faq-body">
              AMCOB Connect focuses on commercial introductions, referral pipelines, and B2B vendor matching. Peer Advisory Groups (PAG) provide closed-door executive governance, personal accountability, and strategic business problem solving matched by verified revenue stage.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Imperial Navy Flagship CTA Banner -->
  <section class="cta-banner motion-reveal">
    <div class="container cta-banner-inner">
      <h2 class="cta-title">Grow With People Who Want You To Win.</h2>
      <p class="cta-subtitle">
        Join the Trusted Advisor Network of the Allied Muslim Chamber of Business. Your next 1st or 3rd Friday could bring your next client.
      </p>
      <div class="cta-actions">
        <a href="/join" class="btn-pill btn-pill-gold">Sign Up Now</a>
        <a href="tel:9496170529" class="btn-pill btn-pill-outline-white">Call 949-617-0529</a>
      </div>
    </div>
  </section>
`;

let renderedHome = renderLayout({
  title: 'Allied Muslim Chamber of Business (AMCOB)',
  description: 'The premier institutional chamber uniting over 400 verified Muslim-owned businesses, peer advisory cohorts, and executive chapters across North America.',
  activeNav: '',
  breadcrumbs: [],
  content: homeContent,
  extraHead: '<link rel="stylesheet" href="/css/ecosystem-motion.css">',
  extraScripts: '<script src="/js/ecosystem-motion.js"></script>'
});

fs.writeFileSync('index.html', renderedHome);
console.log('Generated index.html with corporate hero architecture and 2D motion graphics');

// 2. About Us (about.html)
const aboutContent = "\n    \n  <section class=\"page-intro\">\n    <div class=\"container\">\n      <span class=\"page-intro-badge\">Institutional Identity</span>\n      <h1 class=\"page-title\">About the Allied Muslim Chamber of Business</h1>\n      <p class=\"page-subtitle\">\n        AMCOB was founded to establish durable economic institutions, foster confidential peer mentorship, and unlock cross-border commercial opportunities for Muslim founders and business executives.\n      </p>\n    </div>\n  </section>\n\n  <!-- Mission & Genesis -->\n  <section class=\"section\">\n    <div class=\"container\">\n      <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;\">\n        <div>\n          <h2 class=\"section-title\">Our Purpose and Genesis</h2>\n          <p style=\"font-size: 16px; color: var(--text-body); margin-bottom: 18px;\">\n            The Allied Muslim Chamber of Business was established to bridge a critical structural gap in the commercial landscape. While Muslim business owners in the United States, Canada, and global hubs create substantial enterprise value, they frequently operate in isolation without institutional representation, structured peer accountability, or institutional capital channels.\n          </p>\n          <p style=\"font-size: 16px; color: var(--text-body); margin-bottom: 18px;\">\n            AMCOB provides the formal chamber architecture that connects these enterprises. We focus on four foundational pillars: Growth, Accountability, Isolation Relief, and Networking.\n          </p>\n          <p style=\"font-size: 16px; color: var(--text-body);\">\n            Today, the chamber represents over 400 verified enterprises spanning healthcare systems, enterprise software, commercial real estate, logistics, legal counsel, and manufacturing.\n          </p>\n        </div>\n\n        <div style=\"background-color: var(--bg-subtle); padding: 36px; border: 1px solid var(--border-light); border-radius: 12px;\">\n          <h3 style=\"font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;\">The Chamber Charter</h3>\n          <ul style=\"list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 15px; color: var(--text-body);\">\n            <li style=\"display: flex; gap: 10px;\">\n              <span style=\"color: var(--brand-emerald); font-weight: bold;\">&#10003;</span>\n              <span><strong>Fiduciary Trust:</strong> Uncompromising ethical integrity in all business dealings and commercial transactions.</span>\n            </li>\n            <li style=\"display: flex; gap: 10px;\">\n              <span style=\"color: var(--brand-emerald); font-weight: bold;\">&#10003;</span>\n              <span><strong>Peer Confidentiality:</strong> Strict non-disclosure and trust during closed-door advisory boards.</span>\n            </li>\n            <li style=\"display: flex; gap: 10px;\">\n              <span style=\"color: var(--brand-emerald); font-weight: bold;\">&#10003;</span>\n              <span><strong>Economic Solidarity:</strong> Active preference for verified member suppliers, contractors, and partners.</span>\n            </li>\n            <li style=\"display: flex; gap: 10px;\">\n              <span style=\"color: var(--brand-emerald); font-weight: bold;\">&#10003;</span>\n              <span><strong>Intergenerational Capital:</strong> Creating institutional business infrastructure that endures across generations.</span>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Founder Letter -->\n  <section class=\"section\" style=\"background-color: var(--bg-subtle);\">\n    <div class=\"container\">\n      <div style=\"display: grid; grid-template-columns: 320px 1fr; gap: 48px; align-items: center;\">\n        <div style=\"text-align: center;\">\n          <div style=\"width: 220px; height: 220px; margin: 0 auto 18px auto; border-radius: 50%; overflow: hidden; border: 3px solid #ffffff; box-shadow: var(--shadow-md);\">\n            <img src=\"/assets/optimized/leadership/founder-ceo-message-transparent-trimmed-v4.webp\" alt=\"Kashif Zubair, Founder &amp; CEO\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h3 style=\"font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;\">Kashif Zubair</h3>\n          <p style=\"font-size: 14px; color: var(--brand-gold); font-weight: 600;\">Founder &amp; Chief Executive Officer</p>\n        </div>\n\n        <div>\n          <span class=\"badge badge-gold\" style=\"margin-bottom: 12px;\">Executive Message</span>\n          <h2 class=\"section-title\">A Message from the Chief Executive</h2>\n          <blockquote style=\"font-size: 16.5px; line-height: 1.7; color: var(--text-body); font-style: italic; margin-bottom: 20px;\">\n            \"Running a successful business is one of the most demanding callings an individual can undertake. When entrepreneurs reach critical revenue thresholds, the challenges shift from execution to governance, capital strategy, and organizational endurance. AMCOB exists to ensure that no Muslim founder walks this path alone. By combining rigorous peer accountability with genuine brotherhood and ethical alignment, we are building a commercial bedrock for generations to come.\"\n          </blockquote>\n          <p style=\"font-size: 14px; color: var(--text-muted); font-weight: 500;\">\n            Kashif Zubair | Founder &amp; CEO, Allied Muslim Chamber of Business\n          </p>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Leadership Team -->\n  <section class=\"section\">\n    <div class=\"container\">\n      <div style=\"text-align: center; max-width: 680px; margin: 0 auto 48px auto;\">\n        <span class=\"badge badge-blue\" style=\"margin-bottom: 12px;\">Executive Management</span>\n        <h2 class=\"section-title\">The AMCOB Leadership &amp; Operational Team</h2>\n        <p class=\"section-desc\" style=\"margin: 0 auto;\">\n          The executive, technical, and operational staff coordinating chamber affairs, member cohorts, software platforms, and regional chapters.\n        </p>\n      </div>\n\n      <div class=\"grid-4\">\n        <!-- Kashif Zubair -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Kashif_Zubair.webp\" alt=\"Kashif Zubair\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Kashif Zubair</h4>\n          <p style=\"font-size: 12.5px; color: var(--brand-gold); font-weight: 600; margin-bottom: 8px;\">Founder &amp; Chief Executive Officer</p>\n          <a href=\"https://www.linkedin.com/in/kashifzubair/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Talha Khan -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Talha_Khan.webp\" alt=\"Talha Khan\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Talha Khan</h4>\n          <p style=\"font-size: 12.5px; color: var(--brand-navy); font-weight: 600; margin-bottom: 8px;\">Head of Operations</p>\n          <a href=\"https://www.linkedin.com/in/talhakh96/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Samar Naeem -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Samar_Naeem.webp\" alt=\"Samar Naeem\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Samar Naeem</h4>\n          <p style=\"font-size: 12.5px; color: var(--brand-navy); font-weight: 600; margin-bottom: 8px;\">Director of Finance</p>\n          <a href=\"https://www.linkedin.com/in/samar-naeem-1b4663204/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Zainab Gohar -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Zainab_Gohar.webp\" alt=\"Zainab Gohar\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Zainab Gohar</h4>\n          <p style=\"font-size: 12.5px; color: var(--brand-navy); font-weight: 600; margin-bottom: 8px;\">Head of Member Intake &amp; Sales</p>\n          <a href=\"https://www.linkedin.com/in/zainab-gohar-8038b315a/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Hamza Zahid -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Hamza_Zahid.webp\" alt=\"Hamza Zahid\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Hamza Zahid</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Data Analytics Lead</p>\n          <a href=\"https://www.linkedin.com/in/hamzazahid01/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Effa Khanum -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Effa.webp\" alt=\"Effa Khanum\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Effa Khanum</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Senior Data Analyst</p>\n          <a href=\"https://www.linkedin.com/in/effa-khanum-08263398/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Aamna Qamar -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Aamna.webp\" alt=\"Aamna Qamar\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Aamna Qamar</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Data Analyst</p>\n          <a href=\"https://www.linkedin.com/in/aamna-qamar-029b5415a/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Mahnoor Asif -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/mahnoorAsif.webp\" alt=\"Mahnoor Asif\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Mahnoor Asif</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Assistant Project Manager</p>\n          <a href=\"https://www.linkedin.com/in/mahnoor-asif-636811245/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Danish Raj -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Danish_Raj.webp\" alt=\"Danish Raj\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Danish Raj</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Manager, Software Development</p>\n          <a href=\"https://www.linkedin.com/in/danishraj-dev/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Jahanzaib Ansari -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/jahanzaibAnsari.webp\" alt=\"Jahanzaib Ansari\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Jahanzaib Ansari</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Senior Front-End Developer</p>\n          <a href=\"https://pk.linkedin.com/in/jahanzaib-ansari-63bab618b\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Nikhil Kumar -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/nick.webp\" alt=\"Nikhil Kumar\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Nikhil Kumar</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Front-End Developer</p>\n          <a href=\"https://www.linkedin.com/in/nikhil-kumar-makwana-061570299/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n\n        <!-- Farzam Yousuf -->\n        <div class=\"card\" style=\"text-align: center;\">\n          <div style=\"width: 108px; height: 108px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light); box-shadow: var(--shadow-sm);\">\n            <img src=\"/assets/optimized/leadership/Farzam_Yousuf.webp\" alt=\"Farzam Yousuf\" style=\"width: 100%; height: 100%; object-fit: cover;\">\n          </div>\n          <h4 style=\"font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 3px;\">Farzam Yousuf</h4>\n          <p style=\"font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px;\">Senior Mobile App Developer</p>\n          <a href=\"https://www.linkedin.com/in/farzam-yousuf-a24a13a0/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-size: 12px; color: var(--brand-blue); text-decoration: none; font-weight: 500;\">LinkedIn Profile &rarr;</a>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Ambassador Network Callout -->\n  <section class=\"section\" style=\"background-color: var(--bg-subtle);\">\n    <div class=\"container\" style=\"text-align: center; max-width: 720px; margin: 0 auto;\">\n      <span class=\"badge badge-gold\" style=\"margin-bottom: 12px;\">North American Coverage</span>\n      <h2 class=\"section-title\">12 Regional Chapter Ambassadors</h2>\n      <p class=\"section-desc\" style=\"margin: 0 auto 28px auto;\">\n        Our regional chapter ambassadors organize local dinner mixers, welcome new members, and represent AMCOB across major metropolitan economic hubs.\n      </p>\n      <a href=\"/ambassador-program\" class=\"btn btn-primary\">Meet Chapter Ambassadors &rarr;</a>\n    </div>\n  </section>\n\n  ";

fs.writeFileSync('about.html', renderLayout({
  title: 'About AMCOB | Mission, Leadership & Origin',
  description: 'Learn about the mission, founding charter, leadership team, and regional ambassador network of the Allied Muslim Chamber of Business.',
  activeNav: 'about',
  breadcrumbs: [{ label: 'About', url: '/about' }],
  content: aboutContent
}));
console.log('Generated about.html');

// 3. Contact Us (contact-us.html)
const contactContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Get in Touch</span>
      <h1 class="page-title">Contact AMCOB</h1>
      <p class="page-subtitle">
        Connect with our membership team, inquire about regional chapters, or schedule an executive consultation.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
        <div>
          <h2 class="section-title">Send a Direct Inquiry</h2>
          <p style="font-size: 15px; color: var(--text-muted); margin-bottom: 28px;">
            Complete this form and an AMCOB chamber director will respond within one business day.
          </p>

          <form style="display: flex; flex-direction: column; gap: 18px;" onsubmit="event.preventDefault(); alert('Inquiry received. A representative will contact you shortly.');">
            <div>
              <label style="display: block; font-size: 13.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Full Name *</label>
              <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Tariq Khan">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label style="display: block; font-size: 13.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Work Email *</label>
                <input type="email" required class="search-input" style="width: 100%;" placeholder="tariq@company.com">
              </div>
              <div>
                <label style="display: block; font-size: 13.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Phone Number *</label>
                <input type="tel" required class="search-input" style="width: 100%;" placeholder="+1 (555) 000-0000">
              </div>
            </div>

            <div>
              <label style="display: block; font-size: 13.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Company Name &amp; Industry *</label>
              <input type="text" required class="search-input" style="width: 100%;" placeholder="e.g. Apex Health Systems (Healthcare)">
            </div>

            <div>
              <label style="display: block; font-size: 13.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Area of Interest *</label>
              <select class="filter-select" style="width: 100%;">
                <option value="pag">Peer Advisory Groups (PAG)</option>
                <option value="connect">AMCOB Connect (B2B Referral)</option>
                <option value="affiliate">Affiliate Membership</option>
                <option value="directory">Directory Listing Inquiry</option>
                <option value="sponsorship">Corporate Sponsorship</option>
                <option value="general">General Chamber Inquiry</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 13.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Message or Questions</label>
              <textarea rows="4" class="search-input" style="width: 100%; resize: vertical;" placeholder="Tell us about your business and goals..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Submit Inquiry</button>
          </form>
        </div>

        <div>
          <div style="background-color: var(--bg-subtle); padding: 36px; border: 1px solid var(--border-light); border-radius: 12px; margin-bottom: 28px;">
            <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">Chamber Contact Details</h3>
            <p style="font-size: 14.5px; color: var(--text-body); margin-bottom: 12px;">
              <strong>Headquarters:</strong> North American Chamber Operations
            </p>
            <p style="font-size: 14.5px; color: var(--text-body); margin-bottom: 12px;">
              <strong>General Inquiries:</strong> info@amcob.org
            </p>
            <p style="font-size: 14.5px; color: var(--text-body); margin-bottom: 12px;">
              <strong>Membership Office:</strong> membership@amcob.org
            </p>
            <p style="font-size: 14.5px; color: var(--text-body);">
              <strong>Member Portal:</strong> <a href="https://my.amcob.org" target="_blank" rel="noopener noreferrer" style="color: var(--brand-navy); text-decoration: underline;">my.amcob.org</a>
            </p>
          </div>

          <div style="border: 1px solid var(--border-light); border-radius: 12px; padding: 28px;">
            <h3 style="font-size: 17px; font-weight: 650; color: var(--brand-navy); margin-bottom: 10px;">Regional Chapters</h3>
            <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">
              AMCOB operates active chapters hosting regular executive dinners across Dallas, Houston, Silicon Valley, New York, Chicago, Atlanta, Seattle, Orange County, Washington D.C., and Toronto.
            </p>
            <a href="/dinner-mixers" class="btn btn-outline btn-sm">View Upcoming Mixers &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('contact-us.html', renderLayout({
  title: 'Contact AMCOB | Membership & Chapter Inquiries',
  description: 'Reach the Allied Muslim Chamber of Business executive team, membership coordinators, and regional chapter directors.',
  activeNav: 'contact',
  breadcrumbs: [{ label: 'Contact Us', url: '/contact-us' }],
  content: contactContent
}));
console.log('Generated contact-us.html');

// 4. Privacy Policy (privacy-policy.html)
const privacyContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Legal Documentation</span>
      <h1 class="page-title">Privacy Policy</h1>
      <p class="page-subtitle">
        How the Allied Muslim Chamber of Business protects, processes, and respects the private commercial data of our members.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 800px;">
      <h2 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">1. Overview and Commitment</h2>
      <p style="font-size: 15px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
        The Allied Muslim Chamber of Business ("AMCOB", "we", "us", or "our") respects your privacy and is committed to protecting your personal and business information. This Privacy Policy describes how we collect, use, and protect your information when you access amcob.org, participate in our programs, or list your business in our public directory.
      </p>

      <h2 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">2. Confidentiality in Peer Advisory Groups</h2>
      <p style="font-size: 15px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
        All Peer Advisory Group (PAG) sessions operate under strict peer confidentiality standards. Financial disclosures, internal business metrics, and strategic discussions shared within closed cohort meetings are strictly confidential and are never shared, sold, or published outside the private cohort.
      </p>

      <h2 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">3. Information We Collect</h2>
      <p style="font-size: 15px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
        We collect information provided directly by members during application, onboarding, directory listing submissions, and event registrations. This includes contact details (name, email, phone number), commercial profiles (company name, category, website, location), and membership tier selections.
      </p>

      <h2 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">4. Public Directory Listings</h2>
      <p style="font-size: 15px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
        Information submitted for inclusion in the AMCOB Business Directory is made publicly discoverable to foster B2B commerce. Members may request updates, corrections, or removal of their public directory listings at any time by contacting directory@amcob.org.
      </p>

      <h2 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">5. Third Party Disclosures</h2>
      <p style="font-size: 15px; color: var(--text-body); margin-bottom: 24px; line-height: 1.65;">
        AMCOB does not sell, rent, or trade member contact records or commercial information to third-party marketing companies. Data is shared only with verified operational service providers required for event check-in, authentication, or payment processing.
      </p>
    </div>
  </section>
`;

fs.writeFileSync('privacy-policy.html', renderLayout({
  title: 'Privacy Policy | AMCOB Legal Terms',
  description: 'Official privacy policy and confidential data standards of the Allied Muslim Chamber of Business.',
  activeNav: '',
  breadcrumbs: [{ label: 'Privacy Policy', url: '/privacy-policy' }],
  content: privacyContent
}));
console.log('Generated privacy-policy.html');

// 5. Resource Center (resources.html)
const resourcesContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Knowledge Infrastructure</span>
      <h1 class="page-title">AMCOB Resource Center</h1>
      <p class="page-subtitle">
        Curated strategic intelligence, executive book summaries, thought leadership articles, and chamber publications.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid-3">
        <!-- Resource 1: Executive Library -->
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 12px;">Executive Library</span>
          <h3 class="card-title">Executive Book Summaries</h3>
          <p class="card-meta">64 Comprehensive Syntheses</p>
          <p class="card-body">
            Actionable executive summaries of the most influential leadership, management, and business strategy books, curated specifically for busy founders.
          </p>
          <div class="card-footer">
            <a href="/books" class="btn btn-primary btn-sm">Explore Library &rarr;</a>
          </div>
        </div>

        <!-- Resource 2: Editorial Hub -->
        <div class="card">
          <span class="badge badge-blue" style="width: fit-content; margin-bottom: 12px;">Editorial Insights</span>
          <h3 class="card-title">Thought Leadership &amp; Articles</h3>
          <p class="card-meta">190 In-Depth Articles</p>
          <p class="card-body">
            In-depth analysis covering the American Muslim business economy, revenue growth strategies, legal structures, and halal enterprise scaling.
          </p>
          <div class="card-footer">
            <a href="/blog" class="btn btn-primary btn-sm">Read Articles &rarr;</a>
          </div>
        </div>

        <!-- Resource 3: Business Directory -->
        <div class="card">
          <span class="badge badge-emerald" style="width: fit-content; margin-bottom: 12px;">Chamber Directory</span>
          <h3 class="card-title">Verified Member Directory</h3>
          <p class="card-meta">372 Verified Enterprises</p>
          <p class="card-body">
            Search our vetted roster of Muslim-owned enterprises across healthcare, technology, corporate finance, legal counsel, and logistics.
          </p>
          <div class="card-footer">
            <a href="/business-directory" class="btn btn-primary btn-sm">Search Directory &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('resources.html', renderLayout({
  title: 'Resource Center | Executive Intelligence & Library',
  description: 'Curated knowledge infrastructure for Muslim entrepreneurs, including executive book reviews, market insights, and business directories.',
  activeNav: '',
  breadcrumbs: [{ label: 'Resource Center', url: '/resources' }],
  content: resourcesContent
}));
console.log('Generated resources.html');
