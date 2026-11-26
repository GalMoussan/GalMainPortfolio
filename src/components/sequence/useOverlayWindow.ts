'use client';

import { useTransform, type MotionValue } from 'framer-motion';

/** Progress spent fading an overlay in or out. */
const FADE = 0.025;
/** Vertical drift (px) while an overlay fades. */
const DRIFT_PX = 28;

/**
 * Opacity, drift, visibility and pointer-events for an overlay shown while
 * scroll progress is inside `[start, end]`. A window starting at 0 is visible on
 * load. Hidden overlays get `visibility: hidden` so their links leave the tab order.
 */
export function useOverlayWindow(
  progress: MotionValue<number>,
  [start, end]: readonly [number, number],
  reduceMotion: boolean,
) {
  const visibleAtLoad = start <= 0;
  const input = visibleAtLoad ? [0, end - FADE, end] : [start, start + FADE, end - FADE, end];
  const opacity = useTransform(progress, input, visibleAtLoad ? [1, 1, 0] : [0, 1, 1, 0]);
  const drift = useTransform(progress, input, visibleAtLoad ? [0, 0, -DRIFT_PX] : [DRIFT_PX, 0, 0, -DRIFT_PX]);
  const visibility = useTransform<number, string>(opacity, (o) => (o > 0.01 ? 'visible' : 'hidden'));
  const pointerEvents = useTransform<number, string>(opacity, (o) => (o > 0.5 ? 'auto' : 'none'));

  return { opacity, y: reduceMotion ? 0 : drift, visibility, pointerEvents };
}

/** Cross-fade between two panels sharing one card, centred on progress `at`. */
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
