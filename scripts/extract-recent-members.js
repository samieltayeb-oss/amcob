const fs = require('fs');

const html = fs.readFileSync('scripts/home_page.html', 'utf8');
const start = html.indexOf('<h2>Our Recent Members</h2>');
const end = html.indexOf('</section>', start);
const section = html.substring(start, end);

// Slices of swiper-slide
const cards = section.split('<div class="swiper-slide amcob-card">').slice(1);
const list = [];

for (const card of cards) {
  const imgMatch = card.match(/<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"/);
  const nameMatch = card.match(/<div class="amcob-card__name">([^<]+)<\/div>/);
  const linkMatch = card.match(/href="([^">]+)"/);
  const titleMatch = card.match(/<div class="amcob-card__title">([^<]+)<\/div>/);
  const companyMatch = card.match(/<div class="amcob-card__company">([^<]+)<\/div>/);

  if (nameMatch) {
    list.push({
      name: nameMatch ? nameMatch[1].trim() : '',
      title: titleMatch ? titleMatch[1].trim() : '',
      company: companyMatch ? companyMatch[1].trim() : '',
      linkedin: linkMatch ? linkMatch[1].trim() : '',
      imgUrl: imgMatch ? imgMatch[1].trim() : '',
      alt: imgMatch ? imgMatch[2].trim() : ''
    });
  }
}

console.log('Total members found:', list.length);
fs.writeFileSync('data/recent-members.json', JSON.stringify(list, null, 2));
console.log(JSON.stringify(list.slice(0, 10), null, 2));
