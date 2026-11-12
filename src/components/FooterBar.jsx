import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Minimal widescreen footer anchoring the official domain and copyright notice.
 */
export function FooterBar({ isReady }) {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const revealTransition = (delay, duration = 0.85) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay, ease: EASE_CINEMATIC };

  return (
    <motion.footer
      className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-2.5 px-6 pb-6 pt-4 text-center sm:flex-row sm:px-10 sm:pb-8 sm:text-left"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={revealTransition(1.55)}
    >
      {/* Subtle widescreen top divider */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px origin-right bg-gradient-to-l from-[#D5B474]/20 via-white/[0.06] to-transparent sm:inset-x-10"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
        transition={revealTransition(1.45, 1.0)}
      />

      <a
        href="https://sakthikumar.com"
        className="group relative font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#D5B474] transition-colors duration-300 hover:text-[#EFE0BC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
      >
        sakthikumar.com
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#D5B474]/80 transition-transform duration-300 group-hover:scale-x-100"
        />
      </a>

      <p className="font-sans text-[11px] tracking-[0.12em] text-[#7E7970]">
        &copy; {currentYear} Sakthi Kumar. All rights reserved.
      </p>
    </motion.footer>
  );
}
