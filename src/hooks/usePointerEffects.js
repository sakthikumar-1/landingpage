import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Provides GPU-composited cursor coordinates, shared pointer ref for WebGL,
 * and parallax motion values on fine-pointer desktop devices.
 */
export function usePointerEffects() {
  const [isInteractive, setIsInteractive] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const glowX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.35 });
  const glowY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.35 });

  const smoothNormX = useSpring(normX, { stiffness: 75, damping: 22, mass: 0.55 });
  const smoothNormY = useSpring(normY, { stiffness: 75, damping: 22, mass: 0.55 });

  const heroX = useTransform(smoothNormX, [-1, 1], [-8, 8]);
  const heroY = useTransform(smoothNormY, [-1, 1], [-5, 5]);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateCapability = () => {
      setIsInteractive(pointerQuery.matches && !motionQuery.matches);
    };

    updateCapability();
    pointerQuery.addEventListener('change', updateCapability);
    motionQuery.addEventListener('change', updateCapability);

    return () => {
      pointerQuery.removeEventListener('change', updateCapability);
      motionQuery.removeEventListener('change', updateCapability);
    };
  }, []);

  useEffect(() => {
    if (!isInteractive) {
      normX.set(0);
      normY.set(0);
      pointerRef.current = { x: 0, y: 0 };
      return;
    }

    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const nx = (clientX / (window.innerWidth || 1)) * 2 - 1;
      const ny = (clientY / (window.innerHeight || 1)) * 2 - 1;
      normX.set(nx);
      normY.set(ny);
      pointerRef.current = { x: nx, y: ny };
    };

    const handlePointerLeave = () => {
      normX.set(0);
      normY.set(0);
      pointerRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isInteractive, mouseX, mouseY, normX, normY]);

  return {
    isInteractive,
    pointerRef,
    mouseX,
    mouseY,
    glowX,
    glowY,
    heroX,
    heroY,
  };
}
