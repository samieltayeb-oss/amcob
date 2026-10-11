const https = require('https');
const fs = require('fs');

https.get('https://lead.amcob.org/lead-ticket', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/lead_ticket.html', data, 'utf8');
    console.log('Saved scripts/lead_ticket.html', data.length);
  });
});
