import { caseStudies } from '../_content/case-studies';
import { SectionTitle } from './SectionTitle';
import { CARD } from './styles';

type CaseStudiesProps = {
  slugs: string[];
};

export function CaseStudies({ slugs }: CaseStudiesProps) {
  const featured = slugs.map((slug) => caseStudies[slug]).filter(Boolean);

  return (
    <section id="case-studies" className="max-w-[1200px] mx-auto py-[100px]">
      <SectionTitle eyebrow="Case studies">Real things I&apos;ve built.</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <div key={project.slug} className={`${CARD} flex flex-col p-7`}>
            {/* Project name */}
            <div className="mb-5 flex items-baseline gap-3">
              <span className="display text-[16px] italic text-[var(--amber)]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display m-0 text-[24px] leading-[1.15]">{project.title}</h3>
            </div>

            {/* Problem */}
            <p className="text-[14px] leading-[1.6] text-[var(--linen-dim)] mb-3">
              <span className="font-medium text-[var(--amber)]">Problem: </span>
              {project.problem}
            </p>

            {/* Solution */}
            <p className="text-[14px] leading-[1.6] text-[var(--linen-dim)] mb-6">
              <span className="font-medium text-[var(--amber)]">Solution: </span>
              {project.solution}
            </p>

            {/* Tech stack */}
            <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-[rgba(243,236,225,0.1)] pt-4 text-[12px] text-[rgba(94,231,255,0.78)]">
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
