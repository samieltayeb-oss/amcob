const fs = require('fs');

const html = fs.readFileSync('scripts/ambassador_page.html', 'utf8');

const imgMatches = [...html.matchAll(/src="https:\/\/amcob\.org\/storage\/ambassadors\/([^"]+)"/g)];
console.log('Matches:', imgMatches.length);

const ambassadors = [];
for (const match of imgMatches) {
  const file = match[1];
  const idx = match.index;
  // search backwards for opening tag or forward for details
  const chunk = html.substring(Math.max(0, idx - 400), Math.min(html.length, idx + 1800));

  const nameLink = chunk.match(/class="ap-ambassador-card__name-link"[^>]*>([\s\S]*?)<\/a>/);
  let name = '';
  if (nameLink) {
    name = nameLink[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const titleMatch = chunk.match(/<span class="ap-ambassador-card__label">Title<\/span>\s*<p>([^<]+)<\/p>/);
  const expMatch = chunk.match(/<span class="ap-ambassador-card__label">Experience<\/span>\s*<p>([^<]+)<\/p>/);
  const focusMatch = chunk.match(/<span class="ap-ambassador-card__label">Focus<\/span>\s*<p>([^<]+)<\/p>/);

  ambassadors.push({
    name,
    title: titleMatch ? titleMatch[1].trim() : 'Ambassador',
    company: expMatch ? expMatch[1].trim() : '',
    focus: focusMatch ? focusMatch[1].trim() : '',
    image: '/assets/optimized/ambassadors/' + file
  });
}

console.log('Total ambassadors found:', ambassadors.length);
console.log(JSON.stringify(ambassadors, null, 2));
fs.writeFileSync('data/ambassadors.json', JSON.stringify(ambassadors, null, 2));
