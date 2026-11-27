'use client';

import { Fragment, useCallback, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  DEFAULT_TIMING,
  easeInCubic,
  easeOutCubic,
  kineticPhase,
  quantise,
  stagger,
  type KineticTiming,
} from '@/lib/kinetic';
import { TYPE_MOTION_QUERY, useKineticDriver } from './useKinetic';

/** Share of a phase across which successive words start. */
const WORD_SPREAD = 0.45;
/** Weight a word rises at, and thins to as it leaves. */
const ENTER_WEIGHT = 200;
const EXIT_WEIGHT = 120;

export interface KineticWordsProps {
  text: string;
  /** Timeline position; omit for static text. */
  progress?: MotionValue<number>;
  window?: readonly [number, number];
  reduceMotion?: boolean;
  timing?: KineticTiming;
  /** Resting weight and letter-spacing (em) the words settle into: match the element's CSS. */
  weight?: number;
  tracking?: number;
  /** Index of the word after which the line breaks from md up. */
  breakAfter?: number;
}

/**
 * Headline whose words rise out of a mask as the timeline enters `window`, settling from a light,
 * open setting into the resting weight and tracking, then thin and drift away as it leaves.
 * Driven by scroll only. Screen readers get the text once, as a single string.
 */
export function KineticWords({
  text,
  progress,
  window: span,
  reduceMotion = false,
  timing = DEFAULT_TIMING,
  weight = 400,
  tracking = -0.02,
  breakAfter,
}: KineticWordsProps) {
  const words = text.split(' ');
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  refs.current.length = words.length;
  const lastKey = useRef('');
  const typeMotion = useMediaQuery(TYPE_MOTION_QUERY);
  const [start, end] = span ?? [0, 0];

  const apply = useCallback(
    (p: number) => {
      const { enter, exit } = kineticPhase(p, [start, end], timing);
      const n = refs.current.length;
      const states = refs.current.map(
        (_, i) =>
          [
            quantise(easeOutCubic(stagger(enter, i, n, WORD_SPREAD))),
            quantise(easeInCubic(stagger(exit, i, n, WORD_SPREAD))),
          ] as const,
      );
      const key = `${typeMotion}|${states.join(';')}`;
      if (key === lastKey.current) return;
      lastKey.current = key;

      states.forEach(([e, x], i) => {
        const style = refs.current[i]?.style;
        if (!style) return;
        if (e === 1 && x === 0) {
          style.transform = style.opacity = style.fontWeight = style.letterSpacing = style.willChange = '';
          return;
        }
        // Own layer while moving, so a moving word never repaints the text around it.
        style.willChange = 'transform, opacity';
        // Rise from below the mask; on exit drift up and slightly forward.
        style.transform = `translate3d(${(0.12 * x).toFixed(3)}em, calc(${((1 - e) * 130).toFixed(1)}% - ${(0.3 * x).toFixed(3)}em), 0)`;
        style.opacity = (Math.min(1, e * 1.6) * (1 - x)).toFixed(3);
        if (typeMotion) {
          style.fontWeight = String(Math.round(weight + (ENTER_WEIGHT - weight) * (1 - e) + (EXIT_WEIGHT - weight) * x));
          style.letterSpacing = `${(tracking + 0.08 * (1 - e) + 0.06 * x).toFixed(4)}em`;
        } else {
          style.fontWeight = style.letterSpacing = '';
        }
      });
    },
    [start, end, timing, typeMotion, weight, tracking],
  );

  useKineticDriver(progress, Boolean(progress && span) && !reduceMotion, apply);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && breakAfter === i - 1 && <br className="hidden md:block" />}
            {i > 0 && ' '}
            <span className="kinetic-mask">
              <span
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="kinetic-word"
              >
                {word}
              </span>
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
