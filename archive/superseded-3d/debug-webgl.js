const { spawn } = require('child_process');
const path = require('path');

async function debugPage() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-cdp-debug-' + Date.now());
  const port = 9250;
  
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

    const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?http://127.0.0.1:8000/`, { method: 'PUT' });
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
      if (msg.method === 'Console.messageAdded') {
        console.log('[BROWSER CONSOLE]', msg.params.message.level, msg.params.message.text);
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER API]', msg.params.type, ...msg.params.args.map(a => a.value || a.description));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
      }
    });

    await send('Console.enable');
    await send('Runtime.enable');
    await send('Page.enable');

    await new Promise(r => setTimeout(r, 3000));

    const checkResult = await send('Runtime.evaluate', {
      expression: `({
        stage: !!document.getElementById('hero3dStage'),
        stageWidth: document.getElementById('hero3dStage')?.clientWidth,
        stageHeight: document.getElementById('hero3dStage')?.clientHeight,
        canvas: !!document.getElementById('hero3dCanvas'),
        canvasWidth: document.getElementById('hero3dCanvas')?.width,
        canvasHeight: document.getElementById('hero3dCanvas')?.height,
        hasThree: typeof window.THREE !== 'undefined',
        noWebgl: document.documentElement.classList.contains('no-webgl')
      })`,
      returnByValue: true
    });

    console.log('DOM & Canvas Status:', checkResult.result.value);

    ws.close();
  } finally {
    chrome.kill();
  }
}

debugPage().catch(console.error);
