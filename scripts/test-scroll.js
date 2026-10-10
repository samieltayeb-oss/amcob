const { spawn } = require('child_process');

async function testScroll() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--remote-debugging-port=9455',
    '--headless=new',
    '--no-sandbox'
  ]);

  await new Promise(r => setTimeout(r, 1000));
  try {
    const target = await fetch('http://127.0.0.1:9455/json/new?http://127.0.0.1:8000/index.html', { method: 'PUT' }).then(r => r.json());
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    let id = 1;
    const send = (m, p = {}) => new Promise((resolve, reject) => {
      const i = id++;
      const h = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === i) {
          ws.removeEventListener('message', h);
          if (d.error) reject(d.error);
          else resolve(d.result);
        }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: i, method: m, params: p }));
    });

    await send('Page.enable');
    await new Promise(r => setTimeout(r, 1000));

    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('membership');
          return {
            hasEl: !!el,
            top: el ? el.offsetTop : null,
            initialScrollY: window.scrollY
          };
        })()
      `,
      returnByValue: true
    });
    console.log('DOM check result:', res.result.value);

    // Now test scrolling
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('membership');
          if (el) el.scrollIntoView({ behavior: 'instant' });
          return window.scrollY;
        })()
      `,
      returnByValue: true
    });

    await new Promise(r => setTimeout(r, 300));

    const scrollCheck = await send('Runtime.evaluate', {
      expression: `window.scrollY`,
      returnByValue: true
    });
    console.log('ScrollY after scrollIntoView:', scrollCheck.result.value);

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testScroll();
