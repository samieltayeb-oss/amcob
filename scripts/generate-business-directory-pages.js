const fs = require('fs');
const path = require('path');
const { renderLayout, esc } = require('./site-layout');

// Clean copy helper to enforce ZERO prose dashes and brand voice standards
function cleanCopy(str) {
  if (!str) return '';
  return str
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/–/g, '-')
    .replace(/\s+-\s+/g, ': ')
    .replace(/\bcutting-edge\b/gi, 'advanced')
    .replace(/\btestament to\b/gi, 'evidence of')
    .replace(/\bseamless ecosystem\b/gi, 'integrated network')
    .replace(/\s+/g, ' ')
    .trim();
}

// Load rich businesses data
const richDataPath = path.join(__dirname, '../data/businesses-rich.json');
const businesses = JSON.parse(fs.readFileSync(richDataPath, 'utf8'));

// Build lookup maps
const slugMap = new Map();
const categoryMap = new Map();

businesses.forEach(b => {
  slugMap.set(b.slug, b);
  if (!categoryMap.has(b.category)) {
    categoryMap.set(b.category, []);
  }
  categoryMap.get(b.category).push(b);
});

// Ensure directory exists
const targetDir = path.join(__dirname, '../business-directory');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Generating individual profile pages for ${businesses.length} businesses...`);

businesses.forEach((biz, index) => {
  // Determine previous and next businesses
  let prevBiz = null;
  let nextBiz = null;

  if (biz.prev && biz.prev.href) {
    const prevSlug = biz.prev.href.replace(/^\/business-directory\//, '');
    prevBiz = slugMap.get(prevSlug);
  }
  if (!prevBiz) {
    const prevIndex = (index - 1 + businesses.length) % businesses.length;
    prevBiz = businesses[prevIndex];
  }

  if (biz.next && biz.next.href) {
    const nextSlug = biz.next.href.replace(/^\/business-directory\//, '');
    nextBiz = slugMap.get(nextSlug);
  }
  if (!nextBiz) {
    const nextIndex = (index + 1) % businesses.length;
    nextBiz = businesses[nextIndex];
  }

  // Resolve similar listings
  let similarList = [];
  if (Array.isArray(biz.similar) && biz.similar.length > 0) {
    similarList = biz.similar.map(s => {
      const match = slugMap.get(s.slug);
      return {
        slug: s.slug,
        name: (match && match.name) ? match.name : s.name,
        category: (match && match.category) ? match.category : (s.category || biz.category),
        image: (match && match.localImage) ? match.localImage : (s.image || '/assets/optimized/logos/logo-nav-white.webp'),
        url: `/business-directory/${s.slug}`
      };
    }).filter(s => s.slug !== biz.slug && s.name);
  }

  // If fewer than 4 similar listings, backfill from the same category
  if (similarList.length < 4) {
    const catMatches = categoryMap.get(biz.category) || [];
    for (const other of catMatches) {
      if (other.slug !== biz.slug && !similarList.some(s => s.slug === other.slug)) {
        similarList.push({
          slug: other.slug,
          name: other.name,
          category: other.category,
          image: other.localImage || other.image || '/assets/optimized/logos/logo-nav-white.webp',
          url: `/business-directory/${other.slug}`
        });
        if (similarList.length >= 4) break;
      }
    }
  }

  // Slice to max 4
  similarList = similarList.slice(0, 4);

  // Extract contact fields
  const contact = biz.contactItems || {};
  const owner = contact.Owner ? cleanCopy(contact.Owner) : '';
  const website = contact.Website ? (typeof contact.Website === 'object' ? contact.Website : { text: contact.Website, href: contact.Website }) : null;
  const email = contact.Email ? contact.Email.trim() : '';
  const phone = contact.Phone ? contact.Phone.trim() : '';

  // Clean about text
  const cleanAbout = cleanCopy(biz.about || biz.heroDesc || `${biz.name} is a verified commercial enterprise member of the Allied Muslim Chamber of Business.`);
  const cleanHeroDesc = cleanCopy(biz.heroDesc || cleanAbout.slice(0, 240) + '...');
  const cleanName = cleanCopy(biz.name);
  const cleanCategory = cleanCopy(biz.category || 'Commercial Enterprise');

  // Format about paragraphs
  const aboutParagraphs = cleanAbout
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p style="font-size: 16px; color: var(--text-body); line-height: 1.75; margin-bottom: 20px;">${esc(p)}</p>`)
    .join('');

  const imageSrc = biz.localImage || biz.image || '/assets/optimized/logos/logo-nav-white.webp';

  const content = `
  <!-- Business Header Hero -->
  <section style="background: linear-gradient(135deg, #061233 0%, #0a1e54 50%, #0d266e 100%); color: #ffffff; padding: 60px 0 50px 0; border-bottom: 1px solid rgba(255,255,255,0.08); position: relative; overflow: hidden;">
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(206,137,36,0.12) 0%, transparent 60%); pointer-events: none;"></div>
    
    <div class="container" style="position: relative; z-index: 2;">
      <div style="display: grid; grid-template-columns: 1fr 280px; gap: 48px; align-items: center;">
        
        <!-- Left: Badges, Title, Bio, and Prev/Next Navigation -->
        <div>
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;">
            <a href="/business-directory?category=${encodeURIComponent(biz.category)}" class="badge" style="background: rgba(206,137,36,0.22); color: #f59e0b; border: 1px solid rgba(206,137,36,0.4); text-transform: uppercase; letter-spacing: 0.05em; font-size: 11.5px; padding: 5px 12px; font-weight: 700;">
              ${esc(cleanCategory)}
            </a>
            <span class="badge" style="background: rgba(16,185,129,0.18); color: #34d399; border: 1px solid rgba(16,185,129,0.3); font-size: 11.5px; padding: 5px 12px; font-weight: 600;">
              &#10003; Chamber Verified
            </span>
          </div>

          <h1 style="font-size: 34px; font-weight: 800; color: #ffffff; margin-bottom: 16px; line-height: 1.25; font-family: var(--font-serif);">
            ${esc(cleanName)}
          </h1>

          <p style="font-size: 16px; color: rgba(255,255,255,0.85); line-height: 1.7; margin-bottom: 28px; max-width: 680px;">
            ${esc(cleanHeroDesc)}
          </p>

          <!-- Prev & Next Listing Navigation -->
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            ${prevBiz ? `
              <a href="/business-directory/${prevBiz.slug}" class="btn btn-sm" style="background: rgba(255,255,255,0.08); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px); display: inline-flex; align-items: center; gap: 8px;">
                &larr; ${esc(cleanCopy(prevBiz.name))}
              </a>
            ` : ''}

            ${nextBiz ? `
              <a href="/business-directory/${nextBiz.slug}" class="btn btn-sm" style="background: var(--brand-gold); color: #ffffff; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                ${esc(cleanCopy(nextBiz.name))} &rarr;
              </a>
            ` : ''}
          </div>
        </div>

        <!-- Right: Business Logo Showcase Card -->
        <div style="display: flex; justify-content: center;">
          <div style="width: 100%; max-width: 280px; aspect-ratio: 1/1; background: #ffffff; border-radius: 16px; padding: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 16px 36px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2);">
            <img src="${imageSrc}" alt="${esc(cleanName)}" style="max-width: 100%; max-height: 100%; object-fit: contain;" loading="eager">
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Main Business Profile Body -->
  <section class="section" style="padding: 56px 0;">
    <div class="container">
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: start;">
        
        <!-- Left: Detailed About & Chamber Verification -->
        <div>
          <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 24px; margin-bottom: 32px;">
            <h2 style="font-size: 24px; font-weight: 800; color: var(--brand-navy); margin-bottom: 20px; font-family: var(--font-serif);">
              About <span style="color: var(--brand-gold);">${esc(cleanName)}</span>
            </h2>
            <div style="color: var(--text-body);">
              ${aboutParagraphs}
            </div>
          </div>

          <!-- Chamber Standing & Fiduciary Standards -->
          <div style="background-color: var(--bg-subtle); padding: 28px 32px; border-radius: 12px; border: 1px solid var(--border-light); margin-bottom: 40px;">
            <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
              AMCOB Commercial Verification Standing
            </h3>
            <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.65; margin-bottom: 14px;">
              ${esc(cleanName)} is an active commercial member in verified standing with the Allied Muslim Chamber of Business. Directory members adhere to AMCOB commercial ethics, collaborative trade values, and regional enterprise governance standards.
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; font-size: 13.5px; color: var(--brand-navy); font-weight: 600;">
              <span>&#10003; Verified Enterprise</span>
              <span>&#10003; Ethical Charter Member</span>
              <span>&#10003; Directory Listed</span>
            </div>
          </div>
        </div>

        <!-- Right: Contact Information Sidebar Card -->
        <div>
          <div class="card" style="padding: 32px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-light); border-radius: 12px; position: sticky; top: 100px;">
            <h3 style="font-size: 18px; font-weight: 750; color: var(--brand-navy); margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-light);">
              Contact Information
            </h3>

            <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 28px;">
              
              <!-- Owner / Leadership -->
              ${owner ? `
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(10,30,84,0.06); display: flex; align-items: center; justify-content: center; color: var(--brand-navy); flex-shrink: 0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <span style="display: block; font-size: 12px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.04em;">Leadership</span>
                    <strong style="font-size: 14.5px; color: var(--brand-navy); font-weight: 700;">${esc(owner)}</strong>
                  </div>
                </div>
              ` : ''}

              <!-- Website -->
              ${website && website.href ? `
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(206,137,36,0.1); display: flex; align-items: center; justify-content: center; color: var(--brand-gold); flex-shrink: 0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
                  <div style="overflow: hidden;">
                    <span style="display: block; font-size: 12px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.04em;">Website</span>
                    <a href="${esc(website.href)}" target="_blank" rel="noopener noreferrer" style="font-size: 14px; color: var(--brand-navy); font-weight: 600; text-decoration: underline; word-break: break-all;">
                      ${esc(website.text || website.href)} &rarr;
                    </a>
                  </div>
                </div>
              ` : ''}

              <!-- Email -->
              ${email ? `
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(16,185,129,0.1); display: flex; align-items: center; justify-content: center; color: #10b981; flex-shrink: 0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div style="overflow: hidden;">
                    <span style="display: block; font-size: 12px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.04em;">Direct Email</span>
                    <a href="mailto:${esc(email)}" style="font-size: 14px; color: var(--brand-navy); font-weight: 600; word-break: break-all;">
                      ${esc(email)}
                    </a>
                  </div>
                </div>
              ` : ''}

              <!-- Phone -->
              ${phone ? `
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(59,130,246,0.1); display: flex; align-items: center; justify-content: center; color: #3b82f6; flex-shrink: 0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <span style="display: block; font-size: 12px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.04em;">Phone</span>
                    <a href="tel:${esc(phone)}" style="font-size: 14.5px; color: var(--brand-navy); font-weight: 700;">
                      ${esc(phone)}
                    </a>
                  </div>
                </div>
              ` : ''}

              <!-- Sector Classification -->
              <div style="display: flex; gap: 14px; align-items: flex-start;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(10,30,84,0.06); display: flex; align-items: center; justify-content: center; color: var(--brand-navy); flex-shrink: 0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
                <div>
                  <span style="display: block; font-size: 12px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.04em;">Sector</span>
                  <strong style="font-size: 14.5px; color: var(--brand-navy); font-weight: 700;">${esc(cleanCategory)}</strong>
                </div>
              </div>

            </div>

            <!-- Action CTAs -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${website && website.href ? `
                <a href="${esc(website.href)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; text-align: center; font-weight: 600;">
                  Visit Official Website &rarr;
                </a>
              ` : `
                <a href="/contact-us" class="btn btn-primary" style="width: 100%; text-align: center; font-weight: 600;">
                  Request Introduction &rarr;
                </a>
              `}

              <a href="/business-directory" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
                &larr; Back to Directory
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Similar Listings in Category Section -->
  ${similarList.length > 0 ? `
  <section class="section" style="background-color: var(--bg-subtle); border-top: 1px solid var(--border-light); padding: 56px 0;">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 16px;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 8px;">Related Businesses</span>
          <h2 class="section-title" style="margin: 0; font-size: 26px;">Similar Listings in ${esc(cleanCategory)}</h2>
        </div>
        <a href="/business-directory?category=${encodeURIComponent(biz.category)}" class="btn btn-outline btn-sm">
          Browse All ${esc(cleanCategory)} Listings &rarr;
        </a>
      </div>

      <div class="grid-4">
        ${similarList.map(sim => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 24px; border-radius: 12px; border: 1px solid var(--border-light); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div>
              <div style="width: 100%; height: 110px; background: #ffffff; border-radius: 8px; border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: center; padding: 14px; margin-bottom: 16px;">
                <img src="${sim.image}" alt="${esc(cleanCopy(sim.name))}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
              </div>
              <span class="badge" style="background: rgba(10,30,84,0.06); color: var(--brand-navy); font-size: 11px; padding: 3px 8px; margin-bottom: 8px; display: inline-block;">
                ${esc(cleanCopy(sim.category))}
              </span>
              <h4 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); margin-bottom: 8px; line-height: 1.3;">
                ${esc(cleanCopy(sim.name))}
              </h4>
            </div>
            <div style="margin-top: 16px; pt-2; border-top: 1px solid var(--border-light);">
              <a href="${sim.url}" class="btn btn-outline btn-sm" style="width: 100%; text-align: center;">
                View Profile &rarr;
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}
  `;

  const html = renderLayout({
    title: `${cleanName} | AMCOB Business Directory`,
    description: cleanHeroDesc,
    activeNav: 'directory',
    breadcrumbs: [
      { label: 'Ecosystem', url: '/ecosystem' },
      { label: 'Business Directory', url: '/business-directory' },
      { label: cleanCategory, url: `/business-directory?category=${encodeURIComponent(biz.category)}` },
      { label: cleanName, url: `/business-directory/${biz.slug}` }
    ],
    content
  });

  const targetFile = path.join(targetDir, `${biz.slug}.html`);
  fs.writeFileSync(targetFile, html, 'utf8');

  if ((index + 1) % 50 === 0 || index + 1 === businesses.length) {
    console.log(`Generated ${index + 1}/${businesses.length} static business pages.`);
  }
});

console.log(`\nSuccessfully generated static pages for all ${businesses.length} businesses!`);
