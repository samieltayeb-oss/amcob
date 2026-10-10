const fs = require('fs');

const slugs = [
  'adnan-adrian-wood-smith',
  'akbar-afzal-jessani',
  'ayesha-qureshi',
  'brian-mcleroy',
  'haris-ahmed',
  'humayun-kabeer',
  'ihssane-leckey',
  'iyas-seidan',
  'kamal-solaiman',
  'mohamed-bakerywala',
  'noor-hamid',
  'sajjad-chowdhry'
];

(async () => {
  const ambassadors = [];

  for (const slug of slugs) {
    const url = `https://amcob.org/ambassador-program/${slug}`;
    console.log(`Fetching ${url}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed ${url}: ${res.status}`);
        continue;
      }
      const html = await res.text();
      
      // Extract title/name
      const nameMatch = html.match(/<h1[^>]*class="[^"]*ap-ambassador-profile__name[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
      const name = nameMatch ? nameMatch[1].trim() : slug;

      // Extract role
      const roleMatch = html.match(/<p[^>]*class="[^"]*ap-ambassador-profile__role[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      const role = roleMatch ? roleMatch[1].trim() : '';

      // Extract company
      const compMatch = html.match(/<p[^>]*class="[^"]*ap-ambassador-profile__company[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      const company = compMatch ? compMatch[1].trim() : '';

      // Extract chips
      const chipMatches = [...html.matchAll(/<span[^>]*class="[^"]*ap-ambassador-profile__chip[^"]*"[^>]*>([\s\S]*?)<\/span>/gi)];
      const chips = chipMatches.map(c => c[1].trim());

      // Extract bio
      const bioMatch = html.match(/<div[^>]*class="[^"]*ap-ambassador-profile__rich-text[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      const bio = bioMatch ? bioMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      // Extract links
      const linkedinMatch = html.match(/href="(https:\/\/[^"]*linkedin\.com[^"]*)"/i);
      const linkedin = linkedinMatch ? linkedinMatch[1] : '';

      const websiteMatch = html.match(/<a[^>]*href="([^"]+)"[^>]*class="[^"]*ap-ambassador-profile__action--ghost[^"]*"[^>]*>/i);
      const website = websiteMatch ? websiteMatch[1] : '';

      // Photo
      const photoMatch = html.match(/<img[^>]*class="[^"]*ap-ambassador-profile__photo[^"]*"[^>]*src="([^"]+)"/i);
      const photo = photoMatch ? photoMatch[1] : '';

      ambassadors.push({
        slug,
        name,
        role,
        company,
        chips,
        bio,
        linkedin,
        website,
        photo,
        url: `/ambassador-program/${slug}`
      });

      console.log(`- Success: ${name} (${company})`);
    } catch (e) {
      console.error(`Error on ${slug}:`, e.message);
    }
  }

  fs.writeFileSync('data/ambassadors-full.json', JSON.stringify(ambassadors, null, 2));
  console.log(`Saved ${ambassadors.length} ambassadors to data/ambassadors-full.json`);
})();
