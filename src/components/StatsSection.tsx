
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

const StatsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Podprto s številkami</h2>
          <div className="w-20 h-1 bg-tarsal-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            TOE dosega izjemne rezultate pri zmanjševanju bolečin in izboljšanju stabilnosti, kar potrjujejo tudi priznani fizioterapevti
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-tarsal-accent to-blue-600 -translate-y-1/2 translate-x-1/2 rotate-45"></div>
            <div className="text-5xl font-bold text-tarsal-accent mb-2">85%</div>
            <p className="text-xl font-semibold mb-4">Manj bolečin</p>
            <Progress 
              value={85} 
              className="h-3 bg-gray-200 rounded-full" 
            />
            <div className="mt-6 text-gray-700 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-left">85% uporabnikov poroča o bistveno manjši bolečini že po 2 tednih redne uporabe.</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center transform md:scale-110 md:-translate-y-2 z-10">
            <div className="text-5xl font-bold text-tarsal-accent mb-2">90%</div>
            <p className="text-xl font-semibold mb-4">Boljša stabilnost</p>
            <Progress 
              value={90} 
              className="h-3 bg-gray-200 rounded-full" 
            />
            <div className="mt-6 text-gray-700 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-left">9 od 10 uporabnikov doživlja občutno povečano stabilnost in ravnotežje pri hoji.</p>
            </div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-tarsal-accent text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider">
              Najvišja ocena
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-bl from-tarsal-accent to-blue-600 -translate-y-1/2 -translate-x-1/2 rotate-45"></div>
            <div className="text-5xl font-bold text-tarsal-accent mb-2">83%</div>
            <p className="text-xl font-semibold mb-4">Izboljšana drža</p>
            <Progress 
              value={83} 
              className="h-3 bg-gray-200 rounded-full" 
            />
            <div className="mt-6 text-gray-700 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-left">83% uporabnikov poroča o izboljšani drži in zmanjšanju pritiska na sklepe.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white p-6 rounded-lg border border-gray-200 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-blue-50 rounded-full p-4">
              <svg className="w-8 h-8 text-tarsal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Preverjeno in potrjeno s strani strokovnjakov</h3>
              <p className="text-gray-600">Vsi podatki so pridobljeni iz kliničnih opazovanj in povratnih informacij uporabnikov pod nadzorom strokovnjakov s področja fizioterapije in športne medicine.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
