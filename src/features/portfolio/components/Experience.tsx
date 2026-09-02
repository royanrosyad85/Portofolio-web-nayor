import { motion } from 'framer-motion';
import { Briefcase, Buildings } from '@phosphor-icons/react';
import { experiences } from '@/features/portfolio/data/portfolio';
import type { CompanyLogo } from '@/types/portfolio';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';

type LogoConfig =
  | { kind: 'image'; src: string; alt: string; imageClassName: string; wrapperClassName?: string }
  | { kind: 'monogram'; label: string; alt: string }
  | { kind: 'icon' };

const companyLogos: Record<CompanyLogo, LogoConfig> = {
  straitpoint: {
    kind: 'image',
    src: '/logo/Straitpoint.jpeg',
    alt: 'Straitpoint Indonesia logo',
    imageClassName: 'h-6 w-full object-contain',
    wrapperClassName: 'p-1.5',
  },
  zurich: {
    kind: 'image',
    src: '/logo/Zurich Insurance.png',
    alt: 'Zurich Insurance Indonesia logo',
    imageClassName: 'h-5.5 w-full object-contain',
    wrapperClassName: 'p-1.5',
  },
  lintasarta: {
    kind: 'image',
    src: '/logo/Lintasarta.png',
    alt: 'Lintasarta logo',
    imageClassName: 'h-5 w-full object-contain',
    wrapperClassName: 'p-1.5',
  },
  kemenag: {
    kind: 'image',
    src: '/logo/kemenag logo.png',
    alt: 'Ministry of Religion logo',
    imageClassName: 'h-7 w-full object-contain',
    wrapperClassName: 'p-1',
  },
  bangkit: {
    kind: 'image',
    src: '/logo/Bangkit logo.jpg',
    alt: 'Bangkit Academy logo',
    imageClassName: 'h-6.5 w-full object-contain',
    wrapperClassName: 'p-1',
  },
  government: { kind: 'icon' },
};

const Experience = () => {
  return (
    <section id="experience" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="page-shell page-narrow">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_2fr] md:gap-8">
          <div className="space-y-4 md:sticky md:top-32">
            <div className="section-kicker">Experience</div>
            <h2 className="max-w-sm text-3xl font-medium tracking-tight">My work experience.</h2>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Recent roles in AI engineering and machine learning.
            </p>
          </div>

          <div className="relative space-y-5 md:pl-8">
            {/* Timeline rail */}
            <span className="absolute bottom-3 left-2 top-3 hidden w-px bg-gradient-to-b from-border via-border to-transparent md:block" aria-hidden="true" />

            {experiences.map((experience, index) => {
              const logo = companyLogos[experience.companyLogo];
              const isCurrent = experience.period.toLowerCase().includes('present');

              return (
                <motion.article
                  key={experience.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className="group relative rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
                >
                  {/* Timeline node */}
                  <span
                    className={`absolute -left-[1.65rem] top-9 hidden h-3 w-3 items-center justify-center rounded-full border-2 border-background md:flex ${
                      isCurrent ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-600'
                    }`}
                    aria-hidden="true"
                  >
                    {isCurrent ? (
                      <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-500/70" />
                    ) : null}
                  </span>

                  <div className="absolute right-8 top-8 text-zinc-300 transition-colors group-hover:text-primary dark:text-zinc-700">
                    <Briefcase className="h-6 w-6" weight="duotone" />
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-[0.7rem] uppercase tracking-widest tabular-nums text-muted-foreground">{experience.period}</p>
                        {isCurrent ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                            Current
                          </span>
                        ) : null}
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{experience.role}</h3>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div
                          className={`inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/80 ${
                            logo.kind === 'image' ? (logo.wrapperClassName ?? 'p-1.5') : 'p-1.5'
                          }`}
                        >
                          {logo.kind === 'image' ? (
                            <img src={logo.src} alt={logo.alt} className={logo.imageClassName} loading="lazy" decoding="async" />
                          ) : logo.kind === 'monogram' ? (
                            <span
                              className="flex h-full w-full items-center justify-center rounded-[0.65rem] bg-gradient-to-br from-zinc-900 to-zinc-700 text-xs font-bold tracking-tight text-white dark:from-white dark:to-zinc-300 dark:text-zinc-900"
                              aria-label={logo.alt}
                            >
                              {logo.label}
                            </span>
                          ) : (
                            <Buildings className="h-5 w-5 text-zinc-500 dark:text-zinc-300" weight="duotone" aria-hidden="true" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground/80 dark:text-zinc-300">
                          {experience.company} <span className="ml-1 font-normal text-muted-foreground">— {experience.location}</span>
                        </p>
                      </div>
                    </div>

                    <p className="max-w-xl text-pretty text-sm leading-relaxed text-foreground/70 dark:text-zinc-400">{experience.summary}</p>

                    <ul className="space-y-2 pt-1">
                      {experience.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70 dark:text-zinc-400">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
