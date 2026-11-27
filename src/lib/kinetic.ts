import { TIMELINE_END } from './sequenceConfig';
import { clamp01 } from './sequenceTimeline';

/** Timeline spans (timeline units) a kinetic element spends entering and leaving. */
export interface KineticTiming {
  enter: number;
  exit: number;
}

/** Longer than an overlay's own fade, so the words are still settling once their card is fully up. */
export const DEFAULT_TIMING: KineticTiming = { enter: 0.05, exit: 0.04 };

/**
 * How far an element shown during `[start, end]` has entered and exited (each 0→1) at timeline
 * position `p`. A window starting at 0 is fully entered on load; one ending at TIMELINE_END never exits.
 */
export function kineticPhase(
  p: number,
  [start, end]: readonly [number, number],
  timing: KineticTiming = DEFAULT_TIMING,
): { enter: number; exit: number } {
  return {
    enter: start <= 0 ? 1 : clamp01((p - start) / timing.enter),
    exit: end >= TIMELINE_END ? 0 : clamp01((p - (end - timing.exit)) / timing.exit),
  };
}

/** Local 0→1 progress of item `i` of `n` when the items start in turn across the first `spread` of `t`. */
export function stagger(t: number, i: number, n: number, spread: number): number {
  if (n <= 1) return t;
  return clamp01((t - (i / (n - 1)) * spread) / (1 - spread));
}

export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
export const easeInCubic = (t: number) => t ** 3;

/** Phase amounts are quantised to this many steps, so sub-pixel scrolls don't restyle text. */
const STEPS = 240;
export const quantise = (t: number) => Math.round(t * STEPS) / STEPS;
