'use client';

import { useState } from 'react';
import { motion, type MotionValue } from 'framer-motion';
import { ABOUT_TO_EXPERIENCE, OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { jobs } from '@/data/jobs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SideCard } from './SideCard';
import { useCrossfade, useOverlayWindow } from './useOverlayWindow';

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

/** About, then Experience, in one card over the sofa side of the `sitting` shot. */
export function AboutExperienceCard({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const card = useOverlayWindow(progress, OVERLAY_WINDOWS.about, reduceMotion);
  const [about, experience] = useCrossfade(progress, ABOUT_TO_EXPERIENCE);

  return (
    <SideCard style={card} desktopWidth="lg:w-[min(460px,34vw)]" label="About and experience">
      {/* minmax(0,1fr): the nowrap tab row must scroll, not widen the track. */}
      <div className="grid grid-cols-[minmax(0,1fr)]">
        <motion.div style={about} className="[grid-area:1/1]">
          <AboutPanel />
        </motion.div>
        <motion.div style={experience} className="[grid-area:1/1]">
          <ExperiencePanel />
        </motion.div>
      </div>
    </SideCard>
  );
}

function AboutPanel() {
  return (
    <>
      <SectionHeading subtitle="About Me">About</SectionHeading>
      <div className="space-y-3 text-[15px] leading-[1.6] text-white/75">
        <p>
          Hello! I&apos;m Gal, a fullstack developer and AI integration specialist working remotely from Israel. Before
          tech, I served as an officer and company commander in the Israeli Air Force, where I learned to lead teams
          under pressure and make decisions that hold up.
        </p>
        <p>
          I&apos;ve worked across startups in Israel and Australia, on affiliate marketing platforms, CRM systems and QA
          automation. Today I&apos;m Deputy Director and Chief of AI &amp; Development at{' '}
          <a href="https://iasanorth.com" className="inline-link" target="_blank" rel="noreferrer">
            Yassa North
          </a>
          , where I build the school&apos;s website and internal tools and bring AI into how the school teaches and runs.
          I&apos;ve also taught AI courses for kids and youth at Shamir Institute of Technology.
        </p>
        <p>
          My daily workflow runs on coding agents. I plan with a spec agent, build with worker agents, and put every
          change through a reviewer before it ships. Teaching that way of working is now part of what I do.
        </p>
        <p>
          Outside of work: surfing, extreme sports and traveling. From 2020 to 2025 I volunteered with My Wave, teaching
          youth at risk how to surf.
        </p>
      </div>

      <p className="mt-4 text-[14px] text-white/65">Here are a few technologies I&apos;ve been working with recently:</p>
      <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-x-3 gap-y-1 p-0 sm:grid-cols-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="relative pl-[18px] font-mono text-[12px] leading-[20px] text-white/70 before:absolute before:left-0 before:text-[var(--green)] before:content-['▹']"
          >
            {skill}
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
        className="-mx-1 flex overflow-x-auto border-b border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            className={`-mb-px min-h-[40px] whitespace-nowrap border-b-2 px-3 font-mono text-[12px] transition-colors duration-200 ease-custom ${
              activeTab === i
                ? 'border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)]'
                : 'border-transparent text-white/60 hover:text-[var(--green)]'
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
          <h3 className="mb-[2px] text-[18px] font-semibold tracking-[-0.02em] text-white">
            {job.title}{' '}
            <span className="text-[var(--green)]">
              @{' '}
              {job.url ? (
                <a href={job.url} className="inline-link" target="_blank" rel="noreferrer">
                  {job.company}
                </a>
              ) : (
                job.company
              )}
            </span>
          </h3>
          <p className="mb-4 font-mono text-[12px] text-white/55">{job.range}</p>
          <ul className="m-0 list-none p-0">
            {job.duties.map((duty) => (
              <li
                key={duty}
                className="relative mb-2 pl-[22px] text-[14px] leading-[1.55] text-white/75 before:absolute before:left-0 before:text-[13px] before:text-[var(--green)] before:content-['▹']"
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
