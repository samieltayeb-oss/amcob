const fs = require('fs');
const path = require('path');
const { fetchUrl } = require('./lead-scraper-utils');

async function fixTitles() {
  const file = path.join(__dirname, '../data/lead-articles.json');
  const articles = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const art of articles) {
    const html = await fetchUrl(art.originalUrl);
    const ogMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    let title = '';
    if (ogMatch && ogMatch[1]) {
      title = ogMatch[1].replace(/—\s*LEAD Summit.*$/i, '').trim();
    }
    if (!title || title.includes('Insights & Resources')) {
      const headingMatch = html.match(/<h2[^>]*class=["'][^"']*heading[^"']*["'][^>]*>([\s\S]*?)<\/h2>/i) ||
                           html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
      if (headingMatch) {
        title = headingMatch[1].replace(/<[^>]+>/g, '').trim();
      }
    }
    if (!title || title.includes('Insights & Resources')) {
      // derive from slug
      title = art.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    art.title = title;
    console.log(`${art.slug} -> ${art.title}`);
  }

  fs.writeFileSync(file, JSON.stringify(articles, null, 2), 'utf8');
  console.log('Updated data/lead-articles.json with authentic titles');
}

fixTitles().catch(console.error);
