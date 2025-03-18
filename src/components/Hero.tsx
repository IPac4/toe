
import React from 'react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-tarsal-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-medium text-tarsal-gray mb-3 animate-fade-in">
              Rešitev za vse, ki trpijo zaradi bolečin v stopalih ali izbočenih palcev
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Cele dneve v neudobnih čevljih, brez časa za vadbo, bolečina v stopalih postaja <span className="text-tarsal-accent">stalna</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-8 text-tarsal-accent animate-fade-in" style={{animationDelay: '0.2s'}}>
              "Samo 2 minuti na dan za dolgotrajno izboljšanje zdravja vaših stopal!"
            </p>
            <a 
              href="#pricing" 
              className={cn(
                "inline-flex items-center justify-center",
                "cta-button text-lg",
                "animate-fade-in"
              )}
              style={{animationDelay: '0.3s'}}
            >
              Rešite svoje težave zdaj
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none animate-float">
              <img 
                src="/lovable-uploads/a7f96882-e8d6-4646-855c-d079f817b995.png" 
                alt="TOE produkt" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-semibold text-gray-700">4.8/5 (214 ocen)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
