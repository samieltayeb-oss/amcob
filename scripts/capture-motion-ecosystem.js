const { capture } = require('./capture-cdp');

async function run() {
  console.log('Capturing desktop motion graphics ecosystem...');
  await capture('http://127.0.0.1:8000/#ecosystem', 'screenshots/multipage-17-motion-ecosystem-desktop.png', 1440, 1000, 2500);

  console.log('Capturing mobile motion graphics ecosystem...');
  await capture('http://127.0.0.1:8000/#ecosystem', 'screenshots/multipage-18-motion-ecosystem-mobile.png', 390, 844, 2500);

  console.log('Motion graphics ecosystem captured!');
}

run();
