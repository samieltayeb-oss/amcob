const fs = require('fs');

const content = fs.readFileSync('C:/Users/mcreg/.gemini/antigravity/brain/7436eab0-c5d0-4a3b-9f54-424a8f7170fa/.system_generated/steps/5164/content.md', 'utf8');

const linkRegex = /href=["']([^"']+)["']/g;
let match;
const links = new Set();
while ((match = linkRegex.exec(content)) !== null) {
  links.add(match[1]);
}

console.log('Total unique links on homepage:', links.size);
const internalLeadLinks = [];
const externalLinks = [];

links.forEach(l => {
  if (l.startsWith('https://lead.amcob.org') || l.startsWith('/') || l.startsWith('#')) {
    internalLeadLinks.push(l);
  } else {
    externalLinks.push(l);
  }
});

console.log('\n--- Internal LEAD Links & Anchors ---');
internalLeadLinks.sort().forEach(l => console.log(' - ' + l));

console.log('\n--- External Links ---');
externalLinks.sort().forEach(l => console.log(' - ' + l));
