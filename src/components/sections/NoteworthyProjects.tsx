'use client';

import { useState, type MouseEvent } from 'react';
import { otherProjects } from '@/data/other-projects';
import { IconGitHub, IconExternalLink, IconFolder } from '@/components/ui/Icons';

export function NoteworthyProjects() {
  const [showMore, setShowMore] = useState(false);
  const GRID_LIMIT = 6;
  const projects = showMore ? otherProjects : otherProjects.slice(0, GRID_LIMIT);

  const handlePointer = (event: MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <section className="relative z-[1] max-w-[1000px] mx-auto py-[100px] text-center">
      <h2 className="font-sans text-[clamp(28px,4vw,36px)] font-semibold tracking-[-0.03em] text-[var(--lightest-slate)] m-0">
        Other Noteworthy Projects
      </h2>
      <a href="/archive" className="outline-button inline-block text-[14px] mt-[10px] mb-[50px] py-2.5 px-5">
        view the archive
      </a>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] list-none p-0 m-0">
        {projects.map((project) => (
          <li
            key={project.title}
            className="noteworthy-card p-5 md:p-8 cursor-default text-left"
            onMouseMove={handlePointer}
          >
            <div className="flex flex-col justify-between h-full">
              {/* Top */}
              <div>
                <div className="flex items-center justify-between mb-[35px]">
                  <IconFolder size={40} className="text-[var(--green)]" />
                  <div className="flex items-center gap-[10px]">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Link"
                        className="text-[var(--light-slate)] hover:text-[var(--green)] transition-colors"
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
                        className="text-[var(--light-slate)] hover:text-[var(--green)] transition-colors"
                      >
                        <IconExternalLink />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--lightest-slate)] mb-[10px] text-left">
                  <a
                    href={project.external || project.github || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--green)] transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-[14px] text-[var(--light-slate)] text-left">
                  {project.description}
                </p>
              </div>

              {/* Footer */}
              <ul className="flex flex-wrap gap-x-[15px] gap-y-[5px] list-none p-0 mt-5 font-mono text-[12px] text-[var(--slate)]">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {otherProjects.length > GRID_LIMIT && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="outline-button mt-20 py-[18px] px-7"
        >
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </section>
  );
}
