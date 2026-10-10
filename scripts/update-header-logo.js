const fs = require('fs');
const path = require('path');

let updatedCount = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') walk(full);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.includes('/assets/optimized/logos/logo.png')) {
        // Target specifically inside header brand-logo
        const regex = /(<a\s+href="[^"]*"\s+class="brand-logo"[^>]*>\s*<img\s+src=")\/assets\/optimized\/logos\/logo\.png(")/g;
        if (regex.test(content)) {
          content = content.replace(regex, '$1/assets/optimized/logos/logo-nav-white.webp$2');
          fs.writeFileSync(full, content, 'utf8');
          updatedCount++;
          console.log(`Updated header logo in: ${full}`);
        }
      }
    }
  }
}

walk('.');
console.log(`Finished updating header logo in ${updatedCount} files.`);
