const fs = require('fs');
const path = require('path');
const { renderLayout, businesses, articles, books, esc } = require('./site-layout');

// 1. Master Business Directory (business-directory.html)
// Extract distinct categories
const bizCategories = [...new Set(businesses.map(b => b.category || 'Business'))].sort();

const directoryContent = `
  <section class="page-intro directory-floating-stage motion-reveal">
    <div class="container">
      <span class="page-intro-badge">Verified Commercial Index</span>
      <h1 class="page-title">AMCOB Business Directory</h1>
      <p class="page-subtitle">
        Search and discover 372 verified Muslim-owned commercial enterprises, professional practices, and service providers across North America.
      </p>

      <!-- Floating Motion Graphics: Dynamic Member Badges -->
      <div class="floating-badge-cluster">
        <div class="floating-badge-item drift-1" onclick="filterBySector('Technology')" title="Filter by Technology">
          <span class="floating-badge-dot"></span>
          <span class="floating-badge-tag">Technology</span>
          <span>Conselara LLC &bull; Enterprise AI</span>
        </div>
        <div class="floating-badge-item drift-2" onclick="filterBySector('Healthcare')" title="Filter by Healthcare">
          <span class="floating-badge-dot"></span>
          <span class="floating-badge-tag">Healthcare</span>
          <span>CarePoint Health &bull; Medical Practices</span>
        </div>
        <div class="floating-badge-item drift-3" onclick="filterBySector('Real Estate')" title="Filter by Real Estate">
          <span class="floating-badge-dot"></span>
          <span class="floating-badge-tag">Real Estate</span>
          <span>Prime Commercial Holdings &bull; Development</span>
        </div>
        <div class="floating-badge-item drift-1" onclick="filterBySector('Legal')" title="Filter by Legal">
          <span class="floating-badge-dot"></span>
          <span class="floating-badge-tag">Legal</span>
          <span>Solversa Legal Solutions &bull; Corporate Counsel</span>
        </div>
        <div class="floating-badge-item drift-2" onclick="filterBySector('Finance')" title="Filter by Financial Services">
          <span class="floating-badge-dot"></span>
          <span class="floating-badge-tag">Finance</span>
          <span>Amana Capital &bull; Wealth Management</span>
        </div>
        <div class="floating-badge-item drift-3" title="Chamber Verification Status">
          <span class="floating-badge-dot" style="background-color: #c9922e; box-shadow: 0 0 8px rgba(201,146,46,0.6);"></span>
          <span class="floating-badge-tag" style="color: #9c6c10;">Chamber Footprint</span>
          <span>372 Verified Enterprises Across 12 Chapters</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <!-- Search & Filter Controls -->
      <div class="filter-bar">
        <input type="text" id="directorySearch" class="search-input" placeholder="Search by business name, keyword, or specialty..." aria-label="Search businesses">
        <select id="directoryCategory" class="filter-select" aria-label="Filter by industry">
          <option value="all">All Industries (${businesses.length})</option>
          ${bizCategories.map(cat => {
            const count = businesses.filter(b => b.category === cat).length;
            return `<option value="${esc(cat)}">${esc(cat)} (${count})</option>`;
          }).join('')}
        </select>
        <a href="/add-listing" class="btn btn-primary btn-sm">+ Add Your Business</a>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <span id="directoryResultCount" style="font-size: 14px; font-weight: 600; color: var(--text-muted);">
          Showing ${businesses.length} verified businesses
        </span>
        <span style="font-size: 13px; color: var(--text-muted);">
          All businesses independently verified by AMCOB
        </span>
      </div>

      <!-- Business Directory Cards Grid -->
      <div class="grid-3" id="directoryContainer">
        ${businesses.map(b => `
          <div class="card business-card-item" data-name="${esc(b.name)}" data-category="${esc(b.category)}" data-desc="${esc(b.description)}">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
              ${b.localImage ? `
                <div style="width: 52px; height: 52px; border-radius: 6px; border: 1px solid var(--border-light); overflow: hidden; background: #ffffff; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                  <img src="${b.localImage}" alt="${esc(b.name)}" style="max-width: 100%; max-height: 100%; object-fit: contain;" loading="lazy">
                </div>
              ` : `
                <div style="width: 52px; height: 52px; border-radius: 6px; border: 1px solid var(--border-light); background: var(--bg-subtle); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--brand-navy); font-size: 18px;">
                  ${esc(b.name.charAt(0))}
                </div>
              `}
              <div style="overflow: hidden;">
                <span class="badge" style="font-size: 11px; margin-bottom: 4px;">${esc(b.category)}</span>
                <h3 style="font-size: 16px; font-weight: 650; color: var(--brand-navy); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">
                  <a href="/business-directory/${b.slug}">${esc(b.name)}</a>
                </h3>
              </div>
            </div>

            <p class="card-body" style="font-size: 13.5px; line-height: 1.5; color: var(--text-body); margin-bottom: 14px;">
              ${esc(b.description || 'Verified enterprise member of the Allied Muslim Chamber of Business.')}
            </p>

            <div class="card-footer">
              <span style="font-size: 12px; color: var(--brand-emerald); font-weight: 600;">&#10003; Verified Member</span>
              <a href="/business-directory/${b.slug}" class="btn btn-outline btn-sm">View Profile &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Built for the Community Section -->
  <section style="background: #ffffff; padding: 56px 0 36px 0; border-bottom: 1px solid var(--border-light);">
    <div class="container" style="max-width: 1040px; margin: 0 auto;">
      <div style="text-align: center; max-width: 720px; margin: 0 auto 36px auto;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--brand-gold);">Ecosystem Value</span>
        <h2 style="font-size: 32px; font-weight: 800; color: var(--brand-navy); margin-top: 6px; margin-bottom: 12px; font-family: var(--font-serif);">Built for the Community</h2>
        <p style="font-size: 15.5px; line-height: 1.65; color: var(--text-muted); margin: 0 auto;">
          Whether you are searching for trusted businesses or growing your own, the AMCOB directory connects both sides of the ecosystem.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
        <div style="background: #fdfbf7; border: 1px solid rgba(212,175,55,0.25); border-radius: 14px; padding: 32px; display: flex; flex-direction: column;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(212,175,55,0.15); display: flex; align-items: center; justify-content: center; color: var(--brand-gold); font-size: 20px; margin-bottom: 18px;">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px; font-family: var(--font-serif);">For consumers</h3>
          <p style="font-size: 14px; line-height: 1.65; color: var(--text-body); margin: 0;">
            Find Muslim-owned businesses across every industry. Search by category, location, or specialty: and keep your dollars circulating within the community you trust.
          </p>
        </div>

        <div style="background: #fdfbf7; border: 1px solid rgba(212,175,55,0.25); border-radius: 14px; padding: 32px; display: flex; flex-direction: column;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(212,175,55,0.15); display: flex; align-items: center; justify-content: center; color: var(--brand-gold); font-size: 20px; margin-bottom: 18px;">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--brand-navy); margin-bottom: 10px; font-family: var(--font-serif);">For businesses</h3>
          <p style="font-size: 14px; line-height: 1.65; color: var(--text-body); margin: 0;">
            Get discovered by an audience actively looking for what you offer. AMCOB members get a free listing as part of their membership, plus access to a network of 372+ verified businesses and counting.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Not Listed Yet Section -->
  <section style="background: #091325; color: #ffffff; padding: 64px 0; border-top: 1px solid rgba(212,175,55,0.25);">
    <div class="container" style="max-width: 960px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 36px; flex-wrap: wrap;">
      <div style="max-width: 600px;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--brand-gold);">Expand Your Reach</span>
        <h2 style="font-size: 28px; font-weight: 800; color: #ffffff; margin-top: 6px; margin-bottom: 10px; font-family: var(--font-serif);">Not Listed Yet?</h2>
        <p style="font-size: 15px; line-height: 1.65; color: rgba(255,255,255,0.8); margin: 0;">
          AMCOB members get a free business listing: reach an audience actively searching for Muslim-owned businesses and grow within a trusted community.
        </p>
      </div>
      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="/join" class="btn btn-primary" style="padding: 12px 26px; font-size: 14px; font-weight: 700;">Apply for Membership</a>
        <a href="/add-listing" class="btn btn-secondary" style="padding: 12px 26px; font-size: 14px; font-weight: 700; background: rgba(255,255,255,0.08); color: #ffffff; border: 1px solid rgba(255,255,255,0.25);">+ Add Your Business</a>
      </div>
    </div>
  </section>
`;

const renderedDirectory = renderLayout({
  title: 'Business Directory | 372 Verified Muslim-Owned Businesses',
  description: 'Search the complete official AMCOB business directory featuring 372 verified Muslim-owned commercial enterprises across North America.',
  activeNav: 'directory',
  breadcrumbs: [{ label: 'Business Directory', url: '/business-directory' }],
  content: directoryContent
});

fs.writeFileSync('business-directory.html', renderedDirectory);
if (!fs.existsSync('business-directory')) {
  fs.mkdirSync('business-directory', { recursive: true });
}
fs.writeFileSync(path.join('business-directory', 'index.html'), renderedDirectory);
console.log('Generated business-directory.html and business-directory/index.html');

// 2. Business Directory Detail Template (business-directory-detail.html)
const directoryDetailContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge" id="bizCategoryBadge">Commercial Enterprise</span>
      <h1 class="page-title" id="bizTitle">Business Detail Profile</h1>
      <p class="page-subtitle" id="bizSubtitle">Verified member of the Allied Muslim Chamber of Business.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px;">
        <div>
          <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--border-light);">
            <div id="bizLogoContainer" style="width: 80px; height: 80px; border-radius: 8px; border: 1px solid var(--border-light); overflow: hidden; background: #ffffff; display: flex; align-items: center; justify-content: center;">
              <span id="bizInitials" style="font-size: 28px; font-weight: 700; color: var(--brand-navy);">B</span>
            </div>
            <div>
              <h2 id="bizHeaderName" style="font-size: 24px; font-weight: 750; color: var(--brand-navy); margin-bottom: 4px;">Loading profile...</h2>
              <span style="font-size: 13.5px; color: var(--brand-emerald); font-weight: 600;">&#10003; Chamber Verified Standing</span>
            </div>
          </div>

          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">About the Business</h3>
          <p id="bizDescription" style="font-size: 16px; color: var(--text-body); line-height: 1.7; margin-bottom: 28px;">
            Loading business profile details...
          </p>

          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">Commercial Verification &amp; Standards</h3>
          <div style="background-color: var(--bg-subtle); padding: 24px; border: 1px solid var(--border-light); border-radius: 8px;">
            <p style="font-size: 14px; color: var(--text-body); margin-bottom: 8px;">
              <strong>Chamber Member:</strong> Active verified enterprise in good standing.
            </p>
            <p style="font-size: 14px; color: var(--text-body); margin-bottom: 8px;">
              <strong>Ethical Charter:</strong> Compliant with the AMCOB Fiduciary Trust and Commercial Standards.
            </p>
            <p style="font-size: 14px; color: var(--text-body); margin: 0;">
              <strong>Direct Inquiries:</strong> Contact the business directly using the links on this profile.
            </p>
          </div>
        </div>

        <div>
          <div style="background-color: #ffffff; border: 1px solid var(--border-light); border-radius: 12px; padding: 32px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 18px;">Contact &amp; Details</h3>
            
            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 14px; margin-bottom: 24px;">
              <div>
                <span style="display: block; font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Industry Classification</span>
                <strong id="bizSideCategory" style="color: var(--brand-navy);">Commercial</strong>
              </div>
              <div id="bizWebsiteRow">
                <span style="display: block; font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Website</span>
                <a id="bizWebsiteLink" href="#" target="_blank" rel="noopener noreferrer" style="color: var(--brand-navy); text-decoration: underline; word-break: break-all;">Visit Official Website</a>
              </div>
            </div>

            <a href="/contact-us" class="btn btn-primary" style="width: 100%; margin-bottom: 12px;">Request Chamber Introduction</a>
            <a href="/business-directory" class="btn btn-outline btn-sm" style="width: 100%;">&larr; Back to Directory</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    // Dynamic Business Record Loader
    (async function() {
      const urlParams = new URLSearchParams(window.location.search);
      let slug = urlParams.get('slug');
      if (!slug) {
        // Try extracting from pathname if URL rewriting is used
        const parts = window.location.pathname.split('/').filter(Boolean);
        if (parts.length > 1 && parts[0] === 'business-directory') slug = parts[1];
      }

      try {
        const res = await fetch('/data/businesses.json');
        const list = await res.json();
        const biz = (slug ? list.find(b => b.slug === slug) : null) || list[0];

        if (biz) {
          document.title = biz.name + ' | AMCOB Business Directory';
          document.getElementById('bizTitle').textContent = biz.name;
          document.getElementById('bizHeaderName').textContent = biz.name;
          document.getElementById('bizSubtitle').textContent = (biz.description || '').substring(0, 140) + '...';
          document.getElementById('bizDescription').textContent = biz.description || 'Verified enterprise member of the Allied Muslim Chamber of Business.';
          document.getElementById('bizCategoryBadge').textContent = biz.category || 'Business';
          document.getElementById('bizSideCategory').textContent = biz.category || 'Business';

          if (biz.localImage) {
            document.getElementById('bizLogoContainer').innerHTML = '<img src=\"' + biz.localImage + '\" alt=\"' + biz.name + '\" style=\"max-width:100%; max-height:100%; object-fit:contain;\">';
          } else {
            document.getElementById('bizInitials').textContent = biz.name.charAt(0);
          }

          const webLink = document.getElementById('bizWebsiteLink');
          if (biz.website || biz.sameAs) {
            webLink.href = biz.website || biz.sameAs;
            webLink.textContent = biz.website || biz.sameAs;
          } else {
            webLink.href = 'https://amcob.org/business-directory/' + biz.slug;
            webLink.textContent = 'amcob.org/business-directory/' + biz.slug;
          }
        }
      } catch(e) {
        console.error('Error loading business detail:', e);
      }
    })();
  </script>
`;

fs.writeFileSync('business-directory-detail.html', renderLayout({
  title: 'Business Directory Profile',
  description: 'Verified business profile in the Allied Muslim Chamber of Business commercial directory.',
  activeNav: 'directory',
  breadcrumbs: [{ label: 'Directory', url: '/business-directory' }, { label: 'Business Profile', url: '#' }],
  content: directoryDetailContent
}));
console.log('Generated business-directory-detail.html');

// 3. Editorial Hub (blog.html)
const blogContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Editorial &amp; Insights</span>
      <h1 class="page-title">AMCOB Thought Leadership</h1>
      <p class="page-subtitle">
        In-depth strategic articles, market analysis, and practical guidance for scaling Muslim-owned enterprises across North America.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container filter-container">
      <div style="display: flex; gap: 10px; margin-bottom: 36px; flex-wrap: wrap;">
        <button class="filter-pill active" data-filter="all">All Articles (${articles.length})</button>
        <button class="filter-pill" data-filter="business">Business Strategy</button>
        <button class="filter-pill" data-filter="leadership">Leadership &amp; Growth</button>
        <button class="filter-pill" data-filter="muslim">Muslim Economy</button>
      </div>

      <div class="grid-3">
        ${articles.slice(0, 30).map(a => `
          <div class="card filterable-item" data-category="${esc(a.title.toLowerCase())}">
            ${a.localImage ? `
              <div class="card-media">
                <img src="${a.localImage}" alt="${esc(a.title)}" loading="lazy">
              </div>
            ` : ''}
            <span class="badge badge-blue" style="width: fit-content; margin-bottom: 8px;">Analysis</span>
            <h3 class="card-title">
              <a href="/blog-detail.html?slug=${a.slug}">${esc(a.title)}</a>
            </h3>
            <p class="card-body">
              ${esc(a.excerpt || 'Practical executive analysis and market perspectives from the Allied Muslim Chamber of Business.')}
            </p>
            <div class="card-footer">
              <span style="font-size: 13px; color: var(--text-muted);">AMCOB Editorial</span>
              <a href="/blog-detail.html?slug=${a.slug}" class="btn btn-outline btn-sm">Read Article &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>

      ${articles.length > 30 ? `
        <div style="margin-top: 48px; text-align: center;">
          <p style="font-size: 14.5px; color: var(--text-muted); margin-bottom: 16px;">Displaying 30 of ${articles.length} thought leadership articles.</p>
        </div>
      ` : ''}
    </div>
  </section>
`;

fs.writeFileSync('blog.html', renderLayout({
  title: 'Editorial & Strategic Insights | 190 In-Depth Articles',
  description: 'Explore AMCOB thought leadership articles covering American Muslim business growth, executive leadership, and commercial scaling.',
  activeNav: 'blog',
  breadcrumbs: [{ label: 'Editorial', url: '/blog' }],
  content: blogContent
}));
console.log('Generated blog.html');

// 4. Blog Detail Template (blog-detail.html)
const blogDetailContent = `
  <section class="page-intro">
    <div class="container" style="max-width: 840px;">
      <span class="badge badge-blue" style="margin-bottom: 12px;">Chamber Thought Leadership</span>
      <h1 class="page-title" id="articleHeadline" style="font-size: 36px;">Article Title</h1>
      <p style="font-size: 14px; color: var(--text-muted); margin-top: 8px;">
        Published by <strong style="color: var(--brand-navy);">AMCOB Editorial Team</strong> | Executive Briefing
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 840px;">
      <div id="articleImageContainer" style="border-radius: 12px; overflow: hidden; margin-bottom: 36px; border: 1px solid var(--border-light); background: var(--bg-subtle);">
        <img id="articleImage" src="/assets/optimized/logos/logo.png" alt="Article Header" style="width: 100%; height: auto; object-fit: cover;">
      </div>

      <div id="articleBody" style="font-size: 17px; line-height: 1.8; color: var(--text-body);">
        <p style="font-size: 19px; font-weight: 500; color: var(--brand-navy); margin-bottom: 24px; line-height: 1.6;" id="articleExcerpt">
          Loading article excerpt...
        </p>

        <p style="margin-bottom: 20px;">
          Operating an enduring business requires constant strategic discipline. Across North America, Muslim business leaders are scaling enterprises in highly competitive sectors by focusing on operational excellence, team governance, and long-term capital preservation.
        </p>

        <p style="margin-bottom: 20px;">
          Through the Allied Muslim Chamber of Business, leaders gain access to the collective experience of hundreds of peers who have navigated these exact inflection points. Whether evaluating executive hiring, expanding into new geographical markets, or optimizing gross margins, peer accountability provides the clarity needed to make confident decisions.
        </p>

        <div style="background-color: var(--bg-subtle); padding: 28px; border-left: 4px solid var(--brand-navy); border-radius: 4px; margin: 32px 0;">
          <p style="font-size: 16px; font-style: italic; color: var(--brand-navy); margin: 0;">
            "True institutional strength is not built in isolation. It emerges when capable leaders commit to rigorous standards, reciprocal trust, and collective economic advancement."
          </p>
        </div>

        <p style="margin-bottom: 20px;">
          As the commercial ecosystem expands, AMCOB continues to provide the institutional framework, peer advisory boards, and commercial trade networks necessary to sustain this momentum.
        </p>
      </div>

      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <a href="/blog" class="btn btn-secondary">&larr; Back to All Articles</a>
        <a href="/membership" class="btn btn-primary">Explore AMCOB Membership &rarr;</a>
      </div>
    </div>
  </section>

  <script>
    (async function() {
      const urlParams = new URLSearchParams(window.location.search);
      let slug = urlParams.get('slug');
      if (!slug) {
        const parts = window.location.pathname.split('/').filter(Boolean);
        if (parts.length > 1 && parts[0] === 'blog') slug = parts[1];
      }

      try {
        const res = await fetch('/data/articles.json');
        const list = await res.json();
        const art = (slug ? list.find(a => a.slug === slug) : null) || list[0];

        if (art) {
          document.title = art.title + ' | AMCOB Editorial';
          document.getElementById('articleHeadline').textContent = art.title;
          document.getElementById('articleExcerpt').textContent = art.excerpt || 'Practical executive insights and strategic guidance from the Allied Muslim Chamber of Business.';
          if (art.localImage) {
            document.getElementById('articleImage').src = art.localImage;
            document.getElementById('articleImage').alt = art.title;
          } else {
            document.getElementById('articleImageContainer').style.display = 'none';
          }
        }
      } catch(e) {
        console.error('Error loading article:', e);
      }
    })();
  </script>
`;

fs.writeFileSync('blog-detail.html', renderLayout({
  title: 'Editorial Article | AMCOB Thought Leadership',
  description: 'In-depth business strategy and executive analysis from the Allied Muslim Chamber of Business.',
  activeNav: 'blog',
  breadcrumbs: [{ label: 'Editorial', url: '/blog' }, { label: 'Article', url: '#' }],
  content: blogDetailContent
}));
console.log('Generated blog-detail.html');

// 5. Executive Library (books.html)
const booksContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Executive Knowledge Hub</span>
      <h1 class="page-title">AMCOB Executive Library</h1>
      <p class="page-subtitle">
        Curated executive syntheses of 64 foundational business, leadership, and management books designed for high-impact decision makers.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container filter-container">
      <div style="display: flex; gap: 10px; margin-bottom: 36px; flex-wrap: wrap;">
        <button class="filter-pill active" data-filter="all">All Summaries (${books.length})</button>
        <button class="filter-pill" data-filter="leadership">Leadership</button>
        <button class="filter-pill" data-filter="habits">Habits &amp; Productivity</button>
        <button class="filter-pill" data-filter="strategy">Strategy</button>
      </div>

      <div class="grid-4">
        ${books.map(bk => `
          <div class="card filterable-item" data-category="${esc(bk.title.toLowerCase())}">
            ${bk.localImage ? `
              <div style="aspect-ratio: 2/3; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-light);">
                <img src="${bk.localImage}" alt="${esc(bk.title)}" style="max-height: 100%; width: auto; object-fit: contain;" loading="lazy">
              </div>
            ` : `
              <div style="aspect-ratio: 2/3; border-radius: 6px; margin-bottom: 16px; background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--brand-navy); border: 1px solid var(--border-light);">
                Book Cover
              </div>
            `}
            <h3 style="font-size: 15.5px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px; line-height: 1.3;">
              <a href="/book-detail.html?slug=${bk.slug}">${esc(bk.title)}</a>
            </h3>
            <p style="font-size: 12.5px; color: var(--brand-gold); font-weight: 600; margin-bottom: 10px;">${esc(bk.author || 'Executive Summary')}</p>
            <p class="card-body" style="font-size: 13px; line-height: 1.5; color: var(--text-body); margin-bottom: 14px;">
              ${esc(bk.description || 'Comprehensive executive synthesis and strategic takeaways.')}
            </p>
            <div class="card-footer" style="padding-top: 10px;">
              <a href="/book-detail.html?slug=${bk.slug}" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">Read Summary &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

fs.writeFileSync('books.html', renderLayout({
  title: 'Executive Library | 64 Business Book Summaries',
  description: 'Curated executive syntheses of 64 influential management, leadership, and strategy books for business owners.',
  activeNav: 'books',
  breadcrumbs: [{ label: 'Executive Library', url: '/books' }],
  content: booksContent
}));
console.log('Generated books.html');

// 6. Book Detail Template (book-detail.html)
const bookDetailContent = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Executive Book Synthesis</span>
      <h1 class="page-title" id="bookTitle">Book Title</h1>
      <p class="page-subtitle" id="bookAuthor">By Author</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 260px 1fr; gap: 48px; align-items: flex-start;">
        <div>
          <div style="border-radius: 8px; overflow: hidden; border: 1px solid var(--border-light); background: var(--bg-subtle); box-shadow: var(--shadow-md); margin-bottom: 20px;">
            <img id="bookImage" src="/assets/optimized/logos/logo.png" alt="Book Cover" style="width: 100%; height: auto; object-fit: contain;">
          </div>
          <a href="/books" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">&larr; Back to Library</a>
        </div>

        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">Executive Overview</h2>
          <p id="bookDescription" style="font-size: 16px; color: var(--text-body); line-height: 1.7; margin-bottom: 28px;">
            Loading book summary...
          </p>

          <h3 style="font-size: 19px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">Key Strategic Takeaways for Founders</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 15px; color: var(--text-body); margin-bottom: 32px;">
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Principle-Centered Leadership:</strong> Aligning long-term organizational strategy with timeless human and commercial principles.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Delegation and Systems:</strong> Shifting executive focus from tactical execution to organizational design and culture.</span>
            </li>
            <li style="display: flex; gap: 10px;">
              <span style="color: var(--brand-emerald); font-weight: bold;">&#10003;</span>
              <span><strong>Sustainable Competitive Advantage:</strong> Building enduring customer moats through specialized competence and trust.</span>
            </li>
          </ul>

          <div style="background-color: var(--bg-subtle); padding: 24px; border: 1px solid var(--border-light); border-radius: 8px;">
            <h4 style="font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 8px;">Executive Implementation in AMCOB Cohorts</h4>
            <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6; margin: 0;">
              AMCOB Peer Advisory Groups regularly examine core concepts from this text during monthly advisory sessions, translating theoretical frameworks into operational scorecards.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    (async function() {
      const urlParams = new URLSearchParams(window.location.search);
      let slug = urlParams.get('slug');
      if (!slug) {
        const parts = window.location.pathname.split('/').filter(Boolean);
        if (parts.length > 1 && parts[0] === 'books') slug = parts[1];
      }

      try {
        const res = await fetch('/data/books.json');
        const list = await res.json();
        const bk = (slug ? list.find(b => b.slug === slug) : null) || list[0];

        if (bk) {
          document.title = bk.title + ' | AMCOB Executive Library';
          document.getElementById('bookTitle').textContent = bk.title;
          document.getElementById('bookAuthor').textContent = bk.author ? 'By ' + bk.author : 'Executive Business Synthesis';
          document.getElementById('bookDescription').textContent = bk.description || 'Comprehensive executive summary curated for business founders.';
          if (bk.localImage) {
            document.getElementById('bookImage').src = bk.localImage;
            document.getElementById('bookImage').alt = bk.title;
          }
        }
      } catch(e) {
        console.error('Error loading book:', e);
      }
    })();
  </script>
`;

fs.writeFileSync('book-detail.html', renderLayout({
  title: 'Executive Book Summary | AMCOB Library',
  description: 'Read the comprehensive executive book synthesis and key takeaways for business leaders.',
  activeNav: 'books',
  breadcrumbs: [{ label: 'Executive Library', url: '/books' }, { label: 'Book Summary', url: '#' }],
  content: bookDetailContent
}));
console.log('Generated book-detail.html');
