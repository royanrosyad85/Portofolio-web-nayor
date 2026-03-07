import { useMemo } from 'react';
import { ArrowDownRight, DownloadSimple, Sparkle, Stack, Strategy, TrendUp } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { featuredMetrics } from '@/data/portfolio';

const roleSequence = [
  'AI systems builder',
  'automation-focused engineer',
  'applied machine learning practitioner',
];

const orbitCards = [
  {
    title: 'Research to workflow',
    description: 'Structuring complex data and turning it into usable decisions.',
    icon: Strategy,
  },
  {
    title: 'Operational AI',
    description: 'Interfaces that help teams work faster, not just demo better.',
    icon: Sparkle,
  },
  {
    title: 'Measured delivery',
    description: 'Product thinking combined with practical model deployment.',
    icon: TrendUp,
  },
];

const sentence = 'I design AI products, enrichment workflows, and machine learning systems that turn operational complexity into interfaces people can actually use.';

const Hero = () => {
  const words = useMemo(() => sentence.split(' '), []);

  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-panel relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/78 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/72 dark:shadow-[0_30px_90px_-45px_rgba(0,0,0,0.78)] md:p-8 lg:min-h-[78dvh] lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,94,79,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.06),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(95,210,180,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-1.5 text-[0.68rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] dark:border-white/10 dark:bg-white/5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available for selected AI product work
                  </span>
                  <span>Jakarta — Depok</span>
                </div>

                <div className="max-w-4xl space-y-5">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Royan Rosyad
                  </p>
                  <h1 className="max-w-5xl text-balance text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-[3.6rem] lg:text-[5.4rem]">
                    Applied intelligence for teams that need more than a model demo.
                  </h1>
                  <div className="flex flex-wrap gap-2 text-sm font-medium text-muted-foreground">
                    {roleSequence.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center rounded-full border border-foreground/10 bg-background/65 px-3 py-1.5 text-[0.78rem] text-foreground/80 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <p className="max-w-3xl text-pretty text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
                    {words.map((word, index) => (
                      <motion.span
                        key={`${word}-${index}`}
                        initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.38, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
                        className="mr-[0.35em] inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href="#projects" className="primary-cta">
                    See selected work
                    <ArrowDownRight className="h-4 w-4" weight="bold" />
                  </a>
                  <a
                    href="/img/[Resume] ATS Royanrosyad Updated Sept.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-cta"
                  >
                    Download resume
                    <DownloadSimple className="h-4 w-4" weight="bold" />
                  </a>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {featuredMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
                    className="rounded-[1.5rem] border border-foreground/10 bg-background/76 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <div className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</div>
                    <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">{metric.value}</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{metric.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-4"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-zinc-950 p-5 text-zinc-50 shadow-[0_28px_80px_-35px_rgba(15,23,42,0.46)] dark:border-white/10 dark:bg-zinc-900 sm:p-6 lg:min-h-[420px]">
              <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.2em] text-zinc-400">
                  <span>Portfolio signal</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-zinc-200">
                    <Stack className="h-4 w-4" weight="duotone" />
                    Fresh layout
                  </span>
                </div>

                <div className="mx-auto w-full max-w-[20rem] rounded-[1.75rem] border border-white/10 bg-white/6 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg">
                  <div className="rounded-[1.4rem] overflow-hidden bg-zinc-900/50">
                    <OptimizedImage
                      src="/img/Linkedin-profil-foto-royanrosyad.jpg"
                      alt="Royan Rosyad portrait"
                      className="h-full w-full object-cover"
                      width={840}
                      height={960}
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Current focus</p>
                  <p className="max-w-md text-lg leading-8 text-zinc-100">
                    Building agent-assisted workflows, enrichment tools, and applied ML interfaces that make structured decisions faster.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {orbitCards.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 + index * 0.08 }}
                  className="rounded-[1.7rem] border border-white/45 bg-white/78 p-5 shadow-[0_18px_60px_-34px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_22px_70px_-38px_rgba(0,0,0,0.76)]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background dark:bg-white dark:text-zinc-950">
                    <Icon className="h-5 w-5" weight="duotone" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
