import { motion, useReducedMotion } from 'framer-motion';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1];

// Symmetrical converging gold motes around the crown halo
const CONVERGING_MOTES = [
  { id: 'm1', sx: 14, sy: 18, ex: 26, ey: 24, r: 1.2, delay: 0.15 },
  { id: 'm2', sx: 106, sy: 18, ex: 94, ey: 24, r: 1.2, delay: 0.15 },
  { id: 'm3', sx: 8, sy: 44, ex: 18, ey: 39, r: 1.0, delay: 0.24 },
  { id: 'm4', sx: 112, sy: 44, ex: 102, ey: 39, r: 1.0, delay: 0.24 },
  { id: 'm5', sx: 40, sy: 4, ex: 47, ey: 15, r: 1.3, delay: 0.32 },
  { id: 'm6', sx: 80, sy: 4, ex: 73, ey: 15, r: 1.3, delay: 0.32 },
  { id: 'm7', sx: 60, sy: 2, ex: 60, ey: 9, r: 1.5, delay: 0.38 },
];

const GEMSTONES = [
  { id: 'g-left', points: '14,22.5 16,25 14,27.5 12,25', delay: 0.56 },
  { id: 'g-center', points: '60,8.5 62.6,12 60,15.5 57.4,12', delay: 0.62 },
  { id: 'g-right', points: '106,22.5 108,25 106,27.5 104,25', delay: 0.56 },
  { id: 'g-core', points: '60,36 63,40.5 60,45 57,40.5', delay: 0.68 },
];

/**
 * Bespoke animated geometric SVG crown insignia with stroke-draw reveal,
 * converging gold particles, traveling metallic sheen, and subtle glow pulse.
 * Adapts automatically to both Dark and Light themes via CSS tokens.
 */
export function CrownInsignia({ isReady }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="relative mb-3 flex items-center justify-center sm:mb-4"
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 14, scale: 1.08 }
      }
      animate={
        isReady
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 14, scale: 1.08 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.9, delay: 0.05, ease: EASE_CINEMATIC }
      }
    >
      {/* Subtle radial glow & occasional pulse behind crown */}
      <motion.div
        className="pointer-events-none absolute h-24 w-36 rounded-full blur-2xl sm:h-28 sm:w-44"
        style={{
          background:
            'radial-gradient(circle, var(--accent-soft) 0%, transparent 72%)',
        }}
        animate={
          prefersReducedMotion || !isReady
            ? undefined
            : {
                opacity: [0.45, 0.85, 0.45],
                scale: [0.94, 1.08, 0.94],
              }
        }
        transition={{
          duration: 5.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Gentle continuous floating motion */}
      <motion.div
        animate={
          prefersReducedMotion || !isReady ? undefined : { y: [0, -5, 0] }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      >
        <svg
          viewBox="0 0 120 72"
          fill="none"
          className="h-14 w-[5.25rem] overflow-visible sm:h-[4.25rem] sm:w-[6.75rem]"
        >
          <defs>
            <linearGradient
              id="crown-metallic-grad"
              x1="12"
              y1="10"
              x2="108"
              y2="62"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="50%" stopColor="var(--accent-strong)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>

            <filter
              id="crown-soft-glow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Converging gold particles */}
          {CONVERGING_MOTES.map((mote) => (
            <motion.circle
              key={mote.id}
              r={mote.r}
              fill="var(--accent-strong)"
              initial={
                prefersReducedMotion
                  ? { cx: mote.ex, cy: mote.ey, opacity: 0.45 }
                  : { cx: mote.sx, cy: mote.sy, opacity: 0 }
              }
              animate={
                isReady
                  ? prefersReducedMotion
                    ? { cx: mote.ex, cy: mote.ey, opacity: 0.45 }
                    : {
                        cx: [mote.sx, mote.ex, mote.ex],
                        cy: [mote.sy, mote.ey, mote.ey - 1.5],
                        opacity: [0, 0.85, 0.4],
                      }
                  : { opacity: 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 1.25,
                      delay: mote.delay,
                      ease: EASE_CINEMATIC,
                    }
              }
            />
          ))}

          {/* Main symmetrical geometric crown outline */}
          <motion.path
            d="M21 54 L15 29 L38 41 L60 17 L82 41 L105 29 L99 54 Z"
            stroke="url(#crown-metallic-grad)"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#crown-soft-glow)"
            initial={
              prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }
            }
            animate={
              isReady
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.95, delay: 0.08, ease: EASE_CINEMATIC }
            }
          />

          {/* Inner architectural spire facets */}
          <motion.path
            d="M37 54 L60 28 L83 54"
            stroke="url(#crown-metallic-grad)"
            strokeOpacity="0.6"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={
              prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }
            }
            animate={
              isReady
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.34, ease: EASE_CINEMATIC }
            }
          />

          {/* Lower sovereign collar band */}
          <motion.path
            d="M23 59.5 H97"
            stroke="url(#crown-metallic-grad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={
              prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }
            }
            animate={
              isReady
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, delay: 0.45, ease: EASE_CINEMATIC }
            }
          />

          {/* Traveling metallic sheen across the crown outline */}
          {!prefersReducedMotion && (
            <motion.path
              d="M21 54 L15 29 L38 41 L60 17 L82 41 L105 29 L99 54 Z"
              stroke="var(--accent-strong)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24 240"
              initial={{ strokeDashoffset: 260, opacity: 0 }}
              animate={
                isReady
                  ? {
                      strokeDashoffset: [260, -40],
                      opacity: [0, 0.9, 0.9, 0],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 2.2,
                delay: 1.15,
                repeat: Infinity,
                repeatDelay: 3.4,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Small gemstone diamond highlights */}
          {GEMSTONES.map((gem) => (
            <motion.polygon
              key={gem.id}
              points={gem.points}
              fill="var(--accent-strong)"
              stroke="var(--accent)"
              strokeWidth="0.6"
              initial={
                prefersReducedMotion ? false : { scale: 0, opacity: 0 }
              }
              animate={
                isReady
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              style={{ transformOrigin: 'center' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: gem.delay, ease: EASE_CINEMATIC }
              }
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

