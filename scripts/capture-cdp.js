const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function capture(url, outputPath, width = 1440, height = 900, delayMs = 1500) {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-cdp-' + Date.now());
  
  const port = 9222 + Math.floor(Math.random() * 500);
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`
  ]);

  try {
    // Wait for CDP endpoint
    let versionData = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        versionData = await res.json();
        break;
      } catch (e) {}
    }
    if (!versionData) throw new Error("Could not connect to Chrome CDP");

    // Open target tab
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
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: width < 600
    });

    await new Promise(r => setTimeout(r, delayMs));

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

// Quick CLI runner
const [,, url, out, w, h, delay] = process.argv;
if (url && out) {
  capture(url, out, parseInt(w) || 1440, parseInt(h) || 900, parseInt(delay) || 1500)
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { capture };
