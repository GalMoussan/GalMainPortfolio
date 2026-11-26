/**
 * Frame sequences for the home page scroll scrub.
 *
 * Frames live in /public/sequence/<name>/frame_0001.webp … and were exported from
 * the source videos at 24fps, 1600px wide (1600×900). Frame counts are the exact
 * number of files in each folder: update them whenever a sequence is re-exported.
 */
export type SequenceName = 'sunglasses' | 'sitting' | 'zoom' | 'explode';

export interface SequenceDefinition {
  name: SequenceName;
  frameCount: number;
  /** Scroll progress (0–1) at which the first frame shows. */
  start: number;
  /** Scroll progress (0–1) at which the last frame shows. */
  end: number;
}

export const FRAME_COUNTS: Readonly<Record<SequenceName, number>> = {
  sunglasses: 190,
  sitting: 190,
  zoom: 190,
  explode: 143,
};

/** Ordered, contiguous segments covering scroll progress 0–1. */
export const SEQUENCES: readonly SequenceDefinition[] = [
  { name: 'sunglasses', frameCount: FRAME_COUNTS.sunglasses, start: 0, end: 0.25 },
  { name: 'sitting', frameCount: FRAME_COUNTS.sitting, start: 0.25, end: 0.49 },
  { name: 'zoom', frameCount: FRAME_COUNTS.zoom, start: 0.49, end: 0.75 },
  { name: 'explode', frameCount: FRAME_COUNTS.explode, start: 0.75, end: 1 },
];

/** Fully decoded before the loading bar is dismissed; the rest stream in afterwards. */
export const PRIORITY_SEQUENCE: SequenceName = 'sunglasses';

/** Frames requested per background batch once the priority sequence is ready. */
export const BACKGROUND_BATCH_SIZE = 12;

/**
 * Dip-to-dark cross-dissolve across the hard cut between two shots. Centred on
 * the `to` sequence's start; `halfWidth` is in scroll progress.
 */
export const CUT_BRIDGE = {
  from: 'sunglasses',
  to: 'sitting',
  halfWidth: 0.02,
  maxDarkness: 0.85,
  /** #242633 as an rgb triplet for canvas fills. */
  rgb: '36, 38, 51',
} as const satisfies {
  from: SequenceName;
  to: SequenceName;
  halfWidth: number;
  maxDarkness: number;
  rgb: string;
};

/** Scroll-progress windows in which each overlay is on screen. */
export const OVERLAY_WINDOWS = {
  hero: [0, 0.23],
  about: [0.26, 0.48],
  work: [0.5, 0.74],
  stack: [0.76, 0.98],
} as const satisfies Record<string, readonly [number, number]>;

/** Inside the about window the card cross-fades from About to Experience here. */
export const ABOUT_TO_EXPERIENCE = 0.37;

/**
 * Height of the scroll container in vh. Must match the `h-[650vh]` class on the
 * container in ScrollSequenceCanvas.
 */
export const SCROLL_HEIGHT_VH = 650;

/**
 * In-page anchors (nav links, deep links) placed at these progress values.
 * Each sits a little past its overlay's fade-in to absorb `scroll-padding-top`.
 */
export const SECTION_ANCHORS = [
  { id: 'hero', progress: 0 },
  { id: 'about', progress: 0.31 },
  { id: 'jobs', progress: 0.41 },
  { id: 'projects', progress: 0.55 },
  { id: 'stack', progress: 0.84 },
] as const;

export function frameUrl(name: SequenceName, index: number): string {
  return `/sequence/${name}/frame_${String(index + 1).padStart(4, '0')}.webp`;
}
