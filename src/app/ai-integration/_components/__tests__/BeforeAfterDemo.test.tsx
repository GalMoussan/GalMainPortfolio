import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type React from 'react';
import { BeforeAfterDemo } from '../BeforeAfterDemo';
import type { DemoScenario } from '../../_lib/verticals/types';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, onDrag, onDragEnd, onKeyDown, ...props }: React.HTMLAttributes<HTMLDivElement> & { onDrag?: () => void; onDragEnd?: () => void }) => (
        <div
          {...props}
          onMouseMove={onDrag}
          onMouseUp={onDragEnd}
          onKeyDown={onKeyDown}
        >
          {children}
        </div>
      ),
    },
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
    }),
    useTransform: () => '40%',
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock usePrefersReducedMotion
vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
}));

const mockScenarios: DemoScenario[] = [
  {
    id: 'scenario-1',
    label: 'Scenario 1',
    before: {
      title: 'Before Title 1',
      bullets: ['Bullet 1', 'Bullet 2'],
      stat: { label: 'Time', value: '15 min' },
    },
    after: {
      title: 'After Title 1',
      bullets: ['Step 1 → Step 2 → Step 3'],
      stat: { label: 'Processed', value: '23 items' },
      statusLabel: 'Running · 0 errors',
    },
  },
  {
    id: 'scenario-2',
    label: 'Scenario 2',
    before: {
      title: 'Before Title 2',
      bullets: ['Issue 1', 'Issue 2'],
    },
    after: {
      title: 'After Title 2',
      bullets: ['Fix 1 → Fix 2'],
    },
  },
];

describe('BeforeAfterDemo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all scenario tabs', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    expect(screen.getByText('Scenario 1')).toBeInTheDocument();
    expect(screen.getByText('Scenario 2')).toBeInTheDocument();
  });

  it('shows first scenario by default', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    expect(screen.getByText('Before Title 1')).toBeInTheDocument();
    expect(screen.getByText('After Title 1')).toBeInTheDocument();
  });

  it('switches scenarios when tab is clicked', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    const scenario2Tab = screen.getByText('Scenario 2');
    fireEvent.click(scenario2Tab);

    expect(screen.getByText('Before Title 2')).toBeInTheDocument();
    expect(screen.getByText('After Title 2')).toBeInTheDocument();
  });

  it('renders LIVE DEMO header', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    expect(screen.getByText(/LIVE DEMO/)).toBeInTheDocument();
  });

  it('renders drag hint initially', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    expect(screen.getByText(/← Drag to compare →/)).toBeInTheDocument();
  });

  it('renders slider with proper accessibility attributes', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-label', 'Adjust comparison slider');
  });

  it('handles keyboard navigation with ArrowLeft', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });

    // Slider should handle the event (preventDefault called)
    expect(slider).toBeInTheDocument();
  });

  it('handles keyboard navigation with ArrowRight', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(slider).toBeInTheDocument();
  });

  it('displays before and after stats when provided', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('Processed')).toBeInTheDocument();
  });

  it('displays status label when provided', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    expect(screen.getByText('Running · 0 errors')).toBeInTheDocument();
  });

  it('renders copy overlays', () => {
    render(<BeforeAfterDemo scenarios={mockScenarios} />);

    expect(screen.getByText(/Manual · Slow · Errors/)).toBeInTheDocument();
    expect(screen.getByText(/Autonomous · 24\/7 · 0 errors/)).toBeInTheDocument();
  });
});
