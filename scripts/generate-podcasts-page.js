const fs = require('fs');
const { renderLayout } = require('./site-layout');

const liveData = JSON.parse(fs.readFileSync('data/podcasts-live.json', 'utf8'));
const playlists = JSON.parse(fs.readFileSync('data/podcasts-playlists.json', 'utf8'));
const videos = liveData.videos || [];

function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const content = `
  <section class="page-intro">
    <div class="container">
      <span class="page-intro-badge">Executive Media</span>
      <h1 class="page-title">Podcasts with Kashif Zubair</h1>
      <p class="page-subtitle">
        Listen and learn with AMCOB. In-depth conversations with founders, executives, and changemakers from the Muslim business community.
      </p>
    </div>
  </section>

  <!-- Platform Channels & Playlists Bar -->
  <section style="background-color: var(--bg-subtle); padding: 20px 0; border-bottom: 1px solid var(--border-light);">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <span style="font-size: 13.5px; font-weight: 700; color: var(--brand-navy); text-transform: uppercase; letter-spacing: 0.05em; margin-right: 8px;">
          Channels:
        </span>
        <button type="button" class="filter-pill active" onclick="filterCategory('all', this)">All Episodes (${videos.length})</button>
        <button type="button" class="filter-pill" onclick="filterCategory('member', this)">Member Spotlight</button>
        <button type="button" class="filter-pill" onclick="filterCategory('candid', this)">Candid Talks</button>
        <button type="button" class="filter-pill" onclick="filterCategory('insights', this)">Expert Insights</button>
      </div>

      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <a href="https://www.youtube.com/channel/UCsUUlA0OVkRYyJThCXD8fZg" target="_blank" rel="noopener noreferrer" class="badge badge-gold" style="text-decoration: none; padding: 6px 14px;">
          YouTube Channel &rarr;
        </a>
        <a href="https://www.linkedin.com/company/amcob/" target="_blank" rel="noopener noreferrer" class="badge badge-blue" style="text-decoration: none; padding: 6px 14px;">
          LinkedIn Live
        </a>
      </div>
    </div>
  </section>

  <!-- Featured Master Episode -->
  <section class="section" style="padding-bottom: 32px;">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 36px auto;">
        <span class="badge badge-gold" style="margin-bottom: 10px;">Featured Executive Dialogue</span>
        <h2 class="section-title">Episode 01: Building a Specialty Healthcare Enterprise</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Dr. Sohail Masood on founding KabaFusion, clinical ethics, patient care standards, and navigating national healthcare regulations.
        </p>
      </div>

      <div class="card" style="padding: 36px; max-width: 980px; margin: 0 auto; box-shadow: var(--shadow-md); border: 1px solid var(--border-light);">
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 36px; align-items: center;">
          <div>
            <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-light); aspect-ratio: 1/1;">
              <img src="/assets/optimized/leadership/1516800934459.webp" alt="Dr. Sohail Masood" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="text-align: center; margin-top: 14px;">
              <span style="font-size: 15px; font-weight: 700; color: var(--brand-navy);">Dr. Sohail Masood</span>
              <p style="font-size: 13px; color: var(--brand-gold); font-weight: 600; margin: 2px 0 0 0;">Founder &amp; CEO, KabaFusion</p>
            </div>
          </div>

          <div>
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
              <span class="badge badge-blue">Season 1 &bull; Episode 01</span>
              <span style="font-size: 13px; color: var(--text-muted);">Duration: 54 Minutes</span>
            </div>
            <h3 style="font-size: 24px; font-weight: 800; color: var(--brand-navy); margin-bottom: 14px; line-height: 1.3;">
              From Clinical Pharmacist to National Specialty Care Leader
            </h3>
            <p style="font-size: 15px; color: var(--text-body); line-height: 1.65; margin-bottom: 20px;">
              In this premier dialogue, Dr. Sohail Masood reflects on the journey of founding and leading KabaFusion, one of North America's premier clinical home infusion providers. He discusses managing complex intravenous therapies, preserving compassionate patient relationships amidst national growth, and establishing governance boards that uphold uncompromising standards.
            </p>

            <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
              <button type="button" class="btn btn-primary btn-sm" onclick="openVideo('N4MCLKZh2Qk', 'Building a Specialty Healthcare Enterprise')">
                &#9658; Watch Episode
              </button>
              <a href="https://www.youtube.com/channel/UCsUUlA0OVkRYyJThCXD8fZg" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                AMCOB YouTube &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Live YouTube Episodes Catalog -->
  <section class="section" style="background-color: var(--bg-subtle);">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; flex-wrap: wrap; gap: 16px;">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 8px;">Video Catalog</span>
          <h2 class="section-title">Official Broadcasts &amp; Sessions</h2>
          <p class="section-desc" style="margin-bottom: 0;">
            Browse verified recordings from our executive dialogues, spotlight panels, and leadership briefings.
          </p>
        </div>
        <div style="max-width: 320px; width: 100%;">
          <input type="text" id="episodeSearchInput" placeholder="Search episodes..." class="form-control" style="width: 100%; padding: 10px 16px; border-radius: 8px; border: 1px solid var(--border-light); font-size: 14px;" onkeyup="searchEpisodes()">
        </div>
      </div>

      <div class="grid-3" id="episodesGrid">
        ${videos.map((vid, idx) => `
          <div class="card episode-card" data-title="${esc(vid.title.toLowerCase())}" style="display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onclick="openVideo('${vid.videoId}', '${esc(vid.title)}')">
            <div>
              <div style="position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 8px; overflow: hidden; background-color: #000; margin-bottom: 16px;">
                <img src="${vid.thumbnail}" alt="${esc(vid.title)}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
                  <div style="width: 44px; height: 44px; border-radius: 50%; background: #ffffff; color: var(--brand-navy); display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: var(--shadow-md);">
                    &#9658;
                  </div>
                </div>
              </div>
              <span class="badge badge-gold" style="width: fit-content; margin-bottom: 8px;">
                ${vid.channelTitle.includes('AMCOB') ? 'AMCOB Broadcast' : 'Executive Media'}
              </span>
              <h3 style="font-size: 16px; font-weight: 750; color: var(--brand-navy); line-height: 1.35; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${esc(vid.title)}
              </h3>
              <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 16px;">
                ${esc(vid.description)}
              </p>
            </div>
            <div class="card-footer" style="padding-top: 12px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12.5px; color: var(--text-muted);">
                ${new Date(vid.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span style="font-size: 13px; font-weight: 700; color: var(--brand-navy);">
                Play Video &rarr;
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Video Playback Modal -->
  <div id="videoModal" style="display: none; position: fixed; inset: 0; background-color: rgba(10, 20, 35, 0.85); z-index: 9999; align-items: center; justify-content: center; padding: 24px;">
    <div style="position: relative; width: 100%; max-width: 900px; background-color: #000000; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-lg);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: #152438; color: #ffffff;">
        <span id="videoModalTitle" style="font-size: 15px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80%;">Episode Player</span>
        <button type="button" onclick="closeVideo()" style="background: none; border: none; color: #ffffff; font-size: 24px; cursor: pointer; line-height: 1;">&times;</button>
      </div>
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
        <iframe id="videoIframe" src="" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>

  <script>
    function openVideo(id, title) {
      document.getElementById('videoModalTitle').innerText = title;
      document.getElementById('videoIframe').src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
      const m = document.getElementById('videoModal');
      m.style.display = 'flex';
    }

    function closeVideo() {
      const m = document.getElementById('videoModal');
      m.style.display = 'none';
      document.getElementById('videoIframe').src = '';
    }

    window.addEventListener('click', function(e) {
      const m = document.getElementById('videoModal');
      if (e.target === m) {
        closeVideo();
      }
    });

    function searchEpisodes() {
      const q = document.getElementById('episodeSearchInput').value.toLowerCase().trim();
      const cards = document.querySelectorAll('.episode-card');
      cards.forEach(c => {
        const title = c.getAttribute('data-title') || '';
        if (title.includes(q)) {
          c.style.display = 'flex';
        } else {
          c.style.display = 'none';
        }
      });
    }

    function filterCategory(cat, btn) {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const cards = document.querySelectorAll('.episode-card');
      cards.forEach(c => c.style.display = 'flex');
    }
  </script>
`;

const html = renderLayout({
  title: 'Networking Events & Podcasts | AMCOB',
  description: 'Explore AMCOB Networking Events and Podcasts. Stay connected, learn from leaders, and engage in meaningful conversations within our Muslim business community.',
  activeNav: 'podcasts',
  breadcrumbs: [
    { label: 'Events', url: '/events' },
    { label: 'Podcasts', url: '/networking-events-podcasts' }
  ],
  content
});

// Write to canonical original route file AND podcasts.html
fs.writeFileSync('networking-events-podcasts.html', html);
fs.writeFileSync('podcasts.html', html);
console.log('Successfully generated networking-events-podcasts.html');
console.log('Successfully updated podcasts.html');
