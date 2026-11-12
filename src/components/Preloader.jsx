import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const EASE_CURTAIN = [0.76, 0, 0.24, 1];
const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Theatrical buildup preloader: rotating champagne-gold diamond crest,
 * SK monogram, precision filament charge, and split-curtain reveal.
 */
export function Preloader({ isVisible, onComplete }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;

    const durationMs = prefersReducedMotion ? 0 : 1350;
    const timer = window.setTimeout(onComplete, durationMs);
    return () => window.clearTimeout(timer);
  }, [isVisible, onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.85 } }}
        >
          {/* Upper split curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 border-b border-[#D5B474]/20 bg-[#050505]"
            initial={{ y: '0%' }}
            exit={{
              y: '-100%',
              transition: { duration: 0.82, ease: EASE_CURTAIN },
            }}
          />

          {/* Lower split curtain */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 border-t border-[#D5B474]/20 bg-[#050505]"
            initial={{ y: '0%' }}
            exit={{
              y: '100%',
              transition: { duration: 0.82, ease: EASE_CURTAIN },
            }}
          />

          {/* Center seam light burst right as curtains part */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#EFE0BC]/80 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 0.35, opacity: 0.35 }}
            exit={{
              scaleX: 1.1,
              opacity: 0,
              transition: { duration: 0.65, ease: EASE_CINEMATIC },
            }}
            transition={{ duration: 1.0, ease: EASE_CINEMATIC }}
          />

          {/* Monogram crest + filament charge */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              transition: { duration: 0.36, ease: EASE_CINEMATIC },
            }}
            transition={{ duration: 0.55, ease: EASE_CINEMATIC }}
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              <motion.span
                className="absolute inset-0 border border-[#D5B474]/40"
                initial={{ rotate: 0, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 45, scale: 1, opacity: 1 }}
                transition={{ duration: 0.85, ease: EASE_CINEMATIC }}
              />
              <motion.span
                className="absolute inset-1.5 border border-[#D5B474]/15"
                initial={{ rotate: 45, scale: 1.15, opacity: 0 }}
                animate={{ rotate: 45, scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE_CINEMATIC }}
              />
              <span className="font-display text-xl tracking-[0.26em] pl-[0.26em] text-[#EFE0BC] sm:text-2xl">
                SK
              </span>
            </div>

            <div className="relative h-px w-32 overflow-hidden bg-[#D5B474]/15">
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-[#D5B474]/40 via-[#EFE0BC] to-[#D5B474]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.15, delay: 0.1, ease: EASE_CINEMATIC }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
