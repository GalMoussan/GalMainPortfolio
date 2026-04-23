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

  return (
    <>
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
