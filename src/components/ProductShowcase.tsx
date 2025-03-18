
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const ProductShowcase: React.FC = () => {
  return (
    <section id="product" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Predstavljamo</h2>
          <div className="w-20 h-1 bg-tarsal-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Revolucionarna rešitev za zmanjšanje bolečin v stopalih in preprečevanje deformacij
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="flex justify-center items-center">
            <div className="rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105">
              <img 
                src="/lovable-uploads/1fb29131-7f54-4ede-8669-e3f8e55672cd.png" 
                alt="Vsakodnevna uporaba TOE" 
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          </div>
          
          <div id="benefits">
            <div className="mb-8 space-y-6">
              <h3 className="text-2xl font-bold mb-4 text-tarsal-accent">Delovanje in učinek TOE</h3>
              
              <div className="space-y-5">
                <div className="flex items-start p-5 bg-tarsal-muted rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-2">Pravilna razporeditev prstov</h4>
                    <p className="text-gray-700">Mehko, a stabilno ločevanje prstov omogoča sprostitev in vračanje v naravno lego.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-5 bg-tarsal-muted rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-2">Zmanjšanje bolečin in nelagodja</h4>
                    <p className="text-gray-700">Omogoča boljšo porazdelitev pritiska na stopalo, kar zmanjša bolečine in preprečuje nastanek otiščancev.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-5 bg-tarsal-muted rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-2">Podpora zdravi drži stopala</h4>
                    <p className="text-gray-700">Preprečuje nepravilno obremenitev stopala in pomaga pri stabilnosti celotnega telesa.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-5 bg-tarsal-muted rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-2">Dolgoročna preventiva</h4>
                    <p className="text-gray-700">Z redno uporabo preprečujete deformacije, kot so kladivasti prsti in Hallux valgus.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-8">
              <h3 className="text-xl font-bold mb-4 text-green-600">Prednosti TOE</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✅</span>
                  <span><strong className="text-gray-800">Anatomsko oblikovan</strong> – Prilagaja se obliki prstov za optimalno udobje in podporo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✅</span>
                  <span><strong className="text-gray-800">Visokokakovosten silikon</strong> – Mehak, trpežen in koži prijazen material zagotavlja dolgotrajno uporabo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✅</span>
                  <span><strong className="text-gray-800">Ergonomski mostički</strong> – Nežno razmaknejo prste, zmanjšujejo trenje in preprečujejo otiščance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✅</span>
                  <span><strong className="text-gray-800">Univerzalna velikost</strong> – Prilagaja se različnim tipom in velikostim stopal.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✅</span>
                  <span><strong className="text-gray-800">Primerno za vsakodnevno uporabo</strong> – Uporabljajte doma, v službi ali med športnimi aktivnostmi.</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <Button 
                className="cta-button text-lg py-6 px-10 shadow-lg group bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const element = document.getElementById('pricing');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Naroči zdaj
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
