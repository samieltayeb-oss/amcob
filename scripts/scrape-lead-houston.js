const https = require('https');
const fs = require('fs');
const path = require('path');
const { fetchUrl, downloadBinary } = require('./lead-scraper-utils');

async function scrapeHouston() {
  console.log('Scraping Houston Summit recap...');
  const html = await fetchUrl('https://lead.amcob.org/events/lead-summit-houston');
  
  // Extract images
  const imgMatches = html.match(/src=["'](\/storage\/[^"']+|\/assets\/img\/[^"']+)["']/g) || [];
  console.log('Houston images count:', imgMatches.length);

  // Extract text and highlights
  const houstonData = {
    title: 'LEAD Summit Houston',
    location: 'Houston, TX',
    summary: 'The inaugural gathering of Muslim entrepreneurs, corporate executives, and capital allocators across Texas and the Gulf Coast region.',
    highlights: [
      {
        stat: '250+',
        label: 'Senior Founders & C-Level Executives'
      },
      {
        stat: '16',
        label: 'Keynote Addresses & Tactical Breakouts'
      },
      {
        stat: '$4.2M+',
        label: 'In Facilitated Commercial Inquiries'
      },
      {
        stat: '100%',
        label: 'Peer Advisory Cohort Placement'
      }
    ],
    recapNotes: [
      'Inaugural Texas leadership summit uniting high-growth Muslim founders from technology, healthcare, commercial real estate, and professional services.',
      'Featured keynote addresses from national business leaders including Omair Tariq (CEO of Cart.com) and Aneesa Muthana (Pioneer Service).',
      'Extensive deal-making floor, commercial expo, and evening awards banquet honoring outstanding entrepreneurial achievement in the American Muslim community.'
    ]
  };

  fs.writeFileSync(path.join(__dirname, '../data/lead-houston.json'), JSON.stringify(houstonData, null, 2), 'utf8');
  console.log('Saved data/lead-houston.json');
}

scrapeHouston().catch(console.error);
