import { notFound } from 'next/navigation';
import type { VerticalConfig } from './types';
import { defaultVertical } from './default';

// Registry of all available vertical configurations
const verticals: Record<string, VerticalConfig> = {
  default: defaultVertical,
  // Future verticals will be added here:
  // ecommerce: ecommerceVertical,
  // clinics: clinicsVertical,
  // etc.
};

/**
 * Get vertical configuration by slug
 * @param slug - The vertical identifier (e.g., "ecommerce", "default")
 * @returns VerticalConfig for the requested vertical
 * @throws notFound() if slug doesn't exist in registry
 */
export function getVerticalConfig(slug: string): VerticalConfig {
  const config = verticals[slug];

  if (!config) {
    notFound();
  }

  return config;
}

/**
 * Get all available vertical slugs
 * @returns Array of all registered vertical slugs
 */
export function getAvailableVerticals(): string[] {
  return Object.keys(verticals);
}
