const { spawn } = require('child_process');
const path = require('path');

async function testDropdown() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-drop-' + Date.now());
  const port = 9285;
  
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

    await send('Runtime.enable');
    await send('Page.enable');

    await new Promise(r => setTimeout(r, 1500));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('.nav-dropdown-wrapper .nav-trigger-btn');
        const panel = document.querySelector('.nav-dropdown-wrapper .glass-dropdown-panel');
        if (!panel) return { error: 'no panel' };
        btn.click();
        return {
          btnExists: !!btn,
          hasOpen: panel.classList.contains('open'),
          opacity: window.getComputedStyle(panel).opacity,
          visibility: window.getComputedStyle(panel).visibility,
          top: window.getComputedStyle(panel).top,
          left: window.getComputedStyle(panel).left
        };
      })()`,
      returnByValue: true
    });

    console.log('Dropdown Test Result:', res.result.value);
    ws.close();
  } finally {
    chrome.kill();
  }
}

testDropdown().catch(console.error);
