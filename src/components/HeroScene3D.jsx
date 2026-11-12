import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function createSoftParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.78)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Lazy-loaded Three.js WebGL stage:
 * kinetic 3D particle wave horizon with pointer-ripple response,
 * dual counter-rotating orbital rings with traveling nodes, and theme-adaptive fog.
 */
export default function HeroScene3D({ pointerRef, theme = 'dark' }) {
  const containerRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const themeRefs = useRef(null);

  // Sync Dark / Titanium-Gray Light theme live without recreating WebGL context
  useEffect(() => {
    const refs = themeRefs.current;
    if (!refs) return;

    const isDark = theme === 'dark';
    refs.isDark = isDark;
    refs.scene.fog.color.setHex(isDark ? 0x050505 : 0xe5e7eb);

    refs.baseColor.setHex(isDark ? 0xd5b474 : 0x8f6d2e);
    refs.crestColor.setHex(isDark ? 0xfaf0da : 0x111317);

    refs.waveMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    refs.waveMat.opacity = isDark ? 0.86 : 0.68;
    refs.waveMat.needsUpdate = true;

    refs.outerMat.color.setHex(isDark ? 0xd5b474 : 0x6b5120);
    refs.outerMat.opacity = isDark ? 0.18 : 0.24;

    refs.haloMat.color.setHex(isDark ? 0xd5b474 : 0x8f6d2e);
    refs.haloMat.opacity = isDark ? 0.28 : 0.34;

    refs.haloTwoMat.color.setHex(isDark ? 0xefe0bc : 0x434750);
    refs.haloTwoMat.opacity = isDark ? 0.16 : 0.22;

    refs.nodeMat.color.setHex(isDark ? 0xefe0bc : 0x6b5120);

    refs.starMat.color.setHex(isDark ? 0xefe0bc : 0x5f6570);
    refs.starMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    refs.starMat.opacity = isDark ? 0.52 : 0.4;
    refs.starMat.needsUpdate = true;

    if (refs.renderSingleFrame) {
      refs.renderSingleFrame();
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDarkInit = theme === 'dark';
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
    scene.fog = new THREE.FogExp2(isDarkInit ? 0x050505 : 0xe5e7eb, 0.105);

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      60
    );
    camera.position.set(0, 1.55, isMobile ? 8.2 : 6.6);
    camera.lookAt(0, -0.45, 0);

    const particleTexture = createSoftParticleTexture();

    // 1. Kinetic 3D Particle Wave Horizon
    const cols = isMobile ? 28 : 48;
    const rows = isMobile ? 28 : 48;
    const waveCount = cols * rows;
    const spacingX = isMobile ? 0.42 : 0.36;
    const spacingZ = isMobile ? 0.38 : 0.32;

    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);
    const baseColor = new THREE.Color(isDarkInit ? 0xd5b474 : 0x8f6d2e);
    const crestColor = new THREE.Color(isDarkInit ? 0xfaf0da : 0x111317);

    let idx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        const i3 = idx * 3;
        wavePositions[i3] = (ix - cols / 2) * spacingX;
        wavePositions[i3 + 1] = 0;
        wavePositions[i3 + 2] = (iz - rows / 2) * spacingZ;

        waveColors[i3] = baseColor.r;
        waveColors[i3 + 1] = baseColor.g;
        waveColors[i3 + 2] = baseColor.b;
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
      size: isMobile ? 0.095 : 0.082,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDarkInit ? 0.86 : 0.68,
      depthWrite: false,
      blending: isDarkInit ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const waveField = new THREE.Points(waveGeo, waveMat);
    waveField.position.set(0, -1.45, -1.0);
    scene.add(waveField);

    // 2. Deep-space wireframe crown & dual orbital rings
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 0.35, -4.4);
    scene.add(crownGroup);

    const outerGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: isDarkInit ? 0xd5b474 : 0x6b5120,
      transparent: true,
      opacity: isDarkInit ? 0.18 : 0.24,
    });
    const outerWire = new THREE.LineSegments(outerEdges, outerMat);
    crownGroup.add(outerWire);

    const haloGeo = new THREE.TorusGeometry(
      3.55,
      0.01,
      8,
      isMobile ? 72 : 120
    );
    const haloMat = new THREE.MeshBasicMaterial({
      color: isDarkInit ? 0xd5b474 : 0x8f6d2e,
      transparent: true,
      opacity: isDarkInit ? 0.28 : 0.34,
    });
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.rotation.set(Math.PI * 0.4, 0.22, 0);
    crownGroup.add(haloRing);

    const haloTwoGeo = new THREE.TorusGeometry(
      4.15,
      0.007,
      8,
      isMobile ? 72 : 120
    );
    const haloTwoMat = new THREE.MeshBasicMaterial({
      color: isDarkInit ? 0xefe0bc : 0x434750,
      transparent: true,
      opacity: isDarkInit ? 0.16 : 0.22,
    });
    const haloRingTwo = new THREE.Mesh(haloTwoGeo, haloTwoMat);
    haloRingTwo.rotation.set(-Math.PI * 0.35, -0.3, 0);
    crownGroup.add(haloRingTwo);

    // Traveling orbital light nodes on ring one
    const nodeGeo = new THREE.SphereGeometry(0.055, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: isDarkInit ? 0xefe0bc : 0x6b5120,
    });
    const orbitalNodes = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map(
      (phase) => {
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        haloRing.add(mesh);
        return { mesh, phase };
      }
    );

    // 3. Ambient deep-space starlight particles
    const starCount = isMobile ? 120 : 300;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 18;
      starPositions[i3 + 1] = (Math.random() - 0.3) * 10;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starMat = new THREE.PointsMaterial({
      size: 0.068,
      map: particleTexture,
      color: isDarkInit ? 0xefe0bc : 0x5f6570,
      transparent: true,
      opacity: isDarkInit ? 0.52 : 0.4,
      depthWrite: false,
      blending: isDarkInit ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

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

    const updateWave = (elapsed, px, py) => {
      const posAttr = waveGeo.getAttribute('position');
      const colAttr = waveGeo.getAttribute('color');
      const posArr = posAttr.array;
      const colArr = colAttr.array;

      const focusX = px * 4.5;
      const focusZ = py * 3.5;

      let p = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iz = 0; iz < rows; iz++) {
          const i3 = p * 3;
          const x = posArr[i3];
          const z = posArr[i3 + 2];

          const dx = x - focusX;
          const dz = z - focusZ;
          const distSq = dx * dx + dz * dz;
          const pointerLift = Math.exp(-distSq * 0.25) * 0.42;

          const waveY =
            Math.sin(x * 0.68 + elapsed * 1.35) * 0.34 +
            Math.cos(z * 0.75 + elapsed * 1.05) * 0.28 +
            Math.sin((x - z) * 0.48 - elapsed * 0.85) * 0.16 +
            pointerLift;

          posArr[i3 + 1] = waveY;

          const crestMix = Math.max(0, Math.min(1, (waveY + 0.5) * 0.85));
          tempColor.copy(baseColor).lerp(crestColor, crestMix * 0.72);
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
        updateWave(0, 0, 0);
      } else {
        const px = pointerRef?.current?.x || 0;
        const py = pointerRef?.current?.y || 0;
        const scrollRatio = Math.min(
          window.scrollY / (window.innerHeight || 1),
          1.2
        );

        smoothPx += (px - smoothPx) * 0.055;
        smoothPy += (py - smoothPy) * 0.055;

        updateWave(elapsed, smoothPx, smoothPy);

        camera.position.x = smoothPx * 0.75;
        camera.position.y = 1.55 - smoothPy * 0.35 + scrollRatio * 0.5;
        camera.lookAt(0, -0.45 - scrollRatio * 0.3, 0);

        crownGroup.rotation.y = elapsed * 0.14 + smoothPx * 0.3;
        crownGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.12 + smoothPy * 0.2;

        haloRing.rotation.z = elapsed * 0.22;
        haloRingTwo.rotation.z = -elapsed * 0.16;

        for (const node of orbitalNodes) {
          const angle = elapsed * 0.65 + node.phase;
          node.mesh.position.set(
            Math.cos(angle) * 3.55,
            Math.sin(angle) * 3.55,
            0
          );
        }

        starField.rotation.y = elapsed * 0.028 + smoothPx * 0.1;
      }

      renderer.render(scene, camera);
    };

    themeRefs.current = {
      isDark: isDarkInit,
      scene,
      baseColor,
      crestColor,
      waveMat,
      outerMat,
      haloMat,
      haloTwoMat,
      nodeMat,
      starMat,
      renderSingleFrame: prefersReducedMotion ? renderFrame : null,
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
      themeRefs.current = null;
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
      haloTwoGeo.dispose();
      haloTwoMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      particleTexture?.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
