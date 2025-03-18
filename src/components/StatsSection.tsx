
import React from 'react';
import { Progress } from "@/components/ui/progress";

const StatsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Podprto s številkami</h2>
          <div className="w-20 h-1 bg-tarsal-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            TOE dosega izjemne rezultate pri zmanjševanju bolečin in izboljšanju stabilnosti
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-5xl font-bold text-tarsal-accent mb-2">85%</div>
            <p className="text-xl font-semibold mb-4">Manj bolečin</p>
            <Progress 
              value={85} 
              className="h-3 bg-gray-200 rounded-full" 
            />
            <p className="mt-4 text-gray-600">85% uporabnikov poroča o bistveno manjši bolečini že po 2 tednih redne uporabe.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-5xl font-bold text-tarsal-accent mb-2">90%</div>
            <p className="text-xl font-semibold mb-4">Boljša stabilnost</p>
            <Progress 
              value={90} 
              className="h-3 bg-gray-200 rounded-full" 
            />
            <p className="mt-4 text-gray-600">9 od 10 uporabnikov doživlja občutno povečano stabilnost in ravnotežje pri hoji.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-5xl font-bold text-tarsal-accent mb-2">83%</div>
            <p className="text-xl font-semibold mb-4">Izboljšana drža</p>
            <Progress 
              value={83} 
              className="h-3 bg-gray-200 rounded-full" 
            />
            <p className="mt-4 text-gray-600">83% uporabnikov poroča o izboljšani drži in zmanjšanju pritiska na sklepe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
