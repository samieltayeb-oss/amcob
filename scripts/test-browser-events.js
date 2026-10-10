const { spawn } = require('child_process');
const path = require('path');

async function testBrowserEvents() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-events-' + Date.now());
  const port = 9260;
  
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=${tempProfile}`
  ]);

  try {
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) break;
      } catch (e) {}
    }

    const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
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

    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[CONSOLE]', msg.params.type, ...msg.params.args.map(a => a.value || a.description));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[EXCEPTION]', JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.method === 'Log.entryAdded') {
        console.log('[LOG]', msg.params.entry);
      }
      if (msg.method === 'Network.responseReceived') {
        const resp = msg.params.response;
        if (resp.url.includes('hero-3d') || resp.url.includes('three')) {
          console.log('[NETWORK]', resp.status, resp.url, resp.mimeType);
        }
      }
    });

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Network.enable');
    await send('Log.enable');

    console.log('Navigating to http://127.0.0.1:8000/...');
    await send('Page.navigate', { url: 'http://127.0.0.1:8000/' });

    await new Promise(r => setTimeout(r, 4000));

    ws.close();
  } finally {
    chrome.kill();
  }
}

testBrowserEvents().catch(console.error);
