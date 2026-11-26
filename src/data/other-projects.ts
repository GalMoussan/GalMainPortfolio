export interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  /** Creation year of the GitHub repo (or of the game's first commit in this repo). */
  year: number;
  github?: string;
  external?: string;
  /** Page on this site where the project can be played. */
  play?: string;
}

export const otherProjects: OtherProject[] = [
  {
    title: 'Drop Merge',
    description: 'A drop-and-merge puzzle game with a live leaderboard. Playable right on this site.',
    tech: ['Godot', 'GDScript', 'WebAssembly', 'Next.js', 'Upstash Redis'],
    year: 2026,
    play: '/onepiece',
  },
  {
    title: 'Snake',
    description:
      'A classic Snake game built with TypeScript and HTML5 Canvas, with smooth controls, progressive difficulty, persistent high scores and a retro arcade look. Built with an entity-component-system architecture, immutable data patterns and 80%+ test coverage.',
    tech: ['TypeScript', 'HTML5 Canvas', 'Vite', 'Vitest', 'Playwright'],
    year: 2026,
    github: 'https://github.com/GalMoussan/Snake',
    external: 'https://snake-pi-gray.vercel.app',
    play: '/tools/snake',
  },
];
