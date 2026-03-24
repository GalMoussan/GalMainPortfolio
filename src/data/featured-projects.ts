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
    title: 'CinemaQuery',
    description:
      'A semantic movie search engine powered by AI embeddings from OpenAI and intelligent re-ranking via Claude. Features a persona blending system that learns your preferences to deliver highly personalized movie recommendations tailored to your viewing mood.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI', 'Claude', 'pgvector', 'Prisma', 'TanStack Query'],
    github: 'https://github.com/galmoussan/cinemaquery',
    external: 'https://cinemaquery.vercel.app',
    image: '/images/cinema-query.png',
  },
  {
    title: 'Snake',
    description:
      'A classic Snake game built with TypeScript and HTML5 Canvas, demonstrating modern web development practices. Features smooth controls, progressive difficulty, persistent high scores, and a retro arcade aesthetic. Implemented with a modular entity-component-system architecture, comprehensive testing (80%+ coverage), and immutable data patterns.',
    tech: ['TypeScript', 'HTML5 Canvas', 'Vite', 'Vitest', 'Playwright', 'ESLint', 'Prettier'],
    github: 'https://github.com/GalMoussan/Snake',
    external: 'https://snake-pi-gray.vercel.app',
    image: '/images/snake.png',
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
  {
    title: 'ReelSearch',
    description:
      'A modern movie and TV show discovery app with an intuitive search interface, detailed metadata, and personalized watchlist management. Built with a focus on fast search UX and clean visual design.',
    tech: ['TypeScript', 'React', 'Tailwind CSS'],
    github: 'https://github.com/GalMoussan/reelSearch',
    image: '/images/reel-search.png',
  },
];
