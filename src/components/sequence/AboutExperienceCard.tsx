'use client';

import { useState } from 'react';
import { motion, type MotionValue } from 'framer-motion';
import { ABOUT_PANEL_SPLITS, OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { jobs } from '@/data/jobs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SideCard } from './SideCard';
import { useOverlayWindow, usePanelFade } from './useOverlayWindow';

const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Prisma',
  'PostgreSQL',
  'Tailwind CSS',
  'Claude & OpenAI APIs',
  'Claude Code & coding agents',
  'Angular',
  'Playwright',
];

/** Shared by both About panels so the heading holds still while the body cross-fades. */
const aboutHeading = <SectionHeading subtitle="About Me">About</SectionHeading>;

/**
 * About (two panels), then Experience, in one card over the sofa side of the `sitting`
 * shot. Splitting About keeps the card short enough not to scroll on laptop screens.
 */
export function AboutExperienceCard({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const card = useOverlayWindow(progress, OVERLAY_WINDOWS.about, reduceMotion);
  const [toAboutMore, toExperience] = ABOUT_PANEL_SPLITS;
  const intro = usePanelFade(progress, undefined, toAboutMore);
  const more = usePanelFade(progress, toAboutMore, toExperience);
  const experience = usePanelFade(progress, toExperience);

  return (
    <SideCard style={card} desktopWidth="lg:w-[min(460px,34vw)]" label="About and experience">
      {/* minmax(0,1fr): the nowrap tab row must scroll, not widen the track. */}
      <div className="grid grid-cols-[minmax(0,1fr)]">
        <motion.div style={intro} className="[grid-area:1/1]">
          <AboutIntroPanel />
        </motion.div>
        <motion.div style={more} className="[grid-area:1/1]">
          <AboutMorePanel />
        </motion.div>
        <motion.div style={experience} className="[grid-area:1/1]">
          <ExperiencePanel />
        </motion.div>
      </div>
    </SideCard>
  );
}

function AboutIntroPanel() {
  return (
    <>
      {aboutHeading}
      <div className="space-y-3 text-[15px] leading-[1.65] text-[var(--linen-dim)]">
        <p>
          Hello! I&apos;m Gal, a fullstack developer and AI integration specialist working remotely from Israel. Before
          tech, I served as an officer and company commander in the Israeli Air Force, where I learned to lead teams
          under pressure and make decisions that hold up.
        </p>
        <p>
          I&apos;ve worked across startups in Israel and Australia, on affiliate marketing platforms, CRM systems and QA
          automation. Today I&apos;m Deputy Director and Chief of AI &amp; Development at{' '}
          <a href="https://iasanorth.com" className="prose-link" target="_blank" rel="noreferrer">
            Yassa North
          </a>
          , where I build the school&apos;s website and internal tools and bring AI into how the school teaches and runs.
          I&apos;ve also taught AI courses for kids and youth at Shamir Institute of Technology.
        </p>
      </div>
    </>
  );
}

function AboutMorePanel() {
  return (
    <>
      {aboutHeading}
      <div className="space-y-3 text-[15px] leading-[1.65] text-[var(--linen-dim)]">
        <p>
          My daily workflow runs on coding agents. I plan with a spec agent, build with worker agents, and put every
          change through a reviewer before it ships. Teaching that way of working is now part of what I do.
        </p>
        <p>
          Outside of work: surfing, extreme sports and traveling. From 2020 to 2025 I volunteered with My Wave, teaching
          youth at risk how to surf.
        </p>
      </div>

      <p className="mt-5 text-[14px] text-[var(--linen-faint)]">Here are a few technologies I&apos;ve been working with recently:</p>
      <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 text-[13.5px] leading-[1.7] text-[var(--linen-dim)]">
        {skills.map((skill, i) => (
          <li key={skill}>
            {skill}
            {i < skills.length - 1 && (
              <span aria-hidden="true" className="ml-2 text-[var(--amber)]">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

function ExperiencePanel() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SectionHeading subtitle="Where I've Worked">Experience</SectionHeading>
      <div
        role="tablist"
        aria-label="Job tabs"
        // Right-edge fade signals that the tab row scrolls (the later companies sit off to the right).
        className="-mx-1 flex overflow-x-auto border-b border-white/10 [mask-image:linear-gradient(to_right,#000_85%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {jobs.map((job, i) => (
          <button
            key={job.company}
            type="button"
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`job-panel-${i}`}
            id={`job-tab-${i}`}
            onClick={() => setActiveTab(i)}
            className={`-mb-px min-h-[40px] whitespace-nowrap border-b-2 px-3 font-sans text-[13px] transition-colors duration-200 ease-custom ${
              activeTab === i
                ? 'border-[var(--amber)] text-[var(--linen)]'
                : 'border-transparent text-[var(--linen-faint)] hover:text-[var(--linen)]'
            }`}
          >
            {job.company}
          </button>
        ))}
      </div>

      {jobs.map((job, i) => (
        <div
          key={job.company}
          id={`job-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`job-tab-${i}`}
          hidden={activeTab !== i}
          className="pt-5"
        >
          <h3 className="display m-0 text-[22px] leading-[1.15]">{job.title}</h3>
          <p className="mb-4 mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--linen-faint)]">
            {job.url ? (
              <a href={job.url} className="text-[var(--amber)] hover:text-[var(--amber)]" target="_blank" rel="noreferrer">
                {job.company}
              </a>
            ) : (
              <span className="text-[var(--amber)]">{job.company}</span>
            )}
            <span aria-hidden="true"> · </span>
            {job.range}
          </p>
          <ul className="m-0 list-none p-0">
            {job.duties.map((duty) => (
              <li
                key={duty}
                className="relative mb-2 pl-6 text-[14px] leading-[1.6] text-[var(--linen-dim)] before:absolute before:left-0 before:text-[var(--amber)] before:content-['—']"
              >
                {duty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
