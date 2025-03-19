
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ExpertTestimonial from '../components/ExpertTestimonial';
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
        
        <ExpertTestimonial 
          name="Luka Mirnik"
          title="Fizioterapevt Luke Dončića in slovenske košarkarske reprezentance"
          quote="Kot fizioterapevt slovenske košarkarske reprezentance in profesionalnih športnikov vsakodnevno rešujem težave z bolečinami v stopalih. TOE je revolucionarna rešitev, ki jo priporočam tako športnikom kot vsakomur, ki želi preventivno zaščititi svoje noge pred bolečinami in deformacijami."
          imageSrc="/lovable-uploads/fea16b3e-3afb-4acd-b956-418db3d5205d.png"
          id="experts"
          credentials={["7+ let izkušenj s profesionalnimi športniki", "Ekspert za rehabilitacijo stopal", "Član strokovnega tima KZS"]}
          featured={true}
        />
        
        <ProblemSection />
        
        <ProductShowcase />
        
        <StatsSection />
        
        <ExpertTestimonial 
          name="Marko Macuh"
          title="Priznani fizioterapevt in specialist za ortopedske težave"
          quote="V svoji praksi sem opazil, da večina težav s stopali izvira iz nepravilne obremenitve. TOE razbremeni kritične točke in pomaga preprečiti deformacije. Svojim pacientom ga priporočam kot preventivno rešitev, ki je enostavna za uporabo in učinkovita."
          imageSrc="/lovable-uploads/bf002e75-f7c8-47de-8d94-73f12b1efdd4.png"
          reverse={true}
          credentials={["Specialist za ortopedske težave", "Certificiran klinični fizioterapevt", "10+ let kliničnih izkušenj"]}
        />
        
        <ConsequencesSection />
        
        <ReviewSection />
        
        <ExpertTestimonial 
          name="Jure Pantar"
          title="Članski trener Taekwando reprezentance Slovenije"
          quote="Kot trener vrhunskih športnikov se zavedam, kako pomembna je pravilna opora stopala. TOE izdelek priporočam vsem svojim varovancem, saj omogoča hitrejše okrevanje po treningih in tekmah ter dolgoročno pomaga ohranjati zdravo držo in preprečuje poškodbe."
          imageSrc="/lovable-uploads/03231ada-ca94-4b89-b1d9-fbc711450811.png"
          reverse={false}
          credentials={["Mednarodni trener", "Olimpijski trener", "15+ let izkušenj v vrhunskem športu"]}
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
