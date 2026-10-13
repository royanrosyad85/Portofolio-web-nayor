import { Buildings } from '@phosphor-icons/react';
import { experiences } from '@/features/portfolio/data/portfolio';
import type { CompanyLogo } from '@/types/portfolio';
import SectionHeader from '@/features/portfolio/components/SectionHeader';

type LogoConfig =
  | { kind: 'image'; src: string; alt: string; imageClassName: string; wrapperClassName?: string }
  | { kind: 'monogram'; label: string; alt: string }
  | { kind: 'icon' };

const companyLogos: Record<CompanyLogo, LogoConfig> = {
  straitpoint: {
    kind: 'image',
    src: '/logo/Straitpoint.jpeg',
    alt: 'Straitpoint Indonesia logo',
    imageClassName: 'h-7 w-full object-contain',
    wrapperClassName: 'p-1.5',
  },
  zurich: {
    kind: 'image',
    src: '/logo/Zurich Insurance.png',
    alt: 'Zurich Insurance Indonesia logo',
    imageClassName: 'h-6 w-full object-contain',
    wrapperClassName: 'p-1.5',
  },
  lintasarta: {
    kind: 'image',
    src: '/logo/Lintasarta.png',
    alt: 'Lintasarta logo',
    imageClassName: 'h-5 w-full object-contain',
    wrapperClassName: 'p-1.5',
  },
  kemenag: {
    kind: 'image',
    src: '/logo/kemenag logo.png',
    alt: 'Ministry of Religion logo',
    imageClassName: 'h-7 w-full object-contain',
    wrapperClassName: 'p-1',
  },
  bangkit: {
    kind: 'image',
    src: '/logo/Bangkit logo.jpg',
    alt: 'Bangkit Academy logo',
    imageClassName: 'h-7 w-full object-contain',
    wrapperClassName: 'p-1',
  },
  government: {
    kind: 'image',
    src: '/logo/sukabumi.png',
    alt: 'Government of Sukabumi crest',
    imageClassName: 'h-full w-full object-contain',
    wrapperClassName: 'p-1',
  },
};

const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-page">
        <SectionHeader
          label="Experience"
          title="My work experience."
          description="Recent roles in AI engineering and machine learning."
          titleId="experience-title"
        />

        {/* Chronological, so dates live in the rail and read as a timeline. */}
        <ol className="mt-12 divide-y lg:mt-16">
          {experiences.map((experience) => {
            const logo = companyLogos[experience.companyLogo];
            const isCurrent = experience.period.toLowerCase().includes('present');

            return (
              <li key={experience.id} className="rail-row py-9 first:pt-0 last:pb-0" data-reveal>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:col-span-3 lg:flex-col lg:items-start lg:pt-1.5">
                  <p className="meta text-sm font-medium text-foreground/70">{experience.period}</p>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--live)/0.1)] py-1 pl-2 pr-2.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      <span className="live-dot h-1.5 w-1.5" aria-hidden="true" />
                      Current
                    </span>
                  ) : null}
                </div>

                <article className="lg:col-span-9">
                  <div className="flex items-start gap-4">
                    <div
                      className={`media-outline inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ${
                        logo.kind === 'image' ? (logo.wrapperClassName ?? 'p-1.5') : 'p-1.5'
                      }`}
                    >
                      {logo.kind === 'image' ? (
                        <img src={logo.src} alt={logo.alt} className={logo.imageClassName} loading="lazy" decoding="async" />
                      ) : logo.kind === 'monogram' ? (
                        <span
                          className="flex h-full w-full items-center justify-center rounded-[0.65rem] bg-gradient-to-br from-zinc-900 to-zinc-700 text-xs font-bold tracking-tight text-white"
                          aria-label={logo.alt}
                        >
                          {logo.label}
                        </span>
                      ) : (
                        <Buildings size={22} className="text-zinc-500" weight="duotone" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="card-title">{experience.role}</h3>
                      <p className="mt-1 text-[0.9375rem] font-medium text-foreground/80">
                        {experience.company} <span className="font-normal text-muted-foreground">— {experience.location}</span>
                      </p>
                    </div>
                  </div>

                  <p className="body-copy mt-5 max-w-[42rem]">{experience.summary}</p>

                  <ul className="mt-4 max-w-[42rem] space-y-2.5">
                    {experience.highlights.map((highlight, i) => (
                      <li key={i} className="body-copy flex items-start gap-3">
                        <span className="marker" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
