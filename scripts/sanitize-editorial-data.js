const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\bunlock your potential\b/gi, replace: 'reach your potential' },
  { regex: /\bUnlock Your Potential\b/g, replace: 'Reach Your Potential' },
  { regex: /\belevate your journey\b/gi, replace: 'advance your path' },
  { regex: /\bseamless ecosystem\b/gi, replace: 'integrated network' },
  { regex: /\btransformative experience\b/gi, replace: 'meaningful experience' },
  { regex: /\bwhere ambition meets opportunity\b/gi, replace: 'where ambition connects with opportunity' },
  { regex: /\bdelve into\b/gi, replace: 'examine' },
  { regex: /\bDelve into\b/g, replace: 'Examine' },
  { regex: /\btapestry of\b/gi, replace: 'mosaic of' },
  { regex: /\btestament to\b/gi, replace: 'evidence of' },
  { regex: /\bgame-changer\b/gi, replace: 'catalyst' },
  { regex: /\bgame changer\b/gi, replace: 'catalyst' },
  { regex: /\bGame-Changer\b/g, replace: 'Catalyst' },
  { regex: /\bcutting-edge\b/gi, replace: 'advanced' },
  { regex: /\bcutting edge\b/gi, replace: 'advanced' },
  { regex: /\s*[—–]\s*/g, replace: ', ' },
  { regex: /\s+-\s+/g, replace: ': ' }
];

function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  let out = str;
  replacements.forEach(({ regex, replace }) => {
    out = out.replace(regex, replace);
  });
  return out;
}

function sanitizeObject(obj) {
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  if (obj && typeof obj === 'object') {
    const res = {};
    for (const key of Object.keys(obj)) {
      res[key] = sanitizeObject(obj[key]);
    }
    return res;
  }
  return obj;
}

const files = [
  'data/articles.json',
  'data/articles-rich.json',
  'data/books.json',
  'data/books-rich.json'
];

function safeWrite(file, data) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.writeFileSync(file, data, 'utf8');
      return;
    } catch (e) {
      if (attempt === 4) throw e;
      const waitTill = new Date(new Date().getTime() + 200);
      while (waitTill > new Date()) {}
    }
  }
}

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const sanitized = sanitizeObject(raw);
    safeWrite(filePath, JSON.stringify(sanitized, null, 2));
    console.log(`Sanitized ${file}`);
  }
});
