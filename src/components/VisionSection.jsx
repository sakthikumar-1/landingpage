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

const ROW_ONE_ITEMS = [
  'CLARITY',
  'INTEGRITY',
  'EVOLUTION',
  'CLARITY',
  'INTEGRITY',
  'EVOLUTION',
];

const ROW_TWO_ITEMS = [
  'MINDSET',
  'CHARACTER',
  'AMBITION',
  'MINDSET',
  'CHARACTER',
  'AMBITION',
];

/**
 * Section 03 (Vision): Continuous auto-moving kinetic marquee ticker,
 * rotating orbital dial, and auto-cycling interactive principle stage.
 */
export function VisionSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
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
      className="theme-surface relative z-20 overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-5 py-20 sm:px-10 sm:py-32"
    >
      {/* Subtle depth lighting behind the marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-3/4 -translate-x-1/2 rounded-full bg-[var(--accent-soft)] opacity-40 blur-[120px]"
      />

      {/* Section Header / Eyebrow (cleanly above marquee) */}
      <div className="mx-auto w-full max-w-[1440px] mb-8 sm:mb-12">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
          <span>03</span>
          <span className="h-px w-8 bg-[var(--accent)]/50" />
          <span>Vision</span>
        </div>
      </div>

      {/* Dual opposing continuous auto-moving marquee ticker (Cleanly ABOVE three principles) */}
      <div
        aria-hidden="true"
        className="relative -mx-5 overflow-hidden select-none py-2 sm:-mx-10"
      >
        {/* Left edge fade gradient mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent sm:w-36" />
        {/* Right edge fade gradient mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent sm:w-36" />

        <div className="space-y-3 sm:space-y-4">
          {/* Row 1: Moves Left smoothly and infinitely */}
          <div className="flex w-max animate-marquee-left">
            <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
              {ROW_ONE_ITEMS.map((item, idx) => (
                <span
                  key={`r1-a-${idx}`}
                  className="inline-flex items-center gap-6 sm:gap-10"
                >
                  <span className="vision-marquee-text font-display text-[clamp(2.6rem,7.5vw,6rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]/60 sm:h-2.5 sm:w-2.5"
                  />
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
              {ROW_ONE_ITEMS.map((item, idx) => (
                <span
                  key={`r1-b-${idx}`}
                  className="inline-flex items-center gap-6 sm:gap-10"
                >
                  <span className="vision-marquee-text font-display text-[clamp(2.6rem,7.5vw,6rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]/60 sm:h-2.5 sm:w-2.5"
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right smoothly and infinitely */}
          <div className="flex w-max animate-marquee-right">
            <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
              {ROW_TWO_ITEMS.map((item, idx) => (
                <span
                  key={`r2-a-${idx}`}
                  className="inline-flex items-center gap-6 sm:gap-10"
                >
                  <span className="vision-marquee-text font-display text-[clamp(2.6rem,7.5vw,6rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]/60 sm:h-2.5 sm:w-2.5"
                  />
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
              {ROW_TWO_ITEMS.map((item, idx) => (
                <span
                  key={`r2-b-${idx}`}
                  className="inline-flex items-center gap-6 sm:gap-10"
                >
                  <span className="vision-marquee-text font-display text-[clamp(2.6rem,7.5vw,6rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]/60 sm:h-2.5 sm:w-2.5"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content grid: Three principles. One direction. + Cards (Clean spacing below marquee) */}
      <div className="relative mx-auto mt-14 grid w-full max-w-[1440px] grid-cols-1 gap-14 sm:mt-24 lg:grid-cols-12 lg:gap-16">
        {/* Left kinetic orbital dial */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2
              id="vision-heading"
              className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl"
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
