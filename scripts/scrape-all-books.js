const fs = require('fs');
const path = require('path');
const https = require('https');

const rawBooks = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/books.json'), 'utf8'));

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects < 0) return resolve({ status: 508, error: 'Too many redirects', data: '' });
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) redirectUrl = 'https://amcob.org' + redirectUrl;
        return resolve(fetchUrl(redirectUrl, maxRedirects - 1));
      }
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

function parseBookHtml(html, baseObj) {
  if (!html) return baseObj;

  const titleM = html.match(/<h1[^>]*class="content-profile__title"[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : baseObj.title;

  const authorM = html.match(/<p class="content-profile__subtitle">([\s\S]*?)<\/p>/i);
  const author = authorM ? authorM[1].replace(/<[^>]+>/g, '').trim().replace(/^by\s+/i, '') : (baseObj.author || '');

  const dateM = html.match(/class="content-profile__date"[^>]*>([\s\S]*?)<\/p>/i);
  const date = dateM ? dateM[1].replace(/<[^>]+>/g, '').trim() : '';

  const chips = [];
  const chipsM = html.match(/<div class="content-profile__chips">([\s\S]*?)<\/div>/i);
  if (chipsM) {
    const chipMatches = [...chipsM[1].matchAll(/<span[^>]*class="content-profile__chip[^"]*"[^>]*>([\s\S]*?)<\/span>/gi)];
    for (const c of chipMatches) chips.push(c[1].replace(/<[^>]+>/g, '').trim());
  }

  const leadM = html.match(/<p class="content-profile__lead">([\s\S]*?)<\/p>/i);
  const lead = leadM ? leadM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Rich text
  const richM = html.match(/<div class="content-profile__rich-text">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);
  const richHtml = richM ? richM[1].trim() : '';

  const imgM = html.match(/<meta property="og:image" content="([^"]+)"/i) || html.match(/"image":\s*"([^"]+)"/);
  const image = imgM ? imgM[1] : (baseObj.image || '');

  return {
    ...baseObj,
    title: title || baseObj.title,
    author: author || baseObj.author,
    date,
    chips,
    lead: lead || (baseObj.description || ''),
    description: lead || (baseObj.description || ''),
    image: image || baseObj.image,
    richHtml
  };
}

async function run() {
  const t0 = Date.now();
  console.log(`Starting scrape of ${rawBooks.length} executive library books...`);

  const cacheDir = path.join(__dirname, '../scratch/raw-books');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const results = [];
  const concurrency = 15;
  let activeIndex = 0;

  async function worker() {
    while (activeIndex < rawBooks.length) {
      const idx = activeIndex++;
      const b = rawBooks[idx];
      const cachePath = path.join(cacheDir, `${b.slug}.html`);

      let html = '';
      if (fs.existsSync(cachePath)) {
        html = fs.readFileSync(cachePath, 'utf8');
      } else {
        const res = await fetchUrl(`https://amcob.org/books/${b.slug}`);
        if (res.status === 200 && res.data) {
          html = res.data;
          fs.writeFileSync(cachePath, html, 'utf8');
        } else {
          console.warn(`[WARN] Failed to fetch book ${b.slug}: status ${res.status}`);
        }
      }

      const parsed = parseBookHtml(html, b);
      results[idx] = parsed;

      if ((idx + 1) % 15 === 0 || idx + 1 === rawBooks.length) {
        console.log(`Progress: ${idx + 1}/${rawBooks.length} (${Math.round((Date.now() - t0) / 1000)}s)`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`Scraped all ${results.length} books in ${Math.round((Date.now() - t0) / 1000)}s.`);

  // Write out rich json
  const outPath = path.join(__dirname, '../data/books-rich.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, '../data/books.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved rich book data to ${outPath} and updated books.json`);

  const withRich = results.filter(r => r.richHtml && r.richHtml.length > 100).length;
  console.log(`Stats: ${withRich}/${results.length} books have full rich summary body.`);
}

run();
