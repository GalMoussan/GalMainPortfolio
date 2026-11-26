export type TrainingOffer = {
  name: string;
  whoFor: string;
  points: string[];
  price: string;
};

export const trainingOffers: TrainingOffer[] = [
  {
    name: 'Team workshop',
    whoFor: 'For dev teams. Half or full day.',
    points: [
      'Setting up the agent properly: project memory, rules files, permissions',
      'Planning before building: specs, task breakdown, small reviewable steps',
      'Sub-agents, review loops and quality gates',
      'Connecting tools and data (MCP)',
      'Hands-on, in your own codebase',
    ],
    price: 'on request',
  },
  {
    name: '1:1 coaching',
    whoFor: 'For developers and founders who code.',
    points: [
      'Sessions on your real project, not toy examples',
      'Your workflow reviewed and tightened',
      "A setup you keep using after we're done",
    ],
    price: 'on request',
  },
  {
    name: 'Team onboarding',
    whoFor: 'For teams adopting coding agents.',
    points: [
      'I set up the agent workflow inside your repos: rules, commands, review agents',
      'Train the team on it',
      'Follow-up sessions as you scale it',
    ],
    price: 'on request',
  },
];
