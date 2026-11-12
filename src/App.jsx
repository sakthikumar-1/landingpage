import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ArchitecturalFrame } from './components/ArchitecturalFrame';
import { CinematicBackdrop } from './components/CinematicBackdrop';
import { FooterBar } from './components/FooterBar';
import { HeroSection } from './components/HeroSection';
import { Preloader } from './components/Preloader';
import { usePointerEffects } from './hooks/usePointerEffects';

function getInitialMotionPreference() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function App() {
  const [isPreloading, setIsPreloading] = useState(
    () => !getInitialMotionPreference()
  );

  const { isInteractive, glowX, glowY, heroX, heroY, frameX, frameY } =
    usePointerEffects();

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloading(false);
  }, []);

  const isHeroReady = !isPreloading;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050505]">
        <Preloader
          isVisible={isPreloading}
          onComplete={handlePreloaderComplete}
        />

        <CinematicBackdrop
          isReady={isHeroReady}
          isInteractive={isInteractive}
          glowX={glowX}
          glowY={glowY}
        />

        <ArchitecturalFrame
          isReady={isHeroReady}
          frameX={frameX}
          frameY={frameY}
          isInteractive={isInteractive}
        />

        {/* Optical balance spacer matching bottom footer height */}
        <div aria-hidden="true" className="h-14 shrink-0 sm:h-20" />

        <main className="flex flex-1 flex-col">
          <HeroSection
            isReady={isHeroReady}
            heroX={heroX}
            heroY={heroY}
            isInteractive={isInteractive}
          />
        </main>

        <FooterBar isReady={isHeroReady} />
      </div>
    </MotionConfig>
  );
}

export default App;

