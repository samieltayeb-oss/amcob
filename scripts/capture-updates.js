const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-snap-' + Date.now());
  const port = 9560;
  const chrome = spawn(chromePath, ['--remote-debugging-port=' + port, '--headless=new', '--no-sandbox', '--user-data-dir=' + tempProfile]);
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try { const res = await fetch('http://127.0.0.1:' + port + '/json/version'); if (res.ok) break; } catch (e) {}
  }
  
  async function getTab(url) {
    const targetRes = await fetch('http://127.0.0.1:' + port + '/json/new?' + encodeURIComponent(url), { method: 'PUT' });
    const targetData = await targetRes.json();
    const ws = new WebSocket(targetData.webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);
    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const reqId = id++;
        const handler = (evt) => {
          const d = JSON.parse(evt.data);
          if (d.id === reqId) { ws.removeEventListener('message', handler); resolve(d.result); }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }
    return { ws, send };
  }

  // 1. Directory with floating motion graphics
  console.log('Capturing Directory floating motion...');
  let tab = await getTab('http://127.0.0.1:8000/business-directory');
  await tab.send('Page.enable');
  await tab.send('Runtime.enable');
  await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
  await new Promise(r => setTimeout(r, 1500));
  let snap = await tab.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('docs/screenshots/12-desktop-directory-floating-motion.png', Buffer.from(snap.data, 'base64'));
  tab.ws.close();

  // 2. Homepage Gala perspective
  console.log('Capturing Gala hero perspective...');
  tab = await getTab('http://127.0.0.1:8000/');
  await tab.send('Page.enable');
  await tab.send('Runtime.enable');
  await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
  await new Promise(r => setTimeout(r, 1200));
  await tab.send('Runtime.evaluate', { expression: 'window.setHeroPerspective("gala");' });
  await new Promise(r => setTimeout(r, 800));
  snap = await tab.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('docs/screenshots/10-desktop-perspective-gala.png', Buffer.from(snap.data, 'base64'));
  tab.ws.close();

  console.log('Screenshots captured successfully!');
  chrome.kill();
})();
