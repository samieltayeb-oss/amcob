const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureViewport(width, height, outputFilename) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-eco-' + Date.now());
  const port = 9560 + Math.floor(Math.random() * 50);
  const chrome = spawn(chromePath, ['--remote-debugging-port=' + port, '--headless=new', '--no-sandbox', '--user-data-dir=' + tempProfile]);
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try { const res = await fetch('http://127.0.0.1:' + port + '/json/version'); if (res.ok) break; } catch (e) {}
  }
  const targetRes = await fetch('http://127.0.0.1:' + port + '/json/new?http%3A%2F%2F127.0.0.1%3A8000%2F%23ecosystem', { method: 'PUT' });
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
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 2, mobile: width < 600 });
  await new Promise(r => setTimeout(r, 1200));
  await send('Runtime.evaluate', { expression: 'document.getElementById("ecosystem").scrollIntoView({ behavior: "instant", block: "start" });' });
  await new Promise(r => setTimeout(r, 1000));
  const snap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outputFilename, Buffer.from(snap.data, 'base64'));
  console.log('Saved ' + outputFilename);
  chrome.kill();
}

(async () => {
  await captureViewport(768, 1200, 'docs/screenshots/13-tablet-ecosystem.png');
  await captureViewport(390, 1100, 'docs/screenshots/14-mobile-ecosystem.png');
})();
