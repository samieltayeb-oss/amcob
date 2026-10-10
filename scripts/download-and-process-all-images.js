const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getImageDimensions } = require('./image-dimension-parser');

async function main() {
  const discoveredPath = path.join(__dirname, 'discovered-images.json');
  if (!fs.existsSync(discoveredPath)) {
    console.error('discovered-images.json not found!');
    process.exit(1);
  }

  const rawList = JSON.parse(fs.readFileSync(discoveredPath, 'utf8'));
  console.log(`Starting migration pipeline for ${rawList.length} discovered assets...`);

  // Target directories
  const baseDir = path.join(__dirname, '..');
  const originalDir = path.join(baseDir, 'assets', 'original');
  const optBaseDir = path.join(baseDir, 'assets', 'optimized');
  
  const categories = [
    'logos',
    'leadership',
    'members',
    'businesses',
    'events',
    'programs',
    'articles',
    'books',
    'ui'
  ];

  fs.mkdirSync(originalDir, { recursive: true });
  categories.forEach(cat => {
    fs.mkdirSync(path.join(optBaseDir, cat), { recursive: true });
  });

  // Classification function
  function classifyAsset(url, subject, type) {
    const lower = url.toLowerCase();
    const subjLower = (subject || '').toLowerCase();

    // Technical / 3rd party tracker
    if (lower.includes('linkedin.com/collect') || lower.includes('google-analytics') || lower.includes('doubleclick')) {
      return { category: 'ui', dest: 'Archived Technical Pixel', status: 'Archived Technical Pixel' };
    }

    // Logos
    if (
      lower.includes('logo') ||
      lower.includes('favicon') ||
      lower.includes('foundingcirclelogo') ||
      subjLower.includes('brand mark') ||
      subjLower.includes('logo')
    ) {
      return { category: 'logos', dest: '/ (Header / Footer / Trust Strip)', status: 'Active Brand Mark' };
    }

    // Leadership
    if (
      lower.includes('kashif') ||
      lower.includes('founder-ceo') ||
      lower.includes('faheemkhwaja') ||
      subjLower.includes('kashif') ||
      subjLower.includes('masood') ||
      subjLower.includes('solaiman') ||
      subjLower.includes('umair shah')
    ) {
      return { category: 'leadership', dest: '/about & /about/leadership', status: 'Leadership Portrait' };
    }

    // Member portraits
    if (
      lower.includes('/members/') ||
      lower.includes('/users/avatars/') ||
      lower.includes('/images/profile/') ||
      subjLower.includes('member portrait')
    ) {
      return { category: 'members', dest: '/membership & /directory', status: 'Member Portrait' };
    }

    // Business listing logos/images
    if (lower.includes('/businesses/images/') || lower.includes('businesslistingtemplate')) {
      return { category: 'businesses', dest: '/directory & /directory/[slug]', status: 'Directory Business Asset' };
    }

    // Articles & Blog
    if (lower.includes('/storage/blog/')) {
      return { category: 'articles', dest: '/intelligence/insights', status: 'Article Editorial Asset' };
    }

    // Books
    if (lower.includes('/storage/book')) {
      return { category: 'books', dest: '/intelligence/executive-library', status: 'Executive Book Review' };
    }

    // Events & Trade Tours
    if (
      lower.includes('leadsummit') ||
      lower.includes('tour') ||
      lower.includes('gathering') ||
      lower.includes('mixer') ||
      lower.includes('cta_faces') ||
      subjLower.includes('summit') ||
      subjLower.includes('event')
    ) {
      return { category: 'events', dest: '/gatherings & /gatherings/trade-missions', status: 'Event & Delegation Asset' };
    }

    // Programs
    if (
      lower.includes('khadija') ||
      lower.includes('pag') ||
      lower.includes('accelerator') ||
      lower.includes('connect') ||
      lower.includes('affiliate') ||
      lower.includes('joinamcob')
    ) {
      return { category: 'programs', dest: '/membership/programs', status: 'Program Feature Asset' };
    }

    // UI / Graphics
    return { category: 'ui', dest: 'Global UI Token Library', status: 'UI Interface Graphic' };
  }

  // Sanitized filename generator
  function getSafeFilename(url, index) {
    try {
      const u = new URL(url);
      let base = path.basename(u.pathname);
      base = decodeURIComponent(base);
      base = base.replace(/[^a-zA-Z0-9._-]/g, '_');
      if (!base || base === '.' || !base.includes('.')) {
        base = `asset_${index}.dat`;
      }
      return `${String(index + 1).padStart(3, '0')}_${base}`;
    } catch (e) {
      return `asset_${String(index + 1).padStart(3, '0')}.dat`;
    }
  }

  // Tracking structures
  const results = [];
  const hashMap = new Map(); // hash -> first asset id
  let successCount = 0;
  let failCount = 0;
  let duplicateCount = 0;

  // Process downloads in concurrency pool of 8
  const poolSize = 8;
  const queue = rawList.map((item, idx) => ({ ...item, idx }));

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      const assetId = `IMG-${String(item.idx + 1).padStart(4, '0')}`;
      const safeName = getSafeFilename(item.url, item.idx);
      const originalPath = path.join(originalDir, safeName);
      const classification = classifyAsset(item.url, item.subject, item.type);

      // Handle 3rd party tracker pixels without network fetch
      if (item.url.includes('linkedin.com/collect')) {
        results.push({
          assetId,
          sourceUrl: item.url,
          pages: item.pages || 'Global Footer',
          category: 'ui',
          subject: 'LinkedIn Insight Tracker Pixel (Deprecated)',
          originalFilename: 'deprecated_tracker.gif',
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

      try {
        const res = await fetch(item.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: AbortSignal.timeout(10000)
        });

        if (!res.ok) {
          failCount++;
          results.push({
            assetId,
            sourceUrl: item.url,
            pages: item.pages || 'amcob.org',
            category: classification.category,
            subject: item.subject || 'Unknown Asset',
            originalFilename: safeName,
            localOriginal: 'Inaccessible / HTTP ' + res.status,
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
            qualityNotes: `HTTP ${res.status} error from live host; logged for verification`,
            permissions: 'Reuse permission not verified in this research'
          });
          continue;
        }

        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(originalPath, buffer);

        // Compute hash
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

        // Copy to optimized folder
        const optRelPath = path.join('assets', 'optimized', classification.category, safeName);
        const optFullPath = path.join(baseDir, optRelPath);
        fs.writeFileSync(optFullPath, buffer);

        // Quality check
        let qualityNotes = 'High-resolution production asset';
        if (dimensions.width && dimensions.height) {
          if (dimensions.width < 100 || dimensions.height < 100) {
            qualityNotes = `Low-resolution icon or thumbnail (${dimensions.width}x${dimensions.height}); not suitable for large display`;
          } else if (dimensions.width < 400) {
            qualityNotes = `Medium-resolution (${dimensions.width}x${dimensions.height}); suitable for avatar/card thumbnail only`;
          } else {
            qualityNotes = `Standard high-resolution (${dimensions.width}x${dimensions.height}); cleared for full responsive display`;
          }
        } else if (dimensions.format === 'svg') {
          qualityNotes = 'Vector SVG; infinitely scalable, production ready';
        }

        // Prototype status
        let prototypeStatus = 'Mapped for Full Architecture';
        if (classification.category === 'logos') prototypeStatus = 'Placed in Prototype (Global Nav/Footer)';
        else if (safeName.includes('cta_bg') || safeName.includes('cta_faces')) prototypeStatus = 'Placed in Prototype (Hero / Delegations)';
        else if (safeName.includes('1516800934459') || safeName.includes('1734487025310') || safeName.includes('umair')) prototypeStatus = 'Placed in Prototype (Founding Circle)';

        results.push({
          assetId,
          sourceUrl: item.url,
          pages: item.pages || 'amcob.org',
          category: classification.category,
          subject: item.subject || path.basename(safeName, path.extname(safeName)),
          originalFilename: safeName,
          localOriginal: path.relative(baseDir, originalPath).replace(/\\/g, '/'),
          localOptimized: optRelPath.replace(/\\/g, '/'),
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

        successCount++;
        if (successCount % 50 === 0 || queue.length === 0) {
          console.log(`Progress: ${successCount} downloaded, ${failCount} failed, ${duplicateCount} duplicates...`);
        }
      } catch (err) {
        failCount++;
        results.push({
          assetId,
          sourceUrl: item.url,
          pages: item.pages || 'amcob.org',
          category: classification.category,
          subject: item.subject || 'Unknown Asset',
          originalFilename: safeName,
          localOriginal: 'Inaccessible / Error',
          localOptimized: 'Inaccessible',
          format: 'unknown',
          width: null,
          height: null,
          bytes: 0,
          sha256: 'ERROR',
          isDuplicate: false,
          duplicateOf: null,
          destination: classification.dest,
          prototypeStatus: 'Inaccessible Network Timeout',
          qualityNotes: err.message,
          permissions: 'Reuse permission not verified in this research'
        });
      }
    }
  }

  // Run workers
  const workers = Array.from({ length: poolSize }, () => worker());
  await Promise.all(workers);

  console.log(`\nPipeline completed!`);
  console.log(`Total processed: ${results.length}`);
  console.log(`Successfully downloaded: ${successCount}`);
  console.log(`Failed / Inaccessible: ${failCount}`);
  console.log(`Byte-exact duplicates identified: ${duplicateCount}`);

  // Save JSON summary
  fs.writeFileSync(
    path.join(__dirname, 'download-summary.json'),
    JSON.stringify({ total: results.length, success: successCount, failed: failCount, duplicates: duplicateCount, assets: results }, null, 2)
  );

  // Write comprehensive CSV register
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
  results.forEach(r => {
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
  console.log(`Saved comprehensive CSV register to ${outCsvPath}`);
}

main();
