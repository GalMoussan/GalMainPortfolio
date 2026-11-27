/** Earlier projects listed only in the Archive. Featured and other projects come from their own files. */
export interface ArchivedProject {
  title: string;
  tech: string[];
  /** Creation year of the GitHub repo. */
  year: number;
  /** Only for public repos. */
  github?: string;
  external?: string;
  /** Kept on record but shown nowhere on the site (e.g. not Gal's own work). */
  hidden?: boolean;
}

export const archivedProjects: ArchivedProject[] = [
  {
    // One project: the old cinemaquery repo is gone; its code and deployment live on as
    // movieSearch, which /tools/cinema-query embeds under the CinemaQuery name.
    title: 'CinemaQuery',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'OpenAI', 'Claude', 'TanStack Query'],
    year: 2026,
    github: 'https://github.com/GalMoussan/movieSearch',
    external: '/tools/cinema-query',
  },
  {
    title: 'CIM',
    tech: ['TypeScript', 'ts-morph', 'Next.js', 'React', 'dagre'],
    year: 2026,
    github: 'https://github.com/GalMoussan/CIM',
  },
  {
    title: 'X Intelligence Pipeline',
    tech: ['Python', 'Claude API', 'CrewAI', 'Tweepy', 'Jinja2', 'GitHub Actions'],
    year: 2026,
    github: 'https://github.com/GalMoussan/x-intelligence-pipeline',
  },
  {
    title: 'ReelSearch',
    tech: ['Next.js', 'Prisma', 'pgvector', 'BullMQ', 'Whisper', 'Claude Vision'],
    year: 2026,
    github: 'https://github.com/GalMoussan/reelSearch',
    external: 'https://reel-search-green.vercel.app',
  },
  {
    title: 'Content Factory',
    tech: ['TypeScript', 'Express', 'React', 'SQLite', 'Claude API', 'Remotion'],
    year: 2026,
    github: 'https://github.com/GalMoussan/Content-factory',
  },
  {
    title: 'InfluencerBuddy',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'BullMQ', 'Claude API', 'fal.ai'],
    year: 2026,
    github: 'https://github.com/GalMoussan/InfluencerBuddy',
  },
  {
    title: 'Pocket Ask',
    tech: ['Node.js', 'TypeScript', 'whatsapp-web.js', 'OpenAI', 'SQLite'],
    year: 2026,
  },
  {
    title: 'MySassy',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS', 'Mailgun'],
    year: 2025,
    github: 'https://github.com/GalMoussan/MySassy',
    hidden: true,
  },
  {
    title: 'LeadsFactory',
    tech: ['Python', 'FastAPI', 'Playwright', 'Pydantic', 'SQLite', 'Next.js'],
    year: 2025,
    github: 'https://github.com/GalMoussan/LeadsFactory',
  },
  {
    title: 'StudyBuddy',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts', 'TanStack Query'],
    year: 2026,
    github: 'https://github.com/GalMoussan/TelStudy',
    external: 'https://tel-study.vercel.app',
  },
  {
    title: 'invert-chrome-extension',
    tech: ['JavaScript', 'Chrome Extensions API'],
    year: 2023,
    github: 'https://github.com/GalMoussan/invert-chrome-extension',
    hidden: true,
  },
  {
    title: 'Social Net',
    tech: ['React', 'TypeScript', 'Vite', 'Firebase', 'Tailwind CSS', 'OpenAI'],
    year: 2025,
    github: 'https://github.com/GalMoussan/Family-net',
    external: 'https://family-net.vercel.app',
  },
];
