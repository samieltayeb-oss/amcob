const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /The Executive Chamber for Muslim Business Leaders/g, to: 'The Executive Chamber for Muslim Business Leaders' },
  { from: /The AMCOB Story: Building Sustainable Business Communities/g, to: 'The AMCOB Story: Building Sustainable Business Communities' },
  { from: /Executive Chamber/g, to: 'Executive Chamber' },
  { from: /keynote/g, to: 'keynote' },
  { from: /annual summit/g, to: 'annual summit' },
  { from: /Chamber Programs/g, to: 'Chamber Programs' },
  { from: /Where Muslim Founders Build enduring companies\./g, to: 'Connecting Muslim Business Leaders Across North America.' },
  { from: /building sustainable businesses/gi, to: 'building sustainable businesses' },
  { from: /enduring companies/gi, to: 'enduring companies' },
  { from: /Investors/g, to: 'Investors' },
  { from: /investors/g, to: 'investors' },
  { from: /400\+ verified businesses/gi, to: 'over 370 member businesses' },
  { from: /400\+ Verified Member Enterprises/g, to: '370+ Member Businesses' },
  { from: /\$100M\+ Annual Gatherings/g, to: '70+ Annual Gatherings' },
  { from: /Annual Gatherings/g, to: 'Annual Gatherings' },
];

const targetDirs = ['scripts', '.', 'data'];
let count = 0;

targetDirs.forEach(dir => {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isFile() && (f.endsWith('.js') || f.endsWith('.html'))) {
      let content = fs.readFileSync(fp, 'utf8');
      let modified = false;
      replacements.forEach(r => {
        if (r.from.test(content)) {
          content = content.replace(r.from, r.to);
          modified = true;
        }
      });
      if (modified) {
        fs.writeFileSync(fp, content, 'utf8');
        console.log(`Cleaned: ${fp}`);
        count++;
      }
    }
  });
});

console.log(`Finished cleaning inflated language in ${count} files.`);
