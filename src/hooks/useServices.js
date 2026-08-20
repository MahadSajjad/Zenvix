import { useState, useEffect } from 'react';
import { getServices } from '../services/wordpress';

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchServices() {
      try {
        const wpServices = await getServices();
        
        if (isMounted) {
          if (wpServices) {
            setServices(wpServices);
          } else {
            setServices([]);
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

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return { services, loading, error };
}
