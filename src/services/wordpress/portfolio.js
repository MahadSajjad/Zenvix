import { wpFetch } from '../../lib/wordpress';

/**
 * Normalizes a WordPress portfolio project object for the frontend
 */
export function normalizePortfolioProject(wpProject) {
  if (!wpProject) return null;

  // Parse services if they are newline separated
  const rawServices = wpProject.acf?.services_used || wpProject.acf?.services || '';
  const servicesArray = typeof rawServices === 'string'
    ? rawServices.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    : (Array.isArray(rawServices) ? rawServices : []);

  // Determine image URL
  // 1. Try _embedded if ?_embed=1 was used
  let imageUrl = null;
  if (wpProject._embedded && wpProject._embedded['wp:featuredmedia'] && wpProject._embedded['wp:featuredmedia'][0]) {
    const media = wpProject._embedded['wp:featuredmedia'][0];
    const sizes = media.media_details?.sizes;
    
    // Prefer large or medium_large for speed, fallback to original
    if (sizes?.large) {
      imageUrl = sizes.large.source_url;
    } else if (sizes?.medium_large) {
      imageUrl = sizes.medium_large.source_url;
    } else {
      imageUrl = media.source_url;
    }
  } 
  // 2. Try ACF image if provided
  else if (wpProject.acf?.image) {
    imageUrl = typeof wpProject.acf.image === 'string' 
      ? wpProject.acf.image 
      : wpProject.acf.image.url; // In case ACF returns an image object
  }

  // Strip empty HTML tags from rendered content for fallback description
  let rawContent = wpProject.content?.rendered || '';
  // Simple regex to remove tags if it's just empty blocks like <p></p>
  if (rawContent.replace(/<[^>]+>/g, '').trim() === '') {
    rawContent = '';
  }

  return {
    id: wpProject.slug || wpProject.id, // Prefer slug as id to match frontend routing/keys
    wpId: wpProject.id,
    title: wpProject.title?.rendered || '',
    slug: wpProject.slug,
    category: wpProject.acf?.project_category || wpProject.acf?.category || 'Uncategorized',
    description: wpProject.acf?.short_description || wpProject.acf?.description || rawContent || '',
    services: servicesArray,
    challenge: wpProject.acf?.challenge || '',
    approach: wpProject.acf?.approach || '',
    solution: wpProject.acf?.solution || '',
    outcome: wpProject.acf?.outcome || '',
    image: imageUrl,
    link: wpProject.acf?.link || '',
    // Provide safe defaults for the abstract placeholders if image is missing
    placeholderColors: wpProject.acf?.placeholderColors || "bg-primary text-white",
    placeholderType: wpProject.acf?.placeholderType || "wireframe"
  };
}

/**
 * Fetches all portfolio projects from WordPress
 */
export async function getPortfolio(params = {}) {
  // Use _embed=1 to get featured_media details in one request if available
  const defaultParams = { per_page: 100, _embed: '1', ...params };
  const query = new URLSearchParams(defaultParams).toString();
  const endpoint = `portfolio?${query}`;
  
  const projects = await wpFetch(endpoint);
  
  if (!Array.isArray(projects)) {
    return [];
  }

  return projects.map(normalizePortfolioProject);
}

/**
 * Fetches a single portfolio project by slug
 */
export async function getPortfolioBySlug(slug) {
  const endpoint = `portfolio?slug=${slug}&_embed=1`;
  const projects = await wpFetch(endpoint);
  
  if (!Array.isArray(projects) || projects.length === 0) {
    return null;
  }
  
  return normalizePortfolioProject(projects[0]);
}
