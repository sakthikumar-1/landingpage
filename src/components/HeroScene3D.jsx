import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function createSoftParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 250, 236, 1)');
  gradient.addColorStop(0.32, 'rgba(213, 180, 116, 0.72)');
  gradient.addColorStop(1, 'rgba(213, 180, 116, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Lazy-loaded Three.js WebGL backdrop:
 * flowing 3D champagne-gold particle wave horizon, subtle deep-space wireframe
 * geometry, exponential obsidian fog, and ambient starlight that preserves 100% text legibility.
 */
export default function HeroScene3D({ pointerRef }) {
  const containerRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const dprCap = isMobile ? 1.35 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.115);

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      60
    );
    camera.position.set(0, 1.35, isMobile ? 8.2 : 6.8);
    camera.lookAt(0, -0.35, 0);

    const particleTexture = createSoftParticleTexture();

    // 1. Flowing 3D Champagne Particle Wave Horizon (lower plane, non-intrusive)
    const cols = isMobile ? 26 : 44;
    const rows = isMobile ? 26 : 44;
    const waveCount = cols * rows;
    const spacingX = isMobile ? 0.42 : 0.36;
    const spacingZ = isMobile ? 0.38 : 0.32;

    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);
    const baseGold = new THREE.Color(0xd5b474);
    const brightIvory = new THREE.Color(0xf7ebd2);

    let idx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        const i3 = idx * 3;
        wavePositions[i3] = (ix - cols / 2) * spacingX;
        wavePositions[i3 + 1] = 0;
        wavePositions[i3 + 2] = (iz - rows / 2) * spacingZ;

        waveColors[i3] = baseGold.r;
        waveColors[i3 + 1] = baseGold.g;
        waveColors[i3 + 2] = baseGold.b;
        idx++;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    waveGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(wavePositions, 3)
    );
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: isMobile ? 0.085 : 0.072,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const waveField = new THREE.Points(waveGeo, waveMat);
    waveField.position.set(0, -1.65, -1.2);
    scene.add(waveField);

    // 2. Subtle deep-space wireframe crown geometry (whisper-thin, never blocks text)
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 0.25, -4.6);
    scene.add(crownGroup);

    const outerGeo = new THREE.IcosahedronGeometry(2.85, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0xd5b474,
      transparent: true,
      opacity: 0.14,
    });
    const outerWire = new THREE.LineSegments(outerEdges, outerMat);
    crownGroup.add(outerWire);

    const haloGeo = new THREE.TorusGeometry(
      3.55,
      0.006,
      8,
      isMobile ? 64 : 110
    );
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xd5b474,
      transparent: true,
      opacity: 0.18,
    });
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.rotation.set(Math.PI * 0.42, 0.18, 0);
    crownGroup.add(haloRing);

    // 3. Ambient deep-space starlight particles
    const starCount = isMobile ? 110 : 260;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 18;
      starPositions[i3 + 1] = (Math.random() - 0.35) * 10;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starMat = new THREE.PointsMaterial({
      size: 0.06,
      map: particleTexture,
      color: 0xefe0bc,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause when scrolled offscreen or tab hidden
    let isInView = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    const clock = new THREE.Clock();
    const tempColor = new THREE.Color();
    let smoothPx = 0;
    let smoothPy = 0;
    let rafId = 0;

    const updateWave = (elapsed) => {
      const posAttr = waveGeo.getAttribute('position');
      const colAttr = waveGeo.getAttribute('color');
      const posArr = posAttr.array;
      const colArr = colAttr.array;

      let p = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iz = 0; iz < rows; iz++) {
          const i3 = p * 3;
          const x = posArr[i3];
          const z = posArr[i3 + 2];

          const waveY =
            Math.sin(x * 0.65 + elapsed * 0.9) * 0.28 +
            Math.cos(z * 0.72 + elapsed * 0.7) * 0.24 +
            Math.sin((x + z) * 0.45 - elapsed * 0.55) * 0.14;

          posArr[i3 + 1] = waveY;

          // Brighter warm ivory near wave crests
          const crestMix = Math.max(0, Math.min(1, (waveY + 0.5) * 0.85));
          tempColor.copy(baseGold).lerp(brightIvory, crestMix * 0.65);
          colArr[i3] = tempColor.r;
          colArr[i3 + 1] = tempColor.g;
          colArr[i3 + 2] = tempColor.b;
          p++;
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    };

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      if (prefersReducedMotion) {
        updateWave(0);
      } else {
        const px = pointerRef?.current?.x || 0;
        const py = pointerRef?.current?.y || 0;
        const scrollRatio = Math.min(
          window.scrollY / (window.innerHeight || 1),
          1.2
        );

        smoothPx += (px - smoothPx) * 0.04;
        smoothPy += (py - smoothPy) * 0.04;

        updateWave(elapsed);

        camera.position.x = smoothPx * 0.55;
        camera.position.y = 1.35 - smoothPy * 0.28 + scrollRatio * 0.45;
        camera.lookAt(0, -0.35 - scrollRatio * 0.3, 0);

        crownGroup.rotation.y = elapsed * 0.07 + smoothPx * 0.22;
        crownGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.08 + smoothPy * 0.14;
        haloRing.rotation.z = elapsed * 0.1;

        starField.rotation.y = elapsed * 0.015 + smoothPx * 0.08;
      }

      renderer.render(scene, camera);
    };

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (!isInView || document.hidden) return;
      renderFrame();
    };

    if (prefersReducedMotion) {
      renderFrame();
    } else {
      animate();
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      waveGeo.dispose();
      waveMat.dispose();
      outerGeo.dispose();
      outerEdges.dispose();
      outerMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      particleTexture?.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [pointerRef]);

  if (webglFailed) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-95"
    />
  );
}
