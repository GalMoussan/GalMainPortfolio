# Task Execute

Execute a task from the GalsPortfolio task board autonomously.

## Input

Task ID: $ARGUMENTS (e.g., T001, T014)

## Process

### 1. Load Task Spec
Read the task specification from the docs repo:
- Phase 1: `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio-docs/tasks/phase-1/`
- Phase 2: `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio-docs/tasks/phase-2/`
- Phase 3: `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio-docs/tasks/phase-3/`
- Phase 4: `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio-docs/tasks/phase-4/`
- Phase 5: `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio-docs/tasks/phase-5/`

### 2. Check Dependencies
Read `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio-docs/TASK_BOARD.md` and verify all "Depends On" tasks are marked DONE.

### 3. Understand Context
- Read the architecture docs referenced in the task
- Read existing code files that will be modified
- Read related files to understand patterns in use

### 4. Plan Implementation
Before writing any code:
- List all files to create/modify
- Identify the build sequence
- Note any decisions that need user input

### 5. Execute
Implement the task following GalsPortfolio conventions:
- Named exports, "use client" only when needed
- Tailwind + CSS variables for styling
- TypeScript strict mode
- Semantic HTML + accessibility

### 6. Verify
```bash
npm run lint
npm run build
npm run test
```

### 7. Report
Output a summary of what was implemented, files created/modified, and next steps.

## Important
- Always read the full task spec before starting
- Follow the acceptance criteria exactly
- Don't modify files outside the task's scope
