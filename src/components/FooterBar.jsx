import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Minimal bottom band displaying the flanked domain signature and copyright notice.
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
      className="relative z-20 flex flex-col items-center gap-3 px-6 pb-8 pt-2 text-center sm:pb-11"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={revealTransition(1.75)}
    >
      <div className="group flex items-center gap-3.5 sm:gap-5">
        <motion.span
          aria-hidden="true"
          className="h-px w-6 origin-right bg-gradient-to-r from-transparent to-[#D5B474]/45 transition-all duration-500 group-hover:w-10 group-hover:to-[#D5B474]/80 sm:w-10 sm:group-hover:w-14"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
          transition={revealTransition(1.85, 0.9)}
        />
        <a
          href="https://sakthikumar.com"
          className="relative font-sans text-xs font-medium uppercase tracking-[0.32em] pl-[0.32em] text-[#D5B474] transition-colors duration-300 hover:text-[#EFE0BC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474] sm:text-[13px]"
        >
          sakthikumar.com
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-0 h-px w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#D5B474]/80 to-transparent transition-transform duration-300 group-hover:scale-x-100"
          />
        </a>
        <motion.span
          aria-hidden="true"
          className="h-px w-6 origin-left bg-gradient-to-l from-transparent to-[#D5B474]/45 transition-all duration-500 group-hover:w-10 group-hover:to-[#D5B474]/80 sm:w-10 sm:group-hover:w-14"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
          transition={revealTransition(1.85, 0.9)}
        />
      </div>

      <p className="font-sans text-[10px] tracking-[0.16em] text-[#857F75] sm:text-[11px]">
        &copy; {currentYear} Sakthi Kumar. All rights reserved.
      </p>
    </motion.footer>
  );
}
