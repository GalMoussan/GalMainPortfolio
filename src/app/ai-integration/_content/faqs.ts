import type { FAQEntry } from '../_lib/verticals/types';

// Base FAQs that apply to all verticals
export const baseFaqs: FAQEntry[] = [
  // Is this right for my business?
  {
    category: 'Is this right for my business?',
    question: 'How do I know if my workflow is a good AI agent candidate?',
    answer: 'Good candidates have these patterns: (1) Repetitive tasks you do weekly or daily, (2) Decisions based on rules you can explain, (3) Data scattered across multiple tools, (4) Tasks that need doing but get delayed because they\'re tedious. If you find yourself saying "someone should really handle this automatically," that\'s usually a sign.',
  },
  {
    category: 'Is this right for my business?',
    question: 'My business is only 5 people. Is this for me?',
    answer: 'Maybe. It depends on the workflow, not team size. If you\'re spending 10+ hours/week on repetitive operations and it\'s blocking growth, we should talk. But if you\'re still figuring out product-market fit, a spreadsheet and some discipline might serve you better than an agent system. I\'ll tell you honestly in the diagnostic.',
  },
  {
    category: 'Is this right for my business?',
    question: 'My business is 200+ people. Is this for me?',
    answer: 'Probably, yes. At your scale, even small efficiency gains compound across teams. The systems I build can integrate with enterprise tools (Salesforce, SAP, custom ERPs) and handle the complexity. We\'d scope it accordingly—starting with one high-impact department, proving ROI, then expanding.',
  },

  // How does it actually work?
  {
    category: 'How does it actually work?',
    question: 'What\'s the difference between an AI agent and a Zapier automation?',
    answer: 'Zapier follows rigid if/then rules you pre-define. An AI agent reasons about context. Example: Zapier says "if form submitted, send email template #3." An agent says "read this lead, understand their business, decide if they\'re qualified, draft a personalized response in my voice, and explain your reasoning." Agents adapt. Zapier breaks when something unexpected happens.',
  },
  {
    category: 'How does it actually work?',
    question: 'Do the agents replace my employees?',
    answer: 'No. They replace the tedious parts of your employees\' jobs. Your team stops doing data entry and starts making decisions. The agent handles "read 50 emails and categorize them." Your team handles "close the deal with the qualified lead." Think of it as giving everyone a tireless junior assistant who never sleeps.',
  },
  {
    category: 'How does it actually work?',
    question: 'What happens if the AI makes a mistake?',
    answer: 'We design for this. Critical actions have human-in-the-loop approval gates. The agent drafts the proposal—you review before it sends. The agent suggests categorization—you confirm before archiving. For lower-risk tasks (like copying data between systems), we log everything with audit trails so you can catch and fix errors. Over time, you tune the approval thresholds based on your risk tolerance.',
  },
  {
    category: 'How does it actually work?',
    question: 'Can I see the AI\'s reasoning, or is it a black box?',
    answer: 'You see the reasoning. Every decision the agent makes comes with an explanation: "I scored this lead 8/10 because [specific criteria]. I drafted this reply using [these context points]." You get full transparency. If you disagree with a decision, you can adjust the instructions and the agent adapts.',
  },

  // The build process
  {
    category: 'The build process',
    question: 'How long does it actually take?',
    answer: 'Starter Agent: 7 days. Business System: 2-3 weeks. Full Autonomous Operation: 3-4 weeks. These are calendar timelines with progress updates every 48 hours. You\'ll see working prototypes within the first week—no month-long black boxes.',
  },
  {
    category: 'The build process',
    question: 'What do you need from me to start?',
    answer: 'Three things: (1) Access to the tools we\'re integrating (read/write API keys or credentials), (2) 2-3 hours of your time in the first week to walk me through your workflow and edge cases, (3) Availability for 20-minute check-ins every 48 hours during the build. That\'s it. I handle the rest.',
  },
  {
    category: 'The build process',
    question: 'What if I don\'t like what you build?',
    answer: 'The first 30-90 days of tweaks are included in your package. If the system fundamentally doesn\'t solve the problem we scoped, I refund you. But this rarely happens because we validate the approach in the diagnostic, you see progress every 48 hours, and we course-correct in real-time.',
  },
  {
    category: 'The build process',
    question: 'Do I own the code?',
    answer: 'Yes. You get full access to the codebase, documentation, and deployment instructions. You can modify it, hire someone else to extend it, or shut it down entirely. No lock-in. The only dependency is the LLM API (Claude, OpenAI, etc.), which you pay directly—not through me.',
  },

  // Money & risk
  {
    category: 'Money & risk',
    question: 'Why is it a one-time price and not a subscription?',
    answer: 'Because I build systems, not dependencies. You pay once for the build, and you own it forever. No recurring fees to me. You just pay your cloud provider for hosting ($30-200/month) and the LLM API for the AI reasoning (usage-based, usually $50-500/month depending on volume). This aligns incentives: I\'m motivated to build you something that actually works, not to keep you paying indefinitely.',
  },
  {
    category: 'Money & risk',
    question: 'What are ongoing costs?',
    answer: 'Two buckets: (1) Hosting—$30-200/month paid to your cloud provider (Vercel, AWS, Railway, etc.), depending on scale. (2) LLM API usage—$50-500/month paid directly to Anthropic (Claude) or OpenAI, depending on how many actions the agents perform. I\'ll estimate both during the diagnostic based on your volume. No hidden fees. No markup. You pay the providers directly.',
  },
  {
    category: 'Money & risk',
    question: 'What if I want to stop paying for LLM API later?',
    answer: 'The system stops making AI decisions but the infrastructure stays intact. You could swap in cheaper models, reduce usage by adding more human-in-the-loop gates, or pause it entirely. You still own the code. I can also help you optimize for cost if your usage grows higher than expected.',
  },
  {
    category: 'Money & risk',
    question: 'Do you offer refunds?',
    answer: 'Yes, with a caveat. If after the diagnostic and architecture phase you decide this isn\'t right for your business, I refund 100%. Once we start building and you\'re seeing working prototypes, refunds are case-by-case. If the system fundamentally fails to deliver what we scoped, you get your money back. If you just change your mind, we talk. I want happy clients, not trapped ones.',
  },
];
