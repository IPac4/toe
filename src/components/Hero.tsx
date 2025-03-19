
import React from 'react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return <section className="pt-36 md:pt-48 pb-32 md:pb-48 bg-gradient-to-b from-white to-tarsal-muted flex flex-col items-center justify-between min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full justify-between">
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-black" style={{
          animationDelay: '0.1s'
        }}>
            Cele dneve v neudobnih čevljih, brez časa za vadbo, 
            <span className="text-red-600 font-extrabold"> bolečina v stopalih</span> postaja <span className="text-tarsal-accent">stalna</span>
          </h1>
          
          
          {/* First button - new button added above */}
          
        </div>
        
        <div className="mt-auto pt-12"></div> {/* This pushes the button to the bottom third */}
        
        {/* Second button - positioned at the bottom third */}
        <div className="text-center pb-8">
          <a href="#pricing" className={cn("inline-flex items-center justify-center", "cta-button text-lg", "animate-fade-in")} style={{
          animationDelay: '0.3s'
        }}>
            Rešite svoje težave zdaj
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>;
};

export default Hero;
