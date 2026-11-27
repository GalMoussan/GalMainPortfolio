export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  /** Creation year of the GitHub repo. */
  year: number;
  /** Archive "Made at"; omitted means a personal project. */
  madeAt?: string;
  /** Only for public repos. */
  github?: string;
  external?: string;
  /** Access password for a gated live demo, revealed on request next to the project. */
  livePassword?: string;
  image: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Transcribe God',
    description:
      'A study tool that turns any recording into something you can learn from. Drop in a lecture, a meeting or a video, and it transcribes it, summarises it and builds study material from it. I built it for my own university courses.',
    tech: ['Python', 'whisper.cpp', 'ffmpeg', 'SQLite', 'Ollama', 'Claude API'],
    year: 2026,
    image: '/images/transcribe-god.png',
  },
  {
    title: 'KineticFlow',
    description:
      'An open-source tool for making kinetic-typography reels instantly. It runs locally on your own GPU and RAM: no cloud render queue, no subscription, no upload.',
    tech: ['TypeScript', 'React', 'Vite', 'Hono', 'Playwright', 'ffmpeg'],
    year: 2026,
    github: 'https://github.com/GalMoussan/KineticFlow',
    image: '/images/kineticflow.png',
  },
  {
    title: 'Yassa North website',
    description:
      "The public website of Yassa North, the school where I lead AI and development. It presents the school's courses to students, parents and partner schools.",
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    year: 2026,
    madeAt: 'Yassa North',
    external: 'https://iasanorth.com',
    image: '/images/yassa-north.png',
  },
  {
    title: 'Ayalim Game',
    description:
      'A 2D adventure game in the browser: explore, fight monsters, and level up a character through a full progression system.',
    tech: ['TypeScript', 'Phaser', 'Vite', 'Node.js', 'WebSockets'],
    year: 2026,
    external: 'https://ayalim-game.vercel.app',
    // Intentionally public: the deployment is password-gated, and visitors get the password here.
    livePassword: 'Doflamingo12',
    image: '/images/ayalim-game.png',
  },
  {
    title: 'Connections',
    description:
      'A Hebrew Connections-style word game built to play with friends: find the four hidden groups among 16 words. Daily puzzles, levels and leaderboards; mistakes are counted, but the game never ends early.',
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Motion'],
    year: 2026,
    external: 'https://connections-friends.vercel.app',
    image: '/images/connections-friends.png',
  },
  {
    title: 'Tivnili',
    description:
      "Personal brand landing page for Tivnili (תִּבְנִילִי — Hebrew: 'build for me'), my studio selling websites, AI tools, and strategy sessions to small business owners. Your business, finally built.",
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Express'],
    year: 2026,
    github: 'https://github.com/GalMoussan/Tivnili',
    external: 'https://tivnili.galmoussan.com',
    image: '/images/tivnili.png',
  },
];
