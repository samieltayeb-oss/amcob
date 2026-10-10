const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetchPage('https://amcob.org');
  fs.writeFileSync('scripts/home_page.html', html);
  console.log('Homepage saved, length:', html.length);
  
  const ecosystemIndex = html.indexOf('Ecosystem');
  if (ecosystemIndex !== -1) {
    console.log('Ecosystem mention found around index:', ecosystemIndex);
    console.log(html.substring(ecosystemIndex - 200, ecosystemIndex + 1200));
  } else {
    console.log('No direct "Ecosystem" string found in raw HTML');
  }

  const allImgs = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi)].map(m => m[1]);
  console.log('Total img tags in homepage:', allImgs.length);
  console.log('Image URLs:', allImgs);
}

main().catch(console.error);
