import { wpFetch } from '../../lib/wordpress';

/**
 * Normalizes a WordPress post object for the frontend
 */
export function normalizePost(wpPost) {
  if (!wpPost) return null;

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title?.rendered || '',
    content: wpPost.content?.rendered || '',
    excerpt: wpPost.excerpt?.rendered || '',
    featuredMediaId: wpPost.featured_media,
    date: wpPost.date,
    modified: wpPost.modified,
    categories: wpPost.categories || [],
    authorId: wpPost.author,
  };
}

/**
 * Fetches all posts from WordPress
 */
export async function getPosts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `posts?${query}` : 'posts';
  
  const posts = await wpFetch(endpoint);
  return Array.isArray(posts) ? posts.map(normalizePost) : [];
}

/**
 * Fetches a single post by slug
 */
export async function getPostBySlug(slug) {
  const posts = await wpFetch(`posts?slug=${slug}&_embed=1`);
  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }
  return normalizePost(posts[0]);
}
