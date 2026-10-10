const fs = require('fs');
const path = require('path');

const refined = JSON.parse(fs.readFileSync('scripts/refined-assets.json', 'utf8'));

// Create a lookup by sourceUrl and by filename
const urlToOptimized = new Map();
const filenameToOptimized = new Map();

refined.forEach(a => {
  if (a.localOptimized) {
    const optPath = '/' + a.localOptimized.replace(/\\/g, '/');
    urlToOptimized.set(a.sourceUrl, optPath);
    const fname = path.basename(a.sourceUrl);
    filenameToOptimized.set(fname, optPath);
  }
});

function resolveImage(src) {
  if (!src) return '';
  if (urlToOptimized.has(src)) return urlToOptimized.get(src);
  const fname = path.basename(src.split('?')[0]);
  if (filenameToOptimized.has(fname)) return filenameToOptimized.get(fname);
  return src;
}

// 1. Businesses
const businesses = JSON.parse(fs.readFileSync('data/businesses.json', 'utf8'));
let bizResolved = 0;
businesses.forEach(b => {
  const orig = b.image;
  b.localImage = resolveImage(orig);
  if (b.localImage.startsWith('/assets/')) bizResolved++;
});
fs.writeFileSync('data/businesses.json', JSON.stringify(businesses, null, 2));
console.log(`Businesses: ${bizResolved}/${businesses.length} mapped to local assets.`);

// 2. Articles
const articles = JSON.parse(fs.readFileSync('data/articles.json', 'utf8'));
let artResolved = 0;
articles.forEach(a => {
  const orig = a.image;
  a.localImage = resolveImage(orig);
  if (a.localImage.startsWith('/assets/')) artResolved++;
});
fs.writeFileSync('data/articles.json', JSON.stringify(articles, null, 2));
console.log(`Articles: ${artResolved}/${articles.length} mapped to local assets.`);

// 3. Books
const books = JSON.parse(fs.readFileSync('data/books.json', 'utf8'));
let bookResolved = 0;
books.forEach(bk => {
  const orig = bk.image;
  bk.localImage = resolveImage(orig);
  if (bk.localImage.startsWith('/assets/')) bookResolved++;
});
fs.writeFileSync('data/books.json', JSON.stringify(books, null, 2));
console.log(`Books: ${bookResolved}/${books.length} mapped to local assets.`);

// 4. Events
const events = JSON.parse(fs.readFileSync('data/events.json', 'utf8'));
let evtResolved = 0;
events.forEach(e => {
  const orig = e.image;
  e.localImage = resolveImage(orig);
  if (e.localImage.startsWith('/assets/')) evtResolved++;
});
fs.writeFileSync('data/events.json', JSON.stringify(events, null, 2));
console.log(`Events: ${evtResolved}/${events.length} mapped to local assets.`);
