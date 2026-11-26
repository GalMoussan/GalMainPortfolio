'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';
import { IconExternalLink, IconGitHub } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SideCard } from './SideCard';
import { useOverlayWindow } from './useOverlayWindow';

export interface ListedProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  image?: string;
}

const toolPages: Record<string, string> = {
  CinemaQuery: '/tools/cinema-query',
  Snake: '/tools/snake',
};

interface ProjectListCardProps {
  progress: MotionValue<number>;
  reduceMotion: boolean;
  window: readonly [number, number];
  label: string;
  title: string;
  subtitle?: string;
  projects: readonly ListedProject[];
  /** Rendered under the heading, e.g. a link to the archive. */
  headerAction?: React.ReactNode;
}

/**
 * Project accordion in a side card. Scrolling through `window` steps the expanded
 * project through the list; clicking a title opens it directly.
 */
export function ProjectListCard({
  progress,
  reduceMotion,
  window: overlayWindow,
  label,
  title,
  subtitle,
  projects,
  headerAction,
}: ProjectListCardProps) {
  const card = useOverlayWindow(progress, overlayWindow, reduceMotion);
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, 'change', (p) => {
    const [start, end] = overlayWindow;
    if (p < start || p > end) return;
    const slot = Math.floor(((p - start) / (end - start)) * projects.length);
    setActive(Math.min(projects.length - 1, slot));
  });

  return (
    <SideCard style={card} desktopWidth="lg:w-[min(460px,34vw)]" label={label}>
      <SectionHeading subtitle={subtitle}>{title}</SectionHeading>
      {headerAction}
      <ol className="m-0 list-none p-0">
        {projects.map((project, i) => {
          const open = i === active;
          const toolPage = toolPages[project.title];
          const panelId = `${label.replace(/\s+/g, '-').toLowerCase()}-${i}`;
          return (
            <li key={project.title} className="border-t border-white/10 first:border-t-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                className="flex w-full items-baseline gap-3 py-2.5 text-left"
              >
                <span className="font-mono text-[12px] text-[var(--green)]">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`text-[17px] font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                    open ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {project.title}
                </span>
              </button>

              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-500 ease-custom ${
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className={`overflow-hidden ${open ? 'visible' : 'invisible'}`}>
                  <div className="pb-4">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt=""
                        width={112}
                        height={70}
                        sizes="112px"
                        className="float-left mb-2 mr-4 hidden h-[70px] w-[112px] rounded-[10px] border border-white/10 bg-[var(--navy)] object-cover sm:block"
                      />
                    )}
                    <p className="m-0 text-[14px] leading-[1.55] text-white/75">{project.description}</p>
                    <ul className="clear-both m-0 mt-3 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 font-mono text-[11.5px] text-white/55">
                      {project.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex items-center gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="text-white/80 transition-colors hover:text-[var(--green)]"
                        >
                          <IconGitHub size={18} />
                        </a>
                      )}
                      {project.external && (
                        <a
                          href={project.external}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} live site`}
                          className="text-white/80 transition-colors hover:text-[var(--green)]"
                        >
                          <IconExternalLink size={18} />
                        </a>
                      )}
                      {toolPage && (
                        <Link
                          href={toolPage}
                          className="rounded-full border border-[var(--green)] px-4 py-1.5 font-sans text-[12px] font-medium text-[var(--green)] transition-all duration-300 hover:bg-[var(--green-tint)] hover:shadow-[0_0_18px_var(--cyan-bloom)]"
                        >
                          View Tool →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </SideCard>
  );
}
