import { wpFetch } from '../../lib/wordpress';

/**
 * Normalizes a WordPress page object for the frontend
 */
export function normalizePage(wpPage) {
  if (!wpPage) return null;

  return {
    id: wpPage.id,
    slug: wpPage.slug,
    title: wpPage.title?.rendered || '',
    content: wpPage.content?.rendered || '',
    excerpt: wpPage.excerpt?.rendered || '',
    featuredMediaId: wpPage.featured_media,
    date: wpPage.date,
    modified: wpPage.modified,
  };
}

/**
 * Fetches all pages from WordPress
 */
export async function getPages(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `pages?${query}` : 'pages';
  
  const pages = await wpFetch(endpoint);
  return Array.isArray(pages) ? pages.map(normalizePage) : [];
}

/**
 * Fetches a single page by slug
 */
export async function getPageBySlug(slug) {
  const pages = await wpFetch(`pages?slug=${slug}&_embed=1`);
  if (!Array.isArray(pages) || pages.length === 0) {
    return null;
  }
  return normalizePage(pages[0]);
}
