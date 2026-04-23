'use client';

import { useState } from 'react';

export function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Phase 6 - wire to /api/early-access
    setStatus('loading');

    // Placeholder for Phase 3
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  if (status === 'success') {
    return (
      <section id="coming-soon" className="max-w-[900px] mx-auto py-[100px]">
        <div className="bg-[var(--light-navy)] border-2 border-[var(--green)] rounded p-8 text-center">
          <p className="text-[var(--green)] text-lg font-semibold">
            ✓ You&apos;re on the list.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="coming-soon" className="max-w-[900px] mx-auto py-[100px]">
      <div className="bg-[var(--light-navy)] border-2 border-[var(--green)] rounded p-8">
        <h2 className="text-[var(--lightest-slate)] text-2xl font-semibold mb-3">
          Coming soon: Paste your workflow, I&apos;ll show you where the agents go.
        </h2>
        <p className="text-[var(--slate)] mb-6">
          I&apos;m building an interactive tool that takes any business workflow you describe and generates a visual agent system architecture in 30 seconds. Want early access?
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-[var(--navy)] border border-[var(--lightest-navy)] rounded px-4 py-3 text-[var(--lightest-slate)] focus:outline-none focus:border-[var(--green)] transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="outline-button px-6 py-3 disabled:opacity-50"
          >
            {status === 'loading' ? 'Submitting...' : 'Get early access'}
          </button>
        </form>

        <p className="text-[var(--dark-slate)] text-xs mt-3">
          I&apos;ll also notify you when I publish new case studies.
        </p>
      </div>
    </section>
  );
}
