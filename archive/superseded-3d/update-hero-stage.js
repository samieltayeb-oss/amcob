const fs = require('fs');

let file = fs.readFileSync('scripts/generate-core-pages.js', 'utf8');

const newHero = `<!-- Architectural 3D Hero Section -->
  <section class="hero-architectural" id="heroStage">
    <!-- Real 3D Canvas Viewport (mounted via js/hero-3d.js) -->
    <div id="hero3dStage" class="hero-3d-stage" aria-hidden="true">
      <canvas id="hero3dCanvas"></canvas>
    </div>

    <!-- Static Fallback for No-WebGL or Reduced Motion -->
    <div class="hero-3d-fallback" aria-hidden="true">
      <div class="fallback-glass-frame fallback-frame-main">
        <img src="/assets/optimized/events/leadSummitHomeBanner.webp" alt="AMCOB LEAD Summit Gathering" width="440" height="280">
      </div>
      <div class="fallback-glass-frame fallback-frame-sub">
        <img src="/assets/optimized/leadership/Kashif_Zubair.webp" alt="Kashif Zubair, Founder and CEO" width="260" height="200">
      </div>
    </div>

    <div class="container" style="position: relative; z-index: 2;">
      <div class="hero-grid-layout">
        <div class="hero-content-col">
          <div class="hero-eyebrow">
            <span>●</span>
            <span>The Executive Chamber for Muslim Business Leaders</span>
          </div>
          <h1 class="hero-title">
            Connecting Muslim Business Leaders Across North America.
          </h1>
          <p class="hero-description">
            AMCOB connects over 370 member businesses and leaders across North America. We provide confidential peer advisory boards, executive gatherings, warm commercial introductions, and bilateral trade missions.
          </p>
          <div class="hero-actions">
            <a href="/membership" class="btn btn-primary btn-lg">Explore Membership</a>
            <a href="/business-directory" class="btn btn-secondary btn-lg">Browse Directory</a>
          </div>
          <div class="hero-metrics-bar">
            <div class="hero-metric-item">
              <span class="hero-metric-num">370+</span>
              <span class="hero-metric-label">Member Businesses</span>
            </div>
            <div class="hero-metric-item">
              <span class="hero-metric-num">70+</span>
              <span class="hero-metric-label">Annual Gatherings</span>
            </div>
            <div class="hero-metric-item">
              <span class="hero-metric-num">12</span>
              <span class="hero-metric-label">Regional Chapters</span>
            </div>
            <div class="hero-metric-item">
              <span class="hero-metric-num">5</span>
              <span class="hero-metric-label">Executive Cohorts</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Micro-HUD Scene Caption -->
    <div class="hero-scene-caption" aria-hidden="true">
      <span class="hero-scene-caption-dot"></span>
      <span>LEAD Summit and Executive Mixers | Architectural Glass Installation</span>
    </div>
  </section>

  `;

const start = file.indexOf('<!-- Authentic Hero Section -->');
const end = file.indexOf('<!-- Interactive Motion Graphics AMCOB Ecosystem Section -->');

if (start !== -1 && end !== -1) {
  const escapedNewHero = JSON.stringify(newHero).slice(1, -1);
  file = file.substring(0, start) + escapedNewHero + file.substring(end);
  fs.writeFileSync('scripts/generate-core-pages.js', file, 'utf8');
  console.log('Successfully updated hero section in scripts/generate-core-pages.js');
} else {
  console.error('Could not find hero markers in scripts/generate-core-pages.js: start=' + start + ', end=' + end);
}
