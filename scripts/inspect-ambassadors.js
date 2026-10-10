const fs = require('fs');

const html = fs.readFileSync('scripts/ambassador_page.html', 'utf8');
const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi)];
console.log('Ambassador page images count:', imgs.length);
imgs.forEach(m => console.log(m[1]));
