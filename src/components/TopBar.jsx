import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Minimal widescreen top strip anchoring the live status indicator
 * and subtle launch-phase telemetry without boxing the viewport.
 */
export function TopBar({ isReady }) {
  const prefersReducedMotion = useReducedMotion();

  const revealTransition = (delay, duration = 0.85) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay, ease: EASE_CINEMATIC };

  return (
    <motion.header
      className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={revealTransition(0.1)}
    >
      {/* Minimal live status indicator */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[#D5B474]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D5B474]" />
        </span>
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#D5B474] sm:text-[11px] sm:tracking-[0.26em]">
          Something big is in progress
        </span>
      </div>

      {/* Subtle right-aligned futuristic phase marker */}
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.26em] text-[#8F8A80]/80 sm:inline-block">
        01 // Init
      </span>

      {/* Subtle top hairline separator */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 -bottom-3 h-px origin-left bg-gradient-to-r from-[#D5B474]/20 via-white/[0.06] to-transparent sm:inset-x-10"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
        transition={revealTransition(0.25, 1.1)}
      />
    </motion.header>
  );
}

