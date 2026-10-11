const fs = require('fs');

const content = fs.readFileSync('C:/Users/mcreg/.gemini/antigravity/brain/7436eab0-c5d0-4a3b-9f54-424a8f7170fa/.system_generated/steps/5164/content.md', 'utf8');

function getBlock(startId, endId) {
  const s = content.indexOf(`id="${startId}"`);
  if (s === -1) return `Start ${startId} not found`;
  let e = content.length;
  if (endId) {
    const foundEnd = content.indexOf(`id="${endId}"`, s + 10);
    if (foundEnd !== -1) e = foundEnd;
  }
  return content.substring(s, Math.min(e, s + 12000));
}

const out = [
  '=== 1. FOUNDER NOTE ===\n' + getBlock('founder-note', 'contact'),
  '\n=== 2. FOR EVERYONE (TABS) ===\n' + getBlock('for-everyone', 'testimonials'),
  '\n=== 3. TESTIMONIALS ===\n' + getBlock('testimonials', 'register'),
  '\n=== 4. EXPO ===\n' + getBlock('expo', 'partners')
].join('\n\n');

fs.writeFileSync('scratch/lead-raw-sections.utf8.txt', out, 'utf8');
console.log('Saved to scratch/lead-raw-sections.utf8.txt, length:', out.length);
