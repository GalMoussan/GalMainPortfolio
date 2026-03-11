export interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
}

export const otherProjects: OtherProject[] = [
  {
    title: 'Integrating Algolia Search with WordPress Multisite',
    description:
      'Building a custom multisite compatible WordPress plugin to add Algolia instant search functionality to flavor network flavor profiles and recipe content.',
    tech: ['Algolia', 'WordPress', 'PHP'],
    github: 'https://github.com/bchiang7',
    external: 'https://example.com',
  },
  {
    title: 'Time to Have More Fun',
    description:
      'A single page web app for helping me decide what to do when I have mass amounts of free time. Uses the Bored API to generate random activities.',
    tech: ['Next.js', 'Tailwind CSS', 'Firebase'],
    github: 'https://github.com/bchiang7',
    external: 'https://example.com',
  },
  {
    title: 'Building a Headless Mobile App CMS From Scratch',
    description:
      'Find movies, TV shows and celebrities. Rate your favorites and create custom watchlists, all while managing your content in a powerful CMS.',
    tech: ['Node', 'Express', 'Firebase', 'Vue'],
    github: 'https://github.com/bchiang7',
  },
  {
    title: 'OctoProfile',
    description:
      'A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages, starred repositories, and sort through your top repos by number of stars, forks, and size.',
    tech: ['Next.js', 'Chart.js', 'GitHub API'],
    github: 'https://github.com/bchiang7/octoprofile',
    external: 'https://octoprofile.now.sh',
  },
  {
    title: 'Google Keep Clone',
    description:
      'A simple Google Keep clone built with Vue and Firebase. Includes features such as notes, checklists, and reminders.',
    tech: ['Vue', 'Firebase'],
    github: 'https://github.com/bchiang7',
    external: 'https://example.com',
  },
  {
    title: 'Apple Music Embeddable Web Player Widget',
    description:
      'Embeddable web player widget for Apple Music that lets users search for and bytes preview songs, albums, and artists. Built for the MusicKit JS framework.',
    tech: ['MusicKit.js', 'JS', 'SCSS'],
    github: 'https://github.com/bchiang7',
    external: 'https://example.com',
  },
];
