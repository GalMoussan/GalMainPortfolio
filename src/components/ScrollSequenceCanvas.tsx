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
  LOAD_CONCURRENCY,
  LOAD_PASSES,
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
  type SequenceDefinition,
  type FrameSet,
  type SequenceName,
} from '@/lib/sequenceConfig';
import { SequenceOverlays } from '@/components/sequence/SequenceOverlays';

type Frames = (HTMLImageElement | undefined)[];

const MAX_DPR = 2;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function sequenceByName(name: SequenceName): SequenceDefinition {
  const seq = SEQUENCES.find((s) => s.name === name);
  if (!seq) throw new Error(`Unknown sequence: ${name}`);
  return seq;
}

function sequenceIndexAt(p: number): number {
  const i = SEQUENCES.findIndex((s) => p < s.end);
  return i === -1 ? SEQUENCES.length - 1 : i;
}

function frameIndexAt(seq: SequenceDefinition, p: number): number {
  return Math.round(clamp01((p - seq.start) / (seq.end - seq.start)) * (seq.frameCount - 1));
}

/** Closest decoded frame to `index`, so a frame still in flight never blanks the canvas. */
function nearestFrame(frames: Frames, index: number) {
  for (let d = 0; d < frames.length; d++) {
    const before = frames[index - d];
    if (before) return { img: before, index: index - d };
    const after = frames[index + d];
    if (after) return { img: after, index: index + d };
  }
  return null;
}

/** `object-fit: cover` for canvas: fill the viewport, crop the overflow evenly. */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, alpha = 1) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
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
  const scheduleDrawRef = useRef<() => void>(() => undefined);

  const [loadedFraction, setLoadedFraction] = useState(0);
  const [ready, setReady] = useState(false);

  useMotionValueEvent(progress, 'change', () => scheduleDrawRef.current());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !ctx) return;

    // Chosen once per load; a later rotation keeps this set and cover-fits it.
    const frameSet: FrameSet = window.innerWidth / window.innerHeight < PORTRAIT_MAX_ASPECT ? 'portrait' : 'full';

    let cancelled = false;
    let raf: number | null = null;
    let lastKey = '';
    let width = 0;
    let height = 0;

    const frames = {} as Record<SequenceName, Frames>;
    const requested = {} as Record<SequenceName, Uint8Array>;
    for (const seq of SEQUENCES) {
      frames[seq.name] = Array.from<HTMLImageElement | undefined>({ length: seq.frameCount });
      requested[seq.name] = new Uint8Array(seq.frameCount);
    }

    const bridges = CUT_BRIDGES.map((bridge) => {
      const toSeq = sequenceByName(bridge.to);
      return { ...bridge, fromSeq: sequenceByName(bridge.from), toSeq, start: toSeq.start - bridge.halfWidth };
    });

    /** Exact frames the current scroll position calls for (`name:index`). */
    let wanted = new Set<string>();

    const render = () => {
      raf = null;
      if (!width || !height) return;
      const p = Math.min(TIMELINE_END, Math.max(0, progressRef.current.get()));
      const bridge = bridges.find((b) => p > b.start && p < b.start + 2 * b.halfWidth);

      if (!bridge) {
        const seq = SEQUENCES[sequenceIndexAt(p)];
        const target = frameIndexAt(seq, p);
        wanted = new Set([`${seq.name}:${target}`]);
        const frame = nearestFrame(frames[seq.name], target);
        // Nothing decoded for this shot yet: keep whatever is on screen.
        if (!frame) return;
        const key = `${seq.name}:${frame.index}`;
        if (key === lastKey) return;
        lastKey = key;
        drawCover(ctx, frame.img, width, height);
        return;
      }

      const t = (p - bridge.start) / (2 * bridge.halfWidth);
      const fromTarget = frameIndexAt(bridge.fromSeq, p);
      const toTarget = frameIndexAt(bridge.toSeq, p);
      wanted = new Set([`${bridge.from}:${fromTarget}`, `${bridge.to}:${toTarget}`]);
      const a = nearestFrame(frames[bridge.fromSeq.name], fromTarget);
      const b = nearestFrame(frames[bridge.toSeq.name], toTarget);
      if (!a && !b) return;
      const key = `bridge:${bridge.to}:${a?.index}:${b?.index}:${t.toFixed(3)}`;
      if (key === lastKey) return;
      lastKey = key;
      if (a) drawCover(ctx, a.img, width, height);
      if (b) drawCover(ctx, b.img, width, height, a ? smoothstep(t) : 1);
      ctx.fillStyle = `rgba(${BRIDGE_RGB}, ${bridge.maxDarkness * Math.sin(Math.PI * t)})`;
      ctx.fillRect(0, 0, width, height);
    };

    const scheduleDraw = () => {
      if (raf === null) raf = requestAnimationFrame(render);
    };
    scheduleDrawRef.current = scheduleDraw;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // Resizing resets the context; restore the CSS-pixel transform and smoothing.
      // Default (bilinear) quality: 'high' is markedly slower per draw on mobile Safari.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      lastKey = '';
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const loadFrame = (name: SequenceName, index: number): Promise<void> => {
      if (requested[name][index]) return Promise.resolve();
      requested[name][index] = 1;
      const img = new Image();
      img.decoding = 'async';
      img.src = frameUrl(name, index, frameSet);
      return img.decode().then(
        () => {
          if (cancelled) return;
          frames[name][index] = img;
          // Repaint only when this is the exact frame on screen; redrawing closer fallbacks
          // as they stream in would make the video creep forward with nobody scrolling.
          if (wanted.has(`${name}:${index}`)) scheduleDraw();
        },
        // Missing or corrupt frame: nearestFrame() bridges the gap.
        () => undefined,
      );
    };

    /**
     * Next frame to fetch, following LOAD_PASSES. Shots go by urgency (on screen, the
     * ones after it, then the ones before); in the shot on screen, frames ahead come first.
     */
    const nextFrame = () => {
      const p = progressRef.current.get();
      const current = sequenceIndexAt(p);
      const shots = [...SEQUENCES.slice(current), ...SEQUENCES.slice(0, current).reverse()];
      for (const { step, scope } of LOAD_PASSES) {
        for (const seq of scope === 'near' ? shots.slice(0, 2) : shots) {
          const flags = requested[seq.name];
          const from = seq === SEQUENCES[current] ? frameIndexAt(seq, p) : 0;
          for (let k = 0; k < flags.length; k++) {
            const i = (from + k) % flags.length;
            if (i % step === 0 && !flags[i]) return { name: seq.name, index: i };
          }
        }
      }
      return null;
    };

    /** Keeps LOAD_CONCURRENCY downloads in flight, choosing each next frame as a slot frees up. */
    let inFlight = 0;
    const pump = () => {
      while (!cancelled && inFlight < LOAD_CONCURRENCY) {
        const next = nextFrame();
        if (!next) return;
        inFlight += 1;
        void loadFrame(next.name, next.index).then(() => {
          inFlight -= 1;
          pump();
        });
      }
    };

    const priority = sequenceByName(PRIORITY_SEQUENCE);
    const priorityIndices: number[] = [];
    for (let i = 0; i < priority.frameCount; i += PRIORITY_FRAME_STEP) priorityIndices.push(i);
    if (priorityIndices[priorityIndices.length - 1] !== priority.frameCount - 1) {
      priorityIndices.push(priority.frameCount - 1);
    }
    let priorityDone = 0;
    Promise.all(
      priorityIndices.map((i) =>
        loadFrame(priority.name, i).then(() => {
          priorityDone += 1;
          if (!cancelled) setLoadedFraction(priorityDone / priorityIndices.length);
        }),
      ),
    ).then(() => {
      if (cancelled) return;
      setReady(true);
      pump();
    });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
      scheduleDrawRef.current = () => undefined;
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
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
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
