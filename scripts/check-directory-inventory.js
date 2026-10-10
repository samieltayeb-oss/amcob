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
    } else {
      row[r] += c;
    }
    i++;
  }
  return row;
}

const lines = fs.readFileSync('docs/url-inventory.csv', 'utf8').split('\n').filter(Boolean);
const rows = lines.slice(1).map(l => parseCSVLine(l));

const businesses = rows.filter(r => r[0].includes('/business-directory/'));
console.log('Total business directory URLs in url-inventory.csv:', businesses.length);
console.log('Sample row 0:', businesses[0]);
console.log('Sample row 1:', businesses[1]);
console.log('Sample row 2:', businesses[2]);
