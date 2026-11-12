import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const EASE_CURTAIN = [0.76, 0, 0.24, 1];
const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Animated preloader sequence: 000%->100% telemetry counter,
 * horizon charge filament, and split-aperture curtain reveal.
 */
export function Preloader({ isVisible, onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const durationMs = 1150;
    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    const doneTimer = window.setTimeout(onComplete, durationMs + 180);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(doneTimer);
    };
  }, [isVisible, onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  const formattedProgress = String(progress).padStart(3, '0');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.8 } }}
        >
          {/* Upper shutter */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 border-b border-[#D5B474]/15 bg-[#050505]"
            initial={{ y: '0%' }}
            exit={{
              y: '-100%',
              transition: { duration: 0.78, ease: EASE_CURTAIN },
            }}
          />

          {/* Lower shutter */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 border-t border-[#D5B474]/15 bg-[#050505]"
            initial={{ y: '0%' }}
            exit={{
              y: '100%',
              transition: { duration: 0.78, ease: EASE_CURTAIN },
            }}
          />

          {/* Center seam energy flash */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#EFE0BC] to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 0.28, opacity: 0.4 }}
            exit={{
              scaleX: 1.15,
              opacity: 0,
              transition: { duration: 0.55, ease: EASE_CINEMATIC },
            }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
          />

          {/* Counter & progress bar */}
          <motion.div
            className="relative z-10 flex w-60 flex-col gap-3 sm:w-72"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.28, ease: EASE_CINEMATIC },
            }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-[#969085]">
              <span>sakthikumar.com</span>
              <span className="text-xs tabular-nums text-[#D5B474]">
                {formattedProgress}%
              </span>
            </div>

            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <div
                className="h-full origin-left bg-gradient-to-r from-[#D5B474]/40 via-[#EFE0BC] to-[#D5B474] transition-transform duration-75"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.26em] text-[#6E6961]">
              <span>Preparing Entry</span>
              <span>ED. 2026</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
