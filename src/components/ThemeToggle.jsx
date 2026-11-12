import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { MagneticButton } from './MagneticButton';

/**
 * Animated Dark/Light theme switch with accessible state and spring icon transition.
 */
export function ThemeToggle({ showLabel = false }) {
  const { isDark, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <MagneticButton
      type="button"
      onClick={toggleTheme}
      strength={0.2}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={!isDark}
      className="theme-surface group inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-3 py-1.5 text-[var(--text-primary)] backdrop-blur-sm hover:border-[var(--border-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
    >
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={
                prefersReducedMotion
                  ? false
                  : { rotate: -45, scale: 0.6, opacity: 0 }
              }
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { rotate: 45, scale: 0.6, opacity: 0 }
              }
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center text-[var(--accent)]"
            >
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={
                prefersReducedMotion
                  ? false
                  : { rotate: 45, scale: 0.6, opacity: 0 }
              }
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { rotate: -45, scale: 0.6, opacity: 0 }
              }
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center text-[var(--accent)]"
            >
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {showLabel && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </MagneticButton>
  );
}

