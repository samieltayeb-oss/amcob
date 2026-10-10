const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchBinary(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve);
      }
      if (res.statusCode !== 200) {
        return resolve({ status: res.statusCode, buffer: null });
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: 200, buffer: Buffer.concat(chunks) }));
    }).on('error', () => resolve({ status: 500, buffer: null }));
  });
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function downloadCategory(file, folderName) {
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));
  ensureDir(`assets/optimized/${folderName}`);
  ensureDir(`assets/original`);

  let count = 0;
  for (const item of items) {
    if (!item.localImage || !item.localImage.startsWith('/assets/')) {
      if (!item.image || !item.image.startsWith('http')) continue;
      
      const fname = path.basename(item.image.split('?')[0]);
      if (!fname || fname.length < 3) continue;

      const optPath = `assets/optimized/${folderName}/${fname}`;
      const origPath = `assets/original/${folderName}_${fname}`;

      if (fs.existsSync(optPath)) {
        item.localImage = '/' + optPath.replace(/\\/g, '/');
        count++;
        continue;
      }

      const res = await fetchBinary(item.image);
      if (res.status === 200 && res.buffer && res.buffer.length > 50) {
        fs.writeFileSync(origPath, res.buffer);
        fs.writeFileSync(optPath, res.buffer);
        item.localImage = '/' + optPath.replace(/\\/g, '/');
        count++;
      }
    }
  }

  fs.writeFileSync(file, JSON.stringify(items, null, 2));
  console.log(`Updated ${file}: ${count} images resolved locally.`);
}

async function run() {
  console.log('Downloading any missing content images...');
  await downloadCategory('data/businesses.json', 'businesses');
  await downloadCategory('data/articles.json', 'articles');
  await downloadCategory('data/books.json', 'books');
  console.log('Done downloading content images.');
}

run();
