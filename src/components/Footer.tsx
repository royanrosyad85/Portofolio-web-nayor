
// import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const footerLinks = [
    {
      title: "Pages",
      links: [
        { name: "Home", href: "/#hero" },
        { name: "About", href: "/#about" },
        { name: "Projects", href: "/#projects" },
        { name: "Contact", href: "/#contact" }
      ]
    },
    {
      title: "Social",
      links: [
        { name: "LinkedIn", href: "https://www.linkedin.com/in/royanrosyad/" },
        { name: "GitHub", href: "https://github.com/royanrosyad85" }
      ]
    }
  ];

  return (
    <footer className="bg-secondary/10 pt-10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <a href="/#hero" className="text-2xl font-bold text-gradient mb-4 inline-block">
              Royanrosyad
            </a>
            <p className="text-sm text-muted-foreground mb-6">
              AI/ML Engineer creating intelligent solutions to complex problems through data-driven approaches.
            </p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold mb-4">{group.title}</h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} Royanrosyad. All rights reserved.
          </p>
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              Made with <Heart size={12} className="mx-1 text-primary" /> by Royanrosyad
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
