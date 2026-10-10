const { capture } = require('./capture-cdp');

const targets = [
  { url: 'http://127.0.0.1:8000/', out: 'screenshots/multipage-01-homepage-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/about', out: 'screenshots/multipage-03-about-desktop.png', w: 1440, h: 1400 },
  { url: 'http://127.0.0.1:8000/ambassador-program', out: 'screenshots/multipage-15-ambassadors-desktop.png', w: 1440, h: 1400 }
];

async function run() {
  console.log(`Starting capture of ${targets.length} pages...`);
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    console.log(`[${i+1}/${targets.length}] Capturing ${t.url} -> ${t.out}...`);
    try {
      await capture(t.url, t.out, t.w, t.h, 2000);
    } catch(e) {
      console.error(`Failed to capture ${t.url}:`, e.message);
    }
  }
  console.log('Target captures finished!');
}

run();
