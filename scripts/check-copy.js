const fs = require('fs');

const files = [
  'concepts/index.html',
  'concepts/concept-studio.html',
  'concepts/archive-rejected-living-circle.html'
];

const buzzwords = [
  'unlock your potential',
  'elevate your journey',
  'seamless ecosystem',
  'transformative experience',
  'where ambition meets opportunity'
];

console.log('--- COPY & PUNCTUATION AUDIT ---');

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let dashes = [];
  let buzzes = [];

  lines.forEach((l, i) => {
    // Exclude CSS styles and script blocks roughly or strip HTML tags
    const textOnly = l.replace(/<[^>]*>/g, '').replace(/style="[^"]*"/g, '');
    const m = textOnly.match(/\s-\s|—|–/g);
    if (m && !l.includes('font-family') && !l.includes('border:') && !l.includes('box-shadow') && !l.includes('console.log')) {
      // Ignore html comments or script code if harmless
      if (!l.trim().startsWith('//') && !l.trim().startsWith('/*') && !l.trim().startsWith('*')) {
        dashes.push(`Line ${i + 1}: ${m.join(', ')} -> ${l.trim()}`);
      }
    }

    buzzwords.forEach(b => {
      const re = new RegExp(b, 'i');
      if (re.test(l)) {
        buzzes.push(`Line ${i + 1} [${b}]: ${l.trim()}`);
      }
    });
  });

  console.log(`\nFile: ${f}`);
  console.log(`Dashes in prose: ${dashes.length}`);
  dashes.forEach(d => console.log('  ' + d));
  console.log(`Buzzwords: ${buzzes.length}`);
  buzzes.forEach(b => console.log('  ' + b));
});
