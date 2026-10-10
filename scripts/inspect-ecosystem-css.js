const fs = require('fs');

const html = fs.readFileSync('scripts/home_page.html', 'utf8');
const links = [...html.matchAll(/<link[^>]+href="([^"]+\.css[^"]*)"/gi)];
console.log('CSS links:', links.map(m => m[1]));
