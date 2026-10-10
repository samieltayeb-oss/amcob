const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureWhiteScreenshots() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-white-' + Date.now());
  const port = 9444;

  console.log("Launching headless Chrome on port " + port + "...");
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`
  ]);

  try {
    let versionData = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        versionData = await res.json();
        break;
      } catch (e) {}
    }
    if (!versionData) throw new Error("Could not connect to Chrome CDP");
    console.log("Connected to Chrome CDP successfully.");

    const url = 'http://127.0.0.1:8000/concepts/index.html';
    const outDir = "C:\\Users\\mcreg\\Desktop\\amcob.org\\concepts\\screenshots";
    fs.mkdirSync(outDir, { recursive: true });

    async function capture(outputPath, width, height, scriptToEvaluate = null, delayMs = 1000) {
      console.log(`\nCapturing: ${path.basename(outputPath)} (${width}x${height})...`);
      const targetRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
      const targetData = await targetRes.json();
      const wsUrl = targetData.webSocketDebuggerUrl;

      const ws = new WebSocket(wsUrl);
      await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
      });

      let msgId = 1;
      function send(method, params = {}) {
        return new Promise((resolve, reject) => {
          const id = msgId++;
          const handler = (evt) => {
            const res = JSON.parse(evt.data);
            if (res.id === id) {
              ws.removeEventListener('message', handler);
              if (res.error) reject(res.error);
              else resolve(res.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      }

      await send('Page.enable');
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 2,
        mobile: width < 600
      });

      // Wait 1.4s for full image decoding and layout
      await new Promise(r => setTimeout(r, 1400));

      if (scriptToEvaluate) {
        const evalRes = await send('Runtime.evaluate', {
          expression: scriptToEvaluate,
          returnByValue: true
        });
        console.log(`  Evaluated script -> Result:`, evalRes.result ? evalRes.result.value : 'done');
      }

      await new Promise(r => setTimeout(r, delayMs));

      const scrollRes = await send('Runtime.evaluate', {
        expression: '({ scrollY: window.scrollY, innerHeight: window.innerHeight })',
        returnByValue: true
      });
      console.log(`  Scroll position:`, scrollRes.result.value);

      const screenshotRes = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });

      const buffer = Buffer.from(screenshotRes.data, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`  -> Saved: ${outputPath} (${buffer.length} bytes)`);

      ws.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${targetData.id}`);
    }

    // 1. Desktop Flagship Hero (1440x900)
    await capture(
      path.join(outDir, 'white-flagship-desktop.png'),
      1440,
      900,
      'window.scrollTo({ top: 0, behavior: "instant" }); window.scrollY;'
    );

    // 2. Mobile Flagship Hero (390x844)
    await capture(
      path.join(outDir, 'white-flagship-mobile.png'),
      390,
      844,
      'window.scrollTo({ top: 0, behavior: "instant" }); window.scrollY;'
    );

    // 3. Desktop Membership Cohort Explorer (1440x900)
    await capture(
      path.join(outDir, 'white-membership-desktop.png'),
      1440,
      900,
      `(() => {
        const el = document.getElementById('membership');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return window.scrollY;
      })()`
    );

    // 4. Desktop Events & Morocco Trade Mission (1440x900)
    await capture(
      path.join(outDir, 'white-events-desktop.png'),
      1440,
      900,
      `(() => {
        const el = document.getElementById('events');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return window.scrollY;
      })()`
    );

    // 5. Desktop Community Leadership & Founding Circle (1440x900)
    await capture(
      path.join(outDir, 'white-founding-circle-desktop.png'),
      1440,
      900,
      `(() => {
        const el = document.querySelector('.founders-grid');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        return window.scrollY;
      })()`
    );

    // 6. Desktop Member Mosaic Network (1440x900)
    await capture(
      path.join(outDir, 'white-member-mosaic-desktop.png'),
      1440,
      900,
      `(() => {
        const headings = [...document.querySelectorAll('h2')];
        const mosaicHeading = headings.find(h => h.textContent.includes('Leaders across every major'));
        if (mosaicHeading) mosaicHeading.scrollIntoView({ behavior: 'instant', block: 'start' });
        return window.scrollY;
      })()`
    );

    // 7. Desktop Directory & Ledger (1440x900)
    await capture(
      path.join(outDir, 'white-directory-desktop.png'),
      1440,
      900,
      `(() => {
        const el = document.getElementById('directory');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return window.scrollY;
      })()`
    );

    // 8. Desktop Modal Interaction (1440x900)
    await capture(
      path.join(outDir, 'white-application-modal.png'),
      1440,
      900,
      `(() => {
        openApplicationModal('Scaling Enterprises');
        return document.getElementById('app-modal').classList.contains('active');
      })()`
    );

    console.log("\nAll white flagship screenshots captured successfully!");

  } catch (err) {
    console.error("Screenshot error:", err);
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tempProfile, { recursive: true, force: true });
    } catch (e) {}
  }
}

captureWhiteScreenshots();
