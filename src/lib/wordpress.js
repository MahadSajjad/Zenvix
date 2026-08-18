const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL;

if (!WORDPRESS_URL) {
  console.warn('VITE_WORDPRESS_URL is not defined in environment variables.');
}

const API_BASE_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

/**
 * Core API request function to interact with WordPress REST API
 */
export async function wpFetch(endpoint, options = {}) {
  if (!WORDPRESS_URL) {
    throw new Error('WordPress API URL is missing. Check your .env configuration.');
  }

  // Ensure endpoint doesn't start with a slash to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = `${API_BASE_URL}/${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }

    // WordPress might return empty responses for some endpoints like DELETE
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`[WP API] Error fetching ${cleanEndpoint}:`, error.message);
    throw error;
  }
}
