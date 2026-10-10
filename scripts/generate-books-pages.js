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

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/books-rich.json'), 'utf8'));

const targetDir = path.join(__dirname, '../books');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Generating individual static pages for ${books.length} executive books...`);

books.forEach((book, index) => {
  const cleanTitle = cleanCopy(book.title);
  const cleanAuthor = cleanCopy(book.author || 'Executive Insight');
  const cleanLead = cleanCopy(book.lead || book.description || '');
  const cleanDate = cleanCopy(book.date || 'Curated by AMCOB Executive Library');
  const cleanBody = cleanHtmlContent(book.richHtml || `<p>${esc(cleanLead)}</p>`);

  const prevBook = books[(index - 1 + books.length) % books.length];
  const nextBook = books[(index + 1) % books.length];

  const related = books.filter(b => b.slug !== book.slug).slice(0, 3);

  const imageSrc = book.localImage || book.image || '/assets/optimized/hero/amcob-summit-atrium.webp';

  const content = `
  <!-- Book Header Hero -->
  <section style="background: linear-gradient(135deg, #061233 0%, #0a1e54 50%, #0d266e 100%); color: #ffffff; padding: 64px 0 52px 0; border-bottom: 1px solid rgba(255,255,255,0.08); position: relative; overflow: hidden;">
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(206,137,36,0.14) 0%, transparent 60%); pointer-events: none;"></div>
    
    <div class="container" style="max-width: 1040px; margin: 0 auto; position: relative; z-index: 2;">
      <div style="display: grid; grid-template-columns: 1fr 240px; gap: 48px; align-items: center;">
        
        <div>
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;">
            <span class="badge" style="background: rgba(206,137,36,0.22); color: #f59e0b; border: 1px solid rgba(206,137,36,0.4); text-transform: uppercase; letter-spacing: 0.05em; font-size: 11.5px; padding: 5px 12px; font-weight: 700;">
              Executive Reading Library
            </span>
            <span style="font-size: 13.5px; color: rgba(255,255,255,0.7); font-weight: 500;">
              ${esc(cleanDate)}
            </span>
          </div>

          <h1 style="font-size: 36px; font-weight: 800; color: #ffffff; margin-bottom: 12px; line-height: 1.25; font-family: var(--font-serif);">
            ${esc(cleanTitle)}
          </h1>

          <p style="font-size: 16px; color: var(--brand-gold); font-weight: 600; margin-bottom: 20px;">
            by ${esc(cleanAuthor)}
          </p>

          ${cleanLead ? `
            <p style="font-size: 16.5px; color: rgba(255,255,255,0.88); line-height: 1.7; margin-bottom: 24px;">
              ${esc(cleanLead)}
            </p>
          ` : ''}

          <!-- Prev & Next Navigation -->
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <a href="/books/${prevBook.slug}" class="btn btn-sm" style="background: rgba(255,255,255,0.08); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px);">
              &larr; Previous Book
            </a>
            <a href="/books/${nextBook.slug}" class="btn btn-sm" style="background: var(--brand-gold); color: #ffffff; font-weight: 600;">
              Next Book &rarr;
            </a>
          </div>
        </div>

        <!-- Book Cover Artwork -->
        <div style="display: flex; justify-content: center;">
          <div style="width: 100%; max-width: 220px; aspect-ratio: 1/1.45; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; padding: 12px;">
            <img src="${imageSrc}" alt="${esc(cleanTitle)}" style="max-width: 100%; max-height: 100%; object-fit: contain;" loading="eager">
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Book Summary & Review Body -->
  <section class="section" style="padding: 56px 0; background: #ffffff;">
    <div class="container" style="max-width: 920px; margin: 0 auto;">
      
      <div style="margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid var(--border-light);">
        <h2 style="font-size: 24px; font-weight: 800; color: var(--brand-navy); margin-bottom: 12px; font-family: var(--font-serif);">
          Executive Book Summary
        </h2>
        <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.6; margin: 0;">
          Curated core insights, management frameworks, and strategic applications for chamber founders and business leaders.
        </p>
      </div>

      <!-- Book Summary Rich Content -->
      <article class="book-summary-body" style="font-size: 16.5px; line-height: 1.8; color: var(--text-body);">
        <style>
          .book-summary-body h2 { font-size: 22px; font-weight: 800; color: var(--brand-navy); margin: 36px 0 16px 0; font-family: var(--font-serif); }
          .book-summary-body h3 { font-size: 19px; font-weight: 750; color: var(--brand-navy); margin: 28px 0 12px 0; }
          .book-summary-body p { margin-bottom: 20px; }
          .book-summary-body ul, .book-summary-body ol { margin: 0 0 24px 28px; }
          .book-summary-body li { margin-bottom: 8px; }
          .book-summary-body blockquote { border-left: 4px solid var(--brand-gold); padding: 12px 24px; margin: 28px 0; background: var(--bg-subtle); border-radius: 0 8px 8px 0; font-style: italic; }
        </style>
        ${cleanBody}
      </article>

      <!-- Back to Library Button -->
      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <a href="/books/${prevBook.slug}" class="btn btn-outline btn-sm">
          &larr; Previous Book
        </a>
        <a href="/books" class="btn btn-secondary btn-sm">
          All Library Books &rarr;
        </a>
        <a href="/books/${nextBook.slug}" class="btn btn-outline btn-sm">
          Next Book &rarr;
        </a>
      </div>

    </div>
  </section>

  <!-- Related Books Section -->
  <section class="section" style="background-color: var(--bg-subtle); border-top: 1px solid var(--border-light); padding: 56px 0;">
    <div class="container" style="max-width: 1040px; margin: 0 auto;">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 36px auto;">
        <span class="badge badge-gold" style="margin-bottom: 8px;">Recommended Reading</span>
        <h2 class="section-title" style="margin: 0; font-size: 26px;">More Executive Leadership Books</h2>
      </div>

      <div class="grid-3">
        ${related.map(rel => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; border-radius: 12px; border: 1px solid var(--border-light); padding: 24px;">
            <div>
              <div style="width: 100%; height: 150px; background: #ffffff; border-radius: 8px; border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: center; padding: 12px; margin-bottom: 16px;">
                <img src="${rel.image || '/assets/optimized/hero/amcob-summit-atrium.webp'}" alt="${esc(cleanCopy(rel.title))}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
              </div>
              <span class="badge" style="background: rgba(206,137,36,0.1); color: var(--brand-gold); font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">
                by ${esc(cleanCopy(rel.author || 'Executive Insight'))}
              </span>
              <h4 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px; line-height: 1.3;">
                <a href="/books/${rel.slug}">${esc(cleanCopy(rel.title))}</a>
              </h4>
              <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin: 0;">
                ${esc(cleanCopy(rel.lead || rel.description || '').slice(0, 110))}...
              </p>
            </div>
            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-light);">
              <a href="/books/${rel.slug}" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">View Book Summary &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  const html = renderLayout({
    title: `${cleanTitle} | Executive Reading Library`,
    description: cleanLead.slice(0, 160),
    activeNav: 'books',
    breadcrumbs: [
      { label: 'Intelligence', url: '/editorial' },
      { label: 'Executive Library', url: '/books' },
      { label: cleanTitle, url: `/books/${book.slug}` }
    ],
    content
  });

  const targetFile = path.join(targetDir, `${book.slug}.html`);
  fs.writeFileSync(targetFile, html, 'utf8');

  if ((index + 1) % 20 === 0 || index + 1 === books.length) {
    console.log(`Generated ${index + 1}/${books.length} static book pages.`);
  }
});

console.log(`\nSuccessfully generated static pages for all ${books.length} executive books!`);
