const https = require('https');

https.get('https://lead.amcob.org/events/lead-summit-houston', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Houston summit page size:', data.length);
    const headings = data.match(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/gi) || [];
    console.log('Sample headings:', headings.slice(0, 10).map(h => h.replace(/<[^>]+>/g, '').trim()));
  });
});
