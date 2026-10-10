const fs = require('fs');

['concepts/living-circle-prototype.html', 'concepts/concept-studio.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    // Check if line contains a dash connecting phrases in prose
    const textOnly = l.replace(/<[^>]*>/g, '').replace(/style="[^"]*"/g, '');
    const m = textOnly.match(/\s-\s|—|–/g);
    if (m) {
      console.log(`${f} Line ${i + 1}: ${m.join(', ')} --> ${l.trim()}`);
    }
  });
});
