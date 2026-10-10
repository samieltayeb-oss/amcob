const fs = require('fs');

const html = fs.readFileSync('scripts/sample_detail_conselara.html', 'utf8');

// Title
const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');

// Meta description
const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
console.log('Description:', descMatch ? descMatch[1] : 'N/A');

// Look for Schema.org JSON-LD
const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
console.log('JSON-LD blocks:', jsonLd ? jsonLd.length : 0);
if (jsonLd) {
  jsonLd.forEach(j => console.log('JSON-LD:\n', j.replace(/<[^>]+>/g, '').trim()));
}

// Look for main article or business details
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
console.log('Main tag present?', !!mainMatch);
