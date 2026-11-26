'use client';

import { useTransform, type MotionValue } from 'framer-motion';
import { TIMELINE_END } from '@/lib/sequenceConfig';

/** Timeline span spent fading an overlay in or out. */
const FADE = 0.025;
/** Vertical drift (px) while an overlay fades. */
const DRIFT_PX = 28;

/**
 * Opacity, drift, visibility and pointer-events for an overlay shown while the
 * timeline is inside `[start, end]`. A window starting at 0 is visible on load; one
 * ending at TIMELINE_END never fades out. Hidden overlays get `visibility: hidden`
 * so their links leave the tab order.
 */
export function useOverlayWindow(
  progress: MotionValue<number>,
  [start, end]: readonly [number, number],
  reduceMotion: boolean,
) {
  const input: number[] = [];
  const opacityOut: number[] = [];
  const driftOut: number[] = [];

  if (start <= 0) {
    input.push(0);
    opacityOut.push(1);
    driftOut.push(0);
  } else {
    input.push(start, start + FADE);
    opacityOut.push(0, 1);
    driftOut.push(DRIFT_PX, 0);
  }

  if (end >= TIMELINE_END) {
    input.push(end);
    opacityOut.push(1);
    driftOut.push(0);
  } else {
    input.push(end - FADE, end);
    opacityOut.push(1, 0);
    driftOut.push(0, -DRIFT_PX);
  }

  const opacity = useTransform(progress, input, opacityOut);
  const drift = useTransform(progress, input, driftOut);
  const visibility = useTransform<number, string>(opacity, (o) => (o > 0.01 ? 'visible' : 'hidden'));
  const pointerEvents = useTransform<number, string>(opacity, (o) => (o > 0.5 ? 'auto' : 'none'));

  return { opacity, y: reduceMotion ? 0 : drift, visibility, pointerEvents };
}

/** Cross-fade between two panels sharing one card, centred on timeline position `at`. */
export function useCrossfade(progress: MotionValue<number>, at: number) {
  const outgoing = useTransform(progress, [at - 0.012, at + 0.012], [1, 0]);
  const incoming = useTransform(progress, [at - 0.012, at + 0.012], [0, 1]);
  const outgoingVisibility = useTransform<number, string>(outgoing, (o) => (o > 0.01 ? 'visible' : 'hidden'));
  const incomingVisibility = useTransform<number, string>(incoming, (o) => (o > 0.01 ? 'visible' : 'hidden'));

  return [
    { opacity: outgoing, visibility: outgoingVisibility },
    { opacity: incoming, visibility: incomingVisibility },
  ] as const;
}
