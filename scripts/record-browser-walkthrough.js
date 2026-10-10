const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome-rec-' + Date.now());
  const framesDir = path.join(process.env.TEMP || 'C:\\Temp', 'amcob-frames-' + Date.now());
  const outDir = path.join(__dirname, '../docs/recordings');
  fs.mkdirSync(framesDir, { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });

  const port = 9557;
  console.log('Starting headless Chrome for browser recording on port', port, '...');
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

    console.log('Connecting to tab...');
    let tab = await getTab('http://127.0.0.1:8000/');
    await tab.send('Page.enable');
    await tab.send('Runtime.enable');
    await tab.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1.5, mobile: false });

    let frameCount = 0;

    async function captureFrame() {
      const snap = await tab.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
      const frameNum = String(frameCount++).padStart(5, '0');
      fs.writeFileSync(path.join(framesDir, `frame_${frameNum}.jpg`), Buffer.from(snap.data, 'base64'));
    }

    // Sequence 1: Homepage Opening & Hero Motion Reveal
    console.log('Recording Scene 1: Homepage opening and hero entrance...');
    for (let i = 0; i < 8; i++) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 120));
    }

    // Sequence 2: Navigation Dropdown Open
    console.log('Recording Scene 2: Glass navigation expanding...');
    await tab.send('Runtime.evaluate', {
      expression: `
        const btn = Array.from(document.querySelectorAll('.nav-trigger-btn')).find(b => b.textContent.includes('Membership'));
        if (btn) btn.click();
      `
    });
    for (let i = 0; i < 10; i++) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 120));
    }

    // Close Dropdown
    await tab.send('Runtime.evaluate', {
      expression: `
        const btn = Array.from(document.querySelectorAll('.nav-trigger-btn')).find(b => b.textContent.includes('Membership'));
        if (btn) btn.click();
      `
    });
    for (let i = 0; i < 4; i++) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 100));
    }

    // Sequence 3: Smooth Scroll through Pillars & Founding Circle
    console.log('Recording Scene 3: Scrolling through pillars and leadership...');
    for (let y = 100; y <= 900; y += 120) {
      await tab.send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'instant' });` });
      await captureFrame();
      await new Promise(r => setTimeout(r, 100));
    }
    for (let i = 0; i < 6; i++) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 120));
    }

    // Sequence 4: Navigate to About Us
    console.log('Recording Scene 4: Navigating to About page...');
    await tab.send('Page.navigate', { url: 'http://127.0.0.1:8000/about' });
    await new Promise(r => setTimeout(r, 500));
    for (let i = 0; i < 8; i++) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 120));
    }

    // Sequence 5: Navigate to Business Directory
    console.log('Recording Scene 5: Navigating to Business Directory...');
    await tab.send('Page.navigate', { url: 'http://127.0.0.1:8000/business-directory' });
    await new Promise(r => setTimeout(r, 500));
    for (let i = 0; i < 8; i++) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 120));
    }

    // Sequence 6: Navigate to Peer Advisory Groups
    console.log('Recording Scene 6: Navigating to Peer Advisory Groups...');
    await tab.send('Page.navigate', { url: 'http://127.0.0.1:8000/peer-advisory' });
    await new Promise(r => setTimeout(r, 500));
    for (let i = 0; i < 8; i++) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 120));
    }

    tab.ws.close();
    console.log(`Captured ${frameCount} frames. Assembling video and gif with ffmpeg...`);

    // Compile MP4
    const mp4Out = path.join(outDir, 'amcob-browser-walkthrough.mp4');
    const ffmpegMp4 = spawn('ffmpeg', [
      '-y',
      '-framerate', '8',
      '-i', path.join(framesDir, 'frame_%05d.jpg'),
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-vf', 'scale=1280:-2',
      mp4Out
    ]);

    await new Promise((res, rej) => {
      ffmpegMp4.on('close', (code) => code === 0 ? res() : rej(new Error(`ffmpeg exited with code ${code}`)));
      ffmpegMp4.on('error', rej);
    });
    console.log('Generated MP4 recording:', mp4Out);

    // Compile GIF (palette optimized)
    const gifOut = path.join(outDir, 'amcob-browser-walkthrough.gif');
    const ffmpegGif = spawn('ffmpeg', [
      '-y',
      '-framerate', '6',
      '-i', path.join(framesDir, 'frame_%05d.jpg'),
      '-vf', 'fps=6,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
      gifOut
    ]);

    await new Promise((res, rej) => {
      ffmpegGif.on('close', (code) => code === 0 ? res() : rej(new Error(`ffmpeg gif exited with code ${code}`)));
      ffmpegGif.on('error', rej);
    });
    console.log('Generated GIF recording:', gifOut);

    console.log('Recording completed successfully!');
  } catch (err) {
    console.error('Error recording walkthrough:', err);
  } finally {
    chrome.kill();
    try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
    try { fs.rmSync(framesDir, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
