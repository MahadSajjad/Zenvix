import { useState, useEffect } from 'react';
import { getTeam } from '../services/wordpress';

export function useTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTeam() {
      try {
        const wpTeam = await getTeam();
        
        if (isMounted) {
          if (wpTeam) {
            setTeam(wpTeam);
          } else {
            setTeam([]);
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

    fetchTeam();

    return () => {
      isMounted = false;
    };
  }, []);

  return { team, loading, error };
}
