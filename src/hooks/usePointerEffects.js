import { useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Provides GPU-composited cursor glow coordinates and subtle parallax motion values
 * for fine-pointer desktop devices, automatically disabled for touch or reduced-motion.
 */
export function usePointerEffects() {
  const [isInteractive, setIsInteractive] = useState(false);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const glowX = useSpring(mouseX, { stiffness: 140, damping: 24, mass: 0.35 });
  const glowY = useSpring(mouseY, { stiffness: 140, damping: 24, mass: 0.35 });

  const smoothNormX = useSpring(normX, { stiffness: 80, damping: 22, mass: 0.5 });
  const smoothNormY = useSpring(normY, { stiffness: 80, damping: 22, mass: 0.5 });

  // Subtle depth layers for hero typography & framing
  const heroX = useTransform(smoothNormX, [-1, 1], [-10, 10]);
  const heroY = useTransform(smoothNormY, [-1, 1], [-7, 7]);
  const frameX = useTransform(smoothNormX, [-1, 1], [5, -5]);
  const frameY = useTransform(smoothNormY, [-1, 1], [4, -4]);

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
      return;
    }

    // Initialize glow softly at viewport center until cursor moves
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      normX.set((clientX / width) * 2 - 1);
      normY.set((clientY / height) * 2 - 1);
    };

    const handlePointerLeave = () => {
      normX.set(0);
      normY.set(0);
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
    glowX,
    glowY,
    heroX,
    heroY,
    frameX,
    frameY,
  };
}

