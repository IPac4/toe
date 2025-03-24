
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const StickyCTA: React.FC = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);
  
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
      "hidden": !showStickyCta
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
            Naroči Tarsal Toe 20% popusta in gratis vajami za vadbo doma
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
