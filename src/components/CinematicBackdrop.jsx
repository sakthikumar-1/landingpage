import { useTheme } from '../context/ThemeContext';

/**
 * Global atmospheric backdrop adapting between obsidian dark luxury
 * and architectural titanium-gray light mode.
 */
export function CinematicBackdrop() {
  const { isDark } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="theme-surface pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Upper ambient glow */}
      <div
        className="animate-ambient-drift absolute -top-[18%] left-1/2 h-[70vh] w-[92vw] max-w-[1200px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(240, 196, 101, 0.12) 0%, rgba(190, 138, 34, 0.04) 50%, transparent 78%)'
            : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.98) 0%, rgba(241, 243, 247, 0.82) 48%, rgba(179, 130, 34, 0.06) 72%, transparent 88%)',
        }}
      />

      {/* Lower atmospheric depth */}
      <div
        className="absolute -bottom-[24%] right-[-10%] h-[58vh] w-[70vw] max-w-[900px] rounded-full blur-[130px]"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(240, 196, 101, 0.06) 0%, rgba(12, 12, 18, 0.65) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(179, 130, 34, 0.07) 0%, rgba(229, 232, 240, 0.6) 55%, transparent 75%)',
        }}
      />

      {/* Soft edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 45%, transparent 38%, rgba(2, 2, 3, 0.88) 100%)'
            : 'radial-gradient(circle at 50% 45%, transparent 50%, rgba(205, 210, 224, 0.45) 100%)',
        }}
      />

      {/* Subtle animated grain */}
      <div className="cinema-grain absolute -inset-4 mix-blend-overlay" />
    </div>
  );
}
