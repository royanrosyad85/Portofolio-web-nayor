
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import IconNavigation from '../components/IconNavigation';

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <About />
        <Projects />
        <Blog />
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
