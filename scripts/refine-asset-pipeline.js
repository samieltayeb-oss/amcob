const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getImageDimensions } = require('./image-dimension-parser');

const baseDir = path.join(__dirname, '..');
const originalDir = path.join(baseDir, 'assets', 'original');
const optBaseDir = path.join(baseDir, 'assets', 'optimized');

// Categories to organize
const categories = [
  'logos',
  'leadership',
  'ambassadors',
  'members',
  'businesses',
  'events',
  'programs',
  'articles',
  'books',
  'ui',
  'archived'
];

categories.forEach(c => fs.mkdirSync(path.join(optBaseDir, c), { recursive: true }));

// Read discovered images
const discovered = JSON.parse(fs.readFileSync(path.join(__dirname, 'discovered-images.json'), 'utf8'));

// Also add the fixed typo URL if not present
const fixedTypoUrl = 'https://amcob.org/assets/images/67eff37139379ae25002ddb5.jpg';
if (!discovered.some(d => d.url === fixedTypoUrl)) {
  discovered.push({
    url: fixedTypoUrl,
    type: 'Editorial / Event Asset (Typo Recovery)',
    subject: 'Contact Us Header Asset (Recovered from broken live link /asseet/)',
    pages: 'https://amcob.org/contact-us',
    source: 'Typo Correction Recovery'
  });
}

function classify(url, subject) {
  const u = url.toLowerCase();
  const s = (subject || '').toLowerCase();

  // 1. Tracker / Archived
  if (u.includes('linkedin.com/collect') || u.includes('google-analytics') || u.includes('doubleclick')) {
    return {
      category: 'archived',
      dest: 'Retired / Archived (Privacy Compliance)',
      status: 'Archived Technical Pixel',
      label: 'LinkedIn Insight Tracker Beacon (Deprecated)'
    };
  }

  // 2. Logos
  if (
    u.includes('logo') ||
    u.includes('favicon') ||
    u.includes('foundingcirclelogo') ||
    s.includes('brand mark') ||
    s.includes('logo')
  ) {
    return {
      category: 'logos',
      dest: '/ & Global Header/Footer/Trust Strip',
      status: 'Active Brand Asset',
      label: s || 'AMCOB Brand Mark'
    };
  }

  // 3. Core Leadership & Team
  const teamNames = [
    'kashif', 'founder-ceo', 'faheemkhwaja', 'aamna', 'danish_raj', 'effa', 'farzam', 'hamza',
    'samar_naeem', 'talha_khan', 'zainab_gohar', 'jahanzaib', 'mahnoorasif', 'nick',
    'asma_hashmi', 'humayun', 'malik_khan', 'mohammad_shehata', 'shomail', 'masood', 'solaiman', 'umair'
  ];
  if (teamNames.some(tn => u.includes(tn) || s.includes(tn))) {
    return {
      category: 'leadership',
      dest: '/about, /about/leadership & /about/founding-circle',
      status: 'Leadership & Team Portrait',
      label: s || 'AMCOB Executive Officer / Team Leader'
    };
  }

  // 4. Chapter Ambassadors
  if (u.includes('/ambassador')) {
    return {
      category: 'ambassadors',
      dest: '/community/ambassadors & /about/chapters',
      status: 'Chapter Ambassador Portrait',
      label: s || 'AMCOB Regional Chapter Ambassador'
    };
  }

  // 5. Events & Mixers
  if (
    u.includes('luma-image-proxy') ||
    u.includes('leadsummit') ||
    u.includes('cta_faces') ||
    u.includes('tour') ||
    u.includes('mixer') ||
    u.includes('gathering') ||
    s.includes('summit') ||
    s.includes('event') ||
    s.includes('mixer') ||
    s.includes('long island') ||
    s.includes('boston') ||
    s.includes('dubai') ||
    s.includes('chicago') ||
    s.includes('seattle') ||
    s.includes('san jose') ||
    s.includes('santa monica') ||
    s.includes('istanbul') ||
    s.includes('riyadh') ||
    s.includes('princeton') ||
    s.includes('mississauga') ||
    s.includes('tysons')
  ) {
    return {
      category: 'events',
      dest: '/gatherings & /gatherings/regional-mixers',
      status: 'Event Gathering Artwork',
      label: s || 'AMCOB Regional Gathering / Summit Feature'
    };
  }

  // 6. Programs
  if (
    u.includes('khadija') ||
    u.includes('joinamcob') ||
    u.includes('virtual-accelerator') ||
    u.includes('pag') ||
    s.includes('khadija') ||
    s.includes('program')
  ) {
    return {
      category: 'programs',
      dest: '/membership/programs & /membership',
      status: 'Program Visual Asset',
      label: s || 'AMCOB Program Feature Asset'
    };
  }

  // 7. Business Directory
  if (u.includes('/businesses/') || u.includes('businesslistingtemplate')) {
    return {
      category: 'businesses',
      dest: '/directory & /directory/[slug]',
      status: 'Directory Enterprise Asset',
      label: s || 'Member Enterprise Showcase Asset'
    };
  }

  // 8. Blog / Articles
  if (u.includes('/storage/blog/')) {
    return {
      category: 'articles',
      dest: '/intelligence/insights',
      status: 'Insights Article Feature',
      label: s || 'Editorial Insight Article Image'
    };
  }

  // 9. Books / Executive Library
  if (u.includes('/storage/book')) {
    return {
      category: 'books',
      dest: '/intelligence/executive-library',
      status: 'Executive Book Cover',
      label: s || 'Executive Library Recommended Title'
    };
  }

  // 10. Members
  if (
    u.includes('/members/') ||
    u.includes('/users/avatars/') ||
    u.includes('/images/profile/') ||
    s.includes('member')
  ) {
    return {
      category: 'members',
      dest: '/membership & /directory',
      status: 'Verified Member Portrait',
      label: s || 'AMCOB Active Member Portrait'
    };
  }

  // 11. UI Elements
  return {
    category: 'ui',
    dest: 'Global UI Token Library',
    status: 'Interface Graphic / Icon',
    label: s || 'UI Design Element'
  };
}

function resolveFilename(url, index, subject) {
  try {
    // If Luma proxy URL, decode query param
    if (url.includes('luma-image-proxy?url=')) {
      const parsed = new URL(url);
      const target = parsed.searchParams.get('url');
      if (target) {
        const u2 = new URL(target);
        let b2 = path.basename(u2.pathname);
        // Add city prefix from subject if available
        let city = (subject || '').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        city = city.replace(/^_+|_+$/g, '');
        if (city && city.length < 25) {
          return `event_${city}_${b2}`;
        }
        return `event_${b2}`;
      }
    }

    const u = new URL(url);
    let base = path.basename(u.pathname);
    base = decodeURIComponent(base);
    base = base.replace(/[^a-zA-Z0-9._-]/g, '_');
    if (!base || base === '.' || !base.includes('.')) {
      base = `asset_${index + 1}.webp`;
    }
    return base;
  } catch (e) {
    return `asset_${index + 1}.webp`;
  }
}

async function run() {
  console.log('Running refined categorization and asset pipeline...');

  // Clean optimized directory
  categories.forEach(c => {
    const cp = path.join(optBaseDir, c);
    fs.readdirSync(cp).forEach(f => fs.unlinkSync(path.join(cp, f)));
  });

  const registerEntries = [];
  const hashMap = new Map();
  let duplicateCount = 0;
  let placedCount = 0;
  let mappedCount = 0;

  for (let i = 0; i < discovered.length; i++) {
    const item = discovered[i];
    const assetId = `IMG-${String(i + 1).padStart(4, '0')}`;
    const classification = classify(item.url, item.subject);
    const cleanFilename = resolveFilename(item.url, i, item.subject);

    // Track 3rd party tracker
    if (item.url.includes('linkedin.com/collect')) {
      registerEntries.push({
        assetId,
        sourceUrl: item.url,
        pages: item.pages || 'Global Footer',
        category: 'archived',
        subject: 'LinkedIn Insight Tracker Pixel (Deprecated)',
        localOriginal: 'N/A (3rd party tracking pixel)',
        localOptimized: 'N/A (retired tracking pixel)',
        format: 'gif',
        width: 1,
        height: 1,
        bytes: 0,
        sha256: 'N/A',
        isDuplicate: false,
        duplicateOf: null,
        destination: 'Retired / Archived (GDPR/ePrivacy compliance)',
        prototypeStatus: 'Archived Technical Pixel',
        qualityNotes: '1x1 tracking beacon; excluded from production asset pipeline',
        permissions: 'N/A (Third-party tracking beacon)'
      });
      continue;
    }

    // Check if original exists locally in assets/original
    // Find matching original file by index or filename
    let origFile = null;
    const prefix = String(i + 1).padStart(3, '0') + '_';
    const allOriginals = fs.readdirSync(originalDir);
    const match = allOriginals.find(f => f.startsWith(prefix));

    let buffer = null;
    if (match) {
      buffer = fs.readFileSync(path.join(originalDir, match));
      origFile = path.join('assets', 'original', match).replace(/\\/g, '/');
    } else {
      // Try to fetch it directly
      try {
        const res = await fetch(item.url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
          signal: AbortSignal.timeout(8000)
        });
        if (res.ok) {
          buffer = Buffer.from(await res.arrayBuffer());
          const safeOrig = `${prefix}${cleanFilename}`;
          fs.writeFileSync(path.join(originalDir, safeOrig), buffer);
          origFile = `assets/original/${safeOrig}`;
        }
      } catch (e) {}
    }

    if (!buffer) {
      // Inaccessible / broken live link
      registerEntries.push({
        assetId,
        sourceUrl: item.url,
        pages: item.pages || 'amcob.org',
        category: classification.category,
        subject: item.subject || 'Inaccessible Asset',
        localOriginal: 'Inaccessible / HTTP 404',
        localOptimized: 'Inaccessible',
        format: 'unknown',
        width: null,
        height: null,
        bytes: 0,
        sha256: 'ERROR',
        isDuplicate: false,
        duplicateOf: null,
        destination: classification.dest,
        prototypeStatus: 'Inaccessible / Broken Live Source',
        qualityNotes: 'Failed to download from live host; logged as broken live link',
        permissions: 'Reuse permission not verified in this research'
      });
      continue;
    }

    // File exists and buffer is loaded
    const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
    const dimensions = getImageDimensions(buffer);

    let isDuplicate = false;
    let duplicateOf = null;
    if (hashMap.has(sha256)) {
      isDuplicate = true;
      duplicateOf = hashMap.get(sha256);
      duplicateCount++;
    } else {
      hashMap.set(sha256, assetId);
    }

    // Save to categorized optimized folder with clean filename
    const optRelPath = `assets/optimized/${classification.category}/${cleanFilename}`;
    fs.writeFileSync(path.join(baseDir, optRelPath), buffer);

    // Assess quality
    let qualityNotes = 'High-resolution production asset';
    if (dimensions.width && dimensions.height) {
      if (dimensions.width < 100 || dimensions.height < 100) {
        qualityNotes = `Low-resolution icon or thumbnail (${dimensions.width}x${dimensions.height}); not suitable for large display`;
      } else if (dimensions.width < 400) {
        qualityNotes = `Medium-resolution portrait/card (${dimensions.width}x${dimensions.height}); cleared for avatar, directory, or card display`;
      } else {
        qualityNotes = `High-resolution (${dimensions.width}x${dimensions.height}); cleared for full responsive display`;
      }
    } else if (dimensions.format === 'svg') {
      qualityNotes = 'Vector SVG; infinitely scalable, production ready';
    }

    // Determine prototype placement
    let prototypeStatus = 'Mapped for Full Website Route';
    if (
      classification.category === 'logos' ||
      cleanFilename.includes('Kashif_Zubair') ||
      cleanFilename.includes('1516800934459') ||
      cleanFilename.includes('1734487025310') ||
      cleanFilename.includes('umair-shah') ||
      cleanFilename.includes('cta_faces') ||
      cleanFilename.includes('JoinAMCOBBannerWebsite') ||
      cleanFilename.includes('leadSummitHomeBanner') ||
      cleanFilename.includes('khadijaCollectiveHomeBanner')
    ) {
      prototypeStatus = 'Placed in Local Flagship Prototype';
      placedCount++;
    } else {
      mappedCount++;
    }

    registerEntries.push({
      assetId,
      sourceUrl: item.url,
      pages: item.pages || 'amcob.org',
      category: classification.category,
      subject: classification.label,
      localOriginal: origFile,
      localOptimized: optRelPath,
      format: dimensions.format,
      width: dimensions.width,
      height: dimensions.height,
      bytes: buffer.length,
      sha256,
      isDuplicate,
      duplicateOf,
      destination: classification.dest,
      prototypeStatus,
      qualityNotes,
      permissions: 'Reuse permission not verified in this research'
    });
  }

  console.log(`\nRefined pipeline summary:`);
  console.log(`Total cataloged: ${registerEntries.length}`);
  console.log(`Placed in prototype: ${placedCount}`);
  console.log(`Mapped for full routes: ${mappedCount}`);
  console.log(`Byte-exact duplicates: ${duplicateCount}`);

  // Count by refined category
  const counts = {};
  registerEntries.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
  console.log('Refined Category breakdown:', counts);

  // Write refined CSV
  const csvHeaders = [
    'Asset ID',
    'Source URL',
    'Original Page(s)',
    'Category',
    'Subject / Entity',
    'Local Original Path',
    'Local Display Path',
    'Format',
    'Dimensions',
    'Size (Bytes)',
    'SHA-256 Checksum',
    'Is Duplicate',
    'Duplicate Of',
    'Target Destination',
    'Prototype Migration Status',
    'Quality Assessment',
    'Reuse Permissions Status'
  ];

  const csvRows = [csvHeaders.join(',')];
  registerEntries.forEach(r => {
    const dim = r.width && r.height ? `${r.width}x${r.height}` : (r.format === 'svg' ? 'Vector' : 'Unknown');
    const row = [
      `"${r.assetId}"`,
      `"${r.sourceUrl}"`,
      `"${(r.pages || '').replace(/"/g, '""')}"`,
      `"${r.category}"`,
      `"${(r.subject || '').replace(/"/g, '""')}"`,
      `"${r.localOriginal}"`,
      `"${r.localOptimized}"`,
      `"${r.format}"`,
      `"${dim}"`,
      r.bytes,
      `"${r.sha256}"`,
      r.isDuplicate ? 'YES' : 'NO',
      `"${r.duplicateOf || ''}"`,
      `"${r.destination}"`,
      `"${r.prototypeStatus}"`,
      `"${(r.qualityNotes || '').replace(/"/g, '""')}"`,
      `"${r.permissions}"`
    ];
    csvRows.push(row.join(','));
  });

  const outCsvPath = path.join(baseDir, 'docs', 'image-migration-register.csv');
  fs.writeFileSync(outCsvPath, csvRows.join('\n'));
  console.log(`Updated CSV saved to ${outCsvPath}`);

  // Save refined JSON
  fs.writeFileSync(path.join(__dirname, 'refined-assets.json'), JSON.stringify(registerEntries, null, 2));
}

run();
