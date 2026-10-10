const fs = require('fs');

function sanitizeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/—/g, ', ').replace(/–/g, '-');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Sanitized ${filePath}`);
}

['data/businesses.json', 'data/articles.json', 'data/books.json', 'data/events.json'].forEach(sanitizeFile);
