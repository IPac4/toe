
import React from 'react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-tarsal-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
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
      </div>
    </section>
  );
};

export default Hero;
