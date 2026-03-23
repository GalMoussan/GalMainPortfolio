export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  image: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'AI Forge',
    description:
      'A community platform for AI builders — share projects, discover tools, and connect with other developers building with AI. Features project showcases, discussion threads, and curated AI resource discovery.',
    tech: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
    github: 'https://github.com/GalMoussan/ai-forge',
    image: '/images/AI-forge.png',
  },
  {
    title: 'ReelSearch',
    description:
      'A modern movie and TV show discovery app with an intuitive search interface, detailed metadata, and personalized watchlist management. Built with a focus on fast search UX and clean visual design.',
    tech: ['TypeScript', 'React', 'Tailwind CSS'],
    github: 'https://github.com/GalMoussan/reelSearch',
    image: '/images/reel-search.png',
  },
  {
    title: 'CIM',
    description:
      'A content intelligence manager that streamlines editorial workflows. Helps teams plan, organize, and track content pipelines with a clean kanban-style interface and AI-assisted content suggestions.',
    tech: ['TypeScript', 'Next.js', 'React'],
    github: 'https://github.com/GalMoussan/CIM',
    image: '/images/cim.png',
  },
  {
    title: 'X Intelligence Pipeline',
    description:
      'An automated data pipeline that ingests posts from X (Twitter), processes them through NLP enrichment, and surfaces actionable intelligence signals. Useful for trend monitoring and audience research.',
    tech: ['Python', 'NLP', 'Data Pipeline'],
    github: 'https://github.com/GalMoussan/x-intelligence-pipeline',
    image: '/images/x-pipeline.png',
  },
];
