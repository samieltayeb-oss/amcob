const fs = require('fs');

const orig = fs.readFileSync('C:/Users/mcreg/.gemini/antigravity/brain/7436eab0-c5d0-4a3b-9f54-424a8f7170fa/.system_generated/steps/5164/content.md', 'utf8');

const s = orig.indexOf('id="faq"');
const e = orig.indexOf('id="founder-note"', s);
const faqBlock = orig.substring(s, e);

const matches = [...faqBlock.matchAll(/<span class="new-faq__question">([\s\S]*?)<\/span>[\s\S]*?<div class="new-faq__panel">([\s\S]*?)<\/div>/gi)];

const faqs = matches.map(m => {
  return {
    q: m[1].replace(/<[^>]+>/g, '').trim(),
    a: m[2]
      .replace(/<[^>]+>/g, ' ')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/–/g, ' to ')
      .replace(/—/g, ', ')
      .replace(/\s+-\s+/g, ': ')
      .replace(/\s+/g, ' ')
      .trim()
  };
});

fs.writeFileSync('data/lead-faqs-scraped.json', JSON.stringify(faqs, null, 2), 'utf8');
console.log(`Extracted ${faqs.length} FAQs to data/lead-faqs-scraped.json:`);
faqs.forEach((f, i) => {
  console.log(`${i+1}. Q: ${f.q}`);
  console.log(`   A: ${f.a}\n`);
});
