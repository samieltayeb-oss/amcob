const { capture } = require('./capture-cdp');

async function run() {
  await capture('http://127.0.0.1:8000/', 'screenshots/multipage-16-ecosystem-desktop.png', 1440, 1600, 2000);
  console.log('Captured full desktop homepage with ecosystem!');
}

run();
