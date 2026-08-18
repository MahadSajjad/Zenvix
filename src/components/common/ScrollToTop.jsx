import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      
      const attemptScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          // Add a fixed offset for the sticky header
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Try scrolling immediately
      if (!attemptScroll()) {
        // If element doesn't exist yet (e.g. framer-motion page transition), wait for it
        const observer = new MutationObserver((mutations, obs) => {
          if (attemptScroll()) {
            obs.disconnect();
          }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Safety timeout to prevent infinite observation if element never renders
        setTimeout(() => observer.disconnect(), 3000);
      }
    } else {
      // Normal navigation: scroll to top instantly
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash]);

  return null;
}
