const fs = require('fs');

const content = fs.readFileSync('C:/Users/mcreg/.gemini/antigravity/brain/7436eab0-c5d0-4a3b-9f54-424a8f7170fa/.system_generated/steps/5164/content.md', 'utf8');

console.log('=== ORIGINAL LEAD.AMCOB.ORG DEEP AUDIT ===\n');

// 1. Logos & Images
const logos = content.match(/src=["']([^"']*(?:logo|icon)[^"']*)["']/gi) || [];
console.log('Logos & Icons:');
[...new Set(logos)].forEach(l => console.log(' ', l));

// 2. Headings
const headings = content.match(/<h[1234][^>]*>([\s\S]*?)<\/h[1234]>/gi) || [];
console.log(`\nAll Headings (${headings.length}):`);
headings.forEach(h => {
  const text = h.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (text) console.log(' - ' + text);
});

// 3. Sections & IDs
const ids = content.match(/id=["']([a-zA-Z0-9_-]+)["']/g) || [];
console.log('\nAll IDs:');
[...new Set(ids)].forEach(i => console.log(' ', i));

// 4. Testimonials or Quote blocks
const quotes = content.match(/<blockquote[\s\S]*?<\/blockquote>|<div[^>]*class="[^"]*testimonial[^"]*"[\s\S]*?<\/div>/gi) || [];
console.log('\nTestimonials/Quotes count:', quotes.length);

// 5. Sponsors / Partners logos
const partnerImgs = content.match(/src=["']([^"']*(?:partner|sponsor|brand)[^"']*)["']/gi) || [];
console.log('\nPartner/Sponsor images:', [...new Set(partnerImgs)]);
