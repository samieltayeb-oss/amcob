const fs = require('fs');

['archive-rejected-living-circle.html', 'concept-studio.html', 'living-circle-prototype.html', 'index.html'].forEach(f => {
  const c = fs.readFileSync('concepts/' + f, 'utf8');
  const imgRegex = /src=["']([^"']+)["']/g;
  let m;
  const imgs = [];
  while ((m = imgRegex.exec(c)) !== null) {
    imgs.push(m[1]);
  }
  console.log(`\n=== File: ${f} (${imgs.length} images) ===`);
  imgs.slice(0, 10).forEach(src => console.log('  ' + src));
});
