import { wpFetch } from '../../lib/wordpress';

/**
 * Normalizes a WordPress service object for the frontend
 */
export function normalizeService(wpService, index) {
  if (!wpService) return null;

  // Parse capabilities
  const rawCapabilities = wpService.acf?.capabilities || '';
  const capabilities = rawCapabilities
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(Boolean);

  return {
    id: wpService.slug,
    wpId: wpService.id,
    title: wpService.title?.rendered || '',
    shortTitle: wpService.title?.rendered || '',
    description: wpService.acf?.short_description || '',
    content: wpService.content?.rendered || '',
    capabilities: capabilities,
    order: parseInt(wpService.acf?.service_order, 10) || 99,
  };
}

/**
 * Fetches all services from WordPress
 */
export async function getServices(params = {}) {
  // Default to 100 per_page to get all services in one request
  const defaultParams = { per_page: 100, ...params };
  const query = new URLSearchParams(defaultParams).toString();
  const endpoint = `services?${query}`;
  
  const services = await wpFetch(endpoint);
  
  if (!Array.isArray(services)) {
    return [];
  }

  // Normalize, sort, and apply numbers
  return services
    .map((service) => normalizeService(service))
    .sort((a, b) => a.order - b.order)
    .map((service, idx) => ({
      ...service,
      number: (idx + 1).toString().padStart(2, '0')
    }));
}
