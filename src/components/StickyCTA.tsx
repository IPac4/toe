
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks/use-analytics';

const StickyCTA: React.FC = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [isPricingSectionVisible, setIsPricingSectionVisible] = useState(false);
  const { trackEvent } = useAnalytics();
  
  useEffect(() => {
    // Handle showing sticky CTA after 20 seconds
    const timeoutId = setTimeout(() => {
      setShowStickyCta(true);
    }, 20000); // 20 seconds
    
    // Handle showing sticky CTA after scrolling 50% of page
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / (pageHeight - windowHeight)) * 100;
      
      if (scrollPercentage >= 50) {
        setShowStickyCta(true);
      }
      
      // Check if pricing section is visible
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const isPricingVisible = 
          rect.top < window.innerHeight && 
          rect.bottom > 0;
        setIsPricingSectionVisible(isPricingVisible);
      }
    };
    
    // Listen for checkout open/close events
    const handleCheckoutOpen = () => {
      setShowStickyCta(false);
    };
    
    const handleCheckoutClosed = () => {
      // Only show CTA again if we're past 50% scroll
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / (pageHeight - windowHeight)) * 100;
      
      if (scrollPercentage >= 50) {
        setShowStickyCta(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('checkoutOpen', handleCheckoutOpen);
    document.addEventListener('checkoutClosed', handleCheckoutClosed);
    
    // Call once on mount to check initial state
    handleScroll();
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('checkoutOpen', handleCheckoutOpen);
      document.removeEventListener('checkoutClosed', handleCheckoutClosed);
    };
  }, []);

  // Function to handle button click for scrolling to pricing
  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Track CTA button click for Facebook Pixel with more specific event type
    trackEvent('InitiateCheckout', { 
      content_name: 'Sticky CTA',
      content_category: 'Tarsal TOE',
      content_type: 'product',
      value: 28.64, // Default value for the popular package
      currency: 'EUR'
    });
    
    console.log('Sticky CTA clicked - InitiateCheckout event fired');
    
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const offset = headerHeight + 20; // Add extra padding
      
      const pricingSectionPosition = pricingSection.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: pricingSectionPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={cn("sticky-cta bg-white shadow-lg py-3 border-t border-gray-200", {
      "hidden": !showStickyCta || isPricingSectionVisible
    })}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="hidden md:block text-tarsal-DEFAULT font-semibold">
            Tarsal TOE - 20% popusta
          </div>
          <a 
            href="#pricing" 
            className="cta-button w-full md:w-auto text-center"
            onClick={handleCtaClick}
          >
            Naroči Tarsal Toe z 20% popustom in <span className="text-red-500 font-semibold">GRATIS</span> vajami za vadbo doma
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
