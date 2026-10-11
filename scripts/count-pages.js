const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.git', 'concepts', 'scratch', '.system_generated'].includes(file)) {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const all = getHtmlFiles('.');
const breakdown = {};
all.forEach(p => {
  const norm = p.split(path.sep).join('/');
  let cat = 'Core Ecosystem & Hub Pages';
  if (norm.includes('/business-directory/')) cat = 'Individual Business Directory Profiles';
  else if (norm.includes('/blog/')) cat = 'Individual Thought Leadership Articles';
  else if (norm.includes('/books/')) cat = 'Individual Executive Library Books';
  else if (norm.includes('/ambassador-program/')) cat = 'Individual Ambassador Profiles';
  else if (norm.includes('/pag/')) cat = 'Peer Advisory Cohort Pages';
  
  breakdown[cat] = (breakdown[cat] || 0) + 1;
});

console.log('TOTAL PRODUCTION HTML PAGES:', all.length);
console.log(JSON.stringify(breakdown, null, 2));

console.log('\nCore Ecosystem Pages:');
all.filter(p => {
  const norm = p.split(path.sep).join('/');
  return !norm.includes('/business-directory/') && 
         !norm.includes('/blog/') && 
         !norm.includes('/books/') && 
         !norm.includes('/ambassador-program/') && 
         !norm.includes('/pag/');
}).forEach(p => console.log(' - ' + p));
