const fs = require('fs');
const path = require('path');
const { renderLayout, esc } = require('./site-layout');

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
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanHtmlContent(html) {
  if (!html) return '';
  return html
    .replace(/\s*[—–]\s*/g, ', ')
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
    .trim();
}

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/articles-rich.json'), 'utf8'));

const targetDir = path.join(__dirname, '../blog');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Generating individual static pages for ${articles.length} blog articles...`);

articles.forEach((art, index) => {
  const cleanTitle = cleanCopy(art.title);
  const cleanLead = cleanCopy(art.lead || art.excerpt || '');
  const cleanDate = cleanCopy(art.date || 'Published by AMCOB Editorial');
  const cleanBody = cleanHtmlContent(art.richHtml || `<p>${esc(cleanLead)}</p>`);

  const prevArt = articles[(index - 1 + articles.length) % articles.length];
  const nextArt = articles[(index + 1) % articles.length];

  const related = articles.filter(a => a.slug !== art.slug).slice(0, 3);

  const imageSrc = art.localImage || art.image || '/assets/optimized/hero/amcob-summit-atrium.webp';

  const content = `
  <!-- Article Header Hero -->
  <section style="background: linear-gradient(135deg, #061233 0%, #0a1e54 50%, #0d266e 100%); color: #ffffff; padding: 64px 0 48px 0; border-bottom: 1px solid rgba(255,255,255,0.08); position: relative; overflow: hidden;">
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(206,137,36,0.14) 0%, transparent 60%); pointer-events: none;"></div>
    
    <div class="container" style="max-width: 920px; margin: 0 auto; position: relative; z-index: 2;">
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;">
        <span class="badge" style="background: rgba(206,137,36,0.22); color: #f59e0b; border: 1px solid rgba(206,137,36,0.4); text-transform: uppercase; letter-spacing: 0.05em; font-size: 11.5px; padding: 5px 12px; font-weight: 700;">
          Chamber Editorial
        </span>
        <span style="font-size: 13.5px; color: rgba(255,255,255,0.7); font-weight: 500;">
          ${esc(cleanDate)}
        </span>
      </div>

      <h1 style="font-size: 38px; font-weight: 800; color: #ffffff; margin-bottom: 20px; line-height: 1.25; font-family: var(--font-serif);">
        ${esc(cleanTitle)}
      </h1>

      ${cleanLead ? `
        <p style="font-size: 17.5px; color: rgba(255,255,255,0.9); line-height: 1.7; margin-bottom: 28px; font-weight: 450;">
          ${esc(cleanLead)}
        </p>
      ` : ''}

      <!-- Tags / Chips -->
      ${Array.isArray(art.chips) && art.chips.length > 0 ? `
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${art.chips.map(chip => `
            <span class="badge" style="background: rgba(255,255,255,0.1); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); font-size: 12px; padding: 4px 10px;">
              ${esc(cleanCopy(chip))}
            </span>
          `).join('')}
        </div>
      ` : ''}
    </div>
  </section>

  <!-- Article Body Section -->
  <section class="section" style="padding: 56px 0; background: #ffffff;">
    <div class="container" style="max-width: 920px; margin: 0 auto;">
      
      <!-- Featured Image -->
      ${art.image ? `
        <div style="width: 100%; border-radius: 14px; overflow: hidden; margin-bottom: 40px; box-shadow: var(--shadow-md); border: 1px solid var(--border-light); max-height: 480px; background: #000;">
          <img src="${art.image}" alt="${esc(cleanTitle)}" style="width: 100%; height: 100%; object-fit: cover;" loading="eager">
        </div>
      ` : ''}

      <!-- Article Rich Content -->
      <article class="article-content-body" style="font-size: 16.5px; line-height: 1.8; color: var(--text-body);">
        <style>
          .article-content-body h2 { font-size: 24px; font-weight: 800; color: var(--brand-navy); margin: 36px 0 16px 0; font-family: var(--font-serif); }
          .article-content-body h3 { font-size: 20px; font-weight: 750; color: var(--brand-navy); margin: 28px 0 12px 0; }
          .article-content-body p { margin-bottom: 20px; }
          .article-content-body ul, .article-content-body ol { margin: 0 0 24px 28px; }
          .article-content-body li { margin-bottom: 8px; }
          .article-content-body blockquote { border-left: 4px solid var(--brand-gold); padding: 12px 24px; margin: 28px 0; background: var(--bg-subtle); border-radius: 0 8px 8px 0; font-style: italic; }
        </style>
        ${cleanBody}
      </article>

      <!-- Post Footer / Navigation -->
      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <a href="/blog/${prevArt.slug}" class="btn btn-outline btn-sm">
          &larr; Previous Article
        </a>
        <a href="/blog" class="btn btn-secondary btn-sm">
          All Editorial Insights &rarr;
        </a>
        <a href="/blog/${nextArt.slug}" class="btn btn-outline btn-sm">
          Next Article &rarr;
        </a>
      </div>

    </div>
  </section>

  <!-- Related Articles Grid -->
  <section class="section" style="background-color: var(--bg-subtle); border-top: 1px solid var(--border-light); padding: 56px 0;">
    <div class="container" style="max-width: 1040px; margin: 0 auto;">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 36px auto;">
        <span class="badge badge-gold" style="margin-bottom: 8px;">Chamber Intelligence</span>
        <h2 class="section-title" style="margin: 0; font-size: 26px;">Related Editorial Articles</h2>
      </div>

      <div class="grid-3">
        ${related.map(rel => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; border-radius: 12px; border: 1px solid var(--border-light); padding: 24px;">
            <div>
              ${rel.image ? `
                <div style="width: 100%; height: 140px; border-radius: 8px; overflow: hidden; margin-bottom: 16px; border: 1px solid var(--border-light);">
                  <img src="${rel.image}" alt="${esc(cleanCopy(rel.title))}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
              ` : ''}
              <h4 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 10px; line-height: 1.35;">
                <a href="/blog/${rel.slug}">${esc(cleanCopy(rel.title))}</a>
              </h4>
              <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin: 0;">
                ${esc(cleanCopy(rel.lead || rel.excerpt || '').slice(0, 110))}...
              </p>
            </div>
            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-light);">
              <a href="/blog/${rel.slug}" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">Read Article &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  const html = renderLayout({
    title: `${cleanTitle} | AMCOB Editorial`,
    description: cleanLead.slice(0, 160),
    activeNav: 'blog',
    breadcrumbs: [
      { label: 'Intelligence', url: '/editorial' },
      { label: 'Chamber Editorial', url: '/blog' },
      { label: cleanTitle, url: `/blog/${art.slug}` }
    ],
    content
  });

  const targetFile = path.join(targetDir, `${art.slug}.html`);
  fs.writeFileSync(targetFile, html, 'utf8');

  if ((index + 1) % 50 === 0 || index + 1 === articles.length) {
    console.log(`Generated ${index + 1}/${articles.length} static article pages.`);
  }
});

console.log(`\nSuccessfully generated static pages for all ${articles.length} blog articles!`);
