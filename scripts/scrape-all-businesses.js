const fs = require('fs');
const path = require('path');
const https = require('https');

const rawBusinesses = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/businesses.json'), 'utf8'));

function decodeCloudflareEmail(hex) {
  if (!hex) return '';
  const k = parseInt(hex.substr(0, 2), 16);
  let email = '';
  for (let i = 2; i < hex.length; i += 2) {
    email += String.fromCharCode(parseInt(hex.substr(i, 2), 16) ^ k);
  }
  return email;
}

function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', (err) => resolve({ status: 500, error: err.message, data: '' }));
    req.setTimeout(15000, () => {
      req.destroy();
      resolve({ status: 408, error: 'timeout', data: '' });
    });
  });
}

function parseListingHtml(html, baseObj) {
  if (!html) return baseObj;

  // Title / name
  const titleM = html.match(/<h1>([\s\S]*?)<\/h1>/i);
  const name = titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : baseObj.name;
  
  // Hero description (short)
  const heroDescM = html.match(/<\/h1>\s*<p>([\s\S]*?)<\/p>/i);
  const heroDesc = heroDescM ? heroDescM[1].replace(/<[^>]+>/g, '').trim() : '';
  
  // Hero image
  const heroImgM = html.match(/<div class="listing_banner_image">\s*<img src="([^"]+)"/i);
  const heroImg = heroImgM ? heroImgM[1] : (baseObj.image || '');

  // About heading & description
  const aboutM = html.match(/<div class="aboutDescription">([\s\S]*?)<\/div>/i);
  let about = '';
  if (aboutM) {
    about = aboutM[1].replace(/<p>/gi, '').replace(/<\/p>/gi, '\n\n').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Prev / Next links
  const prevM = html.match(/<a href="([^"]+)"[^>]*class="heroSecNavBtn heroSecNavPrev"[^>]*>([\s\S]*?)<\/a>/i);
  const nextM = html.match(/<a href="([^"]+)"[^>]*class="heroSecNavBtn heroSecNavNext"[^>]*>([\s\S]*?)<\/a>/i);

  // Contact items
  const contactItems = {};
  const itemRegex = /<div class="aboutSecSidebarItem">([\s\S]*?)<\/div>\s*(?=<div class="aboutSecSidebarItem"|<\/div>)/gi;
  let match;
  while ((match = itemRegex.exec(html)) !== null) {
    const block = match[1];
    const h5M = block.match(/<h5>([\s\S]*?)<\/h5>/i);
    if (h5M) {
      const key = h5M[1].replace(/<[^>]+>/g, '').trim();
      const aM = block.match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
      const pM = block.match(/<p>([\s\S]*?)<\/p>/i);
      if (block.includes('__cf_email__')) {
        const cfM = block.match(/data-cfemail="([a-f0-9]+)"/i);
        if (cfM) {
          contactItems[key] = decodeCloudflareEmail(cfM[1]);
        }
      } else if (aM) {
        contactItems[key] = { text: aM[2].replace(/<[^>]+>/g, '').trim(), href: aM[1].trim() };
      } else if (pM) {
        contactItems[key] = pM[1].replace(/<[^>]+>/g, '').trim();
      }
    }
  }

  // Similar listings
  const similar = [];
  const simSecM = html.match(/<div class="aboutSecSidebarListingList">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);
  if (simSecM) {
    const itemLinks = [...simSecM[1].matchAll(/<a href="([^"]+)" class="aboutSecSidebarListingListLink">([\s\S]*?)<\/a>/gi)];
    for (const linkM of itemLinks) {
      const href = linkM[1];
      const inner = linkM[2];
      const imgM = inner.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/i);
      const nameM = inner.match(/<h4>([\s\S]*?)<\/h4>/i);
      const catM = inner.match(/<p>([\s\S]*?)<\/p>/i);
      similar.push({
        url: href,
        slug: href.replace(/^\/business-directory\//, ''),
        name: nameM ? nameM[1].trim() : '',
        category: catM ? catM[1].trim() : '',
        image: imgM ? imgM[1] : ''
      });
    }
  }

  return {
    ...baseObj,
    name: name || baseObj.name,
    heroDesc: heroDesc || about.slice(0, 200),
    about: about || heroDesc || baseObj.description || '',
    image: heroImg || baseObj.image,
    prev: prevM ? { href: prevM[1], text: prevM[2].replace(/<[^>]+>/g, '').trim() } : null,
    next: nextM ? { href: nextM[1], text: nextM[2].replace(/<[^>]+>/g, '').trim() } : null,
    contactItems,
    similar
  };
}

async function run() {
  const t0 = Date.now();
  console.log(`Starting scrape of ${rawBusinesses.length} businesses...`);
  
  const cacheDir = path.join(__dirname, '../scratch/raw-businesses');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const results = [];
  const concurrency = 15;
  let activeIndex = 0;

  async function worker(id) {
    while (activeIndex < rawBusinesses.length) {
      const idx = activeIndex++;
      const b = rawBusinesses[idx];
      const cachePath = path.join(cacheDir, `${b.slug}.html`);
      
      let html = '';
      if (fs.existsSync(cachePath)) {
        html = fs.readFileSync(cachePath, 'utf8');
      } else {
        const res = await fetchUrl(`https://amcob.org/business-directory/${b.slug}`);
        if (res.status === 200 && res.data) {
          html = res.data;
          fs.writeFileSync(cachePath, html, 'utf8');
        } else {
          console.warn(`[WARN] Failed to fetch ${b.slug}: status ${res.status}`);
        }
      }

      const parsed = parseListingHtml(html, b);
      results[idx] = parsed;

      if ((idx + 1) % 25 === 0 || idx + 1 === rawBusinesses.length) {
        console.log(`Progress: ${idx + 1}/${rawBusinesses.length} (${Math.round((Date.now() - t0)/1000)}s)`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i));
  await Promise.all(workers);

  console.log(`Scraped all ${results.length} businesses in ${Math.round((Date.now() - t0)/1000)}s.`);

  // Write out rich json
  const outPath = path.join(__dirname, '../data/businesses-rich.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved rich business data to ${outPath}`);

  // Summary statistics
  const withAbout = results.filter(r => r.about && r.about.length > 50).length;
  const withOwner = results.filter(r => r.contactItems && r.contactItems.Owner).length;
  const withWebsite = results.filter(r => r.contactItems && r.contactItems.Website).length;
  const withEmail = results.filter(r => r.contactItems && r.contactItems.Email).length;
  const withPhone = results.filter(r => r.contactItems && r.contactItems.Phone).length;
  const withSimilar = results.filter(r => r.similar && r.similar.length > 0).length;

  console.log(`Stats:`);
  console.log(`- Total: ${results.length}`);
  console.log(`- With full About description: ${withAbout}`);
  console.log(`- With Owner: ${withOwner}`);
  console.log(`- With Website: ${withWebsite}`);
  console.log(`- With Email: ${withEmail}`);
  console.log(`- With Phone: ${withPhone}`);
  console.log(`- With Similar listings: ${withSimilar}`);
}

run();
