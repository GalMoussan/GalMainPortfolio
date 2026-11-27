interface SectionHeadingProps {
  children: string;
  subtitle?: string;
}

/** Serif title with the subtitle set above it as a small amber label. */
export function SectionHeading({ children, subtitle }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {subtitle ? <p className="section-heading-subtitle">{subtitle}</p> : null}
      <h2 className="section-heading-title">{children}</h2>
    </header>
  );
}
