'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { track } from '@vercel/analytics';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

export function ComingSoon() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Submission failed');
      }

      setStatus('success');
      track('early_access_form_submit', { email: data.email });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <section id="coming-soon" className="max-w-[900px] mx-auto py-[100px]">
        <div className="bg-[var(--light-navy)] border-2 border-[var(--green)] rounded p-8 text-center">
          <p className="text-[var(--green)] text-lg font-semibold">
            ✓ You&apos;re on the list.
          </p>
          <p className="text-[var(--slate)] text-sm mt-2">
            I&apos;ll email you when the tool is ready.
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              className="flex-1 bg-[var(--navy)] border border-[var(--lightest-navy)] rounded px-4 py-3 text-[var(--lightest-slate)] focus:outline-none focus:border-[var(--green)] transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="outline-button px-6 py-3 disabled:opacity-50"
            >
              {status === 'loading' ? 'Submitting...' : 'Get early access'}
            </button>
          </div>

          {/* Error messages */}
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
          {status === 'error' && errorMessage && (
            <p className="text-red-400 text-sm">{errorMessage}</p>
          )}
        </form>

        <p className="text-[var(--dark-slate)] text-xs mt-3">
          I&apos;ll also notify you when I publish new case studies.
        </p>
      </div>
    </section>
  );
}
