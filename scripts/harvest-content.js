const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve);
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, data: d }));
    }).on('error', (err) => resolve({ status: 500, data: '', error: err.message }));
  });
}

async function scrapeArticles() {
  console.log('--- Scraping Blog Articles ---');
  const articles = [];
  const seenSlugs = new Set();

  for (let page = 1; page <= 25; page++) {
    process.stdout.write(`Fetching blog page ${page}... `);
    const res = await fetchPage(`https://amcob.org/blog?page=${page}`);
    if (res.status !== 200 || !res.data) {
      console.log(`Failed (Status ${res.status})`);
      continue;
    }

    // Match links to /blog/[slug]
    // In blog_page.html, let's see how each article is structured
    const cardRegex = /<article[\s\S]*?<\/article>|<div class="[^"]*blog[^"]*"[\s\S]*?<\/div>/gi;
    // Or let's look for href="https://amcob.org/blog/..."
    const linkMatches = [...res.data.matchAll(/href="https:\/\/amcob\.org\/blog\/([a-zA-Z0-9_\-]+)"/g)];
    let pageCount = 0;

    for (const match of linkMatches) {
      const slug = match[1];
      if (slug === 'images' || seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      // Find context around this slug
      const idx = res.data.indexOf(slug);
      const snippet = res.data.substring(Math.max(0, idx - 300), Math.min(res.data.length, idx + 600));

      const titleMatch = snippet.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slug.replace(/-/g, ' ');

      const imgMatch = snippet.match(/<img[^>]+src=["']([^"']+)["']/i);
      const image = imgMatch ? imgMatch[1] : '';

      const descMatch = snippet.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const excerpt = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      articles.push({
        id: articles.length + 1,
        slug,
        title,
        excerpt,
        image,
        url: `/blog/${slug}`
      });
      pageCount++;
    }

    console.log(`Found ${pageCount} new articles (Total so far: ${articles.length})`);
    if (pageCount === 0) break;
  }

  fs.writeFileSync('data/articles.json', JSON.stringify(articles, null, 2));
  console.log(`Saved ${articles.length} articles to data/articles.json\n`);
  return articles;
}

async function scrapeBooks() {
  console.log('--- Scraping Executive Library Books ---');
  const books = [];
  const seenSlugs = new Set();

  for (let page = 1; page <= 10; page++) {
    process.stdout.write(`Fetching books page ${page}... `);
    const res = await fetchPage(`https://amcob.org/books?page=${page}`);
    if (res.status !== 200 || !res.data) {
      console.log(`Failed (Status ${res.status})`);
      continue;
    }

    const linkMatches = [...res.data.matchAll(/href="https:\/\/amcob\.org\/books\/([a-zA-Z0-9_\-]+)"/g)];
    let pageCount = 0;

    for (const match of linkMatches) {
      const slug = match[1];
      if (slug === 'images' || seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      const idx = res.data.indexOf(slug);
      const snippet = res.data.substring(Math.max(0, idx - 300), Math.min(res.data.length, idx + 600));

      const titleMatch = snippet.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slug.replace(/-/g, ' ');

      const imgMatch = snippet.match(/<img[^>]+src=["']([^"']+)["']/i);
      const image = imgMatch ? imgMatch[1] : '';

      const authorMatch = snippet.match(/by\s+([A-Za-z\s\.\-]+)/i);
      const author = authorMatch ? authorMatch[1].trim() : 'Executive Insight';

      const descMatch = snippet.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      books.push({
        id: books.length + 1,
        slug,
        title,
        author,
        description,
        image,
        url: `/books/${slug}`
      });
      pageCount++;
    }

    console.log(`Found ${pageCount} new books (Total so far: ${books.length})`);
    if (pageCount === 0) break;
  }

  fs.writeFileSync('data/books.json', JSON.stringify(books, null, 2));
  console.log(`Saved ${books.length} books to data/books.json\n`);
  return books;
}

async function run() {
  await scrapeArticles();
  await scrapeBooks();
}

run();
