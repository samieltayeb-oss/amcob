const https = require('https');
const fs = require('fs');

https.get('https://amcob.org/blog', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/blog_page.html', d);
    console.log('Saved blog_page.html, length:', d.length);

    // Look for article links
    const articleMatches = d.match(/\/blog\/[a-zA-Z0-9_\-]+/g);
    console.log('Found article slug matches on page 1:', articleMatches ? articleMatches.length : 0);
    if (articleMatches) {
      console.log('Sample slugs:', [...new Set(articleMatches)].slice(0, 10));
    }
  });
});
