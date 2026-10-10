const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function capture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-ref-clean-' + Date.now());
  const port = 9445;

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

    const outDir = path.join(__dirname, '../docs/references');
    fs.mkdirSync(outDir, { recursive: true });

    // 1. Apple iPad Air - White Editorial Architecture
    console.log('Capturing Reference 1: Apple iPad Air (White Editorial Architecture)...');
    let tab = await getTab('https://www.apple.com/ipad-air/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 4500));
    await tab.send('Runtime.evaluate', {
      expression: `
        document.querySelectorAll('#ac-gn-segmentbar, .ribbon, #ac-gn-curtain, .banner-container').forEach(el => el.remove());
        window.scrollTo(0, 180);
      `
    });
    await new Promise(r => setTimeout(r, 800));
    let snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'ref-01-apple-white-editorial.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // 2. Stripe - Convincing Glass Navigation on White
    console.log('Capturing Reference 2: Stripe (Convincing Glass Navigation on White)...');
    tab = await getTab('https://stripe.com/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 4500));
    // Trigger the products menu dropdown to reveal the frosted glass mega menu
    await tab.send('Runtime.evaluate', {
      expression: `
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Products'));
        if (btn) {
          btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          btn.click();
        }
      `
    });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'ref-02-stripe-glass-nav.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // 3. Apple Vision Pro - Sophisticated 3D & Motion Hardware Integration on White
    console.log('Capturing Reference 3: Apple Vision Pro (Sophisticated 3D & Depth on White)...');
    tab = await getTab('https://www.apple.com/apple-vision-pro/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 4500));
    await tab.send('Runtime.evaluate', {
      expression: `
        document.querySelectorAll('#ac-gn-segmentbar, .ribbon, #ac-gn-curtain, .banner-container').forEach(el => el.remove());
        window.scrollTo(0, 1600);
      `
    });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'ref-03-apple-vision-depth.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    console.log('Clean reference capture finished successfully!');
  } catch (e) {
    console.error('Capture error:', e);
  } finally {
    chrome.kill();
    try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
  }
}

capture();
