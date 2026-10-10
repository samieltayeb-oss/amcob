const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const mainMatch = indexHtml.match(/<main>([\s\S]*?)<\/main>/);
if (!mainMatch) {
  console.error('No main tag found in index.html');
  process.exit(1);
}

const mainContent = mainMatch[1];
const coreScript = fs.readFileSync('scripts/generate-core-pages.js', 'utf8');

const homeStartIdx = coreScript.indexOf('const homeContent =');
const homeEndIdx = coreScript.indexOf("// 2. About Us (about.html)");

if (homeStartIdx === -1 || homeEndIdx === -1) {
  console.error('Could not locate homeContent block in generate-core-pages.js', { homeStartIdx, homeEndIdx });
  process.exit(1);
}

const newHomeBlock = `const homeContent = ${JSON.stringify(mainContent)};

let renderedHome = renderLayout({
  title: 'Allied Muslim Chamber of Business (AMCOB)',
  description: 'The premier institutional chamber uniting over 400 verified Muslim-owned businesses, peer advisory cohorts, and executive chapters across North America.',
  activeNav: '',
  breadcrumbs: [],
  extraHead: '<link rel="stylesheet" href="/css/ecosystem-motion.css">',
  extraScripts: '<script type="module" src="/js/hero-3d.js"></script>\\n  <script src="/js/ecosystem-motion.js"></script>',
  content: homeContent
});

fs.writeFileSync('index.html', renderedHome);
console.log('Generated index.html with architectural 3D dais and motion graphics');

`;

const updatedScript = coreScript.substring(0, homeStartIdx) + newHomeBlock + coreScript.substring(homeEndIdx);
fs.writeFileSync('scripts/generate-core-pages.js', updatedScript);
console.log('Successfully synchronized scripts/generate-core-pages.js!');
