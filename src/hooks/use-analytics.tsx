
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Type definitions for analytics events
type EventParams = {
  [key: string]: string | number | boolean;
};

// Hook for working with Google Analytics and Facebook Pixel
export const useAnalytics = () => {
  const location = useLocation();
  
  // Track page views when route changes
  useEffect(() => {
    // Check if gtag is available for Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    
    // Check if fbq is available for Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }
  }, [location]);
  
  // Function to track events for both Google Analytics and Facebook Pixel
  const trackEvent = (eventName: string, params?: EventParams) => {
    // Track event in Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, params);
    }
    
    // Track event in Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', eventName, params);
    }
  };
  
  return { trackEvent };
};

// Add gtag and fbq to Window interface
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set', 
      targetId: string | Date | { [key: string]: any },
      options?: { [key: string]: any }
    ) => void;
    dataLayer: any[];
    fbq: (
      command: string,
      eventName: string,
      params?: { [key: string]: any }
    ) => void;
    _fbq: any;
  }
}
