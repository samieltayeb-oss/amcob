/**
 * AMCOB Interactive Motion Graphics Ecosystem Engine
 * Controls radial geometry, dynamic SVG energy beams, synchronized state,
 * auto-orbit loop, and interactive inspection cockpit.
 * Strict zero prose dash standard.
 */

(function () {
  const ecosystemData = [
    {
      index: 0,
      id: "01",
      title: "Peer Advisory Groups",
      sub: "CEO Cohorts ($100k to $3M+)",
      tag: "Flagship Governance",
      desc: "Confidential CEO cohorts of 8 to 12 verified founders meeting monthly for structured accountability, problem triage, and operational governance.",
      metric: "$100k to $3M+ Revenue Tiers",
      url: "/peer-advisory",
      cta: "Explore Cohorts"
    },
    {
      index: 1,
      id: "02",
      title: "Lead Generation",
      sub: "AMCOB Connect Referral Engine",
      tag: "Bilateral Commerce",
      desc: "Bi-weekly structured business networking delivering warm commercial introductions between vetted enterprise suppliers, corporate buyers, and institutional partners.",
      metric: "Bi-Weekly Commercial Sessions",
      url: "/connect",
      cta: "Join Connect"
    },
    {
      index: 2,
      id: "03",
      title: "Networking Mixers",
      sub: "Private Executive Dinners",
      tag: "Regional Chapters",
      desc: "High-trust documentary dinners and executive networking gatherings hosted across 12 North American metropolitan chapters.",
      metric: "12 Regional Metros",
      url: "/dinner-mixers",
      cta: "View Dinners"
    },
    {
      index: 3,
      id: "04",
      title: "Podcasts & Media",
      sub: "Executive Founder Dialogues",
      tag: "Media Channel",
      desc: "In-depth video broadcasts examining operational blueprints, business ethics, and enterprise scaling lessons from prominent Muslim founders.",
      metric: "Bi-Weekly Video Broadcasts",
      url: "/podcasts",
      cta: "Listen to Podcasts"
    },
    {
      index: 4,
      id: "05",
      title: "Educational Workshops",
      sub: "LEAD Summits & Masterclasses",
      tag: "Executive Academy",
      desc: "Specialized clinics and national conferences covering cross-border M&A, executive tax structuring, intellectual property, and ethical corporate governance.",
      metric: "National Curriculum",
      url: "/conferences-workshops",
      cta: "Browse Workshops"
    },
    {
      index: 5,
      id: "06",
      title: "Capital Raising",
      sub: "Syndicates & Family Offices",
      tag: "Capital Access",
      desc: "Direct private introductions connecting qualified growth-stage enterprises with accredited Muslim angel investors, venture syndicates, and family offices.",
      metric: "Accredited Investor Network",
      url: "/opportunities",
      cta: "Explore Capital"
    },
    {
      index: 6,
      id: "07",
      title: "Accelerator Program",
      sub: "12-Week Intensive Scaling",
      tag: "Venture Accelerator",
      desc: "Structured intensive acceleration for emerging enterprises with high-caliber executive mentorship, unit economics triage, and investor demo access.",
      metric: "12-Week Cohorts",
      url: "/virtual-accelerator-program",
      cta: "View Accelerator"
    },
    {
      index: 7,
      id: "08",
      title: "Sponsorship Opportunities",
      sub: "Enterprise Brand Alignment",
      tag: "Corporate Partnerships",
      desc: "Bespoke commercial sponsorships delivering marquee visibility across annual LEAD Summits, regional dinners, digital publications, and the enterprise directory.",
      metric: "Enterprise Packages",
      url: "/sponsorship",
      cta: "Partner with AMCOB"
    }
  ];

  let currentIndex = 0;
  let autoTimer = null;
  let isPlaying = true;
  const ROTATE_INTERVAL = 3800; // ms

  function initEcosystem() {
    const stage = document.getElementById("ecosystemStage");
    if (!stage) return;

    // Attach listeners to interactive pills
    ecosystemData.forEach((item) => {
      const pill = document.getElementById("pill-" + item.index);
      if (pill) {
        pill.addEventListener("mouseenter", () => {
          pauseAuto();
          setActiveEngine(item.index);
        });
        pill.addEventListener("focus", () => {
          pauseAuto();
          setActiveEngine(item.index);
        });
      }

      // Attach listeners to SVG pins on center ring
      const pin = document.getElementById("pin-" + item.index);
      if (pin) {
        pin.addEventListener("mouseenter", () => {
          pauseAuto();
          setActiveEngine(item.index);
        });
        pin.addEventListener("click", () => {
          setActiveEngine(item.index);
        });
      }

      // Attach listeners to quick chips
      const chip = document.getElementById("chip-" + item.index);
      if (chip) {
        chip.addEventListener("click", () => {
          setActiveEngine(item.index);
        });
      }
    });

    // Stepper buttons
    const prevBtn = document.getElementById("cockpitPrev");
    const nextBtn = document.getElementById("cockpitNext");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const next = (currentIndex - 1 + ecosystemData.length) % ecosystemData.length;
        setActiveEngine(next);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const next = (currentIndex + 1) % ecosystemData.length;
        setActiveEngine(next);
      });
    }

    // Play/Pause button
    const toggleBtn = document.getElementById("ecosystemTogglePlay");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (isPlaying) {
          pauseAuto();
          toggleBtn.innerHTML = `<span>&#9654;</span> Resume Orbit`;
        } else {
          startAuto();
          toggleBtn.innerHTML = `<span>&#10074;&#10074;</span> Pause Orbit`;
        }
      });
    }

    // Resume when mouse leaves stage
    stage.addEventListener("mouseleave", () => {
      if (!autoTimer && isPlaying) {
        startAuto();
      }
    });

    // Initialize first node
    setActiveEngine(0);
    startAuto();
  }

  function setActiveEngine(index) {
    currentIndex = index;
    const item = ecosystemData[index];

    // Update Pills
    ecosystemData.forEach((d) => {
      const pill = document.getElementById("pill-" + d.index);
      if (pill) {
        pill.classList.toggle("active", d.index === index);
      }

      const pin = document.getElementById("pin-" + d.index);
      if (pin) {
        pin.classList.toggle("active", d.index === index);
      }

      const beam = document.getElementById("beam-" + d.index);
      if (beam) {
        beam.classList.toggle("active", d.index === index);
      }

      const chip = document.getElementById("chip-" + d.index);
      if (chip) {
        chip.classList.toggle("active", d.index === index);
      }
    });

    // Update Center Hub active engine label
    const centerLabel = document.getElementById("centerHubActiveLabel");
    if (centerLabel) {
      centerLabel.textContent = `${item.id} \u2022 ${item.title}`;
    }

    // Update Cockpit HUD
    const cockpitNum = document.getElementById("cockpitNum");
    const cockpitTitle = document.getElementById("cockpitTitle");
    const cockpitTag = document.getElementById("cockpitTag");
    const cockpitDesc = document.getElementById("cockpitDesc");
    const cockpitBtn = document.getElementById("cockpitBtn");

    if (cockpitNum) cockpitNum.textContent = item.id;
    if (cockpitTitle) {
      cockpitTitle.innerHTML = `${item.title} <span class="cockpit-tag" id="cockpitTag">${item.tag}</span>`;
    }
    if (cockpitDesc) cockpitDesc.textContent = item.desc;
    if (cockpitBtn) {
      cockpitBtn.href = item.url;
      cockpitBtn.textContent = `${item.cta} \u2192`;
    }
  }

  function startAuto() {
    isPlaying = true;
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % ecosystemData.length;
      setActiveEngine(nextIndex);
    }, ROTATE_INTERVAL);
  }

  function pauseAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEcosystem);
  } else {
    initEcosystem();
  }
})();
