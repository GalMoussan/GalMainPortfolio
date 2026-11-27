import { describe, expect, it } from 'vitest';
import { OVERLAY_WINDOWS, TIMELINE_END } from '../sequenceConfig';
import { kineticPhase, stagger } from '../kinetic';
import { timecodeAt } from '../sequenceTimeline';

describe('timecodeAt', () => {
  it('starts at chapter 01, frame zero', () => {
    expect(timecodeAt(0)).toEqual({ chapter: '01', title: 'Introduction', timecode: '00:00:00' });
  });

  it('switches chapter at the cut and keeps counting frames across shots', () => {
    // First frame of `sitting` is global frame 190: 7 s + 22 frames at 24 fps.
    expect(timecodeAt(0.25)).toEqual({ chapter: '02', title: 'The builder', timecode: '00:07:22' });
  });

  it('holds the last frame through the closing hold', () => {
    // 906 frames in total; the last is 905: 37 s + 17 frames.
    expect(timecodeAt(TIMELINE_END)).toEqual({ chapter: '05', title: "What's next", timecode: '00:37:17' });
  });
});

describe('kineticPhase', () => {
  it('shows a window that starts at 0 fully entered on load', () => {
    expect(kineticPhase(0, OVERLAY_WINDOWS.hero)).toEqual({ enter: 1, exit: 0 });
  });

  it('never exits a window that runs to the end of the timeline', () => {
    expect(kineticPhase(TIMELINE_END, OVERLAY_WINDOWS.contact)).toEqual({ enter: 1, exit: 0 });
  });

  it('is hidden before its window, at rest inside it, and gone after it', () => {
    const window = OVERLAY_WINDOWS.work;
    expect(kineticPhase(window[0] - 0.01, window).enter).toBe(0);
    expect(kineticPhase((window[0] + window[1]) / 2, window)).toEqual({ enter: 1, exit: 0 });
    expect(kineticPhase(window[1], window).exit).toBe(1);
  });
});

describe('stagger', () => {
  it('starts later items later and finishes every item when the phase completes', () => {
    expect(stagger(0.3, 0, 3, 0.5)).toBeGreaterThan(stagger(0.3, 2, 3, 0.5));
    expect([0, 1, 2].map((i) => stagger(1, i, 3, 0.5))).toEqual([1, 1, 1]);
  });
});
