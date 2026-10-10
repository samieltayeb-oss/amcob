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

async function scrapeDirectoryPage(pageNum) {
  const url = `https://amcob.org/business-directory?page=${pageNum}`;
  const html = await fetchPage(url);
  
  // Extract business cards
  // Let's inspect the card structure in directory_page.html
  return html;
}

async function test() {
  const html = fs.readFileSync('scripts/directory_page.html', 'utf8');
  // Look for card containers
  // Let's find regex for each business item
  const linkRegex = /href="https:\/\/amcob\.org\/business-directory\/([a-zA-Z0-9_\-]+)"/g;
  const slugs = [];
  let m;
  while ((m = linkRegex.exec(html)) !== null) {
    if (!slugs.includes(m[1])) slugs.push(m[1]);
  }
  console.log('Slugs found on page 1:', slugs);

  // Extract titles / headings near these links
  slugs.forEach(s => {
    const idx = html.indexOf(s);
    if (idx !== -1) {
      const snippet = html.substring(Math.max(0, idx - 200), Math.min(html.length, idx + 400));
      // find title or name
      const titleMatch = snippet.match(/<h[2-5][^>]*>([\s\S]*?)<\/h[2-5]>/i) || snippet.match(/title="([^"]+)"/i);
      console.log(`Slug: ${s} => Title:`, titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'N/A');
    }
  });
}

test();
