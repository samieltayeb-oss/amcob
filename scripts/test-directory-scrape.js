const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, data: d }));
    }).on('error', reject);
  });
}

async function testDirectory() {
  const res = await fetchPage('https://amcob.org/business-directory');
  console.log('Status:', res.status);
  console.log('Length:', res.data.length);
  // Look for business cards or pagination or JSON embedded in html
  const hasJson = res.data.includes('window.') || res.data.includes('data-');
  console.log('Includes business items?');
  const cardMatches = res.data.match(/<div class="[^"]*card[^"]*"|<a href="[^"]*\/business-directory\/[^"]*"/g);
  console.log('Card/link matches:', cardMatches ? cardMatches.length : 0);
  if (cardMatches) console.log(cardMatches.slice(0, 10));
}

testDirectory();
