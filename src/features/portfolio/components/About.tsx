import { capabilityGroups } from '@/features/portfolio/data/portfolio';
import { SkillIcon } from '@/features/portfolio/lib/skill-icons';
import SectionHeader from '@/features/portfolio/components/SectionHeader';

const sectionIndexMap = {
  'Programming Languages': '01',
  'AI/ML Frameworks': '02',
  'Cloud & DevOps': '03',
} as const;

const About = () => {
  return (
    <section id="about" aria-labelledby="skills-title" className="section">
      <div className="container-page">
        <SectionHeader
          label="Relevant skills"
          title="Core tools I use across AI systems, ML workflows, and deployment."
          titleId="skills-title"
        />

        <div className="mt-12 divide-y lg:mt-16">
          {capabilityGroups.map((group) => (
            <div key={group.title} className="rail-row py-8 first:pt-0 last:pb-0" data-reveal>
              <h3 className="flex items-baseline gap-3 text-[0.9375rem] font-semibold text-foreground lg:col-span-3 lg:pt-2">
                <span className="meta font-normal" aria-hidden="true">
                  {sectionIndexMap[group.title as keyof typeof sectionIndexMap]}
                </span>
                {group.title}
              </h3>

              <ul className="flex flex-wrap gap-2 lg:col-span-9">
                {group.items.map((skill) => (
                  <li key={skill.name} className="skill-chip">
                    <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
                      <SkillIcon logo={skill.logo} />
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
