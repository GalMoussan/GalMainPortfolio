export type CaseStudy = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  tech: string[];
  link?: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  authorlex: {
    slug: 'authorlex',
    title: 'AuthorLex',
    problem: 'How to transform unstructured personal reflections into publishable how-to books',
    solution: '4 AI agents coordinate to structure, write, edit, and refine chapters—turning raw thoughts into coherent narratives',
    tech: ['Next.js', 'Prisma', 'pgvector', 'Custom agent framework'],
    link: '#case-studies', // TODO: Replace with real case study page when available
  },
  'digital-creator-ai': {
    slug: 'digital-creator-ai',
    title: 'Digital Creator AI Agent Platform',
    problem: 'SMB clients need consistent social media content without hiring a full team',
    solution: '5-agent pipeline (TrendScout → ContentStrategist → ScriptWriter → VisualDirector → QualityGate) runs autonomous content generation',
    tech: ['BullMQ', 'Claude', 'HeyGen', 'FAL.ai'],
    link: '#case-studies',
  },
  reelsearch: {
    slug: 'reelsearch',
    title: 'reelSearch',
    problem: 'Saved Instagram reels pile up with no way to search or organize them',
    solution: 'AI-powered semantic search using Whisper transcription + Claude vision + pgvector—turn your reel collection into a searchable knowledge base',
    tech: ['Whisper', 'Claude Vision', 'pgvector', 'Next.js'],
    link: '#case-studies',
  },
};
