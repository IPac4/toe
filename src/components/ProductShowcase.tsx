
import React from 'react';
import { cn } from '@/lib/utils';

const ProductShowcase: React.FC = () => {
  return (
    <section id="product" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Predstavitev produkta TOE</h2>
          <div className="w-20 h-1 bg-tarsal-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Revolucionarna rešitev za zmanjšanje bolečin v stopalih in preprečevanje deformacij
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <img 
                src="/lovable-uploads/bc05218b-1b5e-48d9-ac9a-13dd92641485.png" 
                alt="TOE izdelek" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img 
                src="/lovable-uploads/ae388526-4f4c-411c-8122-f5f6d1fa0f2a.png" 
                alt="TOE v uporabi" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img 
                src="/lovable-uploads/902be649-973b-41e8-8eed-ef1a631110a9.png" 
                alt="TOE prileganje prstom" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div id="benefits">
            <h3 className="text-2xl font-bold mb-8">Prednosti uporabe TOE</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/10 rounded-full flex items-center justify-center text-tarsal-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Razbremeni prste in zmanjša bolečino</h4>
                  <p className="text-gray-700">TOE pomaga razbremeniti pritisk na prste in s tem zmanjšuje občutek bolečine že po prvih minutah uporabe.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/10 rounded-full flex items-center justify-center text-tarsal-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Preprečuje deformacije</h4>
                  <p className="text-gray-700">Redna uporaba pomaga preprečiti razvoj hallux valgus (izboklega palca) in kladivastih prstov.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/10 rounded-full flex items-center justify-center text-tarsal-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Izboljša stabilnost in ravnotežje</h4>
                  <p className="text-gray-700">Z razvrstitvijo prstov v njihov naraven položaj TOE izboljša stabilnost stopala in celotnega telesa.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/10 rounded-full flex items-center justify-center text-tarsal-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Udoben in enostaven za uporabo</h4>
                  <p className="text-gray-700">Izdelan iz visokokakovostnih materialov, ki so prijetni na koži in se odlično prilegajo med prste.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
