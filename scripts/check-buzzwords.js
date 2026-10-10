const fs = require('fs');

const buzzwords = [
  'unlock your potential',
  'elevate your journey',
  'seamless ecosystem',
  'transformative experience',
  'where ambition meets opportunity',
  'delve into',
  'tapestry of',
  'testament to',
  'game-changer',
  'cutting-edge',
  'lorem ipsum'
];

function checkJson(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log('Checking ' + filePath);
  data.forEach((item, idx) => {
    const text = JSON.stringify(item).toLowerCase();
    buzzwords.forEach(b => {
      if (text.includes(b)) {
        console.log(`  Item ${idx} (${item.slug || item.title}): contains "${b}"`);
      }
    });
  });
}

checkJson('data/articles-rich.json');
checkJson('data/books-rich.json');
