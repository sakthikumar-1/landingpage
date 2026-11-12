import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LAUNCH_PROGRESS_PERCENT } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    step: '01',
    title: 'Foundation',
    status: 'Complete',
    detail: 'Establishing the foundation and long-term direction.',
    state: 'complete',
  },
  {
    step: '02',
    title: 'Identity',
    status: 'Complete',
    detail: 'Building a distinctive personal identity.',
    state: 'complete',
  },
  {
    step: '03',
    title: 'Creation',
    status: 'In Progress',
    detail: 'Developing new ideas and shaping the next chapter.',
    state: 'active',
  },
  {
    step: '04',
    title: 'The Entry',
    status: 'Upcoming',
    detail: 'The official unveiling of sakthikumar.com.',
    state: 'upcoming',
  },
];

const RING_RADIUS = 74;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Section 04 (Launch Status): Animated circular radial gauge paired with
 * a self-drawing vertical timeline and configurable 78% readiness counter.
 */
export function LaunchStatusSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const ringRef = useRef(null);
  const barRef = useRef(null);
  const spineRef = useRef(null);

  const [percent, setPercent] = useState(
    prefersReducedMotion ? LAUNCH_PROGRESS_PERCENT : 0
  );

  const targetOffset =
    RING_CIRCUMFERENCE * (1 - LAUNCH_PROGRESS_PERCENT / 100);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      setPercent(LAUNCH_PROGRESS_PERCENT);
      return;
    }

    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.from('[data-status-fade]', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      });

      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: RING_CIRCUMFERENCE },
        {
          strokeDashoffset: targetOffset,
          duration: 1.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: LAUNCH_PROGRESS_PERCENT / 100,
          duration: 1.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-status-timeline]',
            start: 'top 78%',
            once: true,
          },
        }
      );

      gsap.from('[data-status-node]', {
        x: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-status-timeline]',
          start: 'top 78%',
          once: true,
        },
      });

      gsap.to(counter, {
        value: LAUNCH_PROGRESS_PERCENT,
        duration: 1.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
        onUpdate: () => {
          setPercent(Math.round(counter.value));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, targetOffset]);

  return (
    <section
      id="status"
      ref={sectionRef}
      aria-labelledby="status-heading"
      className="theme-surface relative z-20 overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-5 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Left: Heading + Radial Gauge + Linear Progress Bar */}
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <div data-status-fade>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
              <span>04</span>
              <span className="h-px w-8 bg-[var(--accent)]/50" />
              <span>Launch Status</span>
            </div>
            <h2
              id="status-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl"
            >
              The next chapter takes shape.
            </h2>
          </div>

          {/* Radial Gauge Card */}
          <div
            data-status-fade
            className="theme-surface flex flex-col items-center gap-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-elevated)] sm:flex-row sm:p-8"
          >
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 180 180"
                aria-hidden="true"
              >
                <circle
                  cx="90"
                  cy="90"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="var(--border-subtle)"
                  strokeWidth="6"
                />
                <circle
                  ref={ringRef}
                  cx="90"
                  cy="90"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={
                    prefersReducedMotion ? targetOffset : RING_CIRCUMFERENCE
                  }
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  aria-label={`${LAUNCH_PROGRESS_PERCENT} percent complete`}
                  className="font-display text-4xl font-extrabold tabular-nums tracking-tight text-[var(--accent)]"
                >
                  {percent}%
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Ready
                </span>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
                <span className="text-[var(--text-secondary)]">
                  Chapter Progress
                </span>
                <span className="font-semibold tabular-nums text-[var(--accent)]">
                  {percent}%
                </span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={LAUNCH_PROGRESS_PERCENT}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Website launch progress"
                className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]"
              >
                <div
                  ref={barRef}
                  className="relative h-full w-full origin-left overflow-hidden rounded-full bg-gradient-to-r from-[var(--accent)]/70 via-[var(--accent)] to-[var(--accent-strong)]"
                  style={
                    prefersReducedMotion
                      ? { transform: `scaleX(${LAUNCH_PROGRESS_PERCENT / 100})` }
                      : undefined
                  }
                >
                  <span className="animate-horizon-pulse absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
              </div>

              <p className="font-sans text-xs font-light leading-relaxed text-[var(--text-muted)]">
                Shaping every detail carefully ahead of the full public unveil on{' '}
                <span className="text-[var(--text-primary)]">
                  sakthikumar.com
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Right: Self-drawing Vertical Kinetic Timeline */}
        <div
          data-status-timeline
          className="relative flex flex-col gap-5 pl-7 sm:pl-10 lg:col-span-7"
        >
          {/* Animated spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-2 top-4 w-px bg-[var(--border-subtle)] sm:left-3"
          >
            <div
              ref={spineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/60 to-transparent"
            />
          </div>

          {MILESTONES.map((item) => {
            const isActive = item.state === 'active';
            const isComplete = item.state === 'complete';

            return (
              <motion.div
                key={item.step}
                data-status-node
                whileHover={prefersReducedMotion ? undefined : { x: 6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className={`theme-surface relative rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${
                  isActive
                    ? 'border-[var(--border-accent)] bg-[var(--bg-elevated)] shadow-[var(--shadow-elevated)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 hover:border-[var(--border-accent)]'
                }`}
              >
                {/* Timeline node marker */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[25px] top-8 flex h-3 w-3 items-center justify-center rounded-full border sm:-left-[33px] ${
                    isActive
                      ? 'border-[var(--accent)] bg-[var(--bg-primary)]'
                      : isComplete
                        ? 'border-[var(--accent)] bg-[var(--accent)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-primary)]'
                  }`}
                >
                  {isActive && (
                    <>
                      <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--accent)]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    </>
                  )}
                </span>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.22em] text-[var(--accent)]">
                      {item.step}
                    </span>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                      isActive
                        ? 'border-[var(--border-accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                        : isComplete
                          ? 'border-[var(--border-subtle)] text-[var(--text-primary)]'
                          : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="mt-2.5 font-sans text-sm font-light leading-relaxed text-[var(--text-secondary)]">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
