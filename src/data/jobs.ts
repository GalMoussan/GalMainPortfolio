export interface Job {
  company: string;
  title: string;
  url: string;
  range: string;
  duties: string[];
}

export const jobs: Job[] = [
  {
    company: 'Lagoonads',
    title: 'Tech Lead, Fullstack Developer',
    url: 'https://www.lagoonads.com/',
    range: 'September 2024 - Present',
    duties: [
      'Leading the development of an affiliate marketing CRM system using Angular and Node.js',
      'Architecting scalable solutions and making key technical decisions for the platform',
      'Managing development workflows and mentoring team members',
      'Building and optimizing features for tracking, reporting, and affiliate management',
    ],
  },
  {
    company: '121Brokers',
    title: 'Fullstack Developer',
    url: '#',
    range: 'April - September 2024',
    duties: [
      'Built a full-featured CRM platform with three distinct user interfaces for brokers, managers, and administrators',
      'Developed complex financial workflows, client management features, and real-time data synchronization',
      'Worked with Angular, Node.js, Firebase, and TypeScript in a fast-paced startup environment',
    ],
  },
  {
    company: 'Netlinkz',
    title: 'Automation Specialist',
    url: '#',
    range: 'September 2023 - March 2024',
    duties: [
      'Led the migration of manual QA processes to a fully automated testing pipeline',
      'Built a robust automation framework using Selenium, TestNG, JavaScript, and Node.js',
      'Dramatically reduced regression testing time and improved deployment confidence',
      'Created real-time dashboards for monitoring test execution and results',
    ],
  },
  {
    company: 'VeracityAds',
    title: 'Fullstack Developer',
    url: '#',
    range: 'December 2021 - 2023',
    duties: [
      'Built and optimized a full-stack affiliate marketing CRM system with campaign management and analytics',
      'Developed real-time reporting capabilities and performance tracking dashboards',
      'Worked across the stack with React, Python, and Node.js',
      'Collaborated with product and marketing teams to deliver data-driven features',
    ],
  },
  {
    company: 'Tarific-Digital',
    title: 'Frontend Developer',
    url: '#',
    range: 'January - November 2021',
    duties: [
      'Designed and maintained multiple client-facing websites with responsive layouts and modern UI patterns',
      'Optimized website performance and ensured cross-browser compatibility',
      'Worked with React, Node.js, and CSS to deliver polished user experiences',
    ],
  },
  {
    company: 'Israeli Air Force',
    title: 'Officer & Company Commander',
    url: '#',
    range: 'August 2016 - August 2020',
    duties: [
      'Served as an officer and company commander, leading teams in high-pressure operational environments',
      'Developed strong strategic thinking, decision-making, and team management skills',
      'Managed complex logistics and coordinated multi-team operations',
    ],
  },
];
