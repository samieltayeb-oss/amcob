const fs = require('fs');

const refined = JSON.parse(fs.readFileSync('scripts/refined-assets.json', 'utf8'));
console.log('Total refined assets:', refined.length);

const categories = {};
refined.forEach(a => {
  categories[a.category] = (categories[a.category] || 0) + 1;
});
console.log('Categories in refined-assets.json:', categories);

// Sample business asset
const bizSample = refined.filter(a => a.category === 'businesses').slice(0, 3);
console.log('\nSample Business Assets:');
console.dir(bizSample, { depth: 2 });

// Sample book asset
const bookSample = refined.filter(a => a.category === 'books').slice(0, 3);
console.log('\nSample Book Assets:');
console.dir(bookSample, { depth: 2 });

// Sample event asset
const eventSample = refined.filter(a => a.category === 'events').slice(0, 3);
console.log('\nSample Event Assets:');
console.dir(eventSample, { depth: 2 });

// Sample article asset
const articleSample = refined.filter(a => a.category === 'articles').slice(0, 3);
console.log('\nSample Article Assets:');
console.dir(articleSample, { depth: 2 });
