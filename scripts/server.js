const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const PORT = 8000;

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let [rawPath, queryString] = req.url.split('?');
  let reqPath = decodeURIComponent(rawPath);

  // Default root to /index.html
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Aliases for historical and shortened URLs
  const aliases = {
    '/accelerator': '/virtual-accelerator-program.html',
    '/interested': '/join.html',
    '/podcasts': '/networking-events-podcasts.html',
    '/networking-events-podcasts': '/networking-events-podcasts.html',
    '/engage': '/engage.html'
  };
  if (aliases[reqPath]) {
    reqPath = aliases[reqPath];
  }

  let filePath = path.join(rootDir, reqPath);

  // Security check: ensure path is within rootDir
  if (!filePath.startsWith(rootDir)) {
    res.statusCode = 403;
    return res.end('Access Denied');
  }

  // Clean URL resolution: if /about requested, try /about.html
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  // If directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    return res.end(`File not found: ${reqPath}`);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AMCOB Multipage Server running at http://127.0.0.1:${PORT}/`);
  console.log(`- Flagship:  http://127.0.0.1:${PORT}/`);
  console.log(`- About:     http://127.0.0.1:${PORT}/about`);
  console.log(`- Programs:  http://127.0.0.1:${PORT}/membership`);
  console.log(`- Directory: http://127.0.0.1:${PORT}/business-directory`);
  console.log(`- Editorial: http://127.0.0.1:${PORT}/blog`);
  console.log(`- Library:   http://127.0.0.1:${PORT}/books`);
});
