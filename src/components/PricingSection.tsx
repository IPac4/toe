
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Paketi & Cene</h2>
          <div className="w-20 h-1 bg-tarsal-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Izberite paket, ki najbolj ustreza vašim potrebam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Package */}
          <div className="price-card">
            <div className="p-8 border-b">
              <h3 className="text-2xl font-bold mb-2">Osnovno pakiranje</h3>
              <p className="text-gray-600 mb-4">Popolna rešitev za začetek</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">17,90€</span>
                <span className="text-gray-500 ml-2">/kos</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="font-medium">1x Tarsal TOE paket</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Testirano v Sloveniji</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priročna embalaža</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Hitra dostava</span>
                </li>
              </ul>
            </div>
            <div className="p-8">
              <p className="font-semibold mb-3">Končna cena: <span className="text-xl font-bold">17,90€</span></p>
              <Button 
                className="w-full bg-tarsal-accent hover:bg-tarsal-accent/90 cta-button"
                size="lg"
              >
                Naroči zdaj
              </Button>
            </div>
          </div>
          
          {/* Popular Package */}
          <div className="price-card popular transform scale-105">
            <div className="bg-tarsal-accent text-white py-2 text-center font-semibold">
              Najbolj priljubljeno
            </div>
            <div className="p-8 border-b">
              <h3 className="text-2xl font-bold mb-2">Dvojno pakiranje</h3>
              <p className="text-gray-600 mb-4">Popolna vrednost</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">14,32€</span>
                <span className="text-gray-500 ml-2">/kos</span>
                <span className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">-20%</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="font-medium">2x Tarsal TOE paket</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div className="flex items-center">
                    <span>Vaje za dnevno vadbo</span>
                    <Badge className="ml-2 bg-green-500 text-white">GRATIS</Badge>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priročna embalaža</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Testirano v Sloveniji</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Hitra dostava</span>
                </li>
              </ul>
            </div>
            <div className="p-8">
              <p className="font-semibold mb-3">Končna cena: <span className="text-xl font-bold">28,64€</span></p>
              <Button 
                className="w-full cta-button border-0"
                size="lg"
              >
                Naroči zdaj z 20% popustom
              </Button>
            </div>
          </div>
          
          {/* Premium Package */}
          <div className="price-card">
            <div className="p-8 border-b">
              <h3 className="text-2xl font-bold mb-2">Družinsko pakiranje</h3>
              <p className="text-gray-600 mb-4">Največ prihranite</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">13,42€</span>
                <span className="text-gray-500 ml-2">/kos</span>
                <span className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">-25%</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="font-medium">3x Tarsal TOE paket</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div className="flex items-center">
                    <span>Vaje za dnevno vadbo</span>
                    <Badge className="ml-2 bg-green-500 text-white">GRATIS</Badge>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priročna embalaža</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Testirano v Sloveniji</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div className="flex items-center">
                    <span>Brezplačna dostava</span>
                    <Badge className="ml-2 bg-green-500 text-white">GRATIS</Badge>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-8">
              <p className="font-semibold mb-3">Končna cena: <span className="text-xl font-bold">40,26€</span></p>
              <Button 
                className="w-full bg-tarsal-accent hover:bg-tarsal-accent/90 cta-button"
                size="lg"
              >
                Naroči zdaj
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
