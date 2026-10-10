const fs = require('fs');
const path = require('path');
const { renderLayout } = require('./site-layout');

const ambassadors = JSON.parse(fs.readFileSync('data/ambassadors-full.json', 'utf8'));

// Ensure ambassador-program directory exists
if (!fs.existsSync('ambassador-program')) {
  fs.mkdirSync('ambassador-program', { recursive: true });
}

function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

ambassadors.forEach(amb => {
  const otherAmbassadors = ambassadors.filter(a => a.slug !== amb.slug).slice(0, 4);

  const content = `
  <section class="page-intro" style="padding-bottom: 24px;">
    <div class="container">
      <span class="page-intro-badge">Chapter Leadership</span>
      <h1 class="page-title">${esc(amb.name)}</h1>
      <p class="page-subtitle">
        ${esc(amb.role)} &bull; ${esc(amb.company)}
      </p>
    </div>
  </section>

  <section class="section" style="padding-top: 24px;">
    <div class="container">
      <div class="card" style="max-width: 980px; margin: 0 auto; padding: 40px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-light);">
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 40px; align-items: start;">
          <!-- Left Column: Photo & Direct Actions -->
          <div>
            <div style="width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-light); margin-bottom: 20px; aspect-ratio: 1/1.15; background-color: var(--bg-subtle);">
              <img src="${amb.photo}" alt="${esc(amb.name)}" style="width: 100%; height: 100%; object-fit: cover;" loading="eager">
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${amb.linkedin ? `
                <a href="${esc(amb.linkedin)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="text-align: center; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.763z"/></svg>
                  Connect on LinkedIn
                </a>
              ` : ''}

              ${amb.website ? `
                <a href="${esc(amb.website)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="text-align: center; width: 100%;">
                  Company Website &rarr;
                </a>
              ` : ''}
              
              <a href="/ambassador-program" class="btn btn-secondary btn-sm" style="text-align: center; width: 100%;">
                &larr; All Ambassadors
              </a>
            </div>
          </div>

          <!-- Right Column: Identity, Chips, and Bio -->
          <div>
            <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 20px; margin-bottom: 24px;">
              <span class="badge badge-gold" style="margin-bottom: 10px;">Official AMCOB Ambassador</span>
              <h2 style="font-size: 28px; font-weight: 800; color: var(--brand-navy); margin-bottom: 6px;">${esc(amb.name)}</h2>
              <p style="font-size: 16px; color: var(--brand-gold); font-weight: 600; margin-bottom: 14px;">${esc(amb.role)} &bull; ${esc(amb.company)}</p>

              <!-- Focus Chips -->
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${amb.chips.map(chip => `
                  <span class="badge" style="background-color: var(--bg-subtle); color: var(--brand-navy); border: 1px solid var(--border-light); font-size: 12.5px; padding: 5px 12px;">
                    ${esc(chip)}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Biographical Statement -->
            <div>
              <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-navy); margin-bottom: 14px;">About</h3>
              <p style="font-size: 15.5px; color: var(--text-body); line-height: 1.7; margin-bottom: 24px;">
                ${esc(amb.bio)}
              </p>
            </div>

            <!-- Regional Responsibilities Callout -->
            <div style="background-color: var(--bg-subtle); padding: 20px 24px; border-radius: 8px; border: 1px solid var(--border-light);">
              <h4 style="font-size: 14px; font-weight: 750; color: var(--brand-navy); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px;">
                Regional Ambassador Role
              </h4>
              <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0;">
                Ambassadors serve as key conveners for AMCOB within their metropolitan region, hosting quarterly dinner mixers, onboarding newly admitted chamber members, and connecting enterprise leaders to cross-chapter commercial networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Other Chapter Ambassadors Section -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 36px auto;">
        <span class="badge badge-gold" style="margin-bottom: 8px;">Leadership Network</span>
        <h2 class="section-title">Other Regional Ambassadors</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Connect with AMCOB leaders across 12 North American business corridors.
        </p>
      </div>

      <div class="grid-4">
        ${otherAmbassadors.map(other => `
          <div class="card" style="text-align: center;">
            <div style="width: 100px; height: 100px; margin: 0 auto 14px auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--border-light);">
              <img src="${other.photo}" alt="${esc(other.name)}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--brand-navy); margin-bottom: 4px;">${esc(other.name)}</h4>
            <p style="font-size: 12.5px; color: var(--brand-gold); font-weight: 600; margin-bottom: 6px;">${esc(other.role)}</p>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">${esc(other.company)}</p>
            <a href="${other.url}" class="btn btn-outline btn-sm" style="width: 100%;">View Profile &rarr;</a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  const html = renderLayout({
    title: `${amb.name} | Regional Chapter Ambassador`,
    description: `Learn more about ${amb.name}, ${amb.role} at ${amb.company} and official AMCOB Regional Chapter Ambassador.`,
    activeNav: 'membership',
    breadcrumbs: [
      { label: 'Membership', url: '/membership' },
      { label: 'Ambassadors', url: '/ambassador-program' },
      { label: amb.name, url: amb.url }
    ],
    content
  });

  const targetFile = path.join('ambassador-program', `${amb.slug}.html`);
  fs.writeFileSync(targetFile, html);
  console.log(`Generated ${targetFile}`);
});

console.log(`\nSuccessfully generated ${ambassadors.length} individual ambassador profile pages.`);
