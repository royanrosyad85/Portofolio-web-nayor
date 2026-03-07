import { motion } from 'framer-motion';
import { Briefcase } from '@phosphor-icons/react';
import { experiences } from '@/data/portfolio';

const Experience = () => {
  return (
    <section id="experience" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="page-shell page-narrow">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-8 items-start">
          
          <div className="space-y-4 md:sticky md:top-32">
            <div className="section-kicker">Experience</div>
            <h2 className="text-3xl tracking-tight font-medium max-w-sm">
              Roles that shaped my AI engineering work.
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Recent experience across AI workflows, machine learning, automation, infrastructure, and delivery.
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <motion.article
                key={experience.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 0.98, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute top-8 right-8 text-zinc-300 dark:text-zinc-700 group-hover:text-primary transition-colors">
                  <Briefcase className="w-6 h-6" weight="duotone" />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                      {experience.period}
                    </p>
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {experience.role}
                    </h3>
                    <p className="text-sm font-medium text-foreground/80 dark:text-zinc-300">
                      {experience.company} <span className="text-muted-foreground font-normal ml-1">— {experience.location}</span>
                    </p>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-foreground/70 dark:text-zinc-400 max-w-xl">
                    {experience.summary}
                  </p>
                  
                  <ul className="space-y-2 pt-2">
                    {experience.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground/70 dark:text-zinc-400 flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
