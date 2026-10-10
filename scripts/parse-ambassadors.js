const fs = require('fs');

const html = fs.readFileSync('scripts/ambassador_page.html', 'utf8');

// Find articles or sections with ambassador images
const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]*storage\/ambassadors\/([^"]+))"[^>]*>/gi)];
console.log('Found', imgMatches.length, 'ambassador images');

const results = [];
for (const match of imgMatches) {
  const fullSrc = match[1];
  const filename = match[2];
  const idx = html.indexOf(fullSrc);
  const chunk = html.substring(idx - 300, idx + 800);
  
  const nameMatch = chunk.match(/<(?:h[2-5]|span|div|p)[^>]*class="[^"]*(?:name|title)[^"]*"[^>]*>([^<]+)/i) ||
                    chunk.match(/<h4>([^<]+)<\/h4>/i) ||
                    chunk.match(/<h3>([^<]+)<\/h3>/i);
  const roleMatch = chunk.match(/<(?:h[2-5]|span|div|p)[^>]*class="[^"]*(?:role|designation|chapter)[^"]*"[^>]*>([^<]+)/i);

  results.push({
    filename,
    localPath: '/assets/optimized/ambassadors/' + filename,
    name: nameMatch ? nameMatch[1].trim() : 'Ambassador',
    role: roleMatch ? roleMatch[1].trim() : 'Chapter Ambassador',
    chunkSnippet: chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150)
  });
}

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync('data/ambassadors.json', JSON.stringify(results, null, 2));
