import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, GithubLogo, X, LinkSimple, Sparkle, FadersHorizontal } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { projectCategories, projects, type ProjectItem, type ProjectTag } from '@/data/portfolio';
import OptimizedImage from './OptimizedImage';

const Projects = () => {
  const [filter, setFilter] = useState<ProjectTag>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedProjectTrigger, setSelectedProjectTrigger] = useState<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    const matchingProjects = filter === 'all' ? projects : projects.filter((project) => project.tags.includes(filter));

    return [...matchingProjects].sort((left, right) => {
      const leftRank = left.featuredRank ?? Number.MAX_SAFE_INTEGER;
      const rightRank = right.featuredRank ?? Number.MAX_SAFE_INTEGER;

      if (leftRank !== rightRank) {
        return leftRank - rightRank;
      }

      return right.id - left.id;
    });
  }, [filter]);

  const leadProject = filteredProjects[0] ?? null;
  const supportingProjects = showAll ? filteredProjects.slice(1) : filteredProjects.slice(1, 5);
  const hasMoreProjects = filteredProjects.length > 5;

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-modal-open');
      selectedProjectTrigger?.focus();
      return;
    }

    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-modal-open', 'true');

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
      document.body.removeAttribute('data-modal-open');
    };
  }, [selectedProject, selectedProjectTrigger]);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const categoryLabel = (tag: ProjectTag) => {
    return projectCategories.find((category) => category.id === tag)?.name ?? tag;
  };

  const openProject = (project: ProjectItem, trigger: HTMLElement | null) => {
    setSelectedProjectTrigger(trigger);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="page-shell space-y-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="space-y-5">
            <div className="section-kicker">
              <Sparkle className="h-4 w-4" weight="duotone" />
              Selected projects
            </div>
            <h2 className="section-title max-w-2xl">A portfolio rebuilt around outcomes, workflows, and real usage.</h2>
          </div>
          <p className="section-subtitle mb-0 max-w-3xl justify-self-end lg:text-right">
            Instead of showing equal-weight cards, this layout highlights the systems that best represent how I work: applied AI, structured automation, and interfaces that help operational teams move faster.
          </p>
        </div>

        <div className="editorial-card space-y-6 p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="section-kicker">
                <FadersHorizontal className="h-4 w-4" weight="duotone" />
                Filter by domain
              </div>
              <p className="text-sm leading-6 text-muted-foreground">Choose a lens to narrow the work, or keep it broad and view the portfolio as a full system.</p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Project category filters">
              {projectCategories.map((category) => {
                const active = filter === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active}
                    onClick={(event) => {
                      setFilter(category.id);
                      setShowAll(false);
                      setSelectedProjectTrigger(event.currentTarget);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'bg-foreground text-background shadow-[0_18px_34px_-24px_rgba(15,23,42,0.6)] dark:bg-white dark:text-zinc-950'
                        : 'bg-background/70 text-foreground/75 ring-1 ring-foreground/10 hover:-translate-y-[1px] hover:bg-background dark:bg-white/5 dark:text-zinc-200 dark:ring-white/10 dark:hover:bg-white/10'
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {leadProject && (
            <motion.article
              key={leadProject.id}
              layout
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-5 rounded-[1.9rem] border border-foreground/10 bg-background/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:border-white/10 dark:bg-black/10 lg:grid-cols-[1.12fr_0.88fr] lg:p-5"
            >
              <button
                type="button"
                onClick={(event) => openProject(leadProject, event.currentTarget)}
                className="group relative overflow-hidden rounded-[1.5rem] text-left"
              >
                <OptimizedImage
                  src={leadProject.image}
                  alt={`${leadProject.title} preview`}
                  className="h-[320px] w-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:h-full"
                  width={1600}
                  height={1000}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/70">Lead case study</p>
                    <p className="mt-2 text-xl font-semibold tracking-[-0.04em]">{leadProject.title}</p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowRight className="h-5 w-5" weight="bold" />
                  </span>
                </div>
              </button>

              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {leadProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-foreground/10 px-3 py-1 dark:border-white/10">
                        {categoryLabel(tag)}
                      </span>
                    ))}
                    {leadProject.year ? <span className="rounded-full bg-accent/50 px-3 py-1 text-foreground dark:bg-white/10 dark:text-zinc-200">{leadProject.year}</span> : null}
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50 sm:text-[2.4rem]">{leadProject.title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">{leadProject.description}</p>
                  </div>
                  {leadProject.impact ? (
                    <div className="rounded-[1.4rem] border border-foreground/10 bg-secondary/40 p-4 text-sm leading-7 text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                      <span className="mr-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">Why it matters</span>
                      {leadProject.impact}
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-foreground/10 p-4 dark:border-white/10">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">Tools used</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {leadProject.technologies.map((tech) => (
                        <span key={tech} className="rounded-full bg-background px-3 py-1 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:bg-white/5 dark:text-zinc-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.4rem] border border-foreground/10 p-4 dark:border-white/10">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">Capabilities</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {leadProject.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {leadProject.demo ? (
                    <a href={leadProject.demo} target="_blank" rel="noopener noreferrer" className="primary-cta">
                      Open live product
                      <LinkSimple className="h-4 w-4" weight="bold" />
                    </a>
                  ) : null}
                  <button type="button" onClick={(event) => openProject(leadProject, event.currentTarget)} className="secondary-cta">
                    Read project details
                    <ArrowRight className="h-4 w-4" weight="bold" />
                  </button>
                </div>
              </div>
            </motion.article>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            {supportingProjects.map((project, index) => (
              <motion.button
                key={project.id}
                type="button"
                onClick={(event) => openProject(project, event.currentTarget)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group editorial-card flex flex-col gap-4 text-left transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-[1.45rem]">
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    width={1200}
                    height={760}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full border border-foreground/10 px-3 py-1 dark:border-white/10">
                        {categoryLabel(tag)}
                      </span>
                    ))}
                    {project.year ? <span>{project.year}</span> : null}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">{project.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{project.description}</p>
                  </div>
                  {project.impact ? (
                    <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-200">{project.impact}</p>
                  ) : null}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-sm text-foreground/80 dark:text-zinc-200">
                  <span className="inline-flex items-center gap-2">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" weight="bold" />
                  </span>
                  <div className="flex items-center gap-2">
                    {project.github ? <GithubLogo className="h-5 w-5" weight="duotone" /> : null}
                    {project.demo ? <LinkSimple className="h-5 w-5" weight="duotone" /> : null}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {hasMoreProjects ? (
            <div className="flex justify-center pt-2">
              <button type="button" onClick={() => setShowAll((value) => !value)} className="secondary-cta">
                {showAll ? 'Show fewer projects' : `Show ${filteredProjects.length - 5} more projects`}
                <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} weight="bold" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 px-4 py-6 backdrop-blur-md sm:px-6 lg:px-8"
            onClick={() => setSelectedProject(null)}
            aria-hidden={selectedProject ? 'false' : 'true'}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex max-h-[92dvh] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(12,16,15,0.96)] text-zinc-50 shadow-[0_30px_90px_-28px_rgba(0,0,0,0.78)]"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
            >
              <div className="grid overflow-y-auto lg:grid-cols-[1.02fr_0.98fr]">
                <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
                  <OptimizedImage
                    src={selectedProject.image}
                    alt={`${selectedProject.title} preview`}
                    className="h-full w-full object-cover"
                    width={1600}
                    height={1200}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition-all duration-300 hover:bg-black/55"
                    aria-label="Close project details"
                  >
                    <X className="h-5 w-5" weight="bold" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-zinc-400">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-zinc-200">
                          {categoryLabel(tag)}
                        </span>
                      ))}
                      {selectedProject.year ? <span>{selectedProject.year}</span> : null}
                    </div>
                    <div>
                      <h3 id="project-dialog-title" className="text-3xl font-semibold tracking-[-0.05em] sm:text-[2.5rem]">{selectedProject.title}</h3>
                      <p className="mt-4 text-base leading-8 text-zinc-300">{selectedProject.fullDescription}</p>
                    </div>
                  </div>

                  {selectedProject.impact ? (
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-zinc-200">
                      <span className="mr-2 text-[0.72rem] uppercase tracking-[0.2em] text-zinc-400">Outcome</span>
                      {selectedProject.impact}
                    </div>
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-zinc-400">Technology stack</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-zinc-400">Key capabilities</p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                        {selectedProject.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3">
                    {selectedProject.demo ? (
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="primary-cta">
                        Open live link
                        <LinkSimple className="h-4 w-4" weight="bold" />
                      </a>
                    ) : null}
                    {selectedProject.github ? (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="secondary-cta border-white/15 bg-white/5 text-white hover:bg-white/10">
                        View repository
                        <GithubLogo className="h-4 w-4" weight="bold" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
