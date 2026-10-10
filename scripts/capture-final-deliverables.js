const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-capture-' + Date.now());
  const port = 9555;

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

    async function getTab(url) {
      const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
      const targetData = await targetRes.json();
      const ws = new WebSocket(targetData.webSocketDebuggerUrl);
      await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
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
      return { ws, send };
    }

    const outDir = path.join(__dirname, '../docs/screenshots');
    fs.mkdirSync(outDir, { recursive: true });

    // 1. Desktop - Beginning of Motion Sequence (Resting State)
    console.log('Capturing Screenshot 1: Desktop Motion Sequence Start (Resting State)...');
    let tab = await getTab('http://127.0.0.1:8000/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 3500));
    let snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '01-desktop-motion-start.png'), Buffer.from(snap.data, 'base64'));

    // 2. Desktop - End of Motion Sequence (Parallax Interaction & Optical Tilt)
    console.log('Capturing Screenshot 2: Desktop Motion Sequence End (Pointer Tilt & Parallax)...');
    await tab.send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 1200,
      y: 400
    });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '02-desktop-motion-end.png'), Buffer.from(snap.data, 'base64'));

    // 3. Glass Navigation - Closed State (Header Close-up)
    console.log('Capturing Screenshot 3: Glass Navigation Closed State...');
    // We can capture top header viewport
    snap = await tab.send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 200, scale: 2 }
    });
    fs.writeFileSync(path.join(outDir, '03-glass-nav-closed.png'), Buffer.from(snap.data, 'base64'));

    // 4. Glass Navigation - Open State (Membership Mega Menu)
    console.log('Capturing Screenshot 4: Glass Navigation Open State...');
    await tab.send('Runtime.evaluate', {
      expression: `
        const btn = Array.from(document.querySelectorAll('.nav-trigger-btn')).find(b => b.textContent.includes('Membership'));
        if (btn) {
          btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          btn.click();
        }
      `
    });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '04-glass-nav-open.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // 5. Mobile Viewport Composition (390x844)
    console.log('Capturing Screenshot 5: Mobile Viewport Composition (390x844)...');
    tab = await getTab('http://127.0.0.1:8000/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await new Promise(r => setTimeout(r, 3500));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '05-mobile-composition.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    console.log('All deliverable screenshots captured successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
    try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
