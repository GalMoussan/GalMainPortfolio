'use client';

import { useState, useEffect } from 'react';
import { jobs } from '@/data/jobs';

export function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="jobs" className="max-w-[700px] mx-auto py-[100px]">
      <h2 className="numbered-heading">Where I&apos;ve Worked</h2>

      <div className="flex flex-col min-h-[340px] md:flex-row">
        {/* Tab List */}
        <div role="tablist" aria-label="Job tabs" className="relative z-10 flex flex-row overflow-x-auto md:flex-col md:w-max">
          {jobs.map((job, i) => (
            <button
              key={job.company}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              onClick={() => setActiveTab(i)}
              className={`flex items-center w-full md:w-[var(--tab-width)] h-[var(--tab-height)] px-5 py-0 border-b-2 md:border-b-0 md:border-l-2 bg-transparent font-mono text-[13px] text-left whitespace-nowrap cursor-pointer transition-all duration-250 ease-custom ${
                activeTab === i
                  ? 'text-[var(--green)] border-b-[var(--green)] md:border-l-[var(--green)] bg-[var(--green-tint)]'
                  : 'text-[var(--slate)] border-b-[var(--lightest-navy)] md:border-l-[var(--lightest-navy)] hover:text-[var(--green)] hover:bg-[var(--lightest-navy)]'
              }`}
            >
              {job.company}
            </button>
          ))}

          {/* Animated highlight indicator */}
          <div
            className="absolute bottom-0 left-0 h-[2px] w-full md:top-0 md:left-0 md:w-[2px] md:h-[var(--tab-height)] bg-[var(--green)] transition-transform duration-250 ease-custom"
            style={{
              transform: isMobile
                ? `translateX(calc(${activeTab} * 100%))`
                : `translateY(calc(${activeTab} * var(--tab-height)))`
            }}
          />
        </div>

        {/* Tab Panels */}
        <div className="relative mt-[20px] md:mt-0 md:ml-[30px] w-full">
          {jobs.map((job, i) => (
            <div
              key={job.company}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              hidden={activeTab !== i}
              className="w-full"
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
