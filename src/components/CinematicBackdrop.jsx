import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Futuristic obsidian void featuring a monumental champagne-gold orbital eclipse,
 * parallax depth rings, ambient zenith aura, cursor spotlight, and fine cinema grain.
 */
export function CinematicBackdrop({
  isReady,
  isInteractive,
  glowX,
  glowY,
  eclipseX,
  eclipseY,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#050505]"
    >
      {/* Subtle drifting zenith atmosphere */}
      <div
        className="animate-ambient-drift absolute -top-[20%] left-1/2 h-[65vh] w-[85vw] max-w-[1100px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(213, 180, 116, 0.09) 0%, rgba(158, 126, 68, 0.025) 48%, transparent 75%)',
        }}
      />

      {/* Monumental Orbital Eclipse Ring (mid-ground parallax layer) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={isInteractive ? { x: eclipseX, y: eclipseY } : undefined}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.82 }}
        animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.6, delay: 0.1, ease: EASE_CINEMATIC }
        }
      >
        <div className="relative h-[clamp(300px,58vw,640px)] w-[clamp(300px,58vw,640px)]">
          {/* Outer corona glow */}
          <div
            className="absolute -inset-8 rounded-full blur-[48px]"
            style={{
              background:
                'radial-gradient(circle at 50% 18%, rgba(239, 224, 188, 0.13) 0%, rgba(213, 180, 116, 0.04) 38%, transparent 66%)',
            }}
          />

          {/* Primary illuminated champagne eclipse arc */}
          <div
            className="animate-orbit-slow absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 320deg at 50% 50%, rgba(239, 224, 188, 0.42) 0deg, rgba(213, 180, 116, 0.12) 70deg, rgba(213, 180, 116, 0.02) 170deg, rgba(213, 180, 116, 0.08) 280deg, rgba(239, 224, 188, 0.42) 360deg)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))',
            }}
          />

          {/* Secondary subtle inner orbital hairline */}
          <div
            className="animate-orbit-reverse absolute inset-7 rounded-full border border-dashed border-[#D5B474]/[0.08] sm:inset-11"
          />

          {/* Obsidian eclipse core to sharpen central typography contrast */}
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(5, 5, 5, 0.94) 48%, rgba(5, 5, 5, 0.55) 84%, transparent 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Subtle architectural perspective horizon line */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(213, 180, 116, 0.08) 25%, rgba(213, 180, 116, 0.02) 50%, rgba(213, 180, 116, 0.08) 75%, transparent 100%)',
        }}
        initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.4 }}
        animate={isReady ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.4 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.5, delay: 0.25, ease: EASE_CINEMATIC }
        }
      />

      {/* Desktop cursor-following volumetric spotlight */}
      {isInteractive && (
        <motion.div
          className="absolute left-0 top-0 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
          style={{
            x: glowX,
            y: glowY,
            background:
              'radial-gradient(circle, rgba(239, 224, 188, 0.075) 0%, rgba(213, 180, 116, 0.028) 36%, transparent 70%)',
          }}
        />
      )}

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 36%, rgba(2, 2, 2, 0.84) 100%)',
        }}
      />

      {/* Fine 35mm grain */}
      <div className="cinema-grain absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
