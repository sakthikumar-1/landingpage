import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

/**
 * Atmospheric #050505 void with stage bloom buildup, drifting champagne lighting,
 * desktop cursor-following spotlight, cinematic vignette, and fine 35mm grain.
 */
export function CinematicBackdrop({ isReady, isInteractive, glowX, glowY }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#050505]"
    >
      {/* Primary soft champagne zenith aura */}
      <div
        className="animate-ambient-drift absolute -top-[18%] left-1/2 h-[72vh] w-[92vw] max-w-[1200px] -translate-x-1/2 rounded-full blur-[90px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(213, 180, 116, 0.085) 0%, rgba(169, 134, 72, 0.03) 45%, transparent 74%)',
        }}
      />

      {/* Focused stage bloom behind the hero title as curtains part */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[85px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(239, 224, 188, 0.075) 0%, rgba(213, 180, 116, 0.025) 42%, transparent 72%)',
        }}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.72 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.6, delay: 0.15, ease: EASE_CINEMATIC }
        }
      />

      {/* Subtle breathing inner halo */}
      <div
        className="animate-stage-breathe absolute left-1/2 top-[48%] h-[280px] w-[480px] max-w-[85vw] rounded-full blur-[70px]"
        style={{
          background:
            'radial-gradient(circle, rgba(213, 180, 116, 0.055) 0%, transparent 68%)',
        }}
      />

      {/* Secondary deep warm horizon undertone */}
      <div
        className="animate-ambient-counter absolute -bottom-[22%] left-1/2 h-[54vh] w-[80vw] max-w-[1000px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(213, 180, 116, 0.048) 0%, rgba(120, 92, 46, 0.018) 50%, transparent 75%)',
        }}
      />

      {/* Subtle architectural vertical light column behind central typography */}
      <motion.div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(213, 180, 116, 0.25) 38%, rgba(213, 180, 116, 0.38) 50%, rgba(213, 180, 116, 0.25) 62%, transparent 100%)',
        }}
        initial={prefersReducedMotion ? false : { opacity: 0, scaleY: 0.35 }}
        animate={
          isReady ? { opacity: 0.24, scaleY: 1 } : { opacity: 0, scaleY: 0.35 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.4, delay: 0.2, ease: EASE_CINEMATIC }
        }
      />

      {/* Desktop cursor-following champagne spotlight */}
      {isInteractive && (
        <motion.div
          className="absolute left-0 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
          style={{
            x: glowX,
            y: glowY,
            background:
              'radial-gradient(circle, rgba(239, 224, 188, 0.07) 0%, rgba(213, 180, 116, 0.03) 34%, transparent 70%)',
          }}
        />
      )}

      {/* Cinematic edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, transparent 38%, rgba(2, 2, 2, 0.82) 100%)',
        }}
      />

      {/* Ultra-fine film grain texture */}
      <div className="cinema-grain absolute inset-0 opacity-[0.032] mix-blend-overlay" />
    </div>
  );
}
