const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scripts') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('.');
console.log(`Auditing assets across ${htmlFiles.length} HTML files...`);

const missingAssets = [];
const checkedAssets = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/src=["']([^"'#\s]+)["']/gi);
  for (const m of matches) {
    let src = m[1].trim();
    if (!src || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('javascript:')) {
      continue;
    }
    
    let localPath;
    if (src.startsWith('/')) {
      localPath = path.join('.', src);
    } else {
      localPath = path.join(path.dirname(file), src);
    }

    if (!checkedAssets.has(localPath)) {
      checkedAssets.add(localPath);
      if (!fs.existsSync(localPath)) {
        missingAssets.push({ file, src, localPath, error: 'File Not Found' });
      } else {
        const stat = fs.statSync(localPath);
        if (stat.size === 0) {
          missingAssets.push({ file, src, localPath, error: 'Empty File (0 bytes)' });
        }
      }
    }
  }
});

console.log(`Total unique local assets checked: ${checkedAssets.size}`);
console.log(`Missing or empty assets: ${missingAssets.length}`);
if (missingAssets.length > 0) {
  missingAssets.forEach(m => console.log(`FAIL: ${m.src} in ${m.file} -> ${m.error}`));
  process.exit(1);
} else {
  console.log('ALL ASSETS EXIST ON DISK AND ARE NON-EMPTY (100% PASS)!');
}
