import { useState, useEffect } from 'react';
import { getServices } from '../services/wordpress';
import { services as staticServices } from '../data/services';

export function useServices() {
  // Start with static services as fallback for instant rendering
  const [services, setServices] = useState(staticServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchServices() {
      try {
        const wpServices = await getServices();
        
        if (isMounted) {
          if (wpServices && wpServices.length > 0) {
            setServices(wpServices);
          } else {
            console.warn('[useServices] WordPress returned empty services. Using static fallback.');
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('[useServices] Failed to fetch services from WordPress. Using static fallback.', err.message);
          setError(err);
          setLoading(false);
          // services state remains as staticServices
        }
      }
    }

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return { services, loading, error };
}
