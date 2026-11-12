import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { CinematicBackdrop } from './components/CinematicBackdrop';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { FooterBar } from './components/FooterBar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { LaunchStatusSection } from './components/LaunchStatusSection';
import { Preloader } from './components/Preloader';
import { TopBar } from './components/TopBar';
import { VisionSection } from './components/VisionSection';
import { usePointerEffects } from './hooks/usePointerEffects';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function getInitialMotionPreference() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function App() {
  const [isPreloading, setIsPreloading] = useState(
    () => !getInitialMotionPreference()
  );

  const { scrollToTarget } = useSmoothScroll();
  const {
    isInteractive,
    pointerRef,
    mouseX,
    mouseY,
    glowX,
    glowY,
    heroX,
    heroY,
  } = usePointerEffects();

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloading(false);
  }, []);

  const isHeroReady = !isPreloading;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full bg-[#050505] text-[#F5F0E6]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-[#D5B474] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-[#050505]"
        >
          Skip to main content
        </a>

        <Preloader
          isVisible={isPreloading}
          onComplete={handlePreloaderComplete}
        />

        <CustomCursor
          isInteractive={isInteractive}
          mouseX={mouseX}
          mouseY={mouseY}
          glowX={glowX}
          glowY={glowY}
        />

        <CinematicBackdrop />

        <TopBar isReady={isHeroReady} onNavigate={scrollToTarget} />

        <main id="main-content" className="relative z-10">
          <HeroSection
            isReady={isHeroReady}
            heroX={heroX}
            heroY={heroY}
            isInteractive={isInteractive}
            pointerRef={pointerRef}
            onExplore={scrollToTarget}
          />
          <IntroSection />
          <VisionSection />
          <LaunchStatusSection />
          <ContactSection />
        </main>

        <FooterBar onNavigate={scrollToTarget} />
      </div>
    </MotionConfig>
  );
}

export default App;
