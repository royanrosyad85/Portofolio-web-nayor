import { ArrowDownRight, DownloadSimple } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'framer-motion';
import OptimizedImage from '@/components/common/OptimizedImage';
import { siteConfig } from '@/config/site';
import { useScrollTo } from '@/hooks/use-scroll-to';
import { EASE_OUT_EXPO } from '@/lib/motion';

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const scrollTo = useScrollTo();

  const handleExploreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('projects');
    if (!target) return;
    event.preventDefault();
    scrollTo(target);
    window.history.replaceState(null, '', '#projects');
  };

  // The page's one orchestrated moment: copy materialises in sequence, then the portrait.
  // Filters resolve to `none` afterwards so no blur layer lingers while scrolling.
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16, filter: reduceMotion ? 'blur(0px)' : 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transitionEnd: { filter: 'none' },
      transition: { duration: reduceMotion ? 0.2 : 0.7, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <section id="hero" aria-labelledby="hero-title" className="hero-surface relative overflow-hidden">
      <div className="container-page grid items-center gap-12 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-28">
        <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-7">
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            <motion.h1 id="hero-title" variants={item} className="hero-title">
              Hi, I&apos;m Royan Rosyad
              <motion.span
                aria-hidden="true"
                className="ml-[0.08em] inline-block origin-[70%_75%] text-[0.82em]"
                initial={{ rotate: 0 }}
                animate={reduceMotion ? undefined : { rotate: [0, 16, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.4, delay: 0.75, ease: 'easeInOut' }}
              >
                👋
              </motion.span>
            </motion.h1>

            <motion.div
              variants={item}
              className="shrink-0 lg:hidden"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-border/80 bg-secondary shadow-sm sm:h-24 sm:w-24">
                <OptimizedImage
                  src="/img/Royanrosyad-left.png"
                  alt="Portrait of Royan Rosyad"
                  fill
                  className="object-cover object-[center_20%]"
                  priority
                />
              </div>
            </motion.div>
          </div>

          <motion.p
            variants={item}
            className="mt-7 max-w-[34rem] text-pretty text-lg leading-relaxed text-foreground/70 sm:text-xl sm:leading-relaxed"
          >
            I&apos;m {siteConfig.name}, an AI Engineer and Data Scientist building agentic systems, applied machine learning, and automation that make complex work easier to run.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" onClick={handleExploreClick} className="btn btn-primary group h-12 px-6">
              <span>Explore selected work</span>
              <ArrowDownRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary group h-12 px-6"
            >
              <span>Resume</span>
              <DownloadSimple
                size={16}
                weight="bold"
                className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 grid gap-2 sm:mt-16 sm:gap-3">
            <span className="text-[0.8125rem] font-medium text-muted-foreground">Current focus</span>
            <ul className="hero-focus-list text-[0.9375rem] text-foreground/80">
              <li>Agentic automation</li>
              <li>Building agents</li>
              <li>Product-minded delivery</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97, filter: reduceMotion ? 'blur(0px)' : 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
          transition={{ duration: reduceMotion ? 0.2 : 0.8, delay: reduceMotion ? 0 : 0.16, ease: EASE_OUT_EXPO }}
          className="hidden mx-auto w-full max-w-md lg:block lg:col-span-5 lg:max-w-none"
        >
          {/* Outer radius 28px = role card radius 12px + 16px inset. */}
          <div className="media-outline relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-secondary shadow-[0_30px_80px_-40px_rgba(17,24,39,0.45)] dark:shadow-[0_30px_80px_-36px_rgba(0,0,0,0.8)]">
            <OptimizedImage
              src="/img/Royanrosyad-left.png"
              alt="Portrait of Royan Rosyad"
              fill
              className="object-cover object-[center_22%]"
              width={840}
              height={1050}
              priority
            />
            <div className="glass absolute bottom-4 left-4 right-4 grid gap-0.5 rounded-xl px-4 py-3.5 sm:right-auto sm:min-w-[16rem]">
              <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="live-dot" aria-hidden="true" />
                Currently
              </span>
              <strong className="font-display mt-1 text-[1.0625rem] font-semibold tracking-[-0.015em] text-foreground">
                Associate AI Engineer
              </strong>
              <span className="text-sm text-foreground/65">Straitpoint Indonesia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
