'use client';

import { Fragment, useCallback, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import {
  DEFAULT_TIMING,
  easeInCubic,
  easeOutCubic,
  kineticPhase,
  quantise,
  stagger,
  type KineticTiming,
} from '@/lib/kinetic';
import { useIsoLayoutEffect, useKineticDriver } from './useKinetic';

/** Share of a phase across which successive lines start. */
const LINE_SPREAD = 0.5;

/** Plain text, or a link that moves as one unit with its line. */
export type LinePart = string | { text: string; href: string; className?: string; external?: boolean };

interface Token {
  /** A space precedes this token. */
  lead: boolean;
  text: string;
  href?: string;
  className?: string;
  external?: boolean;
}

function tokenize(parts: readonly LinePart[]): Token[] {
  const tokens: Token[] = [];
  let space = false;
  for (const part of parts) {
    if (typeof part !== 'string') {
      tokens.push({ ...part, lead: tokens.length > 0 && space });
      space = false;
      continue;
    }
    const re = /(\s*)(\S+)/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(part))) {
      tokens.push({ lead: tokens.length > 0 && (space || match[1] !== ''), text: match[2] });
      space = false;
    }
    if (/\s$/.test(part)) space = true;
  }
  return tokens;
}

interface KineticLinesProps {
  parts: readonly LinePart[];
  /** Timeline position; omit for static text. */
  progress?: MotionValue<number>;
  window?: readonly [number, number];
  reduceMotion?: boolean;
  timing?: KineticTiming;
}

/**
 * Body copy revealed line by line as the timeline enters `window` (each line rises and fades in
 * after the one above) and released line by line as it leaves. Lines are measured from the
 * rendered layout and re-measured when the width or fonts change.
 */
export function KineticLines({ parts, progress, window: span, reduceMotion = false, timing = DEFAULT_TIMING }: KineticLinesProps) {
  const tokens = tokenize(parts);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  refs.current.length = tokens.length;
  /** Line index of each token, and the line count, from the last layout measurement. */
  const lineOf = useRef<number[]>([]);
  const lineCount = useRef(1);
  const lastKey = useRef('');
  const enabled = Boolean(progress && span) && !reduceMotion;
  const [start, end] = span ?? [0, 0];

  const apply = useCallback(
    (p: number) => {
      const { enter, exit } = kineticPhase(p, [start, end], timing);
      const n = lineCount.current;
      const states = Array.from(
        { length: n },
        (_, line) =>
          [
            quantise(easeOutCubic(stagger(enter, line, n, LINE_SPREAD))),
            quantise(easeInCubic(stagger(exit, line, n, LINE_SPREAD))),
          ] as const,
      );
      const key = `${lineOf.current.join(',')}|${states.join(';')}`;
      if (key === lastKey.current) return;
      lastKey.current = key;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const [e, x] = states[lineOf.current[i] ?? 0] ?? [1, 0];
        if (e === 1 && x === 0) {
          el.style.transform = el.style.opacity = '';
          return;
        }
        el.style.transform = `translate3d(0, ${(0.9 * (1 - e) - 0.45 * x).toFixed(3)}em, 0)`;
        el.style.opacity = (e * (1 - x)).toFixed(3);
      });
    },
    [start, end, timing],
  );

  useIsoLayoutEffect(() => {
    if (!enabled || !progress) return;
    const container = refs.current[0]?.parentElement;
    if (!container) return;

    const measure = () => {
      let line = -1;
      let top = -Infinity;
      lineOf.current = refs.current.map((el) => {
        const t = el?.offsetTop ?? top;
        if (t > top + 2) {
          line += 1;
          top = t;
        }
        return Math.max(0, line);
      });
      lineCount.current = line + 1;
      apply(progress.get());
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [enabled, progress, apply]);

  useKineticDriver(progress, enabled, apply);

  return (
    <>
      {tokens.map((token, i) => (
        <Fragment key={i}>
          {token.lead && ' '}
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="kinetic-token"
          >
            {token.href ? (
              <a
                href={token.href}
                className={token.className}
                {...(token.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {token.text}
              </a>
            ) : (
              token.text
            )}
          </span>
        </Fragment>
      ))}
    </>
  );
}
