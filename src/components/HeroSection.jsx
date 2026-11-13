import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { CrownInsignia } from './CrownInsignia';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const HeroScene3D = lazy(() => import('./HeroScene3D'));

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];
const BRAND_WORDS = ['SAKTHI', 'KUMAR.'];
const ANNOUNCEMENT_WORDS = ['SOMETHING', 'GREATER', 'IS', 'COMING.'];
const TAGLINE_PHRASES = ['Beyond What Exists.', "Built for What's Next."];

/**
 * Section 01 (Overview): Full-screen 3D WebGL stage with split-character kinetic
 * reveal, scroll-linked typography drift, and theme-adaptive contrast cushion.
 */
export function HeroSection({
  isReady,
  heroX,
  heroY,
  isInteractive,
  pointerRef,
  onExplore,
}) {
  const { theme, isDark } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const wordLeftRef = useRef(null);
  const wordRightRef = useRef(null);
  const sublockRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(wordLeftRef.current, {
        xPercent: -9,
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
        xPercent: 9,
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
        y: -46,
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
      id="overview"
      ref={sectionRef}
      aria-label="Sakthi Kumar Overview"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between overflow-hidden px-5 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-28"
    >
      {/* Lazy-loaded 3D WebGL backdrop */}
      <Suspense fallback={null}>
        <HeroScene3D pointerRef={pointerRef} theme={theme} />
      </Suspense>

      {/* Theme-adapted readability cushion behind typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 65% 38% at 50% 48%, rgba(4, 4, 6, 0.40) 0%, rgba(4, 4, 6, 0.15) 55%, transparent 100%)'
            : 'radial-gradient(ellipse 65% 38% at 50% 48%, rgba(241, 243, 247, 0.75) 0%, rgba(241, 243, 247, 0.28) 55%, transparent 100%)',
        }}
      />

      {/* Status indicator */}
      <motion.div
        className="theme-surface relative z-20 flex items-center gap-2.5 rounded-full border border-[var(--border-accent)] bg-[var(--bg-pill)] px-4 py-1.5 backdrop-blur-sm"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={revealTransition(0.08, 0.8)}
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--accent)]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        </span>
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)] sm:text-[11px] sm:tracking-[0.24em]">
          Something big is in progress.
        </span>
      </motion.div>

      {/* Monumental identity lockup */}
      <motion.div
        className="relative z-20 my-auto flex w-full max-w-[94vw] flex-col items-center text-center"
        style={isInteractive ? { x: heroX, y: heroY } : undefined}
      >
        <CrownInsignia isReady={isReady} />

        {/* Eyebrow */}
        <div className="mb-2.5 overflow-hidden sm:mb-3">
          <motion.p
            className="font-mono text-[10px] font-medium uppercase tracking-[0.34em] text-[var(--text-muted)] sm:text-[11px] sm:tracking-[0.42em]"
            initial={prefersReducedMotion ? false : { y: '110%', opacity: 0 }}
            animate={
              isReady ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }
            }
            transition={revealTransition(0.72, 0.72)}
          >
            A NEW ERA IS TAKING SHAPE
          </motion.p>
        </div>

        <h1
          aria-label="SAKTHI KUMAR."
          className="font-display flex flex-col items-center justify-center gap-y-0.5 py-2 text-[clamp(2.1rem,10.6vw,3.5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.025em] sm:flex-row sm:gap-x-[0.25em] sm:text-[clamp(2.2rem,5.9vw,5.8rem)]"
        >
          <span className="sr-only">Sakthi Kumar.</span>
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
                      transition={revealTransition(0.88 + index * 0.028, 0.88)}
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
          {/* Kinetic gold horizon separator */}
          <div className="relative my-5 flex w-48 items-center sm:my-6 sm:w-80">
            <motion.div
              className="relative h-px w-full origin-center overflow-hidden bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
              initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
              animate={
                isReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={revealTransition(1.34, 0.88)}
            >
              <span className="animate-horizon-pulse absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--accent-strong)] to-transparent" />
            </motion.div>
          </div>

          {/* Primary announcement */}
          <h2
            aria-label="SOMETHING GREATER IS COMING."
            className="flex flex-wrap items-center justify-center gap-x-[0.42em] gap-y-1 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)] sm:text-sm sm:tracking-[0.34em]"
          >
            <span className="sr-only">Something Greater Is Coming.</span>
            {ANNOUNCEMENT_WORDS.map((word, index) => (
              <span key={word} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  aria-hidden="true"
                  className={`inline-block ${
                    word === 'GREATER' ? 'text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent-soft)]' : ''
                  }`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { y: '110%', opacity: 0, filter: 'blur(4px)' }
                  }
                  animate={
                    isReady
                      ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                      : { y: '110%', opacity: 0, filter: 'blur(4px)' }
                  }
                  transition={revealTransition(1.46 + index * 0.09, 0.78)}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Personal tagline */}
          <p className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-sm font-normal tracking-[0.02em] text-[var(--text-secondary)] sm:mt-4 sm:text-base">
            {TAGLINE_PHRASES.map((phrase, index) => (
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
                  transition={revealTransition(1.85 + index * 0.18, 0.78)}
                >
                  {phrase}
                </motion.span>
              </span>
            ))}
          </p>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="relative z-20"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={revealTransition(2.1, 0.8)}
      >
        <MagneticButton
          type="button"
          onClick={() => onExplore?.('#about')}
          className="group flex flex-col items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
            Scroll to explore
          </span>
          <span className="relative h-8 w-px overflow-hidden bg-[var(--border-accent)]">
            <span className="animate-scroll-line absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
          </span>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
