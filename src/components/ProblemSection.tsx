
import React from 'react';
import { cn } from '@/lib/utils';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-tarsal-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Zakaj nas boli?</h2>
          <div className="w-20 h-1 bg-tarsal-accent mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="flex">
                <div className="w-1/2 relative">
                  <img 
                    src="/lovable-uploads/617e160d-6d89-4830-a28f-6686320fcfdd.png" 
                    alt="Zdravo stopalo" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                    <p className="text-white text-sm font-medium">Zdravo stopalo</p>
                  </div>
                </div>
                <div className="w-1/2 relative">
                  <img 
                    src="/lovable-uploads/617e160d-6d89-4830-a28f-6686320fcfdd.png" 
                    alt="Hallux valgus" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                    <p className="text-white text-sm font-medium">Hallux valgus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Glavni vzroki za bolečine in deformacije stopal</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Elegantna, a škodljiva obutev</h4>
                  <p className="text-gray-700">Ozki čevlji s peto povzročajo pritisk na prste in stopala, kar vodi do deformacij kot je hallux valgus.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Dolgotrajno stanje</h4>
                  <p className="text-gray-700">Preživljanje dolgih ur na nogah, brez ustreznih odmora, dodatno obremenjuje stopala.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Premalo gibanja</h4>
                  <p className="text-gray-700">Pomanjkanje vaj za krepitev stopalnih mišic vodi v nepravilno držo stopala in posledično bolečine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
