import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Interactive magnetic wrapper for buttons and links.
 * Applies subtle cursor attraction on fine-pointer desktop devices.
 */
export function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  as = 'button',
  ...props
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.3 });

  const handlePointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    rawX.set(offsetX * strength);
    rawY.set(offsetY * strength);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      data-cursor="magnetic"
      style={prefersReducedMotion ? undefined : { x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

