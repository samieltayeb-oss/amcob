const fs = require('fs');
const path = require('path');

const urls = new Set();
const files = fs.readdirSync('scripts').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join('scripts', f), 'utf8');
  const matches = content.matchAll(/href=["'](https?:\/\/amcob\.org(\/[^"'#\s]*)?|\/[^"'#\s]*)["']/g);
  for (const m of matches) {
    let u = m[1];
    if (u.startsWith('https://amcob.org')) {
      u = u.replace('https://amcob.org', '');
    }
    if (!u) u = '/';
    // clean trailing slash except root
    if (u.length > 1 && u.endsWith('/')) {
      u = u.slice(0, -1);
    }
    if (!u.startsWith('/assets') && !u.startsWith('/storage') && !u.startsWith('/cdn-cgi') && !u.startsWith('/api')) {
      urls.add(u);
    }
  }
});

const sorted = Array.from(urls).sort();
console.log(`Found ${sorted.length} unique internal routes in scraped HTML:`);
console.log(sorted.join('\n'));

// Now check which ones resolve on http://127.0.0.1:8000
(async () => {
  console.log('\nChecking which routes resolve locally on http://127.0.0.1:8000:');
  const missing = [];
  const present = [];

  for (const route of sorted) {
    try {
      const res = await fetch('http://127.0.0.1:8000' + route);
      if (res.status === 200) {
        present.push(route);
      } else {
        missing.push({ route, status: res.status });
      }
    } catch (e) {
      missing.push({ route, status: 'ERROR' });
    }
  }

  console.log(`\nPresent (${present.length}):`);
  present.forEach(r => console.log('  [200 OK] ' + r));

  console.log(`\nMissing / Failing (${missing.length}):`);
  missing.forEach(m => console.log(`  [${m.status}] ${m.route}`));
})();
