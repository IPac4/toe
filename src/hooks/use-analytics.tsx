
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
  
  // New function: Setup checkout event listeners for Shopify buy buttons
  const setupShopifyPixelTracking = () => {
    // Look for Shopify buy buttons and add tracking
    const trackShopifyButtons = () => {
      const shopifyButtons = document.querySelectorAll('.shopify-buy__btn');
      
      shopifyButtons.forEach(button => {
        if (!button.hasAttribute('data-fb-pixel-tracked')) {
          button.setAttribute('data-fb-pixel-tracked', 'true');
          
          button.addEventListener('click', () => {
            let packageKey = 'basic';
            
            // Determine which package based on container ID
            if (button.closest('#product-component-1742851650294') || 
                button.closest('#modal-product-component-double')) {
              packageKey = 'double';
            } else if (button.closest('#product-component-1742851845591') || 
                       button.closest('#modal-product-component-family')) {
              packageKey = 'family';
            }
            
            console.log(`Shopify buy button clicked for ${packageKey} package - tracking events`);
            
            // Direct fbq call for InitiateCheckout (most reliable method)
            if (typeof window.fbq !== 'undefined') {
              window.fbq('track', 'InitiateCheckout', {
                content_name: packageKey === 'basic' ? 'Osnovno pakiranje' : 
                             packageKey === 'double' ? 'Dvojno pakiranje' : 'Družinsko pakiranje',
                content_category: 'Tarsal TOE',
                content_ids: packageKey,
                content_type: 'product',
                value: packageKey === 'basic' ? 17.90 : 
                      packageKey === 'double' ? 28.64 : 40.26,
                currency: 'EUR',
                num_items: packageKey === 'basic' ? 1 : 
                          packageKey === 'double' ? 2 : 3
              });
              
              window.fbq('track', 'AddToCart', {
                content_name: packageKey === 'basic' ? 'Osnovno pakiranje' : 
                             packageKey === 'double' ? 'Dvojno pakiranje' : 'Družinsko pakiranje',
                content_category: 'Tarsal TOE',
                content_ids: packageKey,
                content_type: 'product',
                value: packageKey === 'basic' ? 17.90 : 
                      packageKey === 'double' ? 28.64 : 40.26,
                currency: 'EUR',
                num_items: packageKey === 'basic' ? 1 : 
                          packageKey === 'double' ? 2 : 3
              });
              
              console.log(`Direct Facebook Pixel event fired for ${packageKey} package`);
              
              // Store package info in localStorage for potential use in checkout completion
              localStorage.setItem('tarsal_package', packageKey);
              localStorage.setItem('tarsal_checkout_started', Date.now().toString());
            }
          });
          
          console.log('Added Facebook Pixel tracking to Shopify buy button');
        }
      });
    };
    
    // Run immediately and also set up a mutation observer
    trackShopifyButtons();
    
    // Create observer to watch for dynamically added buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setTimeout(trackShopifyButtons, 500); // Delay to ensure buttons are fully rendered
        }
      });
    });
    
    // Observe the entire document body for changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => observer.disconnect();
  };
  
  return { trackEvent, setupShopifyPixelTracking };
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
