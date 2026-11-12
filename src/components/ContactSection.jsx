import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'hello@sakthikumar.com';

/**
 * Section 04: Minimal contact & social channel with magnetic triggers
 * and one-click email copy feedback.
 */
export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-contact-reveal]', {
        y: 34,
        opacity: 0,
        duration: 0.9,
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      aria-labelledby="connect-heading"
      className="relative z-20 border-t border-white/[0.06] bg-[#050505] px-5 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <div
            data-contact-reveal
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[#D5B474]"
          >
            <span>04</span>
            <span className="h-px w-8 bg-[#D5B474]/45" />
            <span>Connect</span>
          </div>

          <h2
            id="connect-heading"
            data-contact-reveal
            className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-[#F5F0E6] sm:text-6xl"
          >
            Stay close to the{' '}
            <span className="text-[#D5B474]">arrival.</span>
          </h2>

          <p
            data-contact-reveal
            className="mt-5 max-w-xl font-sans text-base font-light leading-relaxed text-[#969085]"
          >
            Whether it&apos;s a bold idea, a meaningful collaboration, or simply
            saying hello before the launch — the line is open.
          </p>
        </div>

        {/* Magnetic interactive channels */}
        <div
          data-contact-reveal
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-3 rounded-full border border-[#D5B474]/45 bg-[#D5B474]/10 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-[#EFE0BC] transition-colors duration-300 hover:border-[#D5B474] hover:bg-[#D5B474]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
          >
            <Mail className="h-4 w-4 text-[#D5B474]" aria-hidden="true" />
            <span>{EMAIL}</span>
          </MagneticButton>

          <MagneticButton
            type="button"
            onClick={handleCopyEmail}
            aria-label="Copy email address"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#0C0C0E] px-5 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#969085] transition-colors duration-300 hover:border-[#D5B474]/45 hover:text-[#F5F0E6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#D5B474]" aria-hidden="true" />
                <span className="text-[#D5B474]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </MagneticButton>

          <MagneticButton
            as="a"
            href="https://github.com/sakthikumar-1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#0C0C0E] px-5 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#F5F0E6] transition-colors duration-300 hover:border-[#D5B474]/45 hover:text-[#EFE0BC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
          >
            <span>GitHub</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-[#D5B474] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

