import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Vision', href: '#vision' },
  { label: 'Status', href: '#status' },
  { label: 'Connect', href: '#connect' },
];

/**
 * Fixed translucent top header containing brand identity, smooth anchor links,
 * live status pulse, and edition indicator.
 */
export function TopBar({ isReady, onNavigate }) {
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (event, target) => {
    event.preventDefault();
    onNavigate?.(target);
  };

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        isScrolled
          ? 'border-b border-white/[0.06] bg-[#050505]/75 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }
      }
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 sm:px-10 sm:py-5">
        {/* Brand mark */}
        <MagneticButton
          as="a"
          href="#top"
          onClick={(e) => handleLinkClick(e, 0)}
          strength={0.2}
          className="group inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D5B474]/40 bg-[#0C0C0E] font-display text-[11px] font-bold tracking-wider text-[#EFE0BC] transition-colors duration-300 group-hover:border-[#D5B474]">
            SK
          </span>
          <span className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-[#F5F0E6] sm:inline-block">
            sakthikumar.com
          </span>
        </MagneticButton>

        {/* Minimal desktop anchor navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.22em] text-[#969085] transition-colors duration-300 hover:text-[#F5F0E6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#D5B474] transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Live status & edition stamp */}
        <div className="flex items-center gap-3.5 sm:gap-5">
          <div className="flex items-center gap-2 rounded-full border border-[#D5B474]/22 bg-[#0C0C0E]/80 px-3 py-1">
            <span className="relative flex h-1.5 w-1.5 items-center justify-center">
              <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[#D5B474]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D5B474]" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D5B474] sm:text-[10px]">
              In Progress
            </span>
          </div>

          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[#969085]/80 lg:inline-block">
            ED.26 // v1.0
          </span>
        </div>
      </div>
    </motion.header>
  );
}
