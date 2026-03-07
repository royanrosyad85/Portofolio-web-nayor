import { motion } from 'framer-motion';
import { ArrowSquareOut, GraduationCap, Certificate } from '@phosphor-icons/react';
import { certifications, education } from '@/data/portfolio';

const Education = () => {
  return (
    <section id="education" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="page-shell page-narrow space-y-10">
        <div className="space-y-3">
          <div className="section-kicker">Education & Certifications</div>
          <h2 className="text-3xl tracking-tight font-medium max-w-2xl">
            Academic background and continuous learning.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {education.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex-1 flex flex-col"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 mb-6">
                  <GraduationCap className="h-6 w-6" weight="duotone" />
                </div>
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">{item.period}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{item.degree}</h3>
                  <p className="mt-1 text-sm font-medium text-foreground/80 dark:text-zinc-300">{item.institution}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-foreground/70 dark:text-zinc-400">{item.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {item.achievements.map((achievement) => (
                    <span key={achievement} className="rounded-2xl border border-border bg-secondary px-3.5 py-2 text-xs font-medium leading-relaxed text-foreground dark:bg-accent dark:text-zinc-200">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="flex flex-col gap-4">
            {certifications.slice(0, 4).map((certification, index) => (
              <motion.a
                key={certification.id}
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group flex items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors">
                    <Certificate className="h-5 w-5" weight="duotone" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">{certification.date}</p>
                    <h3 className="mt-1 text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50">{certification.name}</h3>
                    <p className="text-sm text-foreground/60 dark:text-zinc-400">{certification.issuer}</p>
                  </div>
                </div>
                <ArrowSquareOut className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600 group-hover:text-primary transition-colors" weight="bold" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
