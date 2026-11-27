import { KineticWords, type KineticWordsProps } from '@/components/sequence/KineticWords';

interface SectionHeadingProps {
  children: string;
  subtitle?: string;
  /** Scroll-driven title motion (see KineticWords); omit for a static title. */
  kinetic?: Omit<KineticWordsProps, 'text'>;
}

/** Serif title with the subtitle set above it as a small amber label. */
export function SectionHeading({ children, subtitle, kinetic }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {subtitle ? <p className="section-heading-subtitle">{subtitle}</p> : null}
      <h2 className="section-heading-title">{kinetic ? <KineticWords text={children} {...kinetic} /> : children}</h2>
    </header>
  );
}
