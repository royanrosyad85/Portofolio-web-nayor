import { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import IconNavigation from '../components/IconNavigation';

const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        requestAnimationFrame(() => {
          targetElement.scrollIntoView({ block: 'start' });
        });
      }

      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

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
        <About />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <IconNavigation />
    </div>
  );
};

export default Index;
