const fs = require('fs');
const path = require('path');
const { downloadBinary } = require('./lead-scraper-utils');

const sponsorLogos = [
  'https://lead.amcob.org/assets/img/sponsor-logo/IHT_Logo.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/merger-lawyer-logo.webp',
  'https://lead.amcob.org/assets/img/sponsor-logo/aprosoft-logo.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/optimize-logo.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/invest-serene.webp',
  'https://lead.amcob.org/assets/img/sponsor-logo/HHRDLogo.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/med-aura-logo.webp',
  'https://lead.amcob.org/assets/img/sponsor-logo/onal-gallant-logo.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/TheNeighborProject.webp',
  'https://lead.amcob.org/assets/img/sponsor-logo/synerygy-logo.webp',
  'https://lead.amcob.org/assets/img/sponsor-logo/halaloutreach-logo.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/kodekaizen-logo-white.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/guidance-residential.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/autism-care-therapy.webp',
  'https://lead.amcob.org/assets/img/sponsor-logo/trivium-global.png',
  'https://lead.amcob.org/assets/img/sponsor-logo/sourcemotive-white.png'
];

const partnerLogos = [
  'https://lead.amcob.org/assets/img/our-partners/launchgood-logo-primary.svg',
  'https://lead.amcob.org/assets/img/our-partners/open-global-logo.png',
  'https://lead.amcob.org/assets/img/our-partners/pcc-usa-logo.png',
  'https://lead.amcob.org/assets/img/our-partners/illinois-muslim-logo.png',
  'https://lead.amcob.org/assets/img/our-partners/muslim-professionals.png',
  'https://lead.amcob.org/assets/img/our-partners/iba-logo.png'
];

async function run() {
  const sponsorsDir = path.join(__dirname, '../assets/optimized/lead/sponsors');
  const partnersDir = path.join(__dirname, '../assets/optimized/lead/partners');
  if (!fs.existsSync(sponsorsDir)) fs.mkdirSync(sponsorsDir, { recursive: true });
  if (!fs.existsSync(partnersDir)) fs.mkdirSync(partnersDir, { recursive: true });

  console.log('Downloading 16 Sponsor Logos...');
  for (const url of sponsorLogos) {
    const filename = path.basename(url);
    const dest = path.join(sponsorsDir, filename);
    try {
      await downloadBinary(url, dest);
      console.log('Downloaded sponsor:', filename);
    } catch(e) {
      console.error('Failed sponsor:', url, e.message);
    }
  }

  console.log('\nDownloading 6 Community Partner Logos...');
  for (const url of partnerLogos) {
    const filename = path.basename(url);
    const dest = path.join(partnersDir, filename);
    try {
      await downloadBinary(url, dest);
      console.log('Downloaded partner:', filename);
    } catch(e) {
      console.error('Failed partner:', url, e.message);
    }
  }

  // Also download the blue version of lead logo
  try {
    await downloadBinary('https://lead.amcob.org/assets/img/logo/logo-blue.svg', path.join(__dirname, '../assets/optimized/lead/lead-logo-blue.svg'));
    console.log('Downloaded lead-logo-blue.svg');
  } catch(e) {}
}

run();
