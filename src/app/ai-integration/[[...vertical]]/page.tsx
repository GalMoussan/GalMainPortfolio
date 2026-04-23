import type { Metadata } from 'next';
import { getVerticalConfig } from '../_lib/verticals/_registry';

type PageProps = {
  params: { vertical?: string[] };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.vertical?.[0]?.replace(/^for-/, '') ?? 'default';
  const config = getVerticalConfig(slug);

  return {
    title: config.seoMeta.title,
    description: config.seoMeta.description,
    keywords: config.seoMeta.keywords,
    openGraph: {
      title: config.seoMeta.title,
      description: config.seoMeta.description,
      type: 'website',
    },
  };
}

export default function AIIntegrationPage({ params }: PageProps) {
  const slug = params.vertical?.[0]?.replace(/^for-/, '') ?? 'default';
  const config = getVerticalConfig(slug);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[1000px] mx-auto text-center">
        <p className="font-mono text-green text-sm mb-4">
          {config.hero.preHeadline}
        </p>
        <h1 className="text-[var(--fz-hero)] font-bold text-lightest-slate leading-tight">
          {config.hero.headlineLine1}
          <br />
          <span className="text-green">{config.hero.headlineLine2}</span>
        </h1>
        <p className="mt-6 text-slate text-lg max-w-[700px] mx-auto">
          {config.hero.subheadline}
        </p>
        <p className="mt-8 text-light-slate font-mono text-sm">
          Route skeleton working ✓ · Vertical: {config.displayName}
        </p>
      </div>
    </div>
  );
}
