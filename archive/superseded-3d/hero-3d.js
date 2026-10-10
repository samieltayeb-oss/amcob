/**
 * AMCOB Unified Architectural 3D Chamber Dais
 * Built with Three.js (r186) and GSAP.
 * Features an optical glass transmission dais, mounted authentic LEAD Summit photography,
 * unobstructed leadership attribution wing, physical transmission materials,
 * pointer parallax, and smooth scroll choreography on pure white.
 */

import * as THREE from '/js/vendor/three.module.js';

(function () {
  'use strict';

  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('no-webgl');
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3D);
  } else {
    initHero3D();
  }

  function initHero3D() {
    const container = document.getElementById('hero3dStage');
    const canvas = document.getElementById('hero3dCanvas');
    if (!container || !canvas) return;

    let width = container.clientWidth || 1140;
    let height = container.clientHeight || 480;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent on pure white HTML

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 7.1);

    // 2. High-Performance Renderer with Physical Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;

    // 3. Precision Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    // Key Light for glass edge specular refraction
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(6, 7, 5);
    scene.add(keyLight);

    // Warm Gold Accent Light
    const goldLight = new THREE.DirectionalLight(0xce8924, 1.2);
    goldLight.position.set(-6, -2, 3);
    scene.add(goldLight);

    // Soft Cyan/Sky Rim Light for beveled reflections
    const skyRimLight = new THREE.DirectionalLight(0x0284c7, 0.9);
    skyRimLight.position.set(0, -5, -2);
    scene.add(skyRimLight);

    // 4. Physical Materials
    const opticalGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.8,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06
    });

    const brushedGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xce8924,
      metalness: 0.82,
      roughness: 0.22
    });

    const imperialChassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b162c,
      metalness: 0.88,
      roughness: 0.28
    });

    const textureLoader = new THREE.TextureLoader();

    // 5. Build Unified Architectural Chamber Dais
    const chamberDais = new THREE.Group();
    scene.add(chamberDais);

    // A. Monumental Foundation Plinth (The Crystal Glass Slab)
    const basePlinthGeo = new THREE.BoxGeometry(6.8, 0.28, 2.6);
    const basePlinthMesh = new THREE.Mesh(basePlinthGeo, opticalGlassMaterial);
    basePlinthMesh.position.set(0, -1.05, 0);
    chamberDais.add(basePlinthMesh);

    // Base Rim Substructure (Brushed Champagne Gold)
    const baseRimGeo = new THREE.BoxGeometry(6.84, 0.06, 2.64);
    const baseRimMesh = new THREE.Mesh(baseRimGeo, brushedGoldMaterial);
    baseRimMesh.position.set(0, -1.19, 0);
    chamberDais.add(baseRimMesh);

    // B. Soft Diffuse Contact Shadow on Pure White Floor
    const shadowGeo = new THREE.PlaneGeometry(8.2, 3.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    sGrad.addColorStop(0, 'rgba(11, 22, 44, 0.14)');
    sGrad.addColorStop(0.45, 'rgba(11, 22, 44, 0.04)');
    sGrad.addColorStop(1, 'rgba(11, 22, 44, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.22, 0);
    chamberDais.add(shadowMesh);

    // C. Central Monument: LEAD Summit Executive Convening
    const centerWing = new THREE.Group();
    centerWing.position.set(0.3, 0.25, 0.1);

    // Structural Crystal Frame
    const centerGlassGeo = new THREE.BoxGeometry(3.6, 2.15, 0.18);
    const centerGlassMesh = new THREE.Mesh(centerGlassGeo, opticalGlassMaterial);
    centerWing.add(centerGlassMesh);

    // Precision Metal Bezel
    const centerBezelGeo = new THREE.BoxGeometry(3.66, 2.21, 0.12);
    const centerBezelMesh = new THREE.Mesh(centerBezelGeo, imperialChassisMaterial);
    centerBezelMesh.position.z = -0.05;
    centerWing.add(centerBezelMesh);

    // Mounted Authentic Photograph: LEAD Summit
    const centerPhotoGeo = new THREE.PlaneGeometry(3.42, 1.98);
    const centerTex = textureLoader.load('/assets/optimized/events/leadSummitHomeBanner.webp', (t) => {
      t.generateMipmaps = true;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      renderer.render(scene, camera);
    });
    const centerPhotoMat = new THREE.MeshBasicMaterial({
      map: centerTex,
      toneMapped: true
    });
    const centerPhotoMesh = new THREE.Mesh(centerPhotoGeo, centerPhotoMat);
    centerPhotoMesh.position.z = 0.095;
    centerWing.add(centerPhotoMesh);

    chamberDais.add(centerWing);

    // D. Executive Leadership Attestation Wing (Unobstructed & Dignified)
    const leadershipWing = new THREE.Group();
    leadershipWing.position.set(-2.2, 0.15, 0.45);
    leadershipWing.rotation.y = 0.14; // Angled subtly toward center camera

    const leaderGlassGeo = new THREE.BoxGeometry(1.65, 1.95, 0.16);
    const leaderGlassMesh = new THREE.Mesh(leaderGlassGeo, opticalGlassMaterial);
    leadershipWing.add(leaderGlassMesh);

    const leaderBezelGeo = new THREE.BoxGeometry(1.71, 2.01, 0.1);
    const leaderBezelMesh = new THREE.Mesh(leaderBezelGeo, brushedGoldMaterial);
    leaderBezelMesh.position.z = -0.04;
    leadershipWing.add(leaderBezelMesh);

    // Authentic Unobstructed Portrait: Kashif Zubair
    const leaderPhotoGeo = new THREE.PlaneGeometry(1.48, 1.78);
    const leaderTex = textureLoader.load('/assets/optimized/leadership/Kashif_Zubair.webp', (t) => {
      t.generateMipmaps = true;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      renderer.render(scene, camera);
    });
    const leaderPhotoMat = new THREE.MeshBasicMaterial({
      map: leaderTex,
      toneMapped: true
    });
    const leaderPhotoMesh = new THREE.Mesh(leaderPhotoGeo, leaderPhotoMat);
    leaderPhotoMesh.position.z = 0.085;
    leadershipWing.add(leaderPhotoMesh);

    chamberDais.add(leadershipWing);

    // E. Chamber Official Emblem Wing (Right Wing Anchor)
    const sealWing = new THREE.Group();
    sealWing.position.set(2.5, -0.05, 0.35);
    sealWing.rotation.y = -0.16; // Angled subtly toward center camera

    const sealGlassGeo = new THREE.BoxGeometry(1.35, 1.55, 0.14);
    const sealGlassMesh = new THREE.Mesh(sealGlassGeo, opticalGlassMaterial);
    sealWing.add(sealGlassMesh);

    const sealBezelGeo = new THREE.BoxGeometry(1.41, 1.61, 0.08);
    const sealBezelMesh = new THREE.Mesh(sealBezelGeo, imperialChassisMaterial);
    sealBezelMesh.position.z = -0.04;
    sealWing.add(sealBezelMesh);

    // Official AMCOB Logo Insignia
    const sealGeo = new THREE.PlaneGeometry(1.15, 0.45);
    const logoTex = textureLoader.load('/assets/optimized/logos/logo.png', (t) => {
      t.generateMipmaps = true;
      renderer.render(scene, camera);
    });
    const sealMat = new THREE.MeshBasicMaterial({
      map: logoTex,
      transparent: true,
      toneMapped: true
    });
    const sealMesh = new THREE.Mesh(sealGeo, sealMat);
    sealMesh.position.z = 0.075;
    sealWing.add(sealMesh);

    chamberDais.add(sealWing);

    // 6. Interactive Physics-Damped Pointer Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    function onPointerMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.06;
      targetRotX = -normY * 0.04;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // 7. Scroll Reactive Depth & Dolly
    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.pageYOffset || document.documentElement.scrollTop;
    }, { passive: true });

    // 8. GSAP Initial Choreographed Entrance
    if (window.gsap) {
      window.gsap.from(chamberDais.position, {
        y: -0.6,
        duration: 1.6,
        ease: 'power3.out'
      });
      window.gsap.from(chamberDais.rotation, {
        x: 0.08,
        duration: 1.8,
        ease: 'power3.out'
      });
    }

    // 9. Render Loop
    let clock = new THREE.Clock();
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Damped pointer follow
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      // Subtle resting idle float
      const idleFloat = Math.sin(elapsed * 0.8) * 0.015;

      // Scroll reactive dolly
      const scrollFactor = Math.min(scrollY / 600, 1.0);
      const scrollTilt = scrollFactor * 0.08;

      chamberDais.rotation.x = currentRotX + scrollTilt;
      chamberDais.rotation.y = currentRotY;
      chamberDais.position.y = idleFloat - scrollFactor * 0.3;

      renderer.render(scene, camera);
    }

    animate();

    // 10. Resize Observer
    function onResize() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onResize);

    // Clean up if page navigates
    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    });
  }
})();
