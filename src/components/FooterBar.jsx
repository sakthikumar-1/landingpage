import { ArrowUp } from 'lucide-react';
import { NAV_SECTIONS, SITE_META } from '../config/siteConfig';
import { MagneticButton } from './MagneticButton';

/**
 * Theme-aware minimal footer containing domain identity, section navigation,
 * back-to-top trigger, and copyright notice.
 */
export function FooterBar({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (event, target) => {
    event.preventDefault();
    onNavigate?.(target);
  };

  return (
    <footer className="theme-surface relative z-20 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] px-5 py-10 sm:px-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1.5">
          <a
            href="#overview"
            onClick={(e) => handleLinkClick(e, 0)}
            className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-[var(--accent)] transition-colors duration-300 hover:text-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {SITE_META.domain}
          </a>
          <p className="font-sans text-xs tracking-[0.06em] text-[var(--text-muted)]">
            &copy; {currentYear} Sakthi Kumar (Sakthi Kumar B). All rights reserved.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-5 sm:gap-7"
        >
          {NAV_SECTIONS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}

          <MagneticButton
            type="button"
            onClick={() => onNavigate?.(0)}
            aria-label="Back to top"
            className="theme-surface inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--accent)] transition-colors duration-300 hover:border-[var(--border-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </MagneticButton>
        </nav>
      </div>
    </footer>
  );
}
