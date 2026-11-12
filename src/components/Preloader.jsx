import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const EASE_CURTAIN = [0.76, 0, 0.24, 1];
const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Theme-aware preloader sequence: 000%->100% telemetry counter,
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
            className="absolute inset-x-0 top-0 h-1/2 border-b border-[var(--border-accent)] bg-[var(--bg-primary)]"
            initial={{ y: '0%' }}
            exit={{
              y: '-100%',
              transition: { duration: 0.78, ease: EASE_CURTAIN },
            }}
          />

          {/* Lower shutter */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 border-t border-[var(--border-accent)] bg-[var(--bg-primary)]"
            initial={{ y: '0%' }}
            exit={{
              y: '100%',
              transition: { duration: 0.78, ease: EASE_CURTAIN },
            }}
          />

          {/* Center seam flash */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 0.28, opacity: 0.45 }}
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
            <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
              <span>sakthikumar.com</span>
              <span className="text-xs tabular-nums text-[var(--accent)]">
                {formattedProgress}%
              </span>
            </div>

            <div className="relative h-px w-full overflow-hidden bg-[var(--border-subtle)]">
              <div
                className="h-full origin-left bg-gradient-to-r from-[var(--accent)]/50 via-[var(--accent-strong)] to-[var(--accent)] transition-transform duration-75"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.26em] text-[var(--text-muted)]">
              <span>Preparing Entry</span>
              <span>ED. 2026</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
