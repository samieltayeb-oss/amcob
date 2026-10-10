const { capture } = require('./capture-cdp');

async function captureDestinations() {
  const targets = [
    { url: 'http://127.0.0.1:8000/opportunities', out: 'screenshots/multipage-23-opportunities-desktop.png', w: 1440, h: 1000 },
    { url: 'http://127.0.0.1:8000/podcasts', out: 'screenshots/multipage-24-podcasts-desktop.png', w: 1440, h: 1000 },
    { url: 'http://127.0.0.1:8000/conferences-workshops', out: 'screenshots/multipage-25-workshops-desktop.png', w: 1440, h: 1000 },
    { url: 'http://127.0.0.1:8000/virtual-accelerator-program', out: 'screenshots/multipage-26-accelerator-desktop.png', w: 1440, h: 1000 },
    { url: 'http://127.0.0.1:8000/sponsorship', out: 'screenshots/multipage-27-sponsorship-desktop.png', w: 1440, h: 1000 },
    { url: 'http://127.0.0.1:8000/connect', out: 'screenshots/multipage-28-connect-desktop.png', w: 1440, h: 1000 }
  ];

  console.log(`Starting capture of ${targets.length} ecosystem destination pages...`);
  for (const t of targets) {
    try {
      console.log(`Capturing: ${t.url} -> ${t.out}`);
      await capture(t.url, t.out, t.w, t.h, 2000);
      console.log(`✓ Saved ${t.out}`);
    } catch (e) {
      console.error(`Failed to capture ${t.url}:`, e.message);
    }
  }
  console.log('Ecosystem destination captures finished!');
}

captureDestinations();
