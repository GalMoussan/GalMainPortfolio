import { CHAPTER_TITLES, SEQUENCES, TIMECODE_FPS, type SequenceDefinition, type SequenceName } from './sequenceConfig';

export type Shot = SequenceDefinition & { offset: number };

/** Every shot's frames share one flat index space; `offset` is a shot's first global index. */
export const SHOTS: readonly Shot[] = SEQUENCES.reduce<Shot[]>((shots, seq) => {
  const prev = shots[shots.length - 1];
  shots.push({ ...seq, offset: prev ? prev.offset + prev.frameCount : 0 });
  return shots;
}, []);

export const TOTAL_FRAMES = SHOTS.reduce((n, shot) => n + shot.frameCount, 0);

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function shotByName(name: SequenceName): Shot {
  const shot = SHOTS.find((s) => s.name === name);
  if (!shot) throw new Error(`Unknown sequence: ${name}`);
  return shot;
}

export function shotIndexAt(p: number): number {
  const i = SHOTS.findIndex((s) => p < s.end);
  return i === -1 ? SHOTS.length - 1 : i;
}

/** Fractional frame position within `shot` for timeline position `p`. */
export function framePositionAt(shot: Shot, p: number): number {
  return clamp01((p - shot.start) / (shot.end - shot.start)) * (shot.frameCount - 1);
}

/** Frame index within `shot` for timeline position `p`. */
export function frameIndexAt(shot: Shot, p: number): number {
  return Math.round(framePositionAt(shot, p));
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Chapter (1-based, one per shot) and film timecode (MM:SS:FF) of the frame on screen at
 * timeline position `p`, counting frames across all shots as one continuous film.
 */
export function timecodeAt(p: number): { chapter: string; title: string; timecode: string } {
  const index = shotIndexAt(p);
  const shot = SHOTS[index];
  const frame = shot.offset + frameIndexAt(shot, p);
  const seconds = Math.floor(frame / TIMECODE_FPS);
  return {
    chapter: pad2(index + 1),
    title: CHAPTER_TITLES[shot.name],
    timecode: `${pad2(Math.floor(seconds / 60))}:${pad2(seconds % 60)}:${pad2(frame % TIMECODE_FPS)}`,
  };
}
