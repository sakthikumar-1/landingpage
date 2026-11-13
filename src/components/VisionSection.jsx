import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    index: '01',
    category: 'MINDSET',
    name: 'CLARITY',
    statement:
      'Think independently, learn continuously and act with purpose.',
  },
  {
    index: '02',
    category: 'CHARACTER',
    name: 'INTEGRITY',
    statement: 'Stay authentic, consistent and grounded.',
  },
  {
    index: '03',
    category: 'AMBITION',
    name: 'EVOLUTION',
    statement: 'Never stop exploring, creating and becoming better.',
  },
];

/**
 * Section 03 (Vision): Dual opposing scroll-scrubbed marquees,
 * continuously rotating orbital dial, and auto-cycling interactive principle stage.
 */
export function VisionSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const marqueeTopRef = useRef(null);
  const marqueeBottomRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Subtle auto-cycle through the three principles unless hovered/focused
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRINCIPLES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isPaused]);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        marqueeTopRef.current,
        { xPercent: 8 },
        {
          xPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        marqueeBottomRef.current,
        { xPercent: -12 },
        {
          xPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.from('[data-vision-row]', {
        x: 42,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activePrinciple = PRINCIPLES[activeIndex];

  return (
    <section
      id="vision"
      ref={sectionRef}
      aria-labelledby="vision-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="theme-surface relative z-20 overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-5 py-24 sm:px-10 sm:py-36"
    >
      {/* Subtle depth lighting behind the marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-3/4 -translate-x-1/2 rounded-full bg-[var(--accent-soft)] opacity-40 blur-[110px]"
      />

      {/* Dual opposing scroll-scrubbed kinetic marquees */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none space-y-1 overflow-hidden"
      >
        <div
          ref={marqueeTopRef}
          className="vision-marquee-text whitespace-nowrap font-display text-[clamp(3.6rem,11vw,9.5rem)] font-extrabold uppercase leading-none tracking-[-0.04em]"
        >
          CLARITY · INTEGRITY · EVOLUTION · CLARITY · INTEGRITY ·
        </div>
        <div
          ref={marqueeBottomRef}
          className="vision-marquee-text whitespace-nowrap font-display text-[clamp(3.6rem,11vw,9.5rem)] font-extrabold uppercase leading-none tracking-[-0.04em]"
        >
          MINDSET · CHARACTER · AMBITION · MINDSET · CHARACTER ·
        </div>
      </div>

      <div className="relative mx-auto -mt-12 grid w-full max-w-[1440px] grid-cols-1 gap-14 sm:-mt-20 lg:grid-cols-12 lg:gap-16">
        {/* Left kinetic orbital dial */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
              <span>03</span>
              <span className="h-px w-8 bg-[var(--accent)]/50" />
              <span>Vision</span>
            </div>

            <h2
              id="vision-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl"
            >
              Three principles.{' '}
              <span className="text-[var(--accent)]">One direction.</span>
            </h2>

            {/* Rotating dual orbital dial */}
            <div className="mt-10 flex items-center gap-7">
              <div className="relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-44 sm:w-44">
                <span
                  aria-hidden="true"
                  className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-[var(--border-accent)]"
                />
                <span
                  aria-hidden="true"
                  className="animate-spin-reverse-slow absolute inset-3 rounded-full border border-[var(--border-subtle)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-6 rounded-full bg-[var(--accent-soft)]/50 blur-xl"
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activePrinciple.index}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, scale: 0.78, rotate: -8 }
                    }
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 0, scale: 1.15, rotate: 8 }
                    }
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative font-display text-5xl font-extrabold tracking-tight text-[var(--accent)] sm:text-6xl"
                  >
                    {activePrinciple.index}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--text-muted)]">
                  Active Direction
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePrinciple.name}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 6 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion ? undefined : { opacity: 0, y: -6 }
                    }
                    transition={{ duration: 0.28 }}
                  >
                    <p className="font-display text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                      {activePrinciple.name}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      {activePrinciple.category}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Right kinetic selector bands */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {PRINCIPLES.map((item, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <motion.button
                key={item.index}
                type="button"
                data-vision-row
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => {
                  setIsPaused(true);
                  setActiveIndex(idx);
                }}
                onBlur={() => setIsPaused(false)}
                whileHover={prefersReducedMotion ? undefined : { x: 6 }}
                className="theme-surface group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/65 p-7 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:p-9"
              >
                {isSelected && (
                  <motion.span
                    layoutId="vision-active-surface"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-[var(--accent)]/60 bg-[var(--accent-soft)]/45"
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  />
                )}

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                      <span>{item.index}</span>
                      <span className="h-px w-5 bg-[var(--accent)]/50" />
                      <span>
                        {item.category} / {item.name}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full transition-transform duration-300 ${
                        isSelected
                          ? 'scale-110 bg-[var(--accent)]'
                          : 'scale-75 bg-[var(--border-subtle)]'
                      }`}
                    />
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-[-0.015em] text-[var(--text-primary)] sm:text-3xl">
                    {item.name}
                  </h3>

                  <p className="max-w-xl font-sans text-base font-light leading-relaxed text-[var(--text-secondary)]">
                    {item.statement}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
