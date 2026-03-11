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
    title: 'Lagoonads CRM',
    description:
      'A comprehensive affiliate marketing CRM system built for managing campaigns, tracking performance, and handling affiliate relationships. Features real-time dashboards, reporting tools, and multi-role user management.',
    tech: ['Angular', 'Node.js', 'TypeScript', 'REST API'],
    image: '/images/halcyon.svg',
  },
  {
    title: '121Brokers CRM',
    description:
      'A full-featured CRM platform with three distinct user interfaces for brokers, managers, and administrators. Built to handle complex financial workflows, client management, and real-time data synchronization.',
    tech: ['Angular', 'Node.js', 'Firebase', 'TypeScript'],
    image: '/images/spotify.svg',
  },
  {
    title: 'QA Automation Framework',
    description:
      'Led the migration of manual QA processes to a fully automated testing pipeline at Netlinkz. Built a robust framework that dramatically reduced regression testing time and improved deployment confidence.',
    tech: ['Selenium', 'TestNG', 'JavaScript', 'Node.js'],
    image: '/images/course.svg',
  },
];
