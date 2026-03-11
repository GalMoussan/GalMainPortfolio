# GalsPortfolio

Pixel-perfect clone of Brittany Chiang's developer portfolio website with dark navy theme, teal accents, and smooth animations.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS custom properties
- **Language:** TypeScript
- **Testing:** Vitest + Playwright
- **Icons:** Custom SVG (inline)

## Getting Started

```bash
npm install
npm run dev
```

## Structure

```
galsportfolio/
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   │   ├── layout/      # Nav, Footer, Sidebars
│   │   └── sections/    # Hero, About, Experience, Projects, Contact
│   ├── data/            # Static content data
│   ├── hooks/           # Custom React hooks
│   └── styles/          # Global CSS + variables
├── public/              # Static assets (images, resume.pdf)
└── package.json
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Lint code |
