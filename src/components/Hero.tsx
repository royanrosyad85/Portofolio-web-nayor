import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const typingElement = typingRef.current;
    if (!typingElement) return;
    
    const texts = ["AI Engineer!", "ML Engineer!", "Data Scientist!", "AI Automation Engineer!"];
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
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 md:pt-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 opacity-90"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left animate-fade-in">
            {/* <span className="inline-block py-1 px-3 mb-4 text-sm font-medium rounded-full glass-effect">
              Welcome to my portfolio
            </span> */}
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              Hi, I'm <span className="text-gradient">Royanrosyad</span>
            </h1>
            
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
              <span className="mr-2">I'm a</span>
              <span ref={typingRef} className="text-white font-medium"></span>
              <span className="animate-pulse">|</span>
            </div>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 text-muted-foreground">
              Building intelligent systems and extracting insights from data to solve real-world problems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="px-6 py-3 font-medium rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
              >
                View My Work
              </a>
              <a 
                href="/img/[Resume] ATS Royanrosyad - Cloud Data Engineer.pdf" // Ganti dengan path ke file PDF resume Anda
                target="_blank" // Buka di tab baru
                rel="noopener noreferrer" // Keamanan
                className="px-6 py-3 font-medium rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                My Resume
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 font-medium rounded-lg glass-effect hover:bg-white/10 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
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
      
      <a 
        href="#about"
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full glass-effect animate-bounce cursor-pointer"
      >
        <ArrowDown size={16} className="sm:hidden" />
        <ArrowDown size={18} className="hidden sm:block md:hidden" />
        <ArrowDown size={20} className="hidden md:block" />
      </a>
    </section>
  );
};

export default Hero;
