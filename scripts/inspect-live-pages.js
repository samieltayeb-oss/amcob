const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

async function run() {
  const pages = [
    'https://amcob.org',
    'https://amcob.org/about',
    'https://amcob.org/membership',
    'https://amcob.org/connect',
    'https://amcob.org/events',
    'https://amcob.org/dinner-mixers',
    'https://amcob.org/virtual-mixers',
    'https://amcob.org/sponsorship',
    'https://amcob.org/contact-us',
    'https://amcob.org/resources',
    'https://amcob.org/books'
  ];

  for (const p of pages) {
    try {
      console.log(`\nFetching ${p}...`);
      const html = await fetchPage(p);
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
      let m;
      const imgs = [];
      while ((m = imgRegex.exec(html)) !== null) {
        imgs.push(m[1]);
      }
      console.log(`Page: ${p} | Length: ${html.length} | Images: ${imgs.length}`);
      const uniqueImgs = [...new Set(imgs)];
      console.log(`Unique images (${uniqueImgs.length}):`);
      uniqueImgs.slice(0, 10).forEach(src => console.log('  ' + src));
    } catch(err) {
      console.error(`Error fetching ${p}:`, err.message);
    }
  }
}

run();
