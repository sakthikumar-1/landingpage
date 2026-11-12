import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const HeroScene3D = lazy(() => import('./HeroScene3D'));

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];
const BRAND_WORDS = ['SAKTHI', 'KUMAR'];
const MANIFESTO_BEATS = [
  'A NEW CHAPTER.',
  'A NEW VISION.',
  'A NEW BEGINNING.',
];

/**
 * Full-screen 3D WebGL hero stage with split-character kinetic entrance,
 * scroll-linked typography parallax, and magnetic explore cue.
 */
export function HeroSection({
  isReady,
  heroX,
  heroY,
  isInteractive,
  pointerRef,
  onExplore,
}) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const wordLeftRef = useRef(null);
  const wordRightRef = useRef(null);
  const sublockRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(wordLeftRef.current, {
        xPercent: -10,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(wordRightRef.current, {
        xPercent: 10,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(sublockRef.current, {
        y: -48,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const revealTransition = (delay, duration = 0.85) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay, ease: EASE_CINEMATIC };

  let charCursor = 0;

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Sakthi Kumar Hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between overflow-hidden px-5 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-28"
    >
      {/* Lazy-loaded 3D WebGL centerpiece */}
      <Suspense fallback={null}>
        <HeroScene3D pointerRef={pointerRef} />
      </Suspense>

      {/* Soft obsidian readability cushion behind hero typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 72% 48% at 50% 48%, rgba(5, 5, 5, 0.72) 0%, rgba(5, 5, 5, 0.36) 55%, transparent 100%)',
        }}
      />

      {/* Top status line */}
      <motion.div
        className="relative z-20 flex items-center gap-2.5 rounded-full border border-[#D5B474]/22 bg-[#0C0C0E]/75 px-4 py-1.5 backdrop-blur-sm"
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

      {/* Center monumental typography overlapping the 3D artifact */}
      <motion.div
        className="relative z-20 my-auto flex w-full max-w-[94vw] flex-col items-center text-center"
        style={isInteractive ? { x: heroX, y: heroY } : undefined}
      >
        <h1
          aria-label="SAKTHI KUMAR"
          className="font-display flex flex-col items-center justify-center gap-y-0.5 py-2 text-[clamp(2.15rem,11vw,3.6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.025em] sm:flex-row sm:gap-x-[0.26em] sm:text-[clamp(2.3rem,6.1vw,6rem)]"
        >
          {BRAND_WORDS.map((word, wordIdx) => (
            <span
              key={word}
              ref={wordIdx === 0 ? wordLeftRef : wordRightRef}
              aria-hidden="true"
              className="inline-flex will-change-transform"
            >
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
                          : { y: '115%', opacity: 0, filter: 'blur(8px)' }
                      }
                      animate={
                        isReady
                          ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                          : { y: '115%', opacity: 0, filter: 'blur(8px)' }
                      }
                      transition={revealTransition(0.16 + index * 0.028, 0.88)}
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div ref={sublockRef} className="flex flex-col items-center">
          {/* Kinetic gold horizon divider */}
          <div className="relative my-5 flex w-48 items-center sm:my-7 sm:w-80">
            <motion.div
              className="relative h-px w-full origin-center overflow-hidden bg-gradient-to-r from-transparent via-[#D5B474]/80 to-transparent"
              initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
              animate={
                isReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={revealTransition(0.6, 0.9)}
            >
              <span className="animate-horizon-pulse absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFF7E2] to-transparent" />
            </motion.div>
          </div>

          {/* Primary launch announcement */}
          <div className="overflow-hidden">
            <motion.p
              className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#EFE0BC] sm:text-sm sm:tracking-[0.34em]"
              initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
              animate={
                isReady ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }
              }
              transition={revealTransition(0.78, 0.85)}
            >
              THE KING&apos;S ENTRY IS COMING SOON.
            </motion.p>
          </div>

          {/* Supporting rhythmic statement */}
          <p className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#B8B1A5] sm:mt-4 sm:text-xs sm:tracking-[0.24em]">
            {MANIFESTO_BEATS.map((phrase, index) => (
              <span key={phrase} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={
                    prefersReducedMotion ? false : { y: '110%', opacity: 0 }
                  }
                  animate={
                    isReady
                      ? { y: '0%', opacity: 1 }
                      : { y: '110%', opacity: 0 }
                  }
                  transition={revealTransition(0.98 + index * 0.2, 0.78)}
                >
                  {phrase}
                </motion.span>
              </span>
            ))}
          </p>
        </div>
      </motion.div>

      {/* Bottom magnetic scroll trigger */}
      <motion.div
        className="relative z-20"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={revealTransition(1.35, 0.8)}
      >
        <MagneticButton
          type="button"
          onClick={() => onExplore?.('#overview')}
          className="group flex flex-col items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#969085] transition-colors duration-300 group-hover:text-[#EFE0BC]">
            Scroll to explore
          </span>
          <span className="relative h-8 w-px overflow-hidden bg-[#D5B474]/25">
            <span className="animate-scroll-line absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[#EFE0BC] to-transparent" />
          </span>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
