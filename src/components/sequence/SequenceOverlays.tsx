'use client';

import type { MotionValue } from 'framer-motion';
import { HeroOverlay } from './HeroOverlay';
import { AboutExperienceCard } from './AboutExperienceCard';
import { WorkCard } from './WorkCard';
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
      <WorkCard progress={progress} reduceMotion={reduceMotion} />
      <StackCard progress={progress} reduceMotion={reduceMotion} />
    </>
  );
}
