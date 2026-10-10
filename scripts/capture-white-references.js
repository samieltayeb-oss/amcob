const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureUrl(url, outputPath, width = 1440, height = 900) {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-ref-white-' + Date.now());
  const port = 9330 + Math.floor(Math.random() * 200);

  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=${tempProfile}`
  ]);

  try {
    for (let i = 0; i < 25; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) break;
      } catch (e) {}
    }

    const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
    const targetData = await targetRes.json();
    const ws = new WebSocket(targetData.webSocketDebuggerUrl);

    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const reqId = id++;
        const handler = (evt) => {
          const d = JSON.parse(evt.data);
          if (d.id === reqId) {
            ws.removeEventListener('message', handler);
            if (d.error) reject(d.error);
            else resolve(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: false
    });

    await new Promise(r => setTimeout(r, 4500));

    const screenshotRes = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const buffer = Buffer.from(screenshotRes.data, 'base64');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved screenshot: ${outputPath} (${width}x${height})`);

    ws.close();
  } catch (err) {
    console.error(`Failed to capture ${url}:`, err.message);
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tempProfile, { recursive: true, force: true });
    } catch (e) {}
  }
}

async function run() {
  const outDir = path.join(__dirname, '../docs/references');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Capturing Reference 1: Apple iPad Air (White Editorial Architecture)...');
  await captureUrl('https://www.apple.com/ipad-air/', path.join(outDir, 'ref-01-apple-white-editorial.png'));

  console.log('Capturing Reference 2: Stripe Homepage (White Composition & Unified Layout)...');
  await captureUrl('https://stripe.com/', path.join(outDir, 'ref-02-stripe-white-composition.png'));

  console.log('Capturing Reference 3: Raycast (Frosted Glass Navigation & Controlled Depth)...');
  await captureUrl('https://www.raycast.com/', path.join(outDir, 'ref-03-raycast-glass-white.png'));

  console.log('Reference capture complete!');
}

run().catch(console.error);
