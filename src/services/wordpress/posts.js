import { wpFetch } from '../../lib/wordpress';

/**
 * Strips HTML tags from a string safely
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').trim();
}

/**
 * Calculates read time based on word count (approx 200 words per minute)
 */
function calculateReadTime(htmlContent) {
  if (!htmlContent) return '1 min read';
  const text = stripHtml(htmlContent);
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Formats WP date into "Aug 15, 2026"
 */
function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

/**
 * Normalizes a WordPress post object for the frontend
 */
export function normalizePost(wpPost) {
  if (!wpPost) return null;

  // Determine image URL
  let imageUrl = null;
  if (wpPost._embedded && wpPost._embedded['wp:featuredmedia'] && wpPost._embedded['wp:featuredmedia'][0]) {
    imageUrl = wpPost._embedded['wp:featuredmedia'][0].source_url;
  } else if (wpPost.acf?.image) {
    imageUrl = typeof wpPost.acf.image === 'string' ? wpPost.acf.image : wpPost.acf.image.url;
  }

  // Determine Category
  let categoryName = "Blog";
  if (wpPost._embedded && wpPost._embedded['wp:term'] && wpPost._embedded['wp:term'][0]) {
    const categories = wpPost._embedded['wp:term'][0];
    if (categories && categories.length > 0) {
      categoryName = categories[0].name;
    }
  }

  // Determine Author
  let authorName = "Zenvix Editorial";
  if (wpPost._embedded && wpPost._embedded.author && wpPost._embedded.author[0]) {
    authorName = wpPost._embedded.author[0].name;
  }

  const contentHtml = wpPost.content?.rendered || '';

  return {
    id: wpPost.slug || wpPost.id,
    wpId: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title?.rendered || '',
    content: contentHtml, // raw HTML for BlogPost
    excerpt: stripHtml(wpPost.excerpt?.rendered || ''),
    category: categoryName,
    author: authorName,
    date: formatDate(wpPost.date),
    readTime: calculateReadTime(contentHtml),
    featured: wpPost.acf?.featured || false, // Fallback to false if ACF not present
    image: imageUrl,
    placeholderType: wpPost.acf?.placeholderType || "technical",
    placeholderColors: wpPost.acf?.placeholderColors || "bg-primary text-white"
  };
}

/**
 * Fetches all posts from WordPress
 */
export async function getPosts(params = {}) {
  // Use _embed=1 to get featured_media, author, and terms in one request
  const defaultParams = { per_page: 100, _embed: '1', ...params };
  const query = new URLSearchParams(defaultParams).toString();
  const endpoint = `posts?${query}`;
  
  const posts = await wpFetch(endpoint);
  
  if (!Array.isArray(posts)) {
    return [];
  }

  return posts.map(normalizePost);
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
