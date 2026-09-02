import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useLenis } from 'lenis/react';
import { motion } from 'framer-motion';
import { Briefcase, House, GraduationCap, Moon, Sun, User, ChatCircleDots, SuitcaseSimple } from '@phosphor-icons/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useActiveSection } from '@/hooks/use-active-section';
import { EASE_OUT_EXPO } from '@/lib/motion';

const sectionIds = ['hero', 'about', 'projects', 'experience', 'education', 'contact'] as const;

const navItems = [
  { icon: House, label: 'Home', section: 'hero' as const },
  { icon: User, label: 'Skills', section: 'about' as const },
  { icon: Briefcase, label: 'Projects', section: 'projects' as const },
  { icon: SuitcaseSimple, label: 'Experience', section: 'experience' as const },
  { icon: GraduationCap, label: 'Education', section: 'education' as const },
  { icon: ChatCircleDots, label: 'Contact', section: 'contact' as const },
];

const IconNavigation = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);
  const activeSection = useActiveSection(sectionIds, 'hero');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isHome = pathname === '/';

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    // On the home page, intercept and smooth-scroll via Lenis. Elsewhere, let the
    // browser navigate to "/#section" so the home page can resolve the hash itself.
    if (!isHome) {
      return;
    }

    event.preventDefault();
    const target = document.getElementById(section);
    if (!target) {
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 0.45 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.history.replaceState(null, '', `#${section}`);
  };

  const isDark = resolvedTheme === 'dark';
  const ThemeIcon = isDark ? Sun : Moon;

  return (
    <TooltipProvider delayDuration={220}>
      <motion.nav
        aria-label="Section navigation"
        initial={{ opacity: 0, transform: 'translate(-50%, 24px)' }}
        animate={{ opacity: 1, transform: 'translate(-50%, 0)' }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-fit sm:bottom-6 sm:w-auto"
      >
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/90 p-2 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.16)] backdrop-blur-md dark:bg-card/80 dark:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.45)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isHome && activeSection === item.section;

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative h-10 w-10 rounded-full transition-[background-color,color,transform] duration-300 active:scale-[0.96] ${
                      active
                        ? 'bg-foreground text-background dark:bg-white dark:text-zinc-950'
                        : 'text-foreground/65 hover:bg-background hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100'
                    }`}
                    asChild
                  >
                    <a href={`/#${item.section}`} aria-label={item.label} onClick={(event) => handleNavClick(event, item.section)}>
                      <Icon className="h-4.5 w-4.5" weight={active ? 'fill' : 'regular'} />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={12} className="rounded-full border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-lg">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          <div className="mx-1 h-6 w-px bg-border" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="h-10 w-10 rounded-full text-foreground/65 transition-[background-color,color,transform] duration-300 active:scale-[0.96] hover:bg-background hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                aria-label="Toggle theme"
              >
                <ThemeIcon className="h-4.5 w-4.5" weight="regular" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={12} className="rounded-full border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-lg">
              {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.nav>
    </TooltipProvider>
  );
};

export default IconNavigation;
