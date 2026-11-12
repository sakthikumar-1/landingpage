import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react';
import { CONTACT_DETAILS } from '../config/siteConfig';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const DIRECT_CHANNELS = [
  {
    key: 'phone',
    label: 'Phone Number',
    display: CONTACT_DETAILS.phoneDisplay,
    href: CONTACT_DETAILS.phoneHref,
    ariaLabel: `Call ${CONTACT_DETAILS.phoneDisplay}`,
    external: false,
    icon: Phone,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    display: '/in/sakthikumar1',
    href: CONTACT_DETAILS.linkedinUrl,
    ariaLabel: 'Open Sakthi Kumar (Sakthi Kumar B) LinkedIn profile in a new tab',
    external: true,
    icon: null,
  },
  {
    key: 'github',
    label: 'GitHub',
    display: '@sakthikumar-1',
    href: CONTACT_DETAILS.githubUrl,
    ariaLabel: 'Open Sakthi Kumar (Sakthi Kumar B) GitHub profile in a new tab',
    external: true,
    icon: null,
  },
];

/**
 * Section 05 (Connect): Interactive spotlight bento grid with magnetic tiles,
 * mailto/tel links, copy-email feedback, and verified LinkedIn/GitHub profiles.
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
        stagger: 0.1,
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

  const handleCopyEmail = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(CONTACT_DETAILS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_DETAILS.email}`;
    }
  };

  const handleTilePointerMove = (event) => {
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
      id="connect"
      ref={sectionRef}
      aria-labelledby="connect-heading"
      className="theme-surface relative z-20 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] px-5 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 sm:gap-16">
        {/* Top split intro */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div
              data-contact-reveal
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]"
            >
              <span>05</span>
              <span className="h-px w-8 bg-[var(--accent)]/50" />
              <span>Connect</span>
            </div>

            <h2
              id="connect-heading"
              data-contact-reveal
              className="mt-4 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.025em] text-[var(--text-primary)] sm:text-6xl"
            >
              Stay <span className="text-[var(--accent)]">connected.</span>
            </h2>
          </div>

          <p
            data-contact-reveal
            className="max-w-md font-sans text-base font-light leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Have an interesting idea, an opportunity or simply want to connect?
            I&apos;d be happy to hear from you.
          </p>
        </div>

        {/* 2x2 Interactive Spotlight Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Email Tile */}
          <motion.div
            data-contact-reveal
            onPointerMove={handleTilePointerMove}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            style={{ '--mx': '50%', '--my': '50%' }}
            className="theme-surface group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-elevated)] transition-colors duration-300 hover:border-[var(--border-accent)] sm:p-9"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(320px circle at var(--mx) var(--my), var(--accent-soft), transparent 70%)',
              }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Professional Email
                </span>
                <Mail
                  className="h-4 w-4 text-[var(--accent)]"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  aria-label={`Send email to ${CONTACT_DETAILS.email}`}
                  className="break-all font-display text-lg font-bold text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:text-2xl"
                >
                  {CONTACT_DETAILS.email}
                </a>

                <MagneticButton
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  className="theme-surface inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent-soft)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-strong)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Parameterized Direct Channel Tiles */}
          {DIRECT_CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.key}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer me' : undefined}
                aria-label={channel.ariaLabel}
                data-contact-reveal
                onPointerMove={handleTilePointerMove}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                style={{ '--mx': '50%', '--my': '50%' }}
                className="theme-surface group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-elevated)] transition-colors duration-300 hover:border-[var(--border-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:p-9"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(320px circle at var(--mx) var(--my), var(--accent-soft), transparent 70%)',
                  }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                      {channel.label}
                    </span>
                    {Icon && (
                      <Icon
                        className="h-4 w-4 text-[var(--accent)]"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-xl font-bold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-2xl">
                      {channel.display}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
