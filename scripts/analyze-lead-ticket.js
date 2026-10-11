const fs = require('fs');

const html = fs.readFileSync('scripts/lead_ticket.html', 'utf8');

console.log('--- Scripts in lead_ticket.html ---');
const scripts = html.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi) || [];
scripts.forEach(s => console.log(' ', s));

console.log('\n--- Forms and Action URLs ---');
const formMatches = html.match(/<form[\s\S]*?<\/form>/gi) || [];
console.log('Forms count:', formMatches.length);
formMatches.forEach(f => {
  const action = (f.match(/action=["']([^"']+)["']/i) || [])[1] || '';
  const method = (f.match(/method=["']([^"']+)["']/i) || [])[1] || '';
  console.log(` Form action="${action}" method="${method}"`);
});

console.log('\n--- Ticket Packages & Pricing Mentioned ---');
const packages = [];
const regex = /<h[2345][^>]*>([\s\S]*?)<\/h[2345]>[\s\S]*?\$(\d+(?:,\d+)?)/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  packages.push(`${m[1].replace(/<[^>]+>/g, '').trim()} - $${m[2]}`);
}
console.log(packages);
