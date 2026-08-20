import { useState, useEffect } from 'react';
import { getPosts } from '../services/wordpress';

export function useBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchBlog() {
      try {
        const wpPosts = await getPosts();
        
        if (isMounted) {
          if (wpPosts) {
            setPosts(wpPosts);
          } else {
            setPosts([]);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
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
