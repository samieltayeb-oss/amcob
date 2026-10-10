const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', () => resolve(''));
  });
}

async function extractAboutAndAmbassadors() {
  const aboutHtml = await fetchPage('https://amcob.org/about');
  fs.writeFileSync('scripts/about_page.html', aboutHtml);
  
  // Extract team members
  const teamMatches = [...aboutHtml.matchAll(/<img[^>]+src=["']([^"']*(?:team|members|leadership)[^"']*)["'][^>]*alt=["']([^"']*)["']/gi)];
  console.log('Team / Leadership matches in about:', teamMatches.length);
  const team = teamMatches.map(m => ({
    image: m[1],
    name: m[2] || m[1].split('/').pop().replace(/\.[^.]+$/, '')
  }));
  console.log('Team sample:', team.slice(0, 10));

  const ambHtml = await fetchPage('https://amcob.org/ambassador-program');
  fs.writeFileSync('scripts/ambassador_page.html', ambHtml);
  const ambMatches = [...ambHtml.matchAll(/<img[^>]+src=["']([^"']*(?:ambassadors|members|team)[^"']*)["'][^>]*alt=["']([^"']*)["']/gi)];
  console.log('Ambassador matches:', ambMatches.length);

  fs.writeFileSync('data/team.json', JSON.stringify(team, null, 2));
}

extractAboutAndAmbassadors();
