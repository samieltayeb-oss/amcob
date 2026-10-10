const fs = require('fs');

const html = fs.readFileSync('scripts/sample_detail_book.html', 'utf8');

const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');

const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
console.log('JSON-LD blocks:', jsonLd ? jsonLd.length : 0);
if (jsonLd) {
  jsonLd.forEach(j => console.log('JSON-LD:\n', j.replace(/<[^>]+>/g, '').trim()));
}

const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'N/A');
