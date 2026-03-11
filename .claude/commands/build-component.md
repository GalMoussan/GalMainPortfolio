# Build Component

Scaffold a React component following GalsPortfolio's frontend conventions.

## Input

Component name: $ARGUMENTS (e.g., Hero, ExperienceTabs, ProjectCard)

## Process

### 1. Understand Requirements
Infer the component's purpose from its name and the design spec.

### 2. Explore Existing Patterns
Read existing components in `src/components/` to understand:
- File structure, hooks usage
- Tailwind + CSS variable styling patterns
- Import conventions

### 3. Scaffold the Component

Create `src/components/{category}/{ComponentName}.tsx`:

```tsx
interface ComponentNameProps {
  // typed props
}

export function ComponentName({ ...props }: ComponentNameProps) {
  return (
    <div>
      {/* Implementation */}
    </div>
  );
}
```

### 4. Conventions
- Named exports only (no default export)
- "use client" only if using useState/useEffect
- Props interface named `{Name}Props`
- Tailwind classes grouped: layout → spacing → typography → colors → effects
- CSS variables for design tokens: `var(--green)`, `var(--navy)`, etc.
- Semantic HTML elements
- Accessibility: aria labels on interactive elements

### 5. Integration
- Note where this component should be used
- Note any data files needed from `src/data/`
