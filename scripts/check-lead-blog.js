const https = require('https');

https.get('https://lead.amcob.org/blog', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const postMatches = data.match(/href=["'](https:\/\/lead\.amcob\.org\/blog\/[^"']+|[^\"]*\/blog\/[^"']+)["']/g) || [];
    console.log('Blog matches:', postMatches);
  });
});
