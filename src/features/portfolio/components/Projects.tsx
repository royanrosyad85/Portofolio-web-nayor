import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, GithubLogo, LinkSimple } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { projects } from '@/features/portfolio/data/portfolio';
import OptimizedImage from '@/components/common/OptimizedImage';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';

const INITIAL_VISIBLE_PROJECTS = 5;

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    if (selectedProjectId === null) {
      setIsImageZoomed(false);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    const isProjectDialogOpen = selectedProjectId !== null;

    document.body.classList.toggle('project-dialog-open', isProjectDialogOpen);

    return () => {
      document.body.classList.remove('project-dialog-open');
    };
  }, [selectedProjectId]);

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((left, right) => {
        const leftRank = left.featuredRank ?? Number.MAX_SAFE_INTEGER;
        const rightRank = right.featuredRank ?? Number.MAX_SAFE_INTEGER;
        return leftRank - rightRank;
      }),
    [],
  );

  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, INITIAL_VISIBLE_PROJECTS);
  const remainingCount = Math.max(sortedProjects.length - INITIAL_VISIBLE_PROJECTS, 0);
  const selectedProject = sortedProjects.find((project) => project.id === selectedProjectId) ?? null;

  const handleProjectDialogChange = (open: boolean) => {
    if (!open) {
      setIsImageZoomed(false);
      setSelectedProjectId(null);
    }
  };

  return (
    <section id="projects" className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="page-shell page-narrow space-y-8">
        <div className="space-y-3">
          <div className="section-kicker">Selected projects</div>
          <h2 className="section-title max-w-2xl">My recent AI and machine learning projects.</h2>
          <p className="section-subtitle mb-0 max-w-2xl">
            Examples of my work with LLM systems, machine learning, and automation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT_EXPO }}
              className={`minimal-card group flex h-full flex-col overflow-hidden ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-[1.05fr_0.95fr]' : ''}`}
            >
              <button
                type="button"
                onClick={() => setSelectedProjectId(project.id)}
                className={`flex h-full flex-col text-left transition-transform duration-200 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
                  index === 0 ? 'md:contents' : ''
                }`}
              >
                <div className={`overflow-hidden rounded-[1.25rem] bg-zinc-100 ring-1 ring-inset ring-black/10 dark:bg-zinc-900 dark:ring-white/10 ${index === 0 ? 'md:rounded-r-none' : ''}`}>
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${index === 0 ? 'h-64 md:h-full md:min-h-[24rem]' : 'h-56'}`}
                    width={1200}
                    height={760}
                  />
                </div>

                <div className={`flex h-full flex-col space-y-4 p-5 ${index === 0 ? 'md:p-8' : ''}`}>
                  <div className="space-y-2">
                    <h3 className={`${index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'} font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50`}>{project.title}</h3>
                    <p className="text-pretty text-sm leading-7 text-foreground/72 dark:text-zinc-300">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="minimal-pill text-foreground dark:text-zinc-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {project.github ? <GithubLogo className="h-4 w-4" weight="duotone" /> : null}
                      {project.demo ? <LinkSimple className="h-4 w-4" weight="duotone" /> : null}
                    </div>
                    <span className="inline-flex items-center gap-2 px-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground dark:group-hover:text-zinc-100">
                      Preview
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" weight="bold" />
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>

        {remainingCount > 0 ? (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="secondary-cta active:scale-[0.96]"
            >
              {showAll ? 'Show less' : `Load more (${remainingCount})`}
            </button>
          </div>
        ) : null}
      </div>

      <Dialog open={selectedProject !== null} onOpenChange={handleProjectDialogChange}>
        {selectedProject ? (
          <DialogContent className="max-h-[90dvh] max-w-4xl overflow-hidden rounded-[1.75rem] border border-border bg-card p-0 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.24)] dark:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.52)]">
            <div className="grid max-h-[90dvh] overflow-hidden md:grid-cols-[1.02fr_0.98fr]">
              <button
                type="button"
                aria-label={`Open full image preview for ${selectedProject.title}`}
                className="group relative overflow-hidden bg-zinc-100 text-left transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:bg-zinc-900 md:min-h-[34rem]"
                onClick={() => setIsImageZoomed(true)}
              >
                <OptimizedImage
                  src={selectedProject.image}
                  alt={`${selectedProject.title} preview`}
                  className="h-full min-h-[18rem] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:min-h-[34rem]"
                  width={1600}
                  height={1200}
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/10 group-hover:opacity-100">
                  <span className="rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md">View full image</span>
                </div>
              </button>

              <div className="overflow-y-auto p-6 sm:p-7" data-lenis-prevent>
                <div className="space-y-5">
                  <div className="space-y-3 pr-8">
                    {selectedProject.year ? <div className="section-kicker tabular-nums">{selectedProject.year}</div> : null}
                    <DialogTitle className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-zinc-950 dark:text-zinc-50 sm:text-[2rem]">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-pretty text-sm leading-7 text-foreground/72 dark:text-zinc-300">
                      {selectedProject.fullDescription}
                    </DialogDescription>
                  </div>

                  <div className="space-y-3">
                    <p className="skills-group-title text-[0.95rem]">Technology stack</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="minimal-pill text-foreground dark:text-zinc-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="skills-group-title text-[0.95rem]">Key highlights</p>
                    <ul className="space-y-2 text-sm leading-7 text-foreground/72 dark:text-zinc-300">
                      {selectedProject.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProject.impact ? (
                    <div className="rounded-[1.25rem] border border-border bg-secondary/65 p-4 text-sm leading-7 text-foreground/76 dark:bg-accent/70 dark:text-zinc-300">
                      <span className="mr-2 font-medium text-foreground dark:text-zinc-100">Impact:</span>
                      {selectedProject.impact}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-3 pt-1">
                    {selectedProject.demo ? (
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="primary-cta active:scale-[0.96]">
                        Live
                        <LinkSimple className="h-4 w-4" weight="bold" />
                      </a>
                    ) : null}
                    {selectedProject.github ? (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="secondary-cta active:scale-[0.96]">
                        Code
                        <GithubLogo className="h-4 w-4" weight="bold" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>

      <Dialog open={isImageZoomed && selectedProject !== null} onOpenChange={setIsImageZoomed}>
        {selectedProject ? (
          <DialogContent className="z-[70] max-h-[96dvh] max-w-[96vw] border-none bg-transparent p-0 shadow-none sm:rounded-[1.5rem] [&>button]:right-4 [&>button]:top-4 [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-black/60 [&>button]:p-2 [&>button]:text-white [&>button]:opacity-100 [&>button]:ring-offset-0 [&>button]:transition-colors [&>button]:hover:bg-black/80 [&>button]:data-[state=open]:bg-black/60">
            <DialogTitle className="sr-only">{selectedProject.title} image preview</DialogTitle>
            <DialogDescription className="sr-only">Expanded image preview for the selected project.</DialogDescription>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="overflow-hidden rounded-[1.5rem] bg-zinc-950/96"
            >
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} expanded preview`}
                className="max-h-[92dvh] w-full max-w-[96vw] object-contain"
              />
            </motion.div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
};

export default Projects;
