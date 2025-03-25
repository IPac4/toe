
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Type definitions for analytics events
type EventParams = {
  [key: string]: string | number | boolean;
};

// Hook for working with Google Analytics
export const useAnalytics = () => {
  const location = useLocation();
  
  // Track page views when route changes
  useEffect(() => {
    // Check if gtag is available
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
  
  // Function to track events
  const trackEvent = (eventName: string, params?: EventParams) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, params);
    }
  };
  
  return { trackEvent };
};

// Add gtag to Window interface
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set', 
      targetId: string | Date | { [key: string]: any },
      options?: { [key: string]: any }
    ) => void;
    dataLayer: any[];
  }
}
