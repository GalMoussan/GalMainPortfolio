'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import { CHAPTER_TITLES } from '@/lib/sequenceConfig';
import { SHOTS } from '@/lib/sequenceTimeline';
import type { KineticTiming } from '@/lib/kinetic';
import { KineticWords } from './KineticWords';

/**
 * A card spans the cut into its shot: it starts as the previous overlay finishes fading out
 * (every overlay ends at least 0.02 before a cut) and clears before the next card is fully up.
 */
const BEFORE_CUT = 0.02;
const AFTER_CUT = 0.03;
const FADE = 0.008;
const TITLE_TIMING: KineticTiming = { enter: 0.022, exit: 0.016 };

/** Chapter title cards over the cuts between shots (chapter 01 is the hero itself). */
export function ChapterCards({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  return (
    <>
      {SHOTS.slice(1).map((shot, i) => (
        <ChapterCard
          key={shot.name}
          progress={progress}
          reduceMotion={reduceMotion}
          chapter={String(i + 2).padStart(2, '0')}
          title={CHAPTER_TITLES[shot.name]}
          cut={shot.start}
        />
      ))}
    </>
  );
}

interface ChapterCardProps {
  progress: MotionValue<number>;
  reduceMotion: boolean;
  chapter: string;
  title: string;
  /** Timeline position of the cut into this chapter's shot. */
  cut: number;
}

function ChapterCard({ progress, reduceMotion, chapter, title, cut }: ChapterCardProps) {
  const start = cut - BEFORE_CUT;
  const end = cut + AFTER_CUT;
  const opacity = useTransform(progress, [start, start + FADE, end - FADE, end], [0, 1, 1, 0]);
  const visibility = useTransform<number, string>(opacity, (o) => (o > 0.01 ? 'visible' : 'hidden'));

  return (
    // Decorative: the timecode and section headings already carry the structure.
    <motion.div aria-hidden="true" style={{ opacity, visibility }} className="pointer-events-none absolute inset-0">
      <div className="chapter-card-scrim" />
      <div className="chapter-card-copy">
        <p className="eyebrow m-0">Chapter {chapter}</p>
        <p className="display m-0 mt-3 text-[clamp(48px,6.5vw,104px)] italic leading-[1] tracking-[-0.03em]">
          <KineticWords
            text={title}
            progress={progress}
            window={[start, end]}
            reduceMotion={reduceMotion}
            timing={TITLE_TIMING}
            tracking={-0.03}
          />
        </p>
      </div>
    </motion.div>
  );
}
