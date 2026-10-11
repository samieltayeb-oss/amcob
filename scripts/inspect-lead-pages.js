const https = require('https');

async function inspect(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const title = (data.match(/<title>([^<]+)<\/title>/i) || [])[1] || '';
        const h1 = (data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
        const h2s = (data.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || []).map(h => h.replace(/<[^>]+>/g, '').trim()).slice(0, 5);
        resolve({ url, title, h1: h1.replace(/<[^>]+>/g, '').trim(), h2s });
      });
    });
  });
}

async function run() {
  const pages = [
    'https://lead.amcob.org/hotel',
    'https://lead.amcob.org/sponsorship',
    'https://lead.amcob.org/lead-ticket'
  ];
  for (const p of pages) {
    const res = await inspect(p);
    console.log(res);
  }
}

run();
