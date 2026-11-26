# Website content — v2

All user-facing copy for [galmoussan.com](https://galmoussan.com), updated November 2026. This is the source of truth for the update. `CLAUDE_CODE_BRIEF.md` says how to apply it.

Conventions in this file:
- `[TODO: …]` means a value Gal still has to supply. Do not ship with any left.
- `[FROM REPO]` means Claude Code fills this in from the GitHub repo itself and does not invent it.
- `> Note:` lines are instructions, not copy.

---

## Site map

| Path | What it is | Status |
| --- | --- | --- |
| `/` | Portfolio homepage | Updated |
| `/archive` | Full project table | Updated (real years) |
| `/tools/snake` | Embedded Snake | Unchanged, linked from Projects |
| `/tools/cinema-query` | Embedded CinemaQuery | **Keep live, no longer linked** |
| `/ai-integration` | Services page: AI systems, development, coding-agent training | Updated |
| `/onepiece` | Hosted game "Drop Merge" | Unchanged, now linked from Projects |
| `/mrMiao` | Hosted game "Mr Miao" | **Keep live, not linked** |
| `/resume.pdf` | Resume | Regenerated |
| `/privacy-policy` | Privacy Policy | Updated |
| `/terms` | Terms of Use | Updated |
| `/cookie-policy` | Cookie Policy | Date only |

Domain: `https://galmoussan.com`

---

## Identity and contact

- Name: Gal Moussan
- Location (everywhere on the site): Israel · Remote
- Role on portfolio: Fullstack developer & AI integration specialist
- Role in AI page structured data: AI Integration Engineer
- Current position: Deputy Director · Chief of AI & Development, Yassa North — https://iasanorth.com
- Email: galmoussan@gmail.com
- Phone (resume only): 055-885-9702
- WhatsApp (site CTAs): `972558859702`
- GitHub: https://github.com/galmoussan
- LinkedIn: https://www.linkedin.com/in/galmoussan97
- Languages: Hebrew and English
- Volunteer: My Wave, surf instructor for youth at risk, 2020–2025; Heros for life, backpacker, 2019–2022

> Note: Cal.com is not used. Leave the env-gated code as is (it stays hidden). Do not add a booking link.
> Note: early-access notification email and Resend sender are removed together with the "Coming soon" section.

---

## SEO and page titles

**Portfolio (root layout)**

- Title: Gal Moussan | Fullstack Developer & AI Integration Specialist
- Description: Gal Moussan is a fullstack developer and AI integration specialist in Israel. He builds AI agent systems and web apps, and teaches teams to work with Claude Code and other coding agents.
- Locale: en_US
- Theme color: `#10151c` (unchanged)

**Services page (`/ai-integration`)**

- Title: AI Integration, Development & Coding-Agent Training | Gal Moussan
- Description: Autonomous AI agent systems for businesses, custom development, and hands-on training in Claude Code and other coding agents. Fixed prices, you own what I build.
- Display name: AI Integration & Development Services
- Keywords: AI integration Israel; AI automation consultant; AI agent developer Israel; multi-agent systems; Claude Code training; coding agent workshop; custom web development Israel
- Area served (structured data): Israel (keep). Remove any `addressLocality: Tel Aviv`.
- OG image footer: galmoussan.com/ai-integration (unchanged)
- OG image alt: AI Integration & Development Services

**Other pages**

- Archive: title "Archive | Gal Moussan". Description: Everything I've built, by year.
- Snake: unchanged.
- CinemaQuery: unchanged (page stays live, unlinked).
- Privacy / Terms / Cookie: titles unchanged. Remove "Tel Aviv" anywhere in descriptions.

---

## Portfolio homepage

Section order: Hero, About, Experience, Featured work, Other projects, Contact.

### Navigation

- About
- Experience
- Work
- Contact
- Services (→ `/ai-integration`) **new**
- Resume (opens `/resume.pdf`)

Mobile menu: About, Experience, Work, Contact numbered 01–04, then Services and Resume.

### Hero

Eyebrow: Hi, my name is

# Gal Moussan.

## I build things for the web — and teach others to build with AI.

I'm a fullstack developer and AI integration specialist. I lead AI and development at [Yassa North](https://iasanorth.com), a school in northern Israel. Alongside that, I build AI agent systems for businesses, take on development projects, and train teams to work with Claude Code and other coding agents.

Buttons:
- Get In Touch → mailto:galmoussan@gmail.com
- Work with me → `/ai-integration` **new, secondary style**

Sidebar (desktop): galmoussan@gmail.com, written vertically (unchanged).

### About

Section label: About
Subtitle: About Me

Hello! I'm Gal, a fullstack developer and AI integration specialist working remotely from Israel. Before tech, I served as an officer and company commander in the Israeli Air Force, where I learned to lead teams under pressure and make decisions that hold up.

I've worked across startups in Israel and Australia, on affiliate marketing platforms, CRM systems and QA automation. Today I'm Deputy Director and Chief of AI & Development at Yassa North, where I build the school's website and internal tools and bring AI into how the school teaches and runs. I've also taught AI courses for kids and youth at Shamir Institute of Technology.

My daily workflow runs on coding agents. I plan with a spec agent, build with worker agents, and put every change through a reviewer before it ships. Teaching that way of working is now part of what I do.

Outside of work: surfing, extreme sports and traveling. From 2020 to 2025 I volunteered with My Wave, teaching youth at risk how to surf.

Here are a few technologies I've been working with recently:

- TypeScript
- React
- Next.js
- Node.js
- Python
- Prisma
- PostgreSQL
- Tailwind CSS
- Claude & OpenAI APIs
- Claude Code & coding agents
- Angular
- Playwright

> Note: remove the fake `#` links on "affiliate marketing platforms", "CRM systems", "QA automation", "My Wave". Plain text. Yassa North may link to https://iasanorth.com.

### Experience

Section label: Experience
Subtitle: Where I've Worked

Tabs, newest first:

#### Yassa North — Deputy Director · Chief of AI & Development

[TODO: start month + year] - Present
https://iasanorth.com

- Co-lead the school as Deputy Director, with ownership of everything AI and development
- Built and run the school's website, iasanorth.com
- Build internal tools for scheduling, the yearly calendar and staff coordination
- Bring AI workflows into how the school teaches and operates

#### Shamir Institute of Technology — AI Instructor

[TODO: start month + year] - [TODO: end month + year]
https://syh.co.il

- Taught AI courses for kids and youth, from first principles to building working tools
- Intro track: what AI is, how it works, machine-learning basics, building workflows in coding tools
- Advanced track: agent workflows, custom agents, working with ChatGPT, Claude and Grok, image generation, databases and custom CRMs

> Note: order Shamir by its real dates relative to Lagoonads once Gal supplies them.

#### Lagoonads — Tech Lead, Fullstack Developer

September 2024 - January 2025
https://www.lagoonads.com/

- Led the development of an affiliate marketing CRM system using Angular and Node.js
- Architected scalable solutions and made key technical decisions for the platform
- Managed development workflows and mentored team members
- Built and optimized features for tracking, reporting and affiliate management

#### 121Brokers (Australia) — Fullstack Developer

April - September 2024

- Built a full-featured CRM platform with three distinct user interfaces for brokers, managers and administrators
- Developed complex financial workflows, client management features and real-time data synchronization
- Worked with Angular, Node.js, Firebase and TypeScript in a fast-paced startup environment

#### Netlinkz (Australia) — Automation Specialist

September 2023 - March 2024

- Led the migration of manual QA processes to a fully automated testing pipeline
- Built a robust automation framework using Selenium, TestNG, JavaScript and Node.js
- Dramatically reduced regression testing time and improved deployment confidence
- Created real-time dashboards for monitoring test execution and results

#### VeracityAds — Fullstack Developer

December 2021 - 2023

- Built and optimized a full-stack affiliate marketing CRM system with campaign management and analytics
- Developed real-time reporting capabilities and performance tracking dashboards
- Worked across the stack with React, Python and Node.js
- Collaborated with product and marketing teams to deliver data-driven features

#### Tarific-Digital — Frontend Developer

January - November 2021

- Designed and maintained multiple client-facing websites with responsive layouts and modern UI patterns
- Optimized website performance and ensured cross-browser compatibility
- Worked with React, Node.js and CSS to deliver polished user experiences

#### Israeli Air Force — Officer & Company Commander

August 2016 - August 2020

- Served as an officer and company commander, leading teams in high-pressure operational environments
- Developed strong strategic thinking, decision-making and team management skills
- Managed complex logistics and coordinated multi-team operations

> Note: company names without a real URL render as plain text, not `#` links.

### Featured work

Section label: Work
Subtitle: Some Things I've Built
Card label: Featured Project

Order: Transcribe God, KineticFlow, Yassa North website, Ayalim Game, Connections.

#### Transcribe God

A study tool that turns any recording into something you can learn from. Drop in a lecture, a meeting or a video, and it transcribes it, summarises it and builds study material from it. I built it for my own university courses.

Tech: [FROM REPO]
GitHub: https://github.com/GalMoussan/Transcribe-god
Live: none (runs locally)
Image: `/images/transcribe-god.png`

#### KineticFlow

An open-source tool for making kinetic-typography reels instantly. It runs locally on your own GPU and RAM: no cloud render queue, no subscription, no upload.

Tech: [FROM REPO]
GitHub: https://github.com/GalMoussan/KineticFlow
Live: none (runs locally)
Image: `/images/kineticflow.png`

#### Yassa North website

The public website of Yassa North, the school where I lead AI and development. It presents the school's courses to students, parents and partner schools.

Tech: [FROM REPO]
GitHub: https://github.com/GalMoussan/landingCourses (show only if the repo is public)
Live: https://iasanorth.com
Image: `/images/yassa-north.png`

#### Ayalim Game

A 2D adventure game in the browser: explore, fight monsters, and level up a character through a full progression system.

Tech: [FROM REPO]
GitHub: https://github.com/GalMoussan/ayalimGame
Live: https://ayalim-game.vercel.app
Image: `/images/ayalim-game.png`

#### Connections

A Connections-style word game built to play with friends: find the hidden groups before you run out of guesses.

Tech: [FROM REPO]
GitHub: https://github.com/GalMoussan/connections-friends
Live: https://connections-friends.vercel.app
Image: `/images/connections-friends.png`

> Note: polish each description against the repo README if the README contradicts it (e.g. a feature that doesn't exist). Do not add features the repo doesn't have.

### Other noteworthy projects

Heading: Other Noteworthy Projects
Link: view the archive → `/archive`
Buttons: Show More / Show Less (keep the component; with two items it simply won't show the button)

#### Drop Merge

A drop-and-merge puzzle game with a live leaderboard. Playable right on this site.

Tech: [FROM REPO / page source]
Play: `/onepiece`

#### Snake

A classic Snake game built with TypeScript and HTML5 Canvas, with smooth controls, progressive difficulty, persistent high scores and a retro arcade look. Built with an entity-component-system architecture, immutable data patterns and 80%+ test coverage.

Tech: TypeScript, HTML5 Canvas, Vite, Vitest, Playwright
GitHub: https://github.com/GalMoussan/Snake
Play: `/tools/snake`

### Contact

Section label: Contact
Subtitle: What's Next?

### Get In Touch

I'm open to projects: AI agent systems, development work of any kind, and coding-agent training for teams. Have something in mind, or just want to say hi? My inbox is open and I reply quickly.

Buttons:
- Say Hello → mailto:galmoussan@gmail.com
- See services → `/ai-integration` **new, secondary style**

### Footer

Unchanged.

- Built by Gal Moussan → https://github.com/galmoussan
- © {year} Gal Moussan. All rights reserved.
- Privacy Policy · Terms of Use · Cookie Policy
- Social icons on mobile: GitHub, LinkedIn

### Cookie banner

Unchanged.

---

## Archive

← Back

# Archive

A big list of things I've worked on

Columns: Year, Title, Made at, Built with, Link

Rows: the five featured projects, Drop Merge, Snake, plus the previous projects (CinemaQuery, CIM, X Intelligence Pipeline, ReelSearch, movieSearch, Content Factory, InfluencerBuddy, Pocket Ask, MySassy, LeadsFactory, StudyBuddy, invert-chrome-extension, Social Net).

- Year: [FROM REPO] — the repo's creation year from GitHub. No hardcoded 2019/2020.
- Made at: "Yassa North" for the Yassa North website, "Personal" for everything else.
- Built with: same tech lists as the cards.
- Link: GitHub, plus live link where one exists. Skip a GitHub link if the repo is private or gone.

---

## Tool pages

### Snake — `/tools/snake`

Unchanged.

### CinemaQuery — `/tools/cinema-query`

Unchanged. Not linked from anywhere except the Archive row.

---

## Hosted games

### Drop Merge — `/onepiece`

Unchanged. Leaderboard API `/api/onepiece-leaderboard` must keep working.

### Mr Miao — `/mrMiao`

Unchanged. Not linked.

---

## Services page (`/ai-integration`)

Section order: Hero, proof strip, comparison, demo, packages, **training (new)**, **development (new)**, process, case studies, about, FAQ, final CTA, shared site footer.

Removed: the "Coming soon" section, its form, and its email flow.

### Navigation

- What I build
- Training **new** (→ training section)
- How it works
- Pricing (same anchor as What I build)
- FAQ
- Book free call

WhatsApp number: `972558859702`

WhatsApp prefilled message (hero, nav and final CTA):

> Hi Gal, I'd like to book a free 30-min call about my business.

### Hero

Badge: AI AGENT SYSTEMS · CUSTOM DEVELOPMENT · CODING-AGENT TRAINING

Your team is still copy-pasting between 5 tools. In 2026.

# While your competitors buy Zapier workflows,
# you get an AI workforce.

I build autonomous agent systems for businesses, take on custom development, and teach teams to build with Claude Code and other coding agents. The same architecture enterprise AI teams ship, at a size and price that fits you.

Cycling lines (unchanged):

- Runs 24/7
- Handles leads automatically
- Replaces 3 spreadsheets
- Never forgets a follow-up

Trust line: Free 30-min call · Fixed prices · Built in 2–4 weeks · You own it forever

Buttons:

- Book free 30-min call →
- Or see how it works ↓

### Before / after demo

Label above the demo **new**: Illustrative example

Hint: ← Drag to compare →
Before overlay: Manual · Slow · Errors
After overlay: Autonomous · 24/7 · Logged

#### Lead handling

Before — Manual chaos (unchanged)

After — Autonomous pipeline

- Intake → Classify → Score → Draft Reply → CRM Update
- AI reads context, scores quality, drafts personalized response
- Human approves only high-value leads
- Processed today: 23 leads
- Running · Avg response: 12s

#### Customer support

Before — Ticket chaos (unchanged)

After — Intelligent triage

- Ticket In → Categorize → Retrieve from KB → Draft Response → Human Approval → Send
- Agent searches knowledge base, drafts contextual reply
- Escalates complex issues automatically
- Resolved today: 41
- Running · Escalated to human: 6

#### Data entry

Before — Manual sync hell (unchanged)

After — Automated sync

- Watch Source → Extract → Validate → Transform → Write Target
- Continuous monitoring, instant updates
- Automatic retry on failures, every failure logged
- Synced today: 1,247 records
- Running · Retries handled automatically

### Proof strip

Unchanged.

### Comparison

Unchanged.

### Packages

Unchanged (Starter Agent $1,000 / ₪3,500 · Business System $3,000 / ₪10,500 · Full Autonomous Operation $6,000+ / ₪21,000).

### Training — new section

Anchor id: `training`

Heading: Learn to build with coding agents.

Intro: Most people use Claude Code like a smarter autocomplete. I teach the workflow that actually ships: a spec before code, agents with clear roles, a reviewer on every change, and a quality gate before anything merges. Claude Code, Codex, Cursor or whichever agent your team uses.

Cards:

**Team workshop**
For dev teams. Half or full day.
- Setting up the agent properly: project memory, rules files, permissions
- Planning before building: specs, task breakdown, small reviewable steps
- Sub-agents, review loops and quality gates
- Connecting tools and data (MCP)
- Hands-on, in your own codebase
Price: on request

**1:1 coaching**
For developers and founders who code.
- Sessions on your real project, not toy examples
- Your workflow reviewed and tightened
- A setup you keep using after we're done
Price: on request

**Team onboarding**
For teams adopting coding agents.
- I set up the agent workflow inside your repos: rules, commands, review agents
- Train the team on it
- Follow-up sessions as you scale it
Price: on request

Line under the cards: Not a developer? I also run intro sessions for business owners on what coding agents can and can't do for your business.

Button: Ask about training → WhatsApp (prefilled: "Hi Gal, I'd like to hear about coding-agent training for my team.")

### Development — new section

Anchor id: `development`

Heading: Need something built?

Websites, web apps, internal tools, integrations, games. I take on development projects of any size. You get a fixed quote after a free call, progress you can test every 48 hours, and code you own.

Stack: TypeScript, React, Next.js, Node.js, Prisma, PostgreSQL. Full Hebrew / RTL support when you need it.

Button: Get a quote → WhatsApp (prefilled: "Hi Gal, I have a development project I'd like a quote for.")

### How I work

Unchanged, except step 01:

**01 Diagnostic** — Free, 30 min.
We talk. I map your workflows, find the highest-leverage place to start, and tell you honestly whether AI even makes sense for your business. Some businesses I turn away.
Detail: No sales pitch. If AI is overkill for your use case, I'll tell you.

### Case studies

Heading: Real things I've built.

#### Transcribe God

Problem: Lectures, meetings and videos pile up, and turning them into something you can study takes hours.
Solution: A pipeline that transcribes any recording, summarises it and builds study material from it, end to end.
Tech: [FROM REPO]
Link: View on GitHub → https://github.com/GalMoussan/Transcribe-god

#### AuthorLex

Unchanged copy. **Remove the "View case study →" link** (it points nowhere).

#### Digital Creator AI Agent Platform

Unchanged copy. **Remove the "View case study →" link.**

> Note: the old reelSearch case study is removed. AuthorLex and Digital Creator stay only as text with no link, unless Gal gives repo links for them.

### About on the services page

Heading: Why a one-person shop beats a 50-person agency for this.

**Builder, not consultant.**
I'm Gal. Fullstack developer for 5+ years, former tech lead on production systems, and today Chief of AI & Development at a school. I don't subcontract. The person selling you the system is the person building it.

**Modern AI stack, daily.**
I run autonomous Claude Code agent pipelines every day and ship with the newest models the week they drop. I've been building multi-agent systems in production for over a year.

**I teach this.**
I've taught AI to kids, youth and teams. If I can explain agents to a 13-year-old, I can get your developers shipping with them.

**Honest about fit.**
I'll tell you when AI isn't the answer. Some processes need a better spreadsheet, not an agent. I'd rather say so on the free call than build something that doesn't work.

Israel · Remote · Hebrew & English

Photo alt: Gal Moussan (`/images/profile.jpeg`, unchanged)

### FAQ

Heading: Questions you're probably asking.

Keep every existing question and answer, with these changes:

**My business is 200+ people. Is this for me?** — new answer:
Possibly, if we start small. I'm a one-person shop, so I'm a better fit for one department or one painful workflow than for a company-wide rollout. We'd prove the ROI there first, and then decide together whether to expand.

**What if I don't like what you build?** — unchanged.

**Do you offer refunds?** — replace "after the diagnostic and architecture phase" with "after the free call and architecture phase".

New group **Training**, placed after "The build process":

**Which coding agents do you teach?**
Mostly Claude Code, because it's what I use every day. The workflow carries over to Codex, Cursor and the other agents, and I'll teach on whichever one your team already pays for.

**Do my developers need AI experience?**
No. They need to know your codebase. I bring the agent workflow; we apply it to your real code from the first hour.

**Can you train non-developers?**
Yes. Business owners and managers get a shorter session on what coding agents can do, what they cost, and how to tell whether your team is using them well.

### Final CTA

Unchanged copy. WhatsApp number fixed.

# Stop competing with companies that have AI. Start being one.

30 minutes. Free. I'll tell you honestly what's possible.

Button: Message me on WhatsApp →
Note: Usually replies within a few hours.

---

## Resume (regenerate `/resume.pdf`)

Two-column layout like the current one. Same path.

**Gal Moussan**
Israel · Remote
055-885-9702
galmoussan@gmail.com
linkedin.com/in/galmoussan97
github.com/galmoussan

Fullstack developer and AI integration specialist with a background in military leadership. I build AI agent systems and web applications, lead AI and development at a school, and teach teams to work effectively with coding agents.

### Experience

**Yassa North — Deputy Director · Chief of AI & Development.** [TODO: start] – present
Co-lead the school and own its AI and development work: the school website, internal tools for scheduling and coordination, and AI in teaching and operations.

**Freelance — AI integration, development & coding-agent training.** [TODO: start, or same as Yassa] – present
Autonomous AI agent systems for businesses, custom web development, and Claude Code / coding-agent training for teams.

**Shamir Institute of Technology — AI Instructor.** [TODO: dates]
Taught AI courses for kids and youth, from AI fundamentals to building agents, custom tools and databases.

**Lagoonads — Tech Lead, Fullstack Developer.** September 2024 – January 2025
Led the development of an affiliate marketing CRM system using Angular and Node.js.

**121Brokers, Australia — Fullstack Developer.** April 2024 – September 2024
Developed and maintained a CRM system with three user interfaces using Angular, Node.js and Firebase.

**Netlinkz, Australia — Automation Specialist.** September 2023 – March 2024
Led the migration of QA processes to an automated system using Selenium, TestNG, JavaScript and Node.js.

**VeracityAds, Israel — Fullstack Developer.** December 2021 – 2023
Built and optimized an affiliate marketing CRM system with React, Python and Node.js.

**Tarific-Digital, Israel — Frontend Developer.** January 2021 – November 2021
Designed and maintained websites using React and Node.js.

### Military service

Officer & Company Commander, Israeli Air Force. August 2016 – August 2020
Led teams and delivered under high pressure.

### Skills

- TypeScript, React, Next.js, Node.js, Python, Prisma, PostgreSQL, Angular
- AI agent systems, LLM APIs (Claude, OpenAI), Claude Code and coding-agent workflows
- Test automation: Playwright, Vitest, Selenium
- Leadership and strategic thinking from military command
- Hebrew and English

### Volunteer

- Heros for life, Backpacker, 2019–2022. Community service and school tutoring in the periphery and in developing countries.
- My Wave, Surf instructor, 2020–2025. Teaching youth at risk how to surf and handle life's problems at the same time.

References: available upon request.

---

## Privacy Policy

Last updated: [deploy date]
Title: Privacy Policy

### Introduction

This privacy policy describes how Gal Moussan ("I", "me", or "my") collects, uses, and protects your personal information when you visit galmoussan.com (the "Site"). The Site is my personal portfolio and describes the services I offer as an independent developer based in Israel.

There are no user accounts and no payments on the Site. Any work we agree on is arranged directly with me, outside the Site.

### What Data Is Collected

**Email and WhatsApp Communications**

When you contact me by email (galmoussan@gmail.com) or through a WhatsApp link on the Site, your contact details and the content of your messages are stored in my Gmail or WhatsApp account. This is necessary to respond to you.

**Technical Data (Server Logs)**

Unchanged.

**Analytics Data**

Unchanged.

### How Data Is Used

I use your data solely to:

- Respond to your inquiries
- Operate and secure the Site
- Understand how visitors use the Site and improve content

I do not use your data for marketing, profiling, or automated decision-making. I do not sell or share your personal information with third parties, except as described in the "Third Parties" section below.

### Third Parties

Your data may be processed by the following third-party services:

- Vercel (hosting provider) — processes server logs and analytics data.
- Google/Gmail (email service) — stores email correspondence.
- WhatsApp (Meta) — stores WhatsApp messages you send me.

Each service operates under its own privacy policy. I have no control over how they handle your data beyond the services they provide to me.

### Data Retention

- Email and WhatsApp correspondence: Kept as long as relevant to our communication, unless you request deletion.
- Server logs: Unchanged.
- Analytics data: Unchanged.

### Your Rights

GDPR, CCPA / CPRA and Israeli PDPL sections: unchanged. In the Israeli section, keep "As the site owner is based in Israel, Israeli privacy law applies."

### Cookies, Contact, Changes to This Policy

Unchanged.

---

## Terms of Use

Last updated: [deploy date]
Title: Terms of Use

### Acceptance of Terms

Unchanged.

### Nature of the Site

This Site is the personal portfolio of Gal Moussan, a fullstack developer and AI integration specialist based in Israel. It showcases projects, skills and contact information, and describes the services I offer.

No purchases are made through this Site and there are no user accounts. Any engagement for services is agreed directly between you and me, under separate terms.

### Intellectual Property

Unchanged.

### Portfolio Projects Disclaimer

Projects showcased on this Site are portfolio demonstrations of technical capabilities, presented for showcase and educational purposes.

Rest of the section unchanged (third-party terms list, responsibility, scraping/automation disclaimer).

### No Warranties, Limitation of Liability

Unchanged.

### External Links

The Site contains links to external websites, including but not limited to GitHub, LinkedIn, WhatsApp, the websites of past and current employers, and live project deployments.

Rest unchanged.

### Governing Law and Jurisdiction

These Terms of Use are governed by the laws of the State of Israel, without regard to its conflict of law principles.

Any disputes arising from or relating to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the competent courts in Israel.

### Changes to These Terms, Contact

Unchanged.

---

## Cookie Policy

Last updated: [deploy date]

Everything else unchanged.
