import type { Metadata } from 'next';
import { getVerticalConfig } from '../_lib/verticals/_registry';
import { ScrollRevealSection } from '@/components/ui/ScrollRevealSection';
import { Hero } from '../_components/Hero';
import { BeforeAfterDemo } from '../_components/BeforeAfterDemo';
import { SocialProofStrip } from '../_components/SocialProofStrip';
import { ComparisonDiff } from '../_components/ComparisonDiff';
import { Services } from '../_components/Services';
import { Process } from '../_components/Process';
import { CaseStudies } from '../_components/CaseStudies';
import { ComingSoon } from '../_components/ComingSoon';
import { AboutGal } from '../_components/AboutGal';
import { FAQ } from '../_components/FAQ';
import { FinalCTA } from '../_components/FinalCTA';

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

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.seoMeta.title,
    description: config.seoMeta.description,
    provider: {
      '@type': 'Person',
      name: 'Gal Moussan',
      jobTitle: 'AI Integration Engineer',
      url: 'https://galmoussan.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Israel',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Integration Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Agent',
            description: config.serviceExamples.starter,
          },
          price: '1000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business System',
            description: config.serviceExamples.business,
          },
          price: '3000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Autonomous Operation',
            description: config.serviceExamples.full,
          },
          price: '6000',
          priceCurrency: 'USD',
        },
      ],
    },
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Section 1 - Hero */}
      <Hero config={config} />

      {/* Section 2 - Social Proof Strip */}
      <ScrollRevealSection>
        <SocialProofStrip tools={config.tools} />
      </ScrollRevealSection>

      {/* Section 3 - Comparison Diff */}
      <ScrollRevealSection>
        <ComparisonDiff />
      </ScrollRevealSection>

      {/* Section 4 - Expanded Demo (optional, uses same BeforeAfterDemo) */}
      <ScrollRevealSection
        id="demo-detail"
        className="max-w-[1200px] mx-auto py-[100px]"
      >
        <h2 className="numbered-heading text-center mb-12">See it in action.</h2>
        <BeforeAfterDemo scenarios={config.demoScenarios} />
      </ScrollRevealSection>

      {/* Section 5 - Services */}
      <ScrollRevealSection>
        <Services config={config} />
      </ScrollRevealSection>

      {/* Section 6 - Process */}
      <ScrollRevealSection>
        <Process />
      </ScrollRevealSection>

      {/* Section 7 - Case Studies */}
      <ScrollRevealSection>
        <CaseStudies slugs={config.caseStudySlugs} />
      </ScrollRevealSection>

      {/* Section 8 - Coming Soon */}
      <ScrollRevealSection>
        <ComingSoon />
      </ScrollRevealSection>

      {/* Section 9 - About Gal */}
      <ScrollRevealSection>
        <AboutGal />
      </ScrollRevealSection>

      {/* Section 10 - FAQ */}
      <ScrollRevealSection>
        <FAQ additionalFaqs={config.faqAdditional} />
      </ScrollRevealSection>

      {/* Section 11 - Final CTA */}
      <ScrollRevealSection>
        <FinalCTA />
      </ScrollRevealSection>

      {/* Section 12 - Footer (already in layout) */}
    </>
  );
}
