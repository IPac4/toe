
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ExpertTestimonial from '../components/ExpertTestimonial';
import ProblemSection from '../components/ProblemSection';
import ProductShowcase from '../components/ProductShowcase';
import StatsSection from '../components/StatsSection';
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
        
        <ProblemSection />
        
        <ProductShowcase />
        
        <StatsSection />
        
        <ExpertTestimonial 
          name="Marko Macuh"
          title="Priznan slovenski fizioterapevt"
          quote="Kot fizioterapevt pogosto svetujem uporabo TOE kot odlične preventivne rešitve. Pri redni uporabi se zmanjša tveganje za resne deformacije."
          imageSrc="/lovable-uploads/4e1de179-2e39-4459-81ff-6790bc8f90c3.png"
          reverse={true}
          credentials={["Specialist za ortopedsko fizioterapijo", "Predavatelj na FZV"]}
        />
        
        <section className="py-16 md:py-24 bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Kaj se zgodi, če ne ukrepamo?</h2>
              <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/lovable-uploads/617e160d-6d89-4830-a28f-6686320fcfdd.png" 
                  alt="Deformirano stopalo" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold mb-1">Poslabšanje deformacij prstov</h4>
                    <p className="text-white/80">Brez ukrepanja se hallux valgus in druge deformacije prstov poslabšajo, kar vodi do vse večje izbočenosti palca in večjih bolečin.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold mb-1">Kronična bolečina</h4>
                    <p className="text-white/80">Nezdravljena deformacija vodi do trajne, kronične bolečine, ki lahko omeji vsakodnevne aktivnosti in zmanjša kvaliteto življenja.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold mb-1">Možnost operacije</h4>
                    <p className="text-white/80">V napredovalih primerih je potrebna operacija, ki zahteva poseg v kostno strukturo in daljšo rehabilitacijo.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold mb-1">Dolgotrajna rehabilitacija</h4>
                    <p className="text-white/80">Po operaciji sledi dolga in pogosto boleča rehabilitacija, ki lahko traja tudi več mesecev.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <ExpertTestimonial 
          name="Jure Pantar"
          title="Trener Taekwondo reprezentance Slovenije"
          quote="TOE je koristna rešitev tudi za preventivo. Pomaga izboljšati držo, zmanjša pritiske na sklepe in preprečuje resne težave v prihodnosti."
          imageSrc="/lovable-uploads/04013d32-0c56-4cff-8059-21d6f79bbd03.png"
          credentials={["Mednarodni Taekwondo trener", "Strokovnjak za biomehaniko gibanja"]}
        />
        
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
