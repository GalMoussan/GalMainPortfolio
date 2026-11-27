'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  BRIDGE_RGB,
  CUT_BRIDGES,
  DECODE_AHEAD_SHARE,
  DECODE_BUDGET_BYTES,
  DECODE_CONCURRENCY,
  FRAME_SIZES,
  LOAD_CONCURRENCY,
  LOAD_PASSES,
  MAX_BLEND_GAP,
  OVERLAY_WINDOWS,
  PORTRAIT_MAX_ASPECT,
  PRIORITY_FRAME_STEP,
  PRIORITY_SEQUENCE,
  SCROLL_HEIGHT_VH,
  SECTION_ANCHORS,
  SEQUENCES,
  TIMELINE_END,
  VH_PER_TIMELINE_UNIT,
  frameUrl,
  type FrameSet,
  type SequenceDefinition,
  type SequenceName,
} from '@/lib/sequenceConfig';
import { SequenceOverlays } from '@/components/sequence/SequenceOverlays';

const MAX_DPR = 2;
/** Decoded frames this far outside the decode window survive (hysteresis against churn). */
const EVICT_MARGIN = 8;

type Shot = SequenceDefinition & { offset: number };

/** Every shot's frames share one flat index space; `offset` is a shot's first global index. */
const SHOTS: readonly Shot[] = SEQUENCES.reduce<Shot[]>((shots, seq) => {
  const prev = shots[shots.length - 1];
  shots.push({ ...seq, offset: prev ? prev.offset + prev.frameCount : 0 });
  return shots;
}, []);
const TOTAL_FRAMES = SHOTS.reduce((n, shot) => n + shot.frameCount, 0);
/** Shot index of each global frame. */
const SHOT_OF = SHOTS.reduce((map, shot, s) => map.fill(s, shot.offset, shot.offset + shot.frameCount), new Uint8Array(TOTAL_FRAMES));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function shotByName(name: SequenceName): Shot {
  const shot = SHOTS.find((s) => s.name === name);
  if (!shot) throw new Error(`Unknown sequence: ${name}`);
  return shot;
}

function shotIndexAt(p: number): number {
  const i = SHOTS.findIndex((s) => p < s.end);
  return i === -1 ? SHOTS.length - 1 : i;
}

/** Fractional frame position within `shot` for timeline position `p`. */
function framePositionAt(shot: Shot, p: number): number {
  return clamp01((p - shot.start) / (shot.end - shot.start)) * (shot.frameCount - 1);
}

/** Frame index within `shot` for timeline position `p`. */
function frameIndexAt(shot: Shot, p: number): number {
  return Math.round(framePositionAt(shot, p));
}

/** Cross-fade amounts are quantised to this many steps, so sub-pixel scrolls don't redraw. */
const BLEND_STEPS = 32;
/** Scroll pause after which the canvas stops blending and shows the nearest single frame. */
const SETTLE_MS = 140;

/** Decoded frames at or below and at or above fractional position `pos` within `shot` (-1 when none). */
function bracketFrames(bitmaps: (ImageBitmap | undefined)[], shot: Shot, pos: number) {
  let below = -1;
  for (let i = Math.floor(pos); i >= 0; i--) {
    if (bitmaps[shot.offset + i]) {
      below = i;
      break;
    }
  }
  let above = -1;
  for (let i = Math.ceil(pos); i < shot.frameCount; i++) {
    if (bitmaps[shot.offset + i]) {
      above = i;
      break;
    }
  }
  return { below, above };
}

/** Closest decoded frame to `index` within `shot`, so a frame still in flight never blanks the canvas. */
function nearestFrame(bitmaps: (ImageBitmap | undefined)[], shot: Shot, index: number) {
  for (let d = 0; d < shot.frameCount; d++) {
    const before = index - d;
    if (before >= 0 && bitmaps[shot.offset + before]) return { bitmap: bitmaps[shot.offset + before]!, index: before };
    const after = index + d;
    if (after < shot.frameCount && bitmaps[shot.offset + after]) return { bitmap: bitmaps[shot.offset + after]!, index: after };
  }
  return null;
}

/** `object-fit: cover` for canvas: fill the viewport, crop the overflow evenly. */
function drawCover(ctx: CanvasRenderingContext2D, img: ImageBitmap, w: number, h: number, alpha = 1) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  ctx.globalAlpha = 1;
}

export function ScrollSequenceCanvas() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  // Scroll progress (0–1) scaled to timeline units (0–TIMELINE_END). Unsmoothed on purpose:
  // frames follow the scroll position exactly and never keep moving once scrolling stops.
  const progress = useTransform(scrollYProgress, (v) => v * TIMELINE_END);

  const progressRef = useRef(progress);
  progressRef.current = progress;
  /** Draws the current frame immediately (scroll updates arrive inside framer's own animation frame). */
  const drawNowRef = useRef<() => void>(() => undefined);

  const [loadedFraction, setLoadedFraction] = useState(0);
  const [ready, setReady] = useState(false);

  // Same frame as the scroll update, so the canvas never trails the overlays by a frame.
  useMotionValueEvent(progress, 'change', () => drawNowRef.current());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !ctx) return;

    // Chosen once per load; a later rotation keeps this set and cover-fits it.
    const frameSet: FrameSet = window.innerWidth / window.innerHeight < PORTRAIT_MAX_ASPECT ? 'portrait' : 'full';
    const frameSize = FRAME_SIZES[frameSet];
    const maxBlendGap = MAX_BLEND_GAP[frameSet];
    const windowFrames = Math.floor(DECODE_BUDGET_BYTES[frameSet] / (frameSize.width * frameSize.height * 4));
    const ahead = Math.round(windowFrames * DECODE_AHEAD_SHARE);
    const behind = windowFrames - ahead;

    let cancelled = false;
    let raf: number | null = null;
    let lastKey = '';
    /** No scroll for SETTLE_MS: show a single frame (see render). */
    let settled = true;
    let settleTimer = 0;
    let width = 0;
    let height = 0;

    /** Compressed frames as downloaded. */
    const blobs: (Blob | undefined)[] = new Array(TOTAL_FRAMES);
    /** Decoded frames inside the decode window; the only thing ever drawn. */
    const bitmaps: (ImageBitmap | undefined)[] = new Array(TOTAL_FRAMES);
    const requested = new Uint8Array(TOTAL_FRAMES);
    const decoding = new Uint8Array(TOTAL_FRAMES);

    /** Global index of the frame in view; the decode window is centred on it. */
    let center = 0;
    /** Global indices of the exact frames the scroll position calls for. */
    let wanted: number[] = [0];
    /** Shot the scroll position is in, and the shot whose frame is on the canvas. */
    let targetShot = 0;
    let drawnShot = -1;

    const bridges = CUT_BRIDGES.map((bridge) => {
      const toShot = shotByName(bridge.to);
      return { ...bridge, fromShot: shotByName(bridge.from), toShot, start: toShot.start - bridge.halfWidth };
    });

    const inWindow = (g: number, margin = 0) => g >= center - behind - margin && g <= center + ahead + margin;

    const moveWindow = (g: number) => {
      if (g === center) return;
      center = g;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const bitmap = bitmaps[i];
        if (bitmap && !inWindow(i, EVICT_MARGIN)) {
          bitmap.close();
          bitmaps[i] = undefined;
        }
      }
      pumpDecode();
    };

    const render = () => {
      raf = null;
      if (!width || !height) return;
      const p = Math.min(TIMELINE_END, Math.max(0, progressRef.current.get()));
      targetShot = shotIndexAt(p);
      const shot = SHOTS[targetShot];
      const target = frameIndexAt(shot, p);
      moveWindow(shot.offset + target);
      const bridge = bridges.find((b) => p > b.start && p < b.start + 2 * b.halfWidth);

      if (!bridge) {
        const pos = framePositionAt(shot, p);
        const lo = Math.floor(pos);
        const hi = Math.ceil(pos);
        wanted = lo === hi ? [shot.offset + lo] : [shot.offset + lo, shot.offset + hi];
        const { below, above } = bracketFrames(bitmaps, shot, pos);
        // Nothing decoded for this shot yet: keep whatever is on screen.
        if (below < 0 && above < 0) return;
        const nearest = above < 0 || (below >= 0 && pos - below <= above - pos) ? below : above;
        // While scrolling, cross-fade the decoded frames either side of the exact position: sub-frame
        // smooth when neighbours are loaded, a soft transition instead of a jump across frames still
        // streaming in. At rest, one frame: a held blend reads as a double image where the subject moves.
        const blend = !settled && below >= 0 && above > below && above - below <= maxBlendGap;
        const base = blend ? below : nearest;
        const mix = blend ? Math.round(((pos - below) / (above - below)) * BLEND_STEPS) / BLEND_STEPS : 0;
        const key = `${shot.name}:${base}:${mix > 0 ? above : '-'}:${mix}`;
        if (key === lastKey) return;
        lastKey = key;
        drawnShot = targetShot;
        drawCover(ctx, bitmaps[shot.offset + base]!, width, height);
        if (mix > 0) drawCover(ctx, bitmaps[shot.offset + above]!, width, height, mix);
        return;
      }

      const t = (p - bridge.start) / (2 * bridge.halfWidth);
      const fromTarget = frameIndexAt(bridge.fromShot, p);
      const toTarget = frameIndexAt(bridge.toShot, p);
      wanted = [bridge.fromShot.offset + fromTarget, bridge.toShot.offset + toTarget];
      const a = nearestFrame(bitmaps, bridge.fromShot, fromTarget);
      const b = nearestFrame(bitmaps, bridge.toShot, toTarget);
      if (!a && !b) return;
      const key = `bridge:${bridge.to}:${a?.index}:${b?.index}:${t.toFixed(3)}`;
      if (key === lastKey) return;
      lastKey = key;
      drawnShot = targetShot;
      if (a) drawCover(ctx, a.bitmap, width, height);
      if (b) drawCover(ctx, b.bitmap, width, height, a ? smoothstep(t) : 1);
      if (bridge.maxDarkness > 0) {
        ctx.fillStyle = `rgba(${BRIDGE_RGB}, ${bridge.maxDarkness * Math.sin(Math.PI * t)})`;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const scheduleDraw = () => {
      if (raf === null) raf = requestAnimationFrame(render);
    };
    drawNowRef.current = () => {
      settled = false;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        settled = true;
        scheduleDraw();
      }, SETTLE_MS);
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      render();
    };

    /** Next frame to decode: nearest to the frame in view, ahead and behind in the window's proportions. */
    const nextDecode = () => {
      const decodable = (g: number) => g >= 0 && g < TOTAL_FRAMES && blobs[g] && !bitmaps[g] && !decoding[g];
      for (let k = 0; k <= ahead; k++) {
        if (decodable(center + k)) return center + k;
        const back = center - Math.ceil((k * behind) / ahead);
        if (back < center && decodable(back)) return back;
      }
      return -1;
    };

    let activeDecodes = 0;
    const pumpDecode = () => {
      while (!cancelled && activeDecodes < DECODE_CONCURRENCY) {
        const g = nextDecode();
        if (g < 0) return;
        activeDecodes += 1;
        decoding[g] = 1;
        createImageBitmap(blobs[g]!)
          .then(
            (bitmap) => {
              if (cancelled || !inWindow(g, EVICT_MARGIN)) {
                bitmap.close();
                return;
              }
              bitmaps[g] = bitmap;
              // Repaint for the exact frame in view, or for the first frame of a shot the canvas
              // hasn't shown yet. Never for a merely closer frame: that would make the video creep
              // forward with nobody scrolling.
              if (wanted.includes(g) || (drawnShot !== targetShot && SHOT_OF[g] === targetShot)) scheduleDraw();
            },
            // Undecodable frame: drop it so it isn't retried; nearestFrame() bridges the gap.
            () => {
              blobs[g] = undefined;
            },
          )
          .finally(() => {
            activeDecodes -= 1;
            decoding[g] = 0;
            pumpDecode();
          });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Never render more pixels than the frames carry: `cover` is CSS px per frame px.
      const cover = Math.max(width / frameSize.width, height / frameSize.height);
      const scale = Math.max(1, Math.min(window.devicePixelRatio || 1, MAX_DPR, 1 / cover));
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      // Resizing resets the context; restore the CSS-pixel transform and smoothing.
      // Default (bilinear) quality: 'high' is markedly slower per draw on mobile Safari.
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.imageSmoothingEnabled = true;
      lastKey = '';
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const fetchFrame = (g: number): Promise<void> => {
      if (requested[g]) return Promise.resolve();
      requested[g] = 1;
      const shot = SHOTS[SHOT_OF[g]];
      return fetch(frameUrl(shot.name, g - shot.offset, frameSet))
        .then((res) => (res.ok ? res.blob() : undefined))
        .then(
          (blob) => {
            if (cancelled || !blob) return;
            blobs[g] = blob;
            if (inWindow(g)) pumpDecode();
          },
          // Network failure: nearestFrame() bridges the gap.
          () => undefined,
        );
    };

    /**
     * Next frame to download, following LOAD_PASSES. Shots go by urgency (on screen, the
     * ones after it, then the ones before); in the shot on screen, frames ahead come first.
     */
    const nextFetch = () => {
      // The exact frames in view come first, so a screen at rest settles on crisp frames instead
      // of a blend across neighbours that are still downloading.
      for (const g of wanted) if (!requested[g]) return g;
      const p = progressRef.current.get();
      const current = shotIndexAt(p);
      const order = [...SHOTS.slice(current), ...SHOTS.slice(0, current).reverse()];
      for (const { step, scope } of LOAD_PASSES) {
        for (const shot of scope === 'near' ? order.slice(0, 2) : order) {
          const from = shot === SHOTS[current] ? frameIndexAt(shot, p) : 0;
          for (let k = 0; k < shot.frameCount; k++) {
            const i = (from + k) % shot.frameCount;
            if (i % step === 0 && !requested[shot.offset + i]) return shot.offset + i;
          }
        }
      }
      return -1;
    };

    /** Keeps LOAD_CONCURRENCY downloads in flight, choosing each next frame as a slot frees up. */
    let inFlight = 0;
    const pump = () => {
      while (!cancelled && inFlight < LOAD_CONCURRENCY) {
        const g = nextFetch();
        if (g < 0) return;
        inFlight += 1;
        void fetchFrame(g).then(() => {
          inFlight -= 1;
          pump();
        });
      }
    };

    const priority = shotByName(PRIORITY_SEQUENCE);
    const priorityFrames: number[] = [];
    for (let i = 0; i < priority.frameCount; i += PRIORITY_FRAME_STEP) priorityFrames.push(priority.offset + i);
    if (priorityFrames[priorityFrames.length - 1] !== priority.offset + priority.frameCount - 1) {
      priorityFrames.push(priority.offset + priority.frameCount - 1);
    }
    let priorityDone = 0;
    Promise.all(
      priorityFrames.map((g) =>
        fetchFrame(g).then(() => {
          priorityDone += 1;
          if (!cancelled) setLoadedFraction(priorityDone / priorityFrames.length);
        }),
      ),
    ).then(async () => {
      if (cancelled) return;
      // Decode the opening frame before the loading bar lifts, so it never reveals a blank canvas.
      const first = blobs[priority.offset];
      if (first && !bitmaps[priority.offset]) {
        decoding[priority.offset] = 1;
        try {
          bitmaps[priority.offset] = await createImageBitmap(first);
        } catch {
          // Undecodable: the loader still lifts and nearestFrame() uses the next decoded frame.
        }
        decoding[priority.offset] = 0;
      }
      if (cancelled) return;
      setReady(true);
      scheduleDraw();
      pumpDecode();
      pump();
    });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      drawNowRef.current = () => undefined;
      for (const bitmap of bitmaps) bitmap?.close();
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        aria-label="Introduction"
        className="relative"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      >
        {SECTION_ANCHORS.map(({ id, progress: at, endBelowMd }) => (
          <div
            key={id}
            id={id}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-[var(--anchor-top)] h-px ${endBelowMd ? 'max-md:top-full' : ''}`}
            // scroll-margin 0: html's scroll-padding-top already offsets for the nav.
            style={{ '--anchor-top': `${at * VH_PER_TIMELINE_UNIT}vh`, scrollMarginTop: 0 } as React.CSSProperties}
          />
        ))}

        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#242633] supports-[height:100svh]:h-[100svh]">
          {/* will-change: its own GPU layer, so scrolling never repaints the full-screen canvas. */}
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full will-change-transform" />
          <Scrims progress={progress} />
          <SequenceOverlays progress={progress} reduceMotion={reduceMotion} />
        </div>
      </section>

      <AnimatePresence>
        {!ready && (
          <motion.div
            key="sequence-loader"
            data-sequence-loader=""
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#242633]"
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
          >
            <div
              role="progressbar"
              aria-label="Loading"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(loadedFraction * 100)}
              className="w-[min(260px,60vw)]"
            >
              <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.24em] text-white/55">Gal Moussan</p>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full origin-left bg-[var(--green)] transition-transform duration-300 ease-out"
                  style={{ transform: `scaleX(${loadedFraction})` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <noscript>
        <style>{'[data-sequence-loader]{display:none!important}'}</style>
      </noscript>
    </>
  );
}

/** Editorial gradients that keep white copy legible over the bright daylight frames. */
function Scrims({ progress }: { progress: MotionValue<number> }) {
  const heroEnd = OVERLAY_WINDOWS.hero[1];
  const sideStart = OVERLAY_WINDOWS.about[0];
  const sideEnd = OVERLAY_WINDOWS.other[1];
  const contactStart = OVERLAY_WINDOWS.contact[0];
  const heroOpacity = useTransform(progress, [0, heroEnd - 0.01, heroEnd + 0.02], [1, 1, 0]);
  // The side scrim lifts with the last card so the phoenix reveal plays at full brightness.
  const sideOpacity = useTransform(progress, [heroEnd, sideStart + 0.01, sideEnd - 0.01, sideEnd + 0.02], [0, 1, 1, 0]);
  const contactOpacity = useTransform(progress, [contactStart - 0.01, contactStart + 0.02], [0, 1]);

  return (
    <>
      <motion.div aria-hidden="true" className="sequence-scrim-hero" style={{ opacity: heroOpacity }} />
      <motion.div aria-hidden="true" className="sequence-scrim-side" style={{ opacity: sideOpacity }} />
      <motion.div aria-hidden="true" className="sequence-scrim-contact" style={{ opacity: contactOpacity }} />
      <div aria-hidden="true" className="sequence-scrim-top" />
    </>
  );
}
