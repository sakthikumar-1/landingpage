import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    index: '01',
    title: 'Confidence',
    subtitle: 'Mindset',
    description:
      'Quiet certainty earned through discipline, consistency, and the patience to build things the right way.',
  },
  {
    index: '02',
    title: 'Identity',
    subtitle: 'Character',
    description:
      'Standing apart by staying true to one voice — clear in intent, unmistakable in presence, and never diluted by noise.',
  },
  {
    index: '03',
    title: 'Ambition',
    subtitle: 'Horizon',
    description:
      'Looking beyond what already exists to create ideas, ventures, and experiences that move people forward.',
  },
];

/**
 * Section 02: Personal vision & core beliefs with scroll-scrubbed watermark
 * and mouse-reactive obsidian monolith panels.
 */
export function VisionSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        watermarkRef.current,
        { xPercent: 8 },
        {
          xPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.from('[data-vision-card]', {
        y: 44,
        opacity: 0,
        duration: 0.9,
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

  const handleCardPointerMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--mx',
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty(
      '--my',
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <section
      id="vision"
      ref={sectionRef}
      aria-labelledby="vision-heading"
      className="relative z-20 overflow-hidden border-t border-white/[0.06] bg-[#050505] px-5 py-24 sm:px-10 sm:py-36"
    >
      {/* Scroll-scrubbed monumental watermark */}
      <div
        aria-hidden="true"
        ref={watermarkRef}
        className="pointer-events-none select-none whitespace-nowrap font-display text-[clamp(4.5rem,16vw,13rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-white/[0.025]"
      >
        NEW CHAPTER · NEW VISION ·
      </div>

      <div className="relative mx-auto -mt-6 w-full max-w-[1440px] sm:-mt-12">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[#D5B474]">
              <span>02</span>
              <span className="h-px w-8 bg-[#D5B474]/45" />
              <span>Vision</span>
            </div>
            <h2
              id="vision-heading"
              className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-[#F5F0E6] sm:text-5xl"
            >
              Built on principle.
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-[#969085] sm:text-base">
            Three beliefs guiding my next chapter and everything coming to{' '}
            <span className="text-[#EFE0BC]">sakthikumar.com</span>.
          </p>
        </div>

        {/* Interactive spotlight monolith cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.index}
              data-vision-card
              onPointerMove={handleCardPointerMove}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0C0E]/90 p-7 transition-colors duration-500 hover:border-[#D5B474]/40 sm:p-9"
              style={{
                '--mx': '50%',
                '--my': '50%',
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(320px circle at var(--mx) var(--my), rgba(213, 180, 116, 0.11), transparent 70%)',
                }}
              />

              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.26em] text-[#D5B474]">
                    {pillar.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#969085]">
                    {pillar.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-[#F5F0E6] transition-colors duration-300 group-hover:text-[#EFE0BC] sm:text-[1.7rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm font-light leading-relaxed text-[#969085] sm:text-[15px]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
