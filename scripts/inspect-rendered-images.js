const fs = require('fs');

const html = fs.readFileSync('concepts/index.html', 'utf8');
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
let match;
const rendered = [];
while ((match = imgRegex.exec(html)) !== null) {
  rendered.push(match[1]);
}

console.log(`Found ${rendered.length} images in concepts/index.html:`);
rendered.forEach((src, idx) => console.log(`${idx + 1}: ${src}`));

// Now look up each in image-migration-register.csv
const csvLines = fs.readFileSync('docs/image-migration-register.csv', 'utf8').split('\n').filter(Boolean);
const header = csvLines[0].split(',');
console.log('\nCSV Header:', header.join(' | '));

rendered.forEach(src => {
  const norm = src.startsWith('/') ? src.slice(1) : src;
  const matchRow = csvLines.find(l => l.includes(norm) || l.includes(src));
  if (matchRow) {
    console.log(`\nMATCH for ${src}:`);
    console.log(matchRow.substring(0, 160));
  } else {
    console.log(`\nNO MATCH in CSV for ${src}!`);
  }
});
