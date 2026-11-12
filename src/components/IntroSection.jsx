import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  { code: '01 // MINDSET', label: 'Clarity & Conviction' },
  { code: '02 // DIRECTION', label: 'Original Thinking' },
  { code: '03 // STANDARD', label: 'Built to Endure' },
];

/**
 * Section 01: Personal introduction highlighting Sakthi Kumar's identity,
 * mindset, and upcoming chapter.
 */
export function IntroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-intro-reveal]', {
        y: 36,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="overview"
      ref={sectionRef}
      aria-labelledby="intro-heading"
      className="relative z-20 border-t border-white/[0.06] bg-gradient-to-b from-[#050505] via-[#0B0B0D] to-[#050505] px-5 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left label column */}
        <div className="lg:col-span-4" data-intro-reveal>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[#D5B474]">
            <span>01</span>
            <span className="h-px w-8 bg-[#D5B474]/45" />
            <span>About Me</span>
          </div>
          <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-[#969085]">
            Built on quiet discipline, clear purpose, and relentless forward
            motion.
          </p>
        </div>

        {/* Right personal statement */}
        <div className="lg:col-span-8">
          <h2
            id="intro-heading"
            data-intro-reveal
            className="font-display text-3xl font-bold leading-[1.12] tracking-[-0.02em] text-[#F5F0E6] sm:text-5xl lg:text-[3.35rem]"
          >
            Driven by <span className="text-[#D5B474]">purpose</span>, shaped by
            discipline, and focused on{' '}
            <span className="text-[#EFE0BC]">what comes next.</span>
          </h2>

          <p
            data-intro-reveal
            className="mt-7 max-w-2xl font-sans text-base font-light leading-relaxed text-[#A6A096] sm:text-lg"
          >
            I&apos;m Sakthi Kumar. Everything I pursue begins with one rule — do
            less, mean more, and never settle for ordinary. Right now, I&apos;m
            stepping back to refine a sharper identity, a bolder direction, and
            a new body of work worth waiting for.
          </p>

          <div
            data-intro-reveal
            className="mt-12 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-8 sm:grid-cols-3 sm:gap-6"
          >
            {PRINCIPLES.map((item) => (
              <div key={item.code} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-[0.24em] text-[#D5B474]/80">
                  {item.code}
                </span>
                <span className="font-sans text-sm font-medium tracking-wide text-[#F5F0E6]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
