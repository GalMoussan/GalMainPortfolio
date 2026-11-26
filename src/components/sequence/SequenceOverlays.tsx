'use client';

import type { MotionValue } from 'framer-motion';
import { OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { featuredProjects } from '@/data/featured-projects';
import { otherProjects } from '@/data/other-projects';
import { ContactOverlay } from './ContactOverlay';
import { HeroOverlay } from './HeroOverlay';
import { AboutExperienceCard } from './AboutExperienceCard';
import { ProjectListCard } from './ProjectListCard';
import { StackCard } from './StackCard';

interface SequenceOverlaysProps {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

/** Site sections synchronised to the scrubbed sequence, in scroll order. */
export function SequenceOverlays({ progress, reduceMotion }: SequenceOverlaysProps) {
  return (
    <>
      <HeroOverlay progress={progress} reduceMotion={reduceMotion} />
      <AboutExperienceCard progress={progress} reduceMotion={reduceMotion} />
      <ProjectListCard
        progress={progress}
        reduceMotion={reduceMotion}
        window={OVERLAY_WINDOWS.work}
        label="Selected work"
        title="Work"
        subtitle="Some Things I've Built"
        projects={featuredProjects}
      />
      <StackCard progress={progress} reduceMotion={reduceMotion} />
      <ProjectListCard
        progress={progress}
        reduceMotion={reduceMotion}
        window={OVERLAY_WINDOWS.other}
        label="Other noteworthy projects"
        title="Other Noteworthy Projects"
        projects={otherProjects}
        headerAction={
          <a href="/archive" className="outline-button -mt-2 mb-3 inline-block px-4 py-2 text-[12px]">
            view the archive
          </a>
        }
      />
      <ContactOverlay progress={progress} reduceMotion={reduceMotion} />
    </>
  );
}
