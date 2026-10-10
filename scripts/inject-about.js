const fs = require('fs');

const aboutHtml = fs.readFileSync('about.html', 'utf8');
const m = aboutHtml.match(/<main>([\s\S]*?)<\/main>/);
if (!m) {
  console.error('No main in about.html');
  process.exit(1);
}

let core = fs.readFileSync('scripts/generate-core-pages.js', 'utf8');
const target = '// 2. About Us (about.html)';
const replacement = target + '\nconst aboutContent = ' + JSON.stringify(m[1]) + ';\n';
core = core.replace(target, replacement);
fs.writeFileSync('scripts/generate-core-pages.js', core);
console.log('Injected aboutContent into generate-core-pages.js!');
