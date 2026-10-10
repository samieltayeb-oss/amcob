const fs = require('fs');
const path = require('path');

const buzzwords = [
  'unlock your potential',
  'elevate your journey',
  'seamless ecosystem',
  'transformative experience',
  'where ambition meets opportunity',
  'delve into',
  'tapestry of',
  'testament to',
  'game-changer',
  'cutting-edge',
  'lorem ipsum'
];

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scripts' && file !== 'concepts' && file !== 'scratch') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // strip tags and scripts
  const text = content.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');

  const issues = [];

  // Check em dashes and en dashes
  if (text.includes('—')) {
    issues.push('Contains em dash (—)');
  }
  if (text.includes('–')) {
    issues.push('Contains en dash (–)');
  }
  // Check space-hyphen-space prose dashes
  if (/\s-\s/.test(text)) {
    issues.push('Contains spaced hyphen prose dash (" - ")');
  }

  // Check buzzwords
  const lower = text.toLowerCase();
  buzzwords.forEach(b => {
    if (lower.includes(b)) {
      issues.push(`Contains AI buzzword/cliche: "${b}"`);
    }
  });

  return issues;
}

const allFiles = getHtmlFiles('.');
console.log(`Checking copy and editorial standards across ${allFiles.length} production HTML files...\n`);
let totalIssues = 0;

allFiles.forEach(f => {
  const issues = checkFile(f);
  if (issues.length > 0) {
    console.error(`[FAIL] ${f}:`);
    issues.forEach(i => console.error('  - ' + i));
    totalIssues += issues.length;
  } else {
    console.log(`[PASS] ${f}`);
  }
});

console.log(`\nCopy Verification Complete: ${totalIssues} issues found.`);
if (totalIssues > 0) {
  process.exit(1);
}
