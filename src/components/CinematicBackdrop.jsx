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
            ? 'radial-gradient(ellipse at center, rgba(213, 180, 116, 0.095) 0%, rgba(158, 126, 68, 0.03) 48%, transparent 76%)'
            : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.65) 0%, rgba(143, 109, 46, 0.08) 48%, transparent 76%)',
        }}
      />

      {/* Lower atmospheric depth */}
      <div
        className="absolute -bottom-[24%] right-[-10%] h-[58vh] w-[70vw] max-w-[900px] rounded-full blur-[130px]"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(213, 180, 116, 0.05) 0%, rgba(16, 16, 20, 0.45) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(143, 109, 46, 0.09) 0%, rgba(190, 195, 204, 0.4) 55%, transparent 75%)',
        }}
      />

      {/* Soft edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 45%, transparent 38%, rgba(2, 2, 2, 0.82) 100%)'
            : 'radial-gradient(circle at 50% 45%, transparent 46%, rgba(186, 191, 200, 0.55) 100%)',
        }}
      />

      {/* Subtle animated grain */}
      <div className="cinema-grain absolute -inset-4 mix-blend-overlay" />
    </div>
  );
}
