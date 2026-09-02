import { ArrowDownRight, DownloadSimple } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'framer-motion';
import OptimizedImage from '@/components/common/OptimizedImage';
import { siteConfig } from '@/config/site';
import { EASE_OUT_EXPO } from '@/lib/motion';

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.2 : 0.65, ease: EASE_OUT_EXPO } },
  };

  return (
    <section
      id="hero"
      className="hero-surface relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-16"
    >
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <div className="page-shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-16">
          <motion.div variants={container} initial="hidden" animate="visible" className="order-2 space-y-9 lg:order-1">
            <div className="space-y-6">
              <motion.h1
                variants={item}
                className="hero-title max-w-3xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-7xl"
              >
                Hi, I&apos;m Royan Rosyad<span aria-hidden="true">👋</span>
              </motion.h1>

              <motion.p variants={item} className="max-w-2xl text-pretty text-base leading-8 text-foreground/72 dark:text-zinc-300 sm:text-lg">
                I&apos;m {siteConfig.name}, an AI Engineer and Data Scientist building agentic systems, applied machine learning, and automation that make complex work easier to run.
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="hero-primary-action group"
              >
                <span>Explore selected work</span>
                <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" weight="bold" />
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-secondary-action group"
              >
                <span>Resume</span>
                <DownloadSimple className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" weight="bold" />
              </a>
            </motion.div>

            <motion.div variants={item} className="hero-proof-line">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">Current focus</span>
              <span>Agentic automation</span>
              <span>Building agents</span>
              <span>Product-minded delivery</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(16px) scale(0.97)' }}
            animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
            transition={{ duration: reduceMotion ? 0.2 : 0.75, delay: reduceMotion ? 0 : 0.16, ease: EASE_OUT_EXPO }}
            className="order-1 mx-auto w-full max-w-[27rem] lg:order-2 lg:max-w-none"
          >
            <div className="hero-portrait-frame">
              <OptimizedImage
                src="/img/Royanrosyad-left.png"
                alt="Portrait of Royan Rosyad"
                className="h-full w-full object-cover object-center grayscale-[12%] transition-[filter,transform] duration-500 hover:scale-[1.02] hover:grayscale-0"
                width={840}
                height={1050}
                priority
              />
              <div className="hero-role-card">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">Currently</span>
                <strong>Associate AI Engineer</strong>
                <span>Straitpoint Indonesia</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
