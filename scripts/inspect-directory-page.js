const https = require('https');
const fs = require('fs');

https.get('https://amcob.org/business-directory', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/directory_page.html', d);
    console.log('Saved directory_page.html, length:', d.length);

    // Look for links to detail pages
    const slugMatches = d.match(/\/business-directory\/[a-zA-Z0-9_\-]+/g);
    console.log('Found slug matches:', slugMatches ? slugMatches.length : 0);
    if (slugMatches) {
      console.log('Unique slugs on page 1:', [...new Set(slugMatches)]);
    }

    // Look for form or inputs or script tags
    const formMatches = d.match(/<form[\s\S]*?<\/form>/gi);
    console.log('Forms count:', formMatches ? formMatches.length : 0);

    const scriptMatches = d.match(/<script[\s\S]*?<\/script>/gi);
    console.log('Scripts count:', scriptMatches ? scriptMatches.length : 0);
    if (scriptMatches) {
      scriptMatches.forEach(s => {
        if (s.includes('fetch') || s.includes('ajax') || s.includes('axios') || s.includes('directory') || s.includes('filter')) {
          console.log('\nRelevant script:\n', s.substring(0, 300));
        }
      });
    }
  });
});
