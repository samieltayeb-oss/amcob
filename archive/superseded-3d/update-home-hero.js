const fs = require('fs');

let coreScript = fs.readFileSync('scripts/generate-core-pages.js', 'utf8');

const newHeroHtml = `  <!-- Architectural Real 3D Hero Section -->
  <section class="hero-architectural" id="heroStage">
    <div class="container hero-grid-layout">
      <!-- Left Content Column -->
      <div class="hero-content-col">
        <span class="hero-eyebrow">Allied Muslim Chamber of Business</span>
        <h1 class="hero-title">Connecting Muslim Business Leaders Across North America.</h1>
        <p class="hero-description">
          AMCOB connects established business owners, founders, and executives through confidential peer advisory groups, regional chapter gatherings, structured commercial introductions, and national convenings.
        </p>
        <div class="hero-actions">
          <a href="/membership" class="btn btn-primary btn-lg">Explore Membership</a>
          <a href="/business-directory" class="btn btn-secondary btn-lg">Browse Directory</a>
        </div>
        <!-- Metrics Bar -->
        <div class="hero-metrics-bar">
          <div class="hero-metric-item">
            <span class="hero-metric-num">370+</span>
            <span class="hero-metric-label">Member Businesses</span>
          </div>
          <div class="hero-metric-item">
            <span class="hero-metric-num">12</span>
            <span class="hero-metric-label">Regional Chapters</span>
          </div>
          <div class="hero-metric-item">
            <span class="hero-metric-num">5</span>
            <span class="hero-metric-label">Peer Advisory Cohorts</span>
          </div>
          <div class="hero-metric-item">
            <span class="hero-metric-num">70+</span>
            <span class="hero-metric-label">Annual Gatherings</span>
          </div>
        </div>
      </div>

      <!-- Right 3D Architectural Installation Stage -->
      <div class="hero-3d-stage" id="hero3dStage" aria-hidden="true">
        <canvas id="hero3dCanvas"></canvas>
        <div class="hero-scene-caption">
          <span class="hero-scene-caption-dot"></span>
          <span>Architectural Glass Framing &bull; LEAD Summit Executive Convening</span>
        </div>
      </div>

      <!-- Static Fallback when WebGL is unavailable or reduced motion is requested -->
      <div class="hero-3d-fallback" aria-hidden="true">
        <div class="fallback-glass-frame fallback-frame-main">
          <img src="/assets/optimized/events/leadSummitHomeBanner.webp" alt="LEAD Summit Convening">
        </div>
        <div class="fallback-glass-frame fallback-frame-sub">
          <img src="/assets/optimized/leadership/Kashif_Zubair.webp" alt="Chamber Leadership">
        </div>
      </div>
    </div>
  </section>`;

// Replace old hero in homeContent
const oldHeroPattern = /\s*<!-- Authentic Hero Section -->[\s\S]*?<\/section>\s*<!-- Interactive Motion Graphics AMCOB Ecosystem Section -->/;
const replacement = `\n\n${newHeroHtml}\n\n  <!-- Interactive Motion Graphics AMCOB Ecosystem Section -->`;

if (oldHeroPattern.test(coreScript)) {
  coreScript = coreScript.replace(oldHeroPattern, replacement);
  console.log('Successfully replaced old hero with architectural 3D hero in generate-core-pages.js');
} else {
  console.error('Could not find old hero pattern');
}

// Update extraScripts in renderLayout call for home
coreScript = coreScript.replace(
  "extraHead: '<link rel=\"stylesheet\" href=\"/css/ecosystem-motion.css\">',",
  "extraHead: '<link rel=\"stylesheet\" href=\"/css/ecosystem-motion.css\">',\n  extraScripts: '<script type=\"module\" src=\"/js/hero-3d.js\"></script>\\n  <script src=\"/js/ecosystem-motion.js\"></script>',"
);

// Remove duplicate append of ecosystem-motion.js
coreScript = coreScript.replace(
  "renderedHome = renderedHome.replace('</body>', '  <script src=\"/js/ecosystem-motion.js\"></script>\\n</body>');",
  "// scripts handled via extraScripts in renderLayout"
);

fs.writeFileSync('scripts/generate-core-pages.js', coreScript, 'utf8');
console.log('Updated scripts/generate-core-pages.js');
