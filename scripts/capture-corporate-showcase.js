const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-corp-' + Date.now());
  const port = 9556;

  console.log('Launching headless Chrome on port', port, '...');
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    `--user-data-dir=${tempProfile}`
  ]);

  try {
    for (let i = 0; i < 30; i++) {
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

    // 1. Desktop Homepage Hero Viewport (1440x900)
    console.log('Capturing Screenshot 1: Desktop Corporate Hero...');
    let tab = await getTab('http://127.0.0.1:8000/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Network.enable');

    const consoleMessages = [];
    tab.ws.addEventListener('message', (evt) => {
      const d = JSON.parse(evt.data);
      if (d.method === 'Runtime.consoleAPICalled') {
        consoleMessages.push(d.params.args.map(a => a.value).join(' '));
      }
    });

    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 1500));
    let snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '01-desktop-hero-corporate.png'), Buffer.from(snap.data, 'base64'));

    // 2. Measure Web Vitals on Desktop
    console.log('Measuring Core Web Vitals on Desktop...');
    const metrics = await tab.send('Runtime.evaluate', {
      expression: `
        (() => {
          const perf = window.performance;
          const nav = perf.getEntriesByType('navigation')[0];
          const paint = perf.getEntriesByType('paint');
          const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
          
          return {
            fcp: Math.round(fcp),
            domContentLoaded: Math.round(nav ? nav.domContentLoadedEventEnd : 0),
            loadEvent: Math.round(nav ? nav.loadEventEnd : 0),
            transferSize: nav ? nav.transferSize : 0
          };
        })()
      `,
      returnByValue: true
    });

    // Measure CLS and LCP via performance observer in page
    const webVitals = await tab.send('Runtime.evaluate', {
      expression: `
        new Promise(resolve => {
          let lcp = 0;
          let cls = 0;
          
          new PerformanceObserver(entryList => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) lcp = lastEntry.renderTime || lastEntry.loadTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });

          new PerformanceObserver(entryList => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                cls += entry.value;
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });

          setTimeout(() => {
            resolve({ lcp: Math.round(lcp), cls: Number(cls.toFixed(4)) });
          }, 1200);
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });

    const perfReport = {
      desktop: {
        ...metrics.result.value,
        ...webVitals.result.value,
        consoleErrors: consoleMessages.filter(m => m.includes('Error') || m.includes('404'))
      }
    };

    // 3. Desktop Scrolling - Culture & Ecosystem Architecture
    console.log('Capturing Screenshot 2: Culture & Ecosystem Architecture...');
    await tab.send('Runtime.evaluate', {
      expression: 'window.scrollTo({ top: 880, behavior: "instant" });'
    });
    await new Promise(r => setTimeout(r, 600));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '02-desktop-pillars-governance.png'), Buffer.from(snap.data, 'base64'));
    fs.writeFileSync(path.join(outDir, '02-desktop-culture-and-ecosystem.png'), Buffer.from(snap.data, 'base64'));

    // Capture Perspective 2: Boardroom Strategy
    console.log('Capturing Perspective 2: Boardroom Strategy...');
    await tab.send('Runtime.evaluate', {
      expression: 'window.scrollTo({ top: 0, behavior: "instant" }); window.setHeroPerspective("boardroom");'
    });
    await new Promise(r => setTimeout(r, 600));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '09-desktop-perspective-boardroom.png'), Buffer.from(snap.data, 'base64'));

    // Capture Perspective 3: Annual Gala
    console.log('Capturing Perspective 3: Annual Gala...');
    await tab.send('Runtime.evaluate', {
      expression: 'window.setHeroPerspective("gala");'
    });
    await new Promise(r => setTimeout(r, 600));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '10-desktop-perspective-gala.png'), Buffer.from(snap.data, 'base64'));

    // Reset back to Perspective 1: Summit
    await tab.send('Runtime.evaluate', {
      expression: 'window.setHeroPerspective("summit");'
    });
    await new Promise(r => setTimeout(r, 400));

    // 4. Glass Navigation Open State
    console.log('Capturing Screenshot 3: Glass Navigation Dropdown Open...');
    await tab.send('Runtime.evaluate', {
      expression: 'window.scrollTo({ top: 0, behavior: "instant" });'
    });
    await new Promise(r => setTimeout(r, 400));
    await tab.send('Runtime.evaluate', {
      expression: `
        const btn = Array.from(document.querySelectorAll('.nav-trigger-btn')).find(b => b.textContent.includes('Membership'));
        if (btn) {
          btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          btn.click();
        }
      `
    });
    await new Promise(r => setTimeout(r, 600));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '03-glass-navigation-open.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // 5. Mobile Viewport Composition (390x844)
    console.log('Capturing Screenshot 4: Mobile Viewport (390x844)...');
    tab = await getTab('http://127.0.0.1:8000/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await new Promise(r => setTimeout(r, 1500));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '04-mobile-viewport-390.png'), Buffer.from(snap.data, 'base64'));

    // Mobile Performance Metrics
    const mobileMetrics = await tab.send('Runtime.evaluate', {
      expression: `
        (() => {
          const perf = window.performance;
          const nav = perf.getEntriesByType('navigation')[0];
          const paint = perf.getEntriesByType('paint');
          const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
          return {
            fcp: Math.round(fcp),
            domContentLoaded: Math.round(nav ? nav.domContentLoadedEventEnd : 0),
            loadEvent: Math.round(nav ? nav.loadEventEnd : 0)
          };
        })()
      `,
      returnByValue: true
    });
    perfReport.mobile = mobileMetrics.result.value;
    tab.ws.close();

    // 6. Tablet Viewport (768x1024)
    console.log('Capturing Screenshot 5: Tablet Viewport (768x1024)...');
    tab = await getTab('http://127.0.0.1:8000/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '05-tablet-viewport-768.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // 7. About Page / Leadership Team
    console.log('Capturing Screenshot 6: About Us & Leadership...');
    tab = await getTab('http://127.0.0.1:8000/about');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '06-page-about-governance.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // 8. Business Directory Page
    console.log('Capturing Screenshot 7: Business Directory...');
    tab = await getTab('http://127.0.0.1:8000/business-directory');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '07-page-business-directory.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // 9. Peer Advisory Groups Page
    console.log('Capturing Screenshot 8: Peer Advisory Groups (PAG)...');
    tab = await getTab('http://127.0.0.1:8000/peer-advisory');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 1200));
    snap = await tab.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, '08-page-peer-advisory.png'), Buffer.from(snap.data, 'base64'));
    tab.ws.close();

    // Write performance report to docs
    fs.writeFileSync(path.join(__dirname, '../docs/performance-report.json'), JSON.stringify(perfReport, null, 2));
    console.log('Performance report saved:', perfReport);
    console.log('All screenshots and measurements captured successfully!');
  } catch (err) {
    console.error('Error during showcase capture:', err);
  } finally {
    chrome.kill();
    try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
