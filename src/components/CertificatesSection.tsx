
import React from 'react';
import { ShieldCheck, Award, Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

const CertificatesSection: React.FC = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const offset = headerHeight + 20;
      
      const pricingSectionPosition = pricingSection.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: pricingSectionPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-tarsal-DEFAULT to-tarsal-light/95 text-tarsal-DEFAULT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 max-w-4xl mx-auto leading-tight bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
          Naročite Tarsal TOE in preizkusite njegovo izjemno učinkovitost 100% brez tveganja!
        </h2>
        
        {/* Gold Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-tarsal-DEFAULT py-5 px-6 text-center font-bold text-lg md:text-xl mb-4 rounded-lg shadow-lg">
          VAŠE NAROČILO JE ZAŠČITENO S 30-DNEVNIM JAMSTVOM VRAČILA DENARJA.
        </div>
        
        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <Button 
            onClick={scrollToPricing}
            className="cta-button bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-xl rounded-lg shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart className="w-6 h-6" />
            Naroči zdaj
          </Button>
        </div>
        
        {/* Guarantee Statement */}
        <div className="mb-10 text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-semibold mb-6">Želimo, da se odločite brez kakršnih koli dvomov ali skrbi, da nespametno ali tvegano zapravljate denar.</p>
          
          <p className="text-xl md:text-2xl font-semibold mb-8">
            Zato vam ponujam 30-dnevno jamstvo vračila denarja.
          </p>
        </div>
        
        {/* Certificate Icons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          <div className="flex flex-col items-center text-center max-w-xs bg-white/90 p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 border border-amber-100">
            <div className="mb-4 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full p-4 shadow-lg">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-600">100% Varno naročilo</h3>
            <p className="text-tarsal-gray">Varna plačila in zaupanja vredna dostava vaše pošiljke.</p>
          </div>
          
          <div className="flex flex-col items-center text-center max-w-xs bg-white/90 p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 border border-amber-100">
            <div className="mb-4 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full p-4 shadow-lg">
              <Award className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-600">30-dnevna garancija</h3>
            <p className="text-tarsal-gray">Če niste zadovoljni, vam povrnemo celoten znesek nakupa.</p>
          </div>
          
          <div className="flex flex-col items-center text-center max-w-xs bg-white/90 p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 border border-amber-100">
            <div className="mb-4 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full p-4 shadow-lg">
              <Star className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-600">100% zadovoljstvo</h3>
            <p className="text-tarsal-gray">Stotine zadovoljnih strank potrjuje kakovost izdelka.</p>
          </div>
        </div>
        
        {/* Certificate Image with enhanced styling */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-1 rounded-full shadow-lg">
            <img alt="100% jamstvo zadovoljstva" className="w-32 h-32 rounded-full" src="/lovable-uploads/43ed392e-6a27-4823-ad82-20c4e92c9276.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
