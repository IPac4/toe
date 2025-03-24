
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
import ExpertTestimonial from '../components/ExpertTestimonial';

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
        // Prevent default if it's an anchor tag
        if (target.tagName === 'A' || target.closest('a')) {
          e.preventDefault();
        }
        
        // Scroll to pricing section instead of opening modal
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
        
        {/* Luka Mirnik testimonial */}
        <ExpertTestimonial 
          name="Luka Mirnik"
          title="Fizioterapevt Luke Dončića in slovenske košarkarske reprezentance"
          quote="Kot fizioterapevt slovenske košarkarske reprezentance in profesionalnih športnikov vsakodnevno rešujem težave z bolečinami v stopalih. TOE je revolucionarna rešitev, ki jo priporočam tako športnikom kot vsakomur, ki želi preventivno zaščititi svoje noge pred bolečinami in deformacijami."
          imageSrc="/lovable-uploads/fea16b3e-3afb-4acd-b956-418db3d5205d.png"
          credentials={[
            "7+ let izkušenj s profesionalnimi športniki", 
            "Ekspert za rehabilitacijo stopal", 
            "Član strokovnega tima KZS"
          ]}
          featured={true}
          instagramHandle="lukamirnik"
          id="expert-luka"
        />
        
        <ConsequencesSection />
        
        <ReviewSection />
        
        {/* Jure Pantar testimonial */}
        <ExpertTestimonial 
          name="Jure Pantar"
          title="Članski trener Taekwando reprezentance Slovenije"
          quote="Kot trener vrhunskih športnikov se zavedam, kako pomembna je pravilna opora stopala. TOE izdelek priporočam vsem svojim varovancem, saj omogoča hitrejše okrevanje po treningih in tekmah ter dolgoročno pomaga ohranjati zdravo držo in preprečuje poškodbe."
          imageSrc="/lovable-uploads/03231ada-ca94-4b89-b1d9-fbc711450811.png"
          credentials={[
            "Mednarodni trener", 
            "Olimpijski trener", 
            "15+ let izkušenj v vrhunskem športu"
          ]}
          featured={true}
          instagramHandle="jurepantar"
          id="expert-jure"
        />
        
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
