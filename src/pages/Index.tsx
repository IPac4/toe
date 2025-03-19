
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import ProductShowcase from '../components/ProductShowcase';
import StatsSection from '../components/StatsSection';
import ConsequencesSection from '../components/ConsequencesSection';
import GuaranteeSection from '../components/GuaranteeSection';
import PricingSection from '../components/PricingSection';
import ReviewSection from '../components/ReviewSection';
import CheckoutModal from '../components/CheckoutModal';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'basic' | 'double' | 'family'>('double');
  const [skipPackageSelection, setSkipPackageSelection] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Handle CTA button clicks
    const handleCtaClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cta-button')) {
        // Check if this is a pricing section CTA
        const closestPricingCard = target.closest('.price-card');
        if (closestPricingCard) {
          const isPopular = closestPricingCard.classList.contains('popular');
          const isFamily = closestPricingCard.querySelector('h3')?.textContent?.includes('Družinski');
          const isBasic = closestPricingCard.querySelector('h3')?.textContent?.includes('Osnovn');
          
          if (isFamily) {
            setSelectedVariant('family');
          } else if (isBasic) {
            setSelectedVariant('basic');
          } else {
            setSelectedVariant('double');
          }
          
          // Skip package selection when clicking from pricing section
          setSkipPackageSelection(true);
        } else {
          // Reset to show package selection for other CTA buttons
          setSkipPackageSelection(false);
          setSelectedVariant('double'); // Default to double package
        }
        
        // Prevent default if it's an anchor tag
        if (target.tagName === 'A' || target.closest('a')) {
          e.preventDefault();
        }
        
        // Open the modal
        setIsModalOpen(true);
        
        // Dispatch a custom event to notify other components that the checkout is open
        document.dispatchEvent(new CustomEvent('checkoutOpen'));
      }
    };
    
    document.addEventListener('click', handleCtaClick);
    
    return () => {
      document.removeEventListener('click', handleCtaClick);
    };
  }, []);

  // Effect to dispatch event when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      document.dispatchEvent(new CustomEvent('checkoutClosed'));
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />
        
        <ProblemSection />
        
        <ProductShowcase />
        
        <StatsSection />
        
        {/* Updated Luka Mirnik testimonial */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-1">Luka Mirnik</h3>
                <p className="text-tarsal-accent font-semibold mb-2">Fizioterapevt Luke Dončića in slovenske košarkarske reprezentance</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                  {["7+ let izkušenj s profesionalnimi športniki", "Ekspert za rehabilitacijo stopal", "Član strokovnega tima KZS"].map((credential, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {credential}
                    </Badge>
                  ))}
                </div>
                <blockquote className="text-sm md:text-base italic leading-relaxed">
                  "Kot fizioterapevt slovenske košarkarske reprezentance in profesionalnih športnikov vsakodnevno rešujem težave z bolečinami v stopalih. TOE je revolucionarna rešitev, ki jo priporočam tako športnikom kot vsakomur, ki želi preventivno zaščititi svoje noge pred bolečinami in deformacijami."
                </blockquote>
                {isMobile ? null : (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-8">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Zakaj zaupati strokovnjakom?</span> Naši priporočitelji so priznani strokovnjaki z dokazanimi izkušnjami na področju fizioterapije in športne medicine. Njihova podpora temelji na strokovnem znanju in opazovanih rezultatih pri pacientih.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 lg:w-1/3">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/fea16b3e-3afb-4acd-b956-418db3d5205d.png" 
                    alt="Luka Mirnik" 
                    className="w-full h-auto rounded-lg shadow-md object-cover max-w-[300px] mx-auto"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Priporočeno od stroke</Badge>
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-tarsal-accent" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="text-center mt-2">
                    <a 
                      href="https://instagram.com/lukamirnik" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-tarsal-accent hover:underline inline-flex items-center"
                    >
                      <svg 
                        className="w-4 h-4 mr-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      lukamirnik
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <ConsequencesSection />
        
        <ReviewSection />
        
        {/* Updated Jure Pantar testimonial */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0 lg:w-1/3">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/03231ada-ca94-4b89-b1d9-fbc711450811.png" 
                    alt="Jure Pantar" 
                    className="w-full h-auto rounded-lg shadow-md object-cover max-w-[300px] mx-auto"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-tarsal-accent" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-1">Jure Pantar</h3>
                <p className="text-tarsal-accent font-semibold mb-2">Članski trener Taekwando reprezentance Slovenije</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                  {["Mednarodni trener", "Olimpijski trener", "15+ let izkušenj v vrhunskem športu"].map((credential, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {credential}
                    </Badge>
                  ))}
                </div>
                <blockquote className="text-sm md:text-base italic leading-relaxed">
                  "Kot trener vrhunskih športnikov se zavedam, kako pomembna je pravilna opora stopala. TOE izdelek priporočam vsem svojim varovancem, saj omogoča hitrejše okrevanje po treningih in tekmah ter dolgoročno pomaga ohranjati zdravo držo in preprečuje poškodbe."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        
        <GuaranteeSection />
        
        <PricingSection />
      </main>

      <Footer />
      
      <CheckoutModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        productVariant={selectedVariant}
        skipPackageSelection={skipPackageSelection}
      />
    </div>
  );
};

export default Index;
