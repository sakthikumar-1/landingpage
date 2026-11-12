import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];
const BRAND_NAME = 'SAKTHI KUMAR';
const MANIFESTO_BEATS = [
  'A new chapter.',
  'A new vision.',
  'A new beginning.',
];

/**
 * Centered full-screen hero centerpiece featuring a multi-beat cinematic buildup:
 * status pill, character-staggered title reveal, locking gold separator,
 * primary launch announcement, and rhythmic three-beat manifesto.
 */
export function HeroSection({ isReady, heroX, heroY, isInteractive }) {
  const prefersReducedMotion = useReducedMotion();

  const revealTransition = (delay, duration = 0.9) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay, ease: EASE_CINEMATIC };

  return (
    <motion.section
      aria-label="Sakthi Kumar launch announcement"
      className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-10"
      style={isInteractive ? { x: heroX, y: heroY } : undefined}
    >
      {/* Beat 1: Minimal Status Indicator */}
      <motion.div
        className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#D5B474]/22 bg-[#0C0B0A]/85 px-4 py-1.5 shadow-[0_0_24px_rgba(213,180,116,0.06)] backdrop-blur-sm sm:mb-9"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={revealTransition(0.08, 0.8)}
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[#D5B474]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D5B474]" />
        </span>
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#D5B474] sm:text-[11px] sm:tracking-[0.26em]">
          Something big is in progress
        </span>
      </motion.div>

      {/* Beat 2: Oversized Brand Name with Character-Wave Masked Reveal */}
      <h1
        aria-label={BRAND_NAME}
        className="font-display flex flex-nowrap items-center justify-center whitespace-nowrap py-1 text-[clamp(1.85rem,7.8vw,6.8rem)] font-normal uppercase leading-[0.95] tracking-[0.07em] pl-[0.07em] sm:tracking-[0.11em] sm:pl-[0.11em]"
      >
        {BRAND_NAME.split('').map((char, index) => {
          if (char === ' ') {
            return (
              <span
                key={`space-${index}`}
                aria-hidden="true"
                className="inline-block w-[0.28em]"
              />
            );
          }

          return (
            <span
              key={`char-${index}`}
              aria-hidden="true"
              className="inline-block overflow-hidden"
            >
              <motion.span
                className="hero-letter-gradient inline-block will-change-transform"
                initial={
                  prefersReducedMotion ? false : { y: '115%', opacity: 0 }
                }
                animate={
                  isReady ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }
                }
                transition={revealTransition(0.22 + index * 0.028, 0.88)}
              >
                {char}
              </motion.span>
            </span>
          );
        })}
      </h1>

      {/* Beat 3: Locking Diamond & Animated Champagne-Gold Line Separator */}
      <div className="relative my-6 flex w-full max-w-[18rem] items-center justify-center sm:my-8 sm:max-w-[24rem]">
        <motion.div
          className="relative h-px w-full origin-center overflow-hidden bg-gradient-to-r from-transparent via-[#D5B474]/65 to-transparent"
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={
            isReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={revealTransition(0.72, 0.95)}
        >
          <span className="animate-gold-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFF4D6] to-transparent" />
        </motion.div>
        <motion.span
          aria-hidden="true"
          className="absolute h-2 w-2 border border-[#D5B474]/85 bg-[#050505] shadow-[0_0_12px_rgba(213,180,116,0.35)]"
          initial={
            prefersReducedMotion
              ? { rotate: 45 }
              : { scale: 0, rotate: -45, opacity: 0 }
          }
          animate={
            isReady
              ? { scale: 1, rotate: 45, opacity: 1 }
              : { scale: 0, rotate: -45, opacity: 0 }
          }
          transition={revealTransition(0.68, 0.75)}
        />
      </div>

      {/* Beat 4: Primary Launch Announcement */}
      <div className="overflow-hidden">
        <motion.p
          className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#EFE0BC] sm:text-xs sm:tracking-[0.3em] md:text-sm md:tracking-[0.36em]"
          initial={
            prefersReducedMotion ? false : { y: '105%', opacity: 0, scale: 0.98 }
          }
          animate={
            isReady
              ? { y: '0%', opacity: 1, scale: 1 }
              : { y: '105%', opacity: 0, scale: 0.98 }
          }
          transition={revealTransition(0.92, 0.9)}
        >
          THE KING&apos;S ENTRY IS COMING SOON.
        </motion.p>
      </div>

      {/* Beat 5: Three-Beat Editorial Manifesto Cadence */}
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-lg italic tracking-[0.04em] text-[#A8A196] sm:mt-4.5 sm:text-xl md:text-2xl">
        {MANIFESTO_BEATS.map((phrase, index) => (
          <span key={phrase} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? false : { y: '110%', opacity: 0 }}
              animate={
                isReady ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }
              }
              transition={revealTransition(1.18 + index * 0.24, 0.8)}
            >
              {phrase}
            </motion.span>
          </span>
        ))}
      </p>
    </motion.section>
  );
}
