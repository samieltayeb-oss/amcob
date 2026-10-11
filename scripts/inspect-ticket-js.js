const https = require('https');

https.get('https://lead.amcob.org/assets/js/lead-ticket.js', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('lead-ticket.js size:', data.length);
    // look for API endpoints
    const endpoints = data.match(/['"`]\/[^'"`]+['"`]/g) || [];
    console.log('Sample endpoints / strings:', endpoints.slice(0, 20));
  });
});
