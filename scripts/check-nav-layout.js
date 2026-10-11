const { spawn } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempProfile = 'C:\\Temp\\chrome-debug-' + Date.now();
const port = 9339;

const chrome = spawn(chromePath, ['--remote-debugging-port=' + port, '--headless=new', '--no-sandbox', '--disable-gpu', '--user-data-dir=' + tempProfile]);

async function check() {
  await new Promise(r => setTimeout(r, 1500));
  const res = await fetch('http://127.0.0.1:' + port + '/json/new?http%3A%2F%2F127.0.0.1%3A8000', { method: 'PUT' });
  const data = await res.json();
  const ws = new WebSocket(data.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise(resolve => {
      const id = Math.floor(Math.random() * 100000);
      const h = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === id) { ws.removeEventListener('message', h); resolve(msg.result); }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 1000));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const items = document.querySelectorAll('.nav-desktop > *');
      return Array.from(items).map(item => ({
        tag: item.tagName,
        text: item.innerText.trim().replace(/\\n/g, ' '),
        rect: {
          left: Math.round(item.getBoundingClientRect().left),
          right: Math.round(item.getBoundingClientRect().right),
          top: Math.round(item.getBoundingClientRect().top),
          width: Math.round(item.getBoundingClientRect().width)
        }
      }));
    })()`,
    returnByValue: true
  });

  console.log('Nav items layout:');
  evalRes.result.value.forEach(v => {
    console.log(`- ${v.text.padEnd(20)} left: ${v.rect.left}, right: ${v.rect.right}, width: ${v.rect.width}`);
  });

  ws.close();
  chrome.kill('SIGKILL');
}

check().catch(console.error);
