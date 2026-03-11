export interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
}

export const otherProjects: OtherProject[] = [
  {
    title: 'VeracityAds Affiliate Platform',
    description:
      'Built and optimized a full-stack affiliate marketing CRM system with campaign management, analytics dashboards, and real-time reporting capabilities.',
    tech: ['React', 'Python', 'Node.js'],
    github: 'https://github.com/galmoussan',
  },
  {
    title: 'Tarific-Digital Websites',
    description:
      'Designed and maintained multiple client-facing websites with responsive layouts, modern UI patterns, and optimized performance.',
    tech: ['React', 'Node.js', 'CSS'],
    github: 'https://github.com/galmoussan',
  },
  {
    title: 'My Wave Volunteer Platform',
    description:
      'A web presence for the My Wave surf therapy program, teaching youth at risk how to surf and handle life challenges through ocean therapy.',
    tech: ['React', 'Tailwind CSS', 'Firebase'],
    github: 'https://github.com/galmoussan',
  },
  {
    title: 'Heroes for Life Community Portal',
    description:
      'Community service coordination platform for backpacker volunteers providing school tutoring in developing countries around the world.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/galmoussan',
  },
  {
    title: 'Automated Test Dashboard',
    description:
      'A real-time dashboard for monitoring automated test runs, displaying pass/fail rates, execution times, and historical trends across test suites.',
    tech: ['JavaScript', 'Selenium', 'Chart.js'],
    github: 'https://github.com/galmoussan',
  },
  {
    title: 'Campaign Analytics Tool',
    description:
      'A lightweight analytics tool for tracking affiliate campaign performance metrics, ROI calculations, and conversion funnels.',
    tech: ['Angular', 'TypeScript', 'D3.js'],
    github: 'https://github.com/galmoussan',
  },
  {
    title: 'Portfolio Website',
    description:
      'This very portfolio site — a pixel-perfect clone of a popular developer portfolio design, built with Next.js and Tailwind CSS.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/galmoussan',
  },
  {
    title: 'Firebase Auth Starter',
    description:
      'A reusable authentication boilerplate with Firebase Auth, role-based access control, and protected route patterns for Angular and React apps.',
    tech: ['Firebase', 'Angular', 'TypeScript'],
    github: 'https://github.com/galmoussan',
  },
];
