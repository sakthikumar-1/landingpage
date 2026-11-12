import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

const CORNER_POSITIONS = [
  'top-0 left-0 border-t border-l',
  'top-0 right-0 border-t border-r',
  'bottom-0 left-0 border-b border-l',
  'bottom-0 right-0 border-b border-r',
];

/**
 * Thin champagne-gold perimeter framing that draws from center outward,
 * accented with precision corner brackets, meridian ticks, and subtle counter-parallax.
 */
export function ArchitecturalFrame({ isReady, frameX, frameY, isInteractive }) {
  const prefersReducedMotion = useReducedMotion();

  const lineTransition = (delay) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: 1.05, delay, ease: EASE_CINEMATIC };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-3 z-10 sm:inset-5 md:inset-8"
      style={isInteractive ? { x: frameX, y: frameY } : undefined}
    >
      {/* Top & bottom hairline draw from center */}
      <motion.span
        className="absolute inset-x-0 top-0 h-px origin-center bg-[#D5B474]/[0.11]"
        initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={
          isReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={lineTransition(0.2)}
      />
      <motion.span
        className="absolute inset-x-0 bottom-0 h-px origin-center bg-[#D5B474]/[0.11]"
        initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={
          isReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={lineTransition(0.2)}
      />

      {/* Left & right hairline draw from center */}
      <motion.span
        className="absolute inset-y-0 left-0 w-px origin-center bg-[#D5B474]/[0.11]"
        initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
        animate={
          isReady ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
        }
        transition={lineTransition(0.32)}
      />
      <motion.span
        className="absolute inset-y-0 right-0 w-px origin-center bg-[#D5B474]/[0.11]"
        initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
        animate={
          isReady ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
        }
        transition={lineTransition(0.32)}
      />

      {/* Top & bottom center meridian ticks */}
      <motion.span
        className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-[#D5B474]/40"
        initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
        animate={
          isReady ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
        }
        transition={lineTransition(0.55)}
      />
      <motion.span
        className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-[#D5B474]/40"
        initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
        animate={
          isReady ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
        }
        transition={lineTransition(0.55)}
      />

      {/* Precision champagne-gold corner brackets */}
      {CORNER_POSITIONS.map((positionClass, index) => (
        <motion.span
          key={index}
          className={`absolute h-3 w-3 border-[#D5B474]/50 sm:h-4 sm:w-4 ${positionClass}`}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
          animate={
            isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.75, delay: 0.55 + index * 0.05, ease: EASE_CINEMATIC }
          }
        />
      ))}
    </motion.div>
  );
}
