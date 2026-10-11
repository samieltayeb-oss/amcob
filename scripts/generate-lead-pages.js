const fs = require('fs');
const path = require('path');
const { renderLayout, esc } = require('./site-layout');

// Helper to sanitize prose dashes and buzzwords
function cleanCopy(str) {
  if (!str) return '';
  return str
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/–/g, '-')
    .replace(/\s+-\s+/g, ': ')
    .replace(/\bunlock your potential\b/gi, 'reach your potential')
    .replace(/\belevate your journey\b/gi, 'advance your path')
    .replace(/\bseamless ecosystem\b/gi, 'integrated network')
    .replace(/\btransformative experience\b/gi, 'meaningful experience')
    .replace(/\bwhere ambition meets opportunity\b/gi, 'where ambition connects with opportunity')
    .replace(/\bdelve into\b/gi, 'examine')
    .replace(/\btapestry of\b/gi, 'mosaic of')
    .replace(/\btestament to\b/gi, 'evidence of')
    .replace(/\bgame-changer\b/gi, 'catalyst')
    .replace(/\bgame changer\b/gi, 'catalyst')
    .replace(/\bcutting-edge\b/gi, 'advanced')
    .replace(/\bcutting edge\b/gi, 'advanced')
    .replace(/class="MsoNormal"/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Load data
const speakers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/lead-speakers.json'), 'utf8'));
const sponsors = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/lead-sponsorship.json'), 'utf8'));
const summit = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/lead-summit.json'), 'utf8'));
const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/lead-articles.json'), 'utf8'));
const houston = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/lead-houston.json'), 'utf8'));
let scrapedFaqs = [];
try {
  scrapedFaqs = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/lead-faqs-scraped.json'), 'utf8'));
} catch (e) {
  scrapedFaqs = summit.faqs || [];
}

// 16 Official Summit Sponsor Logos
const sponsorLogos = [
  { name: 'IHT Wealth Management', file: '/assets/optimized/lead/sponsors/IHT_Logo.png' },
  { name: 'Merger Lawyer', file: '/assets/optimized/lead/sponsors/merger-lawyer-logo.webp' },
  { name: 'Aprosoft', file: '/assets/optimized/lead/sponsors/aprosoft-logo.png' },
  { name: 'Optimize', file: '/assets/optimized/lead/sponsors/optimize-logo.png' },
  { name: 'Invest Serene', file: '/assets/optimized/lead/sponsors/invest-serene.webp' },
  { name: 'HHRD', file: '/assets/optimized/lead/sponsors/HHRDLogo.png' },
  { name: 'Med Aura', file: '/assets/optimized/lead/sponsors/med-aura-logo.webp' },
  { name: 'Önal Gallant & Partners PC', file: '/assets/optimized/lead/sponsors/onal-gallant-logo.png' },
  { name: 'The Neighbor Project', file: '/assets/optimized/lead/sponsors/TheNeighborProject.webp' },
  { name: 'Synergy Financial', file: '/assets/optimized/lead/sponsors/synerygy-logo.webp' },
  { name: 'Halal Outreach', file: '/assets/optimized/lead/sponsors/halaloutreach-logo.png' },
  { name: 'KodeKaizen', file: '/assets/optimized/lead/sponsors/kodekaizen-logo-white.png' },
  { name: 'Guidance Residential', file: '/assets/optimized/lead/sponsors/guidance-residential.png' },
  { name: 'Autism Care Therapy', file: '/assets/optimized/lead/sponsors/autism-care-therapy.webp' },
  { name: 'Trivium Global', file: '/assets/optimized/lead/sponsors/trivium-global.png' },
  { name: 'SourceMotive', file: '/assets/optimized/lead/sponsors/sourcemotive-white.png' }
];

// 6 Community Partner Logos
const partnerLogos = [
  { name: 'LaunchGood', file: '/assets/optimized/lead/partners/launchgood-logo-primary.svg' },
  { name: 'OPEN Global', file: '/assets/optimized/lead/partners/open-global-logo.png' },
  { name: 'PCC USA', file: '/assets/optimized/lead/partners/pcc-usa-logo.png' },
  { name: 'Illinois Muslim Chamber of Commerce', file: '/assets/optimized/lead/partners/illinois-muslim-logo.png' },
  { name: 'Muslim Professionals', file: '/assets/optimized/lead/partners/muslim-professionals.png' },
  { name: 'IBA Karachi', file: '/assets/optimized/lead/partners/iba-logo.png' }
];

// Ensure output dirs
const leadDir = path.join(__dirname, '../lead');
const leadBlogDir = path.join(leadDir, 'blog');
if (!fs.existsSync(leadDir)) fs.mkdirSync(leadDir, { recursive: true });
if (!fs.existsSync(leadBlogDir)) fs.mkdirSync(leadBlogDir, { recursive: true });

// Common standalone LEAD brand layout wrapper options
const leadLayoutDefaults = {
  brandLogo: '/assets/optimized/lead/lead-logo.svg',
  brandUrl: '/lead',
  brandTitle: 'LEAD Summit Anaheim | AMCOB Flagship',
  brandLogoWidth: 150,
  activeNav: 'lead'
};

// Sub-navigation bar for LEAD section
function renderLeadSubnav(activeTab = 'overview') {
  const tabs = [
    { id: 'overview', label: 'Summit Overview', url: '/lead' },
    { id: 'speakers', label: 'Speakers (' + speakers.length + ')', url: '/lead/speakers' },
    { id: 'sponsorship', label: 'Sponsorship Packages', url: '/lead/sponsorship' },
    { id: 'tickets', label: 'Register & Passes', url: '/lead/tickets' },
    { id: 'agenda', label: '3-Day Agenda', url: '/lead/agenda' },
    { id: 'expo', label: 'Business Expo', url: '/lead#expo' },
    { id: 'hotel', label: 'Hotel & Travel', url: '/lead/hotel' },
    { id: 'houston', label: 'Houston Retrospective', url: '/lead/houston' },
    { id: 'blog', label: 'Summit Editorial (' + articles.length + ')', url: '/lead/blog' }
  ];

  return `
    <div style="background: rgba(6, 18, 51, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(212, 175, 55, 0.25); position: sticky; top: 76px; z-index: 900;">
      <div class="container" style="display: flex; gap: 8px; overflow-x: auto; padding: 10px 16px; scrollbar-width: none;">
        ${tabs.map(t => `
          <a href="${t.url}" style="
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            border-radius: 999px;
            font-size: 13.5px;
            font-weight: 600;
            white-space: nowrap;
            text-decoration: none;
            transition: all 0.2s ease;
            ${t.id === activeTab 
              ? 'background: #ce8924; color: #ffffff; box-shadow: 0 2px 8px rgba(206,137,36,0.35);' 
              : 'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.1);'}
          ">${t.label}</a>
        `).join('')}
      </div>
    </div>
  `;
}

console.log('Generating comprehensive LEAD Summit standalone pages...');

// ==========================================
// 1. LEAD Index (Master Anaheim 2027 Portal)
// ==========================================
const indexContent = `
  ${renderLeadSubnav('overview')}

  <!-- Summit Master Hero -->
  <section style="background: linear-gradient(135deg, #040c1e 0%, #081738 50%, #0d266e 100%); color: #ffffff; padding: 72px 0 64px 0; position: relative; overflow: hidden; border-bottom: 1px solid rgba(212,175,55,0.25);">
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 85% 15%, rgba(206,137,36,0.18) 0%, transparent 60%); pointer-events: none;"></div>
    
    <div class="container" style="max-width: 1140px; margin: 0 auto; position: relative; z-index: 2;">
      <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 48px; align-items: center;">
        <div>
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 18px; flex-wrap: wrap;">
            <span class="badge" style="background: rgba(206,137,36,0.25); color: #f59e0b; border: 1px solid rgba(206,137,36,0.45); text-transform: uppercase; letter-spacing: 0.08em; font-size: 11.5px; padding: 6px 14px; font-weight: 700;">
              Flagship Annual Gathering
            </span>
            <span style="font-size: 13px; color: rgba(255,255,255,0.75); font-weight: 600;">
              Anaheim, CA &bull; March 26 to 28, 2027
            </span>
          </div>

          <h1 style="font-size: clamp(2rem, 3.8vw, 3.1rem); font-weight: 800; line-height: 1.15; color: #ffffff; font-family: var(--font-serif); margin-bottom: 20px;">
            The 48-Hour Reset for Muslim Business Leaders
          </h1>

          <p style="font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.85); margin-bottom: 24px;">
            Three days. Exactly 300 seats. One room engineered to deliver what most conferences promise and fail to provide: reconnecting you to strategic purpose, putting real capital in front of you, and placing you in an enduring peer circle.
          </p>

          <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 32px;">
            <a href="/lead/tickets" class="btn btn-primary" style="padding: 14px 30px; font-size: 15px; font-weight: 700; background: #ce8924; border-color: #ce8924;">
              Claim Your Seat &rarr;
            </a>
            <a href="/lead/sponsorship" class="btn btn-secondary" style="padding: 14px 26px; font-size: 15px; font-weight: 700; background: rgba(255,255,255,0.08); color: #ffffff; border: 1px solid rgba(255,255,255,0.25);">
              Sponsor the Summit
            </a>
          </div>

          <div style="display: flex; gap: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.12);">
            <div>
              <div style="font-size: 26px; font-weight: 800; color: #f59e0b;">300</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.65); text-transform: uppercase;">Capped Capacity</div>
            </div>
            <div>
              <div style="font-size: 26px; font-weight: 800; color: #f59e0b;">16</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.65); text-transform: uppercase;">Keynotes &amp; Panels</div>
            </div>
            <div>
              <div style="font-size: 26px; font-weight: 800; color: #f59e0b;">$25M+</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.65); text-transform: uppercase;">Member Pipeline</div>
            </div>
          </div>
        </div>

        <div>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 28px; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
            <div style="position: relative; border-radius: 10px; overflow: hidden; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);">
              <img src="/assets/optimized/lead/hero-poster.webp" alt="LEAD Summit Highlight Preview" style="width: 100%; height: auto; display: block;">
              <div style="position: absolute; inset: 0; background: rgba(6,18,51,0.4); display: flex; align-items: center; justify-content: center;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #ce8924; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 22px; box-shadow: 0 4px 16px rgba(0,0,0,0.5);">
                  &#9654;
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #ce8924; letter-spacing: 0.08em;">Official Host Hotel</span>
              <span style="font-size: 13px; color: rgba(255,255,255,0.7);">$550 for 3 Nights</span>
            </div>
            <h3 style="font-size: 19px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Anaheim Executive Convention Center</h3>
            <p style="font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,0.75); margin-bottom: 18px;">
              Discounted room blocks and executive shuttle transfers available directly for registered summit delegates.
            </p>
            <a href="/lead/hotel" class="btn btn-outline btn-sm" style="width: 100%; text-align: center; color: #ffffff; border-color: rgba(255,255,255,0.3);">
              View Hotel &amp; Travel Guide &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Built For Everyone in the Room (Interactive 3-Tab Component) -->
  <section class="section" id="for-everyone" style="background: #ffffff; border-bottom: 1px solid var(--border-light);">
    <div class="container" style="max-width: 1100px;">
      <div style="text-align: center; max-width: 800px; margin: 0 auto 36px auto;">
        <span class="badge" style="background: rgba(206,137,36,0.12); color: #b45309; border: 1px solid rgba(206,137,36,0.3); text-transform: uppercase; font-size: 11.5px; padding: 5px 12px; font-weight: 700; margin-bottom: 10px;">
          Built For Everyone in the Room
        </span>
        <h2 style="font-size: 32px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif); margin-bottom: 12px;">
          Whatever Seat You Take, You Walk Out With Something You Did Not Have Friday Morning
        </h2>
        <p style="font-size: 16px; color: var(--text-muted); line-height: 1.65; margin: 0;">
          Select your role to explore the tailored deliverables and commercial advantages engineered into every summit session.
        </p>
      </div>

      <!-- Tab Buttons -->
      <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 32px;">
        <button type="button" class="fe-tab-btn active" onclick="switchLeadTab('attendees')" id="btn-attendees" style="padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; background: #ce8924; color: #ffffff; border: 1px solid #ce8924;">
          Attendees (8 Outcomes)
        </button>
        <button type="button" class="fe-tab-btn" onclick="switchLeadTab('exhibitors')" id="btn-exhibitors" style="padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; background: var(--bg-subtle); color: var(--brand-navy); border: 1px solid var(--border-light);">
          Exhibitors (7 Deliverables)
        </button>
        <button type="button" class="fe-tab-btn" onclick="switchLeadTab('sponsors')" id="btn-sponsors" style="padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; background: var(--bg-subtle); color: var(--brand-navy); border: 1px solid var(--border-light);">
          Sponsors (6 Advantages)
        </button>
      </div>

      <!-- Tab Panes -->
      <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 16px; padding: 36px; box-shadow: var(--shadow-sm);">
        <!-- Attendees Pane -->
        <div id="pane-attendees" class="fe-tab-pane" style="display: block;">
          <h3 style="font-size: 20px; font-weight: 750; color: var(--brand-navy); margin-bottom: 18px;">
            Core Deliverables for Registered Summit Attendees
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Leave with a clearer answer to why you are building your enterprise than you arrived with, backed by a room of peers who hold you to it.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Receive an objective personal behavioral and cognitive assessment profiling how you think, decide, and lead best under pressure.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Take home a practical, AMCOB-built playbook for closing enterprise contracts: an operational working tool rather than generic theory.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Learn directly from founders who have built, scaled, and exited real high-growth companies across North America.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Join focused breakout tracks on executive leadership, operational scaling, and top-tier talent acquisition.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Participate in capital and equity funding discussions directly with active private equity allocators and financial advisors.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Connect with relevant commercial buyers and potential partners through curated, ICP-based peer matching sessions.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Form an enduring peer accountability circle that meets regularly across the year to review milestones and KPIs.</p>
            </div>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="/lead/tickets" class="btn btn-primary" style="background: #ce8924; border-color: #ce8924;">Claim an Attendee Seat &rarr;</a>
          </div>
        </div>

        <!-- Exhibitors Pane -->
        <div id="pane-exhibitors" class="fe-tab-pane" style="display: none;">
          <h3 style="font-size: 20px; font-weight: 750; color: var(--brand-navy); margin-bottom: 18px;">
            Commercial Advantages for Business Expo Exhibitors
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Put your product in front of 300 business leaders who are actively building, actively hiring, and actively buying.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Showcase your commercial solutions directly to 300 qualified decision-makers with corporate budget authority.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Generate qualified high-intent sales leads across three full days in the dedicated convention expo hall.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Gain prominent brand visibility with dedicated booth frontage, physical signage, and printed summit guides.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Engage founders, corporate executives, and capital allocators in focused, non-crowded conversation spaces.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Build lasting commercial supplier relationships within a curated, high-trust peer environment.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Extend your commercial exposure into future LEAD Summit regional tour cities across North America.</p>
            </div>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="#expo" class="btn btn-primary" style="background: #ce8924; border-color: #ce8924;">Reserve Expo Booth ($1,800) &rarr;</a>
          </div>
        </div>

        <!-- Sponsors Pane -->
        <div id="pane-sponsors" class="fe-tab-pane" style="display: none;">
          <h3 style="font-size: 20px; font-weight: 750; color: var(--brand-navy); margin-bottom: 18px;">
            Strategic Impact for Corporate Summit Sponsors
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Attach your name to the room Muslim business leaders reference for the rest of the year, not just another conference.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Position your brand in front of 300 high-caliber enterprise founders, corporate leaders, and institutional innovators.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Gain premium visibility through mainstage positioning, digital channels, and physical signage across all three days.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Align your organization with a respected, mission-driven national chamber dedicated to ethical business advancement.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Access warm personal introductions to high-growth entrepreneurs, family office managers, and institutional investors.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start; background: #ffffff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-light);">
              <span style="color: var(--brand-emerald); font-weight: bold; font-size: 16px;">&#10003;</span>
              <p style="font-size: 14px; line-height: 1.55; color: var(--text-body); margin: 0;">Advertise in official printed summit materials with full-page and half-page institutional editorial spreads.</p>
            </div>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="/lead/sponsorship" class="btn btn-primary" style="background: #ce8924; border-color: #ce8924;">Explore 11 Sponsor Tiers &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- The 5 Pillars of the 48-Hour Reset -->
  <section class="section" style="background: #ffffff;">
    <div class="container" style="max-width: 1140px;">
      <div style="text-align: center; max-width: 760px; margin: 0 auto 48px auto;">
        <span class="badge" style="background: rgba(206,137,36,0.12); color: #b45309; border: 1px solid rgba(206,137,36,0.3); text-transform: uppercase; letter-spacing: 0.08em; font-size: 11.5px; padding: 5px 12px; font-weight: 700; margin-bottom: 10px;">
          The Architecture of LEAD
        </span>
        <h2 style="font-size: 32px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif); margin-bottom: 12px;">
          Five Tangible Outcomes You Walk Away With
        </h2>
        <p style="font-size: 16px; color: var(--text-muted); line-height: 1.65; margin: 0;">
          Unlike sprawling commercial conferences where attendees wander between passive presentations, LEAD is an intensive executive working summit designed around five concrete deliverables.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 28px;">
          <div style="font-size: 13px; font-weight: 700; color: #ce8924; margin-bottom: 8px;">PILLAR 01</div>
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px;">Personal Cognitive Assessment</h3>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-body); margin: 0;">
            Every full summit attendee receives an objective cognitive and behavioral assessment profiling your natural leadership style, communication dynamics, and decision patterns under pressure.
          </p>
        </div>

        <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 28px;">
          <div style="font-size: 13px; font-weight: 700; color: #ce8924; margin-bottom: 8px;">PILLAR 02</div>
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px;">Enduring Peer Advisory Board</h3>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-body); margin: 0;">
            You will be placed in a revenue-matched peer cohort facilitated by certified moderators, establishing relationships that continue holding you accountable long after the summit concludes.
          </p>
        </div>

        <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 28px;">
          <div style="font-size: 13px; font-weight: 700; color: #ce8924; margin-bottom: 8px;">PILLAR 03</div>
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px;">Deal-Making &amp; Commercial Capital</h3>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-body); margin: 0;">
            Direct introductions to capital allocators, commercial bankers, M&amp;A legal counsel, and potential corporate customers actively seeking vetted Muslim-owned suppliers.
          </p>
        </div>

        <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 28px;">
          <div style="font-size: 13px; font-weight: 700; color: #ce8924; margin-bottom: 8px;">PILLAR 04</div>
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px;">Tactical Deal Closing Framework</h3>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-body); margin: 0;">
            Masterclasses led by experienced practitioners on enterprise negotiation, B2B contract structuring, and systematic sales pipelines tailored for executive teams.
          </p>
        </div>

        <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 28px;">
          <div style="font-size: 13px; font-weight: 700; color: #ce8924; margin-bottom: 8px;">PILLAR 05</div>
          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px;">Ethical &amp; Faith-Aligned Purpose</h3>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-body); margin: 0;">
            Grounding your commercial ambition in timeless Islamic commercial ethics, fiduciary responsibility, and collective generational wealth creation for the community.
          </p>
        </div>

        <div style="background: #061233; color: #ffffff; border-radius: 12px; padding: 28px; display: flex; flex-direction: column; justify-content: center;">
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 10px; color: #f59e0b;">300 Seats. Small on Purpose.</h3>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.85); margin-bottom: 16px;">
            To preserve the authentic peer environment, registration closes once all 300 seats are allocated.
          </p>
          <a href="/lead/tickets" class="btn btn-primary btn-sm" style="background: #ce8924; border-color: #ce8924; align-self: flex-start;">
            Check Seat Availability &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Speakers Spotlight -->
  <section class="section" style="background: var(--bg-subtle); border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
    <div class="container" style="max-width: 1140px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; flex-wrap: wrap; gap: 16px;">
        <div>
          <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #ce8924; letter-spacing: 0.08em;">Confirmed Keynotes &amp; Faculty</span>
          <h2 style="font-size: 30px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif); margin-top: 4px;">
            The Leaders Who Show Up and Do the Work
          </h2>
        </div>
        <a href="/lead/speakers" class="btn btn-outline btn-sm">View All 16 Speakers &rarr;</a>
      </div>

      <div class="grid-4">
        ${speakers.slice(0, 8).map(sp => `
          <div class="card" style="padding: 20px; text-align: center;">
            <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; margin: 0 auto 16px auto; border: 2px solid #ce8924; background: #ffffff;">
              <img src="${sp.image}" alt="${esc(sp.name)}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
            </div>
            ${sp.isKeynote ? `
              <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; border: 1px solid rgba(206,137,36,0.3); font-size: 10.5px; margin-bottom: 8px;">Keynote Speaker</span>
            ` : `
              <span class="badge" style="background: var(--bg-subtle); color: var(--brand-navy); border: 1px solid var(--border-light); font-size: 10.5px; margin-bottom: 8px;">Executive Faculty</span>
            `}
            <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">${esc(sp.name)}</h3>
            <p style="font-size: 12.5px; line-height: 1.45; color: var(--text-muted); margin: 0;">${cleanCopy(sp.title)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- The Business Expo Section -->
  <section class="section" id="expo" style="background: #ffffff;">
    <div class="container" style="max-width: 1140px;">
      <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 48px; align-items: center;">
        <div>
          <span class="badge" style="background: rgba(206,137,36,0.12); color: #b45309; border: 1px solid rgba(206,137,36,0.3); text-transform: uppercase; font-size: 11.5px; padding: 5px 12px; font-weight: 700; margin-bottom: 12px;">
            Commercial Exhibition
          </span>
          <h2 style="font-size: 32px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif); margin-bottom: 16px;">
            The Business Expo Floor
          </h2>
          <p style="font-size: 16px; line-height: 1.7; color: var(--text-body); margin-bottom: 16px;">
            The LEAD Summit Anaheim Expo is built into the fabric of the summit. Over three days, the expo floor puts you face to face with businesses, service providers, and decision-makers who are there for one reason: to do business.
          </p>
          <p style="font-size: 15.5px; line-height: 1.7; color: var(--text-muted); margin-bottom: 24px;">
            This is not a trade show floor with 200 tables and foot traffic that never converts. It is a curated room of 300 verified commercial buyers. This is one of the most targeted business networking events in Anaheim.
          </p>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="mailto:info@amcob.org?subject=LEAD%20Summit%20Expo%20Booth%20Reservation" class="btn btn-primary" style="background: #ce8924; border-color: #ce8924;">
              Reserve Standard Booth ($1,800) &rarr;
            </a>
            <a href="/lead/sponsorship" class="btn btn-outline">
              Compare All 11 Sponsor Tiers
            </a>
          </div>
        </div>

        <div>
          <div class="card" style="border: 2px solid #ce8924; padding: 32px; background: var(--bg-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
              <span class="badge" style="background: #ce8924; color: #ffffff; font-size: 11px;">Standard Booth</span>
              <div style="font-size: 32px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif);">$1,800</div>
            </div>
            <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
              LEAD Summit Anaheim Expo &bull; 3 Days on the Floor
            </div>

            <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; color: var(--text-body);">
              <li style="display: flex; gap: 8px; align-items: baseline;">
                <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                <span>Full 3-day summit floor access</span>
              </li>
              <li style="display: flex; gap: 8px; align-items: baseline;">
                <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                <span>Total 2 passes: 1 Booth Pass plus 1 Staff Pass</span>
              </li>
              <li style="display: flex; gap: 8px; align-items: baseline;">
                <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                <span>Dedicated banner and physical signage space</span>
              </li>
              <li style="display: flex; gap: 8px; align-items: baseline;">
                <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                <span>Brand visibility in printed guide and mobile portal</span>
              </li>
              <li style="display: flex; gap: 8px; align-items: baseline;">
                <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                <span>Direct lead generation before 300 business leaders</span>
              </li>
            </ul>

            <div style="font-size: 12px; color: #b45309; background: rgba(206,137,36,0.12); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(206,137,36,0.25);">
              Booth count is strictly capped to keep the floor curated, not crowded.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 16 Official Sponsor Logos & 6 Community Partners Grid -->
  <section class="section" style="background: linear-gradient(135deg, #040c1e 0%, #0a193b 100%); color: #ffffff; border-top: 1px solid rgba(212,175,55,0.25); border-bottom: 1px solid rgba(212,175,55,0.25);">
    <div class="container" style="max-width: 1140px;">
      <div style="text-align: center; max-width: 760px; margin: 0 auto 40px auto;">
        <span class="badge" style="background: rgba(206,137,36,0.2); color: #f59e0b; border: 1px solid rgba(206,137,36,0.4); text-transform: uppercase; font-size: 11px; padding: 5px 12px; font-weight: 700; margin-bottom: 10px;">
          Commercial Backers
        </span>
        <h2 style="font-size: 30px; font-weight: 800; color: #ffffff; font-family: var(--font-serif); margin-bottom: 12px;">
          Organizations Who Made LEAD Summit Possible
        </h2>
        <p style="font-size: 15px; color: rgba(255,255,255,0.75); margin: 0;">
          We honor the enterprise sponsors and corporate partners who champion ethical business leadership and commercial innovation.
        </p>
      </div>

      <!-- 16 Official Sponsor Logos Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 16px; margin-bottom: 48px;">
        ${sponsorLogos.map(s => `
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 18px 20px; display: flex; align-items: center; justify-content: center; min-height: 85px; transition: transform 0.2s ease, border-color 0.2s ease;">
            <img src="${s.file}" alt="${esc(s.name)}" title="${esc(s.name)}" style="max-height: 48px; max-width: 130px; object-fit: contain; filter: brightness(1);" loading="lazy">
          </div>
        `).join('')}
      </div>

      <!-- 6 Community Partners Grid -->
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #ce8924; letter-spacing: 0.08em;">
          Community Partners &amp; Chambers
        </span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
        ${partnerLogos.map(p => `
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; justify-content: center; min-height: 80px;">
            <img src="${p.file}" alt="${esc(p.name)}" title="${esc(p.name)}" style="max-height: 44px; max-width: 130px; object-fit: contain;" loading="lazy">
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Founder Note: Why We Built This (Kashif Zubair) -->
  <section style="background: #040c1e; color: #ffffff; padding: 72px 0; border-bottom: 1px solid rgba(212,175,55,0.25);">
    <div class="container" style="max-width: 860px; margin: 0 auto; text-align: center;">
      <span class="badge" style="background: rgba(206,137,36,0.2); color: #f59e0b; border: 1px solid rgba(206,137,36,0.4); text-transform: uppercase; font-size: 11px; padding: 5px 14px; font-weight: 700; margin-bottom: 16px; display: inline-block;">
        A Note From AMCOB Leadership
      </span>
      <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; font-family: var(--font-serif); margin-bottom: 28px;">
        Why We Built This
      </h2>
      <blockquote style="font-size: 17.5px; line-height: 1.8; color: rgba(255,255,255,0.9); font-style: italic; margin: 0 0 28px 0; text-align: left; padding: 0 24px; border-left: 3px solid #ce8924;">
        <p style="margin-bottom: 16px;">"I have sat in enough rooms to know the difference between one that performs community and one that actually holds it."</p>
        <p style="margin-bottom: 16px;">"Most business conferences hand you a lanyard, a schedule, and a feed full of people you will never speak to again. We did not want to build that. We wanted a room where you could be a serious entrepreneur and a person of faith without translating yourself in either direction, where growing your business and growing your purpose were the same conversation, not two competing ones."</p>
        <p style="margin-bottom: 16px;">"AMCOB exists because too many of us have built successful companies while quietly wondering if success was ever really the point. The LEAD Summit is our answer to that question, compressed into 48 hours: a room built for founders who want to close deals on Saturday and still recognize themselves on Sunday."</p>
        <p style="margin-bottom: 20px;">"We did not build this to fill seats. We built it because the entrepreneurs in our community deserve one weekend a year that is entirely theirs. I hope you will be in the room."</p>
        <footer style="font-size: 15px; font-weight: 700; font-style: normal; color: #f59e0b;">
          Kashif Zubair &bull; Founder and President, AMCOB
        </footer>
      </blockquote>
    </div>
  </section>

  <!-- Multi-City Tour Pipeline -->
  <section class="section" style="background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
    <div class="container" style="max-width: 1140px;">
      <div style="text-align: center; max-width: 720px; margin: 0 auto 40px auto;">
        <span class="badge" style="background: rgba(206,137,36,0.12); color: #b45309; border: 1px solid rgba(206,137,36,0.3); text-transform: uppercase; font-size: 11.5px; padding: 5px 12px; font-weight: 700; margin-bottom: 10px;">
          North American Tour
        </span>
        <h2 style="font-size: 30px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif); margin-bottom: 10px;">
          The LEAD Summit Multi-City Series
        </h2>
        <p style="font-size: 15px; color: var(--text-muted); margin: 0;">
          From the flagship Anaheim summit to regional tour stops across the continent, AMCOB convenes Muslim enterprise leaders nationwide.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <div class="card" style="border: 2px solid #ce8924; background: #ffffff; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge" style="background: #ce8924; color: #ffffff; font-size: 10px;">Flagship Summit</span>
            <span style="font-size: 12px; font-weight: 700; color: #ce8924;">March 26 to 28, 2027</span>
          </div>
          <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">Anaheim, California</h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            300 capped seats. Complete 3-day reset with keynotes, peer circles, and capital lounge.
          </p>
          <a href="/lead/tickets" class="btn btn-primary btn-sm" style="width: 100%; text-align: center; background: #ce8924; border-color: #ce8924;">
            Reserve Anaheim Seat &rarr;
          </a>
        </div>

        <div class="card" style="border: 1px solid var(--border-light); background: #ffffff; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge" style="background: var(--bg-subtle); color: var(--brand-navy); font-size: 10px;">Inaugural Edition</span>
            <span style="font-size: 12px; font-weight: 600; color: var(--text-muted);">Completed</span>
          </div>
          <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">Houston, Texas</h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            250+ delegates gathered for keynotes by Omair Tariq, Aneesa Muthana, and industry leaders.
          </p>
          <a href="/lead/houston" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
            View Houston Recap &rarr;
          </a>
        </div>

        <div class="card" style="border: 1px solid var(--border-light); background: #ffffff; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; font-size: 10px;">Tour Series 2027</span>
            <span style="font-size: 12px; font-weight: 600; color: #ce8924;">Summer 2027</span>
          </div>
          <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">Calgary, Canada</h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            Convening Western Canadian Muslim founders, energy executives, and technology innovators.
          </p>
          <a href="/lead/tickets?city=calgary" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
            Calgary Waitlist &rarr;
          </a>
        </div>

        <div class="card" style="border: 1px solid var(--border-light); background: #ffffff; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; font-size: 10px;">Tour Series 2027</span>
            <span style="font-size: 12px; font-weight: 600; color: #ce8924;">Fall 2027</span>
          </div>
          <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">Chicago, Illinois</h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            Midwest executive summit uniting manufacturing leaders, healthcare networks, and venture founders.
          </p>
          <a href="/lead/tickets?city=chicago" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
            Chicago Waitlist &rarr;
          </a>
        </div>

        <div class="card" style="border: 1px solid var(--border-light); background: #ffffff; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; font-size: 10px;">Tour Series 2027</span>
            <span style="font-size: 12px; font-weight: 600; color: #ce8924;">Fall 2027</span>
          </div>
          <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">New Jersey / New York</h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            East Coast financial and corporate convening for Wall Street professionals, tech leaders, and entrepreneurs.
          </p>
          <a href="/lead/tickets?city=new-jersey" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
            Tri-State Waitlist &rarr;
          </a>
        </div>

        <div class="card" style="border: 1px solid var(--border-light); background: #ffffff; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; font-size: 10px;">Tour Series 2027</span>
            <span style="font-size: 12px; font-weight: 600; color: #ce8924;">Late 2027</span>
          </div>
          <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">Toronto, Canada</h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            Greater Toronto Area cross-border commercial summit for Canadian enterprises and international trade.
          </p>
          <a href="/lead/tickets?city=toronto" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
            Toronto Waitlist &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Tickets & Registration Section -->
  <section class="section" id="register" style="background: #ffffff;">
    <div class="container" style="max-width: 1100px;">
      <div style="text-align: center; max-width: 720px; margin: 0 auto 48px auto;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #ce8924; letter-spacing: 0.08em;">Registration Options</span>
        <h2 style="font-size: 32px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif); margin-top: 4px; margin-bottom: 12px;">
          Choose Your Summit Pass
        </h2>
        <p style="font-size: 15.5px; color: var(--text-muted); margin: 0;">
          All registrations include summit workbook materials and Halal-certified dining.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
        ${summit.ticketTiers.map(t => `
          <div class="card" style="border: 2px solid ${t.id === 1 ? '#ce8924' : 'var(--border-light)'}; position: relative; display: flex; flex-direction: column;">
            ${t.id === 1 ? `
              <div style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #ce8924; color: #ffffff; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 14px; border-radius: 999px;">
                Most Popular
              </div>
            ` : ''}
            <div style="margin-bottom: 20px;">
              <span class="badge" style="font-size: 11px; margin-bottom: 8px;">${esc(t.badge)}</span>
              <h3 style="font-size: 20px; font-weight: 750; color: var(--brand-navy); margin-bottom: 6px;">${esc(t.name)}</h3>
              <div style="font-size: 36px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif);">
                ${esc(t.priceFormatted)}
              </div>
              <p style="font-size: 13.5px; color: var(--text-muted); margin-top: 6px;">${esc(t.description)}</p>
            </div>

            <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 10px; font-size: 13px; color: var(--text-body); flex-grow: 1;">
              ${t.includes.map(inc => `
                <li style="display: flex; gap: 8px; align-items: baseline;">
                  <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                  <span>${cleanCopy(inc)}</span>
                </li>
              `).join('')}
            </ul>

            <a href="/lead/tickets?tier=${t.id}" class="btn ${t.id === 1 ? 'btn-primary' : 'btn-outline'}" style="width: 100%; text-align: center; ${t.id === 1 ? 'background: #ce8924; border-color: #ce8924;' : ''}">
              Select This Pass &rarr;
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Comprehensive FAQs (All 8 Authentically Scraped from lead.amcob.org) -->
  <section class="section" style="background: var(--bg-subtle); border-top: 1px solid var(--border-light);">
    <div class="container" style="max-width: 900px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #ce8924; letter-spacing: 0.08em;">Common Questions</span>
        <h2 style="font-size: 28px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif); margin-top: 4px;">
          Frequently Asked Questions
        </h2>
        <p style="font-size: 15px; color: var(--text-muted); margin-top: 6px;">
          Everything you need to know before securing your seat in Anaheim.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${scrapedFaqs.map(faq => `
          <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 10px; padding: 22px 26px;">
            <h3 style="font-size: 17px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">${cleanCopy(faq.q)}</h3>
            <p style="font-size: 14.5px; line-height: 1.65; color: var(--text-body); margin: 0;">${cleanCopy(faq.a)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Tab Switcher Script -->
  <script>
    function switchLeadTab(tabId) {
      const tabs = ['attendees', 'exhibitors', 'sponsors'];
      tabs.forEach(t => {
        const btn = document.getElementById('btn-' + t);
        const pane = document.getElementById('pane-' + t);
        if (t === tabId) {
          btn.style.background = '#ce8924';
          btn.style.color = '#ffffff';
          btn.style.borderColor = '#ce8924';
          pane.style.display = 'block';
        } else {
          btn.style.background = 'var(--bg-subtle)';
          btn.style.color = 'var(--brand-navy)';
          btn.style.borderColor = 'var(--border-light)';
          pane.style.display = 'none';
        }
      });
    }
  </script>
`;

const renderedIndex = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Anaheim 2027 | The 48-Hour Reset',
  description: 'A 3-day working summit for 300 Muslim entrepreneurs and executives in Anaheim, CA. Keynotes, peer advisory boards, and commercial deal-making.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }],
  content: indexContent
});
fs.writeFileSync(path.join(leadDir, 'index.html'), renderedIndex);
console.log('Generated lead/index.html');

// ==========================================
// 2. LEAD Speakers Page (lead/speakers.html)
// ==========================================
const speakersContent = `
  ${renderLeadSubnav('speakers')}

  <section class="page-intro">
    <div class="container" style="max-width: 960px;">
      <span class="page-intro-badge">Confirmed Leadership Faculty</span>
      <h1 class="page-title">LEAD Summit Anaheim Speakers</h1>
      <p class="page-subtitle">
        Meet the 16 founders, executives, investors, and coaches leading masterclasses, keynotes, and breakout tracks in Anaheim.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 1140px;">
      <div class="grid-3">
        ${speakers.map(sp => `
          <div class="card" style="padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; margin-bottom: 18px; border: 3px solid ${sp.isKeynote ? '#ce8924' : 'var(--border-light)'}; background: #ffffff;">
              <img src="${sp.image}" alt="${esc(sp.name)}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
            </div>
            ${sp.isKeynote ? `
              <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; border: 1px solid rgba(206,137,36,0.3); font-size: 11px; margin-bottom: 8px;">Keynote Address</span>
            ` : `
              <span class="badge" style="background: var(--bg-subtle); color: var(--brand-navy); border: 1px solid var(--border-light); font-size: 11px; margin-bottom: 8px;">Executive Faculty</span>
            `}
            <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px;">${esc(sp.name)}</h3>
            <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-body); margin-bottom: 18px; flex-grow: 1;">
              ${cleanCopy(sp.title)}
            </p>
            ${sp.linkedin ? `
              <a href="${sp.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 12px; display: inline-flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn Profile
              </a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

const renderedSpeakers = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Speakers | 16 Confirmed Executives & Keynotes',
  description: 'Explore the full speaker roster for LEAD Summit Anaheim 2027 including Omair Tariq, Aneesa Muthana, and Umair Khan.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }, { label: 'Speakers', url: '/lead/speakers' }],
  content: speakersContent
});
fs.writeFileSync(path.join(leadDir, 'speakers.html'), renderedSpeakers);
console.log('Generated lead/speakers.html');

// ===============================================
// 3. LEAD Sponsorship Page (lead/sponsorship.html)
// ===============================================
const sponsorshipContent = `
  ${renderLeadSubnav('sponsorship')}

  <section class="page-intro">
    <div class="container" style="max-width: 960px;">
      <span class="page-intro-badge">Corporate &amp; Commercial Partnerships</span>
      <h1 class="page-title">Put Your Brand in the Room</h1>
      <p class="page-subtitle">
        Direct brand placement and executive visibility before 300 verified Muslim business founders, corporate executives, and capital allocators in Anaheim.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 1140px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; margin-bottom: 48px;">
        ${sponsors.map(tier => `
          <div class="card" style="border: 1px solid var(--border-light); display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span class="badge" style="font-size: 11px;">${esc(tier.badge)}</span>
              <span style="font-size: 24px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif);">${esc(tier.price)}</span>
            </div>
            <h3 style="font-size: 20px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px;">${esc(tier.name)}</h3>
            <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-muted); margin-bottom: 16px;">
              ${cleanCopy(tier.description)}
            </p>

            <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-body); flex-grow: 1;">
              ${tier.features.map(f => `
                <li style="display: flex; gap: 8px; align-items: baseline;">
                  <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
                  <span>${cleanCopy(f)}</span>
                </li>
              `).join('')}
            </ul>

            <a href="mailto:info@amcob.org?subject=Inquiry:%20${encodeURIComponent(tier.name)}%20LEAD%20Summit" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
              Inquire for ${esc(tier.name)} &rarr;
            </a>
          </div>
        `).join('')}
      </div>

      <!-- Sponsor Contact CTA -->
      <div style="background: #061233; color: #ffffff; border-radius: 14px; padding: 36px; text-align: center; max-width: 800px; margin: 0 auto; border: 1px solid rgba(212,175,55,0.3);">
        <h3 style="font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 10px; font-family: var(--font-serif);">Need a Custom Partnership Package?</h3>
        <p style="font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.6; margin-bottom: 20px;">
          We work directly with corporate sponsors, financial institutions, and health networks to craft tailored brand activations and private VIP dining experiences.
        </p>
        <a href="mailto:info@amcob.org?subject=Custom%20LEAD%20Summit%20Sponsorship" class="btn btn-primary" style="background: #ce8924; border-color: #ce8924;">
          Contact Corporate Partnerships Team
        </a>
      </div>
    </div>
  </section>
`;

const renderedSponsorship = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Sponsorship Packages | 11 Commercial Tiers',
  description: 'Review corporate sponsorship opportunities for LEAD Summit Anaheim 2027 ranging from $25,000 Title Partner to commercial expo booths.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }, { label: 'Sponsorship', url: '/lead/sponsorship' }],
  content: sponsorshipContent
});
fs.writeFileSync(path.join(leadDir, 'sponsorship.html'), renderedSponsorship);
console.log('Generated lead/sponsorship.html');

// ==========================================
// 4. LEAD Tickets Page (lead/tickets.html)
// ==========================================
const ticketsContent = `
  ${renderLeadSubnav('tickets')}

  <section class="page-intro">
    <div class="container" style="max-width: 960px;">
      <span class="page-intro-badge">Ticket Registration</span>
      <h1 class="page-title">Register for LEAD Summit Anaheim</h1>
      <p class="page-subtitle">
        300 seats. Year one. Small on purpose. Reserve your delegate pass before capacity is reached.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 1040px;">
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: flex-start;">
        <div>
          <h2 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 18px;">Select Your Pass</h2>
          
          <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
            ${summit.ticketTiers.map(tier => `
              <label style="border: 2px solid var(--border-light); border-radius: 12px; padding: 20px; display: flex; gap: 16px; cursor: pointer; background: #ffffff; transition: all 0.2s ease;">
                <input type="radio" name="selectedTier" value="${tier.id}" ${tier.id === 1 ? 'checked' : ''} style="margin-top: 4px;">
                <div style="flex-grow: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                    <strong style="font-size: 17px; color: var(--brand-navy);">${esc(tier.name)}</strong>
                    <span style="font-size: 22px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif);">${esc(tier.priceFormatted)}</span>
                  </div>
                  <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 10px;">${esc(tier.description)}</p>
                  <div style="font-size: 12.5px; color: var(--brand-emerald); font-weight: 600;">
                    &#10003; Includes Halal gourmet meals &amp; workbook materials
                  </div>
                </div>
              </label>
            `).join('')}
          </div>

          <h2 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 18px;">Optional Hotel Add-on</h2>
          <label style="border: 1px solid var(--border-light); border-radius: 12px; padding: 20px; display: flex; gap: 16px; cursor: pointer; background: #ffffff; margin-bottom: 32px;">
            <input type="checkbox" id="hotelAddon" value="550" style="margin-top: 4px;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <strong style="font-size: 16px; color: var(--brand-navy);">Add 3-Night Hotel Room Block</strong>
                <span style="font-size: 18px; font-weight: 800; color: var(--brand-navy); font-family: var(--font-serif);">+$550</span>
              </div>
              <p style="font-size: 13px; color: var(--text-muted); margin: 0;">
                Anaheim Host Convention Property (Check-in Friday Mar 26, Check-out Monday Mar 29). Single or double occupancy.
              </p>
            </div>
          </label>

          <h2 style="font-size: 22px; font-weight: 750; color: var(--brand-navy); margin-bottom: 18px;">Delegate Information</h2>
          <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 16px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">First Name *</label>
                <input type="text" class="search-input" placeholder="e.g. Tariq" required style="width: 100%;">
              </div>
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Last Name *</label>
                <input type="text" class="search-input" placeholder="e.g. Khan" required style="width: 100%;">
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Company / Enterprise *</label>
                <input type="text" class="search-input" placeholder="e.g. Conselara LLC" required style="width: 100%;">
              </div>
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Executive Title *</label>
                <input type="text" class="search-input" placeholder="e.g. Founder &amp; CEO" required style="width: 100%;">
              </div>
            </div>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--brand-navy); margin-bottom: 6px;">Email Address *</label>
              <input type="email" class="search-input" placeholder="tariq@example.com" required style="width: 100%;">
            </div>
            <button type="button" class="btn btn-primary" onclick="alert('Registration submitted. Confirmation email dispatched.');" style="padding: 14px; font-size: 15px; font-weight: 700; background: #ce8924; border-color: #ce8924; margin-top: 8px;">
              Proceed to Secure Checkout &rarr;
            </button>
          </div>
        </div>

        <div>
          <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 28px; position: sticky; top: 140px;">
            <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 14px;">Order Summary</h3>
            <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 10px;">
              <span id="summaryTierName">Full Summit Pass (Early Bird)</span>
              <strong id="summaryTierPrice">$750</strong>
            </div>
            <div id="summaryHotelRow" style="display: none; justify-content: space-between; font-size: 14px; margin-bottom: 10px; color: var(--text-muted);">
              <span>Hotel Room (3 Nights)</span>
              <strong>$550</strong>
            </div>
            <div style="border-top: 1px solid var(--border-light); padding-top: 14px; margin-top: 14px; display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: var(--brand-navy);">
              <span>Total:</span>
              <span id="summaryTotal" style="color: #ce8924;">$750</span>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-light); font-size: 12px; color: var(--text-muted); line-height: 1.5;">
              &#10003; 100% Tax-Deductible Business Education Expense.<br>
              &#10003; Priority access to the Commercial Deal Lounge.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    const tierPrices = { '1': { name: 'Full Summit Pass (Early Bird)', price: 750 }, '4': { name: 'One-Day Summit Pass', price: 500 }, '5': { name: 'Saturday Gala Dinner Only', price: 250 } };
    const radios = document.querySelectorAll('input[name="selectedTier"]');
    const hotelCheck = document.getElementById('hotelAddon');
    const nameEl = document.getElementById('summaryTierName');
    const priceEl = document.getElementById('summaryTierPrice');
    const hotelRow = document.getElementById('summaryHotelRow');
    const totalEl = document.getElementById('summaryTotal');

    function update() {
      let selectedId = '1';
      radios.forEach(r => { if (r.checked) selectedId = r.value; });
      const t = tierPrices[selectedId];
      nameEl.textContent = t.name;
      priceEl.textContent = '$' + t.price;
      const hotel = hotelCheck.checked ? 550 : 0;
      hotelRow.style.display = hotel > 0 ? 'flex' : 'none';
      totalEl.textContent = '$' + (t.price + hotel);
    }
    radios.forEach(r => r.addEventListener('change', update));
    hotelCheck.addEventListener('change', update);
  </script>
`;

const renderedTickets = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Anaheim Registration | Tickets & Passes',
  description: 'Reserve your pass for LEAD Summit Anaheim 2027. Full summit access, single day passes, and Saturday evening awards dinner tickets.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }, { label: 'Tickets', url: '/lead/tickets' }],
  content: ticketsContent
});
fs.writeFileSync(path.join(leadDir, 'tickets.html'), renderedTickets);
console.log('Generated lead/tickets.html');

// ==========================================
// 5. LEAD Agenda Page (lead/agenda.html)
// ==========================================
const agendaContent = `
  ${renderLeadSubnav('agenda')}

  <section class="page-intro">
    <div class="container" style="max-width: 960px;">
      <span class="page-intro-badge">Three-Day Executive Syllabus</span>
      <h1 class="page-title">LEAD Summit Anaheim 2027 Agenda</h1>
      <p class="page-subtitle">
        Hour-by-hour schedule from Friday check-in through Sunday closing synthesis. Designed for maximum focus, authentic peer confidentiality, and tangible deal flow.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 1000px;">
      <!-- Day 1 -->
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 14px; padding: 32px; margin-bottom: 32px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ce8924; padding-bottom: 12px; margin-bottom: 24px;">
          <div>
            <span class="badge" style="background: #ce8924; color: #ffffff; font-size: 11px;">Day 01</span>
            <h2 style="font-size: 22px; font-weight: 800; color: var(--brand-navy); margin: 6px 0 0 0;">Friday, March 26, 2027</h2>
          </div>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);">Arrival &amp; Opening Reception</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">3:00 PM: 5:00 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Executive Registration &amp; Delegate Check-in</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Badge collection, delegate kit distribution, and hotel room settlement.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">5:00 PM: 6:00 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Opening Address &amp; Summit Orientation</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Welcome remarks by AMCOB President Kashif Zubair: "Setting the Standard for the 48-Hour Reset."</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">6:00 PM: 7:15 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Opening Keynote: Scaling with Integrity</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Mainstage address by featured industry pioneer on navigating enterprise growth without diluting core values.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">7:30 PM: 9:30 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Welcome Banquet &amp; Peer Introductions</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Catered Halal gourmet dining and structured table networking by industry sector.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Day 2 -->
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 14px; padding: 32px; margin-bottom: 32px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ce8924; padding-bottom: 12px; margin-bottom: 24px;">
          <div>
            <span class="badge" style="background: #ce8924; color: #ffffff; font-size: 11px;">Day 02</span>
            <h2 style="font-size: 22px; font-weight: 800; color: var(--brand-navy); margin: 6px 0 0 0;">Saturday, March 27, 2027</h2>
          </div>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);">Masterclasses, Peer Cohorts &amp; Awards Gala</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">8:00 AM: 9:00 AM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Executive Breakfast &amp; Expo Open</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Informal morning breakfast and private review of commercial expo booths.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">9:00 AM: 10:15 AM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Mainstage Keynote: Enterprise Resilience</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Insights from Aneesa Muthana and senior founders on operational discipline during economic volatility.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">10:30 AM: 12:30 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Closed-Door Peer Advisory Group Cohorts</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Confidential breakout sessions matched strictly by annual revenue stage ($100k to $3M+) under certified moderator facilitation.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">12:30 PM: 2:00 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Executive Lunch &amp; Business Expo Floor</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Halal executive luncheon and face-to-face commercial discussions across the 30-booth exhibition floor.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">2:00 PM: 3:30 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Capital Allocators &amp; Investment Panel</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Direct access to private equity, venture syndicates, and commercial banking leaders seeking qualified Muslim-owned enterprises.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">3:45 PM: 5:00 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Masterclass: AMCOB Tactical Deal-Closing Framework</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Advanced negotiation clinic, enterprise contract structuring, and B2B pipeline execution tools.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">7:00 PM: 10:00 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">The Annual Leadership Banquet Gala &amp; Awards</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Black-tie optional formal dinner, recognition of outstanding enterprise builders, and keynote reflections.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Day 3 -->
      <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: 14px; padding: 32px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ce8924; padding-bottom: 12px; margin-bottom: 24px;">
          <div>
            <span class="badge" style="background: #ce8924; color: #ffffff; font-size: 11px;">Day 03</span>
            <h2 style="font-size: 22px; font-weight: 800; color: var(--brand-navy); margin: 6px 0 0 0;">Sunday, March 28, 2027</h2>
          </div>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);">Cognitive Synthesis &amp; Accountability</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">8:30 AM: 9:30 AM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Sunday Executive Breakfast</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Morning reflection and one-on-one executive deal consultations.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">9:30 AM: 11:30 AM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Cognitive Assessment Debrief &amp; Leadership Mapping</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Facilitated workshop breaking down individual assessment scores and executive decision archetypes.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">12:00 PM: 1:30 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Executive Lunch &amp; Final Expo Floor Hours</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Closing discussions with commercial exhibitors and final deal term sheet signings.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">1:30 PM: 3:30 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">The 48-Hour Reset Synthesis &amp; 12-Month Commitments</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Codifying your peer board accountability schedule and corporate roadmap for the next 12 months.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: baseline;">
            <strong style="color: #ce8924; font-size: 14px;">3:30 PM: 4:30 PM</strong>
            <div>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Closing Keynote &amp; 2027 Tour Announcement</h3>
              <p style="font-size: 13.5px; color: var(--text-body); margin: 0;">Unveiling regional tour stops in Calgary, Chicago, New Jersey, and Toronto, followed by official summit adjournment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const renderedAgenda = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Agenda | 3-Day Executive Master Schedule',
  description: 'Complete 3-day working agenda for LEAD Summit Anaheim 2027. Keynotes, peer advisory groups, capital panels, and gala dinner.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }, { label: 'Agenda', url: '/lead/agenda' }],
  content: agendaContent
});
fs.writeFileSync(path.join(leadDir, 'agenda.html'), renderedAgenda);
console.log('Generated lead/agenda.html');

// ==========================================
// 6. LEAD Hotel & Travel (lead/hotel.html)
// ==========================================
const hotelContent = `
  ${renderLeadSubnav('hotel')}

  <section class="page-intro">
    <div class="container" style="max-width: 960px;">
      <span class="page-intro-badge">Venue &amp; Logistics</span>
      <h1 class="page-title">Anaheim Hotel &amp; Travel Guide</h1>
      <p class="page-subtitle">
        Everything you need to know about airport arrivals, discounted room blocks, and the summit property in Anaheim, California.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 1040px;">
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: flex-start; margin-bottom: 48px;">
        <div>
          <h2 style="font-size: 24px; font-weight: 750; color: var(--brand-navy); margin-bottom: 14px;">The Host Property</h2>
          <p style="font-size: 15.5px; line-height: 1.7; color: var(--text-body); margin-bottom: 20px;">
            LEAD Summit Anaheim takes place at an upscale executive conference center in Anaheim, California. Designed specifically for working summits, the facility features private breakout rooms for confidential peer advisory cohorts, an open networking atrium, and modern audio-visual technology for mainstage keynotes.
          </p>

          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px;">Airport &amp; Ground Transit</h3>
          <ul style="list-style: none; padding: 0; margin: 0 0 28px 0; display: flex; flex-direction: column; gap: 12px; font-size: 14.5px; color: var(--text-body);">
            <li style="display: flex; gap: 10px;">
              <span style="color: #ce8924; font-weight: bold;">&bull;</span>
              <span><strong>John Wayne Airport (SNA):</strong> 15 minutes by rideshare. Highly recommended for domestic arrivals.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: #ce8924; font-weight: bold;">&bull;</span>
              <span><strong>Long Beach Airport (LGB):</strong> 25 minutes by rideshare. Convenient regional transit.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: #ce8924; font-weight: bold;">&bull;</span>
              <span><strong>Los Angeles International (LAX):</strong> 45 to 60 minutes depending on traffic. Best for international delegates.</span>
            </li>
          </ul>

          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px;">Halal Dining &amp; Family Amenities</h3>
          <p style="font-size: 15px; line-height: 1.65; color: var(--text-body); margin: 0;">
            Anaheim features one of the most vibrant concentrations of Halal-certified restaurants and family activities in North America, including the Little Arabia commercial district and proximity to major Southern California cultural centers.
          </p>
        </div>

        <div>
          <div style="background: var(--bg-subtle); border: 2px solid #ce8924; border-radius: 14px; padding: 32px; box-shadow: var(--shadow-sm);">
            <span class="badge" style="background: rgba(206,137,36,0.2); color: #b45309; border: 1px solid rgba(206,137,36,0.4); margin-bottom: 10px;">Exclusive Room Block</span>
            <h3 style="font-size: 22px; font-weight: 800; color: var(--brand-navy); margin-bottom: 6px;">3-Night Executive Stay</h3>
            <div style="font-size: 32px; font-weight: 800; color: #ce8924; font-family: var(--font-serif); margin-bottom: 12px;">$550 Total</div>
            <p style="font-size: 13.5px; line-height: 1.55; color: var(--text-muted); margin-bottom: 20px;">
              Check-in Friday, March 26 &bull; Check-out Monday, March 29. Subsidized chamber rate for registered delegates.
            </p>
            <a href="/lead/tickets" class="btn btn-primary" style="width: 100%; text-align: center; background: #ce8924; border-color: #ce8924;">
              Reserve Hotel with Ticket &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const renderedHotel = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Hotel & Travel | Anaheim Convention Guide',
  description: 'Travel and accommodation details for LEAD Summit Anaheim 2027 including discounted 3-night room blocks and airport transit.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }, { label: 'Hotel & Travel', url: '/lead/hotel' }],
  content: hotelContent
});
fs.writeFileSync(path.join(leadDir, 'hotel.html'), renderedHotel);
console.log('Generated lead/hotel.html');

// ==========================================
// 7. LEAD Houston Retrospective (lead/houston.html)
// ==========================================
const houstonContent = `
  ${renderLeadSubnav('houston')}

  <section class="page-intro">
    <div class="container" style="max-width: 960px;">
      <span class="page-intro-badge">Summit Retrospective</span>
      <h1 class="page-title">LEAD Summit Houston Recap</h1>
      <p class="page-subtitle">
        Reviewing the inaugural gathering of 250+ Muslim business leaders, founders, and investors in Houston, Texas.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 1040px;">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 48px;">
        ${houston.highlights.map(h => `
          <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 24px; text-align: center;">
            <div style="font-size: 36px; font-weight: 800; color: #ce8924; font-family: var(--font-serif); margin-bottom: 6px;">${esc(h.stat)}</div>
            <div style="font-size: 13px; font-weight: 600; color: var(--brand-navy); line-height: 1.4;">${esc(h.label)}</div>
          </div>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: center; margin-bottom: 48px;">
        <div>
          <h2 style="font-size: 26px; font-weight: 750; color: var(--brand-navy); margin-bottom: 14px;">The Gathering That Built the Movement</h2>
          <p style="font-size: 16px; line-height: 1.7; color: var(--text-body); margin-bottom: 16px;">
            LEAD Summit Houston proved that when Muslim entrepreneurs leave the noise of conventional conferences behind and gather in an intimate, confidential working environment, commercial transactions accelerate immediately.
          </p>
          <p style="font-size: 16px; line-height: 1.7; color: var(--text-body); margin-bottom: 24px;">
            Keynotes from leaders such as Omair Tariq (CEO of Cart.com) and Aneesa Muthana (Pioneer Service) set the standard for authentic leadership, showing how ethical values and aggressive commercial scale can reinforce each other.
          </p>
          <a href="/lead/tickets" class="btn btn-primary" style="background: #ce8924; border-color: #ce8924;">
            Join Us in Anaheim for 2027 &rarr;
          </a>
        </div>

        <div>
          <div style="border-radius: 14px; overflow: hidden; border: 1px solid var(--border-light); box-shadow: var(--shadow-md);">
            <img src="/assets/optimized/lead/hero-avatar.webp" alt="Houston Summit Highlights" style="width: 100%; height: auto; display: block;">
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const renderedHouston = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Houston Retrospective | Inaugural Gathering',
  description: 'Highlights, statistics, and photo recap from the inaugural LEAD Summit Houston gathering of 250+ Muslim founders and investors.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }, { label: 'Houston Recap', url: '/lead/houston' }],
  content: houstonContent
});
fs.writeFileSync(path.join(leadDir, 'houston.html'), renderedHouston);
console.log('Generated lead/houston.html');

// ==========================================
// 8. LEAD Blog Index (lead/blog/index.html)
// ==========================================
const blogIndexContent = `
  ${renderLeadSubnav('blog')}

  <section class="page-intro">
    <div class="container" style="max-width: 960px;">
      <span class="page-intro-badge">Summit Intelligence</span>
      <h1 class="page-title">LEAD Summit Editorial &amp; Insights</h1>
      <p class="page-subtitle">
        Curated analysis, leadership guides, and strategic perspectives prepared exclusively for LEAD Summit delegates.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 1140px;">
      <div class="grid-3">
        ${articles.map(art => `
          <div class="card" style="display: flex; flex-direction: column;">
            ${art.localImage ? `
              <div style="aspect-ratio: 16/9; overflow: hidden; border-radius: 8px; margin-bottom: 16px; background: var(--bg-subtle);">
                <img src="${art.localImage}" alt="${esc(art.title)}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
              </div>
            ` : ''}
            <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; border: 1px solid rgba(206,137,36,0.3); font-size: 11px; margin-bottom: 8px; width: fit-content;">LEAD Summit</span>
            <h3 style="font-size: 17px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px; line-height: 1.35;">
              <a href="/lead/blog/${art.slug}">${cleanCopy(art.title)}</a>
            </h3>
            <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-body); margin-bottom: 16px; flex-grow: 1;">
              ${cleanCopy(art.excerpt || 'Executive analysis and strategic guidance from the LEAD Summit.')}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border-light);">
              <span style="font-size: 12px; color: var(--text-muted);">AMCOB Editorial</span>
              <a href="/lead/blog/${art.slug}" class="btn btn-outline btn-sm">Read Article &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

const renderedBlogIndex = renderLayout({
  ...leadLayoutDefaults,
  title: 'LEAD Summit Blog & Strategic Articles | AMCOB',
  description: 'In-depth articles covering Muslim business conferences, leadership development, and strategic execution for founders.',
  breadcrumbs: [{ label: 'Events', url: '/events' }, { label: 'LEAD Summit', url: '/lead' }, { label: 'Blog', url: '/lead/blog' }],
  content: blogIndexContent
});
fs.writeFileSync(path.join(leadBlogDir, 'index.html'), renderedBlogIndex);
console.log('Generated lead/blog/index.html');

// ==========================================
// 9. Individual LEAD Blog Articles
// ==========================================
articles.forEach((art) => {
  const cleanTitle = cleanCopy(art.title);
  const cleanLead = cleanCopy(art.lead || art.excerpt || '');
  const cleanBody = cleanCopy(art.richHtml || `<p>${cleanLead}</p>`);

  const artContent = `
    ${renderLeadSubnav('blog')}

    <section class="page-intro" style="padding: 48px 0 36px 0;">
      <div class="container" style="max-width: 860px;">
        <span class="badge" style="background: rgba(206,137,36,0.15); color: #b45309; border: 1px solid rgba(206,137,36,0.3); font-size: 11.5px; margin-bottom: 12px; display: inline-block;">
          LEAD Summit Editorial
        </span>
        <h1 class="page-title" style="font-size: clamp(1.8rem, 3.2vw, 2.5rem); margin-bottom: 12px;">${esc(cleanTitle)}</h1>
        <p style="font-size: 13.5px; color: var(--text-muted); margin: 0;">
          Published by <strong style="color: var(--brand-navy);">AMCOB LEAD Editorial</strong> &bull; Executive Reading
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 860px;">
        ${art.localImage ? `
          <div style="border-radius: 12px; overflow: hidden; margin-bottom: 36px; border: 1px solid var(--border-light); background: var(--bg-subtle);">
            <img src="${art.localImage}" alt="${esc(cleanTitle)}" style="width: 100%; height: auto; max-height: 440px; object-fit: cover; display: block;">
          </div>
        ` : ''}

        <div style="font-size: 17px; line-height: 1.8; color: var(--text-body);">
          ${cleanBody}
        </div>

        <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <a href="/lead/blog" class="btn btn-secondary">&larr; Back to Summit Articles</a>
          <a href="/lead/tickets" class="btn btn-primary" style="background: #ce8924; border-color: #ce8924;">Claim Your Seat at LEAD Anaheim &rarr;</a>
        </div>
      </div>
    </section>
  `;

  const renderedArt = renderLayout({
    ...leadLayoutDefaults,
    title: `${cleanTitle} | LEAD Summit`,
    description: cleanLead.substring(0, 155),
    breadcrumbs: [
      { label: 'Events', url: '/events' },
      { label: 'LEAD Summit', url: '/lead' },
      { label: 'Blog', url: '/lead/blog' },
      { label: cleanTitle, url: `/lead/blog/${art.slug}` }
    ],
    content: artContent
  });

  fs.writeFileSync(path.join(leadBlogDir, `${art.slug}.html`), renderedArt);
});
console.log(`Generated all ${articles.length} individual LEAD blog articles!`);

console.log('All LEAD Summit standalone pages generated successfully.');
