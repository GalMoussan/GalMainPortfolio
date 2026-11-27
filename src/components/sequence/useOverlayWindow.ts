'use client';

import { useTransform, type MotionValue } from 'framer-motion';
import { OVERLAY_FADE as FADE, TIMELINE_END } from '@/lib/sequenceConfig';

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

/** Half-width of a panel cross-fade, in timeline units. */
export const PANEL_FADE = 0.012;

/**
 * One of several panels sharing a card: fades in around `from` and out around `to`.
 * Omit `from` for the first panel and `to` for the last; adjacent panels share a
 * boundary, so they cross-fade.
 */
export function usePanelFade(progress: MotionValue<number>, from?: number, to?: number) {
  const input: number[] = [];
  const output: number[] = [];
  if (from === undefined) {
    input.push(0);
    output.push(1);
  } else {
    input.push(from - PANEL_FADE, from + PANEL_FADE);
    output.push(0, 1);
  }
  if (to !== undefined) {
    input.push(to - PANEL_FADE, to + PANEL_FADE);
    output.push(1, 0);
  }
  const opacity = useTransform(progress, input, output);
  const visibility = useTransform<number, string>(opacity, (o) => (o > 0.01 ? 'visible' : 'hidden'));
  return { opacity, visibility };
}
