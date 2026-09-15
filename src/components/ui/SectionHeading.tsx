interface SectionHeadingProps {
  children: string;
  subtitle?: string;
}

export function SectionHeading({ children, subtitle }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <h2 className="section-heading-title">{children}</h2>
      {subtitle ? <p className="section-heading-subtitle">{subtitle}</p> : null}
    </header>
  );
}
