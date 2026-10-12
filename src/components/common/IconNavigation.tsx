import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, House, GraduationCap, Moon, Sun, User, ChatCircleDots, SuitcaseSimple } from '@phosphor-icons/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useActiveSection } from '@/hooks/use-active-section';
import { useScrollTo } from '@/hooks/use-scroll-to';
import { EASE_OUT_EXPO } from '@/lib/motion';

// Listed in page order so the dock mirrors the scroll position (wayfinding).
const sectionIds = ['hero', 'projects', 'about', 'experience', 'education', 'contact'] as const;

const navItems = [
  { icon: House, label: 'Home', section: 'hero' as const },
  { icon: Briefcase, label: 'Projects', section: 'projects' as const },
  { icon: User, label: 'Skills', section: 'about' as const },
  { icon: SuitcaseSimple, label: 'Experience', section: 'experience' as const },
  { icon: GraduationCap, label: 'Education', section: 'education' as const },
  { icon: ChatCircleDots, label: 'Contact', section: 'contact' as const },
];

const indicatorSpring = { type: 'spring', bounce: 0, duration: 0.4 } as const;
const iconSwap = { type: 'spring', bounce: 0, duration: 0.3 } as const;

const tooltipClassName =
  'rounded-full border-0 bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]';

const itemClassName =
  'relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-[color,transform] duration-200 ease-out active:scale-[0.96] motion-reduce:active:scale-100';

const IconNavigation = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const scrollTo = useScrollTo();
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
    // On the home page, intercept and smooth-scroll. Elsewhere, let the
    // browser navigate to "/#section" so the home page can resolve the hash itself.
    if (!isHome) {
      return;
    }

    event.preventDefault();
    const target = document.getElementById(section);
    if (!target) {
      return;
    }

    scrollTo(target);

    window.history.replaceState(null, '', `#${section}`);
  };

  const isDark = resolvedTheme === 'dark';
  const ThemeIcon = isDark ? Sun : Moon;

  return (
    <TooltipProvider delayDuration={220}>
      {/* Outer element owns centring so the dialog-open rule can move it without fighting Framer's inline transform. */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[60] -translate-x-1/2 transition-[opacity,transform] duration-300 ease-out sm:bottom-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT_EXPO }}
          className="glass flex items-center gap-0.5 rounded-full p-1.5"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isHome && activeSection === item.section;

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <a
                    href={`/#${item.section}`}
                    aria-label={item.label}
                    aria-current={active ? 'true' : undefined}
                    onClick={(event) => handleNavClick(event, item.section)}
                    className={`${itemClassName} ${
                      active ? 'text-background' : 'text-foreground/60 hover:bg-foreground/[0.06] hover:text-foreground'
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="dock-active-indicator"
                        transition={indicatorSpring}
                        className="absolute inset-0 rounded-full bg-foreground"
                        aria-hidden="true"
                      />
                    ) : null}
                    <Icon size={18} weight={active ? 'fill' : 'regular'} className="relative" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={12} className={tooltipClassName}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          <div className="mx-1 h-5 w-px bg-foreground/10" aria-hidden="true" />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`${itemClassName} text-foreground/60 hover:bg-foreground/[0.06] hover:text-foreground`}
                aria-label="Toggle theme"
              >
                <span className="relative h-[18px] w-[18px]">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={isDark ? 'sun' : 'moon'}
                      initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                      transition={iconSwap}
                      className="absolute inset-0"
                    >
                      <ThemeIcon size={18} weight="regular" />
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={12} className={tooltipClassName}>
              {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </nav>
    </TooltipProvider>
  );
};

export default IconNavigation;
