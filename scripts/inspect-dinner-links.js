const fs = require('fs');

const html = fs.readFileSync('scripts/dinner_mixers.html', 'utf8');
console.log('Length:', html.length);

// Look for city names or event titles
const cities = ['Dallas', 'Houston', 'Silicon Valley', 'New York', 'Chicago', 'Atlanta', 'Toronto', 'Orange County', 'Los Angeles', 'Seattle', 'Washington'];
cities.forEach(c => {
  const count = (html.match(new RegExp(c, 'gi')) || []).length;
  console.log(`City ${c}: ${count} occurrences`);
});

// Look for links in dinner_mixers.html
const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
let m;
const links = [];
while ((m = linkRegex.exec(html)) !== null) {
  links.push(m[1]);
}
console.log('Total links:', links.length);
const externalLinks = links.filter(l => l.startsWith('http') && !l.includes('amcob.org'));
console.log('External links in dinner-mixers:', [...new Set(externalLinks)].slice(0, 15));
