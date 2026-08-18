import { wpFetch } from '../../lib/wordpress';

/**
 * Normalizes a WordPress category object for the frontend
 */
export function normalizeCategory(wpCategory) {
  if (!wpCategory) return null;

  return {
    id: wpCategory.id,
    slug: wpCategory.slug,
    name: wpCategory.name || '',
    description: wpCategory.description || '',
    count: wpCategory.count || 0,
  };
}

/**
 * Fetches all categories from WordPress
 */
export async function getCategories(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `categories?${query}` : 'categories';
  
  const categories = await wpFetch(endpoint);
  return Array.isArray(categories) ? categories.map(normalizeCategory) : [];
}

/**
 * Fetches a single category by ID
 */
export async function getCategory(id) {
  if (!id) return null;
  
  try {
    const category = await wpFetch(`categories/${id}`);
    return normalizeCategory(category);
  } catch (error) {
    console.error(`Failed to fetch category ID ${id}:`, error.message);
    return null;
  }
}
