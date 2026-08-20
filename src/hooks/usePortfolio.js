import { useState, useEffect } from 'react';
import { getPortfolio } from '../services/wordpress';

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPortfolio() {
      try {
        const wpPortfolio = await getPortfolio();
        
        if (isMounted) {
          if (wpPortfolio) {
            setPortfolio(wpPortfolio);
          } else {
            setPortfolio([]);
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

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  return { portfolio, loading, error };
}
