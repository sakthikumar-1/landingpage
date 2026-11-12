/**
 * Global atmospheric obsidian backdrop with subtle drifting champagne gradients,
 * vignette framing, and fine animated grain.
 */
export function CinematicBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]"
    >
      {/* Upper ambient champagne glow */}
      <div
        className="animate-ambient-drift absolute -top-[18%] left-1/2 h-[70vh] w-[92vw] max-w-[1200px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(213, 180, 116, 0.085) 0%, rgba(158, 126, 68, 0.025) 48%, transparent 76%)',
        }}
      />

      {/* Deep charcoal atmospheric undertone */}
      <div
        className="absolute -bottom-[24%] right-[-10%] h-[58vh] w-[70vw] max-w-[900px] rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(213, 180, 116, 0.045) 0%, rgba(16, 16, 20, 0.4) 55%, transparent 75%)',
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 38%, rgba(2, 2, 2, 0.8) 100%)',
        }}
      />

      {/* Subtle animated 35mm grain */}
      <div className="cinema-grain absolute -inset-4 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
