import type { CSSProperties, ComponentType } from 'react';
import { motion } from 'framer-motion';
import {
  siDocker,
  siFastapi,
  siGit,
  siGooglecloud,
  siHuggingface,
  siJavascript,
  siJupyter,
  siKeras,
  siKubernetes,
  siLangchain,
  siMediapipe,
  siMlflow,
  siNumpy,
  siPandas,
  siPhp,
  siPython,
  siPytorch,
  siScikitlearn,
  siSpacy,
  siStreamlit,
  siTensorflow,
} from 'simple-icons';
import { Database, FlowArrow, Cloud } from '@phosphor-icons/react';
import { capabilityGroups } from '@/data/portfolio';

type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

type PhosphorIconComponent = ComponentType<{
  className?: string;
  weight?: PhosphorWeight;
  style?: CSSProperties;
}>;

type SvgBrandIcon = {
  kind: 'svg';
  path: string;
  color: string;
  darkColor?: string;
};

type PhosphorBrandIcon = {
  kind: 'phosphor';
  phosphor: PhosphorIconComponent;
  color: string;
  darkColor?: string;
};

type BrandIcon = SvgBrandIcon | PhosphorBrandIcon;

const iconMap: Record<string, BrandIcon> = {
  python: { kind: 'svg', path: siPython.path, color: '#3776AB' },
  php: { kind: 'svg', path: siPhp.path, color: '#777BB4' },
  sql: { kind: 'phosphor', phosphor: Database, color: '#2563EB' },
  javascript: { kind: 'svg', path: siJavascript.path, color: '#F7DF1E', darkColor: '#F7DF1E' },
  langgraph: { kind: 'phosphor', phosphor: FlowArrow, color: '#111827', darkColor: '#F3F4F6' },
  langchain: { kind: 'svg', path: siLangchain.path, color: '#1C3C3C', darkColor: '#D1FAE5' },
  tensorflow: { kind: 'svg', path: siTensorflow.path, color: '#FF6F00' },
  pytorch: { kind: 'svg', path: siPytorch.path, color: '#EE4C2C' },
  scikitlearn: { kind: 'svg', path: siScikitlearn.path, color: '#F7931E' },
  pandas: { kind: 'svg', path: siPandas.path, color: '#150458', darkColor: '#E9D5FF' },
  numpy: { kind: 'svg', path: siNumpy.path, color: '#013243' },
  keras: { kind: 'svg', path: siKeras.path, color: '#D00000' },
  nltk: { kind: 'phosphor', phosphor: FlowArrow, color: '#4B5563', darkColor: '#D1D5DB' },
  spacy: { kind: 'svg', path: siSpacy.path, color: '#09A3D5' },
  huggingface: { kind: 'svg', path: siHuggingface.path, color: '#FFD21E' },
  mediapipe: { kind: 'svg', path: siMediapipe.path, color: '#0097A7' },
  gcp: { kind: 'svg', path: siGooglecloud.path, color: '#4285F4' },
  azure: { kind: 'phosphor', phosphor: Cloud, color: '#0078D4' },
  oracle: { kind: 'phosphor', phosphor: Cloud, color: '#C74634' },
  docker: { kind: 'svg', path: siDocker.path, color: '#2496ED' },
  kubernetes: { kind: 'svg', path: siKubernetes.path, color: '#326CE5' },
  git: { kind: 'svg', path: siGit.path, color: '#F05032' },
  mlflow: { kind: 'svg', path: siMlflow.path, color: '#0194E2' },
  jupyter: { kind: 'svg', path: siJupyter.path, color: '#F37626' },
  streamlit: { kind: 'svg', path: siStreamlit.path, color: '#FF4B4B' },
  fastapi: { kind: 'svg', path: siFastapi.path, color: '#009688' },
};

const sectionIconMap = {
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <div className="section-kicker">Relevant skills</div>
            <h2 className="text-3xl tracking-tight font-medium max-w-2xl">
              Core tools I use across AI systems, ML workflows, and deployment.
            </h2>
          </div>

          <div className="space-y-5">
            {capabilityGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: groupIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="skills-panel"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1 sm:max-w-[14rem]">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {sectionIconMap[group.title as keyof typeof sectionIconMap]}
                    </p>
                    <h3 className="skills-group-title">{group.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:max-w-[44rem]">
                    {group.items.map((skill, skillIndex) => {
                      const icon = iconMap[skill.logo as keyof typeof iconMap];

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.96, y: 10 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{
                            duration: 0.32,
                            delay: groupIndex * 0.05 + skillIndex * 0.02,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          whileHover={{ y: -2 }}
                          className="skills-chip"
                        >
                          <span className="skills-chip-icon" aria-hidden="true">
                            {icon.kind === 'phosphor' ? (
                              <>
                                <icon.phosphor className="h-4 w-4 dark:hidden" weight="duotone" style={{ color: icon.color }} />
                                <icon.phosphor
                                  className="hidden h-4 w-4 dark:block"
                                  weight="duotone"
                                  style={{ color: icon.darkColor || icon.color }}
                                />
                              </>
                            ) : (
                              <>
                                <svg
                                  viewBox="0 0 24 24"
                                  width="16"
                                  height="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill={icon.color}
                                  className="dark:hidden"
                                >
                                  <path d={icon.path} />
                                </svg>
                                <svg
                                  viewBox="0 0 24 24"
                                  width="16"
                                  height="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill={icon.darkColor || icon.color}
                                  className="hidden dark:block"
                                >
                                  <path d={icon.path} />
                                </svg>
                              </>
                            )}
                          </span>
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                        </motion.div>
                      );
                    })}
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
