const fs = require('fs');

function parseMixers() {
  const events = [];

  // Parse dinner mixers
  if (fs.existsSync('scripts/dinner_mixers.html')) {
    const html = fs.readFileSync('scripts/dinner_mixers.html', 'utf8');
    // Find event cards
    const cardRegex = /<div class="[^"]*(?:col|card|event)[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi;
    // Look for luma links
    const lumaMatches = [...html.matchAll(/href="(https:\/\/(?:www\.)?(?:lu\.ma|luma\.com)\/[a-zA-Z0-9_\-]+)"/g)];
    
    // Split by luma link or card
    const seenLinks = new Set();
    lumaMatches.forEach((m, idx) => {
      const lumaUrl = m[1];
      if (seenLinks.has(lumaUrl)) return;
      seenLinks.add(lumaUrl);

      // find snippet before and after
      const linkPos = html.indexOf(lumaUrl);
      const snippet = html.substring(Math.max(0, linkPos - 400), Math.min(html.length, linkPos + 400));

      const titleMatch = snippet.match(/<h[2-5][^>]*>([\s\S]*?)<\/h[2-5]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'AMCOB Executive Dinner Mixer';

      const imgMatch = snippet.match(/<img[^>]+src=["']([^"']+)["']/i);
      const image = imgMatch ? imgMatch[1] : '';

      const dateMatch = snippet.match(/<time[^>]*>([\s\S]*?)<\/time>|(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?,\s+\d{4})/i);
      const date = dateMatch ? (dateMatch[1] || dateMatch[2]).trim() : 'Upcoming Chapter Gathering';

      const locMatch = snippet.match(/(?:Location|Venue|City):\s*([^<]+)|([A-Za-z\s]+,\s*(?:TX|CA|NY|IL|WA|GA|FL|ON|NJ|VA|NC|MA))/i);
      const location = locMatch ? (locMatch[1] || locMatch[2]).trim() : 'North American Chapter';

      events.push({
        id: events.length + 1,
        type: 'Dinner Mixer',
        title,
        date,
        location,
        image,
        lumaUrl,
        category: 'In-Person Gathering'
      });
    });
  }

  // Parse virtual mixers
  if (fs.existsSync('scripts/virtual_mixers.html')) {
    const html = fs.readFileSync('scripts/virtual_mixers.html', 'utf8');
    const lumaMatches = [...html.matchAll(/href="(https:\/\/(?:www\.)?(?:lu\.ma|luma\.com)\/[a-zA-Z0-9_\-]+)"/g)];
    const seenLinks = new Set();
    lumaMatches.forEach(m => {
      const lumaUrl = m[1];
      if (seenLinks.has(lumaUrl)) return;
      seenLinks.add(lumaUrl);

      const linkPos = html.indexOf(lumaUrl);
      const snippet = html.substring(Math.max(0, linkPos - 400), Math.min(html.length, linkPos + 400));

      const titleMatch = snippet.match(/<h[2-5][^>]*>([\s\S]*?)<\/h[2-5]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'AMCOB Virtual Global Mixer';

      const imgMatch = snippet.match(/<img[^>]+src=["']([^"']+)["']/i);
      const image = imgMatch ? imgMatch[1] : '';

      events.push({
        id: events.length + 1,
        type: 'Virtual Mixer',
        title,
        date: 'Bi-Weekly Global Session',
        location: 'Online via Zoom / Luma',
        image,
        lumaUrl,
        category: 'Virtual Networking'
      });
    });
  }

  fs.writeFileSync('data/events.json', JSON.stringify(events, null, 2));
  console.log(`Saved ${events.length} events to data/events.json`);
}

parseMixers();
