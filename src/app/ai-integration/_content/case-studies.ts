import { featuredProjects } from '@/data/featured-projects';

export type CaseStudy = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  tech: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  authorlex: {
    slug: 'authorlex',
    title: 'AuthorLex',
    problem: 'How to transform unstructured personal reflections into publishable how-to books',
    solution: '4 AI agents coordinate to structure, write, edit, and refine chapters—turning raw thoughts into coherent narratives',
    tech: ['Next.js', 'Prisma', 'pgvector', 'Custom agent framework'],
  },
  'digital-creator-ai': {
    slug: 'digital-creator-ai',
    title: 'Digital Creator AI Agent Platform',
    problem: 'SMB clients need consistent social media content without hiring a full team',
    solution: '5-agent pipeline (TrendScout → ContentStrategist → ScriptWriter → VisualDirector → QualityGate) runs autonomous content generation',
    tech: ['BullMQ', 'Claude', 'HeyGen', 'FAL.ai'],
  },
  'transcribe-god': {
    slug: 'transcribe-god',
    title: 'Transcribe God',
    problem: 'Lectures, meetings and videos pile up, and turning them into something you can study takes hours.',
    solution: 'A pipeline that transcribes any recording, summarises it and builds study material from it, end to end.',
    // Same tech as its portfolio card (read from the repo).
    tech: featuredProjects.find((p) => p.title === 'Transcribe God')?.tech ?? [],
  },
};
