import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export interface LeaderboardEntry {
  name: string;
  score: number;
  updatedAt?: string;
}

const REDIS_KEY = 'onepiece:leaderboard:v1';
const MAX_ENTRIES = 3;
const MAX_NAME_LENGTH = 16;

let memoryFallback: LeaderboardEntry[] = [];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
};

function sanitizeName(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const cleaned = raw
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_NAME_LENGTH);
  return cleaned;
}

function normalizeScores(raw: unknown): LeaderboardEntry[] {
  if (!Array.isArray(raw)) return [];
  const valid: LeaderboardEntry[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const name = sanitizeName(record.name);
    const numScore = typeof record.score === 'number' ? Math.floor(record.score) : Number.NaN;
    if (!name || !Number.isFinite(numScore) || numScore <= 0) continue;
    valid.push({
      name,
      score: numScore,
      updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : undefined,
    });
  }
  valid.sort((a, b) => b.score - a.score);
  return valid.slice(0, MAX_ENTRIES);
}

function mergeScoreLists(...lists: LeaderboardEntry[][]): LeaderboardEntry[] {
  const merged: LeaderboardEntry[] = [];
  const counts = new Map<string, number>();

  for (const list of lists) {
    const localCounts = new Map<string, number>();
    for (const item of normalizeScores(list)) {
      const key = `${item.name.toLowerCase()}::${item.score}`;
      const nextCount = (localCounts.get(key) ?? 0) + 1;
      localCounts.set(key, nextCount);
      const existingCount = counts.get(key) ?? 0;
      if (nextCount > existingCount) {
        counts.set(key, nextCount);
        merged.push(item);
      }
    }
  }

  return normalizeScores(merged);
}

async function readScores(): Promise<LeaderboardEntry[]> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return [...memoryFallback];
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['GET', REDIS_KEY]),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Upstash GET failed with status:', response.status);
      return [...memoryFallback];
    }

    const data = (await response.json()) as { result?: string | null };
    if (!data?.result) return [...memoryFallback];
    const parsed = JSON.parse(data.result);
    const scores = mergeScoreLists(normalizeScores(parsed), memoryFallback);
    memoryFallback = scores;
    return scores;
  } catch (error) {
    console.error('Failed to read leaderboard from Upstash:', error);
    return [...memoryFallback];
  }
}

async function writeScores(scores: LeaderboardEntry[]): Promise<void> {
  const normalized = normalizeScores(scores);
  memoryFallback = normalized;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', REDIS_KEY, JSON.stringify(normalized)]),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Upstash SET failed with status:', response.status);
    }
  } catch (error) {
    console.error('Failed to write leaderboard to Upstash:', error);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  const scores = await readScores();
  return NextResponse.json({ scores }, { headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = sanitizeName(body?.name);
    const rawScore = typeof body?.score === 'number' ? body.score : Number(body?.score);
    const score = Number.isFinite(rawScore) ? Math.floor(rawScore) : 0;
    const previousScores = normalizeScores(body?.previousScores);

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (score <= 0 || score > 10_000_000) {
      return NextResponse.json(
        { message: 'Valid score is required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const current = mergeScoreLists(await readScores(), previousScores);
    const qualifies =
      current.length < MAX_ENTRIES || score > current[MAX_ENTRIES - 1].score;

    if (!qualifies) {
      if (current.length > 0) {
        await writeScores(current);
      }
      return NextResponse.json(
        { qualified: false, scores: current },
        { headers: CORS_HEADERS }
      );
    }

    const next = normalizeScores([
      ...current,
      { name, score, updatedAt: new Date().toISOString() },
    ]);
    await writeScores(next);

    return NextResponse.json(
      { qualified: true, scores: next },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Leaderboard POST error:', error);
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}
