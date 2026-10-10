const fs = require('fs');
const path = require('path');

// 1. Read existing asset-register.csv
const assetCsvPath = path.join(__dirname, '..', 'docs', 'asset-register.csv');
const assetContent = fs.readFileSync(assetCsvPath, 'utf8');
const assetLines = assetContent.split('\n');

const discoveredUrls = new Map(); // url -> { source: 'register', ... }

assetLines.forEach((line, idx) => {
  if (idx === 0 || !line.trim()) return;
  // Parse CSV line
  const parts = line.split(',');
  const url = parts[0]?.trim();
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    discoveredUrls.set(url, {
      url,
      type: parts[1]?.trim() || '',
      subject: parts[2]?.trim() || '',
      pages: parts[3]?.trim() || '',
      source: 'asset-register.csv'
    });
  }
});

console.log(`Loaded ${discoveredUrls.size} URLs from asset-register.csv`);

// 2. Sample set of key live pages to check for any missed images
const pagesToCheck = [
  'https://amcob.org',
  'https://amcob.org/about',
  'https://amcob.org/membership',
  'https://amcob.org/peer-advisory',
  'https://amcob.org/connect',
  'https://amcob.org/affiliate',
  'https://amcob.org/khadija-collective',
  'https://amcob.org/events',
  'https://amcob.org/business-directory',
  'https://amcob.org/blogs',
  'https://amcob.org/contact',
  'https://amcob.org/join',
  'https://amcob.org/tours',
  'https://amcob.org/sponsorship',
  'https://amcob.org/founding-circle'
];

async function scanPage(pageUrl) {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) {
      console.log(`Failed to fetch ${pageUrl}: HTTP ${res.status}`);
      return [];
    }
    const html = await res.text();
    const found = [];

    // Regex patterns for img src, data-src, srcset, background url, og:image
    const patterns = [
      /<img[^>]+src=["']([^"']+)["']/gi,
      /<img[^>]+data-src=["']([^"']+)["']/gi,
      /<img[^>]+data-lazy-src=["']([^"']+)["']/gi,
      /url\(["']?([^"')]+)[\"']?\)/gi,
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
      /<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]+href=["']([^"']+)["']/gi
    ];

    patterns.forEach(p => {
      let match;
      while ((match = p.exec(html)) !== null) {
        let rawUrl = match[1].trim();
        if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('javascript:')) continue;
        
        let fullUrl = rawUrl;
        if (fullUrl.startsWith('//')) {
          fullUrl = 'https:' + fullUrl;
        } else if (fullUrl.startsWith('/')) {
          fullUrl = 'https://amcob.org' + fullUrl;
        } else if (!fullUrl.startsWith('http')) {
          fullUrl = 'https://amcob.org/' + fullUrl;
        }

        // Check if image extension or storage path
        if (/\.(png|jpg|jpeg|webp|svg|gif|ico)(\?.*)?$/i.test(fullUrl) || fullUrl.includes('/storage/') || fullUrl.includes('/media/')) {
          found.push(fullUrl);
        }
      }
    });

    return found;
  } catch (err) {
    console.log(`Error scanning ${pageUrl}: ${err.message}`);
    return [];
  }
}

async function run() {
  console.log(`\nScanning ${pagesToCheck.length} key public pages for any missed images...`);
  let newFoundCount = 0;

  for (const pageUrl of pagesToCheck) {
    console.log(`Checking ${pageUrl}...`);
    const imgs = await scanPage(pageUrl);
    imgs.forEach(img => {
      // Normalize URL (strip trailing query params for dedup if static asset)
      let cleanUrl = img;
      if (!discoveredUrls.has(cleanUrl)) {
        discoveredUrls.set(cleanUrl, {
          url: cleanUrl,
          type: 'Live Page Discovery',
          subject: 'Discovered via live page crawl',
          pages: pageUrl,
          source: 'Live Page Crawl'
        });
        newFoundCount++;
        console.log(`  + New image discovered: ${cleanUrl}`);
      }
    });
  }

  console.log(`\nTotal unique image URLs discovered across all sources: ${discoveredUrls.size}`);
  console.log(`Newly discovered images from live crawl: ${newFoundCount}`);

  // Save full discovered URLs list to scratch/discovered-images.json
  const outJsonPath = path.join(__dirname, 'discovered-images.json');
  fs.writeFileSync(outJsonPath, JSON.stringify(Array.from(discoveredUrls.values()), null, 2));
  console.log(`Saved discovered list to ${outJsonPath}`);
}

run();
