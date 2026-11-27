'use client';

import { useRef } from 'react';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';
import { TIMELINE_END } from '@/lib/sequenceConfig';
import { timecodeAt } from '@/lib/sequenceTimeline';

const INITIAL = timecodeAt(0);

/**
 * Film timecode under the logo: chapter number and name, then MM:SS:FF of the frame on screen.
 * Written straight to the DOM as the timeline moves, so scrolling never re-renders it.
 */
export function Timecode({ progress }: { progress: MotionValue<number> }) {
  const chapterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const shown = useRef(INITIAL);

  useMotionValueEvent(progress, 'change', (p) => {
    const next = timecodeAt(Math.min(TIMELINE_END, Math.max(0, p)));
    if (next.chapter !== shown.current.chapter && chapterRef.current && titleRef.current) {
      chapterRef.current.textContent = next.chapter;
      titleRef.current.textContent = next.title;
    }
    if (next.timecode !== shown.current.timecode && timecodeRef.current) {
      timecodeRef.current.textContent = next.timecode;
    }
    shown.current = next;
  });

  return (
    <div aria-hidden="true" className="timecode">
      <span ref={chapterRef} className="text-[var(--amber)]">
        {INITIAL.chapter}
      </span>
      <span ref={titleRef}>{INITIAL.title}</span>
      <span className="timecode-rule" />
      <span ref={timecodeRef} className="tabular-nums text-[var(--linen-dim)]">
        {INITIAL.timecode}
      </span>
    </div>
  );
}
