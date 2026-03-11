'use client';

import { useState } from 'react';
import { otherProjects } from '@/data/other-projects';
import { IconGitHub, IconExternalLink, IconFolder } from '@/components/ui/Icons';

export function NoteworthyProjects() {
  const [showMore, setShowMore] = useState(false);
  const GRID_LIMIT = 6;
  const projects = showMore ? otherProjects : otherProjects.slice(0, GRID_LIMIT);

  return (
    <section className="max-w-[1000px] mx-auto py-[100px] text-center">
      <h2 className="text-[32px] font-semibold text-[var(--lightest-slate)]">
        Other Noteworthy Projects
      </h2>
      <a href="/archive" className="inline-block font-mono text-[14px] text-[var(--green)] mt-[10px] mb-[50px] hover:underline">
        view the archive
      </a>

      <ul className="grid grid-cols-3 gap-[15px] list-none p-0 m-0">
        {projects.map((project) => (
          <li
            key={project.title}
            className="bg-[var(--light-navy)] rounded p-8 transition-all duration-250 ease-custom hover:-translate-y-[5px] cursor-default"
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
                <h3 className="text-[22px] font-semibold text-[var(--lightest-slate)] mb-[10px] text-left">
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
