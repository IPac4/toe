
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-tarsal-muted" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block mb-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            Najpogostejša težava stopal
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-red-600">Zakaj nas boli?</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Več kot 70% ljudi se v življenju sreča z bolečinami v stopalih. Začnite preventivno ukrepati, preden deformacije postanejo preveč boleče.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 relative">
                  <img 
                    src="/lovable-uploads/cf640606-4895-4a95-8a59-9d9075dcf29e.png" 
                    alt="Zdravo stopalo" 
                    className="w-full h-auto object-cover aspect-square"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-3 px-4">
                    <p className="text-white text-sm font-medium">Zdravo stopalo</p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 relative">
                  <img 
                    src="/lovable-uploads/5cb1d0f9-4448-4934-affd-7d3b50d05807.png" 
                    alt="Hallux valgus" 
                    className="w-full h-auto object-cover aspect-square"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-900/70 to-transparent py-3 px-4">
                    <Badge variant="destructive" className="mb-1">Boleče</Badge>
                    <p className="text-white text-sm font-medium">Hallux valgus</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Alert variant="destructive" className="mt-6 border-red-200 bg-red-50">
              <AlertTitle className="text-red-800">Bolečina je opozorilo!</AlertTitle>
              <AlertDescription className="text-red-700">
                Če čutite bolečine v stopalu ali opažate deformacije, je čas za ukrepanje. Ne odlašajte, saj se stanje z leti lahko samo poslabša.
              </AlertDescription>
            </Alert>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Glavni vzroki za bolečine in deformacije stopal</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
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
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
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
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Premalo gibanja</h4>
                  <p className="text-gray-700">Pomanjkanje vaj za krepitev stopalnih mišic vodi v nepravilno držo stopala in posledično bolečine.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold mb-1">Starost in dednost</h4>
                  <p className="text-gray-700">Genetski dejavniki in staranje dodatno povečujejo tveganje za deformacije v stopalih.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <p className="text-gray-700 font-medium">
                <span className="text-red-600 font-bold">85%</span> ljudi z deformacijo stopal poroča o vsakodnevnih bolečinah, ki omejujejo njihovo mobilnost in kvaliteto življenja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
