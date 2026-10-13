import { ArrowSquareOut, GraduationCap, Certificate } from '@phosphor-icons/react';
import { certifications, education } from '@/features/portfolio/data/portfolio';
import SectionHeader from '@/features/portfolio/components/SectionHeader';
import { revealDelay } from '@/hooks/use-scroll-reveal';

const Education = () => {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="container-page">
        <SectionHeader
          label="Education & Certifications"
          title="Academic background and continuous learning."
          titleId="education-title"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-5 lg:col-span-7" data-reveal>
            {education.map((item) => (
              <article key={item.id} className="surface flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className={item.logo ? 'media-outline inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1' : 'icon-tile h-12 w-12'}>
                    {item.logo ? (
                      <img src={item.logo} alt={`${item.institution} logo`} className="h-full w-full object-contain" loading="lazy" decoding="async" />
                    ) : (
                      <GraduationCap size={24} weight="duotone" />
                    )}
                  </div>
                  <p className="meta pt-1 text-sm font-medium">{item.period}</p>
                </div>

                <h3 className="card-title mt-6 sm:text-2xl">{item.degree}</h3>
                <p className="mt-1.5 text-[0.9375rem] font-medium text-foreground/80">{item.institution}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.location}</p>

                <p className="body-copy mt-5">{item.description}</p>

                <ul className="mt-6 space-y-2.5 border-t pt-5">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-foreground/85">
                      <span className="marker" aria-hidden="true" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ul className="grouped-list self-start lg:col-span-5" data-reveal style={revealDelay(80)}>
            {certifications.slice(0, 4).map((certification) => (
              <li key={certification.id}>
                <a href={certification.link} target="_blank" rel="noopener noreferrer" className="grouped-row group">
                  <span className="icon-tile h-10 w-10 transition-colors duration-200 group-hover:bg-card group-hover:text-primary">
                    <Certificate size={20} weight="duotone" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] font-medium leading-snug text-foreground">{certification.name}</span>
                    <span className="mt-1 flex flex-wrap gap-x-3 text-[0.8125rem] text-muted-foreground">
                      <span>{certification.issuer}</span>
                      <span className="tabular-nums text-muted-foreground/80">{certification.date}</span>
                    </span>
                  </span>
                  <ArrowSquareOut
                    size={16}
                    weight="bold"
                    className="shrink-0 text-foreground/30 transition-colors duration-200 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;
