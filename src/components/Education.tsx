import { motion } from 'framer-motion';
import { ArrowSquareOut, GraduationCap, Medal } from '@phosphor-icons/react';
import { certifications, education } from '@/data/portfolio';

const Education = () => {
  return (
    <section id="education" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="page-shell grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="editorial-card flex flex-col gap-6 p-6 sm:p-7">
          <div className="section-kicker">Education</div>
          {education.map((item) => (
            <div key={item.id} className="space-y-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background dark:bg-white dark:text-zinc-950">
                <GraduationCap className="h-5 w-5" weight="duotone" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{item.period}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">{item.degree}</h2>
                <p className="mt-2 text-base text-foreground/80 dark:text-zinc-200">{item.institution}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
              </div>
              <p className="text-base leading-8 text-zinc-600 dark:text-zinc-300">{item.description}</p>
              <div className="rounded-[1.5rem] border border-foreground/10 bg-background/75 p-4 dark:border-white/10 dark:bg-black/10">
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">Highlights</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="editorial-card p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="section-kicker">Credentials</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">Certifications and continuous learning</h2>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-background/70 dark:border-white/10 dark:bg-white/5">
              <Medal className="h-5 w-5 text-foreground dark:text-zinc-100" weight="duotone" />
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {certifications.map((certification, index) => (
              <motion.a
                key={certification.id}
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group rounded-[1.5rem] border border-foreground/10 bg-background/70 p-4 transition-transform duration-300 hover:-translate-y-[2px] dark:border-white/10 dark:bg-black/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{certification.date}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">{certification.name}</h3>
                    <p className="mt-1 text-sm text-foreground/80 dark:text-zinc-200">{certification.issuer}</p>
                    {certification.credentialId ? (
                      <p className="mt-2 text-sm text-muted-foreground">Credential ID: {certification.credentialId}</p>
                    ) : null}
                  </div>
                  <ArrowSquareOut className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground dark:group-hover:text-zinc-100" weight="bold" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
