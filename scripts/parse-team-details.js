const fs = require('fs');

const html = fs.readFileSync('scripts/about_page.html', 'utf8');
const cardRegex = /<article class="about-meet-team__card"[^>]*>([\s\S]*?)<\/article>/g;
let cardMatch;
const team = [];

while ((cardMatch = cardRegex.exec(html)) !== null) {
  const content = cardMatch[1];
  const imgSrc = (content.match(/src="([^"]+)"/) || [])[1] || '';
  const nameMatch = content.match(/class="about-meet-team__card-name">([^<]+)<\/span>/);
  const roleMatch = content.match(/class="about-meet-team__card-role">([^<]+)<\/span>/);
  const linkMatch = content.match(/href="([^"]+)"/);

  if (nameMatch) {
    team.push({
      name: nameMatch[1].trim(),
      role: roleMatch ? roleMatch[1].trim() : '',
      image: imgSrc,
      linkedin: linkMatch ? linkMatch[1] : ''
    });
  }
}

console.log('Found', team.length, 'team members:');
console.log(JSON.stringify(team, null, 2));

fs.writeFileSync('data/leadership-full.json', JSON.stringify(team, null, 2));
