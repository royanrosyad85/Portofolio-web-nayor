import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Briefcase, House, GraduationCap, Moon, Sun, User, ChatCircleDots, SuitcaseSimple } from '@phosphor-icons/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const sectionIds = ['hero', 'projects', 'about', 'experience', 'education', 'contact'] as const;

const IconNavigation = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('hero');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id as (typeof sectionIds)[number]);
        }
      },
      {
        rootMargin: '-32% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return null;
  }

  const navItems = [
    { icon: House, label: 'Home', href: '/#hero', section: 'hero' as const },
    { icon: Briefcase, label: 'Projects', href: '/#projects', section: 'projects' as const },
    { icon: User, label: 'About', href: '/#about', section: 'about' as const },
    { icon: SuitcaseSimple, label: 'Experience', href: '/#experience', section: 'experience' as const },
    { icon: GraduationCap, label: 'Education', href: '/#education', section: 'education' as const },
    { icon: ChatCircleDots, label: 'Contact', href: '/#contact', section: 'contact' as const },
  ];

  const isDark = resolvedTheme === 'dark';
  const ThemeIcon = isDark ? Sun : Moon;

  return (
    <TooltipProvider delayDuration={220}>
      <nav aria-label="Section navigation" className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-fit -translate-x-1/2 sm:bottom-6 sm:w-auto">
        <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/75 p-2 shadow-[0_22px_70px_-34px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/72 dark:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.72)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.section;

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative h-11 w-11 rounded-full transition-all duration-300 ${
                      active
                        ? 'bg-foreground text-background shadow-[0_18px_34px_-22px_rgba(15,23,42,0.7)] dark:bg-white dark:text-zinc-950'
                        : 'text-foreground/70 hover:bg-background/80 hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100'
                    }`}
                    asChild
                  >
                    <a href={item.href} aria-label={item.label}>
                      <Icon className="h-5 w-5" weight={active ? 'fill' : 'regular'} />
                      {active ? <span className="absolute -top-0.5 right-1 h-2 w-2 rounded-full bg-primary" /> : null}
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={12} className="rounded-full border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-lg">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          <div className="mx-1 h-7 w-px bg-foreground/10 dark:bg-white/10" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="h-11 w-11 rounded-full text-foreground/70 transition-all duration-300 hover:bg-background/80 hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                aria-label="Toggle theme"
              >
                <ThemeIcon className="h-5 w-5" weight="regular" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={12} className="rounded-full border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-lg">
              {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default IconNavigation;
