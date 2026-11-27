'use client';

import { useRef } from 'react';
import { useReducedMotion, useScroll } from 'framer-motion';
import { KineticWords } from '@/components/sequence/KineticWords';
import type { KineticTiming } from '@/lib/kinetic';

/** Enter only: a heading on a regular page stays once its words have risen. */
const WINDOW = [0.04, Infinity] as const;
/** Progress runs 0→1 from the heading's top meeting the viewport bottom to its bottom leaving the top,
 *  so the words rise while the heading travels up through the lower third of the screen. */
const TIMING: KineticTiming = { enter: 0.3, exit: 0 };

interface KineticHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  children: string;
  className?: string;
  id?: string;
  /** Resting letter-spacing (em) of the heading's CSS. */
  tracking?: number;
}

/** Display heading whose words rise out of a mask as it scrolls into view (scroll-driven, no timers). */
export function KineticHeading({ as: Tag = 'h2', children, className, id, tracking }: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <Tag ref={ref} id={id} className={className}>
      <KineticWords
        text={children}
        progress={scrollYProgress}
        window={WINDOW}
        timing={TIMING}
        reduceMotion={reduceMotion}
        tracking={tracking}
      />
    </Tag>
  );
}
