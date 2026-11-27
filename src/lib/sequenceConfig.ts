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

/** One chapter per shot: shown by the corner timecode and the chapter cards at each cut. */
export const CHAPTER_TITLES: Readonly<Record<SequenceName, string>> = {
  sunglasses: 'Introduction',
  sitting: 'The builder',
  zoom: 'The work',
  explode: 'The machine',
  fire: "What's next",
};

/** Frame rate the corner timecode counts in (the frames were cut from 24 fps footage). */
export const TIMECODE_FPS = 24;

/** Timeline span an overlay spends fading in or out; headlines leave in step with it. */
export const OVERLAY_FADE = 0.025;

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
export const PRIORITY_FRAME_STEP = 8;

/**
 * `full`: 1600×900 frames in /sequence. `portrait`: the centre 506×900 of the same
 * frames, scaled to 432×768, in /sequence-portrait (same frame counts): the region a
 * portrait phone shows with cover fitting anyway, at a fraction of the bytes and decode cost.
 */
export type FrameSet = 'full' | 'portrait';

export const FRAME_SIZES: Readonly<Record<FrameSet, { width: number; height: number }>> = {
  full: { width: 1600, height: 900 },
  portrait: { width: 432, height: 768 },
};

/** Viewports narrower than this width/height ratio load the portrait set. */
export const PORTRAIT_MAX_ASPECT = 0.75;

/** Parallel frame downloads once the loading bar is gone. */
export const LOAD_CONCURRENCY = 8;

/**
 * Decoded frames kept ready around the scroll position, as a memory budget (RGBA bytes).
 * Drawing only ever uses these pre-decoded bitmaps, so no frame is decoded on the main
 * thread mid-scroll. Portrait: ~100 frames (room for a fast flick on a phone); full: ~40.
 */
export const DECODE_BUDGET_BYTES: Readonly<Record<FrameSet, number>> = {
  full: 240 * 1024 * 1024,
  portrait: 128 * 1024 * 1024,
};

/** Share of the decode window placed ahead of the scroll position (scrolling down is the norm). */
export const DECODE_AHEAD_SHARE = 0.7;

/** Parallel frame decodes. */
export const DECODE_CONCURRENCY = 3;

/**
 * Largest gap (in frames) the canvas cross-fades across; wider gaps snap to the closer frame.
 * Phones blend wider gaps (smoother while frames stream in on a small screen); on a large desktop
 * screen a wide blend reads as a double exposure, so it stays near adjacent frames.
 */
export const MAX_BLEND_GAP: Readonly<Record<FrameSet, number>> = {
  full: 3,
  portrait: 8,
};

/**
 * Coarse-to-fine background loading. Each pass requests every `step`th frame, either
 * of the shot on screen and the next one (`near`) or of every shot (`all`), so any
 * scroll position soon has a frame close by and detail fills in where it's needed first.
 */
export const LOAD_PASSES: readonly { step: number; scope: 'near' | 'all' }[] = [
  { step: 8, scope: 'near' },
  { step: 4, scope: 'near' },
  { step: 8, scope: 'all' },
  { step: 2, scope: 'near' },
  { step: 4, scope: 'all' },
  { step: 1, scope: 'near' },
  { step: 2, scope: 'all' },
  { step: 1, scope: 'all' },
];

export interface CutBridge {
  from: SequenceName;
  to: SequenceName;
  /** Half the dissolve length, in timeline units, centred on the `to` sequence's start. */
  halfWidth: number;
  /** Peak darkening at the cut's midpoint; 0 is a plain cross-dissolve. */
  maxDarkness: number;
}

/**
 * Cross-dissolves across the cuts between shots: dip-to-dark for the hard cuts, a short plain
 * dissolve where two shots nearly match (zoom → explode) so the small jump doesn't read as a hitch.
 */
export const CUT_BRIDGES: readonly CutBridge[] = [
  { from: 'sunglasses', to: 'sitting', halfWidth: 0.02, maxDarkness: 0.85 },
  { from: 'zoom', to: 'explode', halfWidth: 0.008, maxDarkness: 0 },
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

/**
 * Inside the about window the card steps through three panels: About (intro), About
 * (workflow, interests and tech), then Experience. Cross-fades are centred on these.
 */
export const ABOUT_PANEL_SPLITS = [0.335, 0.39] as const;

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
  { id: 'jobs', progress: 0.42 },
  { id: 'projects', progress: 0.55 },
  { id: 'stack', progress: 0.84 },
  { id: 'other-projects', progress: 1.06 },
  { id: 'contact', progress: 1.46, endBelowMd: true },
];

export function frameUrl(name: SequenceName, index: number, set: FrameSet): string {
  const root = set === 'portrait' ? 'sequence-portrait' : 'sequence';
  return `/${root}/${name}/frame_${String(index + 1).padStart(4, '0')}.webp`;
}
