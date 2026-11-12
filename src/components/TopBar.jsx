import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_SECTIONS, SITE_META } from '../config/siteConfig';
import { MagneticButton } from './MagneticButton';
import { ThemeToggle } from './ThemeToggle';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Fixed translucent navigation bar featuring brand identity, active-section
 * detection, animated theme switch, status pulse, and responsive mobile drawer.
 */
export function TopBar({ isReady, onNavigate }) {
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const elements = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = (event, target, id) => {
    event.preventDefault();
    if (id) setActiveId(id);
    setMobileOpen(false);
    onNavigate?.(target);
  };

  return (
    <>
      <motion.header
        className={`theme-surface fixed inset-x-0 top-0 z-40 ${
          isScrolled
            ? 'border-b border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-md'
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
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3.5 sm:px-10 sm:py-4">
          {/* Brand identity */}
          <MagneticButton
            as="a"
            href="#overview"
            onClick={(e) => handleLinkClick(e, 0, 'overview')}
            strength={0.2}
            className="group inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <span className="theme-surface flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-accent)] bg-[var(--bg-secondary)] font-display text-[11px] font-bold tracking-wider text-[var(--accent-strong)] transition-transform duration-300 group-hover:scale-105">
              SK
            </span>
            <span className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text-primary)] sm:inline-block">
              {SITE_META.domain}
            </span>
          </MagneticButton>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            {NAV_SECTIONS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-[var(--accent)]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right controls: status, theme switch, mobile menu button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="theme-surface hidden items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--bg-pill)] px-3 py-1.5 sm:flex">
              <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--accent)]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
                In Progress
              </span>
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="theme-surface inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Responsive mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="theme-surface fixed inset-0 z-30 flex flex-col justify-between bg-[var(--bg-primary)]/96 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_CINEMATIC }}
          >
            <nav aria-label="Mobile sections" className="flex flex-col gap-3">
              {NAV_SECTIONS.map((item, idx) => {
                const isActive = activeId === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.id)}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, x: -18 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: idx * 0.05,
                      ease: EASE_CINEMATIC,
                    }}
                    className={`flex items-baseline justify-between border-b border-[var(--border-subtle)] py-4 font-display text-3xl font-bold tracking-tight transition-colors ${
                      isActive
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs tracking-[0.22em] text-[var(--text-muted)]">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>Something big is in progress</span>
              </div>
              <ThemeToggle showLabel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
