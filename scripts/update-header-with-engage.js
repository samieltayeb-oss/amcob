const fs = require('fs');
const path = require('path');

const ENGAGE_DESKTOP_HTML = `
        <!-- Engage Mega Dropdown -->
        <div class="nav-dropdown-wrapper">
          <button type="button" class="nav-trigger-btn" aria-expanded="false" aria-haspopup="true">
            Engage
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 5 5-5z"/></svg>
          </button>
          <div class="glass-dropdown-panel" role="region" aria-label="Engage with AMCOB">
            <div class="glass-panel-grid">
              <div class="glass-panel-links">
                <a href="/engage" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">01</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Overview</span>
                    <span class="glass-panel-link-desc">All strategic pathways to lead and connect</span>
                  </div>
                </a>
                <a href="/ambassador-program" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">02</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Ambassador Program</span>
                    <span class="glass-panel-link-desc">Be the Voice: Lead regional chapter initiatives</span>
                  </div>
                </a>
                <a href="/opportunities" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">03</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Investment Opportunities</span>
                    <span class="glass-panel-link-desc">Invest in the Future: Curated high-growth ventures</span>
                  </div>
                </a>
                <a href="/advertisement" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">04</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Advertisement</span>
                    <span class="glass-panel-link-desc">Invest in the Future: Directory and media exposure</span>
                  </div>
                </a>
                <a href="/sponsorship" class="glass-panel-link-item">
                  <div class="glass-panel-link-icon">05</div>
                  <div class="glass-panel-link-text">
                    <span class="glass-panel-link-title">Corporate Sponsorship</span>
                    <span class="glass-panel-link-desc">Support the Vision: Brand exposure at summits & dinners</span>
                  </div>
                </a>
              </div>

              <!-- Featured Engage Card -->
              <div class="glass-panel-featured">
                <img src="/assets/optimized/programs/JoinAMCOBBannerWebsite.webp" alt="Engage with AMCOB" class="glass-panel-featured-img">
                <div class="glass-panel-featured-body">
                  <span class="glass-panel-featured-tag">Strategic Impact</span>
                  <span class="glass-panel-featured-title">Get Involved with AMCOB</span>
                  <p class="glass-panel-featured-desc">Empower the next generation of Muslim business leaders and build commercial bridges.</p>
                  <a href="/engage" class="glass-panel-featured-action">Explore All Pathways &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
`;

const ENGAGE_MOBILE_HTML = `
    <div class="mobile-nav-group">
      <span class="mobile-nav-group-title">Engage Pathways</span>
      <a href="/engage" class="mobile-nav-link">Overview: Ways to Engage</a>
      <a href="/ambassador-program" class="mobile-nav-link">Ambassador Program (Be the Voice)</a>
      <a href="/opportunities" class="mobile-nav-link">Investment Opportunities</a>
      <a href="/advertisement" class="mobile-nav-link">Chamber Advertisement</a>
      <a href="/sponsorship" class="mobile-nav-link">Corporate Sponsorship</a>
    </div>
`;

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === '.vercel') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(path.resolve(__dirname, '..'));
let updatedCount = 0;

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add desktop Engage dropdown if not present
  if (!content.includes('aria-label="Engage with AMCOB"')) {
    // Find the end of Events dropdown wrapper
    // The events dropdown contains Conferences & Workshops or aria-label="Chamber Events"
    const eventsEndMarker = '/conferences-workshops</a>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
    
    // Alternative regex match for the Events dropdown wrapper end
    const eventsRegex = /(<div class="glass-dropdown-panel"[^>]*aria-label="Chamber Events"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/;
    const fallbackRegex = /(<!-- Events Mega Dropdown -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/;

    if (eventsRegex.test(content)) {
      content = content.replace(eventsRegex, `$1\n${ENGAGE_DESKTOP_HTML}`);
      changed = true;
    } else if (fallbackRegex.test(content)) {
      content = content.replace(fallbackRegex, `$1\n${ENGAGE_DESKTOP_HTML}`);
      changed = true;
    } else {
      // Direct insertion before <a href="/business-directory"
      const dirLinkMarker = '<a href="/business-directory" class="nav-link';
      if (content.includes(dirLinkMarker)) {
        content = content.replace(dirLinkMarker, `${ENGAGE_DESKTOP_HTML}\n        ${dirLinkMarker}`);
        changed = true;
      }
    }
  }

  // 2. Add mobile Engage Pathways group if not present
  if (!content.includes('Engage Pathways')) {
    // Insert after the Events mobile-nav-group
    const eventsMobileRegex = /(<a href="\/conferences-workshops" class="mobile-nav-link"[^>]*>[^<]*<\/a>\s*<\/div>)/;
    if (eventsMobileRegex.test(content)) {
      content = content.replace(eventsMobileRegex, `$1\n${ENGAGE_MOBILE_HTML}`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${path.relative(path.resolve(__dirname, '..'), filePath)}`);
  }
}

console.log(`Finished updating ${updatedCount} HTML files with Engage dropdown.`);
