const fs = require('fs');
const path = require('path');

const newFooterHtml = `  <!-- Global Footer: Supaste Executive Edition -->
  <footer class="site-footer-imperial site-footer-supaste">
    <!-- Supaste Top Geometric Framing -->
    <div class="footer-dock-notch-wrap">
      <div class="footer-dock-notch">
        <div class="footer-notch-pill">
          <span class="footer-notch-dot"></span>
          <span>Allied Muslim Chamber of Business</span>
          <span class="footer-notch-badge">Est. 2023</span>
        </div>
      </div>
    </div>

    <div class="container footer-content-wrap">
      <div class="footer-main-grid">
        <!-- Brand Column -->
        <div class="footer-brand-showcase">
          <a href="/" class="footer-brand-logo" title="AMCOB Home">
            <img src="/assets/optimized/logos/logo-nav-white.webp" alt="AMCOB" width="160" height="44">
          </a>
          <div class="footer-brand-badge">National Executive Chamber</div>
          
          <h3 class="footer-headline">
            <span class="footer-headline-primary">Uniting Commerce.</span>
            <span class="footer-headline-secondary">Accelerating Enterprise.</span>
          </h3>
          
          <p class="footer-brand-desc">
            The premier national chamber uniting Muslim founders, corporate executives, and institutional innovators across North America through confidential peer advisory groups, structured commercial referrals, and executive convenings.
          </p>

          <div class="footer-brand-actions">
            <a href="/join" class="footer-cta-pill">
              <span>Apply for Membership</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="https://my.amcob.org" target="_blank" rel="noopener noreferrer" class="footer-portal-link">
              <span>Member Portal &rarr;</span>
            </a>
          </div>

          <div class="footer-contact-cluster">
            <div class="footer-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>300 Spectrum Center Drive, Suite 400, Irvine, CA 92618</span>
            </div>
            <div class="footer-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:9496170529">949-617-0529</a>
              <span class="footer-sep">&bull;</span>
              <a href="mailto:info@amcob.org">info@amcob.org</a>
            </div>
          </div>
        </div>

        <!-- Membership Column -->
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Membership</h4>
          <ul class="footer-nav-list">
            <li><a href="/membership">Executive Membership</a></li>
            <li><a href="/affiliate">Affiliate Program</a></li>
            <li><a href="/peer-advisory">Peer Advisory Groups</a></li>
            <li><a href="/connect">AMCOB Connect</a></li>
            <li><a href="/join">Interested in Joining?</a></li>
          </ul>
        </div>

        <!-- Engage Column -->
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Engage</h4>
          <ul class="footer-nav-list">
            <li><a href="/events">Events Calendar</a></li>
            <li><a href="/dinner-mixers">Regional Dinner Mixers</a></li>
            <li><a href="/ambassador-program">Ambassador Program</a></li>
            <li><a href="/sponsorship">Corporate Sponsorship</a></li>
            <li><a href="/opportunities">Investment Opportunities</a></li>
          </ul>
        </div>

        <!-- Intelligence Column -->
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Intelligence</h4>
          <ul class="footer-nav-list">
            <li><a href="/business-directory">Business Directory</a></li>
            <li><a href="/blog">Chamber Editorial</a></li>
            <li><a href="/podcasts">Podcasts &amp; Media</a></li>
            <li><a href="/books">Research Library</a></li>
            <li><a href="/design-system">Design System</a></li>
          </ul>
        </div>

        <!-- Chamber Column -->
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Chamber</h4>
          <ul class="footer-nav-list">
            <li><a href="/about">About AMCOB</a></li>
            <li><a href="/about#leadership">Leadership &amp; Board</a></li>
            <li><a href="/contact-us">Contact Headquarters</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="https://my.amcob.org" target="_blank" rel="noopener noreferrer">Member Portal &rarr;</a></li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom Row -->
      <div class="footer-bottom-row">
        <div class="footer-copy-text">
          <p>&copy; 2026 AMCOB | Allied Muslim Chamber of Business LLC. All Rights Reserved.</p>
          <p class="footer-subtext">The institutional chamber uniting Muslim enterprise across North America.</p>
        </div>

        <div class="footer-social-cluster">
          <a href="https://www.linkedin.com/company/amcob/" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.82-.14-2.8 0-4.68 1.7-4.68 4.86v2.64H7.5v4H10v9.5h4v-9.5z"/></svg></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="YouTube"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>
      </div>
    </div>

    <!-- Supaste Giant Architectural Watermark -->
    <div class="footer-watermark-wrap" aria-hidden="true">
      <div class="footer-watermark-text">AMCOB</div>
    </div>
  </footer>`;

let updatedCount = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scratch' && file !== 'concepts') {
        walk(full);
      }
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      
      // Target existing site-footer-imperial
      const footerRegex = /<!-- Global Footer[\s\S]*?-->\s*<footer class="site-footer-imperial[\s\S]*?<\/footer>|<footer class="site-footer-imperial[\s\S]*?<\/footer>/;
      
      if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooterHtml);
        fs.writeFileSync(full, content, 'utf8');
        updatedCount++;
        console.log(`Updated footer in: ${full}`);
      }
    }
  }
}

walk('.');
console.log(`Total files updated with Supaste footer: ${updatedCount}`);
