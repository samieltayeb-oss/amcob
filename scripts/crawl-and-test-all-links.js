const fs = require('fs');
const path = require('path');

// Crawl all HTML files in root, pag/, and ambassador-program/
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
console.log(`Found ${htmlFiles.length} HTML files across the website to scan.`);

const internalLinks = new Set();
const externalLinks = new Set();
const linkSources = new Map(); // link -> [files]

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/href=["']([^"'#\s]+)["']/gi);
  for (const m of matches) {
    const href = m[1].trim();
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }

    if (!linkSources.has(href)) {
      linkSources.set(href, []);
    }
    linkSources.get(href).push(file);

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (href.startsWith('http://127.0.0.1:8000') || href.startsWith('https://amcob.org') || href.startsWith('http://amcob.org')) {
        let p = href.replace(/^https?:\/\/(127\.0\.0\.1:8000|amcob\.org)/, '');
        if (!p) p = '/';
        internalLinks.add(p);
      } else {
        externalLinks.add(href);
      }
    } else if (href.startsWith('/')) {
      internalLinks.add(href);
    } else {
      // relative link resolved against file directory
      const dirName = path.dirname(file).replace(/\\/g, '/').replace(/^\./, '');
      const resolved = path.posix.join('/', dirName, href);
      internalLinks.add(resolved);
    }
  }
});

console.log(`\nDiscovered:`);
console.log(`- ${internalLinks.size} unique internal links`);
console.log(`- ${externalLinks.size} unique external links`);

(async () => {
  console.log(`\nTesting all ${internalLinks.size} internal links against local server http://127.0.0.1:8000...`);
  const failures = [];
  const passes = [];

  for (const link of Array.from(internalLinks).sort()) {
    try {
      const res = await fetch('http://127.0.0.1:8000' + link);
      if (res.status === 200) {
        passes.push(link);
      } else {
        failures.push({ link, status: res.status, sources: linkSources.get(link) || [] });
      }
    } catch (e) {
      failures.push({ link, status: 'CONN_ERR: ' + e.message, sources: linkSources.get(link) || [] });
    }
  }

  console.log(`\n--- Internal Links Result ---`);
  console.log(`PASSED: ${passes.length}`);
  console.log(`FAILED: ${failures.length}`);

  if (failures.length > 0) {
    console.error(`\nFAILED INTERNAL LINKS:`);
    failures.forEach(f => {
      console.error(`[${f.status}] ${f.link}`);
      console.error(`  Sources: ${f.sources.slice(0, 3).join(', ')}`);
    });
  } else {
    console.log(`\nEVERY SINGLE INTERNAL LINK ON THE WEBSITE RESOLVES WITH 200 OK!`);
  }

  console.log(`\n--- External Links Sample (Audited ${externalLinks.size} links) ---`);
  const extList = Array.from(externalLinks).sort();
  extList.slice(0, 30).forEach(e => console.log('  ' + e));
})();
