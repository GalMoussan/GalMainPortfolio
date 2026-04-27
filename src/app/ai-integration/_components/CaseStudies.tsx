import { caseStudies } from '../_content/case-studies';

type CaseStudiesProps = {
  slugs: string[];
};

export function CaseStudies({ slugs }: CaseStudiesProps) {
  const featured = slugs.map((slug) => caseStudies[slug]).filter(Boolean);

  return (
    <section id="case-studies" className="max-w-[1200px] mx-auto py-[100px]">
      <h2 className="numbered-heading">Real workflows I&apos;ve built.</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((project) => (
          <div
            key={project.slug}
            className="noteworthy-card bg-[var(--light-navy)] border border-[var(--lightest-navy)] rounded p-6"
          >
            {/* Project name */}
            <h3 className="text-[var(--lightest-slate)] text-xl font-bold mb-3">
              {project.title}
            </h3>

            {/* Problem */}
            <p className="text-[var(--light-slate)] text-sm mb-2">
              <span className="font-semibold text-[var(--green)]">Problem: </span>
              {project.problem}
            </p>

            {/* Solution */}
            <p className="text-[var(--slate)] text-sm mb-4">
              <span className="font-semibold text-[var(--green)]">Solution: </span>
              {project.solution}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-[var(--light-slate)] bg-[var(--lightest-navy)] px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                className="inline-link text-sm"
              >
                View case study →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
