import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { 
  Home, 
  User, 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Sun, 
  Moon,
  Monitor
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const IconNavigation = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', href: '/#hero', section: 'hero' },
    { icon: User, label: 'About', href: '/#about', section: 'about' },
    { icon: FolderOpen, label: 'Projects', href: '/#projects', section: 'projects' },
    { icon: Briefcase, label: 'Experience', href: '/#experience', section: 'experience' },
    { icon: GraduationCap, label: 'Education', href: '/#education', section: 'education' },
    { icon: Mail, label: 'Contact', href: '/#contact', section: 'contact' },
  ];

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') return Sun;
    return Moon;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Switch to Dark Mode';
    return 'Switch to Light Mode';
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  const ThemeIcon = getThemeIcon();

  return (
    <TooltipProvider delayDuration={300}>
      <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 rounded-2xl glass-effect backdrop-blur-xl bg-background/90 border border-border/50 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;
            
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md relative ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                        : 'hover:bg-secondary/80'
                    }`}
                    asChild
                  >
                    <a href={item.href} aria-label={item.label}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {isActive && (
                        <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full animate-pulse" />
                      )}
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  sideOffset={12}
                  className="bg-popover text-popover-foreground border border-border shadow-lg rounded-lg px-3 py-2"
                >
                  <p className="text-sm font-medium">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
          
          {/* Theme Toggle Separator */}
          <div className="w-px h-6 sm:h-8 bg-border/50 mx-1 sm:mx-2" />
          
          {/* Theme Toggle Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl hover:bg-secondary/80 transition-all duration-300 hover:scale-110 hover:shadow-md"
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
              >
                <ThemeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              sideOffset={12}
              className="bg-popover text-popover-foreground border border-border shadow-lg rounded-lg px-3 py-2"
            >
              <p className="text-sm font-medium">{getThemeLabel()}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default IconNavigation;
