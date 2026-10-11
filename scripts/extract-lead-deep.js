const fs = require('fs');

const content = fs.readFileSync('C:/Users/mcreg/.gemini/antigravity/brain/7436eab0-c5d0-4a3b-9f54-424a8f7170fa/.system_generated/steps/5164/content.md', 'utf8');

// Extract Testimonials
const testSection = content.match(/<section[^>]*id="testimonials"[\s\S]*?<\/section>/i) ||
                    content.match(/class="[^"]*testimonials-section[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
if (testSection) {
  console.log('--- TESTIMONIALS SECTION FOUND ---');
  console.log(testSection[0].substring(0, 1500));
} else {
  console.log('Looking for testimonial cards:');
  const cards = content.match(/<div[^>]*class="[^"]*(?:testimonial|review|quote)[^"]*"[\s\S]*?<\/div>/gi) || [];
  console.log('Cards count:', cards.length);
}

// Extract Founder Note
const founderSection = content.match(/<div[^>]*id="founder-note"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i) ||
                       content.match(/Why We Built This[\s\S]*?<\/div>\s*<\/div>/i);
if (founderSection) {
  console.log('\n--- FOUNDER NOTE FOUND ---');
  console.log(founderSection[0].substring(0, 1500));
}

// Extract For Everyone (Attendees / Exhibitors / Sponsors)
const forEveryoneSection = content.match(/<div[^>]*id="for-everyone"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
if (forEveryoneSection) {
  console.log('\n--- FOR EVERYONE SECTION FOUND ---');
  console.log(forEveryoneSection[0].substring(0, 1500));
}
