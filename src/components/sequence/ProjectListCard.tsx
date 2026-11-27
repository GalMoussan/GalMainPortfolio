'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';
import { IconExternalLink, IconGitHub } from '@/components/ui/Icons';
import { PasswordReveal } from '@/components/ui/PasswordReveal';
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
  /** Page on this site where the project can be played. */
  play?: string;
  /** Access password for a gated live demo, revealed on request. */
  livePassword?: string;
}

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
  const listRef = useRef<HTMLOListElement>(null);
  /** Last slot derived from scrolling; React state is only touched when it changes. */
  const scrollSlotRef = useRef(-1);

  useMotionValueEvent(progress, 'change', (p) => {
    const [start, end] = overlayWindow;
    if (p < start || p > end) return;
    const slot = Math.min(projects.length - 1, Math.floor(((p - start) / (end - start)) * projects.length));
    if (slot === scrollSlotRef.current) return;
    scrollSlotRef.current = slot;
    setActive(slot);
  });

  // Small-screen cards scroll internally: bring the opened project into view inside
  // the card (never the page) once the accordion transition has settled.
  useEffect(() => {
    const timer = setTimeout(() => {
      const item = listRef.current?.children[active];
      const scroller = item?.closest('.sequence-card');
      if (!item || !scroller || scroller.scrollHeight <= scroller.clientHeight) return;
      const offset = item.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      // Instant, not smooth: WebKit skips repainting backdrop-filtered content during smooth scrollTo.
      scroller.scrollTop += offset - 12;
    }, 520);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <SideCard style={card} desktopWidth="lg:w-[min(460px,34vw)]" label={label}>
      <SectionHeading subtitle={subtitle}>{title}</SectionHeading>
      {headerAction}
      <ol ref={listRef} className="m-0 list-none p-0">
        {projects.map((project, i) => {
          const open = i === active;
          const panelId = `${label.replace(/\s+/g, '-').toLowerCase()}-${i}`;
          return (
            <li key={project.title} className="border-t border-[rgba(243,236,225,0.1)] first:border-t-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                className="flex w-full items-baseline gap-3 py-2.5 text-left"
              >
                <span className="display w-6 text-[15px] italic text-[var(--amber)]">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`display text-[20px] leading-tight transition-colors duration-300 ${
                    open ? 'text-[var(--linen)]' : 'text-[var(--linen-faint)] hover:text-[var(--linen)]'
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
                    <p className="m-0 text-[14px] leading-[1.6] text-[var(--linen-dim)]">{project.description}</p>
                    <ul className="clear-both m-0 mt-3 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-[12px] text-[rgba(94,231,255,0.78)]">
                      {project.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="text-[var(--linen-dim)] transition-colors hover:text-[var(--amber)]"
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
                          className="text-[var(--linen-dim)] transition-colors hover:text-[var(--amber)]"
                        >
                          <IconExternalLink size={18} />
                        </a>
                      )}
                      {project.play && (
                        // Plain <a>: /onepiece is a static game export, not a Next.js route.
                        <a href={project.play} className="btn-chip !px-3.5 !py-1.5 !text-[12px]">
                          Play →
                        </a>
                      )}
                      {project.livePassword && <PasswordReveal password={project.livePassword} />}
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
