import { useState, useEffect } from 'react';
import { getPortfolio } from '../services/wordpress';
import { portfolioData as staticPortfolio } from '../data/portfolio';

export function usePortfolio() {
  // Start with static portfolio as fallback for instant rendering
  const [portfolio, setPortfolio] = useState(staticPortfolio);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPortfolio() {
      try {
        const wpPortfolio = await getPortfolio();
        
        if (isMounted) {
          if (wpPortfolio && wpPortfolio.length > 0) {
            setPortfolio(wpPortfolio);
          } else {
            console.warn('[usePortfolio] WordPress returned empty portfolio. Using static fallback.');
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('[usePortfolio] Failed to fetch portfolio from WordPress. Using static fallback.', err.message);
          setError(err);
          setLoading(false);
          // portfolio state remains as staticPortfolio
        }
      }
    }

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  return { portfolio, loading, error };
}
