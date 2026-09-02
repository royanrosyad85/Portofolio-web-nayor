import { motion } from 'framer-motion';
import { capabilityGroups } from '@/features/portfolio/data/portfolio';
import { SkillIcon } from '@/features/portfolio/lib/skill-icons';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';

const sectionIndexMap = {
  'Programming Languages': '01',
  'AI/ML Frameworks': '02',
  'Cloud & DevOps': '03',
} as const;

const About = () => {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="page-shell page-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <div className="section-kicker">Relevant skills</div>
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight">
              Core tools I use across AI systems, ML workflows, and deployment.
            </h2>
          </div>

          <div className="space-y-5">
            {capabilityGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: groupIndex * 0.08, ease: EASE_OUT_EXPO }}
                className="skills-panel"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1 sm:max-w-[14rem]">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] tabular-nums text-muted-foreground">
                      {sectionIndexMap[group.title as keyof typeof sectionIndexMap]}
                    </p>
                    <h3 className="skills-group-title">{group.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:max-w-[44rem]">
                    {group.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.32,
                          delay: groupIndex * 0.05 + skillIndex * 0.02,
                          ease: EASE_OUT_EXPO,
                        }}
                        whileHover={{ y: -2 }}
                        className="skills-chip"
                      >
                        <span className="skills-chip-icon" aria-hidden="true">
                          <SkillIcon logo={skill.logo} />
                        </span>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
