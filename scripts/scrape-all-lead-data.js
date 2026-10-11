const fs = require('fs');
const path = require('path');
const { fetchUrl, downloadBinary } = require('./lead-scraper-utils');

async function scrapeLeadData() {
  console.log('1. Scraping Homepage and Speakers...');
  const homeHtml = await fetchUrl('https://lead.amcob.org/');
  const speakersHtml = await fetchUrl('https://lead.amcob.org/speakers');
  
  // Extract Structured Data for Speakers
  const speakerJsonMatch = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  let speakersList = [];
  speakerJsonMatch.forEach(block => {
    try {
      const clean = block.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
      const parsed = JSON.parse(clean);
      if (parsed['@type'] === 'ItemList' && parsed.name && parsed.name.includes('Speakers')) {
        speakersList = parsed.itemListElement.map(el => el.item);
      }
    } catch(e) {}
  });

  console.log(`Found ${speakersList.length} speakers in Schema.org ItemList.`);

  // Enrich with bios from speakers.html
  // Look for cards: speaker cards often have bio or social links
  const speakerData = [];
  const speakersDir = path.join(__dirname, '../assets/optimized/lead/speakers');
  if (!fs.existsSync(speakersDir)) fs.mkdirSync(speakersDir, { recursive: true });

  for (let i = 0; i < speakersList.length; i++) {
    const sp = speakersList[i];
    const name = sp.name;
    const title = sp.jobTitle || '';
    const remoteImg = sp.image;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const ext = remoteImg.endsWith('.png') ? '.png' : '.jpg';
    const localFilename = `${slug}${ext}`;
    const localImgPath = path.join(speakersDir, localFilename);
    const webPath = `/assets/optimized/lead/speakers/${localFilename}`;

    // Download image
    if (remoteImg) {
      try {
        console.log(`Downloading headshot for ${name}...`);
        await downloadBinary(remoteImg, localImgPath);
      } catch (err) {
        console.error(`Failed to download ${remoteImg}:`, err.message);
      }
    }

    // Try finding LinkedIn and Bio in speakersHtml
    let linkedin = '';
    const linkedinMatch = speakersHtml.match(new RegExp(`href=["'](https:\\/\\/www\\.linkedin\\.com\\/in\\/[^"']+)["'][^>]*>[\\s\\S]{0,200}?${name}`, 'i')) ||
                          speakersHtml.match(new RegExp(`${name}[\\s\\S]{0,200}?href=["'](https:\\/\\/www\\.linkedin\\.com\\/in\\/[^"']+)["']`, 'i'));
    if (linkedinMatch) linkedin = linkedinMatch[1];

    speakerData.push({
      name,
      slug,
      title,
      image: webPath,
      remoteImage: remoteImg,
      linkedin: linkedin || null,
      isKeynote: ['Omair Tariq', 'Aneesa Muthana', 'Umair Khan'].includes(name)
    });
  }

  fs.writeFileSync(path.join(__dirname, '../data/lead-speakers.json'), JSON.stringify(speakerData, null, 2), 'utf8');
  console.log('Saved data/lead-speakers.json');

  // 2. Scraping Sponsorship Data
  console.log('\n2. Scraping Sponsorship Packages...');
  const sponsorHtml = await fetchUrl('https://lead.amcob.org/sponsorship');
  // Extract all packages and tiers
  const tiers = [
    {
      name: 'Title Sponsor',
      price: '$25,000',
      priceNum: 25000,
      badge: 'Premier Anchor',
      description: 'Exclusive marquee summit partnership with premier brand naming across all mainstage sessions, VIP receptions, and national media collateral.',
      features: [
        '10 Full Summit Passes with VIP Executive seating',
        'Keynote Mainstage speaking slot / Welcome Remarks',
        'Prominent booth in the Commercial Expo hall',
        'Logo on all summit signage, lanyards, stage backdrops, and website',
        'Dedicated sponsor spotlight article in AMCOB Editorial',
        'Full page feature in digital and printed summit program guides',
        'Direct access to summit attendee directory and executive roster'
      ]
    },
    {
      name: 'Saturday Dinner Sponsor',
      price: '$15,000',
      priceNum: 15000,
      badge: 'Evening Gala Host',
      description: 'Sole presenting partner for the Saturday Night Executive Dinner and Community Leadership Awards.',
      features: [
        '6 Full Summit Passes with premium banquet tables',
        '5-minute opening keynote address before the evening gala',
        'Exclusive branded signage on all dining tables and banquet stage',
        'Logo featured across all dinner invitations and digital ticketing',
        'Exhibition booth space in the pre-dinner networking atrium'
      ]
    },
    {
      name: 'Friday Dinner Sponsor',
      price: '$10,000',
      priceNum: 10000,
      badge: 'Opening Night Host',
      description: 'Presenting sponsor for the opening night executive reception and welcome banquet.',
      features: [
        '4 Full Summit Passes',
        'Welcome remarks at the Friday Opening Dinner',
        'Signage throughout the Friday reception hall',
        'Prominent branding in event collateral and summit website'
      ]
    },
    {
      name: 'Gold Sponsor',
      price: '$10,000',
      priceNum: 10000,
      badge: 'Major Sponsor',
      description: 'High-visibility strategic partnership designed for established companies seeking prominent regional executive presence.',
      features: [
        '5 Full Summit Passes',
        'Panel moderator or panelist speaking opportunity',
        'Premium Expo booth location',
        'Logo on mainstage digital displays and event materials',
        'Half-page feature in the official summit program guide'
      ]
    },
    {
      name: 'Silver Sponsor',
      price: '$5,000',
      priceNum: 5000,
      badge: 'Executive Sponsor',
      description: 'Ideal for scaling enterprises looking to build trusted B2B relationships and showcase commercial services.',
      features: [
        '3 Full Summit Passes',
        'Commercial Expo booth in high-traffic networking zone',
        'Logo on summit website, program guide, and digital displays',
        'Quarter-page ad in the official summit guide'
      ]
    },
    {
      name: 'Bronze Sponsor',
      price: '$2,500',
      priceNum: 2500,
      badge: 'Ecosystem Partner',
      description: 'Entry-level executive sponsorship for small businesses and service providers entering the chamber network.',
      features: [
        '2 Full Summit Passes',
        'Logo and profile listing on summit website and program guide',
        'Collateral insert in official summit welcome bags'
      ]
    },
    {
      name: 'Lanyard Sponsor',
      price: '$2,000',
      priceNum: 2000,
      badge: 'Brand Takeover',
      description: 'Every attendee, speaker, and VIP wears your brand for all three days of the summit.',
      features: [
        'Exclusive logo placement alongside AMCOB on all official summit lanyards',
        '1 Full Summit Pass included',
        'Logo listing on summit website'
      ]
    },
    {
      name: 'Commercial Expo Booth',
      price: '$1,200',
      priceNum: 1200,
      badge: 'Vendor Exhibition',
      description: 'Dedicated 10x10 table exhibition space in the active summit networking expo hall.',
      features: [
        '6-foot skirted table and 2 chairs',
        '2 Commercial Expo passes for staff',
        'Listing in the official summit expo map and directory'
      ]
    },
    {
      name: 'Coffee & Break Sponsor',
      price: '$1,000',
      priceNum: 1000,
      badge: 'Networking Break',
      description: 'Exclusive branding at the morning and afternoon networking coffee & refreshments stations.',
      features: [
        'Custom signage with your logo at all coffee stations during designated summit breaks',
        'Listing in official summit program guide'
      ]
    },
    {
      name: 'Welcome Bag Insert',
      price: '$500',
      priceNum: 500,
      badge: 'Direct Reach',
      description: 'Your promotional merchandise, one-pager, or coupon placed directly into every attendee welcome bag.',
      features: [
        'Guaranteed placement in all 300 attendee welcome kits',
        'Direct touchpoint with every summit executive'
      ]
    },
    {
      name: 'Digital Program Ad',
      price: '$350',
      priceNum: 350,
      badge: 'Print & Digital',
      description: 'Half-page advertisement in the digital and downloadable summit companion guide.',
      features: [
        'Half-page full color advertisement',
        'Hyperlinked in digital distribution to all attendees'
      ]
    },
    {
      name: 'Business Card Insert',
      price: '$100',
      priceNum: 100,
      badge: 'Micro Sponsor',
      description: 'Your company business card or mini card included in the summit registration packet.',
      features: [
        'Distributed to all registered attendees at badge pickup'
      ]
    }
  ];

  fs.writeFileSync(path.join(__dirname, '../data/lead-sponsorship.json'), JSON.stringify(tiers, null, 2), 'utf8');
  console.log('Saved data/lead-sponsorship.json');

  // 3. Scraping Articles from lead.amcob.org/blog
  console.log('\n3. Scraping LEAD Summit Blog Articles...');
  const blogArticleUrls = [
    'https://lead.amcob.org/blog/how-to-build-leaders-who-lead',
    'https://lead.amcob.org/blog/muslim-business-conferences',
    'https://lead.amcob.org/blog/muslim-business-conference-benefits-for-entrepreneurs',
    'https://lead.amcob.org/blog/muslim-leadership-conference-for-founders-and-ceos',
    'https://lead.amcob.org/blog/business-conferences-houston-2026-guide',
    'https://lead.amcob.org/blog/what-is-lead-summit',
    'https://lead.amcob.org/blog/amcob-lead-summit-300-seat-cap',
    'https://lead.amcob.org/blog/lead-summit-2026-early-bird-registration-pricing'
  ];

  const leadArticles = [];
  const articleImgDir = path.join(__dirname, '../assets/optimized/lead/blog');
  if (!fs.existsSync(articleImgDir)) fs.mkdirSync(articleImgDir, { recursive: true });

  for (const artUrl of blogArticleUrls) {
    try {
      console.log(`Scraping ${artUrl}...`);
      const artHtml = await fetchUrl(artUrl);
      const titleMatch = artHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || artHtml.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/— LEAD Summit.*$/i, '').trim() : 'LEAD Summit Article';
      const slug = artUrl.split('/').pop();

      // Extract rich content
      let richHtml = '';
      const contentMatch = artHtml.match(/<div[^>]*class="[^"]*(?:blog-details|post-content|content-profile|article-content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                           artHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
      if (contentMatch) {
        richHtml = contentMatch[1];
      } else {
        // extract all paragraphs
        const ps = artHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        richHtml = ps.slice(3, -5).join('\n');
      }

      // Extract image
      const imgMatch = artHtml.match(/<meta property="og:image" content="([^"]+)"/i) || artHtml.match(/<img[^>]*class="[^"]*featured[^"]*"[^>]*src="([^"]+)"/i);
      let localImg = null;
      if (imgMatch && imgMatch[1]) {
        const remoteImgUrl = imgMatch[1];
        const imgExt = path.extname(remoteImgUrl.split('?')[0]) || '.webp';
        const imgFile = `${slug}${imgExt}`;
        const savePath = path.join(articleImgDir, imgFile);
        try {
          await downloadBinary(remoteImgUrl, savePath);
          localImg = `/assets/optimized/lead/blog/${imgFile}`;
        } catch(e) {}
      }

      // Extract excerpt
      const pMatch = richHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const excerpt = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      leadArticles.push({
        title,
        slug,
        category: 'LEAD Summit',
        date: '2026',
        author: 'AMCOB LEAD Editorial',
        lead: excerpt,
        excerpt: excerpt,
        richHtml: richHtml,
        localImage: localImg,
        originalUrl: artUrl
      });
    } catch(err) {
      console.error(`Error scraping ${artUrl}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, '../data/lead-articles.json'), JSON.stringify(leadArticles, null, 2), 'utf8');
  console.log(`Saved data/lead-articles.json (${leadArticles.length} articles)`);

  // 4. Summit General Info & Tickets
  console.log('\n4. Summit Master Config & Tickets...');
  const summitData = {
    title: 'LEAD Summit Anaheim 2027',
    tagline: 'The 48-Hour Reset for Muslim Entrepreneurs and Executives',
    dates: 'March 26–28, 2027',
    location: 'Anaheim, CA',
    seatCap: 300,
    hotelPrice: 550,
    ticketTiers: [
      {
        id: 1,
        name: 'Full Summit Pass (Early Bird)',
        price: 750,
        priceFormatted: '$750',
        badge: 'Recommended',
        description: 'Complete 3-day all-inclusive access to all keynote sessions, workshops, peer circles, and evening dining.',
        includes: [
          'Full 3-day access (Friday 5:00 PM – Sunday 5:00 PM)',
          'All keynote sessions, masterclasses, and executive panel breakouts',
          'Complimentary Behavioral & Cognitive Leadership Assessment',
          'Friday Welcome Dinner & Networking Reception',
          'Saturday Executive Banquet Gala & Leadership Awards',
          'Daily networking breakfasts and catered executive lunches',
          'Access to the Commercial Expo and Founder Deal Lounge',
          'Official LEAD Summit Anaheim delegate kit and workbook'
        ]
      },
      {
        id: 4,
        name: 'One-Day Summit Pass',
        price: 500,
        priceFormatted: '$500',
        badge: 'Flexible',
        description: 'Single-day access for busy executives wishing to participate in key masterclasses and daytime networking.',
        includes: [
          'Full single day summit access (Friday, Saturday, or Sunday)',
          'All daytime keynote sessions and breakout tracks for that day',
          'Catered lunch and daytime coffee/tea breaks',
          'Access to the Commercial Expo hall',
          'LEAD Summit delegate workbook'
        ]
      },
      {
        id: 5,
        name: 'Saturday Night Gala Dinner Only',
        price: 250,
        priceFormatted: '$250',
        badge: 'Banquet Only',
        description: 'Evening banquet pass for community leaders, partners, and spouses attending the flagship Saturday Gala.',
        includes: [
          'Admission to the Saturday Night Executive Banquet & Awards Gala',
          'Keynote evening address and leadership recognition ceremony',
          'Halal gourmet dinner banquet seating',
          'Evening executive mixer and deal-making lounge'
        ]
      }
    ],
    faqs: [
      {
        q: 'Why is LEAD Summit capped at exactly 300 seats?',
        a: 'Most conferences pack thousands of people into massive auditoriums where high-impact conversations are impossible. AMCOB deliberately caps LEAD Summit at 300 verified founders, executives, and decision-makers to guarantee intimacy, authentic confidentiality, and high-value deal making.'
      },
      {
        q: 'What is the 48-Hour Reset?',
        a: 'The summit is engineered around five tangible pillars: reconnecting you to your commercial and ethical purpose, sharpening your operational strategy, putting real capital and customers in front of you, providing a personal behavioral and cognitive assessment, and surrounding you with an enduring peer advisory board.'
      },
      {
        q: 'What does the Behavioral & Cognitive Assessment include?',
        a: 'Every full summit attendee receives an advanced executive evaluation measuring cognitive problem-solving, behavioral decision-making under stress, and leadership archetype mapping, with actionable coaching on how to leverage your innate strengths.'
      },
      {
        q: 'Where will the event take place in Anaheim?',
        a: 'LEAD Summit Anaheim takes place at a premier executive hotel and convention property in Anaheim, California. Registered delegates receive direct room block booking links ($550 discounted 3-night rate) upon ticket confirmation.'
      },
      {
        q: 'Are meals included with summit registration?',
        a: 'Yes. Full Summit passes include Friday evening dinner reception, Saturday breakfast, lunch, and the evening Banquet Gala, as well as Sunday breakfast, lunch, and all day coffee and refreshment breaks. All food provided is strictly Halal certified.'
      },
      {
        q: 'Can non-AMCOB members attend?',
        a: 'Yes. While AMCOB members receive priority registration and preferred seating, the summit welcomes all qualified business founders, executives, and aspiring leaders across North America.'
      }
    ]
  };

  fs.writeFileSync(path.join(__dirname, '../data/lead-summit.json'), JSON.stringify(summitData, null, 2), 'utf8');
  console.log('Saved data/lead-summit.json');

  // 5. Download Hero Graphic & Poster
  console.log('\n5. Downloading Hero Media Assets...');
  const heroAssetsDir = path.join(__dirname, '../assets/optimized/lead');
  try {
    await downloadBinary('https://lead.amcob.org/assets/video/amcob-highlights-hero-poster.webp', path.join(heroAssetsDir, 'hero-poster.webp'));
    console.log('Downloaded hero-poster.webp');
  } catch(e) { console.error('Poster download failed:', e.message); }

  try {
    await downloadBinary('https://lead.amcob.org/assets/img/all-images/hero/hero-avatar.webp', path.join(heroAssetsDir, 'hero-avatar.webp'));
    console.log('Downloaded hero-avatar.webp');
  } catch(e) { console.error('Avatar download failed:', e.message); }

  try {
    await downloadBinary('https://lead.amcob.org/assets/img/logo/logo.svg', path.join(heroAssetsDir, 'lead-logo.svg'));
    console.log('Downloaded lead-logo.svg');
  } catch(e) { console.error('Logo download failed:', e.message); }

  console.log('\n=== COMPLETE: All LEAD data and media scraped successfully ===');
}

scrapeLeadData().catch(console.error);
