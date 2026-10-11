const https = require('https');

https.get('https://lead.amcob.org/assets/js/lead-ticket.js', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const postMatches = data.match(/(?:fetch|ajax|post|submit|stripe)[\s\S]{1,100}/gi) || [];
    console.log('API / Checkout mentions:');
    postMatches.slice(0, 10).forEach(m => console.log(' -> ', m.replace(/\s+/g, ' ')));
  });
});
