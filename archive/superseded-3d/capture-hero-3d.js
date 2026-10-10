const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureScreen(url, outputPath, { width = 1440, height = 900, delayMs = 2500, evalScript = null } = {}) {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-cdp-3d-' + Date.now());
  
  const port = 9222 + Math.floor(Math.random() * 500);
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=${tempProfile}`
  ]);

  try {
    let versionData = null;
    for (let i = 0; i < 25; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        versionData = await res.json();
        break;
      } catch (e) {}
    }
    if (!versionData) throw new Error("Could not connect to Chrome CDP");

    const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
    const targetData = await targetRes.json();
    const wsUrl = targetData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (evt) => {
          const res = JSON.parse(evt.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            if (res.error) reject(res.error);
            else resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: width < 600
    });

    await new Promise(r => setTimeout(r, delayMs));

    if (evalScript) {
      await sendCommand('Runtime.evaluate', { expression: evalScript });
      await new Promise(r => setTimeout(r, 500));
    }

    const screenshotRes = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const buffer = Buffer.from(screenshotRes.data, 'base64');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved screenshot: ${outputPath} (${width}x${height})`);

    ws.close();
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tempProfile, { recursive: true, force: true });
    } catch (e) {}
  }
}

async function run() {
  const outputDir = path.join(__dirname, '../docs/screenshots');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Capturing Desktop Homepage with 3D Architectural Scene...');
  await captureScreen('http://127.0.0.1:8000/', path.join(outputDir, '01-home-3d-architectural.png'), {
    width: 1440,
    height: 900,
    delayMs: 3000
  });

  console.log('Capturing Desktop Homepage with Glass Dropdown Open...');
  await captureScreen('http://127.0.0.1:8000/', path.join(outputDir, '02-glass-dropdown-open.png'), {
    width: 1440,
    height: 900,
    delayMs: 2500,
    evalScript: `
      const trigger = document.querySelector('.nav-dropdown-wrapper .nav-trigger-btn');
      if (trigger) {
        trigger.click();
      }
    `
  });

  console.log('Capturing Mobile Viewport (390x844)...');
  await captureScreen('http://127.0.0.1:8000/', path.join(outputDir, '03-mobile-hero-glass.png'), {
    width: 390,
    height: 844,
    delayMs: 2500
  });

  console.log('Capturing Inner Page: Peer Advisory Groups...');
  await captureScreen('http://127.0.0.1:8000/peer-advisory', path.join(outputDir, '04-peer-advisory-page.png'), {
    width: 1440,
    height: 900,
    delayMs: 2000
  });

  console.log('Capturing Design System Specification...');
  await captureScreen('http://127.0.0.1:8000/design-system', path.join(outputDir, '05-design-system.png'), {
    width: 1440,
    height: 900,
    delayMs: 2000
  });

  console.log('All screenshots captured successfully!');
}

run().catch(err => {
  console.error('Screenshot run failed:', err);
  process.exit(1);
});
