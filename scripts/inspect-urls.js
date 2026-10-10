const fs = require('fs');

function parseCSVLine(text) {
  let p = '', row = [''], i = 0, r = 0, q = false;
  for (let c of text) {
    if (c === '"') {
      if (q && text[i+1] === '"') { row[r] += '"'; i++; }
      else { q = !q; }
    } else if (c === ',' && !q) {
      r++; row[r] = '';
    } else if (c === '\r' || c === '\n') {
      // ignore
    } else {
      row[r] += c;
    }
    i++;
  }
  return row;
}

const lines = fs.readFileSync('docs/url-inventory.csv', 'utf8').split('\n').filter(Boolean);
const header = parseCSVLine(lines[0]);
console.log('Header:', header);

const rows = lines.slice(1).map(l => parseCSVLine(l));
console.log('Total URLs parsed:', rows.length);

const types = {};
const prefixes = {};
const directUrls = [];

rows.forEach(r => {
  const url = r[0];
  const type = r[1];
  types[type] = (types[type] || 0) + 1;
  try {
    const u = new URL(url);
    const p = u.pathname.split('/')[1] || '(root)';
    prefixes[p] = (prefixes[p] || 0) + 1;
    directUrls.push({ url, path: u.pathname, type, purpose: r[2], keyContent: r[4] });
  } catch(e) {}
});

console.log('\nPage Types:');
console.table(types);

console.log('\nPath Prefixes:');
console.table(prefixes);

// Let's see non-blog, non-directory prefix URLs
const distinctTopPages = directUrls.filter(u => !u.path.startsWith('/blog/') && !u.path.startsWith('/directory/'));
console.log('\nDistinct Core/Section Pages (Count:', distinctTopPages.length, '):');
distinctTopPages.forEach(p => console.log(`${p.path} [${p.type}]`));
