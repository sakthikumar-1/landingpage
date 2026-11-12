import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { AboutSection } from './components/AboutSection';
import { CinematicBackdrop } from './components/CinematicBackdrop';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { FooterBar } from './components/FooterBar';
import { HeroSection } from './components/HeroSection';
import { LaunchStatusSection } from './components/LaunchStatusSection';
import { Preloader } from './components/Preloader';
import { TopBar } from './components/TopBar';
import { VisionSection } from './components/VisionSection';
import { ThemeProvider } from './context/ThemeContext';
import { usePointerEffects } from './hooks/usePointerEffects';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function getInitialMotionPreference() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ExperienceShell() {
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
    <div className="theme-surface relative min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-[var(--bg-primary)]"
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
        <AboutSection />
        <VisionSection />
        <LaunchStatusSection />
        <ContactSection />
      </main>

      <FooterBar onNavigate={scrollToTarget} />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <ExperienceShell />
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
