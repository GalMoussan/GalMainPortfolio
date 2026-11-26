export interface Job {
  company: string;
  title: string;
  /** Company site; companies without one render as plain text. */
  url?: string;
  range: string;
  duties: string[];
}

export const jobs: Job[] = [
  {
    company: 'Yassa North',
    title: 'Deputy Director · Chief of AI & Development',
    url: 'https://iasanorth.com',
    range: 'September 2026 - Present',
    duties: [
      'Co-lead the school as Deputy Director, with ownership of everything AI and development',
      "Built and run the school's website, iasanorth.com",
      'Build internal tools for scheduling, the yearly calendar and staff coordination',
      'Bring AI workflows into how the school teaches and operates',
    ],
  },
  {
    company: 'Shamir Institute of Technology',
    title: 'AI Instructor',
    url: 'https://syh.co.il',
    range: 'March 2025 - August 2025',
    duties: [
      'Taught AI courses for kids and youth, from first principles to building working tools',
      'Intro track: what AI is, how it works, machine-learning basics, building workflows in coding tools',
      'Advanced track: agent workflows, custom agents, working with ChatGPT, Claude and Grok, image generation, databases and custom CRMs',
    ],
  },
  {
    company: 'Lagoonads',
    title: 'Tech Lead, Fullstack Developer',
    url: 'https://www.lagoonads.com/',
    range: 'September 2024 - January 2025',
    duties: [
      'Led the development of an affiliate marketing CRM system using Angular and Node.js',
      'Architected scalable solutions and made key technical decisions for the platform',
      'Managed development workflows and mentored team members',
      'Built and optimized features for tracking, reporting and affiliate management',
    ],
  },
  {
    company: '121Brokers (Australia)',
    title: 'Fullstack Developer',
    range: 'April - September 2024',
    duties: [
      'Built a full-featured CRM platform with three distinct user interfaces for brokers, managers and administrators',
      'Developed complex financial workflows, client management features and real-time data synchronization',
      'Worked with Angular, Node.js, Firebase and TypeScript in a fast-paced startup environment',
    ],
  },
  {
    company: 'Netlinkz (Australia)',
    title: 'Automation Specialist',
    range: 'September 2023 - March 2024',
    duties: [
      'Led the migration of manual QA processes to a fully automated testing pipeline',
      'Built a robust automation framework using Selenium, TestNG, JavaScript and Node.js',
      'Dramatically reduced regression testing time and improved deployment confidence',
      'Created real-time dashboards for monitoring test execution and results',
    ],
  },
  {
    company: 'VeracityAds',
    title: 'Fullstack Developer',
    range: 'December 2021 - 2023',
    duties: [
      'Built and optimized a full-stack affiliate marketing CRM system with campaign management and analytics',
      'Developed real-time reporting capabilities and performance tracking dashboards',
      'Worked across the stack with React, Python and Node.js',
      'Collaborated with product and marketing teams to deliver data-driven features',
    ],
  },
  {
    company: 'Tarific-Digital',
    title: 'Frontend Developer',
    range: 'January - November 2021',
    duties: [
      'Designed and maintained multiple client-facing websites with responsive layouts and modern UI patterns',
      'Optimized website performance and ensured cross-browser compatibility',
      'Worked with React, Node.js and CSS to deliver polished user experiences',
    ],
  },
  {
    company: 'Israeli Air Force',
    title: 'Officer & Company Commander',
    range: 'August 2016 - August 2020',
    duties: [
      'Served as an officer and company commander, leading teams in high-pressure operational environments',
      'Developed strong strategic thinking, decision-making and team management skills',
      'Managed complex logistics and coordinated multi-team operations',
    ],
  },
];
