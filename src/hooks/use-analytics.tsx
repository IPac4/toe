
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
      console.log('Facebook Pixel: PageView tracked');
    }
  }, [location]);
  
  // Function to track events for both Google Analytics and Facebook Pixel
  const trackEvent = (eventName: string, params?: EventParams) => {
    console.log(`Attempting to track event: ${eventName}`, params);
    
    // Track event in Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, params);
      console.log(`Google Analytics: ${eventName} tracked`, params);
    }
    
    // Track event in Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      try {
        // For standard events, use 'track'
        if (eventName === 'Purchase' || 
            eventName === 'InitiateCheckout' || 
            eventName === 'AddToCart' || 
            eventName === 'ViewContent') {
          window.fbq('track', eventName, params);
        } 
        // For custom events, use 'trackCustom'
        else {
          window.fbq('trackCustom', eventName, params);
        }
        
        console.log(`Facebook Pixel: ${eventName} tracked`, params);
      } catch (error) {
        console.error('Facebook Pixel tracking error:', error);
      }
    } else {
      console.warn('Facebook Pixel (fbq) not available');
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
