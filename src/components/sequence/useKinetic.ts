'use client';

import { useEffect, useLayoutEffect } from 'react';
import { motionValue, useMotionValueEvent, type MotionValue } from 'framer-motion';

export const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Stand-in for static text (no timeline): never changes, so never fires. */
const STILL = motionValue(0);

/**
 * Large screens with a fine pointer also animate font weight and tracking. Phones only move
 * whole words and lines: re-shaping text every scrubbed frame is what a phone can't spare.
 */
export const TYPE_MOTION_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

/**
 * Runs `apply` with the timeline position before first paint and on every scroll change,
 * while `enabled`. `apply` writes styles directly, so scrolling never re-renders React.
 */
export function useKineticDriver(
  progress: MotionValue<number> | undefined,
  enabled: boolean,
  apply: (p: number) => void,
) {
  useMotionValueEvent(progress ?? STILL, 'change', (p) => {
    if (enabled) apply(p);
  });
  useIsoLayoutEffect(() => {
    if (enabled && progress) apply(progress.get());
  }, [enabled, progress, apply]);
}
