const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runBatch() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-batch-' + Date.now());
  const port = 9333;

  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`
  ]);

  try {
    // Wait for CDP
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

    const rootDir = "C:\\Users\\mcreg\\Desktop\\amcob.org";
    const studioUrl = `file:///${rootDir.replace(/\\/g, '/')}/concepts/concept-studio.html`;
    const protoUrl = `file:///${rootDir.replace(/\\/g, '/')}/concepts/living-circle-prototype.html`;

    async function captureView(url, outputPath, width, height, scriptToEvaluate = null, delayMs = 1200) {
      console.log(`Starting capture: ${path.basename(outputPath)} (${width}x${height})...`);
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

      if (scriptToEvaluate) {
        await new Promise(r => setTimeout(r, 300));
        await send('Runtime.evaluate', { expression: scriptToEvaluate });
      }

      await new Promise(r => setTimeout(r, delayMs));

      const screenshotRes = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });

      const buffer = Buffer.from(screenshotRes.data, 'base64');
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, buffer);
      console.log(`  -> Saved: ${outputPath}`);

      ws.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${targetData.id}`);
    }

    const outDir = path.join(rootDir, 'concepts', 'screenshots');

    // 1. Concept 1 Desktop
    await captureView(studioUrl, path.join(outDir, 'concept-1-desktop.png'), 1440, 900, 'selectConcept(1); switchViewMode("desktop");');

    // 2. Concept 1 Mobile
    await captureView(studioUrl, path.join(outDir, 'concept-1-mobile.png'), 390, 844, 'selectConcept(1); switchViewMode("mobile");');

    // 3. Concept 2 Desktop
    await captureView(studioUrl, path.join(outDir, 'concept-2-desktop.png'), 1440, 900, 'selectConcept(2); switchViewMode("desktop");');

    // 4. Concept 2 Mobile
    await captureView(studioUrl, path.join(outDir, 'concept-2-mobile.png'), 390, 844, 'selectConcept(2); switchViewMode("mobile");');

    // 5. Concept 3 Desktop
    await captureView(studioUrl, path.join(outDir, 'concept-3-desktop.png'), 1440, 900, 'selectConcept(3); switchViewMode("desktop");');

    // 6. Concept 3 Mobile
    await captureView(studioUrl, path.join(outDir, 'concept-3-mobile.png'), 390, 844, 'selectConcept(3); switchViewMode("mobile");');

    // 7. Concept Studio Split View
    await captureView(studioUrl, path.join(outDir, 'concept-studio-side-by-side.png'), 1440, 900, 'selectConcept(1); switchViewMode("split");');

    // 8. Living Circle Prototype Homepage (Desktop)
    await captureView(protoUrl, path.join(outDir, 'living-circle-home-desktop.png'), 1440, 900, 'switchExperience("homepage");');

    // 9. Living Circle Prototype Homepage (Mobile)
    await captureView(protoUrl, path.join(outDir, 'living-circle-home-mobile.png'), 390, 844, 'switchExperience("homepage");');

    // 10. Living Circle Prototype Membership Matrix
    await captureView(protoUrl, path.join(outDir, 'living-circle-membership.png'), 1440, 900, 'switchExperience("membership");');

    // 11. Living Circle Prototype Gatherings Hub
    await captureView(protoUrl, path.join(outDir, 'living-circle-gatherings.png'), 1440, 900, 'switchExperience("gatherings");');

    // 12. Living Circle Prototype Business Directory
    await captureView(protoUrl, path.join(outDir, 'living-circle-directory.png'), 1440, 900, 'switchExperience("directory");');

    console.log("All screenshots generated successfully!");

  } catch (err) {
    console.error("Batch capture error:", err);
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tempProfile, { recursive: true, force: true });
    } catch (e) {}
  }
}

runBatch();
