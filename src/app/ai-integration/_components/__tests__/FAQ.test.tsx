import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQ } from '../FAQ';
import type { FAQEntry } from '../../_lib/verticals/types';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div {...props}>{children}</div>
      ),
      p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props}>{children}</p>
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock usePrefersReducedMotion
vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
}));

// Mock track
vi.mock('@vercel/analytics', () => ({
  track: vi.fn(),
}));

const mockAdditionalFaqs: FAQEntry[] = [
  {
    category: 'Test Category',
    question: 'Test question?',
    answer: 'Test answer.',
  },
];

describe('FAQ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the section heading', () => {
    render(<FAQ />);
    expect(screen.getByText(/Questions you're probably asking/)).toBeInTheDocument();
  });

  it('renders base FAQs by default', () => {
    render(<FAQ />);
    // Base FAQs should be present (checking for common categories)
    expect(screen.getByText('Is this right for my business?')).toBeInTheDocument();
  });

  it('renders additional FAQs when provided', () => {
    render(<FAQ additionalFaqs={mockAdditionalFaqs} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Test question?')).toBeInTheDocument();
  });

  it('expands FAQ when question is clicked', () => {
    render(<FAQ additionalFaqs={mockAdditionalFaqs} />);

    const questionButton = screen.getByText('Test question?');
    expect(screen.queryByText('Test answer.')).not.toBeInTheDocument();

    fireEvent.click(questionButton);
    expect(screen.getByText('Test answer.')).toBeInTheDocument();
  });

  it('collapses FAQ when clicked again', () => {
    render(<FAQ additionalFaqs={mockAdditionalFaqs} />);

    const questionButton = screen.getByText('Test question?');

    // Open
    fireEvent.click(questionButton);
    expect(screen.getByText('Test answer.')).toBeInTheDocument();

    // Close
    fireEvent.click(questionButton);
    expect(screen.queryByText('Test answer.')).not.toBeInTheDocument();
  });

  it('shows + icon when closed and - icon when open', () => {
    render(<FAQ additionalFaqs={mockAdditionalFaqs} />);

    const questionButton = screen.getByText('Test question?').closest('button');
    expect(questionButton).toHaveTextContent('+');

    fireEvent.click(questionButton!);
    expect(questionButton).toHaveTextContent('−');
  });

  it('groups FAQs by category', () => {
    render(<FAQ />);
    // Check that category headings exist
    const categories = screen.getAllByRole('heading', { level: 3 });
    expect(categories.length).toBeGreaterThan(0);
  });

  it('only allows one FAQ open at a time', () => {
    const faqs: FAQEntry[] = [
      {
        category: 'Test',
        question: 'Question 1?',
        answer: 'Answer 1.',
      },
      {
        category: 'Test',
        question: 'Question 2?',
        answer: 'Answer 2.',
      },
    ];

    render(<FAQ additionalFaqs={faqs} />);

    const q1 = screen.getByText('Question 1?');
    const q2 = screen.getByText('Question 2?');

    // Open first FAQ
    fireEvent.click(q1);
    expect(screen.getByText('Answer 1.')).toBeInTheDocument();

    // Open second FAQ - first should close
    fireEvent.click(q2);
    expect(screen.queryByText('Answer 1.')).not.toBeInTheDocument();
    expect(screen.getByText('Answer 2.')).toBeInTheDocument();
  });
});
