import Link from 'next/link';
import './legal-page.css';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="max-w-[900px] mx-auto px-[25px] sm:px-[50px] py-[100px]">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[var(--green)] font-mono text-[var(--fz-sm)] mb-[40px] hover:underline"
      >
        ← Back to Home
      </Link>

      <h1 className="text-[var(--lightest-slate)] font-bold text-[clamp(40px,5vw,60px)] mb-[20px]">
        {title}
      </h1>

      <p className="font-mono text-[var(--slate)] text-[var(--fz-sm)] mb-[40px]">
        Last updated: {lastUpdated}
      </p>

      <div className="legal-prose">
        {children}
      </div>
    </div>
  );
}
