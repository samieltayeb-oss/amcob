const fs = require('fs');
const path = require('path');

// Ensure root and pag folders exist
if (!fs.existsSync('pag')) fs.mkdirSync('pag', { recursive: true });

// Load data files
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
const articles = JSON.parse(fs.readFileSync('data/articles.json', 'utf8'));
const books = JSON.parse(fs.readFileSync('data/books.json', 'utf8'));
const events = JSON.parse(fs.readFileSync('data/events.json', 'utf8'));

// Helper to escape HTML
function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Master Layout Generator
function renderLayout({ title, description, activeNav = '', breadcrumbs = [], content, extraHead = '', extraScripts = '' }) {
  const breadcrumbsHtml = breadcrumbs.length > 0 ? `
    <div class="breadcrumbs">
      <div class="container breadcrumbs-inner">
        <a href="/">Home</a>
        ${breadcrumbs.map((b, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          if (isLast) {
            return `<span class="breadcrumbs-sep">/</span><span class="breadcrumbs-current">${esc(b.label)}</span>`;
          }
          return `<span class="breadcrumbs-sep">/</span><a href="${b.url}">${esc(b.label)}</a>`;
        }).join('')}
      </div>
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} | AMCOB</title>
  <meta name="description" content="${esc(description)}">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/glass-nav.css">
  <link rel="stylesheet" href="/css/motion.css">
  ${extraHead}
</head>
<body>

  <!-- Floating Glass Masthead -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand-logo" title="AMCOB: Allied Muslim Chamber of Business">
        <img src="/assets/optimized/logos/logo.png" alt="AMCOB: Allied Muslim Chamber of Business" width="160" height="45">
      </a>

      <!-- Desktop Navigation -->
      <nav class="nav-desktop" aria-label="Main Navigation">
        <a href="/about" class="nav-link ${activeNav === 'about' ? 'active' : ''}">About</a>

        <!-- Membership Mega Dropdown -->
        <div class="nav-dropdown-wrapper">
          <button type="button" class="nav-trigger-btn ${activeNav === 'membership' ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
            Membership
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 5 5-5z"/></svg>
          </button>
          <div class="glass-dropdown-panel" role="region" aria-label="Membership Programs">
            <div class="glass-panel-grid">
              <div class="glass-panel-links">
                <a href="/membership" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">01</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Overview</span>
                    <span class="glass-panel-link-desc">Compare all chamber tiers and benefits</span>
                  </div>
                </a>
                <a href="/peer-advisory" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">02</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Peer Advisory Groups (PAG)</span>
                    <span class="glass-panel-link-desc">Revenue-stage matched boards ($100k to $3M+)</span>
                  </div>
                </a>
                <a href="/connect" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">03</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">AMCOB Connect</span>
                    <span class="glass-panel-link-desc">Bi-weekly commercial B2B referral network ($850/yr)</span>
                  </div>
                </a>
                <a href="/affiliate" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">04</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Affiliate Membership</span>
                    <span class="glass-panel-link-desc">Solo practitioners, consultants, and early founders ($550/yr)</span>
                  </div>
                </a>
                <a href="/virtual-accelerator-program" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">05</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Virtual Accelerator Program</span>
                    <span class="glass-panel-link-desc">12-week venture syllabus, 0% equity dilution</span>
                  </div>
                </a>
                <a href="/ambassador-program" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">06</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Chapter Ambassadors</span>
                    <span class="glass-panel-link-desc">Leadership across 12 North American metropolitan hubs</span>
                  </div>
                </a>
                <a href="/mldl" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">07</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Muslim Life Design Lab</span>
                    <span class="glass-panel-link-desc">Executive enterprise and lifestyle balance masterclasses</span>
                  </div>
                </a>
              </div>

              <!-- Featured Preview Card -->
              <div class="glass-panel-featured">
                <img src="/assets/optimized/programs/JoinAMCOBBannerWebsite.webp" alt="AMCOB Community" class="glass-panel-featured-img">
                <div class="glass-panel-featured-body">
                  <span class="glass-panel-featured-tag">Chamber Tiers</span>
                  <span class="glass-panel-featured-title">Peer Advisory Boards</span>
                  <p class="glass-panel-featured-desc">Confidential peer cohorts matched strictly by verified revenue stage.</p>
                  <a href="/membership" class="glass-panel-featured-action">Compare Programs &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Events Mega Dropdown -->
        <div class="nav-dropdown-wrapper">
          <button type="button" class="nav-trigger-btn ${activeNav === 'events' ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
            Events
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 5 5-5z"/></svg>
          </button>
          <div class="glass-dropdown-panel" role="region" aria-label="Chamber Events">
            <div class="glass-panel-grid">
              <div class="glass-panel-links">
                <a href="/events" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">01</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Master Calendar</span>
                    <span class="glass-panel-link-desc">Complete schedule of in-person and virtual dates</span>
                  </div>
                </a>
                <a href="/dinner-mixers" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">02</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Dinner Mixers</span>
                    <span class="glass-panel-link-desc">Regional chapter executive dinners across 12 cities</span>
                  </div>
                </a>
                <a href="/virtual-mixers" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">03</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Virtual Mixers</span>
                    <span class="glass-panel-link-desc">Global online networking sessions</span>
                  </div>
                </a>
                <a href="/upcoming-peer-advisory-meetings" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">04</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Peer Advisory Meetings</span>
                    <span class="glass-panel-link-desc">Closed-door monthly cohort board dates</span>
                  </div>
                </a>
                <a href="/conferences-workshops" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">05</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Conferences &amp; Workshops</span>
                    <span class="glass-panel-link-desc">LEAD Summit convenings and executive clinics</span>
                  </div>
                </a>
              </div>

              <!-- Featured Event Card -->
              <div class="glass-panel-featured">
                <img src="/assets/optimized/hero/amcob-summit-atrium.webp" alt="AMCOB LEAD Summit" class="glass-panel-featured-img">
                <div class="glass-panel-featured-body">
                  <span class="glass-panel-featured-tag">Annual Flagship</span>
                  <span class="glass-panel-featured-title">AMCOB LEAD Summit</span>
                  <p class="glass-panel-featured-desc">National conference bringing business founders, investors, and leaders together.</p>
                  <a href="/conferences-workshops" class="glass-panel-featured-action">View Summit Details &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="/business-directory" class="nav-link ${activeNav === 'directory' ? 'active' : ''}">Directory</a>
        <a href="/blog" class="nav-link ${activeNav === 'blog' ? 'active' : ''}">Editorial</a>
        <a href="/podcasts" class="nav-link ${activeNav === 'podcasts' ? 'active' : ''}">Podcasts</a>
        <a href="/books" class="nav-link ${activeNav === 'books' ? 'active' : ''}">Library</a>
        <a href="/contact-us" class="nav-link ${activeNav === 'contact' ? 'active' : ''}">Contact</a>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <a href="https://my.amcob.org" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Member Login</a>
        <a href="/join" class="btn btn-primary btn-sm">Apply to Join</a>
        <button class="mobile-menu-toggle" aria-label="Toggle Navigation" aria-expanded="false">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Glass Drawer Sheet -->
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="mobile-nav-group">
      <span class="mobile-nav-group-title">Navigation</span>
      <a href="/about" class="mobile-nav-link">About AMCOB</a>
      <a href="/business-directory" class="mobile-nav-link">Business Directory</a>
      <a href="/blog" class="mobile-nav-link">Editorial Journal</a>
      <a href="/podcasts" class="mobile-nav-link">Executive Dialogues Podcasts</a>
      <a href="/books" class="mobile-nav-link">Executive Library</a>
      <a href="/contact-us" class="mobile-nav-link">Contact Us</a>
    </div>

    <div class="mobile-nav-group">
      <span class="mobile-nav-group-title">Membership Programs</span>
      <a href="/membership" class="mobile-nav-link">Membership Overview</a>
      <a href="/peer-advisory" class="mobile-nav-link">Peer Advisory Groups (PAG)</a>
      <a href="/connect" class="mobile-nav-link">AMCOB Connect ($850/yr)</a>
      <a href="/affiliate" class="mobile-nav-link">Affiliate Membership ($550/yr)</a>
      <a href="/virtual-accelerator-program" class="mobile-nav-link">Virtual Accelerator Program</a>
      <a href="/ambassador-program" class="mobile-nav-link">Chapter Ambassadors</a>
      <a href="/mldl" class="mobile-nav-link">Muslim Life Design Lab</a>
    </div>

    <div class="mobile-nav-group">
      <span class="mobile-nav-group-title">Events &amp; Gatherings</span>
      <a href="/events" class="mobile-nav-link">Master Calendar</a>
      <a href="/dinner-mixers" class="mobile-nav-link">Regional Dinner Mixers</a>
      <a href="/virtual-mixers" class="mobile-nav-link">Virtual Mixers</a>
      <a href="/upcoming-peer-advisory-meetings" class="mobile-nav-link">Peer Advisory Meetings</a>
      <a href="/conferences-workshops" class="mobile-nav-link">Conferences &amp; Workshops</a>
    </div>

    <div class="mobile-actions">
      <a href="/join" class="btn btn-primary" style="width: 100%; text-align: center;">Apply to Join</a>
      <a href="https://my.amcob.org" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; text-align: center;">Member Login</a>
    </div>
  </div>

  ${breadcrumbsHtml}

  <!-- Page Content -->
  <main>
    ${content}
  </main>

  <!-- Global Footer -->
  <footer class="site-footer-imperial">
    <div class="container">
      <div class="footer-top-imperial">
        <!-- Brand Column -->
        <div class="footer-brand-imperial">
          <a href="/" title="AMCOB Home">
            <img src="/assets/optimized/logos/logo-monochrome.png" alt="AMCOB" width="168" height="47">
          </a>
          <p>
            Connecting Muslim entrepreneurs and business leaders across North America through confidential peer advisory groups, structured commercial referrals, and executive convenings.
          </p>
          <div class="social-links-imperial">
            <a href="https://www.linkedin.com/company/amcob/" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="LinkedIn">in</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Instagram">&#9678;</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="YouTube">&#9658;</a>
          </div>
        </div>

        <!-- Membership Column -->
        <div>
          <h4 class="footer-col-title">Membership</h4>
          <ul class="footer-links-imperial">
            <li><a href="/affiliate">Affiliate Membership</a></li>
            <li><a href="/connect">AMCOB Connect</a></li>
            <li><a href="/peer-advisory">Peer Advisory Groups</a></li>
            <li><a href="/join">Interested in Joining?</a></li>
          </ul>
        </div>

        <!-- Engage Column -->
        <div>
          <h4 class="footer-col-title">Engage</h4>
          <ul class="footer-links-imperial">
            <li><a href="/events">Events Calendar</a></li>
            <li><a href="/podcasts">Podcasts &amp; Media</a></li>
            <li><a href="/ambassador-program">Ambassador Program</a></li>
            <li><a href="/opportunities">Investment Opportunities</a></li>
            <li><a href="/sponsorship">Corporate Sponsorship</a></li>
          </ul>
        </div>

        <!-- Quick Links Column -->
        <div>
          <h4 class="footer-col-title">Quick Links</h4>
          <ul class="footer-links-imperial">
            <li><a href="/business-directory">Business Directory</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/design-system">Design System</a></li>
          </ul>
        </div>

        <!-- Info Column -->
        <div>
          <h4 class="footer-col-title">Info</h4>
          <div class="footer-info-item">
            <span class="footer-info-icon">&#9742;</span>
            <span><a href="tel:9496170529" style="color: inherit;">949-617-0529</a></span>
          </div>
          <div class="footer-info-item">
            <span class="footer-info-icon">&#9993;</span>
            <span><a href="mailto:info@amcob.org" style="color: inherit;">info@amcob.org</a></span>
          </div>
          <div class="footer-info-item">
            <span class="footer-info-icon">&#9873;</span>
            <span>300 Spectrum Center Drive, Suite 400<br>Irvine, CA 92618</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom-imperial">
        <p>Privacy &copy; ${new Date().getFullYear()} AMCOB LLC. All Rights Reserved.</p>
        <div style="display: flex; gap: 20px;">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact-us">Contact</a>
          <a href="https://my.amcob.org" target="_blank" rel="noopener noreferrer">Member Portal</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="/js/vendor/gsap.min.js"></script>
  <script src="/js/vendor/ScrollTrigger.min.js"></script>
  <script src="/js/glass-nav.js"></script>
  <script src="/js/motion.js"></script>
  <script src="/js/site.js"></script>
  ${extraScripts}
</body>
</html>`;
}

module.exports = {
  renderLayout,
  businesses,
  articles,
  books,
  events,
  esc
};
