import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowsOut, GithubLogo, LinkSimple } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { projects } from '@/features/portfolio/data/portfolio';
import OptimizedImage from '@/components/common/OptimizedImage';
import SectionHeader from '@/features/portfolio/components/SectionHeader';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { revealDelay } from '@/hooks/use-scroll-reveal';

const INITIAL_VISIBLE_PROJECTS = 5;

// Restyles the dialog's built-in close button as a round, material-backed control.
const dialogCloseButtonClassName =
  '[&>button]:right-3 [&>button]:top-3 [&>button]:z-20 [&>button]:inline-flex [&>button]:h-9 [&>button]:w-9 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-card/80 [&>button]:text-foreground [&>button]:opacity-100 [&>button]:shadow-[0_0_0_1px_rgba(17,24,39,0.08),0_4px_12px_-4px_rgba(17,24,39,0.2)] [&>button]:backdrop-blur-md [&>button]:ring-offset-0 [&>button]:transition-[background-color,transform] [&>button]:hover:bg-card [&>button]:active:scale-[0.96] [&>button]:data-[state=open]:bg-card/80 [&>button]:data-[state=open]:text-foreground';

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
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-page">
        <SectionHeader
          label="Selected projects"
          title="My recent AI and machine learning projects."
          description="Examples of my work with LLM systems, machine learning, and automation."
          titleId="projects-title"
        />

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {visibleProjects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <li
                key={project.id}
                className={isFeatured ? 'md:col-span-2' : undefined}
                data-reveal
                style={revealDelay(isFeatured ? 0 : ((index - 1) % 2) * 80)}
              >
                <article className="h-full">
                  <button
                    type="button"
                    onClick={() => setSelectedProjectId(project.id)}
                    aria-haspopup="dialog"
                    className={`project-card group ${isFeatured ? 'flex flex-col md:grid md:grid-cols-12' : 'flex flex-col'}`}
                  >
                    <div
                      className={`project-media media-outline aspect-[16/10] ${
                        isFeatured ? 'md:col-span-7 md:aspect-auto md:min-h-[26rem]' : ''
                      }`}
                    >
                      <OptimizedImage
                        src={project.image}
                        alt={`${project.title} thumbnail`}
                        fill
                        className={`object-cover ${isFeatured ? 'object-left-top' : 'object-top'} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
                        width={1200}
                        height={760}
                        priority={isFeatured}
                      />
                    </div>

                    <div
                      className={`flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4 ${
                        isFeatured ? 'md:col-span-5 md:justify-center md:px-8 md:py-8 lg:px-10' : ''
                      }`}
                    >
                      <h3 className={`card-title ${isFeatured ? 'sm:text-[1.75rem] lg:text-[2rem] lg:leading-[1.1]' : ''}`}>
                        {project.title}
                      </h3>
                      <p className={`body-copy mt-2.5 ${isFeatured ? 'md:text-base md:leading-relaxed' : ''}`}>{project.description}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className={`flex items-center justify-between gap-3 pt-6 ${isFeatured ? 'md:pt-10' : 'mt-auto'}`}>
                        <div className="flex items-center gap-2.5 text-muted-foreground" aria-hidden="true">
                          {project.github ? <GithubLogo size={17} weight="regular" /> : null}
                          {project.demo ? <LinkSimple size={17} weight="regular" /> : null}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors duration-200 group-hover:text-primary">
                          Preview
                          <ArrowRight
                            size={15}
                            weight="bold"
                            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              </li>
            );
          })}
        </ul>

        {remainingCount > 0 ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              className="btn btn-secondary tabular-nums"
            >
              {showAll ? 'Show less' : `Load more (${remainingCount})`}
            </button>
          </div>
        ) : null}
      </div>

      <Dialog open={selectedProject !== null} onOpenChange={handleProjectDialogChange}>
        {selectedProject ? (
          <DialogContent
            className={`w-[calc(100%-1.5rem)] max-w-[68rem] gap-0 overflow-hidden rounded-[1.75rem] border-0 bg-card p-0 shadow-[0_0_0_1px_rgba(17,24,39,0.06),0_32px_80px_-24px_rgba(17,24,39,0.35)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_32px_80px_-24px_rgba(0,0,0,0.8)] sm:rounded-[1.75rem] ${dialogCloseButtonClassName}`}
          >
            <div
              className="max-h-[90dvh] overflow-y-auto overscroll-contain md:grid md:h-[min(88dvh,46rem)] md:max-h-none md:grid-cols-[1.15fr_0.85fr] md:grid-rows-[minmax(0,1fr)] md:overflow-hidden"
              data-lenis-prevent
            >
              <div className="p-2 md:h-full">
                <button
                  type="button"
                  aria-label={`Open full image preview for ${selectedProject.title}`}
                  className="project-media media-outline group block aspect-[16/10] w-full bg-secondary text-left md:aspect-auto md:h-full"
                  onClick={() => setIsImageZoomed(true)}
                >
                  <img
                    src={selectedProject.image}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-3xl saturate-150 dark:opacity-35"
                  />
                  <OptimizedImage
                    src={selectedProject.image}
                    alt={`${selectedProject.title} preview`}
                    fill
                    className="object-contain p-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] md:p-5"
                    width={1600}
                    height={1200}
                    priority
                  />
                  <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-[opacity,background-color] duration-300 group-hover:bg-black/15 group-hover:opacity-100">
                    <span className="rounded-full bg-black/60 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-md">View full image</span>
                  </span>
                  <span
                    className="absolute bottom-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md md:hidden"
                    aria-hidden="true"
                  >
                    <ArrowsOut size={16} weight="bold" />
                  </span>
                </button>
              </div>

              <div className="px-6 pb-7 pt-5 sm:px-8 sm:pb-8 md:overflow-y-auto md:overscroll-contain md:pt-10" data-lenis-prevent>
                <div className="space-y-7">
                  <div className="space-y-3 md:pr-8">
                    {selectedProject.year ? <div className="meta font-medium">{selectedProject.year}</div> : null}
                    <DialogTitle className="font-display text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.028em] text-foreground sm:text-[2.125rem]">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="body-copy text-[0.9375rem]">
                      {selectedProject.fullDescription}
                    </DialogDescription>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[0.8125rem] font-semibold text-foreground/85">Technology stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[0.8125rem] font-semibold text-foreground/85">Key highlights</p>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature) => (
                        <li key={feature} className="body-copy flex items-start gap-3">
                          <span className="marker" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProject.impact ? (
                    <div className="rounded-2xl bg-secondary px-4 py-3.5 text-[0.9375rem] leading-relaxed text-foreground/75">
                      <span className="mr-1.5 font-semibold text-foreground">Impact:</span>
                      {selectedProject.impact}
                    </div>
                  ) : null}

                  {selectedProject.demo || selectedProject.github ? (
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.demo ? (
                        <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          Live
                          <LinkSimple size={16} weight="bold" />
                        </a>
                      ) : null}
                      {selectedProject.github ? (
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                          Code
                          <GithubLogo size={16} weight="bold" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>

      <Dialog open={isImageZoomed && selectedProject !== null} onOpenChange={setIsImageZoomed}>
        {selectedProject ? (
          <DialogContent
            className={`z-[70] max-h-[96dvh] w-auto max-w-[96vw] border-none bg-transparent p-0 shadow-none sm:rounded-[1.5rem] ${dialogCloseButtonClassName}`}
          >
            <DialogTitle className="sr-only">{selectedProject.title} image preview</DialogTitle>
            <DialogDescription className="sr-only">Expanded image preview for the selected project.</DialogDescription>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="overflow-hidden rounded-[1.5rem] bg-zinc-950"
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
