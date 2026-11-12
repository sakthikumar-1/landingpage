import { useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Provides GPU-composited cursor spotlight coordinates and multi-depth parallax
 * motion values on fine-pointer desktop devices, disabled for touch or reduced motion.
 */
export function usePointerEffects() {
  const [isInteractive, setIsInteractive] = useState(false);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const glowX = useSpring(mouseX, { stiffness: 150, damping: 24, mass: 0.35 });
  const glowY = useSpring(mouseY, { stiffness: 150, damping: 24, mass: 0.35 });

  const smoothNormX = useSpring(normX, { stiffness: 75, damping: 22, mass: 0.55 });
  const smoothNormY = useSpring(normY, { stiffness: 75, damping: 22, mass: 0.55 });

  // Mid-ground orbital eclipse parallax
  const eclipseX = useTransform(smoothNormX, [-1, 1], [16, -16]);
  const eclipseY = useTransform(smoothNormY, [-1, 1], [12, -12]);

  // Foreground typography subtle counter-parallax
  const heroX = useTransform(smoothNormX, [-1, 1], [-8, 8]);
  const heroY = useTransform(smoothNormY, [-1, 1], [-6, 6]);

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
    eclipseX,
    eclipseY,
    heroX,
    heroY,
  };
}
