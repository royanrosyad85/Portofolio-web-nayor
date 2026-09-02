import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import Hero from '@/features/portfolio/components/Hero';
import About from '@/features/portfolio/components/About';
import Projects from '@/features/portfolio/components/Projects';
import Experience from '@/features/portfolio/components/Experience';
import Education from '@/features/portfolio/components/Education';
import Contact from '@/features/portfolio/components/Contact';
import Footer from '@/components/common/Footer';
import IconNavigation from '@/components/common/IconNavigation';

const Home = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        requestAnimationFrame(() => {
          if (lenis) {
            lenis.scrollTo(targetElement, { immediate: true });
          } else {
            targetElement.scrollIntoView({ block: 'start' });
          }
        });
      }

      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [lenis]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <IconNavigation />
    </div>
  );
};

export default Home;
