import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CinemaQuery | Gal Moussan',
  description: 'Semantic movie search powered by AI embeddings and Claude re-ranking',
};

export default function CinemaQueryPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen flex flex-col px-[25px] md:px-[50px] lg:px-[100px]">
      <header className="mb-[30px] md:mb-[40px]">
        <Link
          href="/"
          className="inline-block font-mono text-[var(--green)] text-[14px] mb-3 hover:underline transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="text-[clamp(32px,5vw,48px)] font-semibold text-[var(--lightest-slate)] mb-2">
          CinemaQuery
        </h1>
        <p className="text-[var(--slate)] text-[16px] md:text-[18px] max-w-[600px]">
          Semantic movie search powered by AI. Search for films using natural language and discover movies through intelligent embeddings and Claude re-ranking.
        </p>
      </header>

      <div className="flex-1 mb-[50px]">
        <iframe
          src="https://cinemaquery.vercel.app/embed"
          title="CinemaQuery Movie Search"
          className="w-full border-0 rounded-[var(--border-radius)] bg-[var(--light-navy)]"
          style={{
            height: 'calc(100vh - 220px)',
            minHeight: '500px',
            colorScheme: 'dark',
            WebkitOverflowScrolling: 'touch',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
}
