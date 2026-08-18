import { useState, useEffect } from 'react';
import { getTeam } from '../services/wordpress';
import { teamData as staticTeam } from '../data/team';

export function useTeam() {
  // Start with static team as fallback for instant rendering
  const [team, setTeam] = useState(staticTeam);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTeam() {
      try {
        const wpTeam = await getTeam();
        
        if (isMounted) {
          if (wpTeam && wpTeam.length > 0) {
            setTeam(wpTeam);
          } else {
            console.warn('[useTeam] WordPress returned empty team. Using static fallback.');
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('[useTeam] Failed to fetch team from WordPress. Using static fallback.', err.message);
          setError(err);
          setLoading(false);
          // team state remains as staticTeam
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
