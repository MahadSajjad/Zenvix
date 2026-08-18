import { wpFetch } from '../../lib/wordpress';

/**
 * Normalizes a WordPress media object for the frontend
 */
export function normalizeMedia(wpMedia) {
  if (!wpMedia) return null;

  return {
    id: wpMedia.id,
    altText: wpMedia.alt_text || '',
    sourceUrl: wpMedia.source_url || '',
    mediaDetails: wpMedia.media_details || {},
    mimeType: wpMedia.mime_type || '',
    title: wpMedia.title?.rendered || '',
  };
}

/**
 * Fetches a single media item by ID
 */
export async function getMedia(id) {
  if (!id) return null;
  
  try {
    const media = await wpFetch(`media/${id}`);
    return normalizeMedia(media);
  } catch (error) {
    console.error(`Failed to fetch media ID ${id}:`, error.message);
    return null;
  }
}

/**
 * Fetches multiple media items
 */
export async function getAllMedia(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `media?${query}` : 'media';
  
  const mediaList = await wpFetch(endpoint);
  return Array.isArray(mediaList) ? mediaList.map(normalizeMedia) : [];
}
