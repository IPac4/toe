
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ExpertTestimonial from '../components/ExpertTestimonial';
import ProblemSection from '../components/ProblemSection';
import ProductShowcase from '../components/ProductShowcase';
import StatsSection from '../components/StatsSection';
import ConsequencesSection from '../components/ConsequencesSection';
import PricingSection from '../components/PricingSection';
import ReviewSection from '../components/ReviewSection';
import CheckoutModal from '../components/CheckoutModal';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'basic' | 'double' | 'family'>('double');
  
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
          const isBasic = closestPricingCard.querySelector('h3')?.textContent?.includes('Osnovni');
          
          if (isFamily) {
            setSelectedVariant('family');
          } else if (isBasic) {
            setSelectedVariant('basic');
          } else {
            setSelectedVariant('double');
          }
        }
        
        // Prevent default if it's an anchor tag
        if (target.tagName === 'A' || target.closest('a')) {
          e.preventDefault();
        }
        
        // Open the modal
        setIsModalOpen(true);
      }
    };
    
    document.addEventListener('click', handleCtaClick);
    
    return () => {
      document.removeEventListener('click', handleCtaClick);
    };
  }, []);

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
        
        <ExpertTestimonial 
          name="Marko Macih"
          title="Priznani fizioterapevt in specialist za ortopedske težave"
          quote="V svoji praksi sem opazil, da večina težav s stopali izvira iz nepravilne obremenitve. TOE razbremeni kritične točke in pomaga preprečiti deformacije. Svojim pacientom ga priporočam kot preventivno rešitev, ki je enostavna za uporabo in učinkovita."
          imageSrc="/lovable-uploads/b4f65f49-e446-432e-8e90-dcad9fcd2c08.png"
          reverse={true}
          credentials={["Specialist za ortopedske težave", "Certificiran klinični fizioterapevt", "10+ let kliničnih izkušenj"]}
        />
        
        <ProblemSection />
        
        <ProductShowcase />
        
        <StatsSection />
        
        <ConsequencesSection />
        
        <ReviewSection />
        
        <PricingSection />
      </main>

      <Footer />
      
      <CheckoutModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        productVariant={selectedVariant}
      />
    </div>
  );
};

export default Index;
