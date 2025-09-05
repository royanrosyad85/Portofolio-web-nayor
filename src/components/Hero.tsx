import { useEffect, useRef } from 'react';

const Hero = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const typingElement = typingRef.current;
    if (!typingElement) return;
    
    const texts = ["AI/ML Engineer!", "AI Automation Engineer!"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    
    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
      }
      
      setTimeout(type, typingDelay);
    };
    
    setTimeout(type, 1000);
  }, []);
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-12 md:pt-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 opacity-90"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left animate-fade-in order-2 md:order-1">
            {/* <span className="inline-block py-1 px-3 mb-4 text-sm font-medium rounded-full glass-effect">
              Welcome to my portfolio
            </span> */}
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              Hi, I'm <span className="text-foreground">Royanrosyad</span>
            </h1>
            
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
              <span className="mr-2">I'm a</span>
              <span ref={typingRef} className="text-black dark:text-white font-bold"></span>
              <span className="animate-pulse text-black dark:text-white">|</span>
            </div>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 text-muted-foreground">
              Building intelligent systems and extracting insights from data to solve real-world problems.
            </p>
            
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="flex-1 sm:flex-none px-6 py-3 font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                View My Work
              </a>
              <a 
                href="/img/[Resume] ATS Royanrosyad 31-07-2025.pdf" 
                target="_blank" // Buka di tab baru
                rel="noopener noreferrer" // Keamanan
                className="flex-1 sm:flex-none px-6 py-3 font-medium rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors text-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                My Resume
              </a>
              {/* <a 
                href="#contact" 
                className="px-6 py-3 font-medium rounded-lg glass-effect hover:bg-white/10 transition-colors"
              >
                Contact Me
              </a> */}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center animate-fade-in order-1 md:order-2" style={{ animationDelay: '200ms' }}>
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg glass-effect p-2">
              <img 
                src="/img/Linkedin-profil-foto-royanrosyad.jpg"
                alt="Royanrosyad Formal Photo" 
                className="rounded-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
