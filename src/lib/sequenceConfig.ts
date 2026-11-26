/**
 * Frame sequences for the home page scroll scrub.
 *
 * Frames live in /public/sequence/<name>/frame_0001.webp … and were exported from
 * the source videos at 24fps, 1600px wide (1600×900). Frame counts are the exact
 * number of files in each folder: update them whenever a sequence is re-exported.
 *
 * Positions are in timeline units: one unit is VH_PER_TIMELINE_UNIT of scrolling.
 * The first four shots span 0–1; the fire shot extends the timeline to TIMELINE_END.
 */
export type SequenceName = 'sunglasses' | 'sitting' | 'zoom' | 'explode' | 'fire';

export interface SequenceDefinition {
  name: SequenceName;
  frameCount: number;
  /** Timeline position of the first frame. */
  start: number;
  /** Timeline position of the last frame. */
  end: number;
}

export const FRAME_COUNTS: Readonly<Record<SequenceName, number>> = {
  sunglasses: 190,
  sitting: 190,
  zoom: 190,
  explode: 143,
  fire: 193,
};

/**
 * Ordered, contiguous segments from 0. Past the last segment's end the final frame
 * holds until TIMELINE_END, giving the contact overlay time on the finished shot.
 */
export const SEQUENCES: readonly SequenceDefinition[] = [
  { name: 'sunglasses', frameCount: FRAME_COUNTS.sunglasses, start: 0, end: 0.25 },
  { name: 'sitting', frameCount: FRAME_COUNTS.sitting, start: 0.25, end: 0.49 },
  { name: 'zoom', frameCount: FRAME_COUNTS.zoom, start: 0.49, end: 0.75 },
  { name: 'explode', frameCount: FRAME_COUNTS.explode, start: 0.75, end: 1 },
  { name: 'fire', frameCount: FRAME_COUNTS.fire, start: 1, end: 1.55 },
];

export const TIMELINE_END = 1.65;

/** Scroll distance (vh) per timeline unit. */
export const VH_PER_TIMELINE_UNIT = 550;

/** Scroll container height: the scrubbed distance plus the pinned viewport. */
export const SCROLL_HEIGHT_VH = 100 + VH_PER_TIMELINE_UNIT * TIMELINE_END;

/** Opening shot: decoded (sparsely, see PRIORITY_FRAME_STEP) before the loading bar is dismissed. */
export const PRIORITY_SEQUENCE: SequenceName = 'sunglasses';

/**
 * The loading bar waits for every Nth priority frame (plus the last); the frames in
 * between stream in right after, nearest to the scroll position first.
 */
export const PRIORITY_FRAME_STEP = 4;

/**
 * `full`: 1600×900 frames in /sequence. `portrait`: the centre 506×900 of the same
 * frames in /sequence-portrait (same frame counts), the region a portrait phone shows
 * with cover fitting anyway, at about a third of the bytes.
 */
export type FrameSet = 'full' | 'portrait';

/** Viewports narrower than this width/height ratio load the portrait set. */
export const PORTRAIT_MAX_ASPECT = 0.75;

/** Frames requested per background batch once the priority sequence is ready. */
export const BACKGROUND_BATCH_SIZE = 12;

export interface CutBridge {
  from: SequenceName;
  to: SequenceName;
  /** Half the dissolve length, in timeline units, centred on the `to` sequence's start. */
  halfWidth: number;
  maxDarkness: number;
}

/** Dip-to-dark cross-dissolves across the hard cuts between shots. */
export const CUT_BRIDGES: readonly CutBridge[] = [
  { from: 'sunglasses', to: 'sitting', halfWidth: 0.02, maxDarkness: 0.85 },
  { from: 'explode', to: 'fire', halfWidth: 0.02, maxDarkness: 0.85 },
];

/** #242633 as an rgb triplet for canvas fills. */
export const BRIDGE_RGB = '36, 38, 51';

/**
 * Timeline windows in which each overlay is on screen. `other` ends as the
 * phoenix starts rising, so the reveal plays without anything over it; `contact`
 * runs to TIMELINE_END and stays up as the section scrolls away.
 */
export const OVERLAY_WINDOWS = {
  hero: [0, 0.23],
  about: [0.26, 0.48],
  work: [0.5, 0.74],
  stack: [0.76, 0.98],
  other: [1.02, 1.3],
  contact: [1.4, TIMELINE_END],
} as const satisfies Record<string, readonly [number, number]>;

/** Inside the about window the card cross-fades from About to Experience here. */
export const ABOUT_TO_EXPERIENCE = 0.37;

interface SectionAnchor {
  id: string;
  progress: number;
  /** Below md the section sits after the sequence, so the anchor moves to the sequence's end. */
  endBelowMd?: boolean;
}

/**
 * In-page anchors (nav links, deep links) placed at these timeline positions.
 * Each sits a little past its overlay's fade-in to absorb `scroll-padding-top`.
 */
export const SECTION_ANCHORS: readonly SectionAnchor[] = [
  { id: 'hero', progress: 0 },
  { id: 'about', progress: 0.31 },
  { id: 'jobs', progress: 0.41 },
  { id: 'projects', progress: 0.55 },
  { id: 'stack', progress: 0.84 },
  { id: 'other-projects', progress: 1.06 },
  { id: 'contact', progress: 1.46, endBelowMd: true },
];

export function frameUrl(name: SequenceName, index: number, set: FrameSet): string {
  const root = set === 'portrait' ? 'sequence-portrait' : 'sequence';
  return `/${root}/${name}/frame_${String(index + 1).padStart(4, '0')}.webp`;
}
