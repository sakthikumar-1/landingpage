import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TARGET_PERCENT = 78;

const MILESTONES = [
  {
    step: '01',
    title: 'Foundation',
    detail: 'Clarifying the direction, core values, and long-term vision.',
    state: 'complete',
    label: 'Complete',
  },
  {
    step: '02',
    title: 'Identity',
    detail: 'Shaping a sharper personal voice and unmistakable signature.',
    state: 'complete',
    label: 'Complete',
  },
  {
    step: '03',
    title: 'Creation',
    detail: 'Bringing flagship projects, ideas, and new ventures to life.',
    state: 'active',
    label: 'In Progress',
  },
  {
    step: '04',
    title: 'The Entry',
    detail: 'Unveiling the full new chapter on sakthikumar.com.',
    state: 'upcoming',
    label: 'Upcoming',
  },
];

/**
 * Section 03: Animated launch status telemetry with GSAP-driven readiness meter
 * and 4-stage chapter progression.
 */
export function LaunchStatusSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const barRef = useRef(null);
  const [percent, setPercent] = useState(
    prefersReducedMotion ? TARGET_PERCENT : 0
  );

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      setPercent(TARGET_PERCENT);
      return;
    }

    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.from('[data-status-item]', {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          once: true,
        },
      });

      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: TARGET_PERCENT / 100,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );

      gsap.to(counter, {
        value: TARGET_PERCENT,
        duration: 1.5,
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
  }, [prefersReducedMotion]);

  return (
    <section
      id="status"
      ref={sectionRef}
      aria-labelledby="status-heading"
      className="relative z-20 border-t border-white/[0.06] bg-gradient-to-b from-[#050505] via-[#0B0B0D] to-[#050505] px-5 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          data-status-item
          className="flex flex-col justify-between gap-8 border-b border-white/[0.07] pb-10 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[#D5B474]">
              <span>03</span>
              <span className="h-px w-8 bg-[#D5B474]/45" />
              <span>Launch Status</span>
            </div>
            <h2
              id="status-heading"
              className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-[#F5F0E6] sm:text-5xl"
            >
              The next chapter takes shape.
            </h2>
          </div>

          {/* Animated progress readout */}
          <div className="w-full max-w-sm">
            <div className="mb-2.5 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.22em]">
              <span className="text-[#969085]">Chapter Readiness</span>
              <span className="text-lg font-medium tabular-nums text-[#D5B474]">
                {percent}%
              </span>
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                ref={barRef}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#A98648] via-[#D5B474] to-[#EFE0BC]"
                style={
                  prefersReducedMotion
                    ? { transform: `scaleX(${TARGET_PERCENT / 100})` }
                    : undefined
                }
              />
            </div>
          </div>
        </div>

        {/* Four-phase timeline */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {MILESTONES.map((item) => {
            const isActive = item.state === 'active';
            const isComplete = item.state === 'complete';

            return (
              <div
                key={item.step}
                data-status-item
                className={`relative rounded-xl border p-6 transition-colors duration-300 ${
                  isActive
                    ? 'border-[#D5B474]/45 bg-[#11100E]'
                    : 'border-white/[0.07] bg-[#0A0A0C]/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.24em] text-[#969085]">
                    {item.step}
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] ${
                      isActive
                        ? 'text-[#D5B474]'
                        : isComplete
                          ? 'text-[#EFE0BC]/80'
                          : 'text-[#6E6961]'
                    }`}
                  >
                    {isActive && (
                      <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                        <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[#D5B474]" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D5B474]" />
                      </span>
                    )}
                    {item.label}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-[#F5F0E6]">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-sm font-light leading-relaxed text-[#969085]">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
