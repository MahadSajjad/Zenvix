import { wpFetch } from '../../lib/wordpress';

/**
 * Normalizes a WordPress team member object for the frontend
 */
export function normalizeTeamMember(wpMember) {
  if (!wpMember) return null;

  // Determine image URL
  // 1. Try _embedded if ?_embed=1 was used
  let imageUrl = null;
  if (wpMember._embedded && wpMember._embedded['wp:featuredmedia'] && wpMember._embedded['wp:featuredmedia'][0]) {
    const media = wpMember._embedded['wp:featuredmedia'][0];
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
  else if (wpMember.acf?.image) {
    imageUrl = typeof wpMember.acf.image === 'string' 
      ? wpMember.acf.image 
      : wpMember.acf.image.url;
  }

  // Extract social links if available in ACF
  const socialLinks = {};
  if (wpMember.acf?.linkedin_url || wpMember.acf?.linkedin) socialLinks.linkedin = wpMember.acf?.linkedin_url || wpMember.acf?.linkedin;
  if (wpMember.acf?.twitter_url || wpMember.acf?.twitter) socialLinks.twitter = wpMember.acf?.twitter_url || wpMember.acf?.twitter;
  if (wpMember.acf?.github_url || wpMember.acf?.github) socialLinks.github = wpMember.acf?.github_url || wpMember.acf?.github;
  if (wpMember.acf?.facebook_url || wpMember.acf?.facebook) socialLinks.facebook = wpMember.acf?.facebook_url || wpMember.acf?.facebook;
  if (wpMember.acf?.instagram_url || wpMember.acf?.instagram) socialLinks.instagram = wpMember.acf?.instagram_url || wpMember.acf?.instagram;
  
  if (wpMember.acf?.portfolio_url || wpMember.acf?.portfolio) {
    socialLinks.portfolio = wpMember.acf?.portfolio_url || wpMember.acf?.portfolio;
  } else if (wpMember.slug === 'mahad-sajjad' || wpMember.title?.rendered === 'Mahad Sajjad') {
    socialLinks.portfolio = 'https://mahadsajjad.vercel.app';
  }

  // Strip empty HTML tags from rendered content for fallback bio
  let rawContent = wpMember.content?.rendered || '';
  if (rawContent.replace(/<[^>]+>/g, '').trim() === '') {
    rawContent = '';
  }

  return {
    id: wpMember.slug || wpMember.id,
    wpId: wpMember.id,
    name: wpMember.title?.rendered || '',
    role: wpMember.acf?.role || '',
    bio: wpMember.acf?.short_bio || wpMember.acf?.bio || rawContent || '',
    image: imageUrl,
    socialLinks,
    order: parseInt(wpMember.acf?.display_order || wpMember.acf?.team_order, 10) || 99,
  };
}

/**
 * Fetches all team members from WordPress
 */
export async function getTeam(params = {}) {
  // Use _embed=1 to get featured_media details in one request if available
  const defaultParams = { per_page: 100, _embed: '1', ...params };
  const query = new URLSearchParams(defaultParams).toString();
  const endpoint = `team?${query}`;
  
  const members = await wpFetch(endpoint);
  
  if (!Array.isArray(members)) {
    return [];
  }

  // Normalize and optionally sort by acf.team_order if available
  return members
    .map(normalizeTeamMember)
    .sort((a, b) => a.order - b.order);
}
