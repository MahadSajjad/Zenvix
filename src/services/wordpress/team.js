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
    imageUrl = wpMember._embedded['wp:featuredmedia'][0].source_url;
  } 
  // 2. Try ACF image if provided
  else if (wpMember.acf?.image) {
    imageUrl = typeof wpMember.acf.image === 'string' 
      ? wpMember.acf.image 
      : wpMember.acf.image.url;
  }

  // Extract social links if available in ACF
  const socialLinks = {};
  if (wpMember.acf?.linkedin) socialLinks.linkedin = wpMember.acf.linkedin;
  if (wpMember.acf?.twitter) socialLinks.twitter = wpMember.acf.twitter;
  if (wpMember.acf?.github) socialLinks.github = wpMember.acf.github;
  if (wpMember.acf?.facebook) socialLinks.facebook = wpMember.acf.facebook;
  if (wpMember.acf?.instagram) socialLinks.instagram = wpMember.acf.instagram;

  return {
    id: wpMember.slug || wpMember.id,
    wpId: wpMember.id,
    name: wpMember.title?.rendered || '',
    role: wpMember.acf?.role || '',
    bio: wpMember.acf?.bio || wpMember.content?.rendered || '',
    image: imageUrl,
    socialLinks,
    order: parseInt(wpMember.acf?.team_order, 10) || 99,
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
