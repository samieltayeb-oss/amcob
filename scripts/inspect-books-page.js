const https = require('https');
const fs = require('fs');

https.get('https://amcob.org/books', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/books_page.html', d);
    console.log('Saved books_page.html, length:', d.length);

    // Look for book links
    const bookMatches = d.match(/\/books\/[a-zA-Z0-9_\-]+/g);
    console.log('Found book slug matches on page 1:', bookMatches ? bookMatches.length : 0);
    if (bookMatches) {
      console.log('Sample book slugs:', [...new Set(bookMatches)].slice(0, 10));
    }
  });
});
