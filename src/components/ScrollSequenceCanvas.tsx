'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  BACKGROUND_BATCH_SIZE,
  CUT_BRIDGE,
  OVERLAY_WINDOWS,
  PRIORITY_SEQUENCE,
  SCROLL_HEIGHT_VH,
  SECTION_ANCHORS,
  SEQUENCES,
  frameUrl,
  type SequenceDefinition,
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 170, damping: 32, mass: 0.6, restDelta: 0.0001 });
  const progress = reduceMotion ? scrollYProgress : smoothProgress;

  const progressRef = useRef(progress);
  progressRef.current = progress;
  const scheduleDrawRef = useRef<() => void>(() => undefined);

  const [loadedFraction, setLoadedFraction] = useState(0);
  const [ready, setReady] = useState(false);

  useMotionValueEvent(progress, 'change', () => scheduleDrawRef.current());
  useEffect(() => scheduleDrawRef.current(), [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !ctx) return;

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

    const bridgeFrom = sequenceByName(CUT_BRIDGE.from);
    const bridgeTo = sequenceByName(CUT_BRIDGE.to);
    const bridgeStart = bridgeTo.start - CUT_BRIDGE.halfWidth;

    const render = () => {
      raf = null;
      if (!width || !height) return;
      const p = clamp01(progressRef.current.get());
      const bridgeT = (p - bridgeStart) / (2 * CUT_BRIDGE.halfWidth);

      if (bridgeT <= 0 || bridgeT >= 1) {
        const seq = SEQUENCES[sequenceIndexAt(p)];
        const frame = nearestFrame(frames[seq.name], frameIndexAt(seq, p));
        // Nothing decoded for this shot yet: keep whatever is on screen.
        if (!frame) return;
        const key = `${seq.name}:${frame.index}`;
        if (key === lastKey) return;
        lastKey = key;
        drawCover(ctx, frame.img, width, height);
        return;
      }

      const a = nearestFrame(frames[bridgeFrom.name], frameIndexAt(bridgeFrom, p));
      const b = nearestFrame(frames[bridgeTo.name], frameIndexAt(bridgeTo, p));
      if (!a && !b) return;
      const key = `bridge:${a?.index}:${b?.index}:${bridgeT.toFixed(3)}`;
      if (key === lastKey) return;
      lastKey = key;
      if (a) drawCover(ctx, a.img, width, height);
      if (b) drawCover(ctx, b.img, width, height, a ? smoothstep(bridgeT) : 1);
      ctx.fillStyle = `rgba(${CUT_BRIDGE.rgb}, ${CUT_BRIDGE.maxDarkness * Math.sin(Math.PI * bridgeT)})`;
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
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
      img.src = frameUrl(name, index);
      return img.decode().then(
        () => {
          if (cancelled) return;
          frames[name][index] = img;
          scheduleDraw();
        },
        // Missing or corrupt frame: nearestFrame() bridges the gap.
        () => undefined,
      );
    };

    /** Next unrequested frames: the shot on screen first, then later shots, then earlier ones. */
    const nextBatch = () => {
      const current = sequenceIndexAt(clamp01(progressRef.current.get()));
      for (const seq of [...SEQUENCES.slice(current), ...SEQUENCES.slice(0, current)]) {
        const flags = requested[seq.name];
        const indices: number[] = [];
        for (let i = 0; i < flags.length && indices.length < BACKGROUND_BATCH_SIZE; i++) {
          if (!flags[i]) indices.push(i);
        }
        if (indices.length) return { name: seq.name, indices };
      }
      return null;
    };

    const priority = sequenceByName(PRIORITY_SEQUENCE);
    let priorityDone = 0;
    Promise.all(
      Array.from({ length: priority.frameCount }, (_, i) =>
        loadFrame(priority.name, i).then(() => {
          priorityDone += 1;
          if (!cancelled) setLoadedFraction(priorityDone / priority.frameCount);
        }),
      ),
    ).then(async () => {
      if (cancelled) return;
      setReady(true);
      while (!cancelled) {
        const batch = nextBatch();
        if (!batch) break;
        await Promise.all(batch.indices.map((i) => loadFrame(batch.name, i)));
      }
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
      {/* Must stay in sync with SCROLL_HEIGHT_VH. */}
      <section ref={containerRef} aria-label="Introduction" className="relative h-[650vh]">
        {SECTION_ANCHORS.map(({ id, progress: at }) => (
          <div
            key={id}
            id={id}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-px"
            // scroll-margin 0: html's scroll-padding-top already offsets for the nav.
            style={{ top: `calc(${at} * ${SCROLL_HEIGHT_VH - 100}vh)`, scrollMarginTop: 0 }}
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
  const heroOpacity = useTransform(progress, [0, heroEnd - 0.01, heroEnd + 0.02], [1, 1, 0]);
  const sideOpacity = useTransform(progress, [heroEnd, sideStart + 0.01], [0, 1]);

  return (
    <>
      <motion.div aria-hidden="true" className="sequence-scrim-hero" style={{ opacity: heroOpacity }} />
      <motion.div aria-hidden="true" className="sequence-scrim-side" style={{ opacity: sideOpacity }} />
      <div aria-hidden="true" className="sequence-scrim-top" />
    </>
  );
}
