const http = require('http');

const routes = [
  '/',
  '/index.html',
  '/about',
  '/about.html',
  '/membership',
  '/membership.html',
  '/peer-advisory',
  '/peer-advisory.html',
  '/pag/emerging',
  '/pag/emerging.html',
  '/pag/scaling',
  '/pag/booming',
  '/pag/powerhouse',
  '/pag/summit',
  '/connect',
  '/connect.html',
  '/affiliate',
  '/affiliate.html',
  '/virtual-accelerator-program',
  '/ambassador-program',
  '/mldl',
  '/events',
  '/events.html',
  '/dinner-mixers',
  '/dinner-mixers.html',
  '/virtual-mixers',
  '/virtual-mixers.html',
  '/upcoming-peer-advisory-meetings',
  '/conferences-workshops',
  '/business-directory',
  '/business-directory.html',
  '/business-directory-detail.html',
  '/business-directory/conselara-llc',
  '/blog',
  '/blog.html',
  '/blog-detail.html',
  '/blog/american-muslim-business-landscape',
  '/books',
  '/books.html',
  '/book-detail.html',
  '/books/the-7-habits-of-highly-effective-people',
  '/resources',
  '/podcasts',
  '/podcasts.html',
  '/contact-us',
  '/join',
  '/sponsorship',
  '/opportunities',
  '/add-listing',
  '/advertisement',
  '/privacy-policy',
  '/design-system',
  '/design-system.html',
  '/css/style.css',
  '/css/ecosystem-motion.css',
  '/js/site.js',
  '/js/ecosystem-motion.js',
  '/data/businesses.json',
  '/data/articles.json',
  '/data/books.json',
  '/data/events.json',
  '/assets/optimized/logos/logo.png',
  '/assets/optimized/logos/logo-monochrome.png',
  '/lead',
  '/lead/speakers',
  '/lead/sponsorship',
  '/lead/tickets',
  '/lead/hotel',
  '/lead/houston',
  '/lead/blog',
  '/lead/blog/what-is-lead-summit',
  '/lead/blog/how-to-build-leaders-who-lead',
  '/assets/optimized/lead/hero-poster.webp',
  '/assets/optimized/lead/speakers/omair-tariq.png'
];

function testRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:8000${route}`, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        resolve({ route, status: res.statusCode, length: d.length, contentType: res.headers['content-type'] });
      });
    }).on('error', err => {
      resolve({ route, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log('Testing all multipage routes on http://127.0.0.1:8000...\n');
  let pass = 0;
  let fail = 0;

  for (const r of routes) {
    const res = await testRoute(r);
    if (res.status === 200) {
      console.log(`[200 OK] ${r.padEnd(46)} (${res.contentType.split(';')[0]}, ${res.length} bytes)`);
      pass++;
    } else {
      console.error(`[FAIL ${res.status}] ${r}`);
      fail++;
    }
  }

  console.log(`\nRoute Verification Complete: ${pass} passed, ${fail} failed.`);
}

run();
