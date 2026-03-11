import { featuredProjects } from '@/data/featured-projects';
import { IconGitHub, IconExternalLink } from '@/components/ui/Icons';

export function FeaturedProjects() {
  return (
    <section id="projects" className="max-w-[1000px] mx-auto py-[100px]">
      <h2 className="numbered-heading">Some Things I&apos;ve Built</h2>

      <ul className="list-none p-0 m-0">
        {featuredProjects.map((project, i) => {
          const isOdd = i % 2 === 0;

          return (
            <li
              key={project.title}
              className="relative grid grid-cols-12 items-center gap-[10px] mb-[100px] last:mb-0"
            >
              {/* Project Image */}
              <div
                className={`relative col-span-7 ${
                  isOdd ? 'col-start-1' : 'col-start-6'
                } row-start-1`}
              >
                <a
                  href={project.external || project.github || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block w-full h-full rounded bg-[var(--green)] group"
                >
                  <div className="absolute inset-0 bg-[var(--navy)] opacity-60 z-10 rounded transition-opacity duration-250 ease-custom group-hover:opacity-0" />
                  <div className="w-full h-[350px] bg-[var(--light-navy)] rounded flex items-center justify-center text-[var(--slate)] font-mono text-[var(--fz-xs)]">
                    {project.title}
                  </div>
                </a>
              </div>

              {/* Project Content */}
              <div
                className={`relative col-span-6 ${
                  isOdd ? 'col-start-7 text-right' : 'col-start-1 text-left'
                } row-start-1 z-10`}
              >
                <p className="font-mono text-[var(--green)] text-[var(--fz-xs)] mb-[10px]">
                  Featured Project
                </p>
                <h3 className="text-[28px] font-semibold text-[var(--lightest-slate)] mb-5">
                  <a href={project.external || project.github || '#'} target="_blank" rel="noreferrer" className="hover:text-[var(--green)] transition-colors">
                    {project.title}
                  </a>
                </h3>
                <div className="relative p-[25px] rounded bg-[var(--light-navy)] text-[var(--light-slate)] text-[var(--fz-lg)] shadow-navy">
                  <p>{project.description}</p>
                </div>
                <ul
                  className={`flex flex-wrap gap-x-5 gap-y-[5px] list-none p-0 mt-[25px] mb-[10px] font-mono text-[var(--fz-xs)] text-[var(--light-slate)] ${
                    isOdd ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div
                  className={`flex items-center gap-[15px] mt-[10px] ${
                    isOdd ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Link"
                      className="text-[var(--lightest-slate)] hover:text-[var(--green)] transition-colors"
                    >
                      <IconGitHub />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="External Link"
                      className="text-[var(--lightest-slate)] hover:text-[var(--green)] transition-colors"
                    >
                      <IconExternalLink />
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
