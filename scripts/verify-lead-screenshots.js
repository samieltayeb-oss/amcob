const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function capture() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-lead-verify-' + Date.now());
  const port = 9338;

  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
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

    const artifactsDir = "C:\\Users\\mcreg\\.gemini\\antigravity\\brain\\7436eab0-c5d0-4a3b-9f54-424a8f7170fa";

    async function snap(url, filename) {
      const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
      const targetData = await targetRes.json();
      const ws = new WebSocket(targetData.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
      });

      let msgId = 1;
      function send(method, params = {}) {
        return new Promise((resolve, reject) => {
          const id = msgId++;
          const handler = (evt) => {
            const data = JSON.parse(evt.data);
            if (data.id === id) {
              ws.removeEventListener('message', handler);
              if (data.error) reject(data.error);
              else resolve(data.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      }

      await send('Page.enable');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 1000,
        deviceScaleFactor: 1,
        mobile: false
      });
      await new Promise(r => setTimeout(r, 1200));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const outPath = path.join(artifactsDir, filename);
      fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);

      ws.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${targetData.id}`);
    }

    await snap('http://127.0.0.1:8000/lead', 'verify_lead_index.png');
    await snap('http://127.0.0.1:8000/lead/speakers', 'verify_lead_speakers.png');
    await snap('http://127.0.0.1:8000/lead/sponsorship', 'verify_lead_sponsorship.png');
    await snap('http://127.0.0.1:8000/lead/tickets', 'verify_lead_tickets.png');
    await snap('http://127.0.0.1:8000/lead/agenda', 'verify_lead_agenda.png');
    await snap('http://127.0.0.1:8000/', 'verify_sitewide_nav_lead.png');

    async function snapScrolled(url, filename, scrollSelector) {
      const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
      const targetData = await targetRes.json();
      const ws = new WebSocket(targetData.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

      let msgId = 1;
      function send(method, params = {}) {
        return new Promise((resolve, reject) => {
          const id = msgId++;
          const handler = (evt) => {
            const data = JSON.parse(evt.data);
            if (data.id === id) {
              ws.removeEventListener('message', handler);
              if (data.error) reject(data.error);
              else resolve(data.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      }

      await send('Page.enable');
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
      await new Promise(r => setTimeout(r, 1000));

      await send('Runtime.evaluate', {
        expression: `document.querySelector('${scrollSelector}').scrollIntoView({ behavior: 'instant', block: 'center' });`
      });
      await new Promise(r => setTimeout(r, 800));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const outPath = path.join(artifactsDir, filename);
      fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved scrolled screenshot: ${filename}`);

      ws.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${targetData.id}`);
    }

    await snapScrolled('http://127.0.0.1:8000/', 'verify_footer_lead_column.png', '.site-footer-imperial');
    await snapScrolled('http://127.0.0.1:8000/lead', 'verify_lead_for_everyone.png', '#for-everyone');
    await snapScrolled('http://127.0.0.1:8000/lead', 'verify_lead_expo.png', '#expo');

  } finally {
    chrome.kill('SIGKILL');
  }
}

capture().catch(console.error);
