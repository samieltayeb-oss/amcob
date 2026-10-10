const fs = require('fs');

function parseCSVLine(text) {
  let p = '', row = [''], i = 0, r = 0, q = false;
  for (let c of text) {
    if (c === '"') {
      if (q && text[i+1] === '"') { row[r] += '"'; i++; }
      else { q = !q; }
    } else if (c === ',' && !q) {
      r++; row[r] = '';
    } else if (c === '\r' || c === '\n') {
    } else {
      row[r] += c;
    }
    i++;
  }
  return row;
}

const lines = fs.readFileSync('docs/url-inventory.csv', 'utf8').split('\n').filter(Boolean);
const rows = lines.slice(1).map(l => parseCSVLine(l));

const categories = {
  core: [],
  programs: [],
  events: [],
  membership: [],
  directory_index: [],
  directory_details: [],
  blog_index: [],
  blog_details: [],
  legal_meta: [],
  other: []
};

rows.forEach(r => {
  const url = r[0];
  const type = r[1];
  const purpose = r[2];
  let pathname = '';
  try { pathname = new URL(url).pathname; } catch(e) { return; }

  if (pathname.startsWith('/blog/')) {
    categories.blog_details.push({ url, pathname, type, purpose });
  } else if (pathname === '/blog') {
    categories.blog_index.push({ url, pathname, type, purpose });
  } else if (pathname.startsWith('/business-directory/')) {
    categories.directory_details.push({ url, pathname, type, purpose });
  } else if (pathname === '/business-directory' || pathname === '/business-listing') {
    categories.directory_index.push({ url, pathname, type, purpose });
  } else if (pathname.startsWith('/pag') || pathname === '/peer-advisory' || pathname === '/connect' || pathname === '/affiliate' || pathname === '/virtual-accelerator-program' || pathname === '/mldl' || pathname === '/ambassador-program') {
    categories.programs.push({ url, pathname, type, purpose });
  } else if (pathname === '/events' || pathname === '/dinner-mixers' || pathname === '/virtual-mixers' || pathname === '/upcoming-peer-advisory-meetings' || pathname === '/conferences-workshops') {
    categories.events.push({ url, pathname, type, purpose });
  } else if (pathname === '/membership' || pathname === '/join' || pathname === '/join-community' || pathname === '/interested' || pathname === '/sponsorship' || pathname === '/apply-to-sponsor' || pathname === '/join-as-investor' || pathname === '/opportunities') {
    categories.membership.push({ url, pathname, type, purpose });
  } else if (pathname === '/privacy-policy' || pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    categories.legal_meta.push({ url, pathname, type, purpose });
  } else if (pathname === '/' || pathname === '/about' || pathname === '/contact-us' || pathname === '/resources') {
    categories.core.push({ url, pathname, type, purpose });
  } else {
    categories.other.push({ url, pathname, type, purpose });
  }
});

console.log('Category Counts:');
for (const [k, v] of Object.entries(categories)) {
  console.log(`- ${k}: ${v.length}`);
}

console.log('\n--- CORE PAGES ---');
categories.core.forEach(p => console.log(`${p.pathname} (${p.type})`));

console.log('\n--- PROGRAM PAGES ---');
categories.programs.forEach(p => console.log(`${p.pathname} (${p.type})`));

console.log('\n--- EVENT PAGES ---');
categories.events.forEach(p => console.log(`${p.pathname} (${p.type})`));

console.log('\n--- MEMBERSHIP & SPONSORSHIP PAGES ---');
categories.membership.forEach(p => console.log(`${p.pathname} (${p.type})`));

console.log('\n--- OTHER / CAMPAIGN PAGES ---');
categories.other.forEach(p => console.log(`${p.pathname} (${p.type})`));
