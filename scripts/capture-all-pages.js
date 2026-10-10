const { capture } = require('./capture-cdp');

const targets = [
  { url: 'http://127.0.0.1:8000/', out: 'screenshots/multipage-01-homepage-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/', out: 'screenshots/multipage-02-homepage-mobile.png', w: 390, h: 844 },
  { url: 'http://127.0.0.1:8000/about', out: 'screenshots/multipage-03-about-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/membership', out: 'screenshots/multipage-04-membership-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/pag/emerging', out: 'screenshots/multipage-05-pag-emerging-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/events', out: 'screenshots/multipage-06-events-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/dinner-mixers', out: 'screenshots/multipage-07-dinner-mixers-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/business-directory', out: 'screenshots/multipage-08-directory-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/business-directory/conselara-llc', out: 'screenshots/multipage-09-directory-detail-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/blog', out: 'screenshots/multipage-10-blog-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/blog/american-muslim-business-landscape', out: 'screenshots/multipage-11-blog-detail-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/books', out: 'screenshots/multipage-12-books-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/books/the-7-habits-of-highly-effective-people', out: 'screenshots/multipage-13-book-detail-desktop.png', w: 1440, h: 900 },
  { url: 'http://127.0.0.1:8000/join', out: 'screenshots/multipage-14-join-desktop.png', w: 1440, h: 900 }
];

async function run() {
  console.log(`Starting capture of ${targets.length} pages...`);
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    console.log(`[${i+1}/${targets.length}] Capturing ${t.url} -> ${t.out}...`);
    try {
      await capture(t.url, t.out, t.w, t.h, 2000);
    } catch(e) {
      console.error(`Failed to capture ${t.url}:`, e.message);
    }
  }
  console.log('All captures finished!');
}

run();
