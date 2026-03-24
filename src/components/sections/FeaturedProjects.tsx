import Link from 'next/link';
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
              className="relative grid grid-cols-12 items-center gap-[10px] mb-[70px] md:mb-[100px] last:mb-0"
            >
              {/* Project Image */}
              <div
                className={`relative col-span-12 row-start-1 ${
                  isOdd ? 'md:col-span-7 md:col-start-1' : 'md:col-span-7 md:col-start-6'
                }`}
              >
                <a
                  href={project.external || project.github || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="project-img-link relative block w-full h-full rounded bg-[var(--green)] group"
                >
                  <div className="absolute inset-0 bg-[var(--navy)] opacity-60 z-10 rounded transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img w-full h-[350px] object-cover rounded bg-[var(--light-navy)]"
                  />
                </a>
              </div>

              {/* Project Content */}
              <div
                className={`project-text-panel relative col-span-12 row-start-2 text-left z-10 ${
                  isOdd ? 'md:col-span-6 md:col-start-7 md:text-right md:row-start-1' : 'md:col-span-6 md:col-start-1 md:row-start-1'
                }`}
              >
                <p className="font-mono text-[var(--green)] text-[13px] mb-[10px]">
                  Featured Project
                </p>
                <h3 className="text-[28px] font-semibold text-[var(--lightest-slate)] mb-5">
                  <a href={project.external || project.github || '#'} target="_blank" rel="noreferrer" className="hover:text-[var(--green)] transition-colors">
                    {project.title}
                  </a>
                </h3>
                <div className="relative p-[25px] rounded bg-[var(--light-navy)] text-[var(--light-slate)] text-[18px] shadow-navy">
                  <p>{project.description}</p>
                </div>
                <ul
                  className={`flex flex-wrap gap-x-5 gap-y-[5px] list-none p-0 mt-[25px] mb-[10px] font-mono text-[13px] text-[var(--light-slate)] ${
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
                  {project.title === 'CinemaQuery' && (
                    <Link
                      href="/tools/cinema-query"
                      className="border-2 border-[var(--green)] text-[var(--green)] rounded px-4 py-2 font-mono text-[13px] hover:bg-[rgba(0,255,136,0.1)] transition-colors duration-300"
                      aria-label="View CinemaQuery Tool"
                    >
                      View Tool →
                    </Link>
                  )}
                  {project.title === 'Snake' && (
                    <Link
                      href="/tools/snake"
                      className="inline-flex items-center px-4 py-2 border-2 border-[var(--green)] text-[var(--green)] rounded font-mono text-[13px] hover:bg-[rgba(0,255,136,0.1)] transition-colors duration-300"
                      aria-label="View Snake Game Tool"
                    >
                      View Tool →
                    </Link>
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
