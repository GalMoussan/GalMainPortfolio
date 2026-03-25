export interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
}

export const otherProjects: OtherProject[] = [
  {
    title: 'movieSearch',
    description:
      'A fresh take on movie discovery — search films and TV shows in a new way with a sleek interface and rich metadata from public APIs.',
    tech: ['TypeScript', 'React'],
    github: 'https://github.com/GalMoussan/movieSearch',
  },
  {
    title: 'Content Factory',
    description:
      'AI-powered content creation engine with zero human touch. Automates the full content lifecycle from ideation to publishing using LLM pipelines.',
    tech: ['TypeScript', 'Next.js', 'AI/LLM APIs'],
    github: 'https://github.com/GalMoussan/Content-factory',
  },
  {
    title: 'InfluencerBuddy',
    description:
      'An AI-driven assistant for influencer marketing — helps creators and brands streamline outreach, track campaigns, and analyze engagement.',
    tech: ['TypeScript', 'React', 'AI/LLM APIs'],
    github: 'https://github.com/GalMoussan/InfluencerBuddy',
  },
  {
    title: 'Pocket Ask',
    description:
      'WhatsApp AI assistant that intercepts private messages and responds using OpenAI GPT-3.5. Features conversation context management, rate limiting, and customizable prompts for intelligent WhatsApp automation.',
    tech: ['Node.js', 'TypeScript', 'OpenAI', 'SQLite', 'WhatsApp Web'],
    github: 'https://github.com/GalMoussan/MUSITSAP',
  },
  {
    title: 'MySassy',
    description:
      'A complete SaaS template generator with pre-built authentication (Google, Facebook, Twitter OAuth), Stripe subscription management, payment processing, and user dashboards. Eliminates months of boilerplate development for subscription-based businesses.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'TailwindCSS', 'Mailgun'],
    github: 'https://github.com/GalMoussan/MySassy',
  },
  {
    title: 'LeadsFactory',
    description:
      'A backend system for automated lead discovery and organization — scrapes, enriches, and structures lead data for sales pipelines.',
    tech: ['Python'],
    github: 'https://github.com/GalMoussan/LeadsFactory',
  },
  {
    title: 'StudyBuddy',
    description:
      'A study enhancement app that helps users learn more effectively with structured sessions, progress tracking, and spaced repetition tools.',
    tech: ['TypeScript', 'React'],
    github: 'https://github.com/GalMoussan/TelStudy',
  },
  {
    title: 'invert-chrome-extension',
    description:
      'A lightweight Chrome extension that inverts web page colors for improved readability in low-light environments or for accessibility needs.',
    tech: ['JavaScript'],
    github: 'https://github.com/GalMoussan/invert-chrome-extension',
  },
  {
    title: 'Social Net',
    description:
      'A private social network for family and close friends — share posts, photos, and updates in a safe, closed community space.',
    tech: ['TypeScript', 'React'],
    github: 'https://github.com/GalMoussan/Family-net',
  },
];
