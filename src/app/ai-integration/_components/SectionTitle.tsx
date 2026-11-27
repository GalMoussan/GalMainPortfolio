import { KineticHeading } from '@/components/ui/KineticHeading';
import { SECTION_TITLE } from './styles';

type SectionTitleProps = {
  eyebrow: string;
  children: string;
  centered?: boolean;
  className?: string;
};

/** Amber eyebrow label above a kinetic display h2. */
export function SectionTitle({ eyebrow, children, centered = false, className = 'mb-12' }: SectionTitleProps) {
  return (
    <header className={`${centered ? 'mx-auto max-w-[820px] text-center' : 'max-w-[820px]'} ${className}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <KineticHeading className={SECTION_TITLE}>{children}</KineticHeading>
    </header>
  );
}
