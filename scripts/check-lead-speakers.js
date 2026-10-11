const https = require('https');

https.get('https://lead.amcob.org/speakers', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const speakerLinks = data.match(/href=["'](https:\/\/lead\.amcob\.org\/speakers\/[^"']+|[^\"]*\/speakers\/[^"']+)["']/g) || [];
    console.log('Speaker links on /speakers:', speakerLinks);
    // Also check if there are modal triggers or speaker data
    const names = data.match(/<h[234][^>]*class="[^"]*speaker[^"]*"[^>]*>([^<]+)<\/h[234]>/gi) || [];
    console.log('Speaker headers sample:', names.slice(0, 10));
  });
});
