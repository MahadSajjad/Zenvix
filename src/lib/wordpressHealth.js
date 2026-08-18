import { getPages, getPosts, getCategories } from '../services/wordpress';

/**
 * Lightweight development utility for verifying WordPress API connection.
 * Do not run this on production page loads.
 * Usage in browser console: window.checkWordPressHealth()
 */
export async function checkWordPressHealth() {
  console.group('WordPress API Health Check');
  
  const url = import.meta.env.VITE_WORDPRESS_URL;
  if (!url) {
    console.error('❌ VITE_WORDPRESS_URL is not configured in .env');
    console.groupEnd();
    return { status: 'error', reason: 'missing_env' };
  }
  
  console.log(`🌐 Configured URL: ${url}`);
  
  try {
    const [pages, posts, categories] = await Promise.all([
      getPages({ per_page: 1 }),
      getPosts({ per_page: 1 }),
      getCategories({ per_page: 1 })
    ]);
    
    console.log(`✅ Connection Successful!`);
    console.log(`- Pages connected: found ${pages?.length ?? 0}`);
    console.log(`- Posts connected: found ${posts?.length ?? 0}`);
    console.log(`- Categories connected: found ${categories?.length ?? 0}`);
    
    console.groupEnd();
    return { status: 'success' };
  } catch (error) {
    console.error('❌ API Connection Failed:', error.message);
    console.groupEnd();
    return { status: 'error', reason: error.message };
  }
}

// Expose to window in development for easy testing
if (import.meta.env.DEV) {
  window.checkWordPressHealth = checkWordPressHealth;
}
