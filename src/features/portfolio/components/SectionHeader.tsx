interface SectionHeaderProps {
  /** Short label shown in the left rail on desktop, above the title on mobile. */
  label: string;
  title: string;
  description?: string;
  /** Id for the <h2>, so the parent <section> can reference it via aria-labelledby. */
  titleId: string;
}

/**
 * Shared section opener. A hairline marks where each section begins; the label
 * sits in the 3-column rail that later rows (skills, experience) also align to.
 */
const SectionHeader = ({ label, title, description, titleId }: SectionHeaderProps) => (
  <header className="section-head" data-reveal>
    <p className="section-label">{label}</p>
    <div className="lg:col-span-9">
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {description ? <p className="section-subtitle mt-4">{description}</p> : null}
    </div>
  </header>
);

export default SectionHeader;
