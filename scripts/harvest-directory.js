const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve);
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, data: d }));
    }).on('error', (err) => resolve({ status: 500, data: '', error: err.message }));
  });
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function scrapeDirectory() {
  console.log('--- Scraping Business Directory ---');
  const businesses = [];
  const seenSlugs = new Set();

  for (let page = 1; page <= 33; page++) {
    process.stdout.write(`Fetching directory page ${page}... `);
    const res = await fetchPage(`https://amcob.org/business-directory?page=${page}`);
    if (res.status !== 200 || !res.data) {
      console.log(`Failed (Status ${res.status})`);
      continue;
    }

    // Extract each article card
    const cardRegex = /<article[^>]*class="[^"]*bd-listing-card[^"]*"[\s\S]*?<\/article>/gi;
    let cardMatch;
    let pageCount = 0;

    while ((cardMatch = cardRegex.exec(res.data)) !== null) {
      const cardHtml = cardMatch[0];
      
      // link & slug
      const linkMatch = cardHtml.match(/href="https:\/\/amcob\.org\/business-directory\/([a-zA-Z0-9_\-]+)"/i);
      if (!linkMatch) continue;
      const slug = linkMatch[1];
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      // title / name
      const titleMatch = cardHtml.match(/<h[2-5][^>]*>([\s\S]*?)<\/h[2-5]>/i);
      const name = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slug.replace(/-/g, ' ');

      // image
      const imgMatch = cardHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/i);
      const imgSrc = imgMatch ? imgMatch[1] : '';

      // description / excerpt
      const descMatch = cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      // category tag if present
      const catMatch = cardHtml.match(/class="[^"]*(?:badge|category|tag)[^"]*"[^>]*>([\s\S]*?)<\//i);
      const category = catMatch ? catMatch[1].replace(/<[^>]+>/g, '').trim() : 'Business';

      businesses.push({
        id: businesses.length + 1,
        slug,
        name,
        category,
        description: desc,
        image: imgSrc,
        url: `/business-directory/${slug}`
      });
      pageCount++;
    }

    console.log(`Extracted ${pageCount} businesses (Total so far: ${businesses.length})`);
    if (pageCount === 0) break;
  }

  ensureDir('data');
  fs.writeFileSync('data/businesses.json', JSON.stringify(businesses, null, 2));
  console.log(`Saved ${businesses.length} businesses to data/businesses.json\n`);
  return businesses;
}

scrapeDirectory();
