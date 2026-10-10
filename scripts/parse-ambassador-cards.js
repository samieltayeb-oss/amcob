const fs = require('fs');

const html = fs.readFileSync('scripts/ambassador_page.html', 'utf8');
const cardRegex = /<article class="ap-ambassador-card"[\s\S]*?<\/article>/g;
let m;
const ambassadors = [];

while ((m = cardRegex.exec(html)) !== null) {
  const card = m[0];
  const imgMatch = card.match(/src="([^"]*storage\/ambassadors\/([^"]+))"/);
  const nameMatch = card.match(/class="ap-ambassador-card__name"[^>]*>([^<]+)/);
  const roleMatch = card.match(/class="ap-ambassador-card__title"[^>]*>([^<]+)/);
  const locMatch = card.match(/class="ap-ambassador-card__chapter"[^>]*>([^<]+)/) ||
                   card.match(/class="ap-ambassador-card__location"[^>]*>([^<]+)/);
  const descMatch = card.match(/class="ap-ambassador-card__bio"[^>]*>([^<]+)/);
  
  if (imgMatch) {
    ambassadors.push({
      photo: '/assets/optimized/ambassadors/' + imgMatch[2],
      name: nameMatch ? nameMatch[1].trim() : '',
      title: roleMatch ? roleMatch[1].trim() : 'Ambassador',
      location: locMatch ? locMatch[1].trim() : '',
      rawSnippet: card.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200)
    });
  }
}

console.log('Ambassadors count:', ambassadors.length);
console.log(JSON.stringify(ambassadors, null, 2));
fs.writeFileSync('data/ambassadors-clean.json', JSON.stringify(ambassadors, null, 2));
