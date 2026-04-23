import { describe, it, expect } from 'vitest';
import { getVerticalConfig } from '../_registry';
import { notFound } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

describe('getVerticalConfig', () => {
  it('returns default config for "default" slug', () => {
    const config = getVerticalConfig('default');
    expect(config.slug).toBe('default');
    expect(config.displayName).toBe('AI Integration Services');
    expect(config.hero).toBeDefined();
    expect(config.demoScenarios).toHaveLength(3);
  });

  it('throws notFound() for undefined slug', () => {
    expect(() => getVerticalConfig(undefined as unknown as string)).toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('throws notFound() for empty string', () => {
    expect(() => getVerticalConfig('')).toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('throws notFound() for unknown vertical slug', () => {
    expect(() => getVerticalConfig('unknown-vertical')).toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('config has all required fields', () => {
    const config = getVerticalConfig('default');

    // Top-level required fields
    expect(config.slug).toBeDefined();
    expect(config.displayName).toBeDefined();

    // Hero section
    expect(config.hero.preHeadline).toBeDefined();
    expect(config.hero.painQuestion).toBeDefined();
    expect(config.hero.headlineLine1).toBeDefined();
    expect(config.hero.headlineLine2).toBeDefined();
    expect(config.hero.subheadline).toBeDefined();
    expect(config.hero.cyclingTexts).toBeInstanceOf(Array);
    expect(config.hero.cyclingTexts.length).toBeGreaterThan(0);

    // Demo scenarios
    expect(config.demoScenarios).toBeInstanceOf(Array);
    expect(config.demoScenarios.length).toBeGreaterThan(0);

    config.demoScenarios.forEach((scenario) => {
      expect(scenario.id).toBeDefined();
      expect(scenario.label).toBeDefined();
      expect(scenario.before.title).toBeDefined();
      expect(scenario.before.bullets).toBeInstanceOf(Array);
      expect(scenario.after.title).toBeDefined();
      expect(scenario.after.bullets).toBeInstanceOf(Array);
    });

    // Service examples
    expect(config.serviceExamples.starter).toBeDefined();
    expect(config.serviceExamples.business).toBeDefined();
    expect(config.serviceExamples.full).toBeDefined();

    // Case studies
    expect(config.caseStudySlugs).toBeInstanceOf(Array);

    // Tools
    expect(config.tools).toBeInstanceOf(Array);
    expect(config.tools.length).toBeGreaterThan(0);

    // SEO meta
    expect(config.seoMeta.title).toBeDefined();
    expect(config.seoMeta.description).toBeDefined();
    expect(config.seoMeta.keywords).toBeInstanceOf(Array);
  });

  it('demo scenarios have proper structure', () => {
    const config = getVerticalConfig('default');
    const scenario = config.demoScenarios[0];

    expect(scenario.before.bullets).toBeInstanceOf(Array);
    expect(scenario.after.bullets).toBeInstanceOf(Array);

    // Optional fields
    if (scenario.before.stat) {
      expect(scenario.before.stat.label).toBeDefined();
      expect(scenario.before.stat.value).toBeDefined();
    }

    if (scenario.after.stat) {
      expect(scenario.after.stat.label).toBeDefined();
      expect(scenario.after.stat.value).toBeDefined();
    }
  });
});
