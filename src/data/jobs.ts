export interface Job {
  company: string;
  title: string;
  url: string;
  range: string;
  duties: string[];
}

export const jobs: Job[] = [
  {
    company: 'Upstatement',
    title: 'Lead Engineer',
    url: 'https://www.upstatement.com/',
    range: 'May 2018 - Present',
    duties: [
      'Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Consumers International, Consumers International, and more',
      'Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements',
      'Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders',
      'Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship',
    ],
  },
  {
    company: 'Apple',
    title: 'UI Engineer Co-op',
    url: 'https://www.apple.com/',
    range: 'July - December 2017',
    duties: [
      'Developed and shipped highly interactive web applications for Apple Music using Ember.js',
      'Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal API integrations',
      'Architected and implemented the front-end of Apple Music\'s MusicKit JS, a JavaScript framework that allows developers to add an Apple Music player to their web apps',
      'Contributed to the design and development of MusicKit JS\'s internal documentation and onboarding process for new engineers',
    ],
  },
  {
    company: 'Scout Studio',
    title: 'Developer',
    url: 'https://scout.camd.northeastern.edu/',
    range: 'Spring 2016 & 2017',
    duties: [
      'Collaborated with other student designers and engineers on pro-bono projects to create new brand identities, design systems, and websites for local clients',
      'Led development of a new client-facing project for a local community organization using WordPress and a custom theme',
    ],
  },
  {
    company: 'Starry',
    title: 'Software Engineer Co-op',
    url: 'https://starry.com/',
    range: 'July - December 2016',
    duties: [
      'Engineered and improved major features of Starry\'s internal web app using ES6, Handlebars, Backbone, and CSS/Less',
      'Proposed and implemented scalable solutions to issues identified with cloud services and internal dependencies',
      'Interfaced with user experience designers and other developers to ensure thoughtful and coherent mobile UX across the company\'s website',
    ],
  },
  {
    company: 'MullenLowe',
    title: 'Creative Technologist Co-op',
    url: 'https://us.mullenlowe.com/',
    range: 'July - December 2015',
    duties: [
      'Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery',
      'Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness',
      'Clients included JetBlue, Lov):s, U.S. Cellular, U.S. Department of Defense, and more',
    ],
  },
];
