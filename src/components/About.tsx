import { motion } from 'framer-motion';
import { BracketsCurly, CirclesThreePlus, Database, Robot } from '@phosphor-icons/react';
import { capabilityGroups, highlightPillars } from '@/data/portfolio';

const icons = [Robot, Database, BracketsCurly, CirclesThreePlus] as const;

const About = () => {
  return (
    <section id="about" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="page-shell grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="editorial-card flex flex-col justify-between gap-8 p-6 sm:p-7 lg:p-8">
          <div className="space-y-5">
            <div className="section-kicker">Working method</div>
            <h2 className="section-title max-w-xl">I approach AI work like a product system, not a notebook experiment.</h2>
            <p className="section-subtitle mb-0 max-w-xl">
              The strongest projects tend to sit at the intersection of research, structure, and usability. My focus is building systems that make model output, automation, and decision support accessible to the teams who need them daily.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {highlightPillars.map((pillar, index) => {
              const Icon = icons[index % icons.length];

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[1.5rem] border border-foreground/10 bg-background/75 p-4 dark:border-white/10 dark:bg-black/10"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background dark:bg-white dark:text-zinc-950">
                    <Icon className="h-5 w-5" weight="duotone" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          {capabilityGroups.map((group, index) => {
            const Icon = icons[(index + 1) % icons.length];

            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="editorial-card p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="section-kicker">Capability group {String(index + 1).padStart(2, '0')}</div>
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">{group.title}</h3>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-background/70 dark:border-white/10 dark:bg-white/5">
                    <Icon className="h-5 w-5 text-foreground dark:text-zinc-100" weight="duotone" />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-foreground/10 bg-background/80 px-3 py-1.5 text-sm text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
