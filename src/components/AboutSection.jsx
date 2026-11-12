import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LEAD_WORDS =
  "I'm Sakthi Kumar, a Computer Science Engineering graduate with an interest in technology, software development and data analytics.".split(
    ' '
  );

const ATTRIBUTES = [
  { code: '01', title: 'Clarity & Curiosity', offsetClass: 'md:ml-0' },
  { code: '02', title: 'Continuous Learning', offsetClass: 'md:ml-8' },
  { code: '03', title: 'Purposeful Creation', offsetClass: 'md:ml-16' },
];

/**
 * Section 02 (About Me): Scroll-scrubbed word illumination, 3D interactive
 * tilt narrative card, and staggered kinetic identity ribbons.
 */
export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const leadBlockRef = useRef(null);
  const cardRef = useRef(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 20 });

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-about-word]', {
        opacity: 0.22,
        y: 8,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: leadBlockRef.current,
          start: 'top 82%',
          end: 'bottom 52%',
          scrub: true,
        },
      });

      gsap.from('[data-about-card]', {
        y: 46,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-about-card]',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('[data-about-ribbon]', {
        x: 56,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-about-ribbons]',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleCardPointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateX.set(-py * 7);
    rawRotateY.set(px * 9);
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const handleCardPointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="theme-surface relative z-20 overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-5 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 sm:gap-20">
        {/* Top block: heading + scroll-scrubbed word-by-word illumination */}
        <div ref={leadBlockRef} className="max-w-5xl">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
            <span>02</span>
            <span className="h-px w-8 bg-[var(--accent)]/50" />
            <span>About Me</span>
          </div>

          <h2
            id="about-heading"
            className="mt-5 font-display text-3xl font-bold leading-[1.06] tracking-[-0.025em] text-[var(--text-primary)] sm:text-5xl lg:text-[3.6rem]"
          >
            Driven by curiosity.{' '}
            <span className="text-[var(--accent)]">Guided by purpose.</span>
          </h2>

          <p className="mt-7 flex flex-wrap gap-x-[0.3em] gap-y-1 font-sans text-xl font-normal leading-relaxed text-[var(--text-primary)] sm:text-2xl lg:text-[1.75rem]">
            {LEAD_WORDS.map((word, index) => (
              <span
                key={`${word}-${index}`}
                data-about-word
                className="inline-block will-change-transform"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Lower rearranged split: 3D tilt narrative card + staggered kinetic ribbons */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Interactive 3D tilt card */}
          <div className="lg:col-span-6" style={{ perspective: 1000 }}>
            <motion.div
              ref={cardRef}
              data-about-card
              onPointerMove={handleCardPointerMove}
              onPointerLeave={handleCardPointerLeave}
              style={
                prefersReducedMotion
                  ? { '--mx': '50%', '--my': '50%' }
                  : { rotateX, rotateY, '--mx': '50%', '--my': '50%' }
              }
              className="theme-surface group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-elevated)] will-change-transform sm:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(360px circle at var(--mx) var(--my), var(--accent-soft), transparent 70%)',
                }}
              />

              <div className="relative z-10 space-y-6">
                <p className="font-sans text-base font-light leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  I believe in learning by building, solving meaningful problems
                  and continuously improving the way I think and create.
                </p>

                <div className="h-px w-full bg-gradient-to-r from-[var(--border-accent)] via-[var(--border-subtle)] to-transparent" />

                <p className="font-sans text-base font-light leading-relaxed text-[var(--text-primary)] sm:text-lg">
                  My journey is still evolving. I&apos;m working towards
                  becoming a stronger developer, problem solver and independent
                  creator.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Staggered kinetic identity attribute ribbons */}
          <div
            data-about-ribbons
            className="flex flex-col gap-4 lg:col-span-6"
          >
            {ATTRIBUTES.map((attr) => (
              <motion.div
                key={attr.code}
                data-about-ribbon
                whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`theme-surface group flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/75 px-6 py-5 transition-colors duration-300 hover:border-[var(--border-accent)] ${attr.offsetClass}`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-medium tracking-[0.22em] text-[var(--accent)]">
                    {attr.code}
                  </span>
                  <span className="h-px w-5 bg-[var(--border-accent)] transition-all duration-300 group-hover:w-10 group-hover:bg-[var(--accent)]" />
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-primary)] sm:text-sm">
                    {attr.title}
                  </span>
                </div>

                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
