const https = require('https');
const fs = require('fs');
const path = require('path');

const targetUrls = [
  'https://lead.amcob.org/',
  'https://lead.amcob.org/sponsorship',
  'https://lead.amcob.org/speakers',
  'https://lead.amcob.org/hotel',
  'https://lead.amcob.org/lead-ticket',
  'https://lead.amcob.org/blog',
  'https://lead.amcob.org/events/lead-summit-houston',
  'https://lead.amcob.org/lead-ticket/lead-summit-anaheim-2027',
  'https://lead.amcob.org/lead-ticket/lead-summit-calgary-2027',
  'https://lead.amcob.org/lead-ticket/lead-summit-chicago-2027',
  'https://lead.amcob.org/lead-ticket/lead-summit-houston-2027',
  'https://lead.amcob.org/lead-ticket/lead-summit-new-jersey-2027',
  'https://lead.amcob.org/lead-ticket/lead-summit-toronto-2027'
];

async function checkUrl(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          length: data.length,
          title: (data.match(/<title>([^<]+)<\/title>/i) || [])[1] || ''
        });
      });
    }).on('error', err => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log('Crawling lead.amcob.org routes...');
  for (const u of targetUrls) {
    const res = await checkUrl(u);
    console.log(`[${res.status}] ${res.url} (${res.length} bytes) - Title: ${res.title}`);
  }
}

run();
