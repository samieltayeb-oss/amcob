const fs = require('fs');

const content = fs.readFileSync('C:/Users/mcreg/.gemini/antigravity/brain/7436eab0-c5d0-4a3b-9f54-424a8f7170fa/.system_generated/steps/5164/content.md', 'utf8');

const idx = content.indexOf('id="for-everyone"');
if (idx !== -1) {
  console.log(content.substring(idx - 200, idx + 3500));
} else {
  console.log('for-everyone not found by index');
}
