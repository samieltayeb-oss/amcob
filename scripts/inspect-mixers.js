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

async function getEvents() {
  const dinnerHtml = await fetchPage('https://amcob.org/dinner-mixers');
  fs.writeFileSync('scripts/dinner_mixers.html', dinnerHtml);
  
  // Extract event items
  const lumaMatches = [...dinnerHtml.matchAll(/href="(https:\/\/lu\.ma\/[a-zA-Z0-9_\-]+)"/g)].map(m => m[1]);
  console.log('Luma dinner mixer links:', [...new Set(lumaMatches)]);

  const virtualHtml = await fetchPage('https://amcob.org/virtual-mixers');
  fs.writeFileSync('scripts/virtual_mixers.html', virtualHtml);
  const virtualLuma = [...virtualHtml.matchAll(/href="(https:\/\/lu\.ma\/[a-zA-Z0-9_\-]+)"/g)].map(m => m[1]);
  console.log('Luma virtual mixer links:', [...new Set(virtualLuma)]);
}

getEvents();
