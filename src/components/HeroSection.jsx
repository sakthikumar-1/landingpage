import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];
const BRAND_WORDS = ['SAKTHI', 'KUMAR'];
const MANIFESTO_BEATS = [
  'A new chapter.',
  'A new vision.',
  'A new beginning.',
];

/**
 * Monumental centerpiece built around architectural Syne typography,
 * blur-to-sharp masked kinetic reveal, laser gold horizon line, and rhythmic build-up.
 */
export function HeroSection({ isReady, heroX, heroY, isInteractive }) {
  const prefersReducedMotion = useReducedMotion();

  const revealTransition = (delay, duration = 0.85) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay, ease: EASE_CINEMATIC };

  let charCursor = 0;

  return (
    <motion.section
      aria-label="Sakthi Kumar launch announcement"
      className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-10"
      style={isInteractive ? { x: heroX, y: heroY } : undefined}
    >
      {/* Monumental Architectural Title */}
      <h1
        aria-label="SAKTHI KUMAR"
        className="font-display flex flex-nowrap items-center justify-center gap-x-[0.28em] whitespace-nowrap py-2 text-[clamp(1.65rem,6.8vw,6.2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]"
      >
        {BRAND_WORDS.map((word) => (
          <span key={word} aria-hidden="true" className="inline-flex">
            {word.split('').map((char) => {
              const index = charCursor++;
              return (
                <span
                  key={`${word}-${index}`}
                  className="inline-block overflow-hidden py-1"
                >
                  <motion.span
                    className="monolith-text inline-block will-change-transform"
                    initial={
                      prefersReducedMotion
                        ? false
                        : { y: '112%', opacity: 0, filter: 'blur(8px)' }
                    }
                    animate={
                      isReady
                        ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                        : { y: '112%', opacity: 0, filter: 'blur(8px)' }
                    }
                    transition={revealTransition(0.18 + index * 0.03, 0.88)}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      {/* Kinetic Champagne-Gold Horizon Separator */}
      <div className="relative my-6 flex w-full max-w-[17rem] items-center sm:my-8 sm:max-w-[28rem]">
        <motion.span
          aria-hidden="true"
          className="h-1.5 w-px bg-[#D5B474]/60"
          initial={prefersReducedMotion ? false : { opacity: 0, scaleY: 0 }}
          animate={
            isReady ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }
          }
          transition={revealTransition(0.68, 0.5)}
        />
        <motion.div
          className="relative h-px flex-1 origin-center overflow-hidden bg-gradient-to-r from-[#D5B474]/40 via-[#D5B474]/85 to-[#D5B474]/40"
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={
            isReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={revealTransition(0.62, 0.9)}
        >
          <span className="animate-horizon-pulse absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFF7E2] to-transparent" />
        </motion.div>
        <motion.span
          aria-hidden="true"
          className="h-1.5 w-px bg-[#D5B474]/60"
          initial={prefersReducedMotion ? false : { opacity: 0, scaleY: 0 }}
          animate={
            isReady ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }
          }
          transition={revealTransition(0.68, 0.5)}
        />
      </div>

      {/* Primary Announcement */}
      <div className="overflow-hidden">
        <motion.p
          className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#EFE0BC] sm:text-xs sm:tracking-[0.32em] md:text-sm md:tracking-[0.38em]"
          initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
          animate={
            isReady ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }
          }
          transition={revealTransition(0.84, 0.85)}
        >
          THE KING&apos;S ENTRY IS COMING SOON.
        </motion.p>
      </div>

      {/* Three-Beat Futuristic Sub-statement */}
      <p className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-sm font-light tracking-[0.03em] text-[#9E988E] sm:mt-4 sm:text-base md:text-lg">
        {MANIFESTO_BEATS.map((phrase, index) => (
          <span key={phrase} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? false : { y: '110%', opacity: 0 }}
              animate={
                isReady ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }
              }
              transition={revealTransition(1.08 + index * 0.22, 0.78)}
            >
              {phrase}
            </motion.span>
          </span>
        ))}
      </p>
    </motion.section>
  );
}
