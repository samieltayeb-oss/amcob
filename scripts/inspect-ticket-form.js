const https = require('https');

https.get('https://lead.amcob.org/lead-ticket', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    // extract forms, ticket packages, prices
    const ticketBlocks = data.match(/<div[^>]*class="[^"]*ticket[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
    console.log('Ticket blocks found:', ticketBlocks.length);
    const forms = data.match(/<form[^>]*action="([^"]*)"[^>]*>/gi) || [];
    console.log('Forms found:', forms);
    const prices = data.match(/\$\d+(?:,\d+)?/g) || [];
    console.log('Prices found:', [...new Set(prices)]);
  });
});
