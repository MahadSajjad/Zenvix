import { useState, useEffect } from 'react';
import { getPosts } from '../services/wordpress';
import { blogData as staticBlog } from '../data/blog';

export function useBlog() {
  // Start with static blog as fallback for instant rendering
  const [posts, setPosts] = useState(staticBlog);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchBlog() {
      try {
        const wpPosts = await getPosts();
        
        if (isMounted) {
          if (wpPosts && wpPosts.length > 0) {
            setPosts(wpPosts);
          } else {
            console.warn('[useBlog] WordPress returned empty posts. Using static fallback.');
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('[useBlog] Failed to fetch posts from WordPress. Using static fallback.', err.message);
          setError(err);
          setLoading(false);
          // posts state remains as staticBlog
        }
      }
    }

    fetchBlog();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, loading, error };
}
