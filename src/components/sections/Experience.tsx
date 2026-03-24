'use client';

import { useState } from 'react';
import { jobs } from '@/data/jobs';

export function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="jobs" className="max-w-[700px] mx-auto py-[100px]">
      <h2 className="numbered-heading">Where I&apos;ve Worked</h2>

      <div className="flex min-h-[340px]">
        {/* Tab List */}
        <div role="tablist" aria-label="Job tabs" className="relative w-max z-10 flex flex-col">
          {jobs.map((job, i) => (
            <button
              key={job.company}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              onClick={() => setActiveTab(i)}
              className={`job-tab flex items-center w-[var(--tab-width)] h-[var(--tab-height)] px-5 py-0 border-l-2 bg-transparent font-mono text-[13px] text-left whitespace-nowrap cursor-pointer ${
                activeTab === i
                  ? 'text-[var(--green)] border-l-[var(--green)] bg-[var(--green-tint)]'
                  : 'text-[var(--slate)] border-l-[var(--lightest-navy)] hover:text-[var(--green)] hover:bg-[var(--lightest-navy)]'
              }`}
            >
              {job.company}
            </button>
          ))}

          {/* Animated highlight indicator */}
          <div
            className="absolute top-0 left-0 w-[2px] h-[var(--tab-height)] bg-[var(--green)] transition-transform duration-250 ease-custom"
            style={{ transform: `translateY(calc(${activeTab} * var(--tab-height)))` }}
          />
        </div>

        {/* Tab Panels */}
        <div className="relative ml-[30px] w-full">
          {jobs.map((job, i) => (
            <div
              key={job.company}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              hidden={activeTab !== i}
              className="job-panel w-full"
            >
              <h3 className="text-[22px] font-medium text-[var(--lightest-slate)] mb-[2px]">
                {job.title}{' '}
                <span className="text-[var(--green)]">
                  @{' '}
                  <a href={job.url} className="inline-link" target="_blank" rel="noreferrer">
                    {job.company}
                  </a>
                </span>
              </h3>
              <p className="font-mono text-[13px] text-[var(--light-slate)] mb-[25px]">
                {job.range}
              </p>
              <ul className="list-none p-0">
                {job.duties.map((duty, j) => (
                  <li
                    key={j}
                    className="relative pl-[30px] mb-[10px] text-[18px] text-[var(--slate)] before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)] before:text-[14px] before:leading-[26px]"
                  >
                    {duty}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
