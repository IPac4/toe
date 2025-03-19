
import React from 'react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-tarsal-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-black" style={{
          animationDelay: '0.1s'
        }}>
            Cele dneve v neudobnih čevljih, brez časa za vadbo, 
            <span className="text-red-600 font-extrabold"> bolečina v stopalih</span> postaje <span className="text-tarsal-accent">stalna</span>
          </h1>
          
          
          {/* First button - new button added above */}
          
          
          <div className="mt-8"></div> {/* Increased spacing here from mt-2 to mt-8 */}
          
          {/* Second button - moved down */}
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
