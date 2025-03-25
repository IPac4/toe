
import React from 'react';
import { CircleCheck, CircleDot } from 'lucide-react';

const SecretIngredientsSection: React.FC = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 max-w-4xl mx-auto leading-tight">
          Skrivnost je v sestavinah
        </h2>
        
        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Ingredient 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full p-2 w-52 h-52 flex items-center justify-center">
              <img 
                src="/lovable-uploads/f43ac582-f708-4451-b740-e7f853eb79a2.png" 
                alt="Neopuntia" 
                className="w-40 h-40 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-4">NEOPUNTIA™</h3>
            <p className="mb-6">
              Gre za čisti kaktusov prah, ki poskrbi za nadzorovanje in uravnavanje telesne teže. 
              Neopuntia™ je patentirana kombinacija netopnih in topnih prehranskih vlaknin.
            </p>
            <div className="mt-auto">
              <CircleDot className="h-6 w-6 text-amber-400 mx-auto" />
            </div>
          </div>
          
          {/* Ingredient 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full p-2 w-52 h-52 flex items-center justify-center">
              <img 
                src="/lovable-uploads/f43ac582-f708-4451-b740-e7f853eb79a2.png" 
                alt="L-Carnitine" 
                className="w-40 h-40 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-4">L-CARNITINE</h3>
            <p className="mb-6">
              Zaradi svoje vloge pri prenosu maščobnih kislin v mitohondrije je bistvena sestavina za vse, 
              ki želijo izboljšati učinkovitost presnove.
            </p>
            <div className="mt-auto">
              <CircleCheck className="h-6 w-6 text-amber-400 mx-auto" />
            </div>
          </div>
          
          {/* Ingredient 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full p-2 w-52 h-52 flex items-center justify-center">
              <img 
                src="/lovable-uploads/f43ac582-f708-4451-b740-e7f853eb79a2.png" 
                alt="Baldrijan" 
                className="w-40 h-40 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-4">BALDRIJAN</h3>
            <p className="mb-6">
              Koren baldrijana je znan po svojih pomirjujočih lastnostih; tradicionalno se uporablja za izboljšanje 
              kakovosti spanja in zmanjševanje tesnobe.
            </p>
            <div className="mt-auto">
              <CircleDot className="h-6 w-6 text-amber-400 mx-auto" />
            </div>
          </div>
        </div>
        
        {/* More Ingredients Button */}
        <div className="text-center mb-12">
          <p className="text-xl font-semibold flex items-center justify-center">
            Več sestavin <CircleCheck className="ml-2 h-5 w-5 text-amber-400" />
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mb-8">
          <div className="bg-green-500 text-white py-6 px-8 rounded-lg max-w-2xl mx-auto mb-4">
            <p className="text-2xl font-bold mb-2">NAROČITE NIGHTTIME BURN ŠE DANES</p>
            <p className="text-xl font-bold text-yellow-300">IN PRIHRANITE DO 59%</p>
          </div>
          
          <p className="text-lg font-semibold">
            60-DNEVNO JAMSTVO VRAČILA DENARJA
          </p>
        </div>
        
        {/* Disclaimer */}
        <div className="text-center text-sm text-gray-400 mt-8">
          <p>*Na podlagi znanstvenih raziskav. Rezultati se lahko razlikujejo.</p>
        </div>
      </div>
    </section>
  );
};

export default SecretIngredientsSection;
