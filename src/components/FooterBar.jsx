import { ArrowUp } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const FOOTER_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Vision', href: '#vision' },
  { label: 'Status', href: '#status' },
  { label: 'Connect', href: '#connect' },
];

/**
 * Minimal architectural footer containing domain identity, section links,
 * back-to-top trigger, and copyright notice.
 */
export function FooterBar({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (event, target) => {
    event.preventDefault();
    onNavigate?.(target);
  };

  return (
    <footer className="relative z-20 border-t border-white/[0.06] bg-[#050505] px-5 py-10 sm:px-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1.5">
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, 0)}
            className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-[#D5B474] transition-colors duration-300 hover:text-[#EFE0BC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
          >
            sakthikumar.com
          </a>
          <p className="font-sans text-xs tracking-[0.06em] text-[#7E7970]">
            &copy; {currentYear} Sakthi Kumar. All rights reserved.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-5 sm:gap-7"
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#969085] transition-colors duration-300 hover:text-[#F5F0E6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
            >
              {link.label}
            </a>
          ))}

          <MagneticButton
            type="button"
            onClick={() => onNavigate?.(0)}
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-[#0C0C0E] text-[#D5B474] transition-colors duration-300 hover:border-[#D5B474]/60 hover:text-[#EFE0BC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B474]"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </MagneticButton>
        </nav>
      </div>
    </footer>
  );
}
