const fs = require('fs');
const path = require('path');

const discoveredPath = path.join(__dirname, 'discovered-images.json');
let discoveredMap = new Map();
if (fs.existsSync(discoveredPath)) {
  const existing = JSON.parse(fs.readFileSync(discoveredPath, 'utf8'));
  existing.forEach(item => discoveredMap.set(item.url, item));
}

const inventoryCsv = fs.readFileSync(path.join(__dirname, '..', 'docs', 'url-inventory.csv'), 'utf8');
const inventoryLines = inventoryCsv.split('\n');

// Pick representative URLs across each segment
const urlsToScan = new Set([
  'https://amcob.org/blog',
  'https://amcob.org/books',
  'https://amcob.org/case-study',
  'https://amcob.org/conferences-workshops',
  'https://amcob.org/dinner-mixers',
  'https://amcob.org/networking-events-podcasts',
  'https://amcob.org/opportunities',
  'https://amcob.org/virtual-mixers',
  'https://amcob.org/ambassador-program',
  'https://amcob.org/contact-us',
  'https://amcob.org/resources',
  'https://amcob.org/engage'
]);

// Add all blog and event specific URLs from inventory
inventoryLines.slice(1).forEach(line => {
  const u = line.split(',')[0]?.trim();
  if (!u || !u.startsWith('http')) return;
  if (
    u.includes('/blog/') ||
    u.includes('/case-study/') ||
    u.includes('/books/') ||
    u.includes('/conferences-workshops/') ||
    u.includes('/events/')
  ) {
    urlsToScan.add(u);
  }
});

// Also add a sample of 20 business directory pages
let dirCount = 0;
inventoryLines.slice(1).forEach(line => {
  const u = line.split(',')[0]?.trim();
  if (u && (u.includes('/business-directory/') || u.includes('/business-listing/')) && dirCount < 25) {
    urlsToScan.add(u);
    dirCount++;
  }
});

console.log(`Total URLs queued for deep image discovery: ${urlsToScan.size}`);

async function scanPage(pageUrl) {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return [];
    const html = await res.text();
    const found = [];

    const patterns = [
      /<img[^>]+src=["']([^"']+)["']/gi,
      /<img[^>]+data-src=["']([^"']+)["']/gi,
      /<img[^>]+data-lazy-src=["']([^"']+)["']/gi,
      /url\(["']?([^"')]+)[\"']?\)/gi,
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi
    ];

    patterns.forEach(p => {
      let match;
      while ((match = p.exec(html)) !== null) {
        let rawUrl = match[1].trim();
        if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('javascript:')) continue;
        let fullUrl = rawUrl;
        if (fullUrl.startsWith('//')) fullUrl = 'https:' + fullUrl;
        else if (fullUrl.startsWith('/')) fullUrl = 'https://amcob.org' + fullUrl;
        else if (!fullUrl.startsWith('http')) fullUrl = 'https://amcob.org/' + fullUrl;

        if (/\.(png|jpg|jpeg|webp|svg|gif|ico)(\?.*)?$/i.test(fullUrl) || fullUrl.includes('/storage/') || fullUrl.includes('/media/')) {
          found.push(fullUrl);
        }
      }
    });
    return found;
  } catch (e) {
    return [];
  }
}

async function runDeepScan() {
  let newDiscovered = 0;
  let scanned = 0;
  const list = Array.from(urlsToScan);

  // Run in chunks of 5 parallel requests
  for (let i = 0; i < list.length; i += 5) {
    const chunk = list.slice(i, i + 5);
    await Promise.all(chunk.map(async (u) => {
      scanned++;
      const imgs = await scanPage(u);
      imgs.forEach(img => {
        if (!discoveredMap.has(img)) {
          discoveredMap.set(img, {
            url: img,
            type: 'Live Content Image',
            subject: 'Discovered on ' + u,
            pages: u,
            source: 'Deep Crawl'
          });
          newDiscovered++;
          console.log(`[${scanned}/${list.length}] New image: ${img}`);
        }
      });
    }));
  }

  console.log(`Deep scan complete! Newly discovered: ${newDiscovered}. Total unique image URLs: ${discoveredMap.size}`);
  fs.writeFileSync(discoveredPath, JSON.stringify(Array.from(discoveredMap.values()), null, 2));
}

runDeepScan();
