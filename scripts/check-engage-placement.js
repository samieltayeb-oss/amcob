const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git' || f === '.vercel') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(findHtmlFiles(p));
    else if (f.endsWith('.html')) res.push(p);
  }
  return res;
}

const files = findHtmlFiles(path.resolve(__dirname, '..'));
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const navIdx = c.indexOf('class="nav-desktop"');
  const endNavIdx = c.indexOf('</nav>', navIdx);
  const engageIdx = c.indexOf('<!-- Engage Mega Dropdown -->');
  const rel = path.relative(path.resolve(__dirname, '..'), f);
  if (engageIdx === -1) {
    console.log('MISSING ENGAGE:', rel);
  } else if (engageIdx < navIdx || engageIdx > endNavIdx) {
    console.log('MISPLACED ENGAGE (outside nav):', rel);
  } else {
    // console.log('OK:', rel);
  }
}
