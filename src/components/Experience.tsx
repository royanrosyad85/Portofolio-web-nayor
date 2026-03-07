import { motion } from 'framer-motion';
import { ArrowUpRight, Buildings, ClockCountdown } from '@phosphor-icons/react';
import { experiences } from '@/data/portfolio';

const Experience = () => {
  return (
    <section id="experience" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="page-shell space-y-8">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="space-y-4">
            <div className="section-kicker">Experience timeline</div>
            <h2 className="section-title max-w-xl">Experience across AI delivery, automation, infrastructure, and analytics.</h2>
          </div>
          <p className="section-subtitle mb-0 max-w-3xl justify-self-end lg:text-right">
            The work spans public services, insurance, internships, and internal product-like builds. The constant thread is turning ambiguous data or operations into something more structured and easier to act on.
          </p>
        </div>

        <div className="grid gap-4">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="editorial-card grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.55fr_1fr]"
            >
              <div className="space-y-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background dark:bg-white dark:text-zinc-950">
                  <Buildings className="h-5 w-5" weight="duotone" />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{experience.period}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">{experience.role}</h3>
                  <p className="mt-1 text-base text-foreground/80 dark:text-zinc-200">{experience.company}</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockCountdown className="h-4 w-4" weight="duotone" />
                    {experience.location}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.78fr_1fr]">
                <div className="rounded-[1.5rem] border border-foreground/10 bg-background/75 p-4 dark:border-white/10 dark:bg-black/10">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">Summary</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{experience.summary}</p>
                </div>
                <div className="rounded-[1.5rem] border border-foreground/10 bg-background/75 p-4 dark:border-white/10 dark:bg-black/10">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">Selected contributions</p>
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {experience.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-primary" weight="bold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
