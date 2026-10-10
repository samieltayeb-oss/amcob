const fs = require('fs');
const { renderLayout } = require('./site-layout');

const content = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Executive Engagement</span>
      <h1 class="page-title">Lead, Connect, and Make an Impact</h1>
      <p class="page-subtitle">
        Together, we empower the next generation of Muslim business leaders, foster innovation, and build a thriving commercial ecosystem where enterprises and communities flourish.
      </p>
    </div>
  </section>

  <!-- Engagement Banner CTA -->
  <section class="section" style="padding-top: 0;">
    <div class="container">
      <div style="background: linear-gradient(135deg, var(--brand-navy) 0%, #152438 100%); color: #ffffff; padding: 48px; border-radius: 16px; margin-bottom: 56px; display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 12px;">Become a Driving Force</span>
          <h2 style="font-size: 28px; font-weight: 800; color: #ffffff; margin-bottom: 12px;">
            Become a Driving Force for Muslim Business Success
          </h2>
          <p style="font-size: 16px; color: rgba(255, 255, 255, 0.85); line-height: 1.65; max-width: 720px; margin: 0;">
            AMCOB offers a variety of structured ways for you to get involved and make a tangible difference in the commercial ecosystem while accessing the full benefits of our private executive network.
          </p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; min-width: 200px;">
          <a href="/join" class="btn btn-primary" style="text-align: center;">Apply for Membership</a>
          <a href="#ways-to-engage" class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.4); text-align: center;">Explore Pathways &darr;</a>
        </div>
      </div>

      <!-- Ways to Engage Heading -->
      <div id="ways-to-engage" style="text-align: center; max-width: 680px; margin: 0 auto 48px auto;">
        <span class="badge badge-gold" style="margin-bottom: 10px;">Strategic Pathways</span>
        <h2 class="section-title">Get Involved with AMCOB</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Choose the pathway that matches how you want to contribute, connect, and expand your enterprise across our North American chamber.
        </p>
      </div>

      <!-- 4 Pathways Grid -->
      <div class="grid-2" style="gap: 32px;">
        <!-- Pathway 1: Ambassador Program -->
        <div class="card" style="padding: 36px; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="badge badge-gold">Regional Leadership</span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">01 / 04</span>
            </div>
            <h3 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px;">
              Chapter Ambassador Program
            </h3>
            <p style="font-size: 14px; color: var(--brand-gold); font-weight: 600; margin-bottom: 14px;">
              Champion Muslim Businesses in Your City
            </p>
            <p style="font-size: 15px; color: var(--text-body); line-height: 1.65; margin-bottom: 24px;">
              Become an official AMCOB Ambassador and serve as a regional voice for the organization. Represent our mission, host quarterly regional dinner mixers, welcome new members, and build high-trust commercial relationships in your metropolitan hub.
            </p>
          </div>
          <div>
            <a href="/ambassador-program" class="btn btn-primary btn-sm" style="width: 100%; text-align: center;">
              Explore Ambassador Program &rarr;
            </a>
          </div>
        </div>

        <!-- Pathway 2: Investment Opportunities -->
        <div class="card" style="padding: 36px; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="badge badge-blue">Capital &amp; Ventures</span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">02 / 04</span>
            </div>
            <h3 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px;">
              Investment Opportunities
            </h3>
            <p style="font-size: 14px; color: var(--brand-gold); font-weight: 600; margin-bottom: 14px;">
              Invest in High-Growth Muslim-Led Enterprises
            </p>
            <p style="font-size: 15px; color: var(--text-body); line-height: 1.65; margin-bottom: 24px;">
              Access curated, ethical investment opportunities spanning technology startups, healthcare ventures, supply chain infrastructure, and commercial real estate syndications vetted by seasoned industry operators.
            </p>
          </div>
          <div>
            <a href="/opportunities" class="btn btn-primary btn-sm" style="width: 100%; text-align: center;">
              View Investment Opportunities &rarr;
            </a>
          </div>
        </div>

        <!-- Pathway 3: Corporate Sponsorship -->
        <div class="card" style="padding: 36px; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="badge badge-emerald">Institutional Support</span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">03 / 04</span>
            </div>
            <h3 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px;">
              Corporate Sponsorship
            </h3>
            <p style="font-size: 14px; color: var(--brand-gold); font-weight: 600; margin-bottom: 14px;">
              Support the Vision &amp; Gain Executive Exposure
            </p>
            <p style="font-size: 15px; color: var(--text-body); line-height: 1.65; margin-bottom: 24px;">
              Partner with AMCOB at annual summits, national leadership conferences, and executive dinners. Align your corporate brand with ethical economic empowerment and connect with high-net-worth enterprise decision-makers.
            </p>
          </div>
          <div>
            <a href="/sponsorship" class="btn btn-primary btn-sm" style="width: 100%; text-align: center;">
              Become a Corporate Sponsor &rarr;
            </a>
          </div>
        </div>

        <!-- Pathway 4: Advertisement -->
        <div class="card" style="padding: 36px; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="badge" style="background-color: var(--bg-subtle); color: var(--brand-navy); border: 1px solid var(--border-light);">Market Reach</span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">04 / 04</span>
            </div>
            <h3 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px;">
              Chamber Advertisement
            </h3>
            <p style="font-size: 14px; color: var(--brand-gold); font-weight: 600; margin-bottom: 14px;">
              Amplify Your Brand to Thousands of Decision-Makers
            </p>
            <p style="font-size: 15px; color: var(--text-body); line-height: 1.65; margin-bottom: 24px;">
              Feature your business solutions in our verified commercial directory, executive email briefings, podcast episodes, and digital channels viewed by thousands of verified business owners across North America.
            </p>
          </div>
          <div>
            <a href="/advertisement" class="btn btn-primary btn-sm" style="width: 100%; text-align: center;">
              Explore Advertising Packages &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Community Impact Section -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 36px auto;">
        <span class="badge badge-gold" style="margin-bottom: 10px;">Chamber Network</span>
        <h2 class="section-title">Ready to Take Your Place at the Table?</h2>
        <p class="section-desc" style="margin: 0 auto 24px auto;">
          Whether through regional leadership, strategic sponsorship, or cohort membership, AMCOB is your gateway to verified peers.
        </p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="/join" class="btn btn-primary">Apply for Membership &rarr;</a>
          <a href="/contact-us" class="btn btn-secondary">Contact our Team</a>
        </div>
      </div>
    </div>
  </section>
`;

const html = renderLayout({
  title: 'Engage with AMCOB | Lead, Connect, and Make an Impact',
  description: 'Explore all the ways to engage with the Allied Muslim Chamber of Business: Ambassador Program, Investment Opportunities, Corporate Sponsorship, and Advertisement.',
  activeNav: 'engage',
  breadcrumbs: [
    { label: 'Engage', url: '/engage' }
  ],
  content
});

fs.writeFileSync('engage.html', html);
console.log('Successfully generated engage.html');
