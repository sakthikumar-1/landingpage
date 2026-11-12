import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Custom desktop cursor (precision core dot + trailing ring)
 * paired with a theme-adapted cursor-following spotlight.
 */
export function CustomCursor({ isInteractive, mouseX, mouseY, glowX, glowY }) {
  const { isDark } = useTheme();
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ringX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (!isInteractive) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMove = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    const handleOver = (event) => {
      const interactive = event.target?.closest?.(
        'a, button, [data-cursor="magnetic"]'
      );
      setIsHoveringInteractive(Boolean(interactive));
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    document.addEventListener('mouseover', handleOver);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [isInteractive]);

  if (!isInteractive) {
    return null;
  }

  const ringScale = isPressed ? 0.82 : isHoveringInteractive ? 1.55 : 1;

  return (
    <>
      {/* Cursor-following atmospheric spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          x: glowX,
          y: glowY,
          opacity: isVisible ? 1 : 0,
          background: isDark
            ? 'radial-gradient(circle, rgba(239, 224, 188, 0.075) 0%, rgba(213, 180, 116, 0.025) 36%, transparent 70%)'
            : 'radial-gradient(circle, rgba(140, 107, 47, 0.085) 0%, rgba(140, 107, 47, 0.025) 38%, transparent 70%)',
        }}
      />

      {/* Trailing outer ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/65 will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          width: 34,
          height: 34,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHoveringInteractive
            ? 'var(--accent-soft)'
            : 'transparent',
        }}
        animate={{ scale: ringScale }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      />

      {/* Precision center dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[71] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-strong)] will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? (isHoveringInteractive ? 0.35 : 1) : 0,
        }}
      />
    </>
  );
}
