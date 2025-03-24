
import React from 'react';
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
        { name: "Blog", href: "/#blog" },
        { name: "Contact", href: "/#contact" }
      ]
    },
    {
      title: "Social",
      links: [
        { name: "LinkedIn", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "Medium", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-secondary/10 pt-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <a href="/#hero" className="text-2xl font-bold text-gradient mb-4 inline-block">
              Royanrosyad
            </a>
            <p className="text-sm text-muted-foreground mb-6">
              AI/ML Engineer creating intelligent solutions to complex problems through data-driven approaches.
            </p>
            <div className="flex space-x-4">
              {["LinkedIn", "GitHub", "Twitter", "Medium"].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-8 h-8 rounded-full glass-effect flex items-center justify-center text-xs hover:bg-white/10 transition-colors"
                  aria-label={social}
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
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
          
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get the latest updates on my work and blog articles.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 text-sm bg-secondary/20 border border-border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-r-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
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
      
      <button 
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
